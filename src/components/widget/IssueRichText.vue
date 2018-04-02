<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
    <div class="wxc-rich-text">
        <div v-for="v in configList">
            <text :style="v.style">{{v.value}}</text>
        </div>
    </div>
</template>

<style scoped>
    .wxc-rich-text {
    }
</style>

<script>

    export default {
        components: {},
        props: {
            configList: {
                type: [Array],
                default: function () {
                    return []
                }
            }
        },
        data: () => ({}),
    };
</script>
