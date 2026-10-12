export const meta = {
  name: 'ent-map',
  description: 'Map every registry token id to a local value per market (ent + persona + logos), then check each map',
  phases: [{ title: 'Map' }, { title: 'Check' }],
}
const B = '/home/user/uptal-workroom/prototypes/build'
const RULES = `Read: ${B}/DESIGN.md, ${B}/i18n/GLOSSARY.md, ${B}/markets/registry.json (every token id with its exact KSA en/ar value, scope, archetype and a "map" instruction), plus ${B}/markets/registry-proposals/*.json if any exist (extra ids), and the v5 dictionary values where an id is used (${B}/data/v5-dump.json; registry "keys" tell you where) so you understand the sentences each value lands in.`
const res = await pipeline(args.markets,
  (code) => agent(`${RULES}\n\nMarket ${code}. Read its researched pack ${B}/markets/packs/${code}.core.json (cities, employers, people, certs, unis, persona, rights, pay, tax, legal, govPlatforms, nationalisation, culture) and the roster ${B}/markets/roster.json.\nWrite ${B}/markets/packs/${code}.ent.json = {"ent": {id: {"en","ar","fr"}}, "logos": {v5LogoClass: {"bg","fg","mono"}}} giving EVERY non-persona registry id (and proposal id) a value for ${code}:
- co.*: a REAL local employer from the pack matching the archetype (distinct companies for distinct ids; if the pack has none suitable, pick a real well-known one in ${code} and keep it plausible). For each co.* id whose registry entry has a "logo" class (e.g. co-ar), add logos[class] from the chosen employer's logo.
- city.*: follow the map hint (rank-based or role-based) using the pack's cities; job-card cities must stay plausible for the mapped employer.
- ctry.*/reg.*: the market's country/region forms exactly matching the grammatical role of the KSA form (standalone name, in-sentence short form, adjective m/f, nationals, flag). For GCC markets reg.* stays Gulf; for EU markets use EU/Europe; North Africa: the Maghreb/North Africa or Arab world as fits; US/CA/GB/IE/AU: the natural regional framing.
- ppl.*/adv.*: culturally typical local names with the SAME gender as the KSA person (the surrounding copy agrees with it); initials consistent.
- cert.*/uni.*: local equivalents from the pack. gov.*: local equivalents (work permit system, social insurance body, tax authority, national ID, residence permit name); where a concept does not exist locally, give the closest natural phrase (never leave KSA terms).
- pay.*/tax.*/legal.*/cur.*/phone.*/res.* (RESIDENCE scope): from the pack (payments, VAT label/rate, data-protection law short name, phone format, time zone).
- misc.*/lang.*/cal.*/prog.*: follow the map hint (e.g. Sun-Thu week → Mon-Fri; Thursday deadline → Friday; Saudization → the local programme or a neutral phrase if none).
ar values: GCC markets Gulf register, others neutral formal-leaning Arabic; correct local Arabic spellings. fr values: natural French forms (with articles where the KSA form has one, e.g. ctry.n "l'Arabie saoudite" → "le Royaume-Uni").
Also write ${B}/markets/packs/${code}.persona.json = {"f": {field: {"en","ar","fr"} | string}} for EVERY p.* id in the registry (field = id without "p."), from the pack persona (name, initials, email, phone, city, title in the right gender, employer, employer2, degree, uni, cert, years, team size, bio sentences, CV file name...). Keep the same sentence shapes as the KSA values so the copy still reads.
Validate both JSON files with python3 -I. Return counts and any ids you could not map well.`, { label: `map:${code}`, phase: 'Map' }),
  (summary, code) => agent(`${RULES}\n\nCheck the ${code} entity map ${B}/markets/packs/${code}.ent.json and persona ${B}/markets/packs/${code}.persona.json against the registry and ${B}/markets/packs/${code}.core.json. Mapper report:\n${summary}\n\nVerify: every registry/proposal id present (non-p.* in ent, p.* in persona) with en/ar/fr; no KSA values left (Riyadh, Aramco, Saudi, SOCPA, Iqama, mada, Noura... unless the market is SA); genders of people match the registry; employers are real and current in ${code}; Arabic register right (Gulf for GCC, neutral elsewhere); French articles/elision right; grammatical role matches the KSA form (expand a few dictionary sentences mentally for ${code}). Fix in place, re-validate JSON. Return what you fixed.`, { label: `check:${code}`, phase: 'Check' }).then(c => ({ code, summary, check: c })),
)
return res.filter(Boolean)
