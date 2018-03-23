<template recyclable>
    <div class="card-wrapper">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image :src="userIcon" class="user-icon"></image>
            <text class="name-text" style="flex: 1; margin-left: 20px">CarGuo</text>
            <text class="des-text">10分钟</text>
        </div>
        <text class="content-text" style="flex: 1; margin-bottom: 20px;">stared CarGuo/GSYVideoPlayer</text>
        <text class="des-text">这里是描述!这里是描述!这里是描述!这里是描述!这里是描述!这里是描述!这里是描述!这里是描述!</text>
    </div>
</template>

<script>
    import * as Constant from "../../core/common/constant"
    export default {
        components: {},
        data() {
            return {
                userIcon: "https://avatars2.githubusercontent.com/u/10770362?s=400&u=d3d1be0401171c6a45ecfe50f63e73f0cdc6bd1a&v=4"
            }
        },
    }
</script>

<style scoped>
    .user-icon {
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
    }
    .card-wrapper {
        width: 700px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }
    .card-user-wrapper {
        align-items: center;
        margin-bottom: 20px;
    }
    .des-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
    }
    .content-text {
        color: rgba(13, 13, 13, 0.6);
        font-size: 28px;
        font-weight: bold;
    }
    .name-text {
        color: rgba(13, 13, 13, 0.6);
        font-size: 30px;
        font-weight: bold;
    }
</style>