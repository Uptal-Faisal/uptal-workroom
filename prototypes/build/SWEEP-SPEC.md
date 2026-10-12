# v6 code + markup sweep — spec

Goal: everything a user can see in the v6 prototype must change with the market persona (`MKT.set`) and with the
language (EN / AR / FR). The DICTIONARY values (T.en / T.ar) are handled by the tokenizers — not you. You handle
everything else in your assigned line range of `src/v5.html`:

1. **Hard-coded visible text in HTML** (text not inside a `[data-t]` element): give the element a `data-t` with a
   NEW key (prefix `sw6`), and put the key's copy in your newkeys part (all four languages, tokenized). Exception:
   the bold lens-chip titles (`<b>Smart Defaults.</b>` etc.) stay English (designer annotations).
2. **JS string literals that reach the screen** without passing through `T[lang]` (template HTML, toasts, CV/receipt
   generators, aria labels...): replace with `T[lang].sw6Key` (new key in your part) or with an `MKT.*` call.
3. **Two-way language branches** (`lang==='ar' ? A : B`, `isAr ?`, `L==='ar'`): make them three-way. Prefer moving
   the text into T keys; for pure formatting use `lang==='fr'` branches.
4. **Inline structures with `en`/`ar` (or `*_en`/`*_ar`) fields** (NAV, OFFERS, PLANS.renew, BNPL_DATES, NEXT27,
   NEXT_CHARGE, advisors, courses, sessions, jobs, MSAQ...): write a tokenized snapshot of the WHOLE structure to
   `i18n/tokobj-parts/<NAME>.json` as `{"<NAME>": <structure>}` where every `en` gets tokenized, every `ar` stays
   Gulf Arabic (tokenized, gender tokens), and you ADD `arn` (neutral Arabic) next to each `ar` and `fr` next to each
   `en` (for `x_en`/`x_ar` add `x_arn` and `x_fr`). Numbers stay numbers. Then register it in your JS module:
   `MKT.registerObj('<NAME>', function(){ return <NAME>; });` — the engine expands it on every market change and
   swaps ar/arn by Arabic variant. Make consumers read `obj[lang]` / `obj['x_'+lang]` with an `en` fallback.
   Note `const` bindings are visible to your module by name (classic scripts share the global lexical scope).
5. **Money**: numbers rendered with the SAR glyph (`<span class="sar"...>`, `apSarHtml`, `bkSarify`, `ssSarHtml`,
   `sarHTML`, `toLocaleString` + glyph, receipts writing `SAR`). Decide per number whether it is a PRODUCT PRICE
   (subscription, add-on, pack, advisor session, course, refund) → `MKT.moneyHTML(sarAmount)` / `MKT.money(sar)`;
   or a SALARY (monthly SAR) → `MKT.salHTML(sarMonthly)` / `MKT.salary(sar)`. Keep arithmetic in SAR, convert at
   display. Receipts: currency code `MKT.res().cur.code`, tax label/rate from `MKT.res().tax`.
6. **Numbers/dates formatting**: `toLocaleString('en-US')` on user-visible numbers → `MKT.grp(n, lang)` (French uses
   thin spaces). Date strings in structures get an `fr` form ("27 septembre 2026").
7. **Market facts in code**: phone `+966…` → `MKT.ent('phone.ex')`; persona name/email/initials → `MKT.ent('p.full')`
   etc.; company logo classes `co-xx` are handled by the engine's logo CSS (leave the class names).
8. **Referral link / file names** (`uptal.com/r/noura`, `Noura_AlAmri.pdf`) → derive from the persona.

## Ownership — do NOT patch these (another agent owns them)
HTML screens: `welcome, where, targets, profile, blocklist, wall, payOtp, checkout, subDone, aboutYou, tune, rights,
autopilot, live`. JS: functions/blocks `pfEmployed pfIsSaudi pfAdapt pfSync pfTouch pfApplyMode pfBioPaint BIO
bioPaintAll photoPaint`, the `PLANS` / `PLAN` / `BNPL_DATES` DEFINITIONS and `planSetTerm planPaint planBnplOk
planIsBnpl`, the payOtp module (`PV`, lines ~13180-13300), `HOOKS['checkout'|'wall'|'subDone'|'payOtp'|'profile'|
'aboutYou']`, termpick handlers. If you find a problem there, list it under "deferred" in your report. Consumers of
PLANS elsewhere (plan, manage, receipts, cancel flow, topup) ARE yours.

## Deliverables (per sweeper NN — never write a shared file)
- `patches/30-sweep-NN.json`: `[{"old": exact source substring, "new": replacement, "count": occurrences, "why": short}]`
  `old` must be copied exactly from `src/v5.html` (use python to extract it; mind very long lines) and be unique
  (or give the exact count). Keep patches minimal and local. Patches apply in file order AFTER earlier patch files
  and BEFORE `50-onboarding.json`; never touch text inside the owned regions.
- `js/40-sweep-NN.js`: your registrations and helpers (wrap `render` if you need repaint: `var _r=render;
  render=function(){ _r(); ... }`). Must not throw if a structure is missing.
- `i18n/newkeys-parts/sweep-NN.json`: `{key: {"en","gulf","neutral","fr"}}` (tokenized; GLOSSARY + DESIGN rules).
- `i18n/tokobj-parts/<NAME>.json` per structure you own.
Verify: `cd build && python3 -I tools/make_personas.py && python3 -I build.py --out <your scratch>/sw-NN.html`, then
Playwright (`node`, require('/opt/node22/lib/node_modules/playwright')): for personas SA, GB, AE, EG and langs
en/ar/fr, `go()` every screen you touched, zero page errors, KSA still renders exactly as v5 for SA/en+ar.
