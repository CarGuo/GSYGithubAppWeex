<template>
    <div class="card-white-wrapper card-wrapper-file"  @click="onCardClick">
        <text class="icon-text" :style="{color: '#3c3f41', fontFamily: 'wxcIconFont'}">{{itemValue.type !== 'file' ? '\ue793' : '\uea77'}}</text>
        <text class="content-text-gray text-line-one content-text-file" >{{itemValue.name}}</text>
        <text v-if="itemValue.type !== 'file'" class="arrow-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue610'}}</text>
    </div>
</template>
<script>
    import {addIconFontSupport} from '../../config/IconConfig'
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
            //addIconFontSupport(dom, "../../")
        },
    }
</script>
<style src='../../config/style.css' ></style>
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

    .icon-text{
        color: var(--gray-color);
        font-size: 30px;
    }

    .arrow-text{
        color: var(--theme-color);
        font-size: 30px;
    }

</style>