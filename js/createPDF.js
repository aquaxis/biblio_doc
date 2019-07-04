const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,  // 動作確認するためheadlessモードにしない
//    slowMo: 1000  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:'+process.argv[2]+'/viewer/vivliostyle-viewer.html#b=../'+process.argv[3]+'.html&renderAllPages=true', {waitUntil: 'networkidle0'});

  // PDFを保存する
  await page.pdf({
    path: process.argv[3]+".pdf",
    printBackground: true,
    width: '188mm',
    height: '263mm',
  });

  await browser.close();
})();
