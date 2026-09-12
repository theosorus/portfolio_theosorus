// One-off, re-runnable pass over public/ that resizes every raster asset down
// to a sane multiple of its actual on-page display size. Lighthouse measured
// icons displayed at 14-16px shipping at up to 4096px, and the whole image
// budget (2.7 MB of a 3.1 MB page) was dominated by this mismatch rather than
// by format choice. Filenames and extensions are kept identical so no source
// reference needs to change — this only rewrites bytes already on disk.
import { readdir, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// [directory relative to public/, max longest-edge px, jpeg/webp quality]
const jobs = [
  ['skills', 64, 82],    // displayed at 16-20px (tag chips), 3-4x covers retina + hover
  ['icons', 64, 82],     // same tag-chip treatment; menu/theme icons are already svg
  ['projects', 900, 82], // 4-col grid inside a 1152px container: ~280px wide, 3x covers retina
  ['career', 900, 82],
  ['', 900, 90],         // top-level files: island.jpeg (hero photo), same retina margin
];

let totalBefore = 0;
let totalAfter = 0;

async function processDir(dir, maxEdge, quality) {
  const abs = join(root, dir);
  let entries;
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = extname(entry.name).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    // og-image.jpg must stay exactly 1200x630, the fixed Open Graph/Twitter size.
    if (entry.name === 'og-image.jpg') continue;

    const path = join(abs, entry.name);
    const before = (await stat(path)).size;
    const img = sharp(path);
    const meta = await img.metadata();
    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

    let pipeline = img;
    if (longest > maxEdge) {
      pipeline = pipeline.resize({
        width: maxEdge,
        height: maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    const buf =
      ext === '.png'
        ? await pipeline.png({ compressionLevel: 9, quality }).toBuffer()
        : await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();

    if (buf.length < before) {
      await sharp(buf).toFile(path);
      totalBefore += before;
      totalAfter += buf.length;
      console.log(`${dir}/${entry.name}  ${before}B -> ${buf.length}B`);
    }
  }
}

for (const [dir, maxEdge, quality] of jobs) {
  await processDir(dir, maxEdge, quality);
}

console.log(
  `\nTotal: ${(totalBefore / 1024).toFixed(0)} KiB -> ${(totalAfter / 1024).toFixed(0)} KiB ` +
    `(${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}% smaller)`,
);
