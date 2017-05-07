<template>
  <div class="container-fluid">
    <div class="d-flex flex-row">
      <div class="flex-col">
        <div class="flex-row" v-for="c in party.characters">
          <div class="font-weight-bold">{{c.name}}</div>
          <span v-for="s in statsList">
            <span>{{statsName[s]}}: {{c.abilities[s].score}}
              <span v-if="c.abilities[s].mod<0"> ({{c.abilities[s].mod}}) </span>
              <span v-if="c.abilities[s].mod>0"> (+{{c.abilities[s].mod}}) </span>
            </span>
          </span>
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
import { recalculatePCs } from "@/assets/red/PCs.js"
// import type { Character } from '../assets/types'

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
        characters: [
          {
            name: "PC1",
            base: {
              abilities: {
                str: 3,
                int: 4,
                wis: 6,
                dex: 11,
                con: 11,
                cha: 12,
              },
            },
            abilities: {
              str: { score: 0, mod: 0 },
              int: { score: 0, mod: 0 },
              wis: { score: 0, mod: 0 },
              dex: { score: 0, mod: 0 },
              con: { score: 0, mod: 0 },
              cha: { score: 0, mod: 0 },
            },
          },
          {
            name: "PC2",
            base: {
              abilities: {
                str: 10,
                int: 11,
                wis: 12,
                dex: 13,
                con: 16,
                cha: 18,
              },
            },
            abilities: {
              str: { score: 0, mod: 0 },
              int: { score: 0, mod: 0 },
              wis: { score: 0, mod: 0 },
              dex: { score: 0, mod: 0 },
              con: { score: 0, mod: 0 },
              cha: { score: 0, mod: 0 },
            },
          },
        ],
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      recalculatePCs(this.party.characters)
      this.output(JSON.stringify(this.party.characters))
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
  },
}
</script>

<style scoped>

</style>
