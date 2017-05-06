<template>
  <div class="container-fluid">
    <div class="d-flex flex-row">
      <div class="flex-col">
        <basic-dice v-on:output="value => output(value)"></basic-dice>
        <special-dice v-on:output="value => output(value)"></special-dice>
        <basic-tables v-on:output="value => output(value)"></basic-tables>
        <treasure-tables v-on:output="value => output(value)"></treasure-tables>
        <encounter-tables v-on:output="value => output(value)"></encounter-tables>
        <names v-on:output="value => output(value)"></names>

        <h6 class="buttonLabel" data-toggle="collapse" href="#npcs-buttons">NPCs</h6>
        <div id="npcs-buttons" class="collapse.in">
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcFighter(d10()))">Fighter</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcFighter(1))">Veteran (1)</a></li>
              <li><a @click="output(npcFighter(2))">Warrior (2)</a></li>
              <li><a @click="output(npcFighter(3))">Swordsman (3)</a></li>
              <li><a @click="output(npcFighter(4))">Hero (4)</a></li>
              <li><a @click="output(npcFighter(5))">Swashbuckler (5)</a></li>
              <li><a @click="output(npcFighter(6))">Myrmidon (6)</a></li>
              <li><a @click="output(npcFighter(7))">Champion (7)</a></li>
              <li><a @click="output(npcFighter(8))">Superhero (8)</a></li>
              <li><a @click="output(npcFighter(9))">Lord (9)</a></li>
              <li><a @click="output(npcFighter(10))">Lord (10)</a></li>
              <li><a @click="output(npcFighter(11))">Lord (11)</a></li>
              <li><a @click="output(npcFighter(12))">Lord (12)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcThief(d10()))">Thief</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcThief(1))">Apprentice (1)</a></li>
              <li><a @click="output(npcThief(2))">Footpad (2)</a></li>
              <li><a @click="output(npcThief(3))">Robber (3)</a></li>
              <li><a @click="output(npcThief(4))">Burglar (4)</a></li>
              <li><a @click="output(npcThief(5))">Cutpurse (5)</a></li>
              <li><a @click="output(npcThief(6))">Sharper (6)</a></li>
              <li><a @click="output(npcThief(7))">Pilferer (7)</a></li>
              <li><a @click="output(npcThief(8))">Master Pilferer (8)</a></li>
              <li><a @click="output(npcThief(9))">Thief (9)</a></li>
              <li><a @click="output(npcThief(10))">Master Thief (10)</a></li>
              <li><a @click="output(npcThief(11))">Master Thief (11)</a></li>
              <li><a @click="output(npcThief(12))">Master Thief (12)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcCleric(d10()))">Cleric</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcCleric(1))">Acolyte (1)</a></li>
              <li><a @click="output(npcCleric(2))">Adept (2)</a></li>
              <li><a @click="output(npcCleric(3))">Priest (3)</a></li>
              <li><a @click="output(npcCleric(4))">Vicar (4)</a></li>
              <li><a @click="output(npcCleric(5))">Curate (5)</a></li>
              <li><a @click="output(npcCleric(6))">Bishop (6)</a></li>
              <li><a @click="output(npcCleric(7))">Lama (7)</a></li>
              <li><a @click="output(npcCleric(8))">Patriarch (8)</a></li>
              <li><a @click="output(npcCleric(9))">Patriarch (9)</a></li>
              <li><a @click="output(npcCleric(10))">Patriarch (10)</a></li>
              <li><a @click="output(npcCleric(11))">Patriarch (11)</a></li>
              <li><a @click="output(npcCleric(12))">Patriarch (12)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcWizard(d16()))">Magic-User</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcWizard(1))">Medium (1)</a></li>
              <li><a @click="output(npcWizard(2))">Seer (2)</a></li>
              <li><a @click="output(npcWizard(3))">Conjurer (3)</a></li>
              <li><a @click="output(npcWizard(4))">Theurgist (4)</a></li>
              <li><a @click="output(npcWizard(5))">Thaumaturgist (5)</a></li>
              <li><a @click="output(npcWizard(6))">Magician (6)</a></li>
              <li><a @click="output(npcWizard(7))">Enchanter (7)</a></li>
              <li><a @click="output(npcWizard(8))">Warlock (8)</a></li>
              <li><a @click="output(npcWizard(9))">Sorcerer (9)</a></li>
              <li><a @click="output(npcWizard(10))">Necromancer (10)</a></li>
              <li><a @click="output(npcWizard(11))">Wizard (11)</a></li>
              <li><a @click="output(npcWizard(12))">Wizard (12)</a></li>
              <li><a @click="output(npcWizard(13))">Wizard (13)</a></li>
              <li><a @click="output(npcWizard(14))">Wizard (14)</a></li>
              <li><a @click="output(npcWizard(15))">Wizard (15)</a></li>
              <li><a @click="output(npcWizard(16))">Wizard (16)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcDwarf(d6()))">Dwarf</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcDwarf(1))">Dwarf Veteran (1)</a></li>
              <li><a @click="output(npcDwarf(2))">Dwarf Warrior (2)</a></li>
              <li><a @click="output(npcDwarf(3))">Dwarf Swordsman (3)</a></li>
              <li><a @click="output(npcDwarf(4))">Dwarf Hero (4)</a></li>
              <li><a @click="output(npcDwarf(5))">Dwarf Swashbuckler (5)</a></li>
              <li><a @click="output(npcDwarf(6))">Dwarf Myrmidon (6)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcHalfling(d4()))">Halfling</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcHalfling(1))">Halfling Veteran (1)</a></li>
              <li><a @click="output(npcHalfling(2))">Halfling Warrior (2)</a></li>
              <li><a @click="output(npcHalfling(3))">Halfling Swordsman (3)</a></li>
              <li><a @click="output(npcHalfling(4))">Halfling Hero (4)</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(npcElf(d8()))">Elf</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(npcElf(1))">Elf Veteran-Medium (1)</a></li>
              <li><a @click="output(npcElf(2))">Elf Warrior-Seer (2)</a></li>
              <li><a @click="output(npcElf(3))">Elf Swordsman-Conjurer (3)</a></li>
              <li><a @click="output(npcElf(4))">Elf Hero-Theurgist (4)</a></li>
              <li><a @click="output(npcElf(5))">Elf Hero-Thaumaturgist (5)</a></li>
              <li><a @click="output(npcElf(6))">Elf Hero-Magician (6)</a></li>
              <li><a @click="output(npcElf(7))">Elf Hero-Enchanter (7)</a></li>
              <li><a @click="output(npcElf(8))">Elf Hero-Warlock (8)</a></li>
            </ul>
          </div>
        </div>

        <h6 class="buttonLabel" data-toggle="collapse" href="#experimental-buttons">Experimental</h6>
        <div id="experimental-buttons" class="collapse.in">
          <button type="button" class="btn btn-default btn-sm" @click="output(bandits())">Bandit Group</button>
          <button type="button" class="btn btn-default btn-sm" @click="output(brigands())">Brigand Group</button>
          <button type="button" class="btn btn-default btn-sm" @click="output(orcs())">Orc Lair</button>
          <button type="button" class="btn btn-default btn-sm" @click="output(village())">Village</button>
        </div>



      </div>
    </div>
    <div class="d-flex justify-content-center">
      <textarea id="output-log" class="full-text-area" rows="20" cols="80">{{outputLog}}</textarea>
    </div>
  </div>
  <!-- <div class="hello">
  <div v-for="char in $store.state.party.characters">
  {{char.name}}
</div>
<h2>Essential Links</h2>
<ul>
<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
<br>
<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
</ul>
<h2>Ecosystem</h2>
<ul>
<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
</ul>
</div> -->

</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import BasicDice from './BasicDice'
import SpecialDice from './SpecialDice'
import BasicTables from './BasicTables'
import TreasureTables from './TreasureTables'
import EncounterTables from './EncounterTables'
import Names from './Names'

import { rollAbilities } from '../vuex/abilities.js'
import { roll } from '../assets/dice.js'
import oddNPCs from '../assets/odd/oddNPCs.js'
import oddEncounters from '../assets/odd/oddEncounters.js'

export default {
  name: 'hello',
  props: [],
  components: {
    BasicDice,
    SpecialDice,
    BasicTables,
    TreasureTables,
    EncounterTables,
    Names,
  },
  data() {
    return {
      outputLog: "",
    }
  },
  mounted() {
    this.$nextTick(() => {
      Object.keys(this.$store.state.party.characters).forEach((char) => {
        // console.log(this.$store.state.party.characters[char])
        this.$store.state.party.characters[char].abilities = rollAbilities()
      })
    })
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    output(stuff) {
      this.outputLog = `${stuff}\n${this.outputLog}`
    },
    ...roll,
    ...oddNPCs,
    ...oddEncounters,
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
}
</style>
