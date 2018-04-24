<template>
    <div class="wrapper" :style="mainStyle">
        <navigation-bar :title="设置" :onLeftButtonClick="backRouter"
                        :rightIcon="' '"></navigation-bar>
        <scroller :style="{flex: 1, width: '750px'}">
            <div :style="{flex: 1, width: '750px',}">
                <wxc-cell title="关于"
                          :has-arrow="true"
                          @wxcCellClicked="aboutCellClicked"
                          :has-top-border="false"></wxc-cell>
                <div :style="{width: '750px',alignItems: 'center',justifyContent: 'center'}">
                    <wxc-button text="退出登陆" type="red"
                                :btn-style="{flex:'1', width:'650px',marginTop: '20px', marginBottom:'20px', backgroundColor: 'red'}"
                                @wxcButtonClicked="onLoginOut"></wxc-button>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { WxcCell, WxcButton, Utils} from 'weex-ui';
    import NavigationBar from './widget/NavigationBar.vue';
    import {getEntryPageStyle} from "../config/Config"
    import user from "../core/net/user"
    export default {
        components: {WxcCell, WxcButton, NavigationBar},
        data() {
            return {
                mainStyle: {}
            }
        },
        created: function () {
            let mainStyle = getEntryPageStyle(Utils)
            mainStyle.marginTop = 0
            this.mainStyle = mainStyle
        },
        methods: {
            onLoginOut() {
                user.cleanUserInfoLocal().then(()=> {
                    this.reset('login')
                })
            },
            aboutCellClicked() {
                this.jumpWithParams("RepositoryDetailPage", {
                    userName: 'CarGuo',
                    reposName: 'GSYGithubAppWeex',
                    title: 'CarGuo/GSYGithubAppWeex'
                })
            },
            backRouter() {
                if (this.$router) {
                    this.$router.back()
                }
            }
        },
    }
</script>

<style lang="scss" >
    @import '../config/styles.scss';
    .wrapper {
        background-color: $--container-color;
        width: 750px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
</style>
<style scoped>
</style>