<template>
    <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
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
            this.$store.dispatch('getEventReceived', {
                page: this.currentPage, callback: (res) => {
                    if (Constant.DEBUG) {
                        console.info("getEventReceived", res)
                    }
                },
                userInfo: this.getUserInfo()
            })
        },
        computed: {
            dataList() {
                return this.$store.state.event.received_events_data_list;
            },
        },
        methods: {
            onLoadMore() {
                this.currentPage++;
                this.$store.dispatch('getEventReceived', {
                    page: this.currentPage, callback: (res) => {
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
                    },
                    userInfo: this.getUserInfo()
                })
            },
            onRefresh() {
                setTimeout(() => {
                    this.currentPage = 1;
                    this.$store.dispatch('getEventReceived', {
                        page: this.currentPage, callback: (res) => {
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
                        },
                        userInfo: this.getUserInfo()
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