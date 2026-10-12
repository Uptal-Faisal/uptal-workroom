# JO (Jordan): sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up. WebFetch could not resolve hosts, and the egress proxy refused direct fetches (support.apple.com, taxsummaries.pwc.com, dlapiperdataprotection.com and support.google.com all returned CONNECT 403 or ENOTFOUND). Everything below comes from background knowledge up to mid-2026. It is **not verified against a live source**. Each fact has a confidence level. Where I was unsure I took the conservative option. Please verify the items marked **[verify]** before launch. Currency and price tier come from `base.json` (JOD, p1 29) and are unchanged.

## Payments
- **Cards first (high confidence).** Jordanian banks issue Visa and Mastercard debit, credit and prepaid cards, and these work for online payments. Amex is not a mainstream Jordanian card, so it is left out. Brands are `["visa","mc"]`.
- **eFAWATEERcom tile (high confidence it is ubiquitous; medium confidence on fit).** eFAWATEERcom (إي فواتيركم) is the Central Bank of Jordan's national electronic bill presentment and payment system. MadfoatCom has operated it since about 2015. Almost every bank app and licensed e-wallet can pay an eFAWATEERcom bill, and telecoms, universities, utilities and many online merchants use it. It suits users without an online-enabled card. It is not a card-on-file method, so each renewal becomes a new bill (this is stated in `legal.renewal`). **[verify that Uptal's gateway or a biller aggregator can register Uptal as a biller]**
- **CliQ left out as a tile (medium confidence).** JoPACC's instant-payment system (CliQ, about 2020) is very popular for person-to-person transfers by alias. I could not confirm a standard gateway checkout flow for subscriptions. **[verify; add CliQ request-to-pay later if the gateway supports it]**
- **Mobile wallets left out as their own tiles.** Zain Cash, Orange Money, UWallet (Umniah) and Dinarak run on JoMoPay. Their users can pay through eFAWATEERcom, so they are covered by that tile.
- **`localCardBrand: null` (medium-high confidence).** JoNet is the national switch, but it is not a consumer-facing card brand like mada or Meeza.
- **Wallets `[]` (low confidence, conservative).** I recall reports of Apple Pay and/or Google Pay launching with some Jordanian banks around 2024-2025, but I could not confirm which wallets are live or with which issuers. Showing a wallet that fails for most Jordanian cards is worse than leaving it out, so I left both out. **[verify on Apple's and Google's country lists; if live, set `["apple"]` and/or `["google"]`]**
- **BNPL `[]` (medium-high confidence).** Tabby and Tamara operate in the Gulf, not Jordan. No subscription-capable BNPL is common locally.
- **Recurring billing risk.** Some Jordanian debit cards are limited for online use or need the cardholder to enable e-commerce in the bank app. The card sub-line stays neutral.

## Tax
- **General Sales Tax 16% (high confidence).** Jordan has a General Sales Tax (ضريبة المبيعات العامة) under the General Sales Tax Law No. 6 of 1994 as amended. It is not called VAT. The general rate is 16%, with reduced and special rates for some goods. Consumer prices are shown tax-inclusive, so `incl: true` and the label reads "Sales tax included" / "شامل ضريبة المبيعات" / "Taxe sur les ventes incluse".
- **Digital services by non-residents (low confidence).** I am not sure whether Jordan now requires foreign B2C digital-service providers to register and charge GST. Showing 16% included is the conservative display either way, as long as Uptal remits or absorbs it. **[verify: PwC Worldwide Tax Summaries Jordan, "Other taxes", and the Income and Sales Tax Department (ISTD)]**

## Work rights
- **Legal basis (high confidence).** Labour Law No. 8 of 1996, Article 12: a non-Jordanian may be employed only with a work permit from the Ministry of Labour. The employer applies and pays the fee. The permit is normally for one year, renewable, and tied to that employer. Hiring a foreigner needs a skill that is not available among Jordanians.
- **Options.**
  1. Jordanian citizen. Jordan allows dual nationality (high confidence), so the sub-line includes dual nationals.
  2. Child of a Jordanian mother. A 2014 cabinet decision gave "privileges" (مزايا) to children of Jordanian women married to non-Jordanians, through a special ID card. These include priority in private-sector jobs after Jordanians (medium-high confidence). Later decisions and the 2019 Labour Law amendment added work-permit exemptions. I am not sure whether these exempt holders from the permit itself or only from its fees, or which closed professions they open (medium-low confidence). So the sub-line says "work-permit exemptions" without detail. **[verify with the Ministry of Labour; tighten the wording once confirmed]**
  3. Foreign national who already holds a Jordanian work permit. Permits are employer-specific, so a new employer applies for a new permit (medium-high confidence; the transfer rules have changed several times).
  4. Needs an employer to get a permit (last option). The sub-line mentions the closed-professions limit.
- **Left out (conservative).** Syrian refugees can get flexible work permits, but only in sectors open to them (agriculture, construction, manufacturing, some services), not finance. Gaza-origin Palestinians holding temporary Jordanian passports need permits under their own rules. Both fall under option 3 or 4 without special wording. Jordan is not in a free-movement bloc, so `autoFor: ["JO"]` only.
- **Rule text.** Jobs that are closed to non-Jordanians are skipped for permit-needing users. We focus on multinationals and regional offices, which are the realistic route for a foreign finance specialist.

## Nationalisation (closed professions)
- **Medium-high confidence.** The Ministry of Labour publishes a list of professions closed to non-Jordanians (المهن المغلقة). It has been updated several times since 2016, including around 2019-2020. As far as I know it has always included administrative and accounting professions, clerical and secretarial work, sales and others. Exceptions are possible for experts and specialists with ministry approval, and for some investment-law and special-zone cases.
- The user-facing copy names only "administrative, accounting and clerical jobs" and the specialist exception. It quotes no decision numbers. **[verify the current list and its date on mol.gov.jo before quoting it anywhere]**

## Sensitive fields
- **Photo `common`; gender, dob and nationality `ask`; marital `none` (medium-high confidence on the norm, not verified this run).** Jordanian CVs follow the regional Arab format: a photo and a personal-details block (date of birth, nationality, often marital status). Bayt profiles and local employer forms ask gender, date of birth and nationality. Nationality also drives the closed-professions and work-permit logic.
- Marital status is common on CVs but is not needed to apply and is a bias risk, so we do not ask. This is conservative and matches TN, LY and AE.
- Jordan has no broad recruitment anti-discrimination statute like the EU's. The 2019 Labour Law amendment banned gender-based pay discrimination (medium confidence). We still never filter on gender or age.

## Legal
- **Data protection (high confidence on name and number).** Personal Data Protection Law No. 24 of 2023 was published in the Official Gazette in September 2023 and came into force six months later, in March 2024. It created a Personal Data Protection Council, with a unit at the Ministry of Digital Economy and Entrepreneurship. The council is not named in the privacy line, to avoid getting its title wrong. **[verify implementing regulations and any cross-border transfer rules]**
- **Renewal.** Consumer Protection Law No. 7 of 2017 and Electronic Transactions Law No. 15 of 2015 apply (medium confidence on the numbers). I know of no Jordanian statutory cooling-off right for online subscriptions, and no specific auto-renewal law. So the disclosure is the generic "renews until you cancel; cancel anytime", plus the eFAWATEERcom note. It makes no withdrawal promise. Add a goodwill window if the business wants parity with TN.

## Salary (`f = 0.0577`, per month): low-medium confidence
- No live salary source was reachable. Background knowledge: a financial analyst in Amman earns roughly 700-1,200 JOD gross a month at 3-5 years. Senior analysts and FP&A leads with about 8 years at banks, telecoms, listed groups and multinationals earn about 1,300-1,900 JOD. Regional offices of multinationals and INGOs pay at the top of that range or above. The national average wage is about 550-650 JOD.
- Chosen: 1,500 JOD gross a month. f = 1,500 / 26,000 = 0.0577, so the current salary maps to about 1,500 JOD and the expected 34,000 SAR to about 1,960 JOD, a plausible next-step offer in Amman.
- Many Jordanian banks and large companies pay 14 to 16 salaries a year. The monthly figure leaves that out. Jordanians quote gross monthly pay.
- **[verify with Bayt salary data, Paylab Jordan or a local recruiter]**

## Employers (all real; HQ city as commonly listed)
- **High confidence that each is real and hires finance staff in Amman:**
  - Arab Bank: the largest bank, with group HQ in Shmeisani.
  - Housing Bank: second by assets.
  - Jordan Islamic Bank: the largest Islamic bank.
  - Bank al Etihad.
  - Zain Jordan and Orange Jordan.
  - Jordan Petroleum Refinery Company (JoPetrol): HQ Amman, refinery in Zarqa/Hashemiyah.
  - Arab Potash Company: HQ Amman, plant at Ghor Al-Safi.
  - Jordan Phosphate Mines Company: HQ Amman, mines at Eshidiya and Al-Hassa.
  - Social Security Investment Fund: the largest institutional investor.
  - Central Bank of Jordan.
  - Amman Stock Exchange.
  - Aqaba Development Corporation: state-owned, in Aqaba.
  - EY Jordan.
  - Hikma Pharmaceuticals: group HQ London, founded in Amman with large Amman operations.
  - Siniora Food Industries: listed on the ASE.
  - Carrefour Jordan, operated by Majid Al Futtaim.
  - Royal Jordanian.
  - King Hussein Cancer Center.
  - OpenSooq: founded in Amman.
  - MadfoatCom: the eFAWATEERcom operator.
  - talabat: operates in Jordan.
  - Aramex: founded in Amman, group HQ Dubai, large Amman base.
- **Medium confidence:**
  - Ranking. Zain as telecom #1 by mobile subscribers, ahead of Orange, with Umniah third. Housing Bank as #2 bank and JIB as #3 by deposits. These rankings shift by metric.
  - GIG Jordan (formerly Arab Orient Insurance) as the largest insurer by premiums. **[verify current brand name]**
  - "Hospital group". No large private hospital group was verified, so KHCC, a non-profit specialist centre, is the closest major hospital employer with a sizeable finance function. A private alternative is Jordan Hospital or Al Khalidi.
  - Real estate. Jordan has no giga-project developer. ADC develops and operates Aqaba's economic zone and also covers the semi-government slot. Abdali Investment & Development is a possible swap.
- **Not included.** Umniah (telecom #3), Capital Bank, Cairo Amman Bank, NEPCO and JEPCO (power) and Nuqul Group are all real and could swap in.
- Almost every finance HQ is in Amman, so 23 of 24 employers are in Amman. This matches the market.
- Logo colours are approximate, brand-ish colours, not official brand values. The Housing Bank, Bank al Etihad, Arab Potash and Hikma colours are the least certain.

## Other
- **Work week `sun-thu` (high confidence).** Jordan's official weekend has been Friday-Saturday since 2000. Some private firms work a Saturday half-day (noted in culture).
- **Notice `30` (high confidence).** Labour Law No. 8 of 1996, Article 23: one month's written notice to end an open-ended contract. Senior contracts may set longer periods.
- **Phone.** +962. Mobile numbers are 9 digits after the country code: 77 (Orange), 78 (Umniah), 79 (Zain) (high confidence).
- **Boards.**
  - LinkedIn: multinationals and banks.
  - Bayt: the main regional board, very strong in Jordan.
  - Akhtaboot: Jordanian board.
  - Tanqeeb: Amman-based job aggregator.
  - Indeed is left out because I could not confirm its weight in Jordan.
  - Medium confidence on relative weight.
- **lang2: Arabic.** This matches AE and LY. English is asked separately, and English fluency matters on finance applications (noted in culture). Arabic matters for local and public employers, and for non-Arab applicants.
- **govPlatforms `[]` (conservative).** Work permits are employer-side. The Ministry of Labour runs a national employment / job-matching platform, which I recall as "Sajjil" (sajjil.gov.jo, National Employment Program, 2020). I could not confirm it is current or used by finance professionals, so it is not listed. **[verify; add it if live]**
- **Certifications.**
  - CMA (US): very strong in Jordan, with many local training providers. It is the persona's cert.
  - CFA.
  - CPA (US): popular with auditors.
  - JCPA: the local licence, the Jordanian Certified Public Accountant exam run by the Jordan Association of Certified Public Accountants (JACPA) (medium-high confidence).
  - ACCA was left out to keep four.
- **Universities (high confidence).**
  - University of Jordan: the oldest and largest, School of Business.
  - Yarmouk University: Irbid.
  - Princess Sumaya University for Technology: King Talal School of Business Technology.
- **Accounting standards (high confidence).** Jordanian companies report under IFRS, so the bio says IFRS reporting.
- **Persona.** Khaled Haddad, male, Jordanian, Amman, from roster.json. The employer "Zahran Holding Group" (named after Zahran Street/district in Amman) is fictional, as is its subsidiary "Zahran Trading".
- **Arabic register.** "neutral" per `base.json`. Proper names follow local usage: عمّان، إربد، الزرقاء، العقبة، السلط، مادبا. French forms: Amman, Irbid, Zarqa, Aqaba, Salt, Madaba (same as English). The country is "la Jordanie" / "en Jordanie".
