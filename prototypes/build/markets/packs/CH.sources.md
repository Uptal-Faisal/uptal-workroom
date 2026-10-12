# CH market pack: sources and reasoning

Written 2026-10-12. Persona: Laura Meier (f, Swiss, Zurich), taken from `roster.json` id `CH`. Currency CHF and price tier (p1 99 / p4 84 / p12 69) come from `base.json` and were not changed.

**I could not do live research for this run.** The shared web-search budget was used up before my first query. WebFetch could not resolve any host I tried (estv.admin.ch, ch.ch, fedlex.admin.ch, twint.ch, docs.stripe.com), and the egress proxy refused sem.admin.ch and wikipedia.org. Every fact below comes from prior knowledge (to mid-2026). Each one has a confidence level, and the ones to re-check are tagged **VERIFY**. Where I was unsure, I chose the conservative option. The "Re-check" list at the end gives the official pages to confirm against.

**Fact-check pass (2026-10-12).** This pass could not go online either. WebSearch hit the shared budget, and WebFetch / curl could not resolve estv.admin.ch, fedlex.admin.ch, docs.stripe.com, sem.admin.ch, twint.ch, swissinfo.ch or wikipedia.org. The checks were made against prior knowledge and the engine code. Three things changed:
- The gender note now matches what the engine really renders, and the false "follows DE" claim is gone.
- The Lausanne / Geneva metro wording no longer clashes.
- Two copy fixes: "EU" became "EU/EFTA" in the graduate option, and the French wording of the B-permit line is more natural.

Every **VERIFY** item below is still open.

## Payments
- **Order: card, TWINT, PayPal.** (Medium confidence.)
  - Swiss online checkout runs mainly on credit and debit cards, TWINT, invoice (Rechnung / facture) and PayPal.
  - TWINT is the bank-owned Swiss mobile payment app. It has more than 5 million active users, and it dominates P2P and in-store mobile payments.
  - From memory of the Swiss Payment Monitor (ZHAW / University of St. Gallen), cards still led online by transaction count in 2024-25, with TWINT growing fast and close behind. I am not sure TWINT now *dominates* online. The spec says to put cards first unless a local method dominates, so card goes first. **VERIFY** against the latest Swiss Payment Monitor; if TWINT has overtaken cards online, it can move to first place.
- **TWINT renewals. VERIFY.** (Low confidence.)
  - TWINT supports stored or recurring authorisations ("TWINT registration", used for subscriptions) through Swiss PSPs such as Datatrans, Worldline Saferpay, Payrexx and Wallee.
  - I am not sure every international PSP (e.g. Stripe) supports TWINT for recurring charges. When TWINT is used through Stripe, it is one-off only as far as I know.
  - The sub-label therefore promises nothing about renewals ("Pay in the TWINT app"). If our PSP cannot renew via TWINT, multi-month plans need a fresh TWINT approval at renewal, or a fall-back to card.
- **Card brands: Visa, Mastercard, Amex.** (High confidence.)
  - Swiss bank debit cards moved from Maestro / V PAY to Debit Mastercard / Visa Debit in 2023-24. These work online, so the sub-label says "credit or debit".
  - Amex is issued locally (mainly by Swisscard) and is more common than in most EU markets.
- **PayPal.** (Medium-high confidence.) Widely used by Swiss online shoppers, so it is kept as the third method.
- **Wallets: Apple Pay and Google Pay.** (High confidence.)
  - All major Swiss issuers support Apple Pay.
  - Google Pay is supported by most of them.
  - Samsung Pay exists in Switzerland but only with some issuers, and it is not a standard web-checkout button, so it is left out. This matches the other packs.
- **BNPL: none (`[]`).** (Medium confidence.)
  - Pay-later in Switzerland mostly means 30-day invoice, through providers such as Powerpay, CembraPay (formerly Byjuno) and Swissbilling. Klarna has some Swiss presence.
  - I could not confirm any subscription-capable BNPL that is common, so the conservative choice is none.
  - **Possible addition.** Paying by invoice / QR-bill / eBill is very Swiss, including for subscriptions. If the PSP supports it, it could be added later as a method (not as BNPL).
- **localCardBrand: null.** (Medium confidence.)
  - The only domestic card is the PostFinance Card. As far as I recall, it is now co-badged with Debit Mastercard for online use, and accepting the domestic-only version needs separate PostFinance acquiring.
  - TWINT is not a card. So no local card brand is shown. **VERIFY** whether the PSP can accept PostFinance Card / PostFinance Pay; if so, it could be added as a method.

## Tax
- **Rate.** The Swiss standard VAT (MWST / TVA) rate is **8.1%**, in force since 1 Jan 2024 (raised from 7.7% to fund AHV 21). (High confidence.)
- **Foreign sellers.** Foreign providers of electronic services to Swiss consumers must register and charge Swiss VAT once their worldwide turnover reaches CHF 100,000.
- **Price display.** The Price Indication Ordinance (PBV / OIP) requires consumer prices to be shown including VAT and other charges, so `incl: true`.
- **VERIFY: pending rate changes.** Parliament has been debating further VAT increases to fund the 13th AHV pension (a rise of about 0.5-0.7 points, from 2028 at the earliest) and possibly defence. Any increase needs a constitutional amendment and therefore a mandatory referendum. I don't know of any change in force as of October 2026, but re-check before launch.

## Work rights
- **Auto-answered (`autoFor`).** (High confidence.) This covers CH, the EU27 and the other EFTA states (IS, LI, NO).
  - EU/EFTA citizens have free movement under the Agreement on the Free Movement of Persons (AFMP) and the EFTA Convention. They need no work permit and no labour-market test.
  - **Registration.** Jobs of up to 3 months per calendar year only need the employer's online notification. Longer jobs mean registering with the commune for:
    - an L permit (contract under 1 year),
    - a B permit (1 year or more, or open-ended),
    - a G permit (cross-border commuter living in a neighbouring country).
  - **Croatia.** Croatia's transitional limits ended, and the safeguard-clause cap on B permits was a temporary measure (2023, possibly also 2024). It never affected L permits or the right to work, so HR is included.
  - **UK.** UK citizens are *not* auto-answered after Brexit. Those already working in CH before 2021 keep their rights under the Citizens' Rights Agreement and will usually hold a B, C or G permit, which the options cover.
- **Statuses offered, in order** (most from the Foreign Nationals and Integration Act, AIG / LEI):
  1. **Swiss citizen.**
  2. **EU/EFTA citizen.** The sub-line explains the L / B / G registration.
  3. **Settlement permit C.** Free access to the whole Swiss labour market (Art. 38 AIG). (High confidence.)
  4. **Residence permit B (non-EU/EFTA).** (Medium confidence.)
     - My recollection is that Art. 38(2) AIG lets holders of a B permit issued for employment work anywhere in Switzerland and change job or occupation without a new permit.
     - Family members of Swiss, C or B holders may work (Art. 46 AIG).
     - Moving your residence to another canton needs that canton's approval (Art. 37 AIG).
     - Student B permits allow only about 15 hours a week during term.
     - The copy hedges with "usually". **VERIFY** Art. 38 on fedlex.
  5. **Short-term permit L or cross-border permit G (non-EU/EFTA).** These are tied to the job, so a new employer must apply again. (Medium confidence.)
  6. **Recent degree from a Swiss university.** (Medium-high confidence.)
     - Art. 21(3) AIG gives third-country graduates of Swiss universities 6 months after graduation to look for a job.
     - Their employer still needs a permit, but the priority for Swiss and EU/EFTA candidates is waived where the job is of "high scientific or economic interest". Quotas still apply.
  7. **I need a work permit.** (Medium-high confidence.)
     - The employer applies to the cantonal labour-market / migration office, and SEM (the federal migration office) gives final approval.
     - Third-country hires must be qualified (managers, specialists, graduates; Art. 23 AIG), on local pay and conditions (Art. 22 AIG), with priority given to the domestic and EU/EFTA workforce (Art. 21 AIG), and within the annual federal quotas.
     - My recollection of the quotas: 8,500 a year for third-country nationals (4,000 L + 4,500 B), plus a separate UK quota of 3,500 (1,400 L + 2,100 B), renewed yearly since 2021. **VERIFY** the 2026 figures.
- **Not offered (only 7 options allowed).** Each of these is mentioned here so the product can add it if needed:
  - **Status S (Ukraine).** Holders may work, but the employer must get a permit or file a notification, depending on the current rules.
  - **Provisional admission F and refugees B.** Only notification is needed.
  - **Ci permits** (spouses of international-organisation staff in Geneva).
- **Rule copy.** Swiss ads often say "only candidates with Swiss / EU-EFTA nationality or a valid work permit". Matching skips those for people who need sponsorship.
- **VERIFY: "No to 10 million Switzerland".** This SVP "sustainability" initiative, aiming to cap population, was due for a popular vote around June 2026, and I don't know the result. Even if it was accepted, it would not end free movement immediately: it sets thresholds and asks the government to act, with termination of the AFMP only as a last resort. The new EU-Swiss package of bilateral agreements is also going through ratification. Re-check both before launch.

## Nationalisation
- **Set to "Swiss and EU/EFTA hiring priority"**, which mirrors the IE pack's "EEA hiring priority".
- **Domestic priority (Inländervorrang, Art. 21 AIG).** There is no quota of Swiss staff and no reserved private-sector profession. The constraint is that a third-country national can be hired only if no suitable Swiss or EU/EFTA candidate is found, the role is qualified, pay is local and a quota place is free.
- **Job-registration duty (Stellenmeldepflicht, since July 2018).** (High confidence that it exists; medium on the details.)
  - In occupation types with national unemployment of at least 5%, employers must report openings to the RAV / ORP (the regional employment centres).
  - Those jobs are visible only to registered job seekers for 5 working days.
  - The list is updated yearly. As far as I know it does not include financial analysts or controllers, but it can affect some back-office and clerical roles. **VERIFY** the 2026 list at arbeit.swiss.

## Sensitive fields
- **Photo: common.** (Medium-high confidence.)
  - Swiss CV guidance (ch.ch, jobs.ch, the career services of the cantonal employment offices) has long said a professional photo is customary on Swiss CVs.
  - International firms in Zurich and Geneva and some public employers increasingly go without one.
  - We suggest a photo, never require it, and never send it to forms that don't ask for it.
- **Gender: ask.** Swiss application forms (jobs.ch, SuccessFactors / Workday instances at Swiss employers) usually make "Frau / Herr" or "Madame / Monsieur" mandatory.
  - **Fact-check correction (2026-10-12).** The earlier text said this "follows the DE approach" and that it is asked "as salutation only, with a 'no salutation' option". Both were wrong. The DE pack was switched to `gender: "none"`. The engine renders `"ask"` as a binary Female / Male "Gender" chip pair (`js/50-onboarding.js`, paintProfile), with no salutation wording and no "no salutation" option. The notes in the JSON now describe this.
  - **Why `ask` stays for CH.** DE moved to `none` because of the German "divers" norm (BVerfG 2017, PStG 2018) and an AGG ruling on binary-only salutations. Switzerland has neither: civil status is binary (the Federal Council declined a third gender entry in 2022), there is no AGG equivalent, and sex is not "sensitive personal data" under Art. 5(c) FADP. A required Frau / Herr is the Swiss form norm. Confidence: medium. If product prefers privacy-first, switch to `none` (the EU fallback) and leave a required salutation for the user to fill on the form.
- **Date of birth and nationality: ask.**
  - Both are standard in the personal-details block of Swiss CVs, together with the permit type for foreign nationals.
  - Nationality is also the practical key for EU/EFTA vs. third-country permit rules.
  - Switzerland has no general private-sector anti-discrimination act like Germany's AGG; the Gender Equality Act covers sex only. Art. 328b of the Code of Obligations (CO) limits employer data processing to what is relevant to the job. Nationality is relevant because it decides the permit route. Date of birth is not strictly job-relevant, but giving it on the CV is customary and no Swiss rule bars it. (Fact-check wording fix: the earlier text said both are "treated as relevant", which overstated it for age.)
- **Marital status: none.** It is traditional (Zivilstand) but fading, not needed and a bias risk, so the conservative choice is not to ask. This matches the other packs.
- **Never collected.** The AHV / AVS number.
- **Confidence.** Medium overall. **VERIFY** current ch.ch CV guidance.

## Legal
- **Data protection.** The revised Federal Act on Data Protection (FADP; nDSG / revDSG; LPD in French) has been in force since 1 Sep 2023. (High confidence.) The GDPR may also apply to EU-resident users, but the Swiss pack names the FADP.
- **Renewal.** (Medium-high confidence.)
  - Swiss law has no general 14-day withdrawal right for online purchases. The cooling-off right in Art. 40a ff. CO covers doorstep and similar sales and, since 2016, telephone sales, but not online contracts: Parliament declined to extend it to e-commerce in that revision.
  - There is also no specific auto-renewal statute, but the Unfair Competition Act (UWG Art. 8) polices unfair terms.
  - So the copy is a clear auto-renew disclosure with cancel-anytime-in-Settings and service until the end of the paid term, and it promises no statutory withdrawal right. **VERIFY** whether any 2025-26 consumer-law change on automatic contract renewals (motions on "Abofallen") has passed.

## Salary
- **CHF 120,000 gross a year, including the 13th salary.** That is CHF 10,000 a month on a 12-month basis, so f = 10,000 / 26,000 = **0.3846**.
- **Sources (prior knowledge only; medium-low confidence).**
  - Michael Page, Robert Half and Hays Switzerland salary guides (2024-25): senior financial / FP&A analysts with 5-10 years roughly CHF 105-135k in Zurich, and FP&A managers about CHF 130-170k.
  - Federal Salarium calculator (Swiss Earnings Structure Survey): university-educated finance specialists in their mid-30s in the Zurich region at about CHF 110-125k.
- **Why `per: year`.** Swiss pay is quoted gross per year ("CHF 120'000 x 13" is often split). **VERIFY** with Salarium or the latest Robert Half guide.

## Notice
- **Statutory notice.** Art. 335c CO: 1 month in the first year of service, 2 months in years 2-9 and 3 months after that, to the end of a month, after a probation of 1-3 months with 7 days' notice. (High confidence.)
- **`noticeDays`: 90.** Contracts for experienced finance staff routinely set 3 months, and the persona has 8 years.

## Employers (all real)
- **Coverage.** The required sectors are covered: see `sectorsCovered`.
- **Sovereign / public investment.** Switzerland has no sovereign wealth fund, so this is n/a. The Swiss National Bank sits under government.
- **Islamic bank.** Not relevant.
- **Locations, filed under the metro city:**
  - Axpo: HQ in Baden, Aargau, filed under the Zurich metro.
  - Sunrise: Opfikon, filed under Zurich.
  - Hirslanden: corporate office in Glattpark (Opfikon), filed under Zurich.
  - Swissquote: Gland, Vaud, filed under the Geneva metro.
  - Nestlé: Vevey, filed under Lausanne.
  - Glencore: Baar, filed under Zug.
  - Swisscom: Ittigen / Worblaufen, filed under Bern.
  - SWISS: legal seat in Basel, but its hub and most finance roles are at Zurich Airport, so it is filed under Zurich.
- **Scandit caveat.** It is a mid-size scale-up of a few hundred staff, chosen for the tech-scale-up slot. Swap it for Nexthink (Lausanne) or Climeworks (Zurich) if a larger one is preferred.
- **MSC.** Added because Geneva is a shipping and commodity-trading hub with many finance roles. Vitol, Trafigura and Mercuria are alternatives.
- **Logo colours.** Brand-ish approximations, not official hex values.
- **Monograms.** All unique. SWISS uses its IATA code LX.
- **French names.** BNS for the SNB and CFF for SBB, as used in Romandie.
- **Recently changed (re-check). VERIFY.** Sunrise was spun off from Liberty Global and listed on SIX in Nov 2024. UBS completed the Credit Suisse integration in 2024-26.

## Cities and spellings
- **Lausanne metro wording (fact-check fix).** It used to say "covers the Vaud shore of Lake Geneva". That clashed with the Geneva entry, which claims Nyon and Gland (also on the Vaud shore), so it now just lists Renens, Écublens, Morges, Vevey and Montreux.
- **Order by finance / FP&A job density:** Zurich, Geneva, Basel, Zug, Lausanne, Bern, Lugano, St. Gallen. St. Gallen is in for Raiffeisen and HSG. Lucerne and Winterthur are folded out: Winterthur sits in the Zurich metro.
- **French forms.** Genève, Bâle, Zoug, Berne, Saint-Gall, Winterthour.
- **Arabic spellings.**
  - Common: زيورخ، جنيف، بازل، لوزان، برن، لوغانو.
  - From Arabic Wikipedia usage as I recall it: تسوغ (Zug), سانت غالن.
  - Smaller places are my transliterations, to be checked by a native speaker: ميران (Meyrin, French pronunciation), روتكرويتس (Rotkreuz), أوسترموندغن (Ostermundigen), كايزرأوغست (Kaiseraugst), and similar.

## Certifications, universities, boards
- **Certifications.**
  - CFA: Zurich and Geneva are big CFA markets.
  - Expert in Financial Accounting and Controlling with federal diploma ("dipl. Experte/Expertin in Rechnungslegung und Controlling"; French "Expert en finance et controlling avec diplôme fédéral"): the senior Swiss controlling qualification.
  - Specialist in Finance and Accounting with federal certificate ("Fachmann/Fachfrau im Finanz- und Rechnungswesen mit eidg. Fachausweis"; French "Spécialiste en finance et comptabilité avec brevet fédéral").
  - ACCA: used at international firms.
  - **VERIFY** the exact official English titles.
- **Universities.**
  - University of St. Gallen (HSG).
  - University of Zurich: the persona's MA in Banking and Finance is a real UZH programme as far as I know.
  - HEC Lausanne (UNIL).
- **Boards.**
  - jobs.ch and jobup.ch, both JobCloud; jobup.ch leads in Romandie.
  - LinkedIn, Indeed and eFinancialCareers (Zurich / Geneva banking).
  - Job-Room on arbeit.swiss: the federal public employment service board, and the channel for jobs subject to the job-registration duty.
- **govPlatforms: [].** Work permits are filed by the employer with the cantonal office, not by the candidate on a platform, which matches DE.

## Persona and phone
- **Employer.** Fictional "Acme Schweiz AG / Acme Suisse SA", with subsidiary "Acme Capital AG / SA", following the v5 Acme pattern. Swiss firms often use German / French legal forms in parallel.
- **Bio.** Mentions Swiss GAAP FER (French: Swiss GAAP RPC), the standard many Swiss non-listed groups report under, alongside IFRS.
- **Phone.** +41 79 123 45 67 follows the Swiss mobile format (07x). I know of no official Swiss number range reserved for fiction, so this is a placeholder pattern.

## Re-check list (official pages, not fetched this run)
- VAT rates: https://www.estv.admin.ch/estv/en/home/value-added-tax/vat-rates-switzerland.html
- Foreign Nationals and Integration Act (AIG / LEI), Arts. 21-23, 37, 38, 46: https://www.fedlex.admin.ch/eli/cc/2007/758/en
- SEM permit types and quotas: https://www.sem.admin.ch/sem/en/home/themen/aufenthalt.html and https://www.sem.admin.ch/sem/en/home/themen/arbeit/nicht-eu_efta-angehoerige.html
- Job-registration duty list: https://www.arbeit.swiss/secoalv/en/home/menue/unternehmen/stellenmeldepflicht.html
- CV guidance: https://www.ch.ch/en/work/job-search/
- Code of Obligations, Arts. 328b, 330a, 335b, 335c: https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en
- FADP: https://www.fedlex.admin.ch/eli/cc/2022/491/en
- Swiss Payment Monitor: https://www.swisspaymentmonitor.ch
- TWINT for business / recurring: https://www.twint.ch/en/business/
- Salarium: https://www.gate.bfs.admin.ch/salarium/public/index.html
