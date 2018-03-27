<template>
    <r-l-list ref="dylist" listItemName="RepositoryItem" :listData="dataList"
              :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList'


    export default {
        components: {RLList},
        data() {
            return {
                currentPage: 1,
            }
        },
        created: function () {
            this.$store.dispatch('getTrend', {
                page: this.currentPage,
                callback: (res) => {
                    if (Constant.DEBUG) {
                        console.info("onRefresh ", res)
                    }
                    if (this.$refs.dylist) {
                        this.$refs.dylist.setNotNeedLoadMore();
                    }
                },
            })
        },
        computed: {
            dataList() {
                return this.$store.state.repository.trend_repos_data_list;
            },
        },
        methods: {
            onLoadMore() {
                if (this.$refs.dylist) {
                    this.$refs.dylist.setNotNeedLoadMore();
                }
            },
            onRefresh() {
                setTimeout(() => {
                    this.currentPage = 1;
                    this.$store.dispatch('getTrend', {
                        page: this.currentPage,
                        callback: (res) => {
                            if (Constant.DEBUG) {
                                console.info("onRefresh ", res)
                            }
                            if (this.$refs.dylist) {
                                this.$refs.dylist.stopRefresh();
                                this.$refs.dylist.setNotNeedLoadMore();
                            }
                        },
                    })
                }, 300)
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