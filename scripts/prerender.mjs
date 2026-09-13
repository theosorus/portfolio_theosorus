// Runs after the client and SSR builds. Renders entry-server's App to a
// string and inlines it into dist/index.html, so the HTML Vercel serves
// already contains the page instead of an empty <div id="root">.
//
// The client still mounts with createRoot (not hydrateRoot) and replaces
// this markup on load, so a visitor's experience is unchanged — this only
// changes what a crawler sees before JS runs.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { renderHome, renderLegal, renderHomeFr, renderLegalFr } = await import(
  resolve(root, 'dist-ssr/entry-server.js')
);

const pages = [
  ['dist/index.html', renderHome],
  ['dist/mentions-legales.html', renderLegal],
  ['dist/fr/index.html', renderHomeFr],
  ['dist/fr/mentions-legales.html', renderLegalFr],
];

const marker = '<div id="root"></div>';
for (const [relPath, renderFn] of pages) {
  const html = renderFn();
  const path = resolve(root, relPath);
  const template = await readFile(path, 'utf-8');
  if (!template.includes(marker)) {
    throw new Error(`prerender: expected to find ${marker} in ${relPath}`);
  }
  await writeFile(path, template.replace(marker, `<div id="root">${html}</div>`));
  console.log('prerendered %s (%d chars of markup inlined)', relPath, html.length);
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
