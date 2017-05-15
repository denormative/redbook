// @flow

export type Dice = [ number, number, number ]

export type ClassT = {
  id: string,
  name: string,
  hdType: number,
  primeRequisite: string, // TODO: handle specifing just str/int/wis/dex/con/cha
  chargen: {
    priorityStatOrder: Array<string>,
  },
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

export type WeaponT = {|
  name: string,
  type: string, // TODO: need enum type for weapon/potion/whatever
  action: { hit?: true, throw?: true }, // TODO: need enum tupe for melee/ranged/whatever
  damage: Dice,
  range: ?[number, number, number],
  cost: { pp?: number, gp?: number, ep?: number, sp?: number, cp?: number },
  enc: number,
  hands: number,
  size: string,
  allowedClasses: Array<string>,
|}

export type ArmourT = {|
  name: string,
  type: string, // TODO: need enum type for weapon/potion/whatever
  baseAC: number,
  cost: { pp?: number, gp?: number, ep?: number, sp?: number, cp?: number },
  enc: number,
  allowedClasses: Array<string>,
|}

export type ItemT = WeaponT | ArmourT

export type ItemI = {
  base: ItemT,
}

export type Character = {
  base: {
    class: ClassT,
    abilities: BaseAbilitiesT,
    maxHp: number,
    money: MoneyT,
    equipment: Array<ItemI>,
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
    weapon?: ItemI,
    armour?: ItemI,
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

export type MonsterInstance = {
  base: MonsterT,
  hp: number,
}

export type EncounterT = {
  monsters: Array<MonsterInstance>
}

export type PartyT = {
  characters: Array<Character>
}
