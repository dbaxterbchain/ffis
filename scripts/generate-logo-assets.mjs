/**
 * Generates every derived logo asset in public/ from the masters in brand/.
 * Re-run with `node scripts/generate-logo-assets.mjs` whenever the masters change.
 *
 * Masters (transparent PNG):
 *   brand/lockup-lotus.png           lotus only        -> nav mark, watermark, favicon
 *   brand/lockup-rounded-square.png  full lockup       -> app icons + OG image
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const brand = (f) => join(root, 'brand', f);
const out = (f) => join(root, 'public', f);

/** Brand blue, sampled from the lockup background. */
const BLUE = '#000099';

const LOTUS = brand('lockup-lotus.png');
const SQUARE = brand('lockup-rounded-square.png');

/**
 * The lotus master is a transparent lockup (lotus on top, wordmark below). The
 * wordmark is redundant wherever we already render the org name as text, so we
 * crop to just the lotus. There's a clean empty separator row at y=1352 of the
 * 2343px-tall master (≈57.7%); we cut there and trim the transparent edges.
 */
const LOTUS_CUT_Y = 1352;

/** Crop the lotus region out of the lockup master and trim, return a PNG buffer. */
async function lotusOnly() {
  const { width } = await sharp(LOTUS).metadata();
  // Two passes: sharp applies trim before extract within one pipeline, so the
  // extract must finish first, then trim the cropped result.
  const cropped = await sharp(LOTUS)
    .extract({ left: 0, top: 0, width, height: LOTUS_CUT_Y })
    .png()
    .toBuffer();
  return sharp(cropped).trim().png().toBuffer();
}

/** Recolor every opaque pixel to white, keeping the original alpha. */
async function whiteSilhouette(srcBuffer) {
  const { data, info } = await sharp(srcBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

/** Solid blue square (optionally rounded) with `content` composited centered. */
function onBlueSquare(size, content, { radius = 0 } = {}) {
  const bg = radius
    ? Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
          `<rect width="${size}" height="${size}" rx="${radius}" fill="${BLUE}"/></svg>`,
      )
    : {
        create: {
          width: size,
          height: size,
          channels: 4,
          background: BLUE,
        },
      };
  return sharp(bg).composite([{ input: content, gravity: 'center' }]).png().toBuffer();
}

async function run() {
  const lotusTrim = await lotusOnly();
  const whiteLotus = await whiteSilhouette(lotusTrim);

  // 1. Nav mark — colored lotus only (the org name is already typeset beside it).
  await sharp(lotusTrim).resize({ width: 320 }).png().toFile(out('logo-lotus.png'));

  // 2. Decorative watermark — white silhouette of the FULL lockup (lotus + words),
  //    which reads well as a faint background mark.
  const lockupTrim = await sharp(LOTUS).trim().png().toBuffer();
  const whiteLockup = await whiteSilhouette(lockupTrim);
  await sharp(whiteLockup).resize({ width: 800 }).png().toFile(out('lotus-watermark.png'));

  // 3. Favicons — white lotus on a rounded blue square.
  for (const size of [16, 32]) {
    const lotus = await sharp(whiteLotus).resize({ width: Math.round(size * 0.72) }).toBuffer();
    const png = await onBlueSquare(size, lotus, { radius: Math.round(size * 0.22) });
    await sharp(png).toFile(out(`favicon-${size}.png`));
  }

  // 3b. favicon.svg — blue rounded rect + embedded white lotus.
  {
    const inner = 64;
    const lotus = await sharp(whiteLotus)
      .resize({ width: Math.round(inner * 0.72) })
      .png()
      .toBuffer();
    const meta = await sharp(lotus).metadata();
    const x = Math.round((inner - meta.width) / 2);
    const y = Math.round((inner - meta.height) / 2);
    const b64 = lotus.toString('base64');
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${inner} ${inner}" ` +
      `role="img" aria-label="Foundation for Innovation in Society">\n` +
      `  <rect width="${inner}" height="${inner}" rx="14" fill="${BLUE}"/>\n` +
      `  <image x="${x}" y="${y}" width="${meta.width}" height="${meta.height}" ` +
      `href="data:image/png;base64,${b64}"/>\n` +
      `</svg>\n`;
    const { writeFile } = await import('node:fs/promises');
    await writeFile(out('favicon.svg'), svg, 'utf8');
  }

  // 4. App icons from the rounded-square lockup.
  await sharp(SQUARE).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(out('icon-192.png'));
  await sharp(SQUARE).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(out('icon-512.png'));

  // apple-touch: blue square (no transparency) with small padding.
  {
    const lockup = await sharp(SQUARE).resize({ width: Math.round(180 * 0.96) }).toBuffer();
    const png = await onBlueSquare(180, lockup);
    await sharp(png).toFile(out('apple-touch-icon.png'));
  }

  // maskable: full-bleed blue with ~10% safe padding.
  {
    const lockup = await sharp(SQUARE).resize({ width: Math.round(512 * 0.8) }).toBuffer();
    const png = await onBlueSquare(512, lockup);
    await sharp(png).toFile(out('icon-512-maskable.png'));
  }

  // 5. Open Graph image — lockup centered on a 1200x630 blue canvas.
  {
    const lockup = await sharp(SQUARE).resize({ height: 560 }).toBuffer();
    const og = await sharp({
      create: { width: 1200, height: 630, channels: 4, background: BLUE },
    })
      .composite([{ input: lockup, gravity: 'center' }])
      .png()
      .toBuffer();
    await sharp(og).toFile(out('og/ffis-og.png'));
  }

  // Report.
  const files = [
    'logo-lotus.png',
    'lotus-watermark.png',
    'favicon-16.png',
    'favicon-32.png',
    'favicon.svg',
    'icon-192.png',
    'icon-512.png',
    'icon-512-maskable.png',
    'apple-touch-icon.png',
    'og/ffis-og.png',
  ];
  for (const f of files) {
    if (f.endsWith('.svg')) {
      console.log(`  public/${f}  (svg)`);
      continue;
    }
    const m = await sharp(out(f)).metadata();
    console.log(`  public/${f}  ${m.width}x${m.height}`);
  }
  console.log(`Done. Brand blue: ${BLUE}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
