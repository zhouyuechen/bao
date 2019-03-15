<template>
  <div id="app">
    <header-box  ></header-box>


    <router-view/>
  </div>
</template>

<script>
  import header from "./components/sub/Header";

  export default {
  name: 'App',
    components: {//注册子组件
      'header-box': header
    },
}
</script>

<style scoped >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
