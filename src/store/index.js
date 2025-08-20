import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import app from './modules/app';
import chat from './modules/chat';
import tabbar from './modules/tabbar';
import goods from './modules/goods';
import getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    app,
    auth,
    tabbar,
    chat,
	goods,
	  },
});

export default store;
