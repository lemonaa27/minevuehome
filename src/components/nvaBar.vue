<template>
  <div class="navBar">
      <div>{{navTitle}}</div>
  </div>
</template>

<script>
export default {
    props:{
        navTitle:{
            type:String
        }
    },
    methods:{
    }
    
}
</script>

<style lang="scss" scoped>
.navBar{
    width:100%;
    position: absolute;
    top: 2px;
    height: 30px;
    padding-left:20px;
    background-color: #fff;
    div{
        font-size: 20px;
        font-weight: 600;
    }
}
</style>