import Vuex from 'vuex'
import user from '@/core/store/modules/user'


Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        user,
    },
    strict: false,
    plugins:  []
})