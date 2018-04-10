<template>
    <div class="card-white-wrapper user-container" @click="onCardClick">
        <image v-if="itemValue.ex.userPic" :src="itemValue.ex.userPic" class="user-icon"></image>
        <text class="user-text">{{itemValue.ex.user}}</text>
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
        },
        created() {
        },
    }
</script>

<style lang="scss" >
    @import '../../config/styles.scss';
    .user-text {
        font-weight: bold;
        font-size: 30px;
        flex: 1;
        color: $--theme-color;
    }
</style>
<style scoped>
    .user-container {
        flex-direction: row;
    }
    .user-icon {
        width: 80px;
        height: 80px;
        align-items: center;
        justify-content: center;
        border-radius: 70px;
        margin-right: 20px;
    }
</style>