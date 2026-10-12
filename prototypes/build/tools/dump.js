// Dump runtime dictionaries and stray DOM text from an Uptal prototype HTML.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const file = path.resolve(process.argv[2]); const out = process.argv[3];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    const res = { en: T.en, ar: T.ar, langs: Object.keys(T) };
    // stray text: visible text nodes not inside [data-t], script, style
    const stray = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (!t || !/[A-Za-z؀-ۿ]/.test(t)) continue;
      const el = n.parentElement;
      if (!el || el.closest('script,style,[data-t],.controls,#editbar')) continue;
      const scr = el.closest('[data-scr]');
      stray.push({ scr: scr ? scr.getAttribute('data-scr') : null, tag: el.tagName.toLowerCase(), cls: el.className || '', text: t });
    }
    res.stray = stray;
    res.screens = [...document.querySelectorAll('[data-scr]')].map(s => s.getAttribute('data-scr'));
    return res;
  });
  data.errors = errs;
  fs.writeFileSync(out, JSON.stringify(data, null, 1));
  console.log('en keys', Object.keys(data.en).length, 'ar keys', Object.keys(data.ar).length, 'stray', data.stray.length, 'screens', data.screens.length, 'errors', errs.length);
  await browser.close();
})();
