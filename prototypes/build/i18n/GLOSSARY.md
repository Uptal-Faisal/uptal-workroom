# Glossary + style (shared by every translator / tokenizer)

## Voices
- **Gulf Arabic (`gulf`)** = v5's Arabic. Keep it; only tokenize + add gender tokens. Used for GCC markets.
- **Neutral Arabic (`neutral`)** = "white" Arabic, closer to formal (light MSA), what pan-Arab apps use. Used for
  Egypt, Levant, Iraq, North Africa and Arabic speakers in Western markets. Same meaning and warmth as v5, no
  dialect. Typical swaps: وش→ما، أبي/تبي→أريد/تريد، عشان→لكي/حتى، خلّ/خلّها→اجعل/دع، ورّني→اعرض لي، شوف→اطّلع على،
  إيه→نعم، روح→انتقل، عبّي رصيدك→اشحن رصيدك، صرت معنا→أهلاً بك معنا، انحذفت→تم الحذف، انرسل→تم الإرسال،
  كمّل→تابع، مطفّي→متوقف، يجي→يأتي، ياخذ→يستغرق، ليش→لماذا، بدري→مبكراً، الحين→الآن، مرة (very)→جداً،
  زين→جيد، وايد→كثيراً، حق (for)→لـ، اللي→الذي/التي، هذي→هذه، ما يحتاج→لا داعي.
  Address the user in the 2nd person; prefer forms that work for both genders when natural (e.g. "يمكنك",
  nouns/masdar: "ابدأ" → "ابدأ" vs gendered → use {@g:..}).
- **French (`fr`)** = France French, vouvoiement, warm and direct like the English. Typographic rules: space
  before : ; ? ! (use the normal space; narrow no-break not required), « guillemets » for quoted labels,
  numbers in text as 1 240 (space thousands), times 09:12 → 09 h 12 only in prose, otherwise keep. Keep
  sentences short. Avoid anglicisms when a common French word exists, but keep product names.

## Gender
Personas are women and men. Use `{@g:male|female}` (male form first) for any word whose form depends on the
persona's gender — the user being addressed (Arabic 2nd-person verbs, imperatives, adjectives; French
adjectives and past participles agreeing with "vous" = the user) or the persona in the 3rd person (he/she,
his/her, Arabic 3rd-person verbs). Examples:
- AR: `{@g:ابدأ|ابدئي} باقتك`, `{@g:جاهز|جاهزة}`, `{@g:تقدر|تقدرين}`, `{@g:أنتَ|أنتِ}`
- FR: `Vous êtes {@g:prêt|prête}`, `{@g:Inscrit|Inscrite} depuis 2026`, `{@g:Analyste financier|Analyste financière}`
- EN: `{@g:He|She} has 8 years`, `{@g:his|her} CV`
Do not gender things that are not about the user/persona. Keep v5's form as one alternative.

## Product terms
| EN | Gulf AR (v5) | Neutral AR | FR |
|---|---|---|---|
| Auto-Apply (product) | التقديم التلقائي | التقديم التلقائي | Auto-Apply (descriptive: candidature automatique) |
| Musaed (assistant name) | مساعد | مساعد | Musaed |
| Uptal, Uptal Learn, Uptal Academy | Uptal | Uptal | Uptal |
| Home | الرئيسية | الرئيسية | Accueil |
| Pipeline | المسار | المسار | Suivi |
| Mail | البريد | البريد | Messagerie |
| Analytics | التحليلات | التحليلات | Analyses |
| Advisors | مستشارون | المستشارون | Conseillers |
| You (tab) | حسابي | حسابي | Profil |
| plan (subscription) | باقة | باقة | formule |
| Dream Job mode | وضع وظيفة الأحلام | وضع وظيفة الأحلام | mode Job de rêve |
| CV Tailoring | تخصيص السيرة | تخصيص السيرة الذاتية | Personnalisation du CV |
| Practice Interview | مقابلة تجريبية | مقابلة تجريبية | Entretien d'entraînement |
| Interview prep | التحضير للمقابلة | التحضير للمقابلة | Préparation à l'entretien |
| Negotiation | التفاوض | التفاوض | Négociation |
| Top up | عبّي رصيد | إضافة رصيد | Recharger |
| pace | الوتيرة | الوتيرة | rythme |
| swipe | اسحب | اسحب | swiper / balayer |
| match (%) | تطابق | تطابق | correspondance |
| matches (jobs) | وظائفك المناسبة | الوظائف المناسبة لك | vos offres compatibles |
| Lite | لايت | لايت | Lite |
| Weekly report | تقريرك الأسبوعي | تقريرك الأسبوعي | Rapport hebdomadaire |
| salary floor | الحد الأدنى للراتب | الحد الأدنى للراتب | salaire plancher |
| notice period | فترة الإشعار | فترة الإشعار | préavis |
| employer types | أنواع جهات العمل | أنواع جهات العمل | types d'employeurs |
| do-not-apply list | قائمة الاستبعاد | قائمة الاستبعاد | liste d'exclusion |
| Applied / Viewed / Screening / Interview / Offer / Rejected | تم التقديم / شوهد / الفرز / مقابلة / عرض / مرفوض | تم التقديم / تمت المشاهدة / الفرز / مقابلة / عرض / مرفوض | Envoyée / Vue / Présélection / Entretien / Offre / Refusée |
| Lens (designer note chips) | العدسة | العدسة | Lens |
| CV | السيرة الذاتية | السيرة الذاتية | CV |
| recruiter | المسؤول عن التوظيف | مسؤول التوظيف | recruteur |
| employer | جهة العمل | جهة العمل | employeur |
| subscription | الاشتراك | الاشتراك | abonnement |
| renews | يتجدد | يتجدد | se renouvelle |
| Cancel anytime | ألغِ في أي وقت | يمكنك الإلغاء في أي وقت | Résiliable à tout moment |
| VAT included | شامل ضريبة القيمة المضافة | (tokenize: {@tax.label}) | (tokenize) |

Behavioural-science lens names (Goal-Gradient, Peak-End, Smart Defaults, Loss Aversion, Endowment,
Reciprocity...) keep their English names in every language (they are designer annotations).
