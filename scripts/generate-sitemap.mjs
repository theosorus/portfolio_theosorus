// Regenerates public/sitemap.xml with today's build date as lastmod, so the
// date reflects an actual rebuild instead of being hand-edited (and left
// stale) each time a page changes. Run as part of the build.
import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const pages = [
  { loc: 'https://tcastillo.me/', changefreq: 'monthly', priority: '1.0' },
  { loc: 'https://tcastillo.me/mentions-legales.html', changefreq: 'yearly', priority: '0.1' },
  { loc: 'https://tcastillo.me/fr/', changefreq: 'monthly', priority: '1.0' },
  { loc: 'https://tcastillo.me/fr/mentions-legales.html', changefreq: 'yearly', priority: '0.1' },
];

const today = new Date().toISOString().slice(0, 10);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map(
      (p) =>
        `  <url>\n` +
        `    <loc>${p.loc}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${p.changefreq}</changefreq>\n` +
        `    <priority>${p.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

await writeFile(resolve(root, 'public/sitemap.xml'), xml);
console.log(`generated public/sitemap.xml (lastmod ${today})`);
