import Tab from '@/model/tab'
import DB from '@/utility/db'
import Vuex, { MutationTree, ActionTree } from 'vuex'

const collectionName = 'tabs'

const loadedState: RootState = {
  tabs: [new Tab(DB.id(), 'Your block')],
  active: 0
}
interface RootState {
  tabs: Tab[],
  active: number
}

const state: RootState = loadedState

const getters = {
  get: (state: any) => (tabId: string) => {
    return state.tabs.find((t: Tab) => t.id === tabId)
  },
  getAll: (state: any) => {
    return state.tabs
  },
  active: (state: any) => {
    return state.active
  },
  activeTab: (state: any) => {
    return state.active && state.tabs[state.active] ?  state.tabs[state.active] : state.tabs[0]
  }
}

const mutations: MutationTree<RootState> = {
  add(state, tab: Tab) {
    const tabs = [...state.tabs]
    tabs.push(Object.freeze(tab))
    state.tabs = tabs
  },
  update(state, tab: Tab) {
    const currentTabIndex = state.tabs.findIndex((t: Tab) => t.id == tab.id)
    const tabs = [...state.tabs]
    tabs[currentTabIndex] = Object.freeze(tab)
    state.tabs = tabs
  },
  updateAll(state, tabs: Tab[]) {
    state.tabs = tabs
  },
  setActive(state, tabIndex: number) {
    state.active = tabIndex
  },
}

const actions: ActionTree<RootState, RootState> = {
  add({ commit }, tab: Tab) {
    commit('add', tab)
  },
  update({ commit }, tab: Tab) {
    commit('update', tab)
  },
  updateAll({ commit }, tabs: Tab[]) {
    commit('updateAll', tabs)
  },
  setActive({ commit }, tabIndex: number) {
    commit('setActive', tabIndex)
  },
}
export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
