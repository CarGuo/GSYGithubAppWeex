<template>
    <list class="list" @loadmore="loadMore" @onloadmore="loadMore" loadmoreoffset="30">
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
                setTimeout(() => {
                    this.currentPage++;
                    this.$store.dispatch('getEventReceived', {
                        page: this.currentPage, callback: (res) => {
                            console.info("getEventReceived", res)
                        },
                        userInfo: this.getUserInfo()
                    })
                }, 300)
            },
            itemClick(event) {
                console.log("click index ", event.index);
                modal.toast({message: "click index " + event.index})
            }
        }
    }
</script>

<style scoped>
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