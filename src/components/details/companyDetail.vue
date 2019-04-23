<!--公司详情页-->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">公司信息</el-menu-item>
            <el-menu-item index="2">公司消息</el-menu-item>
        </el-menu>
        <el-dialog title="回复信息" :visible.sync="tanchuang">
            <div class="tanchuang">
                <el-form :model="returnForm" :rules="rules2">
                    <el-form-item label="回执内容" :label-width="formLabelWidth" prop="account">
                        <el-input v-model="returnForm.word"
                                  type="textarea"
                                  :rows="5"
                                  placeholder="拒绝还是接受，给个理由吧">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否录用" :label-width="formLabelWidth" prop="isSuccess">
                        <el-radio-group v-model="returnForm.isSuccess">
                            <el-radio label="1">接受</el-radio>
                            <el-radio label="0">拒绝</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-button style="margin:20px  50px" @click="tanchuang=false">取消
                </el-button>
                <el-button style="margin:20px 50px" @click="backTo()">发送回执
                </el-button>
            </div>
        </el-dialog>
        <div class="line" v-if="onshow">
            <el-form :model="cForm" :rules="rules">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                    <el-input disabled v-model="cForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                    <el-input type="password" :disabled="isChange" v-model="cForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" :label-width="formLabelWidth" prop="cname">
                    <el-input :disabled="isChange" v-model="cForm.cname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input :disabled="isChange" v-model="cForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input :disabled="isChange" v-model="cForm.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="isChange = !isChange">修改信息</el-button>
            <el-button :disabled="isChange" type="primary" @click="save()">保存信息</el-button>
        </div>
        <div v-if="!onshow">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="我发出的消息" name="1">
                    <ul class="massageBox" id="ex1">
                        <li v-for="item in messageList.toOther">
                            <el-row :gutter="20">
                                <el-col :span="4"><span class="tip">您发给{{searchCompany(item.toId).pname}}的消息：</span>
                                </el-col>
                                <el-col :span="16" class="text">{{ item.data }}</el-col>
                                <el-col :span="4"><span class="res"
                                                        v-bind:class="{ green: item.isSuccess,red: !item.isSuccess }">   {{item.isSuccess?"你已录取对方!":"你拒绝了对方."}}</span>
                                </el-col>
                            </el-row>

                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item title="发给我的消息" name="2">
                    <ul class="massageBox" id="ex2">
                        <li v-for="item in messageList.toMe">
                            <el-row :gutter="20">
                                <el-col :span="4"><span class="tip">您发给{{searchCompany(item.fromId).pname}}的消息：</span>
                                </el-col>
                                <el-col :span="16" class="text">{{ item.data }}</el-col>
                                <el-col :span="4">
                                    <button class="res green" @click="openTan(item.fromId)"> 回复</button>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'companyDetail',
        data() {
            return {
                activeIndex: '1',
                onshow: true,
                formLabelWidth: '120px',
                isChange: true,
                p: "",
                cForm: {
                    account: '',
                    pwd: '',
                    cname: '',
                    phone: '',
                    email: ''
                },
                returnForm: {
                    word: "",
                    isSuccess: "1"
                },
                tanchuang: false,
                activeNames: ['1', '2'],
                messageList: {toOther: [], toMe: []},
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}],
                    cname: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                        {min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'change'}],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                },
                rules2: {
                    word: [
                        {required: true, message: '请输如理由', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 2 到 100个字符', trigger: 'change'}
                    ],
                    isSuccess: [
                        {required: true, message: '请选择', trigger: 'change'}],

                },
                personId: 0
            }
        },
        computed: {
            ...mapGetters('user', ['allMember', 'check', 'now']),
            ...mapGetters('message', ['allMessages'])

        },
        watch: {
            allMessages: function (val) {
                const toOther = [], toMe = [];
                val.map((item, i) => {
                    if (item.type === 2 && item.fromId == this.now.uid) {
                        toOther.push(item)
                    } else if (item.type === 1 && item.toId == this.now.uid) {
                        toMe.push(item)
                    }
                });
                this.messageList = {toOther, toMe};
            },

        },
        methods: {
            ...mapActions('user', ['getUpdate', 'getLogout']),
            ...mapActions('message', ['getMessagesAdd']),

            handleSelect(key, keyPath) {
                this.activeIndex = key;
                this.onshow = key == 1;
            },
            save() {
                this.getUpdate(this.cForm)
                if (this.cForm.pwd !== this.p) {
                    this.getLogout();
                    this.$router.push({path: '/'});
                    this.$message("密码已修改请重新登录")
                }
            },
            handleChange(val) {
            },
            searchCompany(cid) {
                let res;
                this.allMember.map((item) => {
                    if (item.uid == cid) {
                        res = item
                    }
                })
                return res
            },
            backTo() {
                if (this.returnForm.word === "") {
                    this.$message("请输入理由")
                } else {
                    this.$message("回复成功")
                    this.getMessagesAdd({
                        type: 2,
                        fromId: this.now.uid,
                        toId: this.personId,
                        data: this.returnForm.word,
                        isSuccess: this.returnForm.isSuccess === "1"
                    });
                    this.tanchuang = false
                }

            },
            openTan(uid) {
                this.tanchuang = true;
                this.personId = uid;

            }
        },
        mounted() {
            if (!this.check || this.now.type != 1) {
                this.$router.push({path: '/'});
            }
            const {account, pwd, cname, phone, email} = this.now;
            this.cForm = {account, pwd, cname, phone, email};
            this.p = account.toString();
            const toOther = [], toMe = [];
            this.allMessages.map((item, i) => {
                if (item.type === 2 && item.fromId == this.now.uid) {
                    toOther.push(item)
                } else if (item.type === 1 && item.toId == this.now.uid) {
                    toMe.push(item)
                }
            });
            this.messageList = {toOther, toMe};
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .line {
        padding: 20px;
        width: 50%;
        margin: 20px auto;
    }

    .massageBox {
        ul{
            padding: 0;
            margin: 0;
        }
        li {
            list-style: none;

            margin: 10px 0;

            .tip {
                font-size: 16px;
                color: #409eff;
            }

            .text {
                text-align: left;
            }

            .green {
                color: yellowgreen;
            }

            .red {
                color: red;
            }

            .res {
                border: 1px solid #f5f5f5;
                border-radius: 4px;
                padding: 5px 20px;

            }

            #ex2 .res {
                cursor: pointer;

            }
        }
    }

</style>
