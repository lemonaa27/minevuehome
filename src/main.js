import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Cookies from 'js-cookie'

import './plugins/element.js'
import Element from 'element-ui';

import './styles/index.scss'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  zIndex: 3000
})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount("#app");
