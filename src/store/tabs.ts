import Tab from '@/model/tab'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import consts from '@/utility/consts';

interface RootState {
  tabs: Tab[],
  activeTabId: string | null,
  loaded: boolean
}

function updateState(state: RootState) {
  chrome.storage.sync.set({
    [consts.tabStoreKey]: state
  })
}
function getState(callback: any) {
  chrome.storage.sync.get([consts.tabStoreKey], callback)
}

const state: RootState = {
  tabs: [],
  activeTabId: null,
  loaded: false
}

const getters = {
  get: (state: any) => (tabId: string) => {
    return state.tabs.find((t: Tab) => t.id === tabId)
  },
  getAll: (state: any) => {
    return state.tabs
  },
  activeTab: (state: any) => {
    if (state.activeTabId !== null) {
      const tab = state.tabs.find((t: Tab) => t.id === state.activeTabId)
      if (tab) {
        return tab
      }
    }
    return state.tabs[0]
  },
  loaded: (state: any) => {
    return state.loaded
  }
}

const mutations: MutationTree<RootState> = {
  createOrUpdate(state, tab: Tab) {
    const currentTabIndex = state.tabs.findIndex((t: Tab) => t.id == tab.id)

    const tabs = [...state.tabs]

    if(currentTabIndex > -1) {
      tabs[currentTabIndex] = Object.freeze(tab)
    } else {
      tabs.push(Object.freeze(tab))
    }
    state.tabs = tabs
    updateState(state)
  },
  remove(state, tabId: string) {
    state.tabs = state.tabs.filter((t: Tab) => t.id !== tabId)
    updateState(state)
  },
  setActive(state, tabId: string) {
    state.activeTabId = tabId
    updateState(state)
  },
  loaded(state, loaded: boolean) {
    state.loaded = loaded
  },
}

const actions: ActionTree<RootState, RootState> = {
  add({ commit }, tab: Tab) {
    commit('createOrUpdate', tab)
  },
  update({ commit }, tab: Tab) {
    commit('createOrUpdate', tab)
  },
  remove({ commit }, tabId: string) {
    commit('remove', tabId)
  },
  setActive({ commit }, tabIndex: number) {
    commit('setActive', tabIndex)
  },
  load({ commit }) {
    getState((res: any) => {
      const data = res[consts.tabStoreKey]
      if (data && data.tabs && data.tabs.length > 0) {
        data.tabs.forEach((tab: Tab) => {
          commit('createOrUpdate', tab)
        })
        commit('setActive', data.activeTabId ? data.activeTabId : data.tabs[0].id)
      }
      commit('loaded', true)
    })
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
