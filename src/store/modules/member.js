const member = new Vuex.Store({
    state: {
        user: [
            { uid: 1, uname:'傻逼',account:'1',pwd:"123456"},
            { uid: 2, uname:'shabi',account:'2',pwd:"123456" }
        ],
        isLoad:false,
        userNow:{

        }
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        allMembers:()=>{
            return state.user

        }
    }
})