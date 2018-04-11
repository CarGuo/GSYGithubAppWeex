<template>
    <div class="card-black-full-wrapper">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon" @click="imgClick"></image>
            <div style="flex: 1;">
                <text class="user-text">{{itemValue.ex.user}}</text>
                <text class="name-text">{{itemValue.ex.name}}</text>
                <text class="org-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue63e ' + (itemValue.ex.org ? itemValue.ex.org : ' ')}}</text>
                <text class="location-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue7e6 ' + (itemValue.ex.location ? itemValue.ex.location : ' ')}}</text>
            </div>
        </div>
        <text class="link-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue670 ' + (itemValue.ex.link ? itemValue.ex.link : ' ')}}</text>
        <text class="des-text">{{itemValue.ex.des}}</text>
        <div class="bottom-container">
            <div class="bottom-item bottom-item-line" @click="reposClick">
                <text class="bottom-item-text">{{"仓库"}}</text>
                <text class="bottom-item-value">{{itemValue.ex.repos ? itemValue.ex.repos : '---'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="followerClick">
                <text class="bottom-item-text">{{"粉丝"}}</text>
                <text class="bottom-item-value">{{itemValue.ex.follower ? itemValue.ex.follower: '---'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="followedClick">
                <text class="bottom-item-text">{{"关注"}}</text>
                <text class="bottom-item-value">{{itemValue.ex.followed ? itemValue.ex.followed: '---'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="staredClick">
                <text class="bottom-item-text">{{"星标"}}</text>
                <text class="bottom-item-value">{{itemValue.ex.star ? itemValue.ex.star: '---'}}</text>
            </div>
            <div class="bottom-item">
                <text class="bottom-item-text" @click="honorClick">{{"荣耀"}}</text>
                <text class="bottom-item-value">{{itemValue.ex.stared ? itemValue.ex.stared: '---'}}</text>
            </div>
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
            onItemClick:{type:Function}
        },
        components: {},
        methods: {
            reposClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.ex.user,
                    reposName: this.itemValue.ex.name,
                    title: this.itemValue.ex.user + '的仓库',
                    dataType: 'userRepos',
                })
            },
            followerClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.ex.user,
                    reposName: this.itemValue.ex.name,
                    title: this.itemValue.ex.user + '的粉丝',
                    dataType: 'userFollower',
                })
            },

            followedClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.ex.user,
                    reposName: this.itemValue.ex.name,
                    title: this.itemValue.ex.user + '的关注',
                    dataType: 'userFollowed',
                })
            },
            staredClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.ex.user,
                    reposName: this.itemValue.ex.name,
                    title: this.itemValue.ex.user + '的Star',
                    dataType: 'userStar',
                })
            },
            honorClick() {

            },
            imgClick() {
                this.onItemClick && this.onItemClick(11)
            }
        },
        created() {
        },
    }
</script>

<style lang="sass" > @import '../../config/styles.scss'</style>
<style scoped>
    .user-icon {
        width: 140px;
        height: 140px;
        align-items: center;
        justify-content: center;
        border-radius: 70px;
        margin-right: 20px;
    }

    .bottom-container {
        flex-direction: row;
        width: 720px;
        margin-top: 20px;
        border-top-width: 1px;
        border-color: rgba(255, 255, 255, 0.7);
        padding-top: 10px;
    }

    .bottom-item {
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .bottom-item-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 28px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .bottom-item-value {
        color: rgba(255, 255, 255, 0.7);
        font-size: 28px;
        margin-top: 10px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .bottom-item-line {
        border-color: rgba(255, 255, 255, 0.7);
        border-right-width: 1px;
    }
    .des-text {
        color: rgba(255, 255, 255, 0.7);
        font-size: 28px;
        flex: 1;
        margin-top: 20px;
    }

    .link-text {
        font-size: 23px;
        color: rgba(0, 111, 255, 0.6);
        flex: 1;
        margin-top: 20px;
    }

    .location-text {
        font-size: 23px;
        margin-top: 5px;
        color: rgba(255, 255, 255, 0.9);
    }

    .org-text {
        font-size: 23px;
        margin-top: 5px;
        color: rgba(255, 255, 255, 0.9);
    }

    .name-text {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.6);
    }

    .user-text {
        font-weight: bold;
        font-size: 40px;
        color: rgba(255, 255, 255, 1);
    }

    .card-user-wrapper {
        align-items: center;
        margin-bottom: 15px;
    }
</style>