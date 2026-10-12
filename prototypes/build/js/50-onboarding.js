/* ==== v6 onboarding, paywall, checkout and post-payment setup (50-onboarding) ====
   Flow. Before payment (2 steps): welcome -> where (residence, target countries, cities, remote) -> targets (roles only) -> wall.
         payOtp -> checkout (payment area built from the RESIDENCE pack; KSA keeps the v5 markup untouched) -> subDone.
         After payment, "Finish setup": rights -> profile -> [cvtOffer] -> aboutYou -> tune -> blocklist -> autopilot -> live.
   State: window.OB6 (one object, initialised from the market persona; kept across residence / primary-target switches).
   Data: MKT.packs[code] core fields (name, short, in, dem, nationals, cities, employers, sal, tax, pay, rights, nationalisation,
         sensitive, legal, lang2, noticeDays, region) with a small built-in fallback for markets whose pack is not in yet.
   Copy: ob6* keys in i18n/newkeys-*.json (data-t when static, filled here when templated). */
(function(){
'use strict';
if (window.OB6) return;

/* ---------------------------------------------------------------- tiny helpers */
var $ = function(id){ return document.getElementById(id); };
var qs = function(s, r){ return (r || document).querySelector(s); };
var qa = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
function L(){ return lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en'; }
function d(k){ var t = T[lang] || T.en; return t[k] != null ? t[k] : (T.en[k] != null ? T.en[k] : ''); }
function fill(k, v){ var s = d(k); if (v) for (var x in v) if (Object.prototype.hasOwnProperty.call(v, x)) s = s.split('{' + x + '}').join(v[x] == null ? '' : v[x]); return s; }
function E(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function H(s){ s = E(s); return s.indexOf('¤') >= 0 ? sarHTML(s) : s; }
function fh(k, v){ return H(fill(k, v)); }
function lg(v){ return v == null ? '' : MKT.lget(v); }
function grp(n){ return MKT.grp(n, lang); }
function persona(){ return MKT.persona() || {}; }
function gender(){ return persona().gender === 'm' ? 'm' : 'f'; }
function isSAcode(c){ return c === 'SA'; }
function uniq(a){ var o = []; a.forEach(function(x){ if (x != null && o.indexOf(x) < 0) o.push(x); }); return o; }

/* ---------------------------------------------------------------- markets: pack + fallback */
var GCC = ['SA', 'AE', 'QA', 'KW', 'BH', 'OM'];
var EEA = ['DE', 'FR', 'NL', 'BE', 'ES', 'IT', 'PL', 'SE', 'IE', 'AT', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'GR', 'HU', 'LV', 'LT', 'LU', 'MT', 'PT', 'RO', 'SK', 'SI', 'IS', 'LI', 'NO', 'CH'];
var EU_MK = ['DE', 'FR', 'NL', 'BE', 'ES', 'IT', 'PL', 'SE', 'IE', 'CH'];
var NATIVE = {ar:['SA','AE','QA','KW','BH','OM','EG','MA','TN','DZ','LY','JO','LB','IQ','SY','YE','SD'], en:['US','CA','GB','IE','AU'], de:['DE','CH'], fr:['FR','BE'], nl:['NL'], es:['ES'], it:['IT'], pl:['PL'], sv:['SE']};
var LCODE = {Arabic:'ar', English:'en', German:'de', French:'fr', Dutch:'nl', Spanish:'es', Italian:'it', Polish:'pl', Swedish:'sv'};
/* relative FP&A job volume of each market (KSA = 1), for the demo counts */
var JOBF = {SA:1, AE:1.15, QA:.45, KW:.35, BH:.25, OM:.3, US:3.4, CA:1.3, GB:2.2, IE:.7, DE:1.7, FR:1.5, NL:1, BE:.6, ES:.9, IT:.8, PL:.8, SE:.6, CH:.8, AU:1.4, EG:.9, MA:.45, TN:.3, DZ:.25, LY:.12, JO:.3, LB:.2, IQ:.25};
var CW = [.55, .25, .08, .05, .03, .02, .02, .02];   /* share of a market's jobs by city rank (first city = densest) */
var BASE_SCORE = .9;                                  /* v5 KSA default: Riyadh + Jeddah + remote = 38 roles from 1,240 postings */

/* fallback for markets (and nationalities) without a core pack yet: [flag, name, short, in, dem m/f, cities] */
function C(en, ar, fr){ return {en:en, ar:ar, fr:fr}; }
function DM(en, ar, arf, fr, frf){ return {en:en, ar:ar, arf:arf, fr:fr, frf:frf}; }
var FB = {
 SA:['🇸🇦', C('Saudi Arabia','السعودية','Arabie saoudite'), C('Saudi Arabia','السعودية',"l'Arabie saoudite"), C('in Saudi Arabia','في السعودية','en Arabie saoudite'), DM('Saudi','سعودي','سعودية','saoudien','saoudienne'),
     [['riyadh','Riyadh','الرياض','Riyad'],['jeddah','Jeddah','جدة','Djeddah'],['dammam','Dammam','الدمام','Dammam'],['khobar','Al Khobar','الخبر','Al Khobar'],['mecca','Mecca','مكة','La Mecque'],['medina','Medina','المدينة المنورة','Médine'],['abha','Abha','أبها','Abha']]],
 AE:['🇦🇪', C('United Arab Emirates','الإمارات','Émirats arabes unis'), C('the UAE','الإمارات','les Émirats'), C('in the UAE','في الإمارات','aux Émirats'), DM('Emirati','إماراتي','إماراتية','émirien','émirienne'),
     [['dubai','Dubai','دبي','Dubaï'],['abudhabi','Abu Dhabi','أبوظبي','Abou Dabi'],['sharjah','Sharjah','الشارقة','Charjah'],['ajman','Ajman','عجمان','Ajman'],['alain','Al Ain','العين','Al-Aïn']]],
 QA:['🇶🇦', C('Qatar','قطر','Qatar'), C('Qatar','قطر','le Qatar'), C('in Qatar','في قطر','au Qatar'), DM('Qatari','قطري','قطرية','qatarien','qatarienne'),
     [['doha','Doha','الدوحة','Doha'],['lusail','Lusail','لوسيل','Lusail'],['alrayyan','Al Rayyan','الريان','Al-Rayyan'],['alwakrah','Al Wakrah','الوكرة','Al-Wakrah']]],
 KW:['🇰🇼', C('Kuwait','الكويت','Koweït'), C('Kuwait','الكويت','le Koweït'), C('in Kuwait','في الكويت','au Koweït'), DM('Kuwaiti','كويتي','كويتية','koweïtien','koweïtienne'),
     [['kuwaitcity','Kuwait City','مدينة الكويت','Koweït'],['hawalli','Hawalli','حولي','Hawalli'],['salmiya','Salmiya','السالمية','Salmiya'],['ahmadi','Al Ahmadi','الأحمدي','Al-Ahmadi']]],
 BH:['🇧🇭', C('Bahrain','البحرين','Bahreïn'), C('Bahrain','البحرين','Bahreïn'), C('in Bahrain','في البحرين','à Bahreïn'), DM('Bahraini','بحريني','بحرينية','bahreïnien','bahreïnienne'),
     [['manama','Manama','المنامة','Manama'],['muharraq','Muharraq','المحرق','Muharraq'],['riffa','Riffa','الرفاع','Riffa'],['isatown','Isa Town','مدينة عيسى','Isa Town']]],
 OM:['🇴🇲', C('Oman','عُمان','Oman'), C('Oman','عُمان',"l'Oman"), C('in Oman','في عُمان','à Oman'), DM('Omani','عُماني','عُمانية','omanais','omanaise'),
     [['muscat','Muscat','مسقط','Mascate'],['sohar','Sohar','صحار','Sohar'],['salalah','Salalah','صلالة','Salalah'],['duqm','Duqm','الدقم','Duqm']]],
 US:['🇺🇸', C('United States','الولايات المتحدة','États-Unis'), C('the US','الولايات المتحدة','les États-Unis'), C('in the US','في الولايات المتحدة','aux États-Unis'), DM('American','أمريكي','أمريكية','américain','américaine'),
     [['new-york','New York','نيويورك','New York'],['chicago','Chicago','شيكاغو','Chicago'],['boston','Boston','بوسطن','Boston'],['san-francisco','San Francisco','سان فرانسيسكو','San Francisco'],['dallas','Dallas','دالاس','Dallas']]],
 CA:['🇨🇦', C('Canada','كندا','Canada'), C('Canada','كندا','le Canada'), C('in Canada','في كندا','au Canada'), DM('Canadian','كندي','كندية','canadien','canadienne'),
     [['toronto','Toronto','تورونتو','Toronto'],['montreal','Montreal','مونتريال','Montréal'],['vancouver','Vancouver','فانكوفر','Vancouver'],['calgary','Calgary','كالغاري','Calgary']]],
 GB:['🇬🇧', C('United Kingdom','المملكة المتحدة','Royaume-Uni'), C('the UK','المملكة المتحدة','le Royaume-Uni'), C('in the UK','في المملكة المتحدة','au Royaume-Uni'), DM('British','بريطاني','بريطانية','britannique','britannique'),
     [['london','London','لندن','Londres'],['manchester','Manchester','مانشستر','Manchester'],['birmingham','Birmingham','برمنغهام','Birmingham'],['edinburgh','Edinburgh','إدنبرة','Édimbourg'],['leeds','Leeds','ليدز','Leeds']]],
 IE:['🇮🇪', C('Ireland','أيرلندا','Irlande'), C('Ireland','أيرلندا',"l'Irlande"), C('in Ireland','في أيرلندا','en Irlande'), DM('Irish','أيرلندي','أيرلندية','irlandais','irlandaise'),
     [['dublin','Dublin','دبلن','Dublin'],['cork','Cork','كورك','Cork'],['galway','Galway','غالواي','Galway'],['limerick','Limerick','ليمريك','Limerick']]],
 DE:['🇩🇪', C('Germany','ألمانيا','Allemagne'), C('Germany','ألمانيا',"l'Allemagne"), C('in Germany','في ألمانيا','en Allemagne'), DM('German','ألماني','ألمانية','allemand','allemande'),
     [['frankfurt','Frankfurt','فرانكفورت','Francfort'],['munich','Munich','ميونخ','Munich'],['berlin','Berlin','برلين','Berlin'],['hamburg','Hamburg','هامبورغ','Hambourg'],['duesseldorf','Düsseldorf','دوسلدورف','Düsseldorf']]],
 FR:['🇫🇷', C('France','فرنسا','France'), C('France','فرنسا','la France'), C('in France','في فرنسا','en France'), DM('French','فرنسي','فرنسية','français','française'),
     [['paris','Paris','باريس','Paris'],['lyon','Lyon','ليون','Lyon'],['lille','Lille','ليل','Lille'],['toulouse','Toulouse','تولوز','Toulouse'],['marseille','Marseille','مرسيليا','Marseille']]],
 NL:['🇳🇱', C('Netherlands','هولندا','Pays-Bas'), C('the Netherlands','هولندا','les Pays-Bas'), C('in the Netherlands','في هولندا','aux Pays-Bas'), DM('Dutch','هولندي','هولندية','néerlandais','néerlandaise'),
     [['amsterdam','Amsterdam','أمستردام','Amsterdam'],['rotterdam','Rotterdam','روتردام','Rotterdam'],['utrecht','Utrecht','أوتريخت','Utrecht'],['the-hague','The Hague','لاهاي','La Haye']]],
 BE:['🇧🇪', C('Belgium','بلجيكا','Belgique'), C('Belgium','بلجيكا','la Belgique'), C('in Belgium','في بلجيكا','en Belgique'), DM('Belgian','بلجيكي','بلجيكية','belge','belge'),
     [['brussels','Brussels','بروكسل','Bruxelles'],['antwerp','Antwerp','أنتويرب','Anvers'],['ghent','Ghent','غنت','Gand'],['liege','Liège','لييج','Liège']]],
 ES:['🇪🇸', C('Spain','إسبانيا','Espagne'), C('Spain','إسبانيا',"l'Espagne"), C('in Spain','في إسبانيا','en Espagne'), DM('Spanish','إسباني','إسبانية','espagnol','espagnole'),
     [['madrid','Madrid','مدريد','Madrid'],['barcelona','Barcelona','برشلونة','Barcelone'],['valencia','Valencia','فالنسيا','Valence'],['seville','Seville','إشبيلية','Séville']]],
 IT:['🇮🇹', C('Italy','إيطاليا','Italie'), C('Italy','إيطاليا',"l'Italie"), C('in Italy','في إيطاليا','en Italie'), DM('Italian','إيطالي','إيطالية','italien','italienne'),
     [['milan','Milan','ميلانو','Milan'],['rome','Rome','روما','Rome'],['turin','Turin','تورينو','Turin'],['bologna','Bologna','بولونيا','Bologne']]],
 PL:['🇵🇱', C('Poland','بولندا','Pologne'), C('Poland','بولندا','la Pologne'), C('in Poland','في بولندا','en Pologne'), DM('Polish','بولندي','بولندية','polonais','polonaise'),
     [['warsaw','Warsaw','وارسو','Varsovie'],['krakow','Kraków','كراكوف','Cracovie'],['wroclaw','Wrocław','فروتسواف','Wrocław'],['gdansk','Gdańsk','غدانسك','Gdańsk']]],
 SE:['🇸🇪', C('Sweden','السويد','Suède'), C('Sweden','السويد','la Suède'), C('in Sweden','في السويد','en Suède'), DM('Swedish','سويدي','سويدية','suédois','suédoise'),
     [['stockholm','Stockholm','ستوكهولم','Stockholm'],['gothenburg','Gothenburg','غوتنبرغ','Göteborg'],['malmo','Malmö','مالمو','Malmö'],['uppsala','Uppsala','أوبسالا','Uppsala']]],
 CH:['🇨🇭', C('Switzerland','سويسرا','Suisse'), C('Switzerland','سويسرا','la Suisse'), C('in Switzerland','في سويسرا','en Suisse'), DM('Swiss','سويسري','سويسرية','suisse','suisse'),
     [['zurich','Zurich','زيورخ','Zurich'],['geneva','Geneva','جنيف','Genève'],['basel','Basel','بازل','Bâle'],['zug','Zug','تسوغ','Zoug']]],
 AU:['🇦🇺', C('Australia','أستراليا','Australie'), C('Australia','أستراليا',"l'Australie"), C('in Australia','في أستراليا','en Australie'), DM('Australian','أسترالي','أسترالية','australien','australienne'),
     [['sydney','Sydney','سيدني','Sydney'],['melbourne','Melbourne','ملبورن','Melbourne'],['brisbane','Brisbane','بريزبن','Brisbane'],['perth','Perth','بيرث','Perth']]],
 EG:['🇪🇬', C('Egypt','مصر','Égypte'), C('Egypt','مصر',"l'Égypte"), C('in Egypt','في مصر','en Égypte'), DM('Egyptian','مصري','مصرية','égyptien','égyptienne'),
     [['cairo','Cairo','القاهرة','Le Caire'],['giza','Giza','الجيزة','Gizeh'],['alexandria','Alexandria','الإسكندرية','Alexandrie'],['newcairo','New Cairo','القاهرة الجديدة','Le Nouveau Caire']]],
 MA:['🇲🇦', C('Morocco','المغرب','Maroc'), C('Morocco','المغرب','le Maroc'), C('in Morocco','في المغرب','au Maroc'), DM('Moroccan','مغربي','مغربية','marocain','marocaine'),
     [['casablanca','Casablanca','الدار البيضاء','Casablanca'],['rabat','Rabat','الرباط','Rabat'],['tangier','Tangier','طنجة','Tanger'],['marrakech','Marrakesh','مراكش','Marrakech']]],
 TN:['🇹🇳', C('Tunisia','تونس','Tunisie'), C('Tunisia','تونس','la Tunisie'), C('in Tunisia','في تونس','en Tunisie'), DM('Tunisian','تونسي','تونسية','tunisien','tunisienne'),
     [['tunis','Tunis','تونس','Tunis'],['sfax','Sfax','صفاقس','Sfax'],['sousse','Sousse','سوسة','Sousse']]],
 DZ:['🇩🇿', C('Algeria','الجزائر','Algérie'), C('Algeria','الجزائر',"l'Algérie"), C('in Algeria','في الجزائر','en Algérie'), DM('Algerian','جزائري','جزائرية','algérien','algérienne'),
     [['algiers','Algiers','الجزائر العاصمة','Alger'],['oran','Oran','وهران','Oran'],['constantine','Constantine','قسنطينة','Constantine'],['annaba','Annaba','عنابة','Annaba']]],
 LY:['🇱🇾', C('Libya','ليبيا','Libye'), C('Libya','ليبيا','la Libye'), C('in Libya','في ليبيا','en Libye'), DM('Libyan','ليبي','ليبية','libyen','libyenne'),
     [['tripoli','Tripoli','طرابلس','Tripoli'],['benghazi','Benghazi','بنغازي','Benghazi'],['misrata','Misrata','مصراتة','Misrata']]],
 JO:['🇯🇴', C('Jordan','الأردن','Jordanie'), C('Jordan','الأردن','la Jordanie'), C('in Jordan','في الأردن','en Jordanie'), DM('Jordanian','أردني','أردنية','jordanien','jordanienne'),
     [['amman','Amman','عمّان','Amman'],['irbid','Irbid','إربد','Irbid'],['zarqa','Zarqa','الزرقاء','Zarqa'],['aqaba','Aqaba','العقبة','Aqaba']]],
 LB:['🇱🇧', C('Lebanon','لبنان','Liban'), C('Lebanon','لبنان','le Liban'), C('in Lebanon','في لبنان','au Liban'), DM('Lebanese','لبناني','لبنانية','libanais','libanaise'),
     [['beirut','Beirut','بيروت','Beyrouth'],['jounieh','Jounieh','جونيه','Jounieh'],['tripoli-lb','Tripoli','طرابلس','Tripoli'],['saida','Sidon','صيدا','Saïda']]],
 IQ:['🇮🇶', C('Iraq','العراق','Irak'), C('Iraq','العراق',"l'Irak"), C('in Iraq','في العراق','en Irak'), DM('Iraqi','عراقي','عراقية','irakien','irakienne'),
     [['baghdad','Baghdad','بغداد','Bagdad'],['erbil','Erbil','أربيل','Erbil'],['basra','Basra','البصرة','Bassora'],['sulaymaniyah','Sulaymaniyah','السليمانية','Souleimaniye']]],
 IN:['🇮🇳', C('India','الهند','Inde'), C('India','الهند',"l'Inde"), C('in India','في الهند','en Inde'), DM('Indian','هندي','هندية','indien','indienne'),
     [['bengaluru','Bengaluru','بنغالور','Bangalore'],['mumbai','Mumbai','مومباي','Bombay'],['delhi','Delhi','دلهي','Delhi']]],
 PK:['🇵🇰', C('Pakistan','باكستان','Pakistan'), C('Pakistan','باكستان','le Pakistan'), C('in Pakistan','في باكستان','au Pakistan'), DM('Pakistani','باكستاني','باكستانية','pakistanais','pakistanaise'), [['karachi','Karachi','كراتشي','Karachi'],['lahore','Lahore','لاهور','Lahore']]],
 PH:['🇵🇭', C('Philippines','الفلبين','Philippines'), C('the Philippines','الفلبين','les Philippines'), C('in the Philippines','في الفلبين','aux Philippines'), DM('Filipino','فلبيني','فلبينية','philippin','philippine'), [['manila','Manila','مانيلا','Manille']]],
 SY:['🇸🇾', C('Syria','سوريا','Syrie'), C('Syria','سوريا','la Syrie'), C('in Syria','في سوريا','en Syrie'), DM('Syrian','سوري','سورية','syrien','syrienne'), [['damascus','Damascus','دمشق','Damas']]],
 YE:['🇾🇪', C('Yemen','اليمن','Yémen'), C('Yemen','اليمن','le Yémen'), C('in Yemen','في اليمن','au Yémen'), DM('Yemeni','يمني','يمنية','yéménite','yéménite'), [['sanaa','Sanaa','صنعاء','Sanaa']]],
 SD:['🇸🇩', C('Sudan','السودان','Soudan'), C('Sudan','السودان','le Soudan'), C('in Sudan','في السودان','au Soudan'), DM('Sudanese','سوداني','سودانية','soudanais','soudanaise'), [['khartoum','Khartoum','الخرطوم','Khartoum']]]
};
var XNAT = ['IN', 'PK', 'PH', 'SY', 'YE', 'SD'];  /* nationalities offered beyond our markets */
function P(code){ var p = MKT.packs && MKT.packs[code]; return (p && (p.name || p.cities || p.pay)) ? p : null; }
function I(code){
  var p = P(code) || {}, f = FB[code] || [];
  var cities = (p.cities && p.cities.length) ? p.cities : (f[5] || []).map(function(c){ return {id:c[0], en:c[1], ar:c[2], fr:c[3]}; });
  return {code:code, flag:p.flag || f[0] || '', name:p.name || f[1] || C(code, code, code), short:p.short || f[2] || p.name || f[1] || C(code, code, code),
          inn:p['in'] || f[3] || null, dem:p.dem || f[4] || null, nationals:p.nationals || null, cities:cities, pack:P(code)};
}
function regions(){ return (MKT.base && MKT.base.regions) || []; }
function regionOf(code){ var r = regions().filter(function(x){ return (x.markets || []).indexOf(code) >= 0; })[0]; return r || null; }
function inMarkets(code){ return !!regionOf(code); }
function cname(c){ return lg(I(c).name); }
function cshort(c){ return lg(I(c).short); }
function cin(c){ var i = I(c); if (i.inn) return lg(i.inn); var l = L(); return (l === 'ar' ? 'في ' : l === 'fr' ? 'en ' : 'in ') + lg(i.short); }
function dem(c, g){ var x = I(c).dem; if (!x) return cname(c); var l = L(); if (l === 'ar') return (g === 'f' && x.arf) ? x.arf : (x.ar || x.en); if (l === 'fr') return (g === 'f' && x.frf) ? x.frf : (x.fr || x.en); return x.en; }
function nationals(c){ var i = I(c); return i.nationals ? lg(i.nationals) : dem(c, 'm'); }
function cityOf(code, id){ var c = I(code).cities.filter(function(x){ return x.id === id; })[0]; return c || null; }
function cityLabel(code, id){ var c = cityOf(code, id); return c ? lg(c) : String(id || ''); }
function slug(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '').trim(); }
function cityIdFor(code, name){
  var cs = I(code).cities; if (!cs.length) return null; var s = slug(name);
  var hit = cs.filter(function(c){ return c.id === name || slug(c.en) === s || slug(c.id) === s; })[0];
  if (!hit){ var pp = (P(code) || {}).persona; if (pp && pp.city) hit = cs.filter(function(c){ return c.id === pp.city; })[0]; }
  return (hit || cs[0]).id;
}
function joinList(arr){ if (arr.length < 2) return arr.join(''); return arr.slice(0, -1).join(L() === 'ar' ? '، ' : ', ') + d('ob6And') + arr[arr.length - 1]; }

/* ---------------------------------------------------------------- state */
var OB6 = window.OB6 = {pid:null};
function personaById(id){ return (MKT.personas || []).filter(function(p){ return p.id === id; })[0] || null; }
function rememberOrig(p){ if (p && !p._ob6) p._ob6 = {res:p.res, arv:p.arv, targets:(p.targets || []).slice(), city:p.city}; }
function restoreOrig(p){ if (!p || !p._ob6) return false; var o = p._ob6, ch = p.res !== o.res || (p.targets || [])[0] !== o.targets[0] || p.arv !== o.arv;
  p.res = o.res; p.arv = o.arv; p.targets = o.targets.slice(); p.city = o.city; return ch; }
function defCities(c){
  var ids = I(c).cities.map(function(x){ return x.id; }); if (!ids.length) return [];
  var first = (c === OB6.resCountry && OB6.resCity && ids.indexOf(OB6.resCity) >= 0) ? OB6.resCity : ids[0];
  var out = [first]; for (var i = 0; i < ids.length && out.length < 2; i++) if (out.indexOf(ids[i]) < 0) out.push(ids[i]);
  return out;
}
function initFrom(p){
  rememberOrig(p);
  var o = OB6; o.pid = p.id;
  o.res = p.res; o.resCountry = p.res === 'INTL' ? (inMarkets(p.nat) ? null : p.nat) : p.res;
  o.resCity = o.resCountry ? cityIdFor(o.resCountry, p.city) : null; o.resSet = false;
  o.targets = (p.targets || [p.res]).slice();
  o.cities = {}; o.any = {};
  o.targets.forEach(function(c){ o.cities[c] = defCities(c); o.any[c] = false; });
  o.remote = true; o.order = o.targets.concat(['REMOTE']); o.strict = 'only';
  o.rights = {}; o.us = {}; o.over = {}; o.lv = {}; o.eeo = 'pns'; o.gender = p.gender; o.nat = p.nat;
  o.sal = {}; o.noticeSet = false; o.engSet = false; o.regOpen = {}; o.ckRes = null;
}
function tgts(){ return OB6.order.filter(function(k){ return k !== 'REMOTE' && OB6.targets.indexOf(k) >= 0; }).concat(OB6.targets.filter(function(k){ return OB6.order.indexOf(k) < 0; })); }
function places(){ syncOrder(); return OB6.order.slice(); }
function primary(){ return tgts()[0] || (MKT.tgt() || {}).code || 'SA'; }
function syncOrder(){
  var want = OB6.targets.slice(); if (OB6.remote) want.push('REMOTE');
  OB6.order = OB6.order.filter(function(k){ return want.indexOf(k) >= 0; }).concat(want.filter(function(k){ return OB6.order.indexOf(k) < 0; }));
}
function keepScroll(fn){ var b = qs('.scr.on > .body'), y = b ? b.scrollTop : 0; fn(); var b2 = qs('.scr.on > .body'); if (b2) b2.scrollTop = y; }
/* the engine reads residence + primary target from the persona: write them back and re-run it when they change */
function pushPersona(force){
  var p = MKT.persona(); if (!p) return; syncOrder();
  var t = tgts(); if (!t.length) t = (p.targets || []).slice(0, 1);
  var ch = force || p.targets[0] !== t[0] || p.res !== OB6.res;
  p.targets = t.slice();
  if (ch) keepScroll(function(){ OB6._busy = true; try { MKT.set(p.id); } finally { OB6._busy = false; } });
}
function setResidence(code, country){
  var p = MKT.persona(); if (!p) return;
  OB6.res = code; OB6.resCountry = country; OB6.resSet = true;
  OB6.resCity = country ? (cityOf(country, OB6.resCity) ? OB6.resCity : ((I(country).cities[0] || {}).id || null)) : null;
  p.res = code; var bm = (MKT.base.markets || {})[code] || (MKT.base.markets || {}).INTL || {}; p.arv = bm.arVariant || 'neutral';
  pushPersona(true);
  var cur = (MKT.res() && MKT.res().cur) || {}; toast(fill('ob6TRes', {cur:cur.code || ''}));
}

/* ---------------------------------------------------------------- money, salary, counts */
function pk(x, l){ return (x && typeof x === 'object') ? (x[l] != null ? x[l] : x.en) : x; }
function fmtNum(n, l){ l = l || lang; var neg = n < 0; n = Math.abs(n); var i = Math.floor(n + 1e-9), f = Math.round((n - i) * 100); if (f >= 100){ i++; f = 0; }
  var s = MKT.grp(i, l); if (f) s += (l === 'fr' ? ',' : '.') + (f < 10 ? '0' : '') + f; return (neg ? '-' : '') + s; }
function curOf(m){ return (m && m.cur) || ((MKT.base.markets || {}).SA || {}).cur || {glyph:true}; }
function fmtMoney(n, m, l){ l = l || lang; var c = curOf(m), num = fmtNum(n, l); if (c.glyph) return num + ' ¤';
  var sym = pk(c.sym, l), pos = pk(c.pos, l) || 'after', sp = pk(c.sp, l), gap = sp === false ? '' : ' ';
  return pos === 'before' ? sym + gap + num : num + gap + sym; }
function curSym(m, l){ var c = curOf(m); return c.glyph ? '¤' : pk(c.sym, l || lang); }
function resM(){ return MKT.res(); }
function money(n){ return fmtMoney(n, resM()); }           /* n already in residence currency */
function priceL(sar){ return MKT.price(sar); }              /* product price: SAR -> residence currency */
var SALFB = {gcc:{per:'month', f:.8}, na:{per:'year', f:.4}, uk:{per:'year', f:.3}, eu:{per:'month', f:.2}, au:{per:'year', f:.4}, naf:{per:'month', f:.12}, lev:{per:'month', f:.12}};
function salOf(code){ if (code === 'SA') return {per:'month', f:1}; var p = P(code); if (p && p.sal) return p.sal;
  if (code === 'INTL' || !inMarkets(code)) return {per:'year', f:.065}; var r = regionOf(code); return SALFB[r && r.id] || {per:'month', f:.5}; }
function salNice(v){ var st = v >= 100000 ? 1000 : v >= 10000 ? 500 : v >= 1000 ? 50 : 10; return Math.round(v / st) * st; }
function salIn(sarMonthly, code){ if (code === 'SA') return sarMonthly; var s = salOf(code); return salNice(sarMonthly * s.f * (s.per === 'year' ? 12 : 1)); }
function salMarket(code){ return code === 'INTL' ? resM() : (MKT.packs[code] || (code === OB6.res ? resM() : null)); }
function share(c){ if (OB6.any[c]) return 1; var ids = I(c).cities.map(function(x){ return x.id; }), s = 0;
  (OB6.cities[c] || []).forEach(function(id){ var i = ids.indexOf(id); s += i >= 0 ? (CW[i] || .02) : .02; }); return Math.min(1, s); }
function score(){ var t = tgts(), s = 0; t.forEach(function(c){ s += (JOBF[c] || .4) * share(c); });
  if (OB6.remote) s += .1 * (JOBF[t[0] || OB6.resCountry] || 1); return s; }
function matchCount(){ return Math.max(5, Math.round(38 * score() / BASE_SCORE)); }
function postings(){ return Math.max(120, Math.round(1240 * score() / BASE_SCORE / 10) * 10); }
function welcomeCount(){ var s = 0; OB6.targets.forEach(function(c){ s += JOBF[c] || .4; }); return Math.max(6, Math.round(38 * s / BASE_SCORE)); }
function ksaOnly(){ var t = tgts(); return OB6.res === 'SA' && t.length === 1 && t[0] === 'SA'; }

/* ---------------------------------------------------------------- employers (wall + live feeds) */
function pickEmployers(c, k){
  var p = P(c); if (!p || !p.employers || !p.employers.length) return null;
  var sel = OB6.any[c] ? null : (OB6.cities[c] || []);
  var groups = [['energy', 'mining', 'industrial', 'utility', 'conglomerate'], ['ecommerce', 'e-commerce', 'delivery', 'tech'], ['telecom'], ['fintech', 'tech']];
  var used = {}, out = [];
  var ok = function(x){ return !used[x.id]; }, here = function(x){ return !sel || !sel.length || sel.indexOf(x.city) >= 0; };
  groups.forEach(function(g){ if (out.length >= k) return;
    var e = p.employers.filter(function(x){ return ok(x) && g.indexOf(x.sector) >= 0 && here(x); })[0] || p.employers.filter(function(x){ return ok(x) && g.indexOf(x.sector) >= 0; })[0];
    if (e){ used[e.id] = 1; out.push(e); } });
  p.employers.forEach(function(x){ if (out.length < k && ok(x) && here(x)){ used[x.id] = 1; out.push(x); } });
  p.employers.forEach(function(x){ if (out.length < k && ok(x)){ used[x.id] = 1; out.push(x); } });
  return out.slice(0, k);
}
function empCity(c, e){ var sel = OB6.any[c] ? null : (OB6.cities[c] || []); var id = (!sel || !sel.length || sel.indexOf(e.city) >= 0) ? e.city : sel[0]; return cityLabel(c, id); }
function logoHTML(e, sz){ var g = e.logo || {bg:'#353CD8', fg:'#fff', mono:String(e.en || '?').slice(0, 2)}; var mono = String(g.mono || '').slice(0, 4);
  return '<div class="colog ob6lg' + (mono.length > 2 ? ' sm' : '') + '" style="width:' + sz + 'px;height:' + sz + 'px;border-radius:' + (sz > 31 ? 10 : 9) + 'px;background-color:' + E(g.bg) + ';color:' + E(g.fg || '#fff') + '">' + E(mono) + '</div>'; }

/* ---------------------------------------------------------------- welcome */
var ORIG = {};
function swapT(el, mine){ if (!el) return; if (!el.hasAttribute('data-ob6t0')) el.setAttribute('data-ob6t0', el.getAttribute('data-t') || '');
  if (mine) el.removeAttribute('data-t'); else { var k = el.getAttribute('data-ob6t0'); if (k) el.setAttribute('data-t', k); } }
function marketList(){ var t = OB6.targets.slice(0, 3), l = L();
  if (l === 'en') return joinList(t.map(cshort));
  if (l === 'ar') return joinList(t.map(function(c, i){ return i === 0 ? cin(c) : cshort(c); }));
  return joinList(t.map(cin)); }
function paintWelcome(){
  var a = qs('[data-ob6="wr2"]'), b = qs('[data-ob6="wr2s"]'); if (!a || !b) return;
  var mine = !(OB6.res === 'SA' && OB6.targets.length === 1 && OB6.targets[0] === 'SA');
  swapT(a, mine); swapT(b, mine);
  if (mine){ a.textContent = fill('ob6Wr2', {n:grp(welcomeCount())}); b.textContent = fill('ob6Wr2s', {list:marketList()}); }
  else { a.textContent = d('wr2'); b.textContent = d('wr2s'); }
}

/* ---------------------------------------------------------------- steps */
var POST = ['rights', 'profile', 'aboutYou', 'tune', 'blocklist', 'autopilot'];
function paintSteps(){
  qa('[data-ob6step]').forEach(function(el){
    var s = el.getAttribute('data-ob6step'), txt, pct;
    if (s === 'where'){ txt = fill('ob6StepKN', {k:1, n:2}); pct = 60; }
    else if (s === 'targets'){ txt = fill('ob6StepKN', {k:2, n:2}); pct = 80; }
    else { var k = POST.indexOf(s) + 1, n = POST.length; txt = fill('ob6SetupKN', {k:k, n:n}); pct = Math.round(k / n * 100); }
    el.textContent = txt;
    var st = el.closest('.setup'); if (!st) return;
    var bar = qs('[data-ob6bar]', st); if (bar) bar.style.width = pct + '%';
    var pc = qs('[data-ob6pct]', st); if (pc) pc.textContent = pct + '%';
  });
}

/* ---------------------------------------------------------------- where */
function chipHTML(attr, on, label, extra, dis){ return '<button class="chip' + (on ? ' on' : '') + (dis ? ' dis' : '') + '" ' + attr + '><i class="ti ti-check x"></i><i class="ti ti-plus plus"></i> <span>' + E(label) + '</span>' + (extra || '') + '</button>'; }
function resLabel(){ if (!OB6.resCountry) return d('ob6ResElse'); var c = OB6.resCity ? cityLabel(OB6.resCountry, OB6.resCity) : ''; return (c ? c + (L() === 'ar' ? '، ' : ', ') : '') + cname(OB6.resCountry); }
function resCityName(){ return OB6.resCountry && OB6.resCity ? cityLabel(OB6.resCountry, OB6.resCity) : (OB6.resCountry ? cname(OB6.resCountry) : d('ob6ResElse')); }
function paintWhere(){
  var box = $('ob6Where'); if (!box) return; syncOrder();
  var h = '';
  /* where you live */
  h += '<div class="setcard ob6based"><div class="setcard-h"><span class="setcard-ic"><i class="ti ti-home"></i></span><div class="setcard-ht"><span class="setcard-t">' + E(d('ob6WhBasedT')) + '</span></div>'
     + '<button class="ob6chg" data-sheet="ob6ResSheet" data-ob6resopen>' + E(d('ob6Change')) + '</button></div><hr class="setcard-div">'
     + '<div class="ob6basedrow"><span class="ob6flagbig">' + (OB6.resCountry ? I(OB6.resCountry).flag : '🌐') + '</span><div><b>' + E(resLabel()) + '</b><span>' + E(d(OB6.resSet ? 'ob6WhSet' : 'ob6WhDet')) + '</span></div></div>'
     + '<div class="allhint ob6hint">' + E(d('ob6WhBasedNote')) + ' <b class="ob6cur">' + E((curOf(resM()).code || '')) + '</b></div></div>';
  /* target countries */
  var t = OB6.targets;
  h += '<div class="setcard"><div class="setcard-h"><span class="setcard-ic"><i class="ti ti-world"></i></span><div class="setcard-ht"><span class="setcard-t">' + E(d('ob6WhCtryT')) + '</span><span class="setcard-n"><b class="selcount">' + t.length + '</b></span></div></div><hr class="setcard-div"><div class="chipgrid">';
  tgts().forEach(function(c){ var here = c === OB6.resCountry ? ' <span class="ob6here">' + E(d('ob6Here')) + '</span>' : '';
    h += '<button class="chip on ob6cchip" data-ob6ctry="' + c + '"><span class="ob6flag">' + I(c).flag + '</span> <span>' + E(cname(c)) + '</span>' + here + '<i class="ti ti-x x"></i></button>'; });
  h += '<button class="chip addchip" data-sheet="ob6AddSheet" data-ob6addopen><i class="ti ti-plus"></i> <span>' + E(d('ob6AddCtry')) + '</span></button></div></div>';
  /* per country: cities + anywhere */
  tgts().forEach(function(c){
    var cs = I(c).cities, any = !!OB6.any[c], sel = OB6.cities[c] || [], nsel = any ? cs.length : sel.length;
    h += '<div class="setcard ob6cc" data-ob6cc="' + c + '"><div class="setcard-h"><span class="setcard-ic ob6flagic">' + I(c).flag + '</span><div class="setcard-ht"><span class="setcard-t">' + E(cname(c)) + '</span><span class="setcard-n"><b class="selcount">' + nsel + ' / ' + cs.length + '</b></span></div>'
       + '<button class="chip allchip' + (any ? ' on' : '') + '" data-ob6any="' + c + '"><span class="sw-lab">' + E(fill('ob6AnyIn', {'in':cin(c)})) + '</span><span class="sw-track"><i class="ti ti-check allcheck"></i></span></button></div><hr class="setcard-div"><div class="chipgrid">';
    cs.forEach(function(x){ h += chipHTML('data-ob6city="' + c + '|' + E(x.id) + '"', !any && sel.indexOf(x.id) >= 0, lg(x), '', any); });
    h += '</div>';
    var metro = ''; if (any) metro = fill('ob6AnyHint', {'in':cin(c)}); else { var m = sel.map(function(id){ var cc = cityOf(c, id); return cc && cc.metro ? lg(cc.metro) : ''; }).filter(Boolean)[0]; if (m) metro = m; }
    if (metro) h += '<div class="allhint">' + E(metro) + '</div>';
    h += '</div>';
  });
  /* remote */
  h += '<div class="card mt14 ob6remote"><div class="ob6rtx"><b>' + E(d('ob6Remote')) + '</b><div class="mut mt6">' + E(fill('ob6RemoteS', {city:resCityName()})) + '</div></div><div class="tgl' + (OB6.remote ? ' on' : '') + '" data-ob6remote role="switch" aria-checked="' + (OB6.remote ? 'true' : 'false') + '"></div></div>';
  box.innerHTML = h;
  /* footer meta + CTA */
  var n = t.length, k = n === 0 ? (OB6.remote ? 'ob6Meta0R' : 'ob6Meta0') : n === 1 ? (OB6.remote ? 'ob6Meta1R' : 'ob6Meta1') : (OB6.remote ? 'ob6MetaNR' : 'ob6MetaN');
  var meta = $('ob6WhMeta'); if (meta) meta.textContent = fill(k, {n:n});
  var cta = $('ob6WhCta'); if (cta) cta.classList.toggle('dis', !n);
  paintSheets();
}
function paintSheets(){
  var rl = $('ob6ResList');
  if (rl){ var h = '';
    regions().forEach(function(r){ h += '<div class="sheetlabel">' + E(lg(r)) + '</div>';
      (r.markets || []).forEach(function(c){ var on = OB6.res === c; var cur = ((MKT.base.markets || {})[c] || {}).cur || {};
        h += '<button class="srow' + (on ? ' on' : '') + '" data-ob6res="' + c + '"><span class="ob6flag">' + I(c).flag + '</span> <span class="grow">' + E(cname(c)) + '</span><span class="ob6cur">' + E(cur.code || '') + '</span>' + (on ? '<i class="ti ti-check"></i>' : '') + '</button>'; }); });
    var ic = ((MKT.base.markets || {}).INTL || {}).cur || {};
    h += '<div class="sheetlabel">' + E(d('ob6ResElse')) + '</div><button class="srow' + (OB6.res === 'INTL' ? ' on' : '') + '" data-ob6res="INTL"><span class="ob6flag">🌐</span> <span class="grow">' + E(d('ob6ResElse')) + '<span class="ob6sub">' + E(fill('ob6ResElseS', {cur:ic.code || ''})) + '</span></span><span class="ob6cur">' + E(ic.code || '') + '</span></button>';
    rl.innerHTML = h; }
  var al = $('ob6AddList');
  if (al){ var h2 = '';
    regions().forEach(function(r){ var ms = r.markets || [], n = ms.filter(function(c){ return OB6.targets.indexOf(c) >= 0; }).length;
      var open = OB6.regOpen[r.id] != null ? OB6.regOpen[r.id] : (n > 0 || ms.indexOf(OB6.resCountry) >= 0);
      h2 += '<div class="ob6reg' + (open ? ' open' : '') + '"><button class="srow" data-ob6reg="' + r.id + '"><span class="grow"><b>' + E(lg(r)) + '</b>' + (n ? '<span class="ob6sub">' + E(fill('ob6NSel', {n:n})) + '</span>' : '') + '</span><i class="ti ti-chevron-down"></i></button>'
          + '<div class="chipgrid ob6regbody">';
      ms.forEach(function(c){ var on = OB6.targets.indexOf(c) >= 0; h2 += '<button class="chip' + (on ? ' on' : '') + '" data-ob6ctry="' + c + '"><i class="ti ti-check x"></i><i class="ti ti-plus plus"></i> <span class="ob6flag">' + I(c).flag + '</span> <span>' + E(cname(c)) + '</span></button>'; });
      h2 += '<button class="chip addchip" data-ob6regall="' + r.id + '"><span>' + E(d(n === ms.length ? 'ob6Clear' : 'ob6AllIn')) + '</span></button></div></div>'; });
    al.innerHTML = h2; }
}
function toggleCountry(c){
  var i = OB6.targets.indexOf(c);
  if (i >= 0){ if (OB6.targets.length === 1 && !OB6.remote){ toast(d('ob6TMin')); return; } OB6.targets.splice(i, 1); }
  else { OB6.targets.push(c); if (!OB6.cities[c]) OB6.cities[c] = defCities(c); if (OB6.any[c] == null) OB6.any[c] = false; }
  syncOrder(); afterWhere();
}
function afterWhere(){ pushPersona(false); paintWhere(); paintWelcome(); }

/* ---------------------------------------------------------------- wall */
var WALL0 = null;
function paintWall(){
  var sec = qs('.scr[data-scr="wall"]'); if (!sec) return;
  var n = matchCount(), m = postings(), c = primary();
  var h1 = qs('[data-ob6="wlH"]', sec); if (h1) h1.textContent = fill('ob6WlH', {n:grp(n)});
  var sub = qs('[data-ob6="wlSub"]', sec); if (sub) sub.textContent = fill('ob6WlSub', {m:grp(m)});
  var more = qs('[data-ob6="wlMore"]', sec); if (more) more.textContent = fill('ob6WlMore', {n:grp(Math.max(0, n - 3))});
  var feed = $('ob6WlFeed');
  if (feed){ if (WALL0 == null) WALL0 = feed.innerHTML;
    var emps = c === 'SA' ? null : pickEmployers(c, 3);
    if (!emps){ if (feed.getAttribute('data-ob6m') !== 'v5'){ feed.innerHTML = WALL0; feed.setAttribute('data-ob6m', 'v5'); try { render0(feed); } catch(_){} } }
    else { var roles = ['swc3Title', 'swc2Title', 'swc4Title'], pcts = [96, 92, 91];
      feed.innerHTML = emps.map(function(e, i){ return '<div class="fr">' + logoHTML(e, 34) + '<div class="ft"><b>' + E(d(roles[i])) + '</b><span><span>' + E(lg(e)) + '</span> · <span>' + E(empCity(c, e)) + '</span></span></div><span class="swipematch"><span class="fdot"></span> ' + pcts[i] + '% <span data-t="swMatch">' + E(d('swMatch')) + '</span></span></div>'; }).join('');
      feed.setAttribute('data-ob6m', c); } }
  /* plan prices in the residence currency (wall + change-plan sheet) */
  qa('[data-termpick] .plan.term').forEach(function(r){ var t = parseInt(r.getAttribute('data-term'), 10), p = (typeof PLANS !== 'undefined') && PLANS[t]; var pp = qs('.pp', r);
    if (p && pp && pp.firstChild && pp.firstChild.nodeType === 3) pp.firstChild.nodeValue = MKT.moneyNum(p.mo); });
  paintWallSplit();
}
/* re-apply the v5 data-t texts inside a restored block */
function render0(root){ var dd = T[lang]; qa('[data-t]', root).forEach(function(el){ var v = dd[el.getAttribute('data-t')]; if (v == null) return; if (v.indexOf('¤') >= 0) el.innerHTML = sarHTML(esc(v)); else el.textContent = v; }); }

/* ---------------------------------------------------------------- payment brands */
var BRN = {visa:'Visa', mc:'Mastercard', amex:'Amex', discover:'Discover', mada:'mada', bancontact:'Bancontact', cb:'CB', knet:'KNET', benefit:'BENEFIT', meeza:'Meeza', edinar:'e-Dinar', interac:'Interac', eftpos:'eftpos', maestro:'Maestro', jcb:'JCB', unionpay:'UnionPay', girocard:'girocard', dankort:'Dankort', postepay:'Postepay', naps:'NAPS', cmi:'CMI', cib:'CIB'};
var MKS = { /* brand-ish tiles for marks we do not have artwork for: [text, background, foreground] */
  amex:['AMEX', '#1F72CD', '#fff'], discover:['DISCOVER', '#fff', '#E55C20'], bancontact:['Bancontact', '#fff', '#005498'], cb:['CB', '#1B4B8F', '#fff'], knet:['KNET', '#0B4EA2', '#fff'],
  benefit:['BENEFIT', '#D71920', '#fff'], meeza:['meeza', '#0A3D62', '#fff'], edinar:['e-Dinar', '#C8102E', '#fff'], interac:['Interac', '#FFB81C', '#111'], eftpos:['eftpos', '#111', '#fff'],
  maestro:['maestro', '#fff', '#0099DF'], jcb:['JCB', '#0B4EA2', '#fff'], unionpay:['UnionPay', '#E21836', '#fff'], girocard:['girocard', '#003D7C', '#fff'], dankort:['Dankort', '#ED1C24', '#fff'],
  naps:['NAPS', '#7B1E3A', '#fff'], cib:['CIB', '#006B3F', '#fff'],
  paypal:['PP', '#003087', '#fff'], ideal:['iD', '#CC0066', '#fff'], klarna:['K.', '#FFB3C7', '#0B051D'], afterpay:['A', '#B2FCE4', '#111'], clearpay:['C', '#B2FCE4', '#111'], zip:['zip', '#411361', '#fff'],
  affirm:['a', '#4A4AF4', '#fff'], blik:['BLIK', '#111', '#fff'], swish:['S', '#fff', '#1D3A5F'], twint:['T', '#111', '#fff'], bizum:['b', '#05C3DD', '#fff'], sepa:['SEPA', '#10298E', '#fff'],
  satispay:['S', '#F94C43', '#fff'], mbway:['MB', '#D60511', '#fff'], multibanco:['MB', '#1A5EA8', '#fff'], fawry:['F', '#FDB913', '#00205B'], instapay:['IP', '#5B2D90', '#fff'], vodafonecash:['VC', '#E60000', '#fff'],
  valu:['V', '#00A19A', '#fff'], sympl:['S', '#5A2D82', '#fff'], flouci:['F', '#16A34A', '#fff'], stcpay:['stc', '#4F008C', '#fff'], benefitpay:['B', '#D71920', '#fff'], applepay:['', '#000', '#fff'],
  googlepay:['G', '#fff', '#4285F4'], samsungpay:['S', '#1428A0', '#fff'], sofort:['S', '#EF809F', '#fff'], giropay:['g', '#000268', '#fff'], eps:['eps', '#C8036F', '#fff'], przelewy24:['P24', '#D13239', '#fff'],
  mobilepay:['MP', '#5A78FF', '#fff'], vipps:['V', '#FF5B24', '#fff'], payconiq:['P', '#FF4785', '#fff'], cashplus:['C+', '#E30613', '#fff'], zain:['Z', '#00A3E0', '#fff'], zaincash:['ZC', '#00A3E0', '#fff'], fastpay:['FP', '#E4002B', '#fff'],
  cliq:['CliQ', '#00A651', '#fff'], efawateercom:['eF', '#0D6EB6', '#fff'], whish:['W', '#E30613', '#fff'], omt:['OMT', '#FFCC00', '#111'], baridimob:['BM', '#FFD200', '#004B8D'], dahabia:['D', '#FFD200', '#004B8D'],
  postpay:['P', '#111', '#fff'], spotii:['S', '#111', '#fff'], cashew:['C', '#3E4CF5', '#fff'], interacetransfer:['e', '#FFB81C', '#111'], paypay:['PP', '#003087', '#fff']
};
function bid(x){ return slug(x).replace(/^cartesbancaires$/, 'cb').replace(/^carte?bancaire$/, 'cb'); }
function brandName(id){ var k = bid(id); return BRN[k] || (k === 'paypal' ? 'PayPal' : k === 'ideal' ? 'iDEAL' : String(id)); }
function brandMark(id){ var k = bid(id);
  if (k === 'visa') return '<span class="brand visa">VISA</span>';
  if (k === 'mc' || k === 'mastercard') return '<span class="brand mc"><s></s><u></u></span>';
  if (k === 'mada') return '<span class="brand mada">mada<i>مدى</i></span>';
  if (k === 'apple' || k === 'applepay') return '<span class="brand apay"></span>';
  if (k === 'google' || k === 'googlepay') return '<span class="brand ob6br ob6gp"><b>G</b> Pay</span>';
  var m = MKS[k] || [String(id).slice(0, 8), '#fff', '#42506B'];
  return '<span class="brand ob6br" style="background:' + m[1] + ';color:' + m[2] + ';border-color:' + (m[1] === '#fff' ? 'var(--line)' : m[1]) + '">' + E(m[0] || brandName(id)) + '</span>'; }
function tileMark(id, label, cls){ var k = bid(id);
  if (k === 'tabby' || k === 'tamara') return '<span class="paytile ' + k + (cls ? ' ' + cls : '') + '"></span>';
  var m = MKS[k] || [String(label || id).replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase(), '#EEF0FF', '#353CD8'];
  return '<span class="paytile ob6pt' + (cls ? ' ' + cls : '') + '" style="background:' + m[1] + ';color:' + m[2] + '">' + E(m[0]) + '</span>'; }

/* ---------------------------------------------------------------- checkout (residence pack) */
function resIsSA(){ var r = resM(); return !r || r.code === 'SA'; }
function payOf(){ var r = resM() || {}, pay = r.pay;
  if (pay && (pay.methods || []).length) return pay;
  return {wallets:['apple', 'google'], methods:[{id:'card', brands:['visa', 'mc', 'amex']}, {id:'paypal'}], bnpl:[], localCardBrand:null}; }
function taxOf(){ var r = resM() || {}; return r.tax || {incl:true, rate:null, label:null, intl:true}; }
function ckTiles(){
  var pay = payOf(), out = [], seen = {};
  (pay.methods || []).forEach(function(m){ var id = bid(m.id) || m.id; if (seen[id]) return; seen[id] = 1; out.push({id:id, kind:id === 'card' ? 'card' : 'redir', m:m}); });
  (pay.bnpl || []).forEach(function(b){ var id = bid(b.id) || b.id; if (seen[id]) return; seen[id] = 1; out.push({id:id, kind:'bnpl', b:b, n:b.installments || 4}); });
  if (!seen.card) out.unshift({id:'card', kind:'card', m:{id:'card', brands:['visa', 'mc']}});
  return out;
}
function tileOf(id){ return ckTiles().filter(function(t){ return t.id === id; })[0] || null; }
function tName(t){ if (!t) return ''; if (t.kind === 'bnpl') return t.b.name || brandName(t.id); if (t.kind === 'card') return t.m.label ? lg(t.m.label) : d('ob6PmCard'); return t.m.label ? lg(t.m.label) : brandName(t.id); }
function cardBrands(){ var pay = payOf(), c = ckTiles().filter(function(t){ return t.kind === 'card'; })[0], b = ((c && c.m.brands) || ['visa', 'mc']).map(bid);
  var loc = pay.localCardBrand ? bid(pay.localCardBrand) : null; if (loc && !tileOf(loc) && b.indexOf(loc) < 0) b.unshift(loc); return uniq(b); }
function isBnplId(id){ if (resIsSA()) return false; var t = tileOf(id); return !!(t && t.kind === 'bnpl'); }
function isRedirId(id){ if (resIsSA()) return false; var t = tileOf(id); return !!(t && t.kind === 'redir'); }
function bnplList(){ return resIsSA() ? [] : ckTiles().filter(function(t){ return t.kind === 'bnpl'; }); }
function planTot(){ var p = PLANS[PLAN.term]; return priceL(p.total); }
var FRDATES = null;
function frDate(y, m, dd){ try { return new Intl.DateTimeFormat('fr-FR', {day:'numeric', month:'long', year:'numeric'}).format(new Date(y, m, dd)); } catch(_){ return dd + '/' + (m + 1) + '/' + y; } }
function ensureFr(){ /* French dates for the plan renewals and the pay-in-4 schedule (v5 only carries en/ar) */
  if (typeof PLANS === 'undefined') return;
  var R = {1:[2026, 8, 27], 4:[2026, 11, 27], 12:[2027, 7, 27]};
  Object.keys(R).forEach(function(t){ if (PLANS[t] && PLANS[t].renew && PLANS[t].renew.fr == null) PLANS[t].renew.fr = frDate.apply(null, R[t]); });
  if (typeof BNPL_DATES !== 'undefined'){ BNPL_DATES.fr = [d('ob6Today'), frDate(2026, 8, 27), frDate(2026, 9, 27), frDate(2026, 10, 27)]; }
}
function schedDates(n){ var base = (typeof BNPL_DATES !== 'undefined' && (BNPL_DATES[lang] || BNPL_DATES.en)) || []; var out = base.slice(0, n);
  for (var i = out.length; i < n; i++) out.push(L() === 'fr' ? frDate(2026, 8 + i, 27) : (base[base.length - 1] || '')); out[0] = d('ob6Today') || out[0]; return out; }
var CK = {snap:null, mode:'SA', busy:false};
function ckEls(){ var s = qs('.scr[data-scr="checkout"]'); if (!s) return null;
  return {sec:s, ap:qs('.applepay', s), or:qs('.ordiv', s), pm:qs('[data-paymeth]', s), ph:qs('[data-payhint]', s), brands:qs('.cardwrap .brands', s), badges:qs('.cobadges', s),
          card:qs('[data-panel="card"]', s), bnpl:qs('[data-panel="bnpl"]', s), redir:qs('[data-panel="ob6redir"]', s), pay:$('ckPayBtn'), bbtn:$('ckBnplBtn'), sum:$('ckSum')}; }
function ckSnapshot(){ var e = ckEls(); if (!e || CK.snap) return;
  CK.snap = {ap:e.ap && e.ap.innerHTML, apToast:e.ap && e.ap.getAttribute('data-toast'), pm:e.pm && e.pm.innerHTML, ph:e.ph && e.ph.innerHTML, brands:e.brands && e.brands.innerHTML, badges:e.badges && e.badges.innerHTML,
             split:(qs('[data-termsplit] .tiles') || {}).innerHTML};
  if (e.bnpl && !e.redir) e.bnpl.insertAdjacentHTML('afterend', '<div class="copanel bnplbox ob6redir" data-panel="ob6redir" style="display:none"><div class="bh"><span data-ob6rtile></span><div class="tx"><b data-ob6rt></b><span data-ob6rs></span></div></div><div class="bnote" data-ob6rn></div></div>');
  if (e.sum){ var vat = qs('[data-t="ck2Vat"]', e.sum); if (vat && vat.parentElement && !qs('[data-ob6tax]', e.sum)) vat.parentElement.insertAdjacentHTML('afterend', '<div class="cks-r" data-ob6tax style="display:none"><span data-ob6taxl></span><b data-ob6taxv></b></div>');
    var nx = qs('[data-cks="next"]', e.sum); if (nx && !qs('[data-ob6legal]', e.sum)) nx.insertAdjacentHTML('afterend', '<div class="cks-next ob6legal" data-ob6legal style="display:none"></div>');
    var tr = qs('[data-t="ckTrusted"]', e.sum); if (tr && !qs('[data-ob6trust]', e.sum)) tr.insertAdjacentHTML('afterend', '<span class="mut" data-ob6trust style="display:none"></span>'); }
}
function ckRestoreSA(e){
  if (CK.mode === 'SA') return false;
  if (e.ap){ e.ap.innerHTML = CK.snap.ap; e.ap.style.display = ''; e.ap.classList.remove('ob6gpay'); if (CK.snap.apToast) e.ap.setAttribute('data-toast', CK.snap.apToast); }
  if (e.or) e.or.style.display = '';
  if (e.pm){ e.pm.innerHTML = CK.snap.pm; e.pm.classList.remove('ob6pm', 'ob6pm4'); }
  if (e.ph) e.ph.innerHTML = CK.snap.ph;
  if (e.brands) e.brands.innerHTML = CK.snap.brands;
  if (e.badges) e.badges.innerHTML = CK.snap.badges;
  var sp = qs('[data-termsplit] .tiles'); if (sp && CK.snap.split != null) sp.innerHTML = CK.snap.split;
  if (e.redir) e.redir.style.display = 'none';
  if (e.sum){ ['[data-ob6tax]', '[data-ob6legal]', '[data-ob6trust]'].forEach(function(s){ var x = qs(s, e.sum); if (x) x.style.display = 'none'; });
    var vat = qs('[data-t="ck2Vat"]', e.sum); if (vat) vat.parentElement.style.display = ''; var tr = qs('[data-t="ckTrusted"]', e.sum); if (tr) tr.style.display = ''; }
  qa('.ob6plustax').forEach(function(x){ x.remove(); });
  CK.mode = 'SA'; render0(e.sec); return true;
}
function ckFixMethod(){ if (typeof PLAN === 'undefined') return;
  if (resIsSA()){ if (!(PLAN.method === 'card' || PLAN.method === 'tabby' || PLAN.method === 'tamara' || PLAN.method === 'apple')) PLAN.method = 'card'; return; }
  var r = (resM() || {}).code;
  if (OB6.ckRes !== r){ OB6.ckRes = r; var ts = ckTiles(); PLAN.method = (ts[0] && ts[0].kind !== 'bnpl') ? ts[0].id : 'card'; }
  if (PLAN.method !== 'apple' && !tileOf(PLAN.method)) PLAN.method = 'card';
  if (isBnplId(PLAN.method) && !planBnplOk()) PLAN.method = 'card';
}
function paintCheckout(){
  if (typeof PLANS === 'undefined' || typeof PLAN === 'undefined') return;
  ckSnapshot(); var e = ckEls(); if (!e) return;
  if (resIsSA()){ if (ckRestoreSA(e) && !CK.busy){ CK.busy = true; try { planPaint(); } finally { CK.busy = false; } } return; }
  CK.mode = (resM() || {}).code || 'X';
  var pay = payOf(), tiles = ckTiles(), ok = planBnplOk(), meth = PLAN.method, t = tileOf(meth), kind = t ? t.kind : (meth === 'apple' ? 'wallet' : 'card');
  var p = PLANS[PLAN.term], tot = planTot(), R = resM();
  /* names for the v5 handlers (toasts, receipts) */
  if (typeof BNPL_NAME !== 'undefined') tiles.forEach(function(x){ if (x.kind !== 'card') BNPL_NAME[x.id] = tName(x); });
  /* express wallet */
  var w = (pay.wallets || []).map(bid);
  if (e.ap){ if (w.indexOf('apple') >= 0){ e.ap.style.display = ''; e.ap.classList.remove('ob6gpay'); e.ap.setAttribute('data-toast', 'tCkApple'); e.ap.innerHTML = CK.snap.ap; render0(e.ap); }
    else if (w.indexOf('google') >= 0){ e.ap.style.display = ''; e.ap.classList.add('ob6gpay'); e.ap.removeAttribute('data-toast'); e.ap.innerHTML = '<span class="ob6g">G</span> <span data-t="ckApple">' + E(d('ckApple')) + '</span>'; }
    else e.ap.style.display = 'none'; }
  /* method tiles */
  var vis = tiles.filter(function(x){ return ok || x.kind !== 'bnpl'; });
  if (e.pm){ e.pm.classList.add('ob6pm'); e.pm.classList.toggle('ob6pm4', vis.length > 3);
    e.pm.innerHTML = vis.map(function(x){ var mk, sub;
      if (x.kind === 'card'){ var bs = cardBrands(); mk = bs.slice(0, 3).map(brandMark).join(''); sub = bs.slice(0, 3).map(brandName).join(', '); }
      else if (x.kind === 'bnpl'){ mk = tileMark(x.id, tName(x)); sub = fill('ob6PayInN', {n:x.n}); }
      else { mk = tileMark(x.id, tName(x)); sub = ''; }
      var on = x.id === meth;
      return '<div class="pmt' + (on ? ' on' : '') + '" data-method="' + E(x.id) + '" role="radio" aria-checked="' + (on ? 'true' : 'false') + '"><span class="mk">' + mk + '</span><b>' + E(tName(x)) + '</b>' + (sub ? '<span>' + E(sub) + '</span>' : '') + '</div>'; }).join('');
    e.pm.style.display = vis.length > 1 ? '' : 'none'; }
  if (e.or){ e.or.style.display = (e.ap && e.ap.style.display === 'none') ? 'none' : ''; var ot = qs('[data-ckor]', e.or) || e.or.querySelector('span'); if (ot){ ot.removeAttribute('data-t'); ot.textContent = d(vis.length > 1 ? 'ckOrHow' : 'ckOr'); } }
  /* pay-in-N hint on the monthly plan */
  var bl = bnplList();
  if (e.ph){ if (!ok && bl.length){ e.ph.style.display = ''; e.ph.innerHTML = '<span class="tiles">' + bl.map(function(x){ return tileMark(x.id, tName(x)); }).join('') + '</span><span><span>' + fh('ob6CkHint', {n:bl[0].n, prov:bl.map(tName).join(d('ob6Or'))}) + '</span> <a data-termopen>' + E(d('ckHintA')) + '</a></span>'; }
    else e.ph.style.display = 'none'; }
  /* card brands in the number field and the badge row */
  if (e.brands) e.brands.innerHTML = cardBrands().slice(0, 3).map(brandMark).join('');
  if (e.badges){ e.badges.innerHTML = '<i class="ti ti-lock lk"></i>' + w.map(brandMark).join('') + cardBrands().map(brandMark).join('')
      + tiles.filter(function(x){ return x.kind !== 'card'; }).map(function(x){ return tileMark(x.id, tName(x)); }).join(''); }
  /* panels + buttons */
  var bn = tName(t), n = t && t.kind === 'bnpl' ? t.n : 4;
  if (e.card) e.card.style.display = kind === 'card' || kind === 'wallet' ? '' : 'none';
  if (e.bnpl){ e.bnpl.style.display = kind === 'bnpl' ? '' : 'none';
    if (kind === 'bnpl'){ var tl = qs('[data-bnpltile]', e.bnpl); if (tl) tl.outerHTML = tileMark(t.id, bn, 'md').replace('class="paytile', 'data-bnpltile class="paytile');
      var bt = qs('[data-bnplt]', e.bnpl); if (bt) bt.innerHTML = fh('ob6CkBnplT', {n:n, b:bn});
      var bs = qs('[data-bnpls]', e.bnpl); if (bs) bs.innerHTML = fh('ob6CkBnplS', {tot:money(tot)});
      var sc = qs('[data-bsched]', e.bnpl); if (sc){ var ds = schedDates(n); sc.innerHTML = ds.map(function(dt, i){ return '<div class="br' + (i ? '' : ' now') + '"><span class="bi"><i class="ti ' + (i ? 'ti-calendar' : 'ti-check') + '"></i></span><span class="bd">' + E(dt) + '</span><span class="ba">' + H(money(tot / n)) + '</span></div>'; }).join(''); }
      var bno = qs('[data-bnote]', e.bnpl); if (bno) bno.innerHTML = fh('ob6CkRedirS', {b:bn}); } }
  if (e.redir){ e.redir.style.display = kind === 'redir' ? '' : 'none';
    if (kind === 'redir'){ var rt = qs('[data-ob6rtile]', e.redir); if (rt) rt.innerHTML = tileMark(t.id, bn, 'md');
      qs('[data-ob6rt]', e.redir).textContent = fill('ob6CkRedirT', {b:bn});
      qs('[data-ob6rs]', e.redir).textContent = t.m.sub ? lg(t.m.sub) : '';
      qs('[data-ob6rn]', e.redir).textContent = fill('ob6CkRedirS', {b:bn}); } }
  if (e.pay){ e.pay.style.display = kind === 'card' || kind === 'wallet' ? '' : 'none'; var cv = qs('[data-ckcta]', e.pay); if (cv) cv.innerHTML = H(money(tot)); }
  if (e.bbtn){ e.bbtn.style.display = kind === 'bnpl' || kind === 'redir' ? '' : 'none';
    if (kind === 'bnpl' || kind === 'redir'){ var bct = qs('[data-bnplcta]', e.bbtn); if (bct) bct.textContent = fill('ob6CkCont', {b:bn});
      var bcv = qs('[data-bnplctav]', e.bbtn); if (bcv) bcv.innerHTML = fh('ob6CkTodayV', {amt:money(kind === 'bnpl' ? tot / n : tot)});
      var bi = qs('.paytile', e.bbtn); if (bi) bi.outerHTML = tileMark(t.id, bn); } }
  /* order summary: tax, due today, instalments, renewal + local renewal disclosure, trusted-by */
  if (e.sum){ var tx = taxOf(), vat = qs('[data-t="ck2Vat"]', e.sum), row = qs('[data-ob6tax]', e.sum);
    if (vat) vat.parentElement.style.display = 'none';
    if (row){ row.style.display = ''; var lab = tx.label ? lg(tx.label) : d('ob6TaxIntl');
      qs('[data-ob6taxl]', row).textContent = lab + (tx.incl && tx.rate ? ' · ' + String(tx.rate).replace('.', L() === 'fr' ? ',' : '.') + '%' : '');
      var tv = qs('[data-ob6taxv]', row); tv.className = tx.incl && tx.rate ? '' : 'mut2';
      tv.innerHTML = tx.incl ? (tx.rate ? H(money(tot * tx.rate / (100 + tx.rate))) : E(d('ck2Incl'))) : E(d('ob6CkTaxCalc')); }
    var due = qs('[data-cks="due"]', e.sum); if (due){ due.innerHTML = '<span dir="ltr">' + H(money(kind === 'bnpl' ? tot / n : tot)) + '</span>' + (tx.incl ? '' : '<small class="ob6plustax">' + E(d('ob6CkPlusTax')) + '</small>'); }
    var dl = qs('[data-cks="duel"]', e.sum); if (dl && (kind === 'bnpl' || kind === 'redir')) dl.innerHTML = fh('ck2DueB', {b:bn});
    var bnl = qs('[data-cks="bnpl"]', e.sum); if (bnl){ bnl.style.display = kind === 'bnpl' ? '' : 'none'; if (kind === 'bnpl') bnl.innerHTML = '<i class="ti ti-calendar-repeat"></i><span>' + fh('ob6CkThen', {k:n - 1, amt:money(tot / n)}) + '</span>'; }
    var nx = qs('[data-cks="next"]', e.sum), rL = L() === 'ar' ? 'ar' : L() === 'fr' ? 'fr' : 'en';
    if (nx){ if (kind === 'bnpl') nx.innerHTML = fh('ob6CkNextB', {d:p.renew[rL] || p.renew.en, tot:money(tot), b:bn, n:n});
      else nx.innerHTML = fh('ck2Next', {d:p.renew[rL] || p.renew.en, tot:fmtN(p.total)}); }
    var lgl = qs('[data-ob6legal]', e.sum), rn = R && R.legal && R.legal.renewal; if (lgl){ lgl.style.display = rn ? '' : 'none'; if (rn) lgl.textContent = lg(rn); }
    var tr = qs('[data-t="ckTrusted"]', e.sum), mt = qs('[data-ob6trust]', e.sum), reg = regionOf((R || {}).code);
    if (tr) tr.style.display = 'none'; if (mt){ mt.style.display = ''; mt.textContent = reg ? fill('ob6CkTrusted', {r:lg(reg)}) : d('ckTrusted'); } }
  /* subDone receipt */
  var sd = qs('[data-sdpaid]'), sds = qs('[data-sdpaids]');
  if (sd && kind === 'bnpl'){ sd.innerHTML = fh('ob6SdPaidBnpl', {amt:money(tot / n), n:n, b:bn, k:n - 1}); if (sds){ sds.removeAttribute('data-t'); sds.innerHTML = fh('ob6SdPaidBnplS', {amt:money(tot / n), d:schedDates(n)[1], r:p.renew[rL] || p.renew.en, b:bn}); } }
  else if (sd && kind === 'redir'){ sd.innerHTML = fh('ob6SdPaidRedir', {tot:money(tot), b:bn, r:p.renew[rL] || p.renew.en}); }
}
function paintWallSplit(){
  var el = qs('[data-termsplit]'); if (!el) return; ckSnapshot();
  if (resIsSA()){ var tl0 = qs('.tiles', el); if (tl0 && CK.snap && CK.snap.split != null && tl0.getAttribute('data-ob6') === '1'){ tl0.innerHTML = CK.snap.split; tl0.removeAttribute('data-ob6'); } var sp0 = qs('[data-ob6split]', el); if (sp0){ sp0.setAttribute('data-t', sp0.getAttribute('data-ob6split')); sp0.removeAttribute('data-ob6split'); render0(el); } return; }
  var bl = bnplList(); if (!bl.length || !planBnplOk()){ el.style.display = 'none'; return; }
  el.style.display = ''; var n = bl[0].n, provs = bl.filter(function(x){ return x.n === n; });
  var tl = qs('.tiles', el); if (tl){ tl.innerHTML = provs.map(function(x){ return tileMark(x.id, tName(x)); }).join(''); tl.setAttribute('data-ob6', '1'); }
  var sp = qs('[data-t]', el) || qs('[data-ob6split]', el); if (sp){ if (sp.hasAttribute('data-t')){ sp.setAttribute('data-ob6split', sp.getAttribute('data-t')); sp.removeAttribute('data-t'); }
    sp.innerHTML = fh('ob6WlSplit', {k:n, amt:money(planTot() / n), prov:provs.map(tName).join(d('ob6Or'))}); }
}

/* ---------------------------------------------------------------- rights */
function natOf(){ return OB6.nat || persona().nat; }
function autoFor(c){
  var nat = natOf(), pk2 = P(c) || {}, r = pk2.rights || {}, af = r.autoFor || [];
  if (af.indexOf(nat) >= 0 || nat === c){
    var txt = r.autoText ? lg(r.autoText) : fill('ob6RtAutoCit', {dem:dem(nat, gender()), 'in':cin(c)});
    var tag = nat === c ? 'ob6RtTagCit' : (GCC.indexOf(c) >= 0 && GCC.indexOf(nat) >= 0) ? 'ob6RtTagGcc' : (EU_MK.indexOf(c) >= 0 && EEA.indexOf(nat) >= 0) ? 'ob6RtTagEu' : 'ob6RtTagCit';
    return {tag:tag, text:txt}; }
  if (GCC.indexOf(c) >= 0 && GCC.indexOf(nat) >= 0) return {tag:'ob6RtTagGcc', text:fill('ob6RtAutoGcc', {'in':cin(c)})};
  if (EU_MK.indexOf(c) >= 0 && EEA.indexOf(nat) >= 0) return {tag:'ob6RtTagEu', text:fill('ob6RtAutoEu', {'in':cin(c)})};
  if ((c === 'GB' && nat === 'IE') || (c === 'IE' && nat === 'GB')) return {tag:'ob6RtTagCta', text:fill('ob6RtAutoCta', {a:nationals('GB'), b:nationals('IE')})};
  return null;
}
function usStyle(c){ return c === 'US'; }
function rightsOpen(){ /* countries still waiting for an answer */
  return tgts().filter(function(c){ var a = autoFor(c); if (a && !OB6.over[c]) return false;
    if (usStyle(c)){ var u = OB6.us[c] || {}; return u.auth == null || u.spons == null; }
    return OB6.rights[c] == null; });
}
function genericOpts(){ return [{_k:'ob6GenOpt1'}, {_k:'ob6GenOpt2'}]; }
function paintRights(){
  var box = $('ob6Rights'); if (!box) return;
  var h = '', t = tgts();
  t.forEach(function(c, i){
    var a = autoFor(c), pk2 = P(c) || {}, r = pk2.rights || {}, over = !!OB6.over[c], open = rightsOpen().indexOf(c) >= 0;
    var tag = (a && !over) ? '<span class="setcard-cv">' + E(d(a.tag)) + '</span>' : open ? '<span class="setcard-req">' + E(d('ob6NeedAns')) + '</span>' : '<span class="setcard-opt">#' + (i + 1) + '</span>';
    h += '<div class="setcard ob6rt' + (open ? ' miss' : '') + '"><div class="setcard-h"><span class="setcard-ic ob6flagic">' + I(c).flag + '</span><div class="setcard-ht"><span class="setcard-t">' + E(cname(c)) + '</span></div>' + tag + '</div><hr class="setcard-div">';
    if (a && !over){ h += '<div class="ob6auto"><i class="ti ti-shield-check"></i><span class="grow">' + E(a.text) + '</span><button class="ob6lnk" data-ob6over="' + c + '">' + E(d('ob6NotRight')) + '</button></div>'; }
    else if (usStyle(c)){ var u = OB6.us[c] || {};
      [['auth', 'ob6UsQ1'], ['spons', 'ob6UsQ2']].forEach(function(q){ h += '<div class="ob6q">' + E(fill(q[1], {'in':cin(c)})) + '</div><div class="chipgrid">'
        + '<button class="chip' + (u[q[0]] === true ? ' on' : '') + '" data-ob6us="' + c + '|' + q[0] + '|1"><span>' + E(d('ob6Yes')) + '</span></button>'
        + '<button class="chip' + (u[q[0]] === false ? ' on' : '') + '" data-ob6us="' + c + '|' + q[0] + '|0"><span>' + E(d('ob6No')) + '</span></button></div>'; });
      if (a) h += '<button class="ob6lnk ob6lnkb" data-ob6auto="' + c + '">' + E(d('ob6UseAuto')) + '</button>'; }
    else { var opts = (r.opts && r.opts.length) ? r.opts : genericOpts();
      if (r.q) h += '<div class="ob6q">' + E(lg(r.q)) + '</div>';
      h += '<div class="ob6opts">' + opts.map(function(o, j){ var on = OB6.rights[c] === j, sub = o.sub ? lg(o.sub) : '';
        return '<div class="ob6opt' + (on ? ' on' : '') + '" data-ob6opt="' + c + '|' + j + '" role="radio" aria-checked="' + on + '"><span class="rc"></span><div>' + E(o._k ? d(o._k) : lg(o)) + (sub ? '<span class="od">' + E(sub) + '</span>' : '') + '</div></div>'; }).join('') + '</div>';
      if (a) h += '<button class="ob6lnk ob6lnkb" data-ob6auto="' + c + '">' + E(d('ob6UseAuto')) + '</button>'; }
    if (r.rule) h += '<div class="ob6note"><i class="ti ti-filter"></i><span>' + E(lg(r.rule)) + '</span></div>';
    var nz = pk2.nationalisation; if (nz && nz.desc) h += '<div class="ob6note ob6natn"><i class="ti ti-flag"></i><span>' + (nz.name ? '<b>' + E(lg(nz.name)) + '.</b> ' : '') + E(lg(nz.desc)) + '</span></div>';
    if ((pk2.sensitive || {}).gender === 'eeo' && usStyle(c)) h += '<div class="ob6note"><i class="ti ti-info-circle"></i><span>' + E(d('ob6UsEeo')) + '</span></div>';
    h += '</div>';
  });
  if (OB6.remote && OB6.resCountry) h += '<div class="warn ob6warn"><i class="ti ti-world"></i><div>' + E(fill('ob6RtRemote', {'in':cin(OB6.resCountry)})) + '</div></div>';
  box.innerHTML = h;
  var left = rightsOpen().length, meta = $('ob6RtMeta'); if (meta) meta.textContent = left ? (left === 1 ? d('ob6RtLeft1') : fill('ob6RtLeftN', {n:left})) : '';
  var cta = $('ob6RtCta'); if (cta) cta.classList.toggle('dis', left > 0);
}

/* ---------------------------------------------------------------- profile (tailored by the target markets' sensitive block) */
var SENSFB = {gcc:{photo:'optional', gender:'ask', nationality:'ask'}, naf:{photo:'common', gender:'ask', nationality:'ask'}, lev:{photo:'common', gender:'ask', nationality:'ask'},
              na:{photo:'avoid', gender:'eeo', nationality:'none'}, uk:{photo:'avoid', gender:'none', nationality:'none'}, au:{photo:'avoid', gender:'none', nationality:'none'}, eu:{photo:'optional', gender:'none', nationality:'none'}};
function sensOf(c){ var p = P(c); if (p && p.sensitive) return p.sensitive; var r = regionOf(c); return SENSFB[r && r.id] || {photo:'optional', gender:'none', nationality:'none'}; }
function sens(){ var o = {photo:'avoid', gender:'none', nationality:'none', photoAt:null}, rank = {avoid:0, optional:1, common:2}, gr = {none:0, eeo:1, ask:2};
  tgts().forEach(function(c){ var s = sensOf(c);
    if ((rank[s.photo] || 0) > (rank[o.photo] || 0) || (s.photo !== 'avoid' && !o.photoAt)){ if ((rank[s.photo] || 0) >= (rank[o.photo] || 0)) o.photo = s.photo; if (s.photo !== 'avoid' && !o.photoAt) o.photoAt = c; }
    if ((gr[s.gender] || 0) > (gr[o.gender] || 0)) o.gender = s.gender;
    if (s.nationality === 'ask') o.nationality = 'ask'; });
  return o; }
function natChoices(){ var seen = {}, out = []; var add = function(c){ if (!seen[c] && (FB[c] || P(c))){ seen[c] = 1; out.push(c); } };
  add(natOf()); GCC.forEach(add); regions().forEach(function(r){ (r.markets || []).forEach(add); }); XNAT.forEach(add); return out; }
var LEVELS = ['ob6LvNone', 'pfEngBasic', 'pfEngInt', 'pfEngAdv', 'pfEngFluent', 'ob6LvNative'];
function langs2(){ var out = [], seen = {}; tgts().forEach(function(c){ var l2 = (P(c) || {}).lang2; if (!l2) return; var code = LCODE[l2.en] || slug(l2.en); if (seen[code] || code === 'en') return; seen[code] = 1; out.push({code:code, name:l2, c:c}); }); return out; }
function nativeOf(nat, code){ return (NATIVE[code] || []).indexOf(nat) >= 0; }
function paintProfile(){
  var scr = qs('.scr[data-scr="profile"]'); if (!scr) return;
  var s = sens(), nat = natOf(), g = OB6.gender || persona().gender, sa = ksaOnly();
  /* basics: nationality (asked or read-only) + gender where forms require it */
  var bi = $('ob6PfBasicsIn');
  if (bi){ var h = '<div class="mut" style="font-size:12px;font-weight:700;margin-bottom:6px" data-t="pfNat">' + E(d('pfNat')) + '</div>';
    if (sa) h += '<select class="inp" data-pfsel="nat" data-ob6nat>' + ['pfNatSA', 'pfNatEG', 'pfNatJO', 'pfNatSY', 'pfNatYE', 'pfNatSD', 'pfNatPK', 'pfNatIN', 'pfNatPH', 'pfNatOther'].map(function(k, i){ var cc = ['SA', 'EG', 'JO', 'SY', 'YE', 'SD', 'PK', 'IN', 'PH', 'OTHER'][i]; return '<option value="' + cc + '"' + (cc === nat ? ' selected' : '') + (i === 0 ? ' data-sa="1"' : '') + ' data-t="' + k + '">' + E(d(k)) + '</option>'; }).join('') + '</select>';
    else if (s.nationality === 'ask') h += '<select class="inp" data-pfsel="nat" data-ob6nat>' + natChoices().map(function(c){ return '<option value="' + c + '"' + (c === nat ? ' selected' : '') + (c === 'SA' ? ' data-sa="1"' : '') + '>' + E(I(c).flag + ' ' + dem(c, g)) + '</option>'; }).join('') + '<option value="OTHER"' + (nat === 'OTHER' ? ' selected' : '') + '>' + E(d('pfNatOther')) + '</option></select>';
    else h += '<div class="chipgrid" style="margin-top:0"><span class="chip on ob6ro">' + E((I(nat).flag || '') + ' ' + dem(nat, g)) + ' <span class="fromcv sm">' + E(d('fromcvS')) + '</span></span></div><div class="allhint">' + E(d('ob6PfNatRo')) + '</div>';
    if (s.gender === 'ask'){ var fOn = g !== 'm'; h += '<div class="mut mt14" style="font-size:12px;font-weight:700" data-t="pfGender">' + E(d('pfGender')) + '</div><div class="chips mt6"><button class="chip' + (fOn ? ' on' : '') + '" data-ob6g="f"><span data-t="pfFemale">' + E(d('pfFemale')) + '</span></button><button class="chip' + (fOn ? '' : ' on') + '" data-ob6g="m"><span data-t="pfMale">' + E(d('pfMale')) + '</span></button></div>'; }
    bi.innerHTML = h; }
  /* US-style voluntary self-identification */
  var eeo = $('ob6PfEeo'), ei = $('ob6PfEeoIn');
  if (eeo && ei){ eeo.style.display = s.gender === 'eeo' ? '' : 'none';
    if (s.gender === 'eeo') ei.innerHTML = '<div class="mut" style="font-size:12px;line-height:1.45;margin-bottom:10px">' + E(d('ob6EeoS')) + '</div><div class="mut" style="font-size:12px;font-weight:700;margin-bottom:6px">' + E(d('pfGender')) + '</div><div class="chipgrid" style="margin-top:0">'
      + [['f', 'pfFemale'], ['m', 'pfMale'], ['pns', 'ob6PNS']].map(function(x){ return '<button class="chip' + (OB6.eeo === x[0] ? ' on' : '') + '" data-ob6eeo="' + x[0] + '"><span>' + E(d(x[1])) + '</span></button>'; }).join('') + '</div><div class="allhint">' + E(d('ob6EeoRest')) + '</div>'; }
  /* languages: English (v5) + the target market's second language where the persona is not a native speaker */
  var l2 = langs2().filter(function(x){ return !nativeOf(nat, x.code); }), lbox = $('ob6PfLang2'), et = $('ob6PfEngT');
  if (et){ var k = l2.length ? 'ob6Langs' : 'pfEng'; et.setAttribute('data-t', k); et.textContent = d(k); }
  if (!OB6.engSet){ OB6.engSet = true; if (nativeOf(nat, 'en')){ var ec = qa('[data-pfreq="eng"] .chip', scr); ec.forEach(function(x, i){ x.classList.toggle('on', i === ec.length - 1); }); } }
  if (lbox){ lbox.innerHTML = l2.map(function(x){ var cur = OB6.lv[x.code]; if (cur == null){ cur = OB6.lv[x.code] = nativeOf(nat, x.code) ? 5 : (x.code === 'fr' && ['MA', 'TN', 'DZ', 'LB'].indexOf(nat) >= 0 ? 4 : 0); }
      return '<div class="ob6lvrow"><div class="mut ob6lvl">' + E(fill('ob6LangLvl', {l:lg(x.name)})) + '</div><div class="chipgrid" style="margin-top:0">' + LEVELS.slice(0, 5).map(function(k2, i){ return '<button class="chip' + (cur === i ? ' on' : '') + '" data-ob6lv="' + x.code + '|' + i + '"><span>' + E(d(k2)) + '</span></button>'; }).join('') + '</div></div>'; }).join(''); }
  /* notice period default from the primary target market */
  var ni = $('pfNoticeNum'); if (ni && !OB6.noticeSet){ OB6.noticeSet = true; var nd = (P(primary()) || {}).noticeDays; if (nd && !ni.value) ni.value = String(nd); }
  /* salary: current in the residence currency and period, expected per target market in its own */
  paintSalary(sa);
  /* photo only where applications expect one */
  var ph = $('pfCardPhoto'); if (ph) ph.style.display = s.photo === 'avoid' ? 'none' : '';
  if (typeof pfSync === 'function') pfSync();
}
function salUnit(code, m){ var s = salOf(code); return curSym(m) + ' / ' + d(s.per === 'year' ? 'ob6PerYear' : 'ob6PerMonth'); }
function salInput(key, val, unit, label, id){ return '<div' + (id ? ' id="' + id + '"' : '') + '><div class="mut" style="font-size:12px;font-weight:700;margin-bottom:6px">' + E(label) + '</div><div class="noticeman ob6salin"><input class="inp filled" data-ob6sal="' + key + '" value="' + E(val) + '" inputmode="numeric" dir="ltr"><span class="noticeunit">' + H(unit) + '</span></div></div>'; }
function paintSalary(sa){
  var g = $('pfSalGrid'), tt = qs('#ob6PfSal .setcard-t'); if (!g) return;
  var emp = typeof pfEmployed === 'function' ? pfEmployed() : true;
  if (sa){ if (tt){ tt.setAttribute('data-t', emp ? 'pfSalary' : 'pfSalaryU'); tt.textContent = d(emp ? 'pfSalary' : 'pfSalaryU'); }
    g.innerHTML = '<div id="pfCurSal"' + (emp ? '' : ' style="display:none"') + '><div class="mut" style="font-size:12px;font-weight:700;margin-bottom:6px" data-t="pfSalCur">' + E(d('pfSalCur')) + '</div><input class="inp filled" data-ob6sal="cur" value="' + E(OB6.sal.cur || grp(26000)) + '" inputmode="numeric" dir="ltr"></div>'
      + '<div><div class="mut" style="font-size:12px;font-weight:700;margin-bottom:6px" data-t="pfSalExp">' + E(d('pfSalExp')) + '</div><input class="inp filled" data-ob6sal="SA" value="' + E(OB6.sal.SA || grp(34000)) + '" inputmode="numeric" dir="ltr"></div>';
    g.style.gridTemplateColumns = emp ? '1fr 1fr' : '1fr'; return; }
  if (tt){ tt.setAttribute('data-t', 'ob6SalH'); tt.textContent = d('ob6SalH'); }
  var resC = OB6.res === 'INTL' ? 'INTL' : OB6.res, h = '', t = tgts();
  h += salInput('cur', OB6.sal.cur || grp(salIn(26000, resC)), salUnit(resC, resM()), d('pfSalCur'), 'pfCurSal');
  t.forEach(function(c){ h += salInput(c, OB6.sal[c] || grp(salIn(34000, c)), salUnit(c, MKT.packs[c] || (c === OB6.res ? resM() : null)), t.length > 1 || c !== OB6.res ? fill('ob6SalExpIn', {'in':cin(c)}) : d('pfSalExp')); });
  g.innerHTML = h; var cs = $('pfCurSal'); if (cs) cs.style.display = emp ? '' : 'none';
  g.style.gridTemplateColumns = (emp || t.length > 1) ? '1fr 1fr' : '1fr';
}
function paintPhotoHints(){
  var s = sens(), ab = $('abCardPhoto'); if (ab) ab.style.display = s.photo === 'avoid' ? 'none' : '';
  if (s.photoAt && s.photoAt !== 'SA' && !(typeof PHOTO !== 'undefined' && PHOTO.set)) qa('[data-photosub]').forEach(function(sp){ sp.removeAttribute('data-t'); sp.textContent = fill('ob6PhHint2', {'in':cin(s.photoAt)}); });
}

/* ---------------------------------------------------------------- tune: focus order */
function placeLabel(k){ if (k === 'REMOTE') return {t:d('ob6FoRemote'), s:fill('ob6RemoteS', {city:resCityName()}), f:'💻'};
  var sel = OB6.cities[k] || []; return {t:(OB6.any[k] || !sel.length) ? fill('ob6AnyIn', {'in':cin(k)}) : sel.map(function(id){ return cityLabel(k, id); }).join(L() === 'ar' ? '، ' : ', '), s:cname(k), f:I(k).flag}; }
function paintTune(){
  var box = $('ob6Focus'); if (!box) return; var pl = places();
  if (pl.length < 2){ box.innerHTML = ''; return; }
  var h = '<div class="setcard"><div class="setcard-h"><span class="setcard-ic"><i class="ti ti-list-numbers"></i></span><div class="setcard-ht"><span class="setcard-t">' + E(d('ob6FoT')) + '</span></div></div><hr class="setcard-div"><div class="mut ob6fosub">' + E(d('ob6FoSub')) + '</div>';
  pl.forEach(function(k, i){ var p = placeLabel(k);
    h += '<div class="ob6rank' + (i === 0 ? ' first' : '') + '"><span class="num">' + (i + 1) + '</span><span class="ob6rf">' + p.f + '</span><div class="tx"><b>' + E(p.t) + '</b><span>' + E(p.s) + '</span>' + (i === 0 ? '<span class="ob6top">' + E(d('ob6FoTop')) + '</span>' : '') + '</div>'
       + '<div class="ob6mvs"><button class="ob6mv" data-ob6mv="' + i + '|-1" aria-label="' + E(d('ob6Up')) + '"' + (i === 0 ? ' disabled' : '') + '>&#9650;</button><button class="ob6mv" data-ob6mv="' + i + '|1" aria-label="' + E(d('ob6Down')) + '"' + (i === pl.length - 1 ? ' disabled' : '') + '>&#9660;</button></div></div>'; });
  h += '<div class="ob6q">' + E(d('ob6FoLow')) + '</div><div class="ob6opts">'
     + [['only', 'ob6FoOnly', 'ob6FoOnlyS'], ['near', 'ob6FoNear', 'ob6FoNearS']].map(function(o){ var on = OB6.strict === o[0]; return '<div class="ob6opt' + (on ? ' on' : '') + '" data-ob6strict="' + o[0] + '" role="radio" aria-checked="' + on + '"><span class="rc"></span><div>' + E(d(o[1])) + '<span class="od">' + E(d(o[2])) + '</span></div></div>'; }).join('') + '</div></div>';
  box.innerHTML = h;
}

/* ---------------------------------------------------------------- blocklist + live */
function paintBlocklist(){ var f = persona().f || {}, a = $('ob6Bl1'), b = $('ob6Bl2'); if (a && f.employer) a.textContent = lg(f.employer); if (b && f.employer2) b.textContent = lg(f.employer2); }
var LIVE0 = null;
function paintLive(){
  var feed = $('ob6LiveFeed'); if (!feed) return; if (LIVE0 == null) LIVE0 = feed.innerHTML;
  var c = primary(), emps = c === 'SA' ? null : pickEmployers(c, 3);
  if (!emps){ if (feed.getAttribute('data-ob6m') !== 'v5'){ feed.innerHTML = LIVE0; feed.setAttribute('data-ob6m', 'v5'); } return; }
  var rows = [['swc3Title', emps[0], empCity(c, emps[0]), 'lvNow'], ['swc2Title', emps[1] || emps[0], empCity(c, emps[1] || emps[0]), 'lvNow2'], ['rFM', emps[2] || emps[0], OB6.remote ? d('cRemote') : empCity(c, emps[2] || emps[0]), null]];
  feed.innerHTML = rows.map(function(r){ return '<div class="fr"><div class="fi a"><i class="ti ti-send"></i></div><div class="ft"><b>' + E(d(r[0])) + '</b><span>' + E(lg(r[1])) + ' · ' + E(r[2]) + '</span></div><span class="tm"' + (r[3] ? ' data-t="' + r[3] + '"' : '') + '>' + E(r[3] ? d(r[3]) : '1m') + '</span></div>'; }).join('');
  feed.setAttribute('data-ob6m', c);
}

/* ---------------------------------------------------------------- paint all */
function paintAll(){
  var fns = [paintSteps, paintWelcome, paintWhere, paintWall, paintRights, paintProfile, paintPhotoHints, paintTune, paintBlocklist, paintLive];
  fns.forEach(function(f){ try { f(); } catch(e){ console.error('ob6 ' + (f.name || ''), e); } });
  try { if (curScreen === 'checkout' || curScreen === 'subDone' || curScreen === 'wall') paintCheckout(); } catch(e){ console.error('ob6 checkout', e); }
}

/* ---------------------------------------------------------------- DOM additions: sheets */
(function(){
  var app = $('app'); if (!app) return;
  app.insertAdjacentHTML('beforeend',
    '<div class="sheet ob6sheet" id="ob6ResSheet"><h3 data-t="ob6ResH">Where do you live?</h3><p class="mut sheetsub" data-t="ob6ResSub"></p><div id="ob6ResList"></div><button class="btn btn-o mt14" data-sheetclose><span data-t="ob6Done">Done</span></button></div>' +
    '<div class="sheet ob6sheet" id="ob6AddSheet"><h3 data-t="ob6AddCtry">Add a country</h3><p class="mut sheetsub" data-t="ob6AddSub"></p><div id="ob6AddList"></div><button class="btn btn-b mt14" data-sheetclose><span data-t="ob6Done">Done</span></button></div>');
})();

/* ---------------------------------------------------------------- engine hooks */
/* new screens join the desktop onboarding corridor (no sidebar, split brand pane) */
try { ['where', 'rights', 'tune'].forEach(function(s){ DESK_NOCHROME[s] = 1; DESK_SPLIT[s] = 1; }); } catch(_){}
/* subDone continues to the post-payment setup (rights first) */
(function(){ var b = qs('.scr[data-scr="subDone"] .cta .btn'); if (b){ b.removeAttribute('data-cvtoffer'); b.setAttribute('data-go', 'rights'); } })();
/* profile: back to rights, forward to the CV Tailoring offer (when the add-on is there) or aboutYou */
function hasCvt(){ return !!qs('.scr[data-scr="cvtOffer"]') && typeof window.CVT === 'object' && window.CVT && !window.CVT.on; }
if (typeof pfApplyMode === 'function'){ var _pam = pfApplyMode; pfApplyMode = function(){ _pam(); if (pfMode === 'settings') return;
  var scr = qs('.scr[data-scr="profile"]'), back = scr && qs('.back', scr), btn = $('pfCtaBtn');
  if (back) back.setAttribute('data-go', 'rights'); if (btn) btn.setAttribute('data-go', hasCvt() ? 'cvtOffer' : 'aboutYou'); }; }
if (typeof pfAdapt === 'function'){ var _pad = pfAdapt; pfAdapt = function(){ _pad(); try { paintSalary(ksaOnly()); } catch(e){ console.error('ob6 salary', e); } }; }
if (typeof photoPaint === 'function'){ var _pp = photoPaint; photoPaint = function(){ _pp(); try { paintPhotoHints(); } catch(_){} }; }
/* checkout: pack BNPL providers count as pay-in-N; v5 paint first, then the residence layer */
if (typeof planIsBnpl === 'function'){ var _isB = planIsBnpl; planIsBnpl = function(){ return _isB() || (typeof PLAN !== 'undefined' && isBnplId(PLAN.method)); }; }
if (typeof planPaint === 'function'){ var _plp = planPaint; planPaint = function(){ ensureFr(); _plp(); if (CK.busy) return; try { paintCheckout(); paintWallSplit(); } catch(e){ console.error('ob6 planPaint', e); } }; }
if (typeof planSetTerm === 'function'){ var _pst = planSetTerm; planSetTerm = function(t){ if (!resIsSA() && parseInt(t, 10) === 1 && isBnplId(PLAN.method)){ var b = tileOf(PLAN.method); PLAN.method = 'card'; toast(fill('ob6TBnplOff', {n:b.n, prov:tName(b)})); } _pst(t); }; }
(function(){ var h = HOOKS['checkout']; HOOKS['checkout'] = function(){ ensureFr(); ckFixMethod(); if (h) h(); paintCheckout(); }; })();
(function(){ var h = HOOKS['wall']; HOOKS['wall'] = function(){ ensureFr(); if (h) h(); paintWall(); }; })();
(function(){ var h = HOOKS['subDone']; HOOKS['subDone'] = function(){ ensureFr(); if (h) h(); paintCheckout(); }; })();
['where', 'rights', 'tune', 'blocklist', 'live', 'welcome', 'targets'].forEach(function(s){ var h = HOOKS[s]; HOOKS[s] = function(){ if (h) h(); paintAll(); }; });
(function(){ var h = HOOKS['profile']; HOOKS['profile'] = function(){ if (h) h(); paintProfile(); if (typeof pfApplyMode === 'function') pfApplyMode(); }; })();
(function(){ var h = HOOKS['aboutYou']; HOOKS['aboutYou'] = function(){ if (h) h(); paintSteps(); paintPhotoHints(); }; })();
(function(){ var h = HOOKS['autopilot']; HOOKS['autopilot'] = function(){ if (h) h(); paintSteps(); }; })();
(function(){ var _r = render; render = function(){ ensureFr(); _r(); paintAll(); }; })();
MKT.onChange(function(S){
  var p = S.p; if (!p) return;
  if (OB6.pid && OB6.pid !== p.id){ var old = personaById(OB6.pid); if (old) restoreOrig(old); }
  if (OB6.pid !== p.id && !OB6._busy) initFrom(p);
});
(function(){ var r = $('restart'); if (r) r.addEventListener('click', function(){ var p = MKT.persona(); if (!p) return; var ch = restoreOrig(p); OB6.pid = null; initFrom(p); if (ch) MKT.set(p.id); else render(); }); })();

/* ---------------------------------------------------------------- events */
/* capture: guard the pay-in-N tiles on the monthly plan, set up the CV Tailoring offer, wallet/redirect toasts */
document.addEventListener('click', function(e){
  var t = e.target; if (!t || !t.closest) return;
  var pm = t.closest('.scr[data-scr="checkout"] .pmt[data-method]');
  if (pm && !resIsSA()){ var id = pm.getAttribute('data-method'); if (isBnplId(id) && !planBnplOk()){ e.stopPropagation(); var b = tileOf(id); toast(fill('ob6TBnplOff', {n:b.n, prov:tName(b)})); return; }
    if (isRedirId(id)){ e.stopPropagation(); PLAN.method = id; planPaint(); return; } }
  var bb = t.closest('#ckBnplBtn');
  if (bb && !resIsSA() && !bb.classList.contains('dis') && (isBnplId(PLAN.method) || isRedirId(PLAN.method))){ e.stopPropagation(); var tl = tileOf(PLAN.method);
    toast(tl.kind === 'bnpl' ? fill('ob6TBnpl', {b:tName(tl), n:tl.n}) : fill('ob6TOpen', {b:tName(tl)})); setTimeout(function(){ if (typeof planFinish === 'function') planFinish(); }, 900); return; }
  var ap = t.closest('.scr[data-scr="checkout"] .applepay.ob6gpay'); if (ap) toast(fill('ob6TOpen', {b:'Google Pay'}));
  var pc = t.closest('#pfCtaBtn'); if (pc && !pc.classList.contains('dis') && pc.getAttribute('data-go') === 'cvtOffer' && window.CVT){ window.CVT.from = 'onboarding'; window.CVT.setup = false; }
}, true);
document.addEventListener('click', function(e){
  var t = e.target; if (!t || !t.closest) return; var el, v;
  if ((el = t.closest('[data-ob6res]'))){ v = el.getAttribute('data-ob6res'); closeSheets(); if (v === 'INTL') setResidence('INTL', inMarkets(natOf()) ? null : natOf()); else setResidence(v, v); paintAll(); return; }
  if ((el = t.closest('[data-ob6resopen],[data-ob6addopen]'))){ paintSheets(); return; }
  if ((el = t.closest('[data-ob6reg]'))){ v = el.getAttribute('data-ob6reg'); var wrap = el.closest('.ob6reg'); OB6.regOpen[v] = !(wrap && wrap.classList.contains('open')); paintSheets(); return; }
  if ((el = t.closest('[data-ob6regall]'))){ v = el.getAttribute('data-ob6regall'); var r = regions().filter(function(x){ return x.id === v; })[0]; if (!r) return;
    var all = r.markets.every(function(c){ return OB6.targets.indexOf(c) >= 0; });
    if (all){ var keep = OB6.targets.filter(function(c){ return r.markets.indexOf(c) < 0; }); if (!keep.length && !OB6.remote){ toast(d('ob6TMin')); return; } OB6.targets = keep; }
    else r.markets.forEach(function(c){ if (OB6.targets.indexOf(c) < 0){ OB6.targets.push(c); if (!OB6.cities[c]) OB6.cities[c] = defCities(c); } });
    OB6.regOpen[v] = true; syncOrder(); afterWhere(); return; }
  if ((el = t.closest('[data-ob6ctry]'))){ toggleCountry(el.getAttribute('data-ob6ctry')); return; }
  if ((el = t.closest('[data-ob6any]'))){ v = el.getAttribute('data-ob6any'); OB6.any[v] = !OB6.any[v]; if (!OB6.any[v] && !(OB6.cities[v] || []).length) OB6.cities[v] = defCities(v); paintWhere(); paintWelcome(); return; }
  if ((el = t.closest('[data-ob6city]'))){ v = el.getAttribute('data-ob6city').split('|'); var c = v[0], id = v[1], a = OB6.cities[c] = OB6.cities[c] || [], i = a.indexOf(id);
    if (OB6.any[c]) return; if (i >= 0){ if (a.length === 1){ toast(d('ob6CityPick')); return; } a.splice(i, 1); } else a.push(id); paintWhere(); return; }
  if ((el = t.closest('[data-ob6remote]'))){ OB6.remote = el.classList.contains('on'); if (!OB6.remote && !OB6.targets.length){ OB6.remote = true; el.classList.add('on'); toast(d('ob6TMin')); return; } syncOrder(); paintWhere(); return; }
  if ((el = t.closest('[data-ob6opt]'))){ v = el.getAttribute('data-ob6opt').split('|'); OB6.rights[v[0]] = parseInt(v[1], 10); paintRights(); return; }
  if ((el = t.closest('[data-ob6us]'))){ v = el.getAttribute('data-ob6us').split('|'); var u = OB6.us[v[0]] = OB6.us[v[0]] || {}; u[v[1]] = v[2] === '1'; paintRights(); return; }
  if ((el = t.closest('[data-ob6over]'))){ OB6.over[el.getAttribute('data-ob6over')] = true; paintRights(); return; }
  if ((el = t.closest('[data-ob6auto]'))){ delete OB6.over[el.getAttribute('data-ob6auto')]; paintRights(); return; }
  if ((el = t.closest('[data-ob6mv]'))){ v = el.getAttribute('data-ob6mv').split('|'); var pl = places(), ix = parseInt(v[0], 10), to = ix + parseInt(v[1], 10); if (to < 0 || to >= pl.length) return;
    var tmp = pl[ix]; pl[ix] = pl[to]; pl[to] = tmp; OB6.order = pl; pushPersona(false); paintTune(); return; }
  if ((el = t.closest('[data-ob6strict]'))){ OB6.strict = el.getAttribute('data-ob6strict'); paintTune(); return; }
  if ((el = t.closest('[data-ob6lv]'))){ v = el.getAttribute('data-ob6lv').split('|'); OB6.lv[v[0]] = parseInt(v[1], 10); paintProfile(); return; }
  if ((el = t.closest('[data-ob6eeo]'))){ OB6.eeo = el.getAttribute('data-ob6eeo'); paintProfile(); return; }
  if ((el = t.closest('[data-ob6g]'))){ OB6.gender = el.getAttribute('data-ob6g'); return; }
});
document.addEventListener('change', function(e){ var t = e.target; if (t && t.hasAttribute && t.hasAttribute('data-ob6nat')){ OB6.nat = t.value === 'OTHER' ? OB6.nat : t.value; paintRights(); } });
document.addEventListener('input', function(e){ var t = e.target; if (t && t.hasAttribute && t.hasAttribute('data-ob6sal')){ var raw = t.value.replace(/[^\d]/g, '').slice(0, 9); t.value = raw ? grp(+raw) : ''; OB6.sal[t.getAttribute('data-ob6sal')] = t.value; } });

/* ---------------------------------------------------------------- boot */
initFrom(MKT.persona() || {id:'SA', res:'SA', targets:['SA'], nat:'SA', gender:'f', city:'Riyadh'});
ensureFr();
render();
})();
