<template>
    <div class="list">
        <el-dialog title="修改信息" :visible.sync="tanchuang">

            <div class="tanchuang">
                <el-form :model="newJobForm" :rules="rules3" ref="newJobForm">
                    <el-form-item label="职位名称" :label-width="formLabelWidth" prop="jname">
                        <el-input v-model="newJobForm.jname"
                                  type="text"
                                  placeholder="请写出职位名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="职位要求" :label-width="formLabelWidth" prop="jrequire">
                        <el-input v-model="newJobForm.jrequire"
                                  type="textarea"
                                  :rows="5"
                                  placeholder="请分条列出职位的要求">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="薪资范围" :label-width="formLabelWidth" prop="jmoney">
                        <el-input v-model="newJobForm.jmoney"
                                  type="text"
                                  placeholder="请给出大致的薪资范围，如3k-4k">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="工作地点" :label-width="formLabelWidth" prop="caddress">
                        <el-input v-model="newJobForm.caddress"
                                  type="text"
                                  placeholder="请写出工作地点">
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button style="margin:20px  50px" @click="tanchuang=false">取消
                </el-button>
                <el-button style="margin:20px 50px" @click="edit()">保存
                </el-button>
            </div>

        </el-dialog>
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
                    width="140">
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
                            @click="openEdit(scope.$index, scope.row)">编辑
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
                tanchuang: false,
                newJobForm: {
                    jname: "",
                    jrequire: "",
                    jmoney: "",
                    caddress: "",
                    jid: '',
                    cname: ''
                },
                rules3: {
                    jname: [
                        {required: true, message: '请输入职位名称', trigger: 'blur'},
                    ],
                    jrequire: [
                        {required: true, message: '请输入职位要求', trigger: 'blur'}],
                    jmoney: [
                        {required: true, message: '请输入薪资范围', trigger: 'blur'}],
                    caddress: [
                        {required: true, message: '请输入工作地点', trigger: 'blur'}],
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            ...mapActions('jobs', ['getDelJob','getEditJob']),

            look(i, item) {
                this.$router.push({path: `/jobDetail/${item.jid}`});
            },
            delJob(i, item) {
                const isDel = confirm(`是否删除？`);
                if (isDel) {
                    this.getDelJob(item);
                    this.$message('删除成功');
                }
            },
            showDel(i, item) {
                let res = false;
                if (this.now && this.now.type === 2) {
                    res = true;
                }
                if (this.now && this.now.type === 1 && this.now.cname === item.cname) {
                    res = true;
                }
                return res
            },
            openEdit(i, item) {
                const {
                    jname,
                    jrequire,
                    jmoney,
                    caddress, jid, cname
                } = item;
                this.newJobForm = {
                    jname,
                    jrequire,
                    jmoney,
                    caddress, jid, cname
                };
                this.tanchuang = true
            },
            edit() {
                this.$refs['newJobForm'].validate((valid) => {
                    if (valid) {
                        this.getEditJob(this.newJobForm)
                        this.$message("编辑成功")
                        this.tanchuang = false
                    } else {
                        return false;
                    }
                });
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
