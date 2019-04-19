<!--people详情页-->
<template>
    <div >
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">个人信息</el-menu-item>

            <el-menu-item index="2">我的消息</el-menu-item>
        </el-menu>
        <div class="line"></div>


    </div>
</template>

<script>
    export default {
        name: 'jobDetail',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                activeIndex: '1',

            }
        },
        methods:{
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
