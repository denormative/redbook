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

import { d3, d4, d6, d8, d10, d12, d100, percentChance } from '../dice.js'
import { gems, jewelry, treasureMap } from './oddTreasure.js'
import { magicItem, magicItemArms, potion, magicItemNoArms, scroll } from './oddMagicItems.js'

// treasure table I
function treasureTypeA() {
  let result = "Treasure Type A (Land)"
  if (percentChance(25)) {
    result += `\n  ${d6(1) * 1000}cp`
  }
  if (percentChance(30)) {
    result += `\n  ${d6(1) * 1000}sp`
  }
  if (percentChance(35)) {
    result += `\n  ${d6(2) * 1000}gp`
  }
  if (percentChance(50)) {
    result += `\n  ${gems(d6(6)).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d6(6)).trim()}`
  }
  if (percentChance(40)) {
    for (let i = 0; i < 3; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeADesert() {
  let result = "Treasure Type A (Desert)"
  if (percentChance(20)) {
    result += `\n  ${d4(1) * 1000}cp`
  }
  if (percentChance(25)) {
    result += `\n  ${d4(1) * 1000}sp`
  }
  if (percentChance(30)) {
    result += `\n  ${d6(1) * 1000}gp`
  }
  if (percentChance(50)) {
    result += `\n  ${gems(d4(1) * 10).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d4(1) * 10).trim()}`
  }
  if (percentChance(60)) {
    for (let i = 0; i < 3; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeAWater() {
  let result = "Treasure Type A (Water)"
  if (percentChance(60)) {
    result += `\n  ${d6(5) * 1000}gp`
  }
  if (percentChance(60)) {
    result += `\n  ${gems(d6(1) * 10).trim()}`
  }
  if (percentChance(60)) {
    result += `\n  ${jewelry(d6(1) * 10).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${treasureMap().trim()}`
  }
  result += "\n"
  return result
}

function treasureTypeB() {
  let result = "Treasure Type B"
  if (percentChance(50)) {
    result += `\n  ${d8(1) * 1000}cp`
  }
  if (percentChance(25)) {
    result += `\n  ${d6(1) * 1000}sp`
  }
  if (percentChance(25)) {
    result += `\n  ${d3(2) * 1000}gp`
  }
  if (percentChance(25)) {
    result += `\n  ${gems(d6(1)).trim()}`
  }
  if (percentChance(25)) {
    result += `\n  ${jewelry(d6(1)).trim()}`
  }
  if (percentChance(10)) {
    result += `\n  ${magicItemArms().trim()}`
  }
  result += "\n"
  return result
}

function treasureTypeC() {
  let result = "Treasure Type C"
  if (percentChance(20)) {
    result += `\n  ${d12(1) * 1000}cp`
  }
  if (percentChance(30)) {
    result += `\n  ${d4(1) * 1000}sp`
  }
  if (percentChance(25)) {
    result += `\n  ${gems(d4(1)).trim()}`
  }
  if (percentChance(25)) {
    result += `\n  ${jewelry(d4(1)).trim()}`
  }
  if (percentChance(40)) {
    for (let i = 0; i < 2; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeD() {
  let result = "Treasure Type D"
  if (percentChance(10)) {
    result += `\n  ${d8(1) * 1000}cp`
  }
  if (percentChance(15)) {
    result += `\n  ${d12(1) * 1000}sp`
  }
  if (percentChance(60)) {
    result += `\n  ${d6(1) * 1000}gp`
  }
  if (percentChance(30)) {
    result += `\n  ${gems(d8(1)).trim()}`
  }
  if (percentChance(30)) {
    result += `\n  ${jewelry(d8(1)).trim()}`
  }
  if (percentChance(40)) {
    result += `\n  ${potion(true)}`
    for (let i = 0; i < 2; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeE() {
  let result = "Treasure Type E"
  if (percentChance(5)) {
    result += `\n  ${d10(1) * 1000}cp`
  }
  if (percentChance(30)) {
    result += `\n  ${d12(1) * 1000}sp`
  }
  if (percentChance(25)) {
    result += `\n  ${d8(1) * 1000}gp`
  }
  if (percentChance(10)) {
    result += `\n  ${gems(d10(1)).trim()}`
  }
  if (percentChance(10)) {
    result += `\n  ${jewelry(d10(1)).trim()}`
  }
  if (percentChance(40)) {
    result += `\n  ${scroll(true)}`
    for (let i = 0; i < 3; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeF() {
  let result = "Treasure Type F"
  if (percentChance(10)) {
    result += `\n  ${d10(2) * 1000}sp`
  }
  if (percentChance(25)) {
    result += `\n  ${d12(1) * 1000}gp`
  }
  if (percentChance(20)) {
    result += `\n  ${gems(d12(2)).trim()}`
  }
  if (percentChance(20)) {
    result += `\n  ${jewelry(d12(2)).trim()}`
  }
  if (percentChance(35)) {
    result += `\n  ${potion(true).trim()}`
    result += `\n  ${scroll(true).trim()}`
    for (let i = 0; i < 3; i++) {
      result += `\n  ${magicItemNoArms().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeG() {
  let result = "Treasure Type G"
  if (percentChance(75)) {
    result += `\n  ${d4(1) * 10000}gp`
  }
  if (percentChance(25)) {
    result += `\n  ${gems(d6(3)).trim()}`
  }
  if (percentChance(25)) {
    result += `\n  ${jewelry(d10(1)).trim()}`
  }
  if (percentChance(40)) {
    result += `\n  ${scroll(true).trim()}`
    for (let i = 0; i < 4; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeH() {
  let result = "Treasure Type H"
  if (percentChance(25)) {
    result += `\n  ${d8(3) * 1000}cp`
  }
  if (percentChance(50)) {
    result += `\n  ${d100(1) * 1000}sp`
  }
  if (percentChance(75)) {
    result += `\n  ${d6(1) * 10000}gp`
  }
  if (percentChance(50)) {
    result += `\n  ${gems(d100(1)).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d4(1) * 10).trim()}`
  }
  if (percentChance(20)) {
    result += `\n  ${potion(true).trim()}`
    result += `\n  ${scroll(true).trim()}`
    for (let i = 0; i < 4; i++) {
      result += `\n  ${magicItem().trim()}`
    }
  }
  result += "\n"
  return result
}

function treasureTypeI() {
  let result = "Treasure Type I"
  if (percentChance(50)) {
    result += `\n  ${gems(d8(2)).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d8(2)).trim()}`
  }
  if (percentChance(20)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

// treasure table II
function treasureLevel1() {
  let result = "Level 1 Treasure"
  result += `\n  ${d12(1) * 100}sp`
  result += `\n  ${d6(1) * 10}gp`
  if (percentChance(5)) {
    result += `\n  ${gems(d6(1)).trim()}`
  }
  if (percentChance(5)) {
    result += `\n  ${jewelry(d6(1)).trim()}`
  }
  if (percentChance(5)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel2to3() {
  let result = "Level 2-3 Treasure"
  result += `\n  ${d12(1) * 100}sp`
  result += `\n  ${d6(1) * 100}gp`
  if (percentChance(10)) {
    result += `\n  ${gems(d6(1)).trim()}`
  }
  if (percentChance(10)) {
    result += `\n  ${jewelry(d6(1)).trim()}`
  }
  if (percentChance(5)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel4to5() {
  let result = "Level 4-5 Treasure"
  result += `\n  ${d12(1) * 1000}sp`
  result += `\n  ${d6(1) * 200}gp`
  if (percentChance(20)) {
    result += `\n  ${gems(d6(1)).trim()}`
  }
  if (percentChance(20)) {
    result += `\n  ${jewelry(d6(1)).trim()}`
  }
  if (percentChance(10)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel6to7() {
  let result = "Level 6-7 Treasure"
  result += `\n  ${d12(1) * 2000}sp`
  result += `\n  ${d6(1) * 500}gp`
  if (percentChance(30)) {
    result += `\n  ${gems(d6(1)).trim()}`
  }
  if (percentChance(30)) {
    result += `\n  ${jewelry(d6(1)).trim()}`
  }
  if (percentChance(15)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel8to9() {
  let result = "Level 8-9 Treasure"
  result += `\n  ${d12(1) * 5000}sp`
  result += `\n  ${d6(1) * 1000}gp`
  if (percentChance(40)) {
    result += `\n  ${gems(d12(1)).trim()}`
  }
  if (percentChance(40)) {
    result += `\n  ${jewelry(d12(1)).trim()}`
  }
  if (percentChance(20)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel10to12() {
  let result = "Level 10-12 Treasure"
  result += `\n  ${d12(1) * 5000}sp`
  result += `\n  ${d6(1) * 2000}gp`
  if (percentChance(50)) {
    result += `\n  ${gems(d12(1)).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d12(1)).trim()}`
  }
  if (percentChance(25)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

function treasureLevel13() {
  let result = "Level 13+ Treasure"
  result += `\n  ${d12(1) * 10000}sp`
  result += `\n  ${d6(1) * 5000}gp`
  if (percentChance(50)) {
    result += `\n  ${gems(d12(1)).trim()}`
  }
  if (percentChance(50)) {
    result += `\n  ${jewelry(d12(1)).trim()}`
  }
  if (percentChance(30)) {
    result += `\n  ${magicItem().trim()}`
  }
  result += "\n"
  return result
}

const oddTreasureTables = {
  treasureTypeA,
  treasureTypeADesert,
  treasureTypeAWater,
  treasureTypeB,
  treasureTypeC,
  treasureTypeD,
  treasureTypeE,
  treasureTypeF,
  treasureTypeG,
  treasureTypeH,
  treasureTypeI,
  treasureLevel1,
  treasureLevel2to3,
  treasureLevel4to5,
  treasureLevel6to7,
  treasureLevel8to9,
  treasureLevel10to12,
  treasureLevel13,
}

export {
  oddTreasureTables as default,
}
