export default {
    methods: {
        getNavigator() {
            return weex.requireModule('navigator')
        },
        jump(to) {
            if(WXEnvironment.platform === 'web') {
                if (this.$router) {
                    this.$router.push(to)
                }
            } else {
                this.getNavigator().push({
                    url: 'file://assets/dist/components' + to + '.js',
                    animated: "true"
                }, event => {
                    modal.toast({ message: 'callback: ' + event })
                })
            }
        },

        jumpWithParams(to, params) {
            if(WXEnvironment.platform === 'web') {
                if (this.$router) {
                    this.$router.push({name: to, params: params})
                }
            } else {
                let q = ""
                for (let p in params) {
                    q = p + "=" + params[p] + '&';
                }
                this.getNavigator().push({
                    url: 'file://assets/dist/components/' + to + '.js' + `?${q}`,
                    animated: "true"
                }, event => {
                    modal.toast({ message: 'callback: ' + event })
                })
            }
        },
        reset(to) {
            if(WXEnvironment.platform === 'web') {
                if (this.$router) {
                    this.$router.replace(to)
                }
            } else {
                if (this.$router) {
                    this.$router.replace(to)
                }
            }
        },
        getUserInfo() {
            return this.$store.state.user.userInfo
        }
    }
}
