// SavvyMe admin: sign in as a PocketBase superuser, then see who is learning, on which course and plan, and how their
// streaks are going. Reads the users collection only (never the progress blobs). The quiz funnel and lesson events
// live in PostHog; deeper edits (refunds, plan changes) in the PocketBase dashboard at /_/.
import { logo } from '../../shared/brand.js';
import { COURSES } from '../../shared/courses.js';
import { API } from '../../shared/config.js';
import { POSTHOG_KEY } from '../../shared/config.js';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
$('#logo').innerHTML = logo('../');
const TK = 'sm-admin';
let token = sessionStorage.getItem(TK) || '';

async function call(path, opt = {}) {
  const r = await fetch(API + path, { ...opt, headers: { 'content-type': 'application/json', ...(token ? { Authorization: token } : {}) } });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(d.message || 'Request failed'); e.status = r.status; throw e; }
  return d;
}

function login(msg = '') {
  $('#who').textContent = '';
  if (!API) { $('#view').innerHTML = `<div class="card login"><h1>Admin</h1><p class="muted">This page works on the live app host (app.your-domain/admin/), where the accounts server answers.</p></div>`; return; }
  $('#view').innerHTML = `<form class="card login" id="f"><h1>Admin sign in</h1><p class="muted">Use the PocketBase superuser email and password.</p>
    <input name="e" type="email" placeholder="Email" autocomplete="username" required><input name="p" type="password" placeholder="Password" autocomplete="current-password" required>
    <div class="err">${esc(msg)}</div><button class="btn primary block">Sign in</button></form>`;
  $('#f').onsubmit = async ev => {
    ev.preventDefault(); const d = new FormData(ev.target);
    try { const r = await call('/api/collections/_superusers/auth-with-password', { method: 'POST', body: JSON.stringify({ identity: d.get('e'), password: d.get('p') }) });
      token = r.token; sessionStorage.setItem(TK, token); load(); }
    catch { login('Wrong email or password.'); }
  };
}

const FIELDS = 'id,email,name,created,course,plan,sparks,streak,lessons,goal,last_day';
async function users() {
  const all = []; for (let page = 1; page < 200; page++) {
    const r = await call(`/api/collections/users/records?perPage=500&page=${page}&sort=-created&fields=${FIELDS}&skipTotal=1`);
    all.push(...r.items); if (r.items.length < 500) break;
  } return all;
}
const pad = n => String(n).padStart(2, '0');
const dk = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const ago = n => { const d = new Date(); d.setDate(d.getDate() - n); return dk(d); };
const bars = (rows, total) => `<div class="bars">${rows.map(([k, v]) => `<div><span>${esc(k)}</span><i style="width:${total ? Math.max(1, v / total * 100) : 0}%"></i><em>${v}</em></div>`).join('')}</div>`;

async function load() {
  $('#view').innerHTML = '<p class="muted">Loading…</p>';
  let U; try { U = await users(); } catch (e) { if (e.status === 401 || e.status === 403) { token = ''; sessionStorage.removeItem(TK); return login('Please sign in again.'); } $('#view').innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }
  $('#who').innerHTML = `<button class="btn ghost sm" id="out" style="padding:8px 14px;font-size:14px">Sign out</button>`;
  $('#out').onclick = () => { token = ''; sessionStorage.removeItem(TK); login(); };
  const today = dk(new Date()), wk = ago(6), joined = u => (u.created || '').slice(0, 10);
  const n = U.length, act1 = U.filter(u => u.last_day === today).length, act7 = U.filter(u => u.last_day >= wk).length;
  const new7 = U.filter(u => joined(u) >= wk).length, paying = U.filter(u => u.plan === 'pro' || u.plan === 'family').length;
  const byPlan = ['free', 'trial', 'pro', 'family'].map(p => [p, U.filter(u => (u.plan || 'free') === p).length]);
  const byCourse = COURSES.map(c => [c.title, U.filter(u => u.course === c.id).length]).concat([['No course yet', U.filter(u => !u.course).length]]);
  const buckets = [['No streak', 0, 0], ['1–2 days', 1, 2], ['3–6 days', 3, 6], ['7–29 days', 7, 29], ['30+ days', 30, 1e9]].map(([k, a, b]) => [k, U.filter(u => (u.streak || 0) >= a && (u.streak || 0) <= b).length]);
  const days = [...Array(14)].map((_, i) => { const k = ago(13 - i); return [k, U.filter(u => joined(u) === k).length]; }), dmax = Math.max(1, ...days.map(d => d[1]));
  $('#view').innerHTML = `<div class="top"><h1>Learners</h1><span class="muted">Updated ${new Date().toLocaleTimeString()}</span><button class="btn ghost" id="re" style="padding:8px 14px;font-size:14px">Refresh</button></div>
    <div class="links"><a href="/_/" target="_blank">PocketBase dashboard</a>${POSTHOG_KEY ? '<a href="https://us.posthog.com" target="_blank">PostHog (quiz funnel, lessons)</a>' : '<span class="muted">PostHog: add the project key in shared/config.js</span>'}</div>
    <div class="kpis">
      <div class="card kpi"><span>Learners</span><b>${n}</b><small>${new7} new this week</small></div>
      <div class="card kpi"><span>Learned today</span><b>${act1}</b><small>${n ? Math.round(act1 / n * 100) : 0}% of all</small></div>
      <div class="card kpi"><span>Active this week</span><b>${act7}</b><small>${n ? Math.round(act7 / n * 100) : 0}% of all</small></div>
      <div class="card kpi"><span>Paying</span><b>${paying}</b><small>${byPlan[1][1]} on trial</small></div>
      <div class="card kpi"><span>Lessons finished</span><b>${U.reduce((a, u) => a + (u.lessons || 0), 0)}</b><small>all learners</small></div>
    </div>
    <div class="grid2"><div class="card panel"><h2>Sign-ups, last 14 days</h2><div class="days">${days.map(([k, v]) => `<div title="${k}: ${v}"><i style="height:${v / dmax * 100}%"></i>${k.slice(8)}</div>`).join('')}</div></div>
      <div class="card panel"><h2>Streaks</h2>${bars(buckets, n)}</div></div>
    <div class="grid2"><div class="card panel"><h2>Courses</h2>${bars(byCourse, n)}</div><div class="card panel"><h2>Plans</h2>${bars(byPlan, n)}</div></div>
    <div class="card panel tbl"><h2>Newest learners</h2><table><thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Plan</th><th>Streak</th><th>Lessons</th><th>Sparks</th><th>Last active</th><th>Joined</th></tr></thead><tbody>
      ${U.slice(0, 100).map(u => `<tr><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${esc((COURSES.find(c => c.id === u.course) || {}).title || '')}</td><td><span class="pl">${esc(u.plan || 'free')}</span></td><td>${u.streak || 0}</td><td>${u.lessons || 0}</td><td>${u.sparks || 0}</td><td>${esc(u.last_day)}</td><td>${joined(u)}</td></tr>`).join('') || '<tr><td colspan="9" class="muted">No learners yet.</td></tr>'}
    </tbody></table></div>`;
  $('#re').onclick = load;
}
token ? load() : login();
