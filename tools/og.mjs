// Makes og.png (1200x630), the image shown when someone shares a SavvyMe link.
// Serve the repo root first (python3 -m http.server 8811), then: node tools/og.mjs [base-url]
// It shoots the home page's hero with the live jet engine, without the buttons and the numbers.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const base = process.argv[2] || 'http://localhost:8811/';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(base, { waitUntil: 'load' });
await p.addStyleTag({ content: `
  header nav, .ctas, .proof, .tag.t2, .grain, .wave, .htext .chip { display: none !important; }
  .hl path { stroke-dashoffset: 0 !important; animation: none !important; }
  .rv { opacity: 1 !important; transform: none !important; }
  html, body { overflow: hidden !important; }
  header .wrap, .hero .wrap { max-width: 1200px !important; padding-left: 64px !important; padding-right: 56px !important; }
  .hero { min-height: 630px !important; height: 630px !important; padding: 0 !important; display: flex; align-items: center; }
  .hgrid { grid-template-columns: 1.08fr .92fr !important; align-items: center !important; gap: 24px !important; }
  .hero h1 { font-size: 76px !important; line-height: .98 !important; margin: 40px 0 20px !important; }
  .hero .lead { font-size: 22px !important; max-width: 520px !important; margin: 0 !important; }
  header { position: absolute !important; top: 0; left: 0; right: 0; padding-top: 40px !important; background: none !important; }
  .og-url { margin-top: 26px; font: 700 20px 'Plus Jakarta Sans', sans-serif; color: #FF5B2E; letter-spacing: .01em; }
` });
await p.evaluate(() => {
  const d = document.createElement('div'); d.className = 'og-url'; d.textContent = 'savvyme.amaete.com';
  document.querySelector('.hero .lead').after(d);
  document.querySelector('.hero .lead').textContent = 'A real 3D machine in your hands, five minutes a day. Turn it, break it, fix it.';
});
await p.waitForTimeout(6000);
await p.screenshot({ path: 'og.png' });
await b.close();
console.log('og.png written');
