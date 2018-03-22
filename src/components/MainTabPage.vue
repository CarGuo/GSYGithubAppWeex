<template>
    <wxc-tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="iconFont"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
        <div class="item-container" :style="contentStyle">
            <text>首页</text>
        </div>
        <div class="item-container" :style="contentStyle">
            <text>特别推荐</text>
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
    const dom = weex.requireModule('dom');

    export default {
        components: {WxcTabBar},
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
