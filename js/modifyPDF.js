const puppeteer = require('puppeteer');
//const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
//    headless: false,  // 動作確認するためheadlessモードにしない
//    slowMo: 1000  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: process.cwd() });
  await page.goto('http://localhost:'+process.argv[2]+'/modpdf.html?file='+process.argv[3]+'.pdf', {waitUntil: 'networkidle0'});

  await browser.close();
})();
