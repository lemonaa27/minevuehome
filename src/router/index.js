import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login/login.vue";
import agencyRouter from './agencyRoutes'
Vue.use(VueRouter);

const routes = [
  ...agencyRouter,
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import( "@/views/login/login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
