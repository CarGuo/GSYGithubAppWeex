/* global Vue */
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import WelcomePage from '@/components/WelcomePage'
import MainTabPage from '@/components/MainTabPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/gg',
            name: 'WelcomePage',
            component: WelcomePage
        },
        {
            path: '/',
            name: 'MainTabPage',
            component: MainTabPage
        }
    ]
})
