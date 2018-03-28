<template>
    <div style="flex: 1">
        <navigation-bar :title="title"
                        :rightIcon="' '"></navigation-bar>
        <top-tab-bar :tab-titles="tabTitles"
                     :tab-styles="tabStyles"
                     title-type="text"
                     @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container" :style="contentStyle">
                <web-component></web-component>
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

    export default {
        props: {
            title: {type: String, default: ' '},
            userName: {type: String, default: ' '},
            reposName: {type: String, default: ' '},
        },
        components: {TopTabBar, NavigationBar, WebComponent},
        data: () => ({
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles
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
                // console.log(index);
            },
            loadReadme() {
                repository.getRepositoryDetailReadmeHtmlDao(this.username, this.repoName)
                    .then((res)=>{
                        console.info("FFFFFFF", res)
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