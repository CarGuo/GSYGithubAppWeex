<template>
    <div class="title">
        <wxc-minibar background-color="#3c3f41">
            <text slot="left" :style="{fontFamily: 'wxcIconFont',fontSize: '30px', color:'#FFFFFF'}"
                  @click="onLeftButtonClick">{{leftIcon}}</text>
            <text slot="middle" :style="{fontFamily: 'wxcIconFont', fontSize: '40px', color:'#FFFFFF'}">{{title}}</text>
            <text slot="right" :style="{fontFamily: 'wxcIconFont', fontSize: '30px', color:'#FFFFFF'}"
                  @click="onRightButtonClick">{{'    ' + rightIcon}}</text>
        </wxc-minibar>
    </div>
</template>

<script>

    import {WxcMinibar} from 'weex-ui';
    const Navigator = weex.requireModule('navigator');
    const dom = weex.requireModule('dom');
    export default {
        components: {WxcMinibar},
        props: {
            onLeftButtonClick: {type: Function, default:()=>{
                    Navigator.pop({}, e => {
                    });
                }},
            onRightButtonClick: {type: Function, default:()=>{

                }},
            title: {type: String, default: ""},
            rightIcon: {type: String, default: ""},
            leftIcon: {type: String, default: "\ue78a"},
        },
        created() {

            dom.addRule('fontFace', {
                'fontFamily': "wxcIconFont",
                'src': `url('../../static/font/iconfont.ttf')`
            });
        },
    }
</script>

<style scoped>
    .title {
        width: 750px;
        align-items: center;
    }
</style>