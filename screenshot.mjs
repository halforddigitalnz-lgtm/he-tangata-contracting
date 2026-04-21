import puppeteer from 'puppeteer';
import { writeFile } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.argv[2];
const label = process.argv[3] || '';

if (!url) {
    console.error('Usage: node screenshot.mjs <url> [label]');
    process.exit(1);
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshotsDir = join(__dirname, 'temporary screenshots');
    // Ensure directory exists, but since we can't create here, assume it does or create manually

    let filename = 'screenshot-1.png';
    if (label) {
        filename = `screenshot-1-${label}.png`;
    }

    const filepath = join(screenshotsDir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved to ${filepath}`);

    await browser.close();
})();