<template>
    <div class="wrapper">
        <div class="input-container">
            <image :src="logo" class="logo"></image>
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{color: '#3c3f41', fontFamily: 'wxcIconFont'}">{{'\ue666'}}</text>
                <input class="input" @input="onUserNameChange" ref="username" placeholder="用户名" :value="username"/>
            </div>
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{color: '#3c3f41', fontFamily: 'wxcIconFont'}">{{'\ue60e'}}</text>
                <input class="input" @input="onPWChange" type="password" ref="password" placeholder="密码" :value="password"/>
            </div>
            <wxc-button text="登录" type="red" :btn-style="{flex:'1',width:'550px',marginTop: '80px', marginBottom:'40px', backgroundColor: '#3c3f41'}"
                        @wxcButtonClicked="onLogin"></wxc-button>
        </div>
        <wxc-loading :show="isLoading"
                     :loading-text="loadingText"
                     :interval="300"></wxc-loading>
    </div>
</template>
<style scoped>
    .wrapper {
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 1334px;
        background-color: #3c3f41;
    }

    .input-container {
        align-items: center;
        justify-content: center;
        width: 600px;
        background-color: white;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .input {
        font-size: 30px;
        min-width: 460px;
        border-radius: 12px;
        padding: 20px;
        color: #666666;
        align-items: center;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: #3c3f41;
    }


    .icon-text{
        align-items: center;
        justify-content: center;
        font-size: 55px;
        font-family: 'wxcIconFont';
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


    .logo {
        width: 200px;
        height: 200px;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {WxcButton, WxcLoading} from 'weex-ui'
    import {Buffer} from 'buffer'
    import user from '../core/net/user'
    import * as Constant from '../core/common/constant'
    import {isEmptyString} from '../core/common/commonUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'
    import {getImagePath, addIconFontSupport} from '../config/IconConfig'
    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom');

    export default {
        components: {WxcButton, WxcLoading},
        data() {
            return {
                logo: '',
                username: "",
                password: "",
                isLoading: false,
                loadingText: "处理中···",
            }
        },
        created: function () {
            this.logo = getImagePath('logo', '.png')
            addIconFontSupport(dom, "../../")
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
                let password =  this.password;
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
                        if(res && res.result) {
                            this.reset("/main")
                        }
                        console.info("resultCallback", res)
                    }
                })
            },
        }
    }
</script>