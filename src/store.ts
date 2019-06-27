import Vue from 'vue'
import Vuex from 'vuex'
import notAppTabs from './store/tab-store'
import notAppPages from './store/page-store'

Vue.use(Vuex)
const modules: any = {
  notAppTabs,
  notAppPages
}
export default new Vuex.Store({
  modules
})
