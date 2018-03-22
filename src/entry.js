/* global Vue */

/* weex initialized here, please do not move this line */

import App from '@/index.vue'
import store from './store'
import mixins from '@/mixins/index'

const router = require('./router')

//sync(store, router)

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))
router.push('/')
