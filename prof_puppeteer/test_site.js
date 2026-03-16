const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('CONSOLE:', msg.type(), msg.text());
  });
  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });

  console.log("Navigating to production Vercel...");
  try {
      await page.goto('https://bioativa.vercel.app/dashboard', { waitUntil: 'networkidle0' });
      await page.screenshot({ path: '/tmp/vercel-dashboard.png' });
      console.log("Screenshot taken at /tmp/vercel-dashboard.png");
  } catch(e) { console.log("GOTO ERROR", e); }
  
  await browser.close();
})();
