# MA (Morocco) — sources and reasoning

Researched 2026-10-12 with web search. Most destination pages could not be fetched directly (egress policy), so facts below rest on search-result
summaries of the listed pages. Each section says where I was unsure and which conservative choice I made.

## Currency / price tier
Taken unchanged from `markets/base.json`: MAD, `p1` 299 / `p4` 254 / `p12` 209. Arabic register = neutral (base.json `arVariant: "neutral"`), UI default French.

## Payments
- **Wallets: Apple Pay and Google Pay.** Apple Pay went live in July 2023 (CIH Bank, Crédit Agricole du Maroc), and Attijariwafa bank, Bank of Africa and
  Banque Centrale Populaire have since joined. Google Pay launched in March 2024 (CIH Bank, Attijariwafa bank), and Bank of Africa added it in October 2024.
  I found no Samsung Pay launch, so it is left out.
  - https://techloy.com/apple-pay-morocco · https://www.imore.com/iphone/apple-pay-is-now-live-for-customers-of-this-bank-in-morocco
  - https://newsroom.mastercard.com/news/eemea/en/newsroom/press-releases/en/2023/august/mastercard-brings-apple-pay-to-customers-in-morocco
  - https://ledesk.ma/encontinu/paiement-cih-bank-introduit-google-pay-au-maroc/ · https://fr.hespress.com/358371-358371.html
  - https://challenge.ma/bank-of-africa-lance-google-pay-pour-les-utilisateurs-de-cartes-au-maroc-290205/
- **Card first (Visa, Mastercard).** Moroccan bank cards are Visa or Mastercard. The CMI (Centre Monétique Interbancaire) is the interbank processor, not a card
  brand, so `localCardBrand` is `null`. The CMI's acquiring monopoly ended in 2024 and Bank Al-Maghrib capped interchange in 2024 and 2026, but no domestic card scheme
  has been launched. Amex is left out because few Moroccan cards are Amex. The card sub-line says "with international online payments switched on" because Moroccan cardholders often have to
  switch on e-commerce or international online payments in their bank app first, and a non-Moroccan merchant is an international payment for the card
  (fact-check 2026-10-12: reworded from "(online payments enabled)", which read as a status, not an instruction; if Uptal ever acquires through a
  Moroccan acquirer such as the CMI, "international" can be dropped).
  - https://fnh.ma/article/actualite-economique/bank-al-maghrib-plafonne-les-frais-dinterchange-des-paiements-par-carte
  - https://telquel.ma/instant-t/2026/07/10/paiement-electronique-bank-al-maghrib-baisse-les-frais-dinterchange-a-05_1998527/
- **PayPal second.** Moroccans can hold PayPal accounts and pay with them. Cash Plus (Sept 2025) and Attijariwafa (Nov 2024) now handle withdrawals into dirhams.
  - https://meatechwatch.com/2025/09/16/cash-plus-and-paypal-launch-moroccos-first-digital-paypal-withdrawal-service/
  - https://www.electronicpaymentsinternational.com/news/attijariwafa-bank-paypal-launch-new-service-for-moroccan-merchants-241114-4448393
- **No BNPL** (`[]`). I found no BNPL provider that handles subscriptions and is widely used in Morocco. Cash-on-delivery and cash-at-agency payments (Cash Plus, Wafacash)
  are common for e-commerce, but they cannot handle recurring charges, so I left them out (conservative). They could be added later as a one-off option for the 4- and
  12-month plans.

## Tax
- **VAT 20 %, included in the price.** Finance Law No. 55-23 (2024) made foreign providers of digital services to Moroccan consumers subject to VAT. The implementing
  decree (No. 2-25-862, published December 2025) started a six-month transition, and the obligation took effect on **11 June 2026**. Press reports cite the 20 % standard
  rate and name Netflix, Spotify, ChatGPT and Claude as covered. Morocco quotes consumer prices tax-included, so `incl: true`.
  - https://en.le360.ma/society/morocco-begins-enforcing-vat-on-netflix-chatgpt-and-other-foreign-digital-services_QC4SKKDX5FG37HDWLLTFPJDWY4/
  - https://moroccoworldnews.com/2026/07/328303/moroccans-will-now-pay-20-vat-on-netflix-chatgpt-and-other-digital-services
  - https://digitalpolicyalert.org/event/27176-finance-law-no-55-23-for-the-fiscal-year-2024-including-obligations-on-non-resident-digital-service-providers-entered-into-force
  - Uncertain: I could not open the DGI text itself. The 20 % rate is the standard Moroccan VAT rate and every press source agrees on it.

## Work rights
- **Rule:** Labour Code art. 516 says a foreign employee's contract needs a visa from the ministry in charge of employment, filed online through **TAECHIR**
  (in use since 2017). The contract only takes effect from the date of that visa. The employer normally also needs an **ANAPEC certificate** showing that no suitable Moroccan
  candidate is available.
- **Statuses chosen (5):**
  1. Moroccan citizen (auto-answered, `autoFor: ["MA"]`).
  2. Spouse of a Moroccan citizen. Exempt from the ANAPEC certificate on presenting the marriage certificate, but the contract still needs its visa.
  3. Algerian, Tunisian or Senegalese citizen. Exempt from ANAPEC under bilateral establishment conventions, but the contract still needs its visa. *Uncertain:* all
     sources list these three countries, but I found no official text, and Morocco–Algeria diplomatic relations have been cut since 2021. The sub-line still says the
     contract must be approved, so it does not overpromise.
  4. Other foreign resident with a carte de séjour. Each new employer must file a new contract visa, usually with an ANAPEC certificate.
  5. Needs an employer to arrange authorisation (the "sponsorship" equivalent). Timing estimates in sources range from about 10 days for the ministry step alone
     to 3-5 months end to end, so the copy says "several weeks to a few months".
- Some sources mention other exemptions (foreigners born in Morocco with 6+ months' residence, company managers and shareholders, seconded experts). They are too
  narrow to list for a finance job seeker.
- **Matching rule:** civil-service posts require Moroccan nationality (Statut général de la fonction publique), so we skip jobs reserved for nationals when the user
  needs authorisation.
  - https://www.upsilon-consulting.com/procedure-emploi-salaries-etrangers-maroc/ · https://upsilon-consulting.com/en/hiring-foreign-employee-etranger/
  - https://jaldumaroc.com/la-liste-des-salaries-etrangers-dispenses-de-lattestation-dactivite-de-lanapec/
  - https://decimal.ma/contrat-travail-etranger-maroc-guide/ · https://xpershore.com/recruter-un-salarie-etranger-au-maroc/
  - http://gadem-guide-juridique.info/sejour-travail/carte-travail/autorisation-travail/procedure-autorisation-travail/le-certificat-delivre-par-lanapec/
  - https://www.bal.com/bal-news/morocco-moves-to-online-work-permit-system · https://www.fragomen.com/insights/online-portal-introduced-for-work-permit-applications.html

## Nationalisation
Morocco has no quota system like Saudization or Emiratisation. What it has is a **national-preference labour-market test**: the ANAPEC certificate, plus the contract visa
and civil service reserved for nationals. I modelled that as "National preference (ANAPEC)" instead of `null` because it really does affect foreign applicants. It does
not affect the Moroccan persona.

## Sensitive fields
- **photo: common.** CV guides agree that a recent passport-style colour photo is very common and generally expected, though not legally required (Africarrières,
  Jobsquare 2026).
- **dob: ask, nationality: ask.** Africarrières says age or date of birth and nationality are still standard CV header items in Morocco. Jobsquare is split: one
  2026 guide calls DOB optional in modern practice, another says DOB and nationality are usually mentioned. I chose `ask` because it is the local norm, and nationality also
  feeds the ANAPEC / contract-visa logic. *If the product prefers the privacy-conservative default, flip dob to `none`.*
- **marital: none.** Sources advise leaving out situation familiale unless the job requires it, and marital status is a protected ground under Labour Code (Law
  65-99) art. 9, which lists race, colour, sex, disability, marital status, religion, political opinion, union membership, and national or social origin.
- **gender: none.** Some portals have a civilité (M./Mme) field, but I found no evidence that application forms require it. Conservative choice.
  - https://africarrieres.com/maroc/fr/guide/pratique/rediger-cv · https://www.jobsquare.ma/blog/rediger-cv-maroc-guide-2026/
  - https://www.jobsquare.ma/blog/guide-cv-parfait-maroc-structure-conseils-secteur/
  - https://africarrieres.com/morocco/en/guide/droit-du-travail/harassment-discrimination

## Legal
- Privacy: **Law No. 09-08** on the protection of individuals with regard to the processing of personal data. The regulator is the **CNDP** (Commission nationale de
  contrôle de la protection des données à caractère personnel).
- Renewal: Morocco has no auto-renewal statute of its own. Consumer-protection Law 31-08 gives a 7-day withdrawal right for distance sales, with an exception for services
  that start with the consumer's consent. I could not confirm the article text (36/38), so the renewal line is a plain disclosure ("renews automatically, cancel any
  time before renewal") and does not promise a withdrawal period.

## Salary (`sal.f` = 0.846, per month)
- Senior contrôleur de gestion / financial analyst, Casablanca: Jobsquare 2026 guides give **18,000-28,000 MAD gross a month** (confirmé, Casablanca) and 15,000-30,000
  (senior, national). HRMCO gives 200,000-260,000 MAD a year for 6-10 years (about 16,700-21,700 a month). Glassdoor's Casablanca figure (about 9,000 MAD) is a mix of
  junior pay and annual/monthly confusion, so I ignored it.
- I chose about **22,000 MAD gross a month**, so f = 22,000 / 26,000 = **0.846**. The expected 34,000 × f gives about 28,800 MAD, the top of the senior band, which fits a
  step up to Senior / FP&A lead. Pay is quoted monthly in Morocco, so `per: "month"`.
  - https://www.jobsquare.ma/blog/salaires-maroc-par-secteur-metier-2026/ · https://www.jobsquare.ma/blog/controleur-de-gestion-maroc-salaire-carriere/
  - https://hrmco.ma/metier/controleur-de-gestion/

## Notice period (`noticeDays` = 90)
Decree 2-04-469 (BO 5280, 6 Jan 2005) sets notice for cadres at 1 month (<1 yr), 2 months (1-5 yrs) and 3 months (>5 yrs). It applies to resignation too, and contracts
or collective agreements can only set longer periods. With 8 years of experience, most of it in one group, the persona is a cadre over 5 years, so 90 days.
- https://upsilon-consulting.com/preavis-rupture-contrat-maroc/ · https://www.rekrute.com/fr/emplois-licenciement-delai-et-indemnite-de-preavis-conseils-carriere-2789.html

## Employers (24, all real)
Coverage against the spec checklist:
- Resources champion: OCP. Mining: Managem.
- Largest banks: Attijariwafa, BCP, Bank of Africa, plus CIH.
- Islamic bank: Bank Assafa, the participative-bank leader at roughly 32-38 % share and an Attijariwafa subsidiary
  (https://wafir.ma/fr/guide/banques-participatives-maroc-2026-comparatif-5-banques).
- Telecoms #1 and #2: Maroc Telecom, Orange.
- Public investment: CDG. Big Four: Deloitte. FMCG: Cosumar.
- Retailer: Marjane (HQ Casablanca, per a 2025 Competition Council notice). Airline: RAM. Hospitals: Akdital. Insurer: Wafa Assurance.
- Tech scale-up: Chari ($12M Series A Oct 2025, Bank Al-Maghrib payment-institution licence; https://wamda.com/2025/10/chari-secures-12-million-series-payment-licence-bank-al-maghrib).
- Fintech: Cash Plus (listed). Food delivery: Glovo, still the dominant platform after its July 2025 Competition Council settlement.
- Giga-project: Tanger Med. Real estate: Addoha. Exchange: Bourse de Casablanca. Industrial: Renault Tangier. Government: Bank Al-Maghrib.

Logo colours are approximate brand colours and monograms are invented.

## Other choices
- Cities, ordered by finance-job density: Casablanca (CFC, bank and corporate HQs), Rabat (CDG, BAM, Maroc Telecom, ministries), Tangier (Tanger Med, Renault,
  free zones), Marrakesh, Fez, Agadir, Kenitra (Stellantis, Atlantic Free Zone).
- `lang2` = French. It is the working language of Moroccan finance, so French level matters on applications.
- Certifications: CFA, DNEC (Diplôme National d'Expert-Comptable, prepared at ISCAE, decree 2-89-519, Ordre des Experts-Comptables), ACCA, CMA.
  The Arabic label for DNEC ("خبير محاسب") is a plain-language rendering; I could not verify the official Arabic title.
- Universities: ISCAE Casablanca, ENCG Settat, Al Akhawayn University. The persona studied at ISCAE.
- Job boards: LinkedIn, ReKrute (the leading local board), Emploi.ma, Indeed, Bayt. Gov platforms: ANAPEC (public employment agency), TAECHIR (contract visas),
  CNSS (social security), Emploi-public.ma (public-sector recruitment).
- Persona: Youssef El Amrani, male, Moroccan, Casablanca, as in roster.json. The employer "Arganis Group" is fictional: a search found no Moroccan company with that exact name.
  Moroccan GAAP is referred to as CGNC (Code Général de Normalisation Comptable). Sage is added to the tools because it is ubiquitous in Moroccan finance teams.
- Phone format: +212, with mobiles as 6XX XX XX XX.

## Fact-check pass (2026-10-12)
Web search budget was used up and direct fetches failed (DNS), so this pass is a knowledge and consistency review, not a live re-verification.
- Checked against known law: Labour Code art. 9 (situation conjugale is a listed discrimination ground), art. 516 (contract visa from the ministry in charge of
  employment), decree 2-04-469 (cadre notice 1/2/3 months), Statut général de la fonction publique (Moroccan nationality for public posts), Law 09-08 / CNDP,
  standard VAT 20 % with TTC price display. No change needed.
- Arabic fixes: Bank of Africa spelled بنك إفريقيا (Moroccan spelling); option 3 label now parallels option 1 (أحمل الجنسية ...); the contract-visa sub-lines
  now say the employer obtains the visa (الحصول على التأشيرة على عقدك) instead of saying the employer endorses the contract itself; "وظائف الوظيفة العمومية"
  changed to "مناصب الوظيفة العمومية" (removes the repetition).
- Still not re-verified live: the 11 June 2026 start date for VAT on foreign digital services, the Google Pay launch dates, the Algerian/Tunisian/Senegalese
  ANAPEC exemption, the Marjane HQ city, and the 22,000 MAD salary midpoint.
