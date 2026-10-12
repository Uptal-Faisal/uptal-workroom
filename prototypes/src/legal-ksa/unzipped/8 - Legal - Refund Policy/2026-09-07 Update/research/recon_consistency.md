# RECON: Internal consistency across Uptal's own surfaces

**Lens:** an airtight refund policy fails if another Uptal surface contradicts it. This maps every
contradiction and every dependency created by the move to "charge equals delivery, zero refunds" and by
the deletion of the CV Enhancer score improvement guarantee.

**Sources actually read (not from memory):**
- `BRIEF.md`, `live_en_article.txt` (13 sections, last updated July 30 2026), `live_terms_article.txt`
  (27 sections), `hero_toc_markup.txt`
- Live fetch, 7 September 2026, of `https://uptal.com/auto-apply`, `https://uptal.com/talent-search`,
  `https://uptal.com/privacy-policy`, plus `/`, `/about-us`, `/contact-us`, and the Arabic Auto-Apply
  page. Saved as `fetch_*.html`, `text_*.txt`, `ar_autoapply.html` in this scratchpad.
- The **shipped i18n translation bundle** embedded in the server-rendered HTML of every page. This is
  where the worst findings are. It is live production content, not a draft.

**Note on house rules:** all drafting prose below contains no em dashes and no en dashes. Verbatim
quotations of existing live copy are reproduced exactly, including any dashes they contain, because
altering evidence would defeat the purpose. Every one of those is a quotation, never proposed copy.

---

# PART 0. HEADLINE: the four things that will sink this policy if not fixed first

| # | Finding | Why it is fatal |
|---|---|---|
| **A** | The live i18n bundle shipped on **every uptal.com page** contains an unretired **"100% MONEY-BACK GUARANTEE"** block and a **"risk-free policy"** FAQ promising a **full refund**. The **Arabic** version of the same block promises a refund **for dissatisfaction generally**, and Terms §23 makes **Arabic prevail**. | A policy saying "no refund ever" published on a domain that simultaneously serves a money-back guarantee string is not airtight; it is a contradiction the customer wins. |
| **B** | The Auto-Apply **checkout consent checkbox reads "I agree to the Terms & Conditions and the Privacy Policy"**. The Refund Policy is **not named and not linked** at the point of payment. | R1's whole architecture is advance consent to immediate performance **for every future renewal, granted at signup**. That consent lives only in the Refund Policy. It is not being captured where it must be captured. |
| **C** | Talent Search FAQ #7 says profile unlocks are **"Unlimited"**. Terms §4.1, Refund Policy §3.4 and the Privacy Policy all say unlocks are **subject to a plan allowance** (100 / 500). | Refund §3.2 and §3.4 lean on "unused unlocks are non-refundable" as a consumption argument. That argument collapses if the product was sold as unlimited, and the mis-description becomes a live claim. |
| **D** | Auto-Apply takes payment **before** OTP email verification and account activation (`OTP_VERIFY: "Verify & activate"`, `SUBSCRIBE_FAILED: "We could not activate your subscription."`), and the live FAQ concedes a **two business day** activation gap when the CV email is wrong. | "Delivery occurs at the moment of charge" is falsifiable on Uptal's own published process. This is the single strongest attack on R1 and it must be closed in drafting **and** in product. |

---

# PART 1. TERMS & CONDITIONS: clause by clause, with exact replacement text

Every clause below touches payments, refunds, renewals, cancellation, trials, guarantees or outcomes.
Verdict column answers: does it still hold once the Refund Policy says charge equals delivery with zero
refunds, and once the CV Enhancer score improvement guarantee is deleted?

## 1.1 Clauses that SURVIVE unchanged (keep them, they are load bearing)

| Clause | Quoted operative words | Verdict |
|---|---|---|
| **§1 para 4 (statutory rights)** | "Nothing in these Terms limits, excludes, or purports to limit or exclude any right or remedy that you have under the Saudi E-Commerce Law, the Consumer Protection framework, the Personal Data Protection Law (PDPL), or any other provision of Applicable Law that is mandatory and cannot be waived" | **Consistent. Do not touch.** This is the twin of the Policy's savings clause and it is what lets a court read the no-refund rule down instead of striking it. |
| **§2.2(f)** | "where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has a right of determination, approval, consent, or discretion, such right may, to the maximum extent permitted by Applicable Law, be exercised in Uptal's sole and absolute discretion" | **Consistent.** Directly supports R4 ("Uptal's determination final"). |
| **§4.2 final para** | "may add, modify, suspend, or discontinue any feature or Service, in whole or in part, at any time, without notice and without liability of any kind" | **Consistent.** Supports the R3 non-ground for product sunset. |
| **§5** | "You are solely responsible for all activities, acts, and omissions that occur under or through your account, whether or not authorized by you" | **Consistent.** Supports both the R3 "own act or omission" ground and the strict conditions on the unauthorized-charge correction. |
| **§7.1** | "You may adjust your targeting preferences, pause, or cancel Auto-Apply at any time from your account, with effect on future Submissions only." | **Consistent.** "Future only" is exactly the pause and cancel framing the new policy needs. |
| **§7.3** | "No refunds, credits, or compensation of any kind will be issued in connection with any submitted Application" | **Consistent and strong.** Already R2-shaped. Keep verbatim. |
| **§7.5** | "does not guarantee interviews, offers, or employment ... The number of roles matched, the number of Applications tailored or submitted, response rates, interview rates, and employment outcomes vary ... and are not guaranteed, and no statement on the Website or within the Services shall be construed as a guarantee" | **Consistent.** The closing words are a marketing-disclaimer shield. Contradicted by live marketing (Part 2), not by the Policy. |
| **§14 final para** | "Termination shall not entitle you to any refund, credit, or compensation, except where and to the extent required by mandatory Applicable Law" | **Consistent.** Covers the R3 grounds for suspension for breach and self-deletion. |
| **§15, §16 paras 1 and 2** | "AS IS", "AS AVAILABLE", "WITH ALL FAULTS"; "no liability whatsoever for ... any suspension, modification, discontinuance, or unavailability of the Services" | **Consistent.** Supports the availability and force majeure non-grounds. |
| **§16 para 4** | "Your sole and exclusive remedy for any dissatisfaction with the Services, with any Output, or with these Terms is to discontinue your use of the Services and, where applicable, to cancel" | **Consistent and very useful.** The Policy should cross-refer to this: dissatisfaction has a stated remedy, and that remedy is not money. |
| **§20** | "deemed modified to the minimum extent necessary to make it valid, legal, and enforceable" | **Consistent.** Blue-pencil already present. The Policy still needs its own copy because the Policy prevails on billing. |
| **§24** | "no person other than you and Uptal ... shall have any right to enforce any of these Terms" | **Consistent.** Satisfies R4 no-third-party-rights at Terms level. |
| **§25** | Riyadh, KSA, exclusive | **Consistent.** |

## 1.2 Clauses that MUST CHANGE

### CHANGE 1 of 8. §6.2 "No refunds": the core rewrite

**Current text (quoted in full):**
> "All payments for all Uptal Services are final and non-refundable. Uptal's Services are digital services with immediate access and are treated as used from the moment of purchase. Refunds are considered only in the limited cases set out in our Refund Policy (verified billing errors and confirmed unauthorized charges) or where required by applicable Saudi law."

**Why it breaks.** Three separate failures. (1) "treated as used from the moment of purchase" is a
usage-based fiction that invites the reply "but I did not use it"; R1 requires delivery to be
constituted by **availability**, not use. (2) It says nothing about renewals, so a renewal charge is
arguably an unaddressed event. (3) The parenthetical **calls the two corrections "refunds"**, which is
the exact word R6 removes from the Policy. If the Policy says "no refund is ever issued" while the Terms
say "refunds are considered in these cases", the Terms hand the customer the loophole and §1 does not
save it, because §1's carve-out only resolves conflicts, it does not cure an admission.

**EXACT REPLACEMENT TEXT for Section 6.2** (heading changes too):

> ### 6.2 Charge equals delivery; no refunds
>
> Each Uptal Service is a digital service that is made available to you immediately. At the moment a payment is successfully charged to your payment method, whether that payment is an initial purchase, a renewal, an upgrade, a downgrade, a plan or seat change, a reactivation, an add-on, or any other charge, and under any payment method, the Service to which that charge relates is deemed delivered in full, fully performed, and irrevocably consumed for the billing period or order to which that charge relates, and you are deemed to have accepted that delivery at that moment. Delivery is constituted by the availability of the Service to your account, and not by your actual use of it. Each renewal is a new purchase that is fully performed at the moment it is charged.
>
> By providing a payment method and completing any purchase, you expressly request and consent to Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) commencing performance immediately, before the expiry of any withdrawal, cooling-off, or similar period that might otherwise apply. You grant that request and that consent in advance in respect of every future renewal and every future charge on your account, and not only in respect of your first purchase. You acknowledge and agree that, to the extent the relevant Service has been performed in whole or in part, any statutory right of withdrawal you may otherwise have had is affected, reduced, or extinguished accordingly, in each case to the maximum extent permitted by Applicable Law.
>
> Accordingly, all payments for all Uptal Services are final and non-refundable, and no refund, reversal, credit, voucher, coupon, discount, account balance, extension of term, free period, set-off, deduction, withholding, compensation, damages in lieu, or goodwill payment of any kind will be issued in respect of any charge, on any ground whatsoever, save to the extent required by mandatory Applicable Law. The Refund Policy sets out the grounds that are expressly excluded, the correction of charges that are not payments for Services, the evidentiary rules that apply, and the period within which any claim relating to a charge must be raised in writing, and it prevails over this Section to the extent of any inconsistency.

Note the deliberate omission: the replacement does **not** name the corrections. That keeps the Terms
free of the word "refund" in a permissive sense and routes everything to the Policy, where R6 frames
them as corrections rather than refunds.

---

### CHANGE 2 of 8. §7.7 "CV Enhancer deliverables; sole remedy": dangling guarantee reference

**Current text (the offending words in bold effect):**
> "your sole and exclusive remedy, and Uptal's entire liability, shall be the provision of revisions in accordance with the scope of the service you purchased, and not any refund, credit, or other compensation, **save only for the score improvement guarantee expressly set out in the Refund Policy**, in each case as further set out in the Refund Policy."

**Why it breaks.** This is not a cross-reference, it is an **operative promise in the Terms**. Deleting
Refund §5.4 without amending this leaves a Terms clause that expressly preserves a guarantee. Worse, a
customer reading only the Terms would find a subsisting money remedy. This is the highest-priority
single-sentence fix in the whole document set.

**EXACT REPLACEMENT TEXT for Section 7.7:**

> ### 7.7 CV Enhancer deliverables; sole and exclusive remedy
>
> CV Enhancer produces a personalized digital deliverable prepared on the basis of, and in reliance upon, the information you provide. You acknowledge that the assessment of the style, presentation, wording, and persuasiveness of a CV is inherently subjective. If you are not satisfied with a CV Enhancer deliverable, your sole and exclusive remedy, and the entire liability of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), shall be the provision of revisions within the scope of the service you purchased, requested in accordance with the Refund Policy, and shall not be any refund, credit, or other compensation of any kind. Revisions are a re-performance of the service purchased; they are not a refund, a credit, or compensation, and neither the provision nor the exhaustion of revisions gives rise to any right to a refund, a credit, or any other payment. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) gives no guarantee, warranty, or assurance as to any score, rating, ranking, evaluation, or assessment produced by any Uptal system or by any third-party system in respect of any CV, whether before or after enhancement, and no such score, rating, ranking, evaluation, or assessment, and no change or absence of change in it, gives rise to any right to a refund, a credit, or any other payment.

The final sentence is doing real work: it closes the guarantee **and** pre-empts the next argument, which
is "your own scoring tool did not improve my CV, therefore you did not perform".

---

### CHANGE 3 of 8. §6.4 "Free trials": a live 100 percent discount path is already shipping

**Current text:**
> "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may offer free trials or free features at its discretion. Free trials convert to paid subscriptions only where clearly disclosed before you provide payment details. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may modify or withdraw free offerings at any time."

**Why it breaks.** The Auto-Apply checkout ships a discount code path whose live string is
`DISCOUNT_FREE: "Code applied — your first period is free."` and `ACTIVATE_FREE: "Activate Auto-Apply"`,
with a price label `FREE: "Free"`. That is a free trial in substance. When the first real charge lands,
the customer is in the single most common refund-demand scenario, and §6.4 as drafted says nothing about
what happens to that charge. Do not simply delete §6.4: deleting it while the code path is live creates
the contradiction rather than removing it.

**EXACT REPLACEMENT TEXT for Section 6.4:**

> ### 6.4 Promotional pricing, discount codes and free periods
>
> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may offer promotional pricing, discount codes, reduced or free first periods, or free features, in each case at its discretion and on the terms disclosed at the time of the offer. Where a free or reduced period is followed by a paid period, that fact, the amount of the subsequent charge, and the date on which it will be charged are disclosed to you before you provide your payment details, and your provision of payment details constitutes your authorization of that subsequent charge. Every charge that follows a free or reduced period is a new purchase and is subject to Section 6.2 in full: it is deemed delivered and fully performed at the moment it is charged, and it is not refundable on the ground that a free or reduced period had applied, that you did not use the Service during or after that period, that you did not expect the charge, or that you did not cancel before the paid period began. A charge processed at a zero or reduced amount is a charge for the purposes of Section 6.2, and the Service for that period is delivered in full at the moment of that charge. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may modify or withdraw any promotional or free offering at any time, and no such modification or withdrawal entitles you to any refund, credit, or compensation.

---

### CHANGE 4 of 8. §6.5 "Chargebacks": currently far weaker than the Policy and than R4

**Current text:**
> "If you have a billing concern, contact support@uptal.com first so we can resolve it directly. If a chargeback or payment dispute is filed before contacting us, we may suspend access to the affected Service while we investigate, and where the disputed charge is found valid, we may recover the amount owed together with reasonable, documented costs."

**Why it breaks.** Weaker than the existing Refund Policy §9 on four points: it does not call a chargeback
a material breach, it limits suspension to "the affected Service" rather than all products, it omits
contesting with records, and it omits the survival of the debt. R4 requires all four. A softer Terms
clause is the version a chargeback arbitrator will be shown.

**EXACT REPLACEMENT TEXT for Section 6.5:**

> ### 6.5 Chargebacks and payment disputes
>
> If you have any billing concern, question, or dispute, you must first contact support@uptal.com so that the matter can be reviewed and, where appropriate, resolved directly. The filing of a chargeback, payment dispute, or reversal request with your bank, card issuer, or payment provider in respect of a charge that is valid under these Terms and the Refund Policy, or before you have contacted Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) and allowed a reasonable opportunity for resolution, is a material breach of these Terms. Without prejudice to any other right or remedy, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may suspend, restrict, or terminate your access to the affected Service and to every other Uptal Service, pending and following its investigation; may contest the dispute and submit its records and evidence to the payment provider, bank, or card scheme; and, where the disputed charge is found to be valid, may recover from you the full amount of that charge together with all reasonable, documented costs, fees, and expenses incurred in connection with the dispute, including chargeback fees levied by payment providers. The filing of a chargeback does not suspend, reduce, or extinguish any amount owed by you to Uptal (شركة الخبرات الصاعدة لتقنية المعلومات).

---

### CHANGE 5 of 8. §6.1: no coverage of renewals as new purchases, seats, plan changes, or pause

**Current text is fine as far as it goes** ("Subscriptions ... auto-renew at the end of each billing cycle
unless cancelled before renewal. Cancellation takes effect at the end of the current billing period; you
retain access until your paid period expires."). The gaps: it never says the renewal charge is itself a
purchase, it never mentions **seats** (Talent Search is priced "/month per seat", so seat additions are
uncovered charges), and it never mentions **pause**, which the Refund Policy §4.4 governs but the Terms
do not.

**EXACT TEXT TO INSERT into Section 6.1**, immediately after the sentence ending "unless cancelled before renewal.":

> Each renewal is charged automatically to the payment method on file, at the then-current price for your plan, without further authorization from you, until you cancel. The addition or removal of seats, plan changes, upgrades, downgrades, reactivations, add-ons, and any other change to your subscription may give rise to a further charge, and each such charge is a separate purchase subject to Section 6.2. Where a Service offers a pause facility, pausing suspends future performance and future billing only; it is not a cancellation, it does not reverse or affect any charge already made, and it is not a refund of any amount already paid.

---

### CHANGE 6 of 8. §6.3: "All prices are exclusive of VAT" is factually wrong for Auto-Apply

**Current text:** "All prices are exclusive of Value Added Tax (VAT). Applicable VAT (currently 15%) is
added at checkout".

**Why it breaks.** The live Auto-Apply checkout reassurance string is
`REASSURE: "VAT included · cancel anytime, no lock-in"`, Arabic
`"شامل ضريبة القيمة المضافة · ألغِ في أي وقت، دون التزام"`. Talent Search is the opposite:
`bottomNote: "Instant access · No setup fees · Cancel anytime · All prices exclude VAT"`. A blanket
"all prices are exclusive" statement is a false statement about the Auto-Apply price and is the sort of
inaccuracy that lets a customer argue the price they agreed was not the price charged. The **same
sentence appears in Refund Policy §6** and must be fixed in both.

**EXACT REPLACEMENT TEXT for Section 6.3:**

> ### 6.3 Pricing, VAT and price changes
>
> Prices are stated either exclusive or inclusive of Value Added Tax (VAT), as indicated at the point of sale for the relevant Service. Where a price is stated exclusive of VAT, applicable VAT (currently 15%) is added at checkout; where a price is stated inclusive of VAT, the amount displayed is the total amount charged. A VAT-compliant tax invoice is issued in respect of each charge in accordance with the tax regulations of the Kingdom of Saudi Arabia as in force from time to time. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may modify the pricing of any product, plan, or Service at any time and from time to time, without prior notice, and without any obligation to honor previously displayed prices. The price displayed to you at checkout, or, in the case of a renewal, the then-current price for your plan as published on the Website at the time of renewal, is the price in effect for that charge. No price change entitles you to any refund, credit, or compensation in respect of amounts already paid, and continued use of a Service after a price change taking effect at renewal constitutes acceptance of the changed price.

---

### CHANGE 7 of 8. §1 conflict rule: widen the Refund Policy's carve-out

**Current text:** "save that the Refund Policy shall prevail in respect of matters of billing, refunds,
and payment disputes, and the Privacy Policy shall prevail in respect of the processing of personal data."

**Why it breaks.** The new Policy will carry evidentiary rules, a deemed-delivery rule, a deemed-acceptance
rule, a short written-claim time bar, anti-precedent, anti-assignment and no-waiver. A hostile reader will
argue those are not "matters of billing, refunds, and payment disputes" and that the Terms therefore
prevail, which would resurrect the Terms §16 twelve-month claim window over the Policy's short bar.

**EXACT REPLACEMENT for that clause (replace from "save that" to "personal data"):**

> save that the Refund Policy shall prevail in respect of all matters of billing, charges, the delivery and acceptance of paid Services, cancellation, pausing, renewals, refunds, corrections of charges, chargebacks, and payment disputes, including the evidentiary rules applicable to such matters and the periods within which any claim relating to a charge must be raised, and the Privacy Policy shall prevail in respect of the processing of personal data.

---

### CHANGE 8 of 8. §16 final paragraph: the 12-month window will swallow the Policy's short time bar

**Current text:** "any claim or cause of action you may have arising out of or relating to these Terms,
the Services, or the Website must be commenced within twelve (12) months after the date on which the
cause of action first arose".

**Why it breaks.** R4 requires a short written-notice window for charge-related claims. Twelve months in
the Terms is the specific limitation provision in the document set, and a customer at month nine will
point at it. Change 7 above helps, but say it explicitly.

**EXACT TEXT TO INSERT into Section 16**, immediately before the sentence beginning "Nothing in these Terms excludes or limits any liability":

> This Section does not extend, and shall not be construed as extending, the period within which a claim relating to a charge must be raised in writing under the Refund Policy, which applies to such claims to the exclusion of the period stated in this Section.

---

## 1.3 One more clause that needs a decision, and one that needs a founder call

### §4.1 profile unlock allowance: pick a truth and make four surfaces say it

> Terms §4.1: "subject to your plan's monthly unlock allowance"
> Refund Policy §3.4: "a set number of profile unlocks per month (100 for Professional, 500 for Executive Pro)"
> Privacy Policy: "candidate contact data (email and phone number) is disclosed to subscribers only upon profile unlock, subject to the subscriber's plan allowance"
> **Talent Search FAQ #7 (live): "How many profile unlocks do I get per month?" → "Unlimited."**

Three legal surfaces say allowance, the selling surface says unlimited. **Faisal must state which is
true**, then:
- **If allowances are real:** the FAQ answer must be replaced. It is the only wrong surface.
- **If unlocks are genuinely unlimited:** delete Refund §3.4 entirely, delete the "Unused profile unlocks
  at the end of a billing cycle" bullet from Refund §3.2, strike "subject to your plan's monthly unlock
  allowance" from Terms §4.1, and strike "subject to the subscriber's plan allowance" from the Privacy
  Policy. Losing §3.4 slightly weakens the progressive-consumption story for Talent Search, which makes
  the availability-not-use rule in the new Section 2 carry more weight. That is acceptable.

### §16 liability cap of SAR 100: a strategic tension, founder's call, no change recommended here

Executive Pro is SAR 1,498 per month per seat billed annually, so a single seat is roughly SAR 17,976 per
year. A total aggregate liability cap of **one hundred (100) Saudi Riyals** is under 0.6 percent of one
seat-year. A cap that low, sitting in the same document as an absolute no-refund rule, is the pairing most
likely to make a reviewer treat the whole bargain as one-sided and to read down whichever clause is in
front of them. Raising the cap would create a damages route, which R2 explicitly forecloses ("damages in
lieu"). **This is a genuine trade-off and it belongs to Faisal, not to the drafters.** Flagging it, not
recommending a change.

### §18 Affiliate program: commissions on reversed charges, and affiliates making refund claims

> "approved affiliates earn a commission of 10% of the total purchase price for each new customer referred through their unique referral link who completes a purchase"

Two holes. First, no clawback: if a charge is later corrected or lost to a chargeback, Uptal has paid 10
percent on money it did not keep. Second, affiliates are third parties who describe Uptal's commercial
terms in their own words; an affiliate who writes "money-back guarantee" creates the exact contradiction
this whole exercise exists to remove.

**EXACT TEXT TO ADD to Section 18** (after the sentence ending "through the affiliate's Uptal account."):

> A commission is earned only in respect of a charge that is successfully collected and retained by Uptal (شركة الخبرات الصاعدة لتقنية المعلومات). Where a charge on which a commission has been paid is subsequently corrected, reversed, charged back, or otherwise not retained, the corresponding commission is repayable on demand and may be set off against any commission otherwise payable.

**EXACT TEXT TO ADD to the affiliate undertakings list in Section 18** (as a further bullet):

> - state or imply that any Uptal Service is offered with a refund, a money-back guarantee, a satisfaction guarantee, a risk-free period, a free trial, or a cancellation credit, or that any Uptal Service guarantees an interview, an offer, or employment, or describe the commercial terms of any Uptal Service otherwise than as set out on the Website, in these Terms, and in the Refund Policy.

### Scope gap: the Refund Policy covers three products, the Terms sell seven

Terms §2.1 defines "Services" as including "Talent Search, Auto-Apply, CV Enhancer, **interviews,
assessments, recruitment management software**", and the live footer sells "Resume Evaluation, Interviews,
Technical Assessments, Psychometric Assessments, Headhunting". The Refund Policy §1 names only the three.
Under a "no refunds no matter what" regime, **a product the Policy does not name is a loophole by
omission**, which R2 forbids. Drafting instruction: Refund Policy §1 must extend to "all paid Uptal
Services as defined in the Terms & Conditions", with the three named products given as the current
principal examples, and must expressly cover successor, substitute, bundled, and future products.

---

# PART 2. LIVE PAGES: everything that promises, implies, or could be read as promising a refund, a guarantee, a money-back remedy, a trial, or a cancellation credit

Fetched 7 September 2026. Location codes: **[DOM]** = rendered in the served HTML; **[i18n]** = present in
the shipped translation bundle served with every page, addressable by key, renderable by any component.

## 2.1 CRITICAL: the unretired money-back guarantee in the live i18n bundle

Served on `/auto-apply`, `/talent-search`, `/privacy-policy`, `/`, and every other page fetched. It is not
currently rendered in the server-rendered DOM of any route tested, and the legacy route it belonged to
appears retired (the nav item "Headhunting" now points to `/talent-search`). **It is still shipped.**

**English [i18n]:**

| Key | Exact wording |
|---|---|
| `Money_Back_Guarantee` | "100% MONEY-BACK GUARANTEE" |
| `Satisfaction_Assurance` | "We stand behind the quality of our service with a satisfaction guarantee." |
| `Company_Commitment` | "... we offer a 100% money-back guarantee. If you do not receive qualified CVs within the first week, we guarantee a complete refund." |
| `Risk_Free_Policy` | "What is Uptal's risk-free policy?" |
| `Risk_Free_Policy_Description` | "For the first 14 days of an annual subscription, if a customer does not receive at least three qualified and reachable candidates within 7 days of submitting their first sourcing request, they may request a full refund." |
| `Cancellation_Policy_Description` | "To cancel your subscription, please note that you can only cancel under our risk-free policy within the first 14 days; no refunds are available after this period. For those on a monthly contract without an annual commitment, you can stop auto-renewal anytime, and your subscription will end after 30 days. If you're on a monthly contract with an annual commitment or have paid for a year upfront, you can choose to stop auto-renewal, but this will only take effect at the end of your 365-day contract period." |

**Arabic [i18n], and this is the worse one:**

| Key | Exact wording | Problem |
|---|---|---|
| `Money_Back_Guarantee` | "ضمان استرداد رسوم الخدمة" | A standing refund guarantee headline. |
| `Satisfaction_Assurance` | "نضمن جودة الخدمة ومستعدون لإعادة رسوم الخدمة في حال عدم رضاكم" | **Unconditional satisfaction refund.** The English version is conditional on not receiving qualified CVs in week one. The Arabic promises the fee back **"in the event you are not satisfied"**, with no condition at all. |
| `Company_Commitment` | "... لذلك نقدم لكم ضمان استرداد رسوم الخدمة في حال عدم قدرتنا على توفير خمسة ملفات تعريفية لكفاءات مطابقين تمامًا لاحتياجاتكم الوظيفية خلال الاسبوع الأول." | Says **five** profiles; the English says "qualified CVs" with no number. The two language versions promise different things. |
| `Risk_Free_Policy` | "ما هي سياسة استرداد رسوم الخدمة؟" | |
| `Cancellation_Policy_Description` | "يمكن إلغاء الاشتراك في إطار سياسة استرداد الرسوم خلال الأربع عشر يومًا الأولى فقط..." | Fourteen day cancellation-with-refund window. |

**Why this is the number one item.** Terms §23 and Refund Policy §13 both provide that **the Arabic version
prevails**. The Arabic string is an **unconditional satisfaction-based refund guarantee**. A policy that
says "no refund on any ground" published by a company whose own prevailing-language production bundle
carries "we are ready to return the service fees if you are not satisfied" is not airtight in any sense
of the word. It also creates an English/Arabic divergence, which is itself a consumer-protection flag.

**Required before publication:** delete these six keys from **both** language bundles, in the same release
as the policy, and confirm no component references them. Removing them from English only is worse than
doing nothing, because the Arabic prevails.

**Also note:** `Cancellation_Policy_Description` describes a commercial structure that exists in **no
current legal document**: "a monthly contract with an annual commitment", "a 365-day contract period", and
subscriptions that "end after 30 days". The Terms and Policy know only "billing cycle" and "current paid
period". If any customer is on such a contract, the new policy does not describe their arrangement.

## 2.2 `https://uptal.com/auto-apply`

### Checkout and post-payment strings [i18n], all live

| Key | Exact wording | Read as |
|---|---|---|
| `TERMS_AGREE` / `TERMS_LINK` / `TERMS_AND` / `PRIVACY_LINK` | "I agree to the" + "Terms & Conditions" + "and the" + "Privacy Policy" | **The Refund Policy is not in the consent string and not linked at checkout.** See Part 4A. |
| `REASSURE` | "VAT included · cancel anytime, no lock-in" | Sits next to the pay button. "no lock-in" at the moment of payment. |
| `REASSURE` (AR) | "شامل ضريبة القيمة المضافة · ألغِ في أي وقت، دون التزام" | "دون التزام" = "no commitment". Stronger than the English. Arabic prevails. |
| `DISCOUNT_FREE` | "Code applied — your first period is free." | A free trial in substance. See Change 3. |
| `ACTIVATE_FREE` / `FREE` | "Activate Auto-Apply" / "Free" | A zero-amount charge path. |
| `RENEW` | "Renews monthly at {{price}}. Cancel anytime before your next billing date." | **Keep this. It is good evidence.** It is the pre-charge recurring disclosure that defeats "I did not know it was recurring". |
| `SUCCESS_BODY` | "Auto-Apply is live. We'll start submitting you to roles that match you, starting today." | **Keep and log.** Best single piece of delivery evidence Uptal has. |
| `SUCCESS_AMT` | "{{price}} / month · renews automatically · cancel anytime" | Keep the first two elements. See Part 4C on "cancel anytime". |
| `SUBSCRIBE_FAILED` | "We could not activate your subscription. Please try again." | Implies payment may succeed while activation fails. See Part 2.5 and Part 4E. |
| `OTP_TITLE` / `OTP_VERIFY` | "Confirm your email" / "Verify & activate" | Activation is gated on OTP **after** payment. See finding D. |

### Outcome and guarantee language

| Location | Exact wording | Read as |
|---|---|---|
| `MX_PROMISE` [i18n], matches modal, adjacent to the paywall | **"We don't stop until you're hired"** | An outcome promise at the exact moment of purchase intent, next to `MX_LOCK_BADGE: "Subscribe to unlock {{more}} more"`. Arabic: `"ما نوقف إلى ما تتوظّف"`. In Arabic this reads as an effort tagline; **in English it reads as a commitment to a result**, and it is the strongest counter to the R3 non-ground "not being hired". |
| FAQ, `Q15_A` [DOM] and JSON-LD | "No. Uptal does not guarantee a job, a job offer, or an interview. **What Uptal does guarantee is that it keeps searching for suitable roles and applying to them with a CV tailored to each one.**" | The disclaimer half is excellent. The second half is an **express service-level warranty** using the word "guarantee". A subscriber whose applications stopped during an outage now has a breach-of-express-guarantee argument against the availability non-ground. |
| Hero [DOM] | "You just take the interviews." | Outcome implication. |
| Section heading [DOM] | "Land interviews in 3 steps." | Outcome implication. |
| Step 3 [DOM] | "Interviews land in your inbox" / "You stay hands-free while the offers come to you." | Outcome implication, "offers". |
| Testimonials section heading [DOM] | "People are landing interviews, hands-free." | |
| FAQ "When will I see results?" [DOM] | "Some candidates start receiving replies from recruiters within the first two weeks." and "the better your chances of an interview" | Timing implication. Mitigated in the same answer by "we cannot promise a result or a date", which is good and should stay. |
| Testimonials [DOM] | "had three interview calls by Thursday", "within a month I had two interviews on the calendar" | Third-party outcome claims on a paid-conversion page. Terms §7.5's closing words ("no statement on the Website ... shall be construed as a guarantee") is the shield, but it is doing a lot of work. |

### Cancellation and commitment language

| Location | Exact wording | Problem |
|---|---|---|
| FAQ `Q12_A` [DOM] and JSON-LD | "Yes. Pause whenever you need a break and pick up right where you left off, or **cancel at any time with no commitment. You're never locked in.**" | "no commitment" and "never locked in" are the phrases a customer will quote back after a renewal charge. They are true as to future periods and false as to the current one, and the page does not say which. |
| Hero trust badge [DOM] | "Cancel anytime" | Same issue, unqualified. |
| `FOOTNOTE` [i18n] | "We tailor your CV and apply to every match for you. Cancel anytime." | Same. |
| FAQ "What do I do if the email on my CV is wrong?" [DOM] | "Contact support and open a ticket. The team will correct the email and **activate your account within a maximum of two business days.**" | **Uptal publicly concedes a paid-but-inactive window of up to two business days.** Directly contradicts delivery at the moment of charge. |
| FAQ [DOM] | "The account is activated once your payment is complete." | Helpful, but contradicted by the OTP gate and the two-day case above. |

**No refund, money-back, or trial promise appears in the rendered Auto-Apply DOM.** The exposure is
entirely in the i18n bundle and in the "no commitment" family of phrases.

## 2.3 `https://uptal.com/talent-search`

| Location | Exact wording | Problem |
|---|---|---|
| FAQ #7 [DOM] | "How many profile unlocks do I get per month?" → **"Unlimited.** A profile unlock gives you access to the candidate's full details including verified email address and phone number" | **Contradicts Terms §4.1, Refund §3.4 and the Privacy Policy.** See Part 1.3. |
| Pricing subhead [DOM] | "No setup fees. No recruiter commissions. **Cancel anytime.**" | Unqualified. |
| `billedNote1` [i18n] | "Billed monthly · Cancel anytime" | Applied to the monthly tier only, which is correct behaviour. |
| `footnote1` / `footnote2` [i18n] | "Cancel anytime" / "**No hidden fees**" | "No hidden fees" sits badly beside a policy that permits price changes at renewal without prior notice. Recommend "No setup fees" instead, which is already used elsewhere and is true. |
| Final CTA [DOM] | "**Instant access** · No setup fees · Cancel anytime · All prices exclude VAT" | "Instant access" **helps**. It is the availability-at-charge claim the policy needs. Keep it. |
| Talent Pool section [DOM] | "**Every profile is verified** and enriched with the data that actually drives hiring decisions" | An absolute quality warranty. |
| Data point 4 [DOM] | "**Confirmed** email and phone **on every profile.** Reach out directly" | Absolute warranty, repeated. |
| FAQ #4 [DOM] | "Verified profiles include confirmed email addresses and phone numbers, so when you unlock a profile and reach out, **you're contacting real, reachable candidates — not outdated records.**" | **The sharpest attack on the Talent Search no-refund rule.** Refund §3.2 excludes "Dissatisfaction with search results, candidate profiles, or data quality" as a ground. But a dead phone number on a profile sold as "confirmed" is not dissatisfaction, it is **non-conformity with an express warranty**, and no-refund clauses do not survive contact with express warranties as easily as they survive dissatisfaction. |
| Hero stats [DOM] | "87 % Faster time-to-hire", "10 x Recruiter efficiency" | Performance claims. |
| Testimonial [DOM] | "Hired in 11 days." | Outcome claim, B2B, lower risk. |
| Pricing [DOM] / [i18n] | Professional "498 /month per seat" billed annually, saving "60.1%"; Executive Pro "1,498 /month per seat"; monthly tiers 1,248 and 2,998 | **Annual prepayment is the highest-risk application of charge-equals-delivery.** A single charge of roughly SAR 17,976 per seat deemed fully performed at the instant of charge, with no pro rata on any ground, is the transaction a Saudi reviewer will look at hardest. |
| Pricing [DOM] | "per seat" | Seats are an uncovered charge event in both the Terms and the Policy. Fixed by Change 5. |
| CTA [DOM] | "Book a demo" appears as both primary and secondary CTA | A sales-assisted motion implies order forms and negotiated terms, which Terms §1 incorporates. Any signed order form can override the Policy. See Part 4F. |

**No refund, money-back, or trial promise appears in the rendered Talent Search DOM**, other than through
the shared i18n bundle described in 2.1.

**Structural consequence for drafting.** Under the new policy, CV Enhancer keeps a stated non-monetary
remedy (revisions), while Talent Search and Auto-Apply are left with **no remedy of any kind**. A tribunal
looking at an absolute no-refund clause attached to a service with zero remedy for defective performance
is materially more likely to strike it than one where dissatisfaction is channelled somewhere. **Strong
recommendation:** give each product a named non-monetary remedy, defined expressly as re-performance and
expressly as **not** a refund, credit, voucher, or compensation, and stated as the sole and exclusive
remedy. For Talent Search that is re-verification or replacement of a specific non-conforming profile
record; for Auto-Apply it is correction of preferences and continued submission. This **strengthens** the
no-refund rule rather than weakening it, and it costs no money. Note the drafting hazard: a replacement
unlock must not be called a "credit", because R2 forbids credits by name. Frame it as re-performance.

## 2.4 `https://uptal.com/privacy-policy`

**Clean. No refund, guarantee, money-back, trial, or cancellation-credit language.** Three points of
positive consistency and two dependencies.

Consistent and helpful:
- "candidate contact data (email and phone number) is disclosed to subscribers only upon profile unlock,
  **subject to the subscriber's plan allowance**" (Sharing section). Agrees with the Terms and the Policy,
  disagrees with the Talent Search FAQ. Three against one.
- "Applications are submitted under your express authorization and **cannot be retracted once
  transmitted**; pausing takes effect on future submissions only." Agrees with Terms §7.3 and Refund §4.6.
- "AI-generated outputs are probabilistic estimates and may contain errors or inaccuracies; they are not
  guaranteed to be accurate, complete, or current. Hiring decisions remain solely with employers."
  Agrees with Terms §7.2 and §7.5.
- "Account and subscription data: username, password (encrypted), preferences, subscription tier, and
  **pause or cancellation history**." Pause and cancellation history is already a declared data category,
  which supports the evidence obligations in Part 4E.

Dependencies created by the new policy:
- **Retention versus evidence.** "Account data (subscribers and job seekers): retained for the duration of
  the active account or subscription and for **five (5) years** following account closure" and "Payment and
  transaction data: retained for the minimum period required by Saudi Arabian tax and commercial law."
  R4 makes Uptal's records **conclusive evidence** of the charge, of delivery, and of access granted.
  Retention must therefore explicitly cover the **consent artefacts** (checkout consent record, policy
  version hash, timestamp), not only "payment and transaction data". Add consent and delivery evidence to
  the retention table.
- **Erasure versus evidence.** "Right to destruction: to request the destruction of your personal data when
  it is no longer necessary" and, for CV and application data, "you may request deletion at any time,
  subject to legal record-keeping requirements". If a customer exercises erasure and the checkout consent
  log goes with it, Uptal has destroyed the proof its own policy depends on. The "subject to legal
  record-keeping requirements" qualifier must be extended, in the Privacy Policy's own words, to the
  billing and consent records retained for the defence of legal claims.

## 2.5 Cross-surface contradictions summary table

| # | The new policy will say | A live Uptal surface says | Severity |
|---|---|---|---|
| 1 | No refund on any ground, ever | i18n AR: "نضمن جودة الخدمة ومستعدون لإعادة رسوم الخدمة في حال عدم رضاكم" (satisfaction refund), **and Arabic prevails** | **Fatal** |
| 2 | No refund, no money back, no risk-free window | i18n EN: "100% MONEY-BACK GUARANTEE"; "risk-free policy"; "they may request a full refund" | **Fatal** |
| 3 | Consent to immediate performance is granted at signup for every renewal | Checkout consent string names only Terms and Privacy Policy | **Fatal** |
| 4 | Delivery occurs at the moment of charge | Payment precedes OTP verification and activation; FAQ concedes "within a maximum of two business days" | **Fatal** |
| 5 | Unused profile unlocks are not refundable | Talent Search FAQ #7: "Unlimited." | **High** |
| 6 | Data quality dissatisfaction is not a ground | "Every profile is verified"; "Confirmed email and phone on every profile"; "real, reachable candidates" | **High** |
| 7 | Not being hired is not a ground | `MX_PROMISE`: "We don't stop until you're hired", shown at the paywall | **High** |
| 8 | Service disruption is not a ground | FAQ: "What Uptal does guarantee is that it keeps searching ... and applying" | **High** |
| 9 | Forgetting to cancel is not a ground; a renewal is a new purchase | "cancel at any time with no commitment. You're never locked in."; "no lock-in"; "دون التزام" at checkout | **High** |
| 10 | The CV Enhancer remedy is revisions only | Terms §7.7: "save only for the score improvement guarantee expressly set out in the Refund Policy" | **High** |
| 11 | Prices are exclusive of VAT (Refund §6, Terms §6.3) | Auto-Apply checkout: "VAT included" | **Medium** |
| 12 | Charges are corrected only for duplicates and unauthorized charges | `SUBSCRIBE_FAILED`: "We could not activate your subscription." A captured charge with no subscription created is neither | **Medium, and it is a gap, not a conflict.** See Part 4E |
| 13 | Price may change at renewal without prior notice | Talent Search `footnote2`: "No hidden fees" | **Low** |
| 14 | Only three products are covered | Terms §2.1 and the footer sell interviews, assessments, headhunting, recruitment management | **Medium, loophole by omission** |
| 15 | Billing cycles are monthly, quarterly or annual | i18n: "monthly contract with an annual commitment", "365-day contract period", "end after 30 days" | **Medium** |
| 16 | A commission is earned on a purchase | §18 has no clawback when the charge is reversed | **Low** |

---

# PART 3. HERO, SCOPE CHIPS, AND TABLE OF CONTENTS: exact new copy

Source: `hero_toc_markup.txt`. Structure and class names preserved exactly; only text nodes change.

## 3.1 Hero

**Eyebrow:** unchanged, "Refund Policy".
**H1:** unchanged, "Refund Policy".

**`p.lede` current:**
> "This policy explains how payments, cancellations, and refunds work across every Uptal product: Talent Search for employers, and Auto-Apply and CV Enhancer for job seekers."

**`p.lede` NEW (recommended):**
> This policy explains how payments, renewals, and cancellations work across every Uptal product: Talent Search for employers, and Auto-Apply and CV Enhancer for job seekers. Every Uptal product is a digital service that is delivered the moment a payment is successfully charged, on a first purchase and on every renewal alike. All payments are final, and no refund is issued.

Three sentences, matching the live rhythm: scope, then the rule, then the consequence. It states the
position plainly at the top of the page, which is exactly what a regulator wants to see and what removes
the "buried in clause 14" argument. Note the word "refunds" is deliberately dropped from the first
sentence, because the policy no longer explains how refunds work; it explains that there are none.

**`div.meta` current:**
> `<span><b>Last updated:</b> July 30, 2026</span>`
> `<span><b>Provider:</b> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), Kingdom of Saudi Arabia</span>`

**`div.meta` NEW:**
> `<span><b>Last updated:</b> September 7, 2026</span>`
> `<span><b>Provider:</b> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), Kingdom of Saudi Arabia</span>`

Provider string untouched. Only the date changes.

## 3.2 The three scope cards

Card headings, `.aud` audience lines, and layout unchanged. Body text and chips as follows.

### Card 1, Talent Search

- `h3`: "Talent Search" (unchanged)
- `.aud`: "For employers & recruiters" (unchanged)
- `p` **current:** "Recurring subscription. Professional & Executive Pro plans with monthly candidate profile unlocks."
- `p` **NEW (if allowances are real):** "Recurring subscription. Professional & Executive Pro plans, billed monthly, quarterly, or annually, per seat."
  **NEW (if unlocks are genuinely unlimited):** identical. Either way, **remove the unlock reference from
  the chip area of the page** until Part 1.3 is settled, and add "per seat" because seats are now a named
  charge event.
- `.chip` **current:** "Final & non-refundable"
- `.chip` **NEW:** **"Delivered on payment · non-refundable"**

### Card 2, Auto-Apply

- `h3`: "Auto-Apply" (unchanged)
- `.aud`: "For job seekers" (unchanged)
- `p` **current:** "Recurring subscription. Our AI tailors your CV and applies to matching jobs for you. Cancel or pause anytime."
- `p` **NEW:** "Recurring subscription. Our AI tailors your CV and applies to matching jobs for you. Cancel or pause at any time, with effect on future billing periods only."
  The current sentence puts an unqualified "Cancel or pause anytime" **inside the refund policy itself**,
  one line above a no-refund chip. That is the contradiction on a single screen. The qualifier fixes it
  without losing the reassurance.
- `.chip` **current:** "Final & non-refundable"
- `.chip` **NEW:** **"Delivered on payment · non-refundable"**

### Card 3, CV Enhancer

- `h3`: "CV Enhancer" (unchanged)
- `.aud`: "For job seekers" (unchanged)
- `p` **current:** "One-time purchase. A done-for-you enhanced, rewritten CV prepared specifically for you."
- `p` **NEW:** unchanged. It is accurate and carries no money implication.
- `.chip` **current:** "Final & non-refundable · revisions offered"
- `.chip` **NEW:** **"Delivered on payment · non-refundable · revisions only"**

**Why "revisions only" rather than deleting the revision reference (R5).** "revisions offered" implies a
concession that might be one of several available remedies, which is precisely the reading R5 wants gone.
"revisions only" states that revisions are the entire remedy and that nothing else, money included, is
available. Deleting the phrase altogether would be a step backwards: a product card that says only
"non-refundable" with no remedy at all is the version most likely to be read as abusive, and revisions are
free to give.

**Consistency note:** the three chips now use one grammar. "Delivered on payment" is the new rule stated
in three words, in the same place on all three cards, which is what makes it read as a policy rather than
as three separate disclaimers.

## 3.3 Table of contents for the restructured policy

The live TOC lists 13 items. The restructure adds the R1 delivery section, the R2 no-refund-in-any-form
section, the R3 exhaustive non-grounds section, the R4 evidentiary and procedural section, and recasts
"Exceptions" per R6.

**Full replacement `<ol>` for `nav.toc`:**

| # | Link text | `fragment` / `href` |
|---|---|---|
| 1 | Overview & scope | `overview` |
| 2 | Charge equals delivery | `delivery` |
| 3 | No refund in any form | `no-refunds` |
| 4 | Grounds that do not entitle you to a refund | `grounds` |
| 5 | Uptal Talent Search | `talent-search` |
| 6 | Uptal Auto-Apply | `auto-apply` |
| 7 | Uptal CV Enhancer | `cv-enhancer` |
| 8 | Correction of charges that are not payments for services | `corrections` |
| 9 | Chargebacks & disputes | `chargebacks` |
| 10 | Evidence, claim period & finality | `evidence` |
| 11 | Pricing & taxes | `pricing` |
| 12 | Service availability & disruptions | `availability` |
| 13 | General provisions | `general-provisions` |
| 14 | Governing law | `governing-law` |
| 15 | Contact information | `contact` |
| 16 | Policy updates | `updates` |
| 17 | Language & interpretation | `interpretation` |

Markup pattern, unchanged from live:
`<li><a fragment="delivery" href="/refund-policy#delivery">Charge equals delivery</a></li>`

**Ordering rationale.** Items 2, 3 and 4 sit immediately after the scope section, before any
product-specific content. R1 requires the core rule to be "prominent and early", and a reader who stops at
the TOC has already been told the answer. Items 8, 9 and 10 are grouped so that corrections, chargebacks
and evidence read as one procedural block: what can be corrected, what happens if you go around us, and
what proves it.

**Anchor migration, do not skip this.** Two live fragments change meaning:
- `#exceptions` no longer exists. The old link is in the wild and in the Arabic page. **Add a redirect or
  a client-side alias from `#exceptions` to `#corrections`.** A dead anchor on a legal page that used to
  list exceptions is the worst possible broken link, because the reader concludes the exceptions were
  hidden.
- `#general` currently points to "Digital services, immediate access & consumption", whose content is
  absorbed into the new Section 2. **Alias `#general` to `#delivery`**, and use `general-provisions` for
  the new Section 13 so the two never collide.
- Every other live fragment (`overview`, `talent-search`, `auto-apply`, `cv-enhancer`, `pricing`,
  `availability`, `chargebacks`, `governing-law`, `contact`, `updates`, `interpretation`) is preserved
  deliberately. Do not renumber them for tidiness.

The Arabic TOC in `hero_toc_markup_ar.txt` must receive the identical 17 items with identical fragments,
in Arabic, RTL, with the same alias rules.

---

# PART 4. OPERATIONAL DEPENDENCIES: what Faisal's team must implement for the policy to hold up

A no-refund policy is only as good as the record that proves the customer agreed to it and that the
service was delivered. Everything below is a prerequisite, not a nice-to-have.

## 4A. What the checkout must DISPLAY

1. **Name and link the Refund Policy in the consent string.** Today the live keys are
   `TERMS_AGREE: "I agree to the"`, `TERMS_LINK: "Terms & Conditions"`, `TERMS_AND: "and the"`,
   `PRIVACY_LINK: "Privacy Policy"`. **Add the Refund Policy as a third named, linked document**, in both
   languages. Everything in R1 depends on consent captured here.
2. **A separate, explicit immediate-performance consent line**, not bundled into the same checkbox as the
   Terms. Suggested EN copy:
   > "I ask Uptal to start this service immediately, and I understand that this payment and every renewal payment are non-refundable once charged."
   A single combined checkbox is easier to attack than two. Two checkboxes, or one checkbox plus one
   prominently displayed statement immediately above the pay button, is the defensible pattern.
3. **The renewal terms above the pay button, before payment.** `RENEW: "Renews monthly at {{price}}.
   Cancel anytime before your next billing date."` already does this. **Keep it and never remove it.** It
   is the single strongest answer to "I did not know it recurred".
4. **Repair `REASSURE`.** Current: "VAT included · cancel anytime, no lock-in". "no lock-in" contradicts
   the policy at the moment of payment.
   **Proposed EN:** "VAT included · cancel anytime, effective from your next billing date"
   **Proposed AR:** "شامل ضريبة القيمة المضافة · ألغِ في أي وقت، ويسري الإلغاء من دورة الفوترة التالية"
   This keeps the reassurance and removes the false implication. Note the Arabic currently says
   "دون التزام" (no commitment), which is stronger than the English and prevails.
5. **The exact amount, currency, VAT treatment, billing period, and next billing date**, displayed before
   the pay action, not only in the receipt.
6. **For the discount-code path**, the post-promotion price and the date of the first paid charge must be
   displayed on the same screen as `DISCOUNT_FREE`, before payment details are submitted. Terms §6.4 as
   rewritten requires this, and the current string ("Code applied — your first period is free.") does not
   provide it.

## 4B. What the checkout must RECORD

For every charge, the billing system must persist, immutably and with a server timestamp:

1. Customer identifier, payer of record, and payment method fingerprint (never the PAN).
2. **The exact version of the Refund Policy and of the Terms in force at that moment**, stored as a
   content hash plus the published version date, not merely as a URL. A URL proves nothing later, because
   the page will have changed.
3. The **rendered text** of the consent line and of the renewal disclosure as the customer actually saw
   them, in the language they saw them in, plus the language flag.
4. The state of every consent control at submission, with client timestamp and server timestamp.
5. Amount, currency, VAT amount, VAT treatment (inclusive or exclusive), discount code applied, gross and
   net.
6. Plan, billing period, seat count, and the computed next billing date.
7. Processor authorization code and settlement reference.
8. IP address and user agent, for the unauthorized-charge correction pathway.
9. **For every renewal charge, all of the above again.** A renewal is a new purchase under the new policy,
   so it needs its own complete record. Pointing back at the original signup record is not enough, because
   the policy version may have changed between them.

## 4C. What the cancellation flow must DO

1. **Cancel must be self-service, immediate to complete, and reachable in a small number of steps** from
   account settings. Both Terms §6.1 and Refund §3.3 and §4.3 promise "from your account settings". If the
   product forces the customer to email support, the "you could have cancelled" defence collapses, and a
   friction-heavy cancel flow next to an absolute no-refund rule is the pairing regulators pursue.
2. **State the effect before confirming, and state it honestly.** The confirmation screen must say the
   date access ends, that no further charges will be taken, and, in terms, that **the current period is not
   refunded**. Suggested: "Your access continues until [date]. You will not be charged again. The payment
   for the current period is not refunded."
3. **Never present a retention offer that implies a money remedy.** No "we will credit you", no "we will
   extend your period", no "we will give you a free month" as a save tactic. Every one of those is a
   remedy R2 forbids by name, and offering it once in the UI creates the course of dealing the
   anti-precedent clause is meant to prevent. A discount on a **future** period is permissible and is not a
   remedy for a past charge; label it that way.
4. **Log the cancellation timestamp against the billing period**, so that "I cancelled before it renewed"
   can be answered with a record rather than an argument.
5. **Do not auto-cancel on pause.** Pause suspends future billing only. The UI must not describe pausing as
   getting money back, and the pause confirmation must say the current paid period is unaffected.
6. **The cancel flow must never use the words "refund", "credit" or "money back"**, even to deny them, in
   a button or heading. Denial belongs in a sentence, not in a control label.

## 4D. What the renewal reminder should and should not say

**Should:**
- Send it. There is no legal obligation in the current document set to send a pre-renewal reminder, and
  the policy does not create one. Send it anyway. A documented pre-renewal notice is the cheapest possible
  defence against "I forgot to cancel" and against a chargeback framed as an unrecognised charge.
- State: the exact amount, the currency, the date of the charge, the plan, and a one-click link to cancel.
- State plainly that the charge is non-refundable once taken. Suggested:
  > "Your Auto-Apply subscription renews on [date] for [amount]. Once charged, the payment for that period is final and is not refunded. To avoid the charge, cancel before [date]: [link]"
- Send it far enough ahead that cancelling is genuinely possible. Three days is defensible; the morning of
  is not.

**Should NOT:**
- Must not say "cancel anytime for a refund", "risk-free", "no commitment", "no lock-in", or "money back".
- Must not imply the charge can be undone after it is taken.
- Must not offer a credit, voucher, free period, or extension as a retention lever.
- Must not be the only place the recurring nature is disclosed. It supplements the checkout disclosure; it
  does not replace it.
- Must not promise an outcome for the coming period.

## 4E. What support agents must NEVER say in writing

Terms §16 as rewritten, and R4's no-waiver rule, mean **no employee can vary this policy except by signed
writing from an authorised officer**. That clause is worthless if agents write the opposite every day. A
single support email is an admission, and it will be produced.

**Banned in writing, in any language, in any channel including WhatsApp and chat:**

| Never write | Why |
|---|---|
| "I will refund you this time" / "as a one-off" / "as an exception" | Creates the precedent the anti-precedent clause exists to prevent, and evidences a practice of granting refunds. |
| "I will credit your account" / "a free month" / "we will extend your period" / "a voucher" | Every one is a remedy R2 names and forbids. Calling it something other than a refund does not help. |
| "Our policy is that we don't usually refund" | "Usually" concedes discretion and turns an absolute rule into a soft one. |
| "You should have cancelled, but let me see what I can do" | Signals a discretionary route exists. |
| "I'll escalate and see if we can make an exception" | Same. |
| "Sorry, our system charged you by mistake" | Concedes a billing error before investigation. |
| "We guarantee you'll get interviews" / anything about outcomes | Breaches Terms §7.5 and the no-guarantee standing rule, and hands over the "not hired" ground. |
| "You're not locked in" / "no commitment" | Repeats the marketing phrase that the policy contradicts. |
| "You can cancel and get your money back" | Conflates two different things. |
| Anything promising the score, ranking or match rate will improve | The deleted §5.4 must not survive in the inbox. |

**What agents should write instead**, as approved macros in EN and AR:
- For a delivered-service demand: "Your payment on [date] for [period] activated your subscription, and
  the service was available to your account from that moment. Under our Refund Policy, payments are final
  and are not refunded. I have cancelled your renewal, so you will not be charged again, and your access
  continues to [date]."
- For a CV Enhancer complaint: "Revisions are the remedy for your order, and they are included. Tell me
  what you would like changed and I will get it revised."
- For a suspected duplicate or unauthorized charge: "I am opening a review of that charge under the
  correction process in our Refund Policy. Please send [evidence] within [window]. A correction under that
  process is not a refund of a service; it is the correction of a charge that did not purchase a service."

**Governance:** agents must have no ability to issue a payment from the support console. Any correction
must require an authorised officer's approval, recorded, with the reason code recorded as a **correction**
and never as a refund. Reason codes matter: a processor dashboard full of transactions coded "refund" is
the evidence that defeats the policy.

## 4F. What the billing system must RETAIN as evidence

R4 makes Uptal's own records **conclusive evidence** of the charge, of delivery, of access granted, and of
work performed. That is only worth having if the records exist and survive.

**Per charge, retained for at least the full limitation period plus the ZATCA and Saudi commercial
record-keeping period, whichever is longer:**
1. Everything listed in 4B.
2. **Proof of availability, which is what "delivery" now means.** First successful authenticated session
   after the charge, and, failing that, the fact that the account was in an entitled state for the whole
   period. Availability, not use, is the test, so the record must show entitlement, not just logins.
3. **Proof of performance per product.**
   - Auto-Apply: the submission log, count and timestamp per application, and per tailored CV generated.
     `SUCCESS_BODY: "Auto-Apply is live. We'll start submitting you to roles that match you, starting
     today."` is the promise; the log is the proof.
   - Talent Search: search events, profile views, and unlock events with timestamps.
   - CV Enhancer: order timestamp, work-commenced timestamp, deliverable version history, and the full
     revision request and delivery trail.
4. **The pre-renewal notice**, if sent: content, recipient, send timestamp, delivery status.
5. **Cancellation and pause events**, with timestamps relative to the billing period boundary. The Privacy
   Policy already declares "pause or cancellation history" as a retained category, so this is covered by
   the existing notice.
6. **Every support communication touching billing**, retained and searchable, because a variation
   admission by an agent is the most likely way this policy is defeated, and Uptal needs to find it before
   the customer does.
7. **The archived published version of the Refund Policy and the Terms for every date on which a charge was
   made.** Keep a versioned archive of the rendered page, EN and AR, with publication timestamps. Refund
   Policy §12's non-retroactivity promise ("changes shall not apply retroactively to charges already
   processed") is unprovable without it.

**Two retention hazards to close explicitly:**
- **Erasure.** The Privacy Policy's right to destruction and the "delete at any time" language for CV and
  application data must not be allowed to delete the consent artefacts and delivery evidence. Extend the
  existing "subject to legal record-keeping requirements" qualifier, in the Privacy Policy's own text, to
  records retained for the establishment, exercise, or defence of legal claims, and name the billing and
  consent records as a retained category in the retention table.
- **Processor-side records.** Authorization and settlement data live with the processor. Mirror the fields
  Uptal needs into Uptal's own store; do not rely on the processor's retention window.

## 4G. Product changes required before the policy can be published truthfully

These are not copy fixes. The policy makes claims that the current product does not yet satisfy.

1. **Close the pay-before-activation gap (finding D).** Options, in order of preference:
   (a) capture payment only after OTP verification and account activation, so charge and delivery are
   genuinely simultaneous; or (b) authorize at checkout and **capture** on activation; or (c) if neither is
   feasible, the policy must define the delivered period as commencing on charge while providing that any
   activation delay is made good by extension of the period **at Uptal's option**, which is a remedy R2
   otherwise forbids and therefore needs Faisal's explicit sign-off. **Option (a) or (b) is strongly
   preferred**, because it removes the contradiction instead of drafting around it.
2. **Handle the captured-charge-with-no-subscription case.** `SUBSCRIBE_FAILED: "We could not activate
   your subscription. Please try again."` implies this state exists. A charge that created no subscription
   is neither a duplicate nor unauthorized, so under R6 as briefed there is **no route to correct it**.
   That is a loophole by omission in reverse: it forces Uptal to refuse a correction it knows is owed, and
   it is exactly the fact pattern that loses chargebacks and attracts processor penalties.
   **Recommendation: add a third correction category** to the recast Section 8, in the same
   not-a-refund framing: **a charge captured where no subscription, order, or entitlement was created at
   all.** Subject to the same strict conditions (written notice within the stated window, evidence,
   cooperation, Uptal's determination final to the maximum extent permitted, original payment method only,
   payer of record only). This strengthens the policy: it lets Section 3 say "no refund is ever issued for
   any Uptal service" with a completely clean conscience, because none of the three corrections is a
   payment for a service.
3. **Retire the six money-back and risk-free i18n keys** in EN and AR, in the same release. Verify no
   component references them.
4. **Fix or remove `MX_PROMISE`.** The Arabic "ما نوقف إلى ما تتوظّف" reads as effort. The English
   "We don't stop until you're hired" reads as a result, at the paywall. Suggested EN replacement that
   keeps the energy and loses the promise: **"We keep applying for you, every day."**
5. **Fix the Auto-Apply FAQ guarantee sentence.** Replace "What Uptal does guarantee is that it keeps
   searching for suitable roles and applying to them with a CV tailored to each one" with a
   non-warranty formulation: **"What Uptal does is keep searching for suitable roles and applying to them
   with a CV tailored to each one, every day your subscription is active."** Same reassurance, no express
   guarantee to breach.
6. **Resolve the unlock allowance question** and correct whichever surfaces are wrong.
7. **Soften the absolute data warranties on Talent Search.** "Every profile is verified" and "Confirmed
   email and phone on every profile" should become process claims rather than result claims, for example
   "Every profile goes through our verification process", which is already the wording used in FAQ #4's
   first sentence. Keep the second half of FAQ #4 out.
8. **Existing customers.** Terms §26 makes updates effective on publication, and Refund §12 says changes do
   not apply retroactively to charges already processed. Neither addresses the customer who bought under
   the old regime and renews under the new one. Existing Auto-Apply subscribers bought against "no
   lock-in"; existing CV Enhancer buyers bought against a live score guarantee. **Send existing subscribers
   a direct notice of the change before their next renewal, and honour the score improvement guarantee for
   CV Enhancer orders placed before publication date.** Applying a materially harsher regime to an existing
   subscriber by silent publication is the weakest link in the entire plan, and honouring a handful of
   legacy guarantee claims costs far less than one adverse ruling that the change was not validly
   communicated.
9. **Sales-assisted Talent Search.** "Book a demo" implies order forms. Terms §1 incorporates
   "product-specific terms, order forms, or supplemental notices", so a signed order form can lawfully
   override the Policy. That is intentional, but it must be controlled: no sales template may contain a
   refund, pro-rata, termination-for-convenience, or service-level credit clause without an authorised
   officer's approval, and the approved template should expressly state that the Refund Policy applies in
   full.
10. **Unverified, flagged for checking, not asserted.** A CV Enhancer landing page does not currently
    resolve at `uptal.com/cv-enhancer` (the route returns the app shell). If a CV Enhancer page is close to
    shipping, it must launch with no score guarantee, no money-back language, and, if it is priced as a
    recurring subscription rather than a one-time purchase, the "One-time purchase" wording on the refund
    policy scope card and in Terms §4.2 must change with it. Worth confirming with the team before publish.

---

# PART 5. PUBLICATION CHECKLIST, in order

1. Delete the six money-back and risk-free i18n keys, **EN and AR together**.
2. Add the Refund Policy to the checkout consent string and add the immediate-performance consent line.
3. Fix `REASSURE`, `MX_PROMISE`, the Auto-Apply "we do guarantee" FAQ sentence, and the "no commitment /
   never locked in" FAQ answer.
4. Settle the unlock allowance question and correct the losing surfaces.
5. Ship the Terms amendments (Changes 1 through 8, plus §18 and the scope widening) in the **same release**
   as the Refund Policy. A day of divergence between the two documents is a day with a live contradiction.
6. Ship the Privacy Policy retention and erasure amendments in the same release.
7. Publish the Refund Policy EN and AR simultaneously, with the anchor aliases for `#exceptions` and
   `#general` in place.
8. Notify existing subscribers before their next renewal, and honour pre-publication CV Enhancer guarantee
   claims.
9. Deploy the support macros and remove any refund capability from the agent console.
10. Turn on the pre-renewal notice and start retaining the evidence set in 4F.
