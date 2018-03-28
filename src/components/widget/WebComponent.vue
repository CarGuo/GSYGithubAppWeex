<template>
    <div class="wrapper" v-html="'<text>TTTTTTT</text>'">
    </div>
</template>

<style scoped>
    .wrapper {
        flex-direction: column;
        padding: 10px;
    }
</style>

<script>
    module.exports = {
        data: {
            pagestart: '',
            pagefinish: '',
            title: '',
            error: '',
            canGoBack: false,
            canGoForward: false,
        },
        methods: {
            goBack: function() {
                var webview = weex.requireModule('webview');
                webview.goBack(this.$refs.webview);
            },
            goForward: function() {
                var webview = weex.requireModule('webview');
                webview.goForward(this.$refs.webview);
            },
            reload: function() {
                var webview = weex.requireModule('webview');
                webview.reload(this.$refs.webview);
            },
            onPageStart: function(e) {
                this.pagestart = e.url;
            },
            onPageFinish: function(e) {
                this.pagefinish = e.url;
                this.canGoBack = e.canGoBack;
                this.canGoForward = e.canGoForward;
                if (e.title) {
                    this.title = e.title;
                }
            },
            onError: function(e) {
                this.error = url;
            },
            onReceivedTitle: function(e) {
                this.title = e.title;
            }
        }
    }
</script>