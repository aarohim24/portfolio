import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = '/Users/aarohimathur/portfolio/public/screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

// ─── Social (mobile PWA viewport) ───
const mobilePage = await browser.newPage();
await mobilePage.setViewportSize({ width: 390, height: 844 });

console.log('Capturing social home...');
await mobilePage.goto('https://social-sandy-psi.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await mobilePage.waitForTimeout(2000);
await mobilePage.screenshot({ path: `${OUT}/social-1.png`, clip: { x:0, y:0, width:390, height:844 } });

console.log('Capturing social marketplace...');
await mobilePage.goto('https://social-sandy-psi.vercel.app/marketplace', { waitUntil: 'networkidle', timeout: 30000 });
await mobilePage.waitForTimeout(2000);
await mobilePage.screenshot({ path: `${OUT}/social-2.png`, clip: { x:0, y:0, width:390, height:844 } });

// ─── Pet So Much (desktop) ───
const desktopPage = await browser.newPage();
await desktopPage.setViewportSize({ width: 1280, height: 800 });

console.log('Capturing pet so much...');
await desktopPage.goto('https://pet-so-much.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await desktopPage.waitForTimeout(2000);
await desktopPage.screenshot({ path: `${OUT}/petsomuch-1.png`, clip: { x:0, y:0, width:1280, height:800 } });

await browser.close();
console.log('Done!');
