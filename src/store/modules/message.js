const state = {   //要设置的全局访问的state对象

    messages: [//type:1个人向公司，2公司向个人
        {type: 1, fromId:1 , toId: 2,data:"1",jid:1},
        {type: 2, fromId:2 , toId: 1,data:"2",isSuccess:false,jid:1},
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