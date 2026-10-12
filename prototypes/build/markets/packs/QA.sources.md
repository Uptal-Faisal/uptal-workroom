# QA (Qatar) market pack: sources and reasoning

Written 2026-10-12. **No live web research was possible for this pack.** The run's shared WebSearch budget
was used up before this pack started, and direct WebFetch calls failed (DNS lookups failed in the sandbox).
Every fact below comes from my own knowledge, which runs to about mid-2026. Each item has a confidence level,
and the "Verify at" lines name the official or primary place to check it. I have **not** fetched those pages,
so they are pointers, not citations. Where I was unsure, I took the conservative option. Items marked
**VERIFY** should be checked before launch.

The currency (QAR, after the number, with a space) and the price tier (399 / 339 / 279, totals 1,356 / 3,348)
come from `markets/base.json` and were not changed.

## Persona
From `roster.json` id `QA`: Maryam Al-Kuwari, female, Qatari (`QA`), lives in and targets Qatar, city Doha.
As a Qatari national she is auto-answered on work rights (`autoFor` includes `QA`) and Qatarization works in
her favour.
- The employers "Zekreet Holding" and "Zekreet Trading" are fictional. They are named after the Zekreet
  peninsula on Qatar's west coast, a local place name that is not a well-known company. I could not check
  company registers for clashes. **VERIFY** if the name is shown prominently.
- Degree: Qatar University's College of Business and Economics offers a BSc in Accounting. This is the most
  typical route for a Qatari woman in finance. QU teaches on separate men's and women's campuses. Confidence:
  high.
- Certification: CMA (IMA). It is very common in Qatar, and the Qatar Finance and Business Academy (QFBA)
  runs prep courses for it. ACCA is listed as the second option. Confidence: medium-high.
- Bio: follows Noura's v5 bio. The local touch is "I present our results to the board in Arabic and English",
  because bilingual board reporting is a real asset for a Qatari analyst. I did not add a tax angle: Qatar has
  no VAT, and the 15% Pillar Two minimum tax (Law No. 22 of 2024) only applies to large multinational groups.
- Arabic names are in `persona.ar` and `people[].ar`, the same additive keys the AE pack uses.

## Salary (`sal.per = month`, `f = 0.9`). Confidence: medium. **VERIFY**
- Qatar quotes pay monthly and tax-free (there is no personal income tax). The figure is a package: basic pay
  plus housing and transport. Qataris in government and semi-government grades also get a social allowance.
- My recollection of the regional salary guides (Hays GCC, Cooper Fitch, Michael Page Middle East) for a
  Senior Financial Analyst / Senior FP&A in Doha with about 8 years: roughly QAR 22-32k a month for expats at
  large employers. Qatari nationals at banks, QatarEnergy-group companies and semi-government bodies earn
  noticeably more, around QAR 35-50k with allowances. I could not re-check either range this run.
- Reasoning: Maryam is Qatari, so her market band should sit above the expat range. It should not sit at the
  top of the national range, because her employer is a private holding company. f = 0.9 maps the v5 Riyadh
  band of 34-41k SAR to QAR 30.6-36.9k. Her current pay comes out at about QAR 23,400 (under market, like
  Noura's story) and her expectation at about QAR 30,600. QAR and SAR are near par: QAR is pegged at 3.64
  per USD and SAR at 3.75, so 1 SAR = 0.971 QAR.
- If a 2026 guide is checked later, f should stay within about 0.8-1.05. Lower it toward 0.8 if the app's job
  mix is mostly expat roles.
- Verify at: Hays GCC Salary Guide; Cooper Fitch Qatar Salary Guide; Michael Page Middle East salary guide.

## Tax (`incl: true, rate: 0`). Confidence: high as of mid-2026. **VERIFY before launch**
- Qatar is the GCC state that has not implemented VAT. It signed the 2016 GCC VAT Framework Agreement but has
  repeatedly deferred implementation. As of my knowledge (mid-2026) there was no VAT and no digital-services
  tax on consumer subscriptions. Qatar does have an excise tax (since 2019, on tobacco, sugary drinks and
  similar goods) and corporate income tax (10% on foreign-owned profits, plus the 15% Pillar Two top-up for
  large multinational groups from 2025). Neither applies to a consumer subscription price.
- So the label says "No VAT in Qatar" rather than "VAT included". If Qatar announces VAT, the rate will
  almost certainly be 5% under the GCC framework. The change would then be `rate: 5` and the label "VAT
  included", like AE.
- Verify at: General Tax Authority (gta.gov.qa); a current Big-4 Qatar tax summary (e.g. PwC Worldwide Tax
  Summaries, Qatar).

## Payments
- Cards come first: Visa, Mastercard and Amex. Commercial Bank is the long-standing American Express issuer
  and acquirer in Qatar, so Amex is widely held. Confidence: high for Visa and Mastercard, medium-high for
  Amex.
- Wallets are `apple` and `google`.
  - Apple Pay has been live in Qatar with the major banks (QNB, Commercial Bank, QIB, Doha Bank, Dukhan Bank
    and others) since the early 2020s. Confidence: high.
  - Google Pay came later, around 2023-2024, through major banks. Confidence: medium. **VERIFY**
  - Samsung Pay / Wallet is left out. It may work with some banks, but it is rare at online subscription
    checkouts. This is the conservative choice and matches AE.
- `bnpl: []`. Tabby and Tamara, the BNPL options in the SA and AE packs, do not operate in Qatar as far as I
  know. Earlier entrants such as Spotii left. The Qatar Central Bank (QCB) has been building a BNPL and
  fintech licensing framework, but I know of no subscription-capable BNPL in common use in Qatar. Bank
  credit-card instalment plans exist, but they are not a checkout method. Confidence: medium. **VERIFY**
  (QCB's list of licensed payment and BNPL providers).
- `localCardBrand: null`, a conservative choice.
  - NAPS is Qatar's national debit switch. Most local debit cards carry NAPS, and many are NAPS-only. NAPS
    online acceptance needs a local Qatari acquirer or gateway, so a foreign subscription merchant usually
    cannot take NAPS-only cards.
  - QCB also launched Himyan, a national card scheme starting with prepaid cards, around 2024-2025. It is
    still early.
  - Showing a NAPS or Himyan logo that our checkout might not accept would mislead users. If we add a Qatari
    acquirer (e.g. QNB, CBQ or a QCB-licensed PSP), the likely change is `"localCardBrand": "NAPS"`.
    **Revisit.**
- Other local rails are not subscription checkout methods and are left out: Fawran (QCB instant payments,
  2024), QMP (Qatar Mobile Payments), and the Ooredoo Money and Vodafone Cash wallets.
- PayPal works in Qatar but is not a common way to pay for subscriptions there, so it is not listed.

## Work rights
- `autoFor` covers QA plus the 5 other GCC states. Under the GCC common market, GCC citizens work in Qatar
  with no visa sponsorship. The auto text says "without visa sponsorship", the same wording as AE.
- **Residence permit through my employer.** In 2020 Qatar abolished the exit permit and the employer NOC for
  job changes (Law No. 18 of 2020 amending Labour Law 14/2004, and Decree-Law No. 19 of 2020 amending the
  residency law 21/2015). Workers now give notice: 1 month if they have 2 years' service or less, 2 months if
  more. The new employer takes over sponsorship of the residence permit through the Ministry of Labour's
  system. Confidence: high.
- **Family-sponsored residence.** Spouses and children sponsored by a resident or a Qatari can work once the
  employer gets them a work permit from the Ministry of Labour; the employer does not sponsor their residence.
  Confidence: high.
- **Permanent residency.** Law No. 10 of 2018 created the permanent residency card. It is open to children of
  Qatari mothers, people who have served the state, and long-term residents who meet the conditions. Holders
  need no sponsor, can work freely, and get public-service and employment priority after Qataris.
  Confidence: medium-high. The sub-line keeps to the safe part: "No sponsor needed. You can work for any
  employer."
- **Needs sponsorship.** For people outside Qatar or on a visit visa.
- Rule: Qatar job ads often say "Qatari nationals only", or "family-sponsored visa only" / "on husband's
  sponsorship", which means the employer will not take over the sponsorship. A person whose visa is through an
  employer (or who needs one) should not be sent to those ads. The rule skips both, parallel to AE's "own
  visa" rule. I did not add a "local hire only" filter for the needs-sponsorship status, because that would
  need a separate flag.
- Verify at: Ministry of Labour (mol.gov.qa); Hukoomi (hukoomi.gov.qa); the ILO Project Office for Qatar
  pages on the 2020 labour reforms; Al Meezan legal portal (almeezan.qa) for law texts.

## Qatarization
- Labour Law 14/2004, Art. 18: hiring priority goes to Qatari workers, then children of Qatari women married
  to non-Qataris, then Arab nationals, then others. Confidence: high on Qataris first and children of Qatari
  mothers second; medium on the exact later order.
- A 2024 law on localising (Qatarizing) private-sector jobs. I recall it as Law No. 12 of 2024. It lets the
  Ministry of Labour and Council of Ministers set Qatari employment targets for private-sector jobs and
  sectors, with training duties, incentives and penalties, and it counts children of Qatari mothers.
  Confidence: medium on the number and details. **VERIFY**
  - That is why the description only says "a 2024 law lets the Ministry of Labour set Qatari targets for
    private-sector jobs" and gives no percentages.
  - I do not know of fixed published quotas for finance or accounting, unlike Saudi Arabia's accounting
    quota.
- In practice, many bank, QatarEnergy-group and semi-government finance roles are posted as "Qatari
  nationals only" or "Qatari preferred". QCB has long pushed Qatarization in the financial sector.
- The copy says we only apply to Qatari-only roles for Qatari users. GCC nationals and children of Qatari
  mothers are not treated as eligible for those postings. This is conservative, because some of those ads
  include children of Qatari mothers.
- Arabic name: "التقطير" is the term Qatari government and press use. French: "Qatarisation".
- Verify at: Ministry of Labour (mol.gov.qa) Qatarization pages; Al Meezan (almeezan.qa) for Law 12/2024 and
  Labour Law Art. 18.

## Sensitive fields (photo optional; gender, DOB and nationality ask; marital none)
- Photo: very common on Qatari and Gulf CVs and on Bayt and GulfTalent profiles, but not needed for ATS
  uploads. We offer it and never require it, the same as AE and SA.
- Gender, date of birth and nationality: these are standard required fields on Qatari application portals and
  regional boards. I am relying on general knowledge of these forms, not a page I could cite this run.
  Nationality also drives Qatarization and visa handling, and recruiters expect QID or visa status on the CV.
  DOB is `ask`, as in AE: in Qatar it is a normal form field, and the QID itself encodes it.
- Marital status: it often appears on Gulf CVs, but it is not needed for matching, so we do not ask. This is
  the conservative choice, consistent with AE and SA and with PDPPL data minimisation.
- Anti-discrimination: the Constitution (Art. 35) says all persons are equal and bans discrimination on sex,
  origin, language or religion. The Labour Law requires equal pay for women doing the same work. There is no
  detailed private-hiring anti-discrimination code, so we never filter on gender or age.

## Legal
- Law No. 13 of 2016 on the Protection of Personal Data Privacy (PDPPL) has been in force since 2017. The
  National Cyber Security Agency (National Data Privacy Office) enforces it and has issued guidelines. The
  Qatar Financial Centre has its own regime, the QFC Data Protection Regulations 2021. The privacy line only
  names the law and its number. It makes no claims about specific rights or penalties. Confidence: high.
- Renewal: as far as I know, Qatar has no specific auto-renewal statute. Consumer Protection Law No. 8 of 2008
  and the E-Commerce Law No. 16 of 2010 require clear disclosure of price and terms. So the line, the same as
  AE, says the plan renews at the same price and that cancelling before the renewal date stops the next
  charge.
- Verify at: NCSA / Compliance and Data Protection (assurance.ncsa.gov.qa); QFC Data Protection Office
  (qfc.qa).

## Work culture
- Work week Sun-Thu with a Friday-Saturday weekend. Unlike the UAE, Qatar did not move to Mon-Fri.
  Government hours are roughly 7:00-14:00, and some private firms add a Saturday half-day. Confidence: high.
- `noticeDays: 60`. Maryam has 8 years' service, so the statutory notice is 2 months (more than 2 years'
  service, under the 2020 amendments). Confidence: medium-high on the 1-month / 2-month split.
- Wages are paid monthly through the Wage Protection System (since 2015). During Ramadan, hours are capped at
  36 a week (Labour Law Art. 73). Confidence: high.
- Job boards: LinkedIn, Bayt, GulfTalent (strong for mid and senior finance), Naukrigulf (popular with South
  Asian candidates) and Indeed Qatar (aggregator). Qatar Living's jobs section is left out because it mostly
  serves entry-level and blue-collar hiring.
- `lang2` is Arabic. English is the business language, but Arabic is valued and often required for
  Qatari-only and government-facing roles.
- Government platforms:
  - Ministry of Labour: work permits, contracts and job changes. It was renamed from ADLSA in 2021.
  - Metrash: the Ministry of Interior app for QID and residence services. It was formerly "Metrash2" and,
    as I recall, was renamed in 2024. **VERIFY** which name users see now.
  - Kawader: the Ministry of Labour's national platform for employing Qataris (and children of Qatari mothers)
    in the private sector. Confidence: medium. **VERIFY the name and status.** If it cannot be confirmed,
    remove it rather than guess.

## Employers (24, all real)
- Energy:
  - QatarEnergy is the state energy company (renamed from Qatar Petroleum in 2021).
  - QatarEnergy LNG (formerly Qatargas, with RasGas merged into it) has its headquarters in Doha and its
    operations at Ras Laffan. `city` is set to doha because its finance roles are in Doha.
- Banks:
  - QNB is the largest bank in Qatar and in the Middle East and Africa by assets.
  - QIB is the largest Qatari Islamic bank.
  - Commercial Bank and Masraf Al Rayan (merged with Al Khalij Commercial Bank in 2021) are the next tier. I
    kept their labels to "major" because the order of #3 and #4 by assets moves around.
- Telecoms: Ooredoo (group HQ in Doha) and Vodafone Qatar (listed on QSE) are #1 and #2.
- QIA is the sovereign wealth fund. KPMG Qatar is the big-4 firm.
- Baladna is the QSE-listed dairy company built after the 2017 blockade. Its farm and main base are in the
  north near Al Khor, so `city: alkhor`. Confidence: medium. **VERIFY**; switch to doha if its corporate
  office is the hiring location.
- Al Meera is the QSE-listed supermarket chain. Qatar Airways is the national airline.
- Hamad Medical Corporation is the main public hospital group. QIC (Qatar Insurance Company) is the largest
  insurer.
- Snoonu is a Doha-founded super app (delivery and commerce) and the best-known Qatari scale-up. talabat has
  a large Qatar operation.
- SkipCash is a Doha payments fintech. As I recall, it is licensed by QCB as a payment service provider.
  Confidence: medium. Qatar has no large fintech; if a bigger name is wanted, Ooredoo Money (Ooredoo
  Financial Services) is the alternative.
- Real estate:
  - Qatari Diar is QIA's real-estate arm and the developer of Lusail City, so `city: lusail`; its head office
    may be in Doha.
  - United Development Company (UDC) developed The Pearl-Qatar.
- Qatar Stock Exchange is the exchange.
- QAFCO, part of Industries Qatar and one of the world's largest single-site urea producers, is in Mesaieed
  Industrial City.
- Government and semi-government:
  - Qatar Foundation is based in Education City (Al Rayyan).
  - Kahramaa is the state electricity and water utility.
- Logo colours are approximate brand colours. They were not taken from brand guidelines.

## Cities
Ordered by how many finance and FP&A jobs each has: Doha (West Bay and the QFC hold most HQs), Lusail (new
business district, Energy City), Al Rayyan (Education City, QF), Al Wakrah (Hamad Port area), Ras Laffan
(LNG, mostly site and cost-control roles), Mesaieed (industrial) and Al Khor (Ras Laffan staff housing,
Baladna).
- I left out Dukhan, the onshore oil-field town, because it has few finance roles.
- The metro lines only name well-known districts. I left out districts whose municipality I was unsure of.
  For example, The Pearl and Lusail's Al Erkyah are not named.

## People (10, 5 f / 5 m)
- Six are Qatari: Al-Sulaiti, Al-Mannai, Al-Mohannadi, Al-Kaabi, Al-Emadi, Al-Marri. I avoided the ruling
  family (Al Thani) and very prominent public names.
- Four are expats, typical of Qatar's recruiting market: Levantine (Hala Nasr), Indian (Ramesh Iyer),
  Filipino (Maria Santos) and British (Mark Davies).
- Names that persona packs already use (Haddad, Mansour, Nair, Saleh, Khoury) were avoided. Hyphenated
  "Al-" spelling matches the roster's "Al-Kuwari".

## Arabic and French
- Arabic is in the Gulf register, with light dialect like v5 and AE: "ما تحتاج", "تطلّع لك", "برّا", "بعد"
  (meaning "also"), "يخلّي", "ما فيه".
- Place names follow local usage: الدوحة، لوسيل، الريان، الوكرة، راس لفان (as Qatari usage writes it, not
  رأس)، مسيعيد، الخور.
- French uses vouvoiement. The demonym is qatarien / qatarienne. Place names stay in their usual French press
  form (Doha, Lusail, Ras Laffan, Mesaieed). Company names stay in their original form.
