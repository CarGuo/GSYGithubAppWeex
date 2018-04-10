<template>
    <div class="card-black-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image class="user-icon" v-if="itemValue.user" :src="itemValue.user.avatar_url"  @click="imageClick"></image>
            <div style="flex: 1;">
                <div style="flex: 1;flex-direction: row">
                    <text class="name-text-white user-text-issue" >{{itemValue.user ? itemValue.user.login : ''}}</text>
                    <text class="content-text-gray time-text">{{itemValue.created_at | resolveTime}}</text>
                </div>
                <div style="flex-direction: row;margin-top: 10px">
                    <text class="content-text-gray" :style="itemValue.state === 'open' ? {fontFamily: 'wxcIconFont',  'color':'green'}  :  {fontFamily: 'wxcIconFont', 'color':'red'}">{{'\ue661'}}</text>
                    <text class="content-text-gray number-text">{{' # ' + itemValue.number}}</text>
                    <text class="content-text-gray comment-text" :style="{fontFamily: 'wxcIconFont'}">{{' \ue6ba '  + itemValue.comments}}</text>
                </div>
                <text class="content-text-white title-text">{{itemValue.title}}</text>
            </div>
        </div>
        <issue-rich-text class="special-rich"
                       :config-list="itemValue.rich_list"></issue-rich-text>
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
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.user.login})
            },
            isAndroid() {
                return WXEnvironment.platform === 'android' && this.itemValue.body_html
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

    .user-text-issue {
        flex: 1;
    }

    .title-text {
        margin-top: 15px;
    }

    .time-text {
        font-size: 25px;
        margin-top: 5px;
    }

    .comment-text {
        text-align: end;
        font-size: 24px;
    }


    .number-text {
        font-size: 24px;
        margin-left: 10px;
    }

</style>