const state = {   //要设置的全局访问的state对象

    messages: [//type:1个人向公司，2公司向个人
        {type: 1, fromId:1 , toId: 4,data:"我是练习时长2年半的蔡徐坤，喜欢唱，跳，rap，篮球，想加入贵公司！"},
        {type: 2, fromId:4 , toId: 1,data:"你还是打球去吧",isSuccsee:false},
    ],


};
const getters = {   //实时监听state值的变化(最新状态)
    allMessages(state) {  //承载变化的changebleNum的值
        return state.messages
    }

};
const mutations = {
    messagesById(state,data){
        let toOther=[],toMe=[];
        state.messages.map((item,i)=>{
            if(item.type ===1&&item.fromId==data.id){
                toOther.push(item)
            }else if(item.type ===2&&item.toId==data.id){
                toMe.push(item)
            }
        });
        return ({toOther,toMe})

    },

};
const actions = {


   getMessagesById(context, data){
       context.commit('messagesById', data)
   }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}