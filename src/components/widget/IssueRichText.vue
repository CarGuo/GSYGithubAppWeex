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
