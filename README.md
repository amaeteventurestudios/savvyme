# SavvyMe

Get savvy about how the world works, five minutes a day. Each daily lesson is a live 3D model from the Amaete lesson
sites (Build, Circuits, Cutaways): turn it, break it, fix it, answer three checks, keep your streak.

- `index.html`: the home page (savvymeapp.com)
- `start/`: the sign-up quiz (start.savvymeapp.com): about twenty steps in four stages, three hands-on tries
  (a 3D jet engine, an LED circuit, a chatbot's next word), the plan, then the Pro offer (no charges yet)
- `app/`: the app (app.savvymeapp.com): Today, Discover, Courses, Workshop, Me, and the lesson player
- `shared/`: look, logo and links (`brand.js`), courses (`courses.js`), lesson data (`lessons.js`, generated),
  opening questions (`hooks.js`), progress and streaks (`store.js`), the 3D engine (`engine3d.js`), plans (`prices.js`)

Static site, no build step. Three.js r160 is vendored in `vendor/three/`. Serve the folder (`python3 -m http.server`)
and open `/`, `/start/` and `/app/`. Deploys to the shared Oracle server on every push to main
(`.github/workflows/deploy.yml`, `server/install.sh`). Read `docs/HANDOFF.md` before changing anything.
