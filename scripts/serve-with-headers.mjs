// Local-only test harness: serves dist/ with the exact headers vercel.json
// declares, so CSP (and the redirect) can be exercised against a real
// browser before ever touching production. Not part of the build; not
// referenced by package.json.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf-8'));
const globalHeaders = config.headers.find((h) => h.source === '/(.*)').headers;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = createServer(async (req, res) => {
  for (const h of globalHeaders) res.setHeader(h.key, h.value);

  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  let filePath = join(distDir, urlPath);

  try {
    const s = await stat(filePath);
    if (s.isDirectory()) filePath = join(filePath, 'index.html');
    const body = await readFile(filePath);
    res.setHeader('Content-Type', mime[extname(filePath)] ?? 'application/octet-stream');
    res.writeHead(200);
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

const port = Number(process.argv[2] ?? 4177);
server.listen(port, () => console.log(`serving dist/ with vercel.json headers on :${port}`));
