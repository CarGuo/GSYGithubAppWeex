<template recyclable>
    <div class="card-white-wrapper" @click="onCardClick">
        <div class="card-user-wrapper" style="flex-direction: row">
            <image v-if="itemValue.ex.avatar_url" :src="itemValue.ex.avatar_url" class="user-icon" @click="imageClick"></image>
            <text class="name-text" style="flex: 1;">{{itemValue.ex.display_login}}</text>
            <text class="content-text-gray">{{itemValue.ex.created_at | resolveTime}}</text>
        </div>
        <text class="content-text-black-bold" style="flex: 1; margin-bottom: 20px;">{{itemValue.ex.actionStr}}</text>
        <text class="text-line-three content-text-gray">{{itemValue.ex.des}}</text>
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
            onCardClick() {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
            imageClick() {
                if(!this.itemValue.ex.display_login) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.ex.display_login})
            }
        },
        data() {
            return {}
        },
    }
</script>
<style lang="sass" > @import '../../config/styles.scss'</style>
<style scoped >
    @import '../../config/styles.scss';
    .user-icon {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
    }

    .card-user-wrapper {
        align-items: center;
        margin-bottom: 20px;
    }
</style>