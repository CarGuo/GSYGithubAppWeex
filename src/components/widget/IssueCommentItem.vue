<template>
    <div class="card-white-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image class="user-icon" v-if="itemValue.user" :src="itemValue.user.avatar_url"  @click="imageClick"></image>
            <div style="flex: 1">
                <div style="flex: 1;flex-direction: row">
                    <text class="user-text-theme" >{{itemValue.user ? itemValue.user.login : ''}}</text>
                    <text class="content-text-gray time-text">{{itemValue.created_at | resolveTime}}</text>
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
                if(!this.itemValue.user.login) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName:  this.itemValue.user.login})
            }
        },
        created() {
        },
    }
</script>

<style lang="sass" > @import '../../config/styles.scss'</style>
<style scoped>

    .user-icon {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 20px;
    }

    .card-user-wrapper {
        margin-bottom: 15px;
    }

    .time-text {
        font-size: 25px;
        margin-top: 5px;
    }

</style>