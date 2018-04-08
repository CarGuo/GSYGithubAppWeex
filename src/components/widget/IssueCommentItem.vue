<template>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.user" :src="itemValue.user.avatar_url" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1">
                <div style="flex: 1;flex-direction: row">
                    <text class="user-text" >{{itemValue.user ? itemValue.user.login : ''}}</text>
                    <text class="time-text">{{itemValue.created_at | resolveTime}}</text>
                </div>
                <issue-rich-text class="special-rich"
                                 :config-list="itemValue.rich_list"></issue-rich-text>
            </div>
        </div>
    </div>
</template>

<script>
    import IssueRichText from './IssueRichText.vue'
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
        components: {IssueRichText},
        methods: {
            onCardClick(itemIndex) {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
            imageClick() {
                if(!this.itemValue.ex.userName) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName:  this.itemValue.user.login})
            }
        },
        created() {
        },
    }
</script>

<style scoped>
    .user-icon {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 20px;
    }

    .card-wrapper {
        width: 700px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .card-user-wrapper {
        margin-bottom: 15px;
    }

    .user-text {
        color: rgba(60, 63, 65, 1);
        font-size: 30px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        flex:1;
        font-weight: bold;
        -webkit-box-orient: vertical;
    }

    .content-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 26px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        margin-top: 15px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .time-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 25px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 5px;
    }

</style>