// @flow

export type Dice = [ number, number, number ]
export type RangeT = [ number, number, number ]

export type ClassT = {
  id: string,
  name: string,
  hdType: number,
  primeRequisite: string, // TODO: handle specifing just str/int/wis/dex/con/cha
  chargen: {
    priorityStatOrder: Array<string>,
  },
  THAC0: Array<number>, // TODO: should pad this out as a 36 entry tuple
  savingThrows: Array<[number, number, number, number, number]>,
}

export type BaseAbilitiesT = {
  str: number,
  int: number,
  wis: number,
  dex: number,
  con: number,
  cha: number,
}

export type MoneyT = {
  pp: number,
  gp: number,
  ep: number,
  sp: number,
  cp: number,
}

export type ItemT = {
  name: string,
  type: string, // TODO: need enum type for weapon/potion/whatever
  actions: { hit?: true, throw?: true, wear?: true }, // TODO: need enum tupe for melee/ranged/whatever
  cost: MoneyT,
  enc: number,
  allowedClasses: Array<string>,
  // Weapon only
  hands: number,
  damage: Dice,
  range: RangeT,
  size: string,
  // Armor only
  baseAC: number,
}

export type ItemI = {
  base: ItemT,
}

export type Character = {
  base: {
    name: string,
    class: ClassT,
    level: number,
    abilities: BaseAbilitiesT,
    maxHp: number,
    money: MoneyT,
    equipment: Array<ItemI>,
    alignment: string,
  },
  abilities: {
    str: { score: number, mod: number },
    int: { score: number, mod: number },
    wis: { score: number, mod: number },
    dex: { score: number, mod: number },
    con: { score: number, mod: number },
    cha: { score: number, mod: number },
  },
  hp: number,
  experienceMultiplier: number,
  equipped: {
    weapon: ItemI,
    armour: ItemI,
  },
  ac: number,
  THAC0: number,
  savingThrows: {
    deathRayPoison: number,
    magicWands: number,
    paralysisTurnToStone: number,
    breathAttack: number,
    rodStaffSpell: number,
  },
}

export type MonsterT = {
  id: string,
  name: string,
  ac: number,
  hd: Dice,
  hdStars: number,
  size: string,
  mv: { walk: { turn: number, round: number } },
  attacks: [
    { name: string, damage: Dice },
  ],
  numberAppearing: {
    dungeon: Dice,
    lair: Dice,
  },
  save: { class: string, level: number },
  morale: number,
  treasure: {
    normal: Array<string>,
    special: { type: string, parameters: { chance: number, amount: any } },
  },
  int: number,
  alignment: string,
  xp: number, // FIXME: should calculate this
  type: { [string]: string },
  terrain: [string],
}

export type MonsterI = {
  base: MonsterT,
  hp: number,
  name: string,
}

export type EncounterT = {
  monsters: Array<MonsterI>,
  combatFinished: boolean,
}

export type PartyT = {
  characters: Array<Character>
}
