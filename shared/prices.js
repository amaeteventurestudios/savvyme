// Plans (US dollars). Checkout is not switched on yet: the quiz's paywall says so and nobody is charged.
export const PRICES = [
  { id: 'free', name: 'Free', show: '$0', per: '', note: 'Forever', cta: 'Start free',
    items: ['The Discover feed, every day', 'The first week of every course', 'Daily, weekly and monthly streaks', 'Your workshop shelf'] },
  { id: 'year', name: 'Pro yearly', show: '$59.99', per: ' /year', note: 'That\'s $5 a month. 7 days free.', cta: 'Try 7 days free', best: true,
    items: ['Every course, start to finish', 'Review that brings back what you missed', 'Listen mode', 'Certificates', 'Ask about any part (coming soon)'] },
  { id: 'family', name: 'Family', show: '$89.99', per: ' /year', note: 'Up to 5 people', cta: 'Start free',
    items: ['Everything in Pro, for five', 'A streak for each person', 'A shared family board', 'Gift it for the holidays'] },
];
export const MONTHLY = { show: '$9.99', per: ' /month' };
