// Motion helpers shared by the home page, the quiz and the app. Everything checks prefers-reduced-motion.
export const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// .rv elements fade and rise in when they reach the screen
export function reveals(root = document) {
  const els = root.querySelectorAll('.rv:not(.in)');
  if (calm() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));
}

// give each child of .stg its position, so CSS can stagger them
export function stagger(el) { [...el.children].forEach((c, i) => c.style.setProperty('--i', i)); }

// numbers that count up
export function countUp(el, to, ms = 900) {
  if (calm()) { el.textContent = to; return; }
  const from = +(el.dataset.from || 0), t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
export function countAll(root = document) { root.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count)); }

// a burst of confetti from a point (defaults to the middle of the screen)
const COLORS = ['#FF5B2E', '#FFC23D', '#13877A', '#5B3F99', '#FF9A76', '#FFFFFF'];
export function confetti(x = innerWidth / 2, y = innerHeight * 0.4, n = 90) {
  if (calm()) return;
  const c = document.createElement('canvas'); c.className = 'confetti'; const dpr = Math.min(2, devicePixelRatio);
  c.width = innerWidth * dpr; c.height = innerHeight * dpr; document.body.appendChild(c);
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  const P = [...Array(n)].map(() => { const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .4, w: 6 + Math.random() * 6, h: 4 + Math.random() * 6, c: COLORS[(Math.random() * COLORS.length) | 0], round: Math.random() < .3 }; });
  const t0 = performance.now();
  (function f(now) {
    const t = now - t0; g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of P) { p.vy += 0.32; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      g.save(); g.globalAlpha = Math.max(0, 1 - t / 1900); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c;
      if (p.round) { g.beginPath(); g.arc(0, 0, p.w / 2.4, 0, 7); g.fill(); } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore(); }
    if (t < 1900) requestAnimationFrame(f); else c.remove();
  })(t0);
}
export function burstFrom(el, n = 40) { const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n); }

// swap a view's content with a soft slide; dir 1 = forward, -1 = back
export function swap(el, html, dir = 1, after) {
  const go = () => { el.innerHTML = html; after && after(); };
  if (calm()) return go();
  if (document.startViewTransition) { document.documentElement.dataset.dir = dir > 0 ? 'f' : 'b'; document.startViewTransition(go); return; }
  el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-24 * dir}px)` }], { duration: 140, easing: 'ease-in' }).onfinish = () => {
    go(); el.animate([{ opacity: 0, transform: `translateX(${24 * dir}px)` }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
  };
}
