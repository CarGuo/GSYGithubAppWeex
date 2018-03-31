<template>
    <div>
        <web v-if="isIos" :srcdoc="htmlData" :style="webStyle"></web>
        <gsyWeb v-if="isNotIos" :srcdoc="htmlData" :style="webStyle"></gsyWeb>
    </div>
</template>

<style scoped>
</style>

<script>
    export default {
        components:{
        },
        data: () => {
            return {}
        },
        props: {
            source: {type: String},
            webStyle: {type: Object, default: {height:'1334px', width: '750px'}},
        },
        computed: {
            htmlData() {
                return this.source;
            },
            isIos() {
                return WXEnvironment.platform === 'ios';
            },
            isNotIos() {
                return WXEnvironment.platform !== 'ios';
            }
        },
        methods: {},
        created() {
        },
    }
</script>