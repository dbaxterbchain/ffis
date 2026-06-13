// Dev-only full-page screenshots using the installed Chrome (no download).
// Usage: node scripts/shot.mjs  (preview/dev server must be running on :4321)
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.env.SHOT_URL || 'http://localhost:4321/';
const OUT = process.env.SHOT_OUT || 'C:/Users/baxte/AppData/Local/Temp';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

const page = await browser.newPage();

// Desktop, full page
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${OUT}/ffis-desktop.png`, fullPage: true });

// Desktop, detail clips of card-heavy sections
for (const id of ['food-resilience', 'get-involved']) {
  const el = await page.$(`#${id}`);
  if (el) await el.screenshot({ path: `${OUT}/ffis-${id}.png` });
}

// Mobile, full page
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${OUT}/ffis-mobile.png`, fullPage: true });

// Mobile menu open (tap the toggle)
await page.evaluate(() => {
  document.querySelector('[data-nav-toggle]')?.click();
});
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: `${OUT}/ffis-mobile-menu.png` });

await browser.close();
console.log('shots written to', OUT);
