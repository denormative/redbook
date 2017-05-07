<template>
  <div class="d-inline-flex">
    <div class="btn-group mb-1" v-for="y in diceToRoll">
      <button type="button" class="btn btn-default btn-sm" @click="$emit('output', (d(1, y)))">d{{y}}</button>
      <button type="button" class="btn btn-default btn-sm dropdown-toggle dropdown-toggle-split mr-1" data-toggle="dropdown" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a v-for="x in dropdownList" class="dropdown-item" @click="$emit('output', (d(x, y)))">{{x}}d{{y}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { d } from '@/assets/dice.js'

export default {
  name: 'basic-dice',
  props: [],
  components: {
  },
  data() {
    return {
      dropdownList: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      diceToRoll: [2, 3, 4, 6, 8, 10, 12, 20, 100],
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
    d,
  },
}
</script>

<style scoped>

</style>
