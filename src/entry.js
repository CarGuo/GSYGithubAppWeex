/* global Vue */

/* weex initialized here, please do not move this line */
import { sync } from 'vuex-router-sync'
import store from './store'
import App from '@/index.vue'
import router from './router'


/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router, store}, App))
router.push('/')
