<template>
    <div class="wrapper">
        <image :src="logo" class="logo" />
        <input class="input" @change="onUserNameChange" singleline="true" placeholder="用户名" />
        <input class="input" @change="onPWChange" singleline="true" type="password"  placeholder="密码" />
        <wxc-button text="登录"
                    type="red"
                    class="login"
                    @wxcButtonClicked="onLogin"></wxc-button>
    </div>
</template>
<style scoped>
    .input {
        flex: 1;
        font-size: 30px;
        min-width: 650px;
        margin-top: 30px;
        margin-left: 106px;
        margin-right: 106px;
        border-radius: 10px;
        padding: 20px;
        color: #666666;
        border-width: 2px;
        border-style: solid;
        border-color: #41B883;
    }
    .logo {
        width: 424px;
        height: 200px;
    }
    .login {
        margin-top: 30px;
        margin-left: 106px;
        margin-right: 106px;
    }
</style>
<script>
    const modal = weex.requireModule('modal');
    import { WxcButton } from 'weex-ui'
    export default {
        components: { WxcButton },
        data () {
            return {
                logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
                username:"",
                password:"",
            }
        },
        methods: {
            onUserNameChange (event) {
                console.log('on username change:', event.value);
                this.username = event.value;
            },
            onPWChange (event) {
                console.log('on pw change:', event.value);
                this.password = event.value;
            },
            onLogin (e) {
                const { type, disabled } = e;
                modal.toast({
                    message: disabled ? `disabled=${disabled}` : `type=${type}`
                })
            }
        }
    }
</script>