<template>
    <r-l-list ref="dylist" listItemName="EventItem" :listData="dataList"
              :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
</template>

<script>
    const modal = weex.requireModule('modal')

    import {ActionUtils} from '../core/common/eventUtils'
    import RLList from './widget/RLList.vue'


    export default {
        components: {RLList},
        data() {
            return {
                currentPage: 1,
            }
        },
        created: function () {
            this.onRefresh();
        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.onRefresh();
            }
        },
        computed: {
            dataList() {
                return this.$store.state.event.received_events_data_list;
            },
        },
        methods: {
            loadData(type) {
                let userInfo = this.getUserInfo();
                if(!userInfo || !userInfo.login) {
                    return
                }
                this.$store.dispatch('getEventReceived', {
                    page: this.currentPage, callback: (res) => {

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
                    },
                    userInfo: userInfo
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
                let data = this.dataList[index];
                ActionUtils(data, this)
            },
        }
    }
</script>

<style scoped>
</style>