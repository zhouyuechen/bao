import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象

    jobNow:{},

    jobs: [
        {
            jname: "web前端工程师1",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:1
        },
        {
            jname: "web前端工程师2",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:2
        },
        {
            jname: "web前端工程师3",
            jrequire: "1、负责公司产品Web前端功能设计和开发；2、根据要求开发高性能、高兼容性的前端代码；3、提升前端页面交互和使用体验。",
            jmoney: "20k-40k",
            cname: "AA有限公司",
            cphone: "18888228888",
            caddress: "杭州",
            jid:3
        },{
            jname: "乌龟饲养",
            jrequire: "养乌龟",
            jmoney: "2k-4k",
            cname: "文艺有限公司",
            cphone: "18932322323",
            caddress: "啊哈",
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
    addJob(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        let max=0;
        state.jobs.map((item,i)=>{
            if(item.jid>max){
                max=item.jid;
            }
        })
        state.jobs.push({jid:++max,...data})

    },
    del(state, data) {//删除
            state.jobs.map((item, i) => {
                if (item.jid === data.jid) {
                    state.jobs.splice(i, 1);
                    return null
                }
            })

    },
    edit(state, data){
        state.jobs.map((item, i) => {
            if (item.jid ===data.jid) {
                state.jobs[i]=data
                return null
            }
        })
    }
};
const actions = {
    getAddJob(context, data) {   //同上注释，num为要变化的形参
        context.commit('addJob', data)
    },
    getDelJob(context, data) {   //同上注释，num为要变化的形参
        context.commit('del', data)
    },
    getEditJob(context, data) {   //同上注释，num为要变化的形参
        context.commit('edit', data)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}