// The CSP in vercel.json trusts the inline GTM bootstrap script by its
// SHA-256 hash (script-src needs a nonce or hash to anchor 'strict-dynamic'
// on a static, prerendered site where per-request nonces aren't possible).
// A hash is only as good as it staying in sync with the script it pins: if
// index.html's snippet ever changes by a single byte without vercel.json
// being updated to match, GTM silently stops loading in every browser that
// enforces the policy. This fails the build instead, loudly, before that
// can reach production.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function extractInlineScript(html) {
  const m = html.match(/<script>\(function\(w,d,s,l,i\)[\s\S]*?<\/script>/);
  if (!m) return null;
  return m[0].replace(/^<script>/, '').replace(/<\/script>$/, '');
}

function hashOf(content) {
  return `sha256-${createHash('sha256').update(content, 'utf-8').digest('base64')}`;
}

const vercelConfig = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf-8'));
const cspHeader = vercelConfig.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy' || h.key === 'Content-Security-Policy-Report-Only');

if (!cspHeader) {
  throw new Error('check-csp-hash: no Content-Security-Policy header found in vercel.json');
}

const declaredHashMatch = cspHeader.value.match(/'sha256-[A-Za-z0-9+/=]+'/);
if (!declaredHashMatch) {
  throw new Error('check-csp-hash: no sha256 hash found in the CSP script-src directive');
}
const declaredHash = declaredHashMatch[0].slice(1, -1);

for (const file of ['index.html', 'mentions-legales.html']) {
  const html = await readFile(resolve(root, file), 'utf-8');
  const inline = extractInlineScript(html);
  if (!inline) {
    throw new Error(`check-csp-hash: no inline GTM script found in ${file}`);
  }
  const actualHash = hashOf(inline);
  if (actualHash !== declaredHash) {
    throw new Error(
      `check-csp-hash: ${file}'s inline script hash does not match vercel.json's CSP.\n` +
        `  vercel.json declares: ${declaredHash}\n` +
        `  ${file} actually is:  ${actualHash}\n` +
        `Update the script-src hash in vercel.json to match.`,
    );
  }
}

console.log('CSP hash check passed: vercel.json matches both HTML files\' inline GTM script.');
