const state = {   //要设置的全局访问的state对象

    user: [//type:0个人，1公司，2管理员
        {uid: 1,  account: '123456', pwd: "123456", type: 0},
        {uid: 2,  account: '787878', pwd: "123456", type: 1},
        {uid: 3,  account: '999999', pwd: "123456", type: 2}
    ],
    is: false,
    userNow: null,

};
const getters = {   //实时监听state值的变化(最新状态)
    allMember(state) {  //承载变化的changebleNum的值
        return state.user
    },
    check(state) {
        return state.is
    },
    now(state) {
        return state.userNow
    },
};
const mutations = {
    login(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        if (state.user.filter((item) => {
            return item.account === data.account && item.pwd === data.pwd && item.type === data.type
        }).length > 0
        ) {
            state.userNow = data;
            state.is = true;
        } else {
            state.userNow = null;
            state.is = false;
        }

    },
    register(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        if (state.user.filter((item) => {
            return item.account === data.account
        }).length > 0
        ) {
        } else {
            state.user.push({...data,uid:++state.user[state.user.length-1].uid})
        }
    },
    logout(state) {   //登出
        state.userNow = null;
        state.is = false;
    },
};
const actions = {
    getLogin(context, data) {   //同上注释，num为要变化的形参
        context.commit('login', data)
    },
    getRegister(context, data) {   //同上注释，num为要变化的形参
        context.commit('register', data)
    },
    getLogout(context, data) {   //同上注释，num为要变化的形参
        context.commit('logout', data)
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}