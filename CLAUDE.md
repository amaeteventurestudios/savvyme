# SavvyMe: working notes for Claude Code

A daily learning app, phone first: 5-minute hands-on 3D lessons in real courses, with streaks. Read `docs/HANDOFF.md` first.

## Conventions
- Static site, no build step. Three.js r160 vendored in `vendor/three/`; never load it from a CDN.
- Three parts on three hosts: home `savvymeapp.com` (`index.html`), quiz `start.` (`start/`), app `app.` (`app/`). On any
  other host they live at `/`, `/start/`, `/app/`. Always link with `link('start' | 'app' | 'home')` from `shared/brand.js`.
  Pages use relative paths (`../shared/...`) so they work both ways.
- The quiz and the app are different origins, so the quiz hands the profile to the app in the link (`#p=...`).
- Lessons are the Amaete lesson pages, opened in the player's frame. After changing `shared/courses.js` run
  `node tools/lessons.mjs` (needs ../build, ../circuits and ../cutaways next to this repo) to rewrite `shared/lessons.js`.
  Circuits lessons have no quiz of their own: their checks live in `tools/checks.mjs`.
- Money in US dollars for now; no weekly plans, one-tap cancel, no ads, no fake timers or made-up scores.
- Public content never mentions USG companies or Palasora. Real place names are fine.
- Phone first: check 390×844 and 1280×800, light and dark. Respect prefers-reduced-motion.

## Testing
Serve the repo root, then screenshot with Playwright. `window.__start.go(n)` jumps the quiz to step n;
`window.__savvy` has `play(id, courseId)`, `go(tab)` and `St` (the store; `St.demo()` fills a few weeks of streak).
