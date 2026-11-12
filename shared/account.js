// Accounts: sign in through Onyx (Google or a 6-digit email code; server/pb_hooks/onyx*.js), or with an older email and
// password account, on the SavvyMe PocketBase server, then keep this device's
// progress and the server's copy in step. Plain fetch calls, no SDK. When there is no server (API is empty) every
// function here does nothing and the app keeps progress on the device only.
import { API } from './config.js';
import * as St from './store.js';

const AK = 'sm-auth';
let auth = null;
try { auth = JSON.parse(localStorage.getItem(AK) || 'null'); } catch {}
const keep = () => { try { auth ? localStorage.setItem(AK, JSON.stringify(auth)) : localStorage.removeItem(AK); } catch {} };

export const enabled = () => !!API;
export const user = () => (auth && auth.record) || null;

const WORDS = { validation_not_unique: 'That email already has an account. Try signing in.', validation_is_email: 'That email doesn\'t look right.',
  validation_length_out_of_range: 'Passwords need at least 8 characters.', validation_values_mismatch: 'The passwords don\'t match.' };
async function call(path, opt = {}) {
  const r = await fetch(API + path, { ...opt, headers: { 'content-type': 'application/json', ...(auth ? { Authorization: auth.token } : {}) } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    const f = Object.values(d.data || {})[0];
    const e = new Error((f && (WORDS[f.code] || f.message)) || (d.error && d.error.message) || (r.status === 400 && /auth/.test(path) ? 'Wrong email or password.' : d.message) || 'Something went wrong. Try again.');
    e.status = r.status; throw e;
  }
  return d;
}

export async function signIn(email, password) {
  auth = await call('/api/collections/users/auth-with-password', { method: 'POST', body: JSON.stringify({ identity: email.trim(), password }) });
  keep(); await sync(); return user();
}
export async function signUp(email, password, name) {
  await call('/api/collections/users/records', { method: 'POST', body: JSON.stringify({ email: email.trim(), password, passwordConfirm: password, name: (name || '').slice(0, 60) }) });
  return signIn(email, password);
}
export function signOut() { auth = null; keep(); }

// ---- sign-in through Onyx: one account for every studio product, shown as SavvyMe ----
let onyx = null;
export async function onyxOn() {
  if (!API) return false;
  if (onyx === null) { try { onyx = !!(await call('/api/onyx/config')).on; } catch { onyx = false; } }
  return onyx;
}
const post = (path, body) => call(path, { method: 'POST', body: JSON.stringify(body) });
async function land(r) {  // { token, record } signs in; { needs_profile, ticket } asks for a name first
  if (r.needs_profile) return r;
  auth = { token: r.token, record: r.record }; keep(); await sync(); return { user: user() };
}
export const emailCode = email => post('/api/onyx/email-start', { email: email.trim() });
export const emailVerify = async (email, code) => land(await post('/api/onyx/email-verify', { email: email.trim(), code: String(code).replace(/\D/g, '') }));
export const profile = async (ticket, name, handle) => land(await post('/api/onyx/profile', { ticket, name, handle: handle.replace(/^@/, '') }));
export const claim = async t => land(await post('/api/onyx/claim', { t }));
export const googleUrl = (back = location.pathname) => `${API}/api/onyx/google?back=${encodeURIComponent(back)}`;

// pull the server's copy, merge it with this device's, and send the result back
export async function sync() {
  if (!API || !auth) return;
  const rec = await call(`/api/collections/users/records/${auth.record.id}`);
  St.replace(St.merge(St.state(), rec.state || null));
  await push(true);
}

let timer = null;
function summary(S) {
  const days = Object.keys(S.days || {}).sort();
  return { state: S, quiz: S.profile || {}, course: S.active || '', sparks: S.sparks || 0, streak: St.streaks().daily,
    lessons: (S.shelf || []).length, goal: (S.profile && S.profile.weeklyGoal) || 5, last_day: days[days.length - 1] || '' };
}
async function push(now) {
  if (!API || !auth) return;
  clearTimeout(timer);
  const send = () => call(`/api/collections/users/records/${auth.record.id}`, { method: 'PATCH', body: JSON.stringify(summary(St.state())) })
    .then(r => { auth.record = { ...auth.record, ...r, state: undefined }; keep(); })
    .catch(e => { if (e.status === 401 || e.status === 404) signOut(); });
  if (now) return send();
  timer = setTimeout(send, 1500);
}
St.setSaver(() => push());
addEventListener('pagehide', () => { if (timer && auth) { clearTimeout(timer); fetch(API + `/api/collections/users/records/${auth.record.id}`, { method: 'PATCH', keepalive: true,
  headers: { 'content-type': 'application/json', Authorization: auth.token }, body: JSON.stringify(summary(St.state())) }).catch(() => {}); } });

// on app start: renew the sign-in (tokens last two weeks) and merge
export async function start() {
  if (!API || !auth) return;
  try { auth = await call('/api/collections/users/auth-refresh', { method: 'POST' }); keep(); await sync(); }
  catch (e) { if (e.status === 401 || e.status === 404) signOut(); }
}
