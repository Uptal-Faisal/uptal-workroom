# US market pack: sources and reasoning

Persona: Jessica Morales (f, US citizen, New York), from `roster.json` id `US`. Currency USD and price tier
(99 / 84 / 69) are unchanged from `base.json`. Research done 2026-10-12. Direct fetches of bls.gov, stripe.com and
roberthalf.com were blocked from this sandbox, so the figures below come from search-result extracts of those pages.
I took the conservative option where they disagreed.

## Salary (`sal`)
- Robert Half location pages for New York, NY (they link to the 2026 Salary Guide): Senior Financial Analyst about
  $117.7k / $144.7k / $160.7k (low / mid / high); Senior FP&A Analyst $101.7k / $126.6k / $146.4k; Senior Financial
  Data Analyst $126.6k to $178.8k. https://www.roberthalf.com/us/en/job-details/senior-fpa-analyst/new-york-ny
- A BLS OEWS 2025-based estimate puts the NYC FP&A analyst median at $128,930 (75th percentile $174,990).
  https://hyring.com/jobseeker-toolkit/salary/fp-and-a-analyst-salary-in-new-york
- BLS OEWS May 2023, Financial and Investment Analysts: NY metro annual mean $146,450 (this includes investment analysts).
- Choice: **$135,000 base a year** for 8 years (between RH Senior FP&A mid and Senior FA mid; bonus excluded).
  f = (135,000 / 12) / 26,000 = **0.4327**. The engine then shows 26,000 SAR as $135k/yr and 34,000 SAR as about $177k/yr.
  $177k is FP&A-manager / top-of-band senior pay in NYC, which is a stretch target in the same way as Noura's 34k.
- `per: "year"`: US pay is quoted as annual base salary, and NYC/NYS pay-transparency laws require annual ranges in ads.

## Tax (`tax`)
- There is no national sales tax. Sales tax is set by each state and city, and so is whether a SaaS or online service
  is taxable at all. Prices are shown before tax (`incl:false`, "+ tax" style).
- New York taxes prewritten software however it is delivered, and it taxes some "information services". Advisory
  opinions split on whether a service like this one is taxed, decided by its "primary function" (TSB-A-24(6)S taxable;
  Yesware and SunGard exempt). https://dhub.deloitte.com/Newsletters/Tax/2024/STM/241004_11.pdf ,
  https://seesalt.pillsburylaw.com/primary-function-test-propels-yet-another-service-provider-to-victory-in-new-york-sales-tax-case/
- `rate: 8.875` is the NYC combined rate (4% state + 4.5% city + 0.375% MCTD), for the persona's city. It is a demo
  value; a real checkout calculates tax from the billing address. Some NYC ZIPs are 8.625% to 8.875%.
  https://www.avalara.com/taxrates/en/state-rates/new-york/cities/queens.html
- Uncertain: whether Uptal itself owes NY tax. I chose the conservative option and show "Plus applicable sales tax"
  instead of claiming none.

## Payments (`pay`)
- Cards dominate US online subscriptions: Visa, Mastercard, Amex, plus **Discover** (a US domestic network, so it is in
  `brands`; the UI needs a Discover glyph). `localCardBrand` is null: Discover is a card brand, not a debit scheme like mada.
- Wallets: Apple Pay and Google Pay are standard. Samsung Pay/Wallet is not a standard web-checkout option.
- PayPal is common for US consumer subscriptions.
- **BNPL: `[]`.** Klarna, Afterpay and Affirm are common for one-off e-commerce purchases. But Klarna's own US
  Pay-in-4 terms say plans "may not be available for... subscriptions and recurring transactions". Stripe documents US
  Klarna recurring support only as Pay Later / pay in full, not instalments. A 2021 Klarna Pay-in-4-for-subscriptions
  launch was not confirmed as current. I found no evidence that Affirm or Afterpay support recurring billing.
  https://finledger.com/articles/klarna-launches-pay-in-4-subscriptions-service-in-us/ ,
  https://docs.stripe.com/billing/subscriptions/klarna (cited from search extract)
- Not included: Venmo, Cash App Pay and ACH debit. They exist, but they are not standard for a professional subscription.

## Phone
- +1. Example `+1 212 555 0147` uses 555-0100 to 555-0199, which is reserved for fictional use (Manhattan area code 212).

## Work rights (`rights`)
- The options follow the two standard US ATS questions: "Are you legally authorized to work in the US?" and "Will you
  now or in the future require sponsorship (e.g. H-1B)?". The first option uses the I-9 categories
  (citizen / noncitizen national / LPR / authorized alien).
- Options: citizen or national; green card (LPR); EAD work permit (OPT/STEM OPT, H-4 EAD, TPS, asylum), which is
  authorized now but may need sponsorship later; an employer-tied visa (H-1B, L-1, TN, E-3, O-1), where a new employer
  must file, e.g. an H-1B portability petition; and needs sponsorship (last).
- Context: since 21 Sep 2025 a $100,000 payment applies to new H-1B petitions for people outside the US. Change of
  status, extensions and in-country petitions are exempt (USCIS guidance, Oct 2025). The fee is being litigated. This
  is one more reason "can't sponsor" postings are common.
  https://www.gmac.com/resources/learners/how-to-apply/study-abroad/h1b-visa-update-transitioning-f-1-visa-holders-exempt-new-100-000-fee ,
  https://techservealliance.org/news/h-1b-visa-update-uscis-clarifies-100000-fee-rule-amid-industry-opposition-and-legal-challenges/
- DHS has OPT/STEM OPT under review (RIN 1653-AA97), and a July 2026 final rule ended "duration of status" for F-1.
  OPT still exists, so the option stays and is worded generically.
  https://eiglaw.com/dhs-confirms-review-of-opt-and-stem-opt/
- `autoFor: ["US"]` only. Citizens of the Freely Associated States (FM, MH, PW) can also work without a visa under the
  Compacts. I left them out to keep the auto-answer text simple; they can pick "Work permit / other" manually. American
  Samoa nationals hold US passports, so the first option covers them.
- Rule: we skip "no sponsorship" postings for anyone who needs sponsorship now or later. We also skip citizen-only or
  clearance-required roles (federal, defense/ITAR, cleared) for non-citizens. Clearances require US citizenship.

## Nationalisation
- `null`. There is no quota or nationalisation regime. Citizenship-only roles are handled by the rule above.

## Sensitive fields
- Photo `avoid`: the US norm is no photo, because of discrimination risk under Title VII, ADEA and ADA. Recruiters and
  ATS screens penalise photos.
- Gender `eeo`: asked only in voluntary EEO self-ID (sex, race/ethnicity) alongside veteran (VEVRAA) and disability
  (Section 503, form CC-305, renewed by OMB July 2026) self-ID, with "decline" always allowed. EO 14173 (Jan 2025)
  revoked EO 11246 affirmative-action plans, but VEVRAA/503 invitations and EEO-1 tracking continue.
  https://info.redstonegci.com/blog/self-indentification-forms-new-form-and-helpful-reminders ,
  https://www.berkshireassociates.com/blog/ofccp-requests-voluntary-reporting-of-eo-14173-compliance
- DOB `none` (ADEA), nationality `none`: citizenship-status discrimination is barred by INA §274B, so applications ask
  about work authorization instead. Marital `none`.
- New York specifics: salary-history ban (NYC since 2017, NYS Labor Law 194-a since 2020), pay ranges required in ads
  (NYC since Nov 2022, NYS since Sep 2023), and the NYC Fair Chance Act (no criminal-history questions before a
  conditional offer).

## Legal
- There is no federal comprehensive privacy law. California CCPA/CPRA is the reference law. The NY SHIELD Act covers
  data security and breach notice for NY residents. The NY Privacy Act is still not enacted as of Oct 2026.
  https://www.jdsupra.com/topics/data-privacy/state-privacy-laws/new-york
- Renewal line: it meets ROSCA (clear terms, express consent, simple cancellation), NY GBL §527-a and the California
  ARL (online cancellation; reminder before longer-term renewals). The FTC "click-to-cancel" rule was vacated (8th Cir.,
  July 2025). NY "click to cancel" amendments (A3928/S5615) were seen only as bills, so the copy commits to online
  cancellation plus a pre-renewal email for 4 and 12-month plans, which satisfies the strictest drafts.
  https://legislation.nysenate.gov/pdf/bills/2025/S5615A

## Cities, employers, boards
- City order follows BLS OEWS May 2023 Financial and Investment Analysts employment: NY (~51,950), Boston (~15,000),
  Chicago (~14,540), LA (~12,520), Washington (~10,150), Dallas (~9,970), then SF Bay, Charlotte, Houston.
  Washington DC is left out because its roles skew to federal and cleared work (citizen-only) rather than corporate
  FP&A. Houston is kept for ExxonMobil, which moved its HQ to Spring, TX in 2023.
  https://www.bls.gov/oes/2023/May/oes132051.htm
- Employer HQ mapping: ExxonMobil is in Spring (Houston); Caterpillar and AT&T are in Irving/Dallas; PepsiCo is in
  Purchase, NY (NY metro); TJX is in Framingham (Boston); Google is in Mountain View (Bay Area); Stripe is in South San
  Francisco; Disney is in Burbank (LA); BofA is in Charlotte. Related Companies is the developer of Hudson Yards (the
  closest US analog to a giga-project). The US has no sovereign wealth fund, so BlackRock covers "largest investor" and
  the NY Fed covers the public body. Logo colours are approximate brand colours.
- Boards: LinkedIn, Indeed, Glassdoor, ZipRecruiter, plus eFinancialCareers for finance.
- Certs: CPA (AICPA/state boards), CFA, CMA (IMA), FPAC (AFP's FP&A credential). Persona: CPA, which fits a BBA in
  Accountancy from Baruch College (CUNY), a major NYC accounting feeder.
- Persona employer: "Acme Financial" / "Acme Capital", kept from v5. Acme is the canonical fictional American company,
  so it is plausible here and does not collide with real NYC firms.

## Culture / notice
- Two weeks' notice is the US norm (`noticeDays: 14`). Employment is at-will. Pay is bi-weekly or semi-monthly.
- Resume norms: for experienced hires, 1 page is common up to roughly 5 to 10 years and 2 pages is acceptable at 8+.
  https://www.wallstreetcareers.com/blog/best-resume-resources-finance-jobs-2026
- Uncertain: exact 2025/2026 metro rankings beyond the top six, and the current status of EEO-1. Neither changes any
  field.
