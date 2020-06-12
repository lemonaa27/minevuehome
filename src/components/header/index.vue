<template>
  <div class="header_container">
      <div class="header_le">
            <i class="el-icon-s-fold" @click="toggleCollopase"></i>
      </div>
      <div class="header_ri">
          <i class="el-icon-menu" @click="fullScreen"></i>
           <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                {{users}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="modifyPsd">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="handleLogOut">登出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
      </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    props:{
        users:{
            type:String,
            default:'Admin'
        }
    },
    data(){
        return{
            isCollapse:true
        }
    },
    methods:{
        toggleCollopase(){
           this.$parent.toggleCollopase()
        },
        fullScreen() {
            if (screenfull.isEnabled) {
                screenfull.toggle()
            }
        },
        modifyPsd(){
            console.log(9999)
        },
        handleLogOut(){
            // 跳转到登录页的时候顺便刷新
            // window.location.href = window.location.origin + window.location.pathname
            if(localStorage.getItem('userRole') === 'agency'){
                this.$router.push({path:'/loginAgency'})
                window.localStorage.setItem("userRole", 'unload')
            }else if(localStorage.getItem('userRole') === 'dealer'){
                this.$router.push({path:'/loginDealer'})
                window.localStorage.setItem("userRole", 'unload')
            }else{
                this.$router.push({path:'/login'})
                window.localStorage.setItem("userRole", 'unload')
            }
        }
    }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.header_container{
    width:100%;
    .header_le{
        float: left;
        i{
            line-height: 50px;
            font-size: 20px;
        }
    }
    .header_ri{
        float: right;
        line-height: 50px;
        cursor: pointer;
        .el-icon-menu{
            margin-right: 10px;
        }
        .el-dropdown-link{
            font-size: 16px;
        }
    }
}
</style>