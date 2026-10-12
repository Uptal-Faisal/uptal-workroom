# BE market pack: sources and reasoning

Persona: Thomas Peeters (m, Belgian, Brussels), taken from `roster.json` id `BE`. Currency EUR and price tier come from `base.json` and were not changed. Research was done on 2026-10-12. Some official sites (employment.belgium.be, roberthalf.com, bancontact prezly) could not be fetched from this sandbox, so those figures come from search-result extracts of those pages. Each one is flagged below.

## Payments
- **Order: Bancontact, then card, then PayPal.** Bancontact is the dominant local debit scheme: Belgian surveys put it ahead of credit cards and PayPal for online payments. Bancontact and Payconiq handled more than 2.5 billion payments in 2024, and about 90% of online Bancontact payments were made by smartphone.
  - https://fr.businessam.be/?p=127400 ("Bancontact reste la méthode de paiement la plus populaire en Belgique, suivi des cartes de crédit et de PayPal")
  - https://www.bancontact.com/en/news/2-5-billion-payments-with-bancontact-and-payconiq-in-2024-2-5-billion-times-thank-you-for-your-trust-in-us
- **App name.** Payconiq by Bancontact was renamed "Bancontact Pay" in 2026, and Wero is being added alongside it rather than replacing it. The sources disagree on the exact date, so the checkout copy just says "Bancontact card or app" and avoids depending on the app's brand name.
  - https://www.bancontact.com/en/news/an-evolution-of-our-brands-in-2026
  - https://www.brusselstimes.com/belgium/2025121/payconiq-by-bancontact-changes-its-name-from-monday/
  - https://www.bancontact.com/en/payconiq-evolves
- **Recurring billing.** Bancontact cannot carry recurring charges itself. PSPs such as Mollie, Adyen and Checkout.com turn a first Bancontact payment into a SEPA Direct Debit mandate for renewals, so the sub-line discloses "Renewals by SEPA direct debit".
  - https://chargebee.com/docs/mollie-bancontact.html
  - https://help.mollie.com/hc/en-us/articles/35188469623442
- **Wallets: Apple Pay and Google Pay.** Apple Pay is widely supported, and Belgian banks have added Bancontact cards to Apple Pay since 2022. Google Pay is available but has less traction. Samsung Pay is not standard, so it is left out.
  - https://brusselstimes.com/294935/belfius-to-make-bancontact-available-on-apple-pay
  - https://9to5mac.com/2022/07/07/bancontact-coming-to-apple-pay/
- **Card brands: Visa, Mastercard, Amex.** Amex is accepted online but is a minority card.
- **BNPL: none (`[]`).** Belgium already applies consumer-credit law (CEL Book VII) to BNPL, requires repayment within 2 months with capped fees, and transposed CCD II in 2026. A ban for under-18s has also been reported. No BNPL that works for subscriptions is common, so the conservative choice is none.
  - https://twobirds.com/en/trending-topics/buy-now-pay-later-regulatory-tracker/belgium
  - https://cms.law/en/bel/legal-updates/adoption-of-the-new-consumer-credit-directive-impact-for-bnpl
  - https://www.lexgo.be/en/news-and-articles/14967-new-european-rules-on-consumer-credit-transposed-into-belgian-law
  - https://fr.businessam.be/?p=263684
- **Not used.** Wero e-commerce checkout in Belgium is still rolling out, so it is not listed as a method. Revisit this in 2027.

## Tax
- **Rate.** The standard Belgian VAT rate is 21%. B2C electronically supplied services such as SaaS are taxed where the customer lives, at 21%.
- **Price display.** Belgian consumer prices must be shown including VAT (CEL Book VI), so `incl: true`.
  - https://trykintsugi.com/sales-tax-guides/europe/belgium
  - https://www.numeral.com/blog/belgium-vat-rates-and-compliance

## Work rights
- **Auto-answered (`autoFor`).** EU27, EEA (IS, LI, NO) and Swiss citizens have free movement and need no permit.
- **Statuses offered, in order:**
  1. **Belgian, EU, EEA or Swiss citizen.**
  2. **Residence card marked "labour market: unlimited".** This is printed on A/B/F/L cards for refugees, temporary protection, family members, long-term residents and unlimited single-permit holders. Holders need no permit.
     - https://asylumineurope.org/reports/country/belgium/content-international-protection/employment-and-education/access-labour-market/
     - https://smithstonewalters.com/news/quick-guide-to-work-permits-in-belgium
  3. **Search year after graduating in Belgium.** It runs for 12 months, gives unlimited labour-market access and cannot be extended. It was created by the Act of 11 July 2021.
     - https://dofi.ibz.be/en/themes/third-country-nationals/study/search-year-after-higher-studies
     - https://www.uhasselt.be/en/international/from-abroad/orientation-year-search-year
  4. **Single permit (permis unique / gecombineerde vergunning).** It is tied to the employer. The recast EU Single Permit Directive 2024/1233 (transposition deadline May 2026) lets holders change employer, subject to notification or labour-market checks. I could not confirm how Belgium's regions have transposed it, so the copy hedges: "changing jobs may need a new permit".
     - https://emnbelgium.be/news/council-eu-formally-adopts-revised-single-permit-directive
     - https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-026.html
  5. **EU Blue Card.** Salary thresholds are set by each region and differ: Wallonia's 2026 threshold is EUR 68,815; Brussels and Flanders kept their 2025 levels pending Statbel data. The copy therefore says "regional salary threshold" and does not quote a number.
     - https://www.brusselstimes.com/1929259/foreign-workers-in-belgium-face-steep-hike-in-minimum-salary-requirements
     - https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-018.html
  6. **Needs a work permit.** The employer applies for the single permit through the competent region.

## Nationalisation
- **`null`.** Belgium has no private-sector nationality quota. Some Belgian public posts (army, diplomacy) and EU-institution posts (EPSO) are reserved for nationals. That is not a quota on private employers, so it does not belong here.

## Sensitive fields
- **Legal basis.** The Anti-Discrimination Act and the Gender Act (both 10 May 2007) and the Anti-Racism Act (30 July 1981) protect age, sex, civil status, nationality, origin and other criteria. Actiris received 215 discrimination reports in 2020, 43% of them on racial grounds.
- **Photo: `optional`.** Belgian CV guides say a photo is common but not required ("if you include one, make it professional"). It is not legally banned, so I chose `optional` rather than `avoid`.
- **Gender, date of birth, nationality, marital status: `none`.** Forms don't need them, and asking risks a discrimination claim.
  - https://www.expatica.com/be/employment/finding-a-job/belgian-job-applications-writing-a-belgian-cv-and-interview-tips-102376
  - https://www.student.be/en/student-life/photo-ou-pas-de-photo-sur-ton-cv
  - https://www.commissioner.brussels/i-am-an-expat/news/item/731-how-to-find-a-job
  - https://eures.europa.eu/living-and-working/living-and-working-conditions/living-and-working-conditions-belgium_en

## Legal
- **Privacy law.** GDPR plus the Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data. The regulator is the APD/GBA.
- **Renewal line.**
  - It names the 14-day withdrawal right (CEL Book VI). Since 19 June 2026, the EU withdrawal-button rule (Directive 2023/2673, transposed in Belgium by an Act of 19 July 2026) means the product needs a "withdraw from contract here" button.
  - CEL art. VI.91 (Act of 20 April 2026) requires a renewal reminder at least 15 days before the cancellation deadline, from 1 May 2027. Contracts of one month or less are exempt. The 4- and 12-month plans will need this reminder; the monthly plan does not.
  - https://www.altius.com/en/news/auto-renewing-a-consumer-contract-from-1-may-2027-prior-notice-is-required/
  - https://www.osborneclarke.com/insights/new-eu-rules-bring-mandatory-withdrawal-button-online-trade
  - https://www.lexgo.be/en/news-and-articles/14804-new-mandatory-withdrawal-button-for-b2c-webshops

## Salary
- **Factor:** `per: month`, `f = 0.192`. Thomas earns 26,000 × 0.192 = about EUR 5,000 gross a month; his 34,000 expectation maps to about EUR 6,530.
- **Benchmarks:**
  - Robert Half, Brussels Financial/Business Analyst: P25 4,073 / P50 4,835 / P75 6,100 a month. Robert Half's Belgian guide reports monthly gross pay. These figures come from search extracts; the page itself was blocked from the sandbox.
  - Robert Half, Brussels Corporate Finance Analyst: P50 5,469 / P75 6,714 a month.
  - Michael Page, Brussels business performance analyst listing: EUR 50-70k a year.
  - Payscale, Belgium-wide Senior Financial Analyst: average about EUR 50k a year base, range 33-65k. This is national data with fewer Brussels and senior samples, so it gets less weight.
  - Robert Walters 2026: internal auditors with 3-7 years earn EUR 4,100-5,800 gross a month.
- **Why EUR 5,000.** An 8-year analyst in Brussels sits between the median and P75 for Financial Analyst. The 6,530 expectation falls around Corporate Finance Analyst P75, which is plausible for a senior FP&A seat.
- **Why monthly.** Belgians negotiate gross monthly pay, and yearly cash is about 13.92 × monthly (13th month plus double holiday pay), so a monthly figure matches how people talk about pay. EUR 5,000 a month is about EUR 69.6k a year in cash.
  - https://www.roberthalf.com/be/en/job-details/financialbusiness-analyst/brussels
  - https://www.roberthalf.com/be/en/job-details/corporate-finance-analyst/brussels
  - https://content.roberthalfonline.com/SG24/SG24-PDF/2024-Salary-Guide-BE-EN.pdf
  - https://www.michaelpage.be/fr/jobs/bruxelles/finance/commercial-analysis
  - https://www.payscale.com/research/BE/Job=Senior_Financial_Analyst/Salary
  - https://www.robertwalters.be/insights/career-advice/blog/how-much-a-finance-professional-earns.html

## Notice period
- **Statutory scale.** Resignation notice for contracts since 2014 runs from 1 week (under 3 months) up to a maximum of 13 weeks (8 or more years). Selected steps: 6 weeks at 2-4 years, 9 weeks at 5-6 years, 12 weeks at 7-8 years.
- **`noticeDays: 60`.** This is about 9 weeks, typical for 5-6 years at the current employer. An 8-year analyst who has been at the same employer the whole time would owe 13 weeks (91 days). Change it to 91 if the persona's story says all 8 years were at Acme.
  - https://employment.belgium.be/en/themes/employment-and-labor-market/employment-contracts/notice-periods-resignation-worker (search extract)
  - https://apps.eurofound.europa.eu/legislationdb/notice-period-to-employees/belgium

## Job boards
- **Traffic rankings.** Semrush and Ahrefs (2025-2026) consistently put VDAB, Indeed, LinkedIn, Le Forem and Jobat near the top, with StepStone and Actiris mid-table.
- **Actiris.** It is the Brussels public employment service. I kept it in because the persona lives in Brussels.
  - https://www.semrush.com/website/top/belgium/jobs/
  - https://ahrefs.com/websites/belgium/jobs-and-education

## Language (`lang2`)
- **Dutch.** In Brussels, French plus Dutch bilingualism is often a hiring criterion. Flanders, the larger job market, uses Dutch. French is the market's app language (`base.json` lang = fr), so the extra local language that matters on applications is Dutch. The culture notes also mention French.

## Employers (all real), with notes
- **Banks.** BNP Paribas Fortis, KBC and Belfius are the three largest Belgian banks. Belfius is 100% state-owned via SFPIM.
- **Islamic bank.** Not relevant in Belgium.
- **Telecoms.** Proximus is #1 and state majority-owned. Telenet (HQ Mechelen, filed under Antwerp metro) is #2 by revenue. Orange Belgium (Evere, Brussels) is #2 or #3 in mobile.
- **Sovereign.** SFPIM, the Federal Holding and Investment Company (https://belgianeconomicmission.be/organisation/sfpim).
- **Big-4.** Deloitte Belgium, at Gateway, Brussels Airport (Zaventem), which is inside the Brussels metro.
- **Others.**
  - AB InBev: HQ Leuven.
  - Colruyt Group: HQ Halle, Brussels metro.
  - Brussels Airlines: Lufthansa Group.
  - Ghent University Hospital: university hospital.
  - AG Insurance: largest insurer.
  - Odoo: HQ Grand-Rosière, Walloon Brabant, filed under the Louvain-la-Neuve metro.
  - Worldline: large Brussels payments operation.
  - Euroclear: Brussels HQ.
  - Euronext Brussels.
  - Umicore: Brussels HQ, formerly Union Minière.
  - UCB: Brussels HQ.
  - BESIX: construction and real-estate development.
  - National Bank of Belgium.
  - Port of Antwerp-Bruges.
  - ENGIE Belgium: formerly Electrabel.
- **Coolblue (caveat).** I chose it for the e-commerce slot. bol, Amazon, Zalando and Coolblue lead Belgian e-commerce, and Coolblue België NV has an Antwerp (Berchem) office. However, most of its finance and FP&A roles are probably in Rotterdam, so swap it out if a more Belgium-based e-commerce or food-delivery employer is preferred.
  - https://www.businesswire.com/news/home/20260129577105/en
  - https://www.coolblue.be/nl/vacatures/jobstudent-klantenservice-franstalig
- **Logo colours.** Brand-ish approximations, not official hex values.

## Cities and Arabic spellings
- **Order.** Brussels, Antwerp, Ghent, Leuven, Louvain-la-Neuve (Walloon Brabant), Liège, Kortrijk. Mechelen is folded into the Antwerp metro, and Walloon Brabant (Wavre, La Hulpe, Braine-l'Alleud) into Louvain-la-Neuve.
- **Arabic spellings.**
  - Attested: بروكسل، أنتويرب، غنت (marefa / e3arabi)، لوفان and لوفان لا نوف (Arabic KU Leuven pages)، لييج (e3arabi, Arabic Airbnb/Trip).
  - Less certain: ميخلن (Mechelen) and كورتريك (Kortrijk, as used in Arabic football coverage); have a native speaker check both.
  - Zaventem appears as زافنتم, as in Arabic coverage of Brussels Airport.
- **French forms.** Bruxelles, Anvers, Gand, Louvain, Liège, Courtrai, Malines, Vilvorde, Hal.

## Persona details
- **Employer.** Fictional "Acme Benelux" with subsidiary "Acme Capital Belgium", following the v5 Acme Financial / Acme Capital pattern.
- **Degree.** Master in Business Economics (Finance) from KU Leuven, the usual Flemish TEW-type master. Belgian finance hires usually hold a 5-year master's.
- **Certification.** CFA, from a shortlist of CFA, ITAA (certified accountant), IBR-IRE (registered auditor) and ACCA.
- **Phone.** +32 470 12 34 56 follows the mobile 04xx format. I know of no official Belgian range reserved for fiction.
