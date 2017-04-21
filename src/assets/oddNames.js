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

import { Confluxor } from './conflux2.js'
import feminineCensusNames from './feminine-census-names.js'
import masculineCensusNames from './masculine-census-names.js'
import epithets from './epithets.js'
import { pick } from './dice.js'


/* Declare object */
const oddNames = {
  feminineConfluxor: new Confluxor(),
  feminineName() {
    return oddNames.feminineConfluxor.generate(1)[0]
  },
  masculineConfluxor: new Confluxor(),
  masculineName() {
    return oddNames.masculineConfluxor.generate(1)[0]
  },
  epithet() {
    return `the ${pick(epithets)}`
  },
  placePrefix () {
    return pick(["Aelf", "Ald", "Ash", "Axe", "Barrow", "Bear", "Bee", "Black",
      "Blue", "Breeze", "Bryn", "Byrn", "Cant", "Caribou", "Cedar", "Claw", "Cloud",
      "Coal", "Cold", "Copper", "Crow", "Dark", "Dawn", "Dead", "Deer", "Down",
      "Dusk", "Dverg", "Dwarf", "Eagle", "East", "Elf", "Even", "Fair", "Far",
      "Feast", "Fel", "Fey", "Flax", "Fog", "Forth", "Fox", "Frost", "Gale", "Goat",
      "Gold", "Good", "Great", "Green", "Grey", "Grief", "Grim", "Gull", "Gyre",
      "Hale", "Hammer", "Hawk", "Hay", "Heath", "Heather", "Hel", "Helm", "Hemlock",
      "High", "Honey", "Hoof", "Horn", "Hot", "Ice", "In", "Iron", "Jam", "Ken",
      "Kolb", "Krak", "Light", "Long", "Lor", "Low", "Marten", "Milk", "Mist", "Moon",
      "Moose", "Moss", "Moth", "Near", "Night", "Noon", "North", "Oak", "Old", "Orca",
      "Out", "Owl", "Ox", "Pine", "Plough", "Rabbit", "Raven", "Red", "Rime", "Root",
      "Rot", "Run", "Rye", "Salmon", "Salt", "Sea", "Seal", "Seed", "Shade", "Sheave",
      "Shep", "Shield", "Sig", "Silver", "Small", "Smoke", "South", "Spear",
      "Spruce", "Stan", "Star", "Stone", "Storm", "Sun", "Sword", "Sæx", "Tern",
      "Thorn", "Tin", "Tooth", "Troll", "Up", "Urd", "Wald", "Warm", "West", "Whale",
      "White", "Willow", "Woad", "Wolf", "Wood", "Wool", "Wyrm", "Yew", "Yng", "Young"])
  },
  castleName() {
    return oddNames.placePrefix() +
      pick("berg", "caer", "castle", "hall", "hearth", "hold", "rock", "tower")
  },
  townName() {
    return oddNames.placePrefix() +
      pick("borough", "burg", "burgh", "bury", "don", "haven", "ington", "ston", "town", "wall")
  },
  villageName() {
    return oddNames.placePrefix() +
      pick("gate", "field", "holm", "ley", "spring", "stead", "sted", "vale", "ville", "worth", "wich")
  },
  hamletName() {
    return oddNames.placePrefix() +
      pick("ald", "back", "croft", "cote", "heath", "ham", "ingham", "thorpe", "wald")
  },
}

oddNames.feminineConfluxor.parse(feminineCensusNames.join("\n"), "\n")
oddNames.masculineConfluxor.parse(masculineCensusNames.join("\n"), "\n")

export {
  oddNames as default,
}
