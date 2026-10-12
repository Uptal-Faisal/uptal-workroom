# RECON: Payment schemes, acquirers and chargeback survivability

Lens: Visa, Mastercard and mada dispute rules; acquirer and PSP risk programs; what the published
Refund Policy and the checkout must do so that Uptal wins representments instead of quietly funding them.

Prepared for the Uptal Refund Policy rewrite (target: https://uptal.com/refund-policy).
Merchant of record: Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), Kingdom of Saudi Arabia.
Date: 7 September 2026.

## 0. Confidence and sourcing

Verified against public scheme guidance, SAMA's published rulebook and current dispute-industry
references (September 2026). Three areas are stated with deliberate hedging because the primary
documents are not public:

1. mada Operating Rules reason-code tables. SAMA publishes the refunds standards; the full mada dispute
   code list is distributed to member banks only. Where I describe mada dispute behaviour I say so.
2. The merchant agreements of HyperPay, Moyasar, Tap, PayTabs and Checkout.com. These are contracts,
   not published documents. The obligations I list are the ones common to every KSA acquiring contract
   and to scheme rules that flow down into them; confirm the exact wording with whichever entity is
   Uptal's acquirer of record.
3. Exact Visa CEMEA threshold timing. Saudi Arabia sits in Visa's CEMEA region, which currently retains
   a higher VAMP merchant ceiling than the global one. Treat the stricter number as the planning number.

Nothing below changes the founder's decision. The decision is a no-refund policy. This document is about
making that decision survive contact with the banks, which is a different problem from making it survive
contact with a lawyer.

## 1. The one thing to understand before anything else

**A refund policy is not a defence. It is an exhibit.**

Card scheme rules, not merchant terms, decide whether a cardholder may dispute a charge. No sentence
Uptal writes can remove a cardholder's right to file. A clause saying "you waive your right to file a
chargeback" is void under scheme rules, is unenforceable, and actively damages Uptal in arbitration
because it signals a merchant trying to contract around the network. **Do not write one.** The live
Section 9 gets this right today: it says contact us first, and sets out consequences for filing against
a valid charge. That is the correct posture. Preserve it; do not escalate it into a purported waiver.

What the policy actually does is supply the single document that decides several reason codes:
proof that the customer was told, before paying, exactly what they were buying, that it renews, that it
is non-refundable, and how to cancel. In three of the six code families below, that document plus its
acceptance record is the whole case.

The corollary matters more than the policy: **a policy that is not displayed and affirmatively accepted
before payment, with a timestamped record tied to the transaction, is worth nothing at representment.**
An undisclosed no-refund policy is worse than no policy at all, because in several codes the scheme's
default rule then applies, and the scheme's default rule is that the cardholder gets their money.

## 2. Reason code by reason code: what can be raised, and what wins it

Six families are live against a digital subscription. Visa codes are the current VCR numbering;
Mastercard has consolidated most cardholder disputes into 4853 but issuers and older processor software
still forward the retired labels, so both are given.

### 2.1 Services not provided

| Scheme | Code |
|---|---|
| Visa | 13.1 Merchandise / Services Not Received |
| Mastercard | 4853 (sub-reason: Goods or Services Not Provided), formerly 4855 |
| mada | domestic equivalent under the cardholder-dispute category |

**Claim.** "I paid and got nothing."

**What wins it.** Delivery evidence, mapped one to one against what the policy says is delivered.
For a digital service there is no tracking number, so the evidence bundle is:

- Account provisioning record: the entitlement was created at timestamp T, seconds after the
  authorisation, with the plan name and period start and end.
- Access logs: login timestamps, IP addresses, device fingerprint, session count during the billing
  period.
- Product-specific work product:
  - Talent Search: searches run, profiles viewed, profile unlocks consumed, with timestamps.
  - Auto-Apply: applications submitted, with role, employer, timestamp and the tailored CV version used.
  - CV Enhancer: order received timestamp, delivery timestamp, the delivered file, and the download or
    email-open record.
- The transactional emails sent: order confirmation, delivery notice, with send and delivery logs.
- The published product description that the deliverable matches.

**The trap.** Uptal's chosen legal theory is that delivery is constituted by *availability*, not use.
That is correct contract law and it is the right clause. It is not, by itself, a winning representment
against 13.1 when the customer genuinely never logged in and Auto-Apply submitted nothing. An issuer
looking at zero activity will find for the cardholder. **Therefore the policy's availability clause must
be backed by an operational rule: every paid account must generate a demonstrable delivery event.**
For Auto-Apply that means the engine runs and submits from the first billing day without waiting for the
user to configure anything more than they configured at signup. For Talent Search it means the
provisioning record plus a first-login prompt. A subscription that sits idle because the customer never
came back is the one case where "availability equals delivery" is a paper argument only.

### 2.2 Not as described, or defective

| Scheme | Code |
|---|---|
| Visa | 13.3 Not as Described or Defective Merchandise / Services; 13.5 Misrepresentation |
| Mastercard | 4853 (sub-reason: Goods or Services Were Not as Described) |

**Claim.** "It did not do what they said it would." For Uptal the realistic version is: "they said I
would get a job / interviews / matches, and I got nothing."

**What wins it.** The product description as published, the policy's no-guarantee language, and the
delivery record showing the described thing was in fact provided. The live drafting is already the
strongest asset here:

- "does not guarantee interviews, offers, or employment"
- "Uptal's AI is probabilistic and can make mistakes"
- "the number of roles matched ... are not guaranteed"

These read as liability shields. They are also dispute armour: they are the exact sentences that convert
"not as described" into "described accurately, delivered as described." Keep them, keep them in the
Refund Policy and not only in the Terms, and keep them close to the no-refund rule so that a single
policy extract answers the code.

**The trap.** Marketing copy is discoverable by the issuer and is what the cardholder screenshots. Any
landing page, ad, WhatsApp message or email that promises a job, an interview, an offer, a number of
interviews, or a hiring outcome converts every dispute in this family from a win into a loss, and adds
a Saudi Anti-Commercial Fraud and Ministry of Commerce exposure on top. The standing "never promise a
job" rule is a payments control, not just a brand rule.

**Also.** For CV Enhancer, the revisions remedy is the single best answer to 13.3. "The customer was
offered revisions and did not take them" is strong. "The customer took revisions and accepted the
result" is stronger. Log revision offers and acceptances.

### 2.3 Cancelled recurring transaction

| Scheme | Code |
|---|---|
| Visa | 13.2 Cancelled Recurring Transaction |
| Mastercard | 4853 (sub-reason: Cardholder Dispute of a Recurring Transaction); retired labels 4841, 4849 |
| mada | domestic recurring/standing-instruction dispute |

**Claim.** Any of three, and they are not the same claim:
(a) "I cancelled and they billed me anyway."
(b) "I was never told this was recurring."
(c) "They changed the amount without telling me."

**What wins it.** All three are won at signup and at cancellation, never at renewal.

- Against (a): the cancellation log. Uptal must be able to say "the cancellation request was received at
  timestamp X, which is after the charge at timestamp Y", or "no cancellation request of any kind exists
  in the account log, the support inbox, or the cancellation endpoint." Plus proof the disclosed
  cancellation method existed and was reachable. Plus post-charge usage: logins or applications after
  the claimed cancellation date destroy the claim.
- Against (b): the recurring disclosure shown adjacent to the pay button (amount, currency, frequency,
  first charge date, next charge date, "renews automatically until you cancel"), the affirmative
  acceptance record, and the post-signup confirmation message. Visa requires merchants to send, at
  enrolment, the subscription terms including start date, amount, billing frequency and a link enabling
  easy online cancellation. Mastercard requires an enrolment confirmation email with cancellation
  instructions and a direct cancellation link, not a general support page. **These are mandatory scheme
  requirements, not best practice.** Not sending them is both a lost dispute and a rules breach.
- Against (c): the price-change notice, or evidence the then-current published price applied and was
  disclosed. Uptal's "prices may change without notice" clause is enforceable as a contract term but it
  does not win 13.2 on its own if the renewal amount differs materially from the amount the cardholder
  agreed to at signup. Renewals at a higher amount should carry advance notice regardless of what the
  policy permits.

**Scheme requirements that Uptal must be meeting today.** These are what the issuer checks first:

1. Easy online cancellation, of comparable ease to unsubscribing from an email list, available whatever
   channel the customer signed up through. No mandatory phone call, no "email us and wait", no
   retention maze that cannot be completed in one session.
2. Enrolment confirmation with full terms and a cancellation link.
3. Reminder notification with a cancellation link at least 7 days before charging, where a trial,
   introductory offer or promotional period is ending or the terms are changing (Visa). Mastercard
   requires notice 7 to 30 days ahead for billing intervals of 6 months or more, which catches annual
   Talent Search plans.
4. A trial-flagged statement descriptor on the first post-trial charge, if trials are ever run.
5. Immediate cessation of billing on cancellation, with a written cancellation confirmation stating the
   effective date, that access continues to period end, and that no further charge will occur.

Point 5 is worth stating plainly to the founder: **the cancellation confirmation email is the highest
value single artefact in the entire dispute stack.** It costs nothing, it gives away nothing, it refunds
nothing, and it is the document that wins 13.2 and defuses most 13.6 claims before they are filed.

**The trap.** A pre-renewal reminder feels, to a no-refund merchant, like inviting cancellation. That
instinct is expensive. A customer who cancels before the charge costs Uptal one renewal. A customer who
is surprised by the charge and goes to their bank costs Uptal the renewal, plus the dispute fee, plus a
unit in the ratio numerator, plus the risk premium that ratio buys.

### 2.4 Unauthorised transaction

| Scheme | Code |
|---|---|
| Visa | 10.4 Other Fraud, Card-Absent Environment |
| Mastercard | 4837 No Cardholder Authorization |
| mada | fraud category; heavily affected by mandatory 3DS/OTP |

**Claim.** "I did not make this charge." In practice, mostly first-party ("friendly") fraud: a family
member, an employee, or the cardholder themselves with a convenient memory.

**What wins it.**

- **mada is the strongest position Uptal has.** mada e-commerce transactions in the Kingdom are subject
  to mandatory cardholder authentication (3-D Secure with OTP). A successfully authenticated
  transaction shifts fraud liability to the issuer. **Capture and retain, for every single charge, the
  authentication artefacts: 3DS version, ECI, CAVV/AAV, DS transaction ID, and the authentication
  result.** With those, an unauthorised claim on a mada or authenticated Visa/Mastercard transaction is
  usually not chargeable to the merchant at all. If Uptal's PSP integration is not storing these, that
  is the highest-priority engineering fix in this whole document.
- Visa Compelling Evidence 3.0 for 10.4: two or more prior undisputed transactions with the same
  cardholder, the disputed one at least 120 days after the first, matched on at least two of device
  fingerprint, IP address, account/login ID, or delivery address. A subscription business is the ideal
  shape for CE3.0: by month four every renewal is protected. **This is a decisive argument for retaining
  device ID and IP on every transaction, not just the first.**
- Mastercard 4837: AVS/CVV results, IP address, device fingerprint, session timestamps, login records,
  and evidence the digital purchase was accessed or used. Mastercard's First-Party Trust programme lets
  a merchant push device and identity signals pre-dispute so the issuer sees them before a fraud
  dispute can be filed; ask the PSP whether it is enabled.
- Account-level linkage: the account was created with the customer's own email, verified by OTP, holds
  their CV, their name, their phone. For Auto-Apply and CV Enhancer this is unusually strong evidence,
  because the disputed account contains the cardholder's own curriculum vitae.

**Renewals specifically.** Recurring charges after the initial authenticated transaction are
merchant-initiated transactions. They must carry the original authentication reference and the correct
MIT/recurring indicators. If they do not, the issuer can treat each renewal as an unauthenticated
card-absent transaction and Uptal has no liability shift on any of them. **Confirm with the PSP that
initial-transaction credentials are being stored and referenced on every renewal.** This is a silent,
systemic, expensive failure mode.

### 2.5 Duplicate processing

| Scheme | Code |
|---|---|
| Visa | 12.6.1 Duplicate Processing; 12.6.2 Paid by Other Means |
| Mastercard | 4834 Point-of-Interaction Error (duplicate); 4853 in consolidated handling |

**Claim.** "I was charged twice for the same thing."

**What wins it.** Proof the two charges are not the same charge: two distinct authorisation codes and
ARNs, two distinct order IDs, two distinct entitlements or billing periods, two distinct products.
Or, where it really was a duplicate, proof that the credit has already been processed, with the amount
and the date.

**The trap, and it is the important one.** A genuine duplicate is not winnable. There is no evidence
that makes one charge into two entitlements. If Uptal refuses to correct a duplicate, the issuer takes
the money anyway, Uptal additionally pays the dispute fee, and the item lands in the ratio numerator.
The refusal costs money instead of saving it. See section 4.

### 2.6 Credit not processed

| Scheme | Code |
|---|---|
| Visa | 13.6 Credit Not Processed; 13.7 Cancelled Merchandise / Services |
| Mastercard | 4853 (sub-reason: Credit Not Processed); retired label 4860 |

**Claim.** "They told me I would get my money back and it never arrived", or "I cancelled and they kept
the money."

This is the code that specifically targets no-refund merchants, and section 3 deals with it in full.

## 3. The two codes that bite hardest: credit not processed, and cancelled recurring

These two are different in kind from the rest. Every other code is decided on facts about the service.
These two are decided on facts about **what Uptal said and what Uptal's systems did**, which means they
are the two Uptal can win outright by drafting and process discipline, and the two Uptal will lose
outright if it gets sloppy.

### 3.1 Credit not processed (Visa 13.6 / 13.7, Mastercard 4853 CNP)

**How the cardholder acquires the right to file.** The cardholder must have had reason to believe a
credit was due. There are exactly two ways they get that belief:

1. Somebody at Uptal said something that sounded like a refund was coming.
2. Uptal's refund policy was not properly disclosed at the time of the transaction, so the scheme's
   default rule applies: a cardholder who cancels a service is entitled to a credit unless a
   disclosed policy says otherwise.

Route 2 is why "no refunds" written on a page nobody was shown is not a policy. Under Visa's card
acceptance rules, a merchant with special terms such as NO REFUND, FINAL SALE or EXCHANGE ONLY must
disclose them at the point of transaction. For e-commerce, the accepted method is to place the policy
in the checkout flow, adjacent to or linked from the submit control, with a click-to-accept
acknowledgement, and **the merchant must be able to prove the cardholder received and acknowledged it.**
Note also that where a cardholder has cancelled in accordance with the merchant's policy, the issuer
must wait 15 calendar days from the transaction processing date before filing. That window is Uptal's
opportunity to process a correction voluntarily and pre-empt the dispute entirely.

**Policy language that defeats it.**

- The no-refund rule must be stated in absolute, unambiguous, non-conditional terms, and it must
  enumerate the alternate remedies so that none of them can be characterised as "not technically a
  refund": no credit, no voucher, no coupon, no discount, no account balance, no extension of term, no
  free period, no set-off, no deduction, no withholding, no compensation, no damages in lieu, no
  goodwill gesture. This is exactly R2 in the brief, and it is not merely belt and braces: an issuer
  reading "no refunds" beside a support email offering "a free month" will find that a credit was
  promised. Naming the alternates closes that.
- A **no-variation clause**: no employee, agent, contractor, reseller, chatbot or support reply can
  vary this Policy, grant any refund or credit, or create any entitlement, except by signed writing from
  an authorised officer of Uptal. This clause is not boilerplate here. It is the direct answer to route
  1: it converts an agent's stray "let me see what I can do for you" from an admission into an act
  outside authority.
- An **ex gratia clause**: any payment Uptal elects to make in any individual case is voluntary and ex
  gratia, is not an admission, creates no precedent, no entitlement and no course of dealing.
- A **no-waiver clause**: failure to enforce once is not a waiver.
- A statement of **where the policy is presented and when it was accepted**, so the extract Uptal
  attaches to the representment is self-authenticating: "this Policy is presented at checkout and must
  be affirmatively accepted before any payment is taken; Uptal records the version accepted, the date
  and time of acceptance, and the transaction to which it relates."

**Operational facts that defeat it.** Language alone does not close 13.6. Three process rules do:

1. **Never promise what you will not pay.** Support macros must be audited so that no reply contains
   "refund", "credit", "we will look into getting your money back", "I will escalate for a refund",
   or their Arabic equivalents, unless a correction has actually been approved. Every one of those
   sentences is a 13.6 waiting to be filed, and the customer keeps the screenshot.
2. **If Uptal does decide to pay, pay it as a refund on the original transaction, immediately.** Not a
   bank transfer, not a credit note only, not next month. A refund processed on the original
   transaction links to the ARN, is visible to the issuer, and is the complete answer to the code. A
   promise plus a delay is precisely the fact pattern 13.6 exists to punish. Target same day, and in any
   case inside the 15-day window described above.
3. **Evidence the correction.** Refund reference, date, amount, currency, original ARN, and the ZATCA
   credit note.

### 3.2 Cancelled recurring transaction (Visa 13.2, Mastercard 4853 recurring)

**Policy language that defeats it.** The policy must state the cancellation procedure with enough
precision that "the cardholder did not follow the disclosed cancellation procedure" is a checkable
factual claim rather than an assertion. That means naming the path, not gesturing at it: the exact
in-account route (for example Account, then Billing, then Cancel subscription), plus support@uptal.com
as an alternative, plus the rule that cancellation takes effect at the end of the current paid period,
plus the rule that a cancellation submitted after a renewal charge has been authorised does not affect
that charge. A vaguely described procedure is treated as no procedure, and then the code is lost by
default.

The policy must also close the three specific arguments in advance, in its own words:

- Forgetting to cancel is not a ground.
- Cancelling immediately after a renewal charge is not a ground; the renewal is a new purchase, fully
  performed at the moment of charge.
- Not having realised the subscription was recurring is not a ground, because the recurring nature,
  amount, frequency and next charge date were disclosed before payment and accepted, and are restated in
  the confirmation message and in the account at all times.

That third one only holds if the last clause is true. Which brings us to the operational facts.

**Operational facts that defeat it.**

1. The recurring terms shown **on the payment screen itself**, not only behind a link. Amount, currency,
   frequency, first charge date, next charge date, and the words "renews automatically until you
   cancel." A linked policy satisfies the acceptance requirement; on-screen text satisfies the issuer.
2. Affirmative acceptance: an unticked checkbox the customer must tick, or an equivalent unambiguous
   act, before the pay control is enabled. Not a pre-ticked box. Not "by continuing you agree."
3. The enrolment confirmation message (email and, in KSA, SMS is worth adding) restating all of the
   above with a direct cancellation link. Scheme-mandatory. Retain send and delivery logs.
4. Self-serve cancellation that completes in one flow, 24/7, no phone call, no waiting on a reply.
   Scheme-mandatory. Log the timestamp, the IP, and the account.
5. A cancellation confirmation message stating the effective date, that access continues to period end,
   and that no further charge will occur.
6. Renewal receipts: send a receipt on every renewal charge, restating the amount, the period covered,
   the descriptor that will appear on the statement, and the cancellation link. A customer who receives
   a receipt rarely files "I did not know."
7. Pre-renewal reminders where the schemes require them, and, on the recommendation of this lens, on
   annual and quarterly Talent Search plans generally.
8. Honour cancellations instantly. One renewal billed after a logged cancellation is an automatic loss
   and, repeated, is a scheme rules violation.

## 4. Removing the duplicate-charge and unauthorised-charge corrections: the real risk

The founder's instruction is zero refunds. The brief already proposes recasting these two cases as
corrections of charges that never purchased a service. From a pure payments and acquiring standpoint,
that recast is not a concession. It is the cheapest insurance Uptal will ever buy. Here is the case.

### 4.1 Refusing does not keep the money

Both cases are unwinnable at representment. A duplicate charge has one entitlement and two debits; there
is no evidence that fixes that. A confirmed unauthorised charge on a card whose issuer has accepted the
cardholder's fraud claim is taken back. In both cases the money leaves. The only variable is **how** it
leaves, and the how has very different costs:

| | Voluntary correction | Forced chargeback |
|---|---|---|
| Principal | Returned | Returned |
| Dispute fee to acquirer | None | Typically 15 to 40 USD equivalent, per case |
| VAMP per-dispute fee if in excessive tier | None | 8 USD per dispute |
| Counts in dispute ratio numerator | No | Yes |
| Counts in fraud (TC40) numerator | No | Yes, for the unauthorised case |
| Staff time | Minutes | Representment package, then likely lost |
| Signal to acquirer | None | Adverse |

**A refund is invisible to the monitoring programmes. A chargeback is the monitoring programme.**
Refusing to correct is therefore not a way of keeping revenue. It is a way of converting a small,
invisible cost into a larger, highly visible one, and of manufacturing the exact metric that gets
merchants terminated.

### 4.2 The monitoring programmes, with numbers

- **Visa VAMP** (Visa Acquirer Monitoring Program) replaced VDMP and VFMP from 1 April 2025. Its ratio
  combines fraud reports (TC40) and disputes (TC15) over settled transactions, which is the point:
  **unauthorised charges Uptal refuses to correct feed the same numerator as service disputes.** The
  merchant "Excessive" ceiling dropped to 1.5 percent globally on 1 April 2026; CEMEA, which includes
  Saudi Arabia, currently retains 2.2 percent, and the direction of travel is convergence. Excessive
  tier merchants pay a per-dispute fee. Acquirers face their own 0.7 percent threshold, which is why
  acquirers act on a merchant long before the merchant's own ceiling is hit.
- **Mastercard ECM**: Excessive Chargeback Merchant at 100 to 299 chargebacks per month with a ratio of
  1.5 to 2.99 percent; High Excessive at 300 or more and 3 percent or above, assessed over consecutive
  months. Fines start around 1,000 USD per month and escalate; the high tier runs to six figures monthly.

**Do the arithmetic for Uptal.** At 3,000 settled transactions per month, 1.5 percent is 45 disputes.
At 1,000 transactions per month it is 15 disputes. For a consumer subscription in a market with a large
population of first-time online card users, sold at peak emotional intent to job seekers, and billed on
auto-renewal, 15 to 45 disputes a month is not a remote scenario; it is the base case if renewals are
unannounced and every duplicate and every fraud victim is pushed into the bank channel by policy. The
denominator is small; the numerator is entirely within Uptal's control. Deliberately adding avoidable
items to it is the single most dangerous thing this policy could do.

### 4.3 What happens after the thresholds

In order: adverse acquirer review; a rolling reserve (commonly 5 to 10 percent of volume held for 90 to
180 days), which is a direct hit to working capital; increased pricing; scheme fines passed straight
through to the merchant under the acquiring contract; then termination.

Termination is not the end of it. A merchant terminated for excessive chargebacks is listed on
Mastercard's MATCH database (Mastercard Alert to Control High-risk Merchants) under the
excessive-chargeback reason code. Listings run **five years** and there is no standard early-removal
path. Every acquirer in the world screens MATCH at underwriting. For a Saudi company whose entire
consumer revenue is card-based and whose local acquiring options are a short list, a MATCH listing is
close to an extinction event: the realistic alternatives are high-risk acquiring at punitive pricing
with a heavy reserve, if it can be obtained at all.

The trade is therefore: a handful of duplicate corrections a year, at tens or low hundreds of riyals
each, against a five-year listing that would put the entire consumer business off cards.

### 4.4 Two more reasons that are not about money

- **Boarding and underwriting.** KSA acquirers and PSPs review the live website before boarding and
  periodically after. A published policy that on its face refuses to correct a fraudulent charge, or
  that says "no refunds under any circumstances including unauthorised transactions", is read by an
  underwriter as a merchant that intends to retain the proceeds of card fraud. That is a decline, or a
  reserve. The recast wording avoids this entirely while giving up nothing on services.
- **Refund capability must exist at all.** SAMA's mada Operating Standards treat refund capability as a
  controlled function: it is disabled by default and enabled by the acquirer, refunds must go to the
  original card, for the full amount with no deductions, and no fees may be levied on the refund
  transaction. Acquirers must also monitor refund patterns and report anomalies to SAMA. A merchant that
  has never enabled or exercised refund capability, and then needs it urgently, discovers this at the
  worst possible moment. Keep the capability enabled and exercised, even if it is exercised twice a year.

### 4.5 Recommendation

**Keep the corrections. Adopt the recast version from the brief, not the fully-stripped alternative.**

Reason, in one sentence: the recast preserves an absolute, exception-free no-refund rule for every Uptal
*service*, while retaining the only two mechanisms that keep dispute ratios out of VAMP and ECM territory
and keep the acquirer calm, and it does so without conceding a single riyal on any service the customer
actually received.

Supplementary recommendations, all of which are internal practice rather than published policy:

1. Narrow the corrections precisely rather than removing them. Define a duplicate as two or more
   successful charges of the same amount, for the same subscription period, on the same account, within
   a short interval, where only one entitlement was created. That definition excludes "I bought two
   products", "I was charged for two months", and "I have two accounts". Define an unauthorised charge
   as one made without the cardholder's authority and **not** by any person to whom the cardholder gave
   access to the card, the device or the account. That definition excludes the family-member and
   employee cases, which are the volume cases, without refusing genuine fraud.
2. Keep an unpublished internal rule: where a dispute is genuinely unwinnable (a true duplicate, an
   unauthenticated fraud, or a case where a support agent made a promise), credit it before it becomes a
   chargeback. The ex gratia clause exists precisely so that this can be done safely, without precedent.
3. Watch the ratio monthly, per product, per scheme, with the acquirer's own numbers rather than
   internal ones.
4. If the founder still prefers the fully-stripped alternative block, present it to him with this
   section attached, so the choice is made with the MATCH and reserve exposure visible. It is his
   decision to make, but it should not be made unknowingly.

## 5. Saudi specifics

### 5.1 Saudi E-Commerce Law and its Implementing Regulations

- **The withdrawal right.** The E-Commerce Law gives a consumer the right to terminate the contract
  within **seven days** of receiving the product or of concluding the contract for the provision of a
  service, provided the consumer has not used the product or service or derived benefit from it.
  (Some secondary commentary circulates a fifteen-day figure; the seven-day figure is the one that
  appears in the Law itself. Have Saudi counsel confirm the current text before publication.)
- **The exceptions.** The right does not apply to, among other things, software downloaded over the
  internet, digital content that has been accessed or used, products made to the consumer's
  specifications, and services already performed. **This is the statutory hook that the entire Uptal
  policy rests on**, and it is why the immediate-performance and deemed-consumption drafting is not
  decoration: it is what places each Uptal purchase inside the exception.
- **The soft spot.** The exception is expressed in terms of *use* and *benefit*. A Saudi forum reading
  "the customer never logged in, no application was ever submitted, no file was ever delivered" may find
  that neither use nor benefit occurred, whatever the contract deems. Commentary specifically notes that
  operators with blanket no-return digital policies are exposed where a consumer can show the content
  was never accessed. Two consequences for drafting and operations:
  1. Keep the availability-equals-delivery clause, but pair it with concrete, per-product statements of
     what is made available and what Uptal does, so that "benefit" is arguable on availability alone.
  2. Make sure there is always something to point to. See 2.1: every paid period should produce a
     demonstrable delivery event.
- **Disclosure is mandatory.** The Implementing Regulations require the online store to disclose its
  return, exchange and refund policy clearly, in writing, before the order is completed, along with
  identity, contact details and full cost. A no-refund policy is lawful in the Kingdom **if disclosed
  before purchase**; an undisclosed one is not enforceable and is itself a violation. Penalties under
  the E-Commerce Law run to substantial fines, suspension of activity and blocking of the store, and the
  Ministry of Commerce does publicise enforcement against online stores.
- **Maroof.** The store's published return and refund policy sits on the Ministry of Commerce Maroof
  register. **The Maroof entry and the website policy must say the same thing.** A divergence is an easy
  finding for a regulator and an easy exhibit for a complaining consumer.

### 5.2 SAMA and mada

- **mada refunds (SAMA rulebook, mada Operating Standards and Procedures, refunds update).** The
  operative rules for a merchant are: refunds only to the same card used for the original purchase;
  the full amount with no deductions; refunds processed as a single transaction; proof of the original
  purchase retained; refund and return policies displayed clearly at the point of sale; refund
  capability disabled by default on terminals and enabled by the acquirer; no interchange,
  authorisation, settlement or MSC fees levied on a refund transaction and no fees imposed on customer,
  merchant or bank; acquirers must monitor unusual refund patterns and report to SAMA. The timeframe for
  a refund is left to the merchant's own policy.
  Drafting consequences:
  - The live policy's "original payment method only, in the original currency, no cash, no transfer to
    any other account or instrument, and to no person other than the payer of record" is aligned with
    mada and must be preserved verbatim in substance.
  - **The no-deductions rule means Uptal cannot net its chargeback costs, fees or claimed losses off a
    correction.** Any recovery of chargeback costs must be pursued as a separate debt, never as a
    deduction from the corrected amount. Draft it that way explicitly.
  - Uptal should state a turnaround for corrections (the live "typically within ten business days" is
    fine) because mada leaves it to merchant policy and a stated turnaround is itself dispute evidence.
- **Authentication.** mada e-commerce requires cardholder authentication. This is Uptal's single
  strongest structural defence against unauthorised-transaction disputes, and it is worthless unless the
  authentication artefacts are stored and retrievable per transaction. Treat this as a hard engineering
  requirement, not a nice-to-have.
- **Consumer complaint channels.** SAMA-supervised banks must handle cardholder complaints, and the
  cardholder's bank is an easier, faster, free channel than any merchant support queue. This is the
  commercial risk the founder identified, stated precisely: **for a Saudi consumer, the bank is not the
  last resort, it is often the first one.** The only counterweight is a support experience that is
  faster and easier than calling the bank, and a policy that was unmistakably shown before payment.

### 5.3 Payment service providers (HyperPay, Moyasar, Tap, PayTabs, Checkout.com)

Merchant agreements are not public; the following are the requirements common to KSA acquiring and to
scheme rules that flow down into every one of these contracts. Verify the specifics with Uptal's
acquirer of record.

1. **A published refund and cancellation policy is a boarding condition.** KSA gateways require, at
   onboarding and on periodic review, a live website showing the legal entity name, commercial
   registration number, VAT registration number, contact details, prices with currency, the terms and
   conditions, the privacy policy, and the refund/cancellation policy, typically with the policy URL
   supplied in the application. The refund policy page is part of the merchant's licence to process, not
   an optional legal page.
2. **Scheme rules flow down.** The subscription requirements in 2.3 (enrolment confirmation, easy online
   cancellation, reminders, trial descriptors) are contractual obligations to the PSP, and breach is a
   ground for suspension independently of any dispute.
3. **Chargeback liability sits with the merchant, plus fees**, and every agreement reserves rolling
   reserves, settlement withholding, and termination for excessive disputes or scheme programme
   placement.
4. **Descriptor control.** Confirm the exact statement descriptor with the PSP and then publish it.
5. **Recurring credentials.** Confirm that initial 3DS authentication data is stored and referenced on
   every merchant-initiated renewal, and that the correct recurring/MIT indicators are sent. Ask
   directly; do not assume.
6. **Evidence retention.** Scheme dispute windows generally run to 120 days from the transaction, and
   further for some services-not-provided scenarios. **Retain the full evidence bundle for at least 18
   months, and preferably 24.** Uptal's own 7-day claim window in the policy has no effect on the
   scheme's window and must not be drafted as though it does.

### 5.4 ZATCA

Every charge already generates a compliant tax invoice under the live policy. Every correction must
generate a compliant **credit note**. Make sure the correction workflow produces one automatically; a
correction without a credit note is a tax problem attached to a payments problem.

## 6. What the checkout must capture (the evidence bundle)

The policy is one exhibit. This is the rest of the file that goes to the issuer. Everything here should
exist per transaction, be retrievable by order ID within minutes, and be exportable as a PDF.

**At the moment of purchase**
- Policy version identifier and content hash of the Refund Policy and Terms as displayed.
- The affirmative acceptance event: unticked checkbox ticked, or equivalent, with UTC timestamp,
  IP address, user agent, device fingerprint, and the language version displayed (EN or AR).
- A rendered screenshot or stored HTML of the checkout screen as the customer saw it, including the
  recurring disclosure block adjacent to the pay control.
- Plan, amount, currency (SAR), VAT, total, billing frequency, first charge date, next charge date.
- Authentication artefacts: 3DS version, ECI, CAVV/AAV, DS transaction ID, authentication result;
  AVS and CVV results where applicable.
- Authorisation code, ARN, PSP transaction ID, scheme, BIN country, last four digits.
- Account identity: email, OTP verification event, phone, account creation timestamp.
- For Talent Search: the identity of the purchasing user and their authority to bind the organisation.

**Immediately after purchase**
- Enrolment confirmation message (email and SMS), full content, send and delivery logs.
- ZATCA tax invoice.

**Throughout the period**
- Access and usage logs, per product, per the list in 2.1.
- Every transactional message sent, with delivery status.

**On renewal**
- Pre-renewal reminder where required or adopted, with delivery log.
- Renewal receipt with amount, period, descriptor and cancellation link.
- New authorisation code, ARN and MIT indicators referencing the initial authentication.

**On cancellation**
- Cancellation request timestamp, channel, IP, account.
- Cancellation confirmation message with effective date, sent and delivered.

**On any support contact**
- Full transcript, timestamped, retained, and screened for refund-adjacent language.

## 7. Standing risks to flag to the drafters

1. **Do not draft a chargeback waiver.** "You agree not to file a chargeback" is void, and it makes
   every other clause look like it was written in bad faith. Keep the contact-us-first construction.
2. **Do not extend the no-refund rule over fraud on the face of the policy.** See section 4.4.
3. **Do not shorten the claim window so far that it reads as a trap.** Seven days is defensible when it
   is expressly stated not to limit mandatory statutory rights. Keep that carve-out in.
4. **Do not let the policy and the Terms diverge.** Terms 6.2 currently references "verified billing
   errors and confirmed unauthorized charges" and Terms 7.7 references the score improvement guarantee.
   Both must be updated in the same release, or a cardholder will attach the stale Terms to their
   dispute and win on the inconsistency. An issuer reading two Uptal documents that contradict each
   other resolves the contradiction against Uptal.
5. **Removing the score improvement guarantee is correct but has a timing risk.** Anyone who purchased
   under the old policy bought a product that included a money-back guarantee. Retroactive removal is
   both a legal problem and a 13.5 misrepresentation dispute waiting to happen. The live policy already
   says changes do not apply retroactively to charges already processed; make sure that clause survives
   and that support honours the old guarantee for pre-change orders. This is the one place where paying
   is cheaper than refusing.
6. **If free trials are ever launched**, the Visa trial descriptor and the 7-day reminder become
   mandatory. Note it now so the growth team does not ship a trial into a rules breach.

---

## CLAUSES THE POLICY MUST CONTAIN TO WIN DISPUTES

Drafting instructions. Each is a clause or an operative sentence the drafters must place in the new
Refund Policy.

1. **Draft a "how this Policy is presented and accepted" clause.** State that the Policy is displayed at
   checkout and must be affirmatively accepted before any payment is taken; that Uptal records the
   Policy version, the date and time of acceptance, the IP address and device from which it was
   accepted, and the transaction to which it relates; and that this record is evidence of the customer's
   agreement. This clause is the exhibit that decides Visa 13.6 and 13.7.

2. **Draft the recurring disclosure into the Policy itself, not only into the checkout.** State for each
   subscription product: that it renews automatically until cancelled, the billing frequency, that the
   renewal is charged on the anniversary date, that the applicable price is the then-current published
   price, and that the amount, frequency and next charge date are disclosed before payment, restated in
   the enrolment confirmation, and visible in the account at all times.

3. **Draft the cancellation procedure with named, checkable steps.** Give the exact in-account path, give
   support@uptal.com as an alternative, state that cancellation is available at any time without
   contacting a person, state that it takes effect at the end of the current paid period, and state that
   a cancellation submitted after a renewal charge has been authorised does not affect that charge.
   Precision here is what makes "the cardholder did not follow the disclosed procedure" provable.

4. **Draft a clause committing Uptal to send, and to retain proof of, four messages:** an enrolment
   confirmation with full terms and a cancellation link; a receipt on every charge including every
   renewal; a cancellation confirmation stating the effective date and that no further charge will
   occur; and any reminder required by the applicable card scheme rules. Frame it as what Uptal does,
   not as a customer entitlement, so it creates evidence without creating a remedy.

5. **Draft the enumerated no-alternate-remedy clause.** No refund, reversal, credit, voucher, coupon,
   discount, account balance, extension of term, free period, set-off, deduction, withholding,
   compensation, damages in lieu, or goodwill gesture. Name every one so that none can be argued as
   "not technically a refund" by a cardholder or an issuer.

6. **Draft a no-variation clause naming support explicitly.** No employee, agent, contractor, reseller,
   automated assistant or support response may vary this Policy, grant any refund or credit, or create
   any entitlement, except by signed writing from an authorised officer of Uptal. This is the direct
   defence against "credit not processed" arising from a support promise.

7. **Draft an ex gratia and no-precedent clause.** Any payment Uptal elects to make in any individual
   case is voluntary and ex gratia, is not an admission, and creates no precedent, no entitlement and no
   course of dealing. Pair it with a no-waiver clause.

8. **Draft the statement descriptor into the Policy.** State the exact descriptor string that will
   appear on the cardholder's statement and in their bank app, and instruct the customer to contact
   support@uptal.com before contacting their bank if they do not recognise a charge. This reduces
   unauthorised-transaction disputes filed simply because an Arabic legal entity name was unrecognised.

9. **Draft a currency and bank charges clause.** All charges are in Saudi Riyals; VAT at the prevailing
   rate is added; any currency conversion, foreign transaction fee, or intermediary charge applied by
   the customer's own bank is outside Uptal's control, forms no part of the amount charged by Uptal, and
   is not a ground for any refund or adjustment.

10. **Draft a per-product delivery clause that is concrete and evidenceable.** For each of Talent Search,
    Auto-Apply and CV Enhancer, state in specific terms what is made available and what Uptal does, and
    state that Uptal's access, usage, submission and delivery records are evidence of delivery. Vague
    deliverables lose "services not received" and "not as described"; specific ones win them.

11. **Keep and foreground the no-guarantee language in the Refund Policy itself.** Uptal does not
    guarantee interviews, offers or employment; AI output is probabilistic and may be inaccurate;
    match counts, response rates and outcomes vary and are not guaranteed. Place it adjacent to the
    no-refund rule so a single extract answers a "not as described" dispute.

12. **Draft the authorised-payer warranty.** The person completing checkout warrants that they are the
    cardholder or are authorised by the cardholder and, for business purchases, by the organisation, to
    make the purchase and to accept this Policy; and that they will not permit any other person to use
    the card or the account. This is the clause that answers the family-member and employee versions of
    an unauthorised-transaction claim.

13. **Draft the contact-us-first clause and stop there.** Require the customer to contact
    support@uptal.com before initiating a bank dispute, set out the consequences of filing against a
    valid charge (suspension or termination, contest with records, recovery of the amount plus
    documented costs and chargeback fees, and that the filing does not extinguish amounts owed), and
    **do not draft any purported waiver of the right to file a chargeback.** Such a waiver is void under
    scheme rules and damages Uptal's credibility in arbitration.

14. **Draft cost recovery as a separate debt, never as a deduction.** Where Uptal recovers chargeback
    costs or fees, state that they are recovered as a separate amount due from the customer and are not
    deducted or netted from any correction, refund or other payment. mada rules require corrections to
    be paid in full with no deductions.

15. **Draft the corrections section as the recast, not as a stripped deletion, and define both cases
    narrowly.** Head it as the correction of charges that are not payments for services, state expressly
    that a correction is not a refund and does not derogate from the absolute no-refund rule. Define a
    duplicate charge as two or more successful charges of the same amount, for the same subscription
    period, on the same account, within a short interval, where only one entitlement was created. Define
    an unauthorised charge as one made without the cardholder's authority and not by any person to whom
    the cardholder gave access to the card, the device or the account. Keep the strict conditions:
    written notice within a short window, evidence, cooperation, Uptal's determination final to the
    maximum extent permitted, original payment method only, payer of record only.

16. **Draft a correction turnaround into the text.** State that an approved correction is processed to
    the original payment method, in full and without deduction, within a stated number of business days,
    and that a compliant tax credit note is issued. A stated and met turnaround is what makes a "credit
    not processed" dispute unarguable.

17. **Keep the statutory savings clause, and keep it narrow.** State that nothing in the Policy limits
    any right under mandatory Saudi law that cannot be waived, and that every provision applies subject
    to and to the maximum extent permitted by that law; but do not phrase it as a general refund route.
    Its function is to let a Saudi forum read the rest of the Policy down rather than strike it as
    abusive, and to satisfy an acquirer's underwriting review.

18. **Draft the time bar with an express carve-out.** Any claim relating to a charge must be raised in
    writing within the stated window or is waived to the extent permitted by law, and state expressly
    that this does not limit any right under mandatory Saudi law. Do not draft it as though it limits
    the card scheme's own dispute window, because it cannot.

19. **Draft severability with a blue-pencil instruction.** If any provision is held unenforceable, it is
    read down to the maximum permitted extent and the remainder survives, with the no-refund rule
    preserved so far as possible. This is what keeps a single struck clause from taking the Policy with
    it.

20. **Draft a non-retroactivity clause for Policy updates and honour it.** Updates take effect on
    publication and do not apply retroactively to charges already processed. This protects Uptal against
    a misrepresentation dispute from customers who bought the CV Enhancer while the score improvement
    guarantee was published, which is the one scenario in this whole document where paying is cheaper
    than refusing.

21. **Align the Terms & Conditions in the same release.** Terms 6.2 and 7.7 both reference remedies that
    the new Policy removes. Update them together, because an issuer handed two contradictory Uptal
    documents resolves the contradiction against Uptal.

22. **Publish the same policy everywhere it is published.** The website page, the Maroof register entry
    and the Arabic version must state the same rule. A divergence between them is the easiest finding a
    regulator or a complaining consumer will ever make.
