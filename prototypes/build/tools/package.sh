#!/usr/bin/env bash
# Package every deliverable into "global expansion plan/" and a zip of it.
# usage: bash tools/package.sh [out_dir]   (default: the session scratchpad)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"          # prototypes/
OUT_BASE="${1:-/tmp/claude-0/-home-user-uptal-workroom/6ab62c15-85ac-5672-9c3c-c0e707cd596b/scratchpad}"
PKG="$OUT_BASE/global expansion plan"
rm -rf "$PKG" "$OUT_BASE/global expansion plan.zip"
mkdir -p "$PKG/01 App prototype (v6 multi-market)" "$PKG/02 Landing pages" "$PKG/03 Market research" "$PKG/04 Legal" "$PKG/05 Source and build"

cp "$ROOT/Uptal_AutoApply_v6_MultiMarket.html" "$PKG/01 App prototype (v6 multi-market)/" 2>/dev/null || true
cp "$ROOT"/Uptal_AutoApply_Landing_*.html "$PKG/02 Landing pages/" 2>/dev/null || true
cp "$ROOT"/build/landing/PLACEHOLDERS-*.md "$PKG/02 Landing pages/" 2>/dev/null || true
mkdir -p "$PKG/03 Market research/packs"
cp "$ROOT"/build/markets/packs/*.sources.md "$PKG/03 Market research/packs/" 2>/dev/null || true
cp "$ROOT"/build/markets/packs/*.core.json "$PKG/03 Market research/packs/" 2>/dev/null || true
cp "$ROOT"/build/markets/base.json "$ROOT"/build/markets/roster.json "$PKG/03 Market research/" 2>/dev/null || true
[ -d "$ROOT/legal" ] && cp -r "$ROOT/legal/." "$PKG/04 Legal/" || true
[ -d "$ROOT/build/legal" ] && cp -r "$ROOT/build/legal" "$PKG/04 Legal/working files" || true
mkdir -p "$PKG/05 Source and build"; (cd "$ROOT" && tar --exclude="shots" --exclude="__pycache__" -cf - build src) | (cd "$PKG/05 Source and build" && tar -xf -)

cp "$ROOT/HANDOVER.md" "$PKG/HANDOVER.md" 2>/dev/null || true
cat > "$PKG/README.md" <<'EOF'
# Uptal global expansion plan

- 01 App prototype (v6 multi-market): open the HTML in a browser. The dark bar at the top has a market persona
  selector (28 markets + 4 cross-border personas) and EN / عربي / FR. Add ?persona=AE&lang=ar to the URL to deep-link.
- 02 Landing pages: per-country landing pages (UAE first) and the list of placeholder figures to replace.
- 03 Market research: one researched, fact-checked pack per market (payments, tax, work rights, nationalisation,
  CV norms, salaries, employers, cities) with sources and open doubts.
- 04 Legal: multi-market Terms / Privacy / Refund drafts (global core + country addenda) once produced. Drafts for
  review by licensed counsel in each country before publication.
- HANDOVER.md: full state, decisions and next steps, for a new session (or a person) to take over.
- 05 Source and build: everything needed to rebuild (python3 build/build.py) plus the original v5 / landing / legal sources.

Git: https://github.com/Uptal-Faisal/uptal-workroom/tree/claude/inspiring-brown-5rl4en/prototypes
EOF
date -u +"Packaged %Y-%m-%d %H:%M UTC" >> "$PKG/README.md"
(cd "$OUT_BASE" && zip -qr "global expansion plan.zip" "global expansion plan")
du -sh "$PKG" "$OUT_BASE/global expansion plan.zip"
