// @flow

import type { Character, PartyT, ClassT, BaseAbilitiesT } from '../types'
import { roll, pick, rollTimes } from '../random'
import oddNames from '../names/oddNames.js'

// returns modifier for ability score
function calcMod(score: number): number {
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

function recalculateStatMods(c: Character) {
  Object.keys(c.base.abilities).forEach((key) => {
    c.abilities[key] = {
      score: c.base.abilities[key],
      mod: calcMod(c.base.abilities[key]),
    }
  })
}

function recalculatePCs(characters: Array<Character>) {
  characters.forEach((c) => recalculateStatMods(c))
}

const classList: Array<ClassT> = [
  {
    id: "F",
    name: "Fighter",
    hdType: 8,
  },
  {
    id: "T",
    name: "Thief",
    hdType: 4,
  },
]

function generateAbilities(klass: ClassT): BaseAbilitiesT { // eslint-disable-line no-unused-vars
  return {
    str: roll([3, 6, 0]),
    int: roll([3, 6, 0]),
    wis: roll([3, 6, 0]),
    dex: roll([3, 6, 0]),
    con: roll([3, 6, 0]),
    cha: roll([3, 6, 0]),
  }
}

function generateParty(): PartyT {
  const party: PartyT = {
    characters: [],
  }

  let number = roll([1, 3, 3])

  while (number > 0) {
    const classType = pick(classList)
    const PClevel = roll([1, 3, 0])

    const c = {
      base: {
        name: (roll([1, 2, 0]) === 1 ? oddNames.masculineName() : oddNames.feminineName()) + oddNames.epithet(),
        class: classType,
        abilities: { str: 0, int: 0, wis: 0, dex: 0, con: 0, cha: 0 },
        level: PClevel,
        maxHp: 0,
      },
      abilities: {
        str: { score: 0, mod: 0 },
        int: { score: 0, mod: 0 },
        wis: { score: 0, mod: 0 },
        dex: { score: 0, mod: 0 },
        con: { score: 0, mod: 0 },
        cha: { score: 0, mod: 0 },
      },
      hp: 0,
    }
    c.base.abilities = generateAbilities(classType)
    recalculateStatMods(c)
    c.base.maxHp = rollTimes([1, classType.hdType, c.abilities.con.mod], c.base.level)
    c.hp = c.base.maxHp

    party.characters.push(c)
    number -= 1
  }
  recalculatePCs(party.characters)

  return party
}

const redPCs = {
  recalculatePCs,
  generateParty,
}

export {
  redPCs as default,
  recalculatePCs,
  generateParty,
}
