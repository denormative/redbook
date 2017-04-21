/* eslint max-len: ["off"] */
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

// import { d6 } from '../dice.js'
import oddTreasureTables from './oddTreasureTables.js'

/* monster prototype */
function Monster (name, plural, alignment, armorClass, move, auxMove, hitDice, hitMod, damage, damageMod, lairChance, treasureType) {
  this.name = name
  this.plural = plural
  this.alignment = alignment
  this.armorClass = armorClass
  this.move = move
  this.auxMove = auxMove
  this.hitDice = hitDice
  this.hitMod = hitMod
  this.damage = damage
  this.damageMod = damageMod
  this.lairChance = lairChance
  this.treasureType = treasureType
}

Monster.prototype.shortDesc = function shortDesc(number) {
  let statline
  if (typeof number === "number") {
    if (number === 1) {
      statline = `${1} ${this.name}`
    }
    else {
      statline = `${number} ${this.plural}`
    }
  }
  else {
    statline = this.name
  }
  statline += ` (${
     this.alignment} ` +
    `Mv${this.move}${this.auxMove ? `/${this.auxMove}` : ""} ${
     this.armorClass}AC ${
     this.hitDice}${this.hitMod ? `+${this.hitMod}` : ""}HD ${
     this.damage}d6${this.damageMod ? `+${this.damageMod}` : ""
     })`
  return statline
}

Monster.prototype.toString = function toString() {
  return `${this.name
    } AL:${this.alignment
    } HD:${this.hitDice}${this.hitMod ? `+${this.hitMod}` : ""
    } AC:${this.armorClass
    } Dam:${this.damage}d6${this.damageMod ? `+${this.damageMod}` : ""
    } Mv:${this.move}${this.auxMove ? `/${this.auxMove}` : ""
    } lair${this.lairChance}%`
}

/* basic monster library */
const oddMonsters = {
}

// no armor, probably armed with spears and darts or slings
oddMonsters.levy = new Monster("levy", "levies", "LNC", 9, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// leather & shield
oddMonsters.lightfoot = new Monster("light foot", "light foot", "LNC", 6, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// mail & shield, throwing axes or spears
oddMonsters.heavyfoot = new Monster("heavy foot", "heavy foot", "LNC", 4, 9, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// plate & shield
oddMonsters.armoredfoot = new Monster("armored foot", "armored foot", "LNC", 2, 6, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// leather, short bow
oddMonsters.archer = new Monster("archer", "archers", "LNC", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// leather, light crossbow
oddMonsters.crossbow = new Monster("crossbow", "crossbows", "LNC", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// mail, heavy crossbow
oddMonsters.heavycrossbow = new Monster("heavy crossbow", "heavy crossbows", "LNC", 5, 9, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// leather & shield, light war horse, no barding
oddMonsters.lightcavalry = new Monster("light cavalry", "light cavalry", "LNC", 6, 24, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// leather, short bow, light war horse, no barding
oddMonsters.lightcavalryarcher = new Monster("light horse archer", "light horse archers", "LNC", 7, 24, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// mail & shield, medium war horse, no barding
oddMonsters.mediumcavalry = new Monster("medium cavalry", "medium cavalry", "LNC", 4, 18, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// mail, short bow, medium war horse, no barding
oddMonsters.mediumcavalryarcher = new Monster("medium horse archer", "medium horse archer", "LNC", 5, 18, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
// plate & shield, heavy war horse, barding
oddMonsters.heavycavalry = new Monster("heavy cavalry", "medium cavalry", "LNC", 2, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)


oddMonsters.bandit = new Monster("bandit", "bandits", "NC", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
oddMonsters.berserker = new Monster("berserker", "berserkers", "N", 7, 12, 0, 1, 1, 1, 0, 15, oddTreasureTables.treasureTypeA)
oddMonsters.brigand = new Monster("brigand", "brigands", "C", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
oddMonsters.nomad = new Monster("nomad", "nomads", "NC", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeADesert)
oddMonsters.dervish = new Monster("dervish", "dervishes", "L", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeADesert)
oddMonsters.buccaneer = new Monster("buccaneer", "buccaneers", "NC", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeAWater)
oddMonsters.pirate = new Monster("pirate", "pirates", "C", 7, 12, 0, 1, 0, 1, 0, 15, oddTreasureTables.treasureTypeAWater)

oddMonsters.caveman = new Monster("caveman", "cavemen", "N", 9, 12, 0, 2, 0, 1, 0, 15, oddTreasureTables.treasureTypeA)
oddMonsters.merman = new Monster("merman", "mermen", "N", 7, 12, 0, 1, 1, 1, 0, 15, oddTreasureTables.treasureTypeAWater)

oddMonsters.kobold = new Monster("kobold", "kobolds", "C", 7, 6, 0, 0.5, 0, 1, 0, 50, oddTreasureTables.treasureTypeNil)
oddMonsters.goblin = new Monster("goblin", "goblins", "C", 6, 6, 0, 1, -1, 1, 0, 50, oddTreasureTables.treasureTypeNil)
oddMonsters.orc = new Monster("orc", "orcs", "NC", 6, 9, 0, 1, 0, 1, 0, 50, oddTreasureTables.treasureTypeD)
oddMonsters.hobgoblin = new Monster("hobgoblin", "hobgoblins", "C", 5, 9, 0, 1, 1, 1, 0, 30, oddTreasureTables.treasureTypeD)
oddMonsters.gnoll = new Monster("gnoll", "gnolls", "C", 5, 9, 0, 2, 0, 1, 0, 30, oddTreasureTables.treasureTypeD)

oddMonsters.ogre = new Monster("ogre", "orgres", "C", 5, 9, 0, 4, 1, 1, 2, 30, oddTreasureTables.treasureTypeC)
oddMonsters.troll = new Monster("troll", "trolls", "C", 4, 12, 0, 6, 3, 1, 0, 50, oddTreasureTables.treasureTypeD)
oddMonsters.hillgiant = new Monster("hill giant", "hill giants", "NC", 4, 12, 0, 8, 0, 2, 0, 30, oddTreasureTables.treasureTypeE)
oddMonsters.stonegiant = new Monster("stone giant", "stone giants", "NC", 4, 12, 0, 9, 0, 2, 0, 30, oddTreasureTables.treasureTypeE)
oddMonsters.frostgiant = new Monster("frost giant", "frost giants", "NC", 4, 12, 0, 10, 1, 2, 1, 30, oddTreasureTables.treasureTypeE)
oddMonsters.firegiant = new Monster("fire giant", "fire giants", "NC", 4, 12, 0, 11, 3, 2, 2, 30, oddTreasureTables.treasureTypeE)
oddMonsters.cloudgiant = new Monster("cloud giant", "cloud giants", "NC", 4, 12, 0, 12, 2, 3, 0, 30, oddTreasureTables.treasureTypeE)

oddMonsters.skeleton = new Monster("skeleton", "skeletons", "X", 7, 6, 0, 0.5, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.zombie = new Monster("zombie", "zombies", "X", 8, 6, 0, 1, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.ghoul = new Monster("ghoul", "ghouls", "C", 6, 9, 0, 2, 0, 1, 0, 20, oddTreasureTables.treasureTypeB)
oddMonsters.wight = new Monster("wight", "wights", "C", 5, 9, 0, 3, 0, 1, 0, 60, oddTreasureTables.treasureTypeB)
oddMonsters.wraith = new Monster("wraith", "wraiths", "C", 3, 12, 24, 5, 1, 1, 0, 20, oddTreasureTables.treasureTypeE)
oddMonsters.mummy = new Monster("mummy", "mummies", "C", 3, 6, 0, 5, 1, 1, 0, 30, oddTreasureTables.treasureTypeD)
oddMonsters.spectre = new Monster("spectre", "spectres", "C", 2, 15, 30, 6, 0, 1, 0, 25, oddTreasureTables.treasureTypeE)
oddMonsters.vampire = new Monster("vampire", "vampires", "C", 2, 12, 18, 7, 0, 1, 0, 20, oddTreasureTables.treasureTypeF)

oddMonsters.cockatrice = new Monster("cockatrice", "conckatrices", "N", 6, 9, 18, 5, 0, 1, 0, 35, oddTreasureTables.treasureTypeD)
oddMonsters.basilisk = new Monster("basilisk", "basilisks", "N", 4, 6, 0, 5, 0, 1, 0, 40, oddTreasureTables.treasureTypeF)
oddMonsters.medusa = new Monster("medusa", "medusae", "C", 8, 9, 0, 4, 0, 1, 0, 75, oddTreasureTables.treasureTypeF)
oddMonsters.gorgon = new Monster("gorgon", "gorgons", "C", 2, 12, 0, 8, 0, 1, 0, 50, oddTreasureTables.treasureTypeE)

oddMonsters.manticore = new Monster("manticore", "manticoras", "C", 4, 12, 18, 6, 1, 1, 0, 25, oddTreasureTables.treasureTypeD)
oddMonsters.hydra = new Monster("hydra", "hydrae", "N", 5, 12, 0, 5, 0, 1, 0, 25, oddTreasureTables.treasureTypeB)
oddMonsters.chimera = new Monster("chimera", "chimerae", "NC", 4, 12, 18, 9, 0, 1, 0, 50, oddTreasureTables.treasureTypeF)
oddMonsters.wyvern = new Monster("wyvern", "wyverns", "N", 3, 9, 24, 7, 0, 1, 0, 60, oddTreasureTables.treasureTypeE)
oddMonsters.gargoyle = new Monster("gargoyle", "gargoyles", "C", 5, 9, 15, 4, 0, 1, 0, 25, oddTreasureTables.treasureTypeC)
oddMonsters.purpleworm = new Monster("purple worm", "purple worms", "N", 6, 6, 0, 15, 0, 1, 0, 25, oddTreasureTables.treasureTypeD)

oddMonsters.whitedragon = new Monster("white dragon", "white dragons", "NC", 2, 9, 24, 6, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)
oddMonsters.blackdragon = new Monster("black dragon", "black dragons", "NC", 2, 9, 24, 7, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)
oddMonsters.greendragon = new Monster("green dragon", "green dragons", "NC", 2, 9, 24, 8, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)
oddMonsters.bluedragon = new Monster("blue dragon", "blue dragons", "NC", 2, 9, 24, 9, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)
oddMonsters.reddragon = new Monster("red dragon", "red dragons", "NC", 2, 9, 24, 10, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)
oddMonsters.golddragon = new Monster("gold dragon", "gold dragons", "L", 2, 9, 24, 11, 0, 1, 0, 60, oddTreasureTables.treasureTypeH)

oddMonsters.werewolf = new Monster("werewolf", "werewolves", "NC", 5, 15, 0, 4, 0, 1, 0, 15, oddTreasureTables.treasureTypeC)
oddMonsters.wereboar = new Monster("wereboar", "wereboars", "NC", 4, 12, 0, 4, 1, 1, 0, 15, oddTreasureTables.treasureTypeC)
oddMonsters.weretiger = new Monster("weretiger", "weretigers", "NC", 3, 12, 0, 5, 0, 1, 0, 15, oddTreasureTables.treasureTypeC)
oddMonsters.werebear = new Monster("werebear", "werebears", "LN", 2, 9, 0, 6, 0, 1, 0, 15, oddTreasureTables.treasureTypeC)

oddMonsters.minotaur = new Monster("minotaur", "minotaurs", "NC", 6, 12, 0, 6, 0, 1, 0, 10, oddTreasureTables.treasureTypeC)
oddMonsters.centaur = new Monster("centaur", "centaurs", "LN", 5, 18, 0, 4, 0, 1, 0, 5, oddTreasureTables.treasureTypeA)
oddMonsters.unicorn = new Monster("unicorn", "unicorns", "L", 2, 24, 0, 4, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.nixie = new Monster("nixie", "nixies", "N", 7, 12, 0, 1, 0, 1, 0, 100, oddTreasureTables.treasureTypeB)
oddMonsters.pixie = new Monster("pixie", "pixies", "N", 6, 9, 18, 1, 0, 1, 0, 25, oddTreasureTables.treasureTypeC)
oddMonsters.dryad = new Monster("dryad", "dryads", "N", 5, 12, 0, 2, 0, 1, 0, 20, oddTreasureTables.treasureTypeD)
oddMonsters.treant = new Monster("treant", "treants", "L", 2, 6, 0, 8, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)

oddMonsters.gnome = new Monster("gnome", "gnomes", "LN", 5, 6, 0, 1, 0, 1, 0, 60, oddTreasureTables.treasureTypeC)
oddMonsters.dwarf = new Monster("dwarf", "dwarves", "LN", 4, 6, 0, 1, 0, 1, 0, 50, oddTreasureTables.treasureTypeG)
oddMonsters.halfling = new Monster("halfling", "halflings", "LN", 7, 9, 0, 1, 0, 1, 0, 75, oddTreasureTables.treasureTypeC)
oddMonsters.elf = new Monster("elf", "elves", "LN", 5, 12, 0, 1, 1, 1, 0, 25, oddTreasureTables.treasureTypeE)
oddMonsters.fairy = new Monster("fairy", "fairies", "LNC", 5, 12, 0, 1, 1, 1, 0, 25, oddTreasureTables.treasureTypeE)

oddMonsters.pegasus = new Monster("pegasus", "pegasi", "L", 6, 24, 48, 2, 2, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.hippogriff = new Monster("hippogriff", "hippogriffs", "L", 5, 18, 36, 3, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.griffon = new Monster("griffon", "griffons", "N", 3, 12, 30, 7, 0, 1, 0, 10, oddTreasureTables.treasureTypeE)
oddMonsters.roc = new Monster("roc", "rocs", "LN", 4, 6, 48, 6, 0, 1, 0, 20, oddTreasureTables.treasureTypeI)

oddMonsters.invisiblestalker = new Monster("invisible stalker", "invisible stalkers", "N", 3, 12, 12, 8, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.djinn = new Monster("djinn", "djinn", "N", 5, 9, 24, 7, 1, 2, -1, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.efreet = new Monster("efreet", "efreet", "NC", 3, 9, 24, 10, 0, 2, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.balrog = new Monster("balrog", "balrogs", "C", 2, 6, 15, 10, 0, 1, 1, 25, oddTreasureTables.treasureTypeF)

oddMonsters.airelemental = new Monster("air elemental", "air elementals", "N", 2, 0, 36, 8, 0, 1, 1, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.earthelemental = new Monster("earth elemental", "earth elementals", "N", 2, 6, 0, 8, 0, 3, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.fireelemental = new Monster("fire elemental", "fire elementals", "N", 2, 12, 0, 8, 0, 2, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.weaterelemental = new Monster("water elemental", "water elementals", "N", 2, 6, 18, 8, 0, 2, 0, 0, oddTreasureTables.treasureTypeNil)

oddMonsters.ochrejelly = new Monster("ochre jelly", "ochre jellies", "N", 8, 3, 0, 5, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.blackpudding = new Monster("black pudding", "black puddings", "N", 6, 6, 0, 10, 0, 3, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.greenslime = new Monster("green slime", "green slimes", "N", 9, 0, 0, 2, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.grayooze = new Monster("gray ooze", "gray oozes", "N", 8, 1, 0, 3, 0, 2, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.yellowmold = new Monster("yellow mold", "yellow mold", "N", 9, 0, 0, 0, 0, 0, oddTreasureTables.treasureTypeNil)

oddMonsters.lighthorse = new Monster("light horse", "light horses", "N", 7, 24, 0, 2, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.mediumhorse = new Monster("medium horse", "medium horses", "N", 7, 18, 0, 2, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.heavyhorse = new Monster("heavy horse", "heavy horses", "N", 7, 12, 0, 3, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.drafthorse = new Monster("draft horse", "draft horses", "N", 7, 12, 0, 2, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.mule = new Monster("mule", "mules", "N", 7, 12, 0, 2, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)

// vermin = new Monster("vermin", "vermin", "N", 8, 3, 0, 0, 1, 0, 1, 0, treasureTypeNil);
// wolf = new Monster("wolf", "wolves", "N", 8, 15, 0, 1, 0, 1, 0, 0, treasureTypeNil);
// boar = new Monster("boar", "boars", "N", 8, 12, 0, 1, 1, 1, 0, 0, treasureTypeNil);
// panther = new Monster("panther", "panthers", "N", 8, 12, 0, 2, 0, 1, 0, 0, treasureTypeNil);
// bear = new Monster("bear", "bears", "N", 8, 12, 0, 3, 0, 1, 1, 0, treasureTypeNil);

// missing monsters; see also: http://odd74.proboards.com/thread/1536/animal-stats
oddMonsters.giantRat = new Monster("giant rat", "giant rats", "N", 7, 12, 0, 0.5, 0, 1, 0, 10, oddTreasureTables.treasureTypeC)
oddMonsters.centipede = new Monster("centipede", "centipedes", "N", 9, 9, 0, 0, 1, 0, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantSpider = new Monster("giant spider", "giant spiders", "N", 8, 9, 0, 1, 0, 1, 0, 60, oddTreasureTables.treasureTypeC)
oddMonsters.giantLizard = new Monster("giant lizard", "giant lizards", "N", 7, 9, 0, 2, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantHog = new Monster("giant hog", "giant hogs", "N", 7, 12, 0, 3, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantSnake = new Monster("giant snake", "giant snakes", "N", 7, 9, 0, 2, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantWeasel = new Monster("giant weasel", "giant weasels", "N", 7, 12, 0, 2, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantBeetle = new Monster("giant beetle", "giant beetles", "N", 3, 9, 0, 4, 0, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.giantScorpion = new Monster("giant scorpion", "giant scorpions", "N", 3, 9, 0, 3, 1, 1, 0, 0, oddTreasureTables.treasureTypeNil)
oddMonsters.whiteApe = new Monster("white ape", "white ape", "N", 6, 12, 0, 6, 0, 1, 2, 10, oddTreasureTables.treasureTypeC)


// unknown

// giant crabs
// giant octopi
// giant squid
// giant leeches
// giant fish - 9ft sabertooth salmon?
// dragon turtle

// giant toads
// giant ants
// apes
// lions

// tyr rex
// pter'dyle
// triceratops
// bronto
// stegosaur

// apt
// banth
// thoat
// calot
// orluk
// sith
// thark
// darseen

// cave bear - comparable in size to polar/grizzly bears
  // short-faced bear is larger
// dire wolf - only a little bigger than modern wolves
// sabre tooth tiger - bigger and sturdier than modern tigers
// spotted lion - smaller mountain predator
  // american lion is 25% larger than modern lion
// mastadon - assume ~10 hd based on AD&D elephant
// wooly rhino - smaller than elephant, ~8 HD
// titanothere - probably smaller than wooly rhino
// mammoth - assume ~10 hd based on AD&D elephant

// even more!
// giant condor (5m/16ft wingspan, nearly pteronodon size)
// giant moa / terror bird

export {
  oddMonsters as default,
}
