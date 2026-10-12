#!/usr/bin/env python3
"""Merge the v6 onboarding keys (prefix ob6) into build/i18n/newkeys-{en,gulf,neutral,fr}.json.
Each entry: key: (en, gulf Arabic, neutral Arabic, French). {x} = filled by 50-onboarding.js from MKT/packs; {@...} = engine tokens.
Other modules' keys in those files are kept untouched."""
import json, os, sys, fcntl

I18N = '/home/user/uptal-workroom/prototypes/build/i18n'

K = {
 # ---------------- welcome
 'ob6Wr2': ('We found you {n} roles', 'لقينا لك {n} وظيفة', 'وجدنا لك {n} وظيفة', 'Nous avons trouvé {n} postes pour vous'),
 'ob6Wr2s': ('across {list}', '{list}', '{list}', '{list}'),
 'ob6Wr3': ('2 quick things left', 'باقي شيئين سريعين', 'بقي أمران سريعان', 'Plus que 2 petites choses'),
 'ob6Wr3s': ('where you want to work and your roles', '{@g:وين تبي تشتغل|وين تبين تشتغلين}، ووظائفك', '{@g:أين تريد أن تعمل|أين تريدين أن تعملي}، والوظائف التي تستهدفها',
             'où vous voulez travailler et vos postes'),
 'ob6And': (' and ', ' و', ' و', ' et '),
 'ob6Or': (' or ', ' أو ', ' أو ', ' ou '),

 # ---------------- step labels
 'ob6StepKN': ('Step {k} of {n}', 'الخطوة {k} من {n}', 'الخطوة {k} من {n}', 'Étape {k} sur {n}'),
 'ob6SetupKN': ('Setup · Step {k} of {n}', 'الإعداد · الخطوة {k} من {n}', 'الإعداد · الخطوة {k} من {n}', 'Configuration · Étape {k} sur {n}'),
 'ob6Continue': ('Continue', 'أكمل', 'متابعة', 'Continuer'),
 'ob6Done': ('Done', 'تم', 'تم', 'Terminé'),

 # ---------------- where
 'ob6LensWhere': ('Before the price we ask only where and which roles, because those two decide the count on the paywall. Where you live is detected and the countries come from the CV, so most people only confirm. Where you live also sets the price, currency and ways to pay.',
                  'قبل السعر نسأل بس عن المكان والوظائف، لأنهم اللي يحددون عدد الوظائف في شاشة الاشتراك. مكان إقامتك نعرفه تلقائياً والدول من السيرة، فأغلب الناس يأكّدون بس. ومكان الإقامة يحدد السعر والعملة وطرق الدفع.',
                  'قبل عرض السعر نسأل فقط عن المكان والوظائف، لأنهما يحددان عدد الوظائف في شاشة الاشتراك. نكتشف مكان الإقامة تلقائياً ونأخذ الدول من السيرة الذاتية، فيكتفي أغلب الناس بالتأكيد. ومكان الإقامة يحدد السعر والعملة وطرق الدفع.',
                  "Avant le prix, nous ne demandons que le lieu et les postes, car ce sont eux qui fixent le nombre d'offres sur l'écran d'abonnement. Le lieu de résidence est détecté et les pays viennent du CV : la plupart des gens n'ont qu'à confirmer. Le lieu de résidence fixe aussi le prix, la devise et les moyens de paiement."),
 'ob6WhH': ('Where do you want to work?', '{@g:وين تبي تشتغل؟|وين تبين تشتغلين؟}', '{@g:أين تريد أن تعمل؟|أين تريدين أن تعملي؟}', 'Où voulez-vous travailler ?'),
 'ob6WhSub': ('We start from your CV and where you are. Add any country you would move to.',
              'بدأنا من سيرتك ومكانك. {@g:ضيف أي دولة ممكن تنتقل لها|ضيفي أي دولة ممكن تنتقلين لها}.',
              'بدأنا من سيرتك الذاتية ومكان إقامتك. {@g:أضف|أضيفي} أي دولة يمكنك الانتقال إليها.',
              'Nous partons de votre CV et de votre lieu de résidence. Ajoutez tout pays où vous pourriez vous installer.'),
 'ob6WhBasedT': ('Where you live', 'مكان إقامتك', 'مكان إقامتك', 'Votre lieu de résidence'),
 'ob6WhDet': ('Detected from your connection and CV', 'عرفناه من اتصالك وسيرتك', 'حددناه من اتصالك وسيرتك الذاتية', 'Détecté via votre connexion et votre CV'),
 'ob6WhSet': ('Set by you', '{@g:اخترته أنت|اخترتيه أنتِ}', '{@g:حددته أنت|حددتِه أنتِ}', 'Choisi par vous'),
 'ob6Change': ('Change', '{@g:غيّر|غيّري}', 'تغيير', 'Modifier'),
 'ob6WhBasedNote': ('Your price, currency and ways to pay follow where you live.', 'السعر والعملة وطرق الدفع تتبع مكان إقامتك.',
                    'يتحدد السعر والعملة وطرق الدفع حسب مكان إقامتك.', 'Le prix, la devise et les moyens de paiement dépendent de votre lieu de résidence.'),
 'ob6WhCtryT': ('Countries', 'الدول', 'الدول', 'Pays'),
 'ob6Here': ("You're here", '{@g:أنت هنا|أنتِ هنا}', '{@g:أنت هنا|أنتِ هنا}', 'Vous y êtes'),
 'ob6AddCtry': ('Add a country', '{@g:ضيف دولة|ضيفي دولة}', 'إضافة دولة', 'Ajouter un pays'),
 'ob6AnyIn': ('Anywhere {in}', 'في أي مكان {in}', 'في أي مكان {in}', 'Partout {in}'),
 'ob6AnyHint': ('Every city {in} is included. Turn this off to pick specific cities.',
                'كل المدن {in} مشمولة. {@g:وقّفه عشان تختار|وقّفيه عشان تختارين} مدن معيّنة.',
                'جميع المدن {in} مشمولة. {@g:أوقفه|أوقفيه} لاختيار مدن محددة.',
                'Toutes les villes sont incluses. Désactivez pour choisir des villes précises.'),
 'ob6CityPick': ('Pick at least one city, or switch on Anywhere.', '{@g:اختر|اختاري} مدينة وحدة على الأقل، أو {@g:شغّل|شغّلي} «في أي مكان».',
                 '{@g:اختر|اختاري} مدينة واحدة على الأقل، أو {@g:فعّل|فعّلي} «في أي مكان».', 'Choisissez au moins une ville, ou activez « Partout ».'),
 'ob6Remote': ('Remote roles too', 'وظائف عن بعد كمان', 'الوظائف عن بعد أيضاً', 'Postes en télétravail aussi'),
 'ob6RemoteS': ('From {city}, for employers that hire remotely', 'من {city}، مع جهات توظّف عن بعد', 'من {city}، لدى جهات عمل توظّف عن بعد',
                'Depuis {city}, chez des employeurs qui recrutent à distance'),
 'ob6Meta1': ('1 country selected', 'دولة وحدة مختارة', 'دولة واحدة مختارة', '1 pays sélectionné'),
 'ob6MetaN': ('{n} countries selected', '{n} دول مختارة', '{n} دول مختارة', '{n} pays sélectionnés'),
 'ob6Meta1R': ('1 country + remote selected', 'دولة وحدة + عن بعد', 'دولة واحدة + عن بعد', '1 pays + télétravail'),
 'ob6MetaNR': ('{n} countries + remote selected', '{n} دول + عن بعد', '{n} دول + عن بعد', '{n} pays + télétravail'),
 'ob6Meta0R': ('Remote only', 'عن بعد بس', 'عن بعد فقط', 'Télétravail uniquement'),
 'ob6Meta0': ('Pick at least one country, or remote roles', '{@g:اختر|اختاري} دولة وحدة على الأقل، أو الوظائف عن بعد',
              '{@g:اختر|اختاري} دولة واحدة على الأقل، أو الوظائف عن بعد', 'Choisissez au moins un pays, ou le télétravail'),
 'ob6ResH': ('Where do you live?', '{@g:وين تسكن؟|وين تسكنين؟}', '{@g:أين تقيم؟|أين تقيمين؟}', 'Où habitez-vous ?'),
 'ob6ResSub': ('This sets your price, currency and ways to pay. The jobs follow the countries you pick.',
               'هذا يحدد السعر والعملة وطرق الدفع. والوظائف تتبع الدول اللي {@g:تختارها|تختارينها}.',
               'يحدد هذا السعر والعملة وطرق الدفع. أما الوظائف فتتبع الدول التي {@g:تختارها|تختارينها}.',
               'Cela fixe le prix, la devise et les moyens de paiement. Les offres suivent les pays que vous choisissez.'),
 'ob6ResElse': ('Somewhere else', 'مكان ثاني', 'مكان آخر', 'Ailleurs'),
 'ob6ResElseS': ('International plan, billed in {cur}', 'باقة دولية بعملة {cur}', 'باقة دولية بعملة {cur}', 'Formule internationale, facturée en {cur}'),
 'ob6AddSub': ('Pick a region, then the countries you would work in.', '{@g:اختر|اختاري} منطقة، وبعدها الدول اللي ممكن {@g:تشتغل|تشتغلين} فيها.',
               '{@g:اختر|اختاري} منطقة، ثم الدول التي يمكنك العمل فيها.', 'Choisissez une région, puis les pays où vous pourriez travailler.'),
 'ob6AllIn': ('Select all', 'اختر الكل', 'تحديد الكل', 'Tout sélectionner'),
 'ob6Clear': ('Clear', 'امسح', 'إلغاء التحديد', 'Effacer'),
 'ob6NSel': ('{n} selected', '{n} مختارة', '{n} مختارة', '{n} sélectionné(s)'),
 'ob6TRes': ('Prices now in {cur}', 'الأسعار الحين بعملة {cur}', 'الأسعار الآن بعملة {cur}', 'Prix désormais en {cur}'),
 'ob6TMin': ('Keep at least one country, or remote roles.', '{@g:خلّ|خلّي} دولة وحدة على الأقل، أو الوظائف عن بعد.',
             '{@g:أبقِ|أبقي} دولة واحدة على الأقل، أو الوظائف عن بعد.', 'Gardez au moins un pays, ou le télétravail.'),

 # ---------------- targets
 'ob6LensTargets': ('Roles are the only other thing that changes the count, so they stay before the paywall. Cities moved to the previous step; employer types and Auto-Apply mode come after payment, where they no longer slow the way to the matches.',
                    'الوظائف هي الشي الثاني الوحيد اللي يغيّر العدد، عشان كذا تبقى قبل شاشة الاشتراك. المدن انتقلت للخطوة اللي قبل، وأنواع جهات العمل ووضعية التقديم التلقائي صارت بعد الدفع، فما تأخّر الوصول للوظائف.',
                    'الوظائف هي العامل الآخر الوحيد الذي يغيّر العدد، لذلك تبقى قبل شاشة الاشتراك. انتقلت المدن إلى الخطوة السابقة، وأصبحت أنواع جهات العمل ووضع التقديم التلقائي بعد الدفع، فلا تؤخّر الوصول إلى الوظائف.',
                    "Les postes sont la seule autre chose qui change le nombre d'offres : ils restent donc avant l'écran d'abonnement. Les villes sont passées à l'étape précédente ; les types d'employeurs et le mode Auto-Apply viennent après le paiement, sans ralentir l'accès aux offres."),
 'ob6TgCta': ('See my matches', 'ورّني وظائفي', 'اعرض الوظائف المناسبة لي', 'Voir mes offres compatibles'),

 # ---------------- wall
 'ob6WlH': ('We found {n} roles that fit you.', 'لقينا لك {n} وظيفة تناسبك.', 'وجدنا لك {n} وظيفة تناسبك.', 'Nous avons trouvé {n} offres qui vous correspondent.'),
 'ob6WlSub': ('Read against your CV from {m} live postings in your cities. Start your plan to see them and let the applying begin.',
              'قرأناها على سيرتك من {m} إعلان مباشر في مدنك. {@g:ابدأ باقتك لتراها|ابدئي باقتك لتريها} ويبدأ التقديم.',
              'قارنّاها بسيرتك الذاتية من بين {m} إعلاناً مباشراً في مدنك. {@g:ابدأ|ابدئي} باقتك للاطّلاع عليها وبدء التقديم.',
              'Comparées à votre CV parmi {m} annonces en ligne dans vos villes. Démarrez votre formule pour les voir et lancer les candidatures.'),
 'ob6WlMore': ('and {n} more waiting for you', 'و {n} غيرها تنتظرك', 'و{n} غيرها بانتظارك', 'et {n} autres vous attendent'),
 'ob6WlSplit': ('Or split it into {k} payments of {amt} with {prov} at checkout, no interest.',
                'أو قسّمها على {k} دفعات بـ {amt} مع {prov} عند الدفع، بدون فوائد.',
                'أو قسّطها على {k} دفعات بقيمة {amt} مع {prov} عند الدفع، بدون فوائد.',
                'Ou réglez en {k} fois ({amt} par échéance) avec {prov} au paiement, sans intérêts.'),

 # ---------------- checkout
 'ob6PmCard': ('Card', 'بطاقة', 'بطاقة', 'Carte'),
 'ob6PayInN': ('Pay in {n}', 'قسّمها على {n}', 'قسّطها على {n}', 'Payez en {n} fois'),
 'ob6CkRedirT': ('Pay with {b}', 'ادفع عن طريق {b}', 'الدفع عبر {b}', 'Payer avec {b}'),
 'ob6CkRedirS': ('You finish in {b}. Your plan starts the moment {b} confirms.', 'تكمّل الدفع في {b}، وباقتك تبدأ أول ما يأكّد {b}.',
                 'تُكمل الدفع عبر {b}، وتبدأ باقتك فور تأكيد {b}.', 'Vous finalisez sur {b}. Votre formule démarre dès que {b} confirme.'),
 'ob6CkCont': ('Continue with {b}', 'أكمل مع {b}', 'المتابعة مع {b}', 'Continuer avec {b}'),
 'ob6CkTodayV': ('{amt} today', '{amt} اليوم', '{amt} اليوم', "{amt} aujourd'hui"),
 'ob6CkBnplT': ('Pay in {n} with {b}', 'قسّمها على {n} مع {b}', 'قسّطها على {n} دفعات مع {b}', 'Payez en {n} fois avec {b}'),
 'ob6CkBnplS': ('No interest, no fees. Total {tot}, the same as paying in full.', 'بدون فوائد ولا رسوم. الإجمالي {tot}، نفس المبلغ لو دفعت كامل.',
                'بلا فوائد ولا رسوم. الإجمالي {tot}، وهو نفس مبلغ الدفع الكامل.', 'Sans intérêts ni frais. Total {tot}, comme en un seul paiement.'),
 'ob6CkThen': ('Then {k} payments of {amt}, one a month, 0% interest', 'وبعدها {k} دفعات بـ {amt}، وحدة كل شهر، بدون فوائد',
               'ثم {k} دفعات بقيمة {amt}، دفعة كل شهر، بدون فوائد', 'Puis {k} échéances de {amt}, une par mois, sans intérêts'),
 'ob6CkNextB': ('Next renewal {d} · {tot}. Before it, {b} asks you to approve a new {n}-payment plan; nothing is charged until you do.',
                'التجديد القادم {d} · {tot}. قبله يطلب منك {b} الموافقة على خطة {n} دفعات جديدة، ولا يُخصم شيء إلا بعد موافقتك.',
                'التجديد القادم {d} · {tot}. قبله يطلب منك {b} الموافقة على خطة جديدة من {n} دفعات، ولا يُخصم شيء إلا بعد موافقتك.',
                "Prochain renouvellement le {d} · {tot}. Avant cette date, {b} vous demandera d'approuver un nouveau paiement en {n} fois ; rien n'est prélevé sans votre accord."),
 'ob6CkTaxCalc': ('Calculated at payment', 'تنحسب عند الدفع', 'تُحتسب عند الدفع', 'Calculée au paiement'),
 'ob6CkPlusTax': ('+ tax', '+ الضريبة', '+ الضريبة', '+ taxes'),
 'ob6CkTrusted': ('Trusted by candidates across {r}', 'موثوق من مرشّحين في {r}', 'يثق به مرشّحون في {r}', 'Approuvé par des candidats · {r}'),
 'ob6CkHint': ('Pay in {n} with {prov} is available on the 4-month and 12-month plans.', 'التقسيط على {n} دفعات مع {prov} متاح على باقة الـ4 أشهر وباقة الـ12 شهر.',
               'التقسيط على {n} دفعات مع {prov} متاح في باقة الـ4 أشهر وباقة الـ12 شهراً.', 'Le paiement en {n} fois avec {prov} est disponible avec les formules 4 mois et 12 mois.'),
 'ob6TBnplOff': ('Pick the 4-month or 12-month plan to pay in {n} with {prov}.', '{@g:اختر|اختاري} باقة الـ4 أشهر أو الـ12 شهر عشان {@g:تقسّمها|تقسّمينها} على {n} مع {prov}.',
                 '{@g:اختر|اختاري} باقة الـ4 أشهر أو الـ12 شهراً للتقسيط على {n} دفعات مع {prov}.', 'Choisissez la formule 4 mois ou 12 mois pour payer en {n} fois avec {prov}.'),
 'ob6TOpen': ('{b} would open here', 'هنا يفتح {b}', 'هنا تُفتح صفحة {b}', "{b} s'ouvrirait ici"),
 'ob6TBnpl': ('The {b} pay-in-{n} sheet would open here', 'هنا تفتح شاشة التقسيط على {n} من {b}', 'هنا تُفتح شاشة التقسيط على {n} دفعات من {b}',
              'La fenêtre de paiement en {n} fois {b} s’ouvrirait ici'),
 'ob6TaxIntl': ('Local taxes included where they apply', 'شامل الضرائب المحلية حيث تنطبق', 'شامل الضرائب المحلية حيثما تنطبق', 'Taxes locales incluses le cas échéant'),
 'ob6Today': ('Today', 'اليوم', 'اليوم', "Aujourd'hui"),
 'ob6SdPaidBnpl': ('{amt} paid, 1 of {n} with {b} · {k} payments left', 'دفعت {amt}، الأولى من {n} مع {b} · باقي {k} دفعات',
                   'تم دفع {amt}، الدفعة الأولى من {n} مع {b} · بقيت {k} دفعات', '{amt} payés, 1re échéance sur {n} avec {b} · encore {k}'),
 'ob6SdPaidBnplS': ('Next {amt} on {d}. Renewal on {r} needs your approval in {b}.', 'الدفعة الجاية {amt} في {d}. التجديد في {r} يحتاج موافقتك في {b}.',
                    'الدفعة التالية {amt} في {d}. يحتاج التجديد في {r} إلى موافقتك عبر {b}.', "Prochaine échéance de {amt} le {d}. Le renouvellement du {r} nécessite votre accord dans {b}."),
 'ob6SdPaidRedir': ('{tot} paid with {b} · renews {r}', 'دفعت {tot} عن طريق {b} · يتجدّد {r}', 'تم دفع {tot} عبر {b} · يتجدّد في {r}', '{tot} payés avec {b} · renouvellement le {r}'),

 # ---------------- rights
 'ob6LensRights': ('Asked once, after payment, per country. Citizens and free-movement cases are answered for them, so most people only confirm; everyone else picks the one status that is true, and we reuse it truthfully on every application.',
                   'نسأل مرة وحدة بعد الدفع، لكل دولة. المواطنين وحالات حرية التنقل نجاوب عنهم، فأغلب الناس يأكّدون بس، والباقي يختارون الحالة الصحيحة، ونستخدمها بصدق في كل طلب.',
                   'نسأل مرة واحدة بعد الدفع، لكل دولة. نجيب نيابةً عن المواطنين وحالات حرية التنقل فيكتفي أغلب الناس بالتأكيد، ويختار الآخرون الحالة الصحيحة، ونستخدمها بصدق في كل طلب.',
                   "Demandé une seule fois, après le paiement, pays par pays. Les citoyens et les cas de libre circulation sont renseignés d'office : la plupart des gens n'ont qu'à confirmer. Les autres choisissent le statut exact, que nous réutilisons fidèlement à chaque candidature."),
 'ob6FinEy': ('Finish setup', '{@g:كمّل|كمّلي} الإعداد', '{@g:أكمل|أكملي} الإعداد', 'Terminez la configuration'),
 'ob6RtH': ('Can you work in these countries?', '{@g:تقدر تشتغل|تقدرين تشتغلين} في هالدول؟', 'هل يمكنك العمل في هذه الدول؟', 'Pouvez-vous travailler dans ces pays ?'),
 'ob6RtSub': ('Employers ask this on almost every application. Answer once and we fill it in, truthfully, every time.',
              'جهات العمل تسأل عنه في كل طلب تقريباً. {@g:جاوب|جاوبي} مرة وحدة ونعبّيه عنك بصدق كل مرة.',
              'تسأل جهات العمل عن هذا في كل طلب تقريباً. {@g:أجب|أجيبي} مرة واحدة ونعبّئه نيابةً عنك، بدقة، في كل مرة.',
              'Les employeurs le demandent presque à chaque candidature. Répondez une fois, nous le remplissons fidèlement à chaque fois.'),
 'ob6RtTagCit': ('Citizen', '{@g:مواطن|مواطنة}', '{@g:مواطن|مواطنة}', '{@g:Citoyen|Citoyenne}'),
 'ob6RtTagGcc': ('GCC citizen', '{@g:مواطن خليجي|مواطنة خليجية}', '{@g:مواطن خليجي|مواطنة خليجية}', '{@g:Citoyen|Citoyenne} du CCG'),
 'ob6RtTagEu': ('EU citizen', '{@g:مواطن أوروبي|مواطنة أوروبية}', '{@g:مواطن أوروبي|مواطنة أوروبية}', "{@g:Citoyen|Citoyenne} de l'UE"),
 'ob6RtTagAuto': ('No visa needed', 'بدون تأشيرة', 'لا حاجة إلى تأشيرة', 'Sans visa'),
 'ob6RtTagCta': ('Common Travel Area', 'منطقة السفر المشتركة', 'منطقة السفر المشتركة', 'Zone de voyage commune'),
 'ob6RtAutoCit': ('As a {dem} citizen, you can work {in} without a visa.', '{@g:أنت مواطن|أنتِ مواطنة} {dem}، {@g:تقدر تشتغل|تقدرين تشتغلين} {in} بدون تأشيرة.',
                  '{@g:أنت مواطن|أنتِ مواطنة} {dem}، لذا يمكنك العمل {in} دون تأشيرة.', '{@g:Citoyen|Citoyenne} {dem}, vous pouvez travailler {in} sans visa.'),
 'ob6RtAutoGcc': ('GCC citizens can work {in} without an employer sponsoring a visa.', 'مواطنين الخليج يقدرون يشتغلون {in} بدون ما تكفلهم جهة العمل بتأشيرة.',
                  'يمكن لمواطني دول الخليج العمل {in} دون أن تكفل جهة العمل تأشيرتهم.', "Les citoyens du CCG peuvent travailler {in} sans visa parrainé par l'employeur."),
 'ob6RtAutoEu': ('EU, EEA and Swiss citizens can work {in} without a work permit.', 'مواطنين الاتحاد الأوروبي والمنطقة الاقتصادية الأوروبية وسويسرا يقدرون يشتغلون {in} بدون تصريح عمل.',
                 'يمكن لمواطني الاتحاد الأوروبي والمنطقة الاقتصادية الأوروبية وسويسرا العمل {in} دون تصريح عمل.', "Les citoyens de l'UE, de l'EEE et de la Suisse peuvent travailler {in} sans permis de travail."),
 'ob6RtAutoCta': ('{a} and {b} can work in each other\'s country without a visa.', '{a} و{b} يقدرون يشتغلون في بلد بعض بدون تأشيرة.',
                  'يمكن لـ{a} و{b} العمل في بلد الآخر دون تأشيرة.', "Les {a} et les {b} peuvent travailler dans le pays de l'autre sans visa."),
 'ob6NotRight': ('Not right?', 'مو صحيح؟', 'غير صحيح؟', "Ce n'est pas ça ?"),
 'ob6UseAuto': ('Use the automatic answer', 'رجّع الإجابة التلقائية', 'استخدام الإجابة التلقائية', 'Revenir à la réponse automatique'),
 'ob6NeedAns': ('Needs an answer', 'يحتاج إجابة', 'يحتاج إلى إجابة', 'Réponse requise'),
 'ob6UsQ1': ('Are you legally authorised to work {in}?', '{@g:مسموح لك|مسموح لكِ} قانونياً {@g:تشتغل|تشتغلين} {in}؟', 'هل يحق لك قانونياً العمل {in}؟',
             'Êtes-vous {@g:autorisé|autorisée} à travailler légalement {in} ?'),
 'ob6UsQ2': ('Will you now or in the future need an employer to sponsor your visa?', '{@g:بتحتاج|بتحتاجين} الحين أو بعدين إن جهة العمل تكفل تأشيرتك؟',
             '{@g:هل تحتاج|هل تحتاجين} الآن أو مستقبلاً إلى أن تكفل جهة العمل تأشيرتك؟', "Aurez-vous besoin, maintenant ou plus tard, qu'un employeur parraine votre visa ?"),
 'ob6Yes': ('Yes', 'إيه', 'نعم', 'Oui'),
 'ob6No': ('No', 'لا', 'لا', 'Non'),
 'ob6UsEeo': ('Diversity questions (gender, ethnicity, veteran status, disability) are voluntary. We answer “Prefer not to say” unless you change it in About you.',
              'أسئلة التنوّع (الجنس، العِرق، الخدمة العسكرية، الإعاقة) اختيارية. نجاوبها بـ «أفضّل عدم الإجابة» إلا إذا {@g:غيّرتها|غيّرتيها} في صفحة «عنك».',
              'أسئلة التنوع (الجنس، العِرق، الخدمة العسكرية، الإعاقة) اختيارية. نجيب عنها بـ «أفضّل عدم الإجابة» ما لم {@g:تغيّر|تغيّري} ذلك في صفحة «عنك».',
              "Les questions sur la diversité (genre, origine, statut d'ancien combattant, handicap) sont facultatives. Nous répondons « Je préfère ne pas répondre » sauf si vous le changez dans « À propos de vous »."),
 'ob6RtRemote': ('Remote roles: we only apply when the employer hires people based {in}.', 'الوظائف عن بعد: نقدّم بس لما جهة العمل توظّف ناس مقيمين {in}.',
                 'الوظائف عن بعد: نقدّم فقط عندما توظّف جهة العمل أشخاصاً مقيمين {in}.', "Télétravail : nous ne postulons que si l'employeur recrute des personnes basées {in}."),
 'ob6RtLeft1': ('One country left to answer.', 'باقي دولة وحدة تحتاج إجابة.', 'بقيت دولة واحدة تحتاج إلى إجابة.', 'Plus qu’un pays à renseigner.'),
 'ob6RtLeftN': ('{n} countries left to answer.', 'باقي {n} دول تحتاج إجابة.', 'بقيت {n} دول تحتاج إلى إجابة.', 'Encore {n} pays à renseigner.'),

 'ob6GenOpt1': ('I can already work here', 'أقدر أشتغل هنا من الحين', 'يمكنني العمل هنا الآن', 'Je peux déjà travailler ici'),
 'ob6GenOpt2': ('I would need a work permit or visa', 'بحتاج تصريح عمل أو تأشيرة', 'سأحتاج إلى تصريح عمل أو تأشيرة', "J'aurais besoin d'un permis de travail ou d'un visa"),

 # ---------------- profile
 'ob6LensProfile': ('Employers ask the same questions on every portal, so they are answered once here and reused. The form follows the target markets: nationality, gender and photo appear only where applications there expect them, and salary is asked in each market\'s own currency and period.',
                    'جهات العمل تسأل نفس الأسئلة في كل بوابة، فنجاوبها مرة وحدة هنا ونستخدمها بعدين. والنموذج يتبع الدول المستهدفة: الجنسية والجنس والصورة تظهر بس وين الطلبات تتوقعها، والراتب نسأل عنه بعملة كل سوق وفترته.',
                    'تسأل جهات العمل الأسئلة نفسها في كل بوابة، فنجيب عنها هنا مرة واحدة ونعيد استخدامها. ويتبع النموذج الدول المستهدفة: لا تظهر الجنسية والجنس والصورة إلا حيث تتوقعها الطلبات هناك، ونسأل عن الراتب بعملة كل سوق وفترته.',
                    "Les employeurs posent les mêmes questions sur chaque portail : on y répond une fois ici, puis on les réutilise. Le formulaire suit les pays visés : nationalité, genre et photo n'apparaissent que là où les candidatures les attendent, et le salaire est demandé dans la devise et la période de chaque marché."),
 'ob6PfNatRo': ('From your CV. Applications in your target countries do not ask for it, so we use it only for work-rights answers.',
                'من سيرتك. الطلبات في الدول اللي {@g:تستهدفها|تستهدفينها} ما تسأل عنها، فنستخدمها بس لإجابات حق العمل.',
                'من سيرتك الذاتية. لا تطلبها الطلبات في الدول المستهدفة، لذلك نستخدمها فقط في إجابات حق العمل.',
                "D'après votre CV. Les candidatures dans vos pays cibles ne la demandent pas : elle sert seulement aux questions de droit au travail."),
 'ob6Eeo': ('Voluntary self-identification', 'التعريف الذاتي الاختياري', 'التعريف الذاتي الاختياري', 'Auto-identification facultative'),
 'ob6EeoS': ('Optional diversity questions on applications. Nothing here changes where we apply.', 'أسئلة تنوّع اختيارية في الطلبات. ما تغيّر شي في الوظائف اللي نقدّم عليها.',
             'أسئلة تنوع اختيارية في الطلبات. لا تغيّر شيئاً في الوظائف التي نقدّم عليها.', "Questions facultatives sur la diversité. Elles ne changent rien aux offres auxquelles nous postulons."),
 'ob6PNS': ('Prefer not to say', 'أفضّل عدم الإجابة', 'أفضّل عدم الإجابة', 'Je préfère ne pas répondre'),
 'ob6EeoRest': ('Ethnicity, veteran status and disability are answered “Prefer not to say”.', 'العِرق والخدمة العسكرية والإعاقة نجاوبها بـ «أفضّل عدم الإجابة».',
                'نجيب عن العِرق والخدمة العسكرية والإعاقة بـ «أفضّل عدم الإجابة».', "Origine, statut d'ancien combattant et handicap : « Je préfère ne pas répondre »."),
 'ob6LangEn': ('English', 'الإنجليزية', 'الإنجليزية', 'anglais'),
 'ob6Langs': ('Languages', 'اللغات', 'اللغات', 'Langues'),
 'ob6LangLvl': ('{l} level', 'مستوى {l}', 'مستوى {l}', 'Niveau en {l}'),
 'ob6LvNone': ('None', 'ما أتكلمها', 'لا أتحدثها', 'Aucune notion'),
 'ob6LvNative': ('Native', 'لغتي الأم', 'لغتي الأم', 'Langue maternelle'),
 'ob6SalH': ('Salary', 'الراتب', 'الراتب', 'Salaire'),
 'ob6SalExpIn': ('Expected {in}', 'المتوقع {in}', 'المتوقع {in}', 'Visé {in}'),
 'ob6PerMonth': ('month', 'شهر', 'شهر', 'mois'),
 'ob6PerYear': ('year', 'سنة', 'سنة', 'an'),
 'ob6PhHint2': ('Some employers {in} ask for one. You can add it any time.', 'بعض جهات العمل {in} تطلبها. {@g:تقدر تضيفها|تقدرين تضيفينها} أي وقت.',
                'تطلبها بعض جهات العمل {in}. يمكنك إضافتها في أي وقت.', 'Certains employeurs {in} en demandent une. Vous pouvez l’ajouter à tout moment.'),
 'ob6AbEy': ('Your profile', 'ملفك', 'ملفك الشخصي', 'Votre profil'),

 # ---------------- tune
 'ob6LensTune': ('Two good defaults and one ranking, after payment. Employer types and Auto-Apply mode arrive switched to the sensible choice, and the focus order only appears when there is more than one place to rank.',
                 'إعدادين جاهزين وترتيب واحد، بعد الدفع. أنواع جهات العمل ووضعية التقديم التلقائي تجي على الخيار الأنسب، وترتيب الأولوية يظهر بس لما يكون عندك أكثر من مكان.',
                 'إعدادان جاهزان وترتيب واحد، بعد الدفع. تأتي أنواع جهات العمل ووضع التقديم التلقائي على الخيار الأنسب، ولا يظهر ترتيب الأولوية إلا عند وجود أكثر من مكان.',
                 "Deux bons réglages par défaut et un classement, après le paiement. Les types d'employeurs et le mode Auto-Apply arrivent déjà sur le choix le plus sensé, et l'ordre de priorité n'apparaît que s'il y a plus d'un lieu à classer."),
 'ob6TuH': ('How should we apply?', 'كيف نقدّم لك؟', 'كيف نقدّم لك؟', 'Comment devons-nous postuler ?'),
 'ob6TuSub': ('Good defaults are already on. Change anything that does not fit.', 'حطّينا لك أفضل الإعدادات. {@g:غيّر|غيّري} أي شي ما يناسبك.',
              'فعّلنا لك الإعدادات الأنسب. {@g:غيّر|غيّري} أي شيء لا يناسبك.', 'Les bons réglages sont déjà activés. Modifiez ce qui ne vous convient pas.'),
 'ob6FoT': ('Focus order', 'ترتيب الأولوية', 'ترتيب الأولوية', 'Ordre de priorité'),
 'ob6FoSub': ('We apply to your top place first, then work down the list.', 'نقدّم على أول مكان في القائمة أول، وبعدها اللي بعده.',
              'نبدأ التقديم في المكان الأول، ثم ننتقل إلى ما يليه في القائمة.', 'Nous postulons d’abord pour votre premier choix, puis nous descendons la liste.'),
 'ob6FoTop': ('We start here', 'نبدأ من هنا', 'نبدأ من هنا', 'On commence ici'),
 'ob6FoRemote': ('Remote roles', 'وظائف عن بعد', 'الوظائف عن بعد', 'Postes en télétravail'),
 'ob6FoLow': ('When these places run low on new jobs', 'لما تقل الوظائف الجديدة في هالأماكن', 'عندما تقل الوظائف الجديدة في هذه الأماكن', 'Quand ces lieux manquent de nouvelles offres'),
 'ob6FoOnly': ('Only apply in my places', 'قدّم بس في أماكني', 'التقديم في أماكني فقط', 'Postuler uniquement dans mes lieux'),
 'ob6FoOnlyS': ('We wait for new jobs rather than go elsewhere.', 'ننتظر وظائف جديدة بدل ما نروح لأماكن ثانية.',
                'ننتظر وظائف جديدة بدلاً من الانتقال إلى أماكن أخرى.', 'Nous attendons de nouvelles offres plutôt que d’aller ailleurs.'),
 'ob6FoNear': ('Also try other cities in these countries', 'جرّب مدن ثانية في نفس الدول', 'تجربة مدن أخرى في هذه الدول أيضاً', 'Essayer aussi d’autres villes de ces pays'),
 'ob6FoNearS': ('Always after your list, never instead of it.', 'دايماً بعد قائمتك، مو بدالها.', 'دائماً بعد قائمتك، وليس بدلاً منها.', 'Toujours après votre liste, jamais à sa place.'),
 'ob6Up': ('Move up', 'لفوق', 'إلى الأعلى', 'Monter'),
 'ob6Down': ('Move down', 'لتحت', 'إلى الأسفل', 'Descendre'),
}

LANGS = ('en', 'gulf', 'neutral', 'fr')


def main():
    import re
    for k, v in list(K.items()):  # French typography: no-break space before ? ! : ; and inside « »
        fr = re.sub(r' ([?!:;])', '\u00a0\\1', v[3]).replace('« ', '«\u00a0').replace(' »', '\u00a0»')
        K[k] = (v[0], v[1], v[2], fr)
    for i, L in enumerate(LANGS):
        fp = os.path.join(I18N, f'newkeys-{L}.json')
        with open(fp, 'r+', encoding='utf-8') as f:
            fcntl.flock(f, fcntl.LOCK_EX)
            raw = f.read().strip()
            cur = json.loads(raw) if raw else {}
            for k, v in K.items():
                cur[k] = v[i]
            f.seek(0); f.truncate()
            json.dump(cur, f, ensure_ascii=False, indent=1)
            f.write('\n')
            fcntl.flock(f, fcntl.LOCK_UN)
        print(L, len(cur), 'keys in file;', len(K), 'ob6')


if __name__ == '__main__':
    main()
