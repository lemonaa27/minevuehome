import Vue from "vue";
import Vuex from "vuex";
import login from './moudles/login.js'
Vue.use(Vuex);

export default new Vuex.Store({
  moudles:{
    login
  },
  strict: true
});
