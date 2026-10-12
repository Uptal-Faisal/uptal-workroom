# SE market pack: sources and reasoning

Written 2026-10-12. **I could not do live research for this run.** The shared web-search budget was used up before my first query, and WebFetch could not resolve any host I tried (migrationsverket.se, getswish.se, verksamt.se, wikipedia.org). Every fact below comes from prior knowledge (to mid-2026). Each one has a confidence level, and the ones to re-check are tagged **VERIFY**. Where I was unsure, I chose the conservative option. The "Re-check" list at the end gives the official pages to confirm against.

## Payments
- **Order: card, Swish, Klarna, PayPal.** (Medium confidence.)
  - Swedish online checkout runs on three things: cards (Visa/Mastercard debit, which work online), Swish, and Klarna (invoice and part-payment).
  - Card is listed first. My recollection of PostNord / Svensk Handel *E-barometern* and the Riksbank payments reports is that card is still the most common online method, with Swish and invoice close behind. I am not sure whether Swish has overtaken card online. If it has, Swish could go first. **VERIFY** against the latest E-barometern.
- **Swish.** (High confidence that it is the standard local method; low confidence on recurring.)
  - Swish is the bank-owned mobile payment system, used by more than 8 million people. Every payment is approved in the Swish app with Mobile BankID, so the sub-label only says that.
  - Swish for e-commerce is offered by Swedish banks and by PSPs such as Adyen, and Stripe added it more recently.
  - **VERIFY: recurring.** I am not sure whether Swish now offers a subscription or recurring product that our PSP supports. If it does not, a 4- or 12-month plan paid with Swish needs a new Swish approval at renewal, or a fall-back to card. The current copy makes no promise about renewals.
- **Klarna as a method, not BNPL; `bnpl: []`.** (Medium confidence.)
  - Klarna is Swedish (HQ Stockholm). In Sweden its core checkout products are *Betala nu* (pay now) and the 30-day invoice (*faktura*, "pay within 30 days"), plus interest-bearing part payment (*delbetalning*).
  - I could not confirm that Klarna's interest-free "Pay in 3" is offered to Swedish consumers. The `bnpl` entry would render "3 interest-free instalments", so I left `bnpl` empty and listed Klarna under `methods` as "Pay now, or within 30 days by invoice".
  - Klarna supports tokenised recurring charges for subscriptions in the Nordics, but **VERIFY** this with our PSP.
  - **Legal caution.** Since 1 July 2020, Swedish consumer-credit rules have said a credit option (including invoice and pay-later) must not be pre-selected or presented as the first payment option in an online checkout. I believe this rule became permanent after the 2020-21 temporary act, but **VERIFY**. Either way, never put Klarna first or pre-select it.
  - EU CCD2 (Directive 2023/2225) applies from 20 Nov 2026 and brings BNPL fully under consumer-credit rules, so Klarna copy and eligibility may change after that date.
- **PayPal last.** It is available and used by some Swedes, mostly for international merchants, but it is a minority method. It is kept for consistency with the other EU packs.
- **Wallets: Apple Pay and Google Pay.** (High confidence.)
  - Apple Pay has been in Sweden since 2016 and Google Pay since about 2018. Both are supported by the major banks.
  - Samsung Pay launched in Sweden around 2017, but it is an in-store NFC wallet and not a standard web-checkout button, so `samsung` is left out. This matches the sibling packs.
- **localCardBrand: null.** (High confidence.) Sweden has no domestic card scheme. BankAxept is Norwegian. Autogiro (Bankgirot direct debit) is used for some Swedish subscriptions, but it is a renewal rail, not a checkout option, so it is not listed.

## Tax
- Swedish standard VAT (moms) is **25%**. This is the rate for B2C electronically supplied services to Swedish consumers. Consumer prices are shown including VAT ("inkl. moms"), so `incl: true`. (High confidence.)

## Work rights
- **No permit needed (autoFor).** (High confidence.) Swedish, EU/EEA (EU27 + IS, LI, NO) and Swiss citizens have free access to the Swedish labour market, and EU citizens have not needed to register with Migrationsverket since 2014. Nordic citizens are covered by the EU/EEA list.
- **Residence permit, free to work.** (Medium-high confidence.) This option covers:
  - permanent residence (PUT)
  - EU long-term resident status
  - family-member permits, which normally include a work permit
  - Britons with Withdrawal-Agreement residence status (*uppehållsstatus*)
- **Permit to look for work after studies or research.** (Medium confidence.)
  - Graduates of Swedish higher education and researchers can get a residence permit to look for work. It lasts up to 12 months under the 2022 rules, as I recall.
  - Holders may work during that time and can apply for a work permit from inside Sweden.
  - **VERIFY** the duration and the right to work on migrationsverket.se. A separate 2022 permit for highly qualified people to look for work does *not*, I believe, allow work, so it is not listed.
- **Work permit / EU Blue Card.** (Medium confidence.)
  - For the first 2 years, a Swedish work permit is tied to one employer and occupation, and after that to the occupation. Changing employer in the first 2 years needs a new permit.
  - Under the Blue Card rules from 1 June 2023, holders can change employer after 12 months.
  - The sub-label says "usually", because the details differ by case.
- **Sponsorship / matching rule.** (Medium confidence.) Sweden has no public register of sponsors like the Dutch IND list. The employer starts the application in Migrationsverket's e-service.
  - Before the offer, the job must be advertised in Sweden and the EU/EEA, for example on Platsbanken/EURES, for at least 10 days.
  - Pay, insurance and terms must be at least at collective-agreement or industry-norm level.
  - Since 1 Nov 2023 there is a salary floor of **80% of the median wage**. It was about SEK 28,480 a month in 2024, and it is re-indexed each year when SCB publishes the median.
  - An inquiry proposed raising the floor to 100% of the median. **VERIFY** the 2026 amount and whether that change went ahead.
  - The persona-level salary (SEK 56k) is far above any of these floors.
  - Because there is no sponsor register to filter on, the rule shown only skips jobs that require an existing right to work in Sweden or the EU.
- Option order: citizen → EU/EEA/CH → free-to-work permit → post-study search permit → work permit / Blue Card → needs sponsorship (last, per spec).

## Nationalisation
- **null.** (High confidence.) Sweden has no nationality quota or reserved-profession scheme for private-sector finance roles. Some public-sector and security-classified roles need Swedish citizenship or security vetting (*säkerhetsprövning*), but that is a vetting rule, not nationalisation.

## Sensitive fields
- **photo: optional.** (Medium confidence.) Many Swedish CVs still include a photo, but Swedish CV advice (Arbetsförmedlingen and the unions) says it is not needed, and some employers use anonymised recruitment. We allow a photo but never ask for one.
- **gender / dob / nationality / marital: none.** (High confidence.)
  - The Discrimination Act (Diskrimineringslagen, 2008:567) applies to recruitment and has seven grounds: sex, transgender identity or expression, ethnicity, religion or other belief, disability, sexual orientation and age. Asking about these is risky and not normal.
  - Date of birth and marital status used to appear on Swedish CVs and are now considered outdated.
  - The **personnummer** should never be on a CV. Dataskyddslagen (2018:218) ch. 3 s. 10 allows it only when clearly justified.
  - Some public-sector ATS forms (Varbi) ask for extra data, but that is not the norm, so we stay with "none".

## Legal
- **Privacy:** GDPR plus Dataskyddslagen (2018:218). The regulator is IMY (Integritetsskyddsmyndigheten), renamed from Datainspektionen in 2021. (High confidence.)
- **Renewal:** (Medium confidence.)
  - The 14-day right of withdrawal (*ångerrätt*) comes from the Distance Contracts Act (lag 2005:59 om distansavtal och avtal utanför affärslokaler). For a service started during the withdrawal period at the consumer's request, the consumer pays for what has already been provided.
  - Sweden has no general statutory cap on tacit renewal like the Dutch "Wet Van Dam". Konsumentverket expects clear advance information and easy cancellation, and unfair terms are policed under the Unfair Contract Terms Act (1994:1512).
  - The EU withdrawal-function rule (Directive 2023/2673) applies from 19 Jun 2026 and needs an online "withdraw from contract here" function. **VERIFY** the Swedish transposing act.
  - The copy follows the IT and BE packs.

## Salary (sal.f = 2.154, per month)
- Target: Senior Financial Analyst / FP&A, ~8 years, Stockholm, base salary.
- Swedish pay is negotiated and quoted as gross *månadslön*, so per = month.
- Recalled benchmarks, **not re-verified**:
  - Akavia (ex-Civilekonomerna) and SCB salary statistics put controllers and financial analysts with 5-10 years in Stockholm at roughly SEK 50-65k a month.
  - Recruiter guides (Hays, Michael Page, Robert Walters, Poolia) put senior financial / FP&A analysts at about SEK 52-62k and FP&A managers at about SEK 65-85k.
  - Cross-check: SEK 56k is about EUR 5.0-5.1k, a little below the NL pack (EUR 5.6k) and level with BE (EUR 5.0k). This fits Sweden's flatter pay structure.
- Chosen: **SEK 56,000 a month**. 26,000 × 2.154 = SEK 56,000. Noura's 34,000 SAR expectation maps to about SEK 73,200, the FP&A-manager band.
- Confidence: medium-low. **VERIFY** against the Akavia salary tool or the SCB *Lönestatistik* for SSYK 2411/2413, and a 2026 recruiter guide.

## Notice (noticeDays = 90)
- LAS (1982:80) s. 11 gives the employee at least 1 month's notice. The employer's notice is 1-6 months, depending on tenure. (High confidence.)
- White-collar collective agreements raise the employee's notice with tenure, up to about 3 months. One example is the Teknikföretagen–Unionen/Akavia agreement, as I recall. Senior finance contracts commonly set 3 months, and Swedish recruiters plan start dates around 3 months out. (Medium confidence.)
- For an employed 8-year analyst, 90 days is the realistic and conservative value.

## Other choices
- **Cities:** ordered by an estimate of finance/FP&A job density. This is a judgement call, not a measured ranking.
  - Greater Stockholm comes first by a wide margin, then Gothenburg, then Malmö with Lund.
  - Uppsala, Västerås (ABB, Mälarenergi), Linköping–Norrköping and Örebro follow.
  - Solna, Sundbyberg, Kista and Södertälje are folded into the Stockholm metro note, and Lund into Malmö.
  - **Arabic city names:** these follow the forms used by Arabic speakers in Sweden and Swedish Arabic-language media, which go by the Swedish pronunciation: يوتيبوري، فيستروس، لينشوبينغ، أوربرو، سودرتاليه. Pan-Arab media write Gothenburg as غوتنبرغ. I chose the local form, as the spec asks.
  - **French names:** standard French forms (Göteborg, and Øresund for the strait).
- **Employers:** the full checklist mapping is in `sectorsCovered`. Notes:
  - Most HQs sit in Greater Stockholm: Vattenfall, Telia and SAS in Solna; Swedbank in Sundbyberg; Ericsson and Tele2 in Kista.
  - AP2 and Volvo Group are in Gothenburg.
  - ABB's Swedish HQ is in Västerås.
  - Tetra Pak's group HQ is in Pully, Switzerland, but its main Swedish base and R&D are in Lund, so its city is `malmo`.
  - Capio is owned by Ramsay Santé.
  - foodora is owned by Delivery Hero.
  - Klarna listed in New York in 2025 but is still headquartered in Stockholm.
  - No Islamic bank (not relevant) and no giga-project developer (none exists). Skanska fills the real-estate / development slot.
  - Strong alternates I left out: Nordea (HQ Helsinki), IKEA (Ingka and Inter IKEA HQs are in the Netherlands), LKAB (Luleå), AstraZeneca (Gothenburg/Södertälje), Saab (Linköping), Scania, Volvo Cars, Atlas Copco, Sandvik, Investor AB, ICA Gruppen, Länsförsäkringar, Skandia, Karolinska University Hospital.
  - Logo colours are approximate brand colours.
- **Boards:** LinkedIn; Platsbanken (Arbetsförmedlingen, the largest volume of Swedish ads, also feeding EURES); Indeed; and eFinancialCareers for banking and finance in Stockholm.
  - Staffing firms (Poolia, Academic Work, Wise Professionals, Michael Page) are big finance sources but are not boards.
  - Older boards (Monster.se, Blocket Jobb) have shut down or shrunk, as I recall, so they are left out. **VERIFY** whether a fifth board belongs here.
- **lang2: Swedish.** Many domestic employers require it. Stockholm multinationals often work in English.
- **Certs:**
  - CFA: used in banking and asset management, and in FP&A at listed companies.
  - Auktoriserad revisor: authorised by Revisorsinspektionen. It is the chartered-auditor title, and many controllers come from Big 4 audit.
  - Auktoriserad redovisningskonsult: the accounting credential from SRF konsulterna.
  - ACCA: common among international hires.
  - Swedish ads mostly ask for a *civilekonom* degree rather than a certificate.
- **Unis:** Stockholm School of Economics (Handelshögskolan i Stockholm), the School of Business, Economics and Law at the University of Gothenburg, and Lund University School of Economics and Management (LUSEM).
- **Persona:** Erik Lindqvist, m, SE, Stockholm, from the roster.
  - Degree: Civilekonom (MSc Business and Economics) from SSE.
  - Cert: CFA.
  - Bio: IFRS for the group and K3 (BFNAR 2012:1, Swedish GAAP) for legal entities is the normal Swedish setup.
  - The employer "Strömkaj Group" is fictional; Strömkajen is a quay in central Stockholm. I could not search to confirm that no real company has this name. **VERIFY** before launch.
- **Phone:** PTS (the Swedish Post and Telecom Authority) reserves 070-174 06 05 to 070-174 06 99 for use in fiction and drama, so the example is +46 70 174 06 50. (Medium-high confidence.) **VERIFY** on pts.se.
- **People:** common Swedish first names and surnames, plus one name from a migrant background (Amir Hosseini), reflecting today's Swedish workforce.

## Re-check list (official pages)
- Migrationsverket, work permits: salary floor, employer tie, Blue Card, post-study permit. https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html
- Swish for business (e-commerce, recurring): https://www.getswish.se/foretag/
- Klarna Sweden payment options: https://www.klarna.com/se/
- Konsumentverket on credit as a checkout option, and the 14-day withdrawal right: https://www.konsumentverket.se/
- Skatteverket, VAT rates: https://www.skatteverket.se/
- IMY: https://www.imy.se/
- PTS fictional numbers: https://www.pts.se/
- Akavia salary statistics: https://akavia.se/ ; SCB Lönestatistik: https://www.scb.se/
