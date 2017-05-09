// @flow

import type { Dice } from './types'

function randomIntFromInterval (min: number, max: number): number {
  return Math.floor((Math.random() * ((max - min) + 1)) + min)
}

/* core dice/numeric functions */
function roll (dice: Dice): number {
  const num = (dice[0] < 1) ? 1 : dice[0]
  const sides = (dice[1] < 2) ? 2 : dice[1]
  const add = dice[2]

  let result = 0
  for (let i = 0; i < num; i += 1) {
    result += randomIntFromInterval(1, sides)
  }
  return result + add
}

function pick<T>(pickFrom: Array<T>): T {
  return pickFrom[randomIntFromInterval(0, pickFrom.length - 1)]
}

export {
  roll,
  pick,
}
