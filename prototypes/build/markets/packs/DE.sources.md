# DE market pack: sources and reasoning

Written 2026-10-12. **Nothing in this pack was checked live.** The run's shared WebSearch budget was used up before this pack started, and the egress proxy blocked direct fetches of the official hosts I tried (make-it-in-germany.com, gesetze-im-internet.de, bamf.de, klarna.com, stepstone.de, wikipedia.org). Every fact below comes from prior knowledge of the published rules, studies and guides named here, current to about 2025 and in places mid-2026. Each section gives a confidence level. Where I was unsure I took the conservative option. **Re-verify the items marked VERIFY before launch.**

## Payments
- **PayPal first.** PayPal is the most-used online payment method in Germany. The EHI Retail Institute "Online-Payment" studies (2023-2025 editions) put PayPal and purchase on invoice (Rechnungskauf) at roughly 28-30% of top-shop online revenue each. Direct debit and cards come next at about 10-15% each, and Apple/Google Pay are growing. The spec says to put cards first unless a local method dominates, and PayPal dominates in Germany, so it leads. PayPal also supports vaulted billing agreements for renewals. Confidence: high on the ranking, medium on the exact shares.
- **Card second.** Since July 2023 German banks have replaced Maestro/V PAY co-badges with Debit Mastercard / Visa Debit on the girocard, so most current bank cards also work online. That is why the label says "credit or debit". Amex is accepted by the main PSPs but is a minority card. Confidence: high.
- **SEPA Direct Debit (Lastschrift) third.** This is the classic German way to pay subscriptions (telecoms, gyms, press, streaming), and Stripe, Adyen and Mollie all support SEPA DD mandates for recurring billing. Confidence: high.
- **Wallets: Apple Pay and Google Pay.** Both launched in Germany in 2018 and are supported by almost all banks, including Sparkassen and Volksbanken. Samsung Wallet payments have had very limited German bank support (the old "Samsung Pay Card" ran through Solaris), so samsung is left out (conservative). Confidence: high for apple/google, medium for leaving samsung out.
- **Wero not listed (VERIFY).** EPI's Wero went live for P2P in Germany in 2024 (Sparkassen, Volksbanken, Deutsche Bank, Postbank). It was rolling out to e-commerce from late 2025 as the successor to giropay/paydirekt, which closed at the end of 2024. I could not confirm, as of Oct 2026, how widely German merchants accept it or whether Wero recurring/subscription payments are live. Revisit in 2027 and add it as a method once it supports recurring payments.
- **localCardBrand: null.** girocard is the domestic debit scheme (about 100M cards), but it is built for in-store payments. Online use is limited to a few tokenised wallet cases and does not support recurring merchant-initiated payments. The online function on German debit cards is the Debit Mastercard / Visa Debit co-badge, so a girocard badge at checkout would mislead. Unlike CB (FR) or Bancontact (BE), it is not a checkout card brand for subscriptions.
- **BNPL: Klarna "Pay in 30 days" (invoice), installments = 1, deferDays = 30.** Buying on invoice is a core German habit, and Klarna's "Rechnung / in 30 Tagen bezahlen" is the dominant way to do it online. I could not confirm that Klarna's interest-free "Pay in 3" is offered in Germany (Klarna DE has long offered Pay now / Pay in 30 days / interest-bearing financing). PayPal's German BNPL is also "Später bezahlen" (30 days) plus interest-bearing Ratenzahlung, not Pay in 3. So the pack uses the product that certainly exists: 1 payment, deferred 30 days. **Engine note:** `installments: 1` plus the extra key `deferDays: 30` must not render as "Pay in 1". If the engine can't handle it, drop the entry rather than invent a Pay in 3. EU CCD2 brings BNPL under consumer-credit rules from 20 Nov 2026, so recheck eligibility and disclosure then. VERIFY.

## Tax
- Standard German VAT (Umsatzsteuer/MwSt.) is **19%** (the reduced 7% rate does not apply to digital services). B2C digital services to German consumers are taxed at 19% under the EU place-of-supply rules. Under the Preisangabenverordnung (PAngV), consumer prices must be shown including VAT, so `incl: true`. Confidence: high.

## Work rights
- **autoFor:** German citizens, EU27 citizens, EEA citizens (IS, LI, NO) and Swiss citizens have free movement (Freizügigkeitsgesetz/EU; EU-Swiss agreement) and need no work permit. The Croatian transition period ended in 2015. Confidence: high.
- **Option list** (citizen → EU/EEA/CH → permanent → free-to-work permit → Blue Card / skilled worker → Opportunity Card → needs sponsorship, last per spec):
  - **Settlement permit (Niederlassungserlaubnis) / EU long-term residence (Daueraufenthalt-EU):** unrestricted labour-market access. Confidence: high.
  - **"Erwerbstätigkeit erlaubt":** since the Skilled Immigration Act (1 Mar 2020), residence titles say on the card or supplementary sheet whether any employment is allowed. Family reunification and spouse permits generally allow any work. The post-study job-search permit (s. 20 AufenthG, up to 18 months after a German degree) also allows employment during the search, as I understand it. Confidence: medium. VERIFY the s. 20 wording.
  - **EU Blue Card / skilled worker permit (ss. 18a, 18b, 18g AufenthG):** both are tied to a job. Since 18 Nov 2023, a Blue Card holder changing employer during the first 12 months must notify the Ausländerbehörde, which can object. Holders of a s. 18a/18b permit need the authority to amend or approve the permit for a new employer. The sub-label says "tell or ask" to cover both cases. Confidence: medium-high.
  - **Opportunity Card (Chancenkarte, s. 20a AufenthG, since 1 Jun 2024):** up to 1 year of job search, part-time work up to 20 hours a week and trial work. A full-time skilled job needs a switch to a Blue Card or skilled worker permit. Confidence: medium-high.
  - **Needs sponsorship:** Germany has no sponsor-licence register like the UK or the Dutch IND. The candidate applies for a visa or permit using the employer's contract or offer, and the employer completes the "Erklärung zum Beschäftigungsverhältnis". Employers can buy the accelerated skilled-worker procedure (s. 81a AufenthG). The label stays "I need visa sponsorship" for cross-market consistency, and the sub explains the German process.
- **Blue Card thresholds 2026 (VERIFY):** these equal 50% / 45.3% of the statutory pension contribution ceiling (BBG RV). The 2025 thresholds were EUR 48,300 standard and EUR 43,759.80 for shortage occupations and new entrants (2025 BBG EUR 96,600). With the 2026 BBG of EUR 101,400, they become **EUR 50,700 standard** and **EUR 45,934.20 shortage/new-entrant**. Financial analysts are not on the shortage list, so the standard figure applies unless the person graduated within the last 3 years. The persona-level pay (~EUR 75k) clears it easily.
- **Matching rule:** most German ads still give no salary, and the Pay Transparency Directive will change that only gradually. So the copy says "roles likely to pay above" the threshold, plus skipping ads that say they can't support a visa. This is the conservative wording.

## Nationalisation
- **null.** Germany has no nationalisation or quota scheme for nationals. The only hiring quota is the 5% employment obligation for severely disabled people (SGB IX s. 154, employers with 20+ positions). That is an employer levy, not a nationality rule, and it doesn't change our copy. The Federal Employment Agency's priority check (Vorrangprüfung) was dropped for skilled workers with a recognised degree in 2020.

## Sensitive fields
- **photo: optional.** The traditional German Bewerbungsfoto is still common, perhaps half or more of CVs. The AGG (Allgemeines Gleichbehandlungsgesetz, 2006) means employers may not require one, and anonymised-application pilots (Antidiskriminierungsstelle des Bundes) and international firms discourage it. We allow a photo but never ask. Confidence: high.
- **gender: ask (as salutation only).** This is the one deliberate difference from NL, BE and ES. German ATS forms (SAP SuccessFactors, Softgarden, Personio, d.vinci, rexx and in-house portals at banks and DAX firms) routinely make Anrede (Frau / Herr / divers / keine Angabe) a required field. Since the 2018 Constitutional Court ruling and the 2019 PStG change, forms are expected to offer "divers". We ask it as a salutation that includes "divers" and "no salutation", and we only send it where a form requires it. Confidence: medium. I'm sure Anrede is very common; "required" is common but not universal. If product prefers privacy-first, switch to "none" and leave a required Anrede field for the user to fill.
- **dob / nationality / marital: none.** These used to appear in the Lebenslauf's "Persönliche Daten" block. Since the AGG they are optional and risky (age, ethnic origin), and current CV advice from the Bundesagentur für Arbeit, StepStone and others treats them as optional. Online forms rarely require them. Right to work replaces nationality. Confidence: high.
- **Pay history:** EU Pay Transparency Directive 2023/970 (transposition deadline 7 Jun 2026) bars employers from asking about current or past pay. VERIFY Germany's transposition status: a draft amendment of the Entgelttransparenzgesetz was in progress, and I could not confirm it passed. Expected salary (Gehaltsvorstellung) remains a normal question.

## Legal
- **Privacy:** GDPR, called DSGVO in German, plus the Bundesdatenschutzgesetz (BDSG 2018). Employee/applicant data falls under s. 26 BDSG, which was partly invalidated by the CJEU in C-34/21 (Mar 2023), with Art. 6/88 GDPR applying instead. That doesn't change the copy. Confidence: high.
- **Renewal:** the Gesetz für faire Verbraucherverträge applies to consumer contracts made from 1 Mar 2022. Under s. 309 no. 9 BGB, the initial term may be at most 2 years, and tacit renewal is allowed only into an indefinite contract that the consumer can cancel at any time with **at most one month's notice**. Since 1 Jul 2022, s. 312k BGB requires a **cancellation button** ("Verträge hier kündigen") reachable online, leading to a confirmation button ("jetzt kündigen"). The 14-day withdrawal right (ss. 312g, 355 BGB) applies. **Product impact (same as NL):** for German consumers, 4- and 12-month plans cannot auto-renew into another fixed 4- or 12-month term. After the first term they must continue on a cancel-anytime basis (monthly), and the site needs the s. 312k button. The EU withdrawal-function directive (2023/2673, applying from 19 Jun 2026) adds an online withdrawal button. VERIFY German transposition (expected in a new s. 356a BGB). Confidence: high on ss. 309/312k, low on the 2026 withdrawal button.

## Salary (sal.f = 0.24, per year)
- Target: Senior Financial Analyst / FP&A (Senior Controller), ~8 years, Frankfurt, fixed base excluding bonus.
- Prior-knowledge benchmarks, **not re-verified live**:
  - 2024-2025 German salary guides (Robert Half Gehaltsübersicht, Hays, Michael Page, Kienbaum): senior financial analyst / senior controller / senior FP&A analyst roughly EUR 65-85k a year at 5-10 years.
  - FP&A manager / head of controlling roughly EUR 85-110k+.
  - StepStone Gehaltsreport: Frankfurt and Munich are the top-paying cities, about 5-15% above the national median.
- Chosen: **~EUR 75,000 gross a year** (EUR 6,240 a month on 12 payments). f = 6,240 / 26,000 = 0.24.
  - Noura's 34,000 SAR expectation maps to ~EUR 98k a year, a realistic target for a move to FP&A lead or manager in Frankfurt.
  - Cross-check against the other EU packs: NL ~EUR 72.6k including holiday allowance (f 0.215), BE ~EUR 69.6k annual cash (f 0.192). Frankfurt sitting slightly above both fits the usual ranking.
- per = year because German offers, ads and the Blue Card rules use Jahresbrutto. Many contracts pay 12 salaries, some pay 13. Bank bonuses come on top.
- Confidence: medium-low. Re-check against a 2026 Robert Half / Hays / Michael Page guide when sources are reachable.

## Notice period (noticeDays = 90)
- Statutory employee notice is 4 weeks to the 15th or the end of a calendar month (s. 622(1) BGB). The longer periods in s. 622(2) bind only the employer, but contracts commonly extend them to both sides (s. 622(6) forbids a longer period for the employee than for the employer).
- Contracts for experienced professionals typically set "3 Monate zum Monatsende" or "6 Wochen / 3 Monate zum Quartalsende". In probation (max 6 months) the notice is 2 weeks (s. 622(3)).
- The spec's own example says "3 months in DE". 90 days is the realistic planning figure for an 8-year analyst. Confidence: high.

## Job boards
- LinkedIn and StepStone are the two leading professional channels, followed by Indeed.
- XING (New Work SE) has been refocused as a job platform and is still used in DACH, though declining.
- The Bundesagentur für Arbeit Jobbörse is the largest public listing.
- eFinancialCareers was added for Frankfurt banking.
- Order is a judgement based on reach. Confidence: medium.

## Language (lang2)
- German. C1 German is a standard requirement at most domestic employers and in public bodies (Bundesbank, KfW). English-only roles cluster in Frankfurt banks, Big Four advisory and Berlin/Munich tech.

## Certifications
- **CFA:** strong in Frankfurt banking and asset management (CFA Society Germany). It is the persona's cert.
- **Geprüfter Controller (IHK):** the public-law IHK further-training exam for controlling, the closest local equivalent to CMA for FP&A. The title naming may now be "Master Professional"; VERIFY.
- **Geprüfter Bilanzbuchhalter (IHK):** the standard accounting qualification (Bachelor Professional in Bilanzbuchhaltung since the 2020 BBiG reform).
- **CMA (IMA):** used by internationally oriented controllers.
- Wirtschaftsprüfer and Steuerberater are the statutory auditor and tax titles. They were left out as atypical for an FP&A analyst.

## Universities
- Frankfurt School of Finance & Management (private, finance specialist), Goethe University Frankfurt, and the University of Mannheim (top-ranked for business administration). The persona studied at Mannheim (B.Sc. Betriebswirtschaftslehre, a real programme there).

## Cities and employers
- **Cities**, ordered by my estimate of finance/FP&A job density: Frankfurt (banking capital: ECB, Bundesbank, Deutsche Börse, the large banks), Munich, Berlin, Hamburg, Düsseldorf, Stuttgart, Cologne (with Bonn), Essen (Ruhr). This is a judgement call, not a measured ranking.
  - Essen was chosen over Mannheim/Rhine-Neckar. As a result SAP (Walldorf) and BASF (Ludwigshafen) are not in the employer list, because their cities are not among the 8.
  - Eschborn (Deutsche Börse), Bonn (Telekom) and Bochum (Vonovia) are folded into their metros through the `metro` notes.
- **Employers** (all real; HQ cities from prior knowledge). Checklist:
  - energy champion: E.ON (Essen)
  - three largest banks: Deutsche Bank, Commerzbank, DZ BANK (all Frankfurt)
  - Islamic bank: not relevant at this scale. KT Bank AG in Frankfurt exists but is small, so it is left out.
  - telecoms: Deutsche Telekom #1 (Bonn), Vodafone Germany #2 by revenue (Düsseldorf). Telefónica/O2 is the other large network.
  - public investment: KfW (no sovereign wealth fund in the usual sense)
  - government / semi-government: Deutsche Bundesbank
  - Big Four: PwC Germany (Frankfurt HQ)
  - FMCG: Henkel
  - retail: REWE Group, Otto Group
  - airline: Lufthansa Group. Its legal seat is Cologne, but its hub and many group functions are in Frankfurt.
  - hospital group: Helios Kliniken (Berlin, part of Fresenius)
  - insurer: Allianz
  - tech scale-up: Celonis
  - fintech: Trade Republic
  - food delivery: Delivery Hero
  - e-commerce: Zalando
  - real estate: Vonovia (no giga-project developers in Germany)
  - exchange: Deutsche Börse
  - industrial: Siemens, thyssenkrupp (steel), Mercedes-Benz Group
  - Logo colours are approximate brand colours. The Celonis, Vonovia, KfW and Helios hexes are the least certain.
- **Arabic city names** follow common pan-Arab usage: فرانكفورت، ميونخ، هامبورغ، دوسلدورف، شتوتغارت، كولونيا، إيسن. **French**: Francfort, Hambourg, Cologne, Brandebourg.

## Persona
- Lena Hoffmann, f, German national, Frankfurt (roster id DE).
- The employer "Mainbrücke Group" is fictional. The Mainbrücken are Frankfurt's bridges over the Main, and I know of no large company of that name, though I could not search to confirm.
- Bio mentions HGB (German GAAP) alongside IFRS, which is typical for German groups that report under both.
- Phone: German mobiles are +49 15x/16x/17x. "+49 151 2345 6789" is a generic illustrative number. Germany has no official fictional mobile range; VERIFY if that matters.
- People: common German surnames plus one Turkish-German name (Elif Yılmaz), reflecting Germany's largest minority. The persona's surname is avoided.
