# ADVERSARIAL REVIEW: master_en.md read as evidence in a card scheme dispute

**Reviewer role:** card scheme dispute arbitrator, deciding a chargeback between a cardholder and Uptal
(شركة الخبرات الصاعدة لتقنية المعلومات) as merchant of record.
**Evidence considered:** `master_en.md` (the new Refund Policy, Annex A and Annex B), the live English Refund
Policy, the live Terms & Conditions.
**Date of review:** 7 September 2026.

---

## 0. The standard I actually apply, and why most of this document does not reach me

Before the findings, the merchant needs to understand what a dispute arbitrator does with a refund policy,
because the document has been drafted as though the policy itself decides the case. It does not.

1. **Scheme rules outrank the merchant's contract.** A merchant cannot, by its terms, remove a cardholder's
   dispute right, redefine "authorised", redefine "services provided", shorten a scheme filing window, or
   make its own records "conclusive". Every deeming clause in Section 3, and the "conclusive evidence"
   agreement in Section 12.2, binds Uptal and the cardholder as between themselves. It does not bind the
   issuer and it does not bind me.
2. **What the policy is worth to me is narrower than what it says.** It is worth exactly three things:
   (a) proof of what was disclosed before payment, (b) proof of the cancellation procedure that was
   disclosed, and (c) a description of what delivery consists of, against which I test the merchant's
   delivery evidence. The document is outstanding on (a), very strong on (b), and thin on (c).
3. **A policy is also a source of admissions.** Everything the merchant writes down can be used against it.
   This document writes down, in operative published text, several facts that a competent cardholder
   representative will simply photocopy and file. Those are the findings marked CRITICAL below.
4. **Volume matters more than any single case.** A no refund policy with no reminders, one cancellation
   channel and no money remedy of any kind removes every tool that keeps a dispute ratio down. Uptal will
   not lose most of these cases. Uptal will lose a predictable minority and will fight all of them, at a
   dispute fee each, with every item landing in the VAMP / VDMP / ECM numerators. Several findings below
   are aimed at that, not at any one ruling.

---

# PART 1. REASON CODE BY REASON CODE

---

## 1. Visa 13.2 / Mastercard 4841 / Amex C28: Cancelled Recurring Transaction

This is the highest volume exposure in the portfolio. Auto-Apply is a consumer monthly subscription, sold
with no renewal reminder, cancellable through exactly one control.

### 1.1 CRITICAL. Section 4.4 hands me the merchant's own record of a cancellation dated before the transaction

**Text attacked (Section 2.1, definition of "Initiated"):**
> "**"Initiated"** means, in relation to a Charge, the moment at which Uptal's billing systems create the
> transaction record for that Charge and submit it for authorisation, as recorded in the Records, whether or
> not authorisation has at that moment been completed"

**Text attacked (Section 4.4):**
> "A Renewal Charge that has been Initiated is valid, is fully earned once it is Successfully Charged, and is
> unaffected by any cancellation completed or recorded after the moment of Initiation, **including a
> cancellation completed or recorded before the authorisation of that Charge has completed.**"

**The attack.** Under Visa 13.2 the question I ask is whether the cardholder cancelled in accordance with the
merchant's disclosed cancellation policy before the transaction. The transaction date is the authorisation
date. Uptal has invented an earlier private cut off, "Initiation", which is a moment inside Uptal's own
billing stack that no cardholder can observe, that appears on no statement, and that no scheme recognises.
The clause then expressly contemplates the exact fact pattern that decides the case against the merchant: a
cancellation completed and recorded in Uptal's systems **before the charge was authorised**. When Uptal files
its representment, it will attach its own Records showing a cancellation timestamp earlier than the
authorisation timestamp. I rule for the cardholder on the merchant's own exhibit. The clause does not protect
the charge; it manufactures the losing document.

Note also that the "advice" to cancel 24 hours ahead is not a term. Section 4.4 says "you are advised to
complete it not less than twenty four (24) hours before your Renewal Date". Advice creates no obligation, so
it gives Uptal no defence, while simultaneously signalling to a regulator that same day cancellation may not
work. It has all of the cost and none of the benefit.

**Redraft (Section 4.4, replacing the second paragraph and the advisory sentence):**
> "To prevent the next Renewal Charge, the cancellation must be completed and recorded in Uptal's systems
> before that Charge is authorised. Where a cancellation is completed and recorded before a Renewal Charge
> has been authorised, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) does not complete that Charge, and any
> authorisation already obtained for it is released. Not completing a Charge in these circumstances is not a
> refund, is not a Correction under Section 10, and creates no entitlement of any kind.
>
> A Renewal Charge that has been authorised is valid, is fully earned, and is unaffected by any cancellation
> completed or recorded after that authorisation, including one completed in the same minute, the same hour,
> or the same day. Cancellation then takes effect only from the end of the Billing Period created by that
> Charge, and the fact that a cancellation was in progress, incomplete, attempted, intended, or
> contemporaneous with the Charge is not a ground for any refund, credit, reversal, extension, compensation,
> or other remedy of any kind."

Then delete "Initiated" from Section 2.1 and replace every use of it in Sections 4.4, 4.5, 6.3, 12.1 and 12.2
with "authorised". This costs Uptal nothing in refunds: releasing an unsettled authorisation is not a payment
back, it is a charge that never completes. It removes the single most self damaging clause in the document.

### 1.2 CRITICAL. The disclosed cancellation path is unverified, and a wrong path is worse than no path

**Text attacked (Section 4.3):**
> "The path is: **Account, then Billing, then Cancel subscription.**"

**Text attacked (Annex B.1, item 1, the merchant's own admission):**
> "If the real path differs by one word, change the product or change Sections 4.3, 7.4, 8.3 and 17 so they
> match exactly."

**The attack.** Naming a precise path is excellent drafting and, if the path is right, it wins cases. If it is
wrong by one label, it loses every case at once and it loses them worse than silence would have. The
cardholder screenshots the account settings, shows that there is no "Billing" tab, and I find that the
merchant published a cancellation procedure that did not exist. That converts a routine 13.2 into an
"inaccurate cancellation policy" finding, and it damages Uptal's credibility on every other exhibit in the
same file, including the Records that the policy asks me to treat as conclusive. Under Amex C28 the same
finding is close to dispositive, because Amex requires a clearly disclosed and workable cancellation method
and decides ambiguity against the merchant.

Publishing this policy with an unverified path is not a drafting risk, it is an operational blocker.

**Fix (no drafting change if the path is right; verification step):** before publication, a named person opens
a live paid account of each product and screen records the cancellation, and the exact on screen labels are
transcribed into Sections 4.3, 7.4, 8.3 and 17. If the labels differ, the policy changes, not the screenshot.
If the label set differs between web and mobile app, the policy must name both, for example:
> "The path is: Account, then Billing, then Cancel subscription. In the Uptal mobile application the path is:
> Profile, then Manage subscription, then Cancel subscription."

### 1.3 HIGH. Section 4.13 promises receipts but not the cancellation instructions that Visa and Mastercard require on them

**Text attacked (Section 4.13(b)):**
> "(b) a receipt for every Charge, including every Renewal Charge; and"

**The attack.** Visa's subscription merchant requirements and Mastercard's negative option billing rules both
require that the transaction receipt or confirmation sent after each billing tell the cardholder how to
cancel. A receipt with an amount and a date and nothing else does not satisfy that. Where the merchant has
not met the scheme's own subscription disclosure requirements, I resolve a 13.2 or a 4841 against the
merchant almost automatically, because the cardholder is treated as not having been given the means to stop
the billing. This is a one line fix that turns a compliance gap into the single best exhibit Uptal can file.

**Redraft (Section 4.13(b)):**
> "(b) a receipt for every Charge, including every Renewal Charge, stating the product and plan, the amount,
> the currency, the date of the Charge, the date of the next Charge, and how to cancel, including a direct
> link to the self-service cancellation function in your Uptal account settings; and"

### 1.4 HIGH. Section 4.9 contradicts itself and, read the way a cardholder reads it, promises money

**Text attacked (Section 4.9, first paragraph):**
> "the cancellation is treated as having been completed and recorded at the time of your first attempt so
> recorded, and no further Charge falls due after that time."

**Text attacked (Section 4.9, second paragraph):**
> "Where a Renewal Charge has already been Successfully Charged before the cancellation is so treated, the
> Billing Period purchased by that Charge runs to its end, that Charge remains fully earned and final"

**The attack.** These two sentences cover the same facts and give opposite answers. The cancel control fails
on 1 March. The renewal charges on 12 March. Uptal investigates on 20 March. Under the first paragraph, the
cancellation is deemed complete on 1 March and no further charge fell due, so the 12 March charge should not
have happened. Under the second paragraph, the 12 March charge was "already Successfully Charged before the
cancellation is so treated", so it stands. The second limb swallows the first in every real case, because the
deeming always happens after the charge. A cardholder reads paragraph one, is charged anyway, and files. In a
contract of adhesion I read the ambiguity against the drafter, and the cardholder wins on the merchant's own
safe harbour clause. This is also the clause the merchant most wants to be able to point at, so it should be
made to work.

**Redraft (Section 4.9, second paragraph, first sentence):**
> "Where a Renewal Charge was Successfully Charged before the time of your first recorded attempt, that
> Charge is unaffected by this Section, the Billing Period purchased by it runs to its end, that Charge
> remains fully earned and final, and no refund, credit, extension, or other remedy described in Section 5.2
> is issued in respect of it. Where a Renewal Charge was authorised after the time of your first recorded
> attempt, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) treats that Charge as one that should not have been
> made, does not complete it, and where it has already been completed reverses it under Section 10, that
> reversal being a correction of a billing event and not a refund of any Uptal service."

This is founder compatible: the corrected charge is by definition a charge for a period the subscriber had
already cancelled, which is precisely the Section 10 theory of a billing event that bought no service.

### 1.5 MEDIUM. The policy affirmatively states that no renewal reminder is sent, on billing intervals where a scheme rule requires one

**Text attacked (Section 4.3, and again at 4.13 and 8.2):**
> "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) does not send renewal reminders or pre-renewal notices, is
> under no obligation to send any renewal reminder or advance notice of any renewal or of any price"

**Text attacked (Section 7.3), which confirms the intervals concerned exist:**
> "This applies to all billing cycles and plan durations, including monthly, quarterly, and annual plans"

**The attack.** Mastercard's subscription rules require a pre-renewal notification between 7 and 30 days
before a renewal on billing intervals of six months or more. Uptal sells annual Talent Search plans. The
policy therefore publishes, in operative text, a statement that Uptal does not do a thing that a scheme rule
requires it to do on those plans. In an arbitration on an annual plan I do not need the cardholder to prove
non-delivery of a notice; the merchant's own published policy proves it. The same text is discoverable by the
acquirer and by a scheme compliance function.

The founder's decision (R10) is that no reminders are sent to anyone. That decision can be kept for consumer
purposes without publishing a scheme rule breach. The policy does not have to promise a notice; it only has
to stop asserting that none is ever sent.

**Redraft (the second sentence of the third paragraph of Section 4.3, and the corresponding sentences in
Sections 4.13 and 8.2):**
> "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) does not send renewal reminders or pre-renewal notices,
> other than any notice that an applicable card scheme rule requires for the billing interval concerned, and
> is under no obligation to send any other renewal reminder or advance notice of any renewal or of any price.
> No such notice, and no reminder of any kind, is a condition of any Charge, and the absence, non-sending,
> non-delivery, delayed delivery, filtering, blocking, deletion, non-opening, or non-reading of any reminder,
> notice, receipt, invoice, confirmation, or other communication before a Renewal Charge is not a ground for
> any refund, correction, dispute, credit, reversal, extension, compensation, or other remedy of any kind,
> and does not affect the validity or the finality of any Charge or of the authorisation given under
> Section 4.2."

The alternative, if the founder prefers absolute silence on notices, is to stop selling billing intervals of
six months or more. That is Annex B.6's open question and it needs an answer before publication, not after.

### 1.6 MEDIUM. Single channel cancellation with no fallback, in a document that also kills every fallback

**Text attacked (Section 4.5):**
> "None of the following cancels a Subscription ... submitting a Ticket at https://uptal.com/contact-us, of
> any reason type, including a Ticket that asks for the Subscription to be cancelled, and whatever the Ticket
> says"

**The attack.** I accept that self service cancellation is the disclosed method and that a ticket is not it.
That part is defensible and, as drafted, clear. The problem is what happens to the subscriber who cannot
reach the control: a lost password on a dead email address, an account lockout, a suspended account. The
policy contemplates suspension by Uptal (Section 5.6) and suspension for non-collection (Section 13.6) while
Section 5.6 also says billing stops on suspension, which is good, but Section 11.3(a) allows suspension of
"every account operated or controlled by you" on a dispute, and nothing anywhere says what a locked out
subscriber does to stop billing. Faced with a cardholder who says "I could not get in and there was no one to
tell", and a merchant whose policy says every other channel is a nullity, I rule for the cardholder and I
note the absence of any escape hatch as an aggravating fact.

The fix is not a support cancellation route, which the founder has ruled out. It is a statement that access
is restored so the subscriber can use the control, and that billing does not continue during a lockout caused
by Uptal.

**Redraft (add as a new final paragraph of Section 4.5):**
> "Where you are unable to reach the self-service cancellation function because you have lost access to your
> Uptal account, you must use the account recovery and password reset facilities available on the Uptal
> website. Where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has suspended or disabled your access to your
> account, no further Renewal Charge is made while that suspension continues, in accordance with Section 5.6.
> Restoring access to an account, and the cessation of further Charges under Section 5.6, are not refunds,
> are not Corrections under Section 10, and create no entitlement of any kind."

---

## 2. Visa 13.1 / Mastercard 4855 and 4853 / Amex C08: Merchandise or Services Not Received

### 2.1 CRITICAL. Section 5.5 is a published admission that a cardholder can pay in full and receive nothing

**Text attacked (Section 5.5):**
> "Where a Charge has been Successfully Charged and the access, entitlements, or Allowances for the Billing
> Period to which it relates were not in fact opened, issued, or made operative in your account, your sole
> and exclusive remedy, and the entire liability of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), is, **at
> Uptal's election**, the opening and issuing of that access and those entitlements and Allowances, or the
> restarting of the Billing Period concerned from the date on which they are opened."

**The attack.** This is the most damaging sentence in the document, and it damages the merchant more than any
sentence a consumer lawyer could have drafted for it. Read to me in a 13.1, it says: Uptal accepts that a
charge can be taken while nothing at all is provisioned; Uptal will not return the money in that case; and
whether the customer even gets the service opened is at Uptal's election. A merchant defending "services not
provided" has just conceded, in its own published policy, the possibility of the precise fact the cardholder
alleges, and has stated that its answer to that fact is to keep the money. I rule for the cardholder, and I
would do so even where Uptal later opened the access, because "restarting" is offered as an alternative that
Uptal may decline in favour of simply switching it on part way through a period the cardholder paid for in
full.

There is also an internal contradiction with Section 3.5, which says the Billing Period is "a single, entire,
and indivisible unit of service". If the period is indivisible, then opening access on day 20 of a 30 day
period delivers less than the indivisible unit sold, and Section 5.5 permits exactly that.

**Redraft (Section 5.5, first paragraph):**
> "Where a Charge has been Successfully Charged and the access, entitlements, or Allowances for the Billing
> Period to which it relates were not in fact opened, issued, or made operative in your account, Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) opens and issues that access and those entitlements and Allowances,
> and the Billing Period concerned runs, in full and without abatement of its length, from the date on which
> they are opened, so that you receive the whole of the Billing Period you purchased. That is your sole and
> exclusive remedy and the entire liability of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in respect of
> the matter. That remedy is a re-performance of the service purchased and is governed by Section 5.4. No
> payment of any kind is made under this Section, and this Section is not a Correction under Section 10."

That single change removes the admission, keeps the no refund rule intact, and gives me something to rule on
for the merchant: the cardholder received the entire period bought, merely later. Combined with the delivery
records at Part 2 below it turns a lost 13.1 into a winnable one.

### 2.2 CRITICAL. Section 3.7 tells me the cardholder bought nothing in particular

**Text attacked (Section 3.7):**
> "No particular feature, function, interface, design, integration, data source, job source, employer,
> candidate, record, Allowance level, throughput, volume, response time, model, algorithm, language, or
> method of delivery forms part of the subject matter of any purchase or of the consideration for any
> Charge"

**The attack.** The clause is aimed at product change, which is a legitimate aim. As written it says something
much larger and much worse: that the subject matter of the purchase is empty. In a 13.1 or a 13.3 I ask what
the cardholder was sold and whether it was supplied. If the merchant tells me nothing in particular was sold,
the only description of the bargain in evidence is the point of sale page and the advertising, which is
exactly the material this clause was meant to neutralise, and which Section 1.7 already concedes may be a
contractual document under Article 10 of the Saudi E-Commerce Law. The clause therefore fails on its own
terms and hands the cardholder the point of sale page as the operative description. It also reads, to a
regulator, as an attempt to sell an unspecified thing, which is the definition of an arbitrary term in an
adhesion contract.

**Redraft (Section 3.7, second sentence):**
> "Each Charge purchases the making available to you, for the relevant Billing Period, of the Uptal product
> concerned as described to you at the point of sale. No particular feature, function, interface, design,
> integration, data source, job source, employer, candidate, record, throughput, volume, response time,
> model, algorithm, language, or method of delivery is warranted to remain available, to remain unchanged, or
> to be available at any particular level for the whole or any part of a Billing Period, and Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) may add to, alter, replace, or remove any of them, subject to
> Section 14.3. Allowance levels are those disclosed for your plan at the point of sale, in accordance with
> Section 1.6. The addition, alteration, replacement, reduction, or removal of any matter described in this
> Section does not constitute a failure of performance, a partial failure of consideration, or a breach, and
> does not affect the finality of any Charge."

### 2.3 HIGH. Section 12.2 asks me to accept an evidential agreement instead of evidence

**Text attacked (Section 12.2):**
> "the Records ... constitute conclusive evidence of the fact, amount, currency, time, and authorisation of
> each Charge, of the moment of Initiation of each Charge, of the opening of access, of the entitlements and
> Allowances issued to your account, of the work performed for you"

**The attack.** An agreement between merchant and cardholder about the weight of the merchant's own records is
not binding on the issuer or on me. Worse, it is two edged: Section 12.2 also makes the Records conclusive of
"the date and content of every cancellation, cancellation attempt", so where a cardholder produces a
cancellation attempt from Uptal's own logs, Uptal has contractually conceded that it is conclusive. And the
clause is a substitute for the thing that would actually win the case, which is a named, per product,
per period delivery artefact. Uptal's own Annex B.2 concedes the point: "An account that is charged and
produces zero activity for a whole period is the one case where the clause is paper only, and it is also the
case an issuer decides against the merchant on a Visa 13.1 'services not provided' dispute."

The clause should stay, because it is useful before a Saudi court. It should stop being the merchant's whole
delivery case.

**Redraft (add a new Section 12.1A, "The delivery record", immediately after Section 12.1):**
> "**12.1A The delivery record.** For each Charge, the Records include a delivery record for the Billing
> Period or order concerned, comprising at least the following, with timestamps: for Uptal Talent Search, the
> opening or maintenance of platform access to the account and the issue of the unlock Allowance for that
> Billing Period; for Uptal Auto-Apply, the activation of the Subscription for that Billing Period and the
> matching, tailoring, and submission activity recorded against the account during it; and for Uptal CV
> Enhancer, the opening of the order and the making available of the deliverable in your Uptal account or its
> sending to the email address recorded on your account. The delivery record is the record of the making
> available of the service for the purposes of Section 3.3."

Every representment then attaches one exhibit that answers the only question a 13.1 asks.

### 2.4 HIGH. Section 14.3 lets Uptal stop supplying mid period and keep an annual fee

**Text attacked (Section 14.3):**
> "Where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) permanently discontinues a paid product during a
> Billing Period for which you have been Successfully Charged, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات)
> **may, at its sole discretion**, make available to you a substitute or successor Uptal product for the
> remainder of that Billing Period."

**The attack.** An employer pays for an annual Talent Search plan on 1 January. Uptal sunsets Talent Search on
15 January. Under this clause Uptal keeps twelve months of fees, supplies fifteen days, and may choose to
supply nothing else. That is a 13.1 and a 13.7 that I decide for the cardholder without hesitation, and the
availability theory in Section 3.3 does not save it, because availability itself ceased. It is also the fact
pattern most likely to attract a Saudi consumer protection finding, because it is the merchant, not the
customer, that terminated performance.

Making the substitute mandatory costs no refund and closes the code.

**Redraft (Section 14.3, third paragraph):**
> "Where a product is permanently discontinued, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) ceases to
> charge for it with effect from the end of the Billing Period then current. Where Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) permanently discontinues a paid product during a Billing Period for
> which you have been Successfully Charged, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) continues to make
> that product, or a substitute or successor Uptal product selected by Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات), available to you for the remainder of that Billing Period, so that
> you receive the whole of the Billing Period you purchased. Any such continuation or substitution is a
> re-performance of the service purchased, is governed by Section 5.4, is not a refund, a credit, or an
> extension, does not entitle you to any choice of product or to any comparison of value, and creates no
> precedent and no entitlement in any other case."

### 2.5 HIGH. Suspicion is enough to forfeit an unperformed period

**Text attacked (Section 5.6):**
> "for **suspected** fraud, abuse, scraping, credential sharing, or misuse ... all amounts already
> Successfully Charged remain fully earned, final, and not refundable; the remainder of the Billing Period
> then current is forfeited"

**The attack.** Termination for cause with forfeiture is defensible when the merchant can evidence the cause.
It is not defensible on suspicion alone. In a 13.1 the cardholder says the merchant cut off the service it had
been paid for; the merchant's answer is "we suspected something". I have no finding of breach in front of me
and I rule for the cardholder for the unserved part of the period. The clause as drafted also invites the
cardholder's best framing, which is that the merchant terminated to keep the money.

**Redraft (Section 5.6, first paragraph opening):**
> "Where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) suspends, restricts, disables, or terminates your
> account or your access to any product, in whole or in part, by reason of your breach of this Policy or of
> the Terms & Conditions, or on the ground of fraud, abuse, scraping, credential sharing, or misuse where
> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has reasonable grounds, recorded in the Records at the time,
> for concluding that it has occurred, or for legal, regulatory, sanctions, or payment scheme reasons, or on
> any other ground permitted by the Terms & Conditions: ..."

Add, as a new final sentence of the first paragraph:
> "Where a suspension imposed pending investigation is lifted because no breach is established, access is
> restored and the Billing Period concerned is extended by the length of the suspension. That extension is a
> re-performance of the service purchased, is governed by Section 5.4, and is not a refund, a credit, or a
> Correction under Section 10."

### 2.6 HIGH. Section 11.3(a) is cross default: one small dispute kills every paid product on every account

**Text attacked (Section 11.3(a)):**
> "suspend, restrict, disable, or terminate your access to the affected product, **to every other Uptal
> product, and to every account operated or controlled by you** or by any person acting with you or on your
> behalf, **whether pending or following its investigation**"

**The attack.** A job seeker disputes a 99 SAR Auto-Apply renewal. Under this clause Uptal may, before any
investigation, terminate a separately purchased and separately paid CV Enhancer order and, if the same person
controls a company account, an annual Talent Search subscription. Uptal has now created a second dispute,
larger than the first, on charges that the cardholder never questioned, and that second dispute is a clean
13.7 (cancelled services) or 13.1 that I decide for the cardholder. A punitive cross default triggered by the
exercise of a scheme right is also the kind of term that draws a scheme compliance enquiry rather than a
single ruling.

**Redraft (Section 11.3(a)):**
> "(a) suspend, restrict, disable, or terminate your access to the product to which the disputed Charge
> relates, following its investigation, and, where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has
> established a breach of Section 11.2, decline to accept any future order, Subscription, or payment from
> you. Access to any other Uptal product for which a Charge has been Successfully Charged and which is not
> the subject of a dispute continues for the remainder of the Billing Period already charged for;"

---

## 3. Visa 13.7 / Mastercard 4853 / Amex C05: Cancelled Merchandise or Services

Covered by findings 2.4, 2.5 and 2.6. One additional point.

### 3.1 MEDIUM. Section 4.14 sends app store customers into a rule set Uptal then punishes them for using

**Text attacked (Section 4.14, read with Section 11.7):**
> "billing, renewal, cancellation, and any request for a reversal are governed by that store's or platform's
> own terms and rules, over which Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has no control"

and

> "Any reversal effected by such a store, platform, or provider ... does not derogate from this Policy, and
> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may treat the corresponding Subscription as terminated and
> the remaining Billing Period as forfeited."

**The attack.** Apple and Google refund unilaterally, under their own rules, without asking the developer. The
policy tells the customer that those rules govern, and then treats the customer's use of them as a ground to
terminate and forfeit. Where the store has already refunded, Uptal terminating is commercially reasonable.
Where the store has refunded only part, or refunded a different period, the customer is left having paid for
a period Uptal has terminated, and files. Small volume, but it is avoidable.

**Redraft (Section 11.7, first paragraph, final clause):**
> "and Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may treat the corresponding Subscription as terminated
> and the Billing Period to which the reversed amount relates as forfeited, to the extent of the amount
> reversed. Where an amount is reversed in part only, access continues for the part of the Billing Period
> that remains paid for."

---

## 4. Visa 13.3 / Mastercard 4853 / Amex C31: Not as Described or Defective

### 4.1 CRITICAL. Section 8.6 disclaims the feature the product is sold on

**Text attacked (Section 8.6):**
> "**No exclusion, blocklist, filter, or targeting preference is warranted to be applied, complete, or
> effective.**"

**The attack.** A 13.3 asks whether what was supplied matched what was described at the time of purchase. If
the Auto-Apply purchase flow lets the user set preferences and exclusions, and if any part of the marketing
says the user controls where applications go, then a disclaimer buried in a refund policy does not cure the
mismatch, it evidences that the merchant knew of it. The strongest version of the cardholder's case is:
"Uptal sold me a control over where my CV goes, applied for a job at my current employer, and its policy says
the control was never warranted to work." That is a 13.3 I decide for the cardholder, and under Article 10 of
the Saudi E-Commerce Law, which Section 1.7 already concedes, the advertising is a contractual document that
supplements the contract.

The fix is not to weaken the disclaimer. It is to move it to where it does legal work: the point of sale and
the preference screen itself. A disclaimer disclosed before payment is a term; the same words in a refund
policy read afterwards are an admission.

**Redraft (Section 8.6, third paragraph, second sentence):**
> "No exclusion, blocklist, filter, or targeting preference is warranted to be applied, complete, or
> effective, and this is disclosed to you before you subscribe and again in your Uptal account wherever
> exclusions and targeting preferences are configured. Your acceptance of that disclosure is recorded in the
> Records."

Operational consequence, for Annex B: the words must actually appear at checkout and on the preferences
screen, and the acceptance must be logged. Without that, the clause remains an admission.

### 4.2 MEDIUM. The AI accuracy disclaimer is good, and is undermined by the price justification

**Text attacked (Sections 6.2 and 8.6):**
> "that this is an agreed characteristic of the service you have purchased and not a defect in it, and that
> the price you pay reflects it"

**The attack.** "The price you pay reflects it" is a factual assertion about pricing that the merchant will be
asked to evidence and cannot. If the same product was sold at a higher price last quarter, or is sold at
different prices to different users, the assertion is falsified and it taints the clause it sits in. It adds
nothing: the disclaimer works without it.

**Redraft:** delete the words "and that the price you pay reflects it" in both places, ending the sentence at
"not a defect in it".

---

## 5. Visa 13.5 / Mastercard 4849 and 4834: Misrepresentation

### 5.1 CRITICAL. A published legal document containing a bracketed editorial note

**Text attacked (Section 13.6):**
> "the Uptal statement descriptor, **UPTAL** [PRE-PUBLICATION NOTE: insert here, character for character, the
> exact statement descriptor string registered with Uptal's acquirer, and delete this note before
> publication]"

**The attack.** If this reaches the live page it is exhibit A in every dispute for the life of the document. It
tells me the merchant published a legal instrument it had not finished, did not know its own statement
descriptor, and was not in a position to tell cardholders what would appear on their statements. It converts
"cardholder does not recognise the charge" from the cardholder's problem into the merchant's. It also
undercuts Section 11.1, which requires the cardholder to contact Uptal before the bank when they do not
recognise a charge, since the policy itself does not say what to look for.

**Fix:** obtain the exact descriptor string from the acquirer, insert it character for character, delete the
note. This is a publication blocker, not a drafting note. Separately, since the merchant of record's legal
name is an Arabic string, the descriptor must be a Latin string a Saudi cardholder recognises, ideally
`UPTAL` plus a product token and a contact string permitted by the acquirer, for example
`UPTAL AUTOAPPLY UPTAL.COM`.

### 5.2 MEDIUM. "Cancellation is available to you at any time, without charge"

**Text attacked (Section 4.3):**
> "Cancellation is available to you at any time, without charge, without giving a reason, and without
> contacting any person."

**The attack.** In the fact pattern this policy is built for, a subscriber cancels four minutes after a
renewal charge and pays a full month. "Without charge" is true of the act of cancelling and false of the
experience, and it is exactly the phrase a cardholder quotes back to me. Section 6.9 already anticipates the
problem for third party statements ("statements refer to your ability to prevent future Charges and never to
the reversal of a Charge already made") but does not apply the same cure to Uptal's own sentence in 4.3.

**Redraft (Section 4.3, second sentence of the first paragraph):**
> "Cancellation is available to you at any time, without giving a reason and without contacting any person.
> No fee is payable for cancelling. Cancelling prevents future Charges only. It does not reverse, reduce,
> or apportion a Charge already made, and it does not shorten the Billing Period that Charge purchased."

### 5.3 HIGH. The legacy score improvement guarantee has a channel that no longer exists and a window that has already run

**Text attacked (Section 9.7):**
> "Any claim under that guarantee must be made within the period stated in that version, running from
> delivery of the final enhanced CV for the order concerned, and, the support email address referred to in
> that version having been retired, must be made by a Ticket"

**The attack.** The guarantee in the live policy required a claim "by contacting support@uptal.com within
seven (7) calendar days of delivery". On publication day, Uptal retires that address. A customer whose seven
days are running was told, by the version that governs their order, to email an address that now bounces. If
they email it and hear nothing, they have a genuine grievance, a documented reliance on the merchant's own
instruction, and a 13.5 that I decide for the cardholder along with an Article 10 advertising exposure if the
guarantee was ever advertised. Annex B.5.17 already identifies that paying these claims is cheaper than
refusing them; the policy text should make that operational rather than leaving the customer to discover a
dead mailbox.

**Redraft (Section 9.7, third paragraph, adding a final sentence):**
> "Where the period stated in that version had not expired on 7 September 2026, that period is extended so
> as to expire not earlier than thirty (30) calendar days after that date, so that a claim may be made
> through the ticketing system notwithstanding the retirement of the support email address referred to in
> that version. This extension applies to the former guarantee only, confers nothing under this Policy, and
> creates no right, entitlement, expectation, precedent, practice, or course of dealing."

---

## 6. Visa 10.4 / Mastercard 4837 and 4863 / Amex F29: Fraud, Card Absent, and Cardholder Does Not Recognise

### 6.1 CRITICAL. The policy never records that the transaction was authenticated, which is Uptal's only real defence

**The attack.** In the Kingdom, mada mandates cardholder authentication for e-commerce, and the resulting
liability shift is the only thing that reliably defeats a 10.4 or a 4837. Section 12.1 lists the artefacts to
be retained, which is good drafting, but the policy nowhere states, as a term the cardholder accepts, that
the initial Charge is authenticated and that each Renewal Charge is a merchant initiated transaction linked
to that authentication. Annex B.3.9 concedes that this may not be engineered: "It is silently lost if
renewals go out as unreferenced card-absent transactions." A liability shift that is not carried on the
renewal is a liability shift Uptal does not have, and no amount of contract text substitutes for it.

**Redraft (add a new Section 4.2A, "Authentication and the recurring mandate"):**
> "**4.2A Authentication and the recurring mandate.** Where required by the applicable card scheme or by the
> regulations of the Saudi Central Bank, your first Charge for a Subscription is authenticated by you through
> your card issuer, and by completing that authentication you establish a recurring mandate for that
> Subscription. Each subsequent Renewal Charge is a merchant-initiated transaction made under that mandate,
> in the authorised amount and at the authorised interval determined under Sections 4.2 and 13.2, and carries
> a reference to that initial authentication. The authentication artefacts and the mandate reference for each
> Charge are recorded in the Records and are evidence, in accordance with Section 12.2, that the Charge was
> made under a mandate established and authenticated by you."

### 6.2 HIGH. The policy redefines "unauthorised" more narrowly than the scheme does, and says so in writing

**Text attacked (Section 13.7):**
> "The use of your account, device, credentials, or payment method by a member of your household or family,
> by a colleague, by an employee, or by any other person to whom you have given, permitted, or failed to
> prevent access, **whether or not with your knowledge**, does not constitute an unauthorised charge for the
> purposes of this Policy."

**Text attacked (Section 10.3):**
> "a Charge made by, or with the involvement of, a family member, a member of your household, a friend, a
> guest, a colleague, an employee, or any other person to whom you gave, permitted, or failed to prevent
> access"

**The attack.** "Failed to prevent access, whether or not with your knowledge" is not a definition of consent,
it is a definition of negligence, and it sweeps in the classic family fraud case that issuers routinely
resolve for the cardholder. The clause cannot bind the scheme, so it changes no outcome in my forum. What it
does change is where the case goes: because Uptal has published that it will not correct these charges, the
cardholder skips the ticket and goes straight to the issuer, and the item lands in the fraud numerator rather
than being resolved as a correction. The clause therefore costs Uptal money without protecting a single
Riyal.

The commercial position can be kept. What must go is the pretence that the policy determines the scheme
question.

**Redraft (Section 13.7, final sentence, and a parallel sentence at the end of Section 10.3):**
> "The use of your account, device, credentials, or payment method by a member of your household or family,
> by a colleague, by an employee, or by any other person to whom you have given or permitted access does not
> constitute an unauthorised charge for the purposes of this Policy. This Section states when Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) makes a Correction under Section 10. It does not determine, and
> does not purport to determine, whether a Charge is authorised for the purposes of any card scheme rule, any
> regulation of the Saudi Central Bank, or any law, and it does not limit any right you have under any of
> them."

### 6.3 HIGH. Section 3.2 pre-excuses an unrecognisable descriptor

**Text attacked (Section 3.2):**
> "A payment is Successfully Charged at the moment stated in the definition of that term, irrespective of ...
> **the description or descriptor under which it appears**"

**The attack.** Read next to the placeholder in Section 13.6, this sentence tells me the merchant anticipated
that cardholders would not recognise the entry on their statements and drafted around it rather than fixing
it. "Cardholder does not recognise" (Mastercard 4863, and a large share of Visa 10.4 filings) is the single
cheapest dispute category to eliminate, and it is eliminated by a good descriptor, not by a clause. The clause
is harmless once the descriptor is right, and actively harmful while the descriptor is a placeholder.

**Fix:** no change to 3.2 once Section 13.6 carries a real descriptor. Publishing 3.2 while 13.6 is a
placeholder is the problem.

### 6.4 MEDIUM. The policy does not commit Uptal to the data Visa Compelling Evidence 3.0 runs on

**Text attacked (Section 12.1):**
> "account creation, authentication, and session logs, including internet protocol addresses, device and
> browser identifiers, and timestamps"

**The attack.** Compelling Evidence 3.0 defeats a 10.4 where the merchant shows two prior undisputed
transactions at least 120 days old sharing two of: IP address, device ID, account ID, and delivery address.
Uptal's record list captures IP and device at session level, not at transaction level, and does not commit to
retaining them for at least 120 days beyond the disputed transaction. A subscription merchant with a long
tenured customer base is the ideal CE3.0 user, and this is the one place where a small addition to the record
list converts directly into won cases.

**Redraft (Section 12.1, replacing that bullet):**
> "account creation, authentication, and session logs, and, for each Charge, the internet protocol address,
> device identifier, browser identifier, and Uptal account identifier associated with the transaction and
> with the customer session in which the Subscription or order was established, in each case with
> timestamps;"

---

## 7. Visa 12.6.1 / Mastercard 4834 / Amex P08: Duplicate Processing

### 7.1 HIGH. The duplicate definition is narrower than the scheme's, and turns on an undefined interval

**Text attacked (Section 10.2(a)):**
> "Two or more Successful Charges of the same amount, for the same Uptal product and the same Billing Period
> or order, on the same Uptal account, made **within a short interval** of one another, where **only one
> entitlement was created**, and where the additional Charge or Charges **resulted from a verified error in
> Uptal's billing systems**."

**The attack, in three parts.**

(i) **"A short interval" is undefined.** I cannot apply an interval the merchant has not stated, and in an
adhesion contract I read the gap against the drafter. Article 104(3) of the Civil Transactions Law does the
same before a Saudi court.

(ii) **"Resulted from a verified error in Uptal's billing systems" excludes the most common duplicate.** A
double submitted checkout, a customer who pressed pay twice, a retry that captured twice at the processor:
none of these is an error in Uptal's billing system, and all of them are duplicates under Visa 12.6.1, whose
test is two transactions, same card, same merchant, same amount, one purchase. Uptal will lose these at the
issuer and will additionally pay the dispute fee, having refused a correction it would have made had the
clause been drafted to the scheme's test.

(iii) **"Only one entitlement was created" excludes the case where Uptal's own systems created two.** A
customer charged twice who ends up with two subscriptions on one account has paid twice for one thing. Under
this clause that is outside Section 10, and Section 6.8 then confirms it: "the existence of a duplicate or
additional Uptal account or Subscription held by you, whether intentionally or in error, each account and
each Subscription being separate". So the customer pays twice, uses one, and is told both charges stand. I
rule for the cardholder on the second charge.

None of this is a refund of a delivered service. It is exactly the Section 10 theory the founder approved: a
billing event that bought nothing the customer could use.

**Redraft (Section 10.2(a)):**
> "**(a) A duplicate charge.** Two or more Successful Charges of the same amount, for the same Uptal product
> and the same Billing Period or order, made to the same payment method within seven (7) calendar days of one
> another, where only one of the resulting entitlements was used or was capable of being used by you,
> however the duplication arose, including where it arose from an error in Uptal's billing systems, from a
> repeated submission at checkout, or from a repeated capture by a payment provider. Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) corrects the additional Charge or Charges and closes the additional
> entitlement or entitlements."

And amend the Section 6.8 bullet:
> "the existence of a duplicate or additional Uptal account or Subscription held by you, whether
> intentionally or in error, each account and each Subscription being separate and each Charge standing
> alone, save only for a Correction under Section 10.2(a);"

### 7.2 MEDIUM. Section 9.6 excludes duplicate CV Enhancer orders from the duplicate rule it then cross refers to

**Text attacked (Section 9.6):**
> "Placing more than one order, whether for the same CV or for different CVs, whether intentionally or in
> error, and whether or not the resulting deliverables are similar or identical, is not a ground for any
> refund ... save only where an additional Charge is a duplicate charge falling within Section 10."

**The attack.** With the current Section 10.2(a), an accidental second CV Enhancer order almost never falls
within Section 10, because the second order does create a second entitlement and because a customer's double
click is not "a verified error in Uptal's billing systems". So the carve out is decorative. The redraft at
7.1 makes it real, which is the point of having it.

---

## 8. Visa 13.6 / Mastercard 4860 / Amex C02: Credit Not Processed

### 8.1 HIGH. Section 10.7 sets a deadline the merchant will breach on its own definitions

**Text attacked (Section 10.7):**
> "within ten (10) Business Days and in any event within fourteen (14) days of approval"

**Text attacked (Section 2.1):**
> "**"Business Day"** means a day other than Friday, Saturday, or an official public holiday in the Kingdom
> of Saudi Arabia."

**The attack.** Ten Business Days on a Sunday to Thursday week is fourteen calendar days at best, and more
than fourteen whenever a public holiday falls inside the window, which in the Kingdom is frequent. The two
limbs conflict on their face, and the "in any event" limb is the one a cardholder relies on. A merchant that
promises a correction in fourteen days and delivers it in eighteen has generated a 13.6 for a payment it was
willing to make. Delete the conflict.

**Redraft (Section 10.7, first sentence):**
> "An approved Correction is paid to the original payment method only, to the Payer of Record only, in the
> original currency of the Charge, in full and without any deduction, netting, set-off, or fee of any kind,
> within ten (10) Business Days of approval, subject to the processing times of the relevant payment
> provider, for which Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) is not responsible."

### 8.2 HIGH. Section 11.5 forbids Uptal from doing the one thing that resolves a dispute cheaply

**Text attacked (Section 11.5):**
> "**No Correction, payment, or accommodation of any kind will be considered or made while a chargeback or
> payment dispute in respect of the same Charge is pending**"

**The attack.** The intention is right: do not pay twice. The drafting is absolute, and it produces two bad
outcomes. First, where Uptal concludes during a pending dispute that the Charge was in fact a duplicate or
was unauthorised, it is contractually barred from correcting it, so it must instead lose the dispute, which
is a worse result for the merchant on every metric. Second, it forecloses the card scheme pre dispute
resolution tools, Visa Rapid Dispute Resolution and the equivalent alerts, which work by resolving the item
before it becomes a chargeback. Those tools are the principal mechanism a merchant with a strict no refund
policy has for keeping its dispute ratio out of VAMP and ECM, and Uptal has just written them out of its own
policy. Section 5.7 permits ex gratia accommodations generally; Section 11.5 overrides it for exactly the
period in which the accommodation would be useful.

**Redraft (Section 11.5, final paragraph, replacing that sentence):**
> "No Correction, payment, or accommodation of any kind is made in respect of a Charge while a chargeback or
> payment dispute in respect of that same Charge is pending, save that Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) may accept, resolve, or decline to contest a dispute through any
> pre-dispute or dispute resolution process operated by a bank, card issuer, payment provider, or card
> scheme, and may make a Correction under Section 10 where it determines that the Charge falls within
> Section 10.2. Anything done under this paragraph is done for the purposes of the process concerned alone,
> is not a refund of any Uptal service, is not an admission of any liability, entitlement, or fault, and
> creates no right, entitlement, expectation, precedent, practice, or course of dealing, as provided in
> Sections 5.7 and 10.9."

---

## 9. Visa 11.2 and 11.3 / Mastercard 4808: Authorisation, and Visa 12.1: Late Presentment

### 9.1 MEDIUM. Unlimited retries

**Text attacked (Section 13.6):**
> "Where a payment attempt fails or is declined, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) **may retry
> it, whether automatically or at your request**, and the resulting Successful Charge is the Charge for that
> Billing Period."

**The attack.** Both major schemes cap retry attempts after a decline, by response code and by window, and
exceeding them produces authorisation related chargebacks and acquirer level penalties. The policy grants
Uptal an unlimited right, which is not a right the schemes give it. As a term it also reads badly to a
regulator: a merchant that may retry indefinitely against a declining card is the profile of a
subscription trap.

**Redraft:**
> "Where a payment attempt fails or is declined, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may retry it,
> whether automatically or at your request, within the limits imposed by applicable card scheme rules, and
> the resulting Successful Charge is the Charge for that Billing Period."

### 9.2 MEDIUM. The gap the policy opens between authorisation and settlement

**Text attacked (Section 3.2):**
> "irrespective of: the time at which the amount is subsequently captured or settled to Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات)"

**The attack.** The policy deliberately separates the moment of finality (authorisation) from capture. That is
fine as between the parties and useless against a Visa 12.1 late presentment dispute, which turns on the
number of days between the transaction date and the presentment. The policy creates no obligation on Uptal to
capture promptly, and its own Section 4.4 architecture ("Initiated ... whether or not authorisation has at
that moment been completed") suggests a pipeline in which the two events are meaningfully apart. This is an
operational finding rather than a drafting one, but the drafting should not pretend the gap has no
consequences.

**Fix:** no customer facing change required. Add to Annex B: capture must occur within the scheme presentment
window for every Charge, and the interval between authorisation and presentment must be monitored, because
Section 3.2 provides no defence to a late presentment dispute.

---

## 10. The pre dispute conditions: where the policy crosses from firm into non compliant

### 10.1 CRITICAL. Section 11.2 penalises the exercise of a scheme right, including where the charge is genuinely bad

**Text attacked (Section 11.2):**
> "The filing of a chargeback, payment dispute, reversal request, or claim of non-receipt or unauthorised use
> with any bank, card issuer, payment provider, card scheme, installment or wallet provider, mobile
> application store, or other platform, in respect of a Charge that is valid under this Policy and the Terms
> & Conditions, **or in breach of Section 11.1**, is a material breach of this Policy and of the Terms &
> Conditions."

**The attack.** The words "or in breach of Section 11.1" do the damage. They make it a material breach to
contact your bank first **even where the charge is invalid**, for example a genuinely unauthorised charge, a
genuine duplicate, or a charge on a card the cardholder has reported stolen. Card issuers instruct fraud
victims to call the bank first. A merchant term that makes following the bank's fraud instruction a material
breach, punishable by termination of every product and by recovery of the sum as a debt, is a term that
penalises a cardholder for exercising a right the scheme guarantees. Visa's core rules prohibit a merchant
from requiring a cardholder to waive dispute rights and prohibit imposing a charge on a cardholder for
disputing. This is the finding that is most likely to produce a scheme or acquirer compliance consequence
rather than the loss of a single case, and it also colours every other clause in the document when a regulator
reads it.

**Redraft (Section 11.2):**
> "The filing of a chargeback, payment dispute, reversal request, or claim of non-receipt or unauthorised use
> with any bank, card issuer, payment provider, card scheme, installment or wallet provider, mobile
> application store, or other platform, in respect of a Charge that is valid under this Policy and the Terms
> & Conditions, is a material breach of this Policy and of the Terms & Conditions.
>
> Nothing in Section 11.1 or in this Section restricts your right to contact your bank, card issuer, or
> payment provider at any time, affects any time limit applicable to a dispute, or makes the exercise of any
> right you have under card scheme rules or under the regulations of the Saudi Central Bank a breach of this
> Policy. Section 11.1 requires you to contact Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) first so that
> the matter can be reviewed directly, and a failure to do so is not of itself a breach of this Section where
> the Charge concerned is not valid under this Policy."

### 10.2 HIGH. Section 11.3(e) passes scheme fees and fines on to the cardholder

**Text attacked (Section 11.3(e)):**
> "recover from you, as a debt immediately due and payable on demand, the full amount of the Charge concerned
> together with **any chargeback fee, representment fee, dispute fee, arbitration fee, fine, penalty, or
> increased processing cost** levied on or incurred by Uptal"

**The attack.** Recovering the underlying amount of a valid charge as a debt is legitimate and I would not
disturb it. Recovering the scheme's dispute fees, fines and penalties from the cardholder is a fee for
disputing, dressed as damages. Both major schemes prohibit a merchant from billing a cardholder for a
chargeback fee. The final sentence of Section 11.3 ("Uptal ... does not levy any charge for the making of a
dispute itself") is drafted as a denial of exactly what limb (e) does, which makes the pair worse than either
alone: it shows the merchant knew the rule and drafted around it.

**Redraft (Section 11.3(e)):**
> "(e) where the disputed Charge is determined to have been valid, recover from you, as a debt immediately
> due and payable on demand, the full amount of the Charge concerned, together with the reasonable and
> documented administrative, investigation, collection, and legal costs and expenses actually incurred by
> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in recovering that amount, and any applicable tax, in each
> case to the extent permitted by applicable Saudi law and by applicable card scheme rules. Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) does not recover from you, and does not levy on you, any chargeback
> fee, dispute fee, representment fee, arbitration fee, fine, or penalty levied on Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) by any payment provider, acquiring bank, or card scheme."

### 10.3 HIGH. The ten Business Day wait can run out the cardholder's own dispute clock

**Text attacked (Section 11.1):**
> "you must allow Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) a reasonable opportunity to review and
> respond, being **not less than ten (10) Business Days** from the date the Ticket is received."

read with

> "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) gives no undertaking as to the time within which it will
> respond substantively to a Ticket."

**The attack.** Ten Business Days in the Kingdom is at least fourteen calendar days and, across a holiday
period, materially more. Coupled with an express refusal to commit to any response time, the clause requires
a cardholder to sit still for an indefinite period that begins at fourteen days, inside dispute filing windows
that on the domestic rail can be short. A term whose practical effect is to consume a consumer's remedy
period is a term I read hard against the merchant, and it is the sort of thing a SAMA consumer protection
review picks up on its own. It also sits badly against the live contact page, which publishes a one business
day reply target; a cardholder will screenshot that page and ask why the policy says the opposite.

**Redraft (Section 11.1, first paragraph, final clause, and second paragraph, first sentence):**
> "... and you must allow Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) a reasonable opportunity to review
> and respond, being five (5) Business Days from the date the Ticket is received.
>
> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) aims to respond to a Ticket within one Business Day and in
> any event acknowledges each Ticket with a ticket reference on receipt. A delay in, or the absence of, a
> substantive response beyond the period stated above does not prevent you from contacting your bank, card
> issuer, or payment provider, and is not a ground for any refund, credit, or other remedy."

### 10.4 MEDIUM. The thirty day notice window is shorter than every scheme window, so it drives disputes rather than tickets

**Text attacked (Section 12.7):**
> "must be raised by you in writing by Ticket at https://uptal.com/contact-us within **thirty (30) calendar
> days** of the date of the Charge concerned"

**The attack.** The schemes give a cardholder 120 days from the transaction for most dispute conditions, and
longer in some. Uptal's window is 30 days. A cardholder on day 45 is out of time with Uptal and in time with
the issuer, so the policy has told them, in terms, that their only remaining route is the bank. Section 12.8
even makes the point explicit by saying the periods "do not shorten ... any period ... for making any request
to a bank, card issuer, payment provider, or card scheme." The merchant has drafted a funnel that pushes the
customer onto the rail where the merchant is weakest. Keeping the 30 day condition for the internal process
is fine; refusing to look at anything after it is not.

**Redraft (add as a new final paragraph of Section 12.8):**
> "Nothing in Section 12.7 or in this Section prevents you from raising a matter with Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) by Ticket at any time, and Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) will review any Ticket relating to a Charge that is submitted
> within any period allowed under applicable card scheme rules for a dispute in respect of that Charge. Any
> such review is conducted voluntarily, confers no right, entitlement, or expectation, does not extend any
> period under this Policy, and creates no precedent, practice, or course of dealing."

---

## 11. The domestic rail: mada and SAMA Article 90

### 11.1 HIGH. Article 90 is closed by an artefact the policy asserts and the checkout may not produce

**Text attacked (Section 4.2):**
> "The amount and the interval are displayed to you at checkout, are accepted by you before payment, are
> recorded in the confirmation of your purchase, are shown in your Uptal account at all times, and are
> recorded in the Records."

**The attack.** This paragraph is doing more legal work than any other sentence in the document, because it is
the whole of the defence to a SAMA Article 90 eight week refund demand once renewal notices are off the table.
It asserts five operational facts. If the checkout does not display the interval as well as the amount, or
does not capture a positive acceptance, or the artefact is not retained, then the authorisation did not
"specify the exact amount", limb (a) of Article 90 is satisfied, and the payer can demand a refund from the
payee's payment service provider on every renewal for eight weeks, entirely outside this Policy. Annex B.4
identifies this correctly. It belongs in the publication blockers, not in the general list: the clause is a
representation about Uptal's checkout, and the merchant does not currently evidence it.

**Fix:** no drafting change. Move this to a publication blocker in Annex B.1 and require a screenshot of the
checkout showing the amount and the interval and the acceptance control, plus a sample retained artefact,
before the policy goes live.

### 11.2 MEDIUM. Section 13.2's refreshed authorisation is a real fix, and the Terms still contradict it

**Text attacked (live Terms 6.3, which Annex A.4 does not delete):**
> "The price displayed at checkout, or the then-current price for your plan as published on the Website at
> the time of renewal, is the price in effect for that charge."

**Text attacked (Annex A.4):**
> "**Add after the existing final sentence:** ..."

**The attack.** Annex A.4 adds the new rule to Terms 6.3 without deleting the old one, so the published Terms
would say both that a renewal is charged at the price published at the time of renewal and that a renewal is
charged at the last authorised amount. That contradiction is the entire Article 90 exposure, restored in the
senior instrument. A payer points at Terms 6.3, says the mandate did not fix an amount, and limb (a) is
satisfied.

**Redraft (Annex A.4, replacing the "Add after" instruction):**
> "**Delete** the sentence 'The price displayed at checkout, or the then-current price for your plan as
> published on the Website at the time of renewal, is the price in effect for that charge.' **and replace it
> with:** 'The price displayed at checkout is the price in effect for that purchase. A change to the price of
> a plan applies to the renewals of a subscription you already hold only from the point at which the new
> price has been displayed to you and has been incorporated into a refreshed authorisation, in accordance
> with Section 13.2 of the Refund Policy. Until then, each renewal charge for that subscription is made in
> the amount last authorised by you for that plan.'"

---

## 12. Cross instrument conflicts that decide cases

### 12.1 CRITICAL. Terms Section 16 caps Uptal's total liability at one hundred Saudi Riyals, and Annex A does not touch it

**Text attacked (live Terms 16):**
> "the total aggregate liability of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) and the Uptal Indemnified
> Parties ... shall not in any circumstances exceed one hundred (100) Saudi Riyals."

**Text attacked (new Policy 5.9):**
> "the total aggregate liability of Uptal ... shall not exceed the amount of that Charge"

and

> "The limitation and exclusion of liability set out in the Terms & Conditions continues to apply in full to
> every claim relating to a Charge and is not displaced, narrowed, or reduced by this Policy or by Section
> 1.8."

**The attack.** These two provisions cannot both be true for a Charge above 100 SAR, and annual Talent Search
plans are far above it. Section 1.8 says the Policy prevails on billing matters. Section 5.9 says the Terms'
limitation is not displaced. The document is circular on its own face. Worse, a merchant relying on a 100 SAR
aggregate cap in a consumer contract for a product costing many multiples of that is presenting me, and a
Saudi court, with the clearest available candidate for an arbitrary term in a contract of adhesion. The whole
"read down rather than strike out" architecture in Section 15 depends on the instrument not containing an
obviously excessive term; this is that term. It also creates the absurd argument, which someone will
eventually make in writing to a customer, that the cap prevents Uptal from correcting a 2,000 SAR duplicate
charge.

**Redraft (add a new Annex A section, A.4A, "Terms Section 16: align the liability cap with the Refund
Policy"):**
> "**Delete** 'shall not in any circumstances exceed one hundred (100) Saudi Riyals' **and replace it with**
> 'shall not in any circumstances exceed the greater of one hundred (100) Saudi Riyals and the total amount
> paid by you to Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in respect of the Service concerned in the
> twelve (12) months preceding the event giving rise to the claim. Nothing in this Section limits any
> liability that cannot be limited under applicable Saudi law, and nothing in this Section applies to, or
> limits, the correction of a charge under Section 10 of the Refund Policy, which is not a payment of
> damages.'"

### 12.2 HIGH. Annex A misses Terms 14, which lets Uptal terminate on a belief that a breach is "likely"

**Text attacked (live Terms 14):**
> "if: (i) you breach, or Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) reasonably believes that you have
> breached **or are likely to breach**, these Terms"

read with

> "Termination shall not entitle you to any refund, credit, or compensation"

**The attack.** Anticipatory termination with forfeiture of a paid period, on a belief about a future breach,
is the same defect as Section 5.6 of the Policy and is worse because it is in the senior instrument, so it
survives every reading down applied to the Policy. In a 13.1 or 13.7 I look at the whole contract, and this
sentence tells me the merchant reserved the right to stop supplying a paid service on suspicion of a future
act. Annex A does not amend it.

**Redraft (new Annex A section, A.2A):** amend Terms 14 so that forfeiture of an already charged Billing
Period follows only from an established breach, and add:
> "Where access is suspended pending investigation and no breach is established, access is restored and the
> billing period concerned is extended by the length of the suspension. Where Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) terminates under limb (iv) of this Section because it elects to
> discontinue a Service, Section 14.3 of the Refund Policy applies and the Service, or a substitute selected
> by Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), remains available to you for the remainder of any billing
> period already charged for."

### 12.3 MEDIUM. Annex A does not patch Terms 6.4, which still permits free trials on terms the schemes regulate

**Text attacked (live Terms 6.4):**
> "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may offer free trials or free features at its discretion.
> Free trials convert to paid subscriptions only where clearly disclosed before you provide payment details."

**The attack.** Section 4.11 of the new Policy handles trial conversion disclosure well. Neither instrument
records the scheme mandated artefacts for a trial: Visa requires a trial specific transaction to be flagged,
and requires the cardholder to be sent a notification before the first paid charge following a trial or
promotional period. R10 forbids renewal notices, but a trial conversion notice is not a renewal notice, it is
a scheme mandate on the first charge. If a trial launches without it, every first paid charge after a trial is
a 13.2 or 4841 the merchant loses.

**Redraft (Section 4.11, adding a final sentence to the first paragraph):**
> "Where an applicable card scheme rule requires a notification to be sent before the first Charge following
> a free or reduced period, that notification is sent. No other notice or reminder is sent before any Charge,
> and Section 4.3 applies."

---

# PART 2. WHERE THE POLICY FAILS TO GIVE ME WHAT I NEED TO RULE FOR THE MERCHANT

These are not attacks. They are the exhibits I would want and cannot find, listed so the merchant can build
them. Nothing here costs a refund.

| # | What I need to rule for Uptal | Where the policy stops short | The fix |
|---|---|---|---|
| 1 | A per product, per period delivery artefact | Section 12.1 lists record categories; nothing names the artefact that proves delivery for a given Billing Period | New Section 12.1A, drafted at finding 2.3 |
| 2 | Proof the cardholder authenticated, and that the renewal carried the reference | Section 12.1 lists 3DS artefacts; no operative clause says renewals are MITs linked to an initial authentication | New Section 4.2A, drafted at finding 6.1 |
| 3 | Transaction level IP and device, retained past 120 days | Section 12.1 captures these at session level only | Amended Section 12.1 bullet, drafted at finding 6.4 |
| 4 | A cancellation procedure I can check against a screenshot | Section 4.3 names a path Annex B.1 admits is unverified | Verify before publication, finding 1.2 |
| 5 | A receipt that carries cancellation instructions | Section 4.13(b) promises a receipt only | Amended 4.13(b), finding 1.3 |
| 6 | A cancellation confirmation naming the effective date | Section 4.13(c) promises it; nothing evidences that it is sent | Annex B blocker, and log delivery |
| 7 | Proof the cancel control was available to this account at this time | Section 4.9 depends on it; Annex B.1.2 says the logging may not exist | Annex B blocker |
| 8 | Checkout artefact showing amount plus interval plus acceptance | Section 4.2 asserts it; nothing evidences it | Annex B.1 blocker, finding 11.1 |
| 9 | A statement descriptor a Saudi cardholder recognises | Section 13.6 is a placeholder | Publication blocker, finding 5.1 |
| 10 | A route to resolve an item before it becomes a chargeback | Section 11.5 forbids it | Amended 11.5, finding 8.2 |
| 11 | An availability or status record for a period the customer says was down | Section 12.3 relies on the absence of a customer report, which is not evidence of uptime | Add a service availability log to the Section 12.1 list |
| 12 | Evidence that the pre payment disclosure of no rescission was actually shown | Sections 1.5 and 3.1 assert it; Annex B.5.18 says the checkbox must still be built | Annex B blocker |

**Suggested addition to Section 12.1, for item 11:**
> "records of the availability, status, and material incidents affecting each product, by product and by
> period, maintained by Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in the ordinary course;"

---

# PART 3. OPERATIONAL FACTS THE POLICY ASSUMES AND DOES NOT EVIDENCE

Every one of these is a factual assertion in operative published text. Each is a sentence a cardholder can
falsify with a screenshot, and each falsification damages the credibility of the whole document in front of
me. They should be verified before publication, not after.

1. **The cancellation path.** "Account, then Billing, then Cancel subscription" (4.3, 7.4, 8.3, 17), on web
   and on any mobile application.
2. **The enrolment confirmation contains "a direct link to the self-service cancellation function"** (4.13(a)).
3. **A receipt is sent for every Charge, including every Renewal Charge** (4.13(b)).
4. **A cancellation confirmation is sent, stating the effective date, that access continues, and that no
   further Charge will be made** (4.13(c)).
5. **The Renewal Date and time are "shown in your Uptal account at all times"** (4.3, 4.4, 8.2).
6. **The authorised amount and interval are "shown in your Uptal account at all times"** (4.2).
7. **The ticketing system "issues to you a ticket reference and a copy of the submission you made"** (12.6).
8. **The ticket form carries a "Billing & payments" reason** (10.4, 11.1, 12.6, 17). It must also be usable
   without logging in, since a locked out subscriber is the very person who needs it.
9. **The Records contain per account availability of the self-service cancellation function** (4.9, 12.1).
10. **A VAT compliant tax invoice "is made available in your Uptal account in respect of each Charge"** (13.8).
11. **The pause facility exists for Auto-Apply and permits pauses "for up to three months at a time"** (8.7).
12. **CV Enhancer revisions are disclosed at the point of sale as a number and a scope** (1.6, 9.3).
13. **The checkout displays and records the exact recurring amount and interval, and the acceptance**
    (4.2, 1.5).
14. **The pre contract statement that no rescission right applies, and why, is shown before payment**
    (1.5, 3.1).
15. **The statement descriptor is registered and matches Section 13.6.**
16. **Renewals carry the initial authentication reference with correct recurring and MIT indicators**
    (12.1, and finding 6.1).
17. **Each Billing Period generates a logged delivery event** (Annex B.2 concedes this is a precondition).
18. **support@uptal.com is auto replied, not merely deleted** (Annex B.1.5). The policy retires it in 7 places
    and Annex A retires it in 5 more; a customer who writes to the address the old documents told them to use
    and hears nothing has the best dispute narrative in this whole exercise.
19. **The live contact page's published reply target** does not contradict Section 11.1. Today the page states
    one business day and the policy states no undertaking at all. Align them (finding 10.3).
20. **Maroof, the checkout page, the English page and the Arabic page all state the same policy** (Annex
    B.5.15). A divergence between them is the single easiest finding any regulator or complainant will make.

---

# PART 4. FINDINGS THAT ARE ABOUT THE PROGRAMME, NOT ABOUT ONE CASE

1. **Uptal has removed every lever that lowers a dispute ratio.** No refunds, no credits, no goodwill, and
   Section 11.5 blocks pre dispute resolution. A merchant in this posture must win on evidence or absorb the
   loss, and every absorbed loss counts in the VAMP, VDMP and ECM numerators. Fixing Section 11.5 (finding
   8.2) and building the delivery record (finding 2.3) are the only two things that meaningfully move that
   number.
2. **The policy converts refund requests into chargebacks by design.** The 30 day internal window (12.7), the
   ten Business Day wait (11.1), the single notice channel (12.6), and the absence of any money remedy mean
   that a customer with a genuine complaint has one place to go after day 31, and it is the issuer. Findings
   10.3 and 10.4 route more of that volume back into the ticket system, where Uptal controls the outcome.
3. **Two clauses in this document would, if a scheme compliance function read them, be actioned rather than
   argued:** Section 11.2's treatment of contacting the bank first as a material breach, and Section 11.3(e)'s
   recovery of scheme fees and fines from the cardholder. Findings 10.1 and 10.2.
4. **Cross border sales.** Section 1.11 states that no cooling off or refund right of any other country
   applies. That governs the contract; it does not govern a foreign issuer applying its own rules to its own
   cardholder, and a merchant selling a consumer subscription to non Saudi cardholders under a no refunds
   ever policy will lose those disputes on the issuer's rules regardless of the clause. Decide, commercially,
   whether Auto-Apply and CV Enhancer are sold to non Saudi issued cards; if they are, the clause is not the
   answer.
5. **Minors.** Section 15.12 says Uptal "may close the account and cease further Charges". A transaction by a
   person under eighteen on a card they were not authorised to use is a fraud dispute the merchant loses, and
   it lands in the fraud numerator. Redraft "may" to "will", and route the charge to Section 10.2(b) as an
   unauthorised charge rather than defending it:
   > "Where a purchase is made in breach of that warranty, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) will
   > close the account and will make no further Charge, and a Charge made by a person who was not authorised
   > by the holder of the payment method to use it is dealt with under Section 10.2(b)."

---

# PART 5. RANKED FIX LIST

**Publication blockers.**
1. Delete the bracketed pre-publication note in Section 13.6 and insert the real statement descriptor (5.1).
2. Verify the cancellation path on every surface and align Sections 4.3, 7.4, 8.3 and 17 to it (1.2).
3. Rewrite Section 5.5 so the customer receives the whole Billing Period purchased (2.1).
4. Rewrite Section 11.2 so contacting the bank first is not, of itself, a material breach (10.1).
5. Fix the Terms Section 16 one hundred Riyal cap through a new Annex A amendment (12.1).
6. Replace "Initiated" with "authorised" throughout, and add the do not complete rule (1.1).

**High value, low cost.**
7. Section 4.13(b): put cancellation instructions on every receipt (1.3).
8. New Section 12.1A: the delivery record (2.3).
9. New Section 4.2A: authentication and the recurring mandate (6.1).
10. Section 10.2(a): widen the duplicate definition and fix the interval (7.1).
11. Section 11.5: permit pre dispute resolution and a Correction found during a dispute (8.2).
12. Section 14.3: make the substitute mandatory on discontinuation (2.4).
13. Section 11.3(a): stop the cross default (2.6).
14. Section 11.3(e): stop recovering scheme fees from cardholders (10.2).
15. Section 10.7: delete the fourteen day limb (8.1).
16. Section 4.9: fix the internal contradiction (1.4).
17. Section 3.7: stop saying nothing was sold (2.2).
18. Section 4.3: carve out scheme mandated notices from the no reminders statement (1.5).

**Worth doing.**
19. Section 8.6: move the exclusions disclaimer to the point of sale and record acceptance (4.1).
20. Section 11.1: reduce to five Business Days and align with the published reply target (10.3).
21. Section 12.8: allow a voluntary review inside the scheme window (10.4).
22. Section 12.1: add transaction level IP and device, and an availability log (6.4, Part 2 item 11).
23. Section 9.7: extend the legacy guarantee window by thirty days from publication (5.3).
24. Section 13.6: retries within scheme limits (9.1).
25. Section 5.6: reasonable grounds recorded at the time, and restoration with extension (2.5).
26. Section 15.12: minors, "will" not "may", routed to 10.2(b) (Part 4 item 5).
27. Annex A.4: delete the contradicting sentence in Terms 6.3 rather than adding to it (11.2).
28. Annex A: add amendments for Terms 14 and Terms 6.4 (12.2, 12.3).
29. Delete "and that the price you pay reflects it" in Sections 6.2 and 8.6 (4.2).

---

# PART 6. THE SINGLE BEST ARGUMENT AVAILABLE TO A CARDHOLDER TODAY

> "The merchant's own published Refund Policy concedes, in operative text, that a customer can be charged in
> full while nothing is opened, issued, or made operative in their account. Section 5.5 states that in that
> case the customer's only remedy is, at the merchant's election, that the merchant switches the service on
> late or restarts the period, and that no payment of any kind is made. Section 3.7 states that no particular
> feature, data source, or level of service formed part of the subject matter of the purchase at all.
> Section 14.3 states that if the merchant discontinues the product part way through a period already paid
> for, it may, at its sole discretion, provide a substitute or nothing. Read together, the merchant has
> published a policy under which the cardholder may pay the full price, receive nothing, and recover nothing.
> That is the fact my client alleges, and the merchant's own document says it is a permitted outcome."

I would rule for the cardholder on that submission in a Visa 13.1, a Mastercard 4855 and an Amex C08, and I
would not need the cardholder to produce a single document of their own.

The three redrafts at findings 2.1, 2.2 and 2.4 remove that submission entirely, without giving back one
Riyal, because in each case the customer receives the period they bought rather than money back. Those three
paragraphs are worth more to Uptal than the whole of Sections 5 and 6 put together, because Sections 5 and 6
never reach me, and these three do.

---

**End of adversarial review.**
