<template>
    <div class="card-wrapper" @click="onCardClick">
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

<style scoped>
    .user-icon {
        width: 80px;
        height: 80px;
        align-items: center;
        justify-content: center;
        border-radius: 70px;
        margin-right: 20px;
    }

    .card-wrapper {
        align-items: center;
        width: 700px;
        background-color: #FFFFFF;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.90);
        flex-direction: row;
    }

    .user-text {
        font-weight: bold;
        font-size: 30px;
        flex: 1;
        color: rgb(60, 63, 65);
    }
</style>