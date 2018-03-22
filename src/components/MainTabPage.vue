<template>
    <wxc-tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="iconFont"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
        <div class="item-container" :style="contentStyle">
            <dynamic-page/>
        </div>
        <div class="item-container" :style="contentStyle">
            <scroller>
                <text>特别推荐1</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐2</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐3</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐4</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐5</text>
                <text>特别推荐</text>
                <text>特别推荐</text>
                <text>特别推荐6</text>
                <event-item></event-item>
            </scroller>
        </div>
        <div class="item-container" :style="contentStyle">
            <text>{{"我的主页\n测试图标"}}</text>
            <text :style="{fontFamily: 'wxcIconFont',fontSize: '40px', color:'red'}">{{"\ue661"}}</text>
        </div>
    </wxc-tab-bar>
</template>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {WxcTabBar, Utils} from 'weex-ui';
    import Config from './config/MainTabConfig'
    import EventItem from './widget/EventItem'
    import DynamicPage from './DynamicPage'

    const dom = weex.requireModule('dom');

    export default {
        components: {WxcTabBar, EventItem, DynamicPage},
        data: () => ({
            tabTitles: Config.tabIconFontTitles,
            tabStyles: Config.tabIconFontStyles
        }),
        created() {
            //setTitle('TabBar');
            const tabPageHeight = Utils.env.getPageHeight();
            const {tabStyles} = this;
            this.contentStyle = {height: (tabPageHeight - tabStyles.height) + 'px'};

            dom.addRule('fontFace', {
                'fontFamily': "wxcIconFont",
                'src': `url('../../static/font/iconfont.ttf')`
            });
        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                // console.log(index);
            }
        }
    };
</script>
