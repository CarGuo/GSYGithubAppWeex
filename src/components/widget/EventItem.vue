<template recyclable>
    <div>
        <div style="flex-direction: row">
            <image :src="userIcon" class="user-icon"></image>
            <text>sadfsdf</text>
            <text>asdfasdaf</text>
        </div>
        <text>sdfsadfasfasdfasd</text>
        <text>sdfasdfasdfasdfasdf</text>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                userIcon: "https://avatars2.githubusercontent.com/u/10770362?s=400&u=d3d1be0401171c6a45ecfe50f63e73f0cdc6bd1a&v=4"
            }
        },
        computed: {},
        methods: {},
        created: {}
    }
</script>

<style scoped>
    .user-icon {
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
    }
</style>