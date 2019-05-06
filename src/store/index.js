import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user'
import jobs from './modules/jobs'
import message from './modules/message'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        jobs,
        message
    },
})
