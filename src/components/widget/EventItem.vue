<template recyclable>
    <div class="card-wrapper"  @click="onItemClick(itemIndex)">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image :src="actionUserPic" class="user-icon"></image>
            <text class="name-text" style="flex: 1; margin-left: 20px">{{actionUser}}</text>
            <text class="des-text">{{actionTime}}</text>
        </div>
        <text class="content-text" style="flex: 1; margin-bottom: 20px;">{{actionTarget}}</text>
        <text class="des-text">{{des}}</text>
    </div>
</template>

<script>
    export default {
        props: {
            actionTime: {type: String, default: ""},
            itemIndex: {type: Number, default: -1},
            actionUser: {type: String, default: ""},
            actionUserPic: {type: String, default: ""},
            actionTarget: {type: String, default: ""},
            des: {type: String, default: ""},
        },
        components: {},
        methods: {
            onItemClick(index) {
                this.$emit('onItemClick', { index });
            }
        },
        data() {
            return {

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