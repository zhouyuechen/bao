<template>
    <div class="list">
        <el-table
                :data="allJobs"
                style="width: 80%">
            <el-table-column
                    prop="jname"
                    label="职位名称"
                    width="180px">
            </el-table-column>
            <el-table-column
                    prop="jrequire"
                    label="岗位要求"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="jmoney"
                    label="薪资"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="公司"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="cphone"
                    label="公司电话"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="caddress"
                    label="公司地址"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="look(scope.$index, scope.row)">查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'list',
        data() {
            return {

            }
        },
        methods: {
            look(i,item) {
                this.$router.push({path: `/jobDetail/${item.jid}`});
            }
        },
        computed: {
            ...mapGetters('jobs',['allJobs'])
        },

        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .list {
        width: 100%;
        margin: 5px auto;
        display: flex;
        justify-content: center;

    }
</style>
