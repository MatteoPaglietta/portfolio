import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndexPath = resolve(__dirname, '../dist/index.html');

async function prerender() {
  const server = await preview({ preview: { port: 4173, strictPort: false } });
  const port = server.config.preview.port;
  const url = `http://localhost:${port}/`;

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Let GSAP/Lenis settle into their resting state before snapshotting.
    await new Promise((r) => setTimeout(r, 800));

    const html = await page.evaluate(() => document.documentElement.outerHTML);
    writeFileSync(distIndexPath, `<!doctype html>\n${html}\n`);
    console.log('Prerendered dist/index.html');
  } finally {
    await browser.close();
    await server.close();
  }
}

prerender().catch((err) => {
  console.warn('Prerender skipped (build still valid as CSR):', err.message);
});
