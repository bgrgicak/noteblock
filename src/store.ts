import Vue from 'vue';
import Vuex from 'vuex';
import Tabs from './store/tabs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs: Tabs
  }
});
