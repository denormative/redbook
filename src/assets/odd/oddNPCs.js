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

function npcFighter(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = npcAlignment()
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  let title
  let hd = 1
  let hpBonus = 0

  // determine basic level derivatives
  switch (level) {
    case 1:
      title = "Veteran"
      hd = 1
      hpBonus = 1
      break
    case 2:
      title = "Warrior"
      hd = 2
      hpBonus = 0
      break
    case 3:
      title = "Swordsman"
      hd = 3
      hpBonus = 0
      break
    case 4:
      title = "Hero"
      hd = 4
      hpBonus = 0
      break
    case 5:
      title = "Swashbuckler"
      hd = 5
      hpBonus = 1
      break
    case 6:
      title = "Myrmidon"
      hd = 6
      hpBonus = 0
      break
    case 7:
      title = "Champion"
      hd = 7
      hpBonus = 1
      break
    case 8:
      title = "Superhero"
      hd = 8
      hpBonus = 2
      break
    case 9:
      title = "Lord"
      hd = 9
      hpBonus = 3
      break
    default:
      title = "Lord"
      hd = 10
      hpBonus = level - 9
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  // roll HP
  let hp = 0
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  let sword
  let armor = 0
  let shield = 0
  // generate magic items
  if (percentChance(level * 5)) {
    sword = magicSword()
  }
  if (percentChance(level * 5)) {
    armor = armorOnly()
  }
  if (percentChance(level * 5)) {
    shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  const ac = 2 - armor - shield - abilityMod(aDex)

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `F${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (armor > 0) {
    output += `Armor +${armor}\n`
  }
  if (shield > 0) {
    output += `Shield +${shield}\n`
  }
  if (sword) {
    output += sword
  }
  output = output.trim()
  output += "\n"
  return output
}

function npcDwarf(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = "L"
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  let title
  let hd = 1
  let hpBonus = 0
  // determine basic level derivatives
  switch (level) {
    case 1:
      title = "Dwarf Veteran"
      hd = 1
      hpBonus = 1
      break
    case 2:
      title = "Dwarf Warrior"
      hd = 2
      hpBonus = 0
      break
    case 3:
      title = "Dwarf Swordsman"
      hd = 3
      hpBonus = 0
      break
    case 4:
      title = "Dwarf Hero"
      hd = 4
      hpBonus = 0
      break
    case 5:
      title = "Dwarf Swashbuckler"
      hd = 5
      hpBonus = 1
      break
    default:
      title = "Dwarf Myrmidon"
      hd = 6
      hpBonus = 0
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  let hp = 0
  // roll HP
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  let sword
  let armor = 0
  let shield = 0
  // generate magic items
  if (percentChance(level * 5)) {
    sword = magicSword()
  }
  if (percentChance(level * 5)) {
    armor = armorOnly()
  }
  if (percentChance(level * 5)) {
    shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  const ac = 2 - armor - shield - abilityMod(aDex)

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `F${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (armor > 0) {
    output += `Armor +${armor}\n`
  }
  if (shield > 0) {
    output += `Shield +${shield}\n`
  }
  if (sword) {
    output += sword
  }
  output = output.trim()
  output += "\n"
  return output
}

function npcHalfling(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = "L"
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  let title
  let hd = 1
  let hpBonus = 0
  // determine basic level derivatives
  switch (level) {
    case 1:
      title = "Halfling Veteran"
      hd = 1
      hpBonus = 1
      break
    case 2:
      title = "Halfling Warrior"
      hd = 2
      hpBonus = 0
      break
    case 3:
      title = "Halfling Swordsman"
      hd = 3
      hpBonus = 0
      break
    default:
      title = "Halfling Hero"
      hd = 4
      hpBonus = 0
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  let hp = 0
  // roll HP
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  let sword
  let armor = 0
  let shield = 0
  // generate magic items
  if (percentChance(level * 5)) {
    sword = magicSword()
  }
  if (percentChance(level * 5)) {
    armor = armorOnly()
  }
  if (percentChance(level * 5)) {
    shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  const ac = 2 - armor - shield - abilityMod(aDex)

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `F${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (armor > 0) {
    output += `Armor +${armor}\n`
  }
  if (shield > 0) {
    output += `Shield +${shield}\n`
  }
  if (sword) {
    output += sword
  }
  output = output.trim()
  output += "\n"
  return output
}

function npcThief(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = npcAlignment()
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  let title
  let hd = 1
  let hpBonus = 0
  // determine basic level derivatives
  switch (level) {
    case 1:
      title = "Apprentice"
      hd = 1
      hpBonus = 0
      break
    case 2:
      title = "Footpad"
      hd = 2
      hpBonus = 0
      break
    case 3:
      title = "Robber"
      hd = 3
      hpBonus = 0
      break
    case 4:
      title = "Burglar"
      hd = 3
      hpBonus = 1
      break
    case 5:
      title = "Cutpurse"
      hd = 4
      hpBonus = 0
      break
    case 6:
      title = "Sharper"
      hd = 4
      hpBonus = 1
      break
    case 7:
      title = "Pilferer"
      hd = 5
      hpBonus = 0
      break
    case 8:
      title = "Master Pilferer"
      hd = 6
      hpBonus = 0
      break
    case 9:
      title = "Thief"
      hd = 7
      hpBonus = 0
      break
    default:
      title = "Master Thief"
      hd = 7
      hpBonus = level - 9
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  // roll HP
  let hp = 0
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  let sword
  let armor = 0
  let ringItem
  // generate magic items
  if (percentChance(level * 5)) {
    sword = magicSword()
  }
  if (percentChance(level * 5)) {
    armor = armorOnly()
  }
  if (percentChance(level * 5)) {
    ringItem = ring(true)
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume leather for base AC 7
  let ac = 7 - armor - abilityMod(aDex)
  if (ringItem === "Ring of Protection") {
    ac = 2
  }

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `T${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (armor > 0) {
    output += `Leather Armor +${armor}\n`
  }
  if (ringItem) {
    output += `${ringItem}\n`
  }
  if (sword) {
    output += sword
  }
  output = output.trim()
  output += "\n"
  return output
}

function npcCleric(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    if (level >= 7) {
      alignment = flip() ? "L" : "C"
    }
    else {
      alignment = npcAlignment()
    }
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  let title
  let hd = 1
  let hpBonus = 0
  const spells = []
  // determine basic level derivatives
  switch (level) {
    case 1:
      title = alignment === "C" ? "Evil Acolyte" : "Acolyte"
      hd = 1
      hpBonus = 0
      break
    case 2:
      title = alignment === "C" ? "Evil Adept" : "Adept"
      hd = 2
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 1).join(", ") : spellBookClr(1, 1).join(", "))
      break
    case 3:
      title = alignment === "C" ? "Evil Priest" : "Village Priest"
      hd = 3
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      break
    case 4:
      title = alignment === "C" ? "Shaman" : "Vicar"
      hd = 4
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 1).join(", ") : spellBookClr(2, 1).join(", "))
      break
    case 5:
      title = alignment === "C" ? "Evil Curate" : "Curate"
      hd = 4
      hpBonus = 1
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 2).join(", ") : spellBookClr(2, 2).join(", "))
      break
    case 6:
      title = alignment === "C" ? "Evil Bishop" : "Bishop"
      hd = 5
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 2).join(", ") : spellBookClr(2, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(3, 1).join(", ") : spellBookClr(3, 1).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(4, 1).join(", ") : spellBookClr(4, 1).join(", "))
      break
    case 7:
      title = alignment === "C" ? "Evil Lama" : "Lama"
      hd = 6
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 2).join(", ") : spellBookClr(2, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(3, 2).join(", ") : spellBookClr(3, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(4, 1).join(", ") : spellBookClr(4, 1).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(5, 1).join(", ") : spellBookClr(5, 1).join(", "))
      break
    case 8:
      title = alignment === "C" ? "Evil High Priest" : "Patriarch"
      hd = 7
      hpBonus = 0
      spells.push(alignment === "C" ? spellBookEvil(1, 2).join(", ") : spellBookClr(1, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 2).join(", ") : spellBookClr(2, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(3, 2).join(", ") : spellBookClr(3, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(4, 2).join(", ") : spellBookClr(4, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(5, 2).join(", ") : spellBookClr(5, 2).join(", "))
      break
    case 9:
      title = alignment === "C" ? "Evil High Priest" : "Patriarch"
      hd = 7
      hpBonus = 1
      spells.push(alignment === "C" ? spellBookEvil(1, 3).join(", ") : spellBookClr(1, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 3).join(", ") : spellBookClr(2, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(3, 3).join(", ") : spellBookClr(3, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(4, 2).join(", ") : spellBookClr(4, 2).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(5, 2).join(", ") : spellBookClr(5, 2).join(", "))
      break
    default:
      title = alignment === "C" ? "Evil High Priest" : "Patriarch"
      hd = 7
      hpBonus = level - 8
      spells.push(alignment === "C" ? spellBookEvil(1, 3).join(", ") : spellBookClr(1, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(2, 3).join(", ") : spellBookClr(2, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(3, 3).join(", ") : spellBookClr(3, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(4, 3).join(", ") : spellBookClr(4, 3).join(", "))
      spells.push(alignment === "C" ? spellBookEvil(5, 3).join(", ") : spellBookClr(5, 3).join(", "))
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  // roll HP
  let hp = 0
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  let sword
  let armor = 0
  let shield = 0
  // generate magic items
  if (percentChance(level * 5)) {
    sword = clericItem()
  }
  if (percentChance(level * 5)) {
    armor = armorOnly()
  }
  if (percentChance(level * 5)) {
    shield = shieldOnly()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume plate & shield for base AC 2
  const ac = 2 - armor - shield - abilityMod(aDex)

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `C${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (armor > 0) {
    output += `Armor +${armor}\n`
  }
  if (shield > 0) {
    output += `Shield +${shield}\n`
  }
  if (sword) {
    output += `${sword}\n`
  }
  output += `Spellbook: ${spells.join("\n")}\n`
  output = output.trim()
  output += "\n"
  return output
}

function npcWizard(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = npcAlignment()
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  // determine basic level derivatives
  // determine basic level derivatives
  let title
  let hd = 1
  let hpBonus = 0
  const spells = []
  switch (level) {
    case 1:
      title = "Medium"
      hd = 1
      hpBonus = 0
      spells.push(spellBookMu(1, 1).join(", "))
      break
    case 2:
      title = "Seer"
      hd = 1
      hpBonus = 1
      spells.push(spellBookMu(1, 2).join(", "))
      break
    case 3:
      title = "Conjurer"
      hd = 2
      hpBonus = 0
      spells.push(spellBookMu(1, 3).join(", "))
      spells.push(spellBookMu(2, 1).join(", "))
      break
    case 4:
      title = "Theurgist"
      hd = 2
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      break
    case 5:
      title = "Thaumaturgist"
      hd = 3
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      spells.push(spellBookMu(3, 1).join(", "))
      break
    case 6:
      title = "Magician"
      hd = 3
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      spells.push(spellBookMu(3, 2).join(", "))
      break
    case 7:
      title = "Enchanter"
      hd = 4
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 3).join(", "))
      spells.push(spellBookMu(3, 2).join(", "))
      spells.push(spellBookMu(4, 1).join(", "))
      break
    case 8:
      title = "Warlock"
      hd = 5
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 3).join(", "))
      spells.push(spellBookMu(3, 3).join(", "))
      spells.push(spellBookMu(4, 2).join(", "))
      break
    case 9:
      title = "Sorcerer"
      hd = 6
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 3).join(", "))
      spells.push(spellBookMu(3, 3).join(", "))
      spells.push(spellBookMu(4, 2).join(", "))
      spells.push(spellBookMu(5, 1).join(", "))
      break
    case 10:
      title = "Necromancer"
      hd = 7
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 4).join(", "))
      spells.push(spellBookMu(3, 3).join(", "))
      spells.push(spellBookMu(4, 3).join(", "))
      spells.push(spellBookMu(5, 2).join(", "))
      break
    case 11:
      title = "Wizard"
      hd = 8
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 4).join(", "))
      spells.push(spellBookMu(3, 4).join(", "))
      spells.push(spellBookMu(4, 3).join(", "))
      spells.push(spellBookMu(5, 3).join(", "))
      break
    case 12:
      title = "Wizard"
      hd = 8
      hpBonus = 2
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 4).join(", "))
      spells.push(spellBookMu(3, 4).join(", "))
      spells.push(spellBookMu(4, 4).join(", "))
      spells.push(spellBookMu(5, 4).join(", "))
      spells.push(spellBookMu(6, 1).join(", "))
      break
    case 13:
      title = "Wizard"
      hd = 8
      hpBonus = 3
      spells.push(spellBookMu(1, 5).join(", "))
      spells.push(spellBookMu(2, 5).join(", "))
      spells.push(spellBookMu(3, 5).join(", "))
      spells.push(spellBookMu(4, 4).join(", "))
      spells.push(spellBookMu(5, 4).join(", "))
      spells.push(spellBookMu(6, 2).join(", "))
      break
    case 14:
      title = "Wizard"
      hd = 8
      hpBonus = 3
      spells.push(spellBookMu(1, 5).join(", "))
      spells.push(spellBookMu(2, 5).join(", "))
      spells.push(spellBookMu(3, 5).join(", "))
      spells.push(spellBookMu(4, 4).join(", "))
      spells.push(spellBookMu(5, 4).join(", "))
      spells.push(spellBookMu(6, 3).join(", "))
      break
    case 15:
      title = "Wizard"
      hd = 9
      hpBonus = 1
      spells.push(spellBookMu(1, 5).join(", "))
      spells.push(spellBookMu(2, 5).join(", "))
      spells.push(spellBookMu(3, 5).join(", "))
      spells.push(spellBookMu(4, 4).join(", "))
      spells.push(spellBookMu(5, 4).join(", "))
      spells.push(spellBookMu(6, 4).join(", "))
      break
    default:
      title = "Wizard"
      hd = 9
      hpBonus = level - 14
      spells.push(spellBookMu(1, 5).join(", "))
      spells.push(spellBookMu(2, 5).join(", "))
      spells.push(spellBookMu(3, 5).join(", "))
      spells.push(spellBookMu(4, 5).join(", "))
      spells.push(spellBookMu(5, 5).join(", "))
      spells.push(spellBookMu(6, 5).join(", "))
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  // roll HP
  let hp = 0
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  // generate magic items
  let sword
  let ringItem
  let miscItem = ""
  if (percentChance(level * 5)) {
    sword = wand()
  }
  if (percentChance(level * 5)) {
    ringItem = ring(true)
  }
  if (percentChance(level * 5)) {
    miscItem = miscMagic()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume no armor for base AC 9
  let ac = 9
  if (ringItem === "Ring of Protection") {
    ac = 2
  }

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `M${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (ringItem) {
    output += `${ringItem}\n`
  }
  if (miscItem !== "") {
    output += `${miscItem}\n`
  }
  if (sword) {
    output += `${sword}\n`
  }
  output += `Spellbook: ${spells.join("\n")}\n`
  output = output.trim()
  output += "\n"
  return output
}

function npcElf(levelArg: number = 1, alignmentArg: string = "") {
  let level = Math.floor(levelArg)
  level = (level < 1 ? 1 : level)

  // randomly pick basics
  let alignment = alignmentArg
  if (!(alignment === "L" || alignment === "N" || alignment === "C")) {
    alignment = "L"
  }
  const gender = npcGender()
  let name
  if (gender === "M" || (gender === "*" && flip())) {
    name = oddNames.masculineName()
  }
  else {
    name = oddNames.feminineName()
  }
  name += oddNames.epithet()

  // determine basic level derivatives
  // determine basic level derivatives
  let title
  let hd = 1
  let hpBonus = 0
  const spells = []
  switch (level) {
    case 1:
      title = "Efl Veteran-Medium"
      hd = 1
      hpBonus = 0
      spells.push(spellBookMu(1, 1).join(", "))
      break
    case 2:
      title = "Elf Warrior-Seer"
      hd = 1
      hpBonus = 1
      spells.push(spellBookMu(1, 2).join(", "))
      break
    case 3:
      title = "Elf Swordsman-Conjurer"
      hd = 2
      hpBonus = 0
      spells.push(spellBookMu(1, 3).join(", "))
      spells.push(spellBookMu(2, 1).join(", "))
      break
    case 4:
      title = "Elf Hero-Theurgist"
      hd = 2
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      break
    case 5:
      title = "Elf Hero-Thaumaturgist"
      hd = 3
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      spells.push(spellBookMu(3, 1).join(", "))
      break
    case 6:
      title = "Elf Hero-Magician"
      hd = 3
      hpBonus = 1
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 2).join(", "))
      spells.push(spellBookMu(3, 2).join(", "))
      break
    case 7:
      title = "Elf Hero-Enchanter"
      hd = 4
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 3).join(", "))
      spells.push(spellBookMu(3, 2).join(", "))
      spells.push(spellBookMu(4, 1).join(", "))
      break
    default:
      title = "Elf Hero-Warlock"
      hd = 5
      hpBonus = 0
      spells.push(spellBookMu(1, 4).join(", "))
      spells.push(spellBookMu(2, 3).join(", "))
      spells.push(spellBookMu(3, 3).join(", "))
      spells.push(spellBookMu(4, 2).join(", "))
      break
  }

  // roll ability scores
  const aStr = d6(3)
  const aInt = d6(3)
  const aWis = d6(3)
  const aCon = d6(3)
  const aDex = d6(3)
  const aCha = d6(3)

  // roll HP
  let hp = 0
  for (let i = 0; i <= hd; i++) {
    let roll = d6() + abilityMod(aCon)
    roll = (roll < 1) ? 1 : roll
    hp += roll
  }
  hp += hpBonus

  // generate magic items
  let sword
  let ringItem
  let miscItem = ""
  if (percentChance(level * 5)) {
    sword = wand()
  }
  if (percentChance(level * 5)) {
    ringItem = ring(true)
  }
  if (percentChance(level * 5)) {
    miscItem = miscMagic()
  }
  // OED version: sword, armor(+shield?), potion, misc.
  // default to +1, then half chance to increase by 1, repeating

  // calculate AC
  // assume no armor for base AC 9
  let ac = 9
  if (ringItem === "Ring of Protection") {
    ac = 2
  }

  // generate output string
  let output = `${title} ${name}\n`
  output += `${gender} `
  output += `${alignment} `
  output += `M${level} `
  output += `S:${aStr} `
  output += `I:${aInt} `
  output += `W:${aWis} `
  output += `C:${aCon} `
  output += `D:${aDex} `
  output += `X:${aCha} `
  output += `HP:${hp} `
  output += `AC:${ac} `
  output += "\n"
  if (ringItem) {
    output += `${ringItem}\n`
  }
  if (miscItem !== "") {
    output += `${miscItem}\n`
  }
  if (sword) {
    output += `${sword}\n`
  }
  output += `Spellbook: ${spells.join("\n")}\n`
  output = output.trim()
  output += "\n"
  return output
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
