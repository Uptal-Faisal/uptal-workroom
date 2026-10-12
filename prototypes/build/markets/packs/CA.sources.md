# CA market pack: sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up, and direct fetches of official pages (ontario.ca, canada.ca, roberthalf.com, docs.stripe.com) failed: WebFetch could not resolve the hosts and the egress proxy refused curl with a 403. Every fact below comes from knowledge up to mid-2026. Each item gives a confidence level, and where we were unsure we took the conservative option. Items marked **VERIFY** should be checked against the named source before launch.

Currency (CAD) and price tier come from `base.json` and were left as they are.

## Payments
- **Cards first, then PayPal; Apple Pay and Google Pay as wallets.** (High confidence.) Canadian online checkout runs on credit cards (Visa, Mastercard, Amex) and, more and more, on co-badged **Visa Debit / Debit Mastercard** cards that the big banks now issue with Interac. These debit cards work online like credit cards, so the card `sub` names them, because many Canadians do not think of their debit card as a "card" that works online. Large subscription services in Canada (Netflix, Spotify, Microsoft) take cards and PayPal. Discover is accepted in Canada but rarely used, so it is not listed.
- **Interac is not set as `localCardBrand`.** (Medium-high confidence.) Interac is the domestic debit network, but a plain Interac debit card cannot be charged online for recurring payments. Interac Online (the bank-redirect product) has been wound down by most issuers, and Interac e-Transfer is a push payment with no recurring pull. The usual processors (Stripe and others) support Interac only in person. Showing an Interac badge at a subscription checkout would mislead, so it is `null`. If a processor with Interac recurring support is added later, revisit. **VERIFY** with the chosen PSP.
- **Samsung Wallet left out.** (Medium confidence.) Samsung Pay exists in Canada, but it is not a standard web-checkout wallet.
- **BNPL: none.** (Medium confidence; conservative.) Affirm (which bought PayBright), Klarna, Afterpay, Sezzle and PayPal Pay in 4 all operate in Canada, but for one-off retail purchases. We know of no subscription-capable BNPL that is common in Canada, which matches the US pack. Pre-authorized debit (PAD / ACSS) is used for utilities and gyms but not for app subscriptions, so it is also left out.

## Tax
- **Prices shown before tax, with "Plus applicable taxes".** (High confidence.) In Canada, consumer prices are normally quoted before sales tax, and tax is added at checkout, as in the US. So `incl: false`.
- **Rate 13% = Ontario HST** (5% GST + 8% provincial), for the Toronto persona. (High confidence.) Since 1 July 2021, non-resident vendors of digital services must register under the simplified GST/HST regime once taxable supplies to Canadian consumers pass CA$30,000 over 12 months. They then charge the rate of the customer's province: HST 13% in ON; 15% in NB, NL and PEI; 14% in NS (cut from 15% on 1 April 2025); GST 5% elsewhere. Some provinces add their own tax: QST 9.975% in Quebec (Revenu Québec has required non-resident digital vendors to collect it since 2019), BC PST 7% on software and digital services, Saskatchewan PST 6%, and Manitoba RST 7% on some online services. Tax at checkout must be calculated by the customer's province, not set to a flat 13%. **VERIFY** the provincial rates in CRA's GST/HST rates table.

## Work rights (`rights`)
- **Auto-answered: Canadian citizens only.** (High confidence.) No other citizenship gets automatic work rights in Canada. US citizens do not; CUSMA professionals still need a work permit.
- **Five options, the last one needing a new permit:**
  1. Canadian citizen.
  2. Permanent resident. This covers PR card holders and people with a confirmation of PR who have landed. It gives unrestricted work rights.
  3. Open work permit: PGWP (French: permis de travail postdiplôme, PTPD), spousal open work permits, IEC Working Holiday (French: Expérience internationale Canada, vacances-travail) and bridging open work permits. The holder can work for any employer until the permit expires.
  4. Employer-specific work permit: LMIA-based, CUSMA professional and intra-company transferee. A new employer generally needs a new permit, often with a new LMIA (French: EIMT).
  5. Needs a work permit: an employer usually needs a positive LMIA (high-wage stream for this salary) before the candidate can apply.
- **Context (medium confidence; VERIFY on IRCC):**
  - Spousal open work permits were narrowed from 21 January 2025, to spouses of some master's/PhD students and of workers in TEER 0/1 (and some TEER 2/3) jobs.
  - PGWP eligibility has had field-of-study and language rules since late 2024.
  - From 25 March 2025, Express Entry stopped awarding points for arranged employment (job offers), which takes away some of an employer's reason to support an LMIA.
  - Since 26 September 2024, LMIA processing for the low-wage stream has been paused in metro areas with unemployment of 6% or more (Toronto included). An 8-year finance role at about CA$100k is well above Ontario's median wage, so it falls under the high-wage stream, which is not paused.
- **Matching rule.** Canadian postings often say "Must be a Canadian citizen or permanent resident" or "We are unable to sponsor work permits". Holders of open and employer-specific permits are filtered out by the first kind of statement. Anyone who needs a new permit is filtered out by both kinds. The `rule` text covers both cases.

## Nationalisation
- **`null`.** (High confidence.) Canada has no nationality quota for private employers. Two related rules are not nationalisation, so they appear only in the notes:
  - **Federal public service:** the Public Service Employment Act gives preference to Canadian citizens in external appointments. This applies to departments; the Bank of Canada runs its own hiring.
  - **Quebec, Charter of the French Language (Bill 96):** employers in Quebec cannot require a language other than French unless the job truly needs it. This is why `lang2` is French.

## Sensitive fields
- **Photo: avoid.** (High confidence.) Canadian resumes do not carry photos, and human rights commissions advise employers not to ask for one before an offer.
- **Gender: `eeo`.** (Medium-high confidence.) Canada has no direct copy of the US EEO, but federally regulated employers (banks, telecoms, airlines, railways, Crown corporations) report under the Employment Equity Act, and federal contractors under the Federal Contractors Program. Their application forms invite **voluntary self-identification** as a woman, an Indigenous person, a person with a disability or a member of a visible minority (racialized). Big Canadian banks such as RBC, TD and BMO show this step in Workday, and it always has a "prefer not to answer" option. This works like the US EEO step, so we use `eeo` and default to declining.
- **DOB, nationality, marital: none.** (High confidence.) Age, marital and family status, place of origin and citizenship are protected grounds under the Canadian Human Rights Act and the provincial codes. The Ontario Human Rights Commission's guidance on application forms says not to ask for any of them. Employers instead ask whether the candidate is legally eligible to work in Canada, and about sponsorship. The SIN is collected only after hire.
- **Ontario job-posting rules from 1 January 2026.** (Medium-high confidence; VERIFY on ontario.ca, ESA guide, "Job postings".) These come from the Working for Workers Acts (Bill 149 and later) and O. Reg. 476/24, and apply to employers with 25 or more employees:
  - publicly advertised postings must show the expected pay or a pay range. A range can be no wider than CA$50,000, and roles paid over CA$200,000 are exempt;
  - postings must say whether AI is used to screen, assess or select applicants;
  - neither the posting nor its application form may require "Canadian experience";
  - postings must say whether there is an existing vacancy;
  - employers must tell interviewed applicants within 45 days whether a hiring decision has been made.
- **Other provinces.** BC's Pay Transparency Act (from 1 November 2023) requires ranges in postings and bans pay-history questions. PEI and Newfoundland and Labrador have similar rules. (Medium confidence on the exact dates.)

## Legal
- **Privacy.** PIPEDA covers private-sector personal data in most provinces. Quebec's Law 25 (in force in stages 2022–2024) covers Quebec residents. Alberta and BC have their own PIPA laws. The federal reform bill C-27 (the CPPA) died when Parliament was prorogued in January 2025. We know of no replacement in force, so PIPEDA is still the federal law. (Medium-high confidence; **VERIFY** whether a successor bill has passed.) The French acronym for PIPEDA is LPRPDE.
- **Renewal.** Consumer protection is provincial. Ontario's Consumer Protection Act, 2023 includes subscription rules, such as letting consumers cancel the same way they signed up, but we could not confirm its in-force date. Quebec's CPA has its own rules on contracts that renew. The renewal line is written to meet the strictest common reading: it states the automatic renewal and its price ("plus applicable taxes", to match the tax display), says cancellation is online at any time, and promises a reminder before 4- and 12-month plans renew. **VERIFY** the Ontario CPA 2023 commencement date and the Quebec renewal-notice rules with counsel.

## Salary
- **f = 0.3205.** This means a base of CA$100,000 a year (CA$8,333 a month), against Noura's 26,000 SAR a month. (Medium confidence; the live sources could not be reached.)
- **Pay ranges we relied on.** From Robert Half and Hays Canada guides and Glassdoor/Indeed Toronto data, as recalled, a Toronto senior financial analyst earns roughly CA$85k–115k. A senior FP&A analyst earns about the same, and an FP&A manager roughly CA$115k–140k. A CPA-qualified analyst with 8 years sits in the upper half of the senior-analyst range, so CA$100k is the conservative midpoint.
- **What the expected salary maps to.** Noura's 34,000 SAR expectation becomes about CA$131k, which is FP&A-manager pay and the same +31% step as in the other packs.
- **Format.** Canadian pay is quoted per year. **VERIFY** against the Robert Half 2026 Canada Salary Guide (Toronto, "Senior financial analyst" and "FP&A manager").

## Other choices
- **Cities.** Ordered by how many finance and FP&A jobs each has: Toronto (banks, insurers, pension funds, head offices) > Montreal (Bell, Air Canada, CN, National Bank, CDPQ) > Vancouver > Calgary (energy) > Ottawa (federal government, Shopify, Bank of Canada) > Edmonton > Kitchener-Waterloo (Sun Life and Manulife operations, tech) > Winnipeg (Canada Life, SkipTheDishes).
- **Employers.** These are all real and were large employers of finance staff as of mid-2026. Notes:
  - RBC's and BMO's registered head offices are in Montreal, but their operating headquarters are in Toronto.
  - Clio's head office is in Burnaby, inside Metro Vancouver.
  - Shopify's head office is listed as Ottawa (it describes itself as remote-first).
  - Barrick renamed itself Barrick Mining Corporation in 2025, so the short name "Barrick" is used.
  - We did not check whether these companies have since restructured or been acquired.
  - Logo colours are close to each brand's colours, not exact brand values.
- **Boards.** LinkedIn, Indeed, Glassdoor, Job Bank (the Government of Canada's board, also used for LMIA advertising) and eFinancialCareers. Two were left out: Workopolis, which Indeed bought and folded into its own site, and Monster, after the 2025 Chapter 11 filing of its parent.
- **Language (`lang2`).** French matters on applications in Quebec, for bilingual federal roles and at national employers, where French is often listed as "an asset". Applications at these employers often ask about English and French levels.
- **Certifications.** CPA (the CMA and CGA designations merged into CPA in 2014), CFA (very strong in Toronto's asset-management and pension sector) and FPAC (from AFP, used in FP&A). We left out the US CMA (IMA) because Canadians confuse it with the old Canadian CMA.
- **Universities.** University of Toronto, University of Waterloo (its School of Accounting and Finance offers the BAFM degree in the persona) and McGill.
- **Persona.** Arjun Mehta, male, Canadian, Toronto, as in the roster. The employer "Northmere Holdings" / "Northmere Logistics" is made up. The phone number uses the 555-01xx range that the North American numbering plan reserves for fiction.
- **Notice.** `noticeDays: 14`. Two weeks is the standard resignation notice. Most provinces set no statutory notice for employees who resign; it is a custom and a common-law expectation.
