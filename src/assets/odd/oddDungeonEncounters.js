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

import { d3, d4, d6, d8, d10, d12 } from '../dice.js'
import oddMonsters from './oddMonsters.js'

// dungeon encounters
function monsterLevel1() {
  // return pick(["Kobolds", "Goblins", "Skeletons", "Orcs", "Giant Rats",
  //   "Centipedes", "Bandits", "Spiders"]);
  switch (d8()) {
    case 1: return oddMonsters.kobold.toS()
    case 2: return oddMonsters.goblin.toS()
    case 3: return oddMonsters.skeleton.toS()
    case 4: return oddMonsters.orc.toS()
    case 5: return oddMonsters.giantRat.toS()
    case 6: return oddMonsters.centipede.toS()
    case 7: return oddMonsters.bandit.toS()
    case 8: return oddMonsters.giantSpider.toS()
    default: return ""
  }
}

function monsterLevel2() {
  // return pick(["Hobgoblins", "Zombies", "Lizards", "Warriors", "Conjurers",
  //   "Gnolls", "Thouls", "Ghouls", "Berserkers", "Theurgists"]);
  switch (d10()) {
    case 1: return oddMonsters.hobgoblin.toS()
    case 2: return oddMonsters.zombie.toS()
    case 3: return oddMonsters.giantLizard.toS()
    case 4: return "warriors"
    case 5: return "conjurers"
    case 6: return oddMonsters.gnoll.toS()
    case 7: return oddMonsters.ghoul.toS()
    case 8: return oddMonsters.ghoul.toS()
    case 9: return oddMonsters.berserker.toS()
    case 10: return "theurgists"
    default: return ""
  }
}

function monsterLevel3() {
  // return pick(["Wights", "Heroes", "Giant Hogs", "Giant Ants", "Ochre Jelly",
  //   "Thaumaturgists", "Swashbucklers", "Magicians", "Giant Snakes",
  //   "Giant Weasles"]);
  switch (d10()) {
    case 1: return oddMonsters.wight.toS()
    case 2: return "heroes"
    case 3: return oddMonsters.giantHog.toS()
    case 4: return "Giant Ants"
    case 5: return oddMonsters.ochreJelly.toS()
    case 6: return "thaumaturgists"
    case 7: return "Swashbucklers"
    case 8: return "magicians"
    case 9: return oddMonsters.giantSnake.toS()
    case 10: return oddMonsters.giantWeasel.toS()
    default: return ""
  }
}

function monsterLevel4() {
  // return pick(["Wraiths", "Ogres", "Evil Priests", "Myrmidons",
  //   "Giant Beetles", "Giant Scorpions", "Lycanthropes", "Gargoyles",
  //   "White Apes", "Enchanters"]);
  switch (d10()) {
    case 1: return oddMonsters.wraith.toS()
    case 2: return oddMonsters.ogre.toS()
    case 3: return "evil priests"
    case 4: return "myrmidons"
    case 5: return oddMonsters.giantBeetle.toS()
    case 6: return oddMonsters.giantScorpion.toS()
    case 7: return "Lycanthropes"
    case 8: return oddMonsters.gargoyle.toS()
    case 9: return oddMonsters.whiteApe.toS()
    case 10: return "enchanters"
    default: return ""
  }
}

function monsterLevel5() {
  // return pick(["Trolls", "Superheros", "Wyverns", "Spectres", "Mummies",
  //   "Minotaurs", "Manticores", "Cockatrices", "Sorcerers", "Wyverns",
  //   "Hydra (6-8 Heads)", "Medusae"]);
  switch (d12()) {
    case 1: return oddMonsters.troll.toS()
    case 2: return "Superheros"
    case 3: return oddMonsters.wyvern.toS()
    case 4: return oddMonsters.spectre.toS()
    case 5: return oddMonsters.mummy.toS()
    case 6: return oddMonsters.minotaur.toS()
    case 7: return oddMonsters.manticore.toS()
    case 8: return oddMonsters.cockatrice.toS()
    case 9: return "Sorcerers"
    case 10: return oddMonsters.wyvern.toS()
    case 11: return `${d3() + 5}-headed ${oddMonsters.hydra.toS()}`
    case 12: return oddMonsters.medusa.toS()
    default: return ""
  }
}

function monsterLevel6() {
  // return pick(["Giants", "Hydra (9-12 heads)", "Dragons", "Basilisks",
  //   "Gorgons", "Chimeras", "Vampires", "Lords", "Balrogs", "Wizards*",
  //   "Evil High Priests*", "Purple Worms"]);
  switch (d12()) {
    case 1: return "giants"
    case 2: return `${d4() + 8}-headed ${oddMonsters.hydra.toS()}`
    case 3: return "dragons"
    case 4: return oddMonsters.basilisk.toS()
    case 5: return oddMonsters.gorgon.toS()
    case 6: return oddMonsters.chimera.toS()
    case 7: return oddMonsters.vampire.toS()
    case 8: return "Lords"
    case 9: return oddMonsters.balrog.toS()
    case 10: return "Wizards"
    case 11: return "Evil High Priests"
    case 12: return oddMonsters.purpleWorm.toS()
    default: return ""
  }
}

function dungeonLevel1() {
  switch (d6()) {
    case 1:
    case 2: return `${d6()} ${monsterLevel1()}`
    case 3:
    case 4: return `${Math.round(d6() / 2)} ${monsterLevel2()}`
    case 5: return `${Math.round(d6() / 4)} ${monsterLevel3()}`
    case 6: return `1 ${monsterLevel4()}`
    default: return ""
  }
}

function dungeonLevel2() {
  switch (d6()) {
    case 1: return `${d6(2)} ${monsterLevel1()}`
    case 2: return `${d6()} ${monsterLevel2()}`
    case 3:
    case 4: return `${Math.round(d6() / 2)} ${monsterLevel3()}`
    case 5: return `${Math.round(d6() / 4)} ${monsterLevel4()}`
    case 6: return `1 ${monsterLevel5()}`
    default: return ""
  }
}

function dungeonLevel3() {
  switch (d6()) {
    case 1: return `${d6(2)} ${monsterLevel2()}`
    case 2: return `${d6()} ${monsterLevel3()}`
    case 3:
    case 4: return `${Math.round(d6() / 2)} ${monsterLevel4()}`
    case 5: return `${Math.round(d6() / 4)} ${monsterLevel5()}`
    case 6: return `1 ${monsterLevel6()}`
    default: return ""
  }
}

function dungeonLevel4to5() {
  switch (d6()) {
    case 1: return `${d6(2)} ${monsterLevel3()}`
    case 2:
    case 3: return `${d6()} ${monsterLevel4()}`
    case 4:
    case 5: return `${Math.round(d6() / 2)} ${monsterLevel5()}`
    case 6: return `${Math.round(d6() / 4)} ${monsterLevel6()}`
    default: return ""
  }
}

function dungeonLevel6to7() {
  switch (d6()) {
    case 1: return `${d6(2)} ${monsterLevel4()}`
    case 2:
    case 3:
    case 4: return `${d6()} ${monsterLevel5()}`
    case 5:
    case 6: return `${Math.round(d6() / 2)} ${monsterLevel6()}`
    default: return ""
  }
}

function dungeonLevel8to9() {
  switch (d6()) {
    case 1:
    case 2: return `${d6(2)} ${monsterLevel5()}`
    case 3:
    case 4:
    case 5:
    case 6: return `${d6()} ${monsterLevel6()}`
    default: return ""
  }
}

function dungeonLevel10to12() {
  switch (d6()) {
    case 1: return `${d6(2)} ${monsterLevel5()}`
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: return `${d6()} ${monsterLevel6()}`
    default: return ""
  }
}

function dungeonLevel13() {
  return `${d6()} ${monsterLevel6()}`
}

const oddDungeonEncounters = {
  monsterLevel1,
  monsterLevel2,
  monsterLevel3,
  monsterLevel4,
  monsterLevel5,
  monsterLevel6,
  dungeonLevel1,
  dungeonLevel2,
  dungeonLevel3,
  dungeonLevel4to5,
  dungeonLevel6to7,
  dungeonLevel8to9,
  dungeonLevel10to12,
  dungeonLevel13,
}

export {
  oddDungeonEncounters as default,
  monsterLevel1,
  monsterLevel2,
  monsterLevel3,
  monsterLevel4,
  monsterLevel5,
  monsterLevel6,
  dungeonLevel1,
  dungeonLevel2,
  dungeonLevel3,
  dungeonLevel4to5,
  dungeonLevel6to7,
  dungeonLevel8to9,
  dungeonLevel10to12,
  dungeonLevel13,
}
