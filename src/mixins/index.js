const basePath = 'http://192.168.21.75:8088/dist/views';

export default {
    methods: {
        getNavigator() {
            return weex.requireModule('navigator')
        },
        toBack() {
            if(WXEnvironment.platform === 'web') {
                this.$router.back()
            }  else {
                this.getNavigator().pop({animated: "true"})
            }
        },
        jump(to) {
            if(WXEnvironment.platform === 'web') {
                if (this.$router) {
                    this.$router.push(to)
                }
            } else {
                this.getNavigator().push({
                    url: 'file://assets/dist/' + to + '.js',
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
                let q = this.createQuery(params)
                this.getNavigator().push({
                    url: 'file://assets/dist/' + to + '.js' + q,
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
        // object 转 URL 参数
        createQuery(obj) {
            let url = '?';
            for (let key in obj) {
                if (obj[key] !== null) {
                    url += (key + '=' + encodeURIComponent(obj[key]) + '&');
                }
            }
            return url.substring(0, url.lastIndexOf('&'));
        },
        // 'xxx.js?name=aa' 转 {name: 'aa'}
        getQueryData(url) {
            url = url.substring(url.indexOf('.js?') + 3);
            let result = {};
            if (url.indexOf("?") != -1) {
                let str = url.substr(1);
                let strs = str.split("&");
                for (let i = 0; i < strs.length; i++) {
                    result[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return result;
        },
        getQuery() {
            if (WXEnvironment.platform === 'web') {
                return this.$route.params;
            } else {
                return this.getQueryData(weex.config.bundleUrl);
            }
        },
        getUserInfo() {
            return this.$store.state.user.userInfo
        },
    }
}