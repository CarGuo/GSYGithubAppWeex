import Vuex from 'vuex'
import user from '@/core/store/modules/user'
import event from '@/core/store/modules/event'


Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        user,
        event
    },
    strict: false,
    plugins:  []
})