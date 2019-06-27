import Tab from '@/model/tab'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import consts from '@/utility/consts';

interface RootState {
  tabs: Tab[],
  activeTabId: string | null,
  loaded: boolean
}

function updateState(state: RootState) {
  try {
    chrome.storage.sync.set({
      [consts.tabStoreKey]: state
    })
  } catch(ex) {
    console.log(ex)
  }
}
function getState(callback: any) {
  try {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes[consts.tabStoreKey]) {
        callback({
          [consts.tabStoreKey]: changes[consts.tabStoreKey].newValue
        })
      }
    })
  } catch(ex) {
    console.log(ex)
  }

  try {
    chrome.storage.sync.get([consts.tabStoreKey], callback)
  } catch(ex) {
    console.log(ex)
  }
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
  createOrUpdate(state, data) {
    const currentTabIndex = state.tabs.findIndex((t: Tab) => t.id == data.tab.id)

    const tabs = [...state.tabs]

    if(currentTabIndex > -1) {
      tabs[currentTabIndex] = Object.freeze(data.tab)
    } else {
      tabs.push(Object.freeze(data.tab))
    }
    state.tabs = tabs
    if (data.disableUpdate !== true) {
      updateState(state)
    }
  },
  remove(state, tabId: string) {
    state.tabs = state.tabs.filter((t: Tab) => t.id !== tabId)
    updateState(state)
  },
  setActive(state, data) {
    state.activeTabId = data.tabId
    if (data.disableUpdate !== true) {
      updateState(state)
    }
  },
  loaded(state, loaded: boolean) {
    state.loaded = loaded
  },
}

const actions: ActionTree<RootState, RootState> = {
  add({ commit }, tab: Tab) {
    commit('createOrUpdate', {tab})
  },
  update({ commit }, tab: Tab) {
    commit('createOrUpdate', {tab})
  },
  remove({ commit }, tabId: string) {
    commit('remove', tabId)
  },
  setActive({ commit }, tabId: string) {
    commit('setActive', {tabId})
  },
  load({ commit }) {
    getState((res: any) => {
      const data = res[consts.tabStoreKey]
      if (data && data.tabs && data.tabs.length > 0) {
        data.tabs.forEach((tab: Tab) => {
          commit('createOrUpdate', {tab, disableUpdate: true})
        })
        commit('setActive',  {
          tabId: data.activeTabId ? data.activeTabId : data.tabs[0].id, 
          disableUpdate: true
        })
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
