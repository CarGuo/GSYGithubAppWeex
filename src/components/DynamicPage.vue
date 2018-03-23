<template>
    <list @loadmore="fetch" loadmoreoffset="10" scroll>
        <cell v-for="(num, i) in lists" :key="i">
            <div class="panel">
                <text class="text">{{num}}</text>
            </div>
        </cell>
    </list>
</template>

<script>
    const modal = weex.requireModule('modal')
    const LOADMORE_COUNT = 4

    export default {
        data () {
            return {
                lists: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            fetch (event) {
                modal.toast({ message: 'loadmore', duration: 1 })

                setTimeout(() => {
                    const length = this.lists.length
                    for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                        this.lists.push(i + 1)
                    }
                }, 800)
            }
        }
    }
</script>

<style scoped>
    .panel {
        width: 600px;
        height: 250px;
        margin-left: 75px;
        margin-top: 35px;
        margin-bottom: 35px;
        flex-direction: column;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(162, 217, 192);
        background-color: rgba(162, 217, 192, 0.2);
    }
    .text {
        font-size: 100px;
        text-align: center;
        color: #41B883;
    }
</style>
