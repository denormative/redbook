/* @flow */

/* basic randomization helpers */
function randomIntFromInterval (min: number, max: number) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min)
}

/* core dice/numeric functions */
function d (numberArg?: number = 1, sidesArg?: number = 6) {
  const num = (numberArg < 1) ? 1 : numberArg
  const sides = (sidesArg < 2) ? 2 : sidesArg
  let result = 0
  for (let i = 0; i < num; i += 1) {
    result += randomIntFromInterval(1, sides)
  }
  return result
}

function fudge (numberArg?: number = 1) {
  const number = (numberArg < 1) ? 1 : numberArg
  let result = 0
  for (let i = 0; i < number; i += 1) {
    result += randomIntFromInterval(1, 3) - 2
  }
  return result
}

/* list convenience functions */
function pick (list: any) {
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

/* dice/numeric convenience functions */
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

/* boolean convenience functions */
function flip() {
  return (d2() === 1)
}

function percentChance(chanceArg: number = 50) {
  return (d100() <= chanceArg)
}

function chanceIn6(chanceArg?: number = 3) {
  return (d6() <= chanceArg)
}

function multiple (rolls: number, number: number, sides: number) {
  let result = ""
  for (let i = 0; i < rolls; i++) {
    result += `${d(number, sides)}\t`
  }
  return result
}

const roll = {
  d,
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
  dF(x?: number) { return fudge(x) },
  flip,
  percentChance,
  chanceIn6,
  multiple,
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
