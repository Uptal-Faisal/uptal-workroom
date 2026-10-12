# Country landing pages

`make_landing.py` takes the original KSA landing page, applies a country **content pack**, and writes a new self-contained landing page (EN + Arabic, fonts embedded, no network resources).

```
python3 -I make_landing.py ../../src/landing-ksa.html packs/ae.json ../../Uptal_AutoApply_Landing_UAE.html \
        --placeholders PLACEHOLDERS-ae.md
```

- **Source**: always the original `src/landing-ksa.html`, never the stripped reading copy. The generator anchors every edit on an exact string or block from that page. If a string is missing, or appears more than once in a language tree, the build stops and prints that string.
- **Output**: one HTML file. Fonts are kept byte for byte. All KSA logo images (the employer band, the flag, the tailoring-card tiles) are removed and rebuilt from the pack as typeset wordmarks, an inline SVG flag and monogram tiles.
- **`--placeholders`** (optional) writes the list of every placeholder figure, plus the pack's `review_notes`, to Markdown.
- Stdlib only. Exit code is 0 on success, 1 on a build or verification error, and 2 on bad usage.

## Adding a country

1. Copy `packs/ae.json` to `packs/<cc>.json` (ISO 3166 alpha-2, lower case).
2. Rewrite every value for the new market. Keep the keys. The generator rejects missing or unknown keys, so a typo cannot silently ship KSA or UAE copy.
3. Mark any figure you do not have real data for as `"placeholder": true` (see `stats`).
4. Run the generator. Then render the page in both languages at desktop and phone widths and look at it.
5. Commit the pack, the output page and `PLACEHOLDERS-<cc>.md`.

The source anchors live in `SLOTS` in `make_landing.py`, not in the pack. A new country never touches them. They only change if the KSA source page itself is edited.

## Pack schema

Every string is an **HTML fragment**: `<b>`, `<strong>`, `<br/>` and `<span class="tb-num">` are allowed, and `&` must be written `&amp;`. The generator checks that tags are balanced and that there are no bare ampersands. `{{token}}` inserts a value from `stats`. In FAQ answers, `\n` starts a new line, because answers render with `white-space: pre-line`.

| Key | Type | What it drives |
|---|---|---|
| `country` | `{code, name:{en,ar}}` | ISO code, used in messages and file names. |
| `title` | `{en, ar}` | `<title>`, and the title the language switch sets. |
| `meta_description` | string (EN) | `<meta name="description">`. |
| `app_link` | relative URL | Where "Start applying" goes after the fake "Analysing…" step, e.g. `Uptal_AutoApply_v6_MultiMarket.html?persona=AE`. The Arabic tree appends `lang=ar`. |
| `flag_svg` | inline `<svg>` | Flag in the nav badge, drawn into a 22×15 box. Use `preserveAspectRatio="none"`. No `href`, no script. |
| `placeholder_tooltip` | `{en, ar}` | `title` tooltip on every placeholder figure. |
| `stats` | `{token: {en, ar, placeholder, where, replace_with}}` | Numbers used through `{{token}}`. `placeholder: true` renders the value as `<span class="ph">`: amber tint, dashed amber underline and the tooltip. `where` and `replace_with` feed `PLACEHOLDERS-<cc>.md`. Every stat must be used in both trees. |
| `text.en` / `text.ar` | `{slot: html}` | The 17 exact-string slots, listed below. Both languages need all 17. |
| `sector_tags` | `{en:[{label,on}], ar:[…]}` | Company-type tags under "How it works", step 1. `on: true` renders a tag as selected. |
| `targeting.cities` | `{en:[{label,on}], ar:[…]}` | City chips in the "Your targeting" card. Four chips fit best. |
| `targeting.company_types` | same | Company-type chips in the same card. |
| `tailoring.rows` | `[{mono, title:{en,ar}, sub:{en,ar}, keywords[], fit}]` | Example roles in the "Tailoring your CV" card. `mono` is 1–3 characters shown on a white monogram tile, and `fit` is the percentage ring (0–100). |
| `tailoring.more_monos` | `[str]` (1–4) | Letters in the overlapping circles beside "Plus N more". |
| `employers.rows` | `[[{name, style?, sub?, s?, label?}]]` | The "Where we apply" marquee. Each inner list is one row, and odd rows scroll the other way. `style` is `title` (default), `caps` or `lower`. `sub` is a small second line, e.g. "Abu Dhabi". `s` is a size multiplier from 0.5 to 2. `label` is the screen-reader name, which defaults to name + sub. These are typeset wordmarks, never logos: grayscale, one typeface. |
| `employers.note` | `{en, ar}` | Disclaimer under the band ("Example employers, shown for illustration."). |
| `faq.en` / `faq.ar` | `[{q, a}]` | The full FAQ, replacing the KSA list. Keep the two lists parallel (same length and order). |
| `review_notes` | `[{item, note}]` (optional) | Things to confirm before launch that the page does not visibly mark, such as borrowed testimonials or unconfirmed claims. Copied into the placeholders file. |
| `_about`, `_note`, `pack_version` | – | Ignored by the generator. |

### Text slots

| Slot | KSA original (EN) |
|---|---|
| `badge` | Built in KSA (nav badge beside the flag) |
| `hero_eyebrow` | AI Auto-Apply · Saudi Arabia |
| `hero_lead` | Hero paragraph ("…across Saudi Arabia, every single day…") |
| `live_big` | 95K+ (usually `{{jobs_total}}`) |
| `live_unit` | jobs in KSA |
| `live_today` | 26,859+ new this week |
| `live_sub` | New jobs added across Saudi, every day |
| `board_meta` | Across Saudi Arabia |
| `tb_h2` | We apply to more than `<span class="tb-num">`5,700`</span>` organizations |
| `tb_sub` | Government and semi-government, … across Saudi Arabia. |
| `how_step2` | Step 2 copy ("…across all four boards. Up to 300 applications a month from 30K+ new jobs.") |
| `cv_city` | The highlighted city in the CV demo line ("…teams across **Riyadh**.") |
| `more_txt` | Plus `<b>`546`</b>` more, each tailored for you |
| `card_note` | Example roles and employer logos, shown for illustration. |
| `ft_types` | Government, private, startups and more |
| `testi_eyebrow` | Testimonials eyebrow ("Loved by job seekers") |
| `testi_trust` | Trusted by `<b>`1,542+`</b>` candidates across Saudi Arabia. |

The Arabic originals for each slot are in `SLOTS` in `make_landing.py`.

## What the generator checks

- Every exact anchor matches once per tree. The structural blocks match their expected shape: 64 logos in the band, 2 tailoring rows, 3 "more" logos, 18 FAQ items, 2 chip groups.
- The output has no `data:image` URIs and no external `src`/`href` resources, and the embedded font count is unchanged.
- No `{{token}}` is left unresolved, and every stat is used in both trees.
- **No leftover KSA text**: the visible text and the `alt`/`title`/`aria-label` attributes of both trees are scanned for Saudi, KSA, Riyadh, Jeddah, Dammam, Khobar, Dhahran, Makkah, Madinah, Tabuk, Abha, Kingdom, riyal, SAR and their Arabic forms (السعودية، المملكة، الرياض، جدة، الدمام، …). The testimonials section is exempt, because its reviews are kept verbatim and labelled honestly as being from members in Saudi Arabia.

## Decisions that apply to every country

- **Stats**: if a figure is not real data for the market, it is a placeholder (`"placeholder": true`). Nothing should ship in the amber style.
- **Testimonials**: never invent reviews. Keep the Saudi ones, labelled as such (`testi_eyebrow`), until the market has its own.
- **Employers**: typeset names only, with the illustration disclaimer.
- **Product facts** stay identical to KSA: up to 300 applications a month, a CV tailored per job, the account created from the CV's email and activated on payment, no job guarantee, pause or cancel any time. Only local facts change: cities, work week, nationalisation rules.
