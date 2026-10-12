# FR market pack: sources and reasoning

Persona: Julien Moreau (m, French, Paris), taken from `roster.json` id `FR`. Currency EUR and price tier (p1 89 / p4 75 / p12 62, t4 300 / t12 744) come from `base.json` and were not changed. Prepared on 2026-10-12.

**Verification status.** Nothing in this pack was checked live. The shared web-search budget for this run was already used up, and direct fetches of service-public.fr, welcometofrance.com and wikipedia.org failed (the egress policy blocks them). Every fact below comes from prior knowledge. Confidence is marked as high / medium / low, and the official page to re-check is listed for each point. Where I was unsure I chose the conservative option and hedged the user-facing copy.

## Payments
- **Order: card, then PayPal (high).** Bank cards are the leading online payment method in France, and PayPal is a clear second (FEVAD and Banque de France payment surveys). Almost every French debit card is co-badged CB plus Visa or Mastercard. CB (Groupement des Cartes Bancaires) is the domestic scheme and carries most card payments in France.
  - Re-check: https://www.cartes-bancaires.com/ , https://www.banque-france.fr/fr/publications-et-statistiques/statistiques/paiements , https://www.fevad.com/
- **`localCardBrand: "CB"`, brands `["cb","visa","mc","amex"]` (high).** The checkout shows the CB logo because French users look for it. Under the EU Interchange Fee Regulation (IFR, art. 8) a co-badged card lets the cardholder choose the brand, so CB is shown next to Visa and Mastercard rather than instead of them. Amex is accepted but is a minority card.
- **Wallets: Apple Pay and Google Pay (high).** All the major French banking groups (BNP Paribas, Société Générale, Crédit Agricole, BPCE, Crédit Mutuel, La Banque Postale) support both. Samsung Pay / Samsung Wallet is supported by only some banks, so it is left out.
- **BNPL: Klarna, pay in 3 (medium).** Paying "en 3 ou 4 fois sans frais" is a mainstream French habit. The domestic leaders are Alma, Oney and Floa, and PayPal also offers "4X PayPal". I picked Klarna "pay in 3" to match the other EU packs (ES, IT, GB, IE, NL) and because the main PSPs support it in France. It only finances the upfront charge for the 4- and 12-month plans, so the sub-line says renewals are charged in full. Alma is the natural French alternative if the PSP supports it. Regulation: interest-free BNPL repaid within 3 months is currently exempt from French consumer-credit rules, but the EU Consumer Credit Directive 2023/2225 (CCD II, applicable from 20 Nov 2026) brings BNPL into scope. Legal should re-check this before launch.
  - Re-check: https://www.klarna.com/fr/ , https://getalma.eu/ , https://eur-lex.europa.eu/eli/dir/2023/2225/oj
- **Not used.** Wero (EPI), which replaced Paylib for person-to-person payments, is still rolling out for e-commerce, and SEPA direct debit is uncommon for consumer SaaS checkout. Neither is listed. Revisit in 2027.

## Tax
- **20% standard TVA (high).** B2C electronically supplied services are taxed where the customer lives (EU VAT Directive / OSS), so French consumers pay 20%.
- **`incl: true` (high).** French consumer prices must be shown TTC, including all taxes (Code de la consommation L112-1 and the arrêté of 3 Dec 1987 on price information). The label is "TVA incluse".
  - Re-check: https://www.impots.gouv.fr/professionnel/questions/quels-sont-les-taux-de-tva-en-vigueur-en-france-et-dans-lunion-europeenne

## Work rights
- **Auto-answered (`autoFor`) (high).** EU27, EEA (IS, LI, NO) and Swiss citizens have free movement and need no work authorisation. France's transitional limits on Croatian workers ended in 2015. Monaco, Andorra and San Marino are not auto-answered.
- **Statuses offered, in order:**
  1. **French, EU, EEA or Swiss citizen (high).**
  2. **Resident card or a permit that allows any job (high).** This covers the 10-year carte de résident, EU long-term resident, the "vie privée et familiale" card, and refugee or subsidiary protection status. All of these allow any salaried job without a separate authorisation.
  3. **Talent permit (passeport talent) or EU Blue Card (medium).** The multi-year "talent" card covers qualified employees, innovative companies, EU Blue Card holders and others. The law of 26 Jan 2024 (loi n° 2024-42, "loi immigration") renamed the "passeport talent" to a "talent" card, and I could not confirm when that took effect. The label therefore shows both names: "Titre « talent » (passeport talent)". The EU Blue Card salary threshold is revised each year by arrêté, so the copy says "has a minimum salary" and gives no figure.
     - Re-check: https://www.service-public.fr/ (titres de séjour "talent" and carte bleue européenne pages), https://www.legifrance.gouv.fr/ (loi n° 2024-42 du 26 janvier 2024), https://www.immigration.interieur.gouv.fr/
  4. **Employee permit, "salarié" / "travailleur temporaire" (medium).** It is issued against a work authorisation (autorisation de travail) that the employer requests online through ANEF, and it is tied to that job. How freely a holder can change employer depends on how long they have held the card, so the copy hedges: "may need a new work authorisation".
  5. **Job-search permit after graduating in France, RECE (medium).** The "recherche d'emploi ou création d'entreprise" card lasts 12 months, cannot be renewed, and is for graduates with at least a master's-level degree (plus some other qualifying diplomas). It replaced the older APS. Holders can then switch to a salarié or talent permit without a labour-market test, as long as the job matches their studies.
  6. **Needs a work permit (high).** The employer requests the work authorisation, or the candidate applies for a talent card with the employer's support. Product language says "sponsor" to match the other packs, even though French employers call this "accompagner" or "prendre en charge".
- **Not offered.** Student permits (work capped at 964 hours a year) are left out because they do not fit an 8-year professional, and the limit is six options.

## Nationalisation
- **`null` (high).** France has no nationality quota for private employers. Only the sovereign posts of the fonction publique (police, justice, defence, diplomacy) are reserved for French nationals, and most civil-service posts are open to EU/EEA nationals. That is not a private-sector quota.

## Sensitive fields
- **Photo: `optional` (high).** The photo is still common on French CVs, but it is never required. The 2006 obligation to use anonymous CVs (loi pour l'égalité des chances, art. 24) never took effect and was made optional by the 2015 loi Rebsamen. The Défenseur des droits advises employers not to ask for a photo.
- **Gender, DOB, nationality, marital: `none` (high).** Code du travail L1132-1 and Code pénal 225-1 and 225-2 forbid discrimination on more than 25 criteria, among them age, sex, family situation, origin, nationality and physical appearance. L1221-6 limits recruiter questions to what is directly linked to the job. Older French CVs listed age and "situation de famille", but forms do not require them, and current CV advice is to leave them out.
  - Re-check: https://www.defenseurdesdroits.fr/ , https://www.legifrance.gouv.fr/ (Code du travail L1132-1, L1221-6)

## Legal
- **Law (high).** The GDPR, plus the loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés (amended 2018). The regulator is the CNIL.
- **Renewal copy (medium-high):**
  - Withdrawal: 14 days for distance contracts (Code de la consommation L221-18). If service starts before the period ends at the consumer's request, a pro-rata amount can be kept (L221-25).
  - Reminder before renewal: under the loi Chatel (L215-1), a fixed-term contract that renews tacitly needs a written reminder of the right not to renew, sent between 3 months and 1 month before the end of the term. The copy promises a reminder for the 4- and 12-month plans. **Implementation note:** for those plans the reminder must reach the user at least 1 month before the renewal date, otherwise the consumer can cancel at any time after the renewal.
  - Online cancellation: "résiliation en trois clics" (L215-1-1, loi 2022-1158, in force since 1 June 2023) requires an easy online cancellation feature, hence "a few clicks in Settings".
  - Re-check: https://www.economie.gouv.fr/dgccrf/laccueil-de-la-dgccrf/abecedaire-de-la-dgccrf/resiliation-en-trois-clics

## Salary
- **Basis (medium).** French pay is quoted as gross a year. I took a current base of EUR 60k for an 8-year Senior FA / FP&A professional in Paris (recruiter guides: about EUR 55-70k for a confirmé or senior contrôleur de gestion / FP&A in Île-de-France). EUR 60k / 12 = EUR 5,000 a month, so f = 5,000 / 26,000 = 0.192, and Noura's 34,000 SAR expectation maps to about EUR 78.5k. These figures were not re-verified this session.
  - Re-check: https://www.apec.fr/ (salary barometer), Michael Page France "Étude de rémunération Finance", Robert Half France "Guide des salaires".

## Other choices
- **Cities.** Ordered by density of finance and FP&A jobs: Paris (with La Défense) far ahead, then Lyon, Lille (retail HQs), Toulouse (aerospace), Aix-Marseille, Bordeaux, Nantes and Strasbourg (Crédit Mutuel and the EU institutions).
- **Employers.** All 24 are real. Société du Grand Paris was renamed Société des grands projets by the law of 27 Dec 2023 on regional express rail networks (SERM), and it still delivers the Grand Paris Express. France has no Islamic bank. Logo colours are approximate brand colours. Monograms are 1-4 letters.
- **Notice: 90 days.** Collective agreements (Syntec, banking, retail) usually set 3 months' notice for cadres. The cadre trial period (Code du travail L1221-19) is 4 months, renewable once.
- **Phone.** +33 6 39 98 xx xx sits in the mobile range that ARCEP reserves for fiction (medium confidence that it is still the current reserved range).
- **lang2: French.** A French level matters on applications from non-native speakers, which matches how the DE, ES, IT and NL packs handle their local language.
- **govPlatforms: `[]`.** France Travail and APEC appear as job boards. ANEF (work authorisations) is handled by employers and is not a step in the job search itself.
- **Certifications.** DSCG and DEC are the French accounting qualifications, CFA is used in corporate finance and banking, and ACCA appears in multinational FP&A teams.
