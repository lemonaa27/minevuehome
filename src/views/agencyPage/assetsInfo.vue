<template>
  <div>
    <navbar :navTitle="navTitle"></navbar>
    guanli xinx
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

<style>

</style>