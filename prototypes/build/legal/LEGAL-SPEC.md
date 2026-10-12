# Uptal legal: multi-market expansion — spec

Not legal advice. Every output is a draft for review by licensed counsel in each jurisdiction before publication.

## Founder decisions (this project)
- **Contracting entity everywhere:** Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), Kingdom of Saudi Arabia, is the
  provider and merchant of record in every market. KSA law is the chosen law. Local MANDATORY consumer,
  e-commerce, subscription and data-protection rules of the customer's country apply on top because they cannot
  be contracted out of. Flag what would change with a merchant of record or local entities later.
- **Structure:** one GLOBAL CORE per document (Terms & Conditions, Privacy Policy, Refund Policy), as protective as
  the September 2026 KSA rewrite, plus a short **Country Addendum ("Local Terms")** per market that gives only what
  that country's law mandates and prevails over the core in that country, to the extent required and no further.
- **Products in new markets:** Auto-Apply only. Talent Search and CV Enhancer remain KSA-only (core keeps their
  clauses, scoped "where offered"; addenda state they are not offered there).
- **Product changes:** where a law requires product behaviour (withdrawal-right waiver at checkout, cancel button,
  renewal reminders, pre-contract information, cancellation confirmation), the policy relies on it AND the v6
  prototype implements it, only where required. Produce a per-market product-requirements list.
- **Disputes:** strongest lawful option per market. Default: KSA law, exclusive jurisdiction of the competent
  courts in Riyadh. US: binding individual arbitration with class-action and jury waivers, mass-arbitration
  batching, small-claims carve-out, 30-day opt-out (to maximise enforceability). Consumers in the EU, UK,
  Australia, Quebec and anywhere else whose law preserves home-court rights keep them; the clause says so plainly
  rather than overreaching (an overreaching clause risks an unfair-terms finding that taints the rest).
- **Languages:** EN (source), AR (formal MSA, legal quality, like the KSA Arabic), FR, and each EU market language:
  DE, NL, ES, IT, PL, SV. English controls except where the law makes the local version govern (France, Quebec,
  Belgium-FR/NL, and Arabic where GCC/MENA law requires it): the language clause must say exactly that.

## The KSA baseline (source of truth for the core)
`src/legal-ksa/unzipped/8 - Legal - Refund Policy/`:
- live: `Uptal_Terms_EN/AR.html`, `Uptal_Privacy_EN/AR.html`, `Uptal_Refund_Policy_EN/AR.html` (July 2026)
- `2026-09-07 Update/source/final_en.md` + `final_ar.md` (new Refund Policy, 19 sections),
  `terms_patch_en.md` + `terms_patch_ar.md` (9 amendments to the Terms, same release), `IMPLEMENTATION.html`
- `2026-09-07 Update/research/*` (KSA law recon, loopholes, adversarial attacks, house-rules audit). Read
  `recon_ksa_law.md` and `audit_house_rules.md` for the method and the founder rules R1-R10.
The core = July Terms with the September patch applied + July Privacy + September Refund Policy, generalised.

## Founder rules (R1-R10) and house rules — keep in the core
R1 a charge is a delivery · R2 no refund in any form · R3 exhaustive non-grounds · R4 evidentiary and procedural
armour · R5 no score guarantee · R6 corrections (duplicate / unauthorised charges) are not refunds · R7 preservation
/ read-down · R8 auto-renewal + self-service cancellation only (named path) · R9 ticket form only, no support
email · R10 no renewal notices. House: no em dashes, no en dashes, no other dash characters, no double hyphen;
merchant identity string intact; contact only https://uptal.com/contact-us; no promise of a job/interview/offer;
Arabic terms as in the audit (الكفاءات never المواهب, سيرتك الذاتية never bare سيرتك).
Where a market's mandatory law conflicts with a rule, the ADDENDUM states the minimum lawful deviation for that
market only (e.g. renewal reminder in France/California, 14-day withdrawal right unless validly waived in EU/UK,
consumer guarantees in Australia). The core says that local mandatory law prevails to the extent it applies.

## Research checklist per market (each item: rule, citation, what Uptal can do at maximum, what it cannot do,
## product requirement, risk 1-5)
1. Consumer status of an individual job-seeker buying a subscription; any B2B/consumer distinction.
2. Distance/e-commerce contract law: pre-contract information, confirmation on durable medium, withdrawal /
   cooling-off right for digital services, the lawful waiver mechanism (express request + acknowledgement), its
   wording and timing; consequences if not obtained.
3. Subscription and auto-renewal law: consent, disclosure, renewal reminders (when, what), cancellation method
   (online, button, "three clicks", same medium), cancellation confirmation, maximum terms, price-change rules.
4. Refunds: mandatory refund rights (non-conformity, failure to supply, consumer guarantees, statutory
   restitution), whether "no refunds" statements are themselves unlawful, pro-rata rules on termination.
5. Unfair / abusive terms regime: blacklist / grey list relevant to: no-refund, limitation of liability,
   unilateral changes, price changes, evidence clauses, time bars, forum/arbitration, deemed acceptance.
6. Governing law and forum vs consumers (Rome I art 6 / Brussels I bis art 17-18 analogues), arbitration
   enforceability, class-action waivers.
7. Payments: chargeback / payment-service refund rights the consumer has regardless (e.g. SEPA, card scheme
   rules, PSD2 art 76 style), BNPL rules.
8. Price display and tax: tax-inclusive display, currency, VAT/GST registration trigger for a foreign digital
   seller (non-resident registration, OSS/IOSS, UK VAT, Australian GST, Canadian GST/QST, US sales tax nexus).
9. Data protection: law, regulator, extraterritorial reach, lawful bases, local representative (GDPR art 27,
   UK GDPR art 27, Swiss nFADP art 14, Turkey-style), DPO, cross-border transfer mechanism, registration/
   notification with the authority (e.g. Morocco CNDP, Tunisia INPDP, Algeria ANPDP), children, sensitive data,
   automated decision-making rights, breach notification, required privacy-notice contents.
10. AI / automated processing rules relevant to Auto-Apply (EU AI Act scope for a job-seeker-side tool,
    transparency duties), and employment-related rules (e.g. applying on someone's behalf, CV photo/age/gender
    discrimination norms).
11. Language requirements for consumer contracts and notices.
12. Mandatory provider information (company details, Impressum, registration numbers, contact channels: is a
    ticket-only channel lawful, or must an email address be given?).
13. Anything else that would make a core clause void or a regulatory finding (e.g. Australia ACL "no refunds",
    Germany fair-consumer-contracts act, France loi Chatel, Quebec CPA ss. 11.2/11.3, Bill 96).
