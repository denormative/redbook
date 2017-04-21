/* @flow */
/* eslint default-case: "off" */
/* eslint consistent-return: "off" */
// FIXME: remove the above eventually
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

import { d2, d3, d4, d6, d8, d12 } from '../dice.js'

// wilderness encounters
function monsterHumanTypical() {
  switch (d12()) {
    case 1: return "Bandits"
    case 2: return "Brigands"
    case 3: return "Necromancer"
    case 4: return "Wizard"
    case 5: return "Bandits"
    case 6: return "Berserkers"
    case 7: return "Lord"
    case 8: return "Superhero"
    case 9: return "Brigands"
    case 10: return "Bandits"
    case 11: return "Evil High Priest"
    case 12: return "Patriarch"
  }
}

function monsterHumanMountain() {
  switch (d12()) {
    case 1: return "Bandits"
    case 2: return "Berserkers"
    case 3: return "Brigands"
    case 4: return "Lord"
    case 5: return "Wizard"
    case 6: return "Superhero"
    case 7: return "Cavemen"
    case 8: return "Necromancer"
    case 9: return "Evil High Priest"
    case 10: return "Cavemen"
    case 11: return "Patriarch"
    case 12: return "Berserkers"
  }
}

function monsterHumanDesert() {
  switch (d6()) {
    case 1: return "Nomads"
    case 2: return "Dervishes"
    case 3: return "Nomads"
    case 4: return "Lord"
    case 5: return "Wizard"
    case 6: return "Nomads"
  }
}

function monsterHumanBarsoom() {
  switch (d6()) {
    case 1: return "Red Martians"
    case 2: return "Tharks"
    case 3: return "Black Martians"
    case 4: return "Yellow Martians"
    case 5: return "Tharks"
    case 6: return "White Martians"
  }
}

function monsterHumanWater() {
  switch (d6()) {
    case 1: return "Buccaneers"
    case 2: return "Pirates"
    case 3: return "Buccaneers"
    case 4: return "Pirates"
    case 5: return "Buccaneers"
    case 6: return "Mermen"
  }
}

function monsterFlyer() {
  switch (d12()) {
    case 1: return "Pegasi"
    case 2: return "Rocs"
    case 3: return "Chimerae"
    case 4: return "Hippogriffs"
    case 5: return "Griffons"
    case 6: return "Manticores"
    case 7: return "Rocs"
    case 8: return "Wyverns"
    case 9: return "Dragons"
    case 10: return "Pegasi"
    case 11: return "Hippogriffs"
    case 12: return "Balrogs"
  }
}

function monsterSwimmer() {
  switch (d12()) {
    case 1: return "Giant Crabs"
    case 2: return "Nixies"
    case 3: return "Giant Octopi"
    case 4: return "Giant Squid"
    case 5: return "Sea Monster"
    case 6: return "Giant Snakes"
    case 7: return "Crocodiles"
    case 8: return "Giant Leeches"
    case 9: return "Mermen"
    case 10: return "Nixies"
    case 11: return "Giant Fish"
    case 12: return "Dragon Turtle"
  }
}

function monsterUndead() {
  switch (d8()) {
    case 1: return "Skeletons"
    case 2: return "Zombies"
    case 3: return "Ghouls"
    case 4: return "Wights"
    case 5: return "Wraiths"
    case 6: return "Mummies"
    case 7: return "Spectres"
    case 8: return "Vampires"
  }
}

function monsterHumanoid() {
  switch (d12()) {
    case 1: return "Kobolds"
    case 2: return "Goblins"
    case 3: return "Orcs"
    case 4: return "Hobgoblins"
    case 5: return "Gnolls"
    case 6: return "Ogres"
    case 7: return "Trolls"
    case 8: return "Giants"
    case 9: return "Gnomes"
    case 10: return "Dwarves"
    case 11: return "Elves"
    case 12: return "Ents"
  }
}

function monsterLycanthrope() {
  switch (d4()) {
    case 1: return "Werewolves"
    case 2: return "Wereboars"
    case 3: return "Weretigers"
    case 4: return "Werebears"
  }
}

function monsterDragon() {
  switch (d12()) {
    case 1: return "Black Dragons"
    case 2: return "White Dragons"
    case 3: return "Green Dragons"
    case 4: return "Blue Dragons"
    case 5: return "Red Dragons"
    case 6: return "Gold Dragons"
    case 7: return "Cockatrices"
    case 8: return "Basilisks"
    case 9: return "Wyverns"
    case 10: return "Balrogs"
    case 11: return "Chimerae"
    case 12: return "Hydra (7-12 heads)"
  }
}

function monsterAnimal() {
  switch (d12()) {
    case 1: return "Spiders"
    case 2: return "Centipedes"
    case 3: return "Lizards"
    case 4: return "Toads"
    case 5: return "Ants"
    case 6: return "Weasels"
    case 7: return "Apes"
    case 8: return "Beetles"
    case 9: return "Scorpions"
    case 10: return "Lions"
    case 11: return "Boars"
    case 12: return "Snakes"
  }
}

function monsterMiscFey() {
  switch (d8()) {
    case 1: return "Centaurs"
    case 2: return "Unicorns"
    case 3: return "Minotaurs"
    case 4: return "Gorgons"
    case 5: return "Pixies"
    case 6: return "Manticores"
    case 7: return "Dryads"
    case 8: return "Medusae"
  }
}

function monsterMiscDino() {
  switch (d8()) {
    case 1: return "Tyrannosaurus Rex"
    case 2: return "Pterodactyl"
    case 3: return "Triceratops"
    case 4: return "Brontosaurus"
    case 5: return "Stegosaurus"
    case 6: return "Tyrannosaurus Rex"
    case 7: return "Pterodactyl"
    case 8: return "Brontosaurus"
  }
}

function monsterBarsoom() {
  switch (d12()) {
    case 1: return "Apts"
    case 2: return "Banths"
    case 3: return "Thoats"
    case 4: return "Calots"
    case 5: return "White Apes"
    case 6: return "Thoats"
    case 7: return "Orluks"
    case 8: return "Sith"
    case 9: return "Tharks"
    case 10: return "Darseen"
    case 11: return "Banths"
    case 12: return "Tharks"
  }
}

function monsterIceAge() {
  switch (d12()) {
    case 1: return "Cave Bears"
    case 2: return "Dire Wolves"
    case 3: return "Sabre Tooth Tigers"
    case 4: return "Mastadons"
    case 5: return "Spotted Lions"
    case 6: return "Wooly Rhino"
    case 7: return "Titanotheres"
    case 8: return "Cave Bears"
    case 9: return "Mammoths"
    case 10: return "Sabre Tooth Tigers"
    case 11: return "Dire Wolves"
    case 12: return "Spotted Lions"
  }
}

function encounterClear() {
  switch (d8()) {
    case 1: return monsterHumanTypical()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterAnimal()
    case 6: return monsterHumanTypical()
    case 7: return monsterAnimal()
    case 8: return monsterDragon()
  }
}

function encounterWoods() {
  switch (d8()) {
    case 1: return monsterHumanTypical()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterLycanthrope()
    case 6: return monsterHumanTypical()
    case 7: return monsterAnimal()
    case 8: return monsterDragon()
  }
}

function encounterRiver() {
  switch (d8()) {
    case 1: return monsterHumanWater()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterSwimmer()
    case 6: return monsterSwimmer()
    case 7: return monsterAnimal()
    case 8: return monsterDragon()
  }
}

function encounterSwamp() {
  switch (d8()) {
    case 1: return monsterHumanWater()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterSwimmer()
    case 6: return monsterUndead()
    case 7: return monsterUndead()
    case 8: return monsterDragon()
  }
}

function encounterMountains() {
  switch (d8()) {
    case 1: return monsterHumanTypical()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterAnimal()
    case 6: return monsterHumanoid()
    case 7: return monsterDragon()
    case 8: return monsterDragon()
  }
}

function encounterDesert() {
  switch (d6()) {
    case 1: return monsterHumanTypical()
    case 2: return monsterFlyer()
    case 3: return monsterHumanoid()
    case 4: return monsterLycanthrope()
    case 5: return monsterAnimal()
    case 6: return monsterDragon()
  }
}

function encounterCity() {
  switch (d4()) {
    case 1: return monsterHumanTypical()
    case 2: return monsterUndead()
    case 3: return monsterUndead()
    case 4: return monsterHumanTypical()
  }
}

function encounterMars() {
  switch (d2()) {
    case 1: return monsterHumanBarsoom()
    case 2: return monsterBarsoom()
  }
}

function encounterLostWorld() {
  switch (d3()) {
    case 1: return "Cave Men"
    case 2: return monsterIceAge()
    case 3: return monsterMiscDino()
  }
}

const oddWildernessEncounters = {
  monsterHumanTypical,
  monsterHumanMountain,
  monsterHumanDesert,
  monsterHumanBarsoom,
  monsterHumanWater,
  monsterFlyer,
  monsterSwimmer,
  monsterUndead,
  monsterHumanoid,
  monsterLycanthrope,
  monsterDragon,
  monsterAnimal,
  monsterMiscFey,
  monsterMiscDino,
  monsterBarsoom,
  monsterIceAge,
  encounterClear,
  encounterWoods,
  encounterRiver,
  encounterSwamp,
  encounterMountains,
  encounterDesert,
  encounterCity,
  encounterMars,
  encounterLostWorld,
}

export {
  oddWildernessEncounters as default,
  monsterHumanTypical,
  monsterHumanMountain,
  monsterHumanDesert,
  monsterHumanBarsoom,
  monsterHumanWater,
  monsterFlyer,
  monsterSwimmer,
  monsterUndead,
  monsterHumanoid,
  monsterLycanthrope,
  monsterDragon,
  monsterAnimal,
  monsterMiscFey,
  monsterMiscDino,
  monsterBarsoom,
  monsterIceAge,
  encounterClear,
  encounterWoods,
  encounterRiver,
  encounterSwamp,
  encounterMountains,
  encounterDesert,
  encounterCity,
  encounterMars,
  encounterLostWorld,
}
