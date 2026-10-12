export const meta = {
  name: 'uae-landing',
  description: 'Build the UAE Auto-Apply landing page from the KSA landing as a data-driven template, then review and fix',
  phases: [
    { title: 'Build', detail: 'generator script + UAE content pack + output HTML' },
    { title: 'Review', detail: 'UAE accuracy, Arabic/English copy, visual + functional check' },
    { title: 'Fix', detail: 'apply verified review findings' },
  ],
}
const P = '/home/user/uptal-workroom/prototypes'
const BRIEF = `
PROJECT: Uptal Auto-Apply (AI that tailors a CV per job and auto-applies). It launched in Saudi Arabia; we are expanding to ~28 markets. The founder wants a landing page per country, starting with the UAE. The UAE page must be built as a TEMPLATE so other countries can follow later by adding a new content pack.

SOURCE: ${P}/src/landing-ksa.html (5.3MB: fonts + employer logos embedded as base64; two full language trees #page-en and #page-ar dir=rtl, plus a small lang-switch script). A base64-stripped copy for READING ONLY is at ${P}/build/landing/landing-stripped.html (947KB, 302 lines; some lines are huge, use Bash sed/cut/python to read pieces). Visible EN text dump: ${P}/build/landing/landing-en-text.txt.

DELIVERABLES:
1. ${P}/build/landing/make_landing.py — a Python 3 generator (stdlib only) that reads the ORIGINAL source HTML (keep the embedded fonts), applies a country content pack (JSON), and writes the output HTML. Usage: python3 -I make_landing.py <source.html> <pack.json> <out.html>. It must do precise replacements (exact-string or structural) on BOTH language trees, and must fail loudly if an expected source string is not found. It should remove the KSA employer logo <img> data (the .tb-logo band and the 5 .more-logo images) and replace them with typeset wordmarks / monogram tiles from the pack. Fonts stay embedded.
2. ${P}/build/landing/packs/ae.json — the UAE content pack: every country-specific string in EN and in Gulf Arabic (match the existing Arabic register of the KSA page: Gulf dialect, friendly), plus page title/meta, employer wordmarks list, cities, sector chips, FAQ, stats (as placeholders), etc. Design the pack schema so another country is "write a new pack": include a short schema comment/README at ${P}/build/landing/README.md.
3. ${P}/Uptal_AutoApply_Landing_UAE.html — the generated UAE page.
4. ${P}/build/landing/PLACEHOLDERS-ae.md — every placeholder value on the page with what real data should replace it.

DECISIONS ALREADY MADE BY THE FOUNDER (follow exactly):
- Stats (KSA shows 95K+ jobs in KSA, 26,859+ new this week, 5,700 organizations, 1,542+ candidates, 30K+ new jobs, 546 more): use realistic UAE-scale figures but render them in a clearly MARKED placeholder style (e.g. class "ph" with an amber dashed underline/highlight and a title tooltip "Placeholder: replace with real UAE data") so nothing ships looking like a real stat by accident. List them all in PLACEHOLDERS-ae.md.
- Testimonials: keep the existing Saudi testimonials (do NOT invent UAE reviews), but label the section honestly, e.g. "From our members in Saudi Arabia" (and the Arabic equivalent), keeping their Saudi cities. The "Trusted by 1,542+ candidates across Saudi Arabia" line becomes a UAE-appropriate honest line (e.g. trusted by candidates across the Gulf, with the number as a placeholder).
- "Where we apply" band: replace KSA logos with typeset wordmarks of major UAE employers (text, tasteful, consistent styling, grayscale like a logo band), keeping/adding the disclaimer "Example employers, shown for illustration." (and Arabic). Use well-known UAE employers across sectors (e.g. Emirates, Etihad, ADNOC, Emirates NBD, First Abu Dhabi Bank, ADCB, Mashreq, Dubai Islamic Bank, e&, du, Emaar, Aldar, DP World, Mubadala, Majid Al Futtaim, Al-Futtaim, Careem, noon, talabat, Dubai Holding, Cleveland Clinic Abu Dhabi, Mediclinic, Aster DXB, flydubai, Air Arabia, EGA, Masdar, ENOC, G42, PwC Middle East). The tailoring-card mini logos become monogram tiles.
- Languages: EN + Gulf Arabic (same as KSA page). Keep the language switch working.
- Everything Saudi becomes UAE: country name, cities (Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah, Fujairah, Umm Al Quwain), the "Built in KSA" badge (e.g. "Now in the UAE"), hero copy, "across Saudi Arabia" lines, targeting card cities, tailoring card examples (e.g. Energy · Abu Dhabi, Telecom · Dubai), sector chips (Government, Semi-government, Multinationals, Private, Startups, SMEs, plus free-zone companies is a nice UAE touch), FAQ answers. The page title: "Uptal Auto-Apply · Apply to Jobs Automatically in the UAE" (and Arabic title).
- FAQ must be UAE-correct: e.g. "Is the service for Emiratis only?" → open to all nationalities looking to work in the UAE, inside or outside the country; hiring decision rests with the employer. Mention Emiratisation honestly where relevant (some private-sector roles are prioritised for UAE nationals; we only apply where you are eligible) without legal promises. Keep the no-guarantee, privacy, pause/cancel, account-creation answers. Note the UAE work week (Mon-Fri) if any copy references work days. Do not invent product facts that differ from KSA (same 300 applications/month, CV tailored per job, account created from CV email, activated on payment).
- The "Start applying" flow on the page: after the simulated "Analysing…" it should send the visitor into the app prototype for the UAE persona: link target "Uptal_AutoApply_v6_MultiMarket.html?persona=AE" (same folder). Keep the dropzone behaviour.
- Do not use any external network resources in the output; it must be a self-contained file like the source.

QUALITY BAR: It must read as if written for the UAE from scratch, not a find-and-replace. Arabic must be natural Gulf Arabic, correct RTL, Emirati context (e.g. الإمارات، دبي، أبوظبي). You may use WebSearch/WebFetch (load via ToolSearch) to check UAE facts (Emiratisation rules, job sources, work week). Verify the output by rendering it with Playwright: node with require('/opt/node22/lib/node_modules/playwright') and chromium.launch() (Chromium is preinstalled; do NOT run playwright install). Take full-page screenshots in EN and AR at desktop (1440) and phone (390) widths into ${P}/build/landing/shots/ and LOOK at them (Read the PNGs). No console errors. No leftover Saudi references except inside the labelled testimonials.`

phase('Build')
const built = await agent(`${BRIEF}\n\nYou are the BUILDER. Produce all four deliverables, run the generator, render and inspect screenshots, iterate until it looks right. Finally, grep the output's visible text (both trees, excluding the testimonials section) for: Saudi, KSA, Riyadh, Jeddah, Dammam, Khobar, Dhahran, Makkah, Madinah, Tabuk, Abha, Kingdom, السعودية, المملكة, الرياض, جدة, الدمام — and fix any hits. Return a concise report: files written, pack schema summary, placeholder list, anything you were unsure about.`, { label: 'build-uae-landing', phase: 'Build' })

phase('Review')
const REVIEW_SCHEMA = { type: 'object', properties: { findings: { type: 'array', items: { type: 'object', properties: { severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['severity', 'where', 'problem', 'fix'] } } }, required: ['findings'] }
const reviews = await parallel([
  () => agent(`${BRIEF}\n\nBuilder report:\n${built}\n\nYou are REVIEWER A: UAE accuracy + honesty. Read ${P}/build/landing/packs/ae.json and the output's visible text. Check every UAE fact (cities, Emiratisation wording, nationality/visa FAQ, employer names spelled as the companies write them, work week, legal tone, no invented guarantees or stats presented as real, placeholders correctly marked, testimonials honestly labelled). Use WebSearch to verify anything uncertain. Report only real problems with concrete fixes.`, { label: 'review-accuracy', phase: 'Review', schema: REVIEW_SCHEMA }),
  () => agent(`${BRIEF}\n\nBuilder report:\n${built}\n\nYou are REVIEWER B: copy quality in English and Gulf Arabic. Read the EN and AR text of ${P}/Uptal_AutoApply_Landing_UAE.html (strip base64 first via python to a scratch file). Check the Arabic is natural Gulf register consistent with the KSA original, grammatical, no machine-translation tells, numbers/RTL correct; English is crisp and consistent with the KSA voice. Also check EN and AR say the same things. Report only real problems with concrete replacement text.`, { label: 'review-copy', phase: 'Review', schema: REVIEW_SCHEMA }),
  () => agent(`${BRIEF}\n\nBuilder report:\n${built}\n\nYou are REVIEWER C: visual + functional QA. Render ${P}/Uptal_AutoApply_Landing_UAE.html with Playwright at 1440, 768 and 390 widths in EN and AR (click the language switch, or use ?lang=ar). Screenshot full pages into ${P}/build/landing/shots/review/ and look at them. Check: wordmark band looks polished and scrolls like the original logo band; placeholders visibly marked but not ugly; nothing overflows horizontally at 390; language switch works; dropzone + Start applying flow works and ends by linking to Uptal_AutoApply_v6_MultiMarket.html?persona=AE; no console errors; generator re-runs cleanly (python3 -I ${P}/build/landing/make_landing.py ${P}/src/landing-ksa.html ${P}/build/landing/packs/ae.json /tmp-free path in your scratch). Compare against the KSA original screenshots for regressions in layout. Report only real problems.`, { label: 'review-visual', phase: 'Review', schema: REVIEW_SCHEMA }),
])
const findings = reviews.filter(Boolean).flatMap(r => r.findings)
log(`${findings.length} review findings (${findings.filter(f => f.severity !== 'minor').length} blocker/major)`)

phase('Fix')
let fixReport = 'no findings'
if (findings.length) {
  fixReport = await agent(`${BRIEF}\n\nReviewers reported these findings on the UAE landing:\n${JSON.stringify(findings, null, 1)}\n\nYou are the FIXER. For each finding, verify it is real (re-check the file); fix real ones by editing the generator and/or the pack (never hand-edit the output HTML; regenerate it). Re-render and inspect screenshots after fixing. Return a report: each finding → fixed / rejected (why).`, { label: 'fix-uae-landing', phase: 'Fix' })
}
return { built, findings, fixReport }
