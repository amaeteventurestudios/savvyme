// Writes shared/lessons.js: title, link, a one-line blurb and up to three checks for every lesson the courses use.
// Reads the sibling lesson repos (they sit next to this one: ../build, ../circuits, ../cutaways; set LESSON_ROOT to change).
// Run: node tools/lessons.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { COURSES, WEEK } from '../shared/courses.js';
import { EXTRA } from './checks.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const ROOT = process.env.LESSON_ROOT || resolve(here, '../..');
const SITES = {
  build: { url: 'https://build.amaete.com', file: s => `build/${s}/lesson.js` },
  circuits: { url: 'https://circuits.amaete.com', file: s => `circuits/${s}/project.js` },
  cutaways: { url: 'https://cutaways.amaete.com', file: s => `cutaways/${s}/model.js` },
};

const ids = new Set([...COURSES.flatMap(c => c.lessons), ...WEEK.flatMap(w => w.pool || [])]);
const strip = s => String(s || '').replace(/\*([^*]+)\*/g, '$1').replace(/\s+/g, ' ').trim();
const first = s => { s = strip(s); const m = s.match(/^.*?[.!?](\s|$)/); return (m ? m[0] : s).trim().slice(0, 180); };

const out = {}, missing = [];
for (const id of ids) {
  const [site, slug] = id.split(':');
  const S = SITES[site], f = resolve(ROOT, S.file(slug));
  if (!existsSync(f)) { missing.push(id); continue; }
  let M;
  try { M = (await import(pathToFileURL(f).href)).default; } catch (e) { missing.push(id + ' (' + e.message.slice(0, 60) + ')'); continue; }
  let checks = [];
  if (site === 'build') checks = (M.check || []).map(q => ({ q: q.q, a: q.options, ok: q.answer, why: q.why }));
  if (site === 'cutaways') checks = (M.quiz || []).map(q => ({ q: q.q, a: q.a, ok: q.ok, why: q.why }));
  if (EXTRA[id]) checks = EXTRA[id];
  out[id] = {
    site, slug, title: strip(M.title), url: `${S.url}/${slug}/`,
    blurb: first(M.description || M.intro || M.overview || ''),
    place: M.place || undefined,
    checks: checks.slice(0, 3),
  };
}
const body = `// Written by tools/lessons.mjs from the Amaete lesson sites. Do not edit by hand.\nexport const LESSONS = ${JSON.stringify(out, null, 0).replace(/},"/g, '},\n"')};\n`;
writeFileSync(resolve(here, '../shared/lessons.js'), body);
console.log(`${Object.keys(out).length} lessons written, ${Object.values(out).filter(l => !l.checks.length).length} without checks`);
if (missing.length) console.log('Missing:', missing.join(', '));
