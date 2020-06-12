import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Cookies from 'js-cookie'

import Element from 'element-ui';
import './styles/element-variables.scss'
import '@/utils/global'//全局
import './styles/index.scss'
import '@/permission.js'
import axios from "axios";
Vue.prototype.$axios = axios;
//引入svg组件
import IconSvg from '@/components/iconSvg'
// //全局注册icon-svg
Vue.component('icon-svg', IconSvg)
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
