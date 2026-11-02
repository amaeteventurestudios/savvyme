// The SavvyMe app: Today, Discover, Courses, Workshop and Me, plus the 5-minute lesson player.
import { logo, link, icon, theme } from '../shared/brand.js';
import { COURSES, WEEK, course } from '../shared/courses.js';
import { LESSONS } from '../shared/lessons.js';
import { HOOKS } from '../shared/hooks.js';
import * as St from '../shared/store.js';

const $ = s => document.querySelector(s);
const S = St.state;
const L = id => LESSONS[id] || { title: id, url: '#', checks: [], site: 'build' };
const SITE = { build: ['Build', 'spark'], circuits: ['Circuits', 'bolt'], cutaways: ['Cutaways', 'gear'] };
const hook = id => HOOKS[id] || L(id).blurb || L(id).title;
const courseOf = id => COURSES.find(c => c.lessons.includes(id));
const colorOf = id => (courseOf(id) || {}).color || '#5B4CF0';
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
function draw() { tabs(); ({ today, discover, courses, workshop, me })[tab](); }

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
  v.innerHTML = `<div class="top"><h1>${hi}${p.name ? ', ' + esc(p.name) : ''}</h1>
      <span class="pill fire${s.daily ? '' : ' off'}" title="Daily streak">${icon('flame', 18, true)}${s.daily}</span><span class="pill spark" title="Sparks">${icon('spark', 16, true)}${S().sparks}</span></div>
    <div class="card weekstrip">${wk.map(d => `<div class="d${d.on ? ' on' : ''}${d.today ? ' today' : ''}"><i>${icon('check', 14)}</i>${d.label}</div>`).join('')}
      <div class="goal"><b>${s.weekDays}/${s.goal}</b>this week</div></div>
    ${id ? `<div class="hero" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 55%, #000))">
      <small>${c.title} · Day ${n + 1} of ${c.lessons.length} · ${c.units[Math.floor(n / 7)] || ''}</small>
      <h2>${hook(id)}</h2><p>${L(id).title} · about 5 min</p>
      ${doneToday ? `<div class="done">${icon('check', 20)} Today's lesson done. Want another?</div><p></p>` : ''}
      <button class="btn" id="go">${lock ? icon('lock', 18) + ' Unlock with Pro' : icon('play', 18, true) + (doneToday ? ' Keep going' : ' Start today\'s lesson')}</button></div>`
      : `<div class="hero" style="background:${c.color}"><small>${c.title}</small><h2>Course complete!</h2><p>Your certificate is on its way. Pick your next course.</p><button class="btn" id="go">Choose a course</button></div>`}
    <div class="streaks"><div class="card">${icon('flame', 20, true)}<b>${s.daily}</b><span>day streak</span></div><div class="card"><b>${s.weekly}</b><span>week streak</span></div><div class="card"><b>${s.monthly}</b><span>month streak</span></div></div>
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
    const id = discoverPick(w, 0), c = id ? colorOf(id) : '#2B2D42';
    return `<button class="fc" ${id ? `data-play="${id}"` : ''} style="background:linear-gradient(160deg, ${c}, color-mix(in srgb, ${c} 50%, #000))">
      <small>${k === 0 ? 'Today' : w.day} · ${w.theme}</small><div><h2>${id ? hook(id) : 'Fix-it challenge: a broken machine arrives'}</h2><span>${id ? L(id).title : 'Find the fault against the clock. Opens at launch.'}</span></div>
      <span>${id ? (k === 0 ? 'Tap to open · free' : 'Free on ' + w.day) : 'Sunday'}</span></button>`;
  }).join('');
  v.innerHTML = `<div class="top"><h1>Discover</h1></div><p class="muted" style="margin-top:-6px">One free lesson a day, on a different theme each day of the week.</p><div class="feed">${cards}</div>`;
  v.querySelectorAll('[data-play]').forEach((b, k) => b.onclick = () => { if (k > 0 && !St.pro()) return toast('That one opens on its day. Pro opens them all.'); play(b.dataset.play, null); });
}

// ---- Courses ----
function courses() {
  const v = $('#view');
  if (sub) return courseDetail(sub);
  v.innerHTML = `<div class="top"><h1>Courses</h1></div><div class="clist">${COURSES.map(c => {
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
    <div class="hero" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 55%, #000))"><small>${c.days} days · ${c.lessons.length} lessons</small><h2>${c.title}</h2><p>${c.outcome}</p>
    ${S().active === cid ? '<div class="done">' + icon('check', 20) + ' This is your course</div>' : '<button class="btn" id="pick">Make this my course</button>'}</div>${units}`;
  $('#bk').onclick = () => { sub = null; draw(); };
  $('#pick') && ($('#pick').onclick = () => { St.startCourse(cid); toast(`${c.title} is now your course.`); draw(); });
  v.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (St.locked(c, i)) return upsell(); play(c.lessons[i], cid); });
}

// ---- Workshop: everything you've finished, on a shelf ----
function workshop() {
  const v = $('#view'), sh = S().shelf;
  v.innerHTML = `<div class="top"><h1>Your workshop</h1><span class="pill">${sh.length}</span></div>
    ${sh.length ? `<p class="muted" style="margin-top:-6px">Every machine, circuit and model you've finished. Tap one to replay it.</p><div class="shelf">${sh.map(id => {
      const l = L(id), c = colorOf(id); return `<button class="item" data-play="${id}" style="background:linear-gradient(150deg, ${c}, color-mix(in srgb, ${c} 55%, #000))">${icon(SITE[l.site][1], 26)}<b>${l.title}</b></button>`; }).join('')}</div>`
    : `<div class="empty"><div class="art">${icon('shelf', 40)}</div><b>Your shelf is empty</b><p>Finish a lesson and its machine lands here.</p></div>`}`;
  v.querySelectorAll('[data-play]').forEach(b => b.onclick = () => play(b.dataset.play, null, true));
}

// ---- Me ----
function me() {
  const v = $('#view'), p = S().profile, lv = St.level(), s = St.streaks();
  const plan = S().plan === 'free' ? 'Free' : S().plan === 'trial' ? 'Pro (preview)' : 'Pro';
  v.innerHTML = `<div class="card me"><div class="av">${esc((p.name || 'S')[0].toUpperCase())}</div><div><b style="font-size:19px">${esc(p.name || 'Savvy learner')}</b><div class="muted">Level ${lv.n}: ${lv.name} · ${S().sparks} Sparks</div><span class="badge">${plan}</span></div></div>
    <div class="streaks"><div class="card">${icon('flame', 20, true)}<b>${s.daily}</b><span>days</span></div><div class="card"><b>${s.weekly}</b><span>weeks</span></div><div class="card"><b>${s.monthly}</b><span>months</span></div></div>
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
    <p class="muted" style="font-size:13px;margin-top:14px">Accounts are coming: for now your progress is saved on this device only.</p>`;
  try { $('#th').value = localStorage.getItem('sm-theme') || ''; } catch {}
  $('#th').onchange = e => { try { localStorage.setItem('sm-theme', e.target.value); } catch {} theme(e.target.value || null); };
  $('#goal').onchange = e => { St.setProfile({ weeklyGoal: +e.target.value }); draw(); };
  $('#demo').onclick = () => { St.demo(); toast('Filled 3 weeks of practice days.'); draw(); };
  $('#rst').onclick = () => { if (confirm('Reset all your progress on this device?')) { St.reset(); location.reload(); } };
  $('#pro') && ($('#pro').onclick = upsell);
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
  const color = (c && c.color) || '#5B4CF0';
  const close = () => { P.hidden = true; P.innerHTML = ''; document.body.style.overflow = ''; draw(); };
  const bar = n => `<div class="pbar"><button class="x" id="px" aria-label="Close">${icon('x')}</button><div class="steps">${[0, 1, 2, 3].map(k => `<i class="${k <= n ? 'on' : ''}"></i>`).join('')}</div><span style="width:40px"></span></div>`;
  if (paywall) {
    P.innerHTML = `<div class="pbar"><button class="x" id="px">${icon('x')}</button><span style="flex:1"></span></div><div class="pbody"><div class="pin"><div class="hook">
      <div class="art" style="width:90px;height:90px;border-radius:28px;margin:0 auto 16px;display:grid;place-items:center;background:var(--soft);color:var(--brand)">${icon('lock', 40)}</div>
      <h1>Unlock every course</h1><p>Free gives you the first week of every course. Pro opens them all, start to finish.</p></div>
      <div class="card" style="padding:16px;margin:18px 0"><b>Pro yearly · $59.99</b><div class="muted">7 days free, then $5 a month billed yearly. Or $9.99 a month.</div></div>
      <button class="btn primary block" id="pp">Start my 7-day free trial</button><p class="muted" style="text-align:center;font-size:13px">Checkout opens at launch. In this preview Pro is free and nobody is charged.</p></div></div>`;
    $('#px').onclick = close; $('#pp').onclick = () => { St.setProfile({ plan: 'trial' }); S().plan = 'trial'; St.save(); toast('Pro is on for this preview.'); close(); };
    return;
  }
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
      P.innerHTML = bar(2) + `<div class="pbody"><div class="pin q"><span class="chip">Check ${qi + 1} of ${checks.length}</span><h2>${q.q}</h2><div id="opts">${q.a.map((a, k) => `<button class="opt" data-k="${k}">${a}</button>`).join('')}</div><div id="why"></div></div></div>`;
      P.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.ok; if (ok) right++;
        P.querySelectorAll('.opt').forEach(x => { x.disabled = true; x.classList.toggle('right', +x.dataset.k === q.ok); x.classList.toggle('wrong', +x.dataset.k === k && !ok); });
        $('#why').innerHTML = `<div class="why"><b style="color:var(--${ok ? 'ok' : 'bad'})">${ok ? 'Right!' : 'Not quite.'}</b>${q.why || ''}</div><button class="btn primary block" id="nx">${qi + 1 < checks.length ? 'Next' : 'Finish'}</button>`;
        $('#nx').onclick = () => { qi++; if (qi >= checks.length) step = 3; scene(); };
        $('#why').scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
    if (step === 3) {
      const out = St.finish(id, cid || (c && S().active === c.id ? c.id : null), right, checks.length);
      const s = out.after;
      const msg = out.milestone ? `${out.milestone}-day streak!` : out.first ? (s.daily > 1 ? `${s.daily} days in a row!` : 'Streak started!') : 'Nice work!';
      P.innerHTML = bar(3) + `<div class="pbody"><div class="pin"><div class="res"><div class="flame">${icon('flame', 110, true)}</div><h1>${msg}</h1>
        <p class="muted">${checks.length ? `${right} of ${checks.length} right. ` : ''}${l.title} is on your shelf.${right < checks.length ? ' The ones you missed come back for review.' : ''}</p>
        <div class="gain"><span class="pill spark">${icon('spark', 16, true)} +${out.sparks} Sparks</span><span class="pill fire">${icon('flame', 16, true)} ${s.daily} day${s.daily === 1 ? '' : 's'}</span><span class="pill">${s.weekDays}/${s.goal} this week</span></div>
        <div class="sharecard" style="background:linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 55%, #000))"><small>I learned on SavvyMe today</small><b>${hook(id)}</b><span>${l.title} · in 5 minutes</span></div>
        <div style="display:flex;gap:10px"><button class="btn ghost" id="sh" style="flex:1">${icon('share', 18)} Share</button><button class="btn primary" id="nx" style="flex:1">Done</button></div></div></div></div>`;
      $('#sh').onclick = async () => { const t = `I learned "${hook(id)}" on SavvyMe in 5 minutes.`; const u = link('home');
        try { if (navigator.share) await navigator.share({ title: 'SavvyMe', text: t, url: u }); else { await navigator.clipboard.writeText(t + ' ' + u); toast('Copied, paste it anywhere.'); } } catch {} };
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
window.__savvy = { play, St, go: t => { tab = t; sub = null; draw(); } };
