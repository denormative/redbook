<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#names-buttons">Names</h6>
    <div id="names-buttons" class="collapse.in">
      <button class="btn btn-default btn-sm" @click="$emit('output', feminineName())">F. Name</button>
      <button class="btn btn-default btn-sm" @click="$emit('output', masculineName())">M. Name</button>
      <button class="btn btn-default btn-sm" @click="$emit('output', epithet())">Epithet</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddNames from '@/assets/names/oddNames.js'

export default {
  name: 'names',
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
    ...oddNames,
  },
}
</script>

<style scoped>

</style>
