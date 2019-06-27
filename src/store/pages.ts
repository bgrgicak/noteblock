import Page from '@/model/page'
import DB from '@/utility/db'
import Vuex, { MutationTree, ActionTree } from 'vuex'

interface RootState {
  pages: Page[]
}

const storeKey = 'notAppPages'

const state: RootState = {
  pages: []
}

const getters = {
  get: (state: any) => (pageId: string) => {
    return state.pages ? state.pages.find((p: Page) => p.id === pageId) : undefined
  },
  getAll: (state: any) => (tabId: string) => {
    return state.pages ? state.pages.filter((p: Page) => p.tabId === tabId) : undefined
  }
}

const mutations: MutationTree<RootState> = {
  add(state, page: Page) {
    const pages = [...state.pages]
    pages.push(Object.freeze(page))
    state.pages = pages
    chrome.storage.sync.set({
      [storeKey + page.tabId]: state
    })
  },
  update(state, page: Page) {
    const currentPageIndex = state.pages.findIndex((t: Page) => t.id == page.id)
    const pages = [...state.pages]
    pages[currentPageIndex] = Object.freeze(page)
    state.pages = pages
  },
  clear(state) {
    const pageKeys: any = {}
    state.pages.forEach((p: Page) => {
      pageKeys[storeKey + p.tabId] = []
    })
    chrome.storage.sync.set(pageKeys)
    state.pages = []
  }
}

const actions: ActionTree<RootState, RootState> = {
  add({ commit }, page: Page) {
    commit('add', page)
  },
  update({ commit }, page: Page) {
    commit('update', page)
  },
  clear({ commit }) {
    commit('clear')
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
