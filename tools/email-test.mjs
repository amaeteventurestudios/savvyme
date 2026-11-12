// End-to-end check of "Email me tips and news" and the admin Email tab (server/pb_hooks/email*.js) against a real Onyx
// with its email block switched on (mail goes to Onyx's test sink, never out). Needs the onyx repo next to this one:
//   PB_BIN=/path/to/pocketbase node tools/email-test.mjs            (SHOTS=/tmp/shots also takes phone and desk screenshots)
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, extname } from 'node:path';
import assert from 'node:assert/strict';

const ONYX = new URL('../../onyx/core/test/helpers.mjs', import.meta.url).pathname;
const { start, CLIENTS, SECRETS } = await import(ONYX);
const { sha } = await import(new URL('../../onyx/core/lib/util.mjs', import.meta.url).pathname);
const PB = process.env.PB_BIN;
if (!PB) throw new Error('Set PB_BIN to a PocketBase 0.40.5 binary');

SECRETS.savvyme = 'savvyme-test-secret-0123456789';
const clients = JSON.parse(readFileSync(new URL('../../onyx/core/deploy/clients.json', import.meta.url), 'utf8')).clients;
const real = clients.find(c => c.id === 'savvyme');
const savvyme = { ...real, redirect_uris: ['https://savvyme.test/api/onyx/return'], secretHash: sha(SECRETS.savvyme),
  email: { ...real.email, on: true, address: '1 Test Street, Testville' } };   // switched on here only, in a sandbox
const onyx = await start({ clients: { ...CLIENTS, savvyme }, mailBatch: 50 });

const dir = mkdtempSync(join(tmpdir(), 'savvyme-pb-'));
const server = new URL('../server', import.meta.url).pathname;
execFileSync(PB, ['migrate', 'up', `--dir=${dir}`, `--migrationsDir=${server}/pb_migrations`], { stdio: 'ignore' });
execFileSync(PB, ['superuser', 'upsert', 'owner@test.local', 'owner-test-password', `--dir=${dir}`], { stdio: 'ignore' });
const port = 18000 + Math.floor(Math.random() * 1000);
const pb = spawn(PB, ['serve', `--dir=${dir}`, `--migrationsDir=${server}/pb_migrations`, `--hooksDir=${server}/pb_hooks`, `--http=127.0.0.1:${port}`],
  { env: { ...process.env, ONYX_CLIENT_SECRET: SECRETS.savvyme, ONYX_CORE_URL: onyx.base }, stdio: ['ignore', 'ignore', 'inherit'] });
const S = `http://127.0.0.1:${port}`;
for (let i = 0; i < 50; i++) { try { if ((await fetch(S + '/api/health')).ok) break; } catch {} await new Promise(r => setTimeout(r, 100)); }
const req = async (method, path, body, token) => { const r = await fetch(S + path, { method, headers: { 'content-type': 'application/json', ...(token ? { authorization: token } : {}) }, body: body ? JSON.stringify(body) : undefined }); return { status: r.status, body: await r.json().catch(() => ({})) }; };
const uniq = () => Math.random().toString(36).slice(2, 8);
const sent = () => onyx.cfg.mail.sent ?? [];
let failed = 0;
async function check(name, fn) { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.log('FAIL ', name, '\n     ', e.message); } }
const learner = async (verified) => {
  const email = `learner.${uniq()}@example.com`, password = 'learner-password-1';
  await req('POST', '/api/collections/users/records', { email, password, passwordConfirm: password, name: 'Amara Eze', course: 'ai' });
  const a = await req('POST', '/api/collections/users/auth-with-password', { identity: email, password });
  if (verified) {
    await req('PATCH', `/api/collections/users/records/${a.body.record.id}`, { verified: true }, owner);
  }
  return { email, token: a.body.token, record: a.body.record };
};
let owner = (await req('POST', '/api/collections/_superusers/auth-with-password', { identity: 'owner@test.local', password: 'owner-test-password' })).body.token, demo = null;
await req('PATCH', '/api/settings', { rateLimits: { enabled: false } }, owner);   // this test signs many people in at once

try {
  await check('signed out: the email choice is not reachable', async () => assert.equal((await req('GET', '/api/email/me')).status, 401));

  await check('an unverified learner joins: a confirmation email under SavvyMe\'s name, then on the list after the link', async () => {
    const L = await learner(false);
    let r = await req('GET', '/api/email/me', null, L.token);
    assert.deepEqual(r.body, { on: true, status: 'none' });
    onyx.cfg.mail.sent = [];
    r = await req('POST', '/api/email/me', { join: true }, L.token);
    assert.equal(r.status, 200); assert.equal(r.body.status, 'pending'); assert.equal(r.body.confirm_sent, true);
    const m = sent()[0];
    assert.equal(m.to, L.email); assert.match(m.from, /^"SavvyMe" </); assert.match(m.subject, /SavvyMe tips and news/);
    const link = m.text.match(/http:\/\/127\.0\.0\.1:\d+\/mail\/c\/\S+/)[0];
    assert.equal((await fetch(link)).status, 200);
    assert.equal((await req('GET', '/api/email/me', null, L.token)).body.status, 'active');
  });

  await check('a verified learner is in at once, tagged with course and plan; leaving unsubscribes', async () => {
    const L = await learner(true);
    onyx.cfg.mail.sent = [];
    let r = await req('POST', '/api/email/me', { join: true }, L.token);
    assert.equal(r.body.status, 'active'); assert.equal(sent().length, 0);
    const p = await onyx.pb.first('nv_mail_people', `email='${L.email}'`);
    assert.deepEqual(p.tags, ['course ai', 'plan free']); assert.equal(p.source, 'app');
    r = await req('POST', '/api/email/me', { join: false }, L.token);
    assert.equal(r.body.status, 'unsubscribed');
    demo = await learner(true); await req('POST', '/api/email/me', { join: true }, demo.token);
  });

  await check('only the owner reaches the Email tab\'s calls', async () => {
    const L = await learner(true);
    assert.equal((await req('GET', '/api/email/admin/', null, L.token)).status, 403);
    const r = await req('GET', '/api/email/admin/', null, owner);
    assert.equal(r.status, 200); assert.equal(r.body.on, true); assert.equal(r.body.lists[0].id, 'news'); assert.ok(r.body.lists[0].active >= 2);
  });

  await check('the owner writes, previews, tests and sends a newsletter; a welcome automation runs', async () => {
    let r = await req('POST', '/api/email/admin/autos', { list: 'news', name: 'Welcome', trigger: 'join', active: true, steps: [{ delay: 0, unit: 'minutes', subject: 'Welcome, {name|friend}', body: 'Glad you are here.' }] }, owner);
    assert.equal(r.status, 201);
    r = await req('POST', '/api/email/admin/sends', { list: 'news', subject: 'Five minutes on solar', preheader: 'Today\'s pick', body: '# Solar\n\nHi {name|friend}.\n\n[[Open SavvyMe](https://savvyme.amaete.com/app/)]' }, owner);
    assert.equal(r.status, 201);
    const id = r.body.send.id;
    r = await req('POST', '/api/email/admin/preview', { list: 'news', subject: 'x', body: '# Hi' }, owner);
    assert.match(r.body.html, /Hi<\/h1>/);
    onyx.cfg.mail.sent = [];
    r = await req('POST', `/api/email/admin/sends/${id}/test`, { to: 'owner@example.com' }, owner);
    assert.equal(r.status, 200); assert.equal(sent()[0].subject, '[Test] Five minutes on solar');
    r = await req('POST', `/api/email/admin/sends/${id}/send`, {}, owner);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    for (let i = 0; i < 5; i++) await onyx.core.email.tick();
    r = await req('GET', `/api/email/admin/sends/${id}`, null, owner);
    assert.equal(r.body.send.status, 'sent'); assert.ok(r.body.send.delivered >= 2);
    const L = await learner(true);
    onyx.cfg.mail.sent = [];
    await req('POST', '/api/email/me', { join: true }, L.token);
    await onyx.core.email.tick();
    assert.equal(sent()[0].subject, 'Welcome, Amara');
  });

  if (process.env.SHOTS) await shots(process.env.SHOTS);
} finally {
  pb.kill(); onyx.stop(); rmSync(dir, { recursive: true, force: true });
}
if (failed) { console.log(`${failed} failed`); process.exit(1); }
console.log('all passed');

async function shots(out) {
  const { createRequire } = await import('node:module');
  const { chromium } = createRequire(import.meta.url)(process.env.PW || 'playwright');
  const root = new URL('..', import.meta.url).pathname;
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp' };
  const site = createServer((rq, rs) => {
    let p = decodeURIComponent(new URL(rq.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
    const f = join(root, p);
    if (!f.startsWith(root) || !existsSync(f) || statSync(f).isDirectory()) { rs.writeHead(404); return rs.end(); }
    rs.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' }); rs.end(readFileSync(f));
  }).listen(0, '127.0.0.1');
  await new Promise(r => site.once('listening', r));
  const W = `http://127.0.0.1:${site.address().port}`;
  const browser = await chromium.launch();
  const errors = [];
  for (const [name, opts] of [['port', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }], ['desk', { viewport: { width: 1280, height: 800 } }]]) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ ...opts, colorScheme: scheme });
      await ctx.addInitScript(([api, auth]) => { try { localStorage.setItem('sm-api', api); localStorage.setItem('sm-auth', auth); } catch {} }, [S, JSON.stringify({ token: demo.token, record: demo.record })]);
      const page = await ctx.newPage();
      page.on('console', m => m.type() === 'error' && errors.push(`${name}/${scheme} app: ${m.text()}`));
      page.on('pageerror', e => errors.push(`${name}/${scheme} app: ${e.message}`));
      await page.goto(W + '/app/'); await page.waitForTimeout(800);
      await page.evaluate(() => window.__savvy?.go?.('me')); await page.waitForTimeout(1200);
      const box = page.locator('.mailopt');
      if (await box.count()) await box.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${out}/app-me-${name}-${scheme}.png` });
      const admin = await ctx.newPage();
      admin.on('pageerror', e => errors.push(`${name}/${scheme} admin: ${e.message}`));
      await admin.addInitScript(t => { try { sessionStorage.setItem('sm-admin', t); } catch {} }, owner);   // not in the sandboxed preview frame
      await admin.goto(W + '/app/admin/'); await admin.waitForTimeout(800);
      await admin.click('#tabs [data-t=email]'); await admin.waitForTimeout(1200);
      await admin.screenshot({ path: `${out}/admin-email-${name}-${scheme}.png`, fullPage: true });
      await admin.click('#newsend'); await admin.waitForTimeout(1500);
      await admin.screenshot({ path: `${out}/admin-compose-${name}-${scheme}.png`, fullPage: true });
      await ctx.close();
    }
  }
  await browser.close(); site.close();
  console.log(errors.length ? 'console errors:\n' + errors.join('\n') : 'no console errors', '\nshots in', out);
}
