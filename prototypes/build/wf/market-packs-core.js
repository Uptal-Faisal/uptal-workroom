export const meta = {
  name: 'market-packs-core',
  description: 'Research and write market pack core files, then adversarially fact-check and fix each',
  phases: [{ title: 'Build', detail: 'research + write XX.core.json' }, { title: 'Verify', detail: 'skeptical fact-check, fix in place' }],
}
const B = '/home/user/uptal-workroom/prototypes/build'
const ROSTER = `${B}/markets/roster.json`
const SPEC = `${B}/markets/PACK-SPEC.md`
const markets = args.markets
const VERDICT = { type: 'object', properties: { changes: { type: 'array', items: { type: 'string' } }, remainingDoubts: { type: 'array', items: { type: 'string' } }, valid: { type: 'boolean' } }, required: ['changes', 'remainingDoubts', 'valid'] }
const results = await pipeline(markets,
  (code) => agent(`Write the market pack core for market ${code}.\nRead the spec ${SPEC} (follow it exactly) and the persona roster ${ROSTER} (use the persona whose id is "${code}" for the persona block: same name, gender, nationality, city).\nAlso look at ${B}/markets/base.json for this market's currency and price tier (do not change it).\nWrite ${B}/markets/packs/${code}.core.json and ${B}/markets/packs/${code}.sources.md. Validate the JSON with python3 -I -c "import json;json.load(open('${B}/markets/packs/${code}.core.json'))". Return a 5-line summary of the key facts you chose (payments, tax, work-rights statuses, nationalisation, sensitive fields, salary factor).`,
    { label: `build:${code}`, phase: 'Build' }),
  (summary, code) => agent(`You are a skeptical fact-checker for an Uptal market pack. File: ${B}/markets/packs/${code}.core.json (spec: ${SPEC}; sources: ${B}/markets/packs/${code}.sources.md).\nBuilder summary:\n${summary}\n\nTry to REFUTE each important claim using WebSearch/WebFetch (load via ToolSearch "select:WebSearch,WebFetch"): payment methods actually used for online subscriptions in ${code} (wallets, local card scheme, BNPL that supports subscriptions), VAT/sales-tax rate and whether consumer prices are shown tax-inclusive, the work-rights statuses (real visa/permit categories and names), auto-answered citizenships, nationalisation programme wording, whether CV photos / gender / date of birth / nationality / marital status are normally asked (and legal constraints), salary factor sanity (Senior FA / FP&A 8 yrs in the primary city; f = local monthly / 26000 SAR), employers are real, current (renamed/merged companies use current names) and hire finance staff, city ordering, Arabic/French spellings of names, Arabic register (Gulf for GCC markets, neutral formal-leaning elsewhere), gender agreement in ar/fr persona title. Fix every confirmed error directly in the JSON (keep it valid; re-validate with python3 -I). Note unresolved doubts. Return what you changed.`,
    { label: `verify:${code}`, phase: 'Verify', schema: VERDICT }).then(v => ({ code, summary, verdict: v })),
)
return results.filter(Boolean)
