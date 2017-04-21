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

import { d2, d3, d4, d6, d10, d100, flip, chanceIn6 } from '../dice.js'
import oddNames from '../oddNames.js'
import oddMonsters from './oddMonsters.js'
import { npcFighter, npcWizard, npcCleric } from './oddNPCs.js'
import oddTreasureTables from './oddTreasureTables.js'

/* Encounters */
function village() {
  const numberEncountered = d4() * 10 // number of 10-person figures of fyrd
  const fyrd = numberEncountered * 10
  const population = fyrd * 5
  const taxes = fyrd * 10

  const foot = Math.round(numberEncountered * 0.6)
  const archers = Math.round(numberEncountered * 0.4)
  const sarges = Math.floor(numberEncountered / 3)
  const louies = Math.floor(numberEncountered / 5)
  const captains = Math.floor(numberEncountered / 10)

  const clerics = []
  const mages = []
  if (d4() >= 4) {
    clerics.push(flip() ? 6 : 7)
  }
  if ((fyrd >= 300 && flip()) || (d4() >= 4)) {
    mages.push(d6() + 6)
    if (flip()) {
      mages.push(1)
    }
  }

  const fighters = []
  for (let i = 0; i < sarges; i++) {
    fighters.push(4)
  }
  for (let i = 0; i < louies; i++) {
    fighters.push(flip() ? 5 : 6)
  }
  for (let i = 0; i < captains; i++) {
    fighters.push(flip() ? 8 : 9)
  }

  let name
  let noun
  if (fyrd <= 200 && flip()) {
    name = oddNames.hamletName()
    noun = "hamlet"
    if (flip()) {
      clerics.push(2) // adept, hamlet has shrine or chapel
    }
  }
  else if (fyrd >= 300 && flip()) {
    name = oddNames.townName()
    noun = "town"
    clerics.push(d6() + 2) // village priest to partriarch
    clerics.push(d2())
  }
  else {
    name = oddNames.villageName()
    noun = "village"
    clerics.push(d3() + 2) // village priest to curate
    if (flip()) {
      clerics.push(1)
    }
  }

  let result = `${name} (${noun}, population ${population})\n`
  result += `TaxRevenue: ${taxes}gp\n`
  result += "Fyrd: \n"
  if (foot > 0) {
    result += `  ${oddMonsters.lightfoot.shortDesc(10 * foot)}\n`
  }
  if (archers > 0) {
    result += `  ${oddMonsters.archer.shortDesc(10 * archers)}\n`
  }

  result += "Notable Residents: \n"

  fighters.sort()
  clerics.sort()
  mages.sort()

  for (let i = 0; i < fighters.length; i++) {
    result += `${npcFighter(fighters[i])}\n`
  }

  for (let i = 0; i < mages.length; i++) {
    result += `${npcWizard(mages[i])}\n`
  }

  for (let i = 0; i < clerics.length; i++) {
    result += `${npcCleric(clerics[i])}\n`
  }

  // TODO: fix treasure type

  return result
}

function bandits() {
  // this is the common interpretation; older sources say 1d10 * 3 figures
  let numberEncountered = d10(3) // number of 10-person figures
  const foot = Math.round(numberEncountered * 0.4)
  numberEncountered -= foot
  const archers = Math.round(numberEncountered * 0.5)
  numberEncountered -= archers
  const lightCav = Math.round(numberEncountered * 0.66)
  numberEncountered -= lightCav
  const medCav = numberEncountered
  numberEncountered = foot + archers + lightCav + medCav
  const prisoners = Math.round(numberEncountered / 2)

  const sarges = Math.floor(numberEncountered / 3)
  const louies = Math.floor(numberEncountered / 5)
  const captains = Math.floor(numberEncountered / 10)

  let mages
  let clerics
  if (numberEncountered === 30) {
    mages = 1
    clerics = flip() ? 1 : 0
  }
  else {
    mages = flip() ? 1 : 0
    clerics = d4() >= 4 ? 1 : 0
  }

  const fighters = []
  for (let i = 0; i < sarges; i++) {
    fighters.push(4)
  }
  for (let i = 0; i < louies; i++) {
    fighters.push(flip() ? 5 : 6)
  }
  for (let i = 0; i < captains; i++) {
    fighters.push(flip() ? 8 : 9)
  }

  let result = "Bandits\n"
  if (foot > 0) {
    // result += "  " + 10*foot + " light foot" + "\n";
    result += `  ${oddMonsters.lightfoot.shortDesc(10 * foot)}\n`
  }
  if (archers > 0) {
    result += `  ${oddMonsters.archer.shortDesc(10 * archers)}\n`
  }
  if (lightCav > 0) {
    result += `  ${oddMonsters.lightcavalry.shortDesc(10 * lightCav)}\n`
  }
  if (medCav > 0) {
    result += `  ${oddMonsters.mediumcavalry.shortDesc(10 * medCav)}\n`
  }

  result += "\n"

  for (let i = 0; i < fighters.length; i++) {
    result += `${npcFighter(fighters[i], "N")}\n`
  }

  for (let i = 0; i < mages; i++) {
    result += `${npcWizard(chanceIn6(4) ? 10 : 11, "N")}\n`
  }

  for (let i = 0; i < clerics; i++) {
    result += `${npcCleric(8)}\n`
  }

  // TODO: fix treasure type
  // result += oddMonsters.bandit.treasureType();
  // older sources indicate 2-10 prisoners

  // result += treasureTypeALand();
  result += oddMonsters.bandit.treasureType()
  if (prisoners > 0) {
    result += `  ${prisoners} prisoners`
  }


  return result
}

function brigands() {
  // this is the common interpretation; older sources say 1d10 * 3 figures
  let numberEncountered = d10(3) // number of 10-person figures
  const foot = Math.round(numberEncountered * 0.4)
  numberEncountered -= foot
  const archers = Math.round(numberEncountered * 0.5)
  numberEncountered -= archers
  const lightCav = Math.round(numberEncountered * 0.66)
  numberEncountered -= lightCav
  const medCav = numberEncountered
  numberEncountered = foot + archers + lightCav + medCav
  const prisoners = Math.round(numberEncountered / 2)

  const sarges = Math.floor(numberEncountered / 3)
  const louies = Math.floor(numberEncountered / 5)
  const captains = Math.floor(numberEncountered / 10)

  let mages
  let clerics
  if (numberEncountered === 30) {
    mages = 1
    clerics = flip() ? 1 : 0
  }
  else {
    mages = flip() ? 1 : 0
    clerics = d4() >= 4 ? 1 : 0
  }

  const fighters = []
  for (let i = 0; i < sarges; i++) {
    fighters.push(4)
  }
  for (let i = 0; i < louies; i++) {
    fighters.push(flip() ? 5 : 6)
  }
  for (let i = 0; i < captains; i++) {
    fighters.push(flip() ? 8 : 9)
  }

  let result = "Brigands\n"
  if (foot > 0) {
    // result += "  " + 10*foot + " light foot" + "\n";
    result += `  ${oddMonsters.lightfoot.shortDesc(10 * foot)}\n`
  }
  if (archers > 0) {
    result += `  ${oddMonsters.archer.shortDesc(10 * archers)}\n`
  }
  if (lightCav > 0) {
    result += `  ${oddMonsters.lightcavalry.shortDesc(10 * lightCav)}\n`
  }
  if (medCav > 0) {
    result += `  ${oddMonsters.mediumcavalry.shortDesc(10 * medCav)}\n`
  }

  result += "\n"

  for (let i = 0; i < fighters.length; i++) {
    result += `${npcFighter(fighters[i], "C")}\n`
  }

  for (let i = 0; i < mages; i++) {
    result += `${npcWizard(chanceIn6(4) ? 10 : 11, "C")}\n`
  }

  for (let i = 0; i < clerics; i++) {
    result += `${npcCleric(8, "C")}\n`
  }

  // TODO: fix treasure type
  // result += oddMonsters.bandit.treasureType();
  // older sources indicate 2-10 prisoners

  result += oddTreasureTables.treasureTypeA()
  if (prisoners > 0) {
    result += `  ${prisoners} prisoners`
  }

  return result
}

function orcs() {
  // this is the common interpretation; older sources say 1d10 * 3 figures
  let numberEncountered = d10(3) // number of 10-person figures
  const foot = numberEncountered
  numberEncountered = foot

  const fighters = []
  const mages = []
  const beasts = []
  let lair
  if (d6() >= 5) {
    lair = "village"
    if (d100 <= ((25 * numberEncountered) / 10)) {
      switch (d6()) {
        case 1: fighters.push(7)
          break
        case 2:
        case 3:
        case 4: fighters.push(8)
          break
        case 5:
        case 6:
        default: fighters.push(9)
      }
    }
    if (d100() <= (numberEncountered)) {
      mages.push(11)
    }
    if (d100() <= ((15 * numberEncountered) / 5)) {
      beasts.push(d6() + oddMonsters.ogre.shortDesc())
    }
  }
  else {
    lair = "cave complex"
    if (d100() <= ((10 * numberEncountered) / 5)) {
      beasts.push(d6() + oddMonsters.ogre.shortDesc())
    }
    if (d100() <= (numberEncountered)) {
      beasts.push(d4() + oddMonsters.troll.shortDesc())
    }
    if (d100() <= (numberEncountered)) {
      beasts.push(oddMonsters.reddragon.shortDesc())
    }
    if (d100() <= ((25 * numberEncountered) / 10)) {
      // First print M & T, pg 7: 25% chance of a Balrog per 100 Orcs in a Cave Complex, Nil chance in a Village
      beasts.push(oddMonsters.balrog.shortDesc())
    }
  }

  let result = `Orc ${lair}\n`
  result += `  ${oddMonsters.orc.shortDesc(10 * foot)}\n`

  for (let i = 0; i < fighters.length; i++) {
    result += `${npcFighter(fighters[i], "C")}\n`
  }

  for (let i = 0; i < mages.length; i++) {
    result += `${npcWizard(chanceIn6(4) ? 10 : 11, "C")}\n`
  }

  for (let i = 0; i < beasts.length; i++) {
    result += `${beasts[i]}\n`
  }

  // TODO: fix treasure type
  result += oddTreasureTables.treasureTypeD()

  return result
}

// http://odd74.proboards.com/thread/7606/analysis-od-treasure-types
// includes image of treasure table including prisoners
// 2-10 or 2 per 10 for type A water & land, 1-20  or 1 per 20 for type A desert

const oddEncounters = {
  village,
  bandits,
  brigands,
  orcs,
}

export {
  oddEncounters as default,
  village,
  bandits,
  brigands,
  orcs,
}
