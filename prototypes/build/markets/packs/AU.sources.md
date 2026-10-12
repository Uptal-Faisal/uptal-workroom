# AU market pack: sources and reasoning

Researched 2026-10-12, with limited access. Two web searches ran, both on salaries. After that the web-search budget this run shares with other agents was used up. Direct page fetches were also blocked by the proxy (Robert Half, Morgan McKinley and Stripe docs all returned 403 or "not found"). So:

- the salary figures come from those two search-result summaries;
- everything else (payments, GST, visas, consumer and privacy law, CV norms) comes from working knowledge up to mid-2026, with nothing re-checked live.

Each item says how confident we are. Where we were unsure, we took the conservative option. Items marked **VERIFY** should be checked before launch.

## Payments
- **Cards first, then PayPal; Apple Pay and Google Pay as wallets.** Australian online checkout runs on Visa, Mastercard and Amex cards, and mobile-wallet use is among the highest in the world. Apple Pay and Google Pay are supported by all big-four banks. PayPal is widely used for online and subscription payments. Samsung Wallet exists but is not standard at web checkout, so we left it out. Confidence: high.
- **`localCardBrand: null` (eftpos left out on purpose).** eftpos is the domestic debit scheme (run by Australian Payments Plus), and most debit cards are dual-network: eftpos plus Visa Debit or Debit Mastercard. Online and recurring card-not-present payments on these cards normally run over Visa or Mastercard, and eftpos card-not-present acceptance depends on the processor. Showing an eftpos badge would promise routing we may not support, so we left it out (conservative). The card sub-line says "credit or debit" so debit-card holders know they can pay. Set this to `"eftpos"` only if the PSP supports eftpos card-not-present. Confidence: medium.
- **Not included: PayTo, BECS Direct Debit, Zip, Klarna.** PayTo (NPP mandates) is growing for recurring payments, but it is not yet a normal app-subscription checkout option. BECS direct debit is used for utilities and gyms, not apps. We kept one BNPL provider, as the GB pack does.
- **Surcharges.** We do not surcharge card payments. The RBA's 2025 review proposed removing surcharging on eftpos, Mastercard and Visa. **VERIFY** whether this is now in force before showing any card-fee copy.
- **BNPL: Afterpay pay in 4, with a caveat.** Afterpay (founded in Australia, now part of Block) is the most-used BNPL brand here. It splits a purchase into 4 interest-free fortnightly instalments. From 10 June 2025, BNPL is regulated credit under the National Consumer Credit Protection Act (as low-cost credit contracts). That applies to the provider, not to the merchant.
  - **Caveat: renewals.** As far as we know, Afterpay cannot be charged off-session, so it cannot take an automatic renewal. It suits the one-off payment for a 4-month (A$436) or 12-month (A$1,068) plan. Renewals must go on a card or PayPal, and the `sub` copy says so.
  - **Order limits.** New Afterpay customers often have low starting limits, so the 12-month total may be declined for some.
  - **VERIFY** with the PSP (Stripe or Adyen Afterpay) that Afterpay is allowed for digital subscriptions and can be paired with a saved card for renewal. If not, set `bnpl` to `[]`. That is the spec's default for "no subscription-capable BNPL".
  - Confidence: medium-low on whether Afterpay can be used for subscriptions; high that Afterpay is the BNPL Australians expect to see.

## Tax
- **GST at 10%, included in the price.** GST is a flat 10%. Since 1 July 2017, offshore suppliers of digital services to Australian consumers must register for GST and charge it. The Australian Consumer Law (component pricing) requires consumer prices to be shown as a single total including GST, so `incl: true`. The label is "GST included". The French copy keeps "GST" (French readers know the term from TVA/TPS). Confidence: high.

## Work rights (`rights`)
- **Auto-answered: Australian and New Zealand citizens.** New Zealand citizens are granted a Special Category visa (subclass 444) automatically on arrival. It lets them live and work in Australia indefinitely with no sponsor. Since 1 July 2023, those who have lived here 4+ years can apply directly for citizenship. This is the trans-Tasman equivalent of the UK/Ireland Common Travel Area. Confidence: high.
- **Five options, the last one needing sponsorship.** These match how Australian job ads and SEEK's screening question split candidates ("Australian citizen / permanent resident / visa with full work rights / visa with restrictions / require sponsorship"):
  1. Australian or New Zealand citizen.
  2. Permanent resident: any permanent visa, e.g. Skilled Independent 189, Skilled Nominated 190, Employer Nomination 186, Partner 100/801. These are unrestricted.
  3. Temporary visa with full work rights: Temporary Graduate 485, temporary partner 820/309, and bridging visas that carry full work rights.
     - The 485 lengths were cut from 1 July 2024: about 2 years for bachelor's and coursework master's, 3 years for PhD, with an age limit of 35. **VERIFY** before quoting durations.
  4. Visa with limited work rights:
     - Student 500: 48 hours a fortnight while the course is in session (since 1 July 2023), unlimited in scheduled breaks.
     - Working Holiday 417 / Work and Travel 462: generally up to 6 months with each employer.
     - Many ads say "full working rights only", so this group is matched like option 5.
  5. Needs sponsorship: the Skills in Demand visa (subclass 482).
     - It replaced the TSS visa for new applications on 7 Dec 2024 and has Specialist, Core and Labour Agreement streams.
     - From 1 July 2025 the Core Skills Income Threshold is about A$76,515 and the Specialist threshold about A$141,210, both indexed each July. **VERIFY** the 2026-27 figures.
     - An 8-year analyst at about A$130k clears the Core threshold.
     - FP&A roles are usually nominated as Management Accountant, Accountant (General) or Finance Manager on the Core Skills Occupation List. We believe these are on the list, but **VERIFY**.
     - Changing employer needs a new nomination, so current 482 holders who want to move also pick this option. Holders now have up to 180 days (365 in total) to find a new sponsor.
     - Labour market testing still applies before an employer can nominate.
- **Rule copy.** "Full working rights" and "Australian citizens or PR only" are very common in Australian ads. So for options 4 and 5 we skip those ads and favour employers that sponsor. Unlike the UK and the Netherlands, there is no public register of approved sponsors to match against, which is why the copy says "favour" rather than naming a register.
  - Most Australian Public Service jobs require citizenship (Public Service Act 1999, s22(8)), and so do security-cleared defence and intelligence roles. So the rule also skips those for non-citizens, including permanent residents.
  - Confidence: high on the visa categories, medium on the exact thresholds.

## Nationalisation
- **None (`null`).** Australia has no nationality quota or reserved-profession scheme for private-sector finance jobs. The APS citizenship requirement and labour market testing for sponsored visas are covered in the rights card and rule, not as a nationalisation scheme. Confidence: high.

## Sensitive fields
- **Photo: avoid. Gender, date of birth, nationality and marital status: none.** Australian resume practice leaves all of these out. These laws protect sex, age, race and national extraction, and marital or relationship status:
  - the Fair Work Act 2009, s351 (adverse action);
  - the Sex Discrimination Act 1984, Age Discrimination Act 2004 and Racial Discrimination Act 1975;
  - state Acts such as the NSW Anti-Discrimination Act 1977.

  So employers avoid collecting them when people apply. Right to work is asked as a screening question (and checked through VEVO for visa holders), not as a nationality field. Confidence: high.
- **Gender is `none`, not `eeo`.** Some employers (banks, big-4, government) include a voluntary diversity section (gender, Aboriginal and/or Torres Strait Islander identity, disability, cultural background) with "Prefer not to say". No law requires it at application stage; WGEA reporting uses payroll data. We took the conservative option and do not ask.

## Legal
- **Privacy.** The Privacy Act 1988 (Cth) and the 13 Australian Privacy Principles. The Privacy and Other Legislation Amendment Act 2024 added two things:
  - a statutory tort for serious invasions of privacy (in force from 10 June 2025);
  - transparency duties for automated decisions that significantly affect individuals. These require privacy-policy disclosure from 10 Dec 2026, so Uptal's privacy policy should describe its automated matching and auto-apply before that date (**VERIFY** with counsel).

  Australian law gives rights of access and correction, not a GDPR-style right to erasure. "Download or delete any time" is a product promise, so keep it true. Confidence: high.
- **Renewal.**
  - **No statutory 14-day cooling-off.** Australia has none for online subscriptions; cooling-off applies to unsolicited consumer agreements.
  - **What does apply.** ACL consumer guarantees cannot be excluded. Unfair contract terms have carried penalties since 9 Nov 2023.
  - **Pending ban on subscription traps.** The government has committed to an economy-wide ban on unfair trading practices, including subscription traps that make cancelling hard and missing renewal notices. As far as we know it had not taken effect by mid-2026 (**VERIFY**).
  - **The copy.** It follows ACCC best practice: same price, cancel online any time, an email before a 4- or 12-month plan renews (the same promise as the US pack), and the ACL rights line.
  - Confidence: medium on the status of the unfair-trading-practices law.

## Salary (`sal.f = 0.4167`, per year)
- **Benchmarks for a Sydney Senior Financial Analyst / FP&A analyst with about 8 years and a CPA.** All are base salary unless stated. Australian guides normally quote base excluding super.
  - Robert Half 2026, Senior Financial Analyst, Sydney: about A$136,250-163,500, with a 50th percentile of A$141,700. This comes from a search-result summary; the page itself was blocked. https://www.roberthalf.com/au/en/job-details/senior-financial-analyst/sydney
  - Morgan McKinley 2026, Sydney:
    - Senior FP&A Analyst: average A$130k (A$120-140k). https://www.morganmckinley.com/au/salary-guide/data/senior-fp-a-analyst/sydney
    - Senior Financial Analyst: average A$130k. https://www.morganmckinley.com/au/salary-guide/data/senior-financial-analyst/sydney
    - FP&A Analyst: A$100k / A$115k / A$130k. https://www.morganmckinley.com/au/2026-salary-guide/data/fp-a-analyst/sydney
  - Employment Hero 2026: financial analysts nationally median about A$120k, up to about A$149k for senior staff; its Sydney figure (A$107k) covers all levels. https://employmenthero.com/career-advice/financial-analyst/salary/
  - We did not find a current Hays figure.
- **Chosen value.** A current base of A$130,000 a year (A$10,833 a month), the Morgan McKinley senior average and a little below Robert Half. f = 10,833 / 26,000 = 0.4167, so the engine gives 26,000 SAR → A$130k a year and Noura's 34,000 SAR expectation → A$170k a year. That is just above the Robert Half top figure and at the entry to FP&A-manager pay, which is plausible for a CPA-qualified analyst moving up. Super (12% since 1 July 2025) sits on top, as Australian ads usually say "$X + super". Confidence: medium. Guides vary by about ±A$10k.

## Other choices
- **Cities.** Ordered by finance and FP&A job volume (our own judgement from SEEK accounting-category volumes, not re-checked): Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra (heavy on government finance), Gold Coast, Newcastle. The Sydney metro note names Norwest because Woolworths' head office is at Bella Vista.
- **Employers.** All 24 are real, and the list covers the required sectors:
  - banks: the big four (CBA, Westpac, NAB, ANZ) plus Macquarie
  - energy national champion: Woodside
  - mining: BHP and Fortescue
  - telecoms: Telstra (#1) and Optus (#2, owned by Singtel; TPG is #3)
  - sovereign fund: Future Fund
  - big-4: Deloitte
  - FMCG: Treasury Wine Estates
  - retail: Woolworths Group and Wesfarmers
  - airline: Qantas
  - hospital group: Ramsay Health Care
  - insurer: Suncorp (insurance-only since it sold Suncorp Bank to ANZ in 2024)
  - tech scale-up: Canva
  - fintech: Zip Co
  - e-commerce: Kogan.com. We did not use Menulog for food delivery, because we understand Just Eat Takeaway closed it in Australia in late 2025 (**VERIFY**), and DoorDash and Uber Eats are not Australian-headquartered.
  - real estate: Lendlease
  - exchange: ASX
  - government: Reserve Bank of Australia

  Islamic finance is a small niche in Australia and not a relevant FP&A employer, so there is no Islamic bank. Sector keys follow the majority spelling used across the existing packs. Logo colours are approximate brand colours, not official hex values.
- **Notice period: 28 days.** The contract usually sets 4 weeks for professional and analyst roles, and 4-8 weeks for managers. The NES minimum an employer must give is 1-4 weeks depending on service, plus 1 week if the employee is over 45 with 2+ years of service. Australian contracts state notice in weeks, so we used 4 weeks (28 days) rather than 30.
- **Job boards.** SEEK is the dominant board, with LinkedIn, Indeed and Jora (owned by SEEK) after it. eFinancialCareers is the finance specialist. APSJobs is the federal public service board; we left it out because it is citizen-only. `govPlatforms` is empty: myGov, VEVO and Workforce Australia exist but are not part of a typical finance job search.
- **Certifications and universities.** CPA Australia and CA ANZ are the two local accounting bodies; CPA is the more common one in FP&A and industry. CFA and CIMA (CGMA) are also used. Universities: UNSW Sydney (Business School, Bachelor of Commerce with Accounting and Finance majors), University of Sydney and University of Melbourne.
- **Persona.**
  - James Nguyen, male, Australian, Sydney, as in the roster.
  - His phone number, 0491 570 156, is in ACMA's range reserved for fiction and drama, so it is not a real number. **VERIFY** against ACMA's current list.
  - His employer, "Southerly Reach Group" with its subsidiary "Southerly Reach Logistics", is meant to be fictional. We could not run a web search to check for a real company with that name (**VERIFY**).
  - His bio mentions AASB, the Australian standards that match IFRS, and the July-June financial year, which shapes FP&A work in Australia.
- **People.** Ten common Australian names with Anglo, Irish, Greek, Italian, Chinese, Vietnamese and Indian backgrounds, reflecting Sydney and Melbourne.

## Fact-check pass (2026-10-12)
- No live checking was possible in this pass either. The shared WebSearch budget was already used up, and the proxy refused WebFetch and curl to docs.stripe.com. Every claim was re-read against working knowledge to mid-2026 and against the other packs.
- **Nothing material was refuted.** These points agree with what we know:
  - GST is 10% and prices are shown GST-inclusive (ACL single-price rule).
  - Visa subclasses: 444 Special Category, 189/190/186/100/801, 485, 820/309, Student 500 at 48 h a fortnight, 417/462 at 6 months per employer, and 482 Skills in Demand, which replaced the TSS on 7 Dec 2024.
  - The 1 Jul 2025 thresholds: CSIT about A$76,515 and SIT about A$141,210.
  - Super guarantee is 12%.
  - APS citizenship rule (Public Service Act s22(8)).
  - Privacy amendments: statutory tort from 10 Jun 2025; automated-decision transparency duties from 10 Dec 2026.
  - Unfair contract terms penalties since 9 Nov 2023.
  - 0491 570 156 is in ACMA's fiction range.
  - The 24 employers are real, use current names (Fortescue, Woodside Energy) and have the headquarters stated.
  - The Menulog closure (late Nov 2025) also matches our knowledge.
  - f = 130,000 / 12 / 26,000 = 0.4167 is arithmetically right.
- **Changed in the JSON:**
  - The Arabic card sub-line said "(ائتمان أو خصم مباشر)". "خصم مباشر" means direct debit (BECS), not a debit card, so it now reads "(ائتمان أو خصم)", as in the CH and DE packs.
  - Joondalup in Arabic is now "جوندالوب" (was "جوندالب").
  - In the English sub-line under "Australian or New Zealand citizen", the two clauses are now joined with a semicolon, as in the French.
- **Still open:**
  - Whether Afterpay can be used at all for a digital subscription merchant through the PSP. If it cannot, set `bnpl: []`, which is the spec's default for "no subscription-capable BNPL". An Afterpay payer also has no card on file, so the checkout must collect a card or PayPal before the "renews automatically" promise holds.
  - eftpos card-not-present support at our PSP, and whether a non-Australian merchant entity can get it.
  - The RBA surcharging decision.
  - The status of the unfair-trading-practices (subscription-trap) law.
  - New Zealand citizens are auto-answered, but they are also not eligible for most APS roles. The engine should apply the citizen-only skip to NZ users too, not only to people who see the rights card.
