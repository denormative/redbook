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
        <n-p-cs v-on:output="value => output(value)"></n-p-cs>
        <experimental v-on:output="value => output(value)"></experimental>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <textarea id="output-log" class="full-text-area" rows="20" cols="80">{{outputLog}}</textarea>
    </div>
  </div>
  <!-- <div class="Odd">
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
import NPCs from './NPCs'
import Experimental from './Experimental'

import { rollAbilities } from '../vuex/abilities.js'

export default {
  name: 'Odd',
  props: [],
  components: {
    BasicDice,
    SpecialDice,
    BasicTables,
    TreasureTables,
    EncounterTables,
    Names,
    NPCs,
    Experimental,
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
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
}
</style>
