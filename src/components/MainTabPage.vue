<template>
    <tab-bar :tab-titles="tabTitles"
             :tab-styles="tabStyles"
             title-type="iconFont"
             @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
        <div class="item-container" :style="contentStyle">
            <dynamic-page></dynamic-page>
        </div>
        <div class="item-container" :style="contentStyle">
            <div style="align-items: center;justify-content: center;">
                <event-item
                        actionTime="10分钟后"
                        actionUser="CarGuo"
                        actionUserPic="https://avatars2.githubusercontent.com/u/10770362?s=400&u=d3d1be0401171c6a45ecfe50f63e73f0cdc6bd1a&v=4"
                        actionTarget="star XXXXX/CCCCCC"
                        des="新空间发了啥空间发了束带结发凉快圣诞节"
                        @onItemClick="itemClick"
                        :itemIndex=0></event-item>
            </div>
        </div>
        <div class="item-container" :style="contentStyle">
            <text>{{"我的主页\n测试图标"}}</text>
            <text :style="{fontFamily: 'wxcIconFont',fontSize: '40px', color:'red'}">{{"\ue661"}}</text>
        </div>
    </tab-bar>
</template>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        overflow: scroll;
    }
</style>
<script>
    import {Utils} from 'weex-ui';
    import Config from './config/MainTabConfig'
    import TabBar from './widget/TabBar'
    import EventItem from './widget/EventItem'
    import DynamicPage from './DynamicPage'

    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');

    export default {
        components: {DynamicPage, EventItem, TabBar},
        data: () => ({
            tabTitles: Config.tabIconFontTitles,
            tabStyles: Config.tabIconFontStyles,
        }),
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            const {tabStyles} = this;
            this.contentStyle = {height: (tabPageHeight - tabStyles.height) + 'px'};

            dom.addRule('fontFace', {
                'fontFamily': "wxcIconFont",
                'src': `url('../static/font/iconfont.ttf')`
            });
        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                // console.log(index);
            },
            itemClick(event) {
                console.log("click index ", event.index);
                modal.toast({message:"click index " +  event.index})
            }
        }
    };
</script>
