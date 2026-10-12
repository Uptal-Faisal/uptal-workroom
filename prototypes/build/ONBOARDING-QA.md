# Onboarding QA loop — the founder's #1 priority

The onboarding (welcome → where → targets → wall → payOtp → checkout → subDone → rights → profile → cvtOffer →
aboutYou → tune → blocklist → autopilot → live) is THE most important part of v6. It must feel hand-made for each
country: super tailored, minimal steps before payment (only where + roles), everything else after payment, and
flawless in EN, AR (Gulf for GCC, neutral elsewhere) and FR, on phone and desktop.

## What every walker checks, per persona x language x frame (phone 390 + desktop 1280)
1. **Flow**: exactly welcome → where (Step 1 of 2) → targets (Step 2 of 2) → wall before payment. No other question
   before payment. Back buttons work. Progress bar and step labels right. Jump menu works.
2. **Tailoring**: residence card shows the persona's city + country; target chips preselected from persona targets;
   cities from the target pack with sensible defaults; metro note; remote toggle; wall feed uses PRIMARY target
   employers (real names, logos as monograms) and target cities; job count plausible; prices in RESIDENCE currency
   and format (e.g. "$99", "£79", "89 €", "399 AED", "1,299 EGP", KSA glyph); BNPL line only where the residence
   pack has BNPL; checkout methods/wallets/brands/tax line/renewal line from the residence pack; post-payment rights
   cards per target with correct auto-answers (citizens, GCC-in-GCC, EU/EEA/CH, GB/IE), real local statuses,
   nationalisation line where it exists; profile shows only fields that are normal in the target market (photo,
   gender/EEO, nationality, DOB); salary current in residence currency/period, expected per target in its own;
   language levels (English + local language); blocklist seeded with the persona's employers; live feed from target.
3. **Copy**: no leftover KSA terms for non-KSA personas (Riyadh, Saudi, SAR/riyal, mada, Iqama, Noura, Aramco, stc,
   Tabby/Tamara outside GCC...), no unexpanded `{@...}` tokens, no English left in FR mode on onboarding screens,
   no Latin-only sentences in AR mode, gender agreement right for the persona (AR + FR), neutral Arabic has no Gulf
   dialect, numbers formatted for the language (FR: 1 356), RTL correct in AR.
4. **Layout**: nothing overflows at 390px, chips wrap nicely, sheets open/close, sticky CTA visible, no overlapping,
   brand marks render, desktop split view looks deliberate.
5. **Errors**: zero page errors / console errors from the app (ignore font CDN network failures).

## Checkout elements required by law (implement where listed; placeholders for counsel review)
- **EU (DE FR NL BE ES IT PL SE IE) + UK (GB)**: before Pay, an unticked checkbox (required to pay) by which the
  consumer expressly requests that the service starts immediately and acknowledges that they lose the 14-day right
  of withdrawal once it has started (digital service fully performed on access) — plus the price incl. VAT, the
  renewal interval and amount, and how to cancel. Order button text must clearly state an obligation to pay
  (DE: "Zahlungspflichtig bestellen" equivalent; use localized "Pay and subscribe" / "Payer et s'abonner").
- **DE**: account has a visible "Cancel contract" button path (Kündigungsbutton, §312k BGB) — inject it at runtime from js/50-onboarding.js into the plan /
  manage screen for DE residents (do NOT patch plan/manage HTML: a sweeper owns it) (label "Verträge hier kündigen" shown in German even in EN/FR UI, plus translation).
- **FR**: "Résilier" reachable in 3 clicks from the account (plan/manage, runtime-injected, same rule), and the renewal line mentions the
  reminder that will be sent before tacit renewal (loi Chatel) for 4- and 12-month plans.
- **US (and CA)**: auto-renew disclosure next to the Pay button stating amount, interval, that it renews until
  cancelled and how to cancel online, with an unticked "I agree to automatic renewal" checkbox (California ARL
  style); price shown + "plus applicable tax".
- **AU**: never say "no refunds"; add "Your rights under the Australian Consumer Law are not affected." line.
- **All markets**: the existing Terms/Privacy checkbox stays; tax line per residence pack.
Strings for these go in `ob6*` newkeys (EN/Gulf/neutral/FR) with tokens where market-specific; keep the KSA
checkout identical to v5.

## Findings format
{severity: blocker|major|minor, persona, lang, frame, screen, problem, fix (concrete: file + what to change)}
