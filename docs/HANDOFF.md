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
AI, explained (30) · Electronics from zero (30) · How machines work (30) · How things are made (21) ·
Smart home and gadgets (30) · Build your own software (30) · Become an AI builder (90).

## Plans
Free (Discover, first week of every course, streaks) · Pro $9.99/month or $59.99/year with a 7-day trial ·
Family $89.99/year for 5. Stripe through the Noveniqe account (as Agent Grand Prix), web first.

## Next
1. Accounts and progress on the shared Noveniqe backend (sign-in, sync between quiz, app and phones).
2. Stripe checkout and the Customer portal (copy the Agent Grand Prix pass code).
3. Lesson pages: an `?embed` mode that hides their own menus inside the player, and a 5-minute cut (a `daily` field).
4. Spaced review with ts-fsrs (MIT), push reminders, the home-screen streak widget.
5. Teardowns lessons once that site is hosted; fix-it challenges; weekly leagues.
6. Capacitor (MIT) wrappers for the App Store and Google Play.

## Deploy
Push to main deploys to the shared Oracle server. Needs the repo secrets SERVER_HOST, SERVER_USER, SERVER_SSH_KEY.
Without a domain it answers on savvyme.<IP with dashes>.sslip.io (and start./app. in front). With the domain: point
A records for @, www, start and app at the server, then set the repo variable SAVVYME_DOMAIN="savvymeapp.com www.savvymeapp.com".
