<template>
  <div class="container-fluid">
    <div class="d-flex flex-row-reverse">
      <button class="btn btn-danger ml-1" @click="rollEncounter()">Roll Encounter</button>
      <button class="btn btn-danger" @click="rollParty()">Roll Party</button>
    </div>
    <div class="d-flex flex-row">
      <div class="flex-col w-50">
        <div class="flex-row" v-for="c in party.characters">
          <div class="font-weight-bold">{{c.base.name}}</div>
          <span v-for="s in statsList">
            <span>{{statsName[s]}}: {{c.abilities[s].score}}
              <span v-if="c.abilities[s].mod<0"> ({{c.abilities[s].mod}}) </span>
              <span v-if="c.abilities[s].mod>0"> (+{{c.abilities[s].mod}}) </span>
            </span>
          </span>
        </div>
      </div>
      <div class="flex-col w-50">
        <div class="flex-row" v-for="m in encounter.monsters">
          <span class="font-weight-bold">{{m.base.name}}</span>
          <span class=""> AC: {{m.base.ac}} hp: {{m.hp}}</span>
          <div class="text-capitalize" v-for="attack in m.base.attacks">
            &nbsp;&nbsp;&nbsp;&nbsp;{{attack.name}} {{toDiceString(attack.damage)}}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <textarea id="output-log" class="full-text-area" rows="20" cols="80">{{outputLog}}</textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { generateParty } from "@/assets/red/PCs.js"
import { generateEncounter } from "@/assets/red/Monsters.js"
import type { Dice } from '../assets/types'

export default {
  name: 'red',
  props: [],
  components: {
  },
  data() {
    return {
      outputLog: "",
      statsList: ["str", "int", "wis", "dex", "con", "cha"],
      statsName: { str: "S", int: "I", wis: "W", dex: "D", con: "C", cha: "X" },
      party: {
      },
      encounter: {
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rollParty()
      this.output(JSON.stringify(this.party.characters))
      this.rollEncounter()
      this.output(JSON.stringify(this.encounter))
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
    toDiceString(dice: Dice) {
      const num = (dice[0] < 1) ? 1 : dice[0]
      const sides = (dice[1] < 2) ? 2 : dice[1]
      const add = dice[2]

      if (add > 0) {
        return `${num}d${sides}+${add}`
      }
      else if (add < 0) {
        return `${num}d${sides}${add}`
      }
      return `${num}d${sides}`
    },
    rollParty() {
      this.party = generateParty()
      // recalculatePCs(this.party.characters)
    },
    rollEncounter() {
      this.encounter = generateEncounter()
    },
  },
}
</script>

<style scoped>

</style>
