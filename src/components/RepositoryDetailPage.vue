<template>
    <div style="flex: 1;background-color: white">
        <navigation-bar :title="title"
                        :rightIcon="' '"></navigation-bar>
        <top-tab-bar :tab-titles="tabTitles"
                     :tab-styles="tabStyles"
                     title-type="text"
                     @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container"  :style="contentStyle">
                <web-component :source="readme" :webStyle="{height:'1154px', width: '750px', paddingBottom:'80px' }"></web-component>
            </div>
            <div class="item-container":style="contentStyle">
                <repository-detail-info-page  ref="a"  :userName="userName" :reposName="reposName"></repository-detail-info-page>
            </div>
            <div class="item-container"  :style="contentStyle">
                <repository-file-list-page ref="b" :userName="userName" :reposName="reposName"></repository-file-list-page>
            </div>
            <div class="item-container"  :style="contentStyle">
                <repository-issue-list-page ref="c" :userName="userName" :reposName="reposName"></repository-issue-list-page>
            </div>
        </top-tab-bar>
    </div>
</template>

<script>
    import {Utils, WxcMinibar }  from 'weex-ui';
    import Config from './config/RepositoryTabConfig'
    import NavigationBar from './widget/NavigationBar'
    import TopTabBar from './widget/TopTabBar'
    import WebComponent from './widget/WebComponent'
    import RepositoryDetailInfoPage from './RepositoryDetailInfoPage'
    import RepositoryIssueListPage from './RepositoryIssueListPage'
    import RepositoryFileListPage from './RepositoryFileListPage'
    import repository from '../core/net/repository'
    import * as Constant from '../core/common/constant'

    export default {
        components: {TopTabBar, NavigationBar, WebComponent, RepositoryDetailInfoPage, RepositoryIssueListPage, RepositoryFileListPage},
        data: () => ({
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles,
            title: "",
            userName: "",
            reposName: "",
            readme: " ",
        }),
        created () {
            const tabPageHeight = Utils.env.getPageHeight();
            const { tabStyles } = this;
            this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
        },
        activated: function () {
            this.loadReadme()
            console.log("ffff",this.$refs.a)
            if(this.$refs.a)
            this.$refs.a.init();
            if(this.$refs.b)
            this.$refs.b.init();
            if(this.$refs.c)
            this.$refs.c.init();
        },
        methods: {

            wxcTabBarCurrentTabSelected (e) {
                const index = e.page;
            },
            loadReadme() {
                this.title = this.$route.params.title
                this.userName = this.$route.params.userName
                this.reposName = this.$route.params.reposName
                if (!this.title || !this.userName || !this.reposName) {
                    return
                }
                repository.getRepositoryDetailReadmeHtmlDao(this.userName, this.reposName)
                    .then((res)=>{
                        if(res && res.data) {
                            this.readme = res.data;
                        }
                        if (Constant.DEBUG) {
                            console.info("repository detail readme", res)
                        }
                    })
            },
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
    }

</style>