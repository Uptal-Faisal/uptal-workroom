# OM (Oman) market pack: sources and reasoning

Written 2026-10-12. **Nothing in this pack was checked live.** The run's shared WebSearch budget was used up
before this pack started (the one search I tried was refused), and direct page fetches failed (DNS lookups
failed in the sandbox, for example for mol.gov.om and en.wikipedia.org). Every fact below comes from general
knowledge (training data up to mid-2026). Each section gives a confidence level and says what to check before
launch. Where I was unsure I chose the conservative option. URLs are **places to verify, not fetched**.

The currency (OMR, after the number, with a space, `ر.ع` in Arabic) and the price tier (39 / 33 / 27 per
month, totals 132 / 324) come from `markets/base.json` and were not changed. Note: the OMR has 3 decimals
(1 OMR = 1,000 baisa) and is worth about USD 2.60, so OMR 39 is about USD 101 a month, roughly level with
the KWD tier. Flagging this for whoever sets prices; the pack does not touch it.

Confidence: **high** = well-established and stable; **medium** = I believe it is right but it may have changed
in 2025-26; **low** = a best guess that must be verified.

## Persona
From `roster.json` id `OM`: Salim Al-Busaidi, male, Omani (`OM`), lives in and targets Oman, city Muscat. As
an Omani he is in `rights.autoFor`, so he never sees the work-rights card. He is the one who benefits from
Omanisation.
- Arabic name: سالم البوسعيدي. Al Busaidi (البوسعيدي) is a well-known Omani family name (it is also the name
  of the ruling dynasty, but it is widely carried and is a natural choice for a persona; nothing in the copy
  ties him to the royal family). Stored as `persona.ar`, the same additive key the AE/KW/QA packs use.
- Employer "Daymaniyat Holding" (الديمانيات القابضة) and subsidiary "Daymaniyat Logistics" (الديمانيات للخدمات
  اللوجستية) are **fictional**. The Daymaniyat Islands are a nature reserve off Muscat/Barka, so the name sounds
  local. **I could not check company registers for clashes.** I avoided names that are common in Omani company
  names (Majan, Al Hajar, Bahla, Jabreen, Khareef). Swap if a real company uses it.
- Degree / university: BSc Accounting, Sultan Qaboos University (College of Economics and Political Science),
  the standard route for an Omani finance professional (high). The exact degree title at SQU was not checked,
  so I used the generic "BSc Accounting", as the SA/KW/QA packs do.
- Certification: ACCA. Oman has strong UK ties, ACCA is very common among Omani accountants, and the College
  of Banking and Financial Studies runs ACCA tuition (medium-high). CMA is the second common choice.
- Bio: mirrors Noura's v5 bio. The local touch is "I set up the group's VAT reporting when Oman introduced VAT
  in 2021" (5% VAT from 16 April 2021, see Tax). That fits 8 years' experience. Targets are Muscat and Sohar
  (port, freezone and industrial finance teams) or remote.
- Phone `+968 9123 4567`: Omani numbers have 8 digits and mobiles start with 7 or 9 (high). Example only.
- Email `salim.albusaidi@email.com`, same pattern as other packs.

## Salary (`sal.per = month`, `f = 0.06`), confidence: low
- Omani pay is quoted monthly in OMR, usually as basic + housing + transport allowances (high).
- **Tax:** no personal income tax today. Oman issued a Personal Income Tax Law by **Royal Decree 56/2025**
  (June 2025): 5% on individuals with annual gross income above **OMR 42,000**, effective **1 January 2028**
  (medium-high; it was widely reported as the first GCC personal income tax). Salim's band (about OMR 1,560-
  2,460 a month, i.e. under OMR 30,000 a year) is below the threshold, so it does not change anything here.
  It does mean copy should not promise "tax-free" as a permanent feature. **Verify** the threshold and date at
  tms.taxoman.gov.om.
- Ranges (from knowledge, not checked against a 2026 guide): Senior Financial Analyst / FP&A, ~8 yrs, Muscat,
  about OMR 1,200-1,800 a month for expats; Omani nationals at banks, OQ/PDO and state-owned groups about
  OMR 1,500-2,300. FP&A managers sit around OMR 2,000-3,000.
- f = 0.06 gives: current pay 26,000 x 0.06 = **OMR 1,560**; v5 market band 34-41k gives **OMR 2,040-2,460**.
  That puts Salim's ask in the upper part of the Omani-national range, which is plausible for an 8-year
  analyst at a large employer moving to a senior role.
- At the exchange rate alone (1 OMR = USD 2.6008, 1 SAR = USD 0.2667, so 1 SAR = ~0.1025 OMR) f would be
  0.1025. Muscat pays well below Riyadh for this role, more so than Kuwait (KW uses 0.06 in KWD, which is
  ~25% more in real terms). If anything 0.06 may be slightly high; 0.055 is the lower plausible value.
- **Verify** against Cooper Fitch, Hays or Michael Page Oman guides, or Bayt/GulfTalent salary pages. Keep f
  within 0.05-0.07 unless a guide clearly says otherwise.

## Tax (`incl: true, rate: 5`, label "VAT included"), confidence: high
- Oman introduced **5% VAT on 16 April 2021** (VAT Law, Royal Decree 121/2020), administered by the Oman Tax
  Authority. Consumer prices must be shown VAT-inclusive. So the price shown already includes VAT, using the
  same labels as the AE and SA packs ("شامل ضريبة القيمة المضافة", "TVA incluse").
- Electronic services supplied by non-resident providers to consumers in Oman are in scope; as I recall the
  Tax Authority has moved to require non-resident digital-service suppliers to register. **Verify** the
  registration obligation for Uptal with a tax adviser (medium). This does not change the display.
- Corporate tax is 15% (Law RD 9/2017 as amended) and a 15% Domestic Minimum Top-up Tax for large
  multinationals applies from 2025; neither touches consumer prices.

## Payments
- **Cards first** (medium-high). Most Omani bank debit cards are co-badged with Visa or Mastercard (Bank
  Muscat, Sohar International, Bank Dhofar, NBO), and credit cards are Visa/Mastercard. So card leads, unlike
  KW where KNET dominates. Amex is left out: some banks issue it, but I could not confirm acceptance is wide
  enough online to show it (conservative).
- **OmanNet is the local scheme** (`localCardBrand: "OmanNet"`, confidence: medium-high that it exists and is
  the national switch). OmanNet is the national ATM/POS switch run under the Central Bank of Oman, and it has an
  e-commerce payment gateway used notably for government payments. Local gateways (Thawani, Amwal Pay, bank
  gateways) show OmanNet debit as its own option. It is listed **second**, as its own method (`id: "omannet"`),
  for cardholders whose debit card is OmanNet-only. Arabic label "عُمان نت" is how it is commonly written;
  **verify** the official Arabic brand name.
- **`recurring: false` on OmanNet** (same extra key as KW's KNET, confidence: medium). OmanNet e-commerce
  payments are customer-authenticated redirects and, as far as I know, do not support stored-card
  merchant-initiated charges. An OmanNet payer therefore renews by paying again, and `legal.renewal` says so.
  **Verify with the chosen gateway**; if tokenised recurring works, drop the flag and the OmanNet clause.
- Wallets `["apple"]` (medium). Apple Pay launched in Oman around 2024 with the major banks (Bank Muscat and
  others), as I recall. **Google Pay and Samsung Wallet were left out** because I could not confirm their Oman
  availability (conservative). Check and add `"google"` if it is live.
- BNPL `[]` (medium). As far as I know Tabby and Tamara do **not** serve Oman (their markets are KSA, UAE,
  Kuwait and, for some, Bahrain/Qatar). I could not confirm any subscription-capable BNPL in Oman, so none is
  shown. **Verify**: if Tabby or Tamara has launched in Oman and accepts a subscription merchant, add it using
  the AE entries.
- PayPal is not listed. It is not a common checkout method in Oman.
- Places to verify (not fetched): cbo.gov.om (payment systems, OmanNet), thawani.om, apple.com/apple-pay
  (country list), tabby.ai, tamara.co.

## Work rights
- `autoFor`: OM plus the 5 other GCC states (high). GCC nationals work in Oman on GCC common-market terms with
  no work visa or sponsor. They do **not** count toward Omanisation, so the matching rule still skips
  Omani-only roles for them (they never see the card, but the rule applies in matching). The auto text says
  "without visa sponsorship", not "without any paperwork".
- Statuses on the card (4, within the spec's 3-7):
  - **Work visa through my employer** (high for the category). Expats work on an employer-sponsored employment
    visa with a Ministry of Labour work permit (labour card) and a Royal Oman Police resident card. Since
    **January 2021** the NOC requirement for changing employers was dropped, provided the contract has ended or
    been ended correctly (medium-high). The sub copy stays at that level: "when your contract ends or after
    proper notice, with no NOC. The new employer transfers your work permit."
  - **Family-sponsored residence** (medium). Dependants on a spouse's or parent's sponsorship need the employer
    to arrange a work permit and, in practice, an employment visa before they can work. I was not sure whether
    Oman lets a dependant work while keeping the family visa, so the copy says only "your employer needs to
    arrange your work permit and visa" (conservative).
  - **Needs sponsorship**: outside Oman or on a visit visa. Last option, as the spec requires.
- Left out on purpose: the Investor Residence / long-term residence programme (5- and 10-year, from 2021). It
  is tied to investment, and I could not confirm that holders can take salaried jobs with any employer, so it
  is not offered as a status. Also left out: foreign spouses and children of Omanis, which have their own rules.
- Rule: some Omani adverts only take candidates already in Oman (visa transferable), and some job titles are
  closed to expatriates (see Omanisation), so the rule covers both.
- Places to verify (not fetched): mol.gov.om, rop.gov.om (residence and visas), evisa.rop.gov.om.

## Omanisation (`nationalisation`), confidence: medium
- Private sector: Ministry of Labour decisions set minimum Omanisation percentages by sector, and firms below
  target face restrictions on new work permits. Banking has the highest rate: the Central Bank of Oman has
  long required very high Omanisation in banks (actual rates around 90%+). Insurance also has high targets set by
  the financial regulator (the Capital Market Authority, which as I recall became the Financial Services
  Authority in 2024). **I did not quote exact percentages** because I could not check the current table; the
  copy says only "set by sector and highest in banking".
- Reserved professions: a series of Ministry of Labour decisions (several rounds since the 2010s, with a large
  list issued in the 2020s) reserve specific job titles for Omanis, and new work permits for those titles are
  not issued to expatriates. **I could not check whether finance titles such as accountant or financial analyst
  are on the current list.** The copy names no titles; the matching rule says "including job titles closed to
  expatriates", which is safe either way. **Verify** before launch.
- The Labour Law (Royal Decree 53/2023, replacing RD 35/2003) requires employers to have an Omanisation plan
  and gives the Ministry power to set targets (medium).
- Matching: we apply to "Omanis only" postings only for Omani users.

## Sensitive fields (photo optional; gender, DOB, nationality ask; marital none), confidence: medium
- Omani and Gulf CVs commonly carry a photo, nationality, date of birth and visa status. ATS portals do not need
  the photo. So the photo is optional and only sent where a form asks.
- Gender, DOB and nationality are standard fields on large Omani employers' career portals (OQ, PDO, banks,
  Oman Air) and on Bayt and GulfTalent profiles. Nationality also decides Omanisation eligibility and
  work-permit handling. This rests on general knowledge of those forms, not a single page.
- Marital status appears on some CVs and government forms. It is not needed for matching, so we do not ask
  (conservative). Oman's PDPL treats health, genetic, biometric, religious and similar data as sensitive and
  needs extra permission to process it; we collect none of that.
- We never ask for the civil number or resident card number; employers collect it at offer stage.
- We never filter on gender or age.

## Legal, confidence: medium
- **Personal Data Protection Law, Royal Decree 6/2022** (in force February 2023), with **Executive
  Regulations issued by Ministerial Decision 34/2024** of the Ministry of Transport, Communications and IT
  (medium-high). It requires consent, covers cross-border transfers and gave controllers a grace period to
  comply. The privacy line names the law and makes no other claims.
- Renewal: no specific auto-renewal statute that I know of. The Consumer Protection Law (Royal Decree 66/2014)
  and its regulations require clear terms. The line discloses auto-renewal at the same price for card and Apple
  Pay, says OmanNet renews by paying again (see Payments), and says that cancelling before the renewal date
  stops the next charge.
- Places to verify (not fetched): mtcit.gov.om (PDPL and regulations), cpa.gov.om (consumer protection).

## Employers (24, all real), confidence: medium-high for existence, medium for details
- Energy: **OQ** (the integrated state energy group, formerly Oman Oil Company and Orpic, rebranded 2019),
  **Petroleum Development Oman** (largest producer; government 60%, Shell 34%, TotalEnergies 4%, PTTEP 2%),
  **OQ8** (Duqm refinery JV of OQ and Kuwait Petroleum International, renamed OQ8 in 2023, as I recall; city
  `duqm`). Oman LNG (Sur) was left out to keep the list at 24.
- Banks: **Bank Muscat** (largest), **Sohar International** (merged with HSBC Oman in 2023, now the #2 bank),
  **Bank Dhofar** (one of the next two; NBO is about the same size and could be swapped in). Islamic:
  **Bank Nizwa** (the first and largest stand-alone Islamic bank; Bank Muscat's Meethaq window is larger, but
  it is not a separate employer).
- Telecom: **Omantel** (#1), **Ooredoo Oman** (#2). Vodafone Oman launched in 2022 as #3.
- Sovereign: **Oman Investment Authority** (formed 2020). Government / semi-government: **Central Bank of
  Oman** and **Asyad Group** (the state logistics group: ports of Sohar, Salalah and Duqm, shipping, rail).
- Big-4: **PwC Oman** (all four firms are in Muscat; KW used EY and QA used KPMG, so PwC adds variety).
- FMCG: **Khimji Ramdas** (long-established Muscat conglomerate distributing major FMCG brands). Oman has few
  local FMCG manufacturers on the scale of Almarai; A'Saffa Foods or Mazoon Dairy are alternatives.
- Retail: **Lulu Hypermarket** (the largest hypermarket chain in Oman; group is UAE-based, Oman region HQ in
  Muscat). Airline: **Oman Air** (national carrier; SalamAir is the low-cost alternative). Hospital group:
  **Badr Al Samaa** (Omani private hospital group). Insurer: **Dhofar Insurance**.
- Tech: Oman has few true tech scale-ups, so **Oman Data Park** (Omantel's cloud and data-centre arm) fills the
  tech slot; **Thawani** (Omani payments gateway) is the fintech; **talabat** (operates in Oman) is the
  delivery app.
- Real estate: **Omran Group** (state tourism and integrated-community developer). Sultan Haitham City is a
  Ministry of Housing giga-project but not a separate employer, so it is not listed.
- Exchange: **Muscat Stock Exchange** (renamed from Muscat Securities Market in 2021). Industrial: **Sohar
  Aluminium** (smelter at Sohar port; city `sohar`).
- Logo colours are brand-ish approximations, not checked against brand guides.

## Cities, confidence: high for geography, medium for ordering
- Muscat dominates finance hiring (banks, HQs, government). Sohar (port, freezone, steel/aluminium,
  refining) is second. Salalah (port, freezone) and Duqm (SEZAD, refinery) follow. Nizwa and Sur (Oman LNG at
  Qalhat) are smaller. French forms: Mascate, Sour; the others keep their usual spelling.

## Government platforms, confidence: medium
- **Ministry of Labour**: work permits, transfers, Omanisation, and the national job-seeker register for Omanis.
- **Social Protection Fund** (صندوق الحماية الاجتماعية): replaced PASI and other pension funds from 2023 under
  the Social Protection Law (Royal Decree 52/2023); holds Omanis' contribution and employment record and runs
  the job-security (unemployment) benefit (medium-high).
- **Royal Oman Police**: resident cards and visas.
- Not listed: Sanad service centres (help people complete government transactions), because they are not
  specific to job seeking.

## Work culture, confidence: medium-high
- Work week Sun-Thu with a Fri-Sat weekend since May 2013 (high). Government offices also offer flexible
  start times.
- Wage Protection System: the Ministry of Labour rolled out WPS for private-sector salaries in phases from 2023
  (medium).
- Notice: the Labour Law (RD 53/2023) keeps a minimum notice of 30 days for monthly-paid staff unless the
  contract sets more (medium). `noticeDays: 30`. Senior finance contracts often say 60-90 days; that is noted
  in `culture.notes`.
- Ramadan: shorter hours for Muslim employees (about 6 a day) (medium-high on the principle, medium on the
  exact cap under the new law).
- CVs: 2 pages in English, Arabic for government; personal block with nationality and visa status. Cover
  letters rarely required.
- Boards: LinkedIn, Bayt, GulfTalent, Naukrigulf, Indeed (om.indeed.com) (medium-high).
- Language: English is the working language in banks, oil and gas and listed groups; Arabic matters in
  government (`lang2` = Arabic).

## Arabic and French copy
- Arabic uses the Gulf register used in the KW/QA packs (ما تحتاج، تقدر، لازم، اللي، بعد = "also"). The country
  name is written **عُمان** with a damma to avoid confusion with Amman (عمّان); the demonym is عُماني / عُمانية.
- French: "à Oman" (the usual form, as in "ambassade de France à Oman"), "omanais / omanaise", Mascate, Sour,
  vouvoiement throughout.
