# BH (Bahrain) market pack: sources and reasoning

Written 2026-10-12. **Nothing in this pack was checked live.** The run's shared WebSearch budget was already
used up, and direct page fetches failed with DNS errors (nbr.gov.bh, lmra.gov.bh, benefit.bh and wikipedia.org
all returned ENOTFOUND). Every fact below comes from general knowledge (training data up to mid-2026). Each
section gives a confidence level and says what to check before launch. Where I was unsure, I chose the
conservative option. URLs are **places to verify, not fetched**. The currency (BHD, after the number, with a
space, `د.ب` in Arabic) and the price tier (39 / 33 / 27 per month, totals 132 / 324) come from
`markets/base.json` and were not changed.

Confidence: **high** = well-established and stable; **medium** = I believe it is right but it may have changed
in 2025-26; **low** = a best guess that must be verified.

## Persona
From `roster.json` id `BH`: Fatema Al-Sayed, female, Bahraini (`BH`), lives in and targets Bahrain, city
Manama. As a Bahraini she is in `rights.autoFor`, so she never sees the work-rights card, and Bahrainization
works in her favour.
- Arabic name: فاطمة السيد. "Fatema" is the usual Bahraini romanisation, and Al-Sayed (السيد) is a common
  Bahraini family name. It is stored as `persona.ar`, the same additive key the AE, QA and KW packs use.
- Employer "Hayrat Holding" (هيرات القابضة) and subsidiary "Hayrat Properties" (هيرات العقارية) are
  **fictional**. The hayrat are Bahrain's traditional pearl-oyster beds, so the name sounds local. I avoided
  names that are taken by real large companies (Dilmun, Awal, Tylos, Lulu, Dana) and the big merchant families
  (Kanoo, Almoayyed, Fakhro, Zayani). **I could not check whether a small real company uses "Hayrat".** If one
  does, swap it.
- Degree / university: BSc Accounting, University of Bahrain (College of Business Administration), the
  standard route for a Bahraini finance professional (medium-high on the degree title).
- Certification: ACCA. The Bahrain Institute of Banking and Finance (BIBF) has long been a major ACCA tuition
  provider, and ACCA is very common in Bahrain's banks and audit firms because of the British-style financial
  sector. CMA is the strong second choice. Confidence: medium.
- Bio: mirrors Noura's v5 bio. The local touch is "I ran our VAT returns through Bahrain's move to 10%". The
  rate rose from 5% to 10% on 1 January 2022, which is a real event for any finance team there. I avoided the
  15% Domestic Minimum Top-up Tax, which only hits large multinational groups. Targets: Manama and Muharraq
  (Gulf Air, the airport, Diyar Al Muharraq) or remote.
- Phone `+973 3612 3456`: Bahraini numbers have 8 digits and mobile numbers start with 3 (also 6). The number
  is an example only.

## Salary (`sal.per = month`, `f = 0.05`), confidence: low
- Bahraini pay is quoted monthly in BHD, and there is no personal income tax (high). Bahrainis pay
  social-insurance (pension) contributions through SIO.
- Ranges (from knowledge, not checked against a 2026 guide): Senior Financial Analyst / Senior FP&A, ~8 yrs,
  Manama, about BHD 1,100-1,600 a month for expats at banks and large groups. Bahraini nationals at banks,
  Bapco Energies, Alba, Mumtalakat companies and the CBB earn about BHD 1,300-2,000.
- f = 0.05 gives: current pay 26,000 x 0.05 = **BHD 1,300**; v5 market band 34-41k gives **BHD 1,700-2,050**;
  Senior FA band 38-45k gives BHD 1,900-2,250. That puts Fatema's ask in the upper part of the Bahraini-national
  range. This is the same reading as the v5 KSA band, which sits at the upper end of the Saudi market.
- At the exchange rate alone (BHD 0.376 = USD 1 and SAR 3.75 = USD 1, so 1 BHD = ~9.97 SAR) f would be 0.10.
  Bahrain pays much less than Riyadh's top employers for this role, so f is about half that. For comparison,
  the other GCC packs put the SAR value of the same job at about 90% of Riyadh (QA), 82% (AE) and 73% (KW).
  Bahrain is the lowest-paying GCC market for this role, so I used about 50%.
- **Verify** against a 2026 GCC salary guide (Cooper Fitch, Hays GCC, Michael Page) or Bayt/GulfTalent salary
  pages for Bahrain. Keep f within 0.04-0.06 unless a guide clearly says otherwise.

## Tax (`incl: true, rate: 10`, "VAT included"), confidence: high
- Bahrain introduced VAT at 5% on 1 January 2019 (Decree-Law No. 48 of 2018). It doubled to **10% from
  1 January 2022** (Decree-Law No. 33 of 2021), as part of the fiscal balance programme. I know of no change
  since then, as of mid-2026.
- Consumer prices in the Gulf are shown VAT-inclusive, so `incl: true` and the label "VAT included"
  (Arabic "شامل ضريبة القيمة المضافة", French "TVA incluse"), the same as the SA and AE packs.
- Note for launch: non-resident suppliers of digital services to consumers in Bahrain must register for VAT
  with the National Bureau for Revenue (NBR). The details of the threshold and registration should be checked.
- Places to verify (not fetched): nbr.gov.bh.

## Payments
- **BENEFIT is the local scheme** (`localCardBrand: "BENEFIT"`), confidence: high. The BENEFIT Company (owned
  by Bahraini banks and licensed by the CBB) runs the national ATM and debit network, the BENEFIT Payment
  Gateway for online debit payments, Fawri/Fawri+ transfers, and the **BenefitPay** wallet. Most Bahraini
  debit cards run on BENEFIT, and BenefitPay is the everyday way Bahrainis pay each other, in shops (QR) and
  online. That is why I put BenefitPay **first**, as its own method (`id: "benefit"`, label "BenefitPay"; id changed from `benefitpay` in the fact-check, see below), as the KW pack does
  for KNET ("cards first unless a local method dominates"). One method covers both the BenefitPay app and the
  BENEFIT debit-card gateway, so the checkout stays short. If the payment provider shows them separately, split
  it into `benefit` (gateway) and `benefitpay` (app). Confidence that BenefitPay dominates everyday payments: medium-high.
- **`recurring: false` on BenefitPay** (extra key, as in KW), confidence: medium. BENEFIT debit and BenefitPay
  payments are customer-authenticated (PIN/OTP or in-app approval). As far as I know, they do not support
  stored-card charges started by the merchant, so a BenefitPay payer cannot be auto-renewed. The renewal line
  says so. **Verify with the chosen gateway** (Tap Payments, Credimax and AFS all support BENEFIT). If
  tokenised recurring payments are available, drop the flag and the BenefitPay clause in `legal.renewal`.
- Card: Visa and Mastercard, plus **Amex**. CrediMax (a BBK subsidiary) issues and acquires American Express in
  Bahrain, so Amex cards are fairly common there (medium). Remove `amex` if our acquirer does not take it.
- Wallets `["apple"]`. Apple Pay has been live in Bahrain since about 2021-22 with the main banks and CrediMax
  (medium-high). **Google Pay and Samsung Wallet were left out** because I could not confirm that they work for
  web payments in Bahrain (conservative choice). Check, and add `"google"` if it is live.
- **BNPL `[]`** (conservative), confidence: low. Tabby and Tamara, the BNPL options in the SA, AE and KW packs,
  focus on KSA, the UAE and Kuwait. I could not confirm that either one serves Bahraini consumers or will
  onboard a subscription merchant there. The CBB has regulated BNPL, and local players may exist. **Verify**
  tabby.ai and tamara.co. If one serves Bahrain, copy the KW `bnpl` entries. The 4-month (BHD 132) and
  12-month (BHD 324) totals are small enough for pay-in-4.
- PayPal is not listed. It is not a common checkout method in Bahrain.
- Places to verify (not fetched): benefit.bh, cbb.gov.bh, credimax.com.bh, tabby.ai, tamara.co.

## Work rights
- `autoFor`: BH plus the 5 other GCC states (high). GCC nationals work in Bahrain on GCC common-market terms,
  with no work visa or sponsor. The auto text says "without visa sponsorship", not "without any paperwork".
- Statuses on the card (medium):
  - **Work permit through my employer.** Expat work permits are issued by the Labour Market Regulatory
    Authority (LMRA, هيئة تنظيم سوق العمل), with the employer as sponsor. Since 2009, LMRA has let expats move
    to a new employer without their current employer's consent. A 2011 amendment requires the worker to have
    completed a minimum period, generally one year, before they can move without consent. The sub copy stays
    general on purpose: "Moving in your first year can need your current employer's consent". **Verify** the
    current mobility rule with LMRA.
  - **Family-sponsored residence.** Dependants on a spouse's or parent's residence can work once an employer
    gets them an LMRA work permit (medium).
  - **Golden Residency.** Launched in February 2022: a 10-year renewable residence permit that is not tied to an
    employer. Routes include residents with 5+ years in Bahrain earning at least BHD 2,000 a month, property
    owners, retirees and talent categories (medium). I am **not sure** whether holders still need an LMRA work
    permit to take a job. So the sub copy only says "not tied to an employer" and makes no claim about work
    permits. **Verify** with the NPRA (npra.gov.bh) and LMRA.
  - Needs sponsorship: outside Bahrain or on a visit visa. This is the last option, as the spec requires.
    Bahrain has at times restricted turning visit visas into work permits, so the copy does not promise it.
- Left out on purpose: the **Flexi Permit**. It was abolished in 2023 and replaced by LMRA-registered labour
  registration centres, and it was aimed at low-wage workers, not finance professionals. Also left out: foreign
  spouses and children of Bahrainis, who get favourable treatment in employment. That status is
  rules-heavy, so we do not label it. If it is needed, add it with legal review.
- Rule: Bahraini adverts often say "Bahrainis only" or "candidates in Bahrain only / transferable visa", which
  means they will not bring someone in from abroad. So people who need a new visa skip those postings.
- Places to verify (not fetched): lmra.gov.bh, npra.gov.bh.

## Bahrainization (`nationalisation`), confidence: medium
- LMRA sets minimum Bahraini staff ratios by sector and company size. Firms below the ratio face limits on new
  expat work permits. Over the years Bahrain has also had "parallel Bahrainization", where a firm below its
  ratio could pay a higher fee per extra expat permit. There has been political pressure in 2024-25 to tighten
  or end that option, so **the copy does not mention fees** and only says that the targets are set by sector and company size and that LMRA applies them (fact-check wording).
- Ministry of Labour / National Employment Programme (2019 onwards): Bahraini job seekers get priority, and
  employers have been required to post vacancies in the ministry's system for a period before LMRA issues new
  expat permits (medium-low on the current details). The copy does not quote this rule, and the Ministry is in
  `govPlatforms`.
- Tamkeen (the Labour Fund) pays wage support for Bahrainis hired in the private sector, plus training
  grants (high that it exists; programme details change often). The copy says "Tamkeen subsidises Bahraini
  salaries in the private sector".
- Government: the Civil Service Bureau gives Bahrainis priority in government jobs (high).
- Banking is one of the most Bahrainized sectors. The Bahraini share of banking jobs is often quoted at around
  two-thirds, but **I did not quote a number** because I could not check it.
- Matching: we apply to "Bahrainis only" postings only for Bahraini users. I did not assume that GCC nationals
  count toward the ratio, so they are not treated as eligible for those postings.
- Places to verify (not fetched): lmra.gov.bh, mol.gov.bh, tamkeen.bh.

## Sensitive fields (photo optional; gender, DOB, nationality ask; marital none), confidence: medium
- Bahraini and Gulf CVs commonly carry a photo, nationality, date of birth and residence or CPR status. ATS
  portals do not need the photo. So the photo is optional and only sent where a form asks.
- Gender, DOB and nationality are standard fields on large Bahraini employers' career portals (banks,
  Bapco Energies, Alba, Gulf Air) and on Bayt and GulfTalent profiles. Nationality also decides Bahrainization
  eligibility, Tamkeen-supported roles and LMRA work-permit handling. This rests on general knowledge of those
  forms, not a single page.
- Marital status appears on some CVs and on government forms. It is not needed for matching, so we do not ask
  (conservative, PDPL data minimisation). We never ask for the CPR number (the national ID); employers collect
  it at offer stage.
- Labour Law No. 36 of 2012 bans wage discrimination on grounds such as sex, origin, language and religion,
  and the Constitution bans discrimination more broadly. We never filter on gender or age.

## Legal, confidence: medium-high
- Bahrain's **Personal Data Protection Law (Law No. 30 of 2018)** came into force on 1 August 2019. It was one
  of the first comprehensive data protection laws in the GCC (high). The supervising authority is the Personal
  Data Protection Authority. Its functions were first run through the Ministry of Justice, and **I could not
  check the authority's current set-up** (medium). The privacy line names the law and its number and makes no
  claims about specific rights or penalties.
- Renewal: I know of no specific auto-renewal statute. Consumer Protection Law No. 35 of 2012 requires clear
  terms (medium). The line discloses auto-renewal at the same price for card and Apple Pay, says that BenefitPay
  renews by paying again (see Payments), and says that cancelling before the renewal date stops the next charge.
- Places to verify (not fetched): pdp.gov.bh, moic.gov.bh.

## Work culture, confidence: medium-high
- Work week Sun-Thu, with a Fri-Sat weekend since September 2006 (high). Government hours are about
  7:00-14:15 (medium).
- Notice: Labour Law 36/2012 requires at least 30 days' notice to end an indefinite contract (medium-high), so
  `noticeDays: 30`. Senior finance contracts often say 1-3 months, which the culture notes mention.
- Pay is monthly. LMRA rolled out a Wage Protection System in phases from 2021 (medium).
- Ramadan: Muslim staff work reduced hours, 6 a day / 36 a week (medium).
- Job boards: LinkedIn, Bayt, GulfTalent, Naukrigulf (strong with South Asian finance candidates) and Indeed.
  Government and Tamkeen-supported hiring for Bahrainis goes through the Ministry of Labour's employment
  service, which is in `govPlatforms`, not `boards`.
- `govPlatforms`: LMRA (work permits and employer changes for expats), Ministry of Labour (national employment
  service for Bahraini job seekers), Tamkeen (wage support and training) and SIO (the social-insurance
  employment and salary record, the GOSI equivalent).
- `lang2` is Arabic. English is the working language in banks and the financial sector; Arabic matters in
  government and Bahraini-facing roles.

## Cities
Bahrain is small, and almost all finance jobs are in greater Manama, so the "cities" are the main towns and
industrial areas, ordered by finance-job density:
- **Manama** first: Bahrain Financial Harbour, Bahrain Bay, the Diplomatic Area, Seef and Sanabis host the
  banks, the CBB, Bahrain Bourse, Mumtalakat, Investcorp and the big-4.
- **Muharraq**: the airport, Gulf Air, Diyar Al Muharraq, Hidd (Khalifa Bin Salman Port, ASRY).
- **Sitra**: the Bapco refinery, GPIC and the industrial area.
- **Awali**: Bapco's historic oil town.
- **Askar**: the Alba smelter.
- **Riffa** and **Isa Town**: residential and government towns with fewer finance roles.

Area assignments are from knowledge (medium). Two places are **low** confidence: that Alba's plant sits at Askar,
and that Bapco Energies' head office is in Awali rather than in Manama/Seef. **Verify both.**

## Employers (24, all real), confidence: medium
- Energy: **Bapco Energies**, the national integrated energy company, the renamed nogaholding group (the Bapco Energies
  brand dates from about 2023, with subsidiaries renamed Bapco Refining, Bapco Upstream, Bapco Gas and so on;
  fact-check correction of "formed in 2021", medium confidence on the exact year). Arabic: بابكو إنرجيز. Industrial: **Alba**, one of the world's largest single-site
  aluminium smelters.
- Banks: **NBB** (it took a majority stake in Bahrain Islamic Bank in 2020), **BBK** (it owns CrediMax), and
  **Bank ABC** (Arab Banking Corporation, group HQ at Bahrain Bay). Islamic: **Bahrain Islamic Bank** and
  **Al Salam Bank**.
  - I left out **Ahli United Bank**. Kuwait Finance House acquired AUB in 2022, and AUB Bahrain was being
    converted and rebranded under KFH. I could not check its current name. Add it as "KFH Bahrain" once
    confirmed, because it is one of the largest retail banks.
  - `largestBanks` (NBB, BBK, Bank ABC) is therefore a choice among the large banks, not a ranking.
- Investment: **Investcorp**, founded in Bahrain in 1982. It is listed as `extra` and is a classic Manama
  finance employer.
- Telecom: **Batelco** (the Beyon group's operator) is #1, and **stc Bahrain** (formerly VIVA) is #2. Zain
  Bahrain is the third operator and was left out. The stc vs Zain order is from knowledge (medium). Batelco's
  head office is in Hamala, just west of greater Manama; its city is set to `manama` because Hamala is not in
  the city list.
- Sovereign: **Mumtalakat** (Bahrain Mumtalakat Holding Company). Big-4: **KPMG Fakhro**, KPMG's Bahrain member
  firm.
- FMCG: **BMMI** (food and consumer-goods distribution; Alosra supermarkets). Retail: **Jawad Business Group**
  (supermarkets and franchise brands). The HQ areas for both were not checked (low); both are set to `manama`.
- Airline: **Gulf Air** (Muharraq). Hospital: **American Mission Hospital**, a private group with several
  sites. Insurer: **Solidarity Bahrain** (takaful).
- Tech scale-up: **Calo**, the meal-plan app founded in Bahrain in 2019 that expanded across the GCC. **Check
  where its head office is in 2026** (it may now sit in Riyadh). A fallback is Rain, the CBB-licensed crypto
  platform founded in Bahrain.
- Fintech: **BENEFIT**, the national e-payments company behind BenefitPay. Delivery: **talabat** (large
  Bahrain operation).
- Real estate: **Diyar Al Muharraq** (master developer of the Diyar Al Muharraq islands). Exchange: **Bahrain
  Bourse** (formerly Bahrain Stock Exchange; BHB is the bourse's own abbreviation, and its main index is the Bahrain All
  Share Index). Government: **Central Bank of Bahrain**
  and the **Economic Development Board**.
- I did not put Tamkeen in `employers`, because it appears in `govPlatforms`.
- Logo colours and monograms are approximate brand colours, not taken from brand guidelines.

## People
Ten names: eight common Bahraini family names (Al-Mahmood, Al-Aradi (first name Yousif; see fact-check), Al-Jishi, Al-Dosari, Janahi, Bucheeri,
Al-Qassab, Al-Alawi), plus one Indian (Menon) and one British (Reid), because Bahrain's finance recruiters are a
mix of Bahrainis and expats. Five are women and five are men. I avoided the ruling-family name Al-Khalifa and the
big merchant families (Kanoo, Almoayyed, Fakhro, Zayani).

## Arabic and French
- Arabic is in the Gulf register, with light dialect as in v5 and the other GCC packs ("ما تحتاج", "تطلّع لك",
  "برّا", "اللي", "ما ينخصم منك شي"). Place names follow local spelling: المنامة، المحرق، سترة، عوالي، عسكر،
  الرفاع، مدينة عيسى، السيف، السنابس، الجفير، البسيتين، عراد، الحد، المعامير، توبلي، سلماباد. Bahrainization
  is البحرنة. BenefitPay is written بنفت باي, and LMRA is هيئة تنظيم سوق العمل.
- French uses vouvoiement. The country is "Bahreïn", used without an article ("à Bahreïn", as the French foreign
  ministry writes it). The demonym is bahreïnien / bahreïnienne. Company names stay in their original form, except
  the Central Bank ("Banque centrale de Bahreïn").

## Re-run checklist (when search is available)
1. BenefitPay / BENEFIT recurring support, Google Pay in Bahrain, and Tabby/Tamara availability (Payments).
2. LMRA employer-change rule and whether Golden Residency holders need a work permit (Work rights). 3. The
current Bahrainization rules (parallel Bahrainization, vacancy posting) (Nationalisation). 4. A 2026 Bahrain
salary guide for f. 5. The PDP Authority's current set-up (Legal). 6. AUB / KFH Bahrain's current name, Calo's
HQ, and the Alba (Askar) and Bapco Energies (Awali) locations (Employers, Cities).

## Fact-check pass (2026-10-12)
This pass had no live sources either. The shared WebSearch budget was used up, and WebFetch could not resolve
tabby.ai, wikipedia.org, lmra.gov.bh or nbr.gov.bh (ENOTFOUND). Each claim was checked against prior knowledge,
against the sibling GCC packs, and against how the engine (`js/50-onboarding.js`) renders the pack.

**Changed in the JSON:**
1. **`pay.methods[0].id`: `benefitpay` → `benefit`** (confirmed engine defect). `cardBrands()` adds
   `localCardBrand` to the card tile unless a method tile has the same id (`bid("BENEFIT")` = `benefit`). With the
   id `benefitpay`, the card tile and the card-number field showed "BENEFIT, Visa, Mastercard" and dropped Amex
   (the engine shows 3 brands), which suggested the card form takes BENEFIT debit cards. Those cards go through
   the BENEFIT gateway, which the BenefitPay tile already covers. KW (`knet`/KNET), OM (`omannet`/OmanNet) and BE
   (`bancontact`) already match id and brand. The label stays "BenefitPay", the tile mark is now the engine's red
   "BENEFIT" tile, and the card tile now reads Visa, Mastercard, Amex. `localCardBrand` stays "BENEFIT" per spec.
2. **Bapco Energies Arabic name: بابكو للطاقة → بابكو إنرجيز.** The company and the Bahraini Arabic press (BNA,
   Akhbar Al Khaleej, Al Ayam) transliterate the brand; "بابكو للطاقة" is a translation it does not use (high
   confidence from knowledge).
3. **People: "Ali Al-Aradi" → "Yousif Al-Aradi" (يوسف العرادي).** Ali Al-Aradi (علي العرادي) is a well-known
   Bahraini politician (former First Deputy Speaker of the Council of Representatives), so a fictional recruiter
   should not carry that exact name. The family name stays; it is a common Bahraini name.
4. **Bahrainization copy reworded (precision, not a confirmed error).** "Must keep a share of Bahraini staff that
   LMRA sets" became "have Bahrainization targets ... set by sector and company size, and LMRA applies them when it
   issues work permits" (en/ar/fr). Under parallel Bahrainization a firm below its ratio could still get permits
   by paying a higher fee, so "must keep" overstated it, and the ratios come from government decisions that LMRA
   applies rather than from LMRA alone. The new wording is true whether or not parallel Bahrainization survives.

**Checked and kept (from knowledge):** VAT 10% since 1 Jan 2022, prices shown VAT-inclusive (high); GCC
`autoFor` (high); LMRA work permits, the one-year mobility rule worded as "can need" (medium); Golden Residency,
Feb 2022, 10-year renewable (medium-high); PDPL Law 30/2018 in force 1 Aug 2019 (high); Labour Law 36/2012 art. 39
wage non-discrimination, 30-day minimum notice, Ramadan 6 h/36 h (medium-high); Fri-Sat weekend since Sept 2006
(high); NBB majority owner of BisB, BBK owns CrediMax, CrediMax issues Amex, Beyon/Batelco, stc Bahrain ex-VIVA,
KPMG Fakhro, BMMI/Alosra, Gulf Air in Muharraq, GPIC and the refinery in Sitra (high); persona title
محللة مالية / Analyste financière (correct feminine); "أبحث عن وظيفة محلل مالي أول" keeps the generic job title,
the same as the v5 SA bio and every other GCC pack. Sensitive fields match AE, KW, QA and OM.

**Still open (could not verify):**
- BNPL: whether Tabby or Tamara serve Bahrain consumers in 2026 (kept `[]`). Google Pay for web checkout in
  Bahrain (kept Apple Pay only). Whether BenefitPay supports merchant-initiated recurring payments through our
  gateway (kept `recurring: false`; the engine does not read this flag today, it is informational).
- Salary f = 0.05 (BHD 1,300 now, BHD 1,700-2,050 target) is plausible, but 0.055-0.06 is also defensible. OM uses
  0.06, which puts Muscat about 17% above Manama in SAR terms for the same role. Check a 2026 Bahrain salary guide.
- Whether any VAT or other fiscal change was announced for Bahrain in late 2025-2026.
- Bapco Energies head-office location (Awali vs Manama), Alba at Askar, Calo's 2026 head office, BMMI and Jawad
  head-office areas, Batelco in Hamala (set to `manama`), and AUB's current name under KFH (not listed).
- Whether "المحمود" or "آل محمود" is the more usual Bahraini spelling for Al-Mahmood (both exist; kept).
