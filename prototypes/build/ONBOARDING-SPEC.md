# v6 onboarding + paywall + checkout + post-payment setup — spec

Founder decisions: tailor to residence + target markets; BEFORE payment collect only WHERE + ROLES; paywall counts
all matching jobs; hard paywall; local prices + local payment methods; everything else AFTER payment, before
Auto-Apply starts. Minimise steps. Smart defaults from the CV and the detected location.

Read first: `build/DESIGN.md` (token grammar, MKT API), `build/markets/PACK-SPEC.md` (pack fields you consume),
`build/js/engine.js`, and the v5 screens in `src/v5.html` (welcome / targets / profile / blocklist / wall / payOtp /
checkout / subDone / aboutYou / autopilot / live, lines ~4376-4730 and 5123-5403) plus their JS
(grep `pfAdapt`, `pfSync`, `termpick`, `data-paymeth`, `BNPL_DATES`, `PLANS`, `HOOKS[`, `payOtp`).
Also the earlier multi-region prototype `src/onboarding-multi-region.html` — reuse its ideas (regions → countries,
"Anywhere in X" city switch, remote toggle, focus order, per-country work-rights cards that auto-answer citizens),
restyled with v5's design language (setcard, chips, tgl, btn-b/btn-p, lenschip, setup progress bar).

## Flow
PRE-PAYMENT (2 steps after welcome)
1. `welcome` (v5 screen, keep): progress 40%. Copy says CV read, roles found across the target market, and
   "2 quick things left: where you want to work and your roles". CTA → `where`.
2. `where` (NEW) "Step 1 of 2":
   - "You're based in {city}, {country}" card, detected from connection + CV, with Change (sheet: our 28 markets
     grouped by region + "Somewhere else" → international tier). Changing residence changes price/currency/payments.
   - "Where do you want to work?" Target countries as chips; persona targets preselected; the residence market has
     a "You're here" tag. "Add a country" opens a sheet: regions (from MARKET_BASE.regions) → countries.
   - Per selected country: city chips from `pack.cities` (prefilled: persona city + next 1-2), an
     "Anywhere in {country}" switch, the metro note.
   - "Remote roles too" toggle (from {persona city}).
   - Footer meta "N countries + remote selected". CTA Continue.
3. `targets` (v5 screen, slimmed) "Step 2 of 2": ONLY target roles (role chips from CV + Add role).
   Cities card, employer types card and the Auto-Apply toggle move out (cities live in `where`; employer types +
   Auto-Apply mode go to post-payment `tune`). CTA "See my matches" → `wall`.
4. `wall` paywall: count = all matching jobs in the chosen places (persona base count, scaled by places; keep the
   v5 numbers for KSA). Job feed rows come from the PRIMARY target market employers. Plans/prices via tokens.
   BNPL line only if `res.pay.bnpl` is non-empty, naming those providers and their installment count.
5. `payOtp` (keep) → `checkout`: build the payment area from the RESIDENCE pack: express wallet button
   (Apple Pay / Google Pay / none), method tiles from `pay.methods` + `pay.bnpl` (keep v5's card / BNPL panels and
   schedule logic, generalised), card brands incl. `pay.localCardBrand` (mada, KNET, BENEFIT, CB, Bancontact,
   Meeza...), tax line `tax.label` (+ "plus applicable tax" style when `tax.incl` is false), renewal line +
   `legal.renewal`, "Trusted by candidates across {region}". KSA must look exactly like v5.
POST-PAYMENT ("Finish setup", before Auto-Apply starts; progress "Setup · Step k of n")
6. `subDone` (keep) CTA → `rights`.
7. `rights` (NEW) "Can you work in these countries?" one card per target country, in focus order:
   auto-answered card when the persona's citizenship is in `pack.rights.autoFor` (also GCC citizen in any GCC
   market, EU/EEA/CH citizen in EU markets + CH, GB/IE common travel area), with "Not right?" to override; otherwise
   the `rights.q` options (radio). US: two yes/no questions (authorised? need sponsorship now or later?) + note that
   EEO questions are voluntary and answered "Prefer not to say" unless changed. Show `rights.rule` and the
   `nationalisation.desc` line when present. Remote note when remote is on.
8. `profile` (v5 "About you" form, moved here and tailored by the target market's `sensitive` block):
   employment status + notice (default `pack.noticeDays`), nationality (prefilled from CV; only shown where
   `sensitive.nationality==='ask'`, otherwise read-only chip), gender only where `sensitive.gender==='ask'`
   (US 'eeo' → a voluntary self-ID group defaulting to Prefer not to say; 'none' → hidden), languages (English level +
   `lang2` level when set + Arabic where relevant), salary: current in RESIDENCE currency/period, expected per target
   market in that market's currency/period, photo card only where `sensitive.photo !== 'avoid'`.
   Remove v5's "Visa and Iqama status" card (now in `rights`). Keep v5's settings mode (pfMode) working.
9. `aboutYou` (keep: bio + photo, photo hidden where `avoid`).
10. `tune` (NEW, short): employer types (v5 chips), Auto-Apply mode toggle (default on), and focus order
    (only when 2+ places: rank rows with up/down + "when these run low" rule from the multi-region prototype).
11. `blocklist` (v5, keep; current employer from the persona pack seeded) → `autopilot` (v5 alerts/pace) → `live`.

## Engineering rules
- Deliver: `build/patches/50-onboarding.json` (exact old→new patches on src/v5.html; each old string must occur
  exactly `count` times; prefer replacing whole `<section ...>` blocks you own), `build/js/50-onboarding.js`,
  `build/css/50-onboarding.css`, and new copy keys (prefix `ob6`) in `build/i18n/newkeys-en.json`,
  `newkeys-gulf.json` (Gulf Arabic, v5 register), `newkeys-neutral.json` (neutral formal-leaning Arabic),
  `newkeys-fr.json` (French, vouvoiement). New keys may use tokens. Read existing newkeys files first and MERGE
  (other modules add keys too).
- All copy through `data-t` keys or `T[lang][key]`; never hard-code text. Use `MKT.*` for money, persona,
  packs (`MKT.packs[code]`), `MKT.lget({en,ar,fr})`. Re-render on `MKT.onChange` and on language change (wrap
  `render` like v5 modules do: `var _r=render; render=function(){ _r(); ... }`).
- Keep the v5 jump menu (`#jump`) working; add new screens to it. Keep the lens chips (designer notes) on new
  screens, in the same style.
- State lives in one object `OB6` (residence, targets, cities per target, remote, roles, rights answers, focus
  order...) initialised from the persona on `MKT.onChange`.
- RTL must work (Arabic). Mobile first; check phone + desktop frames (`#devSeg`).
- Test: `python3 -I build/build.py`, then Playwright (node, require('/opt/node22/lib/node_modules/playwright'),
  chromium.launch(); do not install browsers). Walk the full flow for personas SA, AE, US, GB, DE, EG, MA (fr),
  X-EG-GCC, X-IN-GCC in EN/AR/FR; screenshot and LOOK; zero page errors.
