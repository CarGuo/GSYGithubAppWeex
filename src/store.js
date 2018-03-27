import Vuex from 'vuex'
import user from '@/core/store/modules/user'
import event from '@/core/store/modules/event'
import repository from '@/core/store/modules/repository'


Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        user,
        event,
        repository
    },
    strict: false,
    plugins:  []
})