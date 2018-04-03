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

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        overflow: scroll;
    }
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

    const dom = weex.requireModule('dom');
    const modal = weex.requireModule('modal');

    export default {
        components: {DynamicPage, TrendPage, TabBar, WxcMinibar, NavigationBar, PersonPage},
        data: () => ({
            tabTitles: Config.tabIconFontTitles,
            tabStyles: Config.tabIconFontStyles,
            mainHeight: Utils.env.getScreenHeight() - 32,
        }),
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            const {tabStyles} = this;
            this.contentStyle = {height: (tabPageHeight - tabStyles.height) + 'px'};
            this.mainHeight = ( WXEnvironment.platform === 'Web') ? '1334px' : Utils.env.getScreenHeight() - 32
        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                // console.log(index);
            },
            minibarLeftButtonClick() {
                //console.log("FFFFFF")
            },
            minibarRightButtonClick() {
                this.jumpWithParams("SearchPage",{})
            },
            itemClick(event) {
                console.log("click index ", event.index);
                modal.toast({message: "click index " + event.index})
            }
        }
    };
</script>
