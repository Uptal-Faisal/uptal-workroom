# House rules and R1 to R10 audit: final_en.md and final_ar.md

Audited 7 September 2026 against `BRIEF.md`.
Files: `final_en.md` (1290 lines), `final_ar.md` (1289 lines), 163 headings each, section numbering parallel throughout.

**Verdict: PASS**, after 2 substantive fixes and 1 cosmetic fix applied during this audit. R8, R9 and R10 were checked hardest, as instructed. One R10 breach was found in both languages and has been fixed in the files.

---

## Summary table

| Req | English | Arabic | Status |
|---|---|---|---|
| R1 charge equals delivery | Sec 3.1 to 3.9 | Sec 3.1 to 3.9 | Met |
| R2 no refund in any form | Sec 5.1 to 5.3 | Sec 5.1 to 5.3 | Met |
| R3 exhaustive non-grounds | Sec 6.1 to 6.11 | Sec 6.1 to 6.11 | Met |
| R4 evidentiary and procedural armour | Sec 11, 12, 15 | Sec 11, 12, 15 | Met |
| R5 score guarantee removed | Sec 9.3, 9.4, 9.7 | Sec 9.3, 9.4, 9.7 | Met |
| R6 corrections recast | Sec 10.1 to 10.9 | Sec 10.1 to 10.9 | Met |
| R7 preservation | throughout | throughout | Met |
| R8 auto-renewal and cancellation | Sec 4.2 to 4.9, 7.4, 8.2, 8.3 | same | Met |
| R9 ticketing only, no support email | Sec 12.6, 17.2, 17.4 | same | Met |
| R10 no renewal notices, mandate fixed | Sec 4.3, 4.11, 13.2 | same | **Met after fix** |

---

## Findings and fixes applied

### FIXED 1 (high, R10): card scheme carve-out hedged the "no renewal notices" rule. Both languages.

R10 is unequivocal: "no renewal notices will be given to anyone... Do not draft a renewal notice obligation, do not add a reminder promise, do not hedge... and do not leave it ambiguous."

Section 4.3 carried a carve-out, and Section 4.11 carried an affirmative promise to send one:

- EN 4.3, before: "does not send renewal reminders or pre-renewal notices, **other than any notice that an applicable card scheme rule requires for the billing interval concerned**, and is under no obligation to send any **other** renewal reminder... Any notice sent because a card scheme rule requires it confers no right and creates no obligation beyond that requirement."
- EN 4.11, before: "Where an applicable card scheme rule requires a notification to be sent before the first Charge following a free or reduced period, **that notification is sent**..."
- AR 4.3, before: «... ولا إشعارات سابقة له، **فيما عدا أي إشعار تستوجبه قاعدة سارية من قواعد شبكات البطاقات في شأن فترة الفوترة المعنية**، وهي غير ملزمة بإرسال أي تذكير **آخر**...»
- AR 4.11, before: «ومتى استوجبت قاعدة سارية من قواعد شبكات البطاقات إرسال إشعار قبل أول عملية خصم تعقب فترة مجانية أو مخفَّضة، **أُرسل ذلك الإشعار**؛...»

This was both a founder-rule breach and an internal inconsistency: six other passages (lines 109, 362, 370, 495, 647, 1212 in each file) state the rule flatly with no carve-out.

**Fix applied.** The carve-out and the promise are deleted in both languages. Section 4.3 now reads flatly, and a non-promissory anti-estoppel sentence was added so that a stray communication cannot be built into a right:

- EN: "Uptal... does not send renewal reminders or pre-renewal notices, and is under no obligation to send any renewal reminder or any advance notice of any renewal or of any price. ... Where any communication is nevertheless sent to you, it is sent voluntarily, confers no right, creates no obligation, establishes no practice or course of dealing, and does not oblige Uptal... to send any further communication."
- AR: «ولا ترسل شركة الخبرات الصاعدة لتقنية المعلومات تذكيرات بالتجديد ولا إشعارات سابقة له، وهي غير ملزمة بإرسال أي تذكير بالتجديد ولا أي إشعار مسبق بأي تجديد أو بأي سعر. ... ومتى أُرسلت إليك أي مراسلة رغم ذلك، فإنها تُرسَل تطوعًا، ولا تمنح أي حق، ولا تنشئ أي التزام، ولا تُنشئ عرفًا ولا مجرى تعامل، ولا تُلزم شركة الخبرات الصاعدة لتقنية المعلومات بإرسال أي مراسلة أخرى.»
- EN 4.11 now: "No notice or reminder is sent before that Charge, or before any other Charge, and Section 4.3 applies."
- AR 4.11 now: «ولا يُرسَل أي إشعار أو تذكير قبل تلك العملية ولا قبل أي عملية خصم أخرى، ويسري القسم 4.3.»

Verified after fix: zero occurrences of a scheme-notice carve-out in either file; all seven no-notice assertions now sit on the same line numbers in both files (109, 262, 362, 370, 495, 647, 1212).

### FIXED 2 (cosmetic, parity): archived block heading levels diverged.

The English archived appendix used `# ARCHIVED ALTERNATIVE BLOCK` then `## 10. No corrections and no payments of any kind`, so a stripped conversion could read it as a live Section 10. The Arabic used the safer `## ملحق أرشيفي` then `### القسم 10 البديل` ("Alternative Section 10"). English demoted to match: `## ARCHIVED ALTERNATIVE BLOCK` / `### Alternative Section 10: ...` / `#### 10.1` and below. Both blocks are explicitly marked not for publication in both languages.

### Nothing else required a fix.

---

## House rules

| Rule | Result |
|---|---|
| No em dashes (U+2014) | 0 in EN, 0 in AR |
| No en dashes (U+2013) | 0 in EN, 0 in AR |
| No other dash characters (U+2012, U+2015, U+2212) | 0 in both |
| No double hyphen used as a dash | 0 in both |
| «الكفاءات» never «المواهب» | «مواهب» in any form: **0**. «الكفاءات»: 19 occurrences. Talent Search is «البحث عن الكفاءات (Uptal Talent Search)» at Sec 7 heading and throughout |
| «سيرتك الذاتية» never shortened | «السيرة الذاتية» 23, «سيرتك الذاتية» 12, bare «سيرتك» without «الذاتية»: **0** |
| Live Arabic product names kept | «التقديم التلقائي (Uptal Auto-Apply)» Sec 8, «تحسين السيرة الذاتية (Uptal CV Enhancer)» Sec 9 |
| English plan names kept inside Arabic | «الرجوع من Executive Pro إلى Professional» (AR 7.4) |
| No promise of a job, interview or offer | No affirmative outcome promise found. Explicit disclaimers: EN 8.5 "It does not guarantee interviews, offers, or employment"; AR 8.5 «وهو لا يضمن مقابلات أو عروض عمل أو توظيفًا». 5 no-guarantee statements EN, 9 AR |
| Prices may change without prior notice | EN 13.2 "may modify the pricing... at any time and from time to time, without prior notice"; AR 13.2 «تعديل أسعار أي منتج... في أي وقت ومن وقت لآخر، دون إشعار مسبق» |
| Merchant identity string intact | EN: "Uptal (شركة الخبرات الصاعدة لتقنية المعلومات)" at line 3 and 210 further occurrences. AR: «شركة الخبرات الصاعدة لتقنية المعلومات» 418 occurrences. Never abbreviated, never altered |
| support@uptal.com absent | **0 occurrences in both files.** No `@uptal.com` address of any kind appears in either file |
| All contact via https://uptal.com/contact-us | 18 occurrences in each file, identical count |
| Jurisdiction Riyadh, KSA | EN 16 "exclusive jurisdiction of the competent courts in Riyadh, Kingdom of Saudi Arabia"; AR 16 «للاختصاص القضائي الحصري للمحاكم المختصة في مدينة الرياض بالمملكة العربية السعودية» |
| Dates correct | EN: "7 September 2026" x11 plus "September 7, 2026" in the last-updated line. AR: «7 سبتمبر 2026» x12. **No other date appears in either file.** Last updated: EN "**This Refund Policy was last updated on September 7, 2026.**" / AR «**آخر تحديث لسياسة الاسترداد هذه في 7 سبتمبر 2026.**» |
| Arabic register formal MSA, legal quality | Confirmed on full read of Sections 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15 to 19 |

---

## R1 to R10, requirement by requirement

### R1. A charge is a delivery

**EN 3.1:** "At the moment a payment is Successfully Charged in respect of any Uptal product, plan, order, Subscription, Billing Period, renewal, resumption, upgrade, downgrade, plan change, seat change, reactivation, add-on, trial conversion, or other paid item... the service to which that Charge relates is, for that Billing Period, delivered in full, performed in full, accepted in full, and irrevocably consumed at that moment; the amount charged is at that same moment earned in full."

**AR 3.1:** «في اللحظة التي تُخصَم فيها بنجاح أي دفعة فيما يتعلق بأي منتج... أو بأي باقة أو طلب أو اشتراك أو فترة فوترة أو تجديد أو استئناف أو ترقية أو رجوع إلى باقة أدنى أو تغيير باقة أو تغيير عدد المقاعد أو إعادة تفعيل أو خدمة إضافية أو تحويل فترة تجريبية إلى اشتراك مدفوع أو أي بند مدفوع آخر، تضع شركة الخبرات الصاعدة لتقنية المعلومات فورًا تحت تصرفك...»

All six sub-elements present and parallel: identical application to first purchase and every renewal (3.1 final paragraph, "No different or more favourable treatment applies to any Charge by reason of its being the first"); renewal as a new purchase (4.1); availability not use as the measure (3.3, "you are paying for the service to be there for you for the period"); deemed acceptance (3.4, «القبول الحكمي»); advance consent for every future renewal (3.8, "You give this request and this consent at the time of your first purchase... and you give it again in respect of each subsequent Charge"). Section 3.9 adds six independent fallback bases.

### R2. No refund in any form

**EN 5.1:** "No refund is issued under this Policy for any Uptal service, on any ground, at any time."
**AR 5.1:** «لا يكون أي مبلغ خُصم بنجاح مقابل أي منتج أو خدمة... قابلًا للاسترداد أو للردّ أو للعكس أو للاستبدال أو للنقل أو للاستيفاء بأي طريقة كانت، ولأي سبب من الأسباب أيًا كان.»
**AR 5 lead:** «لا يُصرَف أي استرداد... ولا يُصرَف أي بديل عنه: لا رصيد، ولا قسيمة، ولا خصم، ولا شهر مجاني، ولا تمديد، ولا مقاصة، ولا تعويض، ولا بادرة حسن نية.»

Section 5.2 enumerates ten bullet classes covering every named alternate remedy in the brief: refund, partial, prorated, repayment, reimbursement, reversal, chargeback, rebate, cashback, price adjustment, price match; credit, account balance, wallet, stored value, points, service credit, store credit, gift card, voucher, coupon, discount; extension, deferral, freezing, restarting; free period, payment holiday, waiver of future fee; free upgrade, add-on, seat, tier; restored or rolled over Allowances; transfer or substitute product; set-off, deduction, withholding, abatement, retention, recoupment, counterclaim, lien; compensation, damages, damages in lieu, indemnity, restitution, unjust enrichment, quantum meruit, price reduction; ex gratia and goodwill gestures. Section 5.3 closes the labelling loophole: "applies according to the substance and effect of what is sought, and not according to the description, label, or characterisation applied to it."

### R3. The exhaustive non-grounds list

**EN 6.1:** "none of the matters set out in this Section constitutes a ground for any refund, credit, reversal, extension, compensation, or other remedy of any kind."
**AR 6.1:** «دون تقييد للأقسام من 5.1 إلى 5.3، وعلى سبيل التمثيل لا الحصر، لا تشكّل أي مسألة من المسائل المبيَّنة في هذا القسم سببًا لأي استرداد أو رصيد أو عكس أو تمديد أو تعويض أو أي وسيلة انتصاف أخرى أيًا كان نوعها.»

Every item on the brief's minimum list is present and traceable: non-use and partial use (6.2); forgetting to cancel and cancelling immediately after a renewal charge and not realising it was recurring (6.3); change of mind and dissatisfaction and subjective quality (6.2); AI errors, wrong matches, unwanted applications submitted, inability to recall a submitted application (6.2); no employer response, no interview, no offer, not hired (6.2); got a job and no longer needs it (8.4 and 6.2); unused allowances, pausing, downgrades and plan changes (6.4); promotional pricing and price increases at renewal (6.8); duplicate accounts and wrong plan (6.4 and 10.3); third party payer and payer disputing on the cardholder's behalf (6.5 and 15.8); suspension or termination by Uptal for breach (6.10 and 5.6); user deleting their own account or losing access (6.6 and 4.17); device, browser, connectivity, VPN, location (6.6); changed personal, professional or financial circumstances (6.6); disruptions, outages, maintenance, degraded performance, Force Majeure (6.7 and 14.2); discontinuation or sunset (6.7 and 14.3); currency conversion, bank fees, intermediary charges (6.8 and 13.4); failure to read the policy (6.9 and Sec 19). Section 6.11 "Anything not listed" is the catch-all.

### R4. Evidentiary and procedural armour

- **Conclusive evidence.** EN 12.2: Records are "conclusive evidence" of the charge, delivery, access granted and work performed, with a fallback to "evidence unless the contrary is proved" where an agreement on conclusive evidence cannot take effect. AR 12.2: «تتفق أنت وشركة الخبرات الصاعدة لتقنية المعلومات، اتفاقًا مكتوبًا على قواعد الإثبات، على أن السجلات هي السجل القاطع لكل عملية خصم، ولتوافر كل خدمة وتزويدها وأدائها، وعلى أنها تشكّل دليلًا قاطعًا...» (4 "conclusive evidence" instances EN, 4 «دليل قاطع» instances AR).
- **Time bar.** 12.7: 30 days from the charge, or from awareness, and in any event 180 days; 10.4 gives the longer window for unauthorised charges. 12.8 preserves statutory limitation periods so the bar survives review. 12.9 governs suspension of the periods.
- **Severability and blue-pencil.** 15.1 «كل حكم من أحكام هذه السياسة، وكل جزء من كل حكم منها، قابل للفصل ومستقل بذاته», with 15.2 order of reading down, 15.3 preservation of the charge equals delivery rule, and 15.4 "No refund entitlement created by severance."
- **No waiver.** 15.5, including no course of dealing, custom, practice, prior conduct or forbearance.
- **Variation only in signed writing by an authorised officer.** 15.6, expressly cross-referenced to 4.6.
- **Anti-precedent.** 5.7 ex gratia payments create "no precedent"; 10.9 no derogation and no precedent; 12.8 voluntary reviews create "no precedent, practice, or course of dealing."
- **Anti-assignment.** 15.7, targeted at claims management companies, aggregators, chargeback recovery services and litigation funders, with a carve-out preserving lawyers, heirs and personal representatives.
- **No third party rights.** 15.9.
- **Chargebacks.** 11.2 filing against a valid charge is "a material breach"; 11.3 lists consequences including suspension, termination, contesting with records, and recovery of the amount plus documented costs and fees as a debt; 11.5 the debt survives; 11.6 costs recovered separately and never deducted. 11.8 preserves the right to go to a court or authority, which is what keeps the section enforceable.

### R5. Score improvement guarantee removed

**EN 9.4:** "No score improvement guarantee, satisfaction guarantee, money back guarantee, or risk free period is offered in respect of Uptal CV Enhancer or any other Uptal product."
**AR 9.4:** «لا تقدّم شركة الخبرات الصاعدة لتقنية المعلومات أي ضمان أو كفالة أو تأكيد أو تعهد بشأن أي درجة أو تقييم أو ترتيب أو مؤشر أو تقدير أو تقويم...»

The remedy is revisions only. **EN 9.3:** "your sole and exclusive remedy... is the provision of revisions"; **AR 9.3:** «المراجعات هي وسيلة الانتصاف الوحيدة والحصرية». A lower delivered score is routed into the revision remedy, not a money remedy, in both 9.3 and 6.2. No live cross-reference to a money remedy survives: the new Section 5.4 is "Re-performance is not a refund", and Sections 5.2 and 8 no longer point at a guarantee.

Section 9.7 handles pre-7-September orders by honouring the superseded version for orders already placed, and is expressly walled off: "This Section confers nothing under this Policy, is not a refund route under this Policy, is not an exception to Section 5.1, and creates no right, entitlement, expectation, precedent, practice, or course of dealing." That is the correct treatment: it is a legacy contractual obligation, not a new refund route.

### R6. Section 10 recast as corrections that are not refunds

**EN 10.1:** "The two cases described in this Section are not refunds and are not exceptions to Section 5. In each of them the Charge in question did not purchase any Uptal product or service, no service was supplied against it, and there is accordingly nothing to refund."
**AR 10.1:** «الحالتان الموصوفتان في هذا القسم ليستا استردادًا وليستا استثناءً من القسم 5. ففي كلٍّ منهما لم تشترِ عملية الخصم المعنية أي منتج أو خدمة... ولم تُورَّد أي خدمة مقابلها، ومن ثمّ لا يوجد ما يُسترَد.»

Drafted as live operative text with confidence, per the settled founder decision. The characterisation is unmistakable and is reinforced from the other side at 5.1: "Section 10 is not an exception to that rule." Strict conditions kept: ticket only (10.4), stated windows of 30 and 180 days, evidence and cooperation (10.5), Uptal's determination final to the maximum extent permitted (10.6), original payment method and Payer of Record only (10.7). 10.3 is a twelve-limb list of what is not within the section. 10.9 blocks derogation and precedent.

The fully stripped alternative is present at the end of both files as a clearly labelled archived option, with the Arabic banner «الحالة: خيار مؤرشف... ليس النص المعمول به، وليس جزءًا من سياسة الاسترداد المنشورة، ولا يجوز نشره» and the English "Status: archived option. This is NOT the live text... and is NOT to be published." The main text is not hedged toward it.

### R7. Preservation

All present: immediate-performance consent (3.8); per-product no-refund sections (7.3, 8.4, 9.2); no guarantee of outcomes (8.5); AI accuracy and finality of submissions (8.6); pricing changes without notice (13.2); VAT and tax invoicing (13.1, 13.8, plus the VAT registration number published per Article 6 of the E-Commerce Law at 17.1); availability disclaimer (14.1); chargebacks (11); governing law and Riyadh jurisdiction (16); policy updates (18); language and interpretation with the Arabic version prevailing (19, «تسود النسخة العربية»); merchant identity string intact throughout.

Note, not a defect: "ZATCA" is not named by acronym, and it is not named in the live policy either. The substance is preserved as "a VAT-compliant tax invoice... in accordance with the tax regulations of the Kingdom of Saudi Arabia" / «فاتورة ضريبية مستوفية لمتطلبات ضريبة القيمة المضافة... وفقًا للأنظمة الضريبية في المملكة العربية السعودية».

### R8. Auto-renewal and cancellation

**1. Recurring subscription, not a one time purchase.** EN 8.2: "Uptal Auto-Apply is a recurring Subscription service and is not a one time purchase." AR 8.2: «التقديم التلقائي... خدمة اشتراك متجدّدة، وليس شراءً لمرة واحدة.»

**2. Monthly automatic charge, as the plain English lead sentence.** The founder's own words open the subsection, before any operative text, in bold, exactly as R8 requires:
EN 8.2 lead: "**In plain terms: the charge will automatically happen each month and the service will be renewed automatically unless cancelled.**"
AR 8.2 lead: «**بعبارة بسيطة: الخصم يتم تلقائيًا كل شهر، والخدمة تتجدّد تلقائيًا ما لم تُلغِها.**»
The safe phrasing for any non-monthly plan is carried in the operative text: "each billing period, monthly unless a different billing period is stated on your plan at checkout" / «عن كل فترة فوترة، شهريًا ما لم تُبيَّن فترة فوترة مختلفة لباقتك عند الدفع». Section 8 also opens with a subsection-level plain lead at line 630 saying the same thing.

**3. Self service only, subscriber's own responsibility, no reminder obligation.** EN 4.3: "Cancellation of a Subscription is performed by the subscriber, personally, using the self-service cancellation function in the subscriber's own Uptal account settings, and that is the only means of cancelling a Subscription. The path is: **Account, then Billing, then Cancel subscription.**" and "The responsibility for cancelling before a Renewal Date rests solely and exclusively with you. Uptal... does not cancel Subscriptions on a subscriber's behalf."
AR 4.3: «يقوم المشترك بإلغاء الاشتراك بنفسه، شخصيًا، باستخدام خاصية الإلغاء الذاتي في إعدادات حسابه... وهذه هي الوسيلة الوحيدة لإلغاء الاشتراك. والمسار هو: **الحساب، ثم الفوترة، ثم إلغاء الاشتراك.**» and «وتقع مسؤولية الإلغاء قبل تاريخ التجديد عليك وحدك دون غيرك.»

**4. Only a completed self service cancellation counts.** Section 4.5 lists eleven things that are not a cancellation, and every item the brief names is there, including the ticket: EN "submitting a Ticket at https://uptal.com/contact-us, of any reason type, including a Ticket that asks for the Subscription to be cancelled, and whatever the Ticket says"; AR «تقديم تذكرة دعم عبر https://uptal.com/contact-us، أيًا كان نوع سببها، بما في ذلك التذكرة التي تطلب إلغاء الاشتراك، وأيًا كان مضمونها». Also covered: contact through any channel, unanswered message, informal or verbal request, uninstalling, deleting the app, abandoning the account, letting a card expire, cancelling or blocking the card with the bank, pausing, dormancy, and filing a chargeback. Closing sentence: EN "A cancellation is effective only when the subscriber completes it, personally... before the Renewal Charge is Initiated." Account closure is correctly carved out as one thing that does cancel (4.17).

**5. No Uptal personnel may cancel.** EN 4.6: "No employee, officer, agent, contractor, representative, reseller, affiliate, automated assistant, or support team member of Uptal... is authorised or permitted to cancel, or to agree to cancel, a Subscription at the request of a subscriber or on a subscriber's behalf... Any statement, assurance, email, message, ticket reply, chat message, or other communication from any such person purporting to have cancelled a Subscription... is unauthorised, is of no effect, does not bind Uptal..., does not constitute or evidence a cancellation, does not stop a Renewal Charge, and does not give rise to any refund, credit, reversal, extension, compensation, or other entitlement of any kind."
AR 4.6: «لا يحق ولا يُسمح لأي موظف أو مسؤول أو وكيل أو متعاقد أو ممثل أو موزّع أو شريك تابع أو مساعد آلي أو عضو في فريق الدعم... أن يلغي اشتراكًا أو أن يوافق على إلغائه بناءً على طلب مشترك أو نيابةً عنه.»
The cross-reference the brief asked for is in both: EN "This Section is to be read together with Section 15.6"; AR «ويُقرأ هذا القسم مع القسم 15.6... ويعزّز كلٌّ منهما الآخر.» 15.6 reciprocates. 4.6 also correctly preserves Uptal's own-motion cessation of charges under 4.9, 4.17, 5.6, 14.3 and 15.11, which are not cancellations made on a subscriber's behalf.

**6. Failing to cancel is not a ground.** EN 4.7 names every variant the brief listed, including "having been told by any person, including any person at Uptal..., that the matter had been handled, that the Subscription had been cancelled, or that no further Charge would be made" and "cancelling immediately after a Renewal Charge." AR 4.7 is a full counterpart.

**7. Cancel anytime, no lock in, access to end of period.** EN 4.8: "You may cancel at any time. There is no minimum term and no lock in... The service remains fully active, and your access continues, until the end of the paid period that has already been charged for, and your access is not cut short by your cancelling. No refund of any kind, whether prorated, apportioned, partial, or full... is issued."
AR 4.8: «يجوز لك الإلغاء في أي وقت. ولا توجد مدة التزام دنيا ولا ارتباط ملزم بفترات فوترة مستقبلية. وتظل الخدمة نشطة بالكامل، ويستمر وصولك، حتى نهاية الفترة المدفوعة التي سبق خصم قيمتها، ولا يُقطع وصولك بسبب إلغائك.»

**Support cancellation route removed.** Confirmed: no email address anywhere, and the cancellation subsections point at no contact channel at all. **Talent Search parity confirmed:** AR 7.4 «يتم الإلغاء من المشترك نفسه، شخصيًا، باستخدام خاصية الإلغاء الذاتي في إعدادات حسابه... وهذا هو السبيل الوحيد للإلغاء (القسم 4.3)», mirroring EN 7.4 and Auto-Apply 8.3. No "save in exceptional cases" clause exists in either product.

### R9. support@uptal.com removed, all contact via the ticketing system

**Zero occurrences of support@uptal.com, or of any @uptal.com address, in either file.** `https://uptal.com/contact-us` appears 18 times in each. Section 9.7 refers to the retired address only obliquely as "the electronic mail address named in that version", without reproducing it.

**1. Notice only by ticket.** EN 12.6: "Any notice, request, claim, objection, or dispute... must be given in writing by a Ticket submitted at https://uptal.com/contact-us, selecting the 'Billing & payments' reason where the matter concerns money. Email to any address, social media messages, messages sent through WhatsApp or any other messaging application, in-product chat, and messages to individual employees... do not constitute notice for the purposes of this Policy and do not start, pause, extend, or satisfy any period or requirement under it."
AR 12.6: «يجب أن يكون مكتوبًا وأن يُقدَّم بتذكرة دعم عبر https://uptal.com/contact-us، مع اختيار سبب التواصل "الفوترة والمدفوعات" متى كانت المسألة متعلقة بمال. ولا يُعدّ إخطارًا لأغراض هذه السياسة أيٌّ مما يلي: البريد الإلكتروني المرسَل إلى أي عنوان، ورسائل وسائل التواصل الاجتماعي، والرسائل المرسَلة عبر واتساب أو أي تطبيق مراسلة آخر...» Telephone is separately excluded.

**2. Ticket record is the evidence of the date of notice.** EN 12.6: "The date on which a Ticket is received by the Uptal ticketing system is the date of notice for all purposes under this Policy, and Uptal's ticket records are conclusive evidence of that date, save in the case of manifest error, to the maximum extent permitted by applicable Saudi law." AR 12.6 is the exact counterpart, with the same fallback to «دليلًا عليه ما لم يثبت العكس». The subscriber also receives a reference and a copy, which is the record on their side.

**3. A ticket is expressly not a cancellation.** Stated in three places in each language: 4.5 first bullet, 12.6 final paragraph ("Submitting a Ticket, of any reason type and whatever the Ticket says, does not cancel a Subscription, does not pause billing, and does not stop a renewal"), and 17.4 ("Cancellation of a Subscription is not available through the ticketing system or through any other channel"). AR 12.6: «ولا يترتب على تقديم تذكرة الدعم، أيًا كان سبب التواصل المختار وأيًا كان مضمون التذكرة، إلغاء أي اشتراك، ولا إيقاف الفوترة، ولا وقف أي تجديد.» 4.5 further provides that Uptal's reply to a cancellation ticket is itself not a cancellation.

**4. Ticket route kept for everything else.** 17.2 lists billing enquiries, revision requests, correction requests under Section 10, the contact-first step under 11.1, and any other notice. Revision requests route there at 9.3; Auto-Apply targeting corrections at 8.8; contact information at 17.

### R10. No renewal notices; the mandate fixes the amount

**Stated affirmatively, and now without any hedge (see FIXED 1).** EN 4.3: "Uptal... does not send renewal reminders or pre-renewal notices, and is under no obligation to send any renewal reminder or any advance notice of any renewal or of any price. No notice or reminder of any kind is a condition of any Charge, and the absence, non-sending, non-delivery, delayed delivery, filtering, blocking, deletion, non-opening, or non-reading of any reminder, notice, receipt, invoice, confirmation, or other communication before a Renewal Charge is not a ground for any refund, correction, dispute, credit, reversal, extension, compensation, or other remedy of any kind, and does not affect the validity or the finality of any Charge or of the authorisation given under Section 4.2."
AR 4.3: «ولا ترسل شركة الخبرات الصاعدة لتقنية المعلومات تذكيرات بالتجديد ولا إشعارات سابقة له، وهي غير ملزمة بإرسال أي تذكير بالتجديد ولا أي إشعار مسبق بأي تجديد أو بأي سعر... ولا يؤثر شيء من ذلك في صحة أي عملية خصم ولا في نهائيتها، ولا في صحة التفويض الممنوح بموجب القسم 4.2 ولا في نهائيته.»
Repeated at 1.10, 4.7, 4.13, 6.3, 8.2 and 18 in both languages, on identical line numbers.

**Limb 1, the mandate fixes the exact amount and interval.** EN 4.2: "The authority you give is an authority to charge a specific stated amount at a specific stated interval. The amount and the interval are displayed to you at checkout, are accepted by you before payment, are recorded in the confirmation of your purchase, are shown in your Uptal account at all times, and are recorded in the Records."
AR 4.2: «والتفويض الذي تمنحه هو تفويض بخصم مبلغ محدَّد ومبيَّن على فترات محدَّدة ومبيَّنة. ويُعرض عليك المبلغ والفترة عند الدفع، وتقبلهما قبل السداد، ويُدوَّنان في تأكيد عملية شرائك...»

**Limb 2, a renewal is charged at the authorised amount and interval.** EN 4.2: "Each Renewal Charge is made in that same authorised amount, at that same authorised interval... Accordingly, the amount of every Renewal Charge is an amount that you have specified and authorised, and is the amount that you should expect to be charged."
AR 4.2: «وتتم كل عملية خصم تجديد بالمبلغ المفوَّض به ذاته وعلى الفترة المفوَّض بها ذاتها... وبناءً عليه، يكون مبلغ كل عملية خصم تجديد مبلغًا حدّدته أنت وفوّضت به، وهو المبلغ الذي ينبغي أن تتوقع خصمه منك.» That last clause is precisely aimed at the second Article 90 limb.

**Limb 3, a price change does not silently inflate an existing mandate, while pricing freedom is kept.** EN 13.2: "Uptal... may modify the pricing of any product, plan, seat, or service at any time and from time to time, without prior notice... A change to the price of a plan applies to the renewals of a Subscription that you already hold only from the point at which the new price has been displayed to you and has been incorporated into a refreshed authorisation given by you. Until a refreshed authorisation is given, each Renewal Charge for that Subscription is made in the amount last authorised by you." The refreshed-authorisation triggers are enumerated (upgrade, downgrade, plan change, change of billing frequency, seat change, reactivation, resumption after a pause, re-entry or replacement of payment details), and an account updater refresh of card credentials is expressly excluded.
AR 13.2: «ولا يسري تغيير سعر الباقة على تجديدات الاشتراك القائم لديك إلا اعتبارًا من اللحظة التي يُعرض فيها عليك السعر الجديد ويُدمَج في تفويض محدَّث صادر منك... أما التحديث التلقائي لبيانات البطاقة أو إعادة إصدارها أو استبدالها... فلا يُعدّ تفويضًا محدَّثًا ولا يغيّر المبلغ الذي فوّضت به.»

Also present at 4.11 in both: the amount and date of the first charge after a free or reduced period are disclosed before payment details are provided, which is what makes the trial conversion an authorised amount rather than an unexpected one.

---

## Operational TODOs for the founder, deliberately not in the policy text

These are unchanged from the brief and remain open. They are load bearing now that the policy has been tightened:

1. The cancel control at Account, then Billing, then Cancel subscription must exist, be discoverable without contacting anyone, and work. The policy names that exact path in both languages, so the product must match it.
2. The Renewal Date and time must be visible in the account at all times. The policy asserts this in 4.3, 4.4, 8.2 and 8.3.
3. Every cancellation event and every cancellation attempt must be timestamped and logged. Section 4.9 gives the subscriber the benefit of a failed cancel control, so the absence of a log becomes Uptal's problem, not the subscriber's.
4. Account recovery and password reset must reliably work. A locked out subscriber now has no other way to stop billing, and 4.5 tells them to use those facilities by name.
5. Support agents must never state in writing that they have cancelled a subscription. Under 4.6 they cannot, and any such statement is expressly void. Brief the team and put it in the macros.
6. Checkout must display and record the exact recurring amount and interval, and retain that record. It is the sole thing standing between Uptal and an 8 week SAMA Article 90 claim on every renewal, now that no notices are sent.
7. support@uptal.com should be retired or auto-replied with a pointer to https://uptal.com/contact-us before this publishes.
8. The ticket form must record and retain a timestamp and a copy of every submission. Those records are now the sole evidence of whether a person contacted Uptal in time, and 12.6 makes them conclusive.
9. Because no renewal notices are sent at all after the fix above, confirm with the payment processor that no card scheme pre-notification obligation is being breached for any billing interval actually sold. Today's cadence is monthly, which is below the usual scheme thresholds, so this is a check rather than an expected problem. If a longer interval is ever introduced, this needs a founder decision before launch, not a drafting change made quietly.
