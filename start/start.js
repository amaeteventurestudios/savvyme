// The sign-up quiz at start.savvymeapp.com: about twenty short steps in four stages. It asks about you, lets you try
// three real things on the way (a jet engine, a circuit, a chatbot's next word), builds your plan, then offers Pro.
import { logo, link, icon } from '../shared/brand.js';
import { COURSES, GOALS, course } from '../shared/courses.js';
import { LESSONS } from '../shared/lessons.js';
import { encodeProfile } from '../shared/store.js';
import { stagger, burstFrom, confetti } from '../shared/motion.js';
import { track } from '../shared/analytics.js';

const $ = s => document.querySelector(s);
const STAGES = ['You', 'Try it', 'Your style', 'Your plan'];
const A = {};               // answers
let score = 0;              // right guesses on the three try-it steps
let engine = null;

const goalCourse = { ai: 'ai-explained', gadgets: 'electronics', machines: 'machines', car: 'car', home: 'home', made: 'made', travel: 'around', nature: 'nature' };

const STEPS = [
  { id: 'goals', stage: 0, type: 'multi', title: 'What do you want to get savvy about?', hint: 'Pick as many as you like.',
    opts: GOALS.map(g => ({ v: g.id, label: g.label, icon: g.icon })) },
  { id: 'why', stage: 0, type: 'single', title: 'What brings you here?',
    opts: [['curious', 'I\'m just curious how things work'], ['career', 'It could help my career'], ['kids', 'I want to learn with my kids'], ['build', 'I want to build something of my own'], ['scroll', 'I want to scroll less']] },
  { id: 'age', stage: 0, type: 'single', title: 'How old are you?', two: true,
    opts: [['u18', 'Under 18'], ['18', '18 to 24'], ['25', '25 to 34'], ['35', '35 to 44'], ['45', '45 to 54'], ['55', '55 or over']] },
  { id: 'rate', stage: 0, type: 'scale', title: 'How would you rate your tech know-how?', lo: 'Total beginner', hi: 'I build things' },
  { id: 'i1', stage: 0, type: 'info', big: '5 min', title: 'That\'s <span class="serif">all</span> it takes.', text: 'Short, hands-on sessions every day beat a long one once a week. Your brain keeps what it uses.' },

  { id: 'engine', stage: 1, type: 'engine', title: 'Quick test: which part makes most of the push?', hint: 'Tap a part on the engine, or pick below. Drag to turn it.' },
  { id: 'apart', stage: 1, type: 'single', title: 'Have you ever taken something apart to see how it works?',
    opts: [['yes', 'Yes, all the time'], ['once', 'Once or twice'], ['want', 'No, but I\'ve always wanted to'], ['no', 'No, never']] },
  { id: 'circuit', stage: 1, type: 'circuit', title: 'This LED is lit. What happens if we take out the resistor?' },
  { id: 'i2', stage: 1, type: 'info', art: 'hand', title: 'That\'s the <span class="serif">SavvyMe</span> way.', text: 'You don\'t just read about it. You try it, break it, and see why. Every lesson works like this.' },
  { id: 'word', stage: 1, type: 'word', title: 'Think like a chatbot. Which word comes next?' },

  { id: 'style', stage: 2, type: 'single', title: 'How do you like to learn something new?',
    opts: [['watch', 'Watch it first, then try'], ['tinker', 'Jump in and tinker'], ['both', 'A bit of both']] },
  { id: 'listen', stage: 2, type: 'single', title: 'Would you also listen to lessons, say on a walk or a drive?',
    opts: [['yes', 'Yes, I\'d love that'], ['some', 'Sometimes'], ['no', 'No, I like to look']] },
  { id: 'quit', stage: 2, type: 'multi', title: 'What made you stop learning things before?', hint: 'Be honest, we\'ve all been there.',
    opts: [['time', 'No time'], ['boring', 'It got boring'], ['hard', 'It got too hard too fast'], ['lost', 'I didn\'t know where to start'], ['forgot', 'I forgot what I learned'], ['none', 'Nothing, I just keep going']] },
  { id: 'when', stage: 2, type: 'single', title: 'When would you rather learn?', two: true,
    opts: [['morning', 'With my morning coffee'], ['lunch', 'On my lunch break'], ['commute', 'On the commute'], ['evening', 'In the evening'], ['bed', 'Before bed'], ['any', 'Any free moment']] },
  { id: 'minutes', stage: 2, type: 'single', title: 'How much time a day?', two: true,
    opts: [['5', '5 min, casual'], ['10', '10 min, regular'], ['15', '15 min, serious'], ['20', '20+ min, intense']] },
  { id: 'weekly', stage: 2, type: 'single', title: 'And how many days a week?', hint: 'This is your weekly goal. Hit it and your weekly streak grows, even if you miss a day.',
    opts: [['3', '3 days, easy going'], ['5', '5 days, steady'], ['7', 'Every day']] },

  { id: 'building', stage: 3, type: 'building' },
  { id: 'plan', stage: 3, type: 'plan' },
  { id: 'name', stage: 3, type: 'name' },
  { id: 'pay', stage: 3, type: 'pay' },
];

let i = 0, dir = 1;
const hist = [];

function progress() {
  const st = STEPS[i].stage;
  $('#prog').innerHTML = STAGES.map((s, k) => {
    const inStage = STEPS.filter(x => x.stage === k), at = inStage.indexOf(STEPS[i]);
    const pct = k < st ? 100 : k > st ? 0 : ((at + 1) / inStage.length) * 100;
    return `<div class="seg${k === st ? ' on' : ''}"><div class="bar"><i style="width:${pct}%"></i></div><div class="lab">${s}</div></div>`;
  }).join('');
  $('#back').hidden = i === 0 || STEPS[i].type === 'building';
}

function go(n) { if (engine) { engine.dispose(); engine = null; } if (n > i) hist.push(i); dir = n >= i ? 1 : -1; i = n; render(); scrollTo(0, 0); }
const next = () => go(i + 1);
$('#back').innerHTML = icon('back');
$('#back').onclick = () => { if (hist.length) { const p = hist.pop(); if (engine) { engine.dispose(); engine = null; } dir = -1; i = p; render(); } };
$('#logo').innerHTML = logo(link('home'));

const optBtn = (v, label, ic, multi) => `<button class="opt" data-v="${v}">${ic ? `<span class="ic">${icon(ic, 20)}</span>` : ''}<span>${label}</span>${multi ? `<span class="tick">${icon('check', 14)}</span>` : ''}</button>`;
const foot = (label = 'Continue', dis = false) => `<div class="foot"><button class="btn primary block" id="next"${dis ? ' disabled' : ''}>${label}</button></div>`;

function render() {
  const S = STEPS[i], m = $('#step');
  progress(); track('quiz_step', { step: S.id, n: i + 1, of: STEPS.length });
  m.classList.toggle('b', dir < 0); m.style.animation = 'none'; m.offsetHeight; m.style.animation = '';
  const head = S.title ? `<h1>${S.title}</h1>${S.hint ? `<p class="hint">${S.hint}</p>` : ''}` : '';
  const opts = (S.opts || []).map(o => Array.isArray(o) ? { v: o[0], label: o[1] } : o);

  if (S.type === 'single') {
    m.innerHTML = head + `<div class="opts${S.two ? ' two' : ''}">${opts.map(o => optBtn(o.v, o.label, o.icon)).join('')}</div>`;
    m.querySelectorAll('.opt').forEach(b => b.onclick = () => { m.querySelectorAll('.opt').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); A[S.id] = b.dataset.v; setTimeout(next, 220); });
    if (A[S.id]) m.querySelector(`[data-v="${A[S.id]}"]`)?.classList.add('sel');
  }
  if (S.type === 'multi') {
    const sel = new Set(A[S.id] || []);
    m.innerHTML = head + `<div class="opts">${opts.map(o => optBtn(o.v, o.label, o.icon, true)).join('')}</div>` + foot('Continue', !sel.size);
    const sync = () => { m.querySelectorAll('.opt').forEach(b => b.classList.toggle('sel', sel.has(b.dataset.v))); $('#next').disabled = !sel.size; };
    m.querySelectorAll('.opt').forEach(b => b.onclick = () => { const v = b.dataset.v; sel.has(v) ? sel.delete(v) : sel.add(v); if (v === 'none') { sel.clear(); sel.add('none'); } else sel.delete('none'); sync(); });
    sync(); $('#next').onclick = () => { A[S.id] = [...sel]; next(); };
  }
  if (S.type === 'scale') {
    m.innerHTML = head + `<div class="scale">${[1, 2, 3, 4, 5].map(n => `<button class="opt" data-v="${n}">${n}</button>`).join('')}</div><div class="scale-l"><span>${S.lo}</span><span>${S.hi}</span></div>`;
    m.querySelectorAll('.opt').forEach(b => b.onclick = () => { b.classList.add('sel'); A[S.id] = +b.dataset.v; setTimeout(next, 220); });
  }
  if (S.type === 'info') {
    m.innerHTML = `<div class="info">${S.big ? `<div class="big">${S.big}</div>` : `<div class="art">${icon(S.art || 'spark', 56)}</div>`}<h1>${S.title}</h1><p>${S.text}</p></div>` + foot('Got it');
    $('#next').onclick = next;
  }
  if (S.type === 'engine') stepEngine(m, head);
  if (S.type === 'circuit') stepCircuit(m, head);
  if (S.type === 'word') stepWord(m, head);
  if (S.type === 'building') stepBuilding(m);
  if (S.type === 'plan') stepPlan(m);
  if (S.type === 'name') stepName(m);
  if (S.type === 'pay') stepPay(m);
  // lists come in one after another
  m.querySelectorAll('.opts, .scale, .words').forEach(el => { el.classList.add('stg'); stagger(el); });
  m.querySelectorAll('.facts, .wk, .perks').forEach(stagger);
}
const cheer = el => el && burstFrom(el, 46);

// ---- try it 1: the jet engine (the big fan at the front makes most of the thrust in an airliner engine) ----
async function stepEngine(m, head) {
  const choices = [['fan', 'The big fan at the front'], ['compressor', 'The compressor'], ['combustor', 'The burner, where fuel burns'], ['nozzle', 'The exhaust at the back']];
  m.innerHTML = head + `<div class="stage"><span class="chip tagl">Live 3D</span><div id="eng" style="position:absolute;inset:0"></div></div>
    <div class="opts two" id="ch">${choices.map(([v, l]) => `<button class="opt center" data-v="${v}">${l}</button>`).join('')}</div><div id="rv"></div>`;
  const { mountEngine } = await import('../shared/engine3d.js');
  let answered = false;
  const answer = v => {
    if (answered) return; answered = true; A.engine = v; const ok = v === 'fan'; if (ok) score++; track('quiz_try', { step: 'engine', right: ok });
    m.querySelectorAll('#ch .opt').forEach(b => { b.classList.toggle('right', b.dataset.v === 'fan'); b.classList.toggle('wrong', b.dataset.v === v && !ok); b.disabled = true; });
    engine.open(true); engine.highlight('fan'); if (ok) cheer(m.querySelector('#ch [data-v="fan"]'));
    $('#rv').innerHTML = `<div class="reveal ${ok ? 'ok' : 'no'}"><b>${ok ? 'Spot on!' : 'Most people guess that.'}</b>In an airliner engine the big fan pushes about 80% of the air, and so most of the thrust. Watch the blue air flow around the core. Only a little goes through the fire.</div>` + foot();
    $('#next').onclick = next; $('#rv').scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  engine = mountEngine(m.querySelector('#eng'), { interactive: true, onPick: p => { engine.highlight(p); answer(p); } });
  m.querySelectorAll('#ch .opt').forEach(b => b.onclick = () => answer(b.dataset.v));
}

// ---- try it 2: an LED without its resistor ----
function stepCircuit(m, head) {
  const choices = [['brighter', 'It glows brighter, forever'], ['burn', 'It flashes and burns out'], ['off', 'It just turns off']];
  m.innerHTML = head + `<div class="card circ"><svg viewBox="0 0 360 200" id="cv">
    <defs><radialGradient id="glow"><stop offset="0" stop-color="#ff5a5f" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a5f" stop-opacity="0"/></radialGradient></defs>
    <path d="M60 60 H160 M220 60 H300 V150 H60 V60" fill="none" stroke="var(--muted)" stroke-width="4" stroke-linecap="round"/>
    <g id="flow" stroke="var(--brand)" stroke-width="4" stroke-dasharray="4 14" fill="none"><path d="M60 60 H160 M220 60 H300 V150 H60 V60"><animate attributeName="stroke-dashoffset" from="36" to="0" dur=".7s" repeatCount="indefinite"/></path></g>
    <g id="res"><rect x="160" y="49" width="60" height="22" rx="6" fill="#d9b382" stroke="#8a6a3e" stroke-width="2"/><rect x="172" y="49" width="6" height="22" fill="#6b3d1e"/><rect x="186" y="49" width="6" height="22" fill="#111"/><rect x="200" y="49" width="6" height="22" fill="#c92a2a"/></g>
    <rect x="40" y="88" width="40" height="44" rx="6" fill="var(--ink)"/><rect x="52" y="82" width="16" height="8" rx="2" fill="var(--ink)"/><text x="60" y="116" fill="var(--bg)" font-size="14" font-weight="800" text-anchor="middle">9V</text>
    <circle id="halo" cx="300" cy="104" r="40" fill="url(#glow)"/>
    <path id="led" d="M286 120 v-22 a14 14 0 0 1 28 0 v22 z" fill="#ff6b6b" stroke="#c92a2a" stroke-width="2"/>
    <g id="smoke" opacity="0"><circle cx="300" cy="78" r="9" fill="#9aa0b4"/><circle cx="292" cy="64" r="7" fill="#b7bccd"/><circle cx="306" cy="52" r="6" fill="#ccd0de"/></g>
  </svg></div><div class="opts" id="ch" style="margin-top:12px">${choices.map(([v, l]) => `<button class="opt center" data-v="${v}">${l}</button>`).join('')}</div><div id="rv"></div>`;
  m.querySelectorAll('#ch .opt').forEach(b => b.onclick = () => {
    const v = b.dataset.v, ok = v === 'burn'; if (ok) score++; A.circuit = v; track('quiz_try', { step: 'circuit', right: ok });
    m.querySelectorAll('#ch .opt').forEach(x => { x.disabled = true; x.classList.toggle('right', x.dataset.v === 'burn'); x.classList.toggle('wrong', x.dataset.v === v && !ok); });
    const res = $('#res'), led = $('#led'), halo = $('#halo'); if (ok) setTimeout(() => cheer(b), 1200);
    res.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-40px)', opacity: 0 }], { duration: 500, fill: 'forwards' });
    setTimeout(() => {
      $('#cv path').setAttribute('d', 'M60 60 H300 V150 H60 V60'); $('#flow path').setAttribute('d', 'M60 60 H300 V150 H60 V60');
      halo.animate([{ r: 40, opacity: 1 }, { r: 90, opacity: 1 }, { r: 10, opacity: 0 }], { duration: 700, fill: 'forwards' });
      halo.setAttribute('r', 10); led.animate([{ fill: '#ffd1d1' }, { fill: '#fff' }, { fill: '#444' }], { duration: 700, fill: 'forwards' });
      setTimeout(() => { led.setAttribute('fill', '#444'); halo.setAttribute('opacity', 0); $('#flow').setAttribute('opacity', 0); $('#smoke').animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(-8px)' }], { duration: 900, fill: 'forwards' }); }, 650);
    }, 450);
    setTimeout(() => {
      $('#rv').innerHTML = `<div class="reveal ${ok ? 'ok' : 'no'}"><b>${ok ? 'Exactly right.' : 'Pop! It burned out.'}</b>An LED barely slows the current down on its own. The resistor limits it. Take it out and too much current rushes through, and the LED dies in a flash.</div>` + foot();
      $('#next').onclick = next; $('#rv').scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 1500);
  });
}

// ---- try it 3: next-word odds, the way a chatbot picks ----
function stepWord(m, head) {
  const W = [['practice', 46], ['teach', 21], ['read', 17], ['fail', 9], ['sleep', 7]];
  m.innerHTML = head + `<p class="sentence">"The best way to learn something is to <u id="blank">&nbsp;</u>"</p>
    <div class="words" id="ch">${W.map(([w, p]) => `<button class="opt word" data-v="${w}" data-p="${p}"><span class="fill"></span><span>${w}</span><span class="pct">${p}%</span></button>`).join('')}</div><div id="rv"></div>`;
  m.querySelectorAll('#ch .opt').forEach(b => b.onclick = () => {
    const v = b.dataset.v, ok = v === 'practice'; if (ok) score++; A.word = v; track('quiz_try', { step: 'word', right: ok });
    m.querySelectorAll('#ch .opt').forEach(x => { x.disabled = true; x.classList.add('showp'); x.querySelector('.fill').style.width = x.dataset.p * 2 + '%'; if (x === b) x.classList.add('sel'); });
    $('#blank').textContent = 'practice'; $('#blank').animate([{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1.1)' }, { transform: 'none', opacity: 1 }], { duration: 500, easing: 'ease-out' }); if (ok) setTimeout(() => cheer(b), 300);
    setTimeout(() => {
      $('#rv').innerHTML = `<div class="reveal ${ok ? 'ok' : ''}"><b>${ok ? 'You think like a chatbot.' : 'Good pick, but the odds say "practice".'}</b>A chatbot doesn't look up answers. It scores every possible next word and picks from those odds, one word at a time. That's also why it sometimes says things that sound right but aren't.</div>` + foot();
      $('#next').onclick = next; $('#rv').scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 1100);
  });
}

// ---- your plan ----
function pickCourse() {
  const g = (A.goals || ['machines']).filter(x => goalCourse[x]);
  return goalCourse[g[0] || 'machines'];
}
function level() { const r = A.rate || 2; const s = r + score; return s >= 7 ? 'Advanced' : s >= 4 ? 'Intermediate' : 'Beginner'; }

function stepBuilding(m) {
  const items = ['Matching your goals', 'Setting your level', 'Picking your course', 'Laying out your first week', 'Setting your streak goal'];
  m.innerHTML = `<div class="build"><div class="ring"><svg width="150" height="150"><circle cx="75" cy="75" r="64" stroke="var(--line)" stroke-width="12" fill="none"/>
    <circle id="arc" cx="75" cy="75" r="64" stroke="var(--brand)" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="402" stroke-dashoffset="402"/></svg><b id="pc">0%</b></div>
    <h1>Building your plan</h1><ul>${items.map(t => `<li><i>${icon('check', 13)}</i>${t}</li>`).join('')}</ul></div>`;
  const lis = m.querySelectorAll('li'); let k = 0;
  const t = setInterval(() => {
    k++; const pct = Math.min(100, Math.round((k / items.length) * 100));
    $('#arc').style.transition = 'stroke-dashoffset .5s'; $('#arc').setAttribute('stroke-dashoffset', 402 * (1 - pct / 100)); $('#pc').textContent = pct + '%';
    lis[k - 1]?.classList.add('done');
    if (k >= items.length) { clearInterval(t); setTimeout(next, 700); }
  }, 600);
}

function stepPlan(m) {
  const c = course(pickCourse()); A.course = c.id; A.level = level(); track('quiz_plan', { course: c.id, level: A.level, score });
  const wk = c.lessons.slice(0, 7).map((id, d) => `<div><em>Day ${d + 1}</em>${LESSONS[id]?.title || id}</div>`).join('');
  const goalTxt = A.weekly === '7' ? 'Every day' : `${A.weekly || 5} days a week`;
  m.innerHTML = `<h1>Your plan is <span class="serif">ready</span></h1><p class="hint">Built from your answers. You can switch course any time.</p>
    <div class="plan notch" style="background:linear-gradient(135deg, ${c.color}, color-mix(in srgb, ${c.color} 55%, #141B2D))"><small>Your course · ${c.days} days</small><h2>${c.title}</h2><p>${c.outcome}</p><div class="lv"><span>Starts today</span><span>${c.units.length} units · ${c.lessons.length} lessons</span></div></div>
    <div class="facts"><div><b>${A.minutes || 5} min</b><span>a day</span></div><div><b>${goalTxt.split(' ')[0]}</b><span>${A.weekly === '7' ? '' : 'days a week'}</span></div><div><b>${A.level}</b><span>you got ${score}/3</span></div></div>
    <h3 style="margin:4px 0 8px">Your first week: ${c.units[0]}</h3><div class="wk">${wk}</div>` + foot('Continue');
  $('#next').onclick = next;
  setTimeout(() => confetti(innerWidth / 2, innerHeight * .28, 110), 350);
}

function stepName(m) {
  m.innerHTML = `<h1>What should we call you?</h1><p class="hint">So your streaks and certificates have your name on them.</p>
    <label class="field"><span>First name</span><input id="nm" autocomplete="given-name" maxlength="30" placeholder="Your first name" value="${A.name || ''}"></label>
    <p class="note">Accounts and email sign-in open at launch. For now your progress stays on this device.</p>` + foot('Continue', !A.name);
  const nm = $('#nm'); nm.oninput = () => { $('#next').disabled = !nm.value.trim(); };
  nm.onkeydown = e => { if (e.key === 'Enter' && nm.value.trim()) $('#next').click(); };
  $('#next').onclick = () => { A.name = nm.value.trim(); next(); };
}

function stepPay(m) {
  const c = course(A.course);
  let sel = 'year', monthly = false;
  const tiers = () => [
    { id: 'year', h: 'Pro yearly', amt: '$59.99/yr', p: '7 days free, then $1.15 a week, billed yearly', best: true },
    { id: 'month', h: 'Pro monthly', amt: '$9.99/mo', p: 'Cancel any time' },
    { id: 'week', h: 'Pro weekly', amt: '$2.99/wk', p: 'Cancel any time' },
    { id: 'free', h: 'Free', amt: '$0', p: 'The Discover feed and the first week of every course' },
  ];
  const draw = () => {
    m.innerHTML = `<div class="pw"><h1>${A.name ? A.name + ', get' : 'Get'} the whole course</h1><p class="hint">${c.title}: all ${c.lessons.length} lessons, plus every other course.</p>
      <ul class="perks">${['Every course, start to finish', 'Review that brings back what you missed', 'Listen mode and certificates', 'Daily, weekly and monthly streaks'].map(t => `<li>${icon('check', 18)}${t}</li>`).join('')}</ul>
      ${tiers().map(t => `<button class="tier${sel === t.id ? ' sel' : ''}" data-v="${t.id}">${t.best ? '<span class="chip">Best value</span>' : ''}<div class="row"><h3>${t.h}</h3><span class="amt">${t.amt}</span></div><p>${t.p}</p></button>`).join('')}
      <button class="btn primary block" id="buy">${sel === 'free' ? 'Start learning free' : sel === 'year' ? 'Start my 7-day free trial' : sel === 'week' ? 'Get Pro weekly' : 'Get Pro monthly'}</button>
      <p class="note">One-tap cancel. 14-day refund on web purchases. No ads.</p>
      <p class="note" style="margin-top:14px"><a href="#" id="free">Not now, continue with Free</a></p></div>`;
    m.querySelectorAll('.tier').forEach(b => b.onclick = () => { sel = b.dataset.v; track('plan_pick', { plan: sel }); draw(); });
    $('#buy').onclick = () => finish(sel === 'free' ? 'free' : 'trial', sel !== 'free');
    $('#free').onclick = e => { e.preventDefault(); finish('free'); };
  };
  draw();
}

function finish(plan, showNote) {
  const profile = { name: A.name, goals: A.goals, why: A.why, age: A.age, rate: A.rate, level: A.level, course: A.course,
    style: A.style, listen: A.listen, when: A.when, minutes: +(A.minutes || 5), weeklyGoal: +(A.weekly || 5), quit: A.quit, plan, joined: Date.now() };
  track('quiz_finish', { plan, tier: plan === 'free' ? 'free' : 'trial', course: A.course });
  const go = () => { location.href = link('app', '#p=' + encodeProfile(profile)); };
  if (showNote) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = 'Checkout opens at launch. For this preview, Pro is on us. Nobody is charged.';
    document.body.appendChild(t); setTimeout(go, 2200);
  } else go();
}

render();
window.__start = { go, A, steps: STEPS.map(s => s.id) };
