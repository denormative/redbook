import { roll } from '../assets/dice.js'

function newAbilities() {
  return {
    str: { score: 0, mod: 0 },
    int: { score: 0, mod: 0 },
    wis: { score: 0, mod: 0 },
    dex: { score: 0, mod: 0 },
    con: { score: 0, mod: 0 },
    cha: { score: 0, mod: 0 },
  }
}

// returns the modifier for a given ability score
function modifierForAbilityScore(ability) {
  if (ability <= 3) {
    return -3
  }
  else if (ability <= 5) {
    return -2
  }
  else if (ability <= 8) {
    return -1
  }
  else if (ability <= 12) {
    return 0
  }
  else if (ability <= 15) {
    return 1
  }
  else if (ability <= 17) {
    return 2
  }
  return 3
}

function rollAbilities() {
  const abilities = newAbilities()

  Object.keys(abilities).forEach((key) => {
    abilities[key].score = roll.d6(3)
  })
  recalculateAbilityModifiers(abilities)

  console.log(abilities)

  return abilities
}

function recalculateAbilityModifiers(abilities) {
  Object.keys(abilities).forEach((key) => {
    abilities[key].mod = modifierForAbilityScore(abilities[key].score)
  })
}

export {
  rollAbilities,
  recalculateAbilityModifiers,
}
