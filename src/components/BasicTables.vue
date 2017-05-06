<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#basic-tables-buttons">Basic Tables</h6>
    <div id="basic-tables-buttons" class="collapse show">
      <button class="btn btn-default btn-sm" @click="$emit('output', characterStats())">stats</button>
      <button class="btn btn-default btn-sm" @click="$emit('output', reaction())">reaction</button>
      <button class="btn btn-default btn-sm" @click="$emit('output', loyalty())">loyalty</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddUtils from '../assets/odd/oddUtils.js'

export default {
  name: 'basic-tables',
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
    ...oddUtils,
  },
}
</script>

<style scoped>

</style>
