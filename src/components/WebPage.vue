<template>
    <div :style="mainStyle">
        <navigation-bar :title="' '" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <web :src="url" :style="webStyle"></web>
    </div>
</template>

<style scoped>
</style>

<script>
    import NavigationBar from './widget/NavigationBar.vue'
    import {getEntryPageStyle} from "../config/Config"
    import {Utils} from "weex-ui"

    export default {
        components:{
            NavigationBar
        },
        data: () => {
            return {
                url:"",
                mainStyle: {}
            }
        },
        props: {
            webStyle: {type: Object, default: {height:'1334px', width: '750px'}},
        },
        methods: {
        },
        created() {
            this.url =  this.getQuery().url;
            this.mainStyle = getEntryPageStyle(Utils)
        },
    }
</script>