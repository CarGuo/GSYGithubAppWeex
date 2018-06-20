
import store from '../store'
import mixins from '../mixins/index'
import * as filters from '../filter/filter'
import IssueDetailPage from '../components/IssueDetailPage.vue'

//sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', store}, IssueDetailPage))
