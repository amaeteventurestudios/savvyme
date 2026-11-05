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
    id: 'machines', title: 'How machines work', days: 35, color: '#13877A', icon: 'gear',
    goal: 'machines', blurb: 'Open up your car, engines, dams, cranes and rockets while they run.',
    outcome: 'Explain the engines, brakes, pumps and wings that move the modern world.',
    units: ['Your car', 'Power', 'Moving people', 'Building big', 'Flight and space'],
    lessons: [
      ...k('v8-engine automatic-transmission car-brakes differential turbocharger electric-car car-airbag'),
      ...k('hydro-dam wind-turbine nuclear-reactor lithium-battery solar-light steam-locomotive ship-engine'),
      ...k('elevator escalator canal-lock submarine landing-gear bicycle-gears helicopter'),
      ...k('tower-crane excavator tunnel-boring offshore-rig combine-harvester cement-kiln lighthouse'),
      ...k('airplane-wing wind-tunnel quadcopter hot-air-balloon gps rocket-staging mars-rover'),
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
    id: 'build-software', title: 'Build your own software', days: 30, color: '#8A2D5C', icon: 'code',
    goal: 'code', blurb: 'Build a database, a shell, a compiler and a game server from nothing.',
    outcome: 'Know what really happens inside the software you use every day.',
    units: ['Store it', 'Run it', 'Talk over the network', 'Make pictures', 'Trust and money'],
    lessons: [
      ...b('build-a-database build-a-hash-table build-a-btree-database build-a-message-log build-a-time-travel-database build-a-graph-database build-a-cli-tool'),
      ...b('build-a-shell build-an-interpreter build-a-compiler build-a-regex-engine build-a-template-engine build-a-flag-parser build-a-package-manager'),
      ...b('build-a-web-server build-a-dns-resolver build-a-cache-cdn build-a-network-game build-a-virtual-switch same-origin-policy build-a-ci-system'),
      ...b('build-a-software-renderer build-a-ray-tracer build-a-3d-modeller build-a-video-codec build-a-virtual-dom build-a-ui-framework build-an-emulator'),
      ...b('build-a-blockchain build-a-signed-ledger'),
    ],
  },
  {
    id: 'ai-builder', title: 'Become an AI builder', days: 90, color: '#1F2A44', icon: 'robot',
    goal: 'career', blurb: 'The long road: maths, models, language, agents and running them safely.',
    outcome: 'Build and run an AI agent, and be ready for an associate exam.',
    units: ['Setup', 'The maths that matters', 'Machine learning', 'Neural networks', 'Language', 'Transformers',
      'Making an LLM', 'Using LLMs', 'Agents', 'Agents at work', 'Running it safely', 'Your capstone', 'Exam week'],
    lessons: [
      ...b('dev-environment git-basics api-keys notebooks python-for-ai terminal-pipes gpu-basics'),
      ...b('vectors matrix-transformations derivatives autodiff probability bayes gradient-descent'),
      ...b('what-is-ml linear-regression logistic-regression decision-trees model-evaluation bias-variance ensembles'),
      ...b('perceptron multi-layer-networks backpropagation activation-functions loss-functions optimizers intro-to-pytorch'),
      ...b('tokens text-processing word-embeddings subword-tokenization attention-mechanism sequence-to-sequence structured-outputs-constrained-decoding'),
      ...b('why-transformers self-attention multi-head-attention positional-encoding full-transformer kv-cache-flash-attention mixture-of-experts'),
      ...b('next-word pre-training-mini-gpt instruction-tuning-sft rlhf dpo evaluation quantization'),
      ...b('prompt-engineering few-shot-cot structured-outputs embeddings context-engineering rag advanced-rag'),
      ...b('function-calling model-context-protocol agent-loop langgraph-state-machines agent-framework-tradeoffs caching-cost guardrails'),
      ...b('production-app prompt-caching fine-tuning-lora evaluation-2 a2a-protocol agent-observability-platforms agent-workbench-why-models-fail'),
      ...b('ai-gateways ab-testing-llm-features alignment-faking ai-control-protocols anomaly-detection agent-harness-loop-contract agent-negotiation'),
      ...b('build-a-transformer-capstone agent-workbench-capstone vision-pipeline-capstone building-complete-llm-pipeline anthropic-workflow-patterns agent-consensus-bft agno-and-mastra-runtimes'),
      ...b('exam-tool-design'),
    ],
  },
];

// The order people see: machines and how things are made lead (what most people want to learn); AI comes later.
const ORDER = ['machines', 'made', 'electronics', 'smart-home', 'ai-explained', 'build-software', 'ai-builder'];
COURSES.sort((x, y) => ORDER.indexOf(x.id) - ORDER.indexOf(y.id));

// The Discover feed: one themed lesson a day, like a TV channel (Sunday is the review challenge).
export const WEEK = [
  { day: 'Sun', theme: 'Fix-it challenge', site: null },
  { day: 'Mon', theme: 'Inside a machine', pool: k('v8-engine turbocharger automatic-transmission escalator wind-turbine elevator helicopter tower-crane rocket-staging') },
  { day: 'Tue', theme: 'How it\'s made', pool: k('crayons potato-chips aluminum-cans ice-cream toy-bricks coins glass-bottles soda-bottling toilet-paper pencils') },
  { day: 'Wed', theme: 'Make it', pool: c('dusk-streetlight traffic-light reaction-time-game push-button-doorbell rgb-mood-light reversing-sensor') },
  { day: 'Thu', theme: 'How AI works', pool: b('tokens next-word word-embeddings rag image-generation-diffusion self-attention gradient-descent') },
  { day: 'Fri', theme: 'Build it yourself', pool: b('build-a-database build-a-shell build-a-web-server build-a-regex-engine build-a-ray-tracer') },
  { day: 'Sat', theme: 'Nature and the body', pool: k('human-heart eye lungs neuron photosynthesis thunderstorm volcano beehive') },
];

export const GOALS = [
  { id: 'machines', label: 'Know how machines work', icon: 'gear' },
  { id: 'made', label: 'See how things are made', icon: 'hand' },
  { id: 'gadgets', label: 'Build gadgets and electronics', icon: 'bolt' },
  { id: 'ai', label: 'Understand how AI really works', icon: 'spark' },
  { id: 'code', label: 'Build my own software', icon: 'code' },
  { id: 'career', label: 'Start a career in AI', icon: 'robot' },
];

export const course = id => COURSES.find(c => c.id === id);
export const unitOf = (c, i) => Math.floor(i / 7);
