# PL market pack: sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up, and the network policy here blocks direct WebFetch/curl to official hosts (gov.pl, docs.stripe.com, blik.com and docs.adyen.com all returned "connect rejected"). Every fact below comes from prior knowledge (training data to mid-2026) and is not re-verified. Items marked **[verify]** should be checked before launch. Where I was unsure, I chose the conservative option.

## Payments
- **BLIK first.** BLIK (run by Polski Standard Płatności, owned by the largest Polish banks) is the most-used online payment method in Poland. Gemius/PIE "E-commerce w Polsce" reports put it well ahead of pay-by-link and cards, and BLIK processed billions of transactions a year by 2024-2025. The spec says to put a dominant local method before cards, so BLIK leads. The user enters a 6-digit code from their bank app and confirms there.
- **Renewals [verify].** A standard BLIK code is single-use. BLIK has launched recurring payments ("płatności cykliczne", approved once in the bank app) and alias-based "BLIK without a code", offered through Polish PSPs such as PayU, Przelewy24, Autopay and Tpay. I could not confirm which of our PSPs (Stripe/Adyen) support BLIK recurring as of Oct 2026, so the sub-label says nothing about renewals. If the PSP cannot do BLIK recurring, BLIK should be used for prepaid 4- and 12-month totals, and renewals must ask for a card or a fresh BLIK confirmation.
- **Card second.** Visa and Mastercard (mostly debit) are universal. Amex is rare among Polish issuers but is accepted by the main PSPs, so it is listed for expats.
- **Online bank transfer (Przelewy24) third.** "Szybki przelew" (pay-by-link) is the #2 or #3 online method in Polish surveys. Przelewy24 is one of the largest providers, alongside PayU, Tpay and Autopay. It is single-payment, so it suits prepaid totals only. **[verify]** which provider our PSP routes to; change the brand name in the sub-label if it is PayU.
- **PayPal last.** It is accepted, but its share in Poland is small.
- **Wallets: Apple Pay and Google Pay.** Both are widely supported by Polish banks and very common. Samsung Pay/Wallet support for Polish cards is unclear, so samsung is left out (conservative).
- **localCardBrand: null.** Poland has no domestic card scheme. BLIK is a mobile/bank payment system, not a card brand, so it goes in `methods`.
- **BNPL: [] (conservative).** The common Polish BNPL options (PayPo, BLIK Płacę Później, Klarna where offered) are pay-later or instalments for one-off purchases, not subscription-capable instalments. PayPo is the market leader and could be added later for prepaid totals **[verify]**. EU CCD2 brings BNPL under consumer-credit rules from 20 Nov 2026.

## Tax
- Polish standard VAT is **23%**. This "temporary" rate has been in force since 2011, and its return to 22% is tied to public-debt conditions that have not been met. B2C electronically supplied services to Polish consumers are taxed at 23%. Consumer prices are shown gross ("z VAT"), so `incl: true`. **[verify]** that the rate is still 23% in 2026.

## Work rights
- **No permit needed (autoFor):** Polish citizens, EU/EEA citizens (EU27 + IS, LI, NO), Swiss citizens and their family members have free access to the Polish labour market. The list matches the other EU packs.
- **Residence card with free access:** under the Act on Foreigners, a residence card (karta pobytu) carries the annotation "dostęp do rynku pracy" when the holder may work without a permit. Typical cases are permanent residence (pobyt stały), EU long-term resident, Karta Polaka holders, spouses of Polish citizens with a temporary residence permit, refugee status and subsidiary protection.
- **Ukrainian citizens [verify]:** under the 2022 special act (specustawa), Ukrainians with UKR status (PESEL UKR) could work without a permit if the employer notified the labour office online (praca.gov.pl) within 14 days. A 2025 amendment began phasing the special act out and introduced the **CUKR** residence card (a 3-year temporary residence permit for long-term UKR-status holders), with EU temporary protection extended to 4 Mar 2027. I could not confirm the 2026 details, such as whether notification still applies and the end date of UKR status. That is why the sub-label says the employer "may need to" notify, and the option names both statuses.
- **Students and graduates:** full-time students in Poland, and graduates of full-time studies at Polish universities, are exempt from work permits. This was art. 87 of the 2004 Employment Promotion Act, and the exemption carried into the 2025 rules. **[verify]** the exact article under the 2025 Act.
- **Temporary residence and work permit (single permit) / EU Blue Card:** both are tied to the employer and the role. Changing employer usually means changing the permit or getting a new one. Under the recast Blue Card Directive, after 12 months a Blue Card holder can change employer by notifying the voivode. "Usually" in the sub-label covers this.
- **Sponsorship:** the **Act of 20 Mar 2025 on the conditions for entrusting work to foreigners** (in force 1 Jun 2025) moved work-permit applications fully online (praca.gov.pl) and dropped the labour-market test. It also lets the government list occupations for which permits may be refused. The employer applies for the permit, then the candidate gets a national D visa or a residence permit. Poland has no public register of sponsors, unlike the NL IND register, so the matching rule skips jobs that require an existing right to work or exclude sponsorship.
- The simplified "oświadczenie" route (for citizens of Armenia, Belarus, Georgia, Moldova and Ukraine) is also employer-filed, so it is folded into "I need visa sponsorship".
- Seven options, the spec maximum, with "needs sponsorship" last.

## Nationalisation
- **null.** Poland has no nationalisation or quota scheme. The 2025 occupation list for refusing permits is an immigration-policy tool, not a quota on foreign staff.

## Sensitive fields
- **photo: optional.** Photos are still very common on Polish CVs, but not required. A photo is outside the data an employer may demand (Kodeks pracy art. 22¹), so it is processed on consent (art. 22¹a, added by the May 2019 RODO-alignment amendments).
- **dob: none (conservative).** Art. 22¹ §1 does allow employers to ask candidates for date of birth, along with name, contact details, education, qualifications and work history. However, Pracuj.pl "Aplikuj" and common ATS forms (eRecruiter, Workday, SuccessFactors) normally ask only for name, contact details, the CV and consents. Polish CV guides now say date of birth is unnecessary, and art. 18³a bans age discrimination. If the product later needs DOB for a specific form, it must be optional.
- **gender / nationality / marital: none.** These are not normal fields on Polish applications. Art. 18³a covers sex, age, nationality and other grounds. Right to work is asked instead of nationality.
- **RODO clause:** many Polish ads still ask candidates to add a consent clause ("Wyrażam zgodę na przetwarzanie moich danych osobowych…") to the CV. Since 2019 the clause is legally needed only for future recruitments or for extra data, but it is the norm, so Polish CVs get the standard clause. This is a CV-generation requirement for the PL pack.

## Legal
- **Privacy:** GDPR, known in Polish as RODO, plus the Polish Personal Data Protection Act of 10 May 2018 (ustawa o ochronie danych osobowych). The regulator is the President of the Personal Data Protection Office (UODO).
- **Renewal:** the 14-day withdrawal right comes from the Consumer Rights Act of 30 May 2014 (ustawa o prawach konsumenta), which implements the EU CRD. Poland has no Dutch-style law limiting tacit renewal of fixed terms. However, UOKiK (the competition and consumer authority) has taken action against hard-to-cancel subscriptions, so the text promises easy cancellation and a reminder email before 4- and 12-month renewals. The EU online "withdrawal function" (Directive 2023/2673) has applied since 19 Jun 2026. **[verify]** Polish transposition.

## Salary (sal.f = 0.615, per month)
- Target: Senior Financial Analyst / FP&A, ~8 years, Warsaw, umowa o pracę, base pay excluding bonus.
- Prior-knowledge benchmarks (2025 salary guides, not re-verified):
  - Hays Poland and Michael Page Poland: senior financial / FP&A analyst in Warsaw about PLN 12-18k gross a month, FP&A manager about PLN 18-28k.
  - Robert Walters Poland: similar bands.
  - Kraków and Wrocław business-services centres: about 5-15% lower than Warsaw.
  - Polish nominal wages grew about 7-10% a year in 2024-2025.
- Chosen: **~PLN 16,000 gross a month** (~PLN 192k a year). 26,000 × 0.615 = PLN 15,990. Noura's expected 34,000 SAR maps to ~PLN 20,900, the entry FP&A-manager band, which is consistent.
- per = month because Polish job ads, Pracuj.pl salary ranges and conversations are all "brutto/mies." (B2B as "netto + VAT"). Confidence: medium-low until checked against a 2026 guide.

## Other choices
- **Cities:** Warsaw first. Kraków and Wrocław follow as the largest business-services (SSC/GBS) hubs, according to ABSL reports from prior knowledge. Then Tricity, Poznań, Katowice (GZM) and Łódź. This is a judgement call. Gdynia/Sopot fold into Gdańsk, and Dąbrowa Górnicza/Gliwice into Katowice.
- **Employers:** the checklist is met as follows:
  - energy/resources: ORLEN (registered in Płock, with large Warsaw corporate offices) and PGE
  - largest banks: PKO BP, Pekao and Santander Bank Polska, plus UBS as a business-services employer in Wrocław/Kraków; no Islamic bank (not relevant)
  - telecoms: Orange Polska (incumbent, biggest by revenue) and Play (biggest by mobile subscribers)
  - sovereign/public investment: PFR
  - government: NBP
  - Big 4: PwC
  - FMCG: Procter & Gamble (Polish HQ Warsaw)
  - retail: Żabka (Poznań) and LPP (Gdańsk)
  - airline: LOT
  - hospital group: LUX MED (Bupa)
  - insurer: PZU
  - tech scale-up: Docplanner
  - fintech: BLIK / PSP
  - e-commerce: Allegro (Poznań); logistics: InPost (Kraków)
  - real estate: Dom Development
  - exchange: GPW
  - industrial: ArcelorMittal Poland (Dąbrowa Górnicza, GZM)
- **KGHM left out:** KGHM (copper, HQ Lubin) is the national resources champion, but Lubin is not one of the pack cities, and every employer's `city` must match one. Revisit if Lubin/Legnica is added.
- Logo colours are approximate brand colours.
- **Boards:** Pracuj.pl is the dominant Polish job board for white-collar and finance roles. LinkedIn is essential for multinationals and SSCs. OLX Praca and Praca.pl are the next generalist boards. Indeed (pl.indeed.com) aggregates listings. GoldenLine was left out because I believe it wound down **[verify]**. Just Join IT and No Fluff Jobs are tech-only.
- **lang2: Polish.** Required at most domestic employers. English is enough at many SSCs.
- **Certs:** ACCA is very widespread in Polish finance and SSCs. CIMA is popular in FP&A and controlling. CFA is used in banking and investment. Biegły rewident is the local statutory-auditor title (PANA/KIBR).
- **Unis:** SGH Warsaw School of Economics (Finanse i Rachunkowość), Kozminski University (Warsaw) and Krakow University of Economics (UEK).
- **Persona:** Katarzyna Nowak, f, PL, Warsaw (roster). Employer "Powiśle Group" is fictional, named after a Warsaw district. I could not check for collisions with small real firms. Degree: SGH MSc Finance and Accounting. Cert: ACCA.
- **Notice:** Kodeks pracy art. 36 sets notice on indefinite contracts by tenure with the current employer: 2 weeks (<6 months), 1 month (6 months-3 years), 3 months (3+ years). An 8-year professional typically has 3 months, so noticeDays = 90.
- **Pay transparency:** the Labour Code amendment of 4 Jun 2025 (in force 24 Dec 2025, partly implementing EU Directive 2023/970) requires employers to give candidates the starting pay or range before the interview, bans questions about pay history, and requires gender-neutral job titles and ads. **[verify]** the exact wording.
- **Payday:** Kodeks pracy art. 85 requires pay at least monthly, no later than the first 10 days of the following month.
- **Phone:** Polish mobile numbers are +48 followed by 9 digits, grouped 3-3-3.
