# RECON: hostile loophole hunt on the CURRENT LIVE Refund Policy
Lens: sharp consumer lawyer hired to extract a refund, plus a customer hunting for a crack.
Source read line by line: `live_en_article.txt` (13 sections, last updated July 30, 2026), cross checked against
`live_terms_article.txt` (Sections 3, 6, 7, 14, 15, 16, 20 through 26).
Every item below is numbered so the drafters can tick them off. Items are written as a specification.
House rule observed throughout: no em dashes, no en dashes.

---

## PART 0. THE THREE ROUTES I WOULD ACTUALLY RUN AS OPPOSING COUNSEL

**1. The statutory savings clause is drafted as an unqualified gateway, not a savings clause.**
Section 1 says:
> "Nothing in this Policy limits, excludes, or purports to limit or exclude any right or remedy that you have under the Saudi E-Commerce Law, the Consumer Protection framework, or any other provision of applicable Saudi law that is mandatory and cannot be waived, limited, or varied by agreement"
On the last antecedent reading, the qualifier "that is mandatory and cannot be waived, limited, or varied by agreement" attaches only to the third item, "any other provision of applicable Saudi law". The first two items, the E-Commerce Law and the undefined "Consumer Protection framework", are therefore preserved **in their entirety, including their non-mandatory parts**. That is an express contractual concession of the whole e-commerce withdrawal regime. Fix: distribute the qualifier to every limb, and drop the undefined phrase "the Consumer Protection framework" in favour of a named, mandatory-only formulation.

**2. The withdrawal-right waiver is captured once, at first checkout, and is expressed as partial.**
Section 2 says:
> "By completing any purchase, you expressly request and consent to Uptal ... commencing performance of the relevant service immediately, before the expiry of any withdrawal, cooling-off, or similar period"
and
> "you acknowledge and agree that, to the extent the relevant service has been performed in whole or in part, any statutory right of withdrawal you may otherwise have had is affected, reduced, or extinguished accordingly"
Two attacks. (a) A renewal is not a purchase "completed" by the customer; nobody clicks anything. So on the face of the document **no immediate-performance consent is captured at renewal at all**, and the withdrawal clock arguably restarts on every renewal charge with no waiver attached to it. (b) Even at first checkout the waiver is expressed as a sliding scale: "to the extent ... performed in whole or in part" and "affected, reduced, or extinguished". Contra proferentem, I pick "affected" and "in part". Result: on day 3 of a 30 day cycle, the service is 10 percent performed, so 90 percent of the withdrawal right survives, so 90 percent of the money comes back.
Combine routes 1 and 2 and you have a clean 7 day withdrawal claim on **every renewal**, which is precisely the charge the founder most wants closed.

**3. Section 2 and Section 4.1 tie consumption to output, not to availability.**
Section 2: "delivered, performed, and consumed immediately, and in the case of subscription products **progressively and continuously**"; "each purchase is treated as used, **fully or progressively**".
Section 4.1: "This service is delivered continuously and **consumed as applications are submitted** throughout your billing period."
The policy's own words make consumption a function of elapsed time and of submissions. Zero submissions in a cycle equals zero consumption on the policy's own definition, and a partly elapsed cycle equals a partly consumed service. Note that the "availability, not your actual usage" deeming sentence exists **only in Section 3.1 for Talent Search**. Expressio unius: Uptal knew how to write that sentence and chose not to write it for Auto-Apply or CV Enhancer.

---

## PART 1. AMBIGUITIES, GAPS, SILENCES AND SOFT WORDS IN THE CURRENT TEXT
Each item quotes the live sentence and states the argument built on it.

### Section 1 (Overview, scope and binding effect)

1. **"all purchases, subscriptions, orders, renewals, upgrades, and other transactions"** (S1). The list names upgrades but not downgrades, plan changes, reactivations, resumptions after a pause, add-ons, seat additions, trial conversions, or reinstatements. "Other transactions" is a catch-all, but ejusdem generis lets me argue the catch-all takes its colour from the listed items, all of which are customer-initiated affirmative purchases. A machine-initiated resume-after-pause charge is arguably not in the list. Enumerate every charge type expressly.

2. **"By subscribing to, purchasing, ordering, renewing, or paying for any Uptal product or service, you acknowledge that you have read, understood, and agree to be bound"** (S1). Every verb in that list is an act of the customer. At a renewal the customer does nothing. So the policy version in force at renewal was never assented to. This matters enormously for the rewrite: an existing subscriber will argue the July 30 policy, including Section 5.4, governs their renewals forever. Add a deemed-assent-on-each-charge clause plus a transition clause.

3. **"the Consumer Protection framework"** (S1). Undefined, uncapitalised, not a statute. It lets a claimant import any consumer instrument, guideline, circular or ministerial decision they like, and argue it is preserved. Replace with a closed, named formulation limited to mandatory and non-excludable provisions.

4. **Section 1 never identifies the counterparty.** The policy is written to "you" but never says whether "you" is the account holder, the payer of record, the cardholder, or the legal entity. Every third-party-payer fact pattern in Part 2 exploits this silence. Define "you" as, jointly and severally, the account holder and the payer of record.

5. **No definitions at all.** "charge", "billing period", "renewal", "successfully charged", "payment method", "business days", "payer of record", "billing-system error", "verified", "confirmed", "active", "delivery", "order" are all used operatively and none are defined. Section 13 imports only **capitalized** terms from the Terms, and none of these are capitalized in the Policy, so the import does nothing. Every undefined operative word is an argument.

6. **No severability, no blue-pencil, no waiver, no entire-agreement, no anti-precedent, no anti-assignment, no third-party-rights clause anywhere in the Policy.** The Policy expressly **prevails over the Terms** on "matters of billing, refunds, and payment disputes" (S1). So I argue the Terms' Section 20 severability does not rescue a struck refund clause, because on refund matters the prevailing instrument is silent. If a court strikes one sentence of the no-refund rule, the whole rule falls with nothing to read it down to.

### Section 2 (Digital services, immediate access and consumption)

7. **"progressively and continuously"** and **"treated as used, fully or progressively"** (S2). See Part 0 route 3. This is the single most valuable phrase in the document to a claimant. It concedes that consumption accrues over time, which is the definitional predicate for pro rata restitution.

8. **"from the moment payment is successfully processed"** (S2 Talent Search bullet) versus **"Upon successful payment"** (S3.1) versus Terms 6.1 **"at the time the relevant charge is incurred"**. Three different trigger phrases. If authorisation happens at 23:59 and capture or settlement happens two days later, which is the moment of delivery? I argue for the latest one and claim the gap. Define one moment: successful authorisation or charge of the payment method, as recorded in Uptal's systems.

9. **"the value of the subscription is made available in full, and is capable of being exploited in full, from that moment and throughout the billing period"** (S2). This is a factual representation that can be falsified. Any outage, any degraded search, any rate limit, any failed login and the representation is untrue, so the stated basis of the no-refund rule fails, so the rule does not apply on its own terms. Section 7's availability disclaimer contradicts this sentence rather than saving it.

10. **"Auto-Apply begins matching you to roles, tailoring your CV, and submitting applications on your behalf as soon as your subscription is active"** (S2). Two holes. First, an affirmative promise of activity, so zero activity equals total failure of consideration. Second, the condition "as soon as your subscription is **active**" is undefined; the customer who paid but never uploaded a CV, never verified their email, never set preferences or never completed onboarding argues the subscription was never "active", so nothing was ever delivered, so nothing was consumed.

11. **"CV Enhancer work begins as soon as your order is placed"** and **"costs are incurred, immediately upon order placement"** (S2). Both are testable factual claims. If the deliverable arrives on day 9 with no evidence of work on day 1, I say the representation is false. Replace with a deeming construction, not a factual assertion.

12. **"it is on this basis, among others, that the refund terms set out in this Policy are established"** (S2). Explicitly converts the recitals into the basis of the bargain. If I falsify the basis in my client's case, I argue the terms built on it do not bite. Add: these terms apply irrespective of whether any of the matters described in this Section in fact occurs in your case.

13. **"By completing any purchase, you expressly request and consent to Uptal ... commencing performance"** (S2). See Part 0 route 2(a). No advance consent for future renewals, resumptions, upgrades or add-ons.

14. **"is affected, reduced, or extinguished accordingly"** and **"to the extent the relevant service has been performed in whole or in part"** (S2). See Part 0 route 2(b). Must become an unconditional, full and irrevocable extinguishment on the charge, to the maximum extent permitted.

15. **"to the maximum extent permitted by applicable Saudi law"** appears in Section 2 attached only to the withdrawal-waiver sentence, not to the immediate-performance consent itself. Argue the consent is therefore unqualified and separately attackable.

### Section 3 (Talent Search)

16. **"immediate, unrestricted access to the platform's full feature set, including the ability to search, filter, and unlock candidate profiles (subject to your plan's monthly unlock allowance; see Section 3.4)"** (S3.1). "Unrestricted access to the full feature set" and "subject to your plan's monthly unlock allowance" are in the same sentence and contradict each other. Once the allowance is exhausted on day 4, the access is by the policy's own words no longer unrestricted, so the stated basis for full consumption fails for the remaining 26 days.

17. **"the service is considered used from the point of purchase"** (S3.1). "Considered" is a soft, non-operative verb. It describes Uptal's view, not a contractual deeming. It must be "is deemed, conclusively and irrevocably, to have been delivered, accepted and fully performed".

18. **"All payments ... are final, non-refundable, non-reversible, and non-exchangeable"** (S3.2) but **"no refunds, credits, or exchanges will be issued"** in the same paragraph. The remedy list is only three items. I therefore do not ask for a refund. I ask for: a voucher, a coupon, a discount on the next term, an account balance, a service credit, a free month, an extension of the term, a set-off against a future invoice, a withholding, or compensation or damages in lieu. None of those are a "refund, credit, or exchange" on a narrow reading, and "credit" in context reads as a billing credit note, not a goodwill voucher. R2 exists for exactly this.

19. **"except as set out in Section 8 (Exceptions) or as required by applicable Saudi law"** (S3.2, S4.2, S5.2). Note this formulation drops the "mandatory and cannot be waived" qualifier that Section 1 uses. "As required by applicable Saudi law" is much broader than "mandatory and non-excludable". The weaker formulation sits in the three operative no-refund clauses, which is where it does the most damage.

20. **"Technical issues on the subscriber's end (for example, browser compatibility or internet access)"** (S3.2 bullet, mirrored in S4.2 and S5.2). Expressio unius. By excluding only technical issues on the customer's end, the policy implies that technical issues on Uptal's end **are** a ground. Section 7 is a general availability disclaimer but the bullet invites the inference directly inside the operative list. Add an express bullet closing technical issues, faults, outages, defects, errors and degradation on Uptal's side and on any third party's side.

21. **"Duplicate or accidental purchases, except a duplicate charge caused by a verified billing-system error (see Section 8)"** (S3.2, S4.2). "Accidental" is undefined, and the carve-out is an admission that duplicates are sometimes repaid. Every claimant will characterise their second charge as system-caused: "I clicked once, your system charged twice."

22. **"Cancellation takes effect at the end of the current billing period."** (S3.3, mirrored S4.3). **There is no cancellation cut-off anywhere in the document.** No "at least 24 hours before the renewal date". So a customer who cancels one minute before renewal, or during the renewal batch run, or on the renewal date in a different time zone, argues the renewal charge was taken after a valid cancellation and was therefore unauthorised, which routes them straight into Section 8's unauthorised-charge exception. This is a major, mechanical, high-volume hole.

23. **"You can cancel at any time from your Uptal account settings, or by contacting support@uptal.com."** (S3.3, S4.3). This is an affirmative representation that a self-service cancellation route exists and works. If the button is missing, greyed, erroring, behind a login the user cannot reach, or if the support mailbox does not reply, the customer says Uptal broke its own promise and caused the renewal. Nothing says: which channel is authoritative; that a cancellation is effective only when Uptal records it and issues a confirmation; when an email is deemed received; that the customer bears the risk of a failed or unconfirmed attempt; or that the customer must escalate if no confirmation arrives.

24. **"No prorated refunds are issued for cancellations made mid-cycle."** (S3.3, S4.3). By naming only "prorated" refunds, the sentence implies full refunds on cancellation are a different question. Say "no refund of any kind, whether prorated, partial or full".

25. **"Downgrading from Executive Pro to Professional does not entitle the subscriber to a refund for the difference in plan pricing."** (S3.3). Covers one direction, one product, one pair of plans. Silent on: upgrades and the treatment of amounts already paid; mid-cycle plan changes generally; switching billing cadence from annual to monthly; moving between Uptal products; moving between currencies; seat or admin changes.

26. **"Unused profile unlocks do not roll over to subsequent billing periods and are non-refundable. No compensation or credits will be provided for unused unlocks."** (S3.4). Good as far as it goes, but silent on the more damaging cases: an unlock spent on a stale, duplicate, fake, inaccurate or unreachable candidate; an unlock spent on a candidate who never responds or has already been hired; unlocks lost when the account is suspended, downgraded or terminated mid-cycle; whether an unlock has any cash value at all. Add: an unlock is consumed and fully performed at the moment the underlying data is disclosed, irrespective of the accuracy, currency, completeness, reachability, responsiveness, availability or suitability of the candidate, and unlocks have no cash value.

### Section 4 (Auto-Apply)

27. **"This service is delivered continuously and consumed as applications are submitted throughout your billing period."** (S4.1). See Part 0 route 3. Consumption is defined by submissions. Zero or low submission counts become a direct arithmetic refund argument, and Section 4.2's bullet "The number of roles matched, or applications tailored or submitted, during the period" does not cure it, because Section 4.1 makes submissions the measure of consumption in the first place.

28. **Section 4.2 is the weakest of the three no-refund clauses.** It says only "final and non-refundable". It lacks "non-reversible" and "non-exchangeable", and it lacks the "to the maximum extent permitted by applicable Saudi law" tail that Sections 3.2 and 5.2 both carry. An arbitrator reading the three side by side will conclude the drafter deliberately gave Auto-Apply a lighter regime.

29. **Section 4 contains no equivalent of Section 3.1's availability-not-usage deeming sentence.** This is the expressio unius gap described in Part 0 route 3. Same for Section 5.

30. **"The price that applies to you is shown before you pay."** (S4.3). At an auto-renewal nothing is shown before the charge. This sentence directly contradicts Section 6's "without prior notice" renewal pricing, and it hands the customer a contractual promise of pre-charge price disclosure that Uptal cannot keep on renewals. Delete it or confine it expressly to the initial checkout.

31. **The policy nowhere addresses renewal reminders.** Silence invites a regulator or court to imply a duty to notify before an automatic charge. State expressly that no advance notice or reminder of a renewal is required, that any reminder is a courtesy, and that non-receipt of a reminder is not a ground for anything.

32. **"you may pause your Auto-Apply subscription for up to three months at a time. Pausing suspends both your applications and your billing for the selected period; it is not a refund of any amount already paid."** (S4.4). Serious gaps. It says billing is suspended but says nothing about the **unused remainder of the paid period at the moment of pausing**. The customer pauses on day 2 of a paid month and argues: you took my money for 30 days, you stopped the service on day 2 at my request, you suspended billing so you did not re-charge, and you never gave those 28 days back, therefore 28 days are unconsumed and repayable. Also silent on: how many pauses are permitted; whether a pause can be taken mid paid period at all; whether the paid period keeps running during the pause; whether the resume charge is authorised in advance; what price applies on resumption.

33. **"Your subscription resumes automatically at the end of the pause unless you cancel."** (S4.4). The resume charge is a new charge taken with no fresh consent and, on the current drafting, no advance consent either. That is the cleanest "unauthorised charge" story in the document.

34. **Pausing is offered for Auto-Apply only.** Nothing says so. A Talent Search subscriber asks to pause, is refused, and argues unequal treatment or that the pause right is general. State that pause is an Auto-Apply feature only and confers no rights.

35. **"The absence of a response, interview, or job offer is not a basis for a refund."** (S4.5). Only three outcomes named. Not covered: being rejected, being ghosted, being shortlisted then dropped, receiving only unsuitable offers, receiving offers below salary expectations, or the converse case of **being hired** and therefore no longer needing the subscription. Broaden to all outcomes and to the absence, presence, quality, timing or nature of any outcome.

36. **"Uptal's AI is probabilistic and can make mistakes"** (S4.6). As drafted this is a bare admission of defective output. It should be reframed as an agreed characteristic of the service that the customer accepted and paid for, so that error is inside the scope of the bargain rather than a defect that could support a mandatory-law claim.

37. **"None of the above entitles you to a refund, credit, or compensation."** (S4.6). Same three-item remedy list problem as item 18.

38. **Section 4.6 says nothing about applications sent to a current employer, a former employer, a competitor, a client, a regulator or any excluded company.** Nothing about the exposure of a confidential job search, nor about any blocklist, exclusion list or "do not apply" preference. This is the highest-emotion, highest-damages fact pattern the product can generate, and the Refund Policy, which is the instrument that prevails on refunds, is silent on it.

### Section 5 (CV Enhancer)

39. **"Our team begins work as soon as you place your order."** (S5.1). A factual representation of human work starting immediately. If the deliverable is machine-generated or work starts later, this is a misrepresentation hook. Rewrite as a deeming provision covering personnel and AI systems.

40. **No delivery time is stated anywhere for CV Enhancer, and no definition of "delivery".** Silence means a reasonable time is implied by law. The customer who waited nine days argues unreasonable delay, therefore breach, therefore refund. Add: no delivery deadline is given or guaranteed; any indicative timeframe is an estimate only; delay is never a ground for a refund or any other remedy; the sole remedy for delay is delivery; a deliverable is deemed delivered when made available in the account or sent to the email on file, whether or not opened.

41. **Nothing in Section 5 addresses cancellation of a CV Enhancer order before delivery.** Order placed at 14:00, customer emails at 14:05 saying "stop, cancel". Absent an express clause, the customer argues the order was withdrawn before performance and the money must come back. Add an express statement that an order cannot be cancelled once placed and that the charge is fully earned at that moment.

42. **Section 5.2's bullet list omits the duplicate-or-accidental-purchase bullet that Sections 3.2 and 4.2 both carry.** So a customer who orders CV Enhancer twice has no bullet closing them off inside the CV Enhancer section. This is the "bought CV Enhancer twice" fact pattern already half-open on the face of the document.

43. **"If you are not satisfied with your enhanced CV, the remedy we provide is revisions, not a refund ... we will work with you to adjust your CV in line with the service you purchased."** (S5.3). No number of revisions, no window to request them, no scope limit, no expiry. Two opposite attacks: (a) demand unlimited revisions forever; (b) be refused the seventh revision and argue the sole remedy failed of its essential purpose, so the money remedy revives.

44. **"If the delivered CV materially fails to match the service described and revisions cannot resolve this, you remain entitled to the remedies available under applicable Saudi law."** (S5.3). **This is a bigger hole than Section 5.4.** It is an express contractual concession, on a customer-defined "materially fails to match" standard, with no time bar, no evidence requirement, no Uptal determination and no cap, and it preserves "the remedies available under applicable Saudi law" rather than only mandatory and non-excludable ones. Those remedies include price reduction and rescission. If the drafters delete 5.4 and leave 5.3 as written, the policy is not airtight and the founder will not have got what he asked for.

45. **Section 5.4 in its entirety** is a promised refund with a promised payment window ("within ten (10) business days of verification"). R5 deletes it. Note also the collateral argument it creates while it exists: Uptal has conceded that a measurable failure of a scored output justifies a refund for one product, so why not for Auto-Apply match scores. Deleting it removes that equal-treatment argument as well.

### Section 6 (Pricing and taxes)

46. **"a VAT-compliant tax invoice is issued in respect of each charge"** (S6). A positive, testable obligation. Non-issuance, late issuance or wrong details become an argument that the charge is procedurally defective. Soften to "is made available in your account" and state expressly that any issue with an invoice is corrected by reissuing the invoice and is not a ground for a refund.

47. **"the then-current price for your plan as published on the Uptal website at the time of renewal, is the price in effect for that charge"** (S6). If the plan's price is not published on the website at that moment (pricing behind a login, a legacy plan, a negotiated plan, a hidden or grandfathered plan, a page outage), the contractual reference price does not exist and the customer argues no price was validly fixed for the renewal. Add a fallback to the price recorded in Uptal's systems for that subscription.

48. **"continued use of a product after a price change taking effect at renewal constitutes acceptance of the changed price."** (S6). This is a self-inflicted wound. It makes acceptance depend on **use**, so the customer who does not use the product after the renewal argues they never accepted the new price. It also contradicts the entire "availability not usage" theory of the policy. Acceptance must attach to the charge, not to use.

49. **Section 6 is silent on currency, conversion and bank charges.** No mention of the currency of charge, issuer conversion, cross-border or foreign transaction fees, dynamic currency conversion at checkout, or the fact that the amount debited in the customer's local currency may differ from the amount charged. Section 8 mentions "the original currency of the charge" only in the refund mechanics.

50. **Section 6 is silent on VAT status disputes.** A business customer who registers for VAT late, supplies a VAT number after the charge, or claims zero-rating or exemption will demand the VAT back as a "refund".

51. **Section 6 is silent on failed payments, retries, dunning, pre-authorisation holds and partial captures.** A customer who sees an authorisation hold plus a capture will call it a duplicate charge and route into Section 8.

### Section 7 (Service availability and disruptions)

52. **"Uptal ... endeavors to maintain continuous availability of its services"** (S7). "Endeavors" is both a soft word and, worse, an affirmative undertaking. A claimant pleads it as a contractual standard: you undertook to endeavour, you did not endeavour, therefore breach. Replace with a pure disclaimer: Uptal gives no undertaking as to availability.

53. **Section 7 covers "disruptions, degradations, suspensions, and outages" but NOT discontinuation, sunset, withdrawal or permanent termination of a product or feature.** The Terms allow discontinuation without liability (Terms 4.2 and 14(iv)), but the **Refund Policy prevails on refunds** and says nothing. Annual plan bought on day 1, product killed on day 3, and the prevailing instrument is silent. Total failure of consideration argument with no contractual answer. This is a top-tier hole.

54. **Section 7 is silent on data loss, security incidents and account compromise as they affect the charge**, other than the passing reference in Section 8 to a "confirmed security breach of your Uptal account", which is drafted as a **refund trigger** rather than as an excluded ground.

### Section 8 (Exceptions)

55. **"refunds are considered only in the following cases"** (S8). "Considered" cuts both ways and both ways are bad. From Uptal's side it does not create a discretion clearly enough. From the customer's side it establishes that these are recognised refund categories, which is a route to a refund for a delivered service by another name. R6 recast to "correction of charges that are not payments for services".

56. **"An unauthorized charge, including one resulting from a confirmed security breach of your Uptal account"** (S8). **The word "including" is the single most exploitable word in the document.** It makes an account breach only one example of an "unauthorized charge", so the category is open. Into it I put: my spouse used my card; my son used my phone; my employee subscribed without authority; I never authorised the renewal; I did not authorise this price; I authorised one month, not twelve. Every one of those becomes a claim under an express exception. Define "unauthorised" exhaustively and narrowly, and expressly exclude use by any person to whom the payer gave access to the account, the device, the card or the credentials, and exclude any charge made under a subscription established by the payer or by any authorised user.

57. **"A duplicate charge caused by a verified billing-system error on Uptal's side, which will be refunded once so verified."** (S8). "Verified" by whom, against what standard, and within what time. "Billing-system error" is undefined and excludes, by implication, duplicate charges caused by the customer, by the card scheme or by a processor, so those become contested. "**Which will be refunded**" is mandatory language creating an entitlement, which sits badly with the same section's "Uptal's determination ... shall be final".

58. **"you must contact support@uptal.com within seven (7) calendar days of the date of the charge in question"** (S8), followed by **"The seven-day window applies to requests made under this Section and does not limit any right you have under mandatory Saudi law."** The second sentence tells the claimant exactly how to defeat the first: do not claim under Section 8, claim under mandatory law, where no time bar is stated at all. Also, a seven day bar running from the **date of the charge** is likely to be found unreasonable for genuinely unauthorised use, which a customer often discovers on a later statement; if the bar is struck, no bar replaces it.

59. **"typically within ten (10) business days of approval"** (S8). "Typically" is weak; and any actual payment made later than ten days becomes a fresh breach claim. Say that no specific timeframe is guaranteed and that payment provider processing times are outside Uptal's control.

60. **"No refund shall be made ... to any person other than the payer of record."** (S8). "Payer of record" is undefined. Silent on what happens when the original payment method is closed, expired, cancelled or belongs to a closed account, and silent on whether Uptal may instead set the amount off against sums owed.

61. **"and in no other case whatsoever"** (S8) is not true on the face of the document. The same sentence carves out statutory rights and Section 5.4, and Section 5.3 creates a third route. A clause that is self-evidently untrue invites a tribunal to read the whole section sceptically.

62. **Section 8 is silent on ZATCA credit notes.** If a charge is corrected, the tax treatment must be corrected too. Not a refund loophole, but a compliance item the drafters must flag.

### Section 9 (Chargebacks and disputes)

63. **"If a chargeback ... is filed with your bank ... before you have contacted Uptal ... and allowed a reasonable opportunity for resolution"** (S9). "Reasonable opportunity" is the customer's defence: "I emailed support, waited three days, heard nothing, that was reasonable, so my chargeback was compliant with your policy." Specify a definite period in Business Days.

64. **Section 9 never says that filing a chargeback against a valid charge is a material breach**, never obliges the customer to withdraw a dispute, never says Uptal's records are conclusive evidence in the dispute, and never addresses what happens if the customer **wins** a chargeback on a valid charge: is the amount still owed as a debt, may Uptal re-invoice, may Uptal set it off, may Uptal permanently bar the account. R4 requires all of this.

65. **"Uptal ... may, without prejudice to any other right or remedy: suspend, restrict, or terminate ..."** (S9). Permissive throughout. Fine for Uptal's optionality, but pair it with a mandatory statement of the customer's obligations so the section is not purely one-sided in a way that reads as unenforceable.

### Sections 10 through 13

66. **Section 11 (Contact)** contains no notice formalities: no requirement of writing, no required contents, no deemed-receipt rule, and **no general time bar for raising any billing claim**. The only time bar in the Policy is the seven day one inside Section 8, which by its own words applies only to Section 8 requests. The Terms have a twelve month bar (Terms 16) but the Policy prevails on billing matters and has none. R4 requires a general time bar in the Policy itself.

67. **"changes shall not apply retroactively to charges already processed at the time of publication"** (S12). Read with item 2, an existing subscriber argues the July 30 policy, including Section 5.4 and Section 5.3's savings sentence, is the policy they agreed to and continues to govern their subscription and its renewals. A transition clause is mandatory: state that each renewal, resumption, upgrade or new order is governed by the version of the Policy published at the time of that charge, and that the version in force at the time of any charge as recorded in Uptal's systems is conclusive.

68. **Section 12 has no version number and no effective-date field beyond a "last updated" line.** With "take effect immediately upon publication" and no archive, a claimant disputes which text was live on their charge date. Add a version identifier, an effective date, and a conclusive-records provision.

69. **"in the event of any conflict, ambiguity, or inconsistency between them, the Arabic version shall prevail"** (S13). Every place where the Arabic is weaker, vaguer or omits a limb becomes the operative text. The Arabic rewrite must be checked limb by limb against the English, not merely translated.

70. **"where Uptal ... has a right of determination, verification, approval, or discretion, that right may ... be exercised in Uptal's sole and absolute discretion"** (S13). Good, but note it only applies where such a right is granted. The Policy grants very few such rights expressly. Grant them expressly in the operative clauses.

---

## PART 2. FACT PATTERNS THE CURRENT POLICY DOES NOT ADDRESS
Format: the scenario, then **Status** (does the current text close it), then the **exact clause** to insert.
Clause text below is drafting-ready, with no em dashes and no en dashes.

### A. Cancellation and renewal mechanics

71. **The renewal was charged while the user was in the cancellation flow.**
**Status: OPEN.** There is no cancellation cut-off and no rule on simultaneity. Section 3.3 and 4.3 only say cancellation takes effect at the end of the period.
**Clause:** "A cancellation is effective only when it is completed and recorded in Uptal's systems. To prevent the next renewal charge, a cancellation must be completed and recorded not later than twenty four (24) hours before the renewal date and time of the subscription. A cancellation completed or recorded at any time after a renewal charge has been initiated or made, including a cancellation begun before that charge, takes effect only from the end of the paid period created by that charge. The renewal charge is fully earned and non-refundable, and the fact that a cancellation was in progress, incomplete, attempted, intended or contemporaneous with the charge is not a ground for any refund, credit, reversal or compensation."

72. **The user attempted to cancel but the interface failed, errored, was unavailable, or the support mailbox did not reply.**
**Status: OPEN, and made worse by Sections 3.3 and 4.3, which affirmatively promise a working self-service route.**
**Clause:** "Cancellation may be effected only through the cancellation function in your Uptal account settings or by written notice to support@uptal.com from the email address registered on the account, and is effective only upon Uptal recording the cancellation and issuing a confirmation. You are responsible for verifying that you have received a cancellation confirmation and, if you have not received one, for contacting support@uptal.com before your renewal date. No failure, error, unavailability, interruption or delay of any interface, network, device, email service or support channel, whether on your side or on Uptal's side, and no absence, delay or non-receipt of any confirmation, reminder or other communication, gives rise to any refund, credit, reversal or compensation in respect of any charge that has been made."

73. **The user cancelled through an unofficial channel: WhatsApp, in-app chat, social media, a phone call, or a message to a salesperson, and was told it was handled.**
**Status: OPEN.** Section 3.3 and 4.3 name two channels but do not say they are exclusive.
**Clause:** "Notices of cancellation given through any channel other than those specified above, including social media, messaging applications, telephone calls, in product chat, or communications to any individual employee, agent or contractor, are of no effect and do not cancel a subscription."

74. **A support agent, salesperson, affiliate or reseller promised a refund, a free month or a goodwill credit.**
**Status: OPEN.** Nothing in the Policy restricts who may vary it.
**Clause:** "No employee, agent, contractor, affiliate, reseller or other representative of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has authority to vary, waive, suspend or disapply this Policy, or to promise, approve or agree to any refund, credit, reversal, extension or other payment or concession. Any such statement, whether oral or written, is of no effect and creates no obligation, expectation or entitlement, unless it is set out in a written instrument signed by an authorised officer of Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) and expressly stated to vary this Policy."

75. **The user says they never knew the subscription was recurring.**
**Status: PARTLY OPEN.** Section 4.2 closes "failure to cancel or pause", and Section 3.2 closes "failure to cancel", but neither closes the claim of not knowing, and no clause deems the customer to have read the policy or the checkout disclosures.
**Clause:** "Subscriptions renew automatically. The recurring nature, the billing frequency and the applicable price are disclosed at checkout and are recorded in your account. You are deemed to have read, understood and accepted this Policy, the Terms and Conditions and all checkout disclosures at the time of each purchase and at the time of each renewal. A statement that you did not know, did not understand, did not read, did not remember or did not expect that a subscription would renew, or that a charge would be made, is not a ground for any refund, credit, reversal or compensation."

76. **The renewal reminder email was not sent, went to spam, or went to an old address.**
**Status: OPEN and unaddressed.**
**Clause:** "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) is not required to give advance notice or a reminder of any renewal, resumption or price. Where any such notice or reminder is sent, it is sent as a courtesy only, creates no obligation, and its non delivery, non receipt, delayed receipt, filtering, blocking or deletion is not a ground for any refund, credit, reversal or compensation. Notices sent to the most recent email address on your account are deemed validly given whether or not actually received or read."

77. **The subscription ran unused for many cycles and the user now asks for all of them back at once.**
**Status: OPEN.** Non-use is closed per cycle, but nothing bars an aggregated retrospective claim.
**Clause:** "Each charge stands alone and is separately and finally earned when made. No claim may be made in respect of more than one charge on the basis of a single set of circumstances, and no claim may be made in respect of any charge made more than thirty (30) calendar days before the date on which the claim is first raised in writing with Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), to the maximum extent permitted by applicable Saudi law."

### B. Who paid, and who says they did not

78. **The card was used by a family member, spouse, child or friend of the cardholder.**
**Status: OPEN, and actively invited by Section 8's word "including".**
**Clause:** "A charge is not unauthorised where the payment method, the account, the device or the credentials were used by any person to whom you gave, permitted or failed to prevent access, including a family member, a member of your household, a friend, a guest or any other person. You are responsible for all charges arising from any such use."

79. **An employee used a company card, or subscribed on the company's behalf without internal authority.**
**Status: OPEN.**
**Clause:** "Where a purchase is made using a payment method belonging to a company, organisation or other entity, the person making the purchase warrants that they are authorised to do so and the entity is bound. Any absence, limitation, withdrawal or breach of internal authority, procurement policy, budget approval or delegation is a matter between you and that person, is not a ground for any refund, credit, reversal or compensation, and does not make the charge unauthorised for the purposes of this Policy."

80. **An employer, agency, sponsor, relative or third party paid for a job seeker's subscription and now wants the money back, or the job seeker wants it back.**
**Status: OPEN.** The Policy never identifies who the counterparty is.
**Clause:** "Where any Uptal product is paid for by a person other than the account holder, the account holder and the payer of record are jointly and severally bound by this Policy, the service is delivered to the account holder, and no refund, credit, reversal or compensation is available to either of them. Any dispute, arrangement, expectation or falling out between the account holder and the payer, including the ending of an employment, sponsorship, agency or family relationship, is not a ground for any refund, credit, reversal or compensation."

81. **A payer disputes on the cardholder's behalf, or a third party claims to act for the customer.**
**Status: OPEN.**
**Clause:** "No claim under this Policy may be made by, assigned to, transferred to, or pursued by any person other than the account holder or the payer of record, and any purported assignment, transfer or subrogation of any such claim, including to any claims management company, representative, agent or funder, is void and of no effect. No person other than you and Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) has any right to enforce this Policy."

82. **The user's account was compromised and the attacker upgraded the plan or bought an add-on.**
**Status: PARTLY OPEN.** Section 8 lists a "confirmed security breach of your Uptal account" as a refund trigger, but Terms 5 makes the user responsible for all account activity until notification. The two instruments conflict, and the Policy prevails.
**Clause:** "You remain responsible for all charges arising from activity on your account until you have notified Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in writing of a suspected compromise and Uptal has had a reasonable opportunity to act on that notification. A charge arising from a failure by you to safeguard your credentials, your device or your payment method is not unauthorised for the purposes of this Policy."

### C. Circumstances of the customer

83. **The user got hired the day after a renewal, or during the paid period.**
**Status: OPEN.** Section 4.5 covers the absence of outcomes only. It does not cover success.
**Clause:** "Obtaining employment, accepting an offer, withdrawing from the job market, ceasing to search, or otherwise no longer needing or wanting the service, whether or not as a result of your use of any Uptal product and whether occurring before, on or after any charge, is not a ground for any refund, credit, reversal, extension or compensation. This applies equally where employment is obtained on the day of, or on any day after, a renewal charge."

84. **The user deleted their own account, or lost access through their own act or omission.**
**Status: OPEN.**
**Clause:** "Deletion, closure, deactivation or abandonment of your account by you, loss of your credentials, loss of access to your registered email address, or any other act or omission of yours that results in your losing access to a product, does not terminate any charge already made, does not entitle you to any refund, credit, reversal or compensation, and does not stop future charges unless you have also cancelled the relevant subscription in accordance with this Policy."

85. **Uptal suspended or terminated the account for breach, fraud, scraping, sharing credentials or abuse.**
**Status: CLOSED IN THE TERMS ONLY (Terms 14), OPEN IN THE POLICY, which prevails on refunds.**
**Clause:** "Where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) suspends, restricts, disables or terminates your access to any product, in whole or in part, for breach of the Terms and Conditions, for suspected fraud or misuse, for legal or regulatory reasons, or on any other ground permitted by the Terms and Conditions, all amounts already charged remain fully earned and non-refundable, no part of any paid period is repaid, credited or extended, and any unused allowances, unlocks, applications, revisions or iterations are forfeited."

86. **The user was a minor at the time of purchase.**
**Status: OPEN in the Policy. Terms 3 takes an age warranty but attaches no billing consequence.**
**Clause:** "The Uptal products are offered only to persons aged eighteen (18) years or over. By purchasing, you warrant that you are of that age and have full legal capacity. Where a purchase is made in breach of that warranty, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may close the account and cease future charges, and the treatment of amounts already charged is governed exclusively by mandatory applicable Saudi law and by no other provision, entitlement or expectation."
*(Drafting note: do not attempt an absolute no-refund rule against a minor. A clause that purports to bind a person without capacity is the clause most likely to be struck, and under the brief's own definition of airtight a struck clause is worse than a narrow one. Route it to mandatory law and stop.)*

87. **The subscriber died, or became incapacitated, hospitalised or otherwise unable to use the service.**
**Status: OPEN and entirely unaddressed.**
**Clause:** "Illness, injury, incapacity, hospitalisation, imprisonment, travel, relocation, military or national service, family circumstances, financial hardship, loss of employment or any other change in your personal, professional, medical or financial circumstances is not a ground for any refund, credit, reversal, extension or compensation. On written notification of the death of a subscriber, accompanied by satisfactory evidence, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) will cancel the subscription and cease further charges with effect from the date of that notification. Amounts already charged are treated in accordance with mandatory applicable Saudi law and, subject to that law, are not repaid."
*(Drafting note: ceasing future charges on notified death costs nothing, is expected by card schemes and regulators, and materially strengthens the policy's overall reasonableness. It is not a refund.)*

88. **The user is outside Saudi Arabia and invokes their own local consumer law, for example a fourteen day EU or UK withdrawal right.**
**Status: OPEN.** Section 10 sets Saudi governing law and Riyadh jurisdiction, but the Policy never states the contracting location or addresses foreign mandatory law.
**Clause:** "All Uptal products are supplied from the Kingdom of Saudi Arabia by Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), and every purchase, subscription, order, renewal and charge is made and performed in the Kingdom of Saudi Arabia. This Policy is governed exclusively by the laws of the Kingdom of Saudi Arabia. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) does not offer, and no purchaser acquires, any cooling off, withdrawal, return, cancellation or refund right arising under the law of any other country, state or territory, and no such right applies to any charge, save to the extent that a competent court of the Kingdom of Saudi Arabia determines otherwise under mandatory law."

89. **The user could not use the service because of their own device, browser, connectivity, VPN, location, geo-block, sanctions status or visa and work eligibility position.**
**Status: PARTLY CLOSED for device and internet only.**
**Clause:** "Any inability or restricted ability to access or use a product arising from your device, browser, operating system, software, network, connectivity, use of a virtual private network or proxy, location, travel, local restrictions on access, or your immigration, residency or work eligibility status, is not a ground for any refund, credit, reversal, extension or compensation."

### D. The product side

90. **A product, plan or feature is discontinued, sunset or withdrawn mid term.**
**Status: OPEN in the Policy, which is the prevailing instrument on refunds. Section 7 covers outages, not discontinuation.**
**Clause:** "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may at any time add, modify, restrict, suspend, withdraw or discontinue any product, plan, feature, allowance or part of them, in whole or in part, with or without notice. No such change, and no discontinuation, sunset or withdrawal, however extensive and whenever occurring within a paid period, entitles you to any refund, credit, reversal, extension, replacement, substitute product or compensation of any kind in respect of amounts already charged. Where Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) discontinues a subscription product entirely, its sole action is to cease making further charges."

91. **An extended outage, a multi day failure, a national or infrastructure incident, or a permanent loss of data.**
**Status: PARTLY CLOSED by Section 7, but undermined by Section 2's "capable of being exploited in full" and by "endeavors".**
**Clause:** "Delivery is constituted by the availability of the service and not by your use of it, and delivery is deemed to have occurred in full at the moment of charge. No interruption, outage, degradation, suspension, maintenance, latency, reduced performance, loss of data, security incident or force majeure event, of whatever duration, cause or severity, including an interruption lasting for the whole or substantially the whole of a billing period, affects that deemed delivery or entitles you to any refund, credit, reversal, extension, set off or compensation."

92. **The AI applied to the user's current employer, a former employer, a competitor or an excluded company, and the user says it caused them harm.**
**Status: OPEN in the Policy. Terms 7.1 and 7.3 authorise unreviewed submissions and waive claims, but the Policy is silent and the Policy prevails on refunds.**
**Clause:** "Auto-Apply operates automatically and without individual review of each application, and may submit applications to positions, employers or entities that you have not individually reviewed, would not have selected manually or do not want, including your current employer, a former employer, a competitor, a client or any entity you wished to exclude. No exclusion, blocklist, filter or targeting preference is guaranteed to be applied, complete or effective. No submission, and no consequence of any submission, including any effect on your current employment, your relationships, your reputation or your prospects, entitles you to any refund, credit, reversal or compensation. Your remedy in respect of any submitted application is to contact the receiving employer or platform directly."

93. **The AI produced an error, a fabrication or an inaccurate tailored CV that the user says damaged them.**
**Status: PARTLY CLOSED by Section 4.6, which closes the refund but frames the AI as making mistakes rather than as operating as agreed.**
**Clause:** "You acknowledge that the AI systems are probabilistic, are not deterministic, and produce estimates that may be inaccurate, incomplete or unsuitable, that this is an agreed characteristic of the service you have purchased and not a defect in it, and that the price you pay reflects it. No error, inaccuracy, omission, mischaracterisation or unsuitable output, and no consequence of any of them, entitles you to any refund, credit, reversal or compensation."

94. **The user never uploaded a CV, never set preferences or never completed onboarding, so nothing could be produced.**
**Status: OPEN, and worsened by Section 2's "as soon as your subscription is active" and Section 4.1's consumption-by-submission wording.**
**Clause:** "The service is delivered by being made available to you. A subscription is available from the moment of charge, whether or not you upload a CV, complete your profile, set preferences, verify your email address, log in, or take any other step. Your failure or delay in providing any information, material, cooperation, access or instruction necessary for a product to produce output for you does not affect delivery, does not reduce the amount charged, and is not a ground for any refund, credit, reversal, extension or compensation."

95. **Zero or very few applications were submitted, or zero matches were found, during a paid period.**
**Status: PARTLY CLOSED by a Section 4.2 bullet, but contradicted by Section 4.1's definition of consumption.**
**Clause:** "The number, timing, quality, destination or existence of matches, tailored CVs, applications or submissions during any period, including a period in which none occurs, does not affect delivery of the subscription, which is constituted by availability alone, and is not a ground for any refund, credit, reversal, extension or compensation."

### E. Money mechanics

96. **The user was charged in, or debited in, a different currency, or lost money on conversion or on bank fees.**
**Status: OPEN.**
**Clause:** "All charges are made in Saudi Riyals unless expressly stated otherwise at checkout. Any conversion into another currency, any exchange rate applied, and any cross border, foreign transaction, intermediary, issuer or acquirer fee is determined by your bank, card issuer or payment provider and is outside Uptal's control. Any difference between the amount charged by Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) and the amount debited to you, and any such fee, is not a ground for any refund, credit, reversal or compensation, and is not a duplicate or an overcharge."

97. **The user sees a pre-authorisation hold plus a capture, or a failed payment retried successfully, and calls it a duplicate.**
**Status: OPEN.**
**Clause:** "An authorisation, hold, pending entry, reversal of an authorisation, declined attempt or retry shown on a statement is not a charge and is not a duplicate charge. Where a payment attempt fails, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may retry it, and the resulting successful charge is the charge for that period."

98. **The price increased at renewal and the user says they had no notice.**
**Status: PARTLY CLOSED by Section 6, but undermined by Section 4.3's "The price that applies to you is shown before you pay" and by the acceptance-by-use sentence.**
**Clause:** "Prices may be changed at any time and from time to time without prior notice and without any obligation to honour a previously displayed or previously charged price. The price in effect for a renewal is the then current price for your plan as recorded in Uptal's systems at the time of that renewal. A price change, an increase, the withdrawal or expiry of a promotional, introductory or discounted price, and the absence of any notice of any of them, is not a ground for any refund, credit, reversal or compensation, and the making of the charge constitutes acceptance of the price charged."

99. **A promotion, discount code or referral credit was not applied, or a better offer was later made to new customers.**
**Status: PARTLY CLOSED by one Auto-Apply bullet on promotional discounts already applied.**
**Clause:** "Promotional prices, discounts, codes, credits, referral benefits and trial offers are made available at Uptal's discretion, are subject to their own conditions, have no cash value, are not transferable, and are not applied retrospectively. The failure of any code or benefit to apply, the expiry or withdrawal of any offer, and the availability of a different or better price to any other customer at any time, is not a ground for any refund, credit, reversal or compensation."

100. **VAT is disputed, or the customer supplies a VAT number after the charge, or the invoice is wrong or missing.**
**Status: OPEN.**
**Clause:** "Applicable Value Added Tax is charged in accordance with the tax regulations of the Kingdom of Saudi Arabia in force at the time of the charge, and a tax invoice is made available in your account. Any question relating to a tax invoice, including its contents, timing or availability, is resolved by the issue or reissue of a corrected invoice or, where required by tax regulation, a credit note, and is not a ground for any refund, credit, reversal or compensation in respect of the amount charged."

101. **A chargeback is filed, and either won or lost by the customer.**
**Status: PARTLY CLOSED by Section 9, which is missing the material breach, the debt survival, the conclusive evidence and the withdrawal obligation.**
**Clause:** "Filing a chargeback, payment dispute or reversal request in respect of a charge that is valid under this Policy is a material breach of this Policy and of the Terms and Conditions. You must raise any billing concern in writing with support@uptal.com and allow Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) not less than ten (10) Business Days to respond before initiating any dispute with a bank, card issuer or payment provider, and where a dispute has been initiated in breach of this Policy you must withdraw it on request. Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may suspend, restrict or terminate your access to the affected product and to every other Uptal product, contest the dispute and submit its records as evidence, and recover from you the full amount of the charge together with all documented costs, fees and expenses, including chargeback fees. To the maximum extent permitted by applicable Saudi law, Uptal's records are conclusive evidence of the charge, of the grant of access, of delivery and of the work performed. A chargeback, whether or not decided in your favour, does not constitute a refund, does not extinguish, suspend or reduce any amount owed by you, and does not create any entitlement or precedent."

102. **The user asks for something that is not called a refund: a voucher, a free month, an extension, a credit, a set off, a partial waiver or a goodwill gesture.**
**Status: OPEN.** The current text closes only "refunds, credits, or exchanges".
**Clause:** "No refund, repayment, reimbursement, reversal, chargeback, cancellation of a charge, credit, service credit, account balance, voucher, coupon, discount, waiver, rebate, extension of any term, additional or free period, additional allowance, replacement or substitute service, set off, deduction, withholding, compensation, damages in lieu, or goodwill payment or gesture of any kind is available in respect of any amount charged for any Uptal product."

103. **Uptal makes a payment in one case and the customer next door demands the same.**
**Status: OPEN.**
**Clause:** "Any payment, credit or concession that Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) elects to make in any individual case is made ex gratia and without any admission of liability or obligation, does not vary this Policy, creates no precedent, no entitlement, no course of dealing and no expectation, and does not oblige Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) to make any similar payment, credit or concession in the same case or in any other case."

### F. Product-specific residue

104. **A trial converted to a paid subscription.**
**Status: OPEN in the Policy. Terms 6.4 mentions trials but the Refund Policy never does.**
**Clause:** "Where a free or discounted trial converts to a paid subscription, the first and every subsequent charge following conversion is a purchase to which this Policy applies in full. The conversion terms are disclosed before you provide payment details. Failure to cancel before the end of a trial, a misunderstanding as to the length or end date of a trial, a time zone difference, and non use of a trial are not grounds for any refund, credit, reversal or compensation."

105. **The user paused Auto-Apply and then cancelled, and asks for the unused paid days.**
**Status: OPEN.** Section 4.4 says a pause is not a refund but says nothing about the unused remainder of a paid period.
**Clause:** "Pausing suspends future charges only. A pause does not extend, bank, preserve, credit, transfer or refund any unused part of a paid period, and any unused part of the paid period current when a pause begins expires and is forfeited. A subscription resumes automatically at the end of the pause unless cancelled, and by pausing you authorise in advance the charge that falls due on resumption at the then current price. Pausing is available for Auto-Apply only and confers no right in respect of any other product."

106. **Unused profile unlocks, applications, revisions or iterations at the end of a period, or lost on suspension or downgrade.**
**Status: PARTLY CLOSED for Talent Search unlocks only.**
**Clause:** "All allowances, including profile unlocks, applications, revisions and iterations, are made available for use within the period to which they relate, have no cash value, do not roll over, are not transferable, and are forfeited at the end of that period or on any earlier cancellation, downgrade, pause, suspension, termination or account closure. An unlock is consumed and fully performed at the moment the underlying information is disclosed to you, irrespective of the accuracy, currency, completeness, reachability, responsiveness, availability or suitability of the candidate. No unused, forfeited, wasted or unsatisfactory allowance entitles you to any refund, credit, reversal, extension or compensation."

107. **The user bought CV Enhancer twice, for the same CV or for two CVs.**
**Status: OPEN. Section 5.2 has no duplicate-purchase bullet at all, unlike Sections 3.2 and 4.2.**
**Clause:** "Each CV Enhancer order is a separate purchase and is separately charged and separately performed. Placing more than one order, whether for the same CV or for different CVs, whether intentionally or in error, and whether or not the resulting deliverables are similar, is not a ground for any refund, credit, reversal or compensation, save only where the additional charge is a duplicate charge falling within the correction provisions of this Policy."

108. **The user chose the wrong plan, the wrong product, the wrong billing cadence, or bought an annual plan and regretted it.**
**Status: OPEN.**
**Clause:** "You are responsible for selecting the product, plan, billing frequency and term that you require. The selection of a plan, term or product that does not suit you, the purchase of a longer term than you wanted, the purchase of one product in the belief that it was another, and buyer's remorse of any kind, are not grounds for any refund, credit, reversal, exchange, downgrade credit or compensation."

109. **The user has duplicate accounts and duplicate subscriptions on two email addresses.**
**Status: PARTLY OPEN. "Duplicate or accidental purchases" is closed as a bullet in two of three product sections, but duplicate accounts as such are unaddressed.**
**Clause:** "Where you hold more than one Uptal account, each account and each subscription is separate and each charge stands alone. The existence of a duplicate or additional account or subscription is not a duplicate charge and is not a ground for any refund, credit, reversal or compensation."

110. **The CV Enhancer deliverable was late, or the user wants to cancel an order before delivery, or the revision process is exhausted.**
**Status: OPEN on all three (see items 40, 41 and 43).**
**Clause:** "A CV Enhancer order cannot be cancelled once placed, and the fee is fully earned at the moment of charge. No delivery date is guaranteed and any indicative timeframe is an estimate only; delay is not a ground for any refund, credit, reversal or compensation and the sole remedy for delay is delivery. Revisions are provided within the scope and number included in the service purchased and must be requested within fourteen (14) calendar days of delivery. The provision of revisions is your sole and exclusive remedy in respect of any dissatisfaction with a deliverable, and the exhaustion, refusal, unavailability or failure of that remedy does not give rise to any refund, credit, reversal or compensation and does not entitle you to any other remedy."

111. **The user says the marketing said "cancel anytime" or "money back", or an affiliate promised a guarantee.**
**Status: OPEN.**
**Clause:** "This Policy and the Terms and Conditions constitute the entire agreement between you and Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in relation to billing, refunds and payment disputes, and supersede all prior statements, marketing materials, advertisements, representations, assurances and understandings. No statement made by any affiliate, referrer, reseller, advertiser or other third party binds Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) or creates any entitlement."

112. **The user says the checkout did not properly disclose the terms, or that they were shown English only.**
**Status: OPEN.**
**Clause:** "This Policy is published in Arabic and in English and is accessible at all times on the Uptal website and at checkout. You are deemed to have been given a reasonable opportunity to read it before each purchase and before each renewal. A failure or omission by you to read this Policy, in either language, is not a ground for any refund, credit, reversal or compensation."

113. **The customer disputes which version of the policy applied to their charge.**
**Status: OPEN (see items 67 and 68).**
**Clause:** "Each charge is governed by the version of this Policy published at the time that charge is made, and each renewal, resumption, upgrade, downgrade, plan change, add on and new order is a separate charge governed by the version then published. Uptal's records of the version of this Policy in force at the time of any charge are conclusive, to the maximum extent permitted by applicable Saudi law."

114. **Any of the above dressed up as a claim for damages, breach, misrepresentation or unjust enrichment instead of a refund.**
**Status: OPEN.** The Policy closes refunds; it does not close the recharacterised claim. Terms 16 caps liability at one hundred Saudi Riyals, but the Policy prevails on billing and payment disputes and contains no cap and no time bar.
**Clause:** "Any claim relating to a charge, howsoever characterised, whether as a refund, a repayment, restitution, a price reduction, a set off, damages, compensation, or a claim in contract, tort or otherwise, must be raised with Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) in writing at support@uptal.com within thirty (30) calendar days of the date of the charge, failing which it is waived and permanently barred, to the maximum extent permitted by applicable Saudi law."

---

## PART 3. INTERNAL INCONSISTENCIES AND CROSS REFERENCE ERRORS IN THE 13 SECTIONS

115. **Section 5.4 promises a refund while the rest of the Policy says all sales are final.** Section 3.2, Section 4.2 and Section 5.2 each state that payments are final and non-refundable, and Section 8 says refunds arise "in no other case whatsoever", yet Section 5.4 grants a full CV Enhancer refund on a score condition. The document contradicts its own headline rule.

116. **Section 5.2 expressly cross references 5.4** ("except as expressly provided in Section 5.4 (score improvement guarantee)"). Dangling reference once 5.4 is deleted.

117. **Section 8 expressly cross references 5.4** ("apart from the score improvement guarantee set out in Section 5.4 (which applies to the CV Enhancer only)"). Dangling reference once 5.4 is deleted.

118. **Terms Section 7.7 cross references the score improvement guarantee** ("save only for the score improvement guarantee expressly set out in the Refund Policy"). This is an external dangling reference. The Terms must be amended in the same release or the guarantee survives by incorporation.

119. **Terms Section 6.2 already contradicts Refund Policy Section 5.4 today.** Terms 6.2 says refunds are considered only in "verified billing errors and confirmed unauthorized charges" and does not mention the score guarantee, while Terms 7.7 does. The Terms contradict themselves, and the Refund Policy prevails on refunds, so 5.4 currently wins. After the rewrite, the Terms 6.2 parenthetical will also be wrong, because those two cases will no longer be refunds at all.

120. **Section 2 contradicts itself on the nature of consumption.** "delivered, performed, and consumed immediately" versus "progressively and continuously" versus "treated as used, fully or progressively". Immediate and progressive are mutually exclusive. Contra proferentem resolves it against Uptal.

121. **Section 3.1 contradicts itself within one sentence.** "immediate, unrestricted access to the platform's full feature set" versus "(subject to your plan's monthly unlock allowance)".

122. **Section 4.3 contradicts Section 6.** "The price that applies to you is shown before you pay" versus "may modify the pricing ... at any time and from time to time, without prior notice" and renewal at the then current published price.

123. **Section 6 contradicts the whole availability-not-usage theory.** "continued use of a product after a price change taking effect at renewal constitutes acceptance of the changed price" makes acceptance depend on use, in a policy whose central claim is that use is irrelevant.

124. **The three no-refund clauses are not parallel.** Section 3.2: "final, non-refundable, non-reversible, and non-exchangeable ... to the maximum extent permitted by applicable Saudi law". Section 5.2: the same quadruple plus the statutory tail. Section 4.2: only "final and non-refundable", with no statutory tail. Auto-Apply is drafted weakest, and it is the highest-volume consumer product.

125. **The availability-not-usage deeming sentence exists only in Section 3.1.** Sections 4 and 5 have no equivalent. Expressio unius.

126. **Three different formulations of the statutory gateway.** Section 1: "mandatory and cannot be waived, limited, or varied by agreement". Sections 3.2, 4.2, 5.2, 8, 12: "as required by applicable Saudi law". Section 5.3: "the remedies available under applicable Saudi law". Section 7: "mandatory applicable Saudi law". A claimant uses the broadest one wherever it appears, and Section 5.3's is the broadest of all.

127. **Section 8's "in no other case whatsoever" is falsified inside its own sentence** and again by Section 5.3.

128. **Two different seven day clocks.** Section 8 runs seven calendar days from "the date of the charge in question". Section 5.4 runs seven calendar days from "delivery of the final enhanced CV". A claimant selects whichever is still open.

129. **Two different payment-out formulations.** Section 5.4: "issued to the original payment method within ten (10) business days of verification". Section 8: "issued to the original payment method only, in the original currency of the charge, typically within ten (10) business days of approval". "Verification" versus "approval", "within" versus "typically within", and the currency limb appears in only one of them.

130. **"business days" is used in Sections 5.4 and 8 in lower case and is nowhere defined in the Policy.** Section 13 imports only capitalized terms from the Terms, and the Terms define "Business Day" as a capitalized term, so the import fails on its own wording.

131. **Section 8's mandatory "which will be refunded" conflicts with the same section's "Uptal's determination ... shall be final".** One creates an entitlement, the other reserves a discretion.

132. **Section 3.2 and Section 4.2 close duplicate purchases with a carve-out; Section 5.2 has no duplicate bullet at all.** Asymmetry that opens the CV Enhancer duplicate case.

133. **The product scope headers create gaps.** "Applies to: employers & recruiters on Professional and Executive Pro plans" excludes any custom, legacy, enterprise, grandfathered, trial or free plan. "Applies to: job seekers subscribed to Auto-Apply" excludes a paused, lapsed or cancelled subscriber whose charge is nevertheless in dispute. "Applies to: job seekers who purchase a CV Enhancer order" excludes an order paid for by someone else. Add a sweep clause: these headers are indicative only and every charge for any Uptal product is governed by this Policy.

134. **The Policy prevails over the Terms on billing, refunds and payment disputes (Section 1), yet the Policy contains no severability, no waiver, no entire agreement, no cap and no general time bar.** Every one of those protections currently lives only in the subordinate instrument. This is a structural defect, not a wording defect.

135. **"Last updated on July 30, 2026" sits inside Section 12 rather than in a dedicated effective-date field, and there is no version identifier.** With "take effect immediately upon publication" and no archive, the effective text on any given charge date is disputable.

136. **Section 1 lists "any successor or substitute products" but Section 7 and Section 12 never reconcile that with discontinuation.** If a product is replaced, is the paid period carried over, and on what terms. Silent.

137. **Section 2's CV Enhancer bullet says performance commences "immediately upon order placement" while Section 5.1 says work begins "as soon as you place your order".** Trivial in isolation, but a claimant will time-stamp both and argue the stricter one was not met.

138. **Section 8 permits refunds only "to the payer of record", but Section 5.4 refunds "to the original payment method" with no payer restriction.** After 5.4 goes, unify on both limbs.

---

## PART 4. WORDS THAT ARE TOO WEAK, AND WHAT THEY MUST BECOME

139. **"endeavors"** (S7: "endeavors to maintain continuous availability"). Delete the undertaking entirely. Become: "does not undertake, warrant or represent that the services will be available".

140. **"typically"** (S8: "typically within ten (10) business days of approval"). Become: "may take up to thirty (30) days and is subject to the processing times of the relevant payment provider, for which Uptal is not responsible. No timeframe is guaranteed."

141. **"considered"** (S3.1: "the service is considered used"; S8: "refunds are considered only in the following cases"). Become, in S3.1: "is deemed, conclusively and irrevocably, to have been delivered, accepted and fully performed". In S8, under the recast, the word disappears with the concept.

142. **"treated as used"** (S2). Become: "is deemed delivered in full, fully performed and irrevocably consumed".

143. **"progressively and continuously" / "fully or progressively" / "consumed as applications are submitted"** (S2, S3.1, S4.1). Delete every progressive-consumption formulation. Become: "delivered in full, and deemed fully performed and irrevocably consumed, at the moment of charge; any continuing availability during the billing period is additional to, and does not qualify, that deemed full performance".

144. **"affected, reduced, or extinguished"** (S2). Become: "irrevocably and wholly extinguished, to the maximum extent permitted by applicable Saudi law".

145. **"to the extent the relevant service has been performed in whole or in part"** (S2). Delete the partial limb. Become: "the service having been fully performed at the moment of charge".

146. **"capable of being exploited in full"** (S2). Delete. Availability language must never be framed as a factual guarantee that can be falsified.

147. **"as required by applicable Saudi law"** (S3.2, S4.2, S5.2, S8, S12). Become, uniformly and everywhere: "to the extent, and only to the extent, required by a provision of Saudi law that is mandatory and cannot be waived, limited or varied by agreement".

148. **"the remedies available under applicable Saudi law"** (S5.3). The single broadest gateway in the document. Become the same uniform mandatory-only formulation, or delete the sentence and rely on the Section 1 savings clause alone.

149. **"the Consumer Protection framework"** (S1). Undefined. Become a named, mandatory-only formulation, or delete the phrase.

150. **"may"** where it should be "will" or "must". S9 "we may suspend" is correct as optionality, but S8's "as Uptal may reasonably request" should become "as Uptal requires", and S9's "may recover" should become "is entitled to recover as a debt".

151. **"reasonable" and "reasonably"** (S8 "such further information ... as Uptal may reasonably request"; S9 "a reasonable opportunity for resolution"). Replace with defined quantities: a stated list of required evidence, and a stated number of Business Days.

152. **"almost always the fastest route to resolution"** (S9). Marketing puffery inside an operative clause. Delete.

153. **"we will work with you to adjust your CV"** (S5.3). Soft, unbounded and unmeasured. Become a bounded remedy: a stated number of revisions, within a stated window, within the scope purchased, expressed as the sole and exclusive remedy whose exhaustion creates no money remedy.

154. **"Our team begins work as soon as you place your order"** (S5.1). A falsifiable factual claim. Become a deeming provision: "performance commences, and the fee is fully earned, at the moment of charge".

155. **"The price that applies to you is shown before you pay"** (S4.3). A promise Uptal cannot keep at renewal. Delete or confine expressly to the initial checkout.

156. **"instant, unrestricted access to the platform's full feature set"** (S3.1). Overclaims and then contradicts itself. Become: "access to the platform in accordance with your plan, including its allowances and limits".

157. **"no refunds, credits, or exchanges"** (S3.2, S4.2, S5.2) and **"a refund, credit, or compensation"** (S4.6). Three-item and three-item lists in a policy that needs the full R2 enumeration. Replace every occurrence with the single long-form no-remedy sentence at item 102.

158. **"verified" and "confirmed"** (S8), **"billing-system error"** (S8), **"active"** (S2, S4.1), **"payer of record"** (S8), **"charge"**, **"billing period"**, **"delivery"**, **"business days"**. All operative, all undefined. Define each in a definitions block.

159. **"which will be refunded once so verified"** (S8). Mandatory entitlement language. Under the recast: "which will be corrected once Uptal has verified it, such correction not being a refund".

160. **"Uptal's determination ... shall be final"** (S8). Keep, but add "following such investigation as Uptal considers appropriate, in its sole and absolute discretion, to the maximum extent permitted by applicable Saudi law".

---

## PART 5. WHAT THE NEW POLICY MUST ADD THAT IS NOT ANYWHERE IN THE CURRENT TEXT

161. A **definitions block** covering at least: charge, successfully charged, billing period, renewal, resumption, plan change, allowance, delivery, deemed delivery, payer of record, account holder, unauthorised charge, duplicate charge, Business Day, Uptal's records.

162. The **charge-equals-delivery section**, early and prominent, covering new purchases, every renewal, upgrades, downgrades, plan changes, reactivations, resumptions after a pause, add-ons, trial conversions and any charge under any payment method, with deemed acceptance at the moment of charge (R1).

163. **Advance, standing consent to immediate performance for every future charge**, granted at signup and at each purchase, not only at first checkout (R1).

164. The **single long-form no-remedy sentence** at item 102, used consistently and in place of every three-item list (R2).

165. The **exhaustive non-grounds list** required by R3, written as a single consolidated list rather than three partly overlapping product lists, so that no product is weaker than another.

166. **Conclusive-evidence, time bar, severability and blue-pencil, no waiver, authorised-officer-only variation, anti-precedent and ex gratia, anti-assignment, and no third-party rights** clauses, all inside the Policy itself and not only in the Terms (R4).

167. A **strengthened chargeback section** per item 101 (R4).

168. **Deletion of Section 5.4 and of every cross reference to it** in the Policy (5.2 and 8), plus a companion amendment to Terms 7.7 and Terms 6.2 (R5).

169. The **recast of Section 8** as "Correction of charges that are not payments for services", stating expressly that the corrections are not refunds and do not derogate from the absolute no-refund rule, with the narrow definition of "unauthorised" at item 56, plus the separate fully-stripped alternative block (R6).

170. A **transition clause** stating that each charge is governed by the version of the Policy published at that time, so the deletion of Section 5.4 binds existing subscribers on their next renewal (items 2, 67, 113).

171. A **version identifier and effective date**, with the last-updated line set to September 7, 2026.

172. A **line-by-line Arabic parity check**, because Section 13 makes the Arabic prevail and every weaker Arabic limb becomes the operative text (item 69).

173. Preservation of everything R7 lists, including the merchant identity string **Uptal (شركة الخبرات الصاعدة لتقنية المعلومات)** exactly as it appears in the live text.
