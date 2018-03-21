import Vuex from 'vuex'
import user from './core/store/modules/user'

if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}

export default new Vuex.Store({
    modules: {
        user,
    },
    strict: false,
    plugins:  []
})