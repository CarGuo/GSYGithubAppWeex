
export default {
    methods: {
        getNavigator() {
            return weex.requireModule('navigator')
        },
        toBack() {
            if(WXEnvironment.platform === 'Web') {
                this.$router.back()
            }  else {
                this.getNavigator().pop({animated: "true"})
            }
        },
        getBaseUrl() {
            let bundleUrl = this.$getConfig().bundleUrl;
            bundleUrl = String(bundleUrl);
            let nativeBase;
            let isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;

            let isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
            if (isAndroidAssets) {
                nativeBase = 'file://assets/dist/';
            }
            else if (isiOSAssets) {
                nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
            } else {
                let host = 'localhost:8080';
                let matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
                if (matches && matches.length >= 2) {
                    host = matches[1];
                }
                nativeBase = 'http://' + host + '/index.html?page=./dist/';
            }
            return nativeBase;
        },
        jump(to) {
            if(WXEnvironment.platform === 'Web') {
                if (this.$router) {
                    this.$router.push(to)
                }
            } else {
                let path = this.getBaseUrl();
                this.getNavigator().push({
                    url: path + to + '.js',
                    animated: "true"
                }, event => {
                    //modal.toast({ message: 'callback: ' + event })
                })
            }
        },
        jumpWithParams(to, params) {
            if(WXEnvironment.platform === 'Web') {
                if (this.$router) {
                    this.$router.push({name: to, params: params})
                }
            } else {
                let path = this.getBaseUrl();
                let q = this.createQuery(params)
                this.getNavigator().push({
                    url: path + to + '.js' + q,
                    animated: "true"
                }, event => {
                    //modal.toast({ message: 'callback: ' + event })
                })
            }
        },
        reset(to) {
            if(WXEnvironment.platform === 'Web') {
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
            if (WXEnvironment.platform === 'Web') {
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