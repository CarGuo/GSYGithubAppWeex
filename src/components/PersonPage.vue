<template>
    <div :style="{flex:1}">
        <navigation-bar v-if="needTitle" :title="userName" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
                  :bottomEmpty="listBottomEmpty"
                  :headerClick="headerClick"
                  headerComponent="UserHeadItem" :headerData="userInfo" :listHeight="listHeight"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')


    import RLList from './widget/RLList.vue'
    import resolveLongToTime from '../core/common/timeUtils'
    import event from '../core/net/event'
    import user from '../core/net/user'
    import NavigationBar from './widget/NavigationBar.vue'
    import {ActionUtils} from '../core/common/eventUtils'
    import {Utils} from 'weex-ui'
    import {getListHeight, getListBottomEmpty, navigatorbBarHeight, mainTabBarHeight} from '../config/Config'

    export default {
        props: {
            needTitle: {type: Boolean, default: false},
            userType: {type: Number, default: 1},
            isMe: {type: Boolean, default: true},
            userName: {type: String, default: ''},
            jumpSetting: {type: Boolean, default: true},
        },
        components: {RLList, NavigationBar},
        data() {
            return {
                currentPage: 1,
                eventList: [],
                userData: {},
                listBottomEmpty: getListBottomEmpty(),
                listHeight: 0,
            }
        },
        created: function () {
            this.listHeight = getListHeight(Utils.env.getScreenHeight() - navigatorbBarHeight, Utils)
            this.onRefresh()
            if (this.isMe === false) {
                this.loadUserInfo()
            }
        },
        activated: function () {
            if(WXEnvironment.platform === 'Web') {
                this.onRefresh()
                if (this.isMe === false) {
                    this.loadUserInfo()
                }
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
                    jumpSetting: this.jumpSetting,
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
                            if (!res.data || res.data.length < this.getPageSize()) {
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
                let data = this.dataList[index];
                ActionUtils(data, this)
            },
            headerClick() {
                if (this.jumpSetting && this.jumpSetting === true) {
                    this.jumpInter("setting")
                }
            },

        }
    }
</script>

<style scoped>
</style>