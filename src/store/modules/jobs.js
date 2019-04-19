import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象

    jobNow:{},

    jobs: [
        {
            jname: "豆沙包厨师",
            jrequire: "1、制作美味豆沙包",
            jmoney: "2k-4k",
            cname: "大眼包子公司",
            cphone: "18932322323",
            caddress: "下沙江滨",
            jid:1
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:2
        },{
            jname: "生煎包工程师",
            jrequire: "1、制作生煎包",
            jmoney: "6k-8k",
            cname: "大眼包子公司",
            cphone: "18932322323",
            caddress: "下沙江滨",
            jid:3
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:4
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:5
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:6
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:7
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:8
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家",
            jid:9
        },
    ]

};
const getters = {   //实时监听state值的变化(最新状态)
    allJobs(state) {//获取所有用户
        return state.jobs
    },
    getJobById(state,data){
        console.log(data)
        return data
    }
};
const mutations = {

};
const actions = {

};

export default {
    namespaced:true,
    state,
    getters,
}