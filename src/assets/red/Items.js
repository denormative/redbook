// @flow

import type { ItemT } from '../types'

const itemList: Array<ItemT> = [
  {
    name: "Battle Axe",
    type: "weapon",
    action: { hit: true },
    damage: [1, 8, 0],
    range: undefined,
    cost: { gp: 7 },
    enc: 60,
    hands: 2,
    size: "M",
    allowedClasses: ["F", "T"],
  },
  {
    name: "Hand Axe",
    type: "weapon",
    action: { hit: true, throw: true },
    damage: [1, 6, 0],
    range: [10, 20, 30],
    cost: { gp: 4 },
    enc: 30,
    hands: 1,
    size: "S",
    allowedClasses: ["F", "T"],
  },
  {
    name: "Leather Armour",
    type: "armour",
    baseAC: 7,
    cost: { gp: 10 },
    enc: 100,
    allowedClasses: ["F", "T", "D"],
  },
  {
    name: "Scale Mail",
    type: "armour",
    baseAC: 6,
    cost: { gp: 20 },
    enc: 200,
    allowedClasses: ["F"],
  },
]

export {
  itemList, // eslint-disable-line
}
