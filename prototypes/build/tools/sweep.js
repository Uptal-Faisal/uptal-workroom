// Sweep every screen for each persona x language and report market leaks.
// usage: node tools/sweep.js ../Uptal_AutoApply_v6_MultiMarket.html out.json [personaIds,comma] [langs,comma]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
const FILE = path.resolve(process.argv[2]), OUT = process.argv[3] || 'sweep.json';
const ONLY = process.argv[4] ? process.argv[4].split(',') : null;
const LANGS = process.argv[5] ? process.argv[5].split(',') : ['en', 'ar', 'fr'];
const KSA_TERMS = ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Dhahran', 'Mecca', 'Makkah', 'Medina', 'Madinah', 'Abha', 'Tabuk', 'Saudi', 'KSA', 'Aramco', 'SABIC', 'NEOM', 'stc', 'STC', 'Jahez', 'Rewaa', 'Al Rajhi', 'Alinma', 'SNB', 'Riyad Bank', 'Maaden', "Ma'aden", 'Almarai', 'Mobily', 'Tadawul', 'PIF', 'Qiddiya', 'Bupa Arabia', 'SOCPA', 'King Saud', 'Iqama', 'Qiwa', 'GOSI', 'Absher', 'Saudization', 'Nitaqat', 'mada', 'Noura', 'Al-Amri', 'Layla Al-Otaibi', 'Khalid Al-Dossary', 'Nadia Al-Rashid', '+966', 'SAR',
  'الرياض', 'جدة', 'الدمام', 'الخبر', 'الظهران', 'مكة', 'المدينة المنورة', 'أبها', 'تبوك', 'السعودية', 'السعودي', 'أرامكو', 'سابك', 'نيوم', 'جاهز', 'رواء', 'الراجحي', 'الإنماء', 'الأهلي السعودي', 'معادن', 'المراعي', 'موبايلي', 'تداول', 'صندوق الاستثمارات', 'القدية', 'الهيئة السعودية للمراجعين', 'جامعة الملك سعود', 'إقامة', 'قوى', 'التأمينات', 'أبشر', 'السعودة', 'نطاقات', 'مدى', 'نورة', 'العمري', 'ريال'];
const EN_STOP = /\b(the|your|you|and|with|we|for|this|that|are|is|to|of|in|on|it|our|will|can|apply|applications?)\b/gi;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const report = { personas: {}, totals: {} };
  let curErrs = [];
  pg.on('pageerror', e => curErrs.push(String(e).slice(0, 300)));
  await pg.goto('file://' + FILE + '?persona=SA'); await pg.waitForTimeout(800);
  const personas = await pg.evaluate(() => MKT.personas.map(p => p.id));
  const screens = await pg.evaluate(() => [...new Set([...document.querySelectorAll('.scr[data-scr]')].map(s => s.getAttribute('data-scr')))]);
  for (const pid of personas) {
    if (ONLY && !ONLY.includes(pid)) continue;
    const pr = report.personas[pid] = {};
    for (const L of LANGS) {
      curErrs = [];
      await pg.evaluate(([pid, L]) => { MKT.set(pid); const btn = document.querySelector('#lang button[data-l="' + L + '"]'); if (btn) btn.click(); }, [pid, L]);
      await pg.waitForTimeout(120);
      const hits = [];
      for (const scr of screens) {
        const before = curErrs.length;
        const r = await pg.evaluate(([scr, terms, L, isSA]) => {
          try { go(scr); } catch (e) { return { err: 'go: ' + e }; }
          const el = document.querySelector('.scr.on'); if (!el) return { err: 'no screen' };
          el.querySelectorAll('.sheet,.sheetbg').forEach(s => s.classList.add('mkt-probe'));
          const text = el.innerText || '';
          const out = { leaks: [], tokens: [], glyph: 0, foreign: [] };
          if (!isSA) for (const t of terms) { const re = new RegExp('(^|[^A-Za-z؀-ۿ])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^A-Za-z؀-ۿ])'); if (re.test(text)) out.leaks.push(t); }
          const tk = text.match(/\{@[^}]*\}?/g); if (tk) out.tokens = [...new Set(tk)].slice(0, 5);
          if (!isSA) out.glyph = el.querySelectorAll('.sar').length;
          if (L !== 'en') {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
            while ((n = walker.nextNode())) {
              const t = n.nodeValue.trim(); if (t.length < 12) continue;
              const pe = n.parentElement; if (!pe || pe.closest('.lenschip,.cvpaper,script,style') || !pe.offsetParent) continue;
              if (L === 'fr') { const m = t.match(/\b(the|your|you|and|with|we|this|that|our|will)\b/gi); if (m && m.length >= 2) out.foreign.push(t.slice(0, 90)); }
              if (L === 'ar') { if (!/[؀-ۿ]/.test(t) && /[a-z]{3,}\s+[a-z]{3,}\s+[a-z]{3,}/i.test(t)) out.foreign.push(t.slice(0, 90)); }
            }
            out.foreign = [...new Set(out.foreign)].slice(0, 6);
          }
          return out;
        }, [scr, KSA_TERMS, L, pid === 'SA']);
        const errs = curErrs.slice(before);
        if (r.err || errs.length || (r.leaks && r.leaks.length) || (r.tokens && r.tokens.length) || r.glyph || (r.foreign && r.foreign.length))
          hits.push({ scr, ...r, errs: errs.slice(0, 3) });
      }
      pr[L] = hits;
      const n = k => hits.reduce((a, h) => a + (Array.isArray(h[k]) ? h[k].length : (h[k] ? 1 : 0)), 0);
      console.log(pid, L, 'screens with issues:', hits.length, 'leaks', n('leaks'), 'tokens', n('tokens'), 'glyph', n('glyph'), 'foreign', n('foreign'), 'errs', n('errs'));
    }
  }
  fs.writeFileSync(OUT, JSON.stringify(report, null, 1));
  await b.close();
})();
