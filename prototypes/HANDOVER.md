# Handover: Uptal global expansion (v6 multi-market app, landings, legal)

Written 12 October 2026 when the founder asked to stop and hand over. Everything below is in the repo
`Uptal-Faisal/uptal-workroom`, branch `claude/inspiring-brown-5rl4en`, folder `prototypes/`.
Nothing is running. All background workflows were stopped; none of them left partial files.

## 0. Read this first
- **Founder priorities, in order:**
  1. `Uptal_AutoApply_v6_MultiMarket.html` is the top priority.
  2. Its **onboarding** section is the most important part of it.
  3. Then the legal work.
  4. Then landing pages for the other countries, but only after the founder approves the UAE one.
- **Founder style:** ask every needed question before starting a new workstream. The founder answers quickly with the
  ask-user tool and expects options with a recommended default.
- **Founder request I could not do:** "download everything to a Desktop folder 'global expansion plan' when credit is $5".
  A cloud session can neither see the credit balance nor reach their computer. Instead, `prototypes/build/tools/package.sh` builds
  "global expansion plan.zip", which is sent to them with the send-file tool at milestones. Keep sending refreshed zips. (A local
  session via the Claude Desktop app or `claude remote-control` could copy it to the Desktop.)
- **Machine limit:** the container has 4 CPUs, so each Workflow runs at most 2 agents at a time. Get parallelism by launching several
  workflows at once (10 to 14 worked fine).
- **Web search:** the WebSearch budget is shared per turn (about 200 searches). The pack fact-checkers ran out of it, so their
  remaining doubts are listed in each `markets/packs/XX.sources.md`.
- **Workflow resume (`resumeFromRunId`) works only in the same session.** A new session must relaunch. Every workflow script is now in
  `prototypes/build/wf/` (relaunch with `scriptPath` = absolute path + `args`).
- **Commits:** a stop hook requires everything committed and pushed. Screenshot folders (`build/**/shots/`) are git-ignored.

## 1. What the founder decided (do not re-ask)
### Market expansion (v6 app)
- **Markets (28):**
  - GCC: SA AE QA KW BH OM
  - North America: US CA
  - UK and Ireland: GB IE
  - Europe: DE FR NL BE ES IT PL SE CH. I picked these 10 by job, employer and jobseeker density; the founder said "based on density".
  - Australia: AU
  - North Africa: EG MA TN DZ LY
  - Levant: JO LB IQ, added by the founder.
  - Plus an INTL USD tier for people living outside these markets.
- **Tailoring:** to residence + target markets.
  - **Residence** drives price, currency, tax, payment methods and the Arabic variant.
  - **The first target** drives jobs, employers, cities, salaries, work rights and nationalisation rules.
- **Before payment:** collect only **where + roles**. The paywall counts **all matching jobs**. Work rights and everything else come
  **after payment** but before Auto-Apply starts.
- **Paywall:** hard paywall everywhere.
- **Prices:** local tiers by purchasing power. They are placeholders, in `build/markets/base.json`. Examples per month on the 1-month
  plan:
  - $99 (US), CA$119, £79, A$129
  - €89 (DE FR NL BE IE), €69 (ES IT)
  - 229 zł, 999 kr, CHF 99
  - AED/QAR 399, KWD 33, BHD/OMR 39
  - EGP 1,299, MAD 299, TND 89, DZD 3,900, LYD 149, JOD 29
  - Lebanon $39, IQD 45,000, INTL $49
  - The 4-month plan is 15% off and the 12-month plan 30% off.
- **Payments:** local methods per market (researched into the packs).
- **Languages:** EN, AR and FR.
  - Arabic: v5's **Gulf** dialect for the 6 GCC markets, and a **neutral "white" Arabic, closer to formal** for all other markets.
- **Personas:** one templated persona per market. All are finance professionals (Financial Analyst / FP&A, about 8 years) and they
  are a **mix of women and men**, with gender-aware AR/FR copy.
  - Side effect: KSA's Noura is now addressed in the feminine, where v5 often used generic masculine. The founder was told.
  - There are 4 cross-border personas: X-EG-GCC Hassan (Cairo → KSA+UAE), X-IN-GCC Priya (Bengaluru → UAE+Qatar, INTL tier),
    X-JO-AE Rami (Dubai → UAE+KSA) and X-MA-FR Salma (Casablanca → France+Belgium, French UI).
- **Scope: the whole app adapts**, not just onboarding.
- **Outsiders** (living outside our markets) can join if they target a supported market.
- **Sensitive fields:** photo, gender, date of birth and nationality are asked only where they are normal in that market (packs
  `sensitive` block).
### Landing pages
- **UAE first** (done). The others follow **only after founder review**, generated from the same template.
- **UAE stats:** marked placeholders (amber).
- **Testimonials:** keep the KSA ones, labelled honestly as from Saudi members.
- **Employers:** UAE employer **wordmarks** with an "illustration" disclaimer.
### Legal (paused, resume after v6)
- **Entity:** the Saudi entity, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), contracts everywhere under KSA law. Local
  mandatory law is layered on top.
- **Structure:** a **global core + country addenda**. The core is as protective as the September 2026 KSA rewrite (founder rules R1 to
  R10, house rules: no em or en dashes, ticket-only contact, no renewal notices...). Each addendum gives only what local law mandates.
- **Products in new markets:** **Auto-Apply only**.
- **Product requirements:** the policy and the v6 checkout/cancel flows both implement them where the law requires (EU/UK withdrawal
  waiver checkbox, DE cancel button, FR 3-click cancel and Chatel reminder, US auto-renew consent, AU "ACL rights not affected").
- **Disputes:** the strongest lawful option per market. Riyadh courts by default. US: individual arbitration with class and jury
  waivers. EU/UK/AU/Quebec consumers keep their home courts, and the clause says so.
- **Languages:** EN, AR, FR **plus DE, NL, ES, IT, PL, SV**. English controls except where law makes the local version govern.
- **Every output is a draft for licensed local counsel.**

## 2. Repo map (`prototypes/`)
| Path | What |
|---|---|
| `Uptal_AutoApply_v6_MultiMarket.html` | **Built** v6 (current draft: engine + 28 packs + onboarding rebuild; dictionary not tokenized yet, so non-KSA personas still show KSA copy outside onboarding). Do not edit; rebuild. |
| `Uptal_AutoApply_Landing_UAE.html` | **Built** UAE landing (done, reviewed). |
| `src/v5.html` | Untouched v5 source (KSA-only app). `src/onboarding-multi-region.html` earlier prototype. `src/landing-ksa.html` KSA landing. `src/legal-ksa/` KSA legal pack incl. Sept 2026 refund rewrite + adversarial research. |
| `build/build.py` | Assembles v6: applies `patches/*.json` to v5, embeds market data + dictionaries, appends `js/*.js` (engine first) and `css/*.css`. `--out PATH` for private builds, `--lenient` to skip broken parts/patches while others are mid-write. |
| `build/js/engine.js` | The MKT engine (token expansion, money/salary conversion, persona switching, FR, neutral Arabic, logo monograms, `?persona=` and `?lang=` params, market selector in the prototype bar). |
| `build/DESIGN.md` | Architecture + **token grammar** + MKT API. Read first. |
| `build/markets/base.json` | Regions, currency formats, price tiers (placeholders). |
| `build/markets/roster.json` | The 32 personas (name, gender, nationality, residence, targets). |
| `build/markets/packs/XX.core.json` + `XX.sources.md` | **28 researched, fact-checked market packs**: cities, 24 employers, salary factor, tax, payments, phone, work-rights options, nationalisation, sensitive-field norms, legal lines, boards, certs, unis, persona, people. Spec: `markets/PACK-SPEC.md`. |
| `build/markets/registry.json` | **181 token ids** with exact KSA EN/AR values, FR, scope, archetype and mapping hint (+58 notes on tricky cases). Source of truth for KSA identity. |
| `build/markets/personas.json` | Generated by `tools/make_personas.py`. |
| `build/patches/50-onboarding.json` | 12 exact patches: the onboarding rebuild. Generated by `tools/onboarding/mkpatch.py`. |
| `build/js/50-onboarding.js`, `build/css/50-onboarding.css` | Onboarding logic (state `window.OB6`) and styles. |
| `build/i18n/newkeys-{en,gulf,neutral,fr}.json` | 127 `ob6*` copy keys for onboarding (generated by `tools/onboarding/mkkeys.py`). |
| `build/i18n/GLOSSARY.md` | Voices, gender rules, product terms (EN / Gulf / neutral / FR). |
| `build/data/` | `v5-dump.json` (final runtime T.en/T.ar, 3,415 keys), `chunks/dict-00..22.json` (150-key chunks for tokenizers), `inventory.json` (815 entity mentions + 256 code notes). |
| `build/ONBOARDING-SPEC.md`, `build/ONBOARDING-QA.md` | Onboarding spec, and the QA loop spec incl. checkout elements required by law. |
| `build/SWEEP-SPEC.md` | Spec for the code/markup sweep + **ownership rules**. |
| `build/legal/LEGAL-SPEC.md`, `build/legal/RESUME.md` | Legal decisions + 13-point research checklist. |
| `build/landing/` | `make_landing.py` (generator), `packs/ae.json`, `README.md`, `PLACEHOLDERS-ae.md`. |
| `build/tools/` | `verify.js` (in-browser KSA identity check), `verify_chunk.py` (offline per-chunk check), `sweep.js` (leak sweep across personas x langs x screens), `smoke.js`, `errs.js`, `dump.js`, `make_personas.py`, `package.sh`, `onboarding/mkpatch.py` + `mkkeys.py`. |
| `build/wf/*.js` | Every workflow script (+ `legal-recon-args.json`). |

## 3. How the engine works (short)
- **Copy is tokenized.** `{@city.riyadh}`, `{@co.aramco}`, `{@p.first}`, `{@ctry.n}`, `{@g:male|female}`, `{@$:399}` (SAR price → residence
  price), `{@sal:26000}` (SAR monthly salary → target salary level and period), `{@salk:38000-45000}`, `{@per}`, and `{@id|literal}` (the
  literal is used for KSA).
- **Arabic contraction:** ل + ال contracts automatically at token boundaries.
- **KSA must expand to exactly v5.** `tools/verify.js` and `tools/verify_chunk.py` enforce it.
- **Scopes:**
  - ids starting `pay. tax. cur. phone. legal. res.` resolve against the residence market;
  - `p.` resolves against the persona;
  - everything else resolves against the primary target.
- **Market switching:** `MKT.set(personaId)` rebuilds T.en, T.ar (Gulf or neutral), T.fr and the registered inline structures, then
  re-renders. `sarHTML` is wrapped so a stray "N ¤" converts at the residence price rate (safety net only).
- **A pack** = `XX.core.json` + `XX.ent.json` (entity map, not produced yet) + optional `XX.json`. KSA's `ent` is generated from the
  registry by `build.py`.
- **Dictionary sources:** tokenized strings come from `i18n/parts/tok-NN.json` (`{key:{en,gulf,neutral,fr}}`). New keys come from
  `newkeys-*.json` + `newkeys-parts/*.json`. Inline structures come from `tokobj-parts/NAME.json` (`MSAQ_A` + `MSAQ_B` are concatenated
  into `MSAQ`).

## 4. Status by workstream
| Workstream | State |
|---|---|
| Engine | Done, tested. For KSA the dictionary expands to exactly v5 (0 changed strings EN/AR); all personas boot without page errors (checked SA, AE, GB, US, MA, X-IN-GCC on the current build). |
| 28 market packs (core) | **Done**, researched and fact-checked (some later checks offline, doubts listed in sources.md). |
| Token registry | **Done** (181 ids). |
| Onboarding rebuild | **Built** (all screens, 9 personas walked in EN/AR/FR, zero errors from its code). The 3 reviewers were mid-run when stopped. **Review + fix not done.** Builder's open issues are listed below. |
| Dictionary tokenization + FR + neutral AR | **Not started** (launched then stopped before any output). |
| Code/markup sweep (13 ranges) | **Not started** (same). |
| Entity maps per market (`XX.ent.json`, `XX.persona.json`) | **Not started** (same). Cross-border personas need `X-*.persona.json` too. |
| Final assembly + leak-sweep QA loop | Not started. |
| UAE landing | **Done** (22 review findings, 20 fixed on the page; the 2 app-side ones are fixed in the engine). |
| Legal research (28 briefs) | **Paused** before any brief was written. |
| Legal drafting (core + addenda + 9 languages) | Not started. |

## 5. Next steps, in order
1. **Onboarding review + fix** (founder's #1).
   - Relaunch `build/wf/v6-onboarding.js` but skip the build stage, since the builder output is in the repo: edit the script so
     phase Build is replaced by reading the files.
   - Or run the QA loop in `build/ONBOARDING-QA.md` directly:
     1. 6 walker agents by persona group, each walking welcome → live in EN/AR/FR, phone + desktop, taking screenshots and looking at
        them.
     2. Dedupe the findings.
     3. One fixer that owns `patches/50-onboarding.json`, `js/50-onboarding.js`, `css/50-onboarding.css` and the `ob6*` newkeys.
     4. Repeat until there are no blocker/major findings.
   - Include the **legally required checkout elements** listed in ONBOARDING-QA.md.
   - Builder's open issues to fold in:
     - Auto-skip `rights` when every card is auto-answered (saves a step for citizens).
     - `cvtOffer` now sits between profile and aboutYou and its own progress bar is not counted.
     - Job counts use a hand-set `JOBF` table.
     - Copy `wH1`, `wr1s`, `pfBioText`, `phHint2` still shows KSA text until tokenization lands.
     - `build.py` CSS insertion was changed by the builder (v5 has no real `</head>`). That change is accepted.
2. **Tokenize the dictionary.** Launch `build/wf/tokenize.js` 6 times in parallel with args
   `{"chunks":["00","01","02","03"]}`, `04-07`, `08-11`, `12-15`, `16-19`, `20-22`. Each chunk gets a tokenizer + a reviewer, and
   `tools/verify_chunk.py` must report 0 problems. Proposed new ids go to `markets/registry-proposals/`.
3. **Code/markup sweep.** Launch `build/wf/sweep.js` 4 times with these range sets (see SWEEP-SPEC ownership rules):
   - h1 4287-5200, h2 5200-6100, h3 6100-7000, h4 7000-7544 (HTML);
   - j1 7545-8673;
   - j2 = MSAQ items 0-11 → `MSAQ_A`; j3 = MSAQ items 12-23 → `MSAQ_B` + lines 8675-9460 + register MSAQ;
   - j4 9460-10500, j5 10500-11400, j6 11400-12400;
   - j7 12400-13400 (skip payOtp ~13180-13300), j8 13400-14400, j9 14400-16092.

   The exact notes are in this conversation's launch args; the range descriptions above are enough.
4. **Entity maps.** Launch `build/wf/entmap.js` with 3 market batches:
   - AE GB US EG DE FR MA QA KW BH
   - OM CA AU IE NL BE ES IT PL
   - SE CH TN DZ LY JO LB IQ

   After that, map any `registry-proposals` ids added by steps 2 and 3, and write `X-EG-GCC/X-IN-GCC/X-JO-AE/X-MA-FR.persona.json`
   (`tools/make_personas.py` picks them up).
5. **Assemble and QA loop.**
   1. Run `python3 -I build/tools/make_personas.py && python3 -I build/build.py`.
   2. Run `node build/tools/verify.js prototypes/Uptal_AutoApply_v6_MultiMarket.html` (KSA identity).
   3. Run `node build/tools/sweep.js prototypes/Uptal_AutoApply_v6_MultiMarket.html out.json` (every persona x en/ar/fr x every
      screen: KSA leaks, unexpanded tokens, stray SAR glyphs, English in FR, Latin in AR, page errors).
   4. Fix and loop until clean, then do a final onboarding QA round.
6. **Package and send.** Run `bash prototypes/build/tools/package.sh`, then send the zip to the founder (send-file tool, display
   attach).
7. **Legal (after v6).**
   1. Relaunch `build/wf/legal-recon.js` 4 times with `build/wf/legal-recon-args.json` batches. Mind the web-search budget and spread
      it across turns if needed.
   2. Draft the global core (July Terms + Sept terms patch, July Privacy, Sept Refund Policy, generalised) and 27 addenda.
   3. Run adversarial passes (consumer lawyer, regulator, arbitrator) like the founder's September process.
   4. Translate into AR, FR, DE, NL, ES, IT, PL and SV.
   5. Render preview HTML + drop-in fragments in the KSA pack's format.
   6. Write the per-market product requirements list.
8. **Other country landings**, only after the founder approves UAE: write `build/landing/packs/XX.json` per country and run
   `python3 -I build/landing/make_landing.py prototypes/src/landing-ksa.html <pack> <out>`.

## 6. Things to know
- **Patch ownership:**
  - Onboarding owns: welcome, where, targets, profile, blocklist, wall, payOtp, checkout, subDone, aboutYou, tune, rights, autopilot,
    live; the pf* functions; PLANS/PLAN/BNPL_DATES definitions; the payOtp module; and the checkout/wall/subDone hooks.
  - Sweepers own everything else.
  - Patch files apply in name order: 30-sweep-* before 50-onboarding. Every `old` must match exactly `count` times, or the build fails
    (unless `--lenient`).
- **Edit only `build/` and `src/` via the build.** Never hand-edit the built HTML files.
- **UAE landing follow-ups for the founder:**
  - confirm the UAE job sources, Northern Emirates coverage, filtering of nationals-only roles and Mon to Fri support;
  - have a native Emirati speaker read the Arabic;
  - the footer still links to the KSA legal pages.
- **Defaults I told the founder about:** the Europe picks, the placeholder prices, the INTL tier, the Arabic split, the persona mix,
  Noura in the feminine, sensitive-field rules.
- **Pack doubts worth a human look:**
  - Klarna/BNPL support for subscriptions (US/NL);
  - Jaywan (the UAE card scheme);
  - Google Pay in Morocco;
  - ANAPEC exemptions in Morocco;
  - the UK DMCC subscription regime commencement (pack says spring 2027);
  - the Dutch rule that fixed-term plans cannot auto-renew for another fixed term (art. 6:236 j BW), which affects 4- and 12-month plans.
