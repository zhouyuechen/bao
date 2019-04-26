<template>
    <div id="app">
        <header-box></header-box>
        <div class="warp">
            <router-view/>
        </div>
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

<style scoped lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        width: 1320px;
        margin: 0 auto;
    }
    .warp{
        width: 1280px;
        border: 1px solid #f5f5f5;
        margin: 20px  auto;
        padding: 16px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
        border-radius: 4px;
    }

</style>
