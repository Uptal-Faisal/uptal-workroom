#!/usr/bin/env python3
"""Generate build/patches/50-onboarding.json: exact old->new patches on src/v5.html for the v6 onboarding.
Owned screens: welcome, where (new), targets, wall, profile, blocklist, rights (new), tune (new), aboutYou, autopilot, live.
(payOtp, checkout and subDone keep their v5 markup; 50-onboarding.js generalises them at runtime.)"""
import json, os, sys

ROOT = '/home/user/uptal-workroom/prototypes'
SRC = os.path.join(ROOT, 'src', 'v5.html')
OUT = os.path.join(ROOT, 'build', 'patches', '50-onboarding.json')
src = open(SRC, encoding='utf-8', newline='').read()


def block(start, end='</section>'):
    i = src.index(start)
    j = src.index(end, i) + len(end)
    return src[i:j]


def inner(b, start, end):
    i = b.index(start)
    j = b.index(end, i) + len(end)
    return b[i:j]


P = []


def patch(old, new, why, count=1):
    got = src.count(old)
    if got != count:
        sys.exit(f'anchor count {got} != {count}: {old[:100]!r}')
    P.append({'old': old, 'new': new, 'count': count, 'why': why})


LENS = '<div class="lenschip"><i class="ti ti-bulb"></i><div><b>{t}</b> <span data-t="{k}"></span></div></div>'
SETUP = ('<div class="setup"><div class="bar"><i style="width:{w}%" data-ob6bar></i></div>'
         '<div class="lab"><span data-ob6step="{s}">{lab}</span><b data-ob6pct>{w}%</b></div></div>')

# ---------------------------------------------------------------- welcome
patch('<b data-t="wr2">We found you 42 roles</b><span data-t="wr2s">across Saudi and the Gulf</span>',
      '<b data-t="wr2" data-ob6="wr2">We found you 42 roles</b><span data-t="wr2s" data-ob6="wr2s">across Saudi and the Gulf</span>',
      'welcome: the role count and market line become market-aware (KSA keeps the v5 keys)')
patch('<b data-t="wr3">3 quick things left to confirm</b><span data-t="wr3s">targets, CV, and how we ping you</span>',
      '<b data-t="ob6Wr3">2 quick things left</b><span data-t="ob6Wr3s">where you want to work and your roles</span>',
      'welcome: only where + roles are left before the paywall')
patch('<div class="cta"><button class="btn btn-p" data-go="targets"><span data-t="wCta">Confirm my setup</span></button></div>',
      '<div class="cta"><button class="btn btn-p" data-go="where"><span data-t="wCta">Confirm my setup</span></button></div>',
      'welcome: next step is where')

# ---------------------------------------------------------------- where (new) + targets (roles only)
tg = block('<!-- targets -->\n<section class="scr" data-scr="targets">')
roles_card = inner(tg, '<div class="setcard">', '<button class="addrole" data-addrole="roleChips_t"><i class="ti ti-plus"></i> <span data-t="rAdd">Add role</span></button>\n      </div>\n    </div>')
types_card = inner(tg, '    <div class="setcard">\n      <div class="chips" data-group="type" id="typeChips_t">', '<div class="allhint" data-t="tAllHint" style="display:none">Every employer type is included. Turn this off to pick specific types.</div>\n    </div>')
auto_card = inner(tg, '<div class="card mt18" style="display:flex;align-items:center;gap:12px">', '<div class="tgl on" id="autoTgl"></div>\n    </div>')

where = '\n'.join([
    '<!-- where (v6): where you live, where you want to work, cities, remote. Step 1 of 2 before the paywall -->',
    '<section class="scr" data-scr="where">',
    '  <div class="back" data-go="welcome"><i class="ti ti-arrow-left"></i></div>',
    '  ' + SETUP.format(w=60, s='where', lab='Step 1 of 2'),
    '  <div class="body nonav">',
    '    ' + LENS.format(t='Smart Defaults + Goal-Gradient.', k='ob6LensWhere'),
    '    <h2 class="h2" data-t="ob6WhH">Where do you want to work?</h2>',
    '    <p class="mut mt6" data-t="ob6WhSub">We start from your CV and where you are. Add any country you would move to.</p>',
    '    <div id="ob6Where"></div>',
    '  </div>',
    '  <div class="cta"><div class="ob6meta" id="ob6WhMeta"></div><button class="btn btn-b" id="ob6WhCta" data-go="targets"><span data-t="ob6Continue">Continue</span></button></div>',
    '</section>',
    ''])
targets = '\n'.join([
    '<!-- targets (v6: roles only; cities moved to where, employer types and Auto-Apply mode to tune) -->',
    '<section class="scr" data-scr="targets">',
    '  <div class="back" data-go="where"><i class="ti ti-arrow-left"></i></div>',
    '  ' + SETUP.format(w=80, s='targets', lab='Step 2 of 2'),
    '  <div class="body nonav">',
    '    ' + LENS.format(t='Smart Defaults.', k='ob6LensTargets'),
    '    <h2 class="h2" data-t="tH">Confirm your targets</h2>',
    '    <p class="mut mt6" data-t="tSub">Pulled from your CV. Change anything that does not fit.</p>',
    '    ' + roles_card,
    '  </div>',
    '  <div class="cta"><button class="btn btn-b" data-go="wall"><span data-t="ob6TgCta">See my matches</span> <i class="ti ti-arrow-right"></i></button></div>',
    '</section>'])
patch(tg, where + targets, 'where (new, step 1 of 2) + targets slimmed to roles (step 2 of 2), CTA to the wall')

# ---------------------------------------------------------------- profile (post-payment, tailored)
pf = block('<!-- profile: about you (onboarding) -->\n<section class="scr" data-scr="profile">')
bio = inner(pf, '<div class="setcard setonly" id="pfCardBio">', '<span data-t="pfBioS">Tap the text to edit it. Employers read this first, and it goes out on every application.</span></div>\n    </div>')
photo = inner(pf, '<div class="setcard setonly" id="pfCardPhoto">', '<button class="btn btn-o" data-photodel style="display:none;flex:none"><i class="ti ti-trash"></i></button>\n      </div>\n    </div>')
status = inner(pf, '<div class="setcard">\n      <div class="setcard-h">\n        <span class="setcard-ic"><i class="ti ti-id-badge-2"></i></span>', '<button class="chip" data-pfemp="unemployed"><span data-t="pfUnemployed">Unemployed</span></button>\n        </div>\n      </div>\n    </div>')
imm = inner(pf, '<div class="cvfill" id="pfImmediate"', '</div>\n    </div>')
notice = inner(pf, '<div class="setcard" id="pfCardNotice">', '<span class="noticeunit" data-t="pfUnitDays">days</span>\n        </div>\n      </div>\n    </div>')
eng = inner(pf, '<div class="setcard" id="pfCardEng">', '<button class="chip"><span data-t="pfEngFluent">Fluent</span></button>\n        </div>\n      </div>\n    </div>')
eng_new = eng.replace('<span class="setcard-t" data-t="pfEng">English level</span>', '<span class="setcard-t" data-t="pfEng" id="ob6PfEngT">English level</span>')
eng_new = eng_new[:-len('\n    </div>')] + '\n      <div id="ob6PfLang2"></div>\n    </div>'
assert eng_new != eng
profile = '\n'.join([
    '<!-- profile: about you (v6: after payment, tailored to what applications in the target markets ask) -->',
    '<section class="scr" data-scr="profile">',
    '  <div class="back" data-go="rights"><i class="ti ti-arrow-left"></i></div>',
    '  ' + SETUP.format(w=33, s='profile', lab=''),
    '  <div class="body nonav">',
    '    <div class="lenschip"><i class="ti ti-bulb"></i><div><b>Effort once, reused forever.</b> <span data-t="ob6LensProfile"></span></div></div>',
    '    <h2 class="h2" data-t="pfH">About you</h2>',
    '    ' + bio,
    '    ' + photo,
    '    ' + status,
    '    ' + imm,
    '    ' + notice,
    '    <div class="setcard" id="ob6PfBasics">',
    '      <div class="setcard-h">',
    '        <span class="setcard-ic"><i class="ti ti-user"></i></span>',
    '        <div class="setcard-ht"><span class="setcard-t" data-t="pfBasics">Basics</span></div>',
    '      </div>',
    '      <hr class="setcard-div">',
    '      <div class="chipgrid" style="display:block" id="ob6PfBasicsIn"></div>',
    '    </div>',
    '    <div class="setcard" id="ob6PfEeo" style="display:none">',
    '      <div class="setcard-h">',
    '        <span class="setcard-ic"><i class="ti ti-users"></i></span>',
    '        <div class="setcard-ht"><span class="setcard-t" data-t="ob6Eeo">Voluntary self-identification</span></div>',
    '        <span class="setcard-opt" data-t="phOpt">optional</span>',
    '      </div>',
    '      <hr class="setcard-div">',
    '      <div class="chipgrid" style="display:block" id="ob6PfEeoIn"></div>',
    '    </div>',
    '    ' + eng_new,
    '    <div class="setcard" id="ob6PfSal">',
    '      <div class="setcard-h">',
    '        <span class="setcard-ic"><i class="ti ti-coin"></i></span>',
    '        <div class="setcard-ht"><span class="setcard-t" data-t="pfSalary">Salary, SAR a month</span></div>',
    '      </div>',
    '      <hr class="setcard-div">',
    '      <div class="chipgrid" id="pfSalGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div>',
    '    </div>',
    '  </div>',
    '  <div class="cta"><button class="btn btn-b dis" id="pfCtaBtn" data-go="aboutYou"><span data-t="pfCta">Save and continue</span></button></div>',
    '</section>'])
patch(pf, profile, 'profile moves after payment: visa card -> rights, location -> where; nationality/gender/photo/languages/salary follow the target markets')

# ---------------------------------------------------------------- blocklist
bl = block('<!-- blocklist -->\n<section class="scr" data-scr="blocklist">')
bl_new = (bl.replace('<div class="back" data-go="profile">', '<div class="back" data-go="tune">')
            .replace('<div class="setup"><div class="bar"><i style="width:96%"></i></div><div class="lab"><span data-t="setup3b">Step 3 of 3</span><b>96%</b></div></div>',
                     SETUP.format(w=83, s='blocklist', lab='Step 3 of 3'))
            .replace('<b>Acme Financial</b>', '<b id="ob6Bl1">Acme Financial</b>')
            .replace('<b>Acme Capital</b>', '<b id="ob6Bl2">Acme Capital</b>')
            .replace('<button class="btn btn-b" data-go="wall"><span data-t="blCta">Continue</span></button>', '<button class="btn btn-b" data-go="autopilot"><span data-t="blCta">Continue</span></button>'))
assert bl_new.count('data-ob6') == 3 and 'data-go="autopilot"' in bl_new and 'ob6Bl2' in bl_new, bl_new
patch(bl, bl_new, 'blocklist: post-payment setup step, seeded from the persona employer, continues to autopilot')

# ---------------------------------------------------------------- wall
wl = block('<!-- wall: the paywall sits between onboarding and the dashboard -->\n<section class="scr" data-scr="wall">')
wl_new = (wl.replace('<h1 class="h1" data-t="wlH">We found 38 roles that fit you.</h1>', '<h1 class="h1" data-ob6="wlH">We found 38 roles that fit you.</h1>')
            .replace('<p class="sub" data-t="wlSub">', '<p class="sub" data-ob6="wlSub">')
            .replace('<div class="feed" style="text-align:start">', '<div class="feed" style="text-align:start" id="ob6WlFeed">')
            .replace('background:var(--wash)" data-t="wlMore">', 'background:var(--wash)" data-ob6="wlMore">'))
assert wl_new.count('data-ob6=') == 3 and 'ob6WlFeed' in wl_new
patch(wl, wl_new, 'wall: count, postings and feed follow the chosen places and the primary target market')

# ---------------------------------------------------------------- rights + tune (new, after subDone)
rights = '\n'.join([
    '',
    '<!-- rights (v6): can you work in these countries? First post-payment setup step -->',
    '<section class="scr" data-scr="rights">',
    '  ' + SETUP.format(w=17, s='rights', lab=''),
    '  <div class="body nonav">',
    '    ' + LENS.format(t='Smart Defaults + honesty.', k='ob6LensRights'),
    '    <span class="eyebrow"><span class="dot"></span> <span data-t="ob6FinEy">Finish setup</span></span>',
    '    <h2 class="h2 mt10" data-t="ob6RtH">Can you work in these countries?</h2>',
    '    <p class="mut mt6" data-t="ob6RtSub"></p>',
    '    <div id="ob6Rights"></div>',
    '  </div>',
    '  <div class="cta"><div class="ob6meta" id="ob6RtMeta"></div><button class="btn btn-b" id="ob6RtCta" data-go="profile"><span data-t="ob6Continue">Continue</span></button></div>',
    '</section>',
    '',
    '<!-- tune (v6): employer types, Auto-Apply mode, focus order (2+ places only) -->',
    '<section class="scr" data-scr="tune">',
    '  <div class="back" data-go="aboutYou"><i class="ti ti-arrow-left"></i></div>',
    '  ' + SETUP.format(w=67, s='tune', lab=''),
    '  <div class="body nonav">',
    '    ' + LENS.format(t='Smart Defaults.', k='ob6LensTune'),
    '    <h2 class="h2" data-t="ob6TuH">How should we apply?</h2>',
    '    <p class="mut mt6" data-t="ob6TuSub"></p>',
    '    <div id="ob6Focus"></div>',
    types_card,
    '    ' + auto_card,
    '  </div>',
    '  <div class="cta"><button class="btn btn-b" data-go="blocklist"><span data-t="ob6Continue">Continue</span></button></div>',
    '</section>',
    ''])
anchor = '\n\n\n<!-- swipe history: every manual decision, passes kept so they can still be applied to -->'
patch(anchor, rights + anchor, 'insert the rights and tune screens after subDone')

# ---------------------------------------------------------------- aboutYou
patch('<section class="scr" data-scr="aboutYou">\n  <div class="back" data-back><i class="ti ti-arrow-left"></i></div>\n  <div class="body nonav">\n    <span class="eyebrow"><span class="dot"></span> <span data-t="abEy">One last thing</span></span>',
      '<section class="scr" data-scr="aboutYou">\n  <div class="back" data-back><i class="ti ti-arrow-left"></i></div>\n  ' + SETUP.format(w=50, s='aboutYou', lab='') +
      '\n  <div class="body nonav">\n    <span class="eyebrow"><span class="dot"></span> <span data-t="ob6AbEy">Your profile</span></span>',
      'aboutYou: a post-payment setup step (no longer the last one)')
patch('<div class="cta"><button class="btn btn-b" data-go="autopilot"><span data-t="abCta">Looks right, continue</span> <i class="ti ti-arrow-right"></i></button></div>',
      '<div class="cta"><button class="btn btn-b" data-go="tune"><span data-t="abCta">Looks right, continue</span> <i class="ti ti-arrow-right"></i></button></div>',
      'aboutYou continues to tune')

# ---------------------------------------------------------------- autopilot + live
patch('<section class="scr" data-scr="autopilot">\n  <div class="back" data-back><i class="ti ti-arrow-left"></i></div>\n  <div class="body nonav">',
      '<section class="scr" data-scr="autopilot">\n  <div class="back" data-back><i class="ti ti-arrow-left"></i></div>\n  ' + SETUP.format(w=100, s='autopilot', lab='') + '\n  <div class="body nonav">',
      'autopilot: last setup step')
patch('<p class="sub" data-t="lvSub">It is already applying. Here is what is going out right now.</p>\n    <div class="feed mt18" style="text-align:start">',
      '<p class="sub" data-t="lvSub">It is already applying. Here is what is going out right now.</p>\n    <div class="feed mt18" style="text-align:start" id="ob6LiveFeed">',
      'live: feed rows follow the primary target market')

json.dump(P, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('wrote', OUT, len(P), 'patches')
