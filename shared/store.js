// Progress, streaks and Sparks. Always kept in the browser; when someone signs in, shared/account.js also keeps a copy
// on the server (PocketBase) and merges the two, so progress follows them to any device.
import { COURSES, course } from './courses.js';

const KEY = 'savvyme-v1';
const blank = () => ({ profile: {}, active: null, progress: {}, days: {}, sparks: 0, freezes: 1, freezeWeek: null, shelf: [], plan: 'free', reviews: [] });
let S = blank();
try { S = { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}
export const state = () => S;
let onSave = null;
export const setSaver = fn => { onSave = fn; };
export function save() { S.savedAt = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} onSave && onSave(S); }
export function replace(next) { S = { ...blank(), ...next }; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }

// two copies of progress (this device and the server) become one: nothing finished on either is lost
export function merge(a, b) {
  if (!b) return a; if (!a) return b;
  const [old, nu] = (a.savedAt || 0) >= (b.savedAt || 0) ? [b, a] : [a, b];
  const days = { ...old.days }; for (const [k, v] of Object.entries(nu.days || {})) days[k] = Math.max(days[k] || 0, v);
  const progress = { ...old.progress }; for (const [k, v] of Object.entries(nu.progress || {})) progress[k] = [...new Set([...(progress[k] || []), ...v])];
  const seen = new Set(), reviews = [...(old.reviews || []), ...(nu.reviews || [])].filter(r => { const k = r.id + r.due; if (seen.has(k)) return false; seen.add(k); return true; });
  return { ...old, ...nu, profile: { ...old.profile, ...nu.profile }, days, progress, reviews,
    shelf: [...new Set([...(old.shelf || []), ...(nu.shelf || [])])], sparks: Math.max(old.sparks || 0, nu.sparks || 0), savedAt: Math.max(old.savedAt || 0, nu.savedAt || 0) };
}
export function reset() { S = blank(); save(); }

// ---- dates (local time) ----
const pad = n => String(n).padStart(2, '0');
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const weekStart = d => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }; // Monday
const active = k => !!S.days[k];

// ---- the profile from the quiz (passed to the app in the link, since the quiz and the app are on different hosts) ----
export function setProfile(p) {
  S.profile = { ...S.profile, ...p };
  if (p.course && !S.active) S.active = p.course;
  if (p.plan) S.plan = p.plan;
  save();
}
export const encodeProfile = p => btoa(unescape(encodeURIComponent(JSON.stringify(p))));
export const decodeProfile = s => { try { return JSON.parse(decodeURIComponent(escape(atob(s)))); } catch { return null; } };

// ---- courses ----
export const pro = () => S.plan === 'pro' || S.plan === 'trial';
export const doneIn = id => (S.progress[id] || []);
export function nextIndex(id) { const c = course(id); const d = doneIn(id); const i = c.lessons.findIndex(l => !d.includes(l)); return i < 0 ? c.lessons.length : i; }
export const locked = (c, i) => !pro() && (c.pro || i >= 7);
export function startCourse(id) { S.active = id; save(); }

// ---- finishing a lesson ----
export const LEVELS = [['Apprentice', 0], ['Tinkerer', 100], ['Maker', 300], ['Builder', 700], ['Engineer', 1500], ['Savant', 3000]];
export function level(sp = S.sparks) {
  let i = 0; while (i + 1 < LEVELS.length && sp >= LEVELS[i + 1][1]) i++;
  const [name, at] = LEVELS[i], next = LEVELS[i + 1];
  return { n: i + 1, name, at, next: next && next[1], pct: next ? (sp - at) / (next[1] - at) : 1 };
}
export function finish(lessonId, courseId, right, total) {
  const k = dayKey(), first = !active(k);
  const before = streaks();
  S.days[k] = (S.days[k] || 0) + 1;
  if (courseId) { const d = (S.progress[courseId] ||= []); if (!d.includes(lessonId)) d.push(lessonId); }
  if (!S.shelf.includes(lessonId)) S.shelf.push(lessonId);
  const got = 20 + right * 10 + (first ? 10 : 0) + (right === total && total ? 10 : 0);
  S.sparks += got;
  if (right < total) S.reviews.push({ id: lessonId, due: dayKey(addDays(new Date(), 2)) });
  save();
  const after = streaks();
  return { sparks: got, first, before, after, milestone: [7, 30, 100, 365].includes(after.daily) && first ? after.daily : 0 };
}

// ---- streaks: daily, weekly (hit your goal of N days in a week) and monthly (every week in the month hit) ----
export function streaks(now = new Date()) {
  const goal = S.profile.weeklyGoal || 5;
  // daily: run of active days ending today (or yesterday, if today is not done yet); one freeze a week bridges a gap
  let d = 0, x = new Date(now), usedFreeze = false;
  if (!active(dayKey(x))) x = addDays(x, -1);
  for (let gap = 0; gap < 2000; gap++) {
    if (active(dayKey(x))) { d++; x = addDays(x, -1); continue; }
    if (!usedFreeze && S.freezes > 0 && d > 0 && active(dayKey(addDays(x, -1)))) { usedFreeze = true; x = addDays(x, -1); continue; }
    break;
  }
  const daysIn = (ws) => { let n = 0; for (let i = 0; i < 7; i++) if (active(dayKey(addDays(ws, i)))) n++; return n; };
  // weekly: run of weeks that met the goal, counting this week once it is met
  let w = 0, ws = weekStart(now);
  if (daysIn(ws) < goal) ws = addDays(ws, -7);
  while (daysIn(ws) >= goal && w < 600) { w++; ws = addDays(ws, -7); }
  // monthly: months where every week that started in the month met the goal
  const monthOk = (y, m) => { let s = weekStart(new Date(y, m, 1)); if (s.getMonth() !== m) s = addDays(s, 7); let any = false;
    for (; s.getMonth() === m; s = addDays(s, 7)) { if (s > now) break; any = true; if (daysIn(s) < goal) return false; } return any; };
  let mo = 0, y = now.getFullYear(), m = now.getMonth();
  const thisDone = (() => { let s = weekStart(new Date(y, m, 1)); if (s.getMonth() !== m) s = addDays(s, 7); for (; s.getMonth() === m; s = addDays(s, 7)) if (daysIn(s) < goal && addDays(s, 7) <= now) return false; return new Date(y, m + 1, 1) <= now; })();
  if (!thisDone) { m--; if (m < 0) { m = 11; y--; } }
  while (monthOk(y, m) && mo < 120) { mo++; m--; if (m < 0) { m = 11; y--; } }
  return { daily: d, weekly: w, monthly: mo, weekDays: daysIn(weekStart(now)), goal, today: active(dayKey(now)) };
}
export function week(now = new Date()) { const ws = weekStart(now); return [...Array(7)].map((_, i) => { const t = addDays(ws, i); return { k: dayKey(t), on: active(dayKey(t)), today: dayKey(t) === dayKey(now), future: t > now, label: 'MTWTFSS'[i] }; }); }

// ---- for the preview: fill a few past days so the streaks show something ----
export function demo() {
  const now = new Date();
  for (let i = 1; i <= 23; i++) if (i % 9 !== 4) S.days[dayKey(addDays(now, -i))] = 1;
  S.sparks = Math.max(S.sparks, 420); save();
}
export { COURSES };
