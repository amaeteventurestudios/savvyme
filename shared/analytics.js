// PostHog, only when a project key is set in shared/config.js. track() and who() are safe to call either way.
// One cookie across the home page, the quiz and the app (cross_subdomain_cookie), so the funnel follows a visitor
// from start. to app. as the same person. No session recordings, no ads, nothing sold.
import { POSTHOG_KEY, POSTHOG_HOST } from './config.js';

let ph = null;
if (POSTHOG_KEY && !/^(localhost|127\.)/.test(location.hostname)) {
  // the standard PostHog loader: queues calls until array.js arrives
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_out_capturing get_distinct_id people.set".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  window.posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST, person_profiles: 'identified_only', cross_subdomain_cookie: true,
    capture_pageview: true, capture_pageleave: true, disable_session_recording: true, respect_dnt: true });
  ph = window.posthog;
  ph.register({ part: /^start\./.test(location.hostname) || location.pathname.startsWith('/start') ? 'quiz' : /^app\./.test(location.hostname) || location.pathname.startsWith('/app') ? 'app' : 'home' });
}
export const track = (name, props) => { try { ph && ph.capture(name, props); } catch {} };
export const who = (id, props) => { try { ph && (id ? ph.identify(id, props) : ph.reset()); } catch {} };
