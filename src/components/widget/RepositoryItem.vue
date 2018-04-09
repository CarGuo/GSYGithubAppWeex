<template>
    <div class="card-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1;">
                <text class="repo-text">{{itemValue.ex.repoName}}</text>
                <text class="user-text" :style="{flex: 1,fontFamily: 'wxcIconFont', fontSize: '18px', }">{{'\ue63e ' + itemValue.ex.userName}}</text>
            </div>
            <text class="type-text">{{itemValue.ex.type}}</text>
        </div>
        <text class="content-text" style="flex: 1; margin-bottom: 23px;">{{itemValue.ex.content}}</text>
        <div style="flex-direction: row;width: 690px;overflow: hidden">
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon1 + itemValue.ex.icon1t}}</text>
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon2 + itemValue.ex.icon2t}}</text>
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon3 + itemValue.ex.icon3t}}</text>
        </div>
    </div>
</template>

<script>
    import {addIconFontSupport} from '../../config/IconConfig'
    export default {
        name: "repository-item",
        props: {
            defaultIcon1: {type: String, default: '\ue643 '},
            defaultIcon2: {type: String, default: '\ue67e '},
            defaultIcon3: {type: String, default: '\ue661 '},
            itemValue: {
                type: Object, default: () => {
                    return {ex:{}}
                }
            },
            itemIndex: {type: Number, default: -1},
            onItemClick:{type:Function}
        },

        computed: {
            icon1() {
                return (this.itemValue.ex.icon1) ? this.itemValue.ex.icon1 : this.defaultIcon1
            },
            icon2() {
                return (this.itemValue.ex.icon2) ? this.itemValue.ex.icon2 : this.defaultIcon2
            },
            icon3() {
                return (this.itemValue.ex.icon3) ? this.itemValue.ex.icon3 : this.defaultIcon3
            },
        },
        components: {},
        methods: {
            onCardClick() {
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
            const dom = weex.requireModule('dom');
            addIconFontSupport(dom, "../../")
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
        align-items: center;
        margin-bottom: 15px;
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
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        lines: 3;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }

    .repo-text {
        color: rgba(13, 13, 13, 0.6);
        margin-bottom: 5px;
        font-size: 32px;
        font-weight: bold;
    }

    .icon-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 26px;
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

</style>