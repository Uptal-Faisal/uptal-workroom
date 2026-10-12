// Verify tokenized dictionaries against v5 originals using the real engine in the built page.
// For KSA (Noura), every tokenized EN / Gulf-AR string must expand back to the v5 string,
// where {@g:male|female} may match either alternative (v5 often used generic masculine).
// Also checks: unknown token ids (no value in a pack), unbalanced braces, FR coverage, neutral coverage.
// usage: node tools/verify.js ../Uptal_AutoApply_v6_MultiMarket.html [out.json]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto('file://' + path.resolve(process.argv[2]) + '?persona=SA'); await pg.waitForTimeout(800);
  const res = await pg.evaluate(() => {
    const O = MKT.orig(), TK = MKT.tok, out = { mismatch: [], badTok: [], unknownIds: {}, frMissing: 0, neutralMissing: 0, tokenized: {} };
    const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const idsIn = s => (s.match(/\{@([^{}]+)\}/g) || []).map(t => t.slice(2, -1));
    const known = id => {
      const op = id.split(':')[0];
      if (['g', '$', '$n', '$c', '$code', 'sal', 'saln', 'salk', 'per', 'perw', 'pers'].includes(op)) return true;
      if (id.startsWith('p.')) { const p = MKT.persona(); return p && p.f && p.f[id.slice(2)] != null; }
      return MKT.packs.SA && MKT.packs.SA.ent && MKT.packs.SA.ent[id] != null;
    };
    function matcher(tok, l) {
      // split on g-tokens, expand everything else with KSA, build a regex
      let rx = '', last = 0; const g = /\{@g:([^{}]*)\}/g; let m;
      while ((m = g.exec(tok))) {
        rx += reEsc(MKT.expand(tok.slice(last, m.index), l));
        rx += '(?:' + m[1].split('|').map(a => reEsc(MKT.expand(a, l))).join('|') + ')';
        last = m.index + m[0].length;
      }
      rx += reEsc(MKT.expand(tok.slice(last), l));
      return new RegExp('^' + rx + '$');
    }
    for (const [L, src, l] of [['en', 'en', 'en'], ['gulf', 'ar', 'ar']]) {
      let n = 0;
      for (const k in TK[L]) {
        n++;
        const tok = TK[L][k];
        if (O[src][k] == null) { out.badTok.push([L, k, 'key not in v5']); continue; }
        if ((tok.match(/\{@/g) || []).length !== (tok.match(/\{@[^{}]+\}/g) || []).length) out.badTok.push([L, k, 'unbalanced token']);
        idsIn(tok).forEach(id => { if (!known(id)) out.unknownIds[id] = (out.unknownIds[id] || 0) + 1; });
        let ok = false; try { ok = matcher(tok, l).test(O[src][k]); } catch (e) { out.badTok.push([L, k, 'regex ' + e]); }
        if (!ok) out.mismatch.push({ L, k, orig: O[src][k], tok, ksa: MKT.expand(tok, l) });
      }
      out.tokenized[L] = n;
    }
    for (const L of ['fr', 'neutral']) for (const k in TK[L]) idsIn(TK[L][k]).forEach(id => { if (!known(id)) out.unknownIds[id] = (out.unknownIds[id] || 0) + 1; });
    for (const k in O.en) { if (TK.fr[k] == null) out.frMissing++; if (TK.neutral[k] == null) out.neutralMissing++; }
    out.tokenized.fr = Object.keys(TK.fr).length; out.tokenized.neutral = Object.keys(TK.neutral).length;
    return out;
  });
  res.pageErrors = errs;
  if (process.argv[3]) fs.writeFileSync(process.argv[3], JSON.stringify(res, null, 1));
  console.log(JSON.stringify({ tokenized: res.tokenized, mismatch: res.mismatch.length, badTok: res.badTok.length, unknownIds: Object.keys(res.unknownIds).length, frMissing: res.frMissing, neutralMissing: res.neutralMissing, pageErrors: errs.length }));
  res.mismatch.slice(0, 8).forEach(m => console.log('MISMATCH', m.L, m.k, '\n  orig:', m.orig, '\n  ksa :', m.ksa));
  console.log('unknown ids:', Object.entries(res.unknownIds).slice(0, 30).map(([k, v]) => k + '×' + v).join(', '));
  await b.close();
})();
