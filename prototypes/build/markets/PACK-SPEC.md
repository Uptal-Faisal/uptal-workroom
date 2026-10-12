# Market pack (core) — spec

File: `markets/packs/XX.core.json` (XX = market code). UTF-8 JSON, no comments. Also write `markets/packs/XX.sources.md`
with the sources / reasoning behind every non-obvious fact (payments, tax, work rights, nationalisation, sensitive fields, salary).

Context: Uptal Auto-Apply tailors a CV per job and auto-applies for the user. The prototype persona is a finance
professional (Financial Analyst / FP&A track, ~8 years, currently employed). Every user-facing string comes in
`{"en":..., "ar":..., "fr":...}`.
- `ar`: GCC markets (SA AE QA KW BH OM) → Gulf Arabic register like the v5 app (friendly, light dialect).
  All other markets → neutral "white" Arabic, closer to formal (what pan-Arab apps use). Correct spelling of
  proper names in Arabic as locally used (e.g. لندن، فرانكفورت، الدار البيضاء).
- `fr`: natural French (France), vouvoiement. Proper names in their French form (Londres, Francfort, Le Caire).

```jsonc
{
 "code": "GB",
 "flag": "🇬🇧",
 "name":  {"en":"United Kingdom","ar":"...","fr":"Royaume-Uni"},      // standalone country name
 "short": {"en":"the UK","ar":"...","fr":"le Royaume-Uni"},           // in-sentence ("across the UK")
 "in":    {"en":"in the UK","ar":"...","fr":"au Royaume-Uni"},        // locative phrase
 "dem":   {"en":"British","ar":"بريطاني","arf":"بريطانية","fr":"britannique","frf":"britannique"}, // nationality adjective (m / f)
 "nationals": {"en":"British citizens","ar":"...","fr":"..."},
 "region": "uk",
 "workweek": "mon-fri",                       // or "sun-thu"
 "cities": [                                   // 6-8, ordered by density of finance/FP&A jobs; first = primary city
   {"id":"london","en":"London","ar":"...","fr":"Londres","metro":{"en":"London covers Greater London.","ar":"...","fr":"..."}}
 ],
 "employers": [                                // 24 REAL large employers that hire finance / FP&A in this market, varied sectors
   {"id":"hsbc","en":"HSBC","ar":"...","fr":"HSBC","sector":"bank","archetype":"global bank HQ","city":"london",
    "logo":{"bg":"#DB0011","fg":"#FFFFFF","mono":"HSBC"}}       // brand-ish colour, 1-4 letter monogram
 ],
 "sectorsCovered": "make sure the 24 include: national champion(s) in energy/resources if any, the 2-3 largest banks, an Islamic bank if relevant, telecoms #1 and #2, a sovereign/public investment body if any, a big-4 firm, a consumer/FMCG major, a retailer, an airline, a hospital group, an insurer, a tech scale-up, a fintech, a food-delivery/e-commerce app, a real-estate/giga-project developer if any, a stock exchange, a mining/industrial, a government/semi-government body",
 "sal": {"per":"year","f":0.176,"basis":"why: market pay for a Senior Financial Analyst / FP&A, 8 yrs, primary city, in local currency; f = local monthly equivalent / 26000 (Noura earns 26,000 SAR a month in Riyadh and expects 34,000)"},
 "tax":   {"incl":true,"rate":20,"label":{"en":"VAT included","ar":"...","fr":"TVA incluse"}},   // incl=false for US/CA style "+ tax"
 "pay": {
   "wallets": ["apple","google"],             // which of apple / google / samsung are standard here
   "methods": [                                 // in the order checkout should show them; cards first unless a local method dominates
     {"id":"card","label":{"en":"Card","ar":"...","fr":"Carte"},"sub":{"en":"Visa, Mastercard, Amex","ar":"...","fr":"..."},"brands":["visa","mc","amex"]},
     {"id":"paypal","label":{"en":"PayPal","ar":"PayPal","fr":"PayPal"},"sub":{"en":"Pay with your PayPal account","ar":"...","fr":"..."}}
   ],
   "bnpl": [ {"id":"klarna","name":"Klarna","installments":3,"sub":{"en":"Pay in 3, interest-free","ar":"...","fr":"..."}} ], // [] if no subscription-capable BNPL is common
   "localCardBrand": null                      // e.g. "mada" (SA), "KNET" (KW), "BENEFIT" (BH), "CB" (FR), "Bancontact" (BE), "Meeza" (EG)
 },
 "phone": {"cc":"+44","ex":"+44 7700 900 123"},
 "rights": {                                   // the post-payment "Can you work here?" card for people who are NOT auto-answered
   "q": {"en":"Your right to work in the UK","ar":"...","fr":"..."},
   "opts": [ {"en":"British or Irish citizen","ar":"...","fr":"...","sub":{"en":"","ar":"","fr":""}} ],   // 3-7 real statuses, last = needs sponsorship
   "autoFor": ["GB","IE"],                      // citizenships answered automatically (citizens, GCC-in-GCC, EU/EEA/CH-in-EU etc.)
   "autoText": {"en":"British and Irish citizens can work in the UK without a visa.","ar":"...","fr":"..."},
   "rule": {"en":"We skip UK jobs that say they can't sponsor, if you need sponsorship.","ar":"...","fr":"..."}  // matching rule shown under the card
 },
 "nationalisation": null,                      // or {"name":{...},"desc":{...}} e.g. Saudization/Nitaqat, Emiratisation, Qatarization, Kuwaitization, Bahrainization, Omanization, Jordan's closed professions, Lebanon's reserved professions, Egypt's foreign-worker quota
 "sensitive": {                                // what applications here normally ask; we only ask what's normal
   "photo": "avoid",                           // common | optional | avoid  (avoid = never ask, bias/legal norm)
   "gender": "none",                           // ask (forms require it) | eeo (US voluntary self-ID) | none
   "dob": "none",                              // ask | none
   "nationality": "none",                      // ask | none
   "marital": "none",                          // ask | none
   "notes": "why"
 },
 "legal": {
   "law": "UK GDPR + Data Protection Act 2018",
   "privacy": {"en":"one-line privacy reassurance naming the law","ar":"...","fr":"..."},
   "renewal": {"en":"one-line auto-renew disclosure appropriate here (e.g. US state auto-renewal laws, EU 14-day withdrawal)","ar":"...","fr":"..."}
 },
 "boards": ["LinkedIn","Indeed","Reed","Totaljobs","eFinancialCareers"],   // the main job sources here
 "lang2": null,                                // local language whose level matters on applications, e.g. {"en":"German","ar":"...","fr":"allemand"}
 "certs": [ {"id":"acca","en":"ACCA","ar":"...","fr":"ACCA"} ],          // 3-4 finance certifications that matter here (local SOCPA/CMA/CFA equivalents)
 "unis": [ {"id":"lse","en":"London School of Economics","ar":"...","fr":"..."} ],   // 3 well-known universities for finance/accounting degrees
 "govPlatforms": [],                           // e.g. Qiwa/GOSI (SA), MOHRE/ICP (AE); empty if not part of job seeking here
 "persona": {
   "first":"Sophie","last":"Carter","gender":"f","nat":"GB","city":"london",
   "email":"sophie.carter@email.com","phone":"+44 7700 900 123",
   "title":{"en":"Financial Analyst","ar":"...","fr":"Analyste financière"},          // use the persona's gender in ar/fr
   "years":8,
   "employer":{"en":"(fictional) e.g. 'Acme Financial' localized, plausible here","ar":"...","fr":"..."},
   "employer2":{"en":"its subsidiary","ar":"...","fr":"..."},
   "degree":{"en":"BSc Accounting and Finance","ar":"...","fr":"..."}, "uni":"lse", "cert":"acca",
   "tools":"SAP, Excel, Power BI",
   "bio":{"en":"2-3 sentences in the voice of Noura's: 'Financial Analyst with 8 years in Riyadh. I lead IFRS reporting and budgeting on SAP across business units and own the monthly close for a 40-person function. ...' adapted to this market (local GAAP/IFRS, city, tools)","ar":"...","fr":"..."}
 },
 "people": [                                    // 10 local names (mixed gender) for recruiters/contacts/advisors, culturally typical here
   {"first":"Emma","last":"Walsh","gender":"f"}
 ],
 "culture": {"notes":"anything that changes job-search copy: work week, notice-period norms (e.g. 3 months in DE), payday, CV norms (photo, length), cover letters expected?, typical notice in days"},
 "noticeDays": 30
}
```

Accuracy matters more than volume. Use WebSearch / WebFetch (load them with ToolSearch "select:WebSearch,WebFetch")
for payments, tax rates, work-permit statuses, nationalisation rules, CV norms and salaries. When unsure, say so in
sources.md and choose the conservative option.
