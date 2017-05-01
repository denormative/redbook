/* @flow */
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

import { d3, d4, d6, d8, d10, d12, d20, d100, flip, percentChance } from '../dice.js'
import oddNames from '../names/oddNames.js'
import { spellBookMu, spellBookClr, spellBookEvil } from './oddSpells.js'
import { armorOnly, shieldOnly, wand, miscMagic, clericItem, ring } from './oddMagicItems.js'
import { magicSword } from './oddMagicSwords.js'

// NPCs
function abilityMod(abilityScore) {
  // abilityScore = Math.floor((typeof level === "number") ? level : 10)
  // FIXME: above line was in there originally and it makes no sense.
  if (abilityScore <= 5) {
    return -2
  }
  else if (abilityScore <= 8) {
    return -1
  }
  else if (abilityScore <= 12) {
    return 0
  }
  else if (abilityScore <= 15) {
    return 1
  }
  return 2
}

function npcAlignment() {
  switch (d3()) {
    case 1: return "L"
    case 2: return "N"
    default: return "C"
  }
}

function npcGender() {
  const roll = d100()
  if (roll <= 1) {
    return "*"
  }
  else if (roll <= 50) {
    return "M"
  }
  return "F"
}

function rollAbilityScores() {
  return {
    str: d6(3),
    int: d6(3),
    wis: d6(3),
    con: d6(3),
    dex: d6(3),
    cha: d6(3),
  }
}

function pickAlignment(alignment: string = "", expected: string = "") {
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    if (expected !== "") {
      return expected
    }
    return npcAlignment()
  }
  return alignment
}

function pickName(gender: string) {
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  return `${name}${oddNames.epithet()}`
}

function rollHp(npc: { hd: number, hpBonus: number, con: number }) {
  // roll HP
  let hp = 0
  const conMod = abilityMod(npc.con)
  for (let i = 0; i <= npc.hd; i++) {
    let roll = d6() + conMod
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  return hp + npc.hpBonus
}

function outputNpc(npc) {
  let output = `${npc.title} ${npc.name}\n`
  output += `${npc.gender} `
  output += `${npc.alignment} `
  output += `${npc.class}${npc.level} `
  output += `S:${npc.str} `
  output += `I:${npc.int} `
  output += `W:${npc.wis} `
  output += `C:${npc.con} `
  output += `D:${npc.dex} `
  output += `X:${npc.cha} `
  output += `HP:${npc.hp} `
  output += `AC:${npc.ac} `
  output += "\n"
  if (npc.armor > 0) {
    output += `${npc.armourType} Armor +${npc.armor}\n`
  }
  if (npc.shield > 0) {
    output += `Shield +${npc.shield}\n`
  }
  if (npc.ring) {
    output += `${npc.ring}\n`
  }
  if (npc.miscItem) {
    output += `${npc.miscItem}\n`
  }
  if (npc.sword) {
    output += `${npc.sword}\n`
  }
  if (npc.spells.length > 0) {
    output += `Spells:\t${npc.spells.join("\n\t")}\n`
  }
  return `${output.trim()}\n`
}

function newNpc(klass: string = "", level: number = 1, armourType: string) {
  const npc = {
    title: "",
    class: klass,
    hd: 1,
    hpBonus: 0,
    level: level < 1 ? 1 : Math.floor(level),
    alignment: "",
    gender: npcGender(),
    name: undefined,
    ...rollAbilityScores(),
    hp: 0,
    sword: "",
    ring: "",
    miscItem: "",
    armor: 0,
    armourType,
    shield: 0,
    ac: undefined,
    spells: [],
  }
  npc.name = pickName(npc.gender)

  return npc
}

function npcFighter(level: number = 1, alignment: string = "") {
  let npc = newNpc("F", level, "Plate")
  npc.alignment = pickAlignment(alignment)

  // determine basic level derivatives
  if (npc.level <= 9) {
    npc = {
      ...npc,
      ...[
        { title: "Veteran", hd: 1, hpBonus: 1 },
        { title: "Warrior", hd: 2, hpBonus: 0 },
        { title: "Swordsman", hd: 3, hpBonus: 0 },
        { title: "Hero", hd: 4, hpBonus: 0 },
        { title: "Swashbuckler", hd: 5, hpBonus: 1 },
        { title: "Myrmidon", hd: 6, hpBonus: 0 },
        { title: "Champion", hd: 7, hpBonus: 1 },
        { title: "Superhero", hd: 8, hpBonus: 2 },
        { title: "Lord", hd: 9, hpBonus: 3 },
      ][npc.level - 1],
    }
  }
  else {
    npc = { ...npc, title: "Lord", hd: 10, hpBonus: npc.level - 9 }
  }

  npc.hp = rollHp(npc)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = magicSword()
  }
  if (percentChance(npc.level * 5)) {
    npc.armor = armorOnly()
  }
  if (percentChance(npc.level * 5)) {
    npc.shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  npc.ac = 2 - npc.armor - npc.shield - abilityMod(npc.dex)

  // generate output string
  return outputNpc(npc)
}

function npcDwarf(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("D", levelArg, "Plate")
  npc.alignment = pickAlignment(alignmentArg, "L")

  // determine basic level derivatives
  if (npc.level <= 5) {
    npc = {
      ...npc,
      ...[
        { title: "Dwarf Veteran", hd: 1, hpBonus: 1 },
        { title: "Dwarf Warrior", hd: 2, hpBonus: 0 },
        { title: "Dwarf Swordsman", hd: 3, hpBonus: 0 },
        { title: "Dwarf Hero", hd: 4, hpBonus: 0 },
        { title: "Dwarf Swashbuckler", hd: 5, hpBonus: 1 },
      ][npc.level - 1],
    }
  }
  else {
    npc = { ...npc, title: "Dwarf Myrmidon", hd: 6, hpBonus: 0 }
  }

  npc.hp = rollHp(npc)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = magicSword()
  }
  if (percentChance(npc.level * 5)) {
    npc.armor = armorOnly()
  }
  if (percentChance(npc.level * 5)) {
    npc.shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  npc.ac = 2 - npc.armor - npc.shield - abilityMod(npc.dex)

  // generate output string
  return outputNpc(npc)
}

function npcHalfling(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("H", levelArg, "Plate")
  npc.alignment = pickAlignment(alignmentArg, "L")

  // determine basic level derivatives
  if (npc.level <= 3) {
    npc = {
      ...npc,
      ...[
        { title: "Halfling Veteran", hd: 1, hpBonus: 1 },
        { title: "Halfling Warrior", hd: 2, hpBonus: 0 },
        { title: "Halfling Swordsman", hd: 3, hpBonus: 0 },
      ][npc.level - 1],
    }
  }
  else {
    npc = { ...npc, title: "Halfling Hero", hd: 4, hpBonus: 0 }
  }

  npc.hp = rollHp(npc)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = magicSword()
  }
  if (percentChance(npc.level * 5)) {
    npc.armor = armorOnly()
  }
  if (percentChance(npc.level * 5)) {
    npc.shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  npc.ac = 2 - npc.armor - npc.shield - abilityMod(npc.dex)

  // generate output string
  return outputNpc(npc)
}

function npcThief(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("T", levelArg, "Leather")
  npc.alignment = pickAlignment(alignmentArg)

  // determine basic level derivatives
  if (npc.level <= 9) {
    npc = {
      ...npc,
      ...[
        { title: "Apprentice", hd: 1, hpBonus: 0 },
        { title: "Footpad", hd: 2, hpBonus: 0 },
        { title: "Robber", hd: 3, hpBonus: 0 },
        { title: "Burglar", hd: 3, hpBonus: 1 },
        { title: "Cutpurse", hd: 4, hpBonus: 0 },
        { title: "Sharper", hd: 4, hpBonus: 1 },
        { title: "Pilferer", hd: 5, hpBonus: 0 },
        { title: "Master Pilferer", hd: 6, hpBonus: 0 },
        { title: "Thief", hd: 7, hpBonus: 0 },
      ][npc.level - 1],
    }
  }
  else {
    npc = { ...npc, title: "Master Thief", hd: 7, hpBonus: npc.level - 9 }
  }

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = magicSword()
  }
  if (percentChance(npc.level * 5)) {
    npc.armor = armorOnly()
  }
  if (percentChance(npc.level * 5)) {
    npc.ring = ring(true)
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume leather for base AC 7
  npc.ac = 7 - npc.armor - abilityMod(npc.dex)
  if (npc.ring === "Ring of Protection") {
    npc.ac = 2
  }

  // generate output string
  return outputNpc(npc)
}

function pickSpells(klass: string, spellList: Array<Array<number>>) {
  const spells = [] // eslint-disable-line
  spellList.forEach((spellpair) => {
    // console.log(...spellpair)
    switch (klass) {
      case "EC":
        spells.push(...spellBookEvil(spellpair[0], spellpair[1]))
        break
      case "C":
        spells.push(...spellBookClr(spellpair[0], spellpair[1]))
        break
      case "E":
      case "M":
        spells.push(...spellBookMu(spellpair[0], spellpair[1]))
        break
      default:
        console.error("pickSpells switch error")
        break
    }
  })
  return spells
}

function npcCleric(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("C", levelArg, "Plate")
  npc.alignment = alignmentArg
  if (!(npc.alignment === "L" || npc.alignment === "N" || npc.alignment === "C")) {
    if (npc.level >= 7) {
      npc.alignment = flip() ? "L" : "C"
    }
    else {
      npc.alignment = pickAlignment()
    }
  }

  // determine basic level derivatives
  if (npc.level <= 9) {
    npc = {
      ...npc,
      ...[
        { title: npc.alignment === "C" ? "Evil Acolyte" : "Acolyte", hd: 1, hpBonus: 0 },
        { title: npc.alignment === "C" ? "Evil Adept" : "Adept", hd: 2, hpBonus: 0, spells: [[1, 1]] },
        { title: npc.alignment === "C" ? "Evil Priest" : "Village Priest", hd: 3, hpBonus: 0, spells: [[1, 2]] },
        { title: npc.alignment === "C" ? "Shaman" : "Vicar", hd: 4, hpBonus: 0, spells: [[1, 2], [2, 1]] },
        { title: npc.alignment === "C" ? "Evil Curate" : "Curate", hd: 4, hpBonus: 1, spells: [[1, 2], [2, 2]] },
        { title: npc.alignment === "C" ? "Evil Bishop" : "Bishop", hd: 5, hpBonus: 0, spells: [[1, 2], [2, 2], [3, 1], [4, 1]] },
        {
          title: npc.alignment === "C" ? "Evil Lama" : "Lama",
          hd: 6,
          hpBonus: 0,
          spells: [[1, 2], [2, 2], [3, 2], [4, 1], [5, 1]],
        },
        {
          title: npc.alignment === "C" ? "Evil High Priest" : "Patriarch",
          hd: 7,
          hpBonus: 0,
          spells: [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]],
        },
        {
          title: npc.alignment === "C" ? "Evil High Priest" : "Patriarch",
          hd: 7,
          hpBonus: 1,
          spells: [[1, 3], [2, 3], [3, 3], [4, 2], [5, 2]],
        },
      ][npc.level - 1],
    }
  }
  else {
    npc = {
      ...npc,
      title: npc.alignment === "C" ? "Evil High Priest" : "Patriarch",
      hd: 7,
      hpBonus: npc.level - 8,
      spells: [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3]],
    }
  }
  npc.spells = pickSpells(npc.alignment === "C" ? "EC" : "C", npc.spells)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = clericItem()
  }
  if (percentChance(npc.level * 5)) {
    npc.armor = armorOnly()
  }
  if (percentChance(npc.level * 5)) {
    npc.shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  npc.ac = 2 - npc.armor - npc.shield - abilityMod(npc.dex)

  // generate output string
  return outputNpc(npc)
}

function npcWizard(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("M", levelArg, "None")
  npc.alignment = pickAlignment(alignmentArg)

  if (npc.level <= 15) {
    npc = {
      ...npc,
      ...[
        { title: "Medium", hd: 1, hpBonus: 0, spells: [[1, 1]] },
        { title: "Seer", hd: 1, hpBonus: 1, spells: [[1, 2]] },
        { title: "Conjurer", hd: 2, hpBonus: 0, spells: [[1, 3], [2, 1]] },
        { title: "Theurgist", hd: 2, hpBonus: 1, spells: [[1, 4], [2, 2]] },
        { title: "Thaumaturgist", hd: 3, hpBonus: 0, spells: [[1, 4], [2, 2], [3, 1]] },
        { title: "Magician", hd: 3, hpBonus: 1, spells: [[1, 4], [2, 2], [3, 2]] },
        { title: "Enchanter", hd: 4, hpBonus: 0, spells: [[1, 4], [2, 3], [3, 2], [4, 1]] },
        { title: "Warlock", hd: 5, hpBonus: 0, spells: [[1, 4], [2, 3], [3, 3], [4, 2]] },
        { title: "Sorcerer", hd: 6, hpBonus: 1, spells: [[1, 4], [2, 3], [3, 3], [4, 2], [5, 1]] },
        { title: "Necromancer", hd: 7, hpBonus: 0, spells: [[1, 4], [2, 4], [3, 3], [4, 3], [5, 2]] },
        { title: "Wizard", hd: 8, hpBonus: 1, spells: [[1, 4], [2, 4], [3, 4], [4, 3], [5, 4]] },
        { title: "Wizard", hd: 8, hpBonus: 2, spells: [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 1]] },
        { title: "Wizard", hd: 8, hpBonus: 3, spells: [[1, 5], [2, 5], [3, 5], [4, 4], [5, 4], [6, 2]] },
        { title: "Wizard", hd: 8, hpBonus: 3, spells: [[1, 5], [2, 5], [3, 5], [4, 4], [5, 4], [6, 3]] },
        { title: "Wizard", hd: 9, hpBonus: 1, spells: [[1, 5], [2, 5], [3, 5], [4, 4], [5, 4], [6, 4]] },
      ][npc.level - 1],
    }
  }
  else {
    npc = {
      ...npc,
      title: "Wizard",
      hd: 9,
      hpBonus: npc.level - 14,
      spells: [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]],
    }
  }
  npc.spells = pickSpells(npc.class, npc.spells)

  npc.hp = rollHp(npc)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = wand()
  }
  if (percentChance(npc.level * 5)) {
    npc.ring = ring(true)
  }
  if (percentChance(npc.level * 5)) {
    npc.miscItem = miscMagic()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume no armor for base AC 9
  npc.ac = 9
  if (npc.ring === "Ring of Protection") {
    npc.ac = 2
  }

  // generate output string
  return outputNpc(npc)
}

function npcElf(levelArg: number = 1, alignmentArg: string = "") {
  let npc = newNpc("E", levelArg, "None")
  npc.alignment = pickAlignment(alignmentArg, "L")

  if (npc.level <= 7) {
    npc = {
      ...npc,
      ...[
        { title: "Elf Veteran-Medium", hd: 1, hpBonus: 0, spells: [[1, 1]] },
        { title: "Elf Warrior-Seer", hd: 1, hpBonus: 1, spells: [[1, 2]] },
        { title: "Elf Swordsman-Conjurer", hd: 2, hpBonus: 0, spells: [[1, 3], [2, 1]] },
        { title: "Elf Hero-Theurgist", hd: 2, hpBonus: 1, spells: [[1, 4], [2, 2]] },
        { title: "Elf Hero-Thaumaturgist", hd: 3, hpBonus: 0, spells: [[1, 4], [2, 2], [3, 1]] },
        { title: "Elf Hero-Magician", hd: 3, hpBonus: 1, spells: [[1, 4], [2, 2], [3, 2]] },
        { title: "Elf Hero-Enchanter", hd: 4, hpBonus: 0, spells: [[1, 4], [2, 3], [3, 2], [4, 1]] },
      ][npc.level - 1],
    }
  }
  else {
    npc = { ...npc, title: "Elf Hero-Warlock", hd: 5, hpBonus: 0, spells: [[1, 4], [2, 3], [3, 3], [4, 2]] }
  }
  npc.spells = pickSpells(npc.class, npc.spells)

  npc.hp = rollHp(npc)

  // generate magic items
  if (percentChance(npc.level * 5)) {
    npc.sword = wand()
  }
  if (percentChance(npc.level * 5)) {
    npc.ring = ring(true)
  }
  if (percentChance(npc.level * 5)) {
    npc.miscItem = miscMagic()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume no armor for base AC 9
  npc.ac = 9
  if (npc.ring === "Ring of Protection") {
    npc.ac = 2
  }

  // generate output string
  return outputNpc(npc)
}

// OED Fighter Feats: 1 per 4 levels, starting at 4
// OED Wizard spells: 4-10 per usable spell level (2d4+2?)
// OED Wizard items: potion, scroll, wand, misc.
// OED Thief items: same as fighter


// castle encounters
function castleEncounter() {
  let result = ""
  const roll1 = d6()
  const roll2 = d4()
  if (roll1 === 1) {
    // Lord
    result += `${oddNames.castleName()}, castle of the `
    result += npcFighter(9).trim()
    if (roll2 === 1) {
      result += `\n  ${d8()} Champions`
    }
    else if (roll2 === 2) {
      result += `\n  ${d6()} Griffons ridden by Heroes`
    }
    else if (roll2 === 3) {
      result += `\n  ${d10()} Myrmidons`
    }
    else {
      result += `\n  ${d4()} Giants`
    }
    if (percentChance(25)) {
      result += `\n  Level ${d4() + 4} Magic User`
    }
    if (percentChance(50)) {
      result += `\n  Level ${d4() + 2} Cleric`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  else if (roll1 === 2) {
    // Superhero
    result += `${oddNames.castleName()}, castle of the `
    result += npcFighter(8).trim()
    if (roll2 === 1) {
      result += `\n  ${d8()} Myrmidons`
    }
    else if (roll2 === 2) {
      result += `\n  ${d4()} Rocs ridden by Heroes`
    }
    else if (roll2 === 3) {
      result += `\n  ${d4()} Ogres`
    }
    else {
      result += `\n  ${d10()} S'bucks`
    }
    if (percentChance(25)) {
      result += `\n  Level ${d4() + 4} Magic User`
    }
    if (percentChance(50)) {
      result += `\n  Level ${d4() + 2} Cleric`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  else if (roll1 === 3) {
    // Wizard
    result += `${oddNames.castleName()}, castle of the `
    result += npcWizard(11).trim()
    if (roll2 === 1) {
      result += `\n  ${d4()} Dragons`
    }
    else if (roll2 === 2) {
      result += `\n  ${d4()} Balrogs`
    }
    else if (roll2 === 3) {
      result += `\n  ${d4()} Wyverns`
    }
    else {
      result += `\n  ${d4()} Basilisks`
    }
    if (percentChance(25)) {
      result += `\n  Level ${d4() + 4} Fighting-Man`
    }
    if (percentChance(50)) {
      result += `\n  Level ${d4() + 3} Apprentice Magic-User`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  else if (roll1 === 4) {
    // Necromancer
    result += `${oddNames.castleName()}, castle of the `
    result += npcWizard(10).trim()
    if (roll2 === 1) {
      result += `\n  ${d4()} Chimerae`
    }
    else if (roll2 === 2) {
      result += `\n  ${d6()} Manticores`
    }
    else if (roll2 === 3) {
      result += `\n  ${d12()} Lycanthropes`
    }
    else {
      result += `\n  ${d12()} Gargoyles`
    }
    if (percentChance(25)) {
      result += `\n  Level ${d4() + 4} Fighting-Man`
    }
    if (percentChance(50)) {
      result += `\n  Level ${d4() + 3} Apprentice Magic-User`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  else if (roll1 === 5) {
    // Patriarch
    result += `${oddNames.castleName()}, castle of the `
    result += npcCleric(8, "L").trim()
    if (roll2 === 1) {
      result += `\n  ${d20()} Heroes`
    }
    else if (roll2 === 2) {
      result += `\n  ${d6()} Superheros`
    }
    else if (roll2 === 3) {
      result += `\n  ${d10()} Ents`
    }
    else {
      result += `\n  ${d8()} Hippogriffs ridden by Heros`
    }
    if (percentChance(50)) {
      result += `\n  ${d6()} Level ${d4() + 3} Assistant Clerics`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  else {
    // Evil High Priest
    result += `${oddNames.castleName()}, castle of the `
    result += npcCleric(8, "C").trim()
    if (roll2 === 1) {
      result += `\n  ${d10()} Trolls`
    }
    else if (roll2 === 2) {
      result += `\n  ${d6()} Vampires`
    }
    else if (roll2 === 3) {
      result += `\n  ${d20()} White Apes`
    }
    else {
      result += `\n  ${d10()} Spectres`
    }
    if (percentChance(50)) {
      result += `\n  ${d6()} Level ${d4() + 3} Assistant Clerics`
    }
    result += `\n  ${d6(3) * 10} Men-at-Arms`
  }
  return `${result.trim()}\n`
}

const oddNPCs = {
  npcFighter,
  npcDwarf,
  npcHalfling,
  npcThief,
  npcCleric,
  npcWizard,
  npcElf,
  castleEncounter,
}

export {
  oddNPCs as default,
  npcFighter,
  npcDwarf,
  npcHalfling,
  npcThief,
  npcCleric,
  npcWizard,
  npcElf,
  castleEncounter,
}
