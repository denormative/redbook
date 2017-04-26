<template>
  <div class="container-fluid">
    <div class="d-flex flex-row">
      <div class="flex-col">
        <div class="btn-group mb-1" v-for="y in diceToRoll">
          <button type="button" class="btn btn-default btn-sm" @click="output(d(1, y))">d{{y}}</button>
          <button type="button" class="btn btn-default btn-sm dropdown-toggle dropdown-toggle-split mr-1" data-toggle="dropdown" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li v-for="x in dropdownList"><a @click="output(d(x, y))">{{x}}d{{y}}</a></li>
          </ul>
        </div>

        <h6 class="buttonLabel" data-toggle="collapse" href="#dice-buttons">Special Dice</h6>
        <div id="dice-buttons" class="collapse show">
          <button class="btn btn-default btn-sm mr-1 " v-for="d in specialRolls" @click="output(multiple(d.n, d.x, d.y))">{{d.n}} x {{ d.x!=1 ? d.x : "" }}d{{d.y}}</button>
        </div>

        <h6 class="buttonLabel" data-toggle="collapse" href="#basic-tables-buttons">Basic Tables</h6>
        <div id="basic-tables-buttons" class="collapse show">
          <button class="btn btn-default btn-sm" @click="output(characterStats())">stats</button>
          <button class="btn btn-default btn-sm" @click="output(reaction())">reaction</button>
          <button class="btn btn-default btn-sm" @click="output(loyalty())">loyalty</button>
        </div>


        <h6 class="buttonLabel" data-toggle="collapse" href="#treasure-buttons">Treasure Tables</h6>
        <div id="treasure-buttons" class="collapse.in">
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(magicItem())">Magic Item</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(magicSword())">Sword</a></li>
              <li><a @click="output(miscWeapon())">Weapon</a></li>
              <li><a @click="output(armor())">Armor</a></li>
              <li><a @click="output(potion(true))">Potion</a></li>
              <li><a @click="output(scroll())">Scroll</a></li>
              <li><a @click="output(ring(true))">Ring</a></li>
              <li><a @click="output(wand())">Wand</a></li>
              <li><a @click="output(miscMagic())">Misc</a></li>
              <li><a @click="output(treasureMap())">Treasure Map</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(treasureTypeA())">Type A Land</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(treasureTypeADesert())">Type A Desert</a></li>
              <li><a @click="output(treasureTypeAWater())">Type A Water</a></li>
              <li><a @click="output(treasureTypeB())">Type B</a></li>
              <li><a @click="output(treasureTypeC())">Type C</a></li>
              <li><a @click="output(treasureTypeD())">Type D</a></li>
              <li><a @click="output(treasureTypeE())">Type E</a></li>
              <li><a @click="output(treasureTypeF())">Type F</a></li>
              <li><a @click="output(treasureTypeG())">Type G</a></li>
              <li><a @click="output(treasureTypeH())">Type H</a></li>
              <li><a @click="output(treasureTypeI())">Type I</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(treasureLevel1())">Level 1</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(treasureLevel2to3())">Level 2-3</a></li>
              <li><a @click="output(treasureLevel4to5())">Level 4-5</a></li>
              <li><a @click="output(treasureLevel6to7())">Level 6-7</a></li>
              <li><a @click="output(treasureLevel8to9())">Level 8-9</a></li>
              <li><a @click="output(treasureLevel10to12())">Level 10-12</a></li>
              <li><a @click="output(treasureLevel13())">Level 13+</a></li>
            </ul>
          </div>
        </div>

        <h6 class="buttonLabel" data-toggle="collapse" href="#encounter-buttons">Encounter Tables</h6>
        <div id="encounter-buttons" class="collapse.in">
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(monsterLevel1())">Dungeon Level 1</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(monsterLevel2())">Dungeon Level 2</a></li>
              <li><a @click="output(monsterLevel3())">Dungeon Level 3</a></li>
              <li><a @click="output(monsterLevel4())">Dungeon Level 4</a></li>
              <li><a @click="output(monsterLevel5())">Dungeon Level 5</a></li>
              <li><a @click="output(monsterLevel6())">Dungeon Level 6</a></li>
            </ul>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm" @click="output(encounterClear())">Clear Terrain</button>
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="output(encounterWoods())">Woods</a></li>
              <li><a @click="output(encounterRiver())">River</a></li>
              <li><a @click="output(encounterSwamp())">Swamp</a></li>
              <li><a @click="output(encounterMountains())">Mountains</a></li>
              <li><a @click="output(encounterDesert())">Desert</a></li>
              <li><a @click="output(encounterCity())">City</a></li>
              <li><a @click="output(encounterMars())">Mars</a></li>
              <li><a @click="output(encounterLostWorld())">Lost World</a></li>
            </ul>
          </div>

          <button class="btn btn-default btn-sm" @click="output(castleEncounter())">Castle</button>
        </div>

        <h6 class="buttonLabel" data-toggle="collapse" href="#names-buttons">Names</h6>
        <div id="names-buttons" class="collapse.in">
          <button class="btn btn-default btn-sm" @click="output(feminineName())">F. Name</button>
          <button class="btn btn-default btn-sm" @click="output(masculineName())">M. Name</button>
          <button class="btn btn-default btn-sm" @click="output(epithet())">Epithet</button>
        </div>

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
            <button type="button" class="btn btn-default btn-sm" @click="output(npcWizard(d10()))">Magic-User</button>
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

import { rollAbilities } from '../vuex/abilities.js'
import { roll } from '../assets/dice.js'
import oddNames from '../assets/names/oddNames.js'
import oddUtils from '../assets/odd/oddUtils.js'
import oddMagicSwords from '../assets/odd/oddMagicSwords.js'
import oddMagicItems from '../assets/odd/oddMagicItems.js'
import oddWildernessEncounters from '../assets/odd/oddWildernessEncounters.js'
import oddTreasureTables from '../assets/odd/oddTreasureTables.js'
import oddNPCs from '../assets/odd/oddNPCs.js'
import oddDungeonEncounters from '../assets/odd/oddDungeonEncounters.js'
import oddEncounters from '../assets/odd/oddEncounters.js'

export default {
  name: 'hello',
  props: [],
  components: {},
  data() {
    return {
      outputLog: "",
      dropdownList: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      diceToRoll: [2, 3, 4, 6, 8, 10, 12, 20, 100],
      specialRolls: [
        { n: 10, x: 1, y: 6, p: 0 },
        { n: 10, x: 1, y: 20, p: 0 },
        { n: 6, x: 3, y: 6, p: 0 },
      ],
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
    ...oddNames,
    ...oddUtils,
    ...oddMagicSwords,
    ...oddMagicItems,
    ...oddWildernessEncounters,
    ...oddTreasureTables,
    ...oddNPCs,
    ...oddDungeonEncounters,
    ...oddEncounters,
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

textarea {
  font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
}
</style>
