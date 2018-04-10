<template>
    <div class="title">
        <wxc-minibar background-color="rgba(97, 97, 97, 0.0)">
            <text slot="left" :style="{fontFamily: 'wxcIconFont',fontSize: '30px', color:'#FFFFFF'}"
                  @click="onLeftButtonClick">{{leftIcon}}</text>
            <text slot="middle" :style="{fontSize: '36px', color:'#FFFFFF'}">{{title}}</text>
            <text slot="right" :style="{fontFamily: 'wxcIconFont', fontSize: '30px', color:'#FFFFFF'}"
                  @click="onRightButtonClick">{{'    ' + rightIcon}}</text>
        </wxc-minibar>
    </div>
</template>

<script>
    import {WxcMinibar} from 'weex-ui';
    export default {
        components: {WxcMinibar},
        props: {
            onLeftButtonClick: {type: Function, default:function(){
                }},
            onRightButtonClick: {type: Function, default:()=>{

                }},
            title: {type: String, default: ""},
            rightIcon: {type: String, default: ""},
            leftIcon: {type: String, default: "\ue78a"},
        },
        created() {
        },
    }
</script>

<style lang="scss" >
    @import '../../config/styles.scss';
    .title {
        width: 750px;
        height:100px;
        align-items: center;
        background-color:$--theme-color;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.80);
        border-bottom: 0.5px #f2f3f4;
    }
</style>
<style scoped>
</style>