/* @flow */

/* basic randomization helpers */
function randomIntFromInterval (min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min)
}

/* core dice/numeric functions */
function d (numberArg?: number, sidesArg?: number) {
  let num = (typeof numberArg === "number") ? numberArg : 1
  num = (num < 1) ? 1 : num
  let sides = (typeof sidesArg === "number") ? sidesArg : 6
  sides = (sides < 2) ? 2 : sides
  let result = 0
  for (let i = 0; i < num; i += 1) {
    result += randomIntFromInterval(1, sides)
  }
  return result
}

function fudge (numberArg?: number) {
  let number = (typeof numberArg === "number") ? numberArg : 1
  number = (number < 1) ? 1 : number
  let result = 0
  for (let i = 0; i < number; i += 1) {
    result += randomIntFromInterval(1, 3) - 2
  }
  return result
}

/* list convenience functions */
function pick (list: mixed) {
  // if it's an array, return a random element
  if (Array.isArray(list)) {
    return list[randomIntFromInterval(0, list.length - 1)]
  }
  else if (typeof list === "object") {
    // if it's an object, return a random property
    const newList = []
    for (const key in list) { // eslint-disable-line
      if (list.hasOwnProperty(key)) { // eslint-disable-line
        newList[newList.length] = list[key]
      }
    }
    if (newList.length > 0) {
      return pick(newList)
    }
  }
  // just return the thing itself; it'll probably be stringified
  return list
}

function d2(x?: number) { return d(x, 2) }
function d3(x?: number) { return d(x, 3) }
function d4(x?: number) { return d(x, 4) }
function d5(x?: number) { return d(x, 5) }
function d6(x?: number) { return d(x, 6) }
function d7(x?: number) { return d(x, 7) }
function d8(x?: number) { return d(x, 8) }
function d10(x?: number) { return d(x, 10) }
function d12(x?: number) { return d(x, 12) }
function d14(x?: number) { return d(x, 14) }
function d16(x?: number) { return d(x, 16) }
function d20(x?: number) { return d(x, 20) }
function d24(x?: number) { return d(x, 24) }
function d30(x?: number) { return d(x, 30) }
function d100(x?: number) { return d(x, 100) }

const roll = {
  d(numberArg?: number, sidesArg?: number) { return d(numberArg, sidesArg) },
  /* dice/numeric convenience functions */
  d2(x?: number) { return d(x, 2) },
  d3(x?: number) { return d(x, 3) },
  d4(x?: number) { return d(x, 4) },
  d5(x?: number) { return d(x, 5) },
  d6(x?: number) { return d(x, 6) },
  d7(x?: number) { return d(x, 7) },
  d8(x?: number) { return d(x, 8) },
  d10(x?: number) { return d(x, 10) },
  d12(x?: number) { return d(x, 12) },
  d14(x?: number) { return d(x, 14) },
  d16(x?: number) { return d(x, 16) },
  d20(x?: number) { return d(x, 20) },
  d24(x?: number) { return d(x, 24) },
  d30(x?: number) { return d(x, 30) },
  d100(x?: number) { return d(x, 100) },

  dF(x?: number) { return fudge(x) },

}

/* boolean convenience functions */
function flip() {
  return (roll.d2() === 1)
}

function percentChance(chanceArg: number) {
  const chance = (typeof chanceArg === "number") ? chanceArg : 50
  return (roll.d100() <= chance)
}

function chanceIn6(chanceArg?: number) {
  const chance = (typeof chanceArg === "number") ? chanceArg : 3
  return (roll.d6() <= chance)
}

function multiple (rolls: number, number: number, sides: number) {
  let result = ""
  for (let i = 0; i < rolls; i++) {
    result += `${d(number, sides)}\t`
  }
  return result
}

export {
  d,
  fudge,
  roll,
  pick,
  d2,
  d3,
  d4,
  d5,
  d6,
  d7,
  d8,
  d10,
  d12,
  d14,
  d16,
  d20,
  d24,
  d30,
  d100,
  flip,
  percentChance,
  chanceIn6,
  multiple,
}
