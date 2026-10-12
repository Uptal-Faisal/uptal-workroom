# GB market pack: sources and reasoning

Researched 2026-10-12. Some recruiter and GOV.UK pages could not be opened directly from this environment (the proxy blocked them), so several figures come from search-result summaries of those pages. Each item says how confident we are. Where we were unsure, we took the conservative option.

## Payments
- **Cards first, then PayPal; Apple Pay and Google Pay as wallets.** UK online checkout runs on debit and credit cards plus wallets. UK Finance data, as cited by Akurateco, puts mobile-wallet registration at about 65% of adults in 2025, and nine in ten wallet users have a debit card behind the wallet. Big UK subscription services (Netflix, Spotify) offer card and PayPal. Samsung Wallet exists in the UK but is not standard at checkout, so we left it out. There is no domestic card scheme (Maestro has been retired), so `localCardBrand` is null.
  - https://akurateco.com/countries/payment-methods-in-the-uk
  - https://www.orchestrapay.com/coverage/europe/united-kingdom
  - https://worldpay.com/en-GB/insights/articles/what-63000-shoppers-just-told-us-about-paying
- **Open Banking / Pay by bank and Direct Debit were left out.** Open Banking is growing (351m payments in 2025, per Akurateco), but commercial variable recurring payments are not yet widely available for subscriptions. Direct Debit is common for utilities and gyms but not for app subscriptions. Both can be revisited later.
- **BNPL: Klarna Pay in 3, with a caveat.** Since 15 July 2026, Klarna Pay in 3 and Pay in 30 in the UK are FCA-regulated Deferred Payment Credit. According to Stripe's merchant note, saved Klarna methods charged without the customer present (that is, subscription renewals) can only use **Pay in Full**. When the customer is present, all options are still available after the regulatory disclosure step. So Pay in 3 works for the first payment of a 4- or 12-month plan, and renewals are charged in full; the `sub` copy says this. Klarna's own messaging must carry the regulated wording, so check the final copy against Klarna's UK partner marketing guidelines. PayPal Pay in 3 also exists, but we kept one provider to match the spec.
  - https://support.stripe.com/questions/uk-buy-now-pay-later-%28bnpl%29-regulation-update-july-15-2026-changes-to-klarna-future-payments
  - https://help.airwallex.com/hc/en-gb/articles/16815291867791-Klarna-UK-Buy-Now-Pay-Later-BNPL-What-Merchants-Need-to-Do-Between-13-to-15-July-2026
  - https://docs.klarna.com/platform/vtex/resources/marketing-tools/partner-marketing-legal-guidelines/united-kingdom/
  - https://helpx.adobe.com/uk/account/individual/billing-and-payments/payment-methods/klarna-faq.html (an example of Klarna used for a UK subscription)

## Tax
- **VAT at 20%, included in the price.** 20% is the UK standard rate, and B2C digital services are standard-rated. UK consumer pricing rules require consumer prices to include VAT, so `incl: true`. A non-UK supplier selling digital services to UK consumers must register for UK VAT. (Settled fact; there is no change to the rate in 2026.)

## Work rights (`rights`)
- **Auto-answered: British and Irish citizens.** Irish citizens have an unrestricted right to live and work in the UK under the Common Travel Area, so they need no visa and no share code. Everyone else proves right to work online with a share code: EUSS settled or pre-settled status, eVisas, and other visas.
  - https://ima-citizensrights.org.uk/resources/ukvi-and-share-codes-how-to-prove-your-status-digitally-2/
  - https://www.gherson.com/blog/right-to-work-share-code-guide/
- **Five options, the last one needing sponsorship:**
  1. British or Irish citizen.
  2. Settled status (EUSS), indefinite leave to remain (ILR) or right of abode. These are unrestricted and permanent.
  3. Pre-settled status (EUSS). This is unrestricted work for any employer, but time-limited.
  4. A visa that lets you work for any employer: Graduate (2 years now; cut to 18 months for applications from 1 Jan 2027), High Potential Individual, Youth Mobility, and family/partner visas. None of these need a sponsor.
  5. Needs sponsorship: Skilled Worker. Changing employer on a Skilled Worker visa needs a new Certificate of Sponsorship, so current Skilled Worker holders who want to move also pick this option.
  - Graduate route change: https://www.timeshighereducation.com/node/739481 and https://www.addleshawgoddard.com/en/insights/insights-briefings/2025/employment/further-uk-immigration-white-paper-changes-announced/
- **Context for the sponsorship rule.** Since 22 July 2025, Skilled Worker roles must be at RQF level 6 (degree level) with a general salary threshold of £41,700. SOC 2422 (finance and investment analysts and advisers) is reported at a going rate of about £45,800 and is, as far as we can tell, an eligible occupation. That means an 8-year analyst at about £62k clears the threshold. We could not open the GOV.UK going-rates table, so confirm before quoting these numbers in the UI. Since 8 Jan 2026 the Skilled Worker English requirement is B2. The rule copy says we skip jobs that state they cannot sponsor and favour employers on the Home Office register of licensed sponsors, which is public.
  - https://www.gov.uk/government/publications/skilled-worker-visa-going-rates-for-eligible-occupations/skilled-worker-visa-going-rates-for-eligible-occupation-codes
  - https://tarve.co.uk/soc/2422-finance-and-investment-analysts-and-advisers

## Nationalisation
- **None (`null`).** The UK has no nationality quota or reserved-profession scheme for private-sector finance jobs. A few Civil Service posts have nationality rules (reserved posts in security and diplomatic roles), but these do not apply to mainstream FP&A hiring.

## Sensitive fields
- **Photo: avoid. Gender, date of birth, nationality and marital status: none.** UK CV practice leaves all of these out. Age, sex, race (including nationality), and marriage and civil partnership are protected characteristics under the Equality Act 2010, so employers avoid collecting them at application stage. Right to work is checked separately, with documents rather than a CV field.
  - https://careerbldr.com/blog/cv-guide-united-kingdom/
  - https://atsverification.com/blog/uk-cv-format-2026/
  - https://www.uni2study.com/articles/cv-conventions-europe-germany-france-uk-spain
- **Gender is `none`, not `eeo`.** Many UK application systems include a voluntary equal-opportunities monitoring form (gender, ethnicity, disability, age band). It is optional, kept apart from selection, and always offers "Prefer not to say", but no law requires it the way US EEO self-ID works for some employers. We took the conservative option and do not ask. Switch to `eeo` if the product wants to fill these forms.

## Legal
- **Privacy.** UK GDPR plus the Data Protection Act 2018, as amended in part by the Data (Use and Access) Act 2025. The privacy line names the two main laws.
- **Renewal.** The DMCC Act 2024 subscription-contract regime, with reminder notices and a renewal cooling-off period, has been delayed to **spring 2027**, so it does not apply yet. Today the Consumer Contracts Regulations 2013 give a 14-day cancellation right for online services. If the consumer asks for the service to start during those 14 days, they pay for the share already provided, so the copy says "minus any service already provided". The renewal line says auto-renewal can be cancelled any time; this also prepares for the DMCC rules.
  - https://www.lewissilkin.com/en/insights/2026/04/02/consumer-law-update-subscriptions-regime-delayed-again-to-spring-2027-102mops
  - https://www.rpclegal.com/snapshots/consumer/summer-2026/uk-government-responds-to-consultation-on-new-subscription-contracts-regime/

## Salary (`sal.f = 0.20`, per year)
- **Benchmarks for a London Senior Financial Analyst / FP&A analyst with about 8 years and ACCA:**
  - Robert Half 2026 Salary Guide, FP&A Analyst, Greater London: P25 £60,500 / median £68,500 / P75 £78,500. https://www.roberthalf.com/gb/en/job-details/financial-planning-analysis-analyst/greater-london
  - Learnsignal UK 2026: senior financial analyst (4-7 yrs) £52-75k, median £62k; senior FP&A analyst £58-82k, median £68k. https://www.learnsignal.com/blog/financial-analyst-salary-uk/ and https://www.learnsignal.com/blog/fpa-analyst-salary-uk/
  - Payscale London senior financial analyst average about £54.5k (crowd-sourced, all experience levels). https://www.payscale.com/research/UK/Job=Senior_Financial_Analyst/Salary/2356fe94/London
  - Hays London Senior FP&A listing (Aug 2025): £60-65k plus bonus.
- **Chosen value.** A current base of about £62.5k a year (£5,200 a month). f = 5,200 / 26,000 = 0.20, so the engine gives 26,000 SAR → £62,500 a year and Noura's 34,000 SAR expectation → £81,500 a year. The expectation sits near the Robert Half P75 and the top of the Learnsignal senior FP&A band, which is plausible for an 8-year qualified analyst moving up. All figures are base pay, with bonus excluded. Confidence: medium. Guides vary by about ±£8k.

## Other choices
- **Cities.** Ordered by finance and FP&A job density, judged from recruiter and job-board volume: London, Manchester, Birmingham (HSBC UK HQ, big-4 hubs), Edinburgh (NatWest, asset managers), Leeds (Lloyds, Asda, NWF), Glasgow, Bristol, then Reading (the Thames Valley corporate HQ belt). The order of the last three is a judgement call. The London metro note includes the commuter belt so that Tesco (Welwyn Garden City) sits under London.
- **Employers.** All 24 are real, and the list covers the required sectors:
  - energy: BP, Shell
  - banks: HSBC, Barclays, Lloyds, plus NatWest
  - telecoms: BT Group (#1) and Virgin Media O2. VMO2 and the newly merged VodafoneThree are close for #2 by revenue; we used VMO2, whose head office is in Reading.
  - sovereign/public investment: National Wealth Fund (formerly the UK Infrastructure Bank, Leeds HQ)
  - big-4: Deloitte
  - FMCG: Unilever
  - retail: Tesco and Co-op (Manchester)
  - airline: British Airways
  - hospital group: Spire Healthcare
  - insurer: Aviva
  - tech scale-up: Octopus Energy
  - fintech: Revolut
  - food delivery: Deliveroo (DoorDash completed its acquisition on 2 Oct 2025; the brand continues)
  - real estate: Landsec
  - exchange: LSEG
  - mining: Rio Tinto
  - industrial: JLR (the company's corporate name since its 2023 rebrand from Jaguar Land Rover; Tata group; Coventry HQ, under Birmingham/West Midlands). The Arabic string keeps the long form جاكوار لاند روفر, which is how Arabic media still name it.
  - government/public body: Bank of England

  The UK has Islamic banks (Al Rayan, Gatehouse), but they are small and not relevant to mainstream FP&A hiring, so none is included. Logo colours are approximate brand colours, not official hex values.
  - Deliveroo: https://secure.businesswire.com/news/home/20251002060133/en/DoorDash-Completes-Acquisition-of-Deliveroo
- **Notice period: 30 days.** Recruiter commentary from 2026 says 1-3 months is typical in finance, with 3 months common at Big-4 firms, banks and manager level. We used 1 month, the usual figure at analyst level. https://accountancyrecruit.co.uk/?p=14267
- **Job boards.** LinkedIn, Indeed, Reed, Totaljobs and CV-Library are the main UK generalist boards. eFinancialCareers is the finance specialist. `govPlatforms` is empty: DWP "Find a job" and the share-code service exist, but they are not part of a typical finance job search for a UK citizen.
- **Certifications and universities.** ACCA, CIMA (CGMA), ICAEW ACA and CFA are the standard UK finance qualifications; CIMA is especially common in FP&A. Universities: LSE (which offers a BSc Accounting and Finance), Warwick (WBS) and Manchester (Alliance MBS).
- **Persona.** Sophie Carter, female, British, London, as in the roster. Her phone number is in the Ofcom drama range (07700 900xxx), so it is not a real number. Her employer, "Kestrel Vale Group" with its subsidiary "Kestrel Vale Foods", is fictional; a web search found no company with that name. Her bio mentions FRS 102 because UK subsidiaries usually report under FRS 102 while listed groups use UK-adopted IFRS. The bio says "hybrid" rather than "remote", which matches UK job ads.

## Fact-check pass (2026-10-12)
- Web search and fetch were unavailable during this pass, so nothing here was re-checked against live pages. Changes were limited to things known with confidence: JLR's current corporate name; French copy for the Klarna line ("sans intérêts" to match "interest-free", since Klarna UK may charge late fees); "RGPD britannique (UK GDPR)" in the French privacy line; "Paramètres" to match the other packs; and "équipe finance" in the French bio.
- Still unverified: Stripe's note that off-session (renewal) Klarna charges are Pay in Full only after 15 Jul 2026; whether Klarna's UK partner guidelines need extra wording next to "interest-free" under the FCA regime; the SOC 2422 going rate (about £45,800); and the spring-2027 start for the DMCC subscription rules.
