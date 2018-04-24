<template>
    <div :style="{height: mainHeight, width: '750px'}">
        <navigation-bar :title="'GSYGithubApp'" :onLeftButtonClick="()=>{}" :onRightButtonClick="minibarRightButtonClick"
                        :rightIcon="'\ue61c'" :leftIcon="''"></navigation-bar>
        <tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="iconFont"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container" :style="contentStyle">
                <dynamic-page></dynamic-page>
            </div>
            <div class="item-container" :style="contentStyle">
                <trend-page></trend-page>
            </div>
            <div class="item-container" :style="contentStyle">
                <person-page></person-page>
            </div>
        </tab-bar>
    </div>
</template>

<style lang="scss" >
    @import '../config/styles.scss';
    .item-container {
        width: 750px;
        background-color: $--container-color;
        overflow: scroll;
    }
</style>
<style scoped>
</style>
<script>
    import {Utils, WxcMinibar} from 'weex-ui';
    import Config from '../config/MainTabConfig'
    import TabBar from './widget/TabBar.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import DynamicPage from './DynamicPage.vue'
    import TrendPage from './TrendPage.vue'
    import PersonPage from './PersonPage.vue'
    import {getIonFontPath} from '../config/IconConfig'
    import {addIconFontSupport} from '../config/IconConfig'
    import {getRealScreenHeight} from '../config/Config'

    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');

    export default {
        components: {DynamicPage, TrendPage, TabBar, WxcMinibar, NavigationBar, PersonPage},
        data: () => ({
            tabTitles: Config.tabIconFontTitles,
            tabStyles: Config.tabIconFontStyles,
            mainHeight: 0,
        }),
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            this.contentStyle = {height: tabPageHeight};
            this.mainHeight =  getRealScreenHeight(Utils)
            addIconFontSupport(dom, "../../")
        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
            },
            minibarRightButtonClick() {
                this.jumpWithParams("SearchPage",{})
            },
        }
    };
</script>
