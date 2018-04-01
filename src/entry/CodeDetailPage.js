
import store from '../store'
import mixins from '../mixins/index'
import * as filters from '../filter/filter'
import CodeDetailPage from '../components/CodeDetailPage.vue'

const router = require('../router')

//sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, CodeDetailPage))
router.push('/')
