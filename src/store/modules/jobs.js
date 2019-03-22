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
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },{
            jname: "web前端工程师",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "傻逼有限公司",
            cphone: "18888888888",
            caddress: "杭州你家"
        },
    ]

};
const getters = {   //实时监听state值的变化(最新状态)
    allJobs(state) {
        return state.jobs
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