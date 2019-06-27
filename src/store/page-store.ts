import Page from '@/model/page'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import Vue from 'vue'
import consts from '@/utility/consts';

interface RootState {
  pages: {[key: string]: Page}
}
function pageKey(pageId: string): string {
  return consts.pageStoreKey + pageId
}
function updatePage(page: Page) {
  try {
    chrome.storage.sync.set({
      [pageKey(page.id)]: page
    })
  } catch(ex) {
    console.log(ex)
  }
}
function loadPage(pageId: string, callback: any) {
  const pageStoreKey = pageKey(pageId)
  /*try {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes[pageStoreKey]) {
        callback({[pageStoreKey]: changes[pageStoreKey].newValue})
      }
    })
  } catch(ex) {
    console.log(ex)
  }*/

  try {
    chrome.storage.sync.get([pageStoreKey], callback)
  } catch(ex) {
    console.log(ex)
  }
}

const state: RootState = {
  pages: {}
}

const getters = {
  get: (state: any) => (pageId: string) => {
    return state.pages[pageId]
  }
}

const mutations: MutationTree<RootState> = {
  createOrUpdate(state, data) {
    Vue.set(state.pages, data.page.id, data.page)
    if (data.disableUpdate !== true) {
      updatePage(state.pages[data.page.id])
    }
  },
}

const actions: ActionTree<RootState, RootState> = {
  createOrUpdate({commit}, page: Page) {
    commit('createOrUpdate', {page})
  },
  loadPage({commit}, pageId: string) {
    loadPage(pageId, (pageData: {[key: string]: Page}) => {
      if (pageData[pageKey(pageId)]) {
        commit('createOrUpdate', {
          page: pageData[pageKey(pageId)],
          disableUpdate: false
        })
      } else {
        commit('createOrUpdate', {
          page: new Page(pageId, '')
        })
      }
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
