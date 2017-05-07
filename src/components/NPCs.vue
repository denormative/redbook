<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#npcs-buttons">NPCs</h6>
    <div id="npcs-buttons" class="collapse.in">
      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcFighter(d10()))">Fighter</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcFighter(1))">Veteran (1)</a></li>
          <li><a @click="$emit('output', npcFighter(2))">Warrior (2)</a></li>
          <li><a @click="$emit('output', npcFighter(3))">Swordsman (3)</a></li>
          <li><a @click="$emit('output', npcFighter(4))">Hero (4)</a></li>
          <li><a @click="$emit('output', npcFighter(5))">Swashbuckler (5)</a></li>
          <li><a @click="$emit('output', npcFighter(6))">Myrmidon (6)</a></li>
          <li><a @click="$emit('output', npcFighter(7))">Champion (7)</a></li>
          <li><a @click="$emit('output', npcFighter(8))">Superhero (8)</a></li>
          <li><a @click="$emit('output', npcFighter(9))">Lord (9)</a></li>
          <li><a @click="$emit('output', npcFighter(10))">Lord (10)</a></li>
          <li><a @click="$emit('output', npcFighter(11))">Lord (11)</a></li>
          <li><a @click="$emit('output', npcFighter(12))">Lord (12)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcThief(d10()))">Thief</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcThief(1))">Apprentice (1)</a></li>
          <li><a @click="$emit('output', npcThief(2))">Footpad (2)</a></li>
          <li><a @click="$emit('output', npcThief(3))">Robber (3)</a></li>
          <li><a @click="$emit('output', npcThief(4))">Burglar (4)</a></li>
          <li><a @click="$emit('output', npcThief(5))">Cutpurse (5)</a></li>
          <li><a @click="$emit('output', npcThief(6))">Sharper (6)</a></li>
          <li><a @click="$emit('output', npcThief(7))">Pilferer (7)</a></li>
          <li><a @click="$emit('output', npcThief(8))">Master Pilferer (8)</a></li>
          <li><a @click="$emit('output', npcThief(9))">Thief (9)</a></li>
          <li><a @click="$emit('output', npcThief(10))">Master Thief (10)</a></li>
          <li><a @click="$emit('output', npcThief(11))">Master Thief (11)</a></li>
          <li><a @click="$emit('output', npcThief(12))">Master Thief (12)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcCleric(d10()))">Cleric</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcCleric(1))">Acolyte (1)</a></li>
          <li><a @click="$emit('output', npcCleric(2))">Adept (2)</a></li>
          <li><a @click="$emit('output', npcCleric(3))">Priest (3)</a></li>
          <li><a @click="$emit('output', npcCleric(4))">Vicar (4)</a></li>
          <li><a @click="$emit('output', npcCleric(5))">Curate (5)</a></li>
          <li><a @click="$emit('output', npcCleric(6))">Bishop (6)</a></li>
          <li><a @click="$emit('output', npcCleric(7))">Lama (7)</a></li>
          <li><a @click="$emit('output', npcCleric(8))">Patriarch (8)</a></li>
          <li><a @click="$emit('output', npcCleric(9))">Patriarch (9)</a></li>
          <li><a @click="$emit('output', npcCleric(10))">Patriarch (10)</a></li>
          <li><a @click="$emit('output', npcCleric(11))">Patriarch (11)</a></li>
          <li><a @click="$emit('output', npcCleric(12))">Patriarch (12)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcWizard(d16()))">Magic-User</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcWizard(1))">Medium (1)</a></li>
          <li><a @click="$emit('output', npcWizard(2))">Seer (2)</a></li>
          <li><a @click="$emit('output', npcWizard(3))">Conjurer (3)</a></li>
          <li><a @click="$emit('output', npcWizard(4))">Theurgist (4)</a></li>
          <li><a @click="$emit('output', npcWizard(5))">Thaumaturgist (5)</a></li>
          <li><a @click="$emit('output', npcWizard(6))">Magician (6)</a></li>
          <li><a @click="$emit('output', npcWizard(7))">Enchanter (7)</a></li>
          <li><a @click="$emit('output', npcWizard(8))">Warlock (8)</a></li>
          <li><a @click="$emit('output', npcWizard(9))">Sorcerer (9)</a></li>
          <li><a @click="$emit('output', npcWizard(10))">Necromancer (10)</a></li>
          <li><a @click="$emit('output', npcWizard(11))">Wizard (11)</a></li>
          <li><a @click="$emit('output', npcWizard(12))">Wizard (12)</a></li>
          <li><a @click="$emit('output', npcWizard(13))">Wizard (13)</a></li>
          <li><a @click="$emit('output', npcWizard(14))">Wizard (14)</a></li>
          <li><a @click="$emit('output', npcWizard(15))">Wizard (15)</a></li>
          <li><a @click="$emit('output', npcWizard(16))">Wizard (16)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcDwarf(d6()))">Dwarf</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcDwarf(1))">Dwarf Veteran (1)</a></li>
          <li><a @click="$emit('output', npcDwarf(2))">Dwarf Warrior (2)</a></li>
          <li><a @click="$emit('output', npcDwarf(3))">Dwarf Swordsman (3)</a></li>
          <li><a @click="$emit('output', npcDwarf(4))">Dwarf Hero (4)</a></li>
          <li><a @click="$emit('output', npcDwarf(5))">Dwarf Swashbuckler (5)</a></li>
          <li><a @click="$emit('output', npcDwarf(6))">Dwarf Myrmidon (6)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcHalfling(d4()))">Halfling</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcHalfling(1))">Halfling Veteran (1)</a></li>
          <li><a @click="$emit('output', npcHalfling(2))">Halfling Warrior (2)</a></li>
          <li><a @click="$emit('output', npcHalfling(3))">Halfling Swordsman (3)</a></li>
          <li><a @click="$emit('output', npcHalfling(4))">Halfling Hero (4)</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', npcElf(d8()))">Elf</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', npcElf(1))">Elf Veteran-Medium (1)</a></li>
          <li><a @click="$emit('output', npcElf(2))">Elf Warrior-Seer (2)</a></li>
          <li><a @click="$emit('output', npcElf(3))">Elf Swordsman-Conjurer (3)</a></li>
          <li><a @click="$emit('output', npcElf(4))">Elf Hero-Theurgist (4)</a></li>
          <li><a @click="$emit('output', npcElf(5))">Elf Hero-Thaumaturgist (5)</a></li>
          <li><a @click="$emit('output', npcElf(6))">Elf Hero-Magician (6)</a></li>
          <li><a @click="$emit('output', npcElf(7))">Elf Hero-Enchanter (7)</a></li>
          <li><a @click="$emit('output', npcElf(8))">Elf Hero-Warlock (8)</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddNPCs from '../assets/odd/oddNPCs.js'
import { roll } from '../assets/dice.js'

export default {
  name: 'npcs',
  props: [],
  components: {
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    ...oddNPCs,
    ...roll,
  },
}
</script>

<style scoped>

</style>
