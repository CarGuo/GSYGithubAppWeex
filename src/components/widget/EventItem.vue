<template recyclable>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.avatar_url" :src="itemValue.ex.avatar_url" class="user-icon" @click="imageClick"></image>
            <text class="name-text" style="flex: 1;">{{itemValue.ex.display_login}}</text>
            <text class="des-text">{{itemValue.ex.created_at | resolveTime}}</text>
        </div>
        <text class="content-text" style="flex: 1; margin-bottom: 20px;">{{itemValue.ex.actionStr}}</text>
        <text class="des-text">{{itemValue.ex.des}}</text>
    </div>
</template>

<script>
    export default {
        props: {
            itemValue: {
                type: Object, default: () => {
                    return {ex:{}}
                }
            },
            itemIndex: {type: Number, default: -1},
            onItemClick:{type:Function}
        },
        components: {},
        methods: {
            onCardClick() {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
            imageClick() {
                if(!this.itemValue.ex.display_login) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.ex.display_login})
            }
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>
    .user-icon {
        margin-right: 20px;
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
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        lines: 3;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
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