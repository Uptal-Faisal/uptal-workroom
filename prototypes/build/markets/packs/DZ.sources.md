# DZ (Algeria) — sources and reasoning

Researched 2026-10-12. **Limited research.** The session's shared web-search budget ran out after three Algeria queries. Direct fetches of
Algerian sites failed with DNS errors (egress policy). So only the payment-card figures and the "no Apple Pay / Google Pay" finding come from this
session's search results. Everything else comes from prior knowledge of Algerian law and practice, up to mid-2026. Each section marks what is
unverified and which conservative choice I made. **Before production, a reviewer should check against primary texts the items marked ⚠.**

## Currency / price tier
Taken unchanged from `markets/base.json`: DZD (sym `DA` in French, `د.ج` in Arabic, after the number), `p1` 3,900 / `p4` 3,300 / `p12` 2,700.
Arabic register is neutral (base.json `arVariant: "neutral"`), and the UI default is French.

## Payments
- **Local cards first: CIB and Edahabia.** Algeria's e-payment runs on the domestic interbank network (GIE Monétique, processed by SATIM).
  Search results (osiris.sn, wearetech.africa and digitalbusiness.africa, citing GIE Monétique) report about **23 million payment cards** at the end of August 2026.
  About **19 million** are Algérie Poste **Edahabia** cards and **4 million+** are bank **CIB** cards. There were **27 million+ online transactions worth 145 bn DZD in 2025**.
  Edahabia and CIB are both accepted by e-merchants on the same network; Air Algérie, for example, takes both online. So they share one tile.
  `localCardBrand` is `"CIB"`, the interbank scheme's brand, and `brands` lists `cib` and `edahabia`.
  - https://www.wearetech.africa/fr/fils/actualites/tech/algerie-le-paiement-electronique-franchit-le-cap-des-22-millions-de-cartes
  - https://www.digitalbusiness.africa/algerie-plus-de-22-millions-de-cartes-bancaires-en-circulation-le-e-paiement-change-progressivement-les-habitudes/
  - https://observalgerie.com/2026/02/22/voyage/air-algerie-lance-un-nouveau-service-en-ligne/
- **International card second (Visa, Mastercard).** Banque d'Algérie's updated catalogue of authorised products (as at 14 May 2026, reported by Algérie Eco)
  lets Algerian-law web-merchants accept cards issued by foreign banks: Visa, Mastercard and Amex. This mainly serves the diaspora and people holding foreign cards.
  Algerian-issued Visa or Mastercard cards are tied to foreign-currency accounts and are a small minority. Amex is left out as marginal.
  - https://algerie-eco.com/2026/06/16/cartes-paiement-mobile-credit-a-la-consommation-la-banque-dalgerie-publie-le-recueil-actualise-des-produits-et-services-bancaires-autorises/
  - ⚠ This assumes Uptal charges DZD through an Algerian merchant entity or local gateway. The dinar is not convertible, so a foreign merchant cannot take CIB or
    Edahabia directly.
- **No wallets** (`[]`). A search found no official launch of Apple Pay or Google Pay in Algeria. Processor pages that list them are merchant marketing.
  The local mobile options are BaridiMob (Algérie Poste) and the QR system "DZ Mob Pay", planned for January 2025. Neither is an express wallet button, so neither is listed.
  - https://meatechwatch.com/?p=11461 · https://dzair-tube.dz/en/?p=33318
- **No PayPal.** Algerian PayPal accounts can only send money, and only with an internationally usable card, which few residents hold. I left it out as a conservative choice.
- **No BNPL** (`[]`). Consumer credit is restricted, historically to locally made goods, and I know of no subscription-capable BNPL in Algeria.
- **Renewal copy.** ⚠ CIB and Edahabia e-payment usually confirms each payment with the card's secret code or OTP. Card-on-file recurring billing is not
  standard. So the renewal line says the plan "renews… we remind you before each renewal" rather than promising a silent automatic charge.

## Tax
- **VAT (TVA) 19 %, included in the price.** The standard rate is 19 % and the reduced rate is 9 %. Algerian consumer prices are displayed tax-included (TTC), so `incl: true`.
  The Arabic label uses the Algerian official term **الرسم على القيمة المضافة**, where TVA is a "rasm".
- Foreign digital services: secondary sources (AlgeriaTech News, a Kintsugi VAT guide) say non-resident digital providers are within Algerian VAT at 19 %. They disagree on the start date
  (2020, 2022 or the 2026 Finance Law) and say that collection machinery, such as a registration portal, is incomplete. ⚠ I could not open the Finance Law text.
  Whatever the mechanism, the rate shown to the consumer is 19 % TTC.
  - https://trykintsugi.com/sales-tax-guides/africa/algeria · https://algeriatech.news/?p=25827 · https://www.vatcalc.com/?p=48783

## Work rights
- **Rule (Law No. 81-10 of 11 July 1981 on the employment conditions of foreign workers).** A foreign worker may be hired only for a post that needs a qualification of at
  least technician level, and only when no Algerian national can fill it. The employment services issue a **work permit** (permis de travail) for that specific
  employer and post. It lasts up to 2 years and is renewable. A temporary work authorisation covers missions of up to 3 months and is not relevant for job seekers.
  Employers must also notify vacancies to **ANEM** (Law 04-19 of 25 December 2004 on placement), and that is where the "no Algerian candidate" test happens.
- **Statuses chosen (4):**
  1. Algerian citizen (auto-answered, `autoFor: ["DZ"]`). Dual nationals are included because Algeria does not strip nationality on acquiring another.
  2. Foreign national with a valid work permit. The sub-line says a new employer needs a new permit, because the permit is tied to the employer and post.
  3. Foreign national exempt from the permit. ⚠ Law 81-10 allows exemptions under international or bilateral agreements, with the hiring then *declared* to the
     employment services. I could not re-check the article numbers or which countries benefit, so the copy stays generic ("for example under a bilateral agreement").
  4. Needs an employer to apply for the permit (the "sponsorship" equivalent). The timing is a conservative range ("several weeks to a few months"). ⚠ I found no
     current official processing time.
- **Matching rule:** the civil-service statute (Ordinance 06-03, art. 75) requires Algerian nationality. So when the user needs a permit, we skip jobs reserved for nationals.
  State-owned enterprises such as Sonatrach are not civil service, but in practice they rarely hire foreigners. We do not filter them out.

## Nationalisation
Algeria has no quota system like Saudization. It has a **national-priority labour-market test** (Law 81-10 plus the ANEM vacancy notice) and civil service reserved for
nationals. As in the MA and TN packs, I modelled it as "Priority to Algerian workers" instead of `null`, because it really does affect foreign applicants. It does not affect the
Algerian persona.

## Sensitive fields
- **dob: ask, nationality: ask.** Algerian CVs follow the French "état civil" convention: date and place of birth, nationality, often marital status, and for men military-service
  status. National job sites commonly ask for these as well. Nationality also feeds the work-permit logic.
  ⚠ Law 90-11 (labour relations) art. 17 voids discriminatory clauses based on age, sex, social or marital status, family ties, political convictions and union
  membership. The ban targets contracts and agreements, not CV content. I kept `dob: ask` because it is the local CV norm. *If the product prefers the privacy-conservative
  default, flip dob to `none`.*
- **marital: none, gender: none.** Both are art. 17 grounds and are not needed to apply, so we never ask (conservative). Arabic and French copy use the persona's known gender.
- **photo: optional.** Photos are frequent on Algerian CVs but not required. Without a source to confirm the norm, I chose the middle option rather than `common`.
- **Military service (service national).** Male candidates are routinely asked for their status (accompli / dispensé / sursitaire). It is the most Algeria-specific CV item,
  but it has no field in the spec, so it is recorded in `sensitive.notes` and `culture.notes`.

## Legal
- Privacy: **Law No. 18-07 of 10 June 2018** on the protection of natural persons in the processing of personal data. It became enforceable in August 2023 once the
  regulator was set up. The regulator is the **ANPDP** (Autorité nationale de protection des données à caractère personnel / السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي).
  ⚠ I believe Law 18-07 was amended in 2025 (adding DPO, breach-notification and impact-assessment duties), but I could not confirm the amending law's number, so the pack cites
  only 18-07.
- Renewal: Algeria has no auto-renewal statute. E-commerce Law 18-05 (10 May 2018) and consumer-protection Law 09-03 apply to online sales generally. I could not
  re-check whether a withdrawal period applies to services, so the line promises none. It is a plain disclosure plus a renewal reminder (see Payments).

## Salary (`sal.f` = 7.69, per month) ⚠ estimate
- No salary survey could be fetched this session. The estimate rests on prior knowledge of Algerian surveys (Emploitic salary barometers, Paylab Algeria) and published pay
  ranges. A senior contrôleur de gestion or financial analyst with about 8 years in Algiers earns roughly **150,000-250,000 DZD gross a month**: the lower end in
  state-owned groups and banks, the upper end in multinationals, telecoms and oil services.
- Gross-to-net check (CNAS employee share 9 %; the 2022 IRG scale with 23/27/30/33/35 % brackets): 150,000 gross is about 104,000 net, and 250,000 gross is about 166,000 net.
  This matches the net figures Algerians usually quote.
- I chose about **200,000 DZD gross a month**, so f = 200,000 / 26,000 = **7.69**. The current salary is 26,000 × f, about 200,000 DZD. The expected salary is 34,000 × f, about 261,000 DZD,
  which is the multinational senior / FP&A-lead band and fits a step up. Price sanity check: the 1-month plan (3,900 DZD) is about 2 % of monthly gross pay.
- Pay is quoted monthly, so `per: "month"`.

## Notice period (`noticeDays` = 30)
Law 90-11 art. 68 makes a resigning worker give the notice set by the collective agreement or the contract. In practice that is about 1 month, and 2-3 months for senior cadres in some
agreements. I chose 30 days, the common case. ⚠ I could not verify specific collective-agreement figures.

## Employers (24, all real)
Coverage against the spec checklist:
- Energy champions: Sonatrach (oil and gas), Sonelgaz (power and gas utility).
- Largest banks: BEA, BNA, CPA (CPA's 2024 IPO put it on the Bourse d'Alger), plus Société Générale Algérie as the main foreign bank.
  ⚠ I assumed Société Générale still owns its Algerian unit (it sold several African subsidiaries in 2023-25).
- Islamic bank: Al Baraka Bank Algeria (the first Islamic bank, 1991).
- Telecoms #1 and #2: Mobilis (state-owned; leader by subscribers) and Djezzy (state-owned via the FNI since 2022). Ooredoo is included as #3 because it is a large multinational employer.
- **Sovereign / public investment body: none listed.** Algeria has no active sovereign wealth fund; the revenue-regulation fund (FRR) was used up in 2017. I was unsure of the
  current name and status of the FNI (Fonds national d'investissement), so I left it out rather than risk an outdated name.
- Big Four: KPMG Algérie. FMCG: Cevital, the largest private group, with its agri-food complex at Béjaïa port. Retailer: Ardis (hypermarkets, Algiers).
- Airline: Air Algérie. Insurer: SAA (largest).
- **Hospital group: replaced by Saidal**, the listed state pharmaceutical group. Algeria has no private hospital chain of comparable scale; private clinics are mostly single sites.
- Tech scale-up: Yassir (Algiers-founded super-app, VC-backed). Fintech: SATIM (interbank e-payment processor). E-commerce: Ouedkniss, the largest marketplace and classifieds site.
  Yassir already covers food delivery, so Ouedkniss takes the e-commerce slot.
- Real estate / construction: Cosider. Exchange: Bourse d'Alger (SGBV). Industrial: Tosyali Algérie (steel complex at Bethioua, Oran).
- Government: Banque d'Algérie (central bank), Algérie Poste (postal and financial services, Edahabia issuer).
Logo colours are approximate brand colours and monograms are invented.

## Other choices
- **Work week: Sunday to Thursday.** Algeria moved its weekend to Friday-Saturday in August 2009, so `workweek: "sun-thu"`.
- Cities, ordered by density of finance jobs: Algiers (HQs of Sonatrach, the banks, telecoms and ministries), Oran (Arzew/Bethioua petrochemicals, Tosyali, Stellantis Tafraoui),
  Constantine, Sétif, Annaba (El Hadjar steel, port), Béjaïa (Cevital, Akbou agri-food cluster), Blida, Hassi Messaoud (oil-field bases).
  For Hassi Messaoud the metro line names no province, because of recent wilaya reorganisations.
- `lang2` = French, the working language of Algerian corporate finance. English is rising but does not yet replace French on applications.
- Certifications: CFA, ACCA, Expert-comptable (Ordre national des experts-comptables, under Law 10-01 of 29 June 2010; المصف الوطني للخبراء المحاسبين), and CMA.
  ⚠ I could not re-check the abbreviation "ONEC" against current usage.
- Universities: ESC (École supérieure de commerce, Koléa), EHEC Alger (also on the Koléa campus), Université d'Alger 3 (faculty of economics, commerce and management). The persona studied at ESC.
- Job boards: LinkedIn, Emploitic (the leading local board), Emploi Partner, Ouedkniss Emploi, ANEM's Wassit platform. Gov platforms: ANEM (Wassit), CNAS (social security).
- Persona: Karim Benali, male, Algerian, Algiers, as in roster.json. The employer "Hodnis Group" (from the Hodna region) is fictional. ⚠ I could not search whether a company has that name.
  Algerian GAAP is the **SCF** (Système comptable financier, Law 07-11, in force since 2010, IFRS-inspired), so the bio says "SCF and IFRS". Sage is in the tools because it is
  common in Algerian finance teams.
- Phone: +213, mobiles as 5XX / 6XX / 7XX XX XX XX (Ooredoo / Mobilis / Djezzy prefixes); the example uses 555.
- People: 10 common Algerian names, mixed gender, including one Kabyle surname (Aït Ouali).
