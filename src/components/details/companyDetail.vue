<!--公司详情页-->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">公司信息</el-menu-item>
            <el-menu-item index="2">公司消息</el-menu-item>
        </el-menu>
        <el-dialog :title="this.title()" :visible.sync="tanchuang">
            <div v-if="backOrPub===1" class="tanchuang">
                <el-form :model="returnForm" :rules="rules2" ref="returnForm">
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
            <div v-if="backOrPub===2" class="tanchuang">
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
                <el-button style="margin:20px 50px" @click="publish()">发布新的招聘
                </el-button>
            </div>
            <div v-if="backOrPub===3" class="tanchuang">
                <img :src="personImg" width="100%" alt="个人简历" />
            </div>
        </el-dialog>
        <div class="line" v-if="onshow">
            <el-form :model="cForm" :rules="rules" ref="cForm">
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
                <el-form-item label="公司图片" :label-width="formLabelWidth" prop="img">
                    <el-upload
                            :disabled="isChange"
                            id="up"
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :auto-upload="false" multiple
                            accept="image/jpg,image/png,image/jpeg"
                            :on-change="imgBroadcastChange">
                        <img v-if="cForm.imageUrl" :src="cForm.imageUrl" alt="加载失败" class="avatar">
                        <span v-else class="el-icon-plus avatar-uploader-icon">{{isChange?"点击修改上传":"上传简历图片"}}</span>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-button @click="isChange = !isChange">修改信息</el-button>
            <el-button :disabled="isChange" type="primary" @click="save()">保存信息</el-button>
        </div>
        <div v-if="!onshow">
            <el-button class="btn" type="primary" @click="openPub()">发布新的招聘信息</el-button>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="我发出的消息" name="1">
                    <ul class="massageBox" id="ex1">
                        <span v-if="messageList.toOther.length<1">暂无消息</span>
                        <li v-for="item in messageList.toOther">
                            <el-row :gutter="20">
                                <el-col :span="4"><span class="tip">您发给{{searchCompany(item.toId).pname}}的消息：</span><br>
                                    <span >相关职位：{{getJobById(item.jid)}}</span>
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
                        <span v-if="messageList.toMe.length<1">暂无消息</span>
                        <li v-for="item in messageList.toMe">
                            <el-row :gutter="20">
                                <el-col :span="4"><span class="tip">{{searchCompany(item.fromId).pname}}发给您的消息：</span><br>
                                    <span >相关职位：{{getJobById(item.jid)}}</span>
                                </el-col>
                                <el-col :span="16" class="text">{{ item.data }}</el-col>
                                <el-col :span="4">
                                    <button class="res green" @click="openTan(item.fromId)"> 回复</button>
                                    <button class="res green" @click="openImg(item.fromId)"> 查看简历</button>
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
    import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";

    export default {
        name: 'companyDetail',
        components: {ElSlPanel},
        data() {
            return {
                personImg:"*",
                activeIndex: '1',
                backOrPub: 1,
                onshow: true,
                formLabelWidth: '120px',
                isChange: true,
                p: "",
                cForm: {
                    account: '',
                    pwd: '',
                    cname: '',
                    phone: '',
                    email: '',
                    imageUrl: ''
                },
                returnForm: {
                    word: "",
                    isSuccess: "1"
                },
                newJobForm: {
                    jname: "",
                    jrequire: "",
                    jmoney: "",
                    caddress: "",
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
                        {required: true, message: '请输入理由', trigger: 'blur'},
                        {min: 2, max: 100, message: '长度在 2 到 100个字符', trigger: 'change'}
                    ],
                    isSuccess: [
                        {required: true, message: '请选择', trigger: 'change'}],

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
                personId: 0
            }
        },
        computed: {
            ...mapGetters('user', ['allMember', 'check', 'now']),
            ...mapGetters('message', ['allMessages']),
            ...mapGetters('jobs', ['allJobs']),

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
            ...mapActions('jobs', ['getAddJob']),
            title(){
                const bb={
                    1:'回复信息',
                    2:'发布招聘',
                    3:'个人简历'
                }
                return bb[this.backOrPub]
            },
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                this.onshow = key == 1;
            },
            save() {//保存信息
                this.$refs['cForm'].validate((valid) => {
                    if (valid) {
                        this.getUpdate(this.cForm)
                        if (this.cForm.pwd !== this.p) {
                            this.getLogout();
                            this.$router.push({path: '/'});
                            this.$message("密码已修改请重新登录")
                        } else {
                            this.isChange = !this.isChange;
                            this.$message("修改成功")
                        }
                    } else {
                        return false;
                    }
                });
            },
            handleChange(val) {
            },
            searchCompany(cid) {//查询公司
                let res;
                this.allMember.map((item) => {
                    if (item.uid == cid) {
                        res = item
                    }
                })
                return res
            },
            backTo() {//回复按钮
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
            openTan(uid) {//打开回复弹窗
                this.backOrPub = 1;
                this.tanchuang = true;
                this.personId = uid;

            },
            openPub() {//打开发布弹窗
                this.backOrPub = 2;
                this.tanchuang = true;

            },
            openImg(uid) {//打开个人简历弹窗
                this.backOrPub = 3;
                this.allMember.map((item)=>{
                    if(uid===item.uid){
                        this.personImg=item.imageUrl
                    }
                })
                this.tanchuang = true;
                this.personId = uid;

            },
            imgBroadcastChange(file, fileList) {//上传的图片发生变化的回调
                console.log(file)
                if (!/image\/\w+/.test(file.raw.type)) {
                    alert("请确保文件为图像类型");
                    return false;
                }

                const isLt2M = file.size / 1024 / 1024 < 5 // 上传头像图片大小不能超过 2MB
                if (!isLt2M) {
                    this.cForm.imageUrl = fileList.filter(v => v.uid !== file.uid)
                    this.$message.error('图片选择失败，每张图片大小不能超过 5MB,请重新选择!')
                } else {
                    let reader = new FileReader();
                    reader.onload = (res) => {
                        console.log(res.target.result)
                        this.cForm.imageUrl = res.target.result
                    }
                    reader.readAsDataURL(file.raw);

                }
            },
            publish() {//发布新的招聘
                this.$refs['newJobForm'].validate((valid) => {
                    if (valid) {
                        const data = {
                            cname: this.now.cname,
                            cphone: this.now.phone,
                            ...this.newJobForm
                        }
                        this.getAddJob(data)
                        this.$message("发布成功")
                        this.tanchuang=false
                    } else {
                        return false;
                    }
                });
            },
            getJobById(jid){//查询工作详细信息
                let name;
                this.allJobs.map((item)=>{
                    if(item.jid===jid){
                        name=item.jname
                    }
                })
                return name
            }
        },
        mounted() {
            if (!this.check || this.now.type != 1) {
                this.$router.push({path: '/'});
            }
            const {account, pwd, cname, phone, email, imageUrl} = this.now;
            this.cForm = {account, pwd, cname, phone, email, imageUrl};
            this.p = pwd.toString();
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
    .btn{
        margin: 20px;
        align-self:flex-start;
    }
    #up {
        margin: 10px;

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9 !important;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;

        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 300px !important;
            height: 300px !important;
            line-height: 178px;
            text-align: center;
            border: 2px dashed #d9d9d9 !important;
            border-radius: 5px;

            &:hover {
                border-color: #409EFF;

            }
        }

        .el-icon-plus:before {
            content: "" !important;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }

    .massageBox {
        ul {
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
