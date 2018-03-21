<template>
    <div class="wrapper">
        <image :src="logo" class="logo"/>
        <input class="input" @change="onUserNameChange" placeholder="用户名"/>
        <input class="input" @change="onPWChange" type="password" placeholder="密码"/>
        <wxc-button text="登录"
                    type="red"
                    :btn-style="{flex:'1',width:'620px',marginTop: '30px', marginBottom:'30px'}"
                    @wxcButtonClicked="onLogin"></wxc-button>
        <text>{{ "UserName: " + tipData}}</text>
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
    const modal = weex.requireModule('modal');
    import {WxcButton} from 'weex-ui'
    import {Buffer} from 'buffer'
    import user from '../core/net/user'
    import * as Constant from '../core/common/constant'
    import {setCache} from '../core/common/storageUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'

    export default {
        components: {WxcButton},
        data() {
            return {
                logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
                username: "",
                password: "",
            }
        },
        computed:{
            tipData() {
                let login = 'wait your login';
                if(this.$store.state.user.userInfo.login) {
                    login = this.$store.state.user.userInfo.login;
                }
                return login
            }
        },
        methods: {
            onUserNameChange(event) {
                console.log('on username change:', event.value);
                this.username = event.value;
            },
            onPWChange(event) {
                console.log('on pw change:', event.value);
                this.password = event.value;
            },
            onLogin() {
                console.log(this.$store);
                this.$store.dispatch('doLogin', {
                    username: this.username,
                    password: this.password,
                });
            },
        }
    }
</script>