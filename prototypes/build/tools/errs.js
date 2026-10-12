const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(String(e.stack || e))); pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  await pg.goto('file://' + path.resolve(process.argv[2]) + (process.argv[3] || '')); await pg.waitForTimeout(800);
  console.log(errs.slice(0, 12).join('\n---\n'));
  await b.close();
})();
