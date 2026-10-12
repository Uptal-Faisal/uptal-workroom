# EG (Egypt): sources and reasoning

Written 2026-10-12. **No live research was possible for this pack.** The shared WebSearch budget for this run was already used up. WebFetch could not resolve hosts (support.apple.com returned ENOTFOUND), and the egress proxy refused direct fetches (taxsummaries.pwc.com returned CONNECT 403). Everything below comes from background knowledge up to mid-2026. It is **not verified against a live source**. Each fact has a confidence level. Where I was unsure I took the conservative option. Please verify the items marked **[verify]** before launch. Currency and price tier come from `base.json` (EGP, p1 1,299, `lang: "ar"`, neutral Arabic) and are unchanged.

## Payments
- **Cards first (high confidence).** Egyptian banks issue Visa and Mastercard debit, credit and prepaid cards, and these work online through local gateways (Paymob, Fawry, Geidea, PayTabs and others) with 3-D Secure. Amex is issued in Egypt only through a few banks, so it is left out. Brands are `["visa","mc","meeza"]`.
- **Meeza (high confidence it exists and is widespread; medium on online acceptance for a foreign merchant).** Meeza (ميزة) is Egypt's national card scheme, run by Egyptian Banks Company (EBC) under the Central Bank of Egypt. Government salaries and pensions and many prepaid cards are on Meeza, so it reaches users without a Visa or Mastercard. Meeza cards work online with Egyptian merchants and gateways. Set `localCardBrand: "Meeza"`, as the spec suggests. **[verify that Uptal's gateway accepts Meeza, especially for recurring charges]**
- **Fawry tile (high confidence it is ubiquitous; medium on fit).** Fawry (فوري) is the largest e-payments network. A checkout gives a reference number that the user pays in cash at any of Fawry's very many outlets (kiosks, pharmacies, supermarkets) or in the myfawry app. This suits users without an online-enabled card. It is not a card-on-file method, so each renewal is a new payment (stated in `legal.renewal`).
- **Mobile wallet tile (medium-high confidence).** Mobile wallets are very common in Egypt, led by Vodafone Cash, followed by the Orange, e& and WE wallets and bank wallets. Paymob and other gateways offer a "mobile wallet" checkout that confirms by OTP. The sub-line names only Vodafone Cash, to avoid getting the other operators' current wallet brand names wrong (e& has rebranded its wallet). Not recurring, so it is covered by the renewal note.
- **InstaPay left out (medium confidence).** InstaPay (CBE's instant payment network, 2022) is very popular for person-to-person transfers. I could not confirm a standard gateway checkout flow for subscriptions. **[verify; add it later if the gateway supports it]**
- **Apple Pay / Google Pay `[]` (low confidence, conservative).** I recall reports of Apple Pay and/or Google Pay arriving in Egypt with some banks around 2024-2025, but I could not confirm which wallets are live or with which issuers. Showing a wallet that fails for most Egyptian cards is worse than leaving it out. **[verify on Apple's and Google's country lists; if live, set `["apple"]` and/or `["google"]`]**
- **BNPL `[]` (medium confidence, conservative).** Egypt has a large consumer-finance BNPL market (valU, Sympl, souhoola, contact, Aman, Halan). They mostly finance one-off purchases over months, often with fees or interest that depend on the merchant agreement. None is a proven fit for a recurring subscription, and I could not confirm interest-free terms. **[verify valU or Sympl for the 4-month and 12-month totals; if signed, add with the merchant's real terms]**
- **Recurring billing risk.** Many Egyptian debit and prepaid cards have low online or foreign-currency limits. CBE has at times capped foreign-currency card spending abroad. Billing in EGP through a local gateway avoids most of this.

## Tax
- **VAT 14% (high confidence).** Value Added Tax Law No. 67 of 2016 replaced the sales tax. The standard rate was 13% for FY2016/17 and has been 14% since July 2017. Consumer prices are shown tax-inclusive, so `incl: true`, label "VAT included" / "شامل ضريبة القيمة المضافة" / "TVA incluse".
- **Non-resident digital services (medium confidence).** Egypt amended the VAT law (Law No. 3 of 2022, as I recall) to require non-resident providers of electronic services to consumers to register under a simplified regime with the Egyptian Tax Authority and charge 14%. Showing 14% included is correct either way, as long as Uptal registers and remits, or the local gateway entity sells the service. **[verify with ETA / PwC Worldwide Tax Summaries Egypt]**

## Work rights
- **Legal basis (high confidence on the principle; medium on the current instrument).** A foreigner may work in Egypt only with a work permit from the Ministry of Labour (named the Ministry of Manpower until the 2024 cabinet change, as I recall). The employer applies. The permit is normally for one year, renewable, and tied to that employer. It is granted only when the role needs a skill not available among Egyptians. This was in Labour Law No. 12 of 2003 and its ministerial decrees. A new Labour Law (No. 14 of 2025, in force from about September 2025, medium confidence on number and date) replaced Law 12/2003. I assume the work-permit principle carries over. **[verify the new law and its implementing decrees]**
- **Options.**
  1. Egyptian citizen. Egypt allows dual nationality (an Egyptian needs permission to keep Egyptian nationality when taking another, but dual nationals are Egyptian citizens), so the sub-line includes dual nationals (high confidence).
  2. Foreign national who holds a valid Egyptian work permit. Permits are employer-specific, so a new employer applies for a new permit (medium-high confidence).
  3. Married to an Egyptian, or born and resident in Egypt. The ministerial rules on foreigners' work permits give some categories easier treatment, which as I recall includes spouses of Egyptians and foreigners born in Egypt (medium-low confidence on the details). The sub-line only says "some conditions and fees may be eased" and still says a permit is needed. **[verify the current decree; tighten or drop this option]**
  4. Needs an employer to get a permit (last option). The sub-line mentions the "no qualified Egyptian" test and the 10% cap.
- **Left out (conservative).** Refugees and asylum-seekers (many Sudanese, Syrians and others) can in principle get permits but face heavy restrictions, and the 2024 Asylum Law is new. Sudanese nationals have the 2004 "Four Freedoms" agreement, but in practice they still need permits. Both fall under option 2 or 4 without special wording. Egypt is not in a free-movement bloc, so `autoFor: ["EG"]` only.
- **Rule text.** For permit-needing users we focus on multinationals and regional offices, the realistic route for a foreign finance specialist, and skip public-sector and Egyptians-only roles.

## Nationalisation (foreign-worker quota)
- **Medium-high confidence on the 10% cap and the training expectation.** Ministerial decrees under Law 12/2003 capped foreign workers at 10% of an employer's workforce and required each foreign expert to have Egyptian assistants trained to take over (the "two Egyptian assistants" rule, as I recall). The Investment Law (No. 72 of 2017) also uses a 10% foreign-staff limit for investment projects, which can rise to 20% in some cases when Egyptians are not available (medium confidence).
- The user-facing copy says only "no more than 10%", "only when no qualified Egyptian is available" and "train Egyptian staff". It quotes no decree number. **[verify that the 10% cap survives under Labour Law 14/2025 before quoting it anywhere]**

## Sensitive fields
- **Photo `common`; gender, dob and nationality `ask`; marital `none` (medium-high confidence on the norm, not verified this run).** Egyptian CVs follow the regional Arab format: a photo and a personal-details block (date of birth, nationality, often marital status, and military status for men). Wuzzuf profiles and local employer forms ask gender, date of birth and nationality. Nationality also drives the work-permit and quota logic. Multinationals with ATS forms often do not want a photo, but it stays common, so `common` matches JO and LY.
- Marital status is common on CVs but is not needed to apply and is a bias risk, especially for women, so we do not ask. This is conservative and matches JO, LY, TN and AE.
- **Military status (high confidence).** Egyptian men must show their conscription status (completed, exempted or postponed), and employers ask for it. The schema has no field for it. The persona is female, so it does not apply here. It is noted in `sensitive.notes` and `culture.notes` for male users. Consider a `military` field in the schema for EG men later.
- Egypt has no broad recruitment anti-discrimination statute like the EU's (the Constitution bans discrimination). We still never filter on gender or age.

## Legal
- **Data protection (high confidence on name and number).** Personal Data Protection Law No. 151 of 2020 was published in July 2020. It set up the Personal Data Protection Center (مركز حماية البيانات الشخصية), linked to ITIDA. Its executive regulations were long delayed. I believe they were issued in 2025, but I am not sure (low confidence). So the privacy line names only the law. **[verify the executive regulations and the licensing and cross-border transfer rules]**
- **Renewal.** Consumer Protection Law No. 181 of 2018 applies (high confidence on the number). It gives a 14-day return or exchange right for goods, and some rules for distance selling. I am not sure how they apply to a digital subscription (low confidence). So the disclosure is the generic "renews until you cancel; cancel anytime before the renewal date", plus the Fawry and mobile-wallet note. It makes no withdrawal promise. **[verify; add a 14-day window if counsel says it applies or the business wants it]**

## Salary (`f = 1.923`, per month): low-medium confidence
- No live salary source was reachable. The EGP moved from about 31 to about 47-50 per USD after the March 2024 float. Employers then gave large catch-up raises in 2024-2025.
- Background estimate for 2026: a financial analyst in Cairo with 3-5 years earns about 20,000-35,000 EGP gross a month. A senior analyst or FP&A lead with about 8 years at a bank, telecom, listed group or multinational earns about 40,000-65,000 EGP gross. Regional hubs of multinationals and the top private banks pay at the top of that range or above.
- Chosen: 50,000 EGP gross a month (about 1,000 USD). f = 50,000 / 26,000 = 1.923, so the current salary maps to about 50,000 EGP and the expected 34,000 SAR to about 65,400 EGP, a plausible next-step offer in Cairo.
- Egyptians often quote net pay, so the copy should confirm gross or net. Banks and large firms add bonuses and profit share worth several months' pay, which this monthly figure leaves out.
- With inflation this high, this figure ages fast. **[verify with Wuzzuf salary data, Paylab Egypt, a recruiter's salary guide (e.g. Michael Page, Hays) or a local recruiter]**

## Employers (all real; HQ city as commonly listed)
- **High confidence that each is real and hires finance staff in Greater Cairo:**
  - National Bank of Egypt: the largest bank, state-owned.
  - Banque Misr: second-largest, state-owned.
  - CIB: the largest private-sector bank.
  - Faisal Islamic Bank of Egypt: the oldest Islamic bank, operating since 1979 (one of the two largest full Islamic banks, with ADIB Egypt).
  - Vodafone Egypt: mobile #1, at Smart Village.
  - Orange Egypt: mobile #2.
  - Telecom Egypt (WE): the fixed-line incumbent, fourth mobile operator, and a large Vodafone Egypt shareholder, at Smart Village.
  - EGPC: the state petroleum authority, in Nasr City.
  - The Sovereign Fund of Egypt (TSFE), founded in 2018.
  - Central Bank of Egypt.
  - The Egyptian Exchange (EGX).
  - PwC Egypt.
  - EFG Holding: formerly EFG Hermes, the largest investment bank, HQ at Smart Village.
  - Juhayna Food Industries: dairy and juice, EGX-listed, around 6th of October City and Sheikh Zayed.
  - PepsiCo Egypt.
  - Carrefour Egypt (Majid Al Futtaim).
  - EgyptAir.
  - Cleopatra Hospitals Group: EGX-listed, the largest private hospital group.
  - Misr Insurance: state-owned, the largest insurer.
  - MNT-Halan: lending, payments and e-commerce, valued over USD 1bn in 2023.
  - Fawry: EGX-listed, at Smart Village.
  - talabat: operates in Egypt.
  - Talaat Moustafa Group: Madinaty, Al Rehab, Noor City.
  - Elsewedy Electric: HQ New Cairo.
- **Medium confidence:**
  - Rankings. Vodafone as #1 and Orange as #2 by mobile subscribers, ahead of e& and WE. NBE as #1 and Banque Misr as #2 by assets. CIB as the largest private bank.
  - Cities. CIB's head office is listed as Nile Tower, Giza (Charles de Gaulle St.), with a large Smart Village campus. Misr Insurance's main office is in Dokki (Giza). Orange Egypt's current HQ (Cairo or Smart Village) is uncertain, so it is set to `cairo`. TMG's head office could be Cairo or Giza; it is set to `cairo`. **[verify]**
  - Sector slots. Egypt's energy and resources champion is the state EGPC. It also fills the semi-government slot with CBE. EGAS (natural gas holding) is an alternative. For hospitals, Cleopatra is the clearest listed group; Saudi German Hospital and Andalusia are alternatives. For mining and industrial, Elsewedy fits; Ezz Steel or AngloGold Ashanti's Sukari gold mine (formerly Centamin) could swap in.
- **Not included.** e& Egypt, Nestlé, Unilever, P&G, Edita, Eastern Company, Mansour Group, Orascom Construction, Qalaa Holdings, Palm Hills, SODIC, Emaar Misr, the other Big 4 firms (KPMG Hazem Hassan, Deloitte Saleh Barsoum, EY Allied), ADIB Egypt, Breadfast, Swvl, Jumia and Noon are all real and could swap in.
- Logo colours are approximate, brand-ish colours, not official brand values. The NBE, Juhayna, EFG, Cleopatra, Misr Insurance, MNT-Halan, TMG and Elsewedy colours are the least certain.

## Cities
- Cairo and Giza hold almost all finance HQs. Smart Village, Sheikh Zayed and 6th of October are in Giza governorate. New Cairo and the New Administrative Capital are listed under Cairo, as Wuzzuf does. Ministries, the CBE and the large state banks have moved or are moving offices to the New Administrative Capital (medium confidence on how far this has gone).
- Alexandria is third (port, Borg El Arab and Amreya industry).
- After Alexandria the order is a judgement call:
  - 10th of Ramadan: the largest industrial city, with plant controllers and finance roles.
  - Suez and Ain Sokhna: SCZone, ports, steel and petrochemicals.
  - Mansoura: the largest Delta city.
  - Hurghada: hotel and resort finance.
  - Port Said, Ismailia (Suez Canal Authority), Tanta and Sharm El Sheikh are possible swaps.
- **French forms.**
  - Le Caire, Gizeh, Alexandrie and Mansourah: established French forms (high confidence).
  - Hurghada and Suez: the same in French.
  - "10 de Ramadan" and "6 Octobre": as I recall they are used by French-language Egyptian press (Al-Ahram Hebdo), medium-low confidence. "10-Ramadan" or the English form are alternatives. **[verify]**
  - Cheikh Zayed, Aïn Sokhna and Charqiya: standard French transliterations.

## Other
- **Work week `sun-thu` (high confidence).** The official weekend is Friday-Saturday for government and banks. Most corporates follow it, and some private firms work Saturday (noted in culture).
- **Notice `60` (medium-low confidence).** Labour Law 12/2003, Article 111: notice of 2 months if continuous service is up to 10 years, 3 months beyond. Labour Law 14/2025 now applies, and I could not confirm whether it changed the notice period. In practice many contracts set 1-2 months and employers often negotiate earlier starts. I kept 60, the legal default as far as I know. **[verify under Law 14/2025; switch to 30 if the new law or market practice says one month]**
- **Phone.** +20. Mobile numbers are 10 digits after the country code: 10 (Vodafone), 11 (e&), 12 (Orange), 15 (WE) (high confidence). The example is "+20 100 123 4567".
- **Boards.**
  - LinkedIn: multinationals, banks and large groups.
  - Wuzzuf: the leading Egyptian job board.
  - Bayt: the main regional board.
  - Indeed (eg.indeed.com) and Glassdoor are left out because I could not confirm their weight in Egypt; Forasna (by Wuzzuf) is blue-collar.
  - High confidence on LinkedIn and Wuzzuf, medium on Bayt's relative weight.
- **lang2: Arabic.** This matches JO, LY and AE. English is asked separately and is the key screening point for finance roles (noted in culture). Arabic matters for local and public employers, and for non-Arab applicants.
- **govPlatforms `[]` (conservative).** Work permits are employer-side. I know of no government platform that finance job-seekers use when applying.
- **Certifications.**
  - CMA (US): very strong in Egypt, with many local training providers. It is the persona's cert.
  - ACCA: a large Egyptian student base.
  - CFA.
  - CPA (US): popular with auditors.
  - The local registration (Register of Accountants and Auditors, and ESAA fellowship) matters for statutory auditors, not FP&A, so it is left out.
- **Universities (high confidence).**
  - Cairo University: Faculty of Commerce, the persona's university.
  - Ain Shams University: Faculty of Commerce.
  - The American University in Cairo: School of Business.
  - Alexandria University is a possible swap.
- **Accounting standards (high confidence).** Egyptian companies report under Egyptian Accounting Standards (EAS), which are based on IFRS, and listed groups and multinationals also report to IFRS. So the bio says "EAS and IFRS reporting". The EGP/USD scenario line reflects the 2022-2024 devaluations, a very real FP&A concern in Egypt.
- **Persona.** Mariam Hassan, female, Egyptian, Cairo, from roster.json. Arabic name مريم حسن is added under `persona.ar` (as in the GCC packs), since EG's UI language is Arabic. The degree is "BCom in Accounting" (بكالوريوس التجارة، شعبة المحاسبة), the standard Egyptian commerce degree. The employer "Mokattam Holding Group" (named after the Mokattam district of Cairo) and its subsidiary "Mokattam Trading" are fictional.
- **People.** Ten common Egyptian names, five women and five men, each with an Arabic spelling under `ar`.
- **Arabic register.** "neutral" per `base.json`, closer to formal; no Egyptian dialect in UI strings. The rights options use gender-neutral first-person phrasing where possible ("أحمل الجنسية المصرية"), as in DZ. Proper names follow local usage: القاهرة، الجيزة، الإسكندرية، العاشر من رمضان، السويس، المنصورة، الغردقة، القرية الذكية، العاصمة الإدارية الجديدة. The country is "l'Égypte" / "en Égypte" in French.

## Fact-check pass (2026-10-12)
No live checks were possible in this pass either: the shared WebSearch budget was used up, WebFetch could not resolve hosts, and the egress proxy refused direct fetches by policy (en.wikipedia.org and support.apple.com returned CONNECT 403). The review below is a check against background knowledge and the sibling packs, so the **[verify]** items above stay open.
- **Changed: the 10% cap is now "generally" / "as a general rule"** in `rights.opts[3].sub`, `rights.rule` and `nationalisation.desc`, in all three languages. The 10% limit is the general rule under the ministerial decrees on foreigners' work permits, but it is not absolute. Investment Law No. 72 of 2017 (Art. 8, as I recall) lets investment projects go up to 20% when qualified Egyptians are not available, and some project types have their own rules. The copy gives no 20% figure because it could not be checked live.
- **Checked, no change:**
  - VAT 14%, shown as included.
  - Payments: Meeza is a national scheme (the engine knows the `meeza` brand), plus Fawry reference codes and mobile wallets (the engine has `fawry` and `mwallet` tiles).
  - `autoFor: ["EG"]` only.
  - Ministry of Labour name, after the 2024 rename from Ministry of Manpower.
  - Labour Law No. 14 of 2025, in force from 1 September 2025.
  - Smart Village (Giza) for Vodafone, WE, Fawry and EFG Holding; CIB in Giza; Elsewedy in New Cairo.
  - Current names: EFG Holding, MNT-Halan, talabat.
  - Arabic and French spellings of cities and employers.
  - Feminine persona title (محللة مالية / Analyste financière).
  - Neutral, formal-leaning Arabic register.
  - 50,000 EGP gross a month is a plausible central figure for 8 years in Cairo, about USD 1,000. That is below the JO and MA packs in USD, as expected after the 2024 float.
- **Open doubts (highest first):**
  1. Apple Pay and Google Pay may have launched in Egypt with local banks in 2025. If so, `wallets` should include them. Kept `[]` as the conservative option.
  2. Whether Labour Law 14/2025 and its new decrees kept the 10% cap and the 2-month notice period (`noticeDays: 60`).
  3. Head-office city for Orange Egypt (Cairo or Smart Village), TMG (possibly Dokki, Giza) and Misr Insurance (Dokki or Cairo).
  4. Carrefour Egypt is still under the Carrefour brand. Majid Al Futtaim replaced it with HyperMax in JO, OM, KW and BH, but I know of no such change for Egypt.
  5. Salary level, which ages fast with inflation.
