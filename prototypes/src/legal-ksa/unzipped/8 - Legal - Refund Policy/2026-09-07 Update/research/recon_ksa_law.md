# RECON: Saudi Arabian law and enforceability

Lens: KSA law and enforceability, for a Saudi digital services merchant selling to both consumers and
businesses. Prepared for the Uptal Refund Policy rewrite (BRIEF.md, "charge = delivered, no refunds ever").
Merchant of record: Uptal (شركة الخبرات الصاعدة لتقنية المعلومات), Kingdom of Saudi Arabia.

House rule observed throughout, including in every draft clause below: no em dashes, no en dashes.

---

## 0. HEADLINE FINDINGS (read this if you read nothing else)

1. **The absolute no-refund rule is achievable in KSA, but not by deeming it.** The Saudi E-Commerce Law
   gives the consumer a 7 day rescission right that self-extinguishes the moment the consumer uses the
   service or obtains a benefit from it. That condition is the strongest ground Uptal has. It is factual,
   not contractual. It works only if Uptal actually performs at the instant of charge and can prove it.
   A clause that merely says "deemed delivered" without real performance is exactly the kind of clause a
   Saudi court will amend under Article 96 of the Civil Transactions Law.

2. **Article 96 of the Civil Transactions Law is the single biggest legal risk, and also the biggest
   opportunity.** In an adhesion contract (which every Uptal click-through contract is), a court may
   **amend** an arbitrary term or exempt the customer from it, "and any agreement to the contrary is
   void". You cannot draft around Article 96. But it gives the court an amendment power, not only a
   nullification power. The whole drafting strategy must be to make amendment (read down) the easy
   option and nullification the hard one.

3. **The mandatory pre-contract sentence exists and Uptal is probably not saying it.** Article 7(1)(a) of
   the E-Commerce Implementing Regulations obliges the merchant, before the contract is concluded, to
   state either the customer's rescission right or **the fact that no rescission right applies and why**.
   That exact statement, in Arabic, in the checkout flow, is the cheapest and highest-value compliance
   step in this whole project.

4. **Auto renewal: there is no general Saudi "notify before renewal" statute, but SAMA Article 90 creates
   a refund route that bites precisely on unnotified renewal charges.** Under the SAMA Implementing
   Regulations of the Payments and Payment Services Law, a payer can demand a refund from the payee's
   payment service provider, within 8 weeks of the debit, for an authorised payee-initiated transaction
   where the authorisation did not specify the exact amount and the amount exceeds what the payer could
   reasonably have expected. Article 90(4) closes that route only if information on the transaction was
   given to the payer **at least four weeks before the due date**. Sending a renewal notice 28 days ahead,
   stating the exact amount and date, is the single change that makes renewals as final as first purchases.
   The live policy currently does the opposite: it reserves the right to change price at renewal without
   prior notice, which builds the Article 90 case for the customer.

5. **Four things can never be refused, whatever the policy says:** money received that was never due
   (duplicate charges, unauthorised charges), service that was not supplied at all, service that is
   materially non-conforming, and anything tainted by fraud. These are statutory restitution and
   breach claims under the Civil Transactions Law, not contractual refunds. R6's recast framing is
   therefore not just commercially wise, it is legally correct. The "fully stripped" alternative that
   deletes even the correction of duplicate and unauthorised charges would be unenforceable in KSA and
   would itself read as an arbitrary term that invites a court to reopen the entire policy.

6. **Three clauses in the current live documents would very likely be struck or read down today.** The
   12 month claim bar in Terms Section 16 is void under Article 305 of the Civil Transactions Law. The
   SAR 100 aggregate liability cap is a textbook arbitrary term under Article 96. The blanket "no refund
   for any outage" in Refund Policy Section 7 collides with Article 110(2) of the Civil Transactions Law
   on temporary impossibility in contracts of duration. Details in Section 6 below.

7. **B2B is not outside the E-Commerce Law.** The Law defines "consumer" as "the **person** who deals in
   e-commerce wishing to obtain the products or services provided by the service provider", and defines
   "person" as a natural **or legal** person. An employer buying Talent Search is a consumer for these
   purposes. The policy must not assume B2B sits outside Article 13.

8. **Uptal's advertising is a contractual document by statute.** Article 10 of the E-Commerce Law:
   "the electronic advertisement is one of the contractual documents supplementing contracts and is
   binding on the parties to the contract." Every ad claim across the LinkedIn, Google, Snap, TikTok and
   WhatsApp campaigns is a contract term. A no-refund policy cannot outrun an ad that promised an outcome.

---

## 1. THE SAUDI E-COMMERCE LAW: WITHDRAWAL, EXEMPTIONS, AND THE MANDATORY DISCLOSURE

### 1.1 The instruments

| Instrument | Reference | Source |
|---|---|---|
| E-Commerce Law (نظام التجارة الإلكترونية) | Royal Decree M/126 dated 7/11/1440H (10 July 2019), published 21/11/1440H (24 July 2019) | https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1 |
| Implementing Regulations (اللائحة التنفيذية) | Ministerial approval published in Umm Al-Qura, January 2020, as amended (version of 22 March 2021) | https://mc.gov.sa/ar/Regulations/Pages/Details.aspx?lawId=691e2bec-f987-4856-b2bf-ab4b00c8c9b6 and full text reproduced at https://www.aleqt.com/2020/01/31/article_1755251.html |
| Civil Transactions Law (نظام المعاملات المدنية) | Royal Decree M/191 dated 29/11/1444H (18 June 2023), in force 180 days after publication | https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1 |
| Law of Evidence (نظام الإثبات) | Royal Decree M/43 dated 26/5/1443H (30 December 2021) | https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1 |
| Implementing Regulations of the Payments and Payment Services Law (SAMA) | Issued 24/11/1444H (13 June 2023) | https://rulebook.sama.gov.sa/en/implementing-regulations-payments-and-payment-services-law |

There is still **no standalone Saudi Consumer Protection Law**. A first draft was put out for public
consultation by the Ministry of Commerce from 31 March 2022 to 9 June 2022 and has not been enacted.
Consumer protection for a digital services merchant therefore comes from the E-Commerce Law and its
Regulations, the Civil Transactions Law, the Anti-Commercial Fraud Law, MoC enforcement practice, and
SAMA payment rules.
Sources: https://mc.gov.sa/en/mediacenter/News/Pages/31-03-22-01.aspx and
https://eparticipation.my.gov.sa/en/e-consultations/consultations/legal/legal-consultation-20540/

### 1.2 Article 13 of the Law, verbatim

**Article 13(1) (المادة الثالثة عشرة، الفقرة 1):**

> مع عدم الإخلال بأحكام الضمان الاتفاقية والنظامية، للمستهلك في غير الحالات المنصوص عليها في الفقرة (2) من هذه المادة فسخ العقد خلال الأيام السبعة التالية لتاريخ تسلمه المنتج أو لتاريخ التعاقد على تقديم الخدمة، **ما دام أنه لم يستخدم منتج موفر الخدمة أو لم يستفد من خدمته أو لم يحصل على منفعة من أيّ منهما**، وفي هذه الحالة يتحمل المستهلك التكاليف المترتبة على فسخ العقد إلا إذا اتفق أطراف العقد على غير ذلك.

Working translation: the consumer may rescind within the seven days following receipt of the product or
the date of contracting for the service, **so long as he has not used the service provider's product, has
not benefited from its service, and has not obtained any benefit from either**. The consumer bears the
costs of rescission unless the parties agree otherwise.

**This is the load-bearing sentence for Uptal.** The right is conditional. Use, benefit, or the obtaining
of any benefit destroys it. Note there is no 14 day cooling off period in KSA. Several commercial blogs
say 14 days; they are importing EU law and are wrong.

**Article 13(2), the statutory exclusions, verbatim:**

> لا يحق للمستهلك فسخ العقد بموجب الفقرة (1) من هذه المادة في الحالات الآتية:
> أ- إذا كان محل العقد منتجات مصنعة بناء على طلب المستهلك أو وفقاً لمواصفات حددها، ويستثنى من ذلك المنتجات التي بها عيب أو غير المطابقة للمواصفات المتفق عليها.
> ب- إذا كان محل العقد أشرطة فيديو أو أسطوانات أو أقراصاً مدمجة أو برامج معلوماتية جرى استخدامها.
> ج- إذا كان العقد يتناول شراء صحف أو مجلات أو منشورات أو كتب.
> د- إذا ظهر عيب في المنتج بسبب سوء حيازة المستهلك.
> هـ- إذا كان العقد يتناول تقديم خدمات إيواء أو نقل أو إطعام.
> و- إذا كان العقد يتناول شراء منتجات تحميل البرامج عبر الإنترنت، ويستثنى من ذلك البرامج التي بها عيب يحول دون إتمام التحميل أو غير المطابقة لما اتفق عليه.
> ز- الحالات الأخرى التي تحددها اللائحة وفق ما تستدعيه طبيعة المنتجات أو الخدمات.

**Article 11 of the Implementing Regulations, verbatim (الحالات التي لا يجوز فيها فسخ العقد):**

> مع مراعاة حكم الفقرة (2) من المادة (الثالثة عشرة) من النظام، لا يحق للمستهلك فسخ العقد في الحالات الآتية **ما لم يُتفق على خلاف ذلك**:
> أ. إذا كان محل العقد منتجًا معرضًا للتلف خلال مدة جواز فسخ العقد.
> ب. إذا كان محل العقد منتجًا لا يمكن إعادة بيعه لأسباب صحية.
> ج. إذا كان محل العقد منتجًا يتضمن عدة عناصر تم دمجها ولا يمكن معه إعادتها إلى حالتها الأصلية.
> د. إذا كانت الخدمة محل العقد حجزًا فندقيًا، أو حجز تذاكر سفر، أو تأجير مركبات، أو نقل، أو خدمة تنظيم فعاليات.
> هـ. إذا كان محل العقد منتجًا تم تصميمه وإنتاجه خصيصًا للمستهلك وفقًا لمواصفات طلبها.
> و. إذا انعقد العقد في مزاد علني.
> ز. إذا كان محل العقد منتجًا أو خدمة يمكن أن يتغير سعرها خلال المدة التي يجوز فيها فسخ العقد اعتمادًا على سوق يتسم بالتقلب السعري المستمر بشكل لا يتحكم فيه موفر الخدمة، كالذهب والفضة.

### 1.3 Which exemption actually covers which Uptal product

Be honest about this internally, because the answer drives the drafting.

| Product | Best statutory ground | Strength | Comment |
|---|---|---|---|
| CV Enhancer | Art 13(2)(a) products made to the consumer's specification, read with Reg. Art 11(e) "a product designed and produced specifically for the consumer according to specifications he requested"; plus Art 13(1) benefit obtained | **Strong** | The closest fit in the whole framework. The deliverable is bespoke, produced from the customer's own inputs, and cannot be resold. Lead with this for CV Enhancer. Reg. Art 11(e) uses "منتج" (product) but a bespoke digital deliverable is the paradigm case the drafter had in mind. |
| Auto-Apply | Art 13(1): use and benefit obtained at the moment of charge | **Strong if, and only if, performance is real and logged** | Applications actually submitted in the first minutes is the fact that wins the case. Art 13(2)(f) "products for downloading software over the internet" is a poor fit for a SaaS subscription. Do not lead with it. |
| Talent Search | Art 13(1): use and benefit obtained (access opened, unlock allowance issued, searches run) | **Moderate to strong** | A subscriber who pays and never logs in within 7 days has a genuine Art 13(1) argument that no benefit was obtained. Availability alone is arguable but not certain. See risk in Section 6.3. |

**Do not claim that "digital services performed immediately" is a listed exemption in KSA. It is not.**
Several secondary sources and AI summaries assert this. The verbatim texts above contain no such category.
Anyone drafting from those summaries will build the policy on a category that does not exist.

### 1.4 The exact language a merchant must put in front of the customer, and when

**Article 7(1)(a) of the Implementing Regulations, verbatim:**

> الإشارة إلى حق المستهلك في فسخ العقد وفق الفقرة (1) من المادة (الثالثة عشرة) من النظام متى كان الفسخ جائزًا، والتكاليف التي يتحملها المستهلك حال ممارسته هذا الحق، وما يجب على المستهلك اتخاذه إذا أراد فسخ العقد، **أو الإشارة إلى أنه لا يحق للمستهلك فسخ العقد لتحقق إحدى الحالات الواردة في الفقرة (2) من المادة (الثالثة عشرة) من النظام أو المادة (الحادية عشرة) من اللائحة**.

So the merchant must state, in the pre-contract statement of terms, **either** the rescission right and how
to exercise it, **or** that no rescission right applies because one of the listed cases is met. Uptal's
position is the second limb. **When: in the pre-contract statement, before the contract is concluded.**
Article 7 of the Law requires the statement to be provided before the contract is entered into.

Two further mandatory items in the same article:

- **Article 7(1)(d) and (e):** the statement must include "مدة العقد وتاريخ انقضائه إذا كان لذلك مقتض"
  (the contract term and its expiry date where relevant) and "أحكام الدفع، **والدفعات المتكررة** إن وجدت"
  (payment terms **and recurring payments** if any). This is the statutory hook for auto-renewal disclosure.
- **Article 7(2):** "على موفر الخدمة أن يوضح للمستهلك الإجراء الذي يترتب عليه إبرام العقد، بأن يذكر في الخانة
  المخصصة ما يفيد أنه بمجرد النقر عليها يكون العقد قد أبرم، ويترتب على ذلك الالتزام بالدفع، وذلك بطريقة واضحة
  ويسيرة." The pay button itself must say that clicking it concludes the contract and creates the payment
  obligation. This is the Saudi equivalent of the German "Buy now" button rule.

**Article 8(h)** additionally requires every invoice to carry "موجزًا بأحكام الاستبدال والإرجاع في الأحوال التي
يجوز فيها ذلك" (a summary of the exchange and return provisions where they apply). Uptal's ZATCA invoice
should carry a one-line statement of the no-refund rule.

#### The exact checkout text to use

Arabic (primary, because the Arabic version governs and because MoC requires Arabic support):

> ☐ أطلب صراحةً من Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) البدء في تنفيذ الخدمة فورًا عند تحصيل المبلغ،
> وأقر بأنني أستخدم الخدمة وأحصل على منفعة منها من لحظة التحصيل. وأقر بعلمي بأنه **لا يحق لي فسخ العقد** وفق
> المادة (الثالثة عشرة) من نظام التجارة الإلكترونية ولائحته التنفيذية، وبأن المبلغ المدفوع نهائي وغير قابل
> للاسترداد. وتسري هذه الموافقة على هذه العملية وعلى كل تجديد تلقائي لاحق لها.

English (mirror):

> ☐ I expressly request that Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) begin performing the service
> immediately upon my payment being charged, and I acknowledge that I use the service and obtain the
> benefit of it from the moment of that charge. I acknowledge that **I have no right to rescind** under
> Article 13 of the Saudi E-Commerce Law and its Implementing Regulations, and that the amount paid is
> final and non-refundable. This consent applies to this purchase and to every subsequent automatic
> renewal of it.

Pay button, adjacent line (Article 7(2)):

> بالنقر على "اشترك ودفع" يُبرم العقد ويترتب عليه التزامك بالدفع.
> By clicking "Subscribe and pay" the contract is concluded and you become obliged to pay.

Design notes that matter for enforceability:

- Make the checkbox **unticked by default and mandatory**. A pre-ticked box is worth close to nothing and
  is the kind of thing that turns a term "arbitrary" under Article 96.
- **Log it**: timestamp, IP, the exact version and hash of the text shown, and the language shown. This is
  the evidence you will file, and under Article 57 of the Law of Evidence it is presumptive proof.
- Present it **before** payment, not on the receipt.
- The same text must appear at the top of the Refund Policy itself, not only at checkout.

---

## 2. ABUSIVE OR VOID TERMS, AND WHAT A REGULATOR WOULD STRIKE

### 2.1 The controlling provisions of the Civil Transactions Law

**Article 40:** "القبول في عقود الإذعان يقتصر على مجرد التسليم بشروط مقررة يضعها الموجب ولا يقبل مناقشة فيها."
Every Uptal click-through purchase is an adhesion contract. This is not arguable.

**Article 96 (the key provision):**

> إذا تمَّ العقد بطريق الإذعان وتضمن شروطًا تعسفيةً؛ فللمحكمة أن **تعدلها** أو تعفي الطرف المـُذْعِن منها وفقًا لما
> تقتضيه العدالة. **ويقع باطلًا كل اتفاق على خلاف ذلك.**

If the contract was concluded by adhesion and contains arbitrary terms, the court may **amend** them or
exempt the adhering party from them as justice requires, **and any agreement to the contrary is void**.
Two consequences: you cannot write a waiver of Article 96, and the court's first instinct is amendment,
which is exactly the "read down rather than strike out" outcome the founder wants. Draft to make
amendment attractive.

**Article 104(3):** "يُفسر الشك لمصلحة من يتحمل عبء الالتزام أو الشرط، ويُفسر في عقود الإذعان لمصلحة الطرف
المـُذْعِن." Statutory contra proferentem. Every ambiguity in the no-refund rule is resolved against Uptal.
This is why the exhaustive non-grounds list in R3 is a genuine legal asset, not just belt and braces:
specificity removes the ambiguity that Article 104(3) would otherwise punish.

**Article 95:** contracts must be performed in accordance with their content **and in a manner consistent
with good faith**, and bind the parties not only to what is written but to what the statute, custom and
the nature of the contract require. A no-refund policy operated in bad faith (for example, taking a
renewal payment for a product Uptal has already decided to sunset) will not be saved by the text.

**Article 97:** unforeseeable general exceptional circumstances allow the court to reduce an onerous
obligation to a reasonable limit, and "يقع باطلًا كل اتفاق على خلاف أحكام هذه المادة". Another provision
you cannot contract out of. Keep the force majeure section drafted as a suspension of Uptal's obligations,
not as a denial of the customer's Article 97 route.

**Article 305(1):** "لا يجوز الاتفاق على تقصير مدة عدم سماع الدعوى، ولا على إطالتها." **You may not agree to
shorten or lengthen the limitation period.** Any contractual claim bar is void. See Section 6.1.

**Articles 144, 145 and 148:** unjust enrichment and payment not due. Article 145: "كل من تسلَّم على سبيل
الوفاء ما ليس مستحقًّا له وجب عليه ردُّه" (whoever receives by way of payment what is not due to him must
return it). This is what makes duplicate and unauthorised charges non-negotiable. See Section 4.

### 2.2 Ministry of Commerce practice

- **The Ministry has banned the phrase "البضاعة المباعة لا ترد ولا تستبدل" (goods sold are not returned or
  exchanged) and any similar formulation, in points of sale, and has been fining for it since 1/1/1434H.**
  Official MoC statement: https://mc.gov.sa/ar/mediacenter/News/Pages/news_1833.aspx and
  https://x.com/MCgovSA/status/872904660763512833 ; press coverage:
  https://arabic.cnn.com/business/article/2022/04/15/saudi-trade-exchange-policy
  This is the closest thing KSA has to a published position on absolute no-refund wording. The lesson is
  about **wording and blanketness**, not about the commercial outcome. A no-refund rule that is stated as
  an unconditional slogan reads as the banned formula. The same rule stated as the legal consequence of a
  named statutory condition ("because performance is immediate and the benefit is obtained at the moment
  of charge, no rescission right arises under Article 13") does not.
- **MoC E-Store Guide (الدليل الإرشادي للمتاجر الإلكترونية)**, https://mc.gov.sa/GES/Documents/GES.pdf ,
  item 13 of the 13 mandatory points: "وجود سياسة واضحة ومكتوبة للاستبدال أو الاسترجاع موضحة كافة التفاصيل".
  A clear, written exchange or return policy showing all details is compulsory. A no-refund policy
  satisfies this if it is clear and complete. Silence does not.
- The same Guide requires the provider to apply all terms and the sales policy "دون تضليل، أو بعبارات غير
  واضحة أو مفهومة" and to "إلزام المستهلك بالإقرار على قراءتها قبل إتمام العقد" (require the consumer to
  acknowledge having read them before the contract is completed). That is a second, independent basis for
  the mandatory pre-contract acknowledgment checkbox.
- The Guide also requires a clear and easy account cancellation control ("خانة إلغاء حساب المستهلك بشكل واضح
  وسهل"). Cancellation friction is a regulatory exposure in its own right, entirely separate from refunds.
- **Penalties:** Article 18 of the E-Commerce Law: warning, fine up to SAR 1,000,000, temporary or
  permanent suspension of e-commerce activity, and partial or total blocking of the electronic store.
  Article 17 allows the Minister to block the store in urgent cases pending a committee decision within
  10 days. The MoC has used blocking against e-stores.
  https://saudigazette.com.sa/article/620668

### 2.3 What a regulator or court would actually strike out of an absolute no-refund policy

Ranked by likelihood:

1. **Any clause that denies a remedy where the service was not supplied at all.** Article 107 CTL gives the
   customer performance or rescission plus compensation on non-performance. Non-negotiable.
2. **Any clause that keeps money received without cause.** Articles 144, 145 CTL. Non-negotiable.
3. **"Uptal's determination shall be final."** An ouster of the court's jurisdiction. Reads as contrary to
   public order and as an arbitrary term. Will be read down to "final for the purposes of Uptal's internal
   process, without prejudice to your right to refer the matter to the competent court".
4. **Contractual claim bars and shortened limitation windows.** Void under Article 305 CTL.
5. **A blanket denial of any remedy for outages of any duration.** Article 110(2) CTL.
6. **A liability cap set below the price actually paid.** The SAR 100 cap in Terms Section 16 is below the
   price of an annual Talent Search subscription. Classic arbitrary term.
7. **Conclusive, non-rebuttable evidence clauses.** The Law of Evidence gives Uptal's digital records
   presumptive weight "unless the contrary is proved" (Article 57). A clause that goes further and makes
   them unchallengeable exceeds the statute and invites amendment under Article 96.
8. **Automatic forfeiture of a prepaid annual term on Uptal-initiated termination for breach.** Framed as a
   forfeiture it looks penal; framed as no refund for a period already made available plus a separate
   claim for actual proven damage it is defensible.

---

## 3. AUTO RENEWAL

### 3.1 Is there a Saudi requirement to notify before a subscription renews?

**No general statutory pre-renewal notice requirement exists in KSA.** There is no Saudi equivalent of the
California Automatic Renewal Law or the EU's forthcoming rules. What exists is:

- **E-Commerce Implementing Regulations Article 7(1)(d) and (e):** the contract term, its expiry date, and
  **recurring payments** must be disclosed in the pre-contract statement. This is a disclosure at signup,
  not a reminder before each renewal.
- **MoC E-Store Guide:** clear and easy cancellation must be available.
- Sector regulators impose more. The Communications, Space and Technology Commission imposes contract
  clarity and service summary requirements on telecom subscriptions, and a 5 day final response deadline on
  complaints. Not directly applicable to Uptal, but it is the direction of regulatory travel and it is what
  a Saudi adjudicator will have in mind as "normal practice".
  https://practiceguides.chambers.com/practice-guides/tmt-2026/saudi-arabia

### 3.2 The rule that actually makes an unnotified renewal charge refundable: SAMA Article 90

This is the finding that matters most for the founder's stated objective. Verbatim from the Implementing
Regulations of the Payments and Payment Services Law (SAMA), Part 6, Chapter 3:

> **Article 90**
> (1) Notwithstanding the provisions in Paragraph (1) of Article 91 of the Implementing Regulation, the
> Payer is entitled to a refund from the Payee's Payment Service Provider of the full amount of any
> authorized Payment Transaction initiated by or through the Payee if the following conditions are met:
> (a) The Payment Transaction authorization did not specify the exact amount of the Payment Transaction
> when Consent for the authorization was given; and
> (b) The amount of the Payment Transaction exceeds the amount that is expected to be paid by the Payer,
> taking into account the Payer's previous spending pattern and the conditions of the Framework Contract
> and the circumstances of the case.
> ...
> (4) The payer and the payment service provider may agree in the framework contract that the right to a
> refund does not apply where:
> (a) The Payer has given Consent directly to the Payment Service Provider for the Payment Transaction to
> be executed; and
> (b) **Information on the Payment Transaction was provided in an agreed manner to the Payer for at least
> four weeks before the due date** by the Payment Service Provider or by the Payee.

> **Article 91**
> (1) The Payer must request a refund from the Payee's Payment Service Provider for any Payment Transaction
> Authorized by or through the Payee **within eight weeks from the date on which the Funds were debited**.
> ...
> (3) The Payment Service Provider of the Payee must provide any refund or justification for refusing a
> refund within ten business days...

Source: https://rulebook.sama.gov.sa/en/entiresection/1517 (Implementing Regulations of the Payments and
Payment Services Law, Part 6 https://rulebook.sama.gov.sa/en/part-6-relevant-payment-services )

**What this means in practice for Uptal:**

- If the renewal is charged at **exactly the same amount the customer authorised at signup**, condition
  (1)(a) fails and Article 90 does not apply. Fixed-price renewals are safe.
- If Uptal **raises the price at renewal without prior notice**, which is exactly what live Refund Policy
  Section 6 and live Terms Section 6.3 reserve the right to do, both conditions (1)(a) and (1)(b) are
  arguably met. The customer goes to their bank, gets the money back within 10 business days, and Uptal
  eats the reversal. The Refund Policy is irrelevant to that route: it operates on the payment rail, not
  on the Uptal contract.
- **Article 90(4) is the fix.** Give the payer information on the transaction at least **four weeks (28
  days) before the due date**. Then the refund right is contractually disapplied. Note the drafting detail:
  Article 90(4) is an agreement in the **framework contract between the payer and their own PSP**, which
  Uptal does not control. Uptal's practical protection is therefore twofold: (i) satisfy limb (b) by
  actually notifying 28 days ahead so the bank has no basis to find the charge unexpected; and (ii) make
  the authorisation specify the exact amount so limb (1)(a) never engages.

**Recommendation, stated plainly for the founder:** the way to make renewals as final as first purchases is
not more contractual language. It is a renewal notice sent at least 28 days before each renewal, stating
the exact amount, the exact date, and the cancellation link. That notice **strengthens** the no-refund
position rather than weakening it: it converts every renewal into a specified, expected, pre-notified
charge, which is precisely what Article 90 requires in order not to apply. It also kills the "I did not
know it was recurring" argument under Article 96 and Article 104(3).

### 3.3 Additional payment-rail points on renewals

- **Unauthorised transactions: SAMA Article 89(8).** The payment service user is entitled to a refund from
  their PSP if they notify "without undue delay, and in any event no later than **six months** after the
  debit date". Uptal's 7 day window in Refund Policy Section 8 for unauthorised charges is therefore far
  shorter than the customer's statutory bank route. All a 7 day window achieves is pushing customers
  straight to a chargeback. See recommendation in Section 6.5.
- **SAMA Article 88:** the PSP may make the payer liable up to a maximum of **SAR 150** for losses on
  unauthorised transactions from a lost or stolen instrument, and not at all in the listed cases. Live
  Terms Section 5, which makes the user responsible for **all** activity under the account "whether or not
  authorized by you", sits badly against this.
- **mada Operating Rules update on refunds:** merchants must display clear return and refund policies,
  refunds go only to the original card, no fees may be deducted, and "the timeframe for a Refund ... is
  determined by the Merchant according to its internal policies", subject to applicable commercial laws.
  This is helpful: mada expressly contemplates that the merchant sets the refund window.
  https://rulebook.sama.gov.sa/en/mada-operating-rules-mada-operating-standards-procedures-update-refunds
- **SAMA Regulations for Processing Financial Refunds for Bank Cards** (No. 170780000067, 11 December 2019,
  in force 1 January 2020): credit card refunds settled within three working days at acquirer and issuer;
  mada debit refunds settled immediately. Relevant to the "10 business days" figure in the live policy.
  https://rulebook.sama.gov.sa/en/regulations-processing-financial-refunds-bank-cards

### 3.4 Pending change: the 14 day refund turnaround

The Ministry of Commerce has consulted on an amendment to the E-Commerce Implementing Regulations adding a
new article requiring the service provider to return what the consumer paid **without delay and within 14
days**, calculated from receipt of the returned product or, where no product was sent or the consumer did
not benefit from the service, from the date of the consumer's rescission notice; and to refund using the
same payment method unless the consumer expressly agrees otherwise, with no additional fees to the
consumer. Draft text:
https://istitlaa.ncc.gov.sa/ar/trade/mci/ecommerce/Documents/مشروع%20تعديل%20اللائحة%20التنفيذية%20لنظام%20التجارة%20الإلكترونية.pdf

Uptal's current "typically within ten (10) business days" is within that if the amendment is adopted, but
"ten business days" can exceed 14 calendar days. Change it to "within fourteen (14) days" to be future
proof and to match the direction of the regulation.

---

## 4. WHAT A KSA MERCHANT MUST RETAIN REGARDLESS OF THE POLICY

These five survive any wording. Draft around them, never against them.

**4.1 Money received that was never due.**
Article 145 CTL: "كل من تسلَّم على سبيل الوفاء ما ليس مستحقًّا له وجب عليه ردُّه". Article 144: whoever is
enriched without lawful cause at another's expense must compensate. Article 148: a good-faith recipient
returns what he received; a bad-faith recipient returns it with the fruits. Article 159: the claim is
heard for 3 years from knowledge and in all cases 10 years from the right arising.
A duplicate charge and an unauthorised charge fall here. **They are not refunds for a delivered service.
They are restitution of money that never bought a service.** R6's recast framing is the legally accurate
one, and it lets the policy say, truthfully and without exception, that no refund is ever issued for any
Uptal service.

**4.2 Service not supplied at all.**
Article 107 CTL: in bilateral contracts, if one party does not perform, the other may, after notice
(إعذار), demand performance or rescission, with compensation in either case. Article 114: defence of
non-performance. Article 14 of the E-Commerce Law: if the provider is more than 15 days late in delivery
or performance, the consumer may rescind and recover what was paid plus costs caused by the delay, unless
the delay was caused by force majeure.

**4.3 Materially non-conforming service.**
Article 109 CTL: exchange contracts are concluded on the basis that the subject matter is free from defects
except those custom tolerates; a defect not customarily tolerated is a breach of obligation. Article 13(2)(a)
and (f) of the E-Commerce Law expressly carve defective and non-conforming items back **into** the
rescission right even for bespoke products and software downloads. So the CV Enhancer bespoke-product
exemption does not cover a deliverable that is materially not the service sold.

**4.4 Temporary impossibility in a contract of duration.**
Article 110(2) CTL: where performance becomes partially impossible for a reason outside the debtor's
control, the obligation and its counterpart are extinguished to that extent, and **this applies to temporary
impossibility in contracts of duration (العقود الزمنية)**. A subscription is a contract of duration. A
prolonged outage therefore extinguishes the corresponding part of the fee by operation of law. Live Refund
Policy Section 7 denies any remedy for any outage of any duration. See Section 6.4.

**4.5 Fraud, and unauthorised transactions on the payment rail.**
Liability for fraud cannot be excluded. SAMA Articles 87 to 89 place liability for unauthorised
transactions on the payment service provider and require refund by the end of the following business day,
with the user's notification window running to six months. Uptal cannot switch this off; it can only make
sure the transaction was properly authenticated so the loss lands elsewhere.

**4.6 One more, procedural.** Article 96 CTL itself. The court's power to amend arbitrary terms is
unwaivable by express statutory words. Any clause purporting to exclude it is void.

---

## 5. DRAFTING GUIDANCE: EXACT CLAUSE LANGUAGE

Design principle: **make the no-refund rule the legal consequence of a stated statutory condition, not a
bare assertion.** A bare assertion is arbitrary and gets amended. A consequence gets read down at most.
Second principle: **give the court an easy narrowing route in every clause**, so that Article 96 amendment
is available without touching the core rule.

All text below is dash-free (no em dashes, no en dashes) and ready for the drafters.

### 5.1 Immediate performance consent, in the policy body

> **Your express request for immediate performance.** By completing any purchase, and by permitting any
> renewal to proceed, you expressly request that Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) commence
> performance of the service immediately, before the expiry of any rescission, withdrawal, or cooling off
> period that might otherwise apply. You acknowledge that Uptal acts on that request at the moment your
> payment is charged, that from that moment you use the service, benefit from it, and obtain a benefit
> from it, and that the condition on which any right of rescission under Article 13(1) of the Saudi
> E-Commerce Law depends is accordingly not met. You further acknowledge that you have been informed,
> before concluding this contract and in accordance with Article 7(1)(a) of the Implementing Regulations
> of that Law, that you have no right to rescind. This request and this acknowledgment are given once and
> apply to your initial purchase and to every subsequent renewal, upgrade, downgrade, plan change,
> reactivation, and add-on, without any further request or acknowledgment being required.

### 5.2 The core rule, anchored in fact rather than in a deeming

> **What happens at the moment of charge.** At the moment a payment is successfully charged, Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) immediately places the whole of the service for the relevant
> billing period at your disposal and immediately begins to perform it. Your paid access is opened, the
> entitlements for that period are issued to your account, and, where you are subscribed to Auto-Apply,
> matching and the preparation and submission of applications begin. Performance consists in Uptal making
> the service available to you for the billing period and doing the work the service comprises. It is not
> measured by the extent to which you in fact log in to, use, or consume the service. You accept delivery
> at the moment of charge. Each renewal charge is a new purchase, performed in full in the same way and at
> the same moment, and is treated in every respect as an initial purchase.

Drafting note: the words "immediately places ... at your disposal and immediately begins to perform it" are
a **representation by Uptal about its own conduct**. Make sure it is true, and instrument it, because it is
the fact that carries the case. If Auto-Apply does not in fact submit anything for 48 hours, do not say it
does.

### 5.3 The savings clause, tightened so it cannot be used as a refund gateway

Keep it. Removing it is the single fastest way to lose the whole policy under Article 96. Tighten it:

> **Your rights under mandatory Saudi law.** Nothing in this Policy excludes, restricts, or varies any right
> or remedy conferred on you by a provision of the law of the Kingdom of Saudi Arabia that is mandatory and
> cannot be waived, limited, or varied by agreement, and every provision of this Policy applies only to the
> extent permitted by such law. This Section preserves those rights and no more. It does not create, and
> shall not be read as creating, any entitlement to a refund, credit, or other payment that does not
> independently arise under such a mandatory provision; it does not enlarge any remedy beyond the minimum
> that the mandatory provision itself requires; and it is not a general exception to the rule stated in
> Section 2. Where a mandatory provision requires a remedy but leaves the form of that remedy to be
> determined, Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) will provide the remedy in the form of
> re-performance or correction of the service wherever that form is permitted.

The three tightening moves: it preserves rights, it does not create them; it caps the remedy at the
statutory minimum; and it channels the remedy into re-performance where the law allows a choice.

### 5.4 Severability and blue pencil, written to invite amendment under Article 96

Do **not** write "you waive Article 96" or anything of that shape. It is void by the express words of the
article and it signals bad faith to the tribunal. Write this instead:

> **Severability, and reading down.** If any provision of this Policy, or any part of any provision, is held
> by a competent court or authority to be invalid, unlawful, unenforceable, or, in a contract concluded by
> adhesion, arbitrary, then:
> (a) that provision or part shall first be **read down, narrowed, and applied to the maximum extent that
> is valid and enforceable**, and the parties record that their common intention is that a court exercising
> a power to amend such a provision should amend it to the least extent necessary rather than disapply it;
> (b) only if it cannot be read down so as to be valid and enforceable shall it be treated as deleted;
> (c) any such reading down or deletion applies only to that provision or part, and only in the
> jurisdiction and to the extent required, and does not affect the validity or enforceability of the
> remainder of this Policy, which continues in full force and effect; and
> (d) the parties record that the rule stated in Section 2, that a successfully charged payment is a
> payment for a service that has been placed at your disposal and performed, is a fundamental term which
> the parties intend to survive to the greatest extent permitted, and that any narrowing of any other
> provision shall be the minimum necessary and shall not be taken to narrow that rule.

Paragraph (d) is the important one and it is what makes this a blue-pencil clause rather than a boilerplate
one: it tells the court which term to save when it starts cutting.

### 5.5 Records and evidence, drafted to match the Law of Evidence rather than exceed it

Article 6 of the Law of Evidence: "إذا اتفق الخصوم على قواعد محددة في الإثبات فتُعمِل المحكمة اتفاقَهم؛ ما لم
يخالف النظام العام" and the agreement must be in writing. Article 57: non-official digital evidence is proof
against the parties **unless the contrary is proved**, in cases including evidence issued in accordance with
the Electronic Transactions Law or the E-Commerce Law. Article 58: the party alleging that the digital
evidence is invalid bears the burden of proving it.

So Uptal already has the presumption and already has the burden allocated in its favour. Asking for more
("conclusive", "not open to challenge") gives up a valid clause in exchange for one that gets amended.

> **Records.** You and Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) agree, as an agreement on rules of
> evidence made in writing, that Uptal's electronic records, system logs, transaction records, access logs,
> and activity data constitute the record of each transaction and of the service supplied, and are evidence
> as between you and Uptal of the fact, amount, time, and authorisation of each charge, of the opening of
> access, of the entitlements issued to your account, and of the work performed for you, unless the
> contrary is proved. Digital evidence generated in the course of Uptal's services carries the weight given
> to it by the Law of Evidence, and a party disputing the validity of such evidence bears the burden of
> proving that dispute.

### 5.6 Notification window, rewritten so Article 305 does not void it

Article 305(1) CTL voids any agreement shortening or lengthening the limitation period. A clause that says
"raise it in 7 days or the claim is waived" is void as drafted. Reframe it as a condition of Uptal's own
process, which is enforceable, and say so expressly:

> **Notification window.** Any question, objection, or claim relating to a charge must be raised with Uptal
> (شركة الخبرات الصاعدة لتقنية المعلومات) in writing at support@uptal.com within thirty (30) days of the
> date of the charge, quoting the transaction reference, the amount, and the date. That period is a
> condition of Uptal's internal review and correction process and of Uptal's obligation to investigate
> under Section [X], and it reflects the period for which the relevant transaction records are held in
> active systems. It does not shorten, and does not purport to shorten, any period prescribed by law for
> bringing a claim before a competent court, and any provision of this Policy that would have that effect
> is to be read as if it did not.

Thirty days rather than seven. Seven days is not defensible as a real operational necessity, it looks
punitive, and it is the kind of detail that makes a tribunal decide the whole clause is arbitrary.

### 5.7 The two corrections, framed as non-refunds (R6 recast)

> **Correction of charges that are not payments for services.** The following two cases are not refunds and
> are not exceptions to Section 2. In each of them, the charge in question did not purchase any Uptal
> service and no service was supplied against it, so there is nothing to refund. What Uptal does in these
> cases is to correct a billing event that conveyed no service, and it does so because a person who
> receives a payment that is not due to them is obliged to return it under the law of the Kingdom of Saudi
> Arabia. Nothing in this Section derogates from the rule that no refund is ever issued for any Uptal
> service.
> (a) A duplicate charge caused by a verified error in Uptal's billing systems, where the same service and
> the same period were charged more than once.
> (b) A charge confirmed, following Uptal's investigation, to have been made without the authority of the
> payer of record.
> [strict conditions follow: written notice within the stated window, transaction reference, evidence and
> cooperation, securing of the account in an unauthorised charge case, correction to the original payment
> method only, to the payer of record only, in the original currency, within fourteen (14) days of
> approval.]

Two things to fix while you are in there:

- Do not write "Uptal's determination shall be final". Write "Uptal's determination concludes Uptal's
  internal process, without prejudice to your right to refer the matter to the competent court in Riyadh".
  The first version gets struck, the second version does the same commercial work.
- **Widen the window for the unauthorised-charge case.** Seven days is shorter than the customer's own
  statutory route to their bank (six months under SAMA Article 89(8)). A 7 day window does not stop
  anything; it just guarantees the customer goes to the bank instead of to Uptal, which is the worst
  outcome for Uptal's chargeback ratio. Suggest 30 days for duplicate charges and 180 days for
  unauthorised charges.

**On the "fully stripped" alternative block required by R6:** produce it as instructed, but the KSA
recommendation is unambiguous. **Do not adopt it.** Refusing to return money received without cause is
unenforceable under Articles 144 and 145 of the Civil Transactions Law, it is the clearest possible example
of an arbitrary term under Article 96, and once a tribunal sees it, it will look at the rest of the policy
with a colder eye. The stripped version buys nothing (the customer recovers through their bank anyway) and
costs the credibility of every other clause.

### 5.8 Chargebacks: keep the teeth, remove the penalty framing

A Saudi court will not enforce a clause that punishes a customer for exercising a statutory right. Frame
recovery as conditional on the outcome, not on the act of filing:

> ... where the disputed charge is determined to have been valid, Uptal (شركة الخبرات الصاعدة لتقنية
> المعلومات) may recover from you the amount of the charge together with the reasonable and documented
> costs and fees actually incurred in connection with the dispute, including chargeback fees levied by
> payment providers. Uptal does not levy any charge for the making of a dispute itself.

Also keep the "contact us first" step: it is what mada and the acquirers expect, and it is what evidences
good faith under Article 95 CTL.

### 5.9 Pricing at renewal: the one substantive change to recommend

Live Refund Policy Section 6 and live Terms Section 6.3 both reserve the right to change prices at any time
without prior notice and to charge the then-current price at renewal. Against SAMA Article 90 this is the
weakest point in the whole document. Recommended replacement of the renewal limb only:

> Uptal (شركة الخبرات الصاعدة لتقنية المعلومات) may modify the pricing of any product, plan, or service at
> any time and from time to time, and is under no obligation to honour previously displayed prices. Where a
> price change would affect the amount charged on a renewal, Uptal will notify you of the new amount and of
> the renewal date at least twenty eight (28) days before that renewal, and you may cancel before the
> renewal takes effect. Once notified in this way, the renewal charge is a specified and expected charge,
> and Section 2 applies to it in full.

This preserves "prices may change at any time without prior notice" for new purchases, which is what the
founder actually needs, while removing the Article 90 attack surface on renewals.

---

## 6. WHAT I BELIEVE A SAUDI AUTHORITY WOULD REFUSE TO ENFORCE IN THE CURRENT LIVE DOCUMENTS

### 6.1 Terms Section 16, final paragraph: the 12 month claim bar. VOID.
> "any claim or cause of action ... must be commenced within twelve (12) months after the date on which the
> cause of action first arose, failing which such claim or cause of action is permanently barred and waived."

Article 305(1) of the Civil Transactions Law: it is not permitted to agree to shorten or to lengthen the
period for non-hearing of a claim. This is void, not merely unenforceable, and it is void whether the
customer is a consumer or a business. Delete or reframe as in 5.6.

### 6.2 Terms Section 16, third paragraph: the SAR 100 aggregate liability cap. WOULD BE AMENDED.
A cap of one hundred Saudi Riyals on total liability, in an adhesion contract, for a product whose annual
subscription price exceeds that figure by an order of magnitude, is a textbook arbitrary term under Article
96. Expect a court to amend it, most likely to the amount paid in the preceding 12 months. Since the
policy's own logic is "you paid for a period and you received it", a cap set at the fees paid is both more
defensible and entirely sufficient.

### 6.3 Refund Policy Section 3.1: availability alone as performance for Talent Search. VULNERABLE.
> "it being the availability of the service, and not your actual usage of it, that constitutes performance"

Article 13(1) conditions the rescission right on the consumer not having used, benefited from, or obtained
any benefit from the service. A Talent Search subscriber who pays on day one, never logs in, and writes on
day three has a real argument that no benefit was obtained. The contractual definition of performance does
not settle a statutory question of fact, and Article 104(3) resolves the doubt in the customer's favour.

Mitigation, which is operational rather than textual: at the moment of charge, issue the unlock allowance
to the account, run and store the subscriber's first saved-search results, send the "your access is open,
here are N profiles matching your criteria" email, and log all of it. Then the benefit is real, and the
clause is describing something that happened rather than asserting something that did not.

### 6.4 Refund Policy Section 7: blanket denial of any remedy for any outage. WOULD BE READ DOWN.
> "No such disruption, degradation, suspension, or outage, of whatever duration and howsoever caused, shall
> entitle any subscriber ... to any refund, credit, extension, set-off, or other compensation"

Article 110(2) CTL: partial impossibility extinguishes the obligation and its counterpart to that extent,
and this expressly applies to temporary impossibility in contracts of duration. A multi-week outage on an
annual plan extinguishes the corresponding part of the fee by operation of law. The clause is fine for
short interruptions and maintenance. Add a proportionality qualifier ("of a duration that does not
substantially deprive you of the service for the billing period") so the court has a narrowing route rather
than a reason to disapply the section.

### 6.5 Refund Policy Section 8: the 7 day window and "Uptal's determination shall be final". BOTH PROBLEMATIC.
The 7 day window for unauthorised charges is out of step with SAMA Article 89(8) (six months to notify the
PSP) and simply diverts customers to chargebacks. "Uptal's determination ... shall be final" reads as an
ouster of jurisdiction. Both fixes are in 5.6 and 5.7. Note the existing sentence "The seven-day window
applies to requests made under this Section and does not limit any right you have under mandatory Saudi
law" is good drafting and should be kept in the rewritten version.

### 6.6 Terms Section 5: responsibility for all account activity "whether or not authorized by you". CONFLICTS.
Against SAMA Article 88, which caps the payer's liability for unauthorised transactions from a lost or
stolen payment instrument at SAR 150 and removes it entirely in the listed cases, and against the Refund
Policy's own unauthorised-charge correction. Read down to "all activity that occurs under your account,
other than activity resulting from an unauthorised access that you report promptly".

### 6.7 Refund Policy Section 5.4: the score improvement guarantee. REMOVE, BUT MIND THE TRANSITION.
R5 requires its removal, and from a KSA standpoint removal is unproblematic **prospectively**. Two cautions.
First, Refund Policy Section 12 says updates do not apply retroactively to charges already processed. Keep
that sentence exactly as it is: it is what makes the removal lawful for orders already placed under the
guarantee. Second, if the guarantee has been used in any advertising, Article 10 of the E-Commerce Law
makes that advertisement a binding contractual document; scrub every ad, landing page and email that
references it before the policy goes live.

### 6.8 The whole-policy framing risk: "no refunds no matter what" as a slogan.
The Ministry of Commerce has banned the equivalent retail slogan. Do not lead the page, the hero, or the
table of contents with an unconditional formula. Lead with the reason and let the rule follow from it.
"Because your service starts the moment you pay, payments are final" is the same commercial rule expressed
in a form the regulator has never objected to.

### 6.9 A gap, not an over-reach: B2B.
Nothing in the live policy treats Talent Search subscribers as consumers under the E-Commerce Law, but the
Law's definitions make them so ("الشخص: الشخص ذو الصفة الطبيعية أو الاعتبارية"; "المستهلك: الشخص الذي يتعامل
بالتجارة الإلكترونية..."). Do not draft Talent Search sections on the assumption that Article 13 is
inapplicable. The Article 13(1) benefit argument is the right ground for Talent Search too.

### 6.10 Advertising as contract.
Article 10 of the E-Commerce Law: "يُعد الإعلان الإلكتروني من الوثائق التعاقدية المكملة للعقود وملزمة لأطراف
العقد." Article 11 prohibits false or misleading claims in electronic advertising, and Article 12 lets the
Ministry order removal of a non-compliant advertisement within one day of notice. Every campaign claim is
a contract term that sits alongside this policy. Effort taglines are safer than outcome taglines, and
outcome claims of any kind should be checked against the no-guarantee sections before the policy goes live.

---

## 7. SOURCES

Primary law:
- E-Commerce Law, Royal Decree M/126 dated 7/11/1440H: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/360de590-0286-4fa5-a243-aa9100c31979/1
- Implementing Regulations of the E-Commerce Law (full text): https://mc.gov.sa/ar/Regulations/Pages/Details.aspx?lawId=691e2bec-f987-4856-b2bf-ab4b00c8c9b6 ; text reproduced verbatim at https://www.aleqt.com/2020/01/31/article_1755251.html
- Civil Transactions Law, Royal Decree M/191 dated 29/11/1444H: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/655fdb42-8c96-422b-b8c4-b04f0095c94c/1
- Law of Evidence, Royal Decree M/43 dated 26/5/1443H: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/2716057c-c097-4bad-8e1e-ae1400c678d5/1
- SAMA, Implementing Regulations of the Payments and Payment Services Law, Part 6: https://rulebook.sama.gov.sa/en/part-6-relevant-payment-services and https://rulebook.sama.gov.sa/en/entiresection/1517
- SAMA, Regulations for Processing Financial Refunds for Bank Cards: https://rulebook.sama.gov.sa/en/regulations-processing-financial-refunds-bank-cards
- SAMA, mada Operating Rules update on refunds: https://rulebook.sama.gov.sa/en/mada-operating-rules-mada-operating-standards-procedures-update-refunds
- Anti-Commercial Fraud Law: https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/85eb2897-bec6-4c0c-b1d7-ac7c008ec09c/1

Regulator practice and consultations:
- MoC E-Store Guide (الدليل الإرشادي للمتاجر الإلكترونية): https://mc.gov.sa/GES/Documents/GES.pdf
- MoC ban on "البضاعة المباعة لا ترد ولا تستبدل": https://mc.gov.sa/ar/mediacenter/News/Pages/news_1833.aspx and https://x.com/MCgovSA/status/872904660763512833 ; coverage https://arabic.cnn.com/business/article/2022/04/15/saudi-trade-exchange-policy
- MoC Guide to Consumer Rights and Responsibilities (2023): https://mc.gov.sa/en/guides/Documents/CustomerGuide.pdf
- Draft amendment to the E-Commerce Implementing Regulations (14 day refund turnaround): https://istitlaa.ncc.gov.sa/ar/trade/mci/ecommerce/Documents/مشروع%20تعديل%20اللائحة%20التنفيذية%20لنظام%20التجارة%20الإلكترونية.pdf
- Draft Consumer Protection Law consultation (still not enacted): https://mc.gov.sa/en/mediacenter/News/Pages/31-03-22-01.aspx and https://eparticipation.my.gov.sa/en/e-consultations/consultations/legal/legal-consultation-20540/
- MoC enforcement example, blocking of e-stores: https://saudigazette.com.sa/article/620668

Commentary consulted (secondary, used only for orientation):
- Chambers TMT 2026, Saudi Arabia: https://practiceguides.chambers.com/practice-guides/tmt-2026/saudi-arabia
- Clyde & Co on the Civil Transactions Law: https://www.clydeco.com/en/insights/2023/07/ksa-civil-transactions-law-part-2
- IBA on the Civil Transactions Law: https://www.ibanet.org/saudi-civil-transactions-law
- Baker McKenzie / Global Compliance News on the E-Commerce Regulations: https://www.globalcompliancenews.com/2020/03/16/saudi-arabia-regulates-e-commerce/
- Saudipedia on the E-Commerce Law: https://saudipedia.com/en/e-commerce-law-in-saudi-arabia

Caution on secondary sources: several widely circulated summaries state that KSA has a 14 day cooling off
period and that "immediately performed digital services" is a listed exemption. Both are wrong. The period
is 7 days and no such exemption category exists. Work from the verbatim Arabic quoted in Sections 1.2 and
1.4 above.
