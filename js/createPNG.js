const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
//    headless: false,  // 動作確認するためheadlessモードにしない
//    slowMo: 1000  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:'+process.argv[2]+'/md2html.html?file='+process.argv[3]+'.md', {waitUntil: 'networkidle0'});

  await page.screenshot({path: process.argv[3]+'.png', fullPage: true});

  await browser.close();
})();
