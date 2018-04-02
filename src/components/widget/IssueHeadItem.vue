<template>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.user" :src="itemValue.user.avatar_url" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1;">
                <div style="flex: 1;flex-direction: row">
                    <text class="user-text" >{{itemValue.user ? itemValue.user.login : ''}}</text>
                    <text class="time-text">{{itemValue.created_at | resolveTime}}</text>
                </div>
                <div style="flex-direction: row;margin-top: 10px">
                    <text class="state-text" :style="itemValue.state === 'open' ? {fontFamily: 'wxcIconFont',  'color':'green'}  :  {fontFamily: 'wxcIconFont', 'color':'red'}">{{'\ue661'}}</text>
                    <text class="number-text">{{' # ' + itemValue.number}}</text>
                    <text class="comment-text" :style="{fontFamily: 'wxcIconFont'}">{{' \ue6ba '  + itemValue.comments}}</text>
                </div>
                <text class="title-text">{{itemValue.title}}</text>
            </div>
        </div>
        <div style="width: 700px;">{{itemValue.body_html ? itemValue.body_html : ""}}</div>
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
        background-color: #3c3f41;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .card-user-wrapper {
        margin-bottom: 15px;
    }

    .user-text {
        color: white;
        font-size: 30px;
        display: -webkit-box;
        overflow: hidden;
        flex: 1;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        font-weight: bold;
        -webkit-box-orient: vertical;
    }

    .title-text {
        color: white;
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
        color: rgba(255, 255, 255, 0.6);
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
        color: rgba(255, 255, 255, 0.6);
        font-size: 28px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .comment-text {
        text-align: end;
        color: rgba(255, 255, 255, 0.6);
        font-size: 24px;
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
        color: rgba(255, 255, 255, 0.6);
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