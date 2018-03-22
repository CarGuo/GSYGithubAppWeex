import Vue from 'vue'
import weex from 'weex-vue-render'
/* global Vue */

weex.init(Vue)
/* weex initialized here, please do not move this line */
import router from './router'
import App from '@/index.vue'
import store from '@/core/store/store'
import mixins from '@/mixins/index'

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))
router.push('/')
