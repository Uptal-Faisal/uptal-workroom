# KW (Kuwait) market pack: sources and reasoning

Written 2026-10-12. **Nothing in this pack was checked live.** The web-search budget for this run was already
used up by the other market agents, and direct page fetches failed (DNS / proxy). Every fact below comes from
general knowledge (training data up to mid-2026). Each section gives a confidence level and says what to check
before launch. Where I was unsure I chose the conservative option. URLs are listed as **places to verify, not
fetched**. The currency (KWD, after the number, with a space, `د.ك` in Arabic) and the price tier
(33 / 28 / 23 per month, totals 112 / 276) come from `markets/base.json` and were not changed.

Confidence: **high** = well-established and stable; **medium** = I believe it is right but it may have changed
in 2025-26; **low** = a best guess that must be verified.

## Persona
From `roster.json` id `KW`: Abdullah Al-Mutawa, male, Kuwaiti (`KW`), lives in and targets Kuwait, city Kuwait
City. As a Kuwaiti he is in `rights.autoFor`, so he never sees the work-rights card. He is the one who benefits
from Kuwaitization.
- Arabic name: عبدالله المطوع (Al-Mutawa is a well-known Kuwaiti family name). It is stored as `persona.ar`,
  the same additive key the AE pack uses.
- Employer "Sadu Holding" (السدو القابضة) and subsidiary "Sadu Real Estate" (السدو العقارية) are **fictional**.
  Al Sadu is Kuwait's Bedouin weaving tradition (Sadu House in Kuwait City), so the name sounds local.
  **I could not check whether a small real company uses the name.** If one does, swap it for another heritage
  name. I avoided names of real large groups (Alghanim, Alshaya, KIPCO, Agility) and areas that are also
  company names (Qurain, Bayan).
- Degree / university: BSc Accounting, Kuwait University (College of Business Administration), the
  standard route for a Kuwaiti finance professional. The exact degree title at KU (BSc vs BBA in Accounting)
  was not checked, so I used the generic "BSc Accounting", as the SA pack does.
- Certification: US CPA. Kuwait was one of the first international test sites for the US CPA exam, and the
  CPA is very common among Kuwaiti accountants and finance staff. CMA is the other common choice. Confidence: medium.
- Bio: mirrors Noura's v5 bio. The local touch is "I prepare the group's quarterly disclosures for Boursa
  Kuwait" (listed groups file quarterly reports with Boursa Kuwait and the CMA). I deliberately avoided a tax
  claim; see Tax. Targets are Kuwait City and Ahmadi (KOC, KNPC and EQUATE finance teams) or remote.
- Phone `+965 9012 3456`: Kuwaiti numbers have 8 digits and mobiles start with 5, 6 or 9. The number is an
  example only.

## Salary (`sal.per = month`, `f = 0.06`), confidence: low
- Kuwaiti pay is quoted monthly in KWD, and there is no personal income tax (high).
- Ranges (from knowledge, not checked against a 2026 guide): Senior Financial Analyst / FP&A, ~8 yrs, Kuwait
  City, about KWD 1,200-1,800 a month for expats. Kuwaiti nationals at banks, KPC companies and listed groups
  earn about KWD 1,800-2,700 from the employer, before the state's national labour support allowance.
- f = 0.06 gives: current pay 26,000 x 0.06 = **KWD 1,560**; v5 market band 34-41k gives **KWD 2,040-2,460**;
  Senior FA band 38-45k gives KWD 2,280-2,700. That puts Abdullah's ask in the middle of the Kuwaiti-national
  range.
- At the exchange rate alone (1 KWD = ~12.2 SAR, KWD pegged to a basket) f would be 0.082. Riyadh's top
  employers pay more than Kuwait for this role, so f is lower, the same logic as AE's 0.8.
- **Verify** against Cooper Fitch, Hays or Michael Page Kuwait 2026 guides, or Bayt/GulfTalent salary pages.
  Keep f within 0.05-0.07 unless a guide clearly says otherwise.

## Tax (`incl: true, rate: 0`, label "No VAT"), confidence: medium
- Kuwait signed the GCC VAT Framework Agreement (5%) but, as far as I know, had **not enacted VAT** as of
  mid-2026. VAT and excise have been discussed in several fiscal-reform packages but not passed. Corporate
  tax changes so far are the 15% Domestic Minimum Top-up Tax for large multinationals (Decree-Law 157/2024,
  from 1 Jan 2025). It does not touch consumer prices.
- So the price shown is the final price, with no tax added. I used `rate: 0` and the label "No VAT"
  (Arabic "بدون ضريبة قيمة مضافة", French "Sans TVA").
- **Verify before launch** (Ministry of Finance, mof.gov.kw). If VAT is introduced, switch to
  `rate: 5` and the "VAT included" labels from the AE pack.

## Payments
- **KNET is the local scheme** (`localCardBrand: "KNET"`), confidence: high. KNET (Shared Electronic Banking
  Services Co., owned by Kuwaiti banks) runs the national debit network and the KNET payment gateway. Almost
  every Kuwaiti debit card is a KNET card, and KNET is the most used online method in Kuwait. Local gateways
  (MyFatoorah, Tap, Checkout.com, Hesabe) show it as its own button. Because KNET dominates, it comes **first**
  as its own method (`id: "knet"`) rather than as a brand inside "Card". This matches the spec's "cards first
  unless a local method dominates".
- **`recurring: false` on KNET** (extra key, confidence: medium). KNET payments are customer-authenticated
  redirects (card + PIN/OTP) and, as far as I know, do not support stored-card merchant-initiated charges. A
  KNET payer therefore cannot be auto-renewed, and the renewal line says so. **Verify with the chosen
  gateway.** If KNET recurring or tokenisation is available, drop the flag and the KNET clause in
  `legal.renewal`.
- Card: Visa and Mastercard credit cards from Kuwaiti banks (high). Amex is left out. NBK has issued Amex
  cards, but I could not confirm that Amex is accepted widely enough online to show it (conservative choice).
- Wallets `["apple"]`. Apple Pay has been live in Kuwait since about 2021 with the major banks (medium-high).
  **Google Pay and Samsung Wallet were left out** because I could not confirm their Kuwait availability
  (conservative choice). Check and add `"google"` if it is live.
- BNPL: Tabby and Tamara, pay in 4 interest-free (medium). Both have listed Kuwait among their markets
  alongside KSA and the UAE. The 4-month total (KWD 112) and 12-month total (KWD 276) are small baskets.
  **Verify** that both still serve Kuwait in 2026 and accept a subscription merchant. Local players Deema and
  Taly exist but were left out. If Tabby or Tamara has left Kuwait, remove it; if neither works, use `[]`.
- PayPal is not listed. It is not a common checkout method in Kuwait.
- Places to verify (not fetched): knet.com.kw, tabby.ai, tamara.co, cbk.gov.kw.

## Work rights
- `autoFor`: KW plus the 5 other GCC states (high). GCC nationals work in Kuwait's private sector on GCC
  common-market terms, with no work visa or sponsor. The auto text says "without visa sponsorship", not
  "without any paperwork".
- Statuses on the card, using the article numbers people use in Kuwait (high for the categories, medium for
  the numbering):
  - **Article 18**: private-sector work residence, sponsored by the employer. To move, the new employer
    transfers the residence through PAM. Moves early in a contract have generally needed the current
    employer's consent; the minimum-service rules (1 year with consent / 3 years without, historically) have
    changed several times. The sub copy stays general on purpose: "a move early in your contract can need
    your current employer's consent".
  - **Article 17**: government work residence. Transfers from government to private-sector residence have
    been restricted or suspended at times, so the copy says "often restricted".
  - **Article 22**: family (dependent) residence. Dependants can move to a work residence (22 to 18) or get a
    work permit. PAM has opened and closed this route at times, so the copy does not promise it is always
    available.
  - Needs sponsorship: outside Kuwait or on a visit visa. This is the last option, as the spec requires.
- The new Foreigners' Residence Law (Decree-Law 114/2024) and its executive regulations (2025) replaced the
  1959 law. **Check whether the residence categories were renumbered.** Even if they were, "Article 18" is still
  how adverts and candidates describe the private-sector work residence, so keep it in brackets.
- Left out on purpose: Article 19/24 (investor, partner, self-sponsored). These are rare for salaried finance
  staff. Stateless residents (Bidoon) can work in the private sector, but their status is sensitive and
  rules-heavy, so we do not label it in copy. If needed, add it carefully, with legal review.
- Rule: Kuwaiti adverts often say "transferable residence only" or "Article 18 transferable", meaning they will
  not bring someone in from abroad. So people who need a new visa skip those postings.
- Places to verify (not fetched): pam.gov.kw, moi.gov.kw (residence affairs), the Sahel app.

## Kuwaitization (`nationalisation`), confidence: medium
- Private sector: Council of Ministers resolutions set a minimum share of Kuwaiti staff per sector. Firms
  below the quota pay escalating fees on their non-Kuwaiti workers and lose access to new work permits. Banking
  has the highest quota (the CBK has pushed banks to about two-thirds Kuwaiti or more). **I did not quote
  exact percentages** because I could not check the current table; the copy says only "set by sector and
  highest in banking".
- Government: Kuwaitization of the public sector (Council of Ministers resolution of 2017, with yearly
  targets to replace non-Kuwaitis) and Civil Service rules give Kuwaitis priority. The copy says "government
  jobs go to Kuwaitis first".
- National labour support allowance (دعم العمالة الوطنية), Law 19/2000: Kuwaitis in the private sector get a
  monthly state allowance on top of salary (high that it exists; the amounts depend on degree and family
  status and were not checked). It has been administered by the Manpower and Government Restructuring
  Program (MGRP / برنامج إعادة هيكلة القوى العاملة). I am not sure whether MGRP has since been folded into PAM,
  so **MGRP is not listed in `govPlatforms`** and the copy names no agency.
- Matching: we apply to "Kuwaitis only" postings only for Kuwaiti users. I did not assume that GCC nationals
  count toward the quota, so they are not treated as eligible for those postings.

## Sensitive fields (photo optional; gender, DOB, nationality ask; marital none), confidence: medium
- Kuwaiti and Gulf CVs commonly carry a photo, nationality, date of birth and residence status. ATS portals do
  not need the photo. So the photo is optional and only sent where a form asks.
- Gender, DOB and nationality are standard fields on large Kuwaiti employers' career portals (KPC group, banks)
  and on Bayt and GulfTalent profiles. Nationality also decides Kuwaitization eligibility and how residence
  transfers are handled. This rests on general knowledge of those forms, not a single page.
- Marital status appears on some CVs and on government forms (allowances depend on it). It is not needed for
  matching, so we do not ask (conservative, data minimisation). We never ask for the Civil ID number; employers
  collect it at offer stage.
- Labour Law 6/2010 bans pay discrimination on grounds such as sex, origin, language and religion. We never
  filter on gender or age.

## Legal, confidence: medium
- Kuwait has **no comprehensive data protection law**. The main instrument is CITRA's Data Privacy Protection
  Regulation (Resolution No. 42 of 2021, replaced by Resolution No. 26 of 2024), which applies to
  service providers handling personal data online. It sits alongside the privacy articles of the Electronic
  Transactions Law No. 20 of 2014. The privacy line names CITRA's regulation and makes no claims about specific
  rights or penalties. **Check** whether a standalone PDPL was passed in 2025-26; if one was, name it instead.
- Renewal: no specific auto-renewal statute that I know of. Consumer Protection Law No. 39 of 2014 requires clear
  terms. The line discloses auto-renewal at the same price for card and Apple Pay, says KNET renews by paying
  again (see Payments), and says that cancelling before the renewal date stops the next charge.
- Places to verify (not fetched): citra.gov.kw, moci.gov.kw.

## Work culture, confidence: medium-high
- Work week Sun-Thu, with a Fri-Sat weekend (since 2007) (high).
- Notice: Labour Law 6/2010 Art. 44 sets at least 3 months' notice for monthly-paid workers on indefinite
  contracts, so `noticeDays: 90` (medium-high). This is longer than in the UAE (30). Copy should not assume a
  new hire can start within a month.
- Ramadan: private-sector hours are capped at 36 a week (medium).
- Job boards: LinkedIn, Bayt, GulfTalent, Naukrigulf (strong with South Asian finance candidates) and Indeed
  (kw.indeed.com). Government hiring for Kuwaitis goes through the Civil Service Commission's central
  employment system, so CSC is in `govPlatforms` rather than `boards`.
- `govPlatforms`: CSC (government jobs), PIFSS (Kuwaitis' social-security employment record, the GOSI
  equivalent that employers check), PAM (work permits and residence transfers) and Sahel (the unified
  government e-services app, launched 2021).
- `lang2` is Arabic. English is the working language in banks, oil and listed groups; Arabic matters in
  government.

## Cities
Kuwait is effectively one metro area, so the "cities" are the six governorates, named after their main town and
ordered by finance-job density. Kuwait City (Capital: Sharq and Mirqab towers, banks, KIA, CBK, Boursa) comes
first. Next is Ahmadi (KOC, KNPC, EQUATE, Shuaiba), then Hawalli (Salmiya, hospitals, universities), Farwaniya
(Al Rai and The Avenues, the airport for Kuwait Airways and Jazeera), Jahra (Sulaibiya logistics, Agility) and
Mubarak Al-Kabeer. Area-to-governorate assignments are from knowledge (medium).

## Employers (24, all real), confidence: medium
- Energy: KPC (state holding, Kuwait City) and KOC (upstream, Ahmadi).
- Banks: KFH, the largest Islamic bank (it became one of the two largest banks with NBK after acquiring Ahli
  United Bank in 2022); NBK, the largest conventional bank; Gulf Bank; and Boubyan, an Islamic bank majority
  owned by NBK. `largestBanks` lists only KFH and NBK, because the #3 spot (Boubyan / Burgan / Gulf) changes.
- Telecom: Zain (group HQ in Shuwaikh) is #1 and stc Kuwait is #2. Ooredoo Kuwait is #3 and was left out. The
  stc vs Ooredoo order is from knowledge (medium).
- Sovereign: Kuwait Investment Authority. Big-4: EY Kuwait (Al Aiban, Al Osaimi & Partners). I avoided
  KPMG's Kuwait member firm (Safi Al-Mutawa & Partners) because it shares the persona's surname.
- FMCG: Mezzan Holding (food and consumer goods, Boursa-listed). Its city is set to Farwaniya; **the HQ
  location was not checked** (low).
- Retail: Alshaya Group, set to Kuwait City; the exact head-office area was not checked.
- Airlines: Kuwait Airways and Jazeera Airways, both at Kuwait International Airport (Farwaniya).
- Hospital: Dar Al Shifa (Hawalli), the largest private hospital. Kuwait has no large private hospital group
  like PureHealth, so a single big hospital is used.
- Insurer: Gulf Insurance Group (GIG). Fintech: MyFatoorah (Kuwaiti payment gateway). Delivery: talabat
  (founded in Kuwait in 2004, now HQ in Dubai, with a large Kuwait operation). Tech scale-up: Boutiqaat (Kuwaiti
  beauty e-commerce). **Check it is still a large employer in 2026**; Tap Payments is a fallback.
- Real estate: Mabanee (The Avenues, Al Rai). There is no giga-project developer comparable to KSA's.
  Exchange: Boursa Kuwait. Industrial: EQUATE (petrochemicals, Ahmadi). Government: Central Bank of Kuwait.
  Extra: Agility (logistics, Sulaibiya).
- Logo colours and monograms are approximate brand colours, not taken from brand guidelines.

## People
Ten names: eight Kuwaiti family names from different backgrounds (Al-Kandari, Al-Ajmi, Al-Roumi,
Al-Mutairi, Behbehani, Al-Enezi, Al-Awadhi, Al-Qattan), plus one Lebanese (Khoury) and one Indian (Varghese),
because Kuwait's finance recruiters are a mix of Kuwaitis and expats. Five are women and five are men. I avoided
the ruling-family name Al-Sabah and the names of big merchant groups.

## Arabic and French
- Arabic is in the Gulf register, with light Kuwaiti/Gulf dialect as in v5 and AE ("ما تحتاج", "تطلّع لك",
  "برّا", "بدري", "ياخذ", "ما ينخصم منك شي"). Place names follow local spelling: الأحمدي، الفروانية،
  الجهراء، مبارك الكبير، الشويخ، السالمية. KNET is written كي نت.
- French uses vouvoiement. "Koweït" is both the country ("au Koweït") and the city ("à Koweït"). In the city
  list it is "Koweït (ville)" to avoid ambiguity. The other places are Al-Ahmadi, Al-Farwaniya, Al-Jahra and
  Moubarak al-Kabir. The demonym is koweïtien / koweïtienne. Company names stay in their original form.

## Re-run checklist (when search is available)
1. VAT status (Tax). 2. KNET recurring, Google Pay, and Tabby/Tamara in Kuwait (Payments). 3. Residence
article numbers under the 2024 law, and the PAM transfer rules (Work rights). 4. Kuwaitization sector
percentages and MGRP status. 5. A 2026 Kuwait salary guide for f. 6. Data-protection law status. 7. HQ cities
for Mezzan and Alshaya, and whether Boutiqaat is still a large employer.
