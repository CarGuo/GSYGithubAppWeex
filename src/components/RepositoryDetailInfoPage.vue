<template>
    <div :style="{flex:1}">
        <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
                  headerComponent="RepositoryHeadItem" :headerData="reposInfo"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="()=>{}"></r-l-list>
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
                if (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1) {
                    return
                }
                repository.getRepositoryDetailDao(this.userName, this.reposName)
                    .then((res) => {
                        if (res && res.result) {
                            this.reposInfo = res.data;
                        }
                    })
            },
            loadData(type) {
                repository.getRepositoryDetailDao(this.userName, this.reposName)
                    .then(() => {

                    })
            },
            onLoadMore() {
                this.currentPage++;
                this.loadData(2)
            },
            onRefresh() {
                this.currentPage = 1;
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