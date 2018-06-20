
import Router from 'vue-router'
import store from '../store'
import mixins from '../mixins/index'
import * as filters from '../filter/filter'
import UserInfoPage from '../components/UserInfoPage.vue'
import SettingPage from '../components/SettingPage.vue'

const router = new Router({
    routes: [
        {
            path:  '/setting',
            name: 'SettingPage',
            component: SettingPage
        },

    ]
});

//sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)


/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, UserInfoPage))
router.push('/')
