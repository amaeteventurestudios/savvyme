// Writes robots.txt, sitemap.xml and llms.txt from the course data, so search engines and AI assistants can find
// SavvyMe. Run after changing shared/courses.js: node tools/seo.mjs
import { writeFileSync } from 'node:fs';
import { COURSES } from '../shared/courses.js';
import { LESSONS } from '../shared/lessons.js';

const SITE = 'https://savvyme.amaete.com';
const day = new Date().toISOString().slice(0, 10);
const n = new Set(COURSES.flatMap(c => c.lessons)).size;

writeFileSync('robots.txt', `User-agent: *
Allow: /
Disallow: /app/
Disallow: /api/
Disallow: /_/

Sitemap: ${SITE}/sitemap.xml
`);

writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${day}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE}/start/</loc><lastmod>${day}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
`);

const course = c => {
  const first = c.lessons.slice(0, 7).map(id => LESSONS[id]?.title).filter(Boolean);
  return `### ${c.title} (${c.lessons.length} days)\n${c.blurb} By the end: ${c.outcome}\nFirst week: ${first.join(', ')}.\n`;
};
writeFileSync('llms.txt', `# SavvyMe

> SavvyMe is a daily learning app: five minutes a day with a real, live 3D machine you can turn, open, break and fix,
> in step-by-step courses on how machines work, how things are made, electronics and AI. Lessons end with three quick
> checks, and daily, weekly and monthly streaks keep you going.

- Home: ${SITE}/
- Build your plan (a short quiz that picks your course): ${SITE}/start/
- The app (web, works on any phone): ${SITE}/app/

## How it works
- Pick a course. Each day unlocks the next lesson in order, grouped in weekly units.
- A lesson is a live 3D model with a short story, things to try, and three check questions.
- The first week of every course is free. SavvyMe Pro unlocks every course. No ads.

## Courses
${COURSES.map(course).join('\n')}
## About
SavvyMe has ${COURSES.length} courses and ${n} hands-on lessons, and adds new ones every week.
`);
console.log('robots.txt, sitemap.xml, llms.txt written');
