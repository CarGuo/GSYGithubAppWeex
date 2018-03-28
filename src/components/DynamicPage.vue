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
            if (this.$refs.dylist) {
                this.$refs.dylist.showRefresh();
            }
            this.loadData(0)
        },
        computed: {
            dataList() {
                return this.$store.state.event.received_events_data_list;
            },
        },
        methods: {
            loadData(type) {
                this.$store.dispatch('getEventReceived', {
                    page: this.currentPage, callback: (res) => {
                        if (Constant.DEBUG) {
                            console.info("dy loadData ", res)
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
                    userInfo: this.getUserInfo()
                })
            },
            onLoadMore() {
                this.currentPage++;
                this.loadData(2)
            },
            onRefresh() {
                this.loadData(1)
            },
            itemClick(index) {
                console.log("click index ", index);
                this.jump("/repository/detail")
                //modal.toast({message: "click index " + index})
            },
        }
    }
</script>

<style scoped>
</style>