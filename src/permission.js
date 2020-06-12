// 取到需要权限判断的路由表
import { permissionRouter, fixedRouter } from '@/router'
import router from '@/router'
var addRouteFlag = false

router.beforeEach((to, from, next) => {
  // 取到用户的角色
  let GetRole = localStorage.getItem("userRole")

  // 如果登录了
  if (GetRole&&GetRole !== 'unload') {
        next() //next()方法后的代码也会执行
    // 1.如果路由表 没根据角色进行筛选,就筛选一次
    if (!addRouteFlag) {
      addRouteFlag = true
      // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
      var getRoutes = baseRoleGetRouters(permissionRouter, GetRole.split(","))
      console.log(getRoutes,88788)
      // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
      global.antRouter = fixedRouter.concat(getRoutes)
      // 4.将生成好的路由addRoutes
      router.addRoutes(fixedRouter.concat(getRoutes))
      // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
      router.push({ path: to.path })
    }
  } else {
    // 用户没登录，跳转到登录页面
    if (to.path === '/login' || to.path === '/loginAgency' || to.path === '/loginDealer') {
      next()
    } else {
        var pathname = window.location.hash;
        console.log(pathname)
        if(pathname.substr(2).indexOf("loginAgency") != -1){
            next('/loginAgency')
        }else if(pathname.substr(2).indexOf("loginDealer") != -1){
            next('/loginDealer')
        }else{
            next('/login')
        }
    }
  }

})


function hasPermission(route, roles) {
    console.log(roles,22)
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
