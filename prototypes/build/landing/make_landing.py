#!/usr/bin/env python3
"""
make_landing.py: build a per-country Uptal Auto-Apply landing page from the
KSA source page and a country content pack.

    python3 -I make_landing.py <source.html> <pack.json> <out.html> [--placeholders <PLACEHOLDERS.md>]

The source is the original KSA landing page (fonts embedded as woff2 data URIs,
two language trees #page-en and #page-ar[dir=rtl], one small inline script).
The generator:

  * replaces every country-specific string in BOTH trees with the pack's copy.
    Each replacement is anchored on an exact string from the KSA page and must
    match exactly once per tree, or the build stops (see SLOTS);
  * rebuilds the country-specific blocks structurally: the employer band
    (KSA logo <img>s become typeset wordmarks), the tailoring-card tiles
    (logo <img>s become monogram tiles), sector tags, targeting chips and
    the FAQ list;
  * swaps the flag, page title, meta description and the "Start applying"
    hand-off link into the app prototype;
  * keeps the embedded fonts byte-for-byte and adds no network resources;
  * verifies the result: no image data left, fonts intact, no unresolved
    {{tokens}}, and no leftover KSA place names in the visible text of either
    tree (the testimonials section, which keeps its Saudi members, is exempt).

Any mismatch raises BuildError and exits non-zero. Stdlib only.
"""
import html
import json
import os
import re
import sys
import tempfile
from html.parser import HTMLParser


class BuildError(Exception):
    pass


def fail(msg):
    raise BuildError(msg)


# --------------------------------------------------------------------------
# Source anchors. These are exact strings from the KSA page. A new country
# never edits this table; it writes a new pack whose `text` block supplies a
# value for every key. `tpl` wraps the pack value ({} is replaced).
# --------------------------------------------------------------------------
TREE_START = {
    'en': '<div class="aa-landing" id="page-en">',
    'ar': '<div class="aa-landing" id="page-ar" dir="rtl">',
}

SLOTS = {
    'badge': {
        'en': ('</span> Built in KSA </div>', '</span> {} </div>'),
        'ar': ('</span> صُنع في السعودية </div>', '</span> {} </div>'),
    },
    'hero_eyebrow': {
        'en': ('</span> AI Auto-Apply · Saudi Arabia </div>', '</span> {} </div>'),
        'ar': ('</span> تقديم تلقائي بالذكاء الاصطناعي · السعودية </div>', '</span> {} </div>'),
    },
    'hero_lead': {
        'en': ('<p class="hero-lead">Drop your CV once. Our AI reads your qualifications and applies on your behalf to '
               '<strong>only the roles you actually fit</strong>, across Saudi Arabia, every single day. You just take '
               'the interviews.</p>', '<p class="hero-lead">{}</p>'),
        'ar': ('<p class="hero-lead">ارفع سيرتك الذاتية والذكاء الاصطناعي راح يقرأ مؤهلاتك وخبراتك ويقدّم لك '
               '<strong>للوظائف اللي تناسبك </strong>يوميًا، في كل أنحاء السعودية إلى أن يتم حصولك على وظيفة.</p>',
               '<p class="hero-lead">{}</p>'),
    },
    'live_big': {
        'en': ('<span class="live-big">95K+</span>', '<span class="live-big">{}</span>'),
        'ar': ('<span class="live-big">95K+</span>', '<span class="live-big">{}</span>'),
    },
    'live_unit': {
        'en': ('<span class="live-unit">jobs in KSA</span>', '<span class="live-unit">{}</span>'),
        'ar': ('<span class="live-unit">وظيفة نشطة في السعودية الآن</span>', '<span class="live-unit">{}</span>'),
    },
    'live_today': {
        'en': ('</i> 26,859+ new this week </div>', '</i> {} </div>'),
        'ar': ('</i> +26,859 وظيفة جديدة هذا الأسبوع </div>', '</i> {} </div>'),
    },
    'live_sub': {
        'en': ('<div class="live-sub"> New jobs added across Saudi, every day </div>', '<div class="live-sub"> {} </div>'),
        'ar': ('<div class="live-sub"> وظائف جديدة تُضاف كل يوم في كل أنحاء السعودية </div>',
               '<div class="live-sub"> {} </div>'),
    },
    'board_meta': {
        'en': ('<span class="board-meta">Across Saudi Arabia</span>', '<span class="board-meta">{}</span>'),
        'ar': ('<span class="board-meta">في كل أنحاء السعودية</span>', '<span class="board-meta">{}</span>'),
    },
    'tb_h2': {
        'en': ('<h2 class="tb-h2">We apply to more than <span class="tb-num">5,700</span> organizations</h2>',
               '<h2 class="tb-h2">{}</h2>'),
        'ar': ('<h2 class="tb-h2">نقدم على أكثر من <span class="tb-num">5,700</span> جهة عمل</h2>',
               '<h2 class="tb-h2">{}</h2>'),
    },
    'tb_sub': {
        'en': ('<p class="tb-sub">Government and semi-government, multinationals, banks, healthcare, retail, aviation '
               'and others, across Saudi Arabia.</p>', '<p class="tb-sub">{}</p>'),
        'ar': ('<p class="tb-sub">جهات حكومية وشبه حكومية، وشركات عالمية، وبنوك، وقطاع صحي، وتجزئة، وطيران وغيرها، '
               'في كل أنحاء السعودية.</p>', '<p class="tb-sub">{}</p>'),
    },
    'how_step2': {
        'en': ('<p class="hx2-dd">Our AI rewrites your CV uniquely for each role, matching its exact keywords, then '
               'submits it across all four boards. Up to 300 applications a month from 30K+ new jobs.</p>',
               '<p class="hx2-dd">{}</p>'),
        'ar': ('<p class="hx2-dd">يعيد الذكاء الاصطناعي كتابة سيرتك الذاتية بشكل دقيق واحترافي لكل وظيفة، بحيث يطابق '
               'كلماتها المفتاحية ثم يقدّم لك عليها حتى 300 وظيفة شهريًا من بين أكثر من 30 ألف وظيفة جديدة.</p>',
               '<p class="hx2-dd">{}</p>'),
    },
    'cv_city': {
        'en': ('<span class="hx2-hl h4">Riyadh</span>', '<span class="hx2-hl h4">{}</span>'),
        'ar': ('<span class="hx2-hl h4">الرياض</span>', '<span class="hx2-hl h4">{}</span>'),
    },
    'more_txt': {
        'en': ('<span class="more-txt">Plus <b>546</b> more, each tailored for you</span>', '<span class="more-txt">{}</span>'),
        'ar': ('<span class="more-txt">و<b>546</b> وظيفة أخرى، كلها مُخصّصة لك</span>', '<span class="more-txt">{}</span>'),
    },
    'card_note': {
        'en': ('<div class="card-note"> Example roles and employer logos, shown for illustration. </div>',
               '<div class="card-note"> {} </div>'),
        'ar': ('<div class="card-note"> وظائف وشعارات الجهات للتوضيح فقط. </div>', '<div class="card-note"> {} </div>'),
    },
    'ft_types': {
        'en': ('</i> Government, private, startups and more </li>', '</i> {} </li>'),
        'ar': ('</i> حكومي، خاص، شركات ناشئة وغيرها </li>', '</i> {} </li>'),
    },
    'testi_eyebrow': {
        'en': ('<span class="eyebrow">Loved by job seekers</span>', '<span class="eyebrow">{}</span>'),
        'ar': ('<span class="eyebrow">مناسب لجميع الباحثين عن عمل</span>', '<span class="eyebrow">{}</span>'),
    },
    'testi_h2': {
        'en': ('<h2>People are landing interviews, hands-free.</h2>', '<h2>{}</h2>'),
        'ar': ('<h2>تجاوز أنظمة ال ATS وجهز نفسك للمقابلات.</h2>', '<h2>{}</h2>'),
    },
    'testi_trust': {
        'en': ('<p>Trusted by <b>1,542+</b> candidates across Saudi Arabia.</p>', '<p>{}</p>'),
        'ar': ('<p>موثوق من <b>أكثر من 1,542</b> مرشّح في كل أنحاء السعودية.</p>', '<p>{}</p>'),
    },
}

# The hero live card's "Live Data" flag. Not a plain slot: the generator only
# lets it say "live" when every figure in the card comes from a stat marked
# placeholder:false. Otherwise it renders text.<lang>.live_flag_sample in the
# placeholder style and stops the green "live" pulse.
LIVE_FLAG = {
    'en': '<div class="live-flag"><span class="dot"></span>Live Data</div>',
    'ar': '<div class="live-flag"><span class="dot"></span>بيانات مباشرة</div>',
}
LIVE_CARD_SLOTS = ('live_big', 'live_unit', 'live_today', 'live_sub')
TEXT_KEYS_EXTRA = ('live_flag', 'live_flag_sample')

# Country-neutral copy fixes to the KSA source (spelling in the inherited
# Arabic copy). Applied to every country; each must match exactly once.
SOURCE_FIXES = [
    ('ar', '<p class="hx2-sub">سجل وانشئ حساب جديد.', '<p class="hx2-sub">سجّل وأنشئ حساب جديد.'),
    ('ar', '<div class="hx2-tt"> سجل وانشئ حسابك ', '<div class="hx2-tt"> سجّل وأنشئ حسابك '),
    ('ar', 'على بريدك الالكتروني </div>', 'على بريدك الإلكتروني </div>'),
    ('ar', 'فتجتاز الفرز وأنظمة ال ATS وتصل', 'فتجتاز الفرز وأنظمة الـATS وتصل'),
]

# Footer legal links in the KSA source. pack.links.<key> (optional) replaces
# the href in both trees; without it the KSA page is linked (and the
# placeholders file says so).
LEGAL_LINKS = {
    'privacy': 'https://uptal.com/privacy-policy',
    'terms': 'https://uptal.com/terms-and-conditions',
    'refund': 'https://uptal.com/refund-policy',
}

# Monogram tile font size by length (tile is 42-46px square).
MONO_SIZES = {1: '18px', 2: '16px', 3: '13.5px', 4: '11.5px', 5: '10.5px'}

# Document-level anchors (head + script).
HEAD_TITLE = '<title>Uptal Auto-Apply · Apply to Jobs Automatically in Saudi Arabia</title>'
HEAD_DESC = ('<meta name="description" content="Drop your CV once. Uptal\'s AI tailors it to every role that fits '
             'you and applies on your behalf across Saudi Arabia, every day.">')
JS_TITLE_AR = "'منصة ابتال Uptal | التقديم التلقائي على كل وظيفة تناسبك'"
JS_TITLE_EN = "'Uptal Auto-Apply · Apply to Jobs Automatically in Saudi Arabia'"
JS_KEY = "  var KEY='uptal-aa-lang';\n"
JS_SUBMIT = (
    "      setTimeout(function(){\n"
    "        if(lbl) lbl.textContent = isAr ? 'ابدأ التقديم' : 'Start applying';\n"
    "      }, 1600);\n"
)
JS_SUBMIT_NEW = (
    "      setTimeout(function(){\n"
    "        // hand the visitor to the app prototype for this market's persona\n"
    "        location.href = isAr ? APP_URL_AR : APP_URL_EN;\n"
    "      }, 1600);\n"
    "      // coming back via the browser's back button restores this page from cache\n"
    "      window.addEventListener('pageshow', function(){\n"
    "        if(lbl) lbl.textContent = isAr ? 'ابدأ التقديم' : 'Start applying';\n"
    "      }, {once:true});\n"
)
CSS_END = '\n</style>\n</head>'

# Words that must not survive outside the (labelled) testimonials section.
SOURCE_TERMS_LATIN = ['Saudi', 'KSA', 'Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Dhahran', 'Makkah', 'Mecca',
                      'Madinah', 'Medina', 'Tabuk', 'Abha', 'Kingdom', 'riyal', 'SAR']
SOURCE_TERMS_AR = ['السعودية', 'السعودي', 'المملكة', 'الرياض', 'جدة', 'الدمام', 'الخبر', 'الظهران', 'مكة',
                   'المدينة المنورة', 'تبوك', 'أبها', 'ريال']

PACK_KEYS_REQUIRED = ['country', 'title', 'meta_description', 'app_link', 'flag_svg', 'placeholder_tooltip',
                      'stats', 'text', 'sector_tags', 'targeting', 'tailoring', 'employers', 'faq']
PACK_KEYS_OPTIONAL = ['pack_version', 'review_notes', 'links']
LANGS = ('en', 'ar')

EXTRA_CSS = r"""
/* ============ country template additions (written by make_landing.py) ============ */
/* Placeholder figures: amber tint + dashed underline, explained by a tooltip.
   Nothing in this style should ever ship; replace the value and drop the flag. */
.aa-landing .ph{background:rgba(245,166,35,.2);border-radius:4px;padding:0 .14em;
  text-decoration:underline dashed #f5a623;text-decoration-thickness:2px;text-underline-offset:.22em;
  text-decoration-skip-ink:none;cursor:help;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.aa-landing .mkt-flag svg{width:100%;height:100%;display:block}
/* hero card flag while its figures are placeholders: amber, no "live" pulse */
.aa-landing .live-flag.is-ph{color:#f5a623}
.aa-landing .live-flag.is-ph .dot{animation:none;background:#f5a623;box-shadow:none}
.aa-landing .live-flag.is-ph .ph{background:rgba(245,166,35,.16)}

/* "Where we apply": typeset wordmarks in place of logo images, grayscale like a logo band */
.aa-landing .tb-logo .wm{display:flex;flex-direction:column;align-items:center;justify-content:center;max-width:100%;
  font-family:"Geist","Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  font-size:calc(clamp(14px,1.3vw,16.5px) * var(--s,1));font-weight:700;line-height:1.1;letter-spacing:-.015em;
  color:#4d566a;text-align:center;text-wrap:balance;direction:ltr;transition:color .22s}
.aa-landing .tb-logo:hover .wm{color:var(--ink)}
.aa-landing .tb-logo .wm.caps{text-transform:uppercase;letter-spacing:.1em;font-weight:800;
  font-size:calc(clamp(12.5px,1.15vw,15px) * var(--s,1))}
.aa-landing .tb-logo .wm.lower{text-transform:lowercase;letter-spacing:-.035em;font-weight:800}
.aa-landing .tb-logo .wm small{display:block;margin-top:4px;font-size:9.5px;line-height:1.2;font-weight:600;
  letter-spacing:.15em;text-transform:uppercase;color:#8b93a4}
.aa-landing .tb-note{margin:clamp(18px,2vw,26px) auto 0;text-align:center;font-size:12.5px;color:#8b93a4}
@media (max-width:720px){
  .aa-landing .tb-logo .wm{font-size:calc(12.5px * var(--s,1))}
  .aa-landing .tb-logo .wm.caps{font-size:calc(11.5px * var(--s,1));letter-spacing:.08em}
  .aa-landing .tb-logo .wm small{font-size:8px;margin-top:3px;letter-spacing:.12em}
}

/* tailoring card: monogram tiles in place of employer logo images */
.aa-landing .jt-g.mono-tile{background:#fff;color:#0e1426;font-family:"Geist","Inter",sans-serif;font-size:var(--mf,16px);
  font-weight:800;letter-spacing:-.02em;line-height:1;box-shadow:0 10px 22px -12px rgba(0,0,0,.55),inset 0 0 0 1px rgba(14,20,38,.08)}
"""

VOID = {'br', 'img', 'wbr', 'hr', 'input', 'meta', 'link', 'rect', 'path', 'circle', 'source'}


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------
class _TagCheck(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append('unexpected </%s>' % tag)
        else:
            self.stack.pop()


def check_fragment(frag, where):
    if not isinstance(frag, str):
        fail('%s: expected a string, got %s' % (where, type(frag).__name__))
    bad_amp = re.search(r'&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)', frag)
    if bad_amp:
        fail('%s: bare "&" (write &amp;): %r' % (where, frag[:80]))
    p = _TagCheck()
    p.feed(frag)
    p.close()
    if p.errors or p.stack:
        fail('%s: unbalanced HTML (%s): %r' % (where, ', '.join(p.errors + ['unclosed <%s>' % t for t in p.stack]), frag[:120]))
    if '</script' in frag.lower():
        fail('%s: "</script" is not allowed in pack strings' % where)
    return frag


def replace_once(doc, old, new, where, count=1):
    n = doc.count(old)
    if n != count:
        fail('%s: expected %d occurrence(s) of source string, found %d:\n    %r' % (where, count, n, old[:160]))
    return doc.replace(old, new)


def sub_count(pattern, repl, doc, where, count, flags=re.S):
    out, n = re.subn(pattern, repl, doc, flags=flags)
    if n != count:
        fail('%s: expected %d match(es) of /%s/, found %d' % (where, count, pattern[:80], n))
    return out


def text_of(frag):
    """Plain text of an HTML fragment (for aria-labels)."""
    return html.unescape(re.sub(r'<[^>]+>', '', frag)).strip()


def attr(s):
    return html.escape(s, quote=True)


# --------------------------------------------------------------------------
# pack loading / validation
# --------------------------------------------------------------------------
def load_pack(path):
    try:
        with open(path, encoding='utf-8') as f:
            pack = json.load(f)
    except (OSError, ValueError) as e:
        fail('cannot read pack %s: %s' % (path, e))
    keys = {k for k in pack if not k.startswith('_')}
    missing = [k for k in PACK_KEYS_REQUIRED if k not in keys]
    unknown = sorted(keys - set(PACK_KEYS_REQUIRED) - set(PACK_KEYS_OPTIONAL))
    if missing:
        fail('pack is missing required key(s): %s' % ', '.join(missing))
    if unknown:
        fail('pack has unknown key(s): %s (typo? see README.md)' % ', '.join(unknown))
    c = pack['country']
    if not isinstance(c, dict) or not isinstance(c.get('code'), str) or not re.fullmatch(r'[A-Z]{2}', c['code']):
        fail('pack.country.code must be an ISO 3166 alpha-2 code in capitals, e.g. "AE"')
    if not isinstance(c.get('name'), dict) or not all(isinstance(c['name'].get(l), str) and c['name'][l].strip()
                                                      for l in LANGS):
        fail('pack.country.name must be {"en": ..., "ar": ...} with non-empty strings')
    for k in ('text', 'stats', 'title', 'placeholder_tooltip', 'faq', 'sector_tags', 'targeting', 'tailoring',
              'employers'):
        if not isinstance(pack[k], dict):
            fail('pack.%s must be an object' % k)
    if not isinstance(pack['meta_description'], str) or not pack['meta_description'].strip():
        fail('pack.meta_description must be a non-empty string')
    for k in ('app_link', 'flag_svg'):
        if not isinstance(pack[k], str):
            fail('pack.%s must be a string' % k)
    for lang in LANGS:
        t = pack['text'].get(lang)
        if not isinstance(t, dict):
            fail('pack.text.%s must be an object' % lang)
        slots = set(SLOTS) | set(TEXT_KEYS_EXTRA)
        miss = sorted(slots - set(t))
        extra = sorted(set(t) - slots)
        if miss:
            fail('pack.text.%s is missing slot(s): %s' % (lang, ', '.join(miss)))
        if extra:
            fail('pack.text.%s has unknown slot(s): %s' % (lang, ', '.join(extra)))
        for k in ('title', 'placeholder_tooltip'):
            if not isinstance(pack[k].get(lang), str):
                fail('pack.%s.%s must be a string' % (k, lang))
        faq = pack['faq'].get(lang)
        if not isinstance(faq, list) or not faq:
            fail('pack.faq.%s must be a non-empty list' % lang)
        for i, item in enumerate(faq):
            if not isinstance(item, dict) or not isinstance(item.get('q'), str) or not isinstance(item.get('a'), str):
                fail('pack.faq.%s[%d] must be {"q": ..., "a": ...}' % (lang, i))
        if not isinstance(pack['sector_tags'].get(lang), list) or not pack['sector_tags'][lang]:
            fail('pack.sector_tags.%s must be a non-empty list' % lang)
        for g in ('cities', 'company_types'):
            if not isinstance(pack['targeting'].get(g), dict) or not pack['targeting'][g].get(lang):
                fail('pack.targeting.%s.%s must be a non-empty list' % (g, lang))
        for where, items in (('sector_tags.' + lang, pack['sector_tags'][lang]),
                             ('targeting.cities.' + lang, pack['targeting']['cities'][lang]),
                             ('targeting.company_types.' + lang, pack['targeting']['company_types'][lang])):
            if not all(isinstance(t, dict) and isinstance(t.get('label'), str) for t in items):
                fail('pack.%s: every item must be {"label": ..., "on"?: true}' % where)
        note = pack['employers'].get('note')
        if not isinstance(note, dict) or not isinstance(note.get(lang), str):
            fail('pack.employers.note.%s must be a string' % lang)
    for k, st in pack['stats'].items():
        if not isinstance(st, dict):
            fail('pack.stats.%s must be an object' % k)
        if not isinstance(st.get('placeholder'), bool):
            fail('pack.stats.%s.placeholder must be true or false (say explicitly whether the figure is real)' % k)
        for lang in LANGS:
            if not isinstance(st.get(lang), str) or not st[lang]:
                fail('pack.stats.%s.%s must be a non-empty string' % (k, lang))
            check_fragment(st[lang], 'stats.%s.%s' % (k, lang))
    if len(pack['faq']['en']) != len(pack['faq']['ar']):
        fail('pack.faq: en has %d items, ar has %d; keep the two lists parallel'
             % (len(pack['faq']['en']), len(pack['faq']['ar'])))
    if not re.fullmatch(r'[A-Za-z0-9_./-]+\.html(\?[A-Za-z0-9_=&.-]*)?', pack['app_link']):
        fail('pack.app_link must be a relative .html link with an optional simple query, got %r' % pack['app_link'])
    if not pack['flag_svg'].lstrip().startswith('<svg') or 'href' in pack['flag_svg'] or '<script' in pack['flag_svg']:
        fail('pack.flag_svg must be a self-contained inline <svg> (no href, no script)')
    rows = pack['employers'].get('rows')
    if not isinstance(rows, list) or not rows or not all(isinstance(r, list) and r for r in rows):
        fail('pack.employers.rows must be a list of non-empty lists')
    for i, row in enumerate(rows):
        for e in row:
            if not isinstance(e, dict) or not isinstance(e.get('name'), str):
                fail('pack.employers.rows[%d]: every item needs a "name" string' % i)
            lab = e.get('label')
            if lab is not None and not (isinstance(lab, str) or
                                        (isinstance(lab, dict) and all(isinstance(lab.get(l), str) and lab[l]
                                                                       for l in LANGS))):
                fail('pack.employers.rows[%d] %r: label must be a string or {"en": ..., "ar": ...}' % (i, e['name']))
    trows = pack['tailoring'].get('rows')
    if not isinstance(trows, list) or len(trows) != 2:
        fail('pack.tailoring.rows must be a list of exactly 2 example roles')
    for i, r in enumerate(trows):
        for k in ('mono', 'title', 'sub', 'keywords', 'fit'):
            if k not in r:
                fail('pack.tailoring.rows[%d] is missing "%s"' % (i, k))
        n = len(text_of(r['mono']))
        if n not in MONO_SIZES:
            fail('pack.tailoring.rows[%d].mono must be 1-%d characters, got %r' % (i, max(MONO_SIZES), r['mono']))
    if not isinstance(pack['tailoring'].get('more_monos'), list):
        fail('pack.tailoring.more_monos must be a list')
    notes = pack.get('review_notes', [])
    if not isinstance(notes, list) or not all(isinstance(n, dict) and isinstance(n.get('item'), str)
                                              and isinstance(n.get('note'), str) for n in notes):
        fail('pack.review_notes must be a list of {"item": ..., "note": ...}')
    links = pack.get('links', {})
    if not isinstance(links, dict):
        fail('pack.links must be an object')
    bad = sorted(set(links) - set(LEGAL_LINKS))
    if bad:
        fail('pack.links has unknown key(s): %s (allowed: %s)' % (', '.join(bad), ', '.join(sorted(LEGAL_LINKS))))
    for k, v in links.items():
        if not isinstance(v, str) or not re.fullmatch(r'https://[A-Za-z0-9.-]+(?:/[A-Za-z0-9._~%/-]*)?(?:#[A-Za-z0-9_-]*)?', v):
            fail('pack.links.%s must be a plain https:// URL, got %r' % (k, v))
    return pack


class Expander:
    """Expands {{stat}} tokens, wrapping placeholder stats in the .ph marker."""

    def __init__(self, pack):
        self.stats = pack['stats']
        self.tip = pack['placeholder_tooltip']
        self.used = {}  # (key, lang) -> count

    def __call__(self, frag, lang, where):
        check_fragment(frag, where)

        def rep(m):
            key = m.group(1)
            st = self.stats.get(key)
            if st is None:
                fail('%s: unknown token {{%s}} (not in pack.stats)' % (where, key))
            self.used[(key, lang)] = self.used.get((key, lang), 0) + 1
            if st.get('placeholder'):
                return '<span class="ph" data-ph="%s" title="%s">%s</span>' % (key, attr(self.tip[lang]), st[lang])
            return st[lang]

        out = re.sub(r'\{\{\s*([A-Za-z0-9_]+)\s*\}\}', rep, frag)
        if '{{' in out or '}}' in out:
            fail('%s: malformed token in %r' % (where, frag[:80]))
        return out


# --------------------------------------------------------------------------
# structural builders
# --------------------------------------------------------------------------
def build_trust_rows(pack, lang, X):
    emp = pack['employers']
    durations = ['62s', '68s', '74s', '80s']
    out = ['<div class="tb-rows">']
    for i, row in enumerate(emp['rows']):
        items = []
        for e in row:
            where = 'employers.rows[%d] %r' % (i, e.get('name'))
            name = check_fragment(e['name'], where)
            style = e.get('style', 'title')
            if style not in ('title', 'caps', 'lower'):
                fail('%s: style must be title|caps|lower, got %r' % (where, style))
            sub = e.get('sub')
            label = e.get('label')
            if isinstance(label, dict):
                label = label[lang]
            label = label or (text_of(name) + (' ' + text_of(sub) if sub else ''))
            s = float(e.get('s', 1.0))
            if not 0.5 <= s <= 2.0:
                fail('%s: s must be between 0.5 and 2.0' % where)
            inner = name + ('<small>%s</small>' % check_fragment(sub, where + '.sub') if sub else '')
            cls = 'wm' + ('' if style == 'title' else ' ' + style)
            items.append((s, cls, inner, text_of(label)))
        track = []
        for copy in (0, 1):  # the track holds the row twice; the marquee loops at -50%
            for s, cls, inner, label in items:
                a11y = ' role="img" aria-label="%s"' % attr(label) if copy == 0 else ' aria-hidden="true"'
                track.append('<span class="tb-logo" style="--s:%s"%s><span class="%s">%s</span></span>'
                             % (('%.2f' % s).rstrip('0').rstrip('.'), a11y, cls, inner))
        rev = ' rev' if i % 2 else ''
        out.append('<div class="tb-marquee%s" style="--dur:%s"><div class="tb-track">%s</div></div>'
                   % (rev, durations[i % len(durations)], ''.join(track)))
    out.append('</div>')
    out.append('<div class="wrap"><p class="tb-note">%s</p></div>' % X(emp['note'][lang], lang, 'employers.note.' + lang))
    return ''.join(out)


def build_tailor_rows(pack, lang, X):
    rows = []
    for i, r in enumerate(pack['tailoring']['rows']):
        where = 'tailoring.rows[%d]' % i
        fit = int(r['fit'])
        if not 0 <= fit <= 100:
            fail(where + ': fit must be 0-100')
        kws = ''.join('<span class="kwc">%s</span>' % check_fragment(k, where + '.keywords') for k in r['keywords'])
        mono = check_fragment(r['mono'], where + '.mono')
        rows.append(
            '<div class="jr-g"><div class="jt-g mono-tile" style="--mf:%s" aria-hidden="true">%s</div><div class="jr-main">'
            '<div class="jr-title"> %s </div><div class="jr-sub"> %s </div><div class="kw">%s</div></div>'
            '<div class="fring" style="--p: %d;"><span class="fring-num">%d%%</span></div></div>'
            % (MONO_SIZES[len(text_of(mono))], mono, X(r['title'][lang], lang, where + '.title'),
               X(r['sub'][lang], lang, where + '.sub'), kws, fit, fit))
    return ''.join(rows)


def build_more_stack(pack):
    monos = pack['tailoring']['more_monos']
    if not 1 <= len(monos) <= 4:
        fail('tailoring.more_monos must have 1-4 entries')
    return ''.join('<span class="more-logo noimg" data-mono="%s"></span>' % attr(m) for m in monos)


def build_tags(items, lang, X, where):
    return ''.join('<span class="hx2-tag%s">%s</span>' % (' on' if t.get('on') else '', X(t['label'], lang, where))
                   for t in items)


def build_chips(items, lang, X, check_icon, where):
    out = []
    for t in items:
        label = X(t['label'], lang, where)
        if t.get('on'):
            out.append('<span class="gchip c-on">%s %s</span>' % (check_icon, label))
        else:
            out.append('<span class="gchip c-off">%s</span>' % label)
    return ''.join(out)


def build_faq(pack, lang, X, chevron):
    out = []
    for i, item in enumerate(pack['faq'][lang]):
        where = 'faq.%s[%d]' % (lang, i)
        q = X(item['q'], lang, where + '.q')
        a = X(item['a'], lang, where + '.a')
        out.append('<details class="ng-star-inserted"><summary> %s %s</summary><p>%s</p></details>' % (q, chevron, a))
    return ''.join(out)


def live_card_tokens(pack, lang):
    toks = []
    for k in LIVE_CARD_SLOTS:
        toks += re.findall(r'\{\{\s*([A-Za-z0-9_]+)\s*\}\}', pack['text'][lang][k])
    return toks


def live_card_is_sample(pack, lang):
    """True unless every figure in the live card is a stat with placeholder:false.
    A card with no {{stat}} at all is treated as sample: the generator cannot vouch for it."""
    toks = live_card_tokens(pack, lang)
    return not toks or any(pack['stats'].get(k, {}).get('placeholder') is not False for k in toks)


# --------------------------------------------------------------------------
# tree transform
# --------------------------------------------------------------------------
def transform_tree(tree, lang, pack, X):
    w = '[%s tree]' % lang

    # 0. country-neutral spelling fixes to the inherited source copy
    for fl, old, new in SOURCE_FIXES:
        if fl == lang:
            tree = replace_once(tree, old, new, '%s source fix' % w)

    # 1. exact-string slots
    for key, per_lang in SLOTS.items():
        src, tpl = per_lang[lang]
        tree = replace_once(tree, src, tpl.format(X(pack['text'][lang][key], lang, 'text.%s.%s' % (lang, key))),
                            '%s slot "%s"' % (w, key))

    # 1b. hero live-card flag: "live" only when the card's figures are real
    t = pack['text'][lang]
    if live_card_is_sample(pack, lang):
        flag = ('<div class="live-flag is-ph"><span class="dot"></span><span class="ph" data-ph="live_flag" '
                'title="%s">%s</span></div>' % (attr(pack['placeholder_tooltip'][lang]),
                                                 X(t['live_flag_sample'], lang, 'text.%s.live_flag_sample' % lang)))
    else:
        flag = '<div class="live-flag"><span class="dot"></span>%s</div>' % X(t['live_flag'], lang,
                                                                              'text.%s.live_flag' % lang)
    tree = replace_once(tree, LIVE_FLAG[lang], flag, '%s live-card flag' % w)

    # 1c. footer legal links
    for key, ksa_url in LEGAL_LINKS.items():
        url = pack.get('links', {}).get(key, ksa_url)
        tree = replace_once(tree, '<a href="%s" rel="noopener" target="_blank">' % ksa_url,
                            '<a href="%s" rel="noopener" target="_blank">' % attr(url), '%s footer link %s' % (w, key))

    # 2. flag image -> inline flag
    tree = sub_count(r'<span class="mkt-flag"><img [^>]*/></span>',
                     lambda m: '<span class="mkt-flag">%s</span>' % pack['flag_svg'], tree, w + ' flag', 1)

    # 3. employer logo band -> wordmark rows + disclaimer
    start = tree.find('<div class="tb-rows">')
    if start < 0 or tree.count('<div class="tb-rows">') != 1:
        fail(w + ' employer band: <div class="tb-rows"> not found exactly once')
    end = tree.find('</section>', start)
    block = tree[start:end]
    if not block.endswith('</div></div></div>') or block.count('class="tb-logo"') != 64:
        fail(w + ' employer band: unexpected structure (expected 64 .tb-logo items in two marquees)')
    tree = tree[:start] + build_trust_rows(pack, lang, X) + tree[end:]

    # 4. tailoring card rows (logo tiles -> monogram tiles)
    start = tree.find('<div class="jr-g">')
    end = tree.find('<div class="shimmer-row">', start)
    if start < 0 or end < 0:
        fail(w + ' tailoring card: .jr-g / .shimmer-row not found')
    block = tree[start:end]
    if block.count('<div class="jr-g">') != 2 or block.count('emp-tile') != 2:
        fail(w + ' tailoring card: expected two .jr-g rows with .emp-tile logos')
    tree = tree[:start] + build_tailor_rows(pack, lang, X) + tree[end:]

    # 5. "Plus N more" logo stack -> monogram circles
    tree = sub_count(r'(<span aria-hidden="true" class="more-stack">)(?:<span class="more-logo" data-mono="[^"]*"><img [^>]*/></span>){3}(</span><span class="more-txt">)',
                     lambda m: m.group(1) + build_more_stack(pack) + m.group(2), tree, w + ' more-stack', 1)

    # 6. step-1 sector tags
    tree = sub_count(r'<div class="hx2-tags">(?:<span class="hx2-tag(?: on)?">[^<]*</span>)+</div>',
                     lambda m: '<div class="hx2-tags">%s</div>' % build_tags(pack['sector_tags'][lang], lang, X,
                                                                            'sector_tags.' + lang),
                     tree, w + ' hx2-tags', 1)

    # 7. targeting card chips: [cities, company types]
    m = re.search(r'<i aa-icon="check"><svg[^>]*>.*?</svg></i>', tree, re.S)
    if not m:
        fail(w + ' targeting card: check icon not found')
    check_icon = m.group(0)
    chip_sets = [pack['targeting']['cities'][lang], pack['targeting']['company_types'][lang]]
    names = ['targeting.cities.' + lang, 'targeting.company_types.' + lang]
    idx = iter(range(2))

    def chips_rep(_m):
        i = next(idx)
        return '<div class="chips">%s</div>' % build_chips(chip_sets[i], lang, X, check_icon, names[i])
    tree = sub_count(r'<div class="chips">(?:<span class="gchip c-(?:on|off)">.*?</span>)+</div>', chips_rep,
                     tree, w + ' targeting chips', 2)

    # 8. FAQ list
    start = tree.find('<div class="faq">')
    end = tree.find('</div></div></section>', start)
    if start < 0 or end < 0 or tree.count('<div class="faq">') != 1:
        fail(w + ' FAQ: <div class="faq"> block not found')
    block = tree[start:end + len('</div>')]
    if not block.endswith('</details></div>') or block.count('<details') != 18:
        fail(w + ' FAQ: unexpected structure (expected 18 <details>)')
    m = re.search(r'<i aa-icon="chevron-down">.*?</i>', block, re.S)
    if not m:
        fail(w + ' FAQ: chevron icon not found')
    tree = tree[:start] + '<div class="faq">' + build_faq(pack, lang, X, m.group(0)) + '</div>' + tree[end + len('</div>'):]
    return tree


# --------------------------------------------------------------------------
# verification
# --------------------------------------------------------------------------
class _Visible(HTMLParser):
    SKIP = {'script', 'style', 'svg'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.chunks = []

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self.depth += 1
        for k, v in attrs:
            if k in ('alt', 'title', 'aria-label', 'placeholder', 'content') and v:
                self.chunks.append(v)

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.depth:
            self.depth -= 1

    def handle_data(self, data):
        if not self.depth:
            self.chunks.append(data)


def visible_text(fragment):
    p = _Visible()
    p.feed(fragment)
    p.close()
    return re.sub(r'\s+', ' ', ' '.join(p.chunks))


def without_testimonials(tree):
    i = tree.find('<div class="marquee">')
    if i < 0:
        fail('verify: testimonials marquee not found')
    s = tree.rfind('<section', 0, i)
    e = tree.find('</section>', i)
    return tree[:s] + tree[e + len('</section>'):]


def leftover_hits(text):
    hits = []
    for t in SOURCE_TERMS_LATIN:
        flags = 0 if t in ('SAR', 'KSA', 'Kingdom') else re.I
        hits += re.findall(r'\b%s\w*' % re.escape(t), text, flags)
    for t in SOURCE_TERMS_AR:
        hits += re.findall(r'(?<![\u0600-\u06FF])[وبلف]?%s(?![\u0600-\u06FF])' % re.escape(t), text)
    return hits


# --------------------------------------------------------------------------
# main build
# --------------------------------------------------------------------------
def build(source_path, pack_path, out_path, placeholders_md=None):
    with open(source_path, encoding='utf-8') as f:
        doc = f.read()
    pack = load_pack(pack_path)
    X = Expander(pack)
    font_count = doc.count('data:font/woff2;base64,')
    if font_count == 0:
        fail('source has no embedded fonts; pass the ORIGINAL source page, not the stripped copy')

    # neutral CSS hook names (the badge is no longer a KSA badge)
    doc = replace_once(doc, 'ksa-badge', 'mkt-badge', 'class rename ksa-badge', count=4)
    doc = replace_once(doc, 'ksa-flag', 'mkt-flag', 'class rename ksa-flag', count=4)

    # split into head | en | ar | tail
    i_en = doc.find(TREE_START['en'])
    i_ar = doc.find(TREE_START['ar'])
    i_js = doc.find('<script>', i_ar)
    if min(i_en, i_ar, i_js) < 0 or not i_en < i_ar < i_js:
        fail('source layout: expected #page-en, then #page-ar, then <script>')
    for k, v in TREE_START.items():
        if doc.count(v) != 1:
            fail('source layout: %s tree marker found %d times' % (k, doc.count(v)))
    head, en, ar, tail = doc[:i_en], doc[i_en:i_ar], doc[i_ar:i_js], doc[i_js:]

    en = transform_tree(en, 'en', pack, X)
    ar = transform_tree(ar, 'ar', pack, X)

    # head: title, description, extra CSS
    head = replace_once(head, HEAD_TITLE, '<title>%s</title>' % html.escape(pack['title']['en'], quote=False), 'head <title>')
    head = replace_once(head, HEAD_DESC, '<meta name="description" content="%s">' % attr(pack['meta_description']),
                        'head meta description')
    head = replace_once(head, CSS_END, EXTRA_CSS + CSS_END, 'head end of <style>')

    # script: titles, app hand-off
    link = pack['app_link']
    link_ar = link + ('&' if '?' in link else '?') + 'lang=ar'
    tail = replace_once(tail, JS_TITLE_AR, json.dumps(pack['title']['ar'], ensure_ascii=False), 'script AR title')
    tail = replace_once(tail, JS_TITLE_EN, json.dumps(pack['title']['en'], ensure_ascii=False), 'script EN title')
    tail = replace_once(tail, JS_KEY, JS_KEY + '  var APP_URL_EN = %s, APP_URL_AR = %s;\n'
                        % (json.dumps(link), json.dumps(link_ar)), 'script KEY line')
    tail = replace_once(tail, JS_SUBMIT, JS_SUBMIT_NEW, 'script submit hand-off')

    out = head + en + ar + tail

    # ---- verification ----
    problems = []
    if 'data:image' in out:
        problems.append('image data URIs remain (%d)' % out.count('data:image'))
    if out.count('data:font/woff2;base64,') != font_count:
        problems.append('embedded font count changed')
    if re.search(r'\{\{|\}\}', en + ar):
        problems.append('unresolved {{tokens}} in output')
    if re.search(r'''(?:src|href)\s*=\s*["']?(?:https?:)?//''', head + tail) or re.search(r'@import|url\(\s*["\']?https?:', out):
        problems.append('external resource reference in head/script')
    if re.search(r'<(?:img|script|link|iframe)[^>]+(?:src|href)=["\']?https?:', en + ar):
        problems.append('external resource reference in a language tree')
    for lang, tree in (('en', en), ('ar', ar)):
        hits = leftover_hits(visible_text(without_testimonials(tree)))
        if hits:
            problems.append('%s tree: leftover source-country text outside testimonials: %s'
                            % (lang, ', '.join(sorted(set(hits)))))
        if tree.count('<details') != len(pack['faq'][lang]):
            problems.append('%s tree: FAQ item count mismatch' % lang)
    for key, st in pack['stats'].items():
        for lang in LANGS:
            if (key, lang) not in X.used:
                problems.append('stat "%s" is never used in the %s tree' % (key, lang))
    head_text = visible_text(re.sub(r'<style>.*?</style>', '', head, flags=re.S))
    if leftover_hits(head_text):
        problems.append('head: leftover source-country text: %s' % ', '.join(leftover_hits(head_text)))
    if problems:
        fail('verification failed:\n  - ' + '\n  - '.join(problems))

    md_text = placeholders_markdown(pack, X, out_path) if placeholders_md else None

    # write only after every check has passed (temp file + rename, so a failed
    # build never leaves a half-written page behind)
    write_atomic(out_path, out)
    if md_text is not None:
        write_atomic(placeholders_md, md_text)

    n_ph = len(re.findall(r'class="ph"', out))
    c = pack['country']
    print('make_landing: wrote %s (%.2f MB) for %s (%s)'
          % (out_path, len(out.encode('utf-8')) / 1e6, c['name']['en'], c['code']))
    print('  slots replaced: %d per tree; FAQ items: %d; employer wordmarks: %d; placeholder marks: %d; fonts kept: %d'
          % (len(SLOTS), len(pack['faq']['en']), sum(len(r) for r in pack['employers']['rows']), n_ph, font_count))
    print('  live-card flag: %s' % ('sample (placeholder figures)' if live_card_is_sample(pack, 'en') else 'live'))
    print('  legal links: %s' % ', '.join('%s=%s' % (k, 'pack' if k in pack.get('links', {}) else 'KSA default')
                                         for k in LEGAL_LINKS))
    print('  app hand-off: %s (AR: %s)' % (link, link_ar))
    if md_text is not None:
        print('  placeholders list: %s' % placeholders_md)
    return out


def write_atomic(path, text):
    d = os.path.dirname(os.path.abspath(path))
    fd, tmp = tempfile.mkstemp(prefix='.make_landing.', dir=d)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            f.write(text)
        os.chmod(tmp, 0o644)
        os.replace(tmp, path)
    except BaseException:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def placeholders_markdown(pack, X, out_path):
    c = pack['country']
    code = c['code']
    L = ['# Placeholder values on the %s (%s) landing page' % (c['name']['en'], code), '',
         'Generated by `make_landing.py` from `packs/%s.json` for `%s`.' % (code.lower(), os.path.basename(out_path)),
         'Every value below renders on the page in the amber placeholder style (class `ph`, dashed underline, '
         'tooltip "%s"). To ship a real figure, set the value in `stats` and change `"placeholder": true` to '
         '`false`, then rebuild.' % pack['placeholder_tooltip']['en'], '',
         '| Token | EN value | AR value | Where on the page | Replace with |', '|---|---|---|---|---|']
    for key, st in pack['stats'].items():
        if not st.get('placeholder'):
            continue
        uses = ' / '.join('%s ×%d' % (lang.upper(), X.used.get((key, lang), 0)) for lang in LANGS)
        L.append('| `%s` | %s | %s | %s (%s) | %s |' % (key, st['en'], st['ar'], st.get('where', ''), uses,
                                                       st.get('replace_with', '')))
    sample = [l for l in LANGS if live_card_is_sample(pack, l)]
    if sample:
        toks = sorted(set(live_card_tokens(pack, 'en') + live_card_tokens(pack, 'ar')))
        L.append('| `live_flag` (automatic) | %s | %s | Hero live card, flag above the figures (%s) | Nothing to edit. '
                 'The flag shows this amber label, with the green "live" pulse switched off, while any live-card '
                 'figure (%s) is a placeholder. It switches back to "%s" / "%s" by itself once those stats are '
                 '`"placeholder": false`. |'
                 % (text_of(pack['text']['en']['live_flag_sample']), text_of(pack['text']['ar']['live_flag_sample']),
                    ' / '.join(l.upper() + ' ×1' for l in sample), ', '.join('`%s`' % t for t in toks) or 'none',
                    text_of(pack['text']['en']['live_flag']), text_of(pack['text']['ar']['live_flag'])))
    notes = list(pack.get('review_notes') or [])
    defaults = [k for k in LEGAL_LINKS if k not in pack.get('links', {})]
    if defaults:
        notes.append({'item': 'Footer legal links (automatic check)',
                      'note': 'This pack sets no `links.%s`, so the footer still points to the KSA page%s: %s.'
                              % ('`/`links.'.join(defaults), 's' if len(defaults) > 1 else '',
                                 ', '.join(LEGAL_LINKS[k] for k in defaults))})
    if notes:
        L += ['', '## Other content to confirm before launch', '',
              'These are not marked on the page, but they are stand-ins or judgement calls that need a real answer.', '']
        for n in notes:
            L.append('- **%s**: %s' % (n['item'], n['note']))
    L.append('')
    return '\n'.join(L)


def main(argv):
    args = argv[1:]
    md = None
    if '--placeholders' in args:
        i = args.index('--placeholders')
        if i + 1 >= len(args):
            print(__doc__, file=sys.stderr)
            return 2
        md = args[i + 1]
        del args[i:i + 2]
    if len(args) != 3:
        print(__doc__, file=sys.stderr)
        return 2
    try:
        build(args[0], args[1], args[2], md)
    except BuildError as e:
        print('make_landing: ERROR: %s' % e, file=sys.stderr)
        return 1
    except (KeyError, TypeError, ValueError, AttributeError, IndexError) as e:
        # a pack shape the up-front checks did not anticipate; nothing has been written
        print('make_landing: ERROR: malformed pack (%s: %s); nothing was written' % (type(e).__name__, e),
              file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
