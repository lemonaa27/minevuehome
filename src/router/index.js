import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/views/login/login')
const reloadAgency = () => import('@/views/login/loginAgency')
const findPsd = () => import('@/views/login/findPsd')
const assetsInfo = () => import('@/views/agencyPage/assetsInfo')
const applyInfo = () => import('@/views/agencyPage/applyInfo')
Vue.use(Router)
// 固定的路由表
export const fixedRouter = [
  {
    path: '/',
    component: reload,
    hidden: true
  },
  {
    path: '/login',
    component: reload,
    hidden: true
  },
  {
    path: '/loginAgency',
    component: reloadAgency,
    hidden: true
  },
  {
    path: '/findPsd',
    component: findPsd,
    hidden: true
  }
]
// 需要权限判断展示的路由
export const permissionRouter = [{
  path: "/agency",
  component: layout,
  name: "applyInfo",
  meta: {
    title: "申请列表",
    icon: "permission",
    roles: ['admin','agency']
  },
  children: [
    {
      path: 'assetsInfo',
      component: assetsInfo,
      meta: {
        title: '管理信息', //菜单名称
        roles: ['admin'], //当前菜单哪些角色可以看到
        icon: 'permission' //菜单左侧的icon图标
      }
    },
    {
      path: "applyInfo",
      name: "applyInfo",
      component: applyInfo,
      meta: {
        title: "申请列表",
        icon: "zonghe",
        roles: ['agency']
      }
    }
  ]
}]


export default new Router({
  routes: fixedRouter

})
