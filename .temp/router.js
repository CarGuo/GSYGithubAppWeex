import Vue from 'vue'
/* global Vue */
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import WelcomePage from '@/components/WelcomePage'
import MainTabPage from '@/components/MainTabPage'
import EventItem from '@/components/widget/EventItem'
import RepositoryItem from '@/components/widget/RepositoryItem'

Vue.use(Router)

Vue.component('EventItem', EventItem)
Vue.component('RepositoryItem', RepositoryItem)

module.exports = new Router({
    routes: [
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/',
            name: 'WelcomePage',
            component: WelcomePage
        },
        {
            path: '/main',
            name: 'MainTabPage',
            component: MainTabPage
        }
    ]
})
