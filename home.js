import { logo, link, icon } from './shared/brand.js';
import { COURSES } from './shared/courses.js';
import { PRICES, PRO } from './shared/prices.js';
import { reveals, countAll, calm } from './shared/motion.js';
import { track } from './shared/analytics.js';

const $ = s => document.querySelector(s);
$('#logo').innerHTML = logo('#top');
$('#flogo').innerHTML = logo('#top');
document.querySelectorAll('.go').forEach(a => { a.href = link('start'); a.addEventListener('click', () => track('start_click', { from: a.closest('section, header')?.className || 'page' })); });
$('#login').href = link('app');
const head = $('#top');
const onScroll = () => head.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const F = [['play', 'Hands-on 3D', 'Every lesson is a live model you can turn, open and break. Not a video.', '#FF5B2E'],
  ['book', 'Real courses', 'Seven courses that build day by day, from machines and how things are made to electronics and AI.', '#5B3F99'],
  ['flame', 'Five minutes a day', 'Short enough for a coffee break. Long enough to actually stick.', '#B7791F'],
  ['share', 'Listen on the go', 'Every lesson is narrated. Listen mode works with your phone in your pocket.', '#13877A']];
$('#feats').innerHTML = F.map(([i, h, p, c], k) => `<div class="card feat notch rv" style="--d:${k}"><div class="ic" style="background:${c}">${icon(i, 24, i === 'flame')}</div><h3>${h}</h3><p>${p}</p></div>`).join('');

const chips = COURSES.map(c => `<span style="background:${c.color}">${icon(c.icon, 16)} ${c.title}</span>`).join('');
$('#marq').innerHTML = chips + chips;

$('#courseList').innerHTML = COURSES.map((c, k) => `<div class="card course rv" style="--c:${c.color};--d:${k % 4}"><div class="ic">${icon(c.icon, 22)}</div>
  <h3>${c.title}</h3><p>${c.blurb}</p><div class="meta"><span>${c.days} days</span><span>${c.units.length} units</span><span>${c.lessons.length} lessons</span></div></div>`).join('');
const cl = $('#courseList');
cl.insertAdjacentHTML('afterend', `<div class="dots" id="cdots">${COURSES.map((_, k) => `<i class="${k ? '' : 'on'}"></i>`).join('')}</div>`);
cl.addEventListener('scroll', () => { const w = cl.firstElementChild.offsetWidth + 12, k = Math.round(cl.scrollLeft / w); document.querySelectorAll('#cdots i').forEach((d, j) => d.classList.toggle('on', j === k)); }, { passive: true });
// a gentle 3D tilt on desktop
if (!calm() && matchMedia('(hover: hover)').matches) document.querySelectorAll('.course, .feat').forEach(el => {
  el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`; });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

$('#prices').innerHTML = PRICES.map((p, k) => `<div class="card price rv${p.best ? ' best' : ''}" style="--d:${k}">${p.best ? '<span class="chip best">Best value</span>' : ''}
  <h3>${p.name}</h3>${p.best ? `<div class="bill" role="tablist">${PRO.map(b => `<button role="tab" data-b="${b.id}" class="${b.id === 'year' ? 'on' : ''}"><span>${b.label}</span><b>${b.show}</b>${b.save ? `<em>${b.save}</em>` : ''}</button>`).join('')}</div>` : ''}
  <div class="amt">${p.show}<small>${p.per}</small></div><div class="muted note" style="min-height:1.5em">${p.note}</div>
  <ul>${p.items.map(i => `<li>${icon('check', 18)}<span>${i}</span></li>`).join('')}</ul>
  <a class="btn ${p.best ? 'primary' : 'ghost'} block" href="${link('start')}">${p.cta}</a></div>`).join('');
const PR = [['x', 'One-tap cancel', 'No calls, no hoops.'], ['check', '14-day refund', 'On web purchases.'], ['lock', 'No ads', 'Not in lessons, not anywhere.'], ['spark', 'Pay your way', 'Weekly, monthly or yearly.']];
$('#promise').innerHTML = PR.map(([i, b, s], k) => `<div class="rv" style="--d:${k}">${icon(i, 22)}<b>${b}</b><span>${s}</span></div>`).join('');

// Pro: pick weekly, monthly or yearly; the price rolls to the new amount
const best = document.querySelector('.price.best');
best.querySelectorAll('.bill button').forEach(btn => btn.onclick = () => {
  const b = PRO.find(x => x.id === btn.dataset.b);
  best.querySelectorAll('.bill button').forEach(x => x.classList.toggle('on', x === btn));
  const amt = best.querySelector('.amt'); amt.innerHTML = `${b.show}<small>${b.per}</small>`;
  amt.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.2,.8,.2,1)' });
  best.querySelector('.note').textContent = b.note; best.querySelector('.btn').textContent = b.cta;
});

reveals();
// count the phone's numbers up when it shows
const ph = $('#phone');
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { countAll(ph); o.disconnect(); } }, { threshold: .4 }).observe(ph);

// the live engine, only once it is on screen
const stage = $('#eng');
new IntersectionObserver(async ([e], o) => {
  if (!e.isIntersecting) return; o.disconnect();
  const { mountEngine } = await import('./shared/engine3d.js');
  const E = mountEngine(stage, { dark: true }); setTimeout(() => E.open(true), 1600);
  let open = true; setInterval(() => { if (!document.hidden) { open = !open; E.open(open); } }, 7000);
}).observe(stage);
