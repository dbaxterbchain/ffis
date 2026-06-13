/**
 * Generates raster brand assets (PNG icons + Open Graph image) from inline SVG.
 * Run with: node scripts/generate-assets.mjs
 * Uses `sharp` (already present via Astro's image pipeline).
 *
 * TODO(assets): regenerate once the official logo vector + final brand fonts
 * are available; this is a clean placeholder built from the lotus motif.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const COBALT = '#142d8c';
const GOLD = '#f4b72a';

const LOTUS = `
  <path d="M100 150 C 70 138 40 116 26 84 C 48 92 82 118 100 150 Z"/>
  <path d="M100 150 C 130 138 160 116 174 84 C 152 92 118 118 100 150 Z"/>
  <path d="M100 150 C 78 124 58 92 64 54 C 82 74 96 108 100 150 Z"/>
  <path d="M100 150 C 122 124 142 92 136 54 C 118 74 104 108 100 150 Z"/>
  <path d="M100 150 C 84 112 84 64 100 30 C 116 64 116 112 100 150 Z"/>
`;

// Square, full-bleed icon (cobalt field + centered white lotus + gold center).
function iconSquareSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${COBALT}"/>
    <g transform="translate(0,12)" fill="none" stroke="#ffffff" stroke-width="7"
       stroke-linejoin="round" stroke-linecap="round">${LOTUS}</g>
    <circle cx="100" cy="155" r="8" fill="${GOLD}"/>
  </svg>`;
}

// 1200x630 Open Graph / social card.
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#142d8c"/>
        <stop offset="0.55" stop-color="#5a1fb0"/>
        <stop offset="1" stop-color="#d6248a"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#f4b72a" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#f4b72a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <ellipse cx="950" cy="300" rx="320" ry="320" fill="url(#glow)"/>
    <g transform="translate(740,95) scale(2.05)" fill="none" stroke="#ffffff"
       stroke-opacity="0.18" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${LOTUS}</g>
    <text x="90" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="26"
      letter-spacing="3" fill="#ffffff" fill-opacity="0.82">FOUNDATION FOR INNOVATION IN SOCIETY</text>
    <text x="86" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="82"
      font-weight="700" fill="#ffffff">Novel solutions to</text>
    <text x="86" y="392" font-family="Georgia, 'Times New Roman', serif" font-size="82"
      font-weight="700" fill="#ffcb52">meaningful problems.</text>
    <text x="90" y="470" font-family="Arial, Helvetica, sans-serif" font-size="30"
      fill="#ffffff" fill-opacity="0.85">Food resilience &amp; a pay-it-forward meal program in Phoenix.</text>
  </svg>`;
}

async function main() {
  await mkdir('public/og', { recursive: true });
  const icon = Buffer.from(iconSquareSvg());

  await sharp(icon, { density: 384 }).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(icon, { density: 384 }).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(icon, { density: 384 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(icon, { density: 384 }).resize(32, 32).png().toFile('public/favicon-32.png');

  await sharp(Buffer.from(ogSvg())).png().toFile('public/og/ffis-og.png');

  console.log('Generated: icon-512, icon-192, apple-touch-icon, favicon-32, og/ffis-og');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
