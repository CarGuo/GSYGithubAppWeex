<template>
    <div class="wrapper" ref="container" :style="{height: mainHeight}">
        <div class="input-container">
            <image :src="logo" class="logo"></image>
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue666'}}</text>
                <input class="input" @input="onUserNameChange" ref="username" placeholder="用户名" :value="username"/>
            </div>
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue60e'}}</text>
                <input class="input" @input="onPWChange" type="password" ref="password" placeholder="密码"
                       :value="password"/>
            </div>
            <wxc-button text="登录" type="red"
                        :btn-style="{flex:'1',width:'550px',marginTop: '80px', marginBottom:'40px', backgroundColor: primaryColor}"
                        @wxcButtonClicked="onLogin"></wxc-button>
        </div>
        <loading-component height="1334"
                           width="750"
                           border-radius="0"
                           duration="100"
                           :has-overlay="true"
                           :show-close="false"
                           :show="isLoading"
                           :has-animation="true">
        </loading-component>
    </div>
</template>

<style lang="scss">
    @import '../config/styles.scss';

    .wrapper {
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 1334px;
        background-color: $--theme-color;
    }

    .input-container {
        align-items: center;
        justify-content: center;
        width: 600px;
        background-color: white;
        border-radius: 10px;
        padding: 25px;
        box-shadow: $--box-shadow-color;
    }

    .input {
        font-size: 30px;
        width: 460px;
        border-radius: 12px;
        padding: 20px;
        color: $--input-color;
        align-items: center;
        justify-content: center;
        border: 2px solid $--theme-color;
    }

    .icon-text {
        align-items: center;
        color: $--theme-color;
        justify-content: center;
        font-size: 55px;
        display: -webkit-box;
        margin-top: 10px;
        margin-right: 25px;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
<style scoped>

    .logo {
        width: 200px;
        height: 200px;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {WxcButton, WxcLoading, Utils} from 'weex-ui'
    import {Buffer} from 'buffer'
    import user from '../core/net/user'

    import {isEmptyString} from '../core/common/commonUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'
    import {getImagePath, addIconFontSupport} from '../config/IconConfig'
    import LoadingComponent from './widget/LoadingComponent.vue'
    import * as Config from '../config/Config'

    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom');
    const animation = weex.requireModule('animation');

    export default {
        components: {WxcButton, WxcLoading, LoadingComponent},
        data() {
            return {
                logo: '',
                username: "",
                password: "",
                isLoading: false,
                loadingText: "处理中···",
                primaryColor: Config.primaryColor,
                mainHeight: 0
            }
        },
        created: function () {
            this.logo = getImagePath('logo', '.png')
            addIconFontSupport(dom, "../../")
            this.mainHeight = Utils.env.getScreenHeight()
        },
        methods: {
            onUserNameChange(event) {
                this.username = event.value;
            },
            onPWChange(event) {
                this.password = event.value;
            },
            onLogin() {
                let username = this.username;
                let password = this.password;
                if (isEmptyString(username)) {
                    modal.toast({
                        message: "用户名不能为空"
                    });
                    return
                }
                if (isEmptyString(password)) {
                    modal.toast({message: "密码不能为空"});
                    return
                }
                this.isLoading = true;
                this.$store.dispatch('doLogin', {
                    username: username,
                    password: password,
                    resultCallback: (res) => {
                        this.isLoading = false;
                        if (res && res.result) {
                                let containerEl = this.$refs[`container`];
                                animation.transition(containerEl, {
                                    styles: {
                                        transform: `translateY(${Utils.env.getPageHeight()}px)`
                                    },
                                    duration: 1000,
                                    'cubic-bezier': (0.25, 0.46, 0.45, 0.94),
                                    delay: 0
                                }, () => {
                                    this.reset("/main")
                                });

                        }
                        console.info("resultCallback", res)
                    }
                })
            },
        }
    }
</script>