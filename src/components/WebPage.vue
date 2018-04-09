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
            let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
            this.mainStyle = {height:'1334px',width: '750px', marginTop: mainMarginTop}
        },
    }
</script>