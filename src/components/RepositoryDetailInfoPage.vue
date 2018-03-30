<template>
    <div :style="{flex:1}">
        <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
                  headerComponent="RepositoryHeadItem" :headerData="reposInfo"
                  :headerClick="headerClick"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList'
    import event from '../core/net/event'
    import repository from '../core/net/repository'

    export default {
        props: {
            userName: {type: String, default: ""},
            reposName: {type: String, default: ""},
        },
        components: {RLList},
        data() {
            return {
                currentPage: 1,
                listType: 1,
                eventList: [],
                reposInfo: {},
            }
        },
        created: function () {
            if (this.$refs.dylist) {
                this.$refs.dylist.showRefresh();
            }
            this.loadDetail();
            this.loadData(0)
        },
        computed: {
            dataList() {
                return this.eventList;
            },
        },
        methods: {
            loadDetail() {
                if (this.isPreparing()) {
                    return
                }
                repository.getRepositoryDetailDao(this.userName, this.reposName)
                    .then((res) => {
                        if (res && res.result) {
                            this.reposInfo = res.data;
                        }
                    })
            },
            loadCommit(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.getReposCommitsDao(this.userName, this.reposName, this.currentPage)
                    .then((res)=>{
                        this.resolveResult(res, type)
                    })
            },
            loadEvent(type) {
                if (this.isPreparing()) {
                    return
                }
                event.getRepositoryEventDao(this.currentPage,this.userName, this.reposName)
                    .then((res)=>{
                        this.resolveResult(res, type)
                    })
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    this.eventList = this.eventList.concat(res.data);
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
            },
            loadData(type) {
                if (this.listType === 1) {
                    this.loadEvent(type)
                } else {
                    this.loadCommit(type)
                }
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
            headerClick(type, index) {
                this.listType = index;
                this.onRefresh();
                console.log("header click index ", index);
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            }
        }
    }
</script>

<style scoped>
</style>