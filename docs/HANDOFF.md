# SavvyMe handoff

## What it is
A SmartyMe-style daily learning app made from what we already built. The difference: every lesson is a live 3D model
(turn it, break it, fix it), and the content is real courses, not random facts. US market first.

## Built (prototype, 2 Nov 2026)
- Home page with a live 3D jet engine, courses, pricing, promises and FAQ.
- Sign-up quiz (20 steps, 4 stages: You, Try it, Your style, Your plan). Three tries teach while they ask: which part of
  a jet engine makes the push (the fan), what happens to an LED without its resistor, a chatbot's next-word odds.
  Then the plan (course, first week, level from the tries) and the Pro offer. Checkout is not live: Pro is free in the preview.
- App: Today (hook question, daily lesson, week strip, daily/weekly/monthly streaks, level), Discover (one themed lesson a
  day: Mon AI, Tue machines, Wed circuits, Thu everyday wonders, Fri build it, Sat nature, Sun fix-it challenge),
  Courses (7 courses, weekly units, free = first unit), Workshop (shelf of finished lessons), Me (settings).
- Player: hook, the lesson page in a frame, three checks, then Sparks, streak and a share card.
- Progress is stored in the browser for now (`shared/store.js`).

## Courses
How machines work (30) · How things are made (21) · Electronics from zero (30) · AI, explained (30) ·
Smart home and gadgets (30) · Build your own software (30) · Become an AI builder (90).

## Plans
Free (Discover, first week of every course, streaks) · Pro $2.99/week, $9.99/month or $59.99/year (7-day trial on yearly) ·
Family $89.99/year for 5. Stripe through the Noveniqe account (as Agent Grand Prix), web first.

## Accounts, analytics, admin (3 Nov 2026)
- **Accounts:** SavvyMe's own PocketBase (0.40.5) on the server at 127.0.0.1:8196, reached through the app host at
  `/api` (and its dashboard at `/_/`). Learners are the built-in `users` collection (server/pb_migrations): the whole
  progress blob in `state`, plus copies for the admin page (course, sparks, streak, lessons, goal, last_day, quiz).
  `plan` is billing truth: server/pb_hooks/plan.pb.js stops learners setting it; Stripe will set it as a superuser.
- **Sign-in through Onyx (11 Nov 2026):** the Me tab offers Continue with Google or a 6-digit email code, through Onyx, the studio's shared accounts (one account across its apps, shown as SavvyMe). `server/pb_hooks/onyx.pb.js` + `onyx_lib.js` talk to Onyx on 127.0.0.1:8200 with SavvyMe's client secret (`/etc/savvyme-onyx.env`, made from Onyx's `/etc/novenique/clients/savvyme.env` by `server/install.sh`) and hand the app the same `{ token, record }` a password sign-in gives. The account is found by `onyx_id`, then by email (Onyx shares the verified email with SavvyMe, `share_email` in Onyx's clients.json), else made. An older password account with that email keeps its progress; its unproven password is replaced. Password sign-in stays under "I made an account with a password". Test: `PB_BIN=... node tools/onyx-test.mjs` (needs ../onyx).
- **Sign-in:** email and password in the app's Me tab (shared/account.js, plain fetch). Progress always stays in the
  browser too; on sign-in and on every app start the two copies merge (store.js `merge`: days, courses, shelf and
  reviews are unions, so nothing finished on either device is lost). Email codes and Google/Apple sign-in need SMTP
  and OAuth keys first.
- **PostHog:** shared/analytics.js, switched on by the project key in shared/config.js (empty = off). Events:
  `start_click` (home), `quiz_step`, `quiz_try`, `quiz_plan`, `plan_pick`, `quiz_finish` (quiz), `lesson_start`,
  `lesson_finish`, `paywall_view`, `trial_start`, `signup`, `login` (app), plus page views. One cookie across the
  subdomains so a visitor is the same person from start. to app.; no session recordings.
- **Admin:** app.<domain>/admin/ (app/admin): sign in with the PocketBase superuser (repo secrets PB_ADMIN_EMAIL and
  PB_ADMIN_PASSWORD). Learners, learned today, active this week, paying, lessons finished, sign-ups for 14 days,
  streaks, courses, plans, newest 100. The quiz funnel lives in PostHog.
- **Backups:** nightly SQLite copy to /var/backups/savvyme on the server, 14 days kept.
- **Local test:** run PocketBase with `--http 127.0.0.1:8196 --migrationsDir server/pb_migrations --hooksDir
  server/pb_hooks`, then in the browser `localStorage['sm-api'] = 'http://127.0.0.1:8196'`.

## Next
1. Email codes (SMTP, e.g. a free transactional mail plan) and Google/Apple sign-in.
2. Stripe checkout and the Customer portal (copy the Agent Grand Prix pass code).
3. Lesson pages: an `?embed` mode that hides their own menus inside the player, and a 5-minute cut (a `daily` field).
4. Spaced review with ts-fsrs (MIT), push reminders, the home-screen streak widget.
5. Teardowns lessons once that site is hosted; fix-it challenges; weekly leagues.
6. Capacitor (MIT) wrappers for the App Store and Google Play.

## Deploy
SavvyMe deploys from the **noveniqe** repo (workflow "SavvyMe (deploy)"), like Jisste and Isoteh: it uses the server
secrets noveniqe already has, checks this repo's main every 30 minutes and deploys what changed. This repo needs no
secrets; its own deploy.yml only runs by hand. Optional noveniqe secrets SAVVYME_ADMIN_EMAIL and SAVVYME_ADMIN_PASSWORD
set the admin sign-in. It always answers on savvyme.<IP with dashes>.sslip.io.
The chosen home (6 Nov 2026, was savvyme.noveniqe.com) is **savvyme.amaete.com** (the default): one A record (DNS only)
for `savvyme` in the amaete.com zone (Cloudflare) pointing at the server; the next run adds it to Caddy by itself. A subdomain like this serves
everything on one host: home at /, quiz at /start/, app at /app/, accounts at /api, admin at /app/admin/.
A full domain of its own (savvymeapp.com) would instead get start. and app. hosts.
