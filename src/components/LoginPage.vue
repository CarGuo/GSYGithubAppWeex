<template>
    <div class="wrapper">
        <image :src="logo" class="logo"/>
        <input class="input" @input="onUserNameChange" ref="username" placeholder="用户名" :value="username"/>
        <input class="input" @input="onPWChange" type="password" ref="password" placeholder="密码"
               :value="password"/>
        <wxc-button text="登录"
                    type="red"
                    :btn-style="{flex:'1',width:'620px',marginTop: '30px', marginBottom:'30px'}"
                    @wxcButtonClicked="onLogin"></wxc-button>
        <text>{{ "UserName: " + tipData}}</text>

        <wxc-loading :show="isLoading"
                     :loading-text="loadingText"
                     :interval="100"></wxc-loading>
    </div>
</template>
<style scoped>
    .wrapper {
        align-items: center;
        justify-content: center;
    }

    .input {
        margin-left: 106px;
        margin-right: 106px;
        font-size: 30px;
        margin-top: 30px;
        min-width: 600px;
        border-radius: 12px;
        padding: 20px;
        color: #666666;
        align-items: center;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: #41B883;
    }

    .logo {
        width: 424px;
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
    import {setCache} from '../core/common/storageUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'

    export default {
        components: {WxcButton, WxcLoading},
        data() {
            return {
                logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
                username: "",
                password: "",
                isLoading: false,
                loadingText: "处理中···",
            }
        },
        computed: {
            tipData() {
                let login = 'wait your login';
                if (this.$store.state.user.userInfo.login) {
                    login = this.$store.state.user.userInfo.login;
                }
                return login
            }
        },
        methods: {
            onUserNameChange(event) {
                this.username = event.value;
            },
            onPWChange(event) {
                this.password = event.value;
            },
            onLogin() {
                const modal = weex.requireModule('modal');
                let username = this.username;
                let password =  this.password;
                console.log(modal)
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
                        console.info("resultCallback", res)
                    }
                })
            },
        }
    }
</script>