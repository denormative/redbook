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

import { d4, d6, d8, d10, d100 } from '../dice.js'
import { magicItem, magicItemNoSwords, potion } from './oddMagicItems.js'

function gemValue() {
  let baseIndex
  let roll = d100(1)
  if (roll <= 10) {
    baseIndex = 1
  }
  else if (roll <= 25) {
    baseIndex = 2
  }
  else if (roll <= 75) {
    baseIndex = 3
  }
  else if (roll <= 90) {
    baseIndex = 4
  }
  else {
    baseIndex = 5
  }

  roll = d6()
  while (roll === 6) {
    baseIndex += 1
    roll = d6()
  }

  switch (baseIndex) {
    case 1: return 10
    case 2: return 50
    case 3: return 100
    case 4: return 500
    case 5: return 1000
    case 6: return 5000
    case 7: return 10000
    case 8: return 25000
    case 9: return 50000
    case 10: return 100000
    default: return 500000
  }
}

// oddTables.gems = function (number) {
//   var numLots, result;
//   number = (typeof number === "number") ? number : 1;
//   number = (number < 1) ? 1 : number;
//   numLots = Math.floor(number / 10);
//   number = number % 10;

//   result = "";
//   while (numLots > 0) {
//     result += "10 gems worth " + oddTables.gemValue() + "gp each\n  ";
//     numLots--;
//   }
//   if (number > 5) {
//     result += "5 gems worth " + oddTables.gemValue() + "gp each\n  ";
//     number = number - 5;
//   }
//   while (number > 0) {
//     result += "1 gem worth " + oddTables.gemValue() + "gp\n  ";
//     number--;
//   }
//   return result;
// };

function gems(numberArg) {
  let number = (typeof numberArg === "number") ? numberArg : 1
  number = (number < 1) ? 1 : number
  // let items = []
  const groups = []
  let result = ""
  while (number > 0) {
    // result += "1 gem worth " + gemValue() + "gp\n  ";
    // items.push(gemValue());
    const val = gemValue()
    if (typeof groups[val] === "number") {
      groups[val] += 1
    }
    else {
      groups[val] = 1
    }
    number -= 1
  }
  // items.sort(function(a,b){return b-a;});
  // while (number < items.length) {
  //   // result += "a gem worth " + item[number] + "gp\n  ";
  //   if (items[number] != null) {
  //     groups[items[number]] = 1;
  //   } else {
  //     groups[items[number]] = groups[items[number]] + 1;
  //   }
  //   number++;
  // }
  groups.forEach((item, index) => {
    result += `${item === 1 ? "a gem" : `${item} gems`
       } worth ${index}gp${
       item === 1 ? "" : " each"
       }\n  `
  })
  return result
}

function jewelry(numberArg) {
  let roll
  let val
  let number = (typeof numberArg === "number") ? numberArg : 1
  number = (number < 1) ? 1 : number
  // let items = []
  const groups = []
  let result = ""
  while (number > 0) {
    roll = d100(1)
    if (roll <= 20) {
      // result += "a piece of jewelry worth " + (d6(3) * 100) + "gp\n  ";
      // items.push(d6(3) * 100);
      val = d6(3) * 100
    }
    else if (roll <= 80) {
      // result += "a piece of jewelry worth " + (d6(1) * 1000) + "gp\n  ";
      // items.push(d6(1) * 1000);
      val = d6(1) * 1000
    }
    else {
      // result += "a piece of jewelry worth " + (d10(1) * 1000) + "gp\n  ";
      // items.push(d10(1) * 1000);
      val = d10(1) * 1000
    }
    if (typeof groups[val] === "number") {
      groups[val] += 1
    }
    else {
      groups[val] = 1
    }
    number -= 1
  }
  // items.sort(function(a,b){return b-a;});
  // while (number < items.length) {
  //   // result += "a piece of jewelry worth " + item[number] + "gp\n  ";
  //   if (typeof items[number] != undefined) {
  //     groups[items[number]] = 1;
  //   } else {
  //     groups[items[number]] = groups[items[number]] + 1;
  //   }
  //   number++;
  // }
  groups.forEach((item, index) => {
    result += `${item === 1 ? "a piece" : `${item} pieces`
       } of jewelry worth ${index}gp${
       item === 1 ? "" : " each"
       }\n  `
  })
  return result
}

function treasureMap() {
  let result = "Map to "
  const roll1 = d10()
  if (roll1 <= 6) {
    // map to treasure
    const roll2 = d8()
    if (roll2 <= 1) {
      result += `${d4()}0,000 silver`
    }
    else if (roll2 <= 2) {
      result += `${d6(5)}0,000 gold`
    }
    else if (roll2 <= 3) {
      result += `${d4()}0,000 silver and ${
         d6(5)}0,000 gold`
    }
    else if (roll2 <= 4) {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         gems(d10(2))}`
    }
    else if (roll2 <= 5) {
      result += `${d4()}0,000 silver, ${
         d6(5)}0,000 gold${
         gems(d6(5))}`
    }
    else if (roll2 <= 6) {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         gems(d100(1))}`
    }
    else if (roll2 <= 7) {
      result += gems(d6(1) * 10) +
        jewelry(d10(2))
    }
    else {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         gems(d6(1) * 10)
         }${jewelry(d10(2))}`
    }
  }
  else if (roll1 <= 9) {
    // map to magic
    const roll2 = d8()
    if (roll2 <= 3) {
      result += magicItem()
    }
    else if (roll2 <= 5) {
      result += `${magicItem()}\n${magicItem()}`
    }
    else if (roll2 <= 6) {
      for (let i = 0; i < 3; i++) {
        result += `${magicItemNoSwords()}\n`
      }
    }
    else if (roll2 <= 7) {
      result += `${potion(true)}\n`
      for (let i = 0; i < 3; i++) {
        result += `${magicItem()}\n`
      }
    }
    else {
      result += `${potion(true)}\n`
      result += `${scroll()}\n`
      for (let i = 0; i < 3; i++) {
        result += `${magicItem()}\n`
      }
    }
  }
  else {
    // map to magic and treasure
    const roll2 = d8()
    if (roll2 <= 1) {
      result += `${d4()}0,000 silver and ${magicItem()}`
    }
    else if (roll2 <= 2) {
      result += `${d6(5)}0,000 gold and ${magicItem()}`
    }
    else if (roll2 <= 3) {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         magicItem()}\n${
         magicItem()}\n`
    }
    else if (roll2 <= 4) {
      for (let i = 0; i < 3; i++) {
        result += `${magicItemNoSwords()}\n`
      }
      result += `another map to ${gems(d6(1) * 10)
         }${jewelry(d10(2))}`
    }
    else if (roll2 <= 5) {
      result += `${d4()}0,000 silver, ${
         gems(d6(5))
         }${magicItem()}\n${magicItem()}`
    }
    else if (roll2 <= 6) {
      result += magicItem()
      result += `another map to ${d4()}0,000 silver`
    }
    else if (roll2 <= 7) {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         gems(d100(1))}`
      result += `${potion(true)}\n`
      result += `${scroll()}\n`
      for (let i = 0; i < 3; i++) {
        result += `${magicItem()}\n`
      }
    }
    else {
      result += `${d4()}0,000 silver\n${
         d6(5)}0,000 gold\n${
         gems(d6(1) * 10)
         }${jewelry(d10(2))}`
      result += `${potion(true)}\n`
      for (let i = 0; i < 3; i++) {
        result += `${magicItem()}\n`
      }
    }
  }
  return result
}

const oddTreasure = {
  gems,
  jewelry,
  treasureMap,
}

export {
  oddTreasure as default,
  gems,
  jewelry,
  treasureMap,
}
