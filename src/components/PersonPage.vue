<template>
    <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
              headerComponent="UserHeadItem" :headerData="userInfo"
              :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList'
    import resolveLongToTime from '../core/common/timeUtils'

    export default {
        components: {RLList},
        data() {
            return {
                currentPage: 1,
            }
        },
        created: function () {
        },
        computed: {
            dataList() {
                return this.$store.state.event.received_events_data_list;
            },
            userInfo() {
                let userInfo = this.getUserInfo();
                if (!userInfo) {
                    return {ex:{}}
                }
                let time = resolveLongToTime(userInfo.created_at)
                let ex = {
                    userPic: userInfo.avatar_url,
                    user: userInfo.login,
                    name:userInfo.name ? userInfo.name : '---',
                    org: userInfo.company ? userInfo.company : '---',
                    location: userInfo.location ? userInfo.location : "---",
                    link: userInfo.blog ? userInfo.blog : "---",
                    des: (userInfo.bio ? (userInfo.bio + "\n") : "") + "创建于" + time,
                    repos: userInfo.public_repos + "",
                    follower: userInfo.followers + "",
                    followed: userInfo.following + "",
                    star: (userInfo.starred) ? userInfo.starred : "---",
                    stared: "---",
                };
                let user = {
                    ex: ex
                };
                return  user;
            },
        },
        methods: {
            onLoadMore() {
            },
            onRefresh() {
            },
            itemClick(index) {
                console.log("click index ", index);
                modal.toast({message: "click index " + index})
            },
        }
    }
</script>

<style scoped>
</style>