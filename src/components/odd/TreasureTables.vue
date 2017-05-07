<template>
  <div>
    <h6 class="buttonLabel" data-toggle="collapse" href="#treasure-buttons">Treasure Tables</h6>
    <div id="treasure-buttons" class="collapse.in">
      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', magicItem())">Magic Item</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', magicSword())">Sword</a></li>
          <li><a @click="$emit('output', miscWeapon())">Weapon</a></li>
          <li><a @click="$emit('output', armor())">Armor</a></li>
          <li><a @click="$emit('output', potion(true))">Potion</a></li>
          <li><a @click="$emit('output', scroll())">Scroll</a></li>
          <li><a @click="$emit('output', ring(true))">Ring</a></li>
          <li><a @click="$emit('output', wand())">Wand</a></li>
          <li><a @click="$emit('output', miscMagic())">Misc</a></li>
          <li><a @click="$emit('output', treasureMap())">Treasure Map</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', treasureTypeA())">Type A Land</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', treasureTypeADesert())">Type A Desert</a></li>
          <li><a @click="$emit('output', treasureTypeAWater())">Type A Water</a></li>
          <li><a @click="$emit('output', treasureTypeB())">Type B</a></li>
          <li><a @click="$emit('output', treasureTypeC())">Type C</a></li>
          <li><a @click="$emit('output', treasureTypeD())">Type D</a></li>
          <li><a @click="$emit('output', treasureTypeE())">Type E</a></li>
          <li><a @click="$emit('output', treasureTypeF())">Type F</a></li>
          <li><a @click="$emit('output', treasureTypeG())">Type G</a></li>
          <li><a @click="$emit('output', treasureTypeH())">Type H</a></li>
          <li><a @click="$emit('output', treasureTypeI())">Type I</a></li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="$emit('output', treasureLevel1())">Level 1</button>
        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="$emit('output', treasureLevel2to3())">Level 2-3</a></li>
          <li><a @click="$emit('output', treasureLevel4to5())">Level 4-5</a></li>
          <li><a @click="$emit('output', treasureLevel6to7())">Level 6-7</a></li>
          <li><a @click="$emit('output', treasureLevel8to9())">Level 8-9</a></li>
          <li><a @click="$emit('output', treasureLevel10to12())">Level 10-12</a></li>
          <li><a @click="$emit('output', treasureLevel13())">Level 13+</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import oddMagicSwords from '@/assets/odd/oddMagicSwords.js'
import oddMagicItems from '@/assets/odd/oddMagicItems.js'
import oddTreasureTables from '@/assets/odd/oddTreasureTables.js'
import { treasureMap } from '@/assets/odd/oddTreasure.js'

export default {
  name: 'treasure-tables',
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
    ...oddMagicSwords,
    ...oddMagicItems,
    ...oddTreasureTables,
    treasureMap,
  },
}
</script>

<style scoped>

</style>
