<template>
    <div :style="{flex:1}">
        <navigation-bar v-if="needTitle" :title="userName" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
                  headerComponent="UserHeadItem" :headerData="userInfo"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList.vue'
    import resolveLongToTime from '../core/common/timeUtils'
    import event from '../core/net/event'
    import user from '../core/net/user'
    import NavigationBar from './widget/NavigationBar.vue'

    export default {
        props: {
            needTitle: {type: Boolean, default: false},
            userType: {type: Number, default: 1},
            isMe: {type: Boolean, default: true},
            userName: {type: String, default: ''},
        },
        components: {RLList, NavigationBar},
        data() {
            return {
                currentPage: 1,
                eventList: [],
                userData: {}
            }
        },
        created: function () {
            this.onRefresh()
            if (this.isMe === false) {
                this.loadUserInfo()
            }
        },
        activated: function () {
            this.onRefresh()
            if (this.isMe === false) {
                this.loadUserInfo()
            }
        },
        computed: {
            dataList() {
                return this.eventList;
            },
            userInfo() {
                let userInfo = this.currentUserInfo();
                if (!userInfo) {
                    return {ex: {}}
                }
                let time = resolveLongToTime(userInfo.created_at)
                let ex = {
                    userPic: userInfo.avatar_url,
                    user: userInfo.login,
                    name: userInfo.name ? userInfo.name : '---',
                    org: userInfo.company ? userInfo.company : '---',
                    location: userInfo.location ? userInfo.location : "---",
                    link: userInfo.blog ? userInfo.blog : "---",
                    des: (userInfo.bio ? (userInfo.bio + "\n") : "") + "创建于" + time,
                    repos: (userInfo.public_repos) ? userInfo.public_repos : '---',
                    follower: (userInfo.followers) ? userInfo.followers : '---',
                    followed: (userInfo.following) ? userInfo.following : '---',
                    star: (userInfo.starred) ? userInfo.starred : "---",
                    stared: "---",
                };
                let user = {
                    ex: ex
                };
                return user;
            },
        },
        methods: {
            currentUserInfo() {
                if (this.isMe === true) {
                    return this.getUserInfo();
                } else {
                    return this.userData;
                }
            },
            loadUserInfo() {
                if (!this.userName || this.userName.length < 1) {
                    return
                }
                user.getUserInfoDao(this.userName).then((res) => {
                    if (res && res.result) {
                        if (Constant.DEBUG) {
                            console.info("userInfo loadData ", res.data)
                        }
                        this.userData = res.data
                    }
                });
            },
            loadData(type) {
                let userInfo = this.currentUserInfo();
                let userName = (userInfo && userInfo.login) ?  userInfo.login : this.userName
                if (!userName || userName.length < 1) {
                    return
                }
                event.getEvent(this.currentPage, userName)
                    .then((res) => {
                        if (res && res.result) {
                            if(type === 1) {
                                this.eventList = res.data;
                            } else {
                                this.eventList = this.eventList.concat(res.data);
                            }
                        }
                        if (Constant.DEBUG) {
                            console.info("person loadData ", res)
                        }
                        if (type === 1) {
                            if (this.$refs.dylist) {
                                this.$refs.dylist.stopRefresh();
                            }
                        } else if (type === 2) {
                            if (this.$refs.dylist) {
                                this.$refs.dylist.stopLoadMore();
                            }
                        }
                        if (this.$refs.dylist) {
                            if (!res.data || res.data.length < Constant.PAGE_SIZE) {
                                this.$refs.dylist.setNotNeedLoadMore();
                            } else {
                                this.$refs.dylist.setNeedLoadMore();
                            }
                        }
                    })
            },
            onLoadMore() {
                this.currentPage++;
                this.loadData(2)
            },
            onRefresh() {
                this.currentPage = 1;
                this.eventList = [];
                this.loadData(1)
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