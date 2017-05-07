<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#experimental-buttons">Experimental</h6>
    <div id="experimental-buttons" class="collapse.in">
      <button type="button" class="btn btn-default btn-sm" @click="$emit('output', bandits())">Bandit Group</button>
      <button type="button" class="btn btn-default btn-sm" @click="$emit('output', brigands())">Brigand Group</button>
      <button type="button" class="btn btn-default btn-sm" @click="$emit('output', orcs())">Orc Lair</button>
      <button type="button" class="btn btn-default btn-sm" @click="$emit('output', village())">Village</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddEncounters from '@/assets/odd/oddEncounters.js'

export default {
  name: 'experimental',
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
    ...oddEncounters,
  },
}
</script>

<style scoped>

</style>
