# SA (Saudi Arabia): sources and reasoning

SA is the reference market. v5 is the KSA-only prototype, and the KSA expansion of every token has to reproduce v5
exactly. Where v5 already settled a fact (persona, cities, checkout methods, visa statuses, employer names in EN/AR,
notice period), the pack copies v5 and the research below checks it. Currency and price tier come from
`markets/base.json` (SAR with the SAR glyph, 399 / 339 / 279, totals 1,356 / 3,348) and are unchanged.
Research date: 12 October 2026.

## Payments
- **Cards: mada, Visa, Mastercard.** mada is the national debit scheme run by SAMA, so `localCardBrand: "mada"`.
  The order and wording copy v5 (`ckMCardS`: "mada, Visa, Mastercard" / "مدى، فيزا، ماستركارد"). Amex is left
  out, as in v5.
- **Wallets: `["apple"]` only.** Apple Pay is the standard wallet in Saudi app and web checkout, and v5 shows only
  Apple Pay. Two other wallets launched recently but are not standard for online checkout yet:
  - Google Pay launched on mada in September 2025 for in-store Tap to Pay. In-app and web payments were described
    as "soon", and I found no confirmation that they are live for merchants in 2026.
    [Google blog](https://blog.google/intl/en-mena/product-updates/android-chrome-and-play/google-pay-in-saudi-arabia/),
    [Fintech Global](https://fintech.global/2025/09/17/google-pay-rolls-out-in-saudi-arabia-with-sama/),
    [Argaam](https://www.argaam.com/en/article/articledetail/id/1843145)
  - Samsung Pay launched on mada in December 2024, and SAMA's release only describes in-store use.
    [SAMA news 1060](https://www.sama.gov.sa/en-US/MediaCenter/News/pages/news-1060.aspx),
    [ME Tech Watch](https://meatechwatch.com/2024/12/10/saudi-arabia-launches-samsung-pay-integrated-with-national-payment-network-mada)

  Conservative choice: add `google` once the payment provider confirms web/in-app Google Pay in KSA.
- **BNPL: Tabby and Tamara, pay in 4.** This is the v5 behaviour: offered only on the 4-month and 12-month plans
  (`terms: [4,12]`), and the user approves a new 4-payment plan before each renewal (`ckRenewBnpl*`). Both firms
  are SAMA-licensed: Tabby got its BNPL licence in October 2025 and consumer and SME finance licences in June 2026,
  and Tamara Finance was licensed in March 2025.
  [Crowdfund Insider](https://www.crowdfundinsider.com/2026/07/288588-fintech-firm-tabby-secures-regulatory-approvals-to-offer-flexible-payments-options-in-saudi-arabia/),
  [Tabby newsroom](https://tabby.ai/en-AE/newsroom/finance-licences-ksa),
  [Fintech Futures](https://www.fintechfutures.com/regulatory-actions/tabby-new-consumer-business-financing-licences-saudi-arabia)
- **STC Pay / STC Bank and SADAD are not included.** They are common for bills and transfers, but they are not
  standard recurring-subscription methods on merchant checkouts, and v5 does not show them.

## Tax
- **VAT is 15% and prices include it.** The standard rate has been 15% since July 2020, and consumer prices are
  shown VAT-inclusive. v5 already says "VAT included" / "شامل ضريبة القيمة المضافة" and "Prices include 15% VAT".

## Work rights
- **Auto-answered: SA plus the other GCC states (AE, QA, KW, BH, OM).** Under the GCC common market, GCC citizens
  work in KSA without a work visa or Iqama. Several Saudization guides also say GCC nationals count as Saudis in
  Nitaqat.
  [Zoho Payroll KSA](https://www.zoho.com/en-sa/payroll/kb/employer/general/saudization.html),
  [Setup in Saudi](https://www.setupinsaudi.com/saudization)
- **Options shown to everyone else.** These are v5's visa picker options, in v5's order: Iqama transferable,
  Iqama not transferable, Premium residency, GCC national, Needs a new visa. The last one is the sponsorship
  case, as the spec requires. "GCC national" stays in the list because v5 offers it to people whose nationality
  is set to the generic "GCC".
  - Transferable vs not transferable. Under Qiwa rules, a worker with a year of service can move without the
    current employer's consent. Some other cases also skip consent: no documented contract, salary unpaid for 3
    months, or an expired permit. Inside the first year, a move needs the employer's consent. A 90-day notice
    can apply after a year of service.
    [Wego](https://blog.wego.com/iqama-transfer/),
    [Setup in Saudi](https://www.setupinsaudi.com/en/understanding-ksa-iqama-transfer-rules),
    [HRSD guide](https://prod.hrsd.gov.sa/sites/default/files/2022-10/E23102022.pdf)
  - Premium Residency holders work in the private sector and change jobs without a sponsorship transfer. Five
    new categories were added in January 2024, including Special Talent.
    [Wego](https://blog.wego.com/saudi-premium-residency/),
    [Mondaq](https://www.mondaq.com/saudiarabia/work-visas/1597268/saudi-arabias-premium-residency-visa)
  - Naming: Jawazat has started calling the card "Muqeem ID" (هوية مقيم), but job seekers and employers still
    say Iqama, and v5 uses Iqama, so the pack does too.
  - Not listed: dependants on a family Iqama, who generally need a work permit or a switch to a work Iqama.
    I could not confirm a clean, current rule for this group, so it is left out (conservative).
- **Matching rule.** We skip postings that say "Saudi nationals only", and for people who need a visa, roles
  that cannot sponsor one.

## Nationalisation
- **Saudization (Nitaqat).** Under Nitaqat, private employers must keep a Saudi share of staff by size and
  activity, and the bands are checked on Qiwa.
- **Accounting quota.** A separate decision covers 44 accounting professions at establishments with 5 or more
  accountants:
  - 40% Saudi from 27 October 2025, rising each year to 70% by 2028 (one source gives 50% on 27 Oct 2026, 60% in
    2027 and 70% in 2028).
  - A Saudi only counts toward the quota if paid at least SAR 6,000 (bachelor's) or SAR 4,500 (diploma).
  - Covered titles include Financial Manager, Accounting Manager, Financial Controller, Treasury Manager and
    auditors.
  - Uncertain:
    - Some outlets give 22 October rather than 27 October for the start.
    - I found no source that puts "Financial Analyst" in the 44 titles. That is why the copy says "accounting
      roles" rather than "finance roles".
    - The 2026 step falls 15 days after today, so the desc avoids naming the current percentage.

  [KPMG flash alert 2025-216](https://kpmg.com/xx/en/our-insights/gms-flash-alert/flash-alert-2025-216.html),
  [DLA Piper](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/saudisation-of-accounting-and-finance-roles),
  [Zawya](https://www.zawya.com/en/economy/gcc/saudi-arabia-starts-implementing-40-localization-in-44-new-accounting-professions-mwfmbpxf),
  [People Matters ME](https://me.peoplemattersglobal.com/news/economy-policy/ksa-hr-ministry-begins-40percent-saudization-in-44-accounting-professions-46982),
  [Okaz](https://www.okaz.com.sa/news/local/2219553), [Sabbar](https://sabbar.com/blog/localization-in-accounting)

## Sensitive fields
- **photo: optional.** Saudi CV guides call a photo common or recommended, and v5 marks it optional ("Some
  employers in Saudi ask for one"). It is only sent where a form asks.
  [VisualCV](https://visualcv.com/international/saudi-arabia-cv), [Jobera](https://jobera.com/resources/saudi-cv-writing-guide/)
- **gender: ask, and nationality: ask.** Saudi employer forms routinely require both. Nationality also drives
  Saudization counting, Iqama/visa status and Jadarat eligibility. v5 asks both.
- **dob: none, and marital: none.** Both are common on Gulf CVs and appear on some portals, but they are not
  needed for matching. v5 does not collect them, and PDPL data minimisation supports leaving them out. If a
  particular employer form demands one, it can be asked at that point.

## Legal
- **PDPL.** The Personal Data Protection Law (Royal Decree M/19, 1443H, as amended) took effect on 14 September
  2023. The one-year grace period ended on 14 September 2024, and SDAIA enforces it. v5 already references PDPL
  ("A copy of everything, under PDPL").
  [Clyde & Co](https://www.clydeco.com/en/insights/2024/09/saudi-arabia-s-personal-data-protection-law-become),
  [Baker McKenzie](https://me-insights.bakermckenzie.com/2024/05/17/saudi-arabia-next-steps-for-compliance-with-personal-data-protection-law-as-one-hijri-year-grace-period-expiry-approaches)
- **Renewal line.** It mirrors v5's `ckRenew*` copy: auto-renews at the same price on the same method, cancel any
  time before the renewal date. The E-Commerce Law gives a 7-day right to terminate a service contract, but only
  if the service has not been used or benefited from. Auto-Apply starts on payment, so the pack makes no 7-day
  refund promise (conservative). Have counsel review this before launch.
  [CMS](https://cms.law/en/sau/legal-updates/Saudi-Arabia-implements-its-new-E-Commerce-Law),
  [Clyde & Co PDF](https://cdn.clydeco.com/clyde/clyde/media/locations/middle%20east/reports/clydeco-ksa-e-commerce-law-interactive-update-0919.pdf)

## Salary
- **`per: "month"`, `f: 1.0`.** SA is the reference market, so f = 1 by definition. Saudi pay is quoted per month
  as a package (basic + housing + transport).
- **v5 figures.** Noura is on 26,000 SAR/month against a role band of 34,000-41,000, and Senior FA roles in Riyadh
  pay 38-45k.
- **Cross-check.** Aggregators come in lower:
  - ZenHR 2025: Financial Analyst (3-7 yrs) 10k / 15k median / 22k max; Finance Manager 18k / 25k / 40k.
  - GulfTalent: financial analysts up to about 32k.

  The v5 band therefore reads as the upper end: total package for an experienced Saudi analyst at a large Riyadh
  employer (banks, PIF portfolio companies, Aramco). It stays because it is v5's approved number, and other
  markets are scaled from it.
  [ZenHR](https://www.zenhr.com/en/salary-guide-ksa),
  [GulfTalent](https://gulftalent.com/symfony_web/index.php/mobile/saudi-arabia/jobs/title/financial-analyst),
  [Paylab](https://saudiarabia.paylab.com/en/salaryinfo/economy-finance-accountancy/financial-analyst)

## Notice period and culture
- **noticeDays: 60.** The Labour Law amendments in force since February 2025 set:
  - 30 days for an employee ending an indefinite contract, and 60 days for the employer. Sources disagree on
    whether the 30 days covers every resignation or only termination for a valid reason.
  - Non-Saudis on indefinite contracts are treated as on renewable one-year terms.

  Many professional contracts still state 60 days, and v5 has Noura answering "60 days", so the pack keeps 60.
  [Al Tamimi](https://www.tamimi.com/news/key-amendments-to-saudi-arabias-labour-law/),
  [Roedl](https://www.roedl.com/insights/saudi-arabia-labor-law-amendments-impact),
  [BCLP](https://www.bclplaw.com/en-US/events-insights-news/saudi-arabias-evolving-labor-landscape-a-consolidated-legal-update.html)
- **Pay day.** Government salaries are paid on the 27th of the Gregorian month, and private employers usually
  pay around month end.
- **Work week.** Sunday to Thursday, with a Friday-Saturday weekend since 2013.

## Job boards and government platforms
- **Boards.** LinkedIn, Bayt (the largest MENA portal), Jadarat, Indeed, GulfTalent and Naukrigulf.
  [KSA Expats](https://ksaexpats.com/best-job-sites-in-saudi-arabia/), [Cercli](https://www.cercli.com/resources/best-job-sites-in-saudi-arabia)
- **Jadarat.** HRDF's unified national employment platform for Saudi nationals. It absorbed Taqat's employer side
  and is the main route into government and semi-government roles.
  [HRDF](https://www.hrdf.org.sa/en/products-and-services/programs/individuals/other/jadarat/),
  [Gulf News](https://gulfnews.com/world/gulf/saudi/saudi-arabia-launches-jadarat-employment-platform-with-over-70000-job-openings-1.103871823)
- **govPlatforms.** Qiwa handles contracts, job offers and transfers. GOSI holds the official employment and wage
  record that employers check. Jadarat is listed under boards because it is a job source.

## Employers (24)
- **Selection.** The list covers every sector the spec asks for. It includes all of v5's dream-employer and
  suggestion set (PIF, Aramco, NEOM, stc, SABIC, Ma'aden, Riyad Bank, SNB, Almarai, Mobily, Bupa Arabia,
  Tawuniya) and most v5 job-card companies.
- **Left out to stay at 24.** flynas (Saudia already covers airlines) and Lucid (its KAEC plant is outside the 7
  cities). Both still exist in v5 copy through the registry.
- **Names.** EN and AR names are v5's exact spellings where v5 has them:
  - "Ma'aden" / معادن, "SNB" / البنك الأهلي السعودي, "Saudia" / السعودية, "Rewaa" / رِوّاء, "Tabby" / تابي.
  - v5 monograms: PIF, NM (NEOM), SB (SABIC).
- **City choices.**
  - Aramco (HQ Dhahran) is placed in `dammam`, and the Dammam metro text includes Dhahran.
  - NEOM is placed in `riyadh`: its site is in Tabuk Province, but it keeps a Riyadh corporate office, and in
    2025 it reportedly planned to move 1,000+ staff there
    ([Semafor](https://www.semafor.com/article/07/18/2025/saudi-considers-neom-job-cuts-relocations-amid-cost-pressures)).
  - SNB HQ is Riyadh ([Wikipedia](https://en.wikipedia.org/wiki/Saudi_National_Bank)).
  - Tabby moved its HQ to Riyadh in 2023 ([Argaam](https://www.argaam.com/en/article/articledetail/id/1673318)).
  - Rewaa is based in Riyadh ([PitchBook](https://pitchbook.com/profiles/company/462391-48)).
  - Salla is in Makkah, and Bupa Arabia and Saudia are in Jeddah.
- **Logo colours.** These are brand-ish approximations made from memory, not official hex values.

## Cities
- **The 7 cities are v5's city chips, in v5's order:** Riyadh, Jeddah, Dammam, Al Khobar, Mecca, Medina, Abha.
  That order also roughly tracks finance-job density.
- **Spellings.** v5 uses "Mecca"/"Medina" on the chips, so the pack does too. The official romanisation is
  Makkah/Madinah.
- **French forms.** Riyad, Djeddah, La Mecque, Médine, Khobar.

## Persona and other fields
- **Persona.** Copied from v5:
  - noura.alamri@email.com, phone 055 123 4567 (+966).
  - Acme Financial, with Acme Capital as the second employer (both on v5's blocklist).
  - BSc Accounting, King Saud University, SOCPA.
  - Bio: v5's exact EN/AR text, with a French translation added.
  - Tools: "SAP, Excel". Power BI is left out because v5 pitches it as a skill gap to add ("Add Power BI to my
    profile").
- **lang2: Arabic.** Arabic level matters for expats applying to Saudi roles (v5 postings ask for "strong Arabic
  and English communication"). For Arabic-speaking nationalities, including Noura, it should be auto-set to
  native, so v5's single English-level question stays as it is.
- **Certs.** SOCPA (local), CMA, CFA and CPA: the set v5's job cards cite most.
- **Universities.** King Saud University, King Abdulaziz University and KFUPM.
- **People.** 10 names, 5 women and 5 men. Mostly v5's recruiter and advisor names (Danah Al-Sulaiman, Yazeed
  Al-Bassam, Ghadah Al-Faraj, Meshal Al-Mutlaq, Rawan Al-Juhani, Saad Al-Hamdan, Layla Al-Otaibi, Asma Kurdi),
  plus two typical Saudi names (Faisal Al-Qahtani, Abdulrahman Al-Shehri).
- **Extra fields beyond the spec.** These are added and harmless to ignore:
  - `persona.nameAr`
  - `people[].ar`
  - `pay.bnpl[].label` and `pay.bnpl[].terms`
  - `govPlatforms[]` as `{id,en,ar,fr,use}` objects
