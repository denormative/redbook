<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#dice-buttons">Special Dice</h6>
    <div id="dice-buttons" class="collapse show">
      <button class="btn btn-default btn-sm mr-1 " v-for="d in specialRolls" @click="$emit('output', multiple(d.n, d.x, d.y))">{{d.n}} x {{ d.x!=1 ? d.x : "" }}d{{d.y}}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { multiple } from '@/assets/dice.js'

export default {
  name: 'special-dice',
  props: [],
  components: {
  },
  data() {
    return {
      specialRolls: [
        { n: 10, x: 1, y: 6, p: 0 },
        { n: 10, x: 1, y: 20, p: 0 },
        { n: 6, x: 3, y: 6, p: 0 },
      ],
    }
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
    multiple,
  },
}
</script>

<style scoped>

</style>
