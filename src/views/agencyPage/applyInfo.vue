<template>
  <div class="applyContainer">
    <navbar :navTitle="navTitle"></navbar>
    序列号申请
  </div>
</template>

<script>
import navbar from '@/components/nvaBar'
export default {
  components:{navbar},
  data(){
    return{
      navTitle:''
    }
  },
  created(){
    this.navTitle = this.$route.meta.title;
  }
}
</script>

<style lang="scss" scoped>
.applyContainer{
  width: 98%;
  margin-top:60px;
}
</style>