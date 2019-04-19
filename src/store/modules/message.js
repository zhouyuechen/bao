const state = {   //要设置的全局访问的state对象

    messages: [//type:1个人向公司，2公司向个人
        {type: 1, fromId:1 , toId: 4,data:"我蔡徐坤想加入贵公司"},
        {type: 2, fromId:4 , toId: 1,data:"你还是打球去吧",isSuccsee:false},
    ],


};
const getters = {   //实时监听state值的变化(最新状态)
    allMessages(state) {  //承载变化的changebleNum的值
        return state.user
    }
};
const mutations = {

    logout(state) {   //登出
        state.userNow = null;
        state.is = false;
    },
    del(state, data) {//删除用户
        state.user.map((item,i)=>{
            if(item.uid == data.uid){
                state.user.splice(i,1);
                return null
            }
        })
    }
};
const actions = {

    getLogout(context, data) {   //同上注释，num为要变化的形参
        context.commit('logout', data)
    },
    getDel(context, data) {   //同上注释，num为要变化的形参
        context.commit('del', data)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}