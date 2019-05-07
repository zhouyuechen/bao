const state = {   //要设置的全局访问的state对象

    user: [//type:0个人，1公司，2管理员
        {
            uid: 1,
            account: 'c123456',
            pwd: "123456",
            type: 0,
            phone: 133888877878,
            email: 'zhangsan@qq.com',
            pname: "张三",
            imageUrl: "https://static001.infoq.cn/resource/image/c0/7f/c0a42862394dfb0a91587474622a257f.jpg?x-oss-process=image/crop,x_630,y_311,w_726,h_538/resize,w_420,h_312"
        },
        {
            uid: 2,
            account: '787878',
            pwd: "123456",
            type: 1,
            phone: 18888888888,
            email: '444@qq.com',
            cname: "AA有限公司",
            imageUrl: "//img.hicdn.cn/fed/images/20190404/291b64400c0e9b0982706f52ab90971f.png"
        },
        {uid: 3, account: '999999', pwd: "123456", type: 2, phone: null, email: null},
        {
            uid: 4,
            account: 'ffffff',
            pwd: "123456",
            type: 1,
            phone: 18932322323,
            email: "444ww@qq.com",
            cname: "文艺有限公司",
            imageUrl: "https://www.jiamengfei.com/uploads/images/2016/04-21/d4e5a1520b3f.jpg"
        },

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
        let temp = state.user.filter((item) => {
            return item.account === data.account && item.pwd === data.pwd && item.type === data.type
        });
        if (temp.length > 0
        ) {
            state.userNow = temp[0];
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
            state.user.push({...data, uid: ++state.user[state.user.length - 1].uid})
        }
    },
    logout(state) {   //登出
        state.userNow = null;
        state.is = false;
    },
    del(state, data) {//删除用户
        if (data.uid == state.userNow.uid) {
            alert('你不能删除你自己')
        } else {
            state.user.map((item, i) => {
                if (item.uid == data.uid) {
                    state.user.splice(i, 1);
                    data.that.$message('删除成功');
                    return null
                }
            })
        }

    },
    update(state, data) {//修改用户
        let {account, pwd, pname, phone, email, imageUrl} = data;
        state.user.map((item, i) => {
            if (item.account == account) {
                console.log(item)
                if (pwd != item.pwd) state.user[i].pwd = pwd;
                if (pname != item.pname) state.user[i].pname = pname;
                if (phone != item.phone) state.user[i].phone = phone;
                if (email != item.email) state.user[i].email = email;
                if (imageUrl != item.imageUrl) state.user[i].imageUrl = imageUrl;

            }
        })
    }
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
    getDel(context, data) {   //同上注释，num为要变化的形参
        context.commit('del', data)
    },
    getUpdate(context, data) {   //同上注释，num为要变化的形参
        context.commit('update', data)
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}