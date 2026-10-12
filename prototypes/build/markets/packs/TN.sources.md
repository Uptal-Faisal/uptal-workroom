# TN (Tunisia): sources and reasoning

Researched 2026-10-12. Several Tunisian sites (tanitjobs.com, paylab.com, africarrieres.com, dlapiperintelligence.com, visaatlas.org) could not be fetched directly from the sandbox, so some facts below come from search-result extracts of those pages. Those are marked "via search extract". Currency and price tier come from `base.json` (TND, p1 89) and are unchanged.

## Payments
- **Tunisian dinar is non-convertible.** Local cards normally cannot pay foreign websites. The only route is La Poste's Carte Technologique Internationale (CTI), with a 1,000 TND a year allowance and eligibility conditions: https://idaraty.tn/fr/procedures/obtenir-la-carte-technologique-internationale-la-poste-personne-physique and https://www.lapresse.tn/2025/05/06/carte-technologique-vers-une-augmentation-de-lallocation-en-devises-pour-les-jeunes-et-les-entrepreneurs/
  So the TND checkout assumes Uptal collects in dinars through a Tunisian acquirer or gateway (ClicToPay/SMT, Konnect, Paymee). That is an implementation assumption: please check it with the business.
- **Cards first.** BCT 2025 figures: 5.851 M local cards, 164.9 M card operations, online payments 1.375 bn TND (+31%). Mobile payment reached 8.4 M operations and 469k wallets. https://fr.allafrica.com/stories/202607080538.html and https://www.tuniscope.com/article/436288/actu-arabe/arabe/paiement-104710
- **Brands.** Tunisian banks issue domestic Visa and Mastercard. Amex is not a normal local card, so it is left out. Konnect lists Visa, Mastercard, e-Dinar and Flouci, with a 1.6% fee on Tunisian cards (Visa/MC/e-Dinar): https://dabafinance.com/fr/nouvelles/La-soci-t--tunisienne-Konnect-obtient-un-financement-pour-d-velopper-ses-solutions-de-paiement-num-rique and https://apps.odoo.com/apps/modules/17.0/payment_konnect
- **`localCardBrand: "e-Dinar"`.** La Poste Tunisienne's e-Dinar cards have more than 1 M holders (ITU 2024): https://itu.int/net4/wsis/stocktaking/Prizes/2024/Details/16420145975511582. Gateways process e-Dinar on the card form, so it is a card brand, not a separate tile. Tunisia has no national card scheme like CB or mada; e-Dinar is the closest local card brand.
- **Flouci wallet tile.** Flouci is licensed in Tunisia, a payment facilitator since 2024, with about 67k active users at end-2024, and Konnect integrates it: https://forbesmiddleeast.com/lists/the-middle-easts-fintech-50-2025/flouci-by-kaoun/
  D17 (La Poste app, about 500k active users, March 2026: https://managers.tn/2026/03/10/les-tunisiens-peuvent-desormais-recharger-leur-badge-de-telepeage-a-distance/) was left out as its own tile because I could not confirm D17 checkout at online gateways. Its users pay with their e-Dinar card. Uncertain.
- **Wallets `[]`.** Apple Pay is not supported for Tunisian cards (Apple Community, 2023: https://communities.apple.com/fr/thread/255053682). Google Pay is not listed for Tunisian issuers. Local mobile payment runs on SMS codes through Tunisie Monétique: https://www.webdo.tn/fr/?p=220111
- **BNPL `[]`.** No common BNPL that can pay a subscription.
- **Recurring billing.** A vendor page says ClicToPay supports recurring transactions (https://cartdna.com/fr-fr/shopify-payment-methods/clictopay), but reports show Tunisian cards failing on foreign auto-renewals (https://community.ovhcloud.com/t/tunisie-ovn-renouvellement/3079). Card-on-file renewal through a local gateway needs checking with the acquirer.

## Tax
- **VAT standard rate 19%** (reduced rates 13% and 7%): https://www.vatcalc.com/category/tunisia/ and https://quaderno.io/guides/tunisia/vat/
- Consumer prices in Tunisia are shown TTC, so `incl: true`. Sources disagree on how foreign B2C digital services are treated (withholding or registration, and a 3% or 5% royalty tax on non-resident software). With local TND collection, 19% VAT included is the conservative display.
- LF 2026 art. 53 extends e-invoicing to services. This is relevant only if Uptal invoices through a Tunisian entity: https://www.tuniscope.com/article/423074/business/economie/facturation-electronique-132422

## Work rights
- **Legal basis.** Labour Code arts. 258-277. Under art. 258-2, a foreigner needs a work contract approved ("visé") by the Ministry of Employment and a carte de séjour marked "autorisé à exercer un travail salarié". Contracts are normally limited to 1 year and renewable. Hiring is allowed only when no Tunisian skill exists: https://www.rekrute.com/fr/emplois-travail-en-tunisie-conseils-carriere-1946.html and https://www.expat.com/en/guide/africa/tunisia/14320-work-in-tunisia.html
- **Two Ministry documents.** The contract visa (with labour-market test) and the "attestation de non-soumission" (DLA Piper, via search extract): https://www.dlapiperintelligence.com/goingglobal/employment/?c=TN
  Attestation categories, per visaatlas (via search extract, not verified on the ministry site): company managers or legal representatives, Investment Law 2016-71 companies, hydrocarbons and mining codes, cooperation experts, and Moroccan nationals: https://visaatlas.org/visas/tunisia/non-submission-attestation
  A Webdo column says Maghreb nationals are exempt from the work permit but need the attestation: https://www.webdo.tn/fr/?p=178928
  The option text says "e.g. Moroccan nationals" only. Algerians and Libyans are not named because I found no confirmation for them.
- **`autoFor: ["TN"]` only.** No GCC-style or EU-style free-movement bloc applies. No exemption for spouses of Tunisians or resident-card holders could be confirmed, so neither is offered as a status (conservative).
- **Rule text.** Changing employer needs a new approved contract, hence "employers that hire foreign staff". Exporting and offshore firms use the Investment Law quota.

## Nationalisation
- National priority (art. 258-2): https://www.rekrute.com/fr/emplois-travail-en-tunisie-conseils-carriere-1946.html
- **Investment Law 2016-71 art. 6.** Foreign executives up to 30% of executive staff until the end of year 3, then 10%, with at least 4 always allowed. Above that needs Ministry approval. PwC (reviewed 25 Feb 2026) still lists it as in force: https://taxsummaries.pwc.com/tunisia/corporate/tax-credits-and-incentives and https://kpmg.com/tn/en/home/insights/2017/01/flash-alert-2016-128.html

## Sensitive fields
- **Photo `common`.** Tanitjobs 2026: a photo is "very common, recommended, not mandatory". Africarrieres: a missing photo is "quasi-éliminatoire". Both via search extract: https://www.tanitjobs.com/blog/947/reussir-entretien-cv-integration-poste-tunisie-2026/ and https://africarrieres.com/tunisie/fr/guide/pratique/rediger-cv
- **dob, nationality and gender `ask`.** The Tunisian CV "état civil" block normally carries date of birth and nationality, and Africarrieres recommends stating civil status. Local forms use civilité (M./Mme). Nationality also drives the work-rights logic.
- **Marital status `none`.** It often appears on Tunisian CVs, but it is not needed to apply and it is a bias risk (especially for women), so we choose the conservative option.
- **Data protection.** Organic Law 2004-63 is still in force, regulated by INPDP. A 132-article replacement bill was still in ARP committee as of May 2026, and I found no report of its adoption: https://businessnews.com.tn/2026/05/20/associations-donnees-personnelles-nationalite-larp-ouvre-plusieurs-fronts/1402562/ and https://fr.allafrica.com/stories/202508050456.html. Update `legal.law` if it passes.

## Renewal and withdrawal
- **Law 2000-83 on e-commerce.** Art. 30 gives a 10 working-day withdrawal right (for services, counted from conclusion of the contract). Art. 25 requires pre-contract disclosure of it: https://unescwa.org/sites/default/files/inline-files/ABLF-2023-consumer-CP-Tunisia-english.pdf and https://www.ictpolicyafrica.org/en/document/94x41x6wcz6?page=5
  I did not read the official exceptions list. Offering the 10-day right to everyone is the conservative choice.
- No specific Tunisian auto-renewal statute was found, so the disclosure is the generic "renews until you cancel".

## Salary (`f = 0.162`, per month)
- Paylab Tunisia, financial analyst: 1,385-4,173 TND gross a month for the middle 80% (banking), 1,463-4,968 TND (finance/accountancy), and 3,638 TND after 5 years (via search extract): https://www.paylab.com/tn/salaryinfo/banking/financial-analyst
- Tanitjobs finance salary guide: senior contrôleur de gestion 3,800-7,500 TND gross a month (via search extract, no method given): https://www.tanitjobs.com/blog/710/emploi-comptable-finance/ and https://www.tanitjobs.com/blog/675/salaires-tunisie-2026-guide-complet-secteur-metier/
- Chosen: about 4,200 TND gross a month for 8 yrs at a large group in Greater Tunis. That is above the Paylab 5-yr level and in the lower half of the Tanitjobs senior band. f = 4,200 / 26,000 = 0.162, giving about 4,210 TND now and about 5,510 TND expected. Tunisians often quote net pay, so the UI should say gross.

## Employers (all real; HQ city)
- Bank ranking. H1 2025 PNB: BIAT first, then BNA, Attijari, STB, BH, Amen: https://www.tunisienumerique.com/classement-des-banques-cotees-par-pnb-au-premier-semestre/. Net profit 2024: https://www.leconomistemaghrebin.com/2025/05/09/analyse-2024-des-resultats-nets-le-classement-des-5-meilleures-banques-tunisiennes-cotees/
- Telecom ranking. INT, Mar 2025: Ooredoo 42.5%, Tunisie Telecom 30.5%, Orange 26.8% of mobile lines: https://intt.tn/upload/files/TB1_Tel-mobile%20-03_2025.pdf
- Largest companies. 2024 ranking: STIR, STEG, GCT, SNDP, ETAP, Tunisie Telecom and others: https://www.leconomistemaghrebin.com/?p=659861
- Taoufik Hospitals Group is described as the leader of private hospitals (4 hospitals, 600+ beds). Its sale to Morocco's Akdital was signed in Dec 2025 and was stalled at the Competition Council as of June 2026, so the brand is unchanged: https://fr.hespress.com/455223-455223.html and https://fr.le360.ma/economie/tunisie-akdital-freine-dans-sa-volonte-dimpulser-une-nouvelle-dynamique-hospitaliere_RNCUI4EFNBEH7NGOE2WTEE5YF4/
- Glovo is the delivery market leader and was active in 2026 (Retail Days, June 2026; courier strike, Aug 2026): https://www.webdo.tn/fr/?p=400080 and https://www.webdo.tn/fr/?p=402034. Jumia is not used because it shut its Tunisian business at the end of 2024: https://itweb.africa/article/jumia-to-close-shops-in-tunisia-south-africa/Pero37Z3rbWMQb6m
- GCT HQ is Tunis (plants in Gabès and Sfax). LEONI's main Tunisian site is Messadine, Sousse.
- Logo colours are approximate brand-ish colours. They are not official brand values.

## Other
- **Boards.** Tanitjobs is the main private board and Keejob is second. emploi.nat.tn is the ANETI/public-sector portal. Ahrefs, June 2025: Tanitjobs about 91k, emploi.nat about 71k, Keejob about 43k monthly search visits: https://managers.tn/2024/09/18/choisissez-les-bons-profils-avec-ces-6-plateformes and https://ahrefs.com/websites/emploi.nat.tn
- **govPlatforms.** ANETI is the public employment service and carries public-enterprise recruitment.
- **Universities.** IHEC Carthage is ranked first among business schools (Eduniversal): https://managers.tn/2024/08/05/ihec-carthage-distinguee-comme-meilleure-ecole-de-commerce-en-tunisie. ISG Tunis is third and is a recruiters' favourite with IHEC: https://www.leconomistemaghrebin.com/2019/12/05/l-ihec-lisg-premier-choix-recruteurs-tunisiens/. ISCAE (Manouba) is the specialist accounting school.
- **Certifications.** The national Expert-comptable diploma (OECT) is the local professional title. ACCA, CFA and CMA are the international ones seen in Tunisian finance job ads. Their relative weight is from judgement, not a source.
- **Notice period.** One month written notice for a CDI under the Labour Code, longer by contract or collective agreement (one guide says 2 months for cadres, unverified): https://wageindicator.org/fr-tn/travail-en-tunisie/droit-du-travail/contrats-et-licenciements/preavis-et-indemnite-de-depart. `noticeDays: 30`.
- **Law 2025-9 (21 May 2025).** CDI is the norm and the trial period is capped at 6 months, renewable once: https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2025/New-legislation-overhauling-Tunisias-employment-framework
- **Language.** French is the business language, so `lang2` is French. Arabic is "neutral" per `base.json`.
- **Phone.** +216 with 8-digit numbers. 20 xxx xxx is an Ooredoo-style mobile prefix.
- **Persona.** The employer (Medjerda Group / Medjerda Distribution) is fictional, named after the Medjerda river. The bio mentions IFRS group reporting plus statutory accounts under Tunisian standards (NCT), which matches Tunisia's phased IFRS adoption for listed companies, banks and insurers.

## Fact-check pass (2026-10-12)
- No live web access in this pass (search budget used up, egress blocked), so nothing above was re-verified online. Only wording and consistency fixes were made.
- Capital city Arabic is now "تونس العاصمة" (local usage), so it is not confused with the country "تونس". This matches DZ ("الجزائر العاصمة") and KW ("مدينة الكويت").
- The Investment Law quota text now says it applies to managerial staff ("cadres"), covers the first 3 years, and allows 4 foreign executives in any case. The earlier "at least 4" could be read as a hiring obligation.
- The last work-rights option now says "an employer", as other packs do, because the user is looking for a job.
