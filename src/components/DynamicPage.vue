<template>
    <list class="list" @loadmore="loadMore" @onloadmore="loadMore" loadmoreoffset="30">
        <refresh class="refresh" @refresh="onRefresh"
                 :display="refreshing ? 'show' : 'hide'">
            <text class="indicator-text">Refreshing ...</text>
            <loading-indicator class="indicator"></loading-indicator>
        </refresh>
        <cell class="cell" v-for="(rowData, index) in dataList">
            <div class="panel">
                <event-item
                        :actionTime="rowData.created_at | resolveTime"
                        :actionUser="rowData.actor.display_login"
                        :actionUserPic="rowData.actor.avatar_url"
                        :actionTarget="rowData.actionStr"
                        :des="rowData.des"
                        @onItemClick="itemClick"
                        :itemIndex="index"></event-item>
            </div>
        </cell>
        <cell class="loading" :display="loadinging ? 'show' : 'hide'">
            <text class="indicator-text">Loading ...</text>
            <loading-indicator class="indicator-loadmore"></loading-indicator>
        </cell>
    </list>
</template>

<script>
    const modal = weex.requireModule('modal')

    import EventItem from './widget/EventItem'

    export default {
        components: {EventItem},
        data() {
            return {
                currentPage: 1,
                refreshing: false,
                loadinging: false,
            }
        },
        created: function () {
            this.$store.dispatch('getEventReceived', {
                page: this.currentPage, callback: (res) => {
                    console.info("getEventReceived", res)
                },
                userInfo: this.getUserInfo()
            })
        },
        computed: {
            dataList() {
                return this.$store.state.event.received_events_data_list;
            }
        },
        methods: {
            loadMore() {
                if (this.refreshing || this.loadinging) {
                    return
                }
                this.loadinging = true;
                setTimeout(() => {
                    this.currentPage++;
                    this.$store.dispatch('getEventReceived', {
                        page: this.currentPage, callback: (res) => {
                            console.info("getEventReceived", res)
                            this.loadinging = false;
                        },
                        userInfo: this.getUserInfo()
                    })
                }, 300)
            },
            itemClick(event) {
                console.log("click index ", event.index);
                modal.toast({message: "click index " + event.index})
            },
            onRefresh() {
                if (this.refreshing || this.loadinging) {
                    return
                }
                this.refreshing = true;
                setTimeout(() => {
                    this.currentPage = 1;
                    this.$store.dispatch('getEventReceived', {
                        page: this.currentPage, callback: (res) => {
                            console.info("getEventReceived", res)
                            this.refreshing = false
                        },
                        userInfo: this.getUserInfo()
                    })
                }, 300)
            },
        }
    }
</script>

<style scoped>
    .loading {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .refresh {
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .indicator-text {
        color: #888888;
        font-size: 42px;
        text-align: center;
    }

    .indicator {
        margin-top: 16px;
        height: 40px;
        width: 40px;
        color: blue;
    }


    .indicator-loadmore {
        margin-top: 16px;
        height: 40px;
        width: 40px;
        color: blue;
    }

    .panel {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }

    .list {
        height: 1334px;
    }
</style>