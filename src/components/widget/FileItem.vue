<template>
    <div class="card-wrapper" :style="itemValue.type !== 'file' ? {} : fileStyle"  @click="onCardClick">
        <text class="icon-text" :style="{color: '#3c3f41', fontFamily: 'wxcIconFont'}">{{itemValue.type !== 'file' ? '\ue793' : '\uea77'}}</text>
        <text class="content-text" >{{itemValue.name}}</text>
        <text v-if="itemValue.type !== 'file'" class="arrow-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue610'}}</text>
    </div>
</template>
<script>
    const dom = weex.requireModule('dom');
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
                fileStyle:{
                    height: '80px',
                    width: '720px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
                }
            }
        },
        methods: {
            onCardClick() {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
        },
        created() {
            addIconFontSupport(dom, "../../")
        },
    }
</script>
<style scoped>
    .card-wrapper {
        align-items: center;
        flex-direction: row;
        height: 80px;
        width: 720px;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }
    .icon-text{
        color: rgba(97, 97, 97, 1);
        font-size: 30px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .arrow-text{
        color: rgb(43, 43, 43);
        font-size: 30px;
        font-family: 'wxcIconFont';
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .content-text {
        color: rgba(97, 97, 97, 1);
        font-size: 28px;
        display: -webkit-box;
        overflow: hidden;
        flex:1;
        margin-left: 30px;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>