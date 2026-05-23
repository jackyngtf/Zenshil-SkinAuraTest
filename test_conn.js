const puppeteer = require('puppeteer-core');

async function main() {
  const wsUrl = process.env.AGY_BROWSER_WS_URL;
  console.log('Connecting to WebSocket:', wsUrl);
  if (!wsUrl) {
    console.error('Error: AGY_BROWSER_WS_URL env var not set.');
    process.exit(1);
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: wsUrl,
    defaultViewport: null
  });

  console.log('Connected successfully!');
  const pages = await browser.pages();
  console.log('Number of pages open:', pages.length);
  for (const page of pages) {
    console.log('- ', page.url(), ':', await page.title());
  }

  await browser.disconnect();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
