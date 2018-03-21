import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'


Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        user,
    },
    strict: false,
    plugins:  []
})