# Uptal Auto-Apply v6 — multi-market build

v5 is a KSA-only prototype (EN + Gulf Arabic). v6 adds ~28 markets with a persona each, French, and a neutral
Arabic for non-GCC markets. The whole app switches when the demo "market persona" selector changes.

## Decisions (from the founder)
- Tailor to residence + target markets. Residence drives price, currency, tax, payment methods, Arabic variant.
  Primary target market drives jobs, employers, cities, salaries, work rights, nationalisation rules.
- Before payment: only WHERE (target countries, cities, remote) + ROLES. Paywall counts all matching jobs.
  Everything else (work rights, about you, salary, gender, languages, employer types, focus order, blocklist,
  alerts) is collected after payment, before Auto-Apply starts.
- Hard paywall everywhere. Local price tiers (placeholders, in markets/base.json).
- Local payment methods per market.
- Languages: EN, AR, FR. Arabic: Gulf dialect (v5) for the 6 GCC markets; neutral "white" Arabic, closer to
  formal, for every other market.
- Persona per market (templated), mix of women and men, all finance professionals (Financial Analyst / FP&A).
- People living outside our markets can join if they target one of them (international USD tier).
- Whole app adapts, not just onboarding.

## Markets (28 + INTL tier)
GCC: SA AE QA KW BH OM · North America: US CA · UK & Ireland: GB IE · Europe: DE FR NL BE ES IT PL SE CH ·
Australia: AU · North Africa: EG MA TN DZ LY · Levant & Iraq: JO LB IQ.

## Token grammar (in any copy string)
| token | meaning |
|---|---|
| `{@id}` | entity value from the registry (see markets/registry.json), e.g. `{@city.riyadh}`, `{@co.aramco}`, `{@ctry.n}` |
| `{@p.x}` | persona field, e.g. `{@p.first}`, `{@p.full}`, `{@p.email}` |
| `{@g:male form|female form}` | persona-gender alternation. Use wherever grammar depends on the persona's gender (Arabic 2nd person verbs/adjectives/pronoun suffixes, French adjectives/participles, English he/she/his/her). Male form first. |
| `{@$:399}` | product price given in SAR; converted to the residence market and formatted with its currency (KSA: `399 ¤`). |
| `{@$n:399}` | same, number only. `{@$c}` currency symbol (KSA `¤`). `{@$code}` ISO code (KSA `SAR`). |
| `{@sal:26000}` | salary amount given in SAR per month; converted to the target market's level and period, with currency. |
| `{@saln:26000}` | same, number only. `{@salk:38000-45000}` compact range (KSA EN `38-45k ¤`, KSA AR `38-45 ألف ¤`). |
| `{@per}` `{@perw}` `{@pers}` | salary period of the target market: "a month"/"a year", "month"/"year", "/mo"/"/yr" (localized). |

`{@id|literal}` escape hatch: when the token's scope is KSA the literal (exact v5 wording) is used, otherwise
the token resolves normally. Use it when v5 phrases a market thing irregularly (e.g. `{@per|بالشهر}`).

Arabic: a standalone prefix ل written right before a token whose value starts with ال contracts automatically (ل{@city.riyadh} → للرياض); ب/و/ك + ال need nothing.

Rules: tokens never nest. Keep all non-market wording identical. The KSA expansion of a tokenized string must
equal the v5 string exactly (`tools/verify.js` enforces it; `{@g:..}` may match either side).

Entity scope: ids starting `pay. tax. cur. phone. legal. res.` resolve against the RESIDENCE market; `p.` against
the persona; everything else against the PRIMARY TARGET market.

## Files
- `markets/base.json` central table (regions, currency format, price tiers).
- `markets/registry.json` every entity id with its KSA EN + AR value and archetype.
- `markets/packs/XX.json` one per market: `{code, name, ent:{id:{en,ar,fr}}, cities, employers, logos, sal, tax, pay, phone, rights, sensitive, legal, boards, lang2}`.
- `markets/personas.json` built from `markets/roster.json` + pack persona fields.
- `i18n/tok-en.json`, `tok-gulf.json`, `tok-neutral.json`, `tok-fr.json` tokenized dictionaries (key → string).
- `i18n/tokobj.json` tokenized inline `{en,ar}` structures; `i18n/newkeys-*.json` v6-only keys.
- `patches/NN-*.json` exact source patches to v5 (old must match exactly `count` times).
- `js/engine.js` (MKT API), `js/NN-*.js` modules, `css/*.css`.
- `build.py` → `../Uptal_AutoApply_v6_MultiMarket.html`; `tools/verify.js`, `tools/smoke.js`, `tools/sweep.js`.

## MKT API (js/engine.js)
`MKT.set(personaId)`, `MKT.persona()`, `MKT.res()`, `MKT.tgt()`, `MKT.isSA()`,
`MKT.money(sar)`, `MKT.moneyNum(sar)`, `MKT.moneyHTML(sar)` (KSA keeps the SAR glyph), `MKT.salary(sarMonthly)`,
`MKT.salHTML(sarMonthly)`, `MKT.curText()`, `MKT.ent(id)`, `MKT.lget({en,ar,fr})`, `MKT.expand(str, lang)`,
`MKT.registerObj(name, getter, setter)` + `MKT.tokObj[name]` for inline structures, `MKT.onChange(fn)`.
`sarHTML()` is wrapped so any raw `N ¤` converts at the residence price rate (safety net, not the main path).
