// SavvyMe courses. Each course is an ordered list of lessons from the Amaete lesson sites; the app shows one a day,
// in order, and splits every course into units of a week. Lesson ids are '<site>:<slug>' (build, circuits, cutaways);
// their titles, links and checks come from shared/lessons.js (written by tools/lessons.mjs).

const b = s => s.trim().split(/\s+/).map(x => 'build:' + x);
const c = s => s.trim().split(/\s+/).map(x => 'circuits:' + x);
const k = s => s.trim().split(/\s+/).map(x => 'cutaways:' + x);

export const COURSES = [
  {
    id: 'ai-explained', title: 'AI, explained', days: 30, color: '#4B2E83', icon: 'spark',
    goal: 'ai', blurb: 'How machines learn, see and talk, and where they go wrong. No maths degree needed.',
    outcome: 'Explain how a chatbot really works, and spot when it is making things up.',
    units: ['How a machine learns', 'Brains made of numbers', 'How it sees and talks', 'Inside a chatbot', 'Pictures and phones'],
    lessons: [
      ...b('what-is-ml linear-regression gradient-descent logistic-regression decision-trees model-evaluation bias-variance'),
      ...b('perceptron multi-layer-networks backpropagation activation-functions loss-functions regularization image-fundamentals'),
      ...b('convolutions image-classification tokens word-embeddings attention-mechanism self-attention next-word'),
      ...b('pre-training-mini-gpt instruction-tuning-sft reward-modeling-rlhf prompt-engineering rag function-calling guardrails'),
      ...b('image-generation-diffusion quantization'),
    ],
  },
  {
    id: 'electronics', title: 'Electronics from zero', days: 30, color: '#E0531F', icon: 'bolt',
    goal: 'gadgets', blurb: 'Volts, LEDs, sensors and your first code on a board, wired by your own hand.',
    outcome: 'Wire and program your own small gadgets.',
    units: ['What electricity is', 'The parts', 'First light', 'Sensing the world', 'Your first builds'],
    lessons: [
      ...c('what-electricity-is volts-amps-ohms how-a-breadboard-works meet-the-board resistors-colour-code leds buttons-switches-knobs'),
      ...c('diodes capacitors transistors-as-switches motors-and-drivers sensors-digital-analog the-multimeter reading-a-circuit-diagram'),
      ...c('blink-an-led flashing-open-sign push-button-doorbell dimmer-knob rgb-mood-light serial-monitor traffic-light'),
      ...c('queue-number-display reaction-time-game ringtone-buzzer dusk-streetlight lcd-clock sound-level-meter reversing-sensor'),
      ...c('shop-motion-alarm control-a-motor'),
    ],
  },
  {
    id: 'machines', title: 'How machines work', days: 47, color: '#13877A', icon: 'gear',
    goal: 'machines', blurb: 'Open up your car, engines, dams, cranes and rockets while they run.',
    outcome: 'Explain the engines, brakes, pumps and wings that move the modern world.',
    units: ['Your car', 'Power', 'Moving people', 'Building big', 'Flight and space', 'Signals and light', 'Space and robots'],
    lessons: [
      ...k('v8-engine automatic-transmission car-brakes differential turbocharger electric-car car-airbag'),
      ...k('hydro-dam wind-turbine nuclear-reactor lithium-battery solar-light steam-locomotive ship-engine'),
      ...k('elevator escalator canal-lock submarine landing-gear bicycle-gears helicopter'),
      ...k('tower-crane excavator tunnel-boring offshore-rig combine-harvester cement-kiln lighthouse'),
      ...k('airplane-wing wind-tunnel quadcopter hot-air-balloon gps rocket-staging mars-rover'),
      ...k('transistor phone-call fibre-optic undersea-cable headphones lidar mri-scanner'),
      ...k('robotic-arm cubesat-3u cubesat-6u space-telescope space-station'),
    ],
  },
  {
    id: 'car', title: 'Your car', days: 21, color: '#B4372B', icon: 'gear',
    goal: 'car', blurb: 'Open up the car in your driveway: engine, battery, gears, brakes, seatbelt and the clever little machines in between.',
    outcome: 'Explain what every part under the hood does, and what is happening when something goes wrong.',
    units: ['Under the hood', 'Going and stopping', 'Safety and smarts'],
    lessons: [
      ...k('v8-engine spark-plug fuel-injector radiator alternator starter-motor car-battery'),
      ...k('clutch-gearbox automatic-transmission differential turbocharger suspension-steering car-brakes catalytic-converter'),
      ...k('seatbelt car-airbag windshield-wipers key-fob gas-pump hybrid-car electric-car'),
    ],
  },
  {
    id: 'kitchen', title: 'In the kitchen', days: 21, color: '#B5523B', icon: 'flame',
    goal: 'home', blurb: 'Stoves, cookers, mixers and timers: the clever machines on your counter, opened up.',
    outcome: 'Explain how the kitchen\'s machines heat, chill, mix and measure, and use them better.',
    units: ['Heat and cooking', 'Hot and cold', 'Kitchen helpers'],
    lessons: [
      ...k('induction-cooktop gas-burner microwave toaster air-fryer pressure-cooker rice-cooker'),
      ...k('electric-kettle coffee-maker espresso-machine vacuum-flask fridge ice-maker blender'),
      ...k('stand-mixer kitchen-scale kitchen-timer grill-igniter dishwasher garbage-disposal faucet'),
    ],
  },
  {
    id: 'bathroom', title: 'In the bathroom', days: 14, color: '#3E8E9E', icon: 'home',
    goal: 'home', blurb: 'Showers, drains, toothbrushes and hair dryers: the bathroom, opened up.',
    outcome: 'Explain where the water comes from and goes, and how the bathroom\'s gadgets work.',
    units: ['Water in, water out', 'Gadgets and gizmos'],
    lessons: [
      ...k('toilet-cistern faucet water-heater shower-head drain-trap water-softener septic-tank'),
      ...k('hair-dryer electric-toothbrush electric-shaver aerosol-can soap-pump hand-dryer exhaust-fan'),
    ],
  },
  {
    id: 'house', title: 'Around the house', days: 21, color: '#6A7F3A', icon: 'home',
    goal: 'home', blurb: 'Dryers, pumps, locks, clocks and doorbells: the machines that quietly keep a house running.',
    outcome: 'Explain how the everyday machines around your house work, and what keeps them safe.',
    units: ['Chores and comfort', 'Safe and secure', 'Water, time and the web'],
    lessons: [
      ...k('washing-machine clothes-dryer steam-iron space-heater air-conditioner recliner mousetrap'),
      ...k('lock-and-key smart-lock video-doorbell smoke-detector co-alarm garage-door door-closer'),
      ...k('sump-pump well-pump wifi-router pendulum-clock quartz-clock mechanical-watch solar-light'),
    ],
  },
  {
    id: 'giant', title: 'Giant machines', days: 28, color: '#1F5F8B', icon: 'gear',
    goal: 'machines', blurb: 'Moon rockets, ocean liners, roller coasters and oil rigs: the biggest machines people have built, opened up.',
    outcome: 'Explain how the giants work: what lifts them, moves them, powers them and keeps them safe.',
    units: ['Big on land', 'On the move', 'Sky and space', 'Power and water'],
    lessons: [
      ...k('roller-coaster revolving-door elevator escalator tower-crane excavator tunnel-boring'),
      ...k('diesel-locomotive steam-locomotive ocean-liner ship-engine submarine canal-lock carrier-catapult'),
      ...k('helicopter moon-rocket space-shuttle booster-landing rocket-staging space-station mars-rover'),
      ...k('water-tower pumpjack offshore-rig oil-refinery hydro-dam nuclear-reactor wind-turbine'),
    ],
  },
  {
    id: 'home', title: 'Machines at home', days: 21, color: '#2F7D6B', icon: 'home',
    goal: 'home', blurb: 'The furnace, the water heater, the fridge and the faucet: open up the machines that run your home.',
    outcome: 'Explain how the machines in your home work, and what to check when one stops.',
    units: ['Heat, water and light', 'In the kitchen', 'Around the house'],
    lessons: [
      ...k('furnace water-heater smart-thermostat air-conditioner led-bulb faucet toilet-cistern'),
      ...k('fridge microwave air-fryer blender coffee-maker garbage-disposal dishwasher'),
      ...k('washing-machine robot-vacuum ceiling-fan electric-kettle toaster smoke-detector garage-door'),
    ],
  },
  {
    id: 'factory', title: 'Classic factory', days: 21, color: '#A23B72', icon: 'hand',
    goal: 'made', blurb: 'Dollar bills, baseballs, bubble wrap and bubble gum: the factory lines behind the classics.',
    outcome: 'Explain how everyday classics are made, and the clever trick inside each one.',
    units: ['Paper, pens and money', 'Toys, games and treats', 'Around the house'],
    lessons: [
      ...k('paper-money coins pencils crayons ballpoint-pen cardboard toilet-paper'),
      ...k('toy-bricks balloons baseballs tennis-balls bubble-gum bubble-wrap zipper'),
      ...k('soap toothpaste candles matches screws aluminum-cans glass-bottles'),
    ],
  },
  {
    id: 'food', title: 'Food and drink', days: 21, color: '#C2571A', icon: 'leaf',
    goal: 'made', blurb: 'Flour, cheese, ketchup and popcorn: how the food in your kitchen is made, and the science that keeps it fresh.',
    outcome: 'Explain how everyday food is made and kept safe, from the field to your table.',
    units: ['Grains and breakfast', 'Dairy and sweets', 'Snacks and the pantry'],
    lessons: [
      ...k('flour-mill bread-factory cereal pasta popcorn coffee-maker espresso-machine'),
      ...k('milk-dairy cheese ice-cream maple-syrup gummy-candy bubble-gum cocoa-to-chocolate'),
      ...k('peanut-butter potato-chips ketchup canning orange-juice soda-bottling toaster'),
    ],
  },
  {
    id: 'industry', title: 'Big industry', days: 21, color: '#4A5A6A', icon: 'gear',
    goal: 'made', blurb: 'Steel, glass, chips and power: the giant plants that make the materials of modern life.',
    outcome: 'Explain how the basic materials and energy of modern life are made, at enormous scale.',
    units: ['Metal, glass and stone', 'Energy', 'High tech'],
    lessons: [
      ...k('steel-mill float-glass concrete cement-kiln tunnel-boring tires paper-mill'),
      ...k('oil-refinery offshore-rig nuclear-reactor hydro-dam wind-turbine solar-cells desalination'),
      ...k('chip-fab transistor lithium-battery fibre-optic undersea-cable 3d-printer car-assembly'),
    ],
  },
  {
    id: 'made', title: 'How things are made', days: 35, color: '#B7791F', icon: 'hand',
    goal: 'made', blurb: 'From crayons, chips and soda cans to the dishwasher, fridge and phone in your home.',
    outcome: 'Explain how the everyday things around you are made, and how the machines at home work.',
    units: ['On the factory floor', 'Food and drink', 'Around the house', 'Home comforts', 'In your pocket'],
    lessons: [
      ...k('crayons pencils coins potato-chips toy-bricks toilet-paper aluminum-cans'),
      ...k('glass-bottles soda-bottling ice-cream cocoa-to-chocolate espresso-machine oil-refinery desalination'),
      ...k('dishwasher garage-door smoke-detector toaster washing-machine fridge microwave'),
      ...k('electric-kettle air-conditioner toilet-cistern lock-and-key sewing-machine piano-action mechanical-watch'),
      ...k('ballpoint-pen zipper camera inkjet-printer 3d-printer touchscreen smartphone'),
    ],
  },
  {
    id: 'smart-home', title: 'Smart home and gadgets', days: 30, color: '#2F5DA8', icon: 'wifi',
    goal: 'gadgets', blurb: 'Wi-Fi boards, phone alerts and dashboards for your home.',
    outcome: 'Build sensors and alarms that talk to your phone.',
    units: ['Your first Wi-Fi board', 'Keep your home safe', 'Around the house', 'Talking machines', 'Big builds'],
    lessons: [
      ...c('meet-the-esp32 hello-esp32 security-light phone-doorbell internet-clock bluetooth-phone-control live-sensor-dashboard'),
      ...c('gas-leak-alarm intruder-alert sink-leak-alarm fridge-door-alarm keypad-door-lock fall-alert pill-reminder'),
      ...c('ir-remote-tv-ac auto-water-garden smart-bin fan-follows-heat rain-gauge visitor-counter update-over-wifi'),
      ...c('sms-alert-gsm esp-now-two-boards sd-weather-logger roadside-air-quality vaccine-fridge-monitor farm-sensor-mesh community-weather-station'),
      ...c('smart-water shop-security-system'),
    ],
  },
  {
    id: 'nature', title: 'Your body and the natural world', days: 21, color: '#2E7D4F', icon: 'leaf',
    goal: 'nature', blurb: 'Your heart, eyes and brain, plus bees, storms, volcanoes and the whole Earth, opened up while they work.',
    outcome: 'Explain how your own body works and the natural forces around you.',
    units: ['Inside your body', 'Living things', 'Earth and sky'],
    lessons: [
      ...k('human-heart lungs eye inner-ear neuron kidney digestive-system'),
      ...k('hand-skeleton whole-body malaria beehive termite-mound weaver-nest bird-wing'),
      ...k('seed-germination photosynthesis baobab-tree thunderstorm ocean-waves volcano whole-earth'),
    ],
  },
  {
    id: 'farm-water', title: 'Smart farm, garden and water', days: 21, color: '#5A8A2E', icon: 'leaf',
    goal: 'gadgets', blurb: 'Wire boards that water the garden, run the well pump, hatch chicks and warn of floods.',
    outcome: 'Build sensors and timers that look after plants, animals and water by themselves.',
    units: ['Garden and greenhouse', 'Chickens, fish and grain', 'Tanks, pumps and floods'],
    lessons: [
      ...c('ugu-soil-moisture harmattan-heat-index drip-irrigation-timer tomato-cold-box solar-dryer-monitor bird-scarer smart-farm'),
      ...c('egg-incubator chick-brooder poultry-feeder-timer catfish-pond grain-store-humidity is-the-water-clean school-water-dispenser'),
      ...c('tank-level-gauge pump-stops-when-full borehole-pump-timer rainwater-tank-switcher water-vendor-flow-meter gutter-flood-warning lora-village-radio'),
    ],
  },
  {
    id: 'power-gadgets', title: 'Power, batteries and backup', days: 14, color: '#C2410C', icon: 'bolt',
    goal: 'gadgets', blurb: 'Measure batteries, watch the generator, ride out a blackout and run a solar grid.',
    outcome: 'Build meters and controllers that keep the power on and the batteries healthy.',
    units: ['Batteries and blackouts', 'Solar and the grid'],
    lessons: [
      ...c('car-battery-voltage lamp-battery-meter nepa-is-back generator-fuel-gauge generator-hour-counter generator-fumes-alarm fridge-surge-guard'),
      ...c('inverter-battery-monitor solar-charge-tracker charging-kiosk-timer load-shedding-scheduler solar-home-kit prepaid-energy-meter village-mini-grid'),
    ],
  },
  {
    id: 'smart-gadgets', title: 'Build smart gadgets', days: 20, color: '#7C3AED', icon: 'robot',
    goal: 'gadgets', blurb: 'Robots, gates, scales, ticket machines and trackers: real gadgets, wired and coded by you.',
    outcome: 'Build moving machines and everyday gadgets for shops, streets and the road.',
    units: ['Make it move', 'Gadgets for the shop', 'On the street, and your own'],
    lessons: [
      ...c('sweep-a-servo stepper-camera-slider h-bridge-toy-car line-following-robot robot-arm bean-sorter automatic-estate-gate'),
      ...c('pepper-soup-thermometer phone-drop-detector tomato-market-scale scale-with-receipt charging-kiosk-billing pure-water-vending clinic-queue-caller'),
      ...c('keke-tracker brt-arrival-board market-stall-fire-alarm okada-helmet afrobeats-beat-box your-own-invention'),
    ],
  },
];

// The order people see: machines and how things are made lead (what most people want to learn); AI comes later.
const ORDER = ['machines', 'car', 'home', 'kitchen', 'bathroom', 'house', 'giant', 'made', 'factory', 'food', 'industry', 'nature', 'electronics', 'smart-home', 'smart-gadgets', 'power-gadgets', 'farm-water', 'ai-explained'];
COURSES.sort((x, y) => ORDER.indexOf(x.id) - ORDER.indexOf(y.id));

// The Discover feed: one themed lesson a day, like a TV channel (Sunday is the review challenge).
export const WEEK = [
  { day: 'Sun', theme: 'Fix-it challenge', site: null },
  { day: 'Mon', theme: 'Inside a machine', pool: k('v8-engine turbocharger automatic-transmission escalator wind-turbine elevator helicopter tower-crane rocket-staging roller-coaster moon-rocket booster-landing diesel-locomotive ocean-liner pumpjack') },
  { day: 'Tue', theme: 'How it\'s made', pool: k('crayons potato-chips aluminum-cans ice-cream toy-bricks coins glass-bottles soda-bottling toilet-paper pencils paper-money baseballs bubble-wrap popcorn cheese ketchup gummy-candy') },
  { day: 'Wed', theme: 'Make it', pool: c('dusk-streetlight traffic-light reaction-time-game push-button-doorbell rgb-mood-light reversing-sensor') },
  { day: 'Thu', theme: 'How AI works', pool: b('tokens next-word word-embeddings rag image-generation-diffusion self-attention gradient-descent') },
  { day: 'Fri', theme: 'Around the house', pool: k('dishwasher garage-door smoke-detector toaster washing-machine fridge microwave mechanical-watch furnace water-heater robot-vacuum air-fryer garbage-disposal led-bulb') },
  { day: 'Sat', theme: 'Nature and the body', pool: k('human-heart eye lungs neuron photosynthesis thunderstorm volcano beehive') },
];

export const GOALS = [
  { id: 'machines', label: 'Know how machines work', icon: 'gear' },
  { id: 'car', label: 'Understand my car', icon: 'gear' },
  { id: 'home', label: 'Know how my home works', icon: 'home' },
  { id: 'made', label: 'See how things are made', icon: 'hand' },
  { id: 'nature', label: 'Understand the body and nature', icon: 'leaf' },
  { id: 'gadgets', label: 'Build gadgets and electronics', icon: 'bolt' },
  { id: 'ai', label: 'Understand how AI really works', icon: 'spark' },
];

export const course = id => COURSES.find(c => c.id === id);
export const unitOf = (c, i) => Math.floor(i / 7);
