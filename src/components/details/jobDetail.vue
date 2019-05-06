<!--工作详情页-->
<template>
    <div>
        <el-dialog title="发送信息" :visible.sync="tanchuang">
            <div class="tanchuang">
                <el-input v-model="word"
                          type="textarea"
                          :rows="5"
                          placeholder="请输入内容,为何人家要录用你？"></el-input>
                <el-button style="margin:20px  50px" @click="tanchuang=false">取消
                </el-button>
                <el-button style="margin:20px 50px" @click="join()">go！
                </el-button>
            </div>
        </el-dialog>
        <el-row :gutter="20">
            <el-col :span="12">
                <img v-loading width="80%" v-bind:src='imageUrl' alt="公司图片"/>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 35px ; ;color: #409eff;">{{jobNow.jname}}</span>
                        <el-button style="float: right; padding: 3px 0;line-height: 35px" type="text"
                                   @click="tanchuang=true">
                            我要应聘
                        </el-button>
                    </div>
                    <el-row :gutter="5">
                        <el-col :span="8">
                            <span style="font-size: 20px ;line-height: 35px">公司名称:</span>
                        </el-col>
                        <el-col :span="16">
                            <span style="line-height: 35px">{{companyNow.cname}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span style="font-size: 20px ;line-height: 35px">职位要求:</span>
                        </el-col>
                        <el-col :span="16">
                            <span style="line-height: 35px">{{jobNow.jrequire}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span style="font-size: 20px ;line-height: 35px">薪资范围:</span>
                        </el-col>
                        <el-col :span="16">
                            <span style="line-height: 35px">{{jobNow.jmoney}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span style="font-size: 20px ;line-height: 35px">工作地点:</span>
                        </el-col>
                        <el-col :span="16">
                            <span style="line-height: 35px">{{jobNow.caddress}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span style="font-size: 20px ;line-height: 35px">联系方式:</span>
                        </el-col>
                        <el-col :span="16">
                            <span style="line-height: 35px">{{jobNow.cphone}}</span>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'jobDetail',
        data() {
            return {
                jid: this.$route.params.jid,
                jobNow: {},
                companyNow: {},
                imageUrl: "//img.hicdn.cn/fed/images/20190419/b201b2a50c46821f8f4560d5972c49bb.jpg",
                tanchuang: false,
                word: ""
            }
        },
        computed: {
            ...mapGetters('jobs', ['allJobs']),
            ...mapGetters('user', ['allMember', 'check', 'now'])
        },
        methods: {
            ...mapActions('message', ['getMessagesAdd']),

            join() {
                if (!this.check) {
                    this.$message("您还没有登录")
                } else if (this.now.type != 0) {
                    this.$message("公司和管理员不能投哦")
                } else {
                    if (this.word === "") {
                        this.$message("内容不能为空")
                    } else {
                        this.getMessagesAdd({
                                type: 1,
                                fromId: this.now.uid,
                                toId: this.companyNow.uid,
                                data: this.word
                            }
                        );

                        this.tanchuang=false;
                        this.$message("发送成功，请等待回应");
                    }

                }

            }
        },
        mounted() {
            this.allJobs.map((item) => {
                if (item.jid == this.$route.params.jid) {
                    this.jobNow = item;
                    this.allMember.map((it) => {
                        if (item.cname === it.cname) {
                            this.companyNow = it;
                            this.imageUrl = this.companyNow.imageUrl
                        }
                    })
                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .tanchuang {
        padding: 20px;
    }
</style>
