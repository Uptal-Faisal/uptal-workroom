# ES market pack: sources and reasoning

Researched 2026-10-12. **Research limits:** I ran 7 web searches, and then the shared search budget for this run (200 calls across all agents) ran out. WebFetch could not resolve any host (caixabank.com, cross-border-magazine.com, boe.es), and direct HTTPS was refused by the proxy (403). So only the payment facts below rest on live 2025-2026 search results. Everything else comes from prior knowledge (training data up to mid-2026) and is labelled with a confidence level. **Before launch, re-check the items marked "verify".**

**Fact-check pass (2026-10-12):** this pass had no live sources either. The shared WebSearch budget was used up, and WebFetch could not resolve boe.es or wikipedia.org. So each claim was checked against prior knowledge and against the builder's own cited data. That pass made four changes, each marked "fact-check" below:
- moved PayPal ahead of Bizum
- renamed the option "Student stay permit" to "Student permit"
- changed the French label for that option
- corrected the Arabic spelling of Iberia

Nothing else was refuted.

## Payments (searched)
- **Cards first.** Cards are still the largest online method in Spain:
  - Stripe: 48% of online-store purchases in Spain are paid by card.
  - PPRO country report: cards 50%.
  - Cross-border Magazine: 51% in 2024.

  Visa and Mastercard dominate, and Amex is accepted by the main PSPs but is a minority card. Spanish debit cards work online, which is why the sub-label says "debit or credit".
- **Bizum second.** Bizum is the fastest-growing online method:
  - PPRO: 10.3% of Spanish shoppers paid with Bizum in 2024, up from 2.7% in 2023.
  - Bizum/Stripe: 105.6 million e-commerce purchases in 2025, +82% year on year, about 289,000 a day.
  - MONEI's Black Friday/Cyber Monday 2025 sample: 22% of shoppers used Bizum, Apple Pay had 12% of checkouts and Google Pay 4%. This is a single-PSP, single-event sample.

  Bizum does not outweigh cards, so card stays first (per spec).
- **Order card → PayPal → Bizum (changed in fact-check).** The builder had Bizum second. The fact-check moved PayPal ahead of it for two reasons:
  - The builder's own sources put wallets, mostly PayPal, ahead of Bizum: PPRO has wallets at 31% and Bizum at 10.3% of shoppers. The 22% Bizum figure comes from a single PSP's Black Friday sample.
  - This is a subscription checkout, and PayPal billing agreements renew reliably. Bizum recurring is only confirmed at some banks and is a private preview on Stripe.

  Bizum stays in the list, third. Move it back to second only if our PSP confirms Bizum recurring.
- **Bizum renewals: caveat.** Bizum's conditions allow a mandate for periodic payments to the same merchant (Xataka on Bizum T&Cs). CaixaBank's press release of 4 Sep 2026 (9.52M Bizum users, 17.67M online payments in H1 2026) mentions recurring subscription payments, citing Amazon among the first services. BBVA announced subscription payments with Bizum in 2024. Stripe lists Bizum only as a **private preview**, and I found no confirmed recurring support there. Product impact: offer Bizum at checkout only if our PSP supports Bizum recurring. Otherwise, take the first payment by Bizum and ask for a card (or send a renewal pay-link) before the plan renews. Verify with the PSP.
- **PayPal kept, now second.** MONEI's Black Friday data shows PayPal at about 1%, but that is one Bizum-heavy PSP. PPRO groups wallets at 31%, and PayPal is the long-established online wallet in Spain. Confidence: medium.
- **Wallets: Apple Pay and Google Pay.** Both are widely supported by Spanish banks and visible in checkout data (MONEI). Samsung Wallet payments do exist in Spain: historically Santander, CaixaBank, Sabadell, Openbank, Abanca and others, and recently N26. But they are an in-store NFC wallet and rarely appear as a web-checkout button, so samsung is left out (conservative).
- **BNPL: Klarna Pay in 3.** Klarna launched "Paga en 3 plazos" in Spain with no interest or fees: first instalment at checkout, then at 30 and 60 days, for residents aged 18+ (Klarna ES co-marketing PDF, FNAC, Sephora.es, HelpMyCash). seQura (Spanish) and Aplazame are also common, but they usually charge a per-instalment fee, so they are left out. Caveat: EU CCD2 brings BNPL under consumer-credit rules from 20 Nov 2026, so check Klarna eligibility and disclosures after that date.
- **localCardBrand: null.** Spain has no domestic card brand at checkout. The old networks (ServiRed, Sistema 4B, Euro 6000) are processing/ATM networks; the cards are Visa or Mastercard, processed largely by Redsys. Bizum is an account-to-account method, so it goes in `methods`, not here.

## Tax (prior knowledge, high confidence)
- Standard Spanish VAT (IVA) is **21%**, the rate for B2C digital services supplied to consumers in mainland Spain and the Balearic Islands. Consumer prices must be shown VAT-inclusive (TRLGDCU), so `incl: true`.
- **Edge case:** the Canary Islands (IGIC), Ceuta and Melilla (IPSI) are outside the EU VAT area. Customers located there should be charged the local indirect tax (IGIC general rate 7%), not 21% IVA. This is not modelled in the pack and is left for billing.

## Work rights (prior knowledge, medium-high confidence; verify against extranjeros.inclusion.gob.es)
- **autoFor:** Spanish, EU27, EEA (IS, LI, NO) and Swiss citizens work without a permit. For stays over 3 months they register with the Registro Central de Extranjeros and get the *certificado de registro de ciudadano de la Unión* with their NIE (RD 240/2007). That is why that option's sub-label mentions the NIE.
- **Residence card (TIE) that allows work:** this one option groups several statuses that are free to work:
  - long-term residence (*residencia de larga duración* / *larga duración-UE*)
  - EU-family residence cards (*tarjeta de familiar de ciudadano de la Unión*, RD 240/2007)
  - family members of Spanish citizens, a separate regime since the new Reglamento de Extranjería (RD 1155/2024)
  - most *arraigo* permits
  - Withdrawal Agreement TIEs held by UK nationals resident before 2021

  I grouped them because the TIE card itself states whether it authorises work.
- **Student permit, up to 30 h/week:** RD 1155/2024 (Reglamento de Extranjería, in force 20 May 2025) lets students work up to 30 hours a week if compatible with their studies (previously 20 h). Confidence: medium-high. Verify.
  - The fact-check renamed the option from "Student stay permit" to "Student permit" (fr: "Titre de séjour étudiant"). My recollection is that the new regulation turned the old *estancia por estudios* into a residence authorisation for studies. If so, "stay permit" is the wrong term. The generic label is correct either way.
- **Highly qualified professional (HQP) / EU Blue Card:** Ley 14/2013 (Ley de Emprendedores), as amended by Ley 11/2023 to transpose the recast Blue Card Directive 2021/1883. Applications go to the UGE-CE (Unidad de Tramitación de Grandes Empresas y Colectivos Estratégicos). The authorisation is linked to the employer, so a new employer normally files a new application. Under the Directive, Blue Card holders can change employer with notification only after 12 months. That is why the sub-label says "usually". I deliberately left salary thresholds out of the copy because I could not verify the 2026 figures. Verify.
- **Needs sponsorship (last):** for non-EU finance hires the realistic route is the HQP/UGE-CE route, which has no labour-market test. The general *cuenta ajena* work permit requires the *situación nacional de empleo* test unless the job is on the *Catálogo de Ocupaciones de Difícil Cobertura*, and finance roles normally are not.
- **Matching rule:** Spain has no public register of licensed sponsors (unlike the UK or NL). Spanish ads often say "imprescindible permiso de trabajo" / "permiso de trabajo en vigor", so the rule skips those when the user needs sponsorship and favours larger, internationally hiring employers, which are the ones able to use the UGE-CE route.
- Option order: citizen → EU/EEA/CH → TIE free to work → student → HQP/Blue Card → needs sponsorship.

## Nationalisation
- **null.** Spain has no nationality quota. The *situación nacional de empleo* labour-market test and the shortage-occupation catalogue are immigration checks, not quotas. The 2% disability hiring quota (Ley General de Discapacidad) is unrelated to nationality.

## Sensitive fields (prior knowledge, medium confidence on norms, high on law)
- **photo: optional.** Photos on Spanish CVs are still common (more so than in NL or the UK), but they are not required, and multinationals and anonymous-CV initiatives are moving away from them. "Common" would push users to add a photo, so the conservative choice is "optional": allowed, never asked.
- **dob / nationality / marital / gender: none.**
  - The Workers' Statute (Estatuto de los Trabajadores, art. 4.2.c and 17.1) bars discrimination in access to employment on sex, marital status, age, origin and other grounds.
  - Ley 15/2022 (integral law on equal treatment) extends this.
  - LISOS (RDL 5/2000) art. 16.1.c makes it a very serious offence to request personal data in selection processes that amounts to discrimination on those grounds.

  Older CV templates still carry date of birth, DNI, nationality and marital status. InfoJobs profiles store date of birth, but employer application forms do not normally require it. We ask about right to work instead of nationality.

## Legal (prior knowledge)
- **Privacy:** GDPR (RGPD) plus Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD). The regulator is the AEPD. High confidence.
- **Renewal copy:** it covers three rules:
  1. The **14-day withdrawal right** (TRLGDCU, RDL 1/2007, art. 102 ff.). High confidence.
  2. TRLGDCU art. 62: the consumer must be able to cancel **in the same way they contracted**, without disproportionate obstacles. High confidence.
  3. A **renewal reminder at least 15 days before** the renewal of 4- and 12-month plans. My recollection is that the customer-service law (Ley de Servicios de Atención a la Clientela, passed late 2025) added a duty to give advance notice of automatic renewals. **I could not verify this, so verify it.** The 15-day reminder is a cheap way to comply either way, but it is a product commitment: billing must send that email.

  The EU withdrawal-button rule (Directive 2023/2673, applies from 19 Jun 2026) also applies to online sign-ups. I did not confirm Spanish transposition status.

## Salary (sal.f = 0.16, per year)
- Target: Senior Financial Analyst / FP&A, ~8 years, Madrid, base salary.
- Benchmarks (prior knowledge of 2025 salary guides from Hays Spain, Michael Page Spain and Robert Walters Spain; **not re-verified live**):
  - senior financial / FP&A analysts in Madrid: roughly EUR 40-55k gross a year
  - FP&A managers: roughly EUR 55-75k
  - Barcelona similar or slightly lower; Valencia, Bilbao, Málaga and Seville lower
- Chosen: **about EUR 50,000 gross a year** (EUR 4,160 a month on 12 payments). f = 4,160 / 26,000 = 0.16. Noura's 34,000 SAR expectation maps to about EUR 65k, which is plausible for an 8-year, CFA-track analyst moving to a senior FP&A or FP&A-manager role.
- per = year because Spanish offers and ads quote *bruto anual*. Payment is often in 14 instalments (12 + 2 *pagas extra*), so a monthly figure is ambiguous.
- Confidence: medium. Verify with a 2026 guide.

## Other choices
- **Cities:** ordered by my estimate of finance/FP&A job density, a judgement call rather than a measured ranking:
  - Madrid: most HQs and banks
  - Barcelona
  - Valencia: Mercadona, and CaixaBank's registered seat
  - Bilbao: Iberdrola, BBVA's registered seat, Kutxabank
  - Málaga: tech hub, Unicaja
  - Seville
  - Zaragoza: logistics, Ibercaja
  - A Coruña: Inditex in Arteixo

  Arabic names follow common Arabic usage: مدريد، برشلونة، فالنسيا، بلباو، مالقة، إشبيلية، سرقسطة، لا كورونيا. French names: Barcelone, Valence, Malaga, Séville, Saragosse, La Corogne.
- **Employers:** the checklist is met as follows:
  - energy: Repsol, Iberdrola
  - banks: Santander, BBVA, CaixaBank; no Islamic bank (not relevant in Spain)
  - telecoms: Telefónica #1 by revenue, MasOrange #2 (the Orange–MásMóvil merger, 2024)
  - public investment: SEPI, the state holding
  - government: Banco de España and Aena (state-controlled via ENAIRE)
  - Big 4: PwC
  - FMCG: Puig
  - retail: Inditex, Mercadona
  - airline: Iberia
  - hospital: Quirónsalud, the largest private hospital group
  - insurer: MAPFRE
  - tech: Amadeus; tech scale-up: Cabify
  - fintech: seQura
  - delivery app: Glovo
  - exchange: BME, owned by SIX since 2020
  - industrial: Acerinox
  - real estate: Merlin Properties

  Arabic spelling: Iberia is إيبيريا (as in شبه الجزيرة الإيبيرية), corrected in fact-check from أيبيريا.

  Cities are where the finance jobs mostly sit. BBVA and Santander have registered seats in Bilbao and Santander but corporate HQs in the Madrid region. CaixaBank is registered in Valencia but its main corporate offices are in Barcelona. Logo colours are approximate brand colours.
- **Boards:** LinkedIn, then InfoJobs (Spain's largest domestic job board), Indeed and InfoEmpleo, plus eFinancialCareers for banking and finance. Order is by prior knowledge; I did not verify traffic shares.
- **lang2: Spanish.** Expected at most employers. Catalan and Basque are mentioned in the culture notes.
- **Certs:**
  - CFA: valued in corporate finance and banking.
  - ACCA: common among internationals and Big 4.
  - EFA (EFPA España): the standard MiFID II advisor qualification in Spanish banking.
  - ROAC: the official auditor register, under ICAC.
- **Unis:** Comillas ICADE (ADE, finance-heavy), Carlos III University of Madrid (UC3M), ESADE (Ramon Llull).
- **Persona:** Lucía Fernández, f, ES, Madrid (from the roster). The employer "Grupo Navacerrada" is fictional: Navacerrada is a mountain pass and town near Madrid. I could not check whether any company uses the name. Degree: ADE at ICADE, cert CFA. The bio cites IFRS and the Spanish PGC (Plan General de Contabilidad).
- **Notice:** under Workers' Statute art. 49.1.d, resignation notice is whatever the collective agreement or local custom sets. 15 days is the common default, and some agreements set 1-2 months for graduate or senior staff. noticeDays = 15. Confidence: medium. If the product uses this for "available from", 30 would be safer for senior hires.
- **Phone:** Spanish mobiles are +34 followed by 9 digits starting with 6 or 7.
- **People:** typical Spanish first names and surnames, plus one Catalan name (Núria Vidal) and one Basque name (Iñaki Etxeberria). Only the first surname is given, matching the persona format.

## Search results used
- Stripe, "Ecommerce payment gateways in Spain": https://stripe.com/resources/more/ecommerce-payment-gateways-in-spain
- PPRO Spain country report: https://www.ppro.com/countries/spain/
- Cross-border Magazine, "E-Commerce Payment Landscape in Spain 2025": https://cross-border-magazine.com/?p=12213
- MONEI, Black Friday / Cyber Monday 2025 payment trends: https://monei.com/blog/black-friday-cyber-monday-payment-trends-2025/
- CaixaBank press release, Sep 2026 (Bizum): https://www.caixabank.com/docs/comunicacion/92426.pdf (via search summary; the fetch failed)
- esdiario, CaixaBank Bizum 9.5M users: https://www.esdiario.com/economia/260907/197158/caixabank-consolida-liderazgo-pagos-moviles-9-5-millones-usuarios-bizum.html
- Xataka, Bizum recurring payments: https://www.xatakamovil.com/aplicaciones/casi-nadie-sabe-se-pueden-programar-pagos-recurrentes-bizum
- BBVA, Bizum in e-commerce: https://www.bbva.com/es/es/economia-y-finanzas/el-25-de-los-pagos-en-comercio-electronico-de-bbva-en-espana-ya-se-hacen-con-bizum/
- Infobae, Bizum volume 2025: https://www.infobae.com/espana/agencias/2026/01/19/el-volumen-de-operaciones-con-bizum-crecio-un-53-en-2025-y-se-situo-en-67751-millones/
- Stripe Bizum docs (private preview): https://edge-docs.stripe.com/payments/bizum
- Klarna ES co-marketing PDF: https://docs.klarna.com/assets/objects/7f019a4d-e484-496f-93ef-4f20a3c0718e/CoMarketing_LaunchEmail_Design_ES+%282%29.pdf
- Roams, FNAC integrates Klarna (3 plazos): https://roams.es/actualidad/finanzas/fnac-integra-klarna-fraccionar-compras-3-plazos-sin-intereses/
- Sephora.es, Klarna: https://www.sephora.es/paga-con-klarna-sin-intereses.html
- HelpMyCash, Klarna arrives in Spain: https://www.helpmycash.com/blog/klarna-llega-a-espana-para-ofrecer-pagos-a-plazos-en-inditex-ikea-hm-aliexpress-adidas/
- El Grupo Informático, Samsung Wallet + N26: https://www.elgrupoinformatico.com/samsung-galaxy/samsung-wallet-banco-n26/
- Xataka, Samsung / Apple / Google Pay in Spain: https://www.xatakamovil.com/aplicaciones/samsung-apple-y-google-pay-en-espana-estado-actual-de-los-principales-sistemas-de-pago-movil/amp
