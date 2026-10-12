#!/usr/bin/env python3
"""Assemble the v6 multi-market prototype from the v5 source.

  python3 -I build.py [--out path.html]   -> ../Uptal_AutoApply_v6_MultiMarket.html (default)

Inputs (all under build/):
  ../src/v5.html                 untouched v5 source
  patches/*.json                 ordered source patches: [{"old": str, "new": str, "count": int|null, "why": str}]
                                 'old' must occur exactly `count` times (default 1) or the build fails.
  markets/base.json              central market table (currency, price tiers, regions)
  markets/packs/*.json           per-market packs (ent map, cities, employers, logos, payments, rights...)
  markets/personas.json          persona list
  i18n/tok-*.json                tokenized dictionaries: en, gulf, neutral, fr  ({key: tokenized string})
  i18n/tokobj.json               tokenized inline structures {name: structure}
  i18n/newkeys-*.json            v6-only keys per language
  js/*.js                        engine.js first, then the rest in name order
  css/*.css                      appended into <head>
  html/*.html                    {"anchor": ..., "html": ...} insertions are done via patches instead
"""
import json, os, glob, sys, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'src', 'v5.html')
OUT = os.path.join(HERE, '..', 'Uptal_AutoApply_v6_MultiMarket.html')


LENIENT = '--lenient' in sys.argv   # QA builds while other agents are mid-write: skip broken parts/patches, warn


def load(p, default=None):
    if not os.path.exists(p):
        return default
    try:
        with open(p, encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        if LENIENT:
            print(f'WARN skipped unreadable {os.path.relpath(p, HERE)}: {e}', file=sys.stderr)
            return default
        raise


def js_json(obj):
    s = json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
    return s.replace('</', '<\\/')


def apply_patches(html):
    files = sorted(glob.glob(os.path.join(HERE, 'patches', '*.json')))
    n = 0
    for fp in files:
        for i, p in enumerate(load(fp, []) or []):
            old, new = p['old'], p['new']
            want = p.get('count', 1)
            got = html.count(old)
            bad = (got == 0) if want is None else (got != want)
            if bad:
                msg = f'PATCH FAIL {os.path.basename(fp)}#{i}: expected {want} got {got}: {old[:120]!r}'
                if LENIENT:
                    print('WARN ' + msg, file=sys.stderr)
                    continue
                sys.exit(msg)
            html = html.replace(old, new)
            n += 1
    return html, n, len(files)


def main():
    out = OUT
    if '--out' in sys.argv:
        out = os.path.abspath(sys.argv[sys.argv.index('--out') + 1])
    html = open(SRC, encoding='utf-8', newline='').read()
    html, npatch, nfiles = apply_patches(html)

    base = load(os.path.join(HERE, 'markets', 'base.json'))
    # a market pack = XX.core.json (researched facts) + XX.ent.json (entity map for tokens) [+ XX.json overrides]
    packs = {}
    pdir = os.path.join(HERE, 'markets', 'packs')
    codes = sorted({os.path.basename(f).split('.')[0] for f in glob.glob(os.path.join(pdir, '*.json'))})
    for code in codes:
        pk = {}
        for part in (f'{code}.core.json', f'{code}.ent.json', f'{code}.json'):
            d = load(os.path.join(pdir, part))
            if not d:
                continue
            for k, v in d.items():
                if k == 'ent' and isinstance(v, dict):
                    pk.setdefault('ent', {}).update(v)
                else:
                    pk[k] = v
        pk['code'] = code
        b = base['markets'].get(code, {})
        pk['cur'] = b.get('cur', pk.get('cur'))
        pk['price'] = b.get('price', pk.get('price'))
        packs[code] = pk
    # KSA = the registry itself (exact v5 surface forms), plus ids proposed by tokenizers/sweepers
    reg = dict((load(os.path.join(HERE, 'markets', 'registry.json'), {}) or {}).get('entities', {}))
    for fp in sorted(glob.glob(os.path.join(HERE, 'markets', 'registry-proposals', '*.json'))):
        d = load(fp, {}) or {}
        for k, v in (d.get('entities', d)).items():
            reg.setdefault(k, v)
    sa_ent = {k: {x: v[x] for x in ('en', 'ar', 'arn', 'fr') if isinstance(v, dict) and v.get(x) is not None}
              for k, v in reg.items() if not k.startswith('p.')}
    packs.setdefault('SA', {'code': 'SA'})['ent'] = sa_ent
    personas = load(os.path.join(HERE, 'markets', 'personas.json'), [])
    LANGS = ('en', 'gulf', 'neutral', 'fr')
    I18N = os.path.join(HERE, 'i18n')
    # tokenized dictionary: whole-language files + per-chunk parts {key: {en, gulf, neutral, fr}}
    tok = {L: load(os.path.join(I18N, f'tok-{L}.json'), {}) for L in LANGS}
    for fp in sorted(glob.glob(os.path.join(I18N, 'parts', 'tok-*.json'))):
        for k, v in load(fp, {}).items():
            for L in LANGS:
                if isinstance(v, dict) and v.get(L) is not None:
                    tok[L][k] = v[L]
    # inline {en,ar} structures: tokobj.json + tokobj-parts/NAME.json ({NAME: structure})
    tokobj = load(os.path.join(I18N, 'tokobj.json'), {})
    for fp in sorted(glob.glob(os.path.join(I18N, 'tokobj-parts', '*.json'))):
        tokobj.update(load(fp, {}))
    # MSAQ is swept in two halves (MSAQ_A = items 0-11, MSAQ_B = items 12-23)
    if 'MSAQ_A' in tokobj or 'MSAQ_B' in tokobj:
        tokobj['MSAQ'] = (tokobj.pop('MSAQ_A', None) or []) + (tokobj.pop('MSAQ_B', None) or [])
    # v6-only keys: newkeys-L.json + newkeys-parts/*.json ({key: {en, gulf, neutral, fr}})
    newkeys = {L: load(os.path.join(I18N, f'newkeys-{L}.json'), {}) for L in LANGS}
    for fp in sorted(glob.glob(os.path.join(I18N, 'newkeys-parts', '*.json'))):
        for k, v in load(fp, {}).items():
            for L in LANGS:
                if isinstance(v, dict) and v.get(L) is not None:
                    newkeys[L][k] = v[L]

    data = ('<script>/* ==== v6 market data ==== */\n'
            f'window.MARKET_BASE={js_json(base)};\n'
            f'window.MARKET_PACKS={js_json(packs)};\n'
            f'window.MARKET_PERSONAS={js_json(personas)};\n'
            f'window.MARKET_TOK={js_json(tok)};\n'
            f'window.MARKET_TOKOBJ={js_json(tokobj)};\n'
            f'window.MARKET_NEWKEYS={js_json(newkeys)};\n'
            '</script>\n')
    jsfiles = sorted(glob.glob(os.path.join(HERE, 'js', '*.js')))
    jsfiles.sort(key=lambda p: (os.path.basename(p) != 'engine.js', os.path.basename(p)))
    js = ''.join('<script>\n' + open(p, encoding='utf-8').read() + '\n</script>\n' for p in jsfiles)
    css = ''.join(open(p, encoding='utf-8').read() + '\n' for p in sorted(glob.glob(os.path.join(HERE, 'css', '*.css'))))
    if css:
        # v5 has no real </head> (the only ones live inside JS strings): insert after the last <style> block before the first <script>
        first_script = html.find('<script')
        i = html.find('</head>')
        if i < 0 or (first_script >= 0 and i > first_script):
            i = html.rfind('</style>', 0, first_script if first_script >= 0 else len(html)) + len('</style>')
        html = html[:i] + '\n<style>/* ==== v6 ==== */\n' + css + '</style>\n' + html[i:]
    # v5 has no closing </body>; inject after the final </script> of the document
    i = html.rindex('</script>') + len('</script>')
    html = html[:i] + '\n' + data + js + html[i:]
    html = html.replace('<title>Uptal Auto-Apply, Paywall After Onboarding, v5</title>',
                        '<title>Uptal Auto-Apply, Multi-Market, v6</title>', 1)
    with open(out, 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print(f'wrote {os.path.relpath(out)}  {len(html)/1e6:.2f} MB  patches={npatch} from {nfiles} files  packs={len(packs)}  personas={len(personas)}  '
          f'tok=' + ','.join(f'{L}:{len(tok[L])}' for L in tok))


if __name__ == '__main__':
    main()
