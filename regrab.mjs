import { chromium } from 'playwright';

const OUT = '/Users/aarohimathur/portfolio/public/screenshots';
const browser = await chromium.launch({ headless: true });

// ─── Social (mobile) ───
const mobile = await browser.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });

console.log('social-1...');
await mobile.goto('https://social-sandy-psi.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await mobile.waitForTimeout(2000);
await mobile.screenshot({ path: `${OUT}/social-1.png` });

console.log('social-2...');
await mobile.goto('https://social-sandy-psi.vercel.app/marketplace', { waitUntil: 'networkidle', timeout: 30000 });
await mobile.waitForTimeout(2000);
await mobile.screenshot({ path: `${OUT}/social-2.png` });

// ─── SmartPrep ───
const desk = await browser.newPage();
await desk.setViewportSize({ width: 1280, height: 800 });

console.log('smartprep-2...');
await desk.goto('https://smartprep-ai-ten.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
await desk.waitForTimeout(2000);
await desk.screenshot({ path: `${OUT}/smartprep-2.png`, clip: { x:0, y:0, width:1280, height:800 } });

console.log('smartprep-3...');
await desk.evaluate(() => window.scrollTo(0, 400));
await desk.waitForTimeout(600);
await desk.screenshot({ path: `${OUT}/smartprep-3.png`, clip: { x:0, y:0, width:1280, height:800 } });

await browser.close();
console.log('Done!');
