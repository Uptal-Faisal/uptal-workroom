# Verification: terms_patch_ar.md against the live Arabic Terms and the new Refund Policy

Date of audit: 7 September 2026
Files audited:

- Patch: `/private/tmp/claude-501/-Users-faisal-Desktop-Success-Page/62ad562f-358e-45da-88fc-10c9ca54a6b7/scratchpad/terms_patch_ar.md`
- Live Arabic Terms article: `/private/tmp/claude-501/-Users-faisal-Desktop-Success-Page/62ad562f-358e-45da-88fc-10c9ca54a6b7/scratchpad/live_terms_ar_article.txt`
- New Refund Policy (EN): `/private/tmp/claude-501/-Users-faisal-Desktop-Success-Page/62ad562f-358e-45da-88fc-10c9ca54a6b7/scratchpad/final_en.md`
- New Refund Policy (AR), used to confirm the Arabic numbering the patch cites: `/private/tmp/claude-501/-Users-faisal-Desktop-Success-Page/62ad562f-358e-45da-88fc-10c9ca54a6b7/scratchpad/final_ar.md`

**Verdict: PASS after one fix.** Twelve of twelve CURRENT blocks match the live article verbatim and uniquely. One substantive inconsistency with the new Refund Policy was found and has been fixed in the patch file. One identical defect survives in the English patch and is reported below as an open item outside this file.

---

## 1. Verbatim match of every "النص الحالي" block

Method: every `النص الحالي` block was extracted from the patch programmatically (quote marker stripped, no normalisation of any kind) and tested with an exact substring search against `live_terms_ar_article.txt`, together with an occurrence count to confirm each is unique in the article.

| # | Amendment | Patch line | Exact match | Occurrences in live article |
|---|---|---|---|---|
| 1 | Amendment 1, Section 5 (User accounts) | 45 | PASS | 1 |
| 2 | Amendment 2, Section 6.1 (Fees and billing) | 61 | PASS | 1 |
| 3 | Amendment 3, Section 6.2 (No refunds) | 77 | PASS | 1 |
| 4 | Amendment 4, Section 6.3 (Pricing, VAT and price changes) | 93 | PASS | 1 |
| 5 | Amendment 5, Section 6.5 (Chargebacks) | 109 | PASS | 1 |
| 6 | Amendment 6, Section 7.7 (CV Enhancer deliverables) | 125 | PASS | 1 |
| 7 | Amendment 7 (a), Section 22 (Notices) | 145 | PASS | 1 |
| 8 | Amendment 7 (b), Section 27 (Contact) | 155 | PASS | 1 |
| 9 | Amendment 8, Section 16 (Limitation of liability) | 171 | PASS | 1 |
| 10 | Amendment 9 (a), Section 14, ground (1) | 193 | PASS | 1 |
| 11 | Amendment 9 (b), Section 14, final sentence | 205 | PASS | 1 |
| 12 | Version amendment, closing date line | 221 | PASS | 1 |

**Mismatches: none.** Every block is find-and-replace safe: exact, and unique, so no amendment can strike the wrong passage.

The three quoted passages that carry a space before the closing full stop (Sections 6.1, 7.7 and 27, an artefact of an inline link boundary in the page markup) are reproduced with that space intact, and they matched on that basis. The patch's own note on spacing at line 11 is accurate.

## 2. Coverage of all five support@uptal.com occurrences

The live Arabic article contains exactly five occurrences of the literal address (and exactly five `@` characters in total, so there is no second address hiding anywhere). Each occurrence was located by character offset and tested for containment inside a CURRENT block:

| Offset | Section | Covered by |
|---|---|---|
| 8203 | 5 (User accounts) | Amendment 1 |
| 9427 | 6.1 (Fees and billing) | Amendment 2 |
| 10693 | 6.5 (Chargebacks) | Amendment 5 |
| 37824 | 22 (Notices and electronic communications) | Amendment 7 (a) |
| 40227 | 27 (Contact) | Amendment 7 (b) |

**All five are covered. No sixth occurrence exists, and no occurrence is left unamended.** The patch's numbering note at line 141, which corrects the hardening review's mistaken "Sections 15 and 26" to Sections 22 and 27, is itself correct: Section 15 (disclaimer of warranties) and Section 26 (changes to these Terms) carry no email address.

Post-patch checklist item 2 also holds: the live article currently contains zero occurrences of `https://uptal.com/contact-us`, so after the patch the count will be exactly five, one in each of Sections 5, 6.1, 6.5, 22 and 27.

## 3. The literal address never appears in a REPLACE block

All twelve `يُستبدل بـ` blocks were scanned for the `@` character and for the string `support`. **Zero hits in either test.** The address appears in the patch only at:

- lines 47, 63, 111, 147, 157, which are the five CURRENT blocks, where it is required for the search string to match; and
- line 15 and line 239, which are the patch's own explanatory note and post-patch checklist item, neither of which is text destined for the published article.

That is the intended distribution. Not a defect.

## 4. Consistency with final_en.md, the new Refund Policy

Each amendment was read against the Refund Policy section it implements or cites.

| Amendment | Refund Policy provision relied on | Result |
|---|---|---|
| 1, Section 5 | 12.6 (ticket is the notice channel) | Consistent |
| 2, Section 6.1 | 4.3 (self-service is the only path, exact path wording "Account, then Billing, then Cancel subscription"), 4.5 (a ticket is not a cancellation), 4.6 (no personnel may cancel), 4.9, 4.7 | Consistent, close to verbatim |
| 3, Section 6.2 | 3.1, 3.3, 5.1, 5.2, 10, 4.16, 9.7, 15.11, 1.4 | **One defect, now fixed. See below.** |
| 4, Section 6.3 | 13.2 (price change and the amount authorised, refreshed authorisation, account updater exclusion) | Consistent, close to verbatim |
| 5, Section 6.5 | 11.1 (contact first, five Business Days), 11.3(e) (costs as a debt), 11.3 final paragraph (no chargeback fee passed on), 11.5 (debt survives), 11.1 final paragraph (carve-out for fraud reports, SAMA regulations, complaints), 2.1 (Business Day defined) | Consistent |
| 6, Section 7.7 | 9.3 (revisions are the sole remedy), 9.4 (no score, satisfaction, money back guarantee, no risk free period), 9.7 (pre 7 September 2026 orders) | Consistent |
| 7 (a), Section 22 | 12.6, with the three express carve-outs 12.6 paragraph 4, 9.7 and 15.11 | Consistent, all three carve-outs verified in the Policy |
| 7 (b), Section 27 | 12.6, 17.2 | Consistent |
| 8, Section 16 | 5.9 (twelve month aggregate, single aggregate limit, correction under 10 excluded, restitution of money received without lawful cause excluded), 1.8 (the Policy limit displaces a lower Terms limit) | Consistent, close to verbatim |
| 9 (a), Section 14 ground (1) | 5.6 (reasonable grounds recorded at the time; suspension pending investigation; restoration and extension) | Consistent, and the speculative "or is likely to breach" limb is removed |
| 9 (b), Section 14 | 5.6 (no further charge while suspended, charge for the current period stays earned, extension where suspension lifted), 14.3 (discontinuation mid-period, service or substitute continues) | Consistent |
| Version line | 1.9 (published date identifies the version applicable to a Charge) | Consistent |

### Defect found and fixed

**Amendment 3, Section 6.2, REPLACE block (patch line 83): the description of Refund Policy Section 10.2(a) was narrower than the Policy itself.**

The patch read:

> رسم مكرّر ناتج عن خطأ مُتحقَّق منه في أنظمة الفوترة لدى شركة الخبرات الصاعدة لتقنية المعلومات

which limits the corrected duplicate charge to one caused by a verified error in the company's billing systems. Refund Policy Section 10.2(a) is expressly wider: it corrects a duplicate charge "however the duplication arose, including where it arose from an error in Uptal's billing systems, from a repeated submission at checkout, or from a repeated capture by a payment provider", which the Arabic Policy renders at its own Section 10.2(a) as "أيًا كان سبب التكرار، بما في ذلك نشوؤه عن خطأ في أنظمة الفوترة ... أو عن تكرار الإرسال عند الدفع، أو عن تكرار التحصيل من قِبل مزوّد خدمة الدفع".

Why this mattered: the Terms are the higher ranking document and the Arabic version prevails under Section 23, so publishing a narrower description there would have created a live conflict with the Policy and, worse, would have described the customer's correction right as smaller than it actually is. The narrowing appears to have been inherited from the published sentence being replaced, which reads "(أخطاء الفوترة المُتحقَّق منها والرسوم غير المصرّح بها المؤكَّدة)".

Fixed in place. The clause now reads:

> وهما: رسم مكرّر، أيًا كان سبب التكرار، بما في ذلك نشوؤه عن خطأ في أنظمة الفوترة لدى شركة الخبرات الصاعدة لتقنية المعلومات، أو عن تكرار الإرسال عند الدفع، أو عن تكرار التحصيل من قِبل مزوّد خدمة الدفع، ورسم يثبت، بعد تحقيق شركة الخبرات الصاعدة لتقنية المعلومات، أنه تم دون تفويض من الدافع المسجَّل؛

The replacement wording is lifted from the Arabic Refund Policy's own Section 10.2, so the two documents now use one vocabulary. The second limb was also brought into line with 10.2(b) by restoring "بعد تحقيق شركة الخبرات الصاعدة لتقنية المعلومات", which the Policy makes a condition of the confirmation. All house rules were preserved in the new text: no dashes, no Latin trade name, "القسم" rather than "البند", straight quotation marks, no promise of any outcome.

### Open item outside this file

`terms_patch_en.md` line 57 carries the identical narrowing: "a duplicate charge caused by a verified error in Uptal's billing systems and a charge confirmed to have been made without the authority of the payer of record". It needs the same correction, phrased from final_en.md Section 10.2, or the English and Arabic Terms will diverge on the point in the same release. I did not edit that file, since my scope was the Arabic patch.

## 5. Cross references resolve on the new 19 section Refund Policy numbering

The new Policy has 19 top level sections in both languages (final_en.md and final_ar.md were both enumerated; the Arabic file additionally carries an archival appendix explicitly marked as not for publication). Every Refund Policy section cited by the patch was located in both files:

1.8, 4, 4.16, 5.6, 5.9, 9.3, 9.7, 10, 11, 12.6, 13.2, 14.3, 15.11. All present, all with identical numbering in the Arabic and English Policy, and all substantively on the point for which they are cited.

Terms internal cross references added by the patch: 6.1, 17, 22. All correct against the live article, where Section 17 (التعويض) is the section that defines "أطراف شركة الخبرات الصاعدة لتقنية المعلومات المعوَّضة" and Section 22 is the notices section.

**No reference to the old 13 section numbering appears in any REPLACE block.** The only place the old numbering appears is the side note at patch line 39, which is expressly labelled as referring to the currently published Policy and is excluded from the patch's scope. That note was checked and is factually correct: the currently published Arabic Refund Policy contains the retired address seven times, in Sections 3, 4, 5 (twice, at 5.3 and 5.4), 8, 9 and 11; carries the score improvement guarantee at 5.4; and carries the published renewal price wording at Section 6.

## 6. House rules

| Rule | Result |
|---|---|
| No em dashes, en dashes, or any other dash-like character | PASS. Zero occurrences of U+2014, U+2013, U+2012, U+2015 and U+2212 anywhere in the patch, including prose and checklist. The live article is also clean, so post-patch checklist item 3 will pass. |
| No المواهب | PASS. Zero occurrences of المواهب or any derivative in the patch. The live article is also clean. الكفاءات is used throughout. |
| No promise of a job, an interview, or an offer | PASS. No REPLACE block contains any promissory language. The single keyword hit is the ordinary word مضمونها ("its content") in Amendment 2, which is unrelated. Amendment 6 moves in the opposite direction by adding an express denial of any score, satisfaction, money back or risk free guarantee. |
| Contact only via https://uptal.com/contact-us | PASS. Five URLs across five REPLACE blocks, one each in Amendments 1, 2, 5, 7 (a) and 7 (b). No other URL appears. |
| Merchant name written out in Arabic, no Latin "Uptal" | PASS. Zero occurrences of capitalised "Uptal" in any REPLACE block, and zero in the live article. The lower case "uptal.com" inside the contact URL follows the article's existing convention, which already carries `https://uptal.com` in the Section 2.1 definition of الموقع الإلكتروني. |
| Plan names Professional and Executive Pro left in Latin at Section 4.1 | PASS. No amendment touches Section 4.1. |
| Straight quotation marks in replacement text | PASS. |
| "القسم" rather than "البند" in added cross references | PASS in all twelve REPLACE blocks. |

## 7. Structural claims made by the patch, verified against the live page

- The Arabic and English Terms both run to 27 sections, and the numbering is identical at every point the patch touches (5, 6.1, 6.2, 6.3, 6.5, 7.7, 14, 16, 22, 27). Verified by enumerating both articles. Section titles also match those the patch states.
- Section 23 (اللغة) does provide that the Arabic version prevails to the extent required by applicable law, so the patch's statement that the Arabic patch is the governing one, and must ship in the same release as the English patch, is correct.
- Section 14's grounds are numbered (1) to (4) in Arabic and (i) to (iv) in English, and ground (4) is the discontinuation ground, so the reference to "الفقرة (4) أعلاه" in Amendment 9 (b) is correct.
- The closing line currently reads "آخر تحديث في 30 يوليو 2026." and appears exactly once.

## 8. Residual notes, none of them defects

- Amendment 5 renders Refund Policy 11.1 with "تقديم تذكرة دعم" and "استفسار أو سؤال أو نزاع", where the Arabic Policy at its Section 11.1 uses "رفع تذكرة دعم" and "ملاحظة أو سؤال أو نزاع". The substance, the five Business Day period and the carve-outs are identical. The variance is stylistic, and the patch states as a rule that each replacement is built on the published Terms sentence rather than on the Policy sentence.
- Amendment 5 omits the Policy's one Business Day acknowledgement target from 11.1. That is an omission from the Terms, not a contradiction of the Policy, and the Policy governs billing matters under Section 1.8 in any event.
- Amendment 9 (b)'s carve-out "فيما عدا الحالة المبيَّنة في الجملة التالية" attaches to the lifted-suspension extension only. The discontinuation case that follows two sentences later does not need the carve-out, because continuation or substitution under 14.3 is re-performance and does not extend or repay the charge. The drafting is sound as written.

## 9. Post-patch checklist, re-derived independently

Every item on the patch's own fifteen point checklist was re-derived from the live article and the new Policy rather than taken on trust. All fifteen will pass on application, on these measured figures: `@` goes from 5 to 0; `https://uptal.com/contact-us` goes from 0 to 5; dash characters are 0 before and after; "تحسّن الدرجة" goes from 1 occurrence to exactly 2, both in the required negative or "المُلغى" framing; "مبلغ مئة (100) ريال سعودي" goes from 1 to 0; "أو يُحتمل أن تُخلّ بها" goes from 1 to 0; the closing date line changes to 7 September 2026.
