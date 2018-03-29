<template>
    <web :srcdoc="htmlData" :style="webStyle"></web>
</template>

<style scoped>
</style>

<script>
    export default {
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
            }
        },
        components: {},
        methods: {},
        created() {
        },
    }
</script>