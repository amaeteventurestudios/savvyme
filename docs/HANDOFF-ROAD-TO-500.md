# SavvyMe: road to 500 lessons (handoff)

Written 2026-11-07 for a fresh Claude Code session on another account. Read this file, `CLAUDE.md` and `docs/HANDOFF.md` in this repo, then `CLAUDE.md` and `docs/HANDOFF.md` in the cutaways repo, before starting.

## Who this is for and what they want

- The owner (Amaete) is American. The main audience is the US and the West. SavvyMe is **real-world stuff only**: how machines work, how things are made, your body and nature, electronics, smart home, and AI explained. The owner's words (2026-11-02): "Let's not get into AI first... how machines work and how things are made. That's what people really want to learn", "everyday stuff that people take for granted", "trying to get to 500".
- **Never** add courses about building software or becoming an AI builder (removed on 2026-11-07 at the owner's request).
- **Never** credit or link Amaete Build, Circuits or Cutaways on SavvyMe pages. Those sites are free; SavvyMe is the paid app.
- The owner does not run terminal commands. They merge PRs, add GitHub secrets and change DNS themselves. Never buy anything. Never commit keys.
- Public content never mentions USG companies or Palasora. Narration never says the owner's name. Brands are invented or generic; real place names are fine.
- Replies to the owner: plain, short, conversational. Give click-by-click steps when they must do something.

## Where things stand (2026-11-07)

- Live: https://savvyme.amaete.com on the shared Oracle server. **5 courses, 160 lessons.**
- savvyme PR #4 (branch `claude/project-thread-vgcwhp`, may be merged by the time you read this) adds the course "Your body and the natural world" (21) and two more units to How machines work (12). After it: **6 courses, 193 lessons**:
  machines 47, made 35, nature 21, electronics 30, smart-home 30, ai-explained 30.
- Deploy: the workflow `.github/workflows/savvyme-deploy.yml` lives in the **noveniqe** repo (it has the server secrets). Every 30 minutes it checks savvyme `main` and deploys if it changed. To deploy at once: Actions, "SavvyMe (deploy)", Run workflow. It ships everything except `.git`, `.github`, `docs`, `tools` and `*.md`.
- Lessons are not copied into SavvyMe. The app opens the real lesson pages (cutaways.amaete.com, circuits.amaete.com, build.amaete.com) in its player frame. `shared/lessons.js` only holds title, link, blurb and checks. **So a new lesson must first be live on its own site**, then added to `shared/courses.js`.
- Cutaways' live branch is `claude/project-thread-6j533s` (Vercel builds from it, cutaways.amaete.com). Work on another branch and open PRs into that branch.

## The math to 500

| | Lessons |
| --- | --- |
| In courses after PR #4 | 193 |
| Built Circuits projects not in any course yet (55, listed below; most need a Western version first) | +55 |
| Subtotal | 248 |
| **New lessons still to build** | **about 252** |

The 17 Africa-only cutaways (kente-loom, palm-oil-mill, garri, talking-drum, kora, benin-bronze, nok-kiln, adire, lagos-generator, keke-napep, danfo-bus, coffee-ceremony, shadoof, pyramids, great-zimbabwe, lalibela, swahili-dhow) are left out for the Western audience. Pyramids is fine for the West: add it to "How things are made".

The wishlist below has **415 candidates** (71 left from the first list plus 344 from "Road to 500"). Build about 252 of them, starting at the top of each section. Cars, home machines and classic factory products first: that is where US interest is biggest.

## Work mode: build nonstop (owner, 2026-11-09)

The owner wants you to **build and not stop**. Don't ask questions and don't wait for reviews or merges. Every decision is already made in this file; where something is unclear, choose the sensible option, write it down in "Decisions made on the way" at the bottom of this file, and keep going.

- Work on branch `claude/road-to-500` in each repo (create it from the live branch: cutaways `claude/project-thread-6j533s`, savvyme `main`, circuits and build their default branches). Commit and push after every lesson or small batch so nothing is lost.
- Open one PR per repo early and keep adding commits to it. Don't merge it yourself; the owner merges when they wake up.
- Since the PRs aren't merged yet, add the new lessons to `shared/courses.js` on the savvyme branch anyway; they go live together when the owner merges the cutaways PR first, then the savvyme PR. Say that order in the savvyme PR description.
- Run the screenshot checks on a sample of each batch (one or two lessons at each size), not every lesson, so you keep moving. Fix console errors and audit failures before moving on.
- Keep a running tally at the top of the savvyme PR description: lessons rewritten, built, added to courses, total in courses.
- When your context gets long, update this file (tick off what's done, add "Next up") and push, so a fresh session can carry on.

## Progress (updated as work goes)

PRs (all from `claude/road-to-500`, none merged by Claude): cutaways #3, build #2, circuits #2, savvyme #5. Merge the three lesson repos first, then savvyme.

- **Task 1 done.** Fridge narration off.
- **Task 2 done.** All 83 cutaways, 20 Build and 20 Circuits lessons on the list have Western settings, narration off on the cutaways (Build and Circuits only play a clip while its caption still matches, so changed steps are silent until re-recorded). Every cutaway passes `audit()` and loads with no console errors; every changed Circuits project passes `tools/test/projects.test.mjs`; the Build tries and analogies were checked. Pages and share images regenerated.
- **Task 3 done.** The 55 Circuits projects have Western versions (slugs unchanged; catalog titles and places updated) and sit in three new courses: Build smart gadgets (20), Power, batteries and backup (14), Smart farm, garden and water (21). Goal: `gadgets`.
- **Task 4 done.** `tools/checks.mjs` has three checks for every Circuits lesson in a course (115 sets). The player now shows options in a fixed shuffled order (seeded by the question), so the right answer isn't always first.
- **Courses now:** 9 courses, 248 lessons.
- **Task 5 in progress.** New group `car` in cutaways `engine/catalog.js` with 14 new cutaways, each audited clean, phone-checked and with a share image: seatbelt, windshield-wipers, spark-plug, alternator, starter-motor, radiator, car-battery, fuel-injector, clutch-gearbox, suspension-steering, hybrid-car, gas-pump, key-fob, catalytic-converter.
- **Task 6 started.** New course **Your car** (21: the 14 new plus v8-engine, automatic-transmission, differential, turbocharger, car-brakes, car-airbag, electric-car), goal `car` ("Understand my car") added to `GOALS` and `goalCourse`. Now 10 courses, 262 lessons.
- **Machines at home done.** New cutaways group `home` with 11 new cutaways, all audited, phone-checked and with share images: led-bulb, water-heater, furnace, garbage-disposal, ceiling-fan, blender, coffee-maker, robot-vacuum, faucet, smart-thermostat, air-fryer. New course **Machines at home** (21: those 11 plus fridge, microwave, dishwasher, washing-machine, air-conditioner, toilet-cistern, electric-kettle, toaster, smoke-detector, garage-door), goal `home` ("Know how my home works"). Now 11 courses, 273 lessons. 25 new cutaways so far.
- **Giant machines done.** New cutaways group `giant` with 10 new cutaways: roller-coaster, water-tower, pumpjack, diesel-locomotive, ocean-liner, revolving-door, carrier-catapult, booster-landing, moon-rocket, space-shuttle. New course **Giant machines** (28 = 4 units of 7: the 10 new plus 18 existing big machines), on the existing `machines` goal (no new quiz goal: it is the same interest). Now 12 courses, 283 lessons, 35 new cutaways so far. Battle tank left out for now (least family-friendly; build it last if the count needs it).
- **Classic factory done.** New cutaways group `factory` with 12 new factory lines: balloons, bubble-wrap, cardboard, candles, soap, toothpaste, screws, baseballs, paper-money, matches, tennis-balls, bubble-gum. New course **Classic factory** (21: those 12 plus paper/pen/money and house classics already built), on the `made` goal. Now 13 courses, 295 lessons, 47 new cutaways so far.
- **Food and drink done.** New cutaways group `food` with 13 new: popcorn, maple-syrup, cheese, peanut-butter, cereal, gummy-candy, milk-dairy, bread-factory, flour-mill, ketchup, pasta, canning, orange-juice. New course **Food and drink** (21), on the `made` goal. Discover pools (Mon, Tue, Fri) now include some of the new cutaways. Now 14 courses, 308 lessons, 60 new cutaways so far.
- **Big industry done.** New cutaways group `industry` with 8 new: steel-mill, tires, chip-fab, concrete, paper-mill, car-assembly, float-glass, solar-cells. New course **Big industry** (21), on the `made` goal. Now 15 courses, 316 lessons, 68 new cutaways so far.
- **Kitchen done.** New cutaways group `kitchen` with 10 new: induction-cooktop, gas-burner, pressure-cooker, rice-cooker, ice-maker, vacuum-flask, stand-mixer, kitchen-scale, kitchen-timer, grill-igniter. New course **In the kitchen** (21), on the `home` goal. Now 16 courses, 326 lessons, 78 new cutaways so far.
- **Next up:** Bathroom and grooming (25 candidates), then Around the house, Garage and tools, Toys and games, Sports, Music and sound, Getting around, City and infrastructure, Farm, Medicine, Space; task 7 narration last.

## The task list, in order

1. **Fridge narration is stale.** `cutaways/fridge/model.js` was rewritten for the West (branch `claude/project-thread-vgcwhp` in cutaways, not merged) but its recorded voice clips still say the old Nigerian lines. Set `voice: false` on it until new clips are made (see Narration below), or regenerate them.
2. **Western rewrite of the 123 lessons with African references** (list at the bottom, worst first; full scan in `docs/western-rewrite-list.txt`). The fridge is the reference: Lagos kitchen became a Houston kitchen, NEPA became a blackout, stabiliser became a surge protector, 230 V became 120 V, jollof became leftover chili, the Africa-only `where` map was removed. Rules:
   - Rewrite story steps, callouts, `place`, glossary, quiz, controls labels and comments. Use US places and everyday US life (suburbs, highways, grocery stores, school, the DMV). Keep the science identical.
   - Remove `where` (the maps in `engine/maps.js` are Africa only). Don't build a US map.
   - Units: US units first, metric in brackets (350°F (175°C), 60 mph (100 km/h), 10 lb (4.5 kg)).
   - Rewrite in place in each lesson's own repo (SavvyMe opens those pages, so that is the only way it shows up). Set `voice: false` on every rewritten lesson, because the old clips no longer match.
   - Same job for the 20 Build lessons and 20 Circuits lessons in the list (Build lesson text is in `<slug>/lesson.js`, Circuits in `<slug>/project.js`).
   - After each batch: `node tools/pages.mjs` (and `node tools/og.mjs <slug>`) in cutaways, the screenshot checks from its CLAUDE.md, then in savvyme `LESSON_ROOT=<folder holding the repos> node tools/lessons.mjs` so blurbs and checks update.
3. **Bring in the 55 Circuits projects.** Many are Nigerian (nepa-is-back, pure-water-vending, keke-tracker, okada-helmet, pepper-soup-thermometer, ugu-soil-moisture...). Give each a Western version (rename the slug only if the owner agrees, since links exist), then add them to the electronics and smart-home courses or new courses (for example "Build smart gadgets" and "Smart farm and garden"). Each needs three checks in savvyme `tools/checks.mjs` (Circuits pages have no quiz of their own).
4. **Write checks for the 46 Circuits lessons already in courses that have none** (listed below). Format: see the top of `tools/checks.mjs`. Three questions each, answers in our own words, `ok` is the index of the right answer.
5. **Build about 252 new cutaways** from the wishlist below, in batches of 10 to 20. For each:
   - In the cutaways repo: `<slug>/model.js` following `kente-loom/model.js` and `garri/model.js` (every explainer field except `where`), an entry in `engine/catalog.js` with `live: true`, then `node tools/pages.mjs`, `node tools/og.mjs <slug>`, the shot checks, and `window.__cutaway.audit()` clean. PR into `claude/project-thread-6j533s`.
   - US setting from the start (no rewrite needed later). Generic brands only.
   - Once the owner merges and the page is live: in savvyme add the ids (`cutaways:<slug>`) to a course in `shared/courses.js` (units of 7, one lesson a day), run `node tools/lessons.mjs`, `node tools/seo.mjs` (rewrites robots.txt, sitemap.xml, llms.txt), and check the course data loads (`node -e` line in the deploy workflow). PR into savvyme `main`.
6. **New courses as the lessons arrive** (from the wishlist plan): Your car (21), Machines at home (21), Giant machines (30), Classic factory (21), Food and drink (21), Big industry (21), then Kitchen, Bathroom, Around the house, Garage and tools, Toys and games, Sports, Music and sound, Getting around, City and infrastructure, Farm and food, Medicine, Space. Add a goal in `GOALS` and the quiz mapping in `start/start.js` (`goalCourse`) for each new course, and a Discover pool in `WEEK` if it fits a weekday theme. Keep `ORDER` sensible: machines and making first.
7. **Narration.** The cutaways' recorded voices are Nigerian (Azure, quota nearly used). For the Western audience use the free Kokoro "Heart" voice (US English), as Amaete Build and Circuits do (`build/tools/voice/kokoro.py`). This needs a change to the cutaways viewer's voice picker (today it offers Idara and Tari). Do this last, after the lessons are built.
8. Leave the footer contact email as it is.

## Rules that bite (from the repos' CLAUDE.md files)

- Static sites, no build step. Three.js r160 vendored; never from a CDN. Everything procedural: no images, model files or textures.
- Numbers pasted into GLSL keep a decimal point. Open bowls need `twoSided: true`. Never leave NaN in `pose()`.
- Phone-first: check 390×844 and 1280×800 (cutaways also landscape 844×390), light and dark, no console errors.
- Commit messages end with the attribution lines your session gives you. No model names in commits or PRs.

## The 46 Circuits lessons in courses with no checks

diodes, capacitors, transistors-as-switches, motors-and-drivers, sensors-digital-analog, the-multimeter, reading-a-circuit-diagram, blink-an-led, flashing-open-sign, dimmer-knob, serial-monitor, queue-number-display, ringtone-buzzer, lcd-clock, sound-level-meter, shop-motion-alarm, control-a-motor, hello-esp32, security-light, phone-doorbell, internet-clock, bluetooth-phone-control, live-sensor-dashboard, gas-leak-alarm, intruder-alert, sink-leak-alarm, fridge-door-alarm, keypad-door-lock, fall-alert, pill-reminder, ir-remote-tv-ac, auto-water-garden, smart-bin, fan-follows-heat, rain-gauge, visitor-counter, update-over-wifi, sms-alert-gsm, esp-now-two-boards, sd-weather-logger, roadside-air-quality, vaccine-fridge-monitor, farm-sensor-mesh, community-weather-station, smart-water, shop-security-system

## The 55 built Circuits projects not in any course

afrobeats-beat-box, automatic-estate-gate, bean-sorter, bird-scarer, borehole-pump-timer, brt-arrival-board, car-battery-voltage, catfish-pond, charging-kiosk-billing, charging-kiosk-timer, chick-brooder, clinic-queue-caller, drip-irrigation-timer, egg-incubator, fridge-surge-guard, generator-fuel-gauge, generator-fumes-alarm, generator-hour-counter, grain-store-humidity, gutter-flood-warning, h-bridge-toy-car, harmattan-heat-index, inverter-battery-monitor, is-the-water-clean, keke-tracker, lamp-battery-meter, line-following-robot, load-shedding-scheduler, lora-village-radio, market-stall-fire-alarm, nepa-is-back, okada-helmet, pepper-soup-thermometer, phone-drop-detector, poultry-feeder-timer, prepaid-energy-meter, pump-stops-when-full, pure-water-vending, rainwater-tank-switcher, robot-arm, scale-with-receipt, school-water-dispenser, smart-farm, solar-charge-tracker, solar-dryer-monitor, solar-home-kit, stepper-camera-slider, sweep-a-servo, tank-level-gauge, tomato-cold-box, tomato-market-scale, ugu-soil-moisture, village-mini-grid, water-vendor-flow-meter, your-own-invention

## Lessons to rewrite for the West (top 30 of 123; mentions, then the words found)

Full list: `docs/western-rewrite-list.txt`.

```
cutaways:phone-call | 120 | kano nairobi africa african nigeria kenya lagos mombasa
cutaways:whole-earth | 74 | africa african kenya kilimanjaro tanzania ethiopia sahara kenyan
cutaways:space-station | 63 | africa sahara lagos cairo kinshasa johannesburg nairobi addis
build:word-embeddings | 59 | abuja nigeria kenya nairobi ghana accra senegal dakar
cutaways:headphones | 57 | lagos danfo nigeria nairobi matatu
cutaways:hydro-dam | 42 | ghana volta tema accra africa benin ethiopian nigeria
cutaways:lungs | 36 | harmattan kano nigeria sahara addis africa african lagos
cutaways:solar-light | 33 | kano nigeria harmattan sahara naira africa
cutaways:gps | 31 | kampala boda uganda africa kenya
cutaways:espresso-machine | 30 | addis ethiopian ethiopia africa
cutaways:cubesat-3u | 29 | africa kenya ghanasat nigeriaedusat nairobi ghana nigeria african
cutaways:ocean-waves | 29 | mombasa kenya africa african cape town ghana lagos
cutaways:undersea-cable | 28 | lagos nigeria africa
cutaways:electric-kettle | 28 | addis lagos nairobi kilimanjaro ethiopia africa ethiopian
cutaways:lithium-battery | 25 | nairobi kenya kigali congo zimbabwe africa kenyan
cutaways:steam-locomotive | 25 | uganda nairobi kenya mombasa kampala africa
cutaways:bicycle-gears | 25 | rwandan kigali rwanda africa uganda kenya boda
cutaways:fridge | 25 | nepa lagos nigeria kenya nigerian jollof  (DONE, the reference)
cutaways:helicopter | 24 | nairobi kenya africa mombasa
cutaways:cubesat-6u | 24 | niger nigeria kenya african cairo egypt africa
cutaways:kidney | 24 | kano nigeria sahel harmattan africa african
cutaways:microwave | 23 | jollof lagos nigeria nepa
cutaways:airplane-wing | 22 | addis ethiopia africa mombasa lagos
build:tokens | 22 | pidgin yoruba swahili african
cutaways:electric-car | 21 | kigali rwanda kenya africa nairobi
cutaways:air-conditioner | 21 | accra ghana harmattan ghanaian lagos african
cutaways:thunderstorm | 21 | kampala uganda kilimanjaro africa congo
cutaways:oil-refinery | 20 | niger keke okada nigeria port harcourt africa
cutaways:beehive | 20 | kenyan ethiopia africa ethiopian addis
cutaways:baobab-tree | 20 | senegal dakar nigeria african africa zimbabwe ghana sahara
```

## The wishlist: what to build next (415 candidates, about 252 needed)

Already built and therefore removed from these lists: car engine (V8), automatic transmission, brakes, differential, turbocharger, air conditioner, dishwasher, garage door, smoke detector, toaster, mechanical watch, escalator, crayons, pencils, coins, potato chips, toy bricks, toilet paper, aluminum cans, glass bottles, soda bottling, ice cream. Before building anything, check `engine/catalog.js` in cutaways in case another session built it since.

### New: how machines work (from the first list)

| Lesson | The question | Fits |
| --- | --- | --- |
| Hybrid car | When does a hybrid run on gas, and when on battery? | Your car |
| Clutch and manual gearbox | What does a clutch actually do? | Your car |
| Suspension and steering | How does a car glide over potholes? | Your car |
| Furnace and water heater | How does your house make hot water on demand? | At home |
| Robot vacuum | How does it map your living room? | At home |
| Air fryer | Is it really frying? | At home |
| Garbage disposal | Where do the blades go? (There are none.) | At home |
| Lawn mower | How does a small engine cut a lawn evenly? | At home |
| Battle tank | How does a tank aim while it drives? | Giant machines |
| Ocean liner | How does a ship weighing 50,000 tons float? | Giant machines |
| Space Shuttle | How did it launch like a rocket and land like a plane? | Giant machines |
| Moon rocket | How did three stages get people to the Moon? | Giant machines |
| Reusable rocket landing | How does a booster land on its tail? | Giant machines |
| Diesel-electric locomotive | Why does a diesel train use electric motors? | Giant machines |
| Roller coaster | Why don't you fall out in a loop? | Giant machines |
| Aircraft carrier catapult | How do you launch a jet in two seconds? | Giant machines |
| Power grid | How does power reach your outlet the moment you flip a switch? | Power |
| Gas power plant | How does burning gas make electricity? | Power |
| Electric motor | How does electricity become spin? | Power |
| ATM | How does it count and check cash? | Everyday tech |
| Vending machine | How does it know your coin is real? | Everyday tech |

### New: how things are made (from the first list)

| Lesson | The question | Fits |
| --- | --- | --- |
| Toy building bricks | How are millions of bricks made to snap together exactly? | Classic factory |
| Paper money | Why is a dollar bill so hard to fake? | Classic factory |
| Baseballs | How are 108 stitches sewn by hand? | Classic factory |
| Fireworks | How does a shell make a shape in the sky? | Classic factory |
| Bubble gum | How is it made stretchy? | Classic factory |
| Balloons | How is a latex balloon dipped? | Classic factory |
| Breakfast cereal | How are flakes and puffs made? | Food and drink |
| Cheese | How does milk become a solid block? | Food and drink |
| Peanut butter | How do peanuts turn into a spread? | Food and drink |
| Maple syrup | How do you get syrup out of a tree? | Food and drink |
| Plastic bottles | How does a small tube become a bottle? | Everyday things |
| Jeans | How does cotton become denim? | Everyday things |
| Sneakers | How are a shoe's parts joined? | Everyday things |
| AA batteries | What is packed inside a battery? | Everyday things |
| Mattresses | What is inside a mattress? | Everyday things |
| Tires | How is rubber built up into a tire? | Big industry |
| Steel | How does iron ore become steel? | Big industry |
| Computer chips | How are billions of transistors printed on a chip? | Big industry |
| Concrete | Why does concrete get harder for years? | Big industry |
| Paper | How does wood pulp become a sheet? | Big industry |
| Car assembly line | How does a factory build a car in under a day? | Big industry |

### New: everyday things people take for granted (from the first list)

| Lesson | The question | Fits |
| --- | --- | --- |
| Oil pumpjack | Why does that pump nod up and down all day? | Giant machines |
| Speaker | How does a magnet turn a signal into sound? | Sound |
| Microphone | How does your voice become electricity? | Sound |
| Bank vault door | How does a 20-ton door swing shut with one hand? | Locks and safety |
| Combination safe lock | How does a dial know the right numbers? | Locks and safety |
| Light switch and circuit breaker | What stops your house wiring from catching fire? | At home |
| LED bulb | Why does an LED last 20 years when old bulbs burned out? | At home |
| Faucet and shower valve | How does one handle mix hot and cold? | At home |
| Thermostat | How does your house hold 70°F all day? | At home |
| Doorbell chime | What makes the ding-dong? | At home |
| Blender | Why do the blades make a whirlpool? | At home |
| Drip coffee maker | How does water climb up to the top with no pump? | At home |
| Ceiling fan | Why does it spin the other way in winter? | At home |
| Vacuum cleaner | How does it suck up dirt? | At home |
| TV remote | How does an invisible beam change the channel? | At home |
| Can opener | How do two wheels cut a can open? | In your hand |
| Tape measure | How does the tape snap back by itself? | In your hand |
| Click pen | How does one button lock and unlock the tip? | In your hand |
| Stapler | How does a staple fold its own legs? | In your hand |
| Umbrella | How does it fold and lock open? | In your hand |
| Seatbelt | How does it know to lock in a crash and not when you lean? | Your car |
| Car key fob | How does the car know it's your key? | Your car |
| Gas station pump | How does it stop before the tank overflows? | Your car |
| Tap-to-pay card | How does a card pay with no battery? | Everyday tech |
| Barcode scanner | How does a beep know the price? | Everyday tech |
| Fire extinguisher | What happens when you squeeze the handle? | Locks and safety |
| Fire sprinkler | Why does only the sprinkler over the fire go off? | Locks and safety |
| Revolving door | Why do big buildings use them? | Giant machines |
| Water tower | Why are water tanks built so high? | Giant machines |

### Kitchen (25)

| Lesson | The question |
| --- | --- |
| Gas stove burner | How does a knob make a ring of blue flame? |
| Induction cooktop | How does it heat the pan but not the glass? |
| Oven | How does an oven hold 350°F? |
| Pressure cooker | Why does food cook faster under pressure? |
| Rice cooker | How does it know the rice is done? |
| Stand mixer | How does the beater reach every part of the bowl? |
| Food processor | Why won't it run with the lid off? |
| Juicer | How does it pull juice out of a carrot? |
| Waffle iron | How does it make a crisp grid? |
| Popcorn machine | Why does a kernel explode? |
| Ice maker | How does a freezer make ice cubes by itself? |
| Water filter pitcher | What does the filter catch? |
| Kitchen scale | How does it weigh flour to the gram? |
| Pepper grinder | How do two burrs crack a peppercorn? |
| Salad spinner | How does spinning dry lettuce? |
| Vacuum flask | How does it keep coffee hot all day? |
| Range hood | Where does the smoke go? |
| Sous vide cooker | How does it cook a steak in a water bath? |
| Coffee grinder | Why does grind size change the taste? |
| Soda maker | How does it put fizz in tap water? |
| Bread machine | How does it knead, rise and bake by itself? |
| Wind-up kitchen timer | How does it tick down with no battery? |
| Non-stick pan | Why doesn't egg stick? |
| Trash compactor | How does it squash a week of trash? |
| Grill igniter | How does a click make a spark? |

### Bathroom and grooming (25)

| Lesson | The question |
| --- | --- |
| Hair clippers | How do two blades cut hair but not skin? |
| Hair dryer | How does it blow hot air without burning you? |
| Electric shaver | How does a thin foil shave so close? |
| Hair straightener | How do hot plates straighten curls? |
| Electric toothbrush | How does it brush 30,000 times a minute? |
| Water flosser | How does a thin jet clean between teeth? |
| Bathroom scale | How does glass measure your weight? |
| Shower head | How does it spread water into a spray? |
| Bathroom exhaust fan | Why does the mirror clear? |
| Septic tank | Where does it go when you flush? |
| Water softener | How does it take hard minerals out of water? |
| Cartridge razor | Why do razors have five blades? |
| Aerosol can | How does a can spray? |
| Pump soap dispenser | How does a pump push soap out? |
| Automatic soap dispenser | How does it know your hand is there? |
| Hand dryer | How does air dry your hands in ten seconds? |
| Nail clipper | How does a lever make a small cut easy? |
| Hot tub | How does it keep 100°F water clean? |
| Sink drain trap | Why is there a U-bend under every sink? |
| Bidet seat | How does a toilet seat wash and dry? |
| Electric blanket | How does it warm you without burning? |
| Humidifier | How does it make a cool mist? |
| Dehumidifier | How does it pull water out of the air? |
| Air purifier | What does the filter trap? |
| Perfume atomizer | How does a squeeze make a mist? |

### Around the house (30)

| Lesson | The question |
| --- | --- |
| Space heater | How does it warm a room fast? |
| Gas fireplace | How does it light from a remote? |
| Wood stove | How does it burn wood cleanly? |
| Video doorbell | How does it see who's there at night? |
| Smart speaker | How does it hear its name across a room? |
| Wi-Fi router | How does the internet travel through the air? |
| Television | How do millions of tiny lights make a picture? |
| Game console | What makes a game run at 60 frames a second? |
| Laptop | What is packed inside a laptop? |
| Hard drive and SSD | How does a computer remember when it's off? |
| Laser printer | How does it print with light and powder? |
| Clothes dryer | How does it dry clothes without shrinking them? |
| Steam iron | How does steam smooth wrinkles? |
| Window blinds | How does one cord tilt every slat? |
| Recliner chair | How does the footrest pop out? |
| Sofa bed | How does a bed fold into a couch? |
| Door closer | Why do some doors close slowly by themselves? |
| Smart lock | How does a phone unlock your door? |
| Double-pane window | How does glass keep heat in? |
| Rooftop solar | How do panels on a roof power a house? |
| Home battery | How does a house keep running when the grid goes down? |
| Portable generator | How does a small engine power a home? |
| Sump pump | How does it keep a basement dry? |
| Well pump | How does water come up from 200 feet down? |
| Insulation | How does fluffy stuff keep a house warm? |
| Carbon monoxide alarm | How does it detect a gas you can't smell? |
| Security camera | How does it see in the dark? |
| Mousetrap | How does it snap in a tenth of a second? |
| Quartz wall clock | How does a crystal keep time? |
| Pendulum clock | Why does a pendulum keep steady time? |

### Garage, yard and tools (30)

| Lesson | The question |
| --- | --- |
| Power drill | How does one tool drill holes and drive screws? |
| Impact driver | Why does it hammer while it turns? |
| Circular saw | How does it cut so straight? |
| Chainsaw | How does a chain cut through a tree? |
| Leaf blower | How does it make so much wind? |
| String trimmer | How does a plastic line cut grass? |
| Snow blower | How does it throw snow 30 feet? |
| Pressure washer | How does water strip paint? |
| Air compressor | How does it squeeze air into a tank? |
| Nail gun | How does it fire a nail in a blink? |
| Hydraulic car jack | How does a small push lift a car? |
| Torque wrench | How does it click at exactly the right tightness? |
| Ratchet wrench | How does it turn only one way? |
| Locking pliers | How do they lock on and stay? |
| Welder | How does electricity melt metal together? |
| Spirit level | How does a bubble show level? |
| Laser level | How does it draw a perfect line on a wall? |
| Stud finder | How does it see through a wall? |
| Hose nozzle | How does one nozzle make many sprays? |
| Oscillating sprinkler | How does it sweep back and forth by itself? |
| Pool pump and filter | How does a pool stay clear? |
| Wheelbarrow | Why does one wheel make a heavy load lighter? |
| Block and tackle | How do pulleys let you lift a piano? |
| Robot lawn mower | How does it stay inside your yard? |
| Bug zapper | How does it lure and zap insects? |
| Charcoal grill | Why do the vents control the heat? |
| Jump starter | How does a small box start a car? |
| Angle grinder | Why does it throw sparks? |
| Electric fence | How does it shock without hurting? |
| Bike pump | How does a pump push air in but not out? |

### Office and school (20)

| Lesson | The question |
| --- | --- |
| Pencil sharpener | How does it carve a perfect point? |
| Mechanical pencil | How does it feed lead one click at a time? |
| Paper shredder | How does it cut a page into confetti? |
| Laminator | How does it seal paper in plastic? |
| Photocopier | How does it copy a page with light and static? |
| Calculator | How does a chip do maths? |
| Computer mouse | How does it follow your hand? |
| Keyboard | How does a keypress reach the screen? |
| Projector | How does it put a picture on the wall? |
| Whiteboard marker | Why does it wipe off? |
| Binder clip | Why does it grip so hard? |
| Sticky notes | How do they stick and unstick again and again? |
| Highlighter | Why does it glow? |
| Office chair | How does it go up and down? |
| Badge reader | How does a card open a door? |
| Webcam | How does it see you? |
| Receipt printer | How does it print with no ink? |
| Document scanner | How does it read a page? |
| Phone charger | How does a small brick charge your phone safely? |
| Wireless charger | How does a phone charge with no wire? |

### Toys and games (20)

| Lesson | The question |
| --- | --- |
| Yo-yo | How does it climb back up the string? |
| Slinky | How does it walk down stairs? |
| Puzzle cube | How does it twist without falling apart? |
| Remote-control car | How does it steer by radio? |
| Kite | How does a kite fly? |
| Spinning top | Why doesn't it fall over? |
| Pinball machine | How do the flippers and bumpers work? |
| Claw machine | Is the claw rigged? |
| Wind-up toy | How does a spring make a toy walk? |
| Water blaster | How does pumping make a long jet? |
| Foam dart blaster | How does it fire a dart? |
| Trampoline | How do springs throw you up? |
| Skateboard | How does it turn when you lean? |
| Bouncy ball | Why does it bounce so high? |
| Kaleidoscope | How do mirrors make endless patterns? |
| Two-knob drawing toy | How do two knobs draw a line? |
| Fortune ball | How does an answer float up? |
| Music box | How do tiny pins play a song? |
| Game controller | How does it rumble in your hands? |
| VR headset | How does it trick your eyes into seeing 3D? |

### Sports and outdoors (20)

| Lesson | The question |
| --- | --- |
| Bike disc brakes | How does a small lever stop you? |
| E-bike | How does a motor help you pedal? |
| Electric scooter | How does it brake and recharge? |
| Treadmill | How does the belt move under you? |
| Rowing machine | How does a fan make it harder? |
| Golf ball | Why does a golf ball have dimples? |
| Pitching machine | How does it throw a curveball? |
| Football spiral | Why does a spiral fly farther? |
| Fishing reel | How does it stop a big fish? |
| Compound bow | Why does a bow get easier at full draw? |
| Pop-up tent | How does it snap open by itself? |
| Camping stove | How does a tiny can make a strong flame? |
| Backpacking water filter | How does it make stream water safe? |
| Ski binding | How does it let go when you fall? |
| Ice skates | Why do skates glide on ice? |
| Scuba regulator | How do divers breathe underwater? |
| Auto-inflating life jacket | How does it inflate itself? |
| Smartwatch heart rate | How does a watch read your pulse? |
| Binoculars | How do they make things look closer? |
| Compass | Why does it always point north? |

### Music and sound (15)

| Lesson | The question |
| --- | --- |
| Electric guitar | How does a pickup hear a string? |
| Acoustic guitar | Why does a hollow body make it louder? |
| Drum kit | Why does each drum sound different? |
| Violin | How does a bow make a string sing? |
| Trumpet | How do three valves make every note? |
| Saxophone | How does a reed make sound? |
| Synthesizer | How does electricity make music? |
| Turntable | How does a needle read a record? |
| Noise-cancelling headphones | How do they erase sound? |
| Amplifier | How does it make a tiny signal loud? |
| Harmonica | How do reeds make a chord? |
| Pipe organ | How does one organ make thousands of sounds? |
| Accordion | How do you play music with air? |
| Concert hall | Why does a hall make music sound better? |
| Wireless earbuds | How do earbuds talk to your phone? |

### Your car, more (25)

| Lesson | The question |
| --- | --- |
| Spark plug | How does a spark light the fuel? |
| Fuel injector | How does fuel become a fine mist? |
| Radiator | Why doesn't the engine melt? |
| Alternator | How does the car charge its own battery? |
| Starter motor | What happens when you press start? |
| 12-volt car battery | How does it crank a cold engine? |
| Power steering | Why is the wheel so easy to turn? |
| Windshield wipers | How does one motor sweep two arms? |
| Cruise control | How does it hold your speed? |
| Tire pressure sensor | How does the car know a tire is low? |
| Backup camera | How does it draw the guide lines? |
| Headlights | How do they dim for oncoming cars? |
| Car horn | What makes that sound? |
| Catalytic converter | How does it clean the exhaust? |
| Muffler | How does it quiet an engine? |
| EV fast charger | How does a car charge in 20 minutes? |
| Regenerative braking | How does braking charge a battery? |
| Self-driving car | How does it see the road? |
| Lane assist | How does it keep you in your lane? |
| Speedometer | How does the car know how fast it's going? |
| Convertible roof | How does a roof fold away? |
| Power window | How does a window go up and down? |
| Rotary engine | How does a triangle replace pistons? |
| Diesel engine | Why does diesel need no spark? |
| Car wash | How does a tunnel clean a car in three minutes? |

### Getting around (25)

| Lesson | The question |
| --- | --- |
| Autopilot | How does a plane fly itself? |
| Cabin pressure | Why can't you open a plane door in flight? |
| Flight recorder | How does the black box survive a crash? |
| Air traffic radar | How do controllers see every plane? |
| Airport baggage system | How does your bag find your plane? |
| Subway train | How does a subway get its power? |
| Maglev train | How does a train float? |
| High-speed train | How does it run at 200 mph? |
| Railroad switch | How does a train change tracks? |
| Cable car | How does a cable car climb a hill? |
| Sailboat | How can a boat sail into the wind? |
| Container ship | How does one ship carry 20,000 containers? |
| Port container crane | How does a port unload a ship in a day? |
| Hovercraft | How does it ride on a cushion of air? |
| Jet ski | How does it steer without a rudder? |
| Outboard motor | How does a boat motor tilt and push? |
| Motorcycle | How does a bike lean into a turn? |
| Kneeling bus | How does a bus lower itself at the stop? |
| Semi truck | Why does a big rig have 18 wheels? |
| Truck air brakes | Why do trucks hiss? |
| Fire truck ladder | How does a ladder reach 100 feet? |
| Garbage truck | How does it lift and empty a can? |
| Cement mixer truck | Why does the drum keep turning? |
| Parachute | How does cloth slow a fall? |
| Glider | How does a plane fly with no engine? |

### City and infrastructure (25)

| Lesson | The question |
| --- | --- |
| Traffic signal network | How do lights know when to change? |
| Water treatment plant | How does river water become tap water? |
| Sewage treatment plant | What happens to a city's sewage? |
| Skyscraper | How does a 1,000-foot tower stand in the wind? |
| Suspension bridge | How does a road hang from cables? |
| Drawbridge | How does a road lift for a ship? |
| Underwater tunnel | How do you build a tunnel under a river? |
| Cell tower | How does your call find you? |
| Data center | Where does the internet live? |
| Electronic toll | How does a toll read your car at 70 mph? |
| Speed camera | How does it measure your speed? |
| Fire hydrant | Why doesn't it freeze in winter? |
| Storm drain | Where does the rain go? |
| Levee and flood gate | How does a city hold back a flood? |
| Electrical substation | What is that humming fenced-off box? |
| Pole transformer | How does it step down the voltage for your house? |
| Gas pipeline | How does gas reach your stove? |
| Recycling plant | How are cans, paper and plastic sorted? |
| Landfill | Where does your trash really go? |
| Automatic doors | How do doors know you're coming? |
| Retractable stadium roof | How does a roof slide open? |
| Weather radar | How does radar see rain? |
| Earthquake-proof building | How do buildings survive shaking? |
| Drop tower ride | How does a ride stop a free fall? |
| Ferris wheel | How does a giant wheel turn so smoothly? |

### Farm and food (20)

| Lesson | The question |
| --- | --- |
| Tractor | How does a tractor pull a plow? |
| Grain silo | How is grain kept safe for a year? |
| Milking machine | How does a dairy milk 100 cows an hour? |
| Cotton gin | How are seeds pulled out of cotton? |
| Center-pivot irrigation | Why are farms green circles from the air? |
| Hydroponic farm | How do plants grow without soil? |
| Greenhouse | How does it stay warm in winter? |
| Egg grading | How are eggs sorted by size? |
| Flour mill | How does wheat become flour? |
| Sugar refinery | How does cane become white sugar? |
| Pasteurization | Why is milk heated? |
| Canning | How does a can keep food for years? |
| Freeze-drying | How does food lose all its water? |
| Bread factory | How are 10,000 loaves baked an hour? |
| Coffee roasting | Why does roasting change the bean? |
| Orange juice plant | How does juice stay fresh for months? |
| Pasta factory | How are pasta shapes made? |
| Ketchup | How does a tomato become ketchup? |
| Bottled water | How is water bottled? |
| Spray drone | How does a drone spray a field? |

### Factory-made, more products (30)

| Lesson | The question |
| --- | --- |
| Matches | How does a match light? |
| Candles | How is a candle made? |
| Soap | How do fats become soap? |
| Toothpaste | How do the stripes get into toothpaste? |
| Diapers | How do they hold so much? |
| Paper cups | Why don't they leak? |
| Bubble wrap | How do the bubbles get their air? |
| Cardboard boxes | How is corrugated cardboard made? |
| Window glass | How is glass made perfectly flat? |
| Mirrors | How is a mirror made? |
| Eyeglass lenses | How is a lens shaped for your eyes? |
| Kitchen knives | How is a blade hardened? |
| Nails and screws | How are a million screws made in a day? |
| Ball bearings | How are balls made perfectly round? |
| Bricks | How is clay fired into brick? |
| Sawmill | How does a log become boards? |
| Plywood | Why is plywood so strong? |
| Copper wire | How is copper drawn into wire? |
| Solar cells | How are solar cells made? |
| Socks | How does a machine knit a sock? |
| T-shirt printing | How is a design printed on a shirt? |
| Basketballs | How is a basketball made? |
| Bowling balls | Why does a bowling ball hook? |
| Surfboards | How is a surfboard shaped? |
| Gummy candy | How are gummy bears made? |
| Marshmallows | How do they get so fluffy? |
| Lollipops | How is hard candy made? |
| Paint | How is paint mixed? |
| Tennis balls | How does a tennis ball get its fuzz? |
| Contact lenses | How is a soft lens made? |

### Medicine and the body (20)

| Lesson | The question |
| --- | --- |
| X-ray machine | How does it see your bones? |
| CT scanner | How does it see you in slices? |
| Ultrasound | How does sound make a picture of a baby? |
| Pacemaker | How does it keep a heart in rhythm? |
| Defibrillator | How does a shock restart a heart? |
| Insulin pump | How does it dose insulin all day? |
| Blood pressure cuff | How does it measure your pressure? |
| Pulse oximeter | How does light read your oxygen? |
| Forehead thermometer | How does it read heat from a distance? |
| Hearing aid | How does it make speech clearer? |
| Cochlear implant | How does it let deaf people hear? |
| Prosthetic hand | How does a robot hand read your muscles? |
| Dialysis machine | How does it clean blood? |
| Ventilator | How does it breathe for you? |
| Vaccine production | How is a vaccine made? |
| Pill press | How is a tablet made? |
| Inhaler | How does a puff reach your lungs? |
| Laser eye surgery | How does a laser reshape the eye? |
| Surgical robot | How do surgeons operate through tiny holes? |
| Dental drill | How does it spin so fast? |

### Space and science (14)

| Lesson | The question |
| --- | --- |
| Spacesuit | How does a suit keep you alive in space? |
| Satellite internet | How does internet come from space? |
| Weather satellite | How do we watch storms from space? |
| Radio telescope | How do we listen to the universe? |
| Particle collider | How do we smash atoms? |
| Light microscope | How does it see cells? |
| Electron microscope | How does it see atoms? |
| Atomic clock | How does the world's most accurate clock work? |
| Laser | How does a laser make one pure colour? |
| Fusion reactor | Can we build a star on Earth? |
| Seismometer | How do we measure an earthquake? |
| Space toilet | How do astronauts use the bathroom? |
| Mars helicopter | How does it fly in such thin air? |
| Solar sail | How does sunlight push a spacecraft? |


## Decisions made on the way

- Branches: `claude/road-to-500` in each repo. Cutaways' is cut from `claude/project-thread-6j533s` plus the fridge commit from `claude/project-thread-vgcwhp` (cutaways PR #3). Savvyme's is cut from `claude/project-thread-vgcwhp` (PR #4), because that PR was still open; merge PR #4 first, or merge only the road-to-500 PR, which contains it.
- Where a lesson's ground map or globe showed Africa (phone-call, space-station, cubesat-3u), the polygon was swapped for a rough outline of the lower 48 states written inline in the model; `engine/maps.js` is untouched.
- whole-earth keeps the East African Rift: the rift *is* the science of the lesson. It got US units, a San Andreas fact, no map and no voice.
- US units go first in story text, facts, scale lines and intros (`350 °F (175 °C)`). Live gauges and charts computed by the sim stay metric (°C, km/h, kPa), so the maths stays untouched. Grid-frequency lessons were moved to 60 Hz (hydro-dam).
- British spellings (centre, fibre, colour) are left as they are: it is the house style of the whole cutaways site.
- Lessons whose subject is itself African (baobab, weaver nest, termite mound, malaria, the East African Rift) keep the subject, lose the map and the voice, and gain US units and a US fact. Cocoa keeps the world facts but is set from Hawaii to Hershey.
- Circuits sketches keep metric units (sensors and libraries are metric); story text adds US units where it helps. The fridge surge guard stays a 230 V design and says so (US kitchens are 120 V).
- Circuits slugs never change (links exist); only titles, places and text do. Watch out: a regex on a word like `borehole` also hits the slug `borehole-pump-timer`.
- Real-world settings chosen for the rewrites: see the list under "Progress" below.
