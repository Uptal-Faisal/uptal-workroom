#!/usr/bin/env python3
"""Fast offline check of a tokenized chunk against the v5 originals (KSA identity) — no browser needed.

  python3 -I tools/verify_chunk.py i18n/parts/tok-07.json [data/chunks/dict-07.json]

The part file maps key -> {"en":..., "gulf":..., "neutral":..., "fr":...} (missing en/gulf = unchanged from v5).
Checks:
  1. KSA expansion of en == v5 en, gulf == v5 ar  ({@g:m|f} may match either side; {@x|lit} uses lit)
  2. every {@id} is in markets/registry.json (or is a built-in op / persona field p.*)
  3. neutral and fr exist for every key, have the same token ids as en (except g-tokens), and no '¤' or 'SAR' leak
Exit code 1 on any failure; prints a compact report.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = json.load(open(os.path.join(HERE, 'markets', 'registry.json'), encoding='utf-8'))
ENT = REG.get('entities', REG)
OPS = {'g', '$', '$n', '$c', '$code', 'sal', 'saln', 'salk', 'per', 'perw', 'pers'}
TOKRX = re.compile(r'\{@([^{}]+)\}')


def grp(n):
    return f'{int(round(n)):,}'


def ksa(body, lang):
    if not body.startswith('g:') and '|' in body:
        return body.split('|', 1)[1]
    op, _, arg = body.partition(':')
    if op == '$' or op == 'sal':
        return grp(float(arg)) + ' ¤'
    if op == '$n' or op == 'saln':
        return grp(float(arg))
    if op == '$c':
        return '¤'
    if op == '$code':
        return 'SAR'
    if op == 'salk':
        a, b = [float(x) for x in arg.split('-')]
        big = a >= 1000
        k = lambda v: grp(round(v / 1000)) if v >= 1000 else grp(v)
        if lang == 'ar':
            return f'{k(a)}-{k(b)}' + (' ألف' if big else '') + ' ¤'
        return f'{k(a)}-{k(b)}' + ('k' if big else '') + ' ¤'
    if op in ('per', 'perw', 'pers'):
        return {'per': {'en': 'a month', 'ar': 'شهرياً'}, 'perw': {'en': 'month', 'ar': 'شهر'}, 'pers': {'en': '/mo', 'ar': '/شهر'}}[op][lang]
    e = ENT.get(body)
    if e is None:
        raise KeyError(body)
    v = e.get(lang if lang == 'en' else 'ar')
    if v is None:
        raise KeyError(body + ' (no KSA ' + lang + ' value)')
    return v


def matcher(tok, lang):
    rx, last = '', 0
    for m in re.finditer(r'\{@g:([^{}]*)\}', tok):
        rx += re.escape(expand(tok[last:m.start()], lang))
        rx += '(?:' + '|'.join(re.escape(expand(a, lang)) for a in m.group(1).split('|')) + ')'
        last = m.end()
    rx += re.escape(expand(tok[last:], lang))
    return re.compile('^' + rx + '$', re.S)


def expand(s, lang):
    return TOKRX.sub(lambda m: ksa(m.group(1), lang), s)


def ids(s):
    out = []
    for b in TOKRX.findall(s or ''):
        if b.startswith('g:'):
            continue
        out.append(b.split('|', 1)[0].split(':', 1)[0] if b.split(':', 1)[0] in OPS else b.split('|', 1)[0])
    return out


def main():
    part = json.load(open(sys.argv[1], encoding='utf-8'))
    src = sys.argv[2] if len(sys.argv) > 2 else None
    if not src:
        n = re.search(r'(\d+)', os.path.basename(sys.argv[1])).group(1)
        src = os.path.join(HERE, 'data', 'chunks', f'dict-{n}.json')
    orig = json.load(open(src, encoding='utf-8'))
    bad, warn = [], []
    for k, o in orig.items():
        r = part.get(k)
        if r is None:
            bad.append((k, 'missing key in part file'))
            continue
        for L, src_lang, ol in (('en', 'en', o['en']), ('gulf', 'ar', o['ar'])):
            t = r.get(L)
            if t is None:
                continue
            try:
                if not matcher(t, src_lang).match(ol):
                    bad.append((k, f'{L} KSA mismatch\n      v5 : {ol}\n      got: {expand(t, src_lang)}'))
            except KeyError as e:
                bad.append((k, f'{L} unknown token id {e}'))
        for L in ('neutral', 'fr'):
            t = r.get(L)
            if not t:
                bad.append((k, f'{L} missing'))
                continue
            if '¤' in t or re.search(r'\bSAR\b', t):
                bad.append((k, f'{L} has raw currency (use {{@$:N}} / {{@$c}} tokens)'))
            for i in ids(t):
                if i not in OPS and not i.startswith('p.') and i not in ENT:
                    bad.append((k, f'{L} unknown token id {i}'))
        en_ids = sorted(set(ids(r.get('en') or o['en'])))
        for L in ('gulf', 'neutral', 'fr'):
            t = r.get(L) or (o['ar'] if L == 'gulf' else '')
            if t and sorted(set(ids(t))) != en_ids:
                warn.append((k, f'token set differs en={en_ids} {L}={sorted(set(ids(t)))} (ok only if intentional)'))
        for L in ('en', 'gulf', 'neutral', 'fr'):
            t = r.get(L) or ''
            if t.count('{@') != len(TOKRX.findall(t)):
                bad.append((k, f'{L} malformed token'))
    extra = [k for k in part if k not in orig]
    print(f'{os.path.basename(sys.argv[1])}: {len(orig)} keys, {len(bad)} problems, {len(warn)} warnings, {len(extra)} extra keys')
    for k, msg in bad[:60]:
        print(' -', k, msg)
    for k, msg in warn[:20]:
        print(' ~', k, msg)
    sys.exit(1 if bad or extra else 0)


if __name__ == '__main__':
    main()
