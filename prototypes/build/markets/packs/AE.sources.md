# AE (United Arab Emirates) market pack: sources and reasoning

Researched 2026-10-12. Direct page fetches were blocked by the sandbox proxy, so facts come from web-search
result summaries of the pages listed below. Where sources disagreed, the conservative option was chosen and
the conflict is noted. The currency (AED, after the number, with a space) and price tier (399 / 339 / 279) come
from `markets/base.json` and were not changed.

## Persona
From `roster.json` id `AE`: Ahmed Mansour, male, Egyptian (`EG`), lives in and targets the UAE, city Dubai,
on an employer-sponsored residence visa. That means he is not auto-answered on work rights; he sees the card
and picks "Residence visa through my employer".
- Employer "Durrah Holding" / "Durrah Logistics" is fictional. I searched for "Marsa Holding" (too close to
  Dubai Holding's Marsa Al Arab) and "Lulwa Holding" (too close to Lulu Group) and rejected both.
- Degree: AUS offers a BSBA with an Accounting major (aus.edu/sba). An Egyptian who grew up in Sharjah and
  studied at AUS is a common profile.
- Certification: CMA (IMA). It is very common among Egyptian finance professionals in the Gulf. ACCA is the
  other main option in the UAE.
- Bio: mirrors Noura's v5 bio. The local touch is "got the group ready for UAE Corporate Tax" (9% CT for
  financial years from 1 June 2023, Federal Decree-Law 47/2022), which is typical recent FP&A work in the UAE.
- Arabic names are added as `persona.ar` and `people[].ar`, beyond the spec. These keys are additive, so
  ignore them if they are not needed.

## Salary (`sal.per = month`, `f = 0.8`)
- JobXDubai 2026 salary pages (updated July 2026), Senior FP&A Analyst, Dubai: AED 25,000-32,000 a month at
  multinationals (average 28k) and 23,000-28,000 at SMEs (average 26k). Abu Dhabi: MNC 23,750-30,400, SME
  21,850-26,600.
  https://jobxdubai.com/salaries-2026/senior-fpa-analyst-mnc-finance-and-accounting-controlling-roles-salary-dubai-2026
  https://jobxdubai.com/salaries-2026/senior-fpa-analyst-sme-finance-and-accounting-controlling-roles-salary-dubai-2026
- Edoxi (Apr 2026): corporate finance and FP&A, mid level AED 22-32k a month; senior AED 35-50k.
  https://www.edoxi.com/studyhub-detail/financial-modeling-analyst-salary-dubai
- Lower figures exist. Payscale gives about AED 16.5k a month base only, and a LinkedIn post gives a Senior
  Accountant / FA band of 15-22k. These leave out the housing and transport allowances that UAE packages
  include.
- Reasoning: the v5 KSA story puts Noura at 26,000 SAR with a market band of 34-41k. With f = 0.8 that band
  becomes AED 27.2-32.8k, which sits in the Dubai MNC range. Ahmed would then earn about AED 20,800 (under the
  market, matching Noura's story) and expect about 27,200. KSA pays expats a premium over the UAE for the same
  role, so f is below 1 even though AED and SAR are near par (both pegged to the USD).
- Uncertain: none of the Hays, Cooper Fitch or Robert Half 2026 UAE guides came up in search. If one of them is
  checked later, f should stay within roughly 0.75-0.9.

## Tax
- VAT is 5%. UAE law requires prices shown to consumers to include VAT, unless they are clearly labelled as
  excluding it. A non-resident supplier of digital services to UAE consumers must charge 5% VAT, with no
  registration threshold. The fine for not showing VAT-inclusive prices is reported as AED 15,000 (Gulf News)
  or AED 5,000 after Cabinet Decision 49/2021 (Mondaq).
  https://www.mondaq.com/tax-authorities/1663664/vat-inclusive-displayed-prices-rule-exceptions-and-implications
  https://gulfnews.com/your-money/taxation/businesses-must-display-prices-inclusive-of-vat-1.2187508
  https://payproglobal.com/saas-sales-tax/united-arab-emirates/

## Payments
- Cards come first: Visa, Mastercard and Amex (Amex is widely issued and accepted in the UAE). A vendor estimate
  puts cards at about 42% of UAE e-commerce and wallets at about 35% in 2025, with Apple Pay leading.
  https://www.antom.com/markets/uae
- Wallets are `apple` and `google`. Network International, the largest acquirer, accepts Google Pay. Samsung
  Pay / Wallet exists in the UAE but is rare at online subscription checkouts, so it is left out
  (conservative choice).
  https://gulfnews.com/business/retail/more-merchants-in-uae-now-accept-google-pay-1.1544968519522
  https://www.propertyfinder.ae/blog/digital-wallet-uae/
- BNPL is Tabby and Tamara, both pay in 4 interest-free, as in v5 KSA. Tabby has a CBUAE Stored Value
  Facilities licence. Tamara received a CBUAE Restricted Finance Licence in October 2025 and splits purchases
  into 4 interest-free payments. A secondary source reports a BNPL cap per borrower of AED 20,000 or 3 months'
  income. The 12-month total of AED 3,348 is well under that cap.
  https://www.wamda.com/en/2025/10/tamara-obtains-central-bank-uae-approval
  https://thepaypers.com/fintech/news/tamara-secures-a-restricted-finance-license-from-the-cbuae
  https://fintechnews.ae/31775/payments/top-bnpl-uae-platforms/
- PayPal is not listed. I found no evidence it is a common subscription checkout method in the UAE.
- `localCardBrand: null`. Jaywan, the UAE domestic card scheme run by Al Etihad Payments (CBUAE), only started
  card issuance in July 2026. Banks are rolling it out in phases (FAB debit, CBD prepaid), and most cards are
  co-badged with Visa or Mastercard. E-commerce acceptance is still being added: Network International's
  gateway in Aug 2026, Mastercard Gateway / noon payments in Sep 2026. It is too early to show it as a standard
  brand. **Revisit in 2027**; the likely change is `"localCardBrand": "Jaywan"`.
  https://en.wikipedia.org/wiki/Jaywan
  https://en.aletihad.ae/news/business/4680074/network-international-rolls-out-uae-s-jaywan-card-acceptance
  https://www.khaleejtimes.com/uae/etihad-becomes-first-airline-to-accept-jaywan-cards-for-flight-bookings

## Work rights
- MOHRE issues 12 work-permit types. The relevant ones include a standard permit (the employer sponsors the
  residence visa), a UAE/GCC national permit, a Golden Visa holder permit and a family-sponsored resident
  permit. For the last three, the employer gets a work permit but does not sponsor the visa.
  https://beta.government.ae/en/information-and-services/jobs/work-permits
  https://gulfnews.com/uae/government/working-in-the-uae-these-are-the-12-permits-mohre-says-you-must-have-1.500419895
- `autoFor` is AE plus the 5 other GCC states. GCC nationals work in the UAE private sector on a GCC-national
  permit, with no visa sponsorship. The auto text says "without visa sponsorship" rather than "without a
  permit".
- In most cases no NOC is needed to change jobs under Federal Decree-Law 33/2021: the old visa is cancelled and
  the new employer issues a new permit and visa. The "transfer" sub says "in most cases" because some free
  zones and some contracts still impose conditions.
  https://www.khaleejtimes.com/uae-job-change-rules-how-to-avoid-a-one-year-work-permit-ban
- The Green Visa is a self-sponsored 5-year residence for skilled employees (about AED 15k a month salary,
  bachelor's degree, MOHRE skill level 1-3) and for freelancers.
  https://www.bayut.com/mybayut/uae-green-visa
- Rule: UAE adverts often say "own visa" or "visa holders only", meaning the employer will not sponsor. Anyone
  whose visa is tied to an employer, like Ahmed, needs the new employer to sponsor. So the matching rule skips
  "own visa" jobs for the employer-visa and needs-sponsorship statuses, not only for people outside the
  country.

## Emiratisation
- Private companies with 50 or more employees must increase Emiratis in skilled jobs by 2% a year (1% per
  half-year), with a target of 10% by the end of 2026. The H1-2026 deadline was 30 June 2026. From 1 July 2026
  the contribution is AED 10,000 a month (AED 120,000 a year) per unfilled position. Firms with 20-49 employees
  in specified sectors must hire Emiratis too. "Fake Emiratisation" carries fines of AED 100k-500k.
  https://www.wam.ae/en/article/c03cqiu-june-deadline-for-achieving-emiratisation-targets
  https://www.khaleejtimes.com/emiratisation-target-june-20-deadline-fake-schemes-fines
  https://eiglaw.com/uae-reminds-private-employers-of-june-2026-emiratisation-deadline/
  https://www.envoyglobal.com/news-alert/united-arab-emirates-emiratization-deadline-approaches-for-june-2026/
- One July 2026 report (The National) says 190,000 Emiratis work in 32,000 companies, 95% of companies met H1
  2026, and the strategy is "extended to 2040". I could not verify the post-2026 targets, so the description
  stops at "10% by the end of 2026". **Revisit in 2027.**
  https://www.thenationalnews.com/news/uae/2026/07/20/emiratisation-on-track-with-190000-employed-in-private-sector/
- The UAE has no legal list of jobs reserved for Emiratis, unlike Saudi Arabia's restricted professions. What
  happens in practice is that employers post roles as "UAE Nationals only" (often through Nafis). The copy says
  we only apply to those for Emirati users. GCC nationals do not count toward Emiratisation, so they are not
  treated as eligible for those postings.

## Sensitive fields (photo optional; gender, DOB, nationality ask; marital none)
- 2026 UAE CV guides agree that a photo is common on emailed CVs and regional boards, but advise leaving it off
  ATS uploads. Recruiters expect nationality and visa status near the top of the CV, and DOB is "often" or
  "optionally" included. On marital status the sources conflict: one calls it common, one says omit it, one
  calls it required. I chose the conservative option and do not ask.
  https://www.visualcv.com/international/uae-resume/
  https://atsverification.com/blog/dubai-uae-resume-format-2026/
  https://mahadmanpower.ae/uae-style-resume-guide-2025-get-hired-faster/
- Gender and DOB are set to `ask` because they are standard required fields on Bayt and GulfTalent profiles
  and on the application forms of large UAE employers (airline, bank and semi-government careers portals).
  This rests on general knowledge of those forms, not a single citable page.
- Decree-Law 33/2021 (in force 2 Feb 2022) bans discrimination on race, colour, sex, religion, national or
  social origin and disability, and treats Emiratisation measures as lawful. So we never filter on gender or
  age.
  https://www.pinsentmasons.com/en-gb/out-law/guides/new-uae-labour-law-for-employers
  https://wtwco.com/en-be/insights/2021/11/uae-new-labor-law-will-introduce-significant-changes

## Legal
- The UAE PDPL (Federal Decree-Law 45/2021) has been in force since 2 Jan 2022. As of mid-2026 its Executive
  Regulations still had not been issued (Morgan Lewis, June 2026; Chambers 2026). DIFC (DP Law No. 5 of 2020)
  and ADGM (DP Regulations 2021) have their own regimes. The privacy line only names the PDPL and makes no
  claims about specific rights or penalties.
  https://www.morganlewis.com/pubs/2026/06/uae-establishes-federal-authority-for-artificial-intelligence-and-data
  https://www.businessdubai.ae/blogs/uae-pdpl-data-protection
  https://atblegal.com/regulatory-and-compliance/uae-data-protection/
- Renewal: the UAE has no specific auto-renewal statute. Consumer Protection Law 15/2020 and its 2023
  Executive Regulation require clear price and terms disclosure, so the line states the auto-renewal at the
  same price and that cancelling before the renewal date stops the next charge.

## Work culture
- The work week is Mon-Fri. Federal government moved to it in Jan 2022 and most private employers followed;
  Sharjah government works Mon-Thu.
- Notice under Decree-Law 33/2021 is 30-90 days by contract. 30 days is the usual figure, so `noticeDays: 30`;
  senior roles often have 60-90.
- Salaries are paid monthly through WPS. During Ramadan, private-sector hours are 2 hours shorter.
- Job boards: LinkedIn, Bayt (largest regional board), GulfTalent (strong for mid and senior finance), Indeed
  UAE (aggregator) and Naukrigulf (finance, popular with South Asian candidates). Dubizzle is left out because
  it serves entry-level hiring.
  https://atsverification.com/blog/how-to-find-a-job-in-uae-2026/
  https://insurancemarket.ae/lifestyle/best-job-sites-in-the-uae
- `lang2` is Arabic. English is the working language, but "Arabic speaker preferred" is common, especially in
  banks, government and semi-government roles.

## Employers (24, all real)
- FAB is the largest UAE bank by assets, ahead of Emirates NBD and ADCB. DIB is the largest UAE Islamic bank.
- e& (Abu Dhabi) and du (Dubai) are telecom #1 and #2.
- EGA has been headquartered in Abu Dhabi (KEZAD, Al Taweelah) since 2017, owned 50/50 by Mubadala and ICD.
  https://en.wikipedia.org/wiki/Emirates_Global_Aluminium
- Network International is Dubai-based. Brookfield and FAB completed their acquisition in September 2024.
  https://en.wikipedia.org/wiki/Network_International
- Sukoon Insurance was Oman Insurance Company until 2022. It is a composite insurer based in Dubai, majority
  owned by Mashreq and listed on DFM.
  https://en.wikipedia.org/wiki/Sukoon_Insurance
- PureHealth (Abu Dhabi, ADX-listed) is the largest healthcare group in the region. Agthia (Abu Dhabi,
  ADQ-controlled) is a food and beverage major. talabat (Dubai) listed on DFM in Dec 2024. Careem (Dubai) is a
  super app majority-owned by e&. These rest on general knowledge and were not re-verified through search.
- RAKBANK (Ras Al Khaimah) and Air Arabia (Sharjah) were added so the employer list covers more than Dubai and
  Abu Dhabi.
- Logo colours are approximate brand colours. They were not taken from brand guidelines.

## Arabic and French
- Arabic is in the Gulf register (light dialect like v5: "بس", "ما تحتاج", "تطلّع لك", "برّا").
  Place names follow local spelling: أبوظبي as one word, as UAE government usage writes it, and رأس الخيمة.
- French uses vouvoiement. Place names: Dubaï, Abou Dhabi (the common press form; the official toponymy form is
  "Abou Dabi"), Charjah, Ras el Khaïmah, Al-Aïn, Fujaïrah. Company names stay in their original form.

## Fact-check pass (2026-10-12)
Web search and page fetches were unavailable for this pass (search budget used up, proxy blocks fetches), so
claims were checked against prior knowledge (to mid-2026) only. Changes:
- `rights.opts[5].sub` now names the UAE job-seeker visa (ICP, 60/90/120 days) next to the visit visa: both
  groups need an employer to sponsor them.
- `sensitive.notes`: Decree-Law 33/2021 Art. 4 lists race, colour, sex, religion, national or social origin
  and disability ("national origin", not "nationality").
- e& logo background set to e& red (`#E00800`) instead of black; still approximate.
Confirmed from prior knowledge, no change: VAT 5% with tax-inclusive consumer prices; MOHRE's 12 permit types
(UAE/GCC national, Golden Visa holder and family-sponsored permits exist); Green Visa (5 yrs, AED 15k,
bachelor's, skill level 1-3); Emiratisation 2% a year for 50+ staff to 10% by end-2026, contribution rising by
AED 1,000 a month each year to AED 10,000 in 2026; notice 30-90 days; Ramadan hours minus 2; Mon-Fri week;
employer names current (Sukoon, e&, talabat, PureHealth). Not verifiable here (post-mid-2026): Jaywan issuance
and gateway dates, the July 2026 Emiratisation report, JobXDubai July 2026 figures. City order after Sharjah
(RAK, Al Ain, Ajman, Fujairah) is a judgement call, not measured.
