export const meta = {
  name: 'ksa-entity-inventory',
  description: 'Inventory every KSA/market-specific entity in the Uptal v5 prototype copy and code',
  phases: [{ title: 'Scan', detail: 'parallel scanners over dictionary chunks, HTML body and JS code' }],
}
const B = '/home/user/uptal-workroom/prototypes/build'
const SRC = '/home/user/uptal-workroom/prototypes/src/v5.html'
const SCHEMA = {
  type: 'object',
  properties: {
    entities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'proposed stable id, category.slug, e.g. co.aramco, city.riyadh, uni.ksu, cert.socpa, gov.qiwa, pay.mada, persona.first, prog.saudization, adv.layla, ppl.khalid (recruiter/contact), fig.vat (a market figure), sal.* (salary figure), price.* (product price), phone.*, misc.*' },
          category: { type: 'string', enum: ['persona', 'employer', 'city', 'region', 'university', 'certification', 'gov_platform', 'nationalisation', 'payment', 'currency', 'tax', 'phone', 'person_advisor', 'person_contact', 'salary_figure', 'price', 'market_stat', 'calendar_culture', 'legal_regulatory', 'language_norm', 'other'] },
          en: { type: 'string', description: 'English surface form(s) exactly as written, separate variants with " | "' },
          ar: { type: 'string', description: 'Arabic surface form(s) exactly as written, separate variants with " | " (empty if none)' },
          archetype: { type: 'string', description: 'what it IS, so another market can pick an equivalent, e.g. "national oil major, largest employer", "#2 telecom", "Big-4-style professional cert for accountants", "tier-2 city on Red Sea coast"' },
          sample_keys: { type: 'array', items: { type: 'string' }, description: 'up to 6 dictionary keys / code locations where it appears' },
          approx_count: { type: 'integer' },
        },
        required: ['id', 'category', 'en', 'ar', 'archetype', 'sample_keys', 'approx_count'],
      },
    },
    code_notes: { type: 'array', items: { type: 'string' }, description: 'For code scanners: notable hard-coded market logic (e.g. price tables, SAR formatting functions, lang==="ar" branches, Saudi-only conditions) with line numbers' },
  },
  required: ['entities', 'code_notes'],
}
const COMMON = `You are inventorying a large single-file HTML prototype (Uptal Auto-Apply, a Saudi job-application product, EN + Gulf-Arabic). We are expanding it to ~28 markets (GCC, US, UK, Canada, Australia, ~10 EU countries, Egypt, Morocco, Tunisia, Algeria, Libya, Jordan, Lebanon, Iraq). Every Saudi/KSA-specific thing in the copy must become a market slot. Your job: list EVERY market-specific entity you find in your assigned slice: persona details (name Noura Al-Amri, initials, email, phone, years, current employer, education), employers/companies, cities/regions, universities, certifications (SOCPA, CMA...), government platforms (Qiwa, GOSI, Absher...), nationalisation programs (Saudization, Nitaqat...), payment brands (mada, Tabby, Tamara, Apple Pay, STC Pay...), currency words (SAR, riyal, the ¤ glyph placeholder), tax (VAT 15%), phone formats (+966), advisor/staff names, recruiter/contact names, salary figures, product prices, market statistics tied to Saudi (e.g. "1,240 live postings in your cities", "roles in Riyadh pay 38-45k"), calendar/culture (Sun-Thu work week, Ramadan, Eid, Thursday deadlines), legal/regulatory (PDPL, labor law), language norms ("Arabic" as a required language). Skip generic product UI words. Be exhaustive within your slice; prefer one entity per real-world thing with all surface variants. Use the Read tool on the files given (they are JSON or HTML/JS); for large files read in parts.`
const DICT = Array.from({ length: 23 }, (_, i) => `${B}/data/chunks/dict-${String(i).padStart(2, '0')}.json`)
const groups = []
for (let g = 0; g < 6; g++) groups.push(DICT.filter((_, i) => i % 6 === g))
const tasks = groups.map((files, g) => ({
  label: `dict-group-${g}`,
  prompt: `${COMMON}\n\nYour slice: dictionary chunk files (each maps key -> {en, ar}):\n${files.join('\n')}\nRead every file fully.`,
}))
tasks.push({ label: 'html-body', prompt: `${COMMON}\n\nYour slice: the HTML body markup of ${SRC}, lines 4287-7544 (screens). Also the stray hard-coded text list ${B}/data/stray-unique.json. Read with offset/limit in parts of ~400 lines; lines with very long base64 can be skipped.` })
const JS_RANGES = [[7545, 9400], [9400, 11300], [11300, 13300], [13300, 16100]]
JS_RANGES.forEach(([a, z], i) => tasks.push({
  label: `js-${i}`,
  prompt: `${COMMON}\n\nYour slice: JavaScript in ${SRC}, lines ${a}-${z}. Some lines are huge (dictionary blocks, MSAQ JSON at line 8674 is 120KB) — use Bash with sed/cut/grep to inspect long lines in pieces rather than reading them whole. Focus on: hard-coded data structures (jobs, advisors, courses, prices, receipts, CV text, MSAQ Q&A content, inline {en,ar} objects), currency/price formatting functions, and Saudi-specific conditions. Put code-level findings (with line numbers) in code_notes.`,
}))
phase('Scan')
const results = await parallel(tasks.map(t => () => agent(t.prompt, { label: t.label, phase: 'Scan', schema: SCHEMA })))
const ok = results.filter(Boolean)
log(`${ok.length}/${tasks.length} scanners returned`)
return { results: ok.map((r, i) => ({ label: tasks[i] && tasks[i].label, ...r })) }
