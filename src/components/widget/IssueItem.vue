<template>
    <div class="card-white-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1;">
                <text class="name-text-theme" >{{itemValue.ex.userName}}</text>
                <text class="content-text-gray content-text">{{itemValue.ex.content}}</text>
            </div>
            <text class="content-text-gray time-text">{{itemValue.ex.time | resolveTime}}</text>
        </div>
        <div style="flex-direction: row;width: 650px;overflow: hidden;align-items: center;">
            <text class="content-text-gray state-text" :style="itemValue.ex.state === 'open' ? {fontFamily: 'wxcIconFont',  'color':'green'}  :  {fontFamily: 'wxcIconFont', 'color':'red'}">{{'\ue661'}}</text>
            <text class="content-text-gray number-text">{{' #' + itemValue.ex.number}}</text>
            <text class="content-text-gray comment-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue6ba '  + itemValue.ex.count}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            itemValue: {
                type: Object, default: () => {
                    return {ex:{}}
                }
            },
            itemIndex: {type: Number, default: -1},
            onItemClick:{type:Function}
        },
        components: {},
        methods: {
            onCardClick(itemIndex) {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
            imageClick() {
                if(!this.itemValue.ex.userName) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.ex.userName})
            }
        },
        created() {
        },
    }
</script>

<style lang="sass" > @import '../../config/styles.scss'</style>
<style scoped>
    .user-icon {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 20px;
    }

    .card-user-wrapper {
        margin-bottom: 15px;
    }


    .content-text {
        margin-top: 15px;
    }

    .time-text {
        font-size: 25px;
        margin-top: 5px;
    }

    .state-text {
        margin-left: 90px;
    }

    .comment-text {
        text-align: end;
        font-size: 24px;
    }

    .number-text {
        font-size: 24px;
        flex:1;
    }


</style>