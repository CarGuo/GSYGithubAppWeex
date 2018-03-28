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
    import event from '../core/net/event'

    export default {
        components: {RLList},
        data() {
            return {
                currentPage: 1,
                eventList:[]
            }
        },
        created: function () {
            let userInfo = this.getUserInfo();
            event.getEvent(this.currentPage, userInfo.login)
                .then((res) => {
                    if (res && res.result) {
                        this.eventList = res.data;
                    }
                })
        },
        computed: {
            dataList() {
                return this.eventList;
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
                this.currentPage++;
                let userInfo = this.getUserInfo();
                event.getEvent(this.currentPage, userInfo.login)
                    .then((res) => {
                        if (res && res.result) {
                            this.eventList = this.eventList.concat(res.data);
                        }
                        if (Constant.DEBUG) {
                            console.info("loadMore ", res)
                        }
                        if (this.$refs.dylist) {
                            this.$refs.dylist.stopLoadMore();
                        }
                        if (!res.data || res.data.length < Constant.PAGE_SIZE) {
                            this.$refs.dylist.setNotNeedLoadMore();
                        } else {
                            this.$refs.dylist.setNeedLoadMore();
                        }
                    })
            },
            onRefresh() {
                this.currentPage =1;
                let userInfo = this.getUserInfo();
                event.getEvent(this.currentPage, userInfo.login)
                    .then((res) => {
                        if (res && res.result) {
                            this.eventList = res.data;
                        }
                        if (Constant.DEBUG) {
                            console.info("onRefresh ", res)
                        }
                        if (this.$refs.dylist) {
                            this.$refs.dylist.stopRefresh();
                        }
                        if (!res.data || res.data.length < Constant.PAGE_SIZE) {
                            this.$refs.dylist.setNotNeedLoadMore();
                        } else {
                            this.$refs.dylist.setNeedLoadMore();
                        }
                    })
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