<template>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1;">
                <text class="user-text" >{{itemValue.ex.userName}}</text>
                <text class="content-text">{{itemValue.ex.content}}</text>
            </div>
            <text class="time-text">{{itemValue.ex.time | resolveTime}}</text>
        </div>
        <div style="flex-direction: row;width: 650px;overflow: hidden;align-items: center;">
            <text class="state-text" :style="itemValue.ex.state === 'open' ? {fontFamily: 'wxcIconFont',  'color':'green'}  :  {fontFamily: 'wxcIconFont', 'color':'red'}">{{'\ue661 '}}</text>
            <text class="number-text">{{'  #' + itemValue.ex.number}}</text>
            <text class="comment-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue6ba '  + itemValue.ex.count}}</text>
        </div>
    </div>
</template>

<script>
    const dom = weex.requireModule('dom');
    import {addIconFontSupport} from '../../config/IconConfig'
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
            addIconFontSupport(dom, "../../")
        },
    }
</script>

<style scoped>
    .user-icon {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 20px;
    }

    .card-wrapper {
        width: 700px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .card-user-wrapper {
        margin-bottom: 15px;
    }

    .user-text {
        color: rgba(60, 63, 65, 1);
        font-size: 30px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        font-weight: bold;
        -webkit-box-orient: vertical;
    }

    .content-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 26px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        margin-top: 15px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .time-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 25px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 5px;
    }

    .state-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        margin-left: 90px;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .comment-text {
        text-align: end;
        color: rgba(97, 97, 97, 0.6);
        font-size: 24px;
        flex: 1;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


    .number-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 24px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        margin-left: 10px;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


</style>