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

import { d4, d12, d100, pick } from '../dice.js'

function basicLawfulSword() {
  const result = d100(1)
  if (result <= 35) {
    return "Sword +1"
  }
  else if (result <= 40) {
    return "Sword +1, +2 vs Lycanthropes"
  }
  else if (result <= 45) {
    return "Sword +1, +2 vs. Magic-Users and Enchanted Monsters"
  }
  else if (result <= 50) {
    return "Sword +1, Locating Objects Ability"
  }
  else if (result <= 60) {
    return "Sword +1 , +3 vs. Tresults"
  }
  else if (result <= 65) {
    return "Sword, Flaming: +1, +2 vs. Tresults, +3 vs. Undead"
  }
  else if (result <= 70) {
    return `Sword +1, Wishes Included (${d4(2)})`
  }
  else if (result <= 75) {
    return "Sword +1, +3 vs. Dragons"
  }
  else if (result <= 78) {
    return "Sword +2"
  }
  else if (result <= 80) {
    return "Sword +2, Charm Person Ability"
  }
  else if (result <= 82) {
    return "Sword +3"
  }
  else if (result <= 83) {
    return "Sword, One Life Energy Draining Ability"
  }
  return "Sword -2 (Cursed Sword)"
}

function basicChaoticSword() {
  const result = d100(1)
  if (result <= 35) {
    return "Sword +1"
  }
  else if (result <= 40) {
    return "Sword +1, +2 vs Lycanthropes"
  }
  else if (result <= 45) {
    return "Sword +1, +2 vs. Magic-Users and Enchanted Monsters"
  }
  else if (result <= 50) {
    return "Sword +1, Locating Objects Ability"
  }
  else if (result <= 60) {
    return "Sword +1 , +3 vs. Clerics"
  }
  else if (result <= 65) {
    return "Sword, Flaming: +1, +2 vs. Pegasi, Hippogriffs, " +
    "Rocs, +3 vs. Treants"
  }
  else if (result <= 70) {
    return `Sword +1, Wishes Included (${d4(2)})`
  }
  else if (result <= 75) {
    return "Sword +1, +3 vs. Dragons"
  }
  else if (result <= 78) {
    return "Sword +2"
  }
  else if (result <= 80) {
    return "Sword +2, Charm Person Ability"
  }
  else if (result <= 82) {
    return "Sword +3"
  }
  else if (result <= 83) {
    return "Sword, One Life Energy Draining Ability"
  }
  return "Sword -2 (Cursed Sword)"
}

function magicSwordExtraordinaryAbilities(result) {
  if (result <= 10) {
    return "Clairaudience"
  }
  else if (result <= 20) {
    return "Clairvoyance"
  }
  else if (result <= 30) {
    return "ESP"
  }
  else if (result <= 40) {
    return "Telepathy"
  }
  else if (result <= 50) {
    return "Telekenesis"
  }
  else if (result <= 59) {
    return "Teleportation"
  }
  else if (result <= 68) {
    return "X-Ray Vision"
  }
  else if (result <= 77) {
    return "Illusion Generation"
  }
  else if (result <= 82) {
    return "Levitation"
  }
  else if (result <= 87) {
    return "Flying"
  }
  else if (result <= 92) {
    return "Healing"
  }
  else if (result <= 97) {
    return "1-4 Times Normal Strength for 1-10 Turns Employable Once/Day"
  }
  throw new Error("Invalid result for magicSwordExtraordinaryAbilities")
}

function magicSwordPrimaryPowers(result) {
  if (result <= 15) {
    return "Note Shifting Walls & Rooms"
  }
  else if (result <= 30) {
    return "Detect Sloping Passages"
  }
  else if (result <= 40) {
    return "Locate Secret Doors"
  }
  else if (result <= 50) {
    return "Detect Traps"
  }
  else if (result <= 60) {
    return "See Invisible Objects"
  }
  else if (result <= 70) {
    return "Detect Evil and/or Gold"
  }
  else if (result <= 80) {
    return "Detect Meal & What Kind"
  }
  else if (result <= 90) {
    return "Detect Magic"
  }
  else if (result <= 95) {
    return "Detect Gems (# and Size)"
  }
  throw new Error("Invalid result for magicSwordExtraordinaryAbilities")
}

function magicSwordLanguages(/* roll */) {
  // TODO: This original code here had no effect; result not used.
  // let result = 0
  // if (roll === 100) {
  //   while (roll === 100) {
  //     roll = d100(1)
  //   }
  //   result += magicSwordLanguages(roll)
  // }
  let roll = d100(1)
  while (roll === 100) {
    roll = d100(1)
  }
  if (roll <= 50) {
    return 1
  }
  else if (roll <= 70) {
    return 2
  }
  else if (roll <= 85) {
    return 3
  }
  else if (roll <= 95) {
    return 4
  }
  else if (roll <= 99) {
    return 5
  }
  throw new Error("Invalid roll for magicSwordLanguages")
}

function magicSword() {
  let roll
  let result
  let i
  let alignment
  let baseSword
  let intelligence
  let ego
  let egoBonus
  let communication
  let numPrimaryPowers
  let numExtraordinaryAbilities
  // let languages
  let specialPurpose
  roll = d100()
  if (roll <= 65) {
    alignment = "Lawful"
    baseSword = basicLawfulSword()
  }
  else if (roll <= 90) {
    alignment = "Neutral"
    baseSword = basicLawfulSword()
  }
  else {
    alignment = "Chaotic"
    baseSword = basicChaoticSword()
  }

  const powers = []
  intelligence = d12()

  if (intelligence <= 6) {
    ego = 0
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 0
    communication = "None"
  }
  else if (intelligence <= 7) {
    ego = d12()
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 1
    communication = "Empathy"
  }
  else if (intelligence <= 8) {
    ego = d12()
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 2
    communication = "Empathy"
  }
  else if (intelligence <= 9) {
    ego = d12()
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 3
    communication = "Empathy"
  }
  else if (intelligence <= 10) {
    ego = d12()
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 3
    communication = `Speaks ${
       magicSwordLanguages(d100(1))}`
  }
  else if (intelligence <= 11) {
    ego = d12()
    numExtraordinaryAbilities = 0
    numPrimaryPowers = 3
    communication = `Speaks ${
       magicSwordLanguages(d100(1))}`
    powers[powers.length] = "Read Magic"
  }
  else {
    ego = d12()
    numExtraordinaryAbilities = 1
    numPrimaryPowers = 3
    communication = `Telepathy and speaks ${
       magicSwordLanguages(d100(1))}`
    powers[powers.length] = "Read Magic"
  }

  roll = d100(1)
  if (roll >= 91) {
    if (alignment === "Chaotic") {
      specialPurpose = `Special Purpose: ${
         pick(["Slay Magic-Users", "Slay Clerics", "Slay Fighting-Men", "Slay Monsters", "Defeat Law"])
         }, disintigrates Lawful oppenents`
    }
    else if (alignment === "Lawful") {
      specialPurpose = `Special Purpose: ${
         pick(["Slay Magic-Users", "Slay Clerics", "Slay Fighting-Men", "Slay Monsters", "Defeat Chaos"])
         }, paralyzes Chaotic opponents`
    }
    else {
      specialPurpose = `Special Purpose: ${
         pick(["Slay Magic-Users", "Slay Clerics", "Slay Fighting-Men", "Slay Monsters", "Defeat Law", "Defeat Chaos"])
         }, adds +1 to all saving throws`
    }
    ego = 12
    intelligence = 12
    numExtraordinaryAbilities = 1
    numPrimaryPowers = 3
    communication = `Telepathy and speaks ${magicSwordLanguages(d100(1))}`
    powers[powers.length] = "Read Magic"
  }

  for (i = numPrimaryPowers; i > 0; i--) {
    roll = d100(1)
    if (roll >= 96 && roll <= 99) {
      numPrimaryPowers += 1
    }
  }
  while (numPrimaryPowers > 0) {
    roll = d100(1)
    if (roll === 100) {
      numExtraordinaryAbilities += 1
    }
    else {
      while (roll >= 96) {
        roll = d100(1)
      }
      powers[powers.length] =
        magicSwordPrimaryPowers(roll)
      numPrimaryPowers -= 1
    }
  }

  for (i = numExtraordinaryAbilities; i > 0; i--) {
    roll = d100(1)
    if (roll >= 98 && roll <= 99) {
      numExtraordinaryAbilities += 1
    }
    else if (roll === 100) {
      numExtraordinaryAbilities += 2
    }
  }
  while (numExtraordinaryAbilities > 0) {
    roll = d100(1)
    while (roll >= 98) {
      roll = d100(1)
    }
    powers[powers.length] =
      magicSwordExtraordinaryAbilities(roll)
    egoBonus += 1
    numExtraordinaryAbilities -= 1
  }

  result = `${alignment} ${baseSword}`
  if (intelligence >= 7) {
    result += `\n  Int: ${intelligence
       } Ego: ${ego
       }${egoBonus ? (`+${egoBonus}`) : ""
       }, ${communication}`
  }
  if (specialPurpose) {
    result += `\n  ${specialPurpose}`
  }
  for (i = 0; i < powers.length; i++) {
    result += `\n  ${powers[i]}`
  }
  return result
}


const oddMagicSwords = {
  magicSword,
}

export {
  oddMagicSwords as default,
  magicSword,
}
