<template>
    <div class="app_wapper">
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside class="slider_container">
          <div class="sliderTit">
            <img src="../assets/images/logo.png" alt="">
            <span>产品授权服务平台</span>
          </div>
          <el-menu class="sub_meuns_wapper"
              mode="vertical"
              unique-opened
              :default-active="$route.path"
              background-color="#304156"
              text-color="#fff" 
              active-text-color="#409EFF"
              :collapse-transition="isCollapse">
              <!-- 菜单组件 -->
              <slideMenus :routes="getRoutes"></slideMenus>
          </el-menu>
        </el-aside>
        <!-- 右侧内容区域 -->
        <el-container class="app_content">
          <el-header style="text-align: right; font-size: 12px">
            <headers @toggleCollopase="toggleCollopase"></headers>
          </el-header>
          <!-- 内容区域 -->
          <el-main>
            <!-- 二级路由跳转 -->
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script>
// 左侧菜单组件
import slideMenus from '@/components/slideMenu'
import { permissionRouter } from '@/router'
import headers from '@/components/header/index'
export default {
  computed: {
    getRoutes() {
      return global.antRouter
    }
  },
  components: {
    slideMenus,headers
  },
  data() {
    return {
      userRole: 'Topest',
      isCollapse:false,
    }
  },
  methods: {
    toggleCollopase(){
      console.log(999)
      this.isCollapse = !this.isCollapse
    }
  },
  mounted() {
    // console.log("菜单的展开跟路由有关系，查看elementui--el-menu  的default-active 属性")
    // console.log(this.$route.path)
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*wapper*/
.app_wapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.app_content {
  min-height: 500px;
  margin-left: 180px;
  border: 1px solid #eee;
  box-sizing: border-box;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.app_wapper .el-aside,
.slider_container .el-menu {
  color: #333;
  transition: width .28s;
  width: 180px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  background-color: rgb(48, 65, 86);
}
.sliderTit{
    width: 100%;
    height: 50px;
    background-color: #545c64;
    color:#fff;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size:14px;
    img{
        width:32px;
        height: 32px;
        line-height: 50px;
        vertical-align: middle;
        margin-right: 10px;
    }
}
.el-main{
  position: relative;
  width: 100%;
  padding:0 !important;
}
</style>
