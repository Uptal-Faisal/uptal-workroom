# IT market pack: sources and reasoning

Persona: Marco Bianchi (m, Italian, Milan), from `roster.json` id `IT`. Currency EUR and the price tier come from `base.json` and were not changed.

**Research caveat (read first).** I wrote this on 2026-10-12 with no live web access. The run's shared WebSearch budget was already used up, and WebFetch and direct fetches of primary sites (EU immigration portal, Michael Page, Robert Walters, Wikipedia) were refused by the egress proxy. Every fact below comes from my own knowledge, which runs to mid-2026. The URLs are the primary sources to check against. I did not open any of them this session. Where I was unsure I took the conservative option, and each one is marked **[verify]**.

## Payments
- **Order: card, then PayPal.**
  - Netcomm, Casaleggio Associati and Politecnico di Milano (Osservatorio Innovative Payments) surveys put cards first for Italian online payments. That includes credit, debit and prepaid cards such as Poste Italiane's Postepay, which runs on Mastercard. PayPal comes a close second: Italy is one of PayPal's strongest European markets.
  - No local method dominates the way Bancontact or iDEAL do, so cards go first.
  - The card sub-line says "debit, credit or prepaid" because prepaid cards (Postepay and others) are a large share of Italian online payments.
- **`localCardBrand: null`.** Italian Bancomat/PagoBANCOMAT debit cards are co-badged with a Visa or Mastercard debit scheme (formerly Maestro or V Pay), and online they run through that scheme. PSPs such as Stripe don't route PagoBANCOMAT as a card network, so a "Bancomat" badge would promise something checkout can't do. Bancomat Pay is mostly used in shops and between people. **[verify]** if a PSP with PagoBANCOMAT e-commerce acceptance is adopted later.
- **Wallets: Apple Pay and Google Pay.** Apple Pay has been in Italy since 2017 and Google Pay since 2018, and most Italian banks and Postepay support both. Samsung Pay/Wallet exists but is not a standard web-checkout option, so it is left out.
- **Satispay (left out on purpose).** Satispay is a large Italian mobile-payments app from Milan, accepted by many online merchants. I could not confirm that it supports merchant-initiated recurring charges for subscriptions, so it is not listed. **[verify]** It is the strongest candidate for a third method.
- **BNPL: Klarna Pay in 3, with "Renewals are charged in full".**
  - Scalapay, an Italian company from Milan, is the best-known BNPL in Italy. Klarna and PayPal "Paga in 3 rate" are also widely available.
  - I chose Klarna because standard PSPs (Stripe, Adyen) support it for Italian customers, and it matches the GB and NL packs.
  - Italy transposes the new Consumer Credit Directive (EU 2023/2225), which brings BNPL under consumer-credit rules from 20 Nov 2026. The option stays allowed, but the provider has to do creditworthiness checks.
  - **[verify]** Swap to Scalapay if the PSP supports it, or set `[]` if BNPL can't be used for a digital subscription.
  - https://www.osservatori.net/it/ricerche/osservatori-attivi/innovative-payments
  - https://www.consorzionetcomm.it/
  - https://www.scalapay.com/it
  - https://www.klarna.com/it/

## Tax
- **Rate.** The standard Italian VAT rate (IVA) is 22% (DPR 633/1972). B2C electronically supplied services are taxed where the customer lives, at 22%.
- **Price display.** Prices shown to consumers must include VAT (price-indication rules of the Consumer Code, D.Lgs. 206/2005, arts. 13-17), so `incl: true`.
  - https://www.agenziaentrate.gov.it/portale/web/guest/schede/agevolazioni/aliquote-iva (IVA rates)

## Work rights
- **Auto-answered (`autoFor`).** EU27, EEA (IS, LI, NO) and Swiss citizens have free movement and need no permit (D.Lgs. 30/2007). The list is identical to the BE pack, with IT first.
- **Statuses offered, in order:**
  1. **Italian, EU, EEA or Swiss citizen.**
  2. **EU long-term resident permit** (permesso di soggiorno UE per soggiornanti di lungo periodo, art. 9 TUI, D.Lgs. 286/1998). It is open-ended and covers any employer.
  3. **Family or protection permit.** This covers family-reason permits (art. 30 TUI) and international protection (refugee or subsidiary), plus special protection. All of these allow work for any employer.
  4. **Job-search permit after graduating in Italy** (art. 39-bis.1 TUI, added by D.Lgs. 71/2018, which transposed Directive 2016/801).
     - Foreign graduates of an Italian laurea, laurea magistrale, master or PhD get a permit "per ricerca lavoro o imprenditorialità" lasting 9-12 months.
     - They can work during it and convert it to a work permit outside the quotas.
     - The copy says "up to 12 months". **[verify]** the exact minimum.
  5. **Work residence permit (lavoro subordinato).**
     - The first nulla osta is tied to a specific employer. Once the permit is issued, the holder can change employer.
     - The new employer files the mandatory hiring notice (Comunicazione Obbligatoria UNILAV), and the permit is renewed on the new contract.
     - A worker who loses their job can get an "attesa occupazione" permit (at least 12 months, art. 22 TUI). It isn't a separate option; it falls under this one.
     - **[verify]** the wording "the new one registers your contract".
  6. **EU Blue Card (Carta Blu UE, art. 27-quater TUI).** It was reformed by D.Lgs. 152/2023, which transposed Directive 2021/1883. It sits outside the Decreto Flussi quotas. I could not confirm the current salary threshold, so the copy says "national salary threshold" without a number, as the BE pack does.
  7. **Needs a work permit.** The employer applies for a nulla osta at the Sportello Unico per l'Immigrazione. For most non-EU hires this falls within the yearly Decreto Flussi quotas; the three-year DPCM for 2026-2028 was adopted in 2025. Highly qualified routes (Blue Card, art. 27 "casi particolari") are outside the quotas, hence "often within yearly quotas".
  - https://integrazionemigranti.gov.it/
  - https://www.interno.gov.it/it/temi/immigrazione-e-asilo
  - https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1998-07-25;286 (TUI)
  - https://immigration-portal.ec.europa.eu/eu-blue-card-italy_en

## Nationalisation
- **`null`.** Italy has no private-sector nationality quota.
- Some public-sector posts that exercise public authority are reserved for Italian citizens (DPCM 174/1994). Other public posts are open to EU citizens.
- The Decreto Flussi is an immigration-entry quota, not nationalisation, so it is covered in the rights card instead.
- The Law 68/1999 "collocamento mirato" quota is about disability, not nationality. It is mentioned under culture.

## Sensitive fields
- **Legal basis.**
  - Workers' Statute (L. 300/1970) art. 8: bars inquiries into opinions and facts irrelevant to aptitude.
  - D.Lgs. 276/2003 art. 10: bars agencies and authorised intermediaries from any inquiry or pre-selection by sex, marital or family status, pregnancy, age, nationality, origin and other grounds, even with consent. This matters because an auto-apply service looks like an intermediary.
  - D.Lgs. 215/2003, D.Lgs. 216/2003, and the Equal Opportunities Code (D.Lgs. 198/2006, art. 27) on access to employment.
  - Job ads carry the standard clause "rivolto ad entrambi i sessi (L. 903/77 e 125/91) e a persone di tutte le età e nazionalità (D.Lgs. 215/03 e 216/03)".
- **Photo: `optional`.** It is common on Italian CVs and the Europass template has a slot, but it is not required. It is not banned, so I chose `optional` rather than `avoid`.
- **Date of birth and nationality: `none`.** Both appear on many Italian CVs out of habit, and the Europass template has fields for them. Forms don't need them, and asking for them conflicts with art. 10, so this is the conservative choice. The right-to-work card covers work authorisation.
- **Gender and marital status: `none`.**
- **GDPR consent line.** Italian CVs end with a consent line ("Autorizzo il trattamento dei miei dati personali ai sensi del Reg. UE 2016/679 e del D.Lgs. 196/2003"). Strictly, GDPR art. 6(1)(b) makes it unnecessary, but recruiters still expect it, so the tailored CV should add it.
  - https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1970-05-20;300
  - https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2003-09-10;276
  - https://europass.europa.eu/it

## Legal
- **Privacy law.** GDPR plus the Codice in materia di protezione dei dati personali (D.Lgs. 196/2003, as amended by D.Lgs. 101/2018). The regulator is the Garante per la protezione dei dati personali.
  - https://www.garanteprivacy.it/
- **Renewal line.**
  - It names the 14-day withdrawal right under the Consumer Code (D.Lgs. 206/2005, arts. 52-59).
  - The EU "withdrawal button" rule (Directive 2023/2673) applies from 19 June 2026 and needs a "withdraw from contract here" function. **[verify]** Italy's transposing act.
  - Italy has no US-style auto-renewal statute that I know of. I recall Italy's annual competition laws adding renewal-notice duties for some sectors (telecoms, insurance), but I couldn't confirm any duty for SaaS. **[verify]**

## Salary
- **Factor:** `per: year` (Italians quote RAL, gross a year), `f = 0.173`.
  - Marco's current base works out to 26,000 × 0.173 = EUR 4,500 a month, which is EUR 54,000 RAL.
  - Noura's 34,000 expectation maps to about EUR 5,880 a month, about EUR 70.6k RAL.
- **Benchmarks (from memory, not re-checked):**
  - Michael Page, Hays and Robert Walters Italy salary guides put a senior Financial Analyst / FP&A analyst with 5-10 years in Milan at about EUR 45-60k RAL, and an FP&A manager at about EUR 60-85k.
  - JobPricing and Glassdoor Milan figures for "Senior Financial Analyst" cluster around EUR 50-55k.
  - Rome and Turin pay about 5-10% less than Milan.
- **Why EUR 54k.** It is mid-band for an 8-year CFA holder from Bocconi at a large corporate. The 70.6k expectation lands at the top of the senior band and the start of the FP&A-manager band, which is plausible for a senior FP&A move.
- **Monthly basis.** The monthly equivalent is RAL/12, even though pay is actually spread over 13 or 14 instalments. **[verify]** with the 2026 guides.
  - https://www.michaelpage.it/salary-guide
  - https://www.hays.it/guida-stipendi
  - https://www.robertwalters.it/insights/salary-survey.html
  - https://www.jobpricing.it/

## Notice period
- **Who sets it.** Preavviso comes from the collective agreement (CCNL), the employee's level and their seniority with the employer, not from statute.
- **Examples (from memory).**
  - CCNL Terziario/Commercio, Quadri and level I: 60 / 90 / 120 days at under 5 / 5-10 / over 10 years for dismissal, with shorter terms for resignation.
  - CCNL Metalmeccanici, top levels: about 1-2 months for resignation.
  - CCNL Credito: about 1-2 months.
- **`noticeDays: 60`.** This is a middle value for a senior employee or quadro and is conservative for start-date copy. **[verify]** the exact CCNL tables.
- **Filing.** Resignations must be filed online through the Ministry of Labour procedure (dimissioni telematiche, D.Lgs. 151/2015 art. 26, in force since 12 March 2016).
  - https://www.lavoro.gov.it/temi-e-priorita/rapporti-di-lavoro-e-relazioni-industriali/focus-on/Dimissioni-volontarie

## Job boards
- **LinkedIn, Indeed and InfoJobs (Italy)** are the main general boards.
- **eFinancialCareers** covers finance roles in Milan.
- **Michael Page and Hays** are listed because in Italy specialist recruitment firms place a large share of FP&A and controlling roles through their own job sites.
- **Left out:** Monster (its US parent's 2025 bankruptcy left the Italian site's status unclear), Glassdoor (merged into Indeed's operations) and Jobrapido (an aggregator that would duplicate the others). **[verify]**

## Language (`lang2`)
- **Italian.** It is the working language for almost all roles outside a few Milan tech and banking teams, and foreign applicants are screened on it. English at B2/C1 is usually also required in Milan finance; that is noted under culture.

## Employers (all real), with notes
- **Energy.** Eni is the national champion: registered office in Rome, with large corporate and finance functions in San Donato Milanese (filed under the Milan metro). Enel has its HQ in Rome.
- **Banks.** Intesa Sanpaolo (largest; registered HQ Turin, many head-office functions in Milan, filed under Milan), UniCredit (Milan), Banco BPM (Milan, third). There is no Islamic bank in Italy.
- **Insurers.** Generali (HQ Trieste, which is not in the city list, so it is filed under its big Milan CityLife hub) and Unipol (Bologna).
- **Telecoms.**
  - TIM is #1: registered office in Milan, with its main operations in Rome, filed under Rome.
  - Fastweb + Vodafone is #2. Swisscom bought Vodafone Italia at the end of 2024 and merged it with Fastweb; the combined company is in Milan.
  - **[verify]** the current brand name.
- **Sovereign/public investment.** Cassa Depositi e Prestiti (Rome), majority-owned by the Ministry of Economy and Finance.
- **Others.**
  - Deloitte Italy: Milan.
  - Ferrero: Italian commercial HQ in Pino Torinese (Turin metro) and plant/registered office in Alba. **[verify]** that finance roles sit in Pino Torinese.
  - Esselunga: HQ Limito di Pioltello, Milan metro.
  - ITA Airways: Rome; Lufthansa took a 41% stake in Jan 2025.
  - Gruppo San Donato: largest private hospital group, Milan area.
  - Bending Spoons: Milan.
  - Nexi: Milan.
  - Amazon Italia: Milan, Porta Nuova.
  - Borsa Italiana: Milan, part of Euronext since 2021.
  - Stellantis: Italian operations in Turin.
  - Leonardo: Rome.
  - Poste Italiane: Rome, state-controlled.
  - Gucci: Florence, Kering group.
- **Webuild (caveat).** I chose it for the real-estate/giga-project slot because Italy has no giga-project developer and Webuild is the largest infrastructure contractor. It is filed under Milan. **[verify]** whether its registered office is now Segrate or Milan city; it is Milan metro either way.
- **Logo colours.** Brand-ish approximations, not official hex values. Enel, Ferrero and Webuild are the least certain.

## Cities and Arabic spellings
- **Order.** Ordered by how many finance/FP&A jobs each has: Milan by far first, then Rome, Turin and Bologna, then Florence, Verona, Padua (with Venice-Mestre and Treviso) and Naples. Bergamo and Brescia are big industrial areas but sit outside the Milan metro and were left out to keep the list at 8.
- **Arabic spellings.** I used the forms common in Arabic media: ميلانو، روما، تورينو، بولونيا، فلورنسا، فيرونا، بادوفا، نابولي. Smaller places are transliterated (سيستو سان جوفاني، سان دوناتو ميلانيزي، كازاليكيو دي رينو، سكانديتشي، بينو تورينيزي). **[verify]** those transliterations with a native speaker.
- **French forms.** Milan, Rome, Turin, Bologne, Florence, Vérone, Padoue, Naples, Venise, Trévise.

## Persona details
- **Employer.** Fictional "Acme Italia", with subsidiary "Acme Servizi Finanziari", following the Acme pattern used in the BE pack.
- **Degree.** MSc in Accounting, Financial Management and Control (Bocconi's AFC laurea magistrale), the classic Milan route into FP&A and controlling.
- **Certification.** CFA, from a shortlist of CFA, Dottore Commercialista (ODCEC register), Revisore Legale (MEF register) and ACCA. Most Italian FP&A analysts hold no certification at all; CFA is the one that fits an FP&A track best.
- **Tools.** SAP S/4HANA, CCH Tagetik, Excel, Power BI. CCH Tagetik is Italian (Lucca, now Wolters Kluwer) and very common for budgeting and consolidation in Italy.
- **Accounting standards.** "Italian GAAP (OIC)" refers to the Organismo Italiano di Contabilità standards.
- **Phone.** +39 347 123 4567 follows the 3xx mobile format. I know of no Italian number range reserved for fiction.
- **People.** The 10 names are common Italian first-name and surname pairs, mixing North and South. Andrea is a man's name in Italy.
