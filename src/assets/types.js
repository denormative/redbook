// @flow

export type Character = {
    abilities: {
      str: { score: number, mod: number },
      int: { score: number, mod: number },
      wis: { score: number, mod: number },
      dex: { score: number, mod: number },
      con: { score: number, mod: number },
      cha: { score: number, mod: number },
    }, base: {
      abilities: {
        str: number,
        int: number,
        wis: number,
        dex: number,
        con: number,
        cha: number,
      }
  }
}
