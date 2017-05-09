// @flow
/* eslint quote-props: ["error", "consistent"] */

import type { MonsterT, EncounterT } from '../types'
import { roll, pick } from '../random'

const monsterList: Array<MonsterT> = [
  {
    id: "GiantAnt",
    name: "Giant Ant",
    ac: 3,
    hd: [4, 8, 0],
    hdStars: 1,
    size: 'M',
    mv: { walk: { turn: 180, round: 60 } },
    attacks: [
      { name: "bite", damage: [2, 6, 0] },
    ],
    numberAppearing: {
      dungeon: [2, 4, 0],
      lair: [4, 6, 0],
    },
    save: { class: 'F', level: 7 },
    morale: 7,
    treasure: {
      normal: ["U"],
      special: { type: "goldNuggets", parameters: { chance: 30, amount: "1d10 x 1000gp" } },
    },
    int: 1,
    alignment: "N",
    xp: 125, // FIXME: should calculate this
    type: { Lowlife: "Rare" },
    terrain: ["Any"], // NOTE: Any except Arctic
  },
  {
    id: "Bandit",
    name: "Bandit",
    ac: 6,
    hd: [1, 8, 0],
    hdStars: 0,
    size: 'M',
    mv: { walk: { turn: 90, round: 30 } },
    attacks: [
      { name: "weapon", damage: [1, 6, 0] }, // FIXME: get random weapon here; ranged+melee
    ],
    numberAppearing: {
      dungeon: [2, 4, 0],
      lair: [3, 10, 0], // FIXME: NPC leader?
    },
    save: { class: 'T', level: 1 },
    morale: 8,
    treasure: {
      normal: ["U"],
      lair: ["A"],
      special: { type: "goldNuggets", parameters: { chance: 30, amount: "1d10 x 1000gp" } },
    },
    int: 11,
    alignment: "CN", // TODO/NOTE: 50% probability of C or N; need to implement
    xp: 10, // FIXME: should calculate this
    type: { Human: "Common" },
    terrain: ["Any"], // NOTE: Any wilderness near road
  },
]


function generateEncounter(): EncounterT {
  const encounter: EncounterT = {
    monsters: [],
  }

  const monsterType = pick(monsterList)
  console.log(monsterType)

  let number = roll(monsterType.numberAppearing.dungeon)
  console.log(number)

  while (number > 0) {
    encounter.monsters.push({ base: monsterType, hp: roll(monsterType.hd) })
    number -= 1
  }

  return encounter
}

const redPCs = {
  generateEncounter,
}

export {
  redPCs as default,
  generateEncounter,
}
