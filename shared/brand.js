// Logo, icons and the links between the three parts of SavvyMe:
// savvymeapp.com (home), start.savvymeapp.com (sign-up quiz) and app.savvymeapp.com (the app).
// On any other host (a preview, localhost) the same parts live at /, /start/ and /app/.

export const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="9" fill="#141B2D" stroke="#F6F1E7" stroke-opacity=".28" stroke-width="1.2"/>
<path d="M9 21.5l7 4 7-4v-8l-7-4-7 4z" fill="none" stroke="#F6F1E7" stroke-width="2" stroke-linejoin="round"/>
<path d="M9 13.5l7 4 7-4M16 17.5v8" fill="none" stroke="#F6F1E7" stroke-width="2" stroke-linejoin="round"/>
<circle cx="16" cy="6.2" r="2.4" fill="#FF5B2E"/></svg>`;
export const logo = (href = link('home')) => `<a class="logo" href="${href}">${LOGO}<span>savvy<b>me</b></span></a>`;

const PARTS = ['start', 'app'];
export function link(part, hash = '') {
  const h = location.hostname;
  const m = h.match(/^(start|app|www)\.(.+)$/);
  const base = m ? m[2] : h;
  const own = /(^|\.)savvymeapp\.com$/.test(base) || /\.sslip\.io$/.test(base);
  if (own) return `${location.protocol}//${part === 'home' ? '' : part + '.'}${base}${location.port ? ':' + location.port : ''}/${hash}`;
  const root = location.pathname.replace(/\/(start|app)\/.*$/, '/').replace(/[^/]*$/, '');
  return `${root}${part === 'home' ? '' : part + '/'}${hash}`;
}
export const isPart = p => PARTS.includes(p);

const I = {
  spark: '<path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  hand: '<path d="M7 11V5.5a1.5 1.5 0 013 0V11m0-1V4a1.5 1.5 0 013 0v6m0 0V5.5a1.5 1.5 0 013 0V13c0 5-3 8-7 8s-6-2.5-7.5-6L4 12a1.5 1.5 0 012.6-1.4L8 13"/>',
  wifi: '<path d="M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0"/><circle cx="12" cy="19.5" r="1"/>',
  code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/>',
  flame: /* Lucide (ISC) */ '<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 002.5 2.5z"/>',
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
  book: '<path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z"/>',
  shelf: '<path d="M3 20h18M3 14h18M5 14V8h4v6M11 14V5h3v9M16 14l2-7 3 1-2 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  play: '<path d="M7 4.5v15l13-7.5z"/>',
  share: '<path d="M12 3v13M7 8l5-5 5 5M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  snow: '<path d="M12 2v20M4 6.5l16 11M20 6.5l-16 11"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H4a3 3 0 003 4M16 6h4a3 3 0 01-3 4M12 13v4M8 21h8M9 21l1-4h4l1 4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>',
};
export const icon = (n, size = 22, fill = false) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;

export function theme(t) {
  try { if (t) localStorage.setItem('sm-theme', t); t = t || localStorage.getItem('sm-theme'); } catch {}
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
}
theme();
