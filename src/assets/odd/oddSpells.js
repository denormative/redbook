/*
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

import { d5, d6, chanceIn6, pick } from '../dice.js'

/* spell tables */
const spellsMu1 = ["Detect Magic", "Hold Portal", "Read Magic",
  "Read Languages", "Protection/Evil", "Light", "Charm Person",
  "Sleep"]
const spellsMu2 = ["Detect Invisible", "Levitate", "Phantasmal Forces",
  "Locate Object", "Invisibility", "Wizard Lock", "Detect Evil", "ESP",
  "Continual Light", "Knock"]
const spellsMu3 = ["Fly", "Hold Person", "Dispell Magic", "Clairvoyance",
  "Clairaudience", "Fire Ball", "Lightning Bolt",
  "Protection/Evil, 10' r.", "Invisibility, 10' r.", "Infravision",
  "Slow Spell", "Haste Spell", "Protection/Normal Missiles",
  "Water Breathing"]
const spellsMu4 = ["Polymorph Self", "Polymorph Others", "Remove Curse",
  "Wall of Fire", "Wall of Ice", "Confusion", "Charm Monster",
  "Growth/Plant", "Dimension Door", "Wizard Eye", "Massmorph",
  "Hallucinatory Terrain"]
const spellsMu5 = ["Teleport", "Hold Monster", "Conjure Elemental",
  "Telekenesis", "Transmute Rock-Mud", "Wall of Stone", "Wall of Iron",
  "Animate Dead", "Magic Jar", "Contact Higher Plane", "Pass-Wall",
  "Cloudkill", "Feeblemind", "Growth/Animal"]
const spellsMu6 = ["Stone-Flesh", "Reincarnation", "Invisible Stalker",
  "Lower Water", "Part Water", "Projected Image", "Anti-Magic Shell",
  "Death Spell", "Geas", "Disintegrate", "Move Earth",
  "Control Weather"]

function spellMuAny() {
  switch (d6()) {
    case 1: return pick(spellsMu1)
    case 2: return pick(spellsMu2)
    case 3: return pick(spellsMu3)
    case 4: return pick(spellsMu4)
    case 5: return pick(spellsMu5)
    default: return pick(spellsMu6)
  }
}

const spellsClr1 = ["Cure Light Wounds", "Purify Food & Water",
  "Detect Magic", "Detect Evil", "Protection/Evil", "Light"]
const spellsClr2 = ["Find Traps", "Hold Person", "Bless",
  "Speak with Animals"]
const spellsClr3 = ["Remove Curse", "Cure Disease", "Locate Object",
  "Continual Light"]
const spellsClr4 = ["Neutralize Poison", "Cure Serious Wounds",
  "Protection/Evil, 10'r.", "Turn sticks to snakes",
  "Speak with plants", "Create Water"]
const spellsClr5 = ["Dispell Evil", "Raise Dead", "Commune", "Quest",
  "Insect Plague", "Create Food"]

function spellClrAny() {
  switch (d5()) {
    case 1: return pick(spellsClr1)
    case 2: return pick(spellsClr2)
    case 3: return pick(spellsClr3)
    case 4: return pick(spellsClr4)
    default: return pick(spellsClr5)
  }
}

const spellsEvil1 = ["Inflict Light Wounds", "Putrify Food & Water",
  "Detect Magic", "Detect Holy", "Protection/Holy", "Darkness"]
const spellsEvil2 = ["Find Traps", "Hold Person", "Curse",
  "Speak with Animals"]
const spellsEvil3 = ["Remove Curse", "Inflict Disease", "Locate Object",
  "Continual Darkness"]
const spellsEvil4 = ["Neutralize Poison", "Inflict Serious Wounds",
  "Protection/Holy, 10'r.", "Turn sticks to snakes",
  "Speak with plants", "Create Water"]
const spellsEvil5 = ["Dispell Holy", "Finger of Death", "Commune", "Quest",
  "Insect Plague", "Create Food"]

function spellEvilAny() {
  switch (d5()) {
    case 1: return pick(spellsEvil1)
    case 2: return pick(spellsEvil2)
    case 3: return pick(spellsEvil3)
    case 4: return pick(spellsEvil4)
    default: return pick(spellsEvil5)
  }
}

function spellAny() {
  if (chanceIn6(2)) {
    return spellClrAny()
  }
  return spellMuAny()
}

function spellBookMu(level, numSpells) {
  const spells = []
  let spellArray
  switch (level) {
    case 6: spellArray = spellsMu6; break
    case 5: spellArray = spellsMu5; break
    case 4: spellArray = spellsMu4; break
    case 3: spellArray = spellsMu3; break
    case 2: spellArray = spellsMu2; break
    default: spellArray = spellsMu1; break
  }
  while (spells.length < numSpells && spells.length < spellArray.length) {
    let spell = pick(spellArray)
    while (spells.indexOf(spell) !== -1) {
      spell = pick(spellArray)
    }
    spells.push(spell)
  }
  return spells.sort()
}

function spellBookClr(level, numSpells) {
  const spells = []
  let spellArray
  switch (level) {
    case 5: spellArray = spellsClr5; break
    case 4: spellArray = spellsClr4; break
    case 3: spellArray = spellsClr3; break
    case 2: spellArray = spellsClr2; break
    default: spellArray = spellsClr1; break
  }
  while (spells.length < numSpells && spells.length < spellArray.length) {
    let spell = pick(spellArray)
    while (spells.indexOf(spell) !== -1) {
      spell = pick(spellArray)
    }
    spells.push(spell)
  }
  return spells.sort()
}

function spellBookEvil(level, numSpells) {
  const spells = []
  let spellArray
  switch (level) {
    case 5: spellArray = spellsEvil5; break
    case 4: spellArray = spellsEvil4; break
    case 3: spellArray = spellsEvil3; break
    case 2: spellArray = spellsEvil2; break
    default: spellArray = spellsEvil1; break
  }
  while (spells.length < numSpells && spells.length < spellArray.length) {
    let spell = pick(spellArray)
    while (spells.indexOf(spell) !== -1) {
      spell = pick(spellArray)
    }
    spells.push(spell)
  }
  return spells.sort()
}

const oddSpells = {
  spellMuAny,
  spellClrAny,
  spellEvilAny,
  spellAny,
  spellBookMu,
  spellBookClr,
  spellBookEvil,
}

export {
  oddSpells as default,
  spellMuAny,
  spellClrAny,
  spellEvilAny,
  spellAny,
  spellBookMu,
  spellBookClr,
  spellBookEvil,
}
