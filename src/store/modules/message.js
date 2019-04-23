const state = {   //要设置的全局访问的state对象

    messages: [//type:1个人向公司，2公司向个人
        {type: 1, fromId:1 , toId: 4,data:"我是练习时长2年半的蔡徐坤，喜欢唱，跳，rap，篮球，想加入贵公司！"},
        {type: 2, fromId:4 , toId: 1,data:"你还是打球去吧",isSuccess:false},
    ],


};
const getters = {   //实时监听state值的变化(最新状态)
    allMessages(state) {  //承载变化的changebleNum的值
        return state.messages
    }

};
const mutations = {
    messagesAdd(state,data){
        state.messages.push(data)
    },

};
const actions = {


   getMessagesAdd(context, data){
       context.commit('messagesAdd', data)
   }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}