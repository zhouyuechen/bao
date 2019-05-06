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
                    <el-button
                            v-if="showDel(scope.$index, scope.row)"
                            size="mini"
                            @click="delJob(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'list',
        data() {
            return {

            }
        },
        methods: {
            ...mapActions('jobs', ['getDelJob']),

            look(i, item) {
                this.$router.push({path: `/jobDetail/${item.jid}`});
            },
            delJob(i, item) {
                const isDel = confirm(`是否删除？`);
                if(isDel){
                    this.getDelJob(item);
                    this.$message('删除成功');
                }
            },
            showDel(i,item){
                let res=false;
                if(this.now&&this.now.type===2){
                    res=true;
                }
                if(this.now&&this.now.type===1&&this.now.cname===item.cname){
                    res=true;
                }
                return res
            }
        },
        computed: {
            ...mapGetters('jobs', ['allJobs']),
            ...mapGetters('user', ['allMember', 'check', 'now']),

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
