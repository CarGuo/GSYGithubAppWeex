<template>
    <div>
        <web v-if="isIos" :srcdoc="htmlData" :style="webStyle"></web>
        <gsyWeb v-if="isNotIos" :srcdoc="htmlData" :style="webStyle" @overrideUrl="onOverrideUrl"></gsyWeb>
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
            isIos() {
                return WXEnvironment.platform === 'ios' ||  WXEnvironment.platform === 'Web';
            },
            isNotIos() {
                return WXEnvironment.platform !== 'ios';
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
                    return event.url === 'about:blank';
                }
            }
        },
        created() {
        },
    }
</script>