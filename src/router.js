/* global Vue */
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import WelcomePage from '@/components/WelcomePage'
import MainTabPage from '@/components/MainTabPage'
import RepositoryDetailPage from '@/components/RepositoryDetailPage'
import CodeDetailPage from '@/components/CodeDetailPage'
import UserInfoPage from '@/components/UserInfoPage'
import EventItem from '@/components/widget/EventItem'
import RepositoryItem from '@/components/widget/RepositoryItem'
import UserHeadItem from '@/components/widget/UserHeadItem'
import IssueItem from '@/components/widget/IssueItem'
import FileItem from '@/components/widget/FileItem'
import RepositoryHeadItem from '@/components/widget/RepositoryHeadItem'

Vue.use(Router)

Vue.component('EventItem', EventItem)
Vue.component('RepositoryItem', RepositoryItem)
Vue.component('UserHeadItem', UserHeadItem)
Vue.component('RepositoryHeadItem', RepositoryHeadItem)
Vue.component('IssueItem', IssueItem)
Vue.component('FileItem', FileItem)



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
            component: MainTabPage,
            meta: {
                keepAlive: true,
            }
        },
        {
            path: '/user/:userName/repository/:reposName',
            name: 'RepositoryDetailPage',
            component: RepositoryDetailPage,
            /*children: [
                {
                    path: 'code',
                    name: 'CodeDetailPage',
                    component: CodeDetailPage
                },
            ]*/
        },
        {
            path: '/user/:userName',
            name: 'UserInfoPage',
            component: UserInfoPage
        },
        {
            path: 'code',
            name: 'CodeDetailPage',
            component: CodeDetailPage
        },


    ]
})
