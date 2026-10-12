# LY (Libya): sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up, and the egress proxy refused direct fetches (taxsummaries.pwc.com, wikipedia.org, cbl.gov.ly, ilo.org, libyaherald.com and others all returned CONNECT 403). Everything below comes from background knowledge up to mid-2026. It is **not verified against a live source**. Each fact has a confidence level and, where useful, the place to check it. Where I was unsure I took the conservative option. Please verify the items marked **[verify]** before launch. Currency and price tier come from `base.json` (LYD, p1 149) and are unchanged.

## Payments
- **Context (high confidence).** Libya has had a long cash-liquidity crisis since about 2016. Since then the Central Bank of Libya (CBL) has pushed electronic payments: local debit cards on the domestic switch, POS terminals and licensed mobile-payment services. Most cards Libyans hold are domestic bank cards. Internationally usable Visa/Mastercard cards come from the banks and are loaded under the personal foreign-currency allowance. A surcharge on official FX purchases has applied since 2024, and its rate has changed several times. The official rate was devalued in April 2025 (about 13%, to roughly 5.5 LYD/USD). A parallel market exists. **[verify current FX rules with CBL]**
- **Checkout assumption.** `base.json` prices in LYD, so the pack assumes Uptal collects LYD through a licensed Libyan acquirer or gateway. That route accepts domestic bank cards and locally issued Visa/Mastercard, and it avoids the FX allowance and surcharge. This is an implementation assumption: please check it with the business, as with TN.
- **Methods: card only.** The sub-line reads "Libyan bank card, Visa or Mastercard", with brands `["visa","mc"]`. Amex is not a normal Libyan card, so it is left out.
- **Mobile wallets left out (conservative).** Several Libyan mobile-payment and e-wallet services exist; Sadad, Tadawul, MobiCash and Edfa3ly are the names I recall. I could not confirm which ones are licensed today, which ones a gateway can take for a subscription, or who operates each one. So none is a tile. **[verify with the chosen gateway; add the leading wallet as a second tile if it supports merchant checkout]**
- **`localCardBrand: null`.** Libyan domestic cards run on the national switch, but I could not confirm a consumer-facing scheme brand name (like mada or Meeza) without a live check. Null is the conservative value. **[verify]**
- **Wallets `[]` (high confidence).** Apple Pay and Google Pay are not offered by Libyan issuers.
- **BNPL `[]` (high confidence).** Tabby, Tamara, Klarna and similar services do not operate in Libya.
- **Recurring billing risk.** Domestic cards may not support card-on-file or recurring charges. Check with the acquirer. The renewal copy is generic and does not promise automatic card charging beyond "renews automatically".

## Tax
- **No VAT (high confidence as of mid-2026).** Libya has no VAT or general sales tax. Drafts have been discussed for years but, as far as I know, none has been enacted. Indirect taxes are mainly stamp duty and customs duties. **[verify: PwC Worldwide Tax Summaries, Libya, "Other taxes"]**
- **`incl: true, rate: 0`, label "All taxes included" / "شامل جميع الضرائب" / "Toutes taxes comprises".** I chose this over "No VAT" because it stays true even if a stamp duty or a new levy applies to the receipt, as long as Uptal absorbs it. If Libya adopts VAT, change `rate` and the label.

## Work rights
- **Legal basis (medium-high confidence).** Labour Relations Law No. 12 of 2010 and its implementing regulations govern foreign workers. A foreigner needs a work permit from the Ministry of Labour (currently styled the Ministry of Labour and Rehabilitation) plus a work visa and residence from the Passports and Nationality Authority. The employer applies. A foreigner may be hired only when no qualified Libyan is available, and a new employer needs a new permit. The user-facing copy says "Ministry of Labour" because the full ministry title has changed between governments.
- **Options.** (1) Libyan citizen. (2) A foreigner who already holds a Libyan work permit, so a new employer re-applies. (3) A foreigner living in Libya on another residence, for example family residence, so the employer still needs a permit. (4) Needs sponsorship. The sponsorship option mentions the labour-market test.
- **Left out (conservative).** No free-movement bloc applies. Maghreb and bilateral agreements, such as the old Libya-Tunisia and Libya-Egypt arrangements, are not reliably applied today, so I did not add a status for them. Children of Libyan mothers have received some "treated as Libyan" decisions for services. I could not confirm that these cover private-sector work rights, so this is not offered as a status. **[verify]**
- **Citizen sub-line: "With a national number".** The national number (الرقم الوطني) is required on payroll and on state-sector applications (high confidence). Dual nationality is not mentioned because Libyan nationality law restricts it.
- **`autoFor: ["LY"]` only.**

## Nationalisation ("Libyanisation", تلييب الوظائف)
- The name is the term used locally (high confidence for the term).
- The national-preference rule (foreigners only where no qualified Libyan is available) comes from Law 12/2010 (medium-high confidence).
- Oil sector: Libyanisation and training obligations go back to the Petroleum Law (No. 25 of 1955) and NOC policy. This is phrased softly in the copy: companies "are expected to" train and promote Libyans (medium confidence).
- Permanent public-sector posts require Libyan nationality, and foreigners work there only on contract (medium-high confidence). **[verify article numbers before quoting them anywhere]**

## Sensitive fields
- **Photo `common`; gender, dob and nationality `ask`; marital `none`.** Libyan CVs follow the regional Arab format: photo plus a personal-details block (date of birth, nationality, often marital status). Forms at state companies, banks and NOC subsidiaries ask for gender, date of birth, nationality and the national number (high confidence on the norm, not source-verified this run).
- Nationality also drives the work-permit logic.
- Marital status is common on CVs but is not needed to apply and is a bias risk, especially for women, so we do not ask (conservative, same choice as TN, MA and AE).

## Legal
- **Data protection (medium-high confidence).** Libya has no comprehensive personal data protection law and no data protection authority. Privacy rests on the 2011 Constitutional Declaration (private life) and sector laws. I recall an Electronic Transactions Law (No. 6 of 2022) and an Anti-Cybercrime Law (No. 5 of 2022). The numbers are unverified, so the user-facing privacy line names no Libyan statute. It promises GDPR-level handling instead, which is true for Uptal and safe. **[verify the law numbers before putting them in user-facing copy]**
- **Renewal.** I know of no Libyan auto-renewal or distance-selling withdrawal statute, so the disclosure is the generic "renews until you cancel; cancel before the renewal date". This is conservative. It gives no withdrawal promise, because none is required that I know of. Add one if the business wants parity with TN.

## Salary (`f = 0.173`, per month) — low confidence
- No live salary source was reachable. Background knowledge: public-sector finance staff earn about 1,500-2,500 LYD a month. State banks and NOC companies raised pay in 2022-2024. Oil JVs, multinationals and international organisations pay well above that. The minimum wage was raised to 1,000 LYD (2023-2024).
- Chosen: about 4,500 LYD gross a month for 8 years at a large Tripoli employer. f = 4,500 / 26,000 = 0.173, so the current salary maps to about 4,500 LYD and the expected 34,000 SAR to about 5,880 LYD, a plausible oil, JV or international-organisation offer.
- At the official rate of about 5.5 LYD/USD, 4,500 LYD is about USD 820 a month. Libyans often quote net pay.
- **[verify with a local recruiter or salary survey, such as LibyanJobs, Bayt or Paylab if it covers Libya, before relying on this]**

## Employers (all real; HQ city as commonly listed)
- **High confidence:** NOC (Tripoli); AGOCO (Benghazi); Mellitah Oil & Gas (NOC-Eni JV, Tripoli); Brega Petroleum Marketing (Tripoli); Jumhouria Bank (Tripoli, largest bank); National Commercial Bank (Al Bayda); Wahda Bank (Benghazi); Sahara Bank (Tripoli); Libyan Islamic Bank; Central Bank of Libya (unified in 2023); Libyan Investment Authority; GECOL; Libyana and Al-Madar Al-Jadeed (the two mobile operators, both under the state holding LPTIC, Libyana the larger); Libyan Airlines; Libya Insurance Company; Tripoli Medical Center; Libyan Stock Market; LISCO (Misrata); Housing and Infrastructure Board.
- **Medium confidence:**
  - EY Libya: EY has had a Libya practice under EY MENA. **[verify it is still staffed]**
  - Al Naseem: the Misrata dairy and juice maker. **[verify legal name and size]**
  - Libyan Spider: hosting and cloud, Tripoli.
  - Moamalat: Libyan card and e-payment processing company. **[verify current status]**
- **Gaps (stated in `sectorsCovered`).**
  - Retailer: no modern retail chain of national scale was verified, so Brega's filling-station network is the closest consumer-retail employer.
  - Food delivery and e-commerce: no employer of scale. Talabat, Glovo and Jumia do not operate in Libya.
  - Private hospital group: none verified, so the public Tripoli Medical Center is used.
- **East/west split.** Since 2014 Libya has had rival administrations: Tripoli (GNU) and the east (Benghazi/Sirte-based government). National institutions such as NOC and CBL are formally unified, but some state entities run parallel offices. Employer HQs follow the commonly listed head office.
- Logo colours are approximate, brand-ish colours, not official brand values.

## Other
- **Work week `sun-thu`** (high confidence). Libya's weekend has been Friday-Saturday since the early 2010s.
- **Phone.** +218 with 9-digit mobile numbers (9X XXX XXXX). The 91/93 prefixes are Al-Madar and 92/94 are Libyana (high confidence).
- **Boards.**
  - LinkedIn: oil, JVs, multinationals.
  - LibyanJobs: the main local job board.
  - Bayt: regional.
  - ReliefWeb: the UN, INGOs and NGOs are big employers of Libyan finance staff.
  - OpenSooq: classifieds with a large Libyan jobs section.
  - Facebook pages and groups also carry many vacancies (noted in culture).
  - Medium confidence on relative weight.
- **lang2: Arabic.** Arabic is the working language of state bodies, banks and local firms, and English is already asked separately. This matches AE. If the onboarding module already adds Arabic "where relevant" for this market, drop `lang2` to null to avoid a duplicate row.
- **govPlatforms `[]`.** Work permits and residence are employer-side processes, and I could not confirm a public job-seeker platform that candidates normally use. Conservative.
- **Certifications.**
  - CMA (US): strong in MENA FP&A, so it is the persona's cert.
  - ACCA and CFA.
  - The local licence: a chartered/licensed accountant registered with the Libyan Accountants and Auditors Association, regulated by Law No. 116 of 1973 (medium confidence on the law number).
- **Universities.** University of Tripoli (Faculty of Economics), University of Benghazi (Faculty of Economics; the oldest university) and the Libyan Academy for Postgraduate Studies (Janzour, Tripoli) (high confidence).
- **Notice period.** About one month is customary for monthly-paid staff, so `noticeDays: 30`. **[verify against Law 12/2010]**
- **Arabic register.** "neutral" per `base.json`. Proper names follow local usage: طرابلس، بنغازي، مصراتة، الزاوية، البيضاء، طبرق، سبها. French forms: Tripoli, Benghazi, Misrata, Zaouïa, Al Bayda, Tobrouk, Sebha.
- **Persona.** Huda El-Mabrouk (هدى المبروك), from the roster.
  - The employer "Lebda Group" / "Lebda Trading" is fictional, named after Leptis Magna (لبدة). It is not a known company.
  - The bio mentions IFRS reporting plus local statutory accounts. Libyan companies file under the Commercial Law and tax rules, while banks and oil JVs report IFRS.
  - The bio also mentions FX exposure, which is a real pain point for Libyan finance teams.
  - Tools: SAP, Excel and Power BI. Some NOC companies use Oracle instead.
- **People names.** Common Libyan given names and family/tribal names. I avoided surnames that point at leading political or military figures.
