// @flow

import type { ItemT, MoneyT, Dice } from '../types'
import itemListCsv from './items.csv'

function str2objectset(csv: string): {[string]: true} {
  const map = {}
  csv.split(':').forEach((el) => { map[el] = true })
  return map
  // return csv.split(':').reduce((acc, cur) => ({ ...acc, cur: true }), map)
}

function string2dice(csv: string) : Dice {
  const dice = csv.split(/[d+]/) // FIXME: hack, need to properly split on d/+/-/etc
  return [dice[0] ? +dice[0] : 0, dice[1] ? +dice[1] : 0, dice[2] ? +dice[2] : 0]
}

function string2money(csv: string) : MoneyT {
  const money: MoneyT = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 }
  let tempval
  money.pp = (tempval = csv.match(/(\d+)pp/i)) ? +tempval : 0 // eslint-disable-line no-cond-assign
  money.gp = (tempval = csv.match(/(\d+)gp/i)) ? +tempval : 0 // eslint-disable-line no-cond-assign
  money.ep = (tempval = csv.match(/(\d+)ep/i)) ? +tempval : 0 // eslint-disable-line no-cond-assign
  money.sp = (tempval = csv.match(/(\d+)sp/i)) ? +tempval : 0 // eslint-disable-line no-cond-assign
  money.cp = (tempval = csv.match(/(\d+)cp/i)) ? +tempval : 0 // eslint-disable-line no-cond-assign

  return money
}

function string2range(csv: string): [number, number, number] {
  const range = csv.split(':')
  if (range.length === 3) {
    return [+range[0], +range[1], +range[2]]
  }
  return [0, 0, 0]
}

class ItemList {
  items: Array<ItemT> = []
  constructor() {
    itemListCsv.forEach((csv) => {
      const item: ItemT = {
        name: csv.name,
        type: csv.type,
        actions: str2objectset(csv.actions),
        damage: string2dice(csv.damage),
        range: string2range(csv.range),
        cost: string2money(csv.cost),
        enc: csv.enc,
        hands: csv.hands,
        size: csv.size,
        allowedClasses: csv.allowedClasses.split(':'),
        baseAC: csv.baseAC,
      }
      this.items.push(item)
    })
  }

  itemsForClass(classId: string, itemType?: string): Array<ItemT> {
    if (itemType) {
      return this.items.filter((item) => item.type === itemType && item.allowedClasses.includes(classId))
    }
    return this.items.filter((item) => item.allowedClasses.includes(classId))
  }

  noWeapon(): ItemT {
    return this.items.filter((i) => i.name === "Hands")[0]
  }
  noArmour(): ItemT {
    return this.items.filter((i) => i.name === "No Armor")[0]
  }
}

export let itemList = new ItemList() // eslint-disable-line
