<template>
  <div class="container-fluid">
    <div class="d-flex flex-row-reverse">
      <button class="btn btn-danger ml-1" @click="rollEncounter()">Roll Encounter</button>
      <button class="btn btn-danger" @click="rollParty()">Roll Party</button>
    </div>
    <div class="d-flex flex-row justify-content-between">
      <div class="flex-col">
        <div class="flex-row" v-for="c in party.characters">
          <div class="font-weight-bold">{{c.base.name}}</div>
          <div>{{c.base.class.name}} {{c.base.level}}; AC {{c.ac}}; hp: {{c.hp}}/{{c.base.maxHp}}; THAC0: {{c.THAC0}}</div>
          <span v-for="s in statsList">
            <span>{{statsName[s]}}: {{c.abilities[s].score}}
              <span v-if="c.abilities[s].mod<0"> ({{c.abilities[s].mod}}) </span>
              <span v-if="c.abilities[s].mod>0"> (+{{c.abilities[s].mod}}) </span>
            </span>
          </span>
          <div>
            <span v-if="c.equipped.weapon">
              {{c.equipped.weapon.base.name}}
              <span v-if="c.equipped.weapon.base.actions.hit && !c.equipped.weapon.base.actions.throw">
                ({{toDiceString(c.equipped.weapon.base.damage)}});
              </span>
              <span v-if="c.equipped.weapon.base.actions.throw || c.equipped.weapon.base.actions.shoot">
                ({{toDiceString(c.equipped.weapon.base.damage)}},
                range: {{c.equipped.weapon.base.range[0]}}/{{c.equipped.weapon.base.range[1]}}/{{c.equipped.weapon.base.range[2]}});
              </span>
            </span>
            <span v-if="c.equipped.armour">
              {{c.equipped.armour.base.name}} (AC {{c.equipped.armour.base.baseAC}});
            </span>
            <span v-for="m in moneyList">
              <span v-if="c.base.money[m]>0">{{c.base.money[m]}}{{numberWithCommas(m)}} </span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex-col">
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
      <textarea id="output-log" class="full-text-area" rows="10" cols="80">{{outputLog}}</textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { generateParty } from "@/assets/red/PCs.js"
import { generateEncounter } from "@/assets/red/Monsters.js"
import type { Dice } from '../assets/types'
import { numberWithCommas } from '../assets/utils'

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
      moneyList: ["pp", "gp", "ep", "sp", "cp"],
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
      // this.output(JSON.stringify(this.encounter))
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
    numberWithCommas,
  },
}
</script>

<style scoped>

</style>
