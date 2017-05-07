/* @flow */

import type { Character } from '../types'

// returns modifier for ability score
function calcMod(score: number) {
  if (score <= 3) {
    return -3
  }
  else if (score <= 5) {
    return -2
  }
  else if (score <= 8) {
    return -1
  }
  else if (score <= 12) {
    return 0
  }
  else if (score <= 15) {
    return 1
  }
  else if (score <= 17) {
    return 2
  }
  return 3
}

function recalculatePCs(characters: Array<Character>) {
  characters.forEach((c) => {
    Object.keys(c.base.abilities).forEach((key) => {
      c.abilities[key] = {
        score: c.base.abilities[key],
        mod: calcMod(c.base.abilities[key]),
      }
    })
  })
}

const redPCs = {
  recalculatePCs,
}

export {
  redPCs as default,
  recalculatePCs,
}
