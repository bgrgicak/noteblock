import Vue from 'vue'
import Vuex from 'vuex'
import notAppTabs from './store/tabs'
import notAppPages from './store/pages'

Vue.use(Vuex)
const modules: any = {
  notAppTabs,
  notAppPages
}
export default new Vuex.Store({
  modules
})
