<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#encounter-buttons">Encounter Tables</h6>
    <div id="encounter-buttons" class="collapse.in">
      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', monsterLevel1())">Dungeon Level 1</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', monsterLevel2())">Dungeon Level 2</a></li>
          <li><a @click="$emit('output', monsterLevel3())">Dungeon Level 3</a></li>
          <li><a @click="$emit('output', monsterLevel4())">Dungeon Level 4</a></li>
          <li><a @click="$emit('output', monsterLevel5())">Dungeon Level 5</a></li>
          <li><a @click="$emit('output', monsterLevel6())">Dungeon Level 6</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', encounterClear())">Clear Terrain</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', encounterWoods())">Woods</a></li>
          <li><a @click="$emit('output', encounterRiver())">River</a></li>
          <li><a @click="$emit('output', encounterSwamp())">Swamp</a></li>
          <li><a @click="$emit('output', encounterMountains())">Mountains</a></li>
          <li><a @click="$emit('output', encounterDesert())">Desert</a></li>
          <li><a @click="$emit('output', encounterCity())">City</a></li>
          <li><a @click="$emit('output', encounterMars())">Mars</a></li>
          <li><a @click="$emit('output', encounterLostWorld())">Lost World</a></li>
        </ul>
      </div>

      <button class="btn btn-default btn-sm" @click="$emit('output', castleEncounter())">Castle</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddDungeonEncounters from '@/assets/odd/oddDungeonEncounters.js'
import oddWildernessEncounters from '@/assets/odd/oddWildernessEncounters.js'
import { castleEncounter } from '@/assets/odd/oddEncounters.js'

export default {
  name: 'encounter-tables',
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
    ...oddDungeonEncounters,
    ...oddWildernessEncounters,
    castleEncounter,
  },
}
</script>

<style scoped>

</style>
