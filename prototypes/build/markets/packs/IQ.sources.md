# IQ (Iraq): sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up. WebFetch could not resolve hosts (taxsummaries.pwc.com and support.apple.com both returned ENOTFOUND). Everything below comes from background knowledge up to mid-2026. It is **not verified against a live source**. Each fact has a confidence level. Where I was unsure I took the conservative option. Please verify the items marked **[verify]** before launch. Currency and price tier come from `base.json` (IQD, p1 45,000) and are unchanged.

## Payments
- **Cards first (high confidence on cards; medium on order).** Card use has grown fast since the government moved state salaries onto cards ("localisation of salaries", توطين الرواتب). Qi Card (International Smart Card, كي كارد) is the largest issuer, mainly through Rafidain and Rasheed banks. Its cards are co-badged with international schemes, mainly Mastercard. Private banks (Bank of Baghdad, TBI, FIB and others) issue Visa and Mastercard. Brands are `["visa","mc"]`. Amex is not a mainstream Iraqi card, so it is left out. The sub-line names Qi Card because most Iraqis know their card by that name, not by the scheme. **[verify that Uptal's gateway accepts Qi-issued cards for recurring, card-not-present charges; some prepaid salary cards block online or recurring use]**
- **ZainCash tile (high confidence it is widespread; medium confidence on fit).** ZainCash is the largest mobile wallet in Iraq. It is licensed by the Central Bank of Iraq (CBI) and has a merchant checkout that many Iraqi online stores use. It is a push payment, not card-on-file, so it is marked `"recurring": false` (same pattern as KNET in KW), and `legal.renewal` says renewals are paid again by hand. **[verify gateway or direct ZainCash merchant onboarding]**
- **Left out as tiles (medium confidence).**
  - FIB (First Iraqi Bank) app payments. FIB is very popular, especially in the Kurdistan Region. It is a strong candidate for a third tile if the gateway supports it. **[verify]**
  - FastPay (Kurdistan Region) and AsiaPay / AsiaHawala (Asiacell). Both are real wallets, but they have a smaller reach for a subscription product.
  - Cash on delivery dominates Iraqi e-commerce, but it does not work for a digital subscription.
- **`localCardBrand: null` (medium confidence).** Iraq has a national switch run under the CBI, but no consumer-facing national scheme like mada, KNET or Meeza. Qi Card is a private issuer brand co-badged with international schemes. It is not a separate network.
- **Wallets `[]` (low confidence, conservative).** I could not confirm that Apple Pay or Google Pay is officially live for Iraqi-issued cards. Showing a wallet that fails for most Iraqi cards is worse than leaving it out. **[verify on Apple's and Google's country lists; if live with Qi or the major banks, add them]**
- **BNPL `[]` (high confidence).** Tabby and Tamara do not operate in Iraq, and no subscription-capable BNPL is common locally.
- **USD vs IQD.** Many Iraqis hold USD, and international firms pay salaries in USD. Since 2023 the CBI has pushed domestic transactions into IQD. Pricing stays in IQD as `base.json` sets it.

## Tax
- **No VAT (high confidence as of my knowledge).** Federal Iraq has no general VAT or GST. The Sales Tax Law No. 36 of 1997, as amended, applies sales tax only to certain goods and services: deluxe hotels and restaurants, and, since the 2015 budget law, mobile top-ups, internet, cars, tobacco and alcohol, at various rates. I know of no regime that requires foreign B2C digital-service providers to register and charge tax. The Kurdistan Region has no VAT either.
- **Display choice (conservative).** `incl: true, rate: 0` with the label "All taxes included" ("شامل جميع الضرائب" / "Toutes taxes comprises"). This is the LY approach. It stays true if Iraq introduces a VAT or digital-services tax, which the IMF and the Ministry of Finance have discussed as part of non-oil revenue reform. In that case Uptal remits or absorbs it and the shown price does not change. I did not use "No VAT" because it could become wrong without notice. **[verify: PwC Worldwide Tax Summaries Iraq, "Other taxes", and the General Commission for Taxes]**

## Work rights
- **Legal basis (high confidence on the structure; medium on article numbers).**
  - Federal Iraq: under Labour Law No. 37 of 2015, a non-Iraqi may work only with a work permit (إجازة عمل) from the Ministry of Labour and Social Affairs (MoLSA). The employer applies, and the permit is tied to that employer.
  - Residence comes from the Ministry of Interior's Directorate of Residency Affairs (مديرية شؤون الإقامة) under Residency Law No. 76 of 2017.
- **Kurdistan Region (high confidence that the systems are separate; medium on details).** The Kurdistan Regional Government issues its own residency through its own residency directorate, and its own work permits through the KRG Ministry of Labour and Social Affairs. A KRI permit and residency do not authorise work in federal Iraq, and vice versa. That is why there is a separate option and the matching rule keeps KRI permits to KRI jobs (Erbil, Sulaymaniyah, Duhok; Halabja is also a KRI governorate but has few finance jobs). **[verify]**
- **Options (4; the last one needs sponsorship).**
  1. Iraqi citizen. Iraq allows dual nationality under Nationality Law No. 26 of 2006 and Article 18 of the Constitution; only senior sovereign or security posts require giving up the other nationality (high confidence). The sub-line includes dual nationals.
  2. Foreign national who already holds a federal Iraqi work permit and residency. The permit is employer-specific, so a new employer applies again.
  3. Foreign national who holds a Kurdistan Region residency and work permit.
  4. Needs an employer to get a work permit and visa. This sub-line says that most local finance roles go to Iraqis (see nationalisation), so matching focuses on international, oil-sector and NGO employers.
- **autoFor `["IQ"]`.** There is no regional free-movement bloc that gives other nationals work rights in Iraq.
- **Left out (low confidence).** Palestinians who live long-term in Iraq used to be treated like Iraqis for employment (RCC Decree 202 of 2001). The 2017 Residency Law is reported to have removed that treatment. Because it is unclear, there is no option for it. **[verify]**

## Nationalisation
- Iraq has no branded quota scheme like Nitaqat or Emiratisation. Iraqi workers still get priority in three ways, so the block is set (not `null`) under a neutral name: "Iraqi workforce priority" / "أولوية العمالة العراقية".
  - **Work permits (medium confidence).** MoLSA issues work permits for skills that are not available among Iraqis, and it has repeatedly announced crackdowns on unlicensed foreign workers (2023-2025).
  - **Investment projects (medium confidence).** Investment Law No. 13 of 2006, as amended by Law No. 50 of 2015, requires licensed investment projects to employ Iraqis for at least 50% of their workforce.
  - **Oil-sector contracts (medium-low confidence on the exact figure).** Oil and gas contracts (the licensing-round technical service contracts) require most staff to be Iraqi; a figure of about 85% is often cited. The copy says "most staff" rather than a number. **[verify]**
- **Effect on matching.** Iraqi citizens are auto-answered. For foreign nationals, the rule targets international firms, oil and gas operators and NGOs, and skips roles that say they are for Iraqis only.

## Sensitive fields
- **Photo `common`, gender `ask`, dob `ask`, nationality `ask` (medium-high confidence).** Iraqi CVs follow the regional Arab format: a photo and a personal-details block with date of birth, nationality and marital status, sometimes also place of birth and address. Forms at state companies, banks and telecoms, and Bayt profiles, ask gender, date of birth and nationality. Nationality drives the work-permit, KRI and Iraqi-priority logic.
- **Marital status `none` (conservative).** It is common on CVs, but it is not needed to apply and it is a bias risk, especially for women. This matches JO, LY and AE.
- **Anti-discrimination (medium confidence).** Labour Law No. 37 of 2015 (around Articles 8-11) bans direct and indirect discrimination in employment, including on sex, and bans sexual harassment. The ILO welcomed it. We never filter on gender or age. **[verify the exact list of protected grounds]**

## Legal
- **Data protection (medium confidence).** I know of no comprehensive personal data protection law in force in Iraq (federal or KRI). Draft bills have been discussed in parliament. The privacy line names the constitutional right to privacy in Article 17 of the 2005 Constitution (high confidence on the article). It promises GDPR-level handling and does not claim a specific data law, so it stays true if one passes. **[verify whether a data protection law was enacted in 2025-2026; if so, name it in `law` and `privacy`]**
- **Other laws named in `law` (medium confidence).** Electronic Signature and Electronic Transactions Law No. 78 of 2012, and the CBI's Regulation No. 3 of 2014 on electronic payment services.
- **Renewal (no specific Iraqi auto-renewal statute known).** The line is a plain disclosure: card plans auto-renew at the price shown, ZainCash plans are renewed by paying again, and users can cancel any time before renewal. This uses the LY / KW wording.

## Salary
- **Basis (medium-low confidence; no live data).**
  - Iraqi pay is quoted monthly.
  - Local private firms and state companies pay in IQD. Oil majors, oil-services firms, INGOs and many multinationals quote USD.
  - Typical bands I recall for a Senior Financial Analyst / FP&A with about 8 years in Baghdad:
    - large local private employers (telecoms, private banks, listed groups): about 2-3.5m IQD a month;
    - multinationals, oil-services firms and INGO national-staff finance managers: about USD 2,000-3,500 a month (about 2.6-4.6m IQD);
    - state employers: lower base pay plus allowances, roughly 1.2-2m IQD.
- **Chosen value.** 3,000,000 IQD a month, the middle of the private and multinational range for the primary city. f = 3,000,000 / 26,000 = **115.38**. Noura's 26,000 becomes about 3.0m IQD now (about USD 2,300), and her 34,000 expectation becomes about 3.9m IQD (about USD 3,000), which is plausible for a move to a multinational or oil-sector role.
- **Exchange rate (high confidence).** The CBI official rate has been about 1,300 IQD per USD since February 2023 (about 1,310 sell rate). The parallel-market rate has run higher.
- Erbil pays similar or slightly higher for English-speaking finance staff. Basra oil-sector roles pay more. **[verify with Bayt / Paylab Iraq salary data]**

## Employers (24, real)
- **Coverage of the spec's sector list.**
  - Energy: Basrah Oil Company (state producer of most of Iraq's crude), SOMO (state oil marketer), and Basrah Gas Company (JV of the state South Gas Company 51%, Shell 44% and Mitsubishi 5%) (high confidence).
  - Largest banks: the three big state banks, Rafidain, Rasheed and Trade Bank of Iraq, which hold most banking assets (high confidence).
  - Private bank: Bank of Baghdad, listed on the ISX and majority-owned by KIPCO's United Gulf group (medium-high confidence).
  - Islamic bank: Kurdistan International Islamic Bank, Erbil (medium confidence on the exact legal name).
  - Telecoms: Zain Iraq and Asiacell. **Ranking uncertain:** both have claimed the largest subscriber base at different times, at about 17-20m each, so both archetypes say "one of the two largest". `telecom1` is set to Zain and `telecom2` to Asiacell. **[verify the latest subscriber counts]** Asiacell is listed on the ISX (high confidence). Its head office is in Sulaymaniyah, with large operations in Baghdad.
  - Sovereign: Iraq Development Fund (صندوق العراق للتنمية), set up in 2023 (medium confidence on its size and hiring).
  - Big 4: EY, with offices in Baghdad, Erbil and Basra (high confidence).
  - FMCG: Baghdad Soft Drinks Company, the Pepsi bottler and one of the largest ISX-listed companies (high confidence).
  - Retailer: Carrefour, operated by Majid Al Futtaim, with stores in Erbil and Baghdad (medium-high confidence; the city is set to Erbil).
  - Airline: Iraqi Airways.
  - Hospital: Al-Kafeel Specialist Hospital, Karbala, a large private hospital run by the Al-Abbas Holy Shrine (al-Kafeel is a title of al-Abbas; fact-check correction, the earlier draft said the Imam Hussein Shrine) (medium confidence that it counts as the leading "group").
  - Insurer: National Insurance Company, state-owned (high confidence).
  - Tech scale-up: Lezzoo, an Erbil-founded delivery and commerce super-app (medium confidence on its current scale).
  - Fintech: Qi Card (high confidence).
  - Delivery: talabat, in Iraq since about 2021 (medium-high confidence), plus Lezzoo.
  - Stock exchange: Iraq Stock Exchange.
  - Industrial: Mass Group Holding, Erbil, in cement, steel and power (medium-high confidence).
  - Government: the Central Bank of Iraq and the General Company for Ports of Iraq (Grand Faw Port, the anchor of the Development Road giga-project).
- **`realEstate: []`.** I could not name a large Iraqi real-estate developer with confidence. Bismayah New City is built by Hanwha (Korea) for the National Investment Commission. Erbil's large developments belong to private groups I could not pin down. The ports company is mapped to a separate `gigaProject` key instead. **[add a developer if one is confirmed]**
- **Logos** are brand-ish approximations, not official brand values. The colours for BOC, SOMO, Rasheed, KIB, IDF, Lezzoo and Qi Card are the least certain.

## Other
- **Work week `sun-thu` (high confidence).** The official weekend is Friday-Saturday. Many private firms work six days, Saturday to Thursday (noted in culture).
- **Notice `30` (medium confidence).** Labour Law No. 37 of 2015 provides one month's notice to end an open-ended contract. Senior contracts often set longer periods. The Kurdistan Region still applies the older Labour Law No. 71 of 1987 (medium confidence). **[verify the article]**
- **Phone (high confidence).** +964. Mobile numbers have 10 digits after the country code: 75x (Korek), 77x (Asiacell), 78x and 79x (Zain). The example uses 790.
- **Boards (medium confidence on relative weight).**
  - LinkedIn: multinationals, oil companies and banks.
  - Bayt: the main regional board, active in Iraq.
  - OpenSooq: classifieds with a large jobs section in Iraq.
  - ReliefWeb: NGO and UN finance roles, which are a big employer of Iraqi finance staff.
  - Indeed and Tanqeeb are left out because I could not confirm their weight in Iraq.
- **lang2: Arabic.** This matches JO and LY. English fluency matters on finance applications, and Kurdish matters in the KRI (both in culture).
- **govPlatforms `[]` (conservative).** Work permits and residency are employer-side. The Federal Service Council and MoLSA run job-seeker registration for public-sector and subsidised jobs, but they are not part of a private-sector finance job search, and I could not confirm current portal names. **[verify]**
- **Certifications.**
  - CMA (US): popular across Iraq; it is the persona's certification.
  - ACCA: strong in the Kurdistan Region and with international firms.
  - CPA (US).
  - Iraqi Certified Accountant: the local "محاسب قانوني" qualification awarded by the Arab Institute for Certified Accountants in Baghdad (medium confidence on the exact English name). Practising auditors are also licensed by the Council of the Profession for Monitoring and Auditing Accounts.
  - CFA was left out to keep four.
- **Universities (high confidence).**
  - University of Baghdad: College of Administration and Economics.
  - Mustansiriyah University: Baghdad.
  - American University of Iraq, Sulaimani (AUIS): well regarded by international employers.
- **Accounting (medium-high confidence).** Many Iraqi companies, especially state-owned ones, must keep books under the Unified Accounting System (النظام المحاسبي الموحد). The CBI moved banks to IFRS from about 2016, and listed and international firms report under IFRS. The bio therefore says "IFRS and Unified Accounting System reporting". It uses Oracle instead of SAP because Oracle is more common at large Iraqi telecoms and groups (medium confidence). It mentions dinars and dollars because dual-currency cash management is typical.
- **Persona.** Ali Al-Jubouri, male, Iraqi, Baghdad, from roster.json. The employer "Jadriya Holding Group" (named after the Jadriya district) and its subsidiary "Jadriya Trading" are fictional.
- **People.** Mostly Arab Iraqi names: Karrar and Rusul are distinctly Iraqi, and the surnames are common tribal and family names. Two Kurdish names (Shilan Barzinji, Karwan Hamid) reflect the Erbil and Sulaymaniyah job market.
- **Arabic register.** "neutral" per `base.json`. Proper names follow local usage: بغداد، أربيل، البصرة، السليمانية، النجف، كربلاء، الموصل، كركوك، دهوك. Banks use "مصرف", as is usual in Iraq. "Work permit" is إجازة عمل, the Iraqi legal term.
- **French forms.** Bagdad, Erbil, Bassora, Souleimaniye, Nadjaf, Kerbala, Mossoul, Kirkouk, Dohouk, Oum Qasr, Koufa, Ninive. The country is "l'Irak" / "en Irak".

## Fact-check pass (2026-10-12)
- Live checking was not possible here either: the shared WebSearch budget was used up, and WebFetch could not resolve support.apple.com, taxsummaries.pwc.com, en.wikipedia.org, google.com or cbi.iq. Claims were rechecked against background knowledge and the peer packs (JO, LY, KW, EG) only.
- Fixed: Al-Kafeel Specialist Hospital belongs to the Al-Abbas Holy Shrine, not the Imam Hussein Shrine (sources.md only). Fixed the French agreement "Valables" on the Kurdistan Region option, which covers two nouns (titre de séjour et permis).
- All the [verify] items above are still open. Most important: Apple Pay and Google Pay for Iraqi cards, whether Qi-issued cards work for recurring card-not-present charges, the salary level, any 2025-2026 data protection law, and the restructuring of Rafidain Bank (check that the name is current).
