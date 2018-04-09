<template>
    <div>
        <web v-if="isWeb" :srcdoc="htmlData" :style="webStyle"></web>
        <web v-if="isIos" :source="htmlData" :style="webStyle"></web>
        <gsyWeb v-if="isAndroid" :srcdoc="htmlData" :style="webStyle" @overrideUrl="onOverrideUrl"></gsyWeb>
    </div>
</template>

<style scoped>
</style>

<script>
    import  {launchUrl} from "../../core/common/htmlUtils"
    export default {
        components:{
        },
        data: () => {
            return {}
        },
        props: {
            gsygithubLink:{type:Function},
            source: {type: String},
            webStyle: {type: Object, default: {height:'1334px', width: '750px'}},
        },
        computed: {
            htmlData() {
                return this.source;
            },
            isWeb() {
                return WXEnvironment.platform === 'Web';
            },
            isIos() {
                return WXEnvironment.platform.toLowerCase() === 'ios';
            },
            isAndroid() {
                return WXEnvironment.platform.toLowerCase() === 'android';
            }
        },
        methods: {
            onOverrideUrl(event) {
                if(event && event.url) {
                    if (event.url.indexOf('gsygithub://') === 0 ) {
                        this.gsygithubLink && this.gsygithubLink(event.url);
                    } else if (event.url && event.url.indexOf("https://github.com/") === 0) {
                        launchUrl(event.url, this)
                    } else if (event.url && (event.url.indexOf('http') === 0 || event.url.indexOf('www') === 0)) {
                        //Actions.WebPage({uri: event.url});
                        this.jumpWithParams("WebPage", {url: event.url})
                    } else if (event.url !== 'about:blank') {
                        //Linking.openURL(event.url)
                        //this.jumpWithParams("WebPage", {url: event.url})
                    }
                    //https://segmentfault.com/q/1010000009521040
                    //https://github.com/apache/incubator-weex/pull/1047
                    return event.url === 'about:blank';
                }
            }
        },
        created() {
        },
    }
</script>