# NL market pack: sources and reasoning

Researched 2026-10-12. Several official hosts (ideal.nl, rijksoverheid.nl, ind.nl) could not be fetched from this environment, so some facts rest on search-result summaries of those pages plus secondary sources. Those cases are marked below.

## Payments
- **iDEAL first.** iDEAL (account-to-account) is the dominant Dutch online method. Estimates range from about 64% (A2A share including Wero, transfers and direct debit, 2025) to about 70% of online transactions; one survey puts iDEAL as the top preference for 40%, then PayPal 15% and Klarna 10%. Sources: emerchantpay "Top payment methods in the Netherlands", cross-border-magazine.com "E-Commerce Payment Landscape in the Netherlands 2025", nuvei.com.
- **Label "iDEAL | Wero".** The "iDEAL | Wero" co-brand had to be live on merchant checkouts by 31 Mar 2026 (from 29 Jan 2026). By Oct 2026 all Dutch banks are connected to Wero; payments then move gradually onto Wero rails, with the migration due to finish by 31 Dec 2027 at the latest. Consumers still pay in their own bank app. Sources: ideal.nl "iDEAL to phase into Wero starting in 2026"; Betaalvereniging "Next Phase of iDEAL Migration to Wero Begins in October" (16 Jul 2026); EPI press release; CM.com blog (Phase 2 = Q4 2026 to end 2027). **Revisit in 2027:** the label should become "Wero" once the iDEAL logo is retired.
- **Renewals by SEPA Direct Debit.** iDEAL itself is single-payment. PSPs (Mollie, Stripe, Adyen) create a SEPA Direct Debit mandate from the first iDEAL payment and collect renewals by direct debit (Mollie recurring docs; Chargebee/Mollie iDEAL docs; Firmhouse docs). I found no confirmed Wero recurring product yet, so the sub-label says SEPA Direct Debit.
- **Cards.** From 1 Jul 2023 Dutch banks issue Debit Mastercard and Visa Debit instead of Maestro/V PAY, so most Dutch debit cards now work online (old cards run until expiry, 2027 at the latest). Sources: iamexpat.nl, dutchreview.com, pay.nl. Amex is accepted by the main PSPs but is a minority card. This is why the sub-label says "debit or credit".
- **Wallets: Apple Pay and Google Pay.** Both are widely supported by Dutch banks. Samsung Pay never launched in NL; Samsung phones use Google Wallet or bank wallets. I found no 2026 source showing Samsung Wallet payments with ING, ABN AMRO or Rabobank, so samsung is left out (conservative).
- **localCardBrand: null.** The Netherlands has no domestic card scheme any more (the national PIN/Maestro debit role went to Debit Mastercard/Visa Debit). iDEAL is a bank-payment method, not a card brand, so it goes in `methods`.
- **BNPL: Klarna Pay in 3.** Klarna's Dutch site offers pay now, pay within 30 days, and "3 rentevrije termijnen" every 30 days (klarna.com/nl/betaalmethodes; EuroParcs partnership, Mar 2026). It suits a prepaid 4- or 12-month total. Caveat: EU CCD2 brings BNPL under consumer-credit rules from 20 Nov 2026, so check Klarna eligibility and disclosure after that date. Riverty ("achteraf betalen") is common too, but it is pay-later rather than instalments, so it is left out.

## Tax
- Standard Dutch VAT (BTW) is **21%**, the rate for B2C digital services sold to Dutch consumers. Consumer prices must be shown including VAT, so `incl: true`.

## Work rights
- **No permit needed (autoFor):** Dutch citizens, EU/EEA citizens (EU27 + IS, LI, NO) and Swiss citizens have free access to the Dutch labour market. The Croatian transitional restriction ended in 2018. Sources: business.gov.nl "Permits for your foreign employees", IND.
- **"Arbeid vrij toegestaan, TWV niet vereist":** this is the endorsement on residence documents that allows any work without a TWV, for example permanent residence, partner/family permits, EU long-term residents and Withdrawal-Agreement Britons. Sources: access-nl.org, IND single-permit page (free to work after 5 years), business.gov.nl (family members).
- **Orientation year (zoekjaar hoogopgeleiden):** a permit for up to 1 year, applied for within 3 years of graduating. It gives free access to work with no TWV, and the holder can switch to highly skilled migrant at the reduced salary threshold. Sources: government.nl, business.gov.nl, The Hague International Centre, Maastricht University.
- **Highly skilled migrant (kennismigrant) / EU Blue Card:** the employer must be an IND recognised sponsor, including when changing jobs. Salary thresholds for 2026 (gross per month, excluding the 8% holiday allowance): **EUR 5,942** for age 30+, **EUR 4,357** under 30, **EUR 3,122** reduced (orientation year / recent graduates). Sources: Grant Thornton, Baker Tilly, Deloitte, Leiden International Centre. **Reviewer doubt (unverified):** EUR 5,942 / 4,357 / 3,122 are the amounts I recall the IND setting for 1 Jan 2025 (2024 was 5,688 / 4,171 / 2,989). The indexed 2026 amounts may be about 4% higher, around EUR 6,200 for age 30+. Check ind.nl "Required amounts income requirements" before quoting a figure to users. No pack string currently shows the number. Deloitte reports a July 2025 proposal to tighten the scheme; as of Nov 2025 Parliament wanted further consideration, and I found no confirmation that it was adopted. Note: the persona-level salary (~EUR 5,600) is just under the 30+ threshold, so sponsored candidates need offers at or above EUR 5,942.
- **EU Blue Card vs recognised sponsor (fact-check 2026-10-12):** unlike the highly skilled migrant permit, the Dutch EU Blue Card does not require the employer to be an IND recognised sponsor. A non-recognised employer can still hire on a Blue Card through the regular procedure, where the employee applies. Holders who change employer must report the change to the IND. The HSM/Blue Card option sub-label now says this. Based on reviewer knowledge of the IND Blue Card page; ind.nl could not be fetched.
- **Matching rule:** the IND keeps a public register of recognised sponsors. Most non-EU finance hires go through it (HSM). Blue Card hires at non-recognised employers are possible but rare, so we take the conservative path and filter on that register.
- Option list order: citizen → EU/EEA/CH → free-to-work permit → orientation year → HSM/Blue Card → needs sponsorship (last, per spec).

## Nationalisation
- **null.** The Netherlands has no nationalisation or quota scheme. The labour-market test for a TWV (general work permit) is an immigration check, not a quota, and finance hires go through the HSM route, which has no labour-market test.

## Sensitive fields
- **photo: optional.** Sources disagree. Some say a Dutch CV photo is "optioneel (steeds minder standaard)" (airesume.guru); the werk.nl model CV has no photo, date of birth, nationality or BSN (inburgering.org on werk.nl); others still advise adding one. It is not illegal and is still seen often, so we allow it but never ask.
- **dob / nationality / marital / gender: none.** The NVP Sollicitatiecode (the Dutch recruitment code, renewed 2025) says organisations ask only for job-relevant information. AWGB (equal treatment) and WGBL (age) make age, sex, nationality and marital-status questions risky. YoungCapital advises leaving nationality and marital status off. Date of birth is still on some Dutch CVs (opinions are split), so the conservative choice is "none". I could not fetch the NVP PDF itself; this is based on search summaries.

## Legal
- **Privacy:** GDPR, known in Dutch as AVG, plus the Uitvoeringswet AVG (UAVG). The regulator is the Autoriteit Persoonsgegevens.
- **Renewal:** under art. 6:236 sub j BW (Wet Van Dam, contracts since 1 Dec 2011), a consumer subscription may tacitly renew after its fixed term only into an indefinite contract that the consumer can cancel at any time with **at most one month's notice**. Trial subscriptions may not renew tacitly. Sources: Rijksoverheid "Mogen abonnementen stilzwijgend verlengd worden?" (search summary), Kamerstukken 30 520, ACM. Product impact: **4- and 12-month plans cannot auto-renew for another fixed 4- or 12-month term for Dutch consumers.** After the first term they must continue on a cancel-anytime basis (monthly). The 14-day EU withdrawal right also applies, and the EU online "withdrawal function" (Directive 2023/2673) has applied since 19 Jun 2026. I did not confirm Dutch transposition status.

## Salary (sal.f = 0.215, per month)
- Target: Senior Financial Analyst / FP&A, ~8 years, Amsterdam.
- Benchmarks: Indeed "senior controller" Amsterdam ~EUR 5,736/month (47 salaries, Sep 2026). Nationale Beroepengids "senior financieel analist" EUR 4,600-5,000/month nationally, 40h, excluding bonus (updated Nov 2024). Payscale Amsterdam senior FA average ~EUR 62.7-63.7k/yr, with a 10th-90th percentile band of EUR 48-89k; Payscale "experienced" ~EUR 77k. Jobbird finance analyst ad EUR 5,500-7,000/month (3+ years). Robert Walters senior FP&A analyst (ICT, Amsterdam, Jun 2026) EUR 80-100k/yr plus bonus, which is a tech-sector outlier.
- Chosen: **~EUR 5,600 gross/month excluding the 8% holiday allowance** (about EUR 72.6k/yr including it). 26,000 × 0.215 = EUR 5,590.
- per = month because Dutch vacancies, CAO scales and IND thresholds are all expressed "bruto per maand". Annual figures = monthly × 12.96 when the holiday allowance is included.
- Confidence: medium. I could not open a 2026 recruiter salary guide (Hays, Robert Walters, Michael Page).

## Other choices
- **Cities:** ordered by an estimate of finance/FP&A job density (Randstad conurbation first, then Brainport Eindhoven, then Amersfoort with FrieslandCampina and other HQs, and Arnhem with TenneT and Alliander). This is a judgement call, not a measured ranking. Amstelveen (KLM), Zaandam (Ahold Delhaize) and Veldhoven (ASML) are folded into their metros through the `metro` notes.
- **Employers:** the checklist is met as follows:
  - energy: Shell (plc HQ in London since 2022, but a large Dutch base in The Hague, Rotterdam and Amsterdam); also TenneT (state-owned)
  - banks: ING, Rabobank, ABN AMRO; no Islamic bank (not relevant)
  - telecoms: KPN #1, VodafoneZiggo #2
  - public investment: APG (ABP's investor)
  - government: DNB, TenneT
  - Big 4: Deloitte
  - FMCG: Heineken, FrieslandCampina
  - retail: Ahold Delhaize
  - airline: KLM
  - hospital: Erasmus MC, one of the largest UMCs (since the 2023 AMC-VUmc merger, Amsterdam UMC may be as large or larger, so the archetype no longer says "largest")
  - insurer: NN Group
  - tech: Booking.com; scale-up: Picnic
  - fintech: Adyen
  - food delivery: Just Eat Takeaway.com (Prosus-owned since 2025, HQ still Amsterdam)
  - e-commerce: bol
  - exchange: Euronext Amsterdam
  - industrial: ASML
  - health-tech: Philips
  - real-estate / giga-project developer: none, as the Netherlands has no equivalent
  
  Logo colours are approximate brand colours.
- **Boards:** Intelligence Group NBB'24 (via recruitmenttraining.pro) puts LinkedIn at 61% of active job seekers, Indeed 49% and Nationale Vacaturebank 14%. Ahrefs/Semrush traffic confirms LinkedIn > Indeed > NVB, with Werkzoeken.nl in the top-10 HR sites. eFinancialCareers was added for banking and finance in Amsterdam.
- **lang2: Dutch.** Many domestic employers require it. Amsterdam multinationals often do not.
- **Certs:**
  - RC (Register Controller, VRC; earned through the Executive Master of Finance & Control) is the key controlling/FP&A credential.
  - RA (NBA) is the chartered-accountant title.
  - CFA is used in banking and asset management.
  - ACCA is recognised by the UvA MSc and common among internationals.
- **Unis:** UvA (MSc Accountancy & Control, with Accountancy and Control tracks; the Control track gives direct entry to the Executive Master of Finance & Control, which leads to the RC title), Erasmus University Rotterdam (ESE), Tilburg University.
- **Persona:** Sanne de Vries, f, NL, Amsterdam (roster). Employer "Amstelkade Group" is fictional (search found no company of that name; Amstelkade is an Amsterdam street). Degree: UvA MSc Accountancy & Control → RC.
- **Notice:** statutory 1 month to the end of the calendar month (art. 7:672 BW; business.gov.nl). Maximum by contract is 6 months, and the employer's notice must then be double. noticeDays = 30.
- **Phone:** Dutch mobiles are +31 6 followed by 8 digits.
