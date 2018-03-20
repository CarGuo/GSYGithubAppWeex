/* global Vue */
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
