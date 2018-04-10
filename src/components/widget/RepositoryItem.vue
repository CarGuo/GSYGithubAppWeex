<template>
    <div class="card-white-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon" @click="imageClick"></image>
            <div style="flex: 1;">
                <text class="name-text-theme">{{itemValue.ex.repoName}}</text>
                <text class="content-text-gray" :style="{flex: 1,fontFamily: 'wxcIconFont', fontSize: '18px', }">{{'\ue63e ' + itemValue.ex.userName}}</text>
            </div>
            <text class="content-text-gray type-text">{{itemValue.ex.type}}</text>
        </div>
        <text class="text-line-three content-text-gray" style="flex: 1; margin-bottom: 23px;">{{itemValue.ex.content}}</text>
        <div style="flex-direction: row;width: 690px;overflow: hidden">
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon1 + itemValue.ex.icon1t}}</text>
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon2 + itemValue.ex.icon2t}}</text>
            <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{icon3 + itemValue.ex.icon3t}}</text>
        </div>
    </div>
</template>

<script>
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
        },
    }
</script>

<style lang="sass" > @import '../../config/styles.scss'</style>
<style scoped>
    @import '../../config/styles.scss';
    .user-icon {
        width: 70px;
        height: 70px;
        align-items: center;
        justify-content: center;
        border-radius: 35px;
        margin-right: 20px;
    }


    .card-user-wrapper {
        align-items: center;
        margin-bottom: 15px;
    }

    .type-text {
        margin-top: -50px;
    }

    .icon-text {
        color: rgba(97, 97, 97, 0.6);
        font-size: 26px;
        flex: 1;
    }

</style>