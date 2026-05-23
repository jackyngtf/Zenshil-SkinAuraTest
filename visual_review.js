const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const screenshotDir = '/Users/jackyngtf/.gemini/antigravity/brain/f5055a46-c775-4307-97bf-2e600dd27e8b';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  let browser;
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  if (fs.existsSync(chromePath)) {
    console.log('Launching headless Google Chrome...');
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  } else {
    const wsUrl = process.env.AGY_BROWSER_WS_URL;
    console.log('Google Chrome not found. Connecting to wsUrl:', wsUrl);
    if (!wsUrl) {
      console.error('Error: Google Chrome not found and AGY_BROWSER_WS_URL not set.');
      process.exit(1);
    }
    browser = await puppeteer.connect({
      browserWSEndpoint: wsUrl
    });
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

  console.log('Navigating to http://localhost:3000/quiz ...');
  await page.goto('http://localhost:3000/quiz', { waitUntil: 'networkidle2' });

  console.log('Waiting for Q1 to load...');
  await page.waitForSelector('button', { timeout: 10000 });

  // Get current Q1 title
  const q1Title = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    return h2 ? h2.textContent : 'No title found';
  });
  console.log('Current page title:', q1Title);

  // Find Option A on Q1 ("海邊／溫泉")
  const findAndClickOption = async (optionId, optionText) => {
    const buttons = await page.$$('button');
    let targetButton = null;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes(optionId) && text.includes(optionText)) {
        targetButton = btn;
        break;
      }
    }
    if (!targetButton) {
      throw new Error(`Could not find button for Option ${optionId} containing text: ${optionText}`);
    }
    return targetButton;
  };

  console.log('Double clicking Q1 Option A ("海邊／溫泉")...');
  const q1OptionA = await findAndClickOption('A', '海邊／溫泉');
  await q1OptionA.click();
  await new Promise(resolve => setTimeout(resolve, 100));
  await q1OptionA.click();

  console.log('Waiting 3 seconds for transition to Q2...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Get current Q2 title
  const q2Title = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    return h2 ? h2.textContent : 'No title found';
  });
  console.log('Current page title after transition:', q2Title);

  // Detect which component is rendering (AuraFieldQuestion or WeatherStageQuestion)
  const componentInfo = await page.evaluate(() => {
    const hasWeatherStage = !!document.querySelector('.font-sans.text-\\[8px\\].font-light.uppercase.tracking-\\[0\\.35em\\]');
    const hasAuraField = !!document.querySelector('canvas');
    return { hasWeatherStage, hasAuraField, html: document.body.innerHTML };
  });
  
  if (componentInfo.hasWeatherStage) {
    console.log('Detected WeatherStageQuestion is rendering.');
  } else if (componentInfo.hasAuraField) {
    console.log('Detected AuraFieldQuestion is rendering.');
  } else {
    console.log('Could not automatically determine Q2 component. Let\'s check html:', componentInfo.html.substring(0, 1000));
  }

  // 1. Take initial state screenshot
  console.log('Taking q2_initial.png...');
  await page.screenshot({ path: path.join(screenshotDir, 'q2_initial.png') });

  // Options for Q2
  const q2Options = [
    { id: 'A', text: '陰天', filename: 'q2_option_a.png' },
    { id: 'B', text: '悶熱暴風雨', filename: 'q2_option_b.png' },
    { id: 'C', text: '乾燥秋天', filename: 'q2_option_c.png' },
    { id: 'D', text: '清晨陽光', filename: 'q2_option_d.png' }
  ];

  for (const opt of q2Options) {
    console.log(`Selecting Option ${opt.id} ("${opt.text}")...`);
    // Find the button (could be different if DOM changed)
    const btn = await findAndClickOption(opt.id, opt.text);
    await btn.click();
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`Taking ${opt.filename}...`);
    await page.screenshot({ path: path.join(screenshotDir, opt.filename) });
  }

  console.log('All screenshots completed successfully!');
  await browser.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
