<template>
    <div class="header">

        <ul class='nav'>
            <li class="title">
                人才招聘网欢迎你~
            <li class="index">
                <el-button @click="jump(0)" type="primary">首页</el-button>
            </li>
            <li class="spacial">
                <el-button @click="jump(1)" type="primary">特殊</el-button>
            </li>
            <li class="option">
                <el-button @click="dialogFormVisible = true" :round=true type="primary">登录</el-button>
                <el-button @click="registerVisible = true" :round=true type="primary">注册</el-button>
            </li>
        </ul>
        <el-dialog title="用户登录" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                    <el-input v-model="loginForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                    <el-input v-model="loginForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型"  :label-width="formLabelWidth" prop="type">
                <el-radio-group v-model="loginForm.type" >
                    <el-radio label="个人"></el-radio>
                    <el-radio label="公司"></el-radio>
                    <el-radio label="管理员"></el-radio>
                </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login()">登 录</el-button>
            </div>
        </el-dialog>
        <el-dialog title="用户注册" :visible.sync="registerVisible" width="40%">
            <el-form :model="registerForm" :rules="rules2" ref="registerForm">
                <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
                    <el-input v-model="registerForm.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                    <el-input v-model="registerForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型"  :label-width="formLabelWidth" prop="type">
                    <el-radio-group v-model="registerForm.type" >
                        <el-radio label="个人"></el-radio>
                        <el-radio label="公司"></el-radio>
                        <el-radio label="管理员"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="registerForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="registerForm.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="registerVisible = false">取 消</el-button>
                <el-button type="primary" @click="register()">注 册</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'tou',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                dialogFormVisible: false,
                typeList:{
                    '个人':0,
                    '公司':1,
                    '管理员':2
                },
                loginForm: {
                    account: '',
                    pwd: '',
                    type: '个人'
                },
                formLabelWidth: '60px',
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}],
                    type: [
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ],

                },
                registerVisible:false,
                registerForm: {
                    account: '',
                    pwd: '',
                    type: '个人',
                    phone:'',
                    email:''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'change'}],
                    type: [
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ],
                    phone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                },

            }
        },
        methods: {
            jump(type) {
                if (type === 0) {
                    this.$router.push({path: '/list'});
                } else {
                    this.$router.push({path: '/'});
                }
            },
            login() {
                let data=this.loginForm;
                data.type=this.typeList[data.type];
                console.log(data);
                this.$store.dispatch('getLogin',data);
                if(this.$store.getters.check){
                    this.$message('登录成功');
                    this.dialogFormVisible = false
                }else {
                    this.$message('账号或者密码错误,或者用户类型不对');
                }
            },
            register(){
              let  users1=parseInt(this.$store.getters.allMember.length);

                let data=this.registerForm;
                data.type=this.typeList[data.type];
                this.$store.dispatch('getRegister',data);
                let  users2=this.$store.getters.allMember;
                if(users2.length>users1){
                    this.$message('注册成功');
                    this.registerVisible = false
                }else {
                    this.$message('账号已存在请换一个');
                }
            }
        },
        mounted() {
            //console.log(this.$store.getters.allMember)
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    p {
        padding: 0;
        margin: 0;
    }

    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 5px 0;
        flex-direction: column;
        background-color: #1e2329;

        .title {
            font-size: 30px;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 1280px;

            li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 25%;
                list-style: none;
                font-size: 40px;

            }

            .title {
                font-size: 30px;
                color: #409EFF;
            }
        }
    }
</style>
