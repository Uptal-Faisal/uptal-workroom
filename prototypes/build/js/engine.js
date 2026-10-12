/* ==== v6 multi-market engine ====
   One persona per market. Copy is stored tokenized ({@...}); switching the market persona re-expands
   every dictionary (EN, Gulf Arabic or neutral Arabic, French) and every inline {en,ar,fr} structure,
   then re-renders. KSA (Noura) expands back to exactly the v5 copy.
   Token grammar (inside any dictionary string):
     {@id}            entity / persona / market value, e.g. {@city.riyadh} {@co.aramco} {@p.first} {@ctry.n}
     {@g:male|female} persona-gender alternation (male form | female form)
     {@$:399}         money: a SAR product price, converted to the residence market and formatted with currency
     {@$n:399}        same, number only        {@$c} currency symbol/glyph   {@$code} currency code
     {@sal:26000}     money: a SAR-per-month salary, converted to the target market's salary level and period
     {@saln:26000}    same, number only        {@salk:38000-45000} compact salary range ("38-45k ¤")
     {@per} "a month"/"a year"  {@perw} "month"/"year"  {@pers} "/mo"/"/yr"  (target market salary period)
*/
var MKT = (function(){
  var BASE = window.MARKET_BASE || {markets:{}, regions:[]};
  var PACKS = window.MARKET_PACKS || {};
  var PERSONAS = window.MARKET_PERSONAS || [];
  var TOK = window.MARKET_TOK || {en:{}, gulf:{}, neutral:{}, fr:{}};
  var TOKOBJ = window.MARKET_TOKOBJ || {};          /* tokenized snapshots of inline {en,ar} structures */
  var NEWKEYS = window.MARKET_NEWKEYS || {en:{}, gulf:{}, neutral:{}, fr:{}}; /* v6-only keys (all langs) */
  var ORIG = null, S = {pid:null, p:null, res:null, tgt:null, resCode:null, tgtCode:null, arv:'gulf'};
  var RES_SCOPE = /^(pay|tax|cur|phone|legal|res)\./;

  function lget(v, l){
    if (v == null) return '';
    if (typeof v !== 'object') return String(v);
    if (l === 'ar') return v[S.arv === 'neutral' && v.arn != null ? 'arn' : 'ar'] != null ? v[S.arv === 'neutral' && v.arn != null ? 'arn' : 'ar'] : (v.en || '');
    return v[l] != null ? v[l] : (v.en != null ? v.en : '');
  }
  function grp(n, l){
    var s = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, l === 'fr' ? ' ' : ',');
    return s;
  }
  function curOf(m){ return (m && m.cur) || BASE.markets.SA.cur; }
  function pick(x, l){ return (x && typeof x === 'object') ? (x[l] != null ? x[l] : x.en) : x; }
  function moneyStr(n, l, m, numOnly){
    var c = curOf(m), num = grp(n, l);
    if (numOnly) return num;
    if (c.glyph) return num + ' ¤';
    var sym = pick(c.sym, l), pos = pick(c.pos, l) || 'after', sp = pick(c.sp, l);
    var gap = (sp === false) ? '' : ' ';
    return pos === 'before' ? sym + gap + num : num + gap + sym;
  }
  function isSA(m){ return !m || m.code === 'SA'; }
  function charm(v){
    if (v <= 0) return v;
    var mag = Math.pow(10, Math.max(0, Math.floor(Math.log10(v)) - 1));
    var r = Math.ceil(v / mag) * mag;
    if (r < 10) return Math.max(1, Math.round(v));
    if (r < 100) return r % 10 === 0 ? r - 1 : (Math.floor(r / 10) * 10 + 9);
    if (r < 10000) return r - 1;
    return r;
  }
  function price(sar, m){
    m = m || S.res; if (isSA(m)) return sar;
    var b = (BASE.markets[m.code] || {}).price || m.price || {};
    var map = {399:b.p1, 339:b.p4, 279:b.p12, 1356:b.t4, 3348:b.t12, 837:Math.round(b.t12 / 4)};
    if (map[sar] != null) return map[sar];
    if (m.priceMap && m.priceMap[sar] != null) return m.priceMap[sar];
    return charm(sar * (b.p1 || 399) / 399);
  }
  function salNice(v){
    var step = v >= 100000 ? 1000 : v >= 10000 ? 500 : v >= 1000 ? 50 : 10;
    return Math.round(v / step) * step;
  }
  function sal(sarMonthly, m){
    m = m || S.tgt; if (isSA(m)) return sarMonthly;
    var s = m.sal || {per:'month', f:1};
    return salNice(sarMonthly * s.f * (s.per === 'year' ? 12 : 1));
  }
  function salPer(m){ return isSA(m) ? 'month' : ((m.sal || {}).per || 'month'); }
  var PER = {
    per:  {month:{en:'a month', ar:'شهرياً', fr:'par mois'}, year:{en:'a year', ar:'سنوياً', fr:'par an'}},
    perw: {month:{en:'month', ar:'شهر', fr:'mois'}, year:{en:'year', ar:'سنة', fr:'an'}},
    pers: {month:{en:'/mo', ar:'/شهر', fr:'/mois'}, year:{en:'/yr', ar:'/سنة', fr:'/an'}}
  };
  function salk(a, b, l, m){
    m = m || S.tgt;
    var x = sal(a, m), y = sal(b, m), c = curOf(isSA(m) ? null : m);
    var k = function(v){ return v >= 1000 ? grp(Math.round(v / 1000), l) : grp(v, l); };
    var big = x >= 1000;
    if (c.glyph) return l === 'ar' ? k(x) + '-' + k(y) + (big ? ' ألف' : '') + ' ¤' : k(x) + '-' + k(y) + (big ? 'k' : '') + ' ¤';
    var sym = pick(c.sym, l), pos = pick(c.pos, l) || 'after';
    if (l === 'ar') return k(x) + '-' + k(y) + (big ? ' ألف ' : ' ') + sym;
    if (l === 'fr') return k(x) + '-' + k(y) + (big ? ' k' : '') + ' ' + sym;
    return pos === 'before' ? sym + k(x) + '-' + k(y) + (big ? 'k' : '') : k(x) + '-' + k(y) + (big ? 'k' : '') + ' ' + sym;
  }
  function ent(id, l){
    if (id.indexOf('p.') === 0){ var pv = S.p && S.p.f ? S.p.f[id.slice(2)] : null; if (pv != null) return lget(pv, l); }
    var src = RES_SCOPE.test(id) ? S.res : S.tgt;
    var v = src && src.ent ? src.ent[id] : null;
    if (v == null && PACKS.SA && PACKS.SA.ent) { v = PACKS.SA.ent[id]; if (v != null && window.MKT_DEBUG) console.warn('[mkt] missing', id, 'in', src && src.code); }
    return lget(v, l);
  }
  function scopeIsSA(body){
    var op = body.split(':')[0];
    if (op === '$' || op === '$n' || op === '$c' || op === '$code') return isSA(S.res);
    if (op === 'sal' || op === 'saln' || op === 'salk' || op === 'per' || op === 'perw' || op === 'pers') return isSA(S.tgt);
    if (body.indexOf('p.') === 0) return S.p && S.p.id === 'SA';
    return RES_SCOPE.test(body) ? isSA(S.res) : isSA(S.tgt);
  }
  function resolve(body, l){
    /* {@token|ksa literal}: the literal is the exact v5 wording, used while that token's scope is KSA */
    if (body.indexOf('g:') !== 0){ var bar = body.indexOf('|'); if (bar > 0){ var tb = body.slice(0, bar); if (scopeIsSA(tb)) return body.slice(bar + 1); body = tb; } }
    var c = body.indexOf(':'), op = c < 0 ? body : body.slice(0, c), arg = c < 0 ? '' : body.slice(c + 1);
    switch (op){
      case 'g': { var parts = arg.split('|'); return (S.p && S.p.gender === 'm') ? parts[0] : (parts[1] != null ? parts[1] : parts[0]); }
      case '$': return moneyStr(price(+arg), l, S.res);
      case '$n': return moneyStr(price(+arg), l, S.res, true);
      case '$c': { var cc = curOf(S.res); return cc.glyph ? '¤' : pick(cc.sym, l); }
      case '$code': return curOf(S.res).code;
      case 'sal': return moneyStr(sal(+arg), l, isSA(S.tgt) ? null : S.tgt);
      case 'saln': return moneyStr(sal(+arg), l, S.tgt, true);
      case 'salk': { var ab = arg.split('-'); return salk(+ab[0], +ab[1], l); }
      case 'per': case 'perw': case 'pers': return PER[op][salPer(S.tgt)][l] || PER[op][salPer(S.tgt)].en;
      default: return ent(body, l);
    }
  }
  var RX = /\{@([^{}]+)\}/g;
  function expand(s, l){
    if (typeof s !== 'string' || s.indexOf('{@') < 0) return s;
    var out = s, guard = 0;
    while (out.indexOf('{@') >= 0 && guard++ < 3) out = out.replace(RX, function(_, b){ return resolve(b, l); });
    return out;
  }
  function keyLang(k, l){
    if (k === 'ar' || k === 'arn' || /_arn?$/.test(k)) return 'ar';
    if (k === 'fr' || /_fr$/.test(k)) return 'fr';
    if (k === 'en' || k === 'en2' || /_en$/.test(k)) return 'en';
    return l;
  }
  function expandDeep(v, l){
    if (typeof v === 'string') return expand(v, l);
    if (Array.isArray(v)) return v.map(function(x){ return expandDeep(x, l); });
    if (v && typeof v === 'object'){
      var o = {}; for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) o[k] = expandDeep(v[k], keyLang(k, l));
      return o;
    }
    return v;
  }
  /* inline structures: name -> {get(), set(v)} registered by the v6 patches; their tokenized snapshot lives in TOKOBJ[name] */
  var OBJ = {};
  function registerObj(name, getter, setter){ OBJ[name] = {get:getter, set:setter}; }
  function syncObj(name){
    var o = OBJ[name], tok = TOKOBJ[name]; if (!o || !tok) return;
    var target = o.get(); if (!target) return;
    var fresh = expandDeep(tok, 'en');
    /* arabic variant swap: tok may carry ar (gulf) and arn (neutral) side by side */
    (function swap(dst, src){
      if (Array.isArray(src)) { for (var i = 0; i < src.length; i++){ if (src[i] && typeof src[i] === 'object' && dst[i] && typeof dst[i] === 'object') swap(dst[i], src[i]); else dst[i] = src[i]; } return; }
      for (var k in src){
        if (!Object.prototype.hasOwnProperty.call(src, k) || k === 'arn' || /_arn$/.test(k)) continue;
        var val = src[k];
        if (S.arv === 'neutral'){ if (k === 'ar' && src.arn != null) val = src.arn; else if (/_ar$/.test(k) && src[k + 'n'] != null) val = src[k + 'n']; }
        if (val && typeof val === 'object' && dst[k] && typeof dst[k] === 'object') swap(dst[k], val); else dst[k] = val;
      }
    })(target, fresh);
  }
  function rebuildDict(){
    if (!ORIG){ ORIG = {en:Object.assign({}, T.en), ar:Object.assign({}, T.ar)}; }
    var k, enTok = TOK.en, arTok = S.arv === 'neutral' ? TOK.neutral : TOK.gulf, frTok = TOK.fr;
    for (k in ORIG.en) T.en[k] = expand(enTok[k] != null ? enTok[k] : ORIG.en[k], 'en');
    for (k in ORIG.ar) T.ar[k] = expand(arTok[k] != null ? arTok[k] : (S.arv === 'neutral' && TOK.gulf[k] != null ? TOK.gulf[k] : ORIG.ar[k]), 'ar');
    var fr = {};
    for (k in ORIG.en) fr[k] = expand(frTok[k] != null ? frTok[k] : (enTok[k] != null ? enTok[k] : ORIG.en[k]), 'fr');
    for (var L in {en:1, gulf:1, neutral:1, fr:1}){
      var nk = NEWKEYS[L] || {}; for (k in nk){
        if (L === 'en') T.en[k] = expand(nk[k], 'en');
        else if (L === 'fr') fr[k] = expand(nk[k], 'fr');
        else if ((L === 'gulf' && S.arv !== 'neutral') || (L === 'neutral' && S.arv === 'neutral')) T.ar[k] = expand(nk[k], 'ar');
        else if (L === 'gulf' && S.arv === 'neutral' && (NEWKEYS.neutral || {})[k] == null) T.ar[k] = expand(nk[k], 'ar');
      }
    }
    if (!T.fr) T.fr = {};
    for (k in fr) T.fr[k] = fr[k];
  }
  function logoCSS(){
    var css = '', m = S.tgt;
    if (m && !isSA(m) && m.logos){
      for (var cls in m.logos){
        var g = m.logos[cls]; if (!g) continue;
        css += '.colog.' + cls + '{background-image:none!important;background-color:' + g.bg + '!important;position:relative}'
             + '.colog.' + cls + '::before{content:"' + String(g.mono).replace(/"/g, '') + '";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
             + 'font:800 ' + (String(g.mono).length > 2 ? '11px' : '13px') + '/1 Inter,system-ui,sans-serif;letter-spacing:-.02em;color:' + (g.fg || '#fff') + '}';
      }
    }
    var el = document.getElementById('mktLogoCSS');
    if (!el){ el = document.createElement('style'); el.id = 'mktLogoCSS'; document.head.appendChild(el); }
    el.textContent = css;
  }
  function personaById(id){
    id = String(id || '').toUpperCase();
    for (var i = 0; i < PERSONAS.length; i++) if (PERSONAS[i].id.toUpperCase() === id) return PERSONAS[i];
    return PERSONAS[0] || null;
  }
  var listeners = [];
  function set(pid, opts){
    var p = personaById(pid); if (!p) return;
    S.pid = p.id; S.p = p;
    S.resCode = p.res; S.tgtCode = (p.targets && p.targets[0]) || p.res;
    S.res = PACKS[S.resCode] || PACKS.INTL || PACKS.SA;
    if (!PACKS[S.resCode]) S.res = Object.assign({}, PACKS.INTL || {}, {code:'INTL', cur:(BASE.markets.INTL || {}).cur, price:(BASE.markets.INTL || {}).price});
    S.tgt = PACKS[S.tgtCode] || PACKS.SA;
    S.arv = p.arv || ((BASE.markets[S.resCode] || {}).arVariant) || 'neutral';
    rebuildDict();
    for (var n in OBJ) syncObj(n);
    logoCSS();
    document.documentElement.setAttribute('data-market', S.tgtCode);
    document.documentElement.setAttribute('data-res', S.resCode);
    listeners.forEach(function(f){ try{ f(S); }catch(e){ console.error(e); } });
    if (!(opts && opts.silent)){
      try{ render(); }catch(e){ console.error(e); }
      try{ if (typeof curScreen !== 'undefined' && curScreen) go(curScreen); }catch(e){ console.error(e); }
    }
    var sel = document.getElementById('mkSel'); if (sel && sel.value !== p.id) sel.value = p.id;
    try{ var u = new URL(location.href); u.searchParams.set('persona', p.id); history.replaceState(null, '', u); }catch(_){}
  }
  /* currency safety net: any raw "N ¤" left in a string becomes the residence currency at the price rate */
  function moneyHTML(sar, l){
    l = l || lang;
    var n = price(sar), m = S.res;
    if (isSA(m)) return grp(n, l) + '&nbsp;<span class="sar" aria-label="SAR"></span>';
    return esc(moneyStr(n, l, m));
  }
  function salHTML(sarMonthly, l){
    l = l || lang;
    if (isSA(S.tgt)) return grp(sarMonthly, l) + '&nbsp;<span class="sar" aria-label="SAR"></span>';
    return esc(moneyStr(sal(sarMonthly), l, S.tgt));
  }
  function curText(l){ var c = curOf(S.res); return c.glyph ? 'SAR' : pick(c.sym, l || lang); }
  function convertRaw(s, l){
    if (isSA(S.res) || s.indexOf('¤') < 0) return null;
    return s.replace(/(\d[\d, ]*)(\s|&nbsp;| )?¤/g, function(_, num){ return moneyStr(price(+num.replace(/[, ]/g, '')), l || lang, S.res); })
            .replace(/¤/g, curText(l));
  }
  return {
    S: S, set: set, expand: expand, expandDeep: expandDeep, price: price, sal: sal, salPer: salPer,
    money: function(sar, l){ return moneyStr(price(sar), l || lang, S.res); },
    moneyNum: function(sar, l){ return moneyStr(price(sar), l || lang, S.res, true); },
    salary: function(v, l){ return moneyStr(sal(v), l || lang, isSA(S.tgt) ? null : S.tgt); },
    moneyHTML: moneyHTML, salHTML: salHTML, curText: curText, convertRaw: convertRaw, grp: grp,
    ent: function(id, l){ return ent(id, l || lang); }, lget: function(v, l){ return lget(v, l || lang); },
    personas: PERSONAS, packs: PACKS, base: BASE, persona: function(){ return S.p; },
    res: function(){ return S.res; }, tgt: function(){ return S.tgt; }, isSA: function(){ return isSA(S.tgt) && isSA(S.res); },
    registerObj: registerObj, syncObj: syncObj, onChange: function(f){ listeners.push(f); },
    tok: TOK, tokObj: TOKOBJ, orig: function(){ return ORIG; }
  };
})();

/* French and the market selector join the prototype bar */
(function(){
  var seg = document.getElementById('lang');
  if (seg && !seg.querySelector('[data-l="fr"]')){ var b = document.createElement('button'); b.setAttribute('data-l', 'fr'); b.textContent = 'FR'; seg.appendChild(b); }
  var bar = document.querySelector('.controls'); if (!bar) return;
  var sel = document.createElement('select'); sel.id = 'mkSel'; sel.title = 'market persona (demo)';
  var groups = {};
  (MKT.base.regions || []).forEach(function(r){ var og = document.createElement('optgroup'); og.label = r.en; groups[r.id] = og; sel.appendChild(og); });
  var xog = document.createElement('optgroup'); xog.label = 'Cross-border'; groups.x = xog; sel.appendChild(xog);
  MKT.personas.forEach(function(p){
    var o = document.createElement('option'); o.value = p.id; o.textContent = p.label || p.id;
    (groups[p.group] || xog).appendChild(o);
  });
  sel.addEventListener('change', function(){ MKT.set(sel.value); });
  var jump = document.getElementById('jump');
  if (jump && jump.parentNode === bar) bar.insertBefore(sel, jump); else bar.appendChild(sel);
})();

/* sarHTML is the single funnel most money strings pass through: route it through the market */
(function(){
  var _sar = sarHTML;
  sarHTML = function(s){ var c = MKT.convertRaw(String(s)); return c == null ? _sar(s) : c; };
})();

/* boot: ?persona=AE etc. Default is the v5 persona (KSA). */
(function(){
  var pid = 'SA';
  try{ var q = new URLSearchParams(location.search).get('persona'); if (q) pid = q; }catch(_){}
  MKT.set(pid, {silent: pid === 'SA'});
  var p = MKT.persona();
  if (p && pid !== 'SA'){ var want = (MKT.base.markets[p.res] || {}).lang; if (want && want !== lang){ var b = document.querySelector('#lang button[data-l="' + want + '"]'); if (b) b.click(); } }
})();
