<template>
    <div class="card-white-wrapper card-wrapper-file"  @click="onCardClick">
        <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{itemValue.type !== 'file' ? '\ue793' : '\uea77'}}</text>
        <text class="content-text-gray text-line-one content-text-file" >{{itemValue.name}}</text>
        <text v-if="itemValue.type !== 'file'" class="arrow-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue610'}}</text>
    </div>
</template>
<script>
    export default {
        props: {
            itemValue: {
                type: Object, default: () => {return {}},
            },
            itemIndex: {type: Number, default: -1},
            onItemClick:{type:Function}
        },
        components: {},
        data() {
            return {
            }
        },
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

    .icon-text{
        color: $--theme-color;
        font-size: 30px;
    }

    .arrow-text{
        color: $--theme-color;
        font-size: 30px;
    }
</style>
<style scoped>

    .card-wrapper-file {
        align-items: center;
        flex-direction: row;
        height: 80px;
    }

    .content-text-file{
        margin-left: 20px;
        flex: 1;
    }

</style>