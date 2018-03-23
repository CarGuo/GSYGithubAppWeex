<template>
    <list class="list" @loadmore="fetch" @onloadmore="fetch" loadmoreoffset="10">
        <cell class="cell" v-for="(rowData, index) in dataList">
            <div class="panel">
                <event-item
                        actionTime="10分钟后"
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
    const LOADMORE_COUNT = 4

    import EventItem from './widget/EventItem'

    export default {
        components: {EventItem},
        data() {
            return {}
        },
        created: function () {
            this.$store.dispatch('getEventReceived', {
                page: 0, callback: (res) => {
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
            fetch(event) {
                modal.toast({message: 'loadmore', duration: 1})
                setTimeout(() => {
                    const length = this.lists.length
                    for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                        this.lists.push(i + 1)
                    }
                }, 800)
            },
            itemClick(event) {
                console.log("click index ", event.index);
                modal.toast({message:"click index " +  event.index})
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

    .text {
        font-size: 50px;
        text-align: center;
        color: #41B883;
    }

    .list {
        height: 1334px;
    }
</style>