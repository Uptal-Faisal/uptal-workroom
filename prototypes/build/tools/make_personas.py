#!/usr/bin/env python3
"""markets/roster.json + markets/packs/XX.core.json persona blocks (+ markets/personas-extra.json) -> markets/personas.json

Persona 'f' holds the persona token values (p.* ids, each {en,ar,fr} or a plain string). For SA the values are
the exact v5 surface forms taken from markets/registry.json (KSA identity). Other personas take their values from
markets/packs/<code>.persona.json (written by the ent-mapping step) when present, else a minimal set derived
from the roster + core persona block.
"""
import json, os, glob

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = os.path.join(HERE, 'markets')


def load(p, d=None):
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else d


roster = load(os.path.join(M, 'roster.json'))['personas']
reg = load(os.path.join(M, 'registry.json'), {})
ents = reg.get('entities', reg) if isinstance(reg, dict) else {}
base = load(os.path.join(M, 'base.json'))
FLAG = {}
for fp in glob.glob(os.path.join(M, 'packs', '*.core.json')):
    c = load(fp)
    FLAG[c['code']] = c.get('flag', '')
FLAG.setdefault('SA', '🇸🇦')
FLAG.setdefault('INTL', '🌐')
out = []
for r in roster:
    f = {}
    if r['id'] == 'SA':
        for k, v in ents.items():
            if k.startswith('p.'):
                f[k[2:]] = {x: v[x] for x in ('en', 'ar', 'arn', 'fr') if v.get(x) is not None}
    else:
        pf = load(os.path.join(M, 'packs', f"{r['id']}.persona.json"))
        if pf:
            f = pf.get('f', pf)
        else:
            core = load(os.path.join(M, 'packs', f"{r['targets'][0] if r['id'].startswith('X-') else r['id']}.core.json"), {})
            p = core.get('persona', {}) if not r['id'].startswith('X-') else {}
            first, last = r['name'].split(' ', 1)
            f = {'first': first, 'last': last, 'full': r['name'], 'initials': first[0] + last.split(' ')[-1].replace('Al-', '').replace('El-', '')[0]}
            for k in ('email', 'phone', 'title', 'employer', 'employer2', 'degree', 'bio'):
                if p.get(k) is not None:
                    f[k] = p[k]
    flag = FLAG.get(r['res'], '') if not r['id'].startswith('X-') else (FLAG.get(r['res'], '🌐') + '→' + ''.join(FLAG.get(t, '') for t in r['targets']))
    city = r['city']
    out.append({
        'id': r['id'], 'res': r['res'], 'targets': r['targets'], 'gender': r['gender'], 'nat': r['nat'],
        'group': r['group'], 'city': city, 'arv': (base['markets'].get(r['res']) or base['markets']['INTL'])['arVariant'],
        'label': f"{flag} {r['name']} · {city}", 'f': f,
    })
json.dump(out, open(os.path.join(M, 'personas.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('personas', len(out))
