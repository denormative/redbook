// @flow

import type { Character, PartyT, ClassT, BaseAbilitiesT, MoneyT, ItemT } from '../types'
import { roll, pick, rollTimes, rollMultiple } from '../random'
import oddNames from '../names/oddNames.js'
import { itemList } from './items'

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
  // TODO: calculate experienceMultiplier here
  characters.forEach((c) => {
    recalculateStatMods(c)
    // base AC 9 unless armoured
    c.ac = c.equipped.armour ? c.equipped.armour.base.baseAC : 9
    c.ac -= c.abilities.dex.mod
  })
}

const classList: Array<ClassT> = [
  {
    id: "F",
    name: "Fighter",
    hdType: 8,
    primeRequisite: "str",
    chargen: {
      priorityStatOrder: ["str", "con", "dex", "cha", "wis", "int"],
    },
    THAC0: [20, 19, 19, 19],
    savingThrows: [
      [14, 15, 16, 17, 17], // 0th Level; Normal Man
      [12, 13, 14, 15, 16],
      [12, 13, 14, 15, 16],
      [12, 13, 14, 15, 16],
    ],
  },
  {
    id: "T",
    name: "Thief",
    hdType: 4,
    primeRequisite: "dex",
    chargen: {
      priorityStatOrder: ["dex", "str", "con", "cha", "wis", "int"], // NOTE: maybe swap wis/int due to reading spell scrolls?
    },
    THAC0: [20, 19, 19, 19, 19],
    savingThrows: [
      [14, 15, 16, 17, 17], // 0th Level; Normal Man
      [13, 14, 13, 16, 15],
      [13, 14, 13, 16, 15],
      [13, 14, 13, 16, 15],
      [13, 14, 13, 16, 15],
    ],
  },
]

function generateAbilities(klass: ClassT): BaseAbilitiesT { // eslint-disable-line no-unused-vars
  const stats: Array<number> = rollMultiple([3, 6, 0], 6).sort((a, b) => (a - b))
  const abilities = { str: 0, int: 0, wis: 0, dex: 0, con: 0, cha: 0 }
  klass.chargen.priorityStatOrder.forEach((ability) => { abilities[ability] = stats.pop() })
  return abilities
}

function buy(money: MoneyT, item: ItemT) {
  // FIXME: account for giving change
  Object.keys(item.cost).forEach((p) => {
    money[p] -= ((item.cost[p]: any): number) // NOTE: obnoxious typecasting hack but it should never be undefined
  })
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
        money: {
          pp: 0,
          gp: 0,
          ep: 0,
          sp: 0,
          cp: 0,
        },
        equipment: [],
        alignment: "N",
        savingThrows: [],
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
      experienceMultiplier: 1.0,
      equipped: {
      },
      ac: 9,
      THAC0: 19,
      savingThrows: {
        deathRayPoison: 14,
        magicWands: 15,
        paralysisTurnToStone: 15,
        breathAttack: 17,
        rodStaffSpell: 17,
      },
    }
    c.base.abilities = generateAbilities(classType)
    recalculateStatMods(c)
    c.base.maxHp = rollTimes([1, classType.hdType, c.abilities.con.mod], c.base.level)
    c.hp = c.base.maxHp
    c.base.money.gp = rollTimes([3, 6, c.abilities.con.mod], 10 * c.base.level) // FIXME: hack for money for level; should calc properly

    c.equipped.weapon = {
      base: pick(itemList.itemsForClass(c.base.class.id, "weapon")),
    }
    c.base.equipment.push(c.equipped.weapon)
    buy(c.base.money, c.equipped.weapon.base)

    c.equipped.armour = {
      base: pick(itemList.itemsForClass(c.base.class.id, "armor")),
    }
    c.base.equipment.push(c.equipped.armour)
    buy(c.base.money, c.equipped.armour.base)

    c.base.alignment = roll([1, 2, 0]) === 1 ? "L" : "N"

    c.savingThrows.deathRayPoison = classType.savingThrows[c.base.level][0]
    c.savingThrows.magicWands = classType.savingThrows[c.base.level][1]
    c.savingThrows.paralysisTurnToStone = classType.savingThrows[c.base.level][2]
    c.savingThrows.breathAttack = classType.savingThrows[c.base.level][3]
    c.savingThrows.rodStaffSpell = classType.savingThrows[c.base.level][4]

    party.characters.push(c)
    number -= 1
  }
  recalculatePCs(party.characters)

  return party
}

export {
  recalculatePCs,
  generateParty,
}
