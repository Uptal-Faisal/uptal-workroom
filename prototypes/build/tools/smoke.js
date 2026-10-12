const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const file = path.resolve(process.argv[2]);
  const b = await chromium.launch(); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(String(e))); pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  await pg.goto('file://' + file + (process.argv[3] || '')); await pg.waitForTimeout(800);
  const r = await pg.evaluate(() => {
    const o = MKT.orig(); let diffEn = 0, diffAr = 0;
    for (const k in o.en) if (T.en[k] !== o.en[k]) diffEn++;
    for (const k in o.ar) if (T.ar[k] !== o.ar[k]) diffAr++;
    return { diffEn, diffAr, fr: Object.keys(T.fr).length, persona: MKT.persona() && MKT.persona().id, mk: !!document.getElementById('mkSel'), frBtn: !!document.querySelector('#lang [data-l=fr]') };
  });
  // click FR then AR then EN
  for (const l of ['fr', 'ar', 'en']) { await pg.click(`#lang button[data-l="${l}"]`); await pg.waitForTimeout(150); }
  console.log(JSON.stringify(r), 'errors:', errs.length, errs.slice(0, 5));
  await b.close();
})();
