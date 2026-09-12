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
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'));

const appHtml = render();

const indexPath = resolve(root, 'dist/index.html');
const template = await readFile(indexPath, 'utf-8');

const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: expected to find ${marker} in dist/index.html`);
}

const finalHtml = template.replace(marker, `<div id="root">${appHtml}</div>`);
await writeFile(indexPath, finalHtml);

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });

console.log('prerendered dist/index.html (%d chars of markup inlined)', appHtml.length);
