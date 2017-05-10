// @flow

export type Dice = [ number, number, number ]

export type ClassT = {
  id: string,
  name: string,
  hdType: number,
}

export type BaseAbilitiesT = {
  str: number,
  int: number,
  wis: number,
  dex: number,
  con: number,
  cha: number,
}

export type Character = {
  base: {
    class: ClassT,
    abilities: BaseAbilitiesT,
    maxHp: number,
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
