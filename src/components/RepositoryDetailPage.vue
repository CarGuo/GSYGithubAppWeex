<template>
    <div style="flex: 1">
        <navigation-bar :title="title"
                        :rightIcon="' '"></navigation-bar>
        <top-tab-bar :tab-titles="tabTitles"
                     :tab-styles="tabStyles"
                     title-type="text"
                     @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container" :style="contentStyle">
                <web-component :source="readme" :webStyle="{height:'1200px', width: '750px', paddingBottom:'150px' }"></web-component>
            </div>
            <div class="item-container" :style="contentStyle"><text>特别推荐</text></div>
            <div class="item-container" :style="contentStyle"><text>消息中心</text></div>
            <div class="item-container" :style="contentStyle"><text>我的主页</text></div>
        </top-tab-bar>
    </div>
</template>

<script>
    import {Utils, WxcMinibar }  from 'weex-ui';
    import Config from './config/RepositoryTabConfig'
    import NavigationBar from './widget/NavigationBar'
    import TopTabBar from './widget/TopTabBar'
    import WebComponent from './widget/WebComponent'
    import repository from '../core/net/repository'
    import * as Constant from '../core/common/constant'

    export default {
        components: {TopTabBar, NavigationBar, WebComponent},
        data: () => ({
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles,
            title: "",
            userName: "CarGuo",
            reposName: "GSYGithubApp",
            readme: " ",
        }),
        created () {
            const tabPageHeight = Utils.env.getPageHeight();
            const { tabStyles } = this;
            this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
            this.loadReadme()
        },
        methods: {
            wxcTabBarCurrentTabSelected (e) {
                const index = e.page;
            },
            loadReadme() {
                this.title= this.$route.params.title
                this.userName= this.$route.params.userName
                this.reposName= this.$route.params.reposName
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