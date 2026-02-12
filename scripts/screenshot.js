const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const fetch = global.fetch || require('node-fetch');

const BASE = 'http://localhost:7000';
const shotsDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir);

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Server did not become ready in time');
}

async function run() {
  await waitForServer(BASE);
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const routes = [
    { path: '/', name: 'home' },
    { path: '/game', name: 'game' },
    { path: '/communityHome', name: 'communityHome' },
    { path: '/UserLogin', name: 'userLogin' },
    { path: '/UserRegister', name: 'userRegister' }
  ];

  for (const r of routes) {
    const url = BASE + r.path;
    console.log('Loading', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (err) {
      console.warn(`Warning: failed to fully load ${url}, continuing with what we have`);
    }
    const filename = path.join(shotsDir, `${r.name}.png`);
    await page.screenshot({ path: filename, fullPage: true });
    console.log('Saved', filename);
  }

  await browser.close();
  console.log('All screenshots captured.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
