const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
//    headless: false,  // 動作確認するためheadlessモードにしない
//    slowMo: 1000  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: process.cwd() });
  await page.goto('http://localhost:'+process.argv[2]+'/md2html.html?file='+process.argv[3]+'.md', {waitUntil: 'networkidle0'});
/*
  // 生成されたHTMLを保存する
  var body = await page.evaluate(() => { return document.getElementsByTagName('div')[1].innerHTML });

  var header = '<!DOCTYPE html>\n';
  header += '<html>\n';
  header += '<head>\n';
  header += '<title>'+process.argv[3]+'</title>\n';
  header += '<link rel="stylesheet" href="./css/' + process.argv[3]+'.css' + '">\n';
  header += '</head>\n';
  header += '<body>\n';

  var footer = '</body>\n';
  footer += '</html>\n';

  var html = '';
  html += header;
  html += body;
  html += footer;

  await fs.writeFileSync(process.argv[3]+'.html', html);
*/

  await browser.close();
})();
