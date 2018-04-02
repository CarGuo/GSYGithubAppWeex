<template>
    <div style="height:1334px;width: 750px;background-color: white">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" listItemName="IssueItem" :listData="list"
                  headerComponent="IssueHeadItem" :headerData="issueInfo"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import repository from '../core/net/repository'

    export default {
        props: {
        },
        components: {RLList, NavigationBar},
        data() {
            return {
                userName: "",
                reposName: "",
                issueNum: "",
                title: "",
                currentPage: 1,
                list: [],
                issueInfo: {},
            }
        },
        created: function () {
            this.init()
        },
        activated: function () {
            //keep alive
            this.init();
        },
        methods: {
            init() {
                this.list = []
                this.issueInfo = {}

                if(this.getQuery().title) {
                    this.title = this.getQuery().title
                }
                if(this.getQuery().userName) {
                    this.userName = this.getQuery().userName
                }
                if(this.getQuery().reposName) {
                    this.reposName = this.getQuery().reposName
                }
                if(this.getQuery().issueNum) {
                    this.issueNum = this.getQuery().issueNum
                }
                this.loadDetail();
                this.onRefresh()
            },
            loadDetail() {
                if (this.isPreparing()) {
                    return
                }
                repository.getIssueInfoDao(this.userName, this.reposName, this.issueNum)
                    .then((res) => {
                        if (res && res.result) {
                            this.issueInfo = res.data;
                            console.log("yyyyyyyyyyyyyyy",  this.issueInfo)
                        }
                    })
            },
            loadComment(type) {
                if (this.isPreparing()) {
                    return
                }
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    if(type === 1) {
                        this.list = res.data;
                    } else {
                        this.list = this.list.concat(res.data);
                    }
                }
                if (Constant.DEBUG) {
                    console.info("issue detail info loadData ", res)
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
                this.loadComment(type)
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
                console.log("click index ", index);
                modal.toast({message: "click index " + index})
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            }
        }
    }
</script>

<style scoped>
</style>