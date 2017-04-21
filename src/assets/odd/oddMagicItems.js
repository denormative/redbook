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

import { d6, d8, d10, d100, pick } from '../dice.js'
import { spellMuAny } from './oddSpells.js'
import { magicSword } from './oddMagicSwords.js'

// magic item tables
function armor() {
  const roll = d100(1)
  if (roll <= 30) {
    return "Shield +1"
  }
  else if (roll <= 60) {
    return "Armor +1"
  }
  else if (roll <= 75) {
    return "Armor & Shield +1"
  }
  else if (roll <= 83) {
    return "Shield +2"
  }
  else if (roll <= 90) {
    return "Armor +2"
  }
  else if (roll <= 97) {
    return "Armor & Shield +2"
  }
  return "Shield +3"
}

function armorOnly() {
  const roll = d100(1)
  if (roll <= 60) {
    return 1
  }
  return 2
}

function shieldOnly() {
  const roll = d100(1)
  if (roll <= 83) {
    return 1
  }
  else if (roll <= 97) {
    return 2
  }
  return 3
}

function miscWeapon() {
  const roll = d100(1)
  if (roll <= 25) {
    return "10 Magic Arrows"
  }
  else if (roll <= 40) {
    return `${d10(3)} Magic Arrows`
  }
  else if (roll <= 55) {
    return "Dagger +1 vs. Man-Sized Opponents, +3 vs. Orcs, " +
      "Goblins and Kobolds"
  }
  else if (roll <= 60) {
    return "Dagger +2 vs. Man-Sized Opponents, +3 vs. Orcs, " +
      "Goblins and Kobolds"
  }
  else if (roll <= 65) {
    return "Magic Bow"
  }
  else if (roll <= 70) {
    return "Axe +1"
  }
  else if (roll <= 80) {
    return "Mace +2"
  }
  else if (roll <= 85) {
    return "War Hammer +1"
  }
  else if (roll <= 89) {
    return "War Hammer +2"
  }
  else if (roll <= 90) {
    return "War Hammer +3, 6\" Throwing Range with Return"
  }
  else if (roll <= 96) {
    return "Spear +1"
  }
  else if (roll <= 99) {
    return "Spear +2"
  }
  return "Spear +3"
}

function potion(verbose?: boolean) {
  let result
  result = ""
  if (typeof verbose !== "undefined" && verbose) {
    result += "Potion of "
  }
  result += pick(["Growth", "Diminuation", "Giant Strength",
    "Invisibility", "Gaseous Form", "Polymorph (Self)",
    "Speed", "Levitation", "Flying", "ESP", "Delusion",
    "Healing", "Longevity", "Clairvoyance", "Clairaudience",
    "Animal Control", "Undead Control", "Plant Control",
    "Human Control", "Giant Control", "Dragon Control",
    "Poison", "Invulnerability", "Fire Resistance",
    "Treasure Finding", "Heroism"])
  return result
}

function spellScroll(number?: number = 1) {
  let result = "Spell Scroll ("
  for (let i = 0; i < number; i++) {
    result += spellMuAny()
    if (i <= number) {
      result += ", "
    }
  }
  result += ")"
  return result
}

function scrollCurse() {
  const roll = d8(1)
  if (roll <= 2) {
    return "Any monster of the referee's choice"
  }
  else if (roll <= 4) {
    return "Disease, fatal in 3 turns unless healed"
  }
  else if (roll <= 6) {
    return "Polymorph to insect of referee's choice"
  }
  else if (roll <= 7) {
    return "Transportation 1,000 miles, random direction"
  }
  return "Transportation to another planet"
}

function scroll() {
  const roll = d100(1)
  if (roll <= 20) {
    return spellScroll(1)
  }
  else if (roll <= 35) {
    return spellScroll(2)
  }
  else if (roll <= 45) {
    return spellScroll(3)
  }
  else if (roll <= 50) {
    return spellScroll(7)
  }
  else if (roll <= 60) {
    return `Curse Scroll: ${scrollCurse()}`
  }
  else if (roll <= 70) {
    return "Scroll of Protection: Lycanthropes"
  }
  else if (roll <= 80) {
    return "Scroll of Protection: Undead"
  }
  else if (roll <= 90) {
    return "Scroll of Protection: Elementals"
  }
  return "Scroll of Protection: Magic"
}

function ring(verbose?: boolean) {
  let result = ""
  if (typeof verbose !== "undefined" && verbose) {
    result += "Ring of "
  }
  const roll = d100(1)
  if (roll <= 9) {
    result += "Invisibility"
  }
  else if (roll <= 15) {
    result += "Mammal Control"
  }
  else if (roll <= 21) {
    result += "Human Control"
  }
  else if (roll <= 30) {
    result += "Weakness"
  }
  else if (roll <= 39) {
    result += "Protection"
  }
  else if (roll <= 49) {
    result += "Three Wishes"
  }
  else if (roll <= 60) {
    result += "Delusion"
  }
  else if (roll <= 70) {
    result += "Water Walking"
  }
  else if (roll <= 80) {
    result += "Fire Resistance"
  }
  else if (roll <= 85) {
    result += "Protection, 5' r."
  }
  else if (roll <= 90) {
    result += "Regeneration"
  }
  else if (roll <= 92) {
    result += "Djinn Summoning"
  }
  else if (roll <= 94) {
    result += "Telekenisis"
  }
  else if (roll <= 96) {
    result += "X-Ray Vision"
  }
  else if (roll <= 98) {
    result += "Spell Turning"
  }
  else if (roll <= 99) {
    result += "Spell Storing"
  }
  else {
    result += `Many Wishes (${d6(4)})`
  }
  return result
}

function wand() {
  let result = ""
  const roll = d100(1)
  if (roll <= 15) {
    result += "Wand of Metal Detection"
  }
  else if (roll <= 20) {
    result += "Wand of Enemy Detection"
  }
  else if (roll <= 25) {
    result += "Wand of Magic Detection"
  }
  else if (roll <= 30) {
    result += "Wand of Secret Doors & Traps Detection"
  }
  else if (roll <= 35) {
    result += "Wand of Illusion"
  }
  else if (roll <= 40) {
    result += "Wand of Fear"
  }
  else if (roll <= 45) {
    result += "Wand of Cold"
  }
  else if (roll <= 50) {
    result += "Wand of Paralization"
  }
  else if (roll <= 55) {
    result += "Wand of Fire Balls"
  }
  else if (roll <= 60) {
    result += "Wand of Lightning Bolts"
  }
  else if (roll <= 65) {
    result += "Wand of Polymorph"
  }
  else if (roll <= 70) {
    result += "Wand of Negation"
  }
  else if (roll <= 80) {
    result += "Staff of Healing"
  }
  else if (roll <= 85) {
    result += "Staff of Commanding"
  }
  else if (roll <= 90) {
    result += "Snake Staff"
  }
  else if (roll <= 95) {
    result += "Staff of Striking"
  }
  else if (roll <= 97) {
    result += "Staff of Withering*"
  }
  else if (roll <= 99) {
    result += "Staff of Power"
  }
  else {
    result += "Staff of Wizardry"
  }
  return result
}

function miscMagic() {
  let result = ""
  const roll = d100(1)
  if (roll <= 4) {
    result += "Crystal Ball"
  }
  else if (roll <= 6) {
    result += "Crystal Ball with Clairaudience"
  }
  else if (roll <= 7) {
    result += "Crystal Ball with ESP"
  }
  else if (roll <= 12) {
    result += "Medallion of ESP, 3\" Range"
  }
  else if (roll <= 15) {
    result += "Medallion of ESP, 9\" Range*"
  }
  else if (roll <= 18) {
    result += "Amulet vs. Crystal Balls and ESP"
  }
  else if (roll <= 24) {
    result += "Scarab of Protection from Evil High Priests"
  }
  else if (roll <= 29) {
    result += "Bag of Holding"
  }
  else if (roll <= 30) {
    result += "Censor Controlling Air Elementals"
  }
  else if (roll <= 31) {
    result += "Stone Controlling Earth Elementals"
  }
  else if (roll <= 32) {
    result += "Brazier Commanding Fire Elementals"
  }
  else if (roll <= 33) {
    result += "Bowl Commanding Water Elementals"
  }
  else if (roll <= 35) {
    result += "Efreet Bottle"
  }
  else if (roll <= 38) {
    result += "Displacer Cloak"
  }
  else if (roll <= 47) {
    result += "Elven Cloak and Boots"
  }
  else if (roll <= 52) {
    result += "Boots of Speed"
  }
  else if (roll <= 57) {
    result += "Boots of Levitation"
  }
  else if (roll <= 62) {
    result += "Boots of Traveling and Leaping"
  }
  else if (roll <= 67) {
    result += "Broom of Flying"
  }
  else if (roll <= 72) {
    result += "Helm of Reading -Magic and Languages"
  }
  else if (roll <= 75) {
    result += "Helm of Telepathy"
  }
  else if (roll <= 76) {
    result += "Helm of Teleportation"
  }
  else if (roll <= 87) {
    result += "Helm of Chaos (Law)"
  }
  else if (roll <= 88) {
    result += "Flying Carpet"
  }
  else if (roll <= 89) {
    result += "Drums of Panic, 24\" Range"
  }
  else if (roll <= 90) {
    result += "Horn of Blasting, 10\" Range"
  }
  else if (roll <= 97) {
    result += "Gauntlets of Ogre Power"
  }
  else if (roll <= 99) {
    result += "Girdle of Giant Strength"
  }
  else {
    result += "Mirror of Life Trapping"
  }
  return result
}

function clericItem() {
  let result = ""
  const roll = d100(1)
  if (roll <= 15) {
    result += "Wand of Metal Detection"
  }
  else if (roll <= 20) {
    result += "Wand of Enemy Detection"
  }
  else if (roll <= 25) {
    result += "Wand of Magic Detection"
  }
  else if (roll <= 30) {
    result += "Wand of Secret Doors & Traps Detection"
  }
  else if (roll <= 35) {
    result += "Wand of Illusion"
  }
  else if (roll <= 40) {
    result += "Wand of Fear"
  }
  else if (roll <= 45) {
    result += "Wand of Paralization"
  }
  else if (roll <= 50) {
    result += "Wand of Paralization"
  }
  else if (roll <= 60) {
    result += "Mace +2"
  }
  else if (roll <= 65) {
    result += "Hammer +1"
  }
  else if (roll <= 69) {
    result += "Hammer +2"
  }
  else if (roll <= 70) {
    result += "Hammer +3, Throwing"
  }
  else if (roll <= 80) {
    result += "Staff of Healing"
  }
  else if (roll <= 85) {
    result += "Staff of Commanding"
  }
  else if (roll <= 90) {
    result += "Snake Staff"
  }
  else if (roll <= 95) {
    result += "Staff of Striking"
  }
  else {
    result += "Staff of Withering*"
  }
  return result
}

function magicItem() {
  const roll = d100(1)
  if (roll <= 20) {
    return magicSword()
  }
  else if (roll <= 35) {
    return armor()
  }
  else if (roll <= 40) {
    return miscWeapon()
  }
  else if (roll <= 65) {
    return potion(true)
  }
  else if (roll <= 85) {
    return scroll()
  }
  else if (roll <= 90) {
    return ring(true)
  }
  else if (roll <= 95) {
    return wand()
  }
  return miscMagic()
}

function magicItemArms() {
  const roll = d6(1)
  if (roll <= 2) {
    return magicSword()
  }
  else if (roll <= 4) {
    return armor()
  }
  return miscWeapon()
}

function magicItemNoSwords() {
  let roll = d100(1)
  while (roll <= 20) {
    roll = d100(1)
  }
  if (roll <= 35) {
    return armor()
  }
  else if (roll <= 40) {
    return miscWeapon()
  }
  else if (roll <= 65) {
    return potion(true)
  }
  else if (roll <= 85) {
    return scroll()
  }
  else if (roll <= 90) {
    return ring(true)
  }
  else if (roll <= 95) {
    return wand()
  }
  return miscMagic()
}

function magicItemNoArms() {
  let roll = d100(1)
  while (roll <= 40) {
    roll = d100(1)
  }
  if (roll <= 65) {
    return potion(true)
  }
  else if (roll <= 85) {
    return scroll()
  }
  else if (roll <= 90) {
    return ring(true)
  }
  else if (roll <= 95) {
    return wand()
  }
  return miscMagic()
}

const oddMagicItems = {
  armor,
  armorOnly,
  shieldOnly,
  miscWeapon,
  potion,
  spellScroll,
  scrollCurse,
  scroll,
  ring,
  wand,
  miscMagic,
  clericItem,
  magicItem,
  magicItemArms,
  magicItemNoSwords,
  magicItemNoArms,
}

export {
  oddMagicItems as default,
  armor,
  armorOnly,
  shieldOnly,
  miscWeapon,
  potion,
  spellScroll,
  scrollCurse,
  scroll,
  ring,
  wand,
  miscMagic,
  clericItem,
  magicItem,
  magicItemArms,
  magicItemNoSwords,
  magicItemNoArms,
}
