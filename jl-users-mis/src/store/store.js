import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
// import searchParam from './modules/searchParam'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    // searchParam: searchParam
  }
})
