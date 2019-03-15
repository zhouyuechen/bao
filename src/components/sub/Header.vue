<template>
  <div class="header">
      <p class="title">人才招聘网欢迎你~</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .header{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 130px;
   background-color: #f5f5f5;
   .title{
     font-size: 60px;
   }
 }
</style>
