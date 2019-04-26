<!--people详情页-->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">个人信息</el-menu-item>
            <el-menu-item index="2">我的消息</el-menu-item>
        </el-menu>
        <div class="line" v-if="onshow">
            <el-form :model="personForm" :rules="rules">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                    <el-input disabled v-model="personForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                    <el-input type="password" :disabled="isChange" v-model="personForm.pwd"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="pname">
                    <el-input :disabled="isChange" v-model="personForm.pname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input :disabled="isChange" v-model="personForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input :disabled="isChange" v-model="personForm.email" auto-complete="off"></el-input>
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
                                <el-col :span="5"><span class="tip">您发给{{searchCompany(item.toId).cname}}的消息：</span>
                                </el-col>
                                <el-col :span="15" class="text">{{ item.data }}</el-col>
                                <el-col :span="4">
                                </el-col>
                            </el-row>

                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item title="发给我的消息" name="2">
                    <ul class="massageBox" id="ex2">
                        <li v-for="item in messageList.toMe">
                            <el-row :gutter="20">
                                <el-col :span="5"><span class="tip">{{searchCompany(item.fromId).cname}}发给您的消息：</span>
                                </el-col>
                                <el-col :span="15" class="text">{{ item.data }}</el-col>
                                <el-col :span="4">
                                    <span class="res" v-bind:class="{ green: item.isSuccess,red: !item.isSuccess }">   {{item.isSuccess?"恭喜，对方已接受!":"很遗憾，对方拒绝了你."}}</span>
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
        name: 'jobDetail',
        data() {
            return {
                activeIndex: '1',
                onshow: true,
                formLabelWidth: '60px',
                isChange: true,
                p: "",
                personForm: {
                    account: '',
                    pwd: '',
                    pname: '',
                    phone: '',
                    email: ''
                },
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
                    pname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'change'}],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                },
            }
        },
        computed: {
            ...mapGetters('user', ['allMember', 'check', 'now']),
            ...mapGetters('message', ['allMessages'])

        },
        methods: {
            ...mapActions('user', ['getUpdate', 'getLogout']),
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                this.onshow = key == 1;
            },
            save() {
                this.getUpdate(this.personForm)
                if(JSON.stringify(this.personForm.pwd)!==this.p){
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
            }
        },
        mounted() {
            if (!this.check || this.now.type != 0) {
                this.$router.push({path: '/'});
            }
            const {account, pwd, pname, phone, email} = this.now;
            this.personForm = {account, pwd, pname, phone, email};
            this.p = JSON.stringify(pwd);
            const toOther = [], toMe = [];
            this.allMessages.map((item, i) => {
                if (item.type === 1 && item.fromId == this.now.uid) {
                    toOther.push(item)
                } else if (item.type === 2 && item.toId == this.now.uid) {
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
        ul {
            padding: 0 !important;
            margin: 0;
        }

        li {
            list-style: none;

            .tip {
                font-size: 16px;
                color: #409eff;
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

            .text {
                text-align: left;
            }
        }
    }

</style>
