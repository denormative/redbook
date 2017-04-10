import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storeState = {
  /* beautify preserve:start */
  /* beautify preserve:end */
}

const storeGetters = {
}

const storeMutations = {
}

export default new Vuex.Store({
  state: storeState,
  mutations: storeMutations,
  getters: storeGetters,
  // strict:    process.env.NODE_ENV !== 'production',
})
