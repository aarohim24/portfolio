import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = '/Users/aarohimathur/portfolio/public/screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

// ─── Social Home ───
console.log('Capturing social home...');
await page.goto('https://social-sandy-psi.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/social-1.png`, clip: { x:0, y:0, width:1280, height:800 } });

// ─── Social Marketplace ───
console.log('Capturing marketplace...');
await page.goto('https://social-sandy-psi.vercel.app/marketplace', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/social-2.png`, clip: { x:0, y:0, width:1280, height:800 } });

// ─── Social scrolled ───
console.log('Capturing social scrolled...');
await page.goto('https://social-sandy-psi.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 300));
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/social-3.png`, clip: { x:0, y:0, width:1280, height:800 } });

// ─── Pet So Much ───
console.log('Capturing pet so much...');
await page.goto('https://pet-so-much.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/petsomuch-1.png`, clip: { x:0, y:0, width:1280, height:800 } });

await browser.close();
console.log('Done!');
