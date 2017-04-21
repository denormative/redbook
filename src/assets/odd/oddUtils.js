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

import { d6 } from '../dice.js'

/* Misc. Convenience Functions */
// oddTables.indentLines = function (text) {
//   let output = ""
//   const strings = text.split("\n")
//   for (let i = 0; i < strings.length; i++) {
//     output = `  ${strings[i]}\n`
//   }
//   return output
// }

/* general utility tables */
function characterStats() {
  let output = ""
  output += `S:${d6(3)}   `
  output += `I:${d6(3)}   `
  output += `W:${d6(3)}   `
  output += `C:${d6(3)}   `
  output += `D:${d6(3)}   `
  output += `X:${d6(3)}   `
  output += `G:${d6(3) * 10}   `
  output += `HP:${d6(1)}`
  return output
}

function reaction(modifier?: number = 0) {
  const result = d6(2) + modifier
  if (result <= 2) {
    return `Reaction Roll (${result}): Attempts to attack`
  }
  else if (result <= 5) {
    return `Reaction Roll (${result}): Hostile reation`
  }
  else if (result <= 8) {
    return `Reaction Roll (${result}): Uncertain`
  }
  else if (result <= 11) {
    return `Reaction Roll (${result}): Accepts offer`
  }
  return `Reaction Roll (${result}): Enthusiast, Loyalty +3`
}

function loyalty(modifier?: number = 0) {
  const result = d6(2) + modifier
  if (result <= 3) {
    return `Loyalty (${result}): Will desert at first opportunity`
  }
  else if (result <= 6) {
    return `Loyalty (${result}): -2 on morale dice`
  }
  else if (result <= 8) {
    return `Loyalty (${result}): -1 on morale dice`
  }
  else if (result <= 12) {
    return `Loyalty (${result}): Average morale dice`
  }
  else if (result <= 14) {
    return `Loyalty (${result}): +1 on morale dice`
  }
  else if (result <= 18) {
    return `Loyalty (${result}): +2 on morale dice`
  }
  return `Loyalty (${result}): Need never check morale`
}

const oddUtils = {
  characterStats,
  reaction,
  loyalty,
}

export {
  oddUtils as default,
  characterStats,
  reaction,
  loyalty,
}
