<template>
    <div :style="mainStyle">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" :listItemName="itemClass" :listData="list"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import repository from '../core/net/repository'
    import user from '../core/net/user'
    import {addIconFontSupport} from '../config/IconConfig'
    const dom = weex.requireModule('dom');


    export default {
        props: {
        },
        components: {RLList, NavigationBar},
        data() {
            return {
                userName: "",
                reposName: "",
                title: "",
                currentPage: 1,
                list: [],
                itemClass:  'EventItem',
                dataType:   '',
                mainStyle: {}
            }
        },
        created: function () {
            this.init()
            let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
            this.mainStyle = {height:'1334px',width: '750px',backgroundColor: '#f2f3f4', marginTop: mainMarginTop}
            addIconFontSupport(dom, "../../")
        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.init();
            }
        },
        methods: {
            init() {
                this.list = []
                if (this.getQuery().title) {
                    this.title = this.getQuery().title
                }
                if (this.getQuery().userName) {
                    this.userName = this.getQuery().userName
                }
                if (this.getQuery().reposName) {
                    this.reposName = this.getQuery().reposName
                }
                if (this.getQuery().dataType) {
                    this.dataType = this.getQuery().dataType
                }
                this.initItemClass();
                this.onRefresh()
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    if (type === 1) {
                        this.list = res.data;
                    } else {
                        this.list = this.list.concat(res.data);
                    }
                }
                if (Constant.DEBUG) {
                    console.info("comment list info loadData ", res)
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
            },
            loadData(type) {
                this.commonGetData(type);
            },
            onLoadMore() {
                this.currentPage++;
                this.loadData(2)
            },
            onRefresh() {
                this.currentPage = 1;
                this.list = [];
                this.loadData(1)
            },
            itemClick(index) {
                let data =  this.list[index]
                switch (this.dataType) {
                    case "userRepos":
                        this.jumpWithParams("RepositoryDetailPage", {
                            userName: this.userName,
                            reposName:  data.name,
                            title: this.userName + "/" +  data.name
                        })
                        break;
                    case "userStar":
                        this.jumpWithParams("RepositoryDetailPage", {
                            userName: data.owner.login,
                            reposName:  data.name,
                            title: this.userName + "/" +  data.name
                        })
                        break
                    case "userFollower":
                    case "userFollowed":
                    case "reposStarer":
                    case "reposForker":
                    case "reposWatcher":
                        this.jumpWithParams("UserInfoPage", {userName:  data.login})
                        break
                }
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
            initItemClass() {
                switch (this.dataType) {
                    case "userRepos":
                    case "userStar":
                    case "reposForker":
                        this.itemClass = 'RepositoryItem'
                        break
                    case "userFollower":
                    case "userFollowed":
                    case "reposStarer":
                    case "reposWatcher":
                        this.itemClass = 'UserItem'
                        break
                }
            },
            commonGetData(type) {
                switch (this.dataType) {
                    case "userRepos":
                        repository.getUserRepositoryDao(this.userName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "userStar":
                        repository.getStarRepositoryDao(this.userName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "userFollower":
                        user.getFollowerListDao(this.userName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "userFollowed":
                        user.getFollowedListDao(this.userName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "reposStarer":
                        repository.getRepositoryStarDao(this.userName, this.reposName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "reposForker":
                        repository.getRepositoryForksDao(this.userName, this.reposName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                    case "reposWatcher":
                        repository.getRepositoryWatcherDao(this.userName, this.reposName, this.currentPage)
                            .then((res) => {
                                this.resolveResult(res, type)
                            })
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>