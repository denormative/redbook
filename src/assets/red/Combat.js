// @flow

import type { PartyT, EncounterT, Character, MonsterI } from '../types'
import { roll, pick } from '../random'

function rollReaction() {
  switch (roll([2, 6, 0])) {
    case 2:
    case 3:
      return { result: "attack", bonus: 0 }
    case 4:
    case 5:
    case 6:
      return { result: "aggressive", bonus: -4 }
    case 7:
    case 8:
    case 9:
      return { result: "cautious", bonus: 0 }
    case 10:
    case 11:
      return { result: "neutral", bonus: +4 }
    case 12:
      return { result: "friendly", bonus: 0 }
    default:
      return { result: "", bonus: 0 }
  }
}

function startEncounter(party: PartyT, encounter: EncounterT, debugOutput: Function) {
  console.log(party.characters)
  console.log(encounter.monsters)
  debugOutput(party.characters)
  const reaction = rollReaction()

  /* encounter distance is surprised is 1d4x10 feet/yards
    1d6 for both groups surprise:
      both: both loose the ronud staring at each other
      one: the other can evade/attack/hide-in-ambush (if other party is moving)/other round of action
  */

  // 1) Time switches to 10 second rounds
  // 2) Surprise
  // 3a) On first round, if surprise don't roll Initiative
  // 3b) Initiative (roll 1d6 for both sides; higher side goes first)
  // 4) Reaction roll?
  if (!reaction.result) {
    // FIXME: Actually handle the reaction; we always fight
    // 5b) If not immediately fight; converstaion can happen
    // 5c) If PCs run, make morale check for monsters to see if they chase
  }
  else {
    // 5d) Conbat!
  }
  // 6) Round up time to a 10 minute turn, proceed as usual
}

function attackHand2Hand(c: Character, e: MonsterI, debugOutput: Function) {
  const target = c.THAC0 - e.base.ac
  // TODO: AC modification due to partial cover

  let attack = roll([1, 20, 0])
  const natural20 = (attack === 20)

  // Adjust str for melee:
  if (c.equipped.weapon && c.equipped.weapon.base.actions.hit) {
    attack += c.abilities.str.mod
  }
  // TODO: Adjust dex for thrown/ranged
  // TODO: Magic bonus spells/weapons
  // TODO: Partial cover bonuses (ranged only?)
  // TODO: Curses affecting combat
  // TODO: Fighter combat options
  // TODO: Weapon mastery

  debugOutput(`Attack ${attack} ${natural20 ? "(natural20) " : ""}vs ${target}`)
  if (natural20 || (attack >= target)) {
    let damage = roll(c.equipped.weapon.base.damage) + c.abilities.str.mod
    if (damage < 1) {
      damage = 1
    }
    // TODO; magic bonuses
    // TODO: weapon side effects (poison, etc)
    // TODO: fighter combat options
    // TODO: weapon mastery
    debugOutput(`Attack hit ${e.name} (${e.hp}hp) for ${damage} damage`)
    e.hp -= damage
    if (e.hp <= 0) {
      debugOutput(`${e.name} killed.`)
    }
  }
}

function partyAttack(party: PartyT, encounter: EncounterT, debugOutput: Function) {
  debugOutput("partyAttack")

  party.characters.filter((c) => c.hp > 0).forEach((c) => {
    // TODO: Multiple attacks
    // 1) Morale check?
    // 2) Movement
    // 3) Missile combat: chose target -> attack roll -> roll damage on success
    // 4) Magic: choose target+spell -> saving throws -> apply affect
    // 5) Hand2Hand combat: chose target -> attack roll -> roll damage on success
    const enemy = pick(encounter.monsters.filter((e) => e.hp > 0))
    if (enemy === undefined) {
      encounter.combatFinished = true
      // Enemies must all be dead
      return
    }
    debugOutput(`${c.base.name} vs ${enemy.name} (${enemy.hp}hp)`)
    attackHand2Hand(c, enemy, debugOutput)
  })
}

function monsterAttack(party: PartyT, encounter: EncounterT, debugOutput: Function) { // eslint-disable-line
  debugOutput("monsterAttack")
  // debugOutput(encounter.monsters)
  // debugOutput(party.characters)

  // 1) Morale check?
  // 2) Movement
  // 3) Missile combat: chose target -> attack roll -> roll damage on success
  // 4) Magic: choose target+spell -> saving throws -> apply affect
  // 5) Hand2Hand combat: chose target -> attack roll -> roll damage on success
}

function fightRound(party: PartyT, encounter: EncounterT, debugOutput: Function) {
  if (encounter.combatFinished) {
    debugOutput("Can't fight, combat finished.")
    return
  }

  // A) Initiative
  const initative = {
    party: roll([1, 6, 0]),
    monsters: roll([1, 6, 0]),
  }
  // we'll give the party the benefit of the doubt in ties
  if (initative.party >= initative.monsters) {
    // B) First side
    partyAttack(party, encounter, debugOutput)
    // C) Other side goes
    monsterAttack(party, encounter, debugOutput)
  }
  else {
    // B) First side
    monsterAttack(party, encounter, debugOutput)
    // C) Other side goes
    partyAttack(party, encounter, debugOutput)
  }
  // D) Special effects
}

export {
  fightRound, // eslint-disable-line
  startEncounter,
}
