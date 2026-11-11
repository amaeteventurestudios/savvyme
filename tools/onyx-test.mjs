// End-to-end check of "Sign in with Onyx" (server/pb_hooks/onyx*.js) against a real Onyx accounts service.
// Needs the onyx repo next to this one and a PocketBase 0.40.5 binary:
//   PB_BIN=/path/to/pocketbase node tools/onyx-test.mjs
// It starts Onyx (with its own throwaway PocketBase) and SavvyMe's PocketBase with the hooks, then signs people in.
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const ONYX = new URL('../../onyx/core/test/helpers.mjs', import.meta.url).pathname;
const { start, api, browser, emailSignIn, CLIENTS, SECRETS } = await import(ONYX);
const { createHmac } = await import('node:crypto');
const { sha, resetLimits } = await import(new URL('../../onyx/core/lib/util.mjs', import.meta.url).pathname);
const PB = process.env.PB_BIN;
if (!PB) throw new Error('Set PB_BIN to a PocketBase 0.40.5 binary');

SECRETS.savvyme = 'savvyme-test-secret-0123456789';
const savvyme = { id: 'savvyme', name: 'SavvyMe', product: 'savvyme', guests: false, home: 'https://savvyme.test',
  redirect_uris: ['https://savvyme.test/api/onyx/return'], share_email: true, secretHash: sha(SECRETS.savvyme) };
const onyx = await start({ clients: { ...CLIENTS, savvyme } });

const dir = mkdtempSync(join(tmpdir(), 'savvyme-pb-'));
const server = new URL('../server', import.meta.url).pathname;
execFileSync(PB, ['migrate', 'up', `--dir=${dir}`, `--migrationsDir=${server}/pb_migrations`], { stdio: 'ignore' });
const port = 18000 + Math.floor(Math.random() * 1000);
const pb = spawn(PB, ['serve', `--dir=${dir}`, `--migrationsDir=${server}/pb_migrations`, `--hooksDir=${server}/pb_hooks`, `--http=127.0.0.1:${port}`],
  { env: { ...process.env, ONYX_CLIENT_SECRET: SECRETS.savvyme, ONYX_CORE_URL: onyx.base }, stdio: ['ignore', 'ignore', 'inherit'] });
const S = `http://127.0.0.1:${port}`;
for (let i = 0; i < 50; i++) { try { if ((await fetch(S + '/api/health')).ok) break; } catch {} await new Promise(r => setTimeout(r, 100)); }
const post = async (path, body, token) => { const r = await fetch(S + path, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: token } : {}) }, body: JSON.stringify(body) }); return { status: r.status, body: await r.json().catch(() => ({})) }; };
const uniq = () => Math.random().toString(36).slice(2, 8);
let failed = 0;
async function check(name, fn) { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.log('FAIL ', name, '\n     ', e.message); } }

try {
  await check('config says sign-in is on', async () => assert.equal((await (await fetch(S + '/api/onyx/config')).json()).on, true));

  await check('a new person: email code, then name and @handle, then a SavvyMe account with their progress fields', async () => {
    resetLimits();
    const email = `Ngozi.${uniq()}@Example.com`;
    const st = await post("/api/onyx/email-start", { email }); assert.equal(st.status, 200, JSON.stringify(st.body));
    const v = await post('/api/onyx/email-verify', { email, code: onyx.cfg.mail.last.code });
    assert.equal(v.status, 200); assert.equal(v.body.needs_profile, true);
    const p = await post('/api/onyx/profile', { ticket: v.body.ticket, name: 'Ngozi', handle: 'ngozi_' + uniq() });
    assert.equal(p.status, 200, JSON.stringify(p.body));
    assert.ok(p.body.token); assert.equal(p.body.record.email, email.toLowerCase()); assert.equal(p.body.record.onyx_id, undefined, 'onyx_id stays hidden');
    // the token works exactly like a password sign-in's
    const r = await fetch(`${S}/api/collections/users/records/${p.body.record.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json', authorization: p.body.token }, body: JSON.stringify({ sparks: 7 }) });
    assert.equal(r.status, 200); assert.equal((await r.json()).sparks, 7);
    // a second sign-in lands on the same account
    await post('/api/onyx/email-start', { email });
    const again = await post('/api/onyx/email-verify', { email, code: onyx.cfg.mail.last.code });
    assert.equal(again.body.record.id, p.body.record.id);
  });

  await check('someone who already had a password account keeps their progress; the old password stops working', async () => {
    resetLimits();
    const email = `old.${uniq()}@example.com`, password = 'old-password-123';
    const made = await post('/api/collections/users/records', { email, password, passwordConfirm: password, name: 'Old' });
    assert.equal(made.status, 200, JSON.stringify(made.body));
    const a = await post('/api/collections/users/auth-with-password', { identity: email, password });
    await fetch(`${S}/api/collections/users/records/${made.body.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json', authorization: a.body.token }, body: JSON.stringify({ lessons: 12 }) });
    await post('/api/onyx/email-start', { email });
    const v = await post('/api/onyx/email-verify', { email, code: onyx.cfg.mail.last.code });
    const done = v.body.needs_profile ? await post('/api/onyx/profile', { ticket: v.body.ticket, name: 'Old', handle: 'old_' + uniq() }) : v;
    assert.equal(done.body.record.id, made.body.id, 'same account');
    assert.equal(done.body.record.lessons, 12, 'progress kept');
    assert.equal((await post('/api/collections/users/auth-with-password', { identity: email, password })).status, 400, 'the unproven password is replaced');
  });

  await check('a learner cannot set onyx_id on their own account', async () => {
    const email = `x.${uniq()}@example.com`, password = 'pass-word-123';
    const made = await post('/api/collections/users/records', { email, password, passwordConfirm: password, onyx_id: 'stolen' });
    const a = await post('/api/collections/users/auth-with-password', { identity: email, password });
    await fetch(`${S}/api/collections/users/records/${made.body.id}`, { method: 'PATCH', headers: { 'content-type': 'application/json', authorization: a.body.token }, body: JSON.stringify({ onyx_id: 'stolen2' }) });
    const { DatabaseSync } = await import('node:sqlite');
    const row = new DatabaseSync(join(dir, 'data.db'), { readOnly: true }).prepare('select onyx_id from users where id = ?').get(made.body.id);
    assert.equal(row.onyx_id, '');
  });

  await check('a wrong code and a bad claim are refused', async () => {
    resetLimits();
    const email = `w.${uniq()}@example.com`;
    await post('/api/onyx/email-start', { email });
    const wrong = await post('/api/onyx/email-verify', { email, code: onyx.cfg.mail.last.code === '000000' ? '111111' : '000000' });
    assert.notEqual(wrong.status, 200);
    assert.equal((await post('/api/onyx/claim', { t: 'nonsense' })).status, 400);
  });

  await check('Google: /api/onyx/google sends the browser to Onyx with PKCE and a flow cookie', async () => {
    const r = await fetch(S + '/api/onyx/google?back=/app/', { redirect: 'manual', headers: { host: 'savvyme.test' } });
    assert.equal(r.status, 303, await r.text());
    const to = new URL(r.headers.get('location'));
    assert.equal(to.origin + to.pathname, 'https://accounts.noveniqe.com/authorize');
    assert.equal(to.searchParams.get('client_id'), 'savvyme'); assert.equal(to.searchParams.get('via'), 'google');
    assert.match(to.searchParams.get('code_challenge'), /^[A-Za-z0-9_-]{43}$/);
    assert.match(r.headers.get('set-cookie') || '', /sm_onyx=.+HttpOnly/i);
    const back = await fetch(S + '/api/onyx/return?code=x&state=y', { redirect: 'manual' });
    assert.match(back.headers.get('location'), /#signin=failed$/, 'a return without the flow cookie fails safely');
  });

  await check('Google or email through Onyx\'s pages: the return trip ends signed in on SavvyMe', async () => {
    resetLimits();
    const email = `ret.${uniq()}@example.com`;
    const s = await emailSignIn(onyx, browser(onyx.base), savvyme, email);
    const back = new URL(s.final.location);
    assert.equal(back.origin + back.pathname, 'https://savvyme.test/api/onyx/return');
    // the flow cookie /api/onyx/google would have set (same shape, signed with the same key)
    const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
    const body = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ v: s.verifier, s: s.state, b: '/app/', r: savvyme.redirect_uris[0], exp: Math.floor(Date.now() / 1000) + 600 })}`;
    const jwt = `${body}.${createHmac('sha256', SECRETS.savvyme + ':flow').update(body).digest('base64url')}`;
    const r = await fetch(`${S}/api/onyx/return${back.search}`, { redirect: 'manual', headers: { cookie: `sm_onyx=${jwt}` } });
    const to = r.headers.get('location');
    assert.match(to, /^\/app\/#signin=/, to);
    const c = await post('/api/onyx/claim', { t: decodeURIComponent(to.split('#signin=')[1]) });
    assert.equal(c.status, 200); assert.equal(c.body.record.email, email); assert.ok(c.body.token);
  });
} finally {
  pb.kill(); onyx.stop(); rmSync(dir, { recursive: true, force: true });
}
if (failed) { console.log(`${failed} failed`); process.exit(1); }
console.log('all passed');
