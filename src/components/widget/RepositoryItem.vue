<template>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image :src="itemValue.ex.userPic" class="user-icon"></image>
            <div style="flex: 1; margin-left: 20px">
                <text class="repo-text">{{itemValue.ex.repoName}}</text>
                <text class="user-text" :style="{flex: 1,fontFamily: 'wxcIconFont', fontSize: '10px', }">
                    {{'\ue63e ' + itemValue.ex.userName}}</text>
            </div>
            <text class="type-text">{{itemValue.ex.type}}</text>
        </div>
        <text class="content-text" style="flex: 1; margin-bottom: 20px;">{{itemValue.ex.content}}</text>
        <div style="flex-direction: row;width: 750px">
            <text class="icon-text">{{'\ue643 ' + itemValue.ex.icon1t}}</text>
            <text class="icon-text">{{'\ue67e ' + itemValue.ex.icon2t}}</text>
            <text class="icon-text">{{'\ue661 ' + itemValue.ex.icon3t}}</text>
        </div>
    </div>
</template>

<script>
    const dom = weex.requireModule('dom');
    export default {
        name: "repository-item",
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
            onCardClick() {
                this.onItemClick && this.onItemClick(this.itemIndex);
            }
        },
        created() {
            dom.addRule('fontFace', {
                'fontFamily': "wxcIconFont",
                'src': `url('../../static/font/iconfont.ttf')`
            });
        },
    }
</script>

<style scoped>
    .user-icon {
        width: 70px;
        height: 70px;
        align-items: center;
        justify-content: center;
        border-radius: 35px;
    }

    .card-wrapper {
        width: 700px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .card-user-wrapper {
        align-items: center;
        margin-bottom: 20px;
    }

    .type-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
        margin-top: -50px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .user-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .content-text {
        color: rgba(13, 13, 13, 0.6);
        font-size: 28px;
        font-weight: bold;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .repo-text {
        color: rgba(13, 13, 13, 0.6);
        font-size: 30px;
        font-weight: bold;
    }

    .icon-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 30px;
        flex: 1;
        -webkit-line-clamp: 1;
        font-family: 'wxcIconFont';
    }

</style>