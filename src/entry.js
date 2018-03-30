/* global Vue */

/* weex initialized here, please do not move this line */

import App from '@/index.vue'
import store from './store'
import mixins from '@/mixins/index'
import * as filters from '@/filter/filter'

const router = require('./router')

//sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

/*router.beforeEach((to, from, next) => {
    if (to.name == 'Login') {
        next();
        return;
    }
    var name = store.state.user.name;
    if (name == '未登录') {
        if (to.meta.requireAuth || to.name == null) {
            next({path: '/', query: {redirect: to.path}})
        } else {
            next();
        }
    } else {
        initMenu(router, store);
        if(to.path=='/chat')
            store.commit("updateMsgList", []);
        next();
    }
    next();
});*/


/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))
router.push('/')
