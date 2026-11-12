// The SavvyMe app: Today, Discover, Courses, Workshop and Me, plus the 5-minute lesson player.
import { logo, link, icon, theme } from '../shared/brand.js';
import { COURSES, WEEK, course } from '../shared/courses.js';
import { LESSONS } from '../shared/lessons.js';
import { HOOKS } from '../shared/hooks.js';
import * as St from '../shared/store.js';
import { stagger, countAll, confetti, burstFrom, calm } from '../shared/motion.js';
import * as Acc from '../shared/account.js';
import { track, who } from '../shared/analytics.js';

const $ = s => document.querySelector(s);
const S = St.state;
const L = id => LESSONS[id] || { title: id, url: '#', checks: [], site: 'build' };
const SITE = { build: ['AI and code', 'spark'], circuits: ['Electronics', 'bolt'], cutaways: ['Machines', 'gear'] };
const hook = id => HOOKS[id] || L(id).blurb || L(id).title;
const courseOf = id => COURSES.find(c => c.lessons.includes(id));
const colorOf = id => (courseOf(id) || {}).color || '#3E2A6B';
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); }

// profile handed over from the quiz (different host, so it rides in the link)
const hp = location.hash.match(/#p=([^&]+)/);
if (hp) { const p = St.decodeProfile(hp[1]); if (p) St.setProfile(p); history.replaceState(null, '', location.pathname + location.search); }

const TABS = [['today', 'Today', 'home'], ['discover', 'Discover', 'compass'], ['courses', 'Courses', 'book'], ['workshop', 'Workshop', 'shelf'], ['me', 'Me', 'user']];
let tab = 'today', sub = null;
function tabs() {
  $('#tabs').innerHTML = logo(link('home')) + TABS.map(([id, label, ic]) => `<button class="${tab === id ? 'on' : ''}" data-t="${id}">${icon(ic, 22)}<span>${label}</span></button>`).join('');
  $('#tabs').querySelectorAll('button').forEach(b => b.onclick = () => { tab = b.dataset.t; sub = null; draw(); scrollTo(0, 0); });
}
let last = null;
function draw() {
  tabs(); const v = $('#view'), key = tab + (sub || '');
  ({ today, discover, courses, workshop, me })[tab]();
  // a fresh view rises in piece by piece and its numbers count up; a redraw of the same view stays still
  if (key !== last) { v.classList.remove('stg'); v.offsetHeight; v.classList.add('stg'); stagger(v); countAll(v); }
  else v.querySelectorAll('[data-count]').forEach(el => el.textContent = el.dataset.count);
  last = key;
}

// ---- Today ----
function today() {
  const v = $('#view'), s = St.streaks(), p = S().profile, lv = St.level();
  if (!S().active) {
    v.innerHTML = `<div class="welcome"><div class="empty"><div class="art">${icon('spark', 40)}</div></div><h1>Welcome to SavvyMe</h1>
      <p class="muted">Take the 2-minute quiz and we'll build your course plan, or just pick a course and start.</p>
      <p><a class="btn primary" href="${link('start')}">Take the quiz</a></p><p><button class="btn ghost" id="pick">Browse courses</button></p></div>`;
    $('#pick').onclick = () => { tab = 'courses'; draw(); }; return;
  }
  const c = course(S().active), n = St.nextIndex(c.id), id = c.lessons[n], doneToday = s.today;
  const hr = new Date().getHours(), hi = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  const wk = St.week();
  const lock = id && St.locked(c, n);
  v.innerHTML = `<div class="top hi"><h1>${hi}${p.name ? `, <span class="serif">${esc(p.name)}</span>` : ''}</h1>
      <div class="pills"><span class="pill fire${s.daily ? '' : ' off'}" title="Daily streak">${icon('flame', 18, true)}<span data-count="${s.daily}">${s.daily}</span></span><span class="pill spark" title="Sparks">${icon('spark', 16, true)}<span data-count="${S().sparks}">${S().sparks}</span></span></div></div>
    <div class="card weekstrip">${wk.map((d, k) => `<div style="--i:${k}" class="d${d.on ? ' on' : ''}${d.today ? ' today' : ''}"><i>${icon('check', 14)}</i>${d.label}</div>`).join('')}
      <div class="goal"><b>${s.weekDays}/${s.goal}</b>this week</div></div>
    ${id ? `<div class="hero notch" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 55%, #000))">
      <small>${c.title} · Day ${n + 1} of ${c.lessons.length} · ${c.units[Math.floor(n / 7)] || ''}</small>
      <h2>${hook(id)}</h2><p>${L(id).title} · about 5 min</p>
      ${doneToday ? `<div class="done">${icon('check', 20)} Today's lesson done. Want another?</div><p></p>` : ''}
      <button class="btn" id="go">${lock ? icon('lock', 18) + ' Unlock with Pro' : icon('play', 18, true) + (doneToday ? ' Keep going' : ' Start today\'s lesson')}</button></div>`
      : `<div class="hero" style="background:${c.color}"><small>${c.title}</small><h2>Course complete!</h2><p>Your certificate is on its way. Pick your next course.</p><button class="btn" id="go">Choose a course</button></div>`}
    <div class="streaks"><div class="card">${icon('flame', 20, true)}<b data-count="${s.daily}">${s.daily}</b><span>day streak</span></div><div class="card">${icon('calendar', 20)}<b data-count="${s.weekly}">${s.weekly}</b><span>week streak</span></div><div class="card">${icon('trophy', 20)}<b data-count="${s.monthly}">${s.monthly}</b><span>month streak</span></div></div>
    <div class="card lvl"><div class="t"><span>Level ${lv.n}: ${lv.name}</span><span class="muted">${lv.next ? `${S().sparks} / ${lv.next} Sparks` : 'Top level'}</span></div><div class="meter"><i style="width:${Math.round(lv.pct * 100)}%"></i></div></div>
    <div class="row2">${reviewTile()}${discoverTile()}</div>`;
  $('#go').onclick = () => { if (!id) { tab = 'courses'; draw(); } else if (lock) upsell(); else play(id, c.id); };
  v.querySelectorAll('[data-play]').forEach(b => b.onclick = () => play(b.dataset.play, null));
  v.querySelector('[data-tab]')?.addEventListener('click', e => { tab = e.currentTarget.dataset.tab; draw(); });
}
function reviewTile() {
  const due = S().reviews.filter(r => r.due <= St.dayKey());
  if (due.length) return `<button class="tile" data-play="${due[0].id}"><small>Review</small><b>${L(due[0].id).title}</b><span>A few questions came back</span></button>`;
  return `<button class="tile" data-tab="workshop"><small>Workshop</small><b>${S().shelf.length} on your shelf</b><span>Everything you've finished</span></button>`;
}
const todayTheme = () => WEEK[new Date().getDay()];
function discoverPick(w = todayTheme(), salt = 0) { if (!w.pool) return null; const d = Math.floor(Date.now() / 864e5); return w.pool[(d + salt) % w.pool.length]; }
function discoverTile() {
  const w = todayTheme(), id = discoverPick(w);
  if (!id) return `<button class="tile" data-tab="discover"><small>Sunday · ${w.theme}</small><b>Fix a broken machine</b><span>Coming at launch</span></button>`;
  return `<button class="tile" data-play="${id}"><small>Discover · ${w.theme}</small><b>${L(id).title}</b><span>Free, every day</span></button>`;
}

// ---- Discover: one themed lesson a day, swipe through the week ----
function discover() {
  const v = $('#view'), today = new Date().getDay();
  const cards = [...Array(7)].map((_, k) => WEEK[(today + k) % 7]).map((w, k) => {
    const id = discoverPick(w, 0), c = id ? colorOf(id) : '#1F2A44';
    return `<button class="fc" ${id ? `data-play="${id}"` : ''} style="background:linear-gradient(160deg, ${c}, color-mix(in srgb, ${c} 50%, #141B2D))">
      <small>${k === 0 ? 'Today' : w.day} · ${w.theme}</small><div><h2>${id ? hook(id) : 'Fix-it challenge: a broken machine arrives'}</h2><span>${id ? L(id).title : 'Find the fault against the clock. Opens at launch.'}</span></div>
      <span>${id ? (k === 0 ? 'Tap to open · free' : 'Free on ' + w.day) : 'Sunday'}</span></button>`;
  }).join('');
  v.innerHTML = `<div class="top"><h1>Discover</h1></div><p class="muted sub">One free lesson a day, on a different theme each day of the week.</p><div class="feed">${cards}</div>`;
  v.querySelectorAll('[data-play]').forEach((b, k) => b.onclick = () => { if (k > 0 && !St.pro()) return toast('That one opens on its day. Pro opens them all.'); play(b.dataset.play, null); });
}

// ---- Courses ----
function courses() {
  const v = $('#view');
  if (sub) return courseDetail(sub);
  v.innerHTML = `<div class="top"><h1>Courses</h1></div><p class="muted sub">Each day builds on the last. Pick one as your course.</p><div class="clist">${COURSES.map(c => {
    const d = St.doneIn(c.id).length;
    return `<button class="card cc" data-c="${c.id}"><span class="ic" style="background:${c.color}">${icon(c.icon, 24)}</span><span class="tx"><b>${c.title} ${S().active === c.id ? '<span class="badge">Your course</span>' : ''}</b>
      <span>${c.days} days · ${c.units.length} units</span><div class="meter"><i style="width:${(d / c.lessons.length) * 100}%;background:${c.color}"></i></div></span></button>`;
  }).join('')}</div>`;
  v.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sub = b.dataset.c; draw(); scrollTo(0, 0); });
}
function courseDetail(cid) {
  const c = course(cid), v = $('#view'), done = St.doneIn(cid), nx = St.nextIndex(cid);
  const units = c.units.map((u, k) => {
    const ls = c.lessons.slice(k * 7, k * 7 + 7); if (!ls.length) return '';
    return `<div class="unit"><h4>Unit ${k + 1} · ${u}</h4>${ls.map((id, j) => { const i = k * 7 + j, isDone = done.includes(id), lock = St.locked(c, i);
      return `<button class="ll${isDone ? ' done' : ''}${i === nx && S().active === cid ? ' next' : ''}${lock ? ' lock' : ''}" data-i="${i}"><span class="n">${isDone ? icon('check', 14) : i + 1}</span><span class="t">${L(id).title}</span><span class="end">${lock ? icon('lock', 16) : ''}</span></button>`; }).join('')}</div>`;
  }).join('');
  v.innerHTML = `<button class="back" id="bk">${icon('back', 18)} Courses</button>
    <div class="hero notch" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 55%, #000))"><small>${c.days} days · ${c.lessons.length} lessons</small><h2>${c.title}</h2><p>${c.outcome}</p>
    ${S().active === cid ? '<div class="done">' + icon('check', 20) + ' This is your course</div>' : '<button class="btn" id="pick">Make this my course</button>'}</div>${units}`;
  $('#bk').onclick = () => { sub = null; draw(); };
  $('#pick') && ($('#pick').onclick = () => { St.startCourse(cid); toast(`${c.title} is now your course.`); draw(); });
  v.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (St.locked(c, i)) return upsell(); play(c.lessons[i], cid); });
}

// ---- Workshop: everything you've finished, on a shelf ----
function workshop() {
  const v = $('#view'), sh = S().shelf;
  v.innerHTML = `<div class="top"><h1>Your workshop</h1><span class="pill">${sh.length}</span></div>
    ${sh.length ? `<p class="muted sub">Every machine, circuit and model you've finished. Tap one to replay it.</p><div class="shelf">${sh.map(id => {
      const l = L(id), c = colorOf(id); return `<button class="item" data-play="${id}" style="background:linear-gradient(150deg, ${c}, color-mix(in srgb, ${c} 55%, #000))">${icon(SITE[l.site][1], 26)}<b>${l.title}</b></button>`; }).join('')}</div>`
    : `<div class="empty"><div class="art">${icon('shelf', 40)}</div><b>Your shelf is empty</b><p>Finish a lesson and its machine lands here.</p></div>`}`;
  v.querySelectorAll('[data-play]').forEach(b => b.onclick = () => play(b.dataset.play, null, true));
}

// ---- Me ----
function me() {
  const v = $('#view'), p = S().profile, lv = St.level(), s = St.streaks();
  const plan = S().plan === 'free' ? 'Free' : S().plan === 'trial' ? 'Pro (preview)' : 'Pro';
  v.innerHTML = accountCard() + `<div class="card me"><div class="av">${esc((p.name || 'S')[0].toUpperCase())}</div><div><b style="font-size:19px">${esc(p.name || 'Savvy learner')}</b><div class="muted">Level ${lv.n}: ${lv.name} · ${S().sparks} Sparks</div><span class="badge">${plan}</span></div></div>
    <div class="streaks"><div class="card">${icon('flame', 20, true)}<b data-count="${s.daily}">${s.daily}</b><span>days</span></div><div class="card">${icon('calendar', 20)}<b data-count="${s.weekly}">${s.weekly}</b><span>weeks</span></div><div class="card">${icon('trophy', 20)}<b data-count="${s.monthly}">${s.monthly}</b><span>months</span></div></div>
    <div class="card lvl"><div class="t"><span>${icon('trophy', 16)} Weekly league</span><span class="muted">Opens at launch</span></div><div class="muted" style="font-size:14px">Groups of about 20 learners, ranked by Sparks each week. You can turn it off.</div></div>
    <h3 class="sec">Settings</h3>
    <div class="card set">
      <div><span class="k">Weekly goal</span><select id="goal">${[3, 4, 5, 6, 7].map(n => `<option value="${n}"${(p.weeklyGoal || 5) === n ? ' selected' : ''}>${n} days</option>`).join('')}</select></div>
      <div><span class="k">Theme</span><select id="th"><option value="">Match my phone</option><option value="light">Light</option><option value="dark">Dark</option></select></div>
      <div><span class="k">Streak freezes left this week</span><b>${S().freezes}</b></div>
      ${S().plan === 'free' ? `<div><span class="k">Go Pro</span><button class="s" id="pro">See plans</button></div>` : ''}
      <div><span class="k">Retake the quiz</span><a class="s btn ghost" style="padding:8px 12px;font-size:15px" href="${link('start')}">Start</a></div>
      <div><span class="k">Preview: fill a few weeks of streak</span><button class="s" id="demo">Fill</button></div>
      <div><span class="k">Reset my progress</span><button class="s" id="rst">Reset</button></div>
    </div>
    ${Acc.enabled() ? '' : '<p class="muted" style="font-size:13px;margin-top:14px">Accounts are coming: for now your progress is saved on this device only.</p>'}`;
  try { $('#th').value = localStorage.getItem('sm-theme') || ''; } catch {}
  $('#th').onchange = e => { try { localStorage.setItem('sm-theme', e.target.value); } catch {} theme(e.target.value || null); };
  $('#goal').onchange = e => { St.setProfile({ weeklyGoal: +e.target.value }); draw(); };
  $('#demo').onclick = () => { St.demo(); toast('Filled 3 weeks of practice days.'); draw(); };
  $('#rst').onclick = () => { if (confirm('Reset all your progress on this device?')) { St.reset(); location.reload(); } };
  $('#pro') && ($('#pro').onclick = upsell);
  wireAccount();
}

// ---- account: save progress to the server so it follows you to any device ----
// Sign-in is through Onyx (Google or an email code, one account across the studio's apps) when the server has it on;
// older email and password accounts still sign in with "Use a password instead".
let mode = 'up';
const ox = { on: null, step: 'start', email: '', ticket: '', suggest: '', pw: false };
function onyxCard() {
  const p = S().profile;
  if (ox.step === 'code') return `<form class="card acct" id="oxf"><b>Check your email</b>
    <p class="muted">We sent a 6-digit code to ${esc(ox.email)}. It works for 10 minutes.</p>
    <input name="code" inputmode="numeric" autocomplete="one-time-code" placeholder="6-digit code" maxlength="7" required>
    <div class="err" id="aerr" role="alert"></div>
    <button class="btn primary block" id="ago">Sign in</button>
    <button type="button" class="link" id="oxback">Use a different email</button></form>`;
  if (ox.step === 'profile') return `<form class="card acct" id="oxf"><b>One last thing</b>
    <p class="muted">Pick the name people see, and an @handle. You can change them later.</p>
    <input name="name" autocomplete="given-name" placeholder="Your name" maxlength="40" required value="${esc(ox.suggest || p.name || '')}">
    <input name="handle" autocomplete="username" placeholder="@handle" maxlength="21" required pattern="@?[A-Za-z0-9_]{3,20}">
    <div class="err" id="aerr" role="alert"></div>
    <button class="btn primary block" id="ago">Save my progress</button></form>`;
  return `<form class="card acct" id="oxf"><b>Save your progress</b>
    <p class="muted">Sign in and your streak and Sparks follow you to any phone or computer. We'll merge this device's progress.</p>
    <a class="btn ghost block oxg" href="${Acc.googleUrl('/app/')}">${GOOGLE} Continue with Google</a>
    <div class="or"><span>or</span></div>
    <input name="email" type="email" autocomplete="email" placeholder="Email" required value="${esc(ox.email)}">
    <div class="err" id="aerr" role="alert"></div>
    <button class="btn primary block" id="ago">Email me a code</button>
    <button type="button" class="link" id="oxpw">I made an account with a password</button></form>`;
}
const GOOGLE = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
function signedIn(u, how) {
  ox.step = 'start'; ox.ticket = ''; who(u.id, { course: S().active, plan: S().plan }); track(how);
  toast('Signed in. Your progress is saved.'); draw();
}
function wireOnyx() {
  const f = $('#oxf'); if (!f) return;
  $('#oxpw') && ($('#oxpw').onclick = () => { ox.pw = true; mode = 'in'; draw(); });
  $('#oxback') && ($('#oxback').onclick = () => { ox.step = 'start'; draw(); });
  f.onsubmit = async e => {
    e.preventDefault(); const d = new FormData(f), b = $('#ago'); b.disabled = true; $('#aerr').textContent = '';
    try {
      if (ox.step === 'start') { ox.email = String(d.get('email')).trim(); await Acc.emailCode(ox.email); ox.step = 'code'; draw(); $('#oxf input')?.focus(); return; }
      const r = ox.step === 'code' ? await Acc.emailVerify(ox.email, d.get('code')) : await Acc.profile(ox.ticket, String(d.get('name')), String(d.get('handle')));
      if (r.needs_profile) { ox.step = 'profile'; ox.ticket = r.ticket; ox.suggest = r.suggest || ''; draw(); return; }
      signedIn(r.user, 'login_email');
    } catch (err) { $('#aerr').textContent = err.message; b.disabled = false; }
  };
}
function accountCard() {
  if (!Acc.enabled()) return `<div class="card acct"><b>${icon('lock', 18)} Your progress is saved on this device</b><p class="muted">Accounts open at launch, so your streak can follow you to any phone or computer.</p></div>`;
  const u = Acc.user();
  if (!u && ox.on && !ox.pw) return onyxCard();
  if (u) return `<div class="card acct on"><b>${icon('check', 18)} Saved to your account</b><p class="muted">${esc(u.email)} · your streak follows you to any device.</p><button class="btn ghost sm" id="out">Sign out</button></div>`;
  const p = S().profile;
  return `<form class="card acct" id="af"><b>${mode === 'up' ? 'Save your progress' : 'Welcome back'}</b>
    <p class="muted">${mode === 'up' ? 'Make a free account so your streak and Sparks follow you to any device.' : 'Sign in and we\'ll merge this device\'s progress with your account.'}</p>
    ${mode === 'up' ? `<input name="name" autocomplete="given-name" placeholder="First name" value="${esc(p.name || '')}" maxlength="60">` : ''}
    <input name="email" type="email" autocomplete="email" placeholder="Email" required>
    <input name="password" type="password" autocomplete="${mode === 'up' ? 'new-password' : 'current-password'}" placeholder="Password (8 or more characters)" minlength="8" required>
    <div class="err" id="aerr" role="alert"></div>
    <button class="btn primary block" id="ago">${mode === 'up' ? 'Create my free account' : 'Sign in'}</button>
    ${ox.on ? '<button type="button" class="link" id="oxnew">Back to Google or an email code</button>' : `<button type="button" class="link" id="aswap">${mode === 'up' ? 'I already have an account' : 'New here? Make an account'}</button>`}</form>`;
}
function wireAccount() {
  $('#out') && ($('#out').onclick = () => { Acc.signOut(); who(null); toast('Signed out. Your progress stays on this device too.'); draw(); });
  wireOnyx();
  const f = $('#af'); if (!f) return;
  $('#aswap') && ($('#aswap').onclick = () => { mode = mode === 'up' ? 'in' : 'up'; draw(); });
  $('#oxnew') && ($('#oxnew').onclick = () => { ox.pw = false; draw(); });
  f.onsubmit = async e => {
    e.preventDefault(); const d = new FormData(f), b = $('#ago'); b.disabled = true; $('#aerr').textContent = '';
    try {
      const u = mode === 'up' ? await Acc.signUp(d.get('email'), d.get('password'), d.get('name')) : await Acc.signIn(d.get('email'), d.get('password'));
      who(u.id, { course: S().active, plan: S().plan }); track(mode === 'up' ? 'signup' : 'login');
      toast(mode === 'up' ? 'Account made. Your progress is saved.' : 'Signed in. Progress merged.'); draw();
    } catch (err) { $('#aerr').textContent = err.message; b.disabled = false; }
  };
}

function upsell() {
  play(null, null, false, true);
}

// ---- the lesson player: hook, the live lesson, three checks, then the streak ----
const P = $('#player');
function play(id, cid, replay = false, paywall = false) {
  P.hidden = false; document.body.style.overflow = 'hidden';
  let step = 0, right = 0;
  const l = id && L(id), checks = l ? l.checks : [];
  const c = cid ? course(cid) : courseOf(id || '');
  const color = (c && c.color) || '#3E2A6B';
  const close = () => { P.hidden = true; P.innerHTML = ''; document.body.style.overflow = ''; draw(); };
  const bar = n => `<div class="pbar"><button class="x" id="px" aria-label="Close">${icon('x')}</button><div class="steps">${[0, 1, 2, 3].map(k => `<i class="${k <= n ? 'on' : ''}"></i>`).join('')}</div><span style="width:40px"></span></div>`;
  if (paywall) {
    track('paywall_view');
    P.innerHTML = `<div class="pbar"><button class="x" id="px">${icon('x')}</button><span style="flex:1"></span></div><div class="pbody"><div class="pin"><div class="hook">
      <div class="art" style="width:90px;height:90px;border-radius:28px;margin:0 auto 16px;display:grid;place-items:center;background:var(--soft);color:var(--brand)">${icon('lock', 40)}</div>
      <h1>Unlock every course</h1><p>Free gives you the first week of every course. Pro opens them all, start to finish.</p></div>
      <div class="card" style="padding:16px;margin:18px 0"><b>Pro yearly · $59.99</b><div class="muted">7 days free, then $1.15 a week, billed yearly. Or $9.99 a month, or $2.99 a week.</div></div>
      <button class="btn primary block" id="pp">Start my 7-day free trial</button><p class="muted" style="text-align:center;font-size:13px">Checkout opens at launch. In this preview Pro is free and nobody is charged.</p></div></div>`;
    $('#px').onclick = close; $('#pp').onclick = () => { track('trial_start', { from: 'paywall' }); St.setProfile({ plan: 'trial' }); S().plan = 'trial'; St.save(); toast('Pro is on for this preview.'); close(); };
    return;
  }
  track('lesson_start', { lesson: id, course: c && c.id, replay });
  const scene = () => {
    if (step === 0) {
      P.innerHTML = bar(0) + `<div class="pbody"><div class="pin"><div class="hook"><span class="chip src">${icon(SITE[l.site][1], 15)} ${SITE[l.site][0]}${c ? ' · ' + c.title : ''}</span>
        <h1>${hook(id)}</h1><p>${l.title}. Open it, play the story, then try breaking something.</p></div>
        <button class="btn primary block" id="nx" style="margin-top:22px">${icon('play', 18, true)} Open it</button></div></div>`;
    }
    if (step === 1) {
      P.innerHTML = bar(1) + `<div class="frame"><div class="load">Opening ${esc(l.title)}…</div><iframe src="${l.url}" allow="autoplay; fullscreen; xr-spatial-tracking" title="${esc(l.title)}"></iframe></div>
        <div class="fbar"><span class="tip">Tap Play, turn it, try Break it. Done exploring?</span><button class="btn primary" id="nx" style="padding:12px 18px">${checks.length ? 'Quick check' : 'I\'m done'}</button></div>`;
    }
    if (step === 2) {
      const q = checks[qi];
      // a fixed shuffle per question (seeded by its text), so the right answer isn't always in the same place
      let seed = [...q.q].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
      const order = q.a.map((_, k) => k);
      for (let i = order.length - 1; i > 0; i--) { seed = (seed * 1103515245 + 12345) >>> 0; const j = seed % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
      P.innerHTML = bar(2) + `<div class="pbody"><div class="pin q"><span class="chip">Check ${qi + 1} of ${checks.length}</span><h2>${q.q}</h2><div id="opts">${order.map(k => `<button class="opt" data-k="${k}">${q.a[k]}</button>`).join('')}</div><div id="why"></div></div></div>`;
      P.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.ok; if (ok) right++;
        if (ok) burstFrom(b, 36);
        P.querySelectorAll('.opt').forEach(x => { x.disabled = true; x.classList.toggle('right', +x.dataset.k === q.ok); x.classList.toggle('wrong', +x.dataset.k === k && !ok); });
        $('#why').innerHTML = `<div class="why"><b style="color:var(--${ok ? 'ok' : 'bad'})">${ok ? 'Right!' : 'Not quite.'}</b>${q.why || ''}</div><button class="btn primary block" id="nx">${qi + 1 < checks.length ? 'Next' : 'Finish'}</button>`;
        $('#nx').onclick = () => { qi++; if (qi >= checks.length) step = 3; scene(); };
        $('#why').scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
    if (step === 3) {
      const out = St.finish(id, cid || (c && S().active === c.id ? c.id : null), right, checks.length);
      const s = out.after;
      track('lesson_finish', { lesson: id, course: c && c.id, right, total: checks.length, streak: s.daily, first_today: out.first });
      const msg = out.milestone ? `${out.milestone}-day streak!` : out.first ? (s.daily > 1 ? `${s.daily} days in a row!` : 'Streak started!') : 'Nice work!';
      P.innerHTML = bar(3) + `<div class="pbody"><div class="pin"><div class="res"><div class="flame">${icon('flame', 110, true)}</div><h1>${msg}</h1>
        <p class="muted">${checks.length ? `${right} of ${checks.length} right. ` : ''}${l.title} is on your shelf.${right < checks.length ? ' The ones you missed come back for review.' : ''}</p>
        <div class="gain"><span class="pill spark">${icon('spark', 16, true)} +${out.sparks} Sparks</span><span class="pill fire">${icon('flame', 16, true)} ${s.daily} day${s.daily === 1 ? '' : 's'}</span><span class="pill">${s.weekDays}/${s.goal} this week</span></div>
        <div class="sharecard notch" style="background:linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 55%, #000))"><small>I learned on SavvyMe today</small><b>${hook(id)}</b><span>${l.title} · in 5 minutes</span></div>
        <div style="display:flex;gap:10px"><button class="btn ghost" id="sh" style="flex:1">${icon('share', 18)} Share</button><button class="btn primary" id="nx" style="flex:1">Done</button></div></div></div></div>`;
      $('#sh').onclick = async () => { const t = `I learned "${hook(id)}" on SavvyMe in 5 minutes.`; const u = link('home');
        try { if (navigator.share) await navigator.share({ title: 'SavvyMe', text: t, url: u }); else { await navigator.clipboard.writeText(t + ' ' + u); toast('Copied, paste it anywhere.'); } } catch {} };
      setTimeout(() => confetti(innerWidth / 2, innerHeight * .3, out.milestone ? 160 : 110), 250);
      $('#nx').onclick = close; $('#px').onclick = close; return;
    }
    $('#px').onclick = close;
    const nx = $('#nx'); if (nx) nx.onclick = () => { if (step === 1 && !checks.length) step = 3; else step++; scene(); };
  };
  let qi = 0;
  scene();
}

const esc = s => String(s || '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
addEventListener('keydown', e => { if (e.key === 'Escape' && !P.hidden) $('#px')?.click(); });
draw();
// signed in on this device: renew the sign-in, merge with the server's copy, then redraw with the merged progress
if (Acc.user()) { who(Acc.user().id); Acc.start().then(() => draw()); }
// sign-in through Onyx: is it on here, and are we coming back from Google (#signin=, #profile=)?
Acc.onyxOn().then(on => { ox.on = on; if (on && !Acc.user() && tab === 'me') draw(); });
(() => {
  const h = new URLSearchParams(location.hash.slice(1)), t = h.get('signin'), pr = h.get('profile');
  if (!t && !pr) return;
  history.replaceState(null, '', location.pathname + location.search);
  if (t === 'failed' || t === 'off') { toast(t === 'off' ? 'Sign-in opens soon.' : 'Sign-in didn\'t finish. Please try again.'); return; }
  if (pr) { ox.on = true; ox.step = 'profile'; ox.ticket = pr; tab = 'me'; draw(); return; }
  Acc.claim(t).then(r => r.needs_profile ? (ox.step = 'profile', ox.ticket = r.ticket, tab = 'me', draw()) : signedIn(r.user, 'login_google'))
    .catch(e => toast(e.message));
})();
window.__savvy = { play, St, go: t => { tab = t; sub = null; draw(); } };
