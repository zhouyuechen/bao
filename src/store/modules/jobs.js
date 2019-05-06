import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象

    jobNow:{},

    jobs: [
        {
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:1
        },
        {
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:2
        },
        {
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:3
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:4
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