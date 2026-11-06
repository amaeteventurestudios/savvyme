// Site settings that change per deploy. Both are safe to publish.
// PostHog: the project's public key (Project settings > Project API key, starts with "phc_"). Empty = no analytics.
export const POSTHOG_KEY = '';
export const POSTHOG_HOST = 'https://us.i.posthog.com';

// The accounts server (PocketBase) answers at /api on the app's host: app.<domain>, or the one-host
// savvyme.amaete.com (quiz at /start/, app at /app/). Anywhere else (a preview, the quiz host)
// there is no server and progress stays on the device. For local testing: localStorage['sm-api'] = 'http://127.0.0.1:8196'.
export const ONE_HOST = ['savvyme.amaete.com', 'savvyme.noveniqe.com'];
let api = '';
try { api = localStorage.getItem('sm-api') || ''; } catch {}
if (!api && (/^app\./.test(location.hostname) || ONE_HOST.includes(location.hostname))) api = location.origin;
export const API = api;
