<template>
    <div :style="{flex:1}">
        <r-l-list ref="dylist" listItemName="IssueItem" :listData="dataList" :bottomEmpty="'350px'"
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
                filter : null,
                currentPage: 1,
                listType: 1,
                list: [],
                dataState: 1,
            }
        },
        created: function () {
            if (this.$refs.dylist) {
                this.$refs.dylist.showRefresh();
            }
            this.loadData(0)
        },
        computed: {
            dataList() {
                return this.list;
            },
        },
        methods: {
            loadDataState(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.getRepositoryIssueDao( this.currentPage, this.userName, this.reposName, this.filter)
                    .then((res)=>{
                        this.resolveResult(res, type)
                    })
            },
            searchDataState(type) {
                if (this.isPreparing()) {
                    return
                }
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    this.list = this.list.concat(res.data);
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
                    this.loadDataState(type)
                } else {
                    this.searchDataState(type)
                }
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