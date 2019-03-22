<!--管理员详情页-->
<template>
    <div class="manager" >
        <el-table
                :data="allMember"
                style="width: 90%">
            <el-table-column
                    prop="uid"
                    label="用户id"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="pwd"
                    label="密码"
                    width="180">
            </el-table-column>
            <el-table-column

                    label="用户类型"
                    width="180">
                <template slot-scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.type|userType }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话号码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="look(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'detail',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {
            ...mapGetters('user',['allMember'])
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .manager{
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
    }
</style>
