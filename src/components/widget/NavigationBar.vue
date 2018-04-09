<template>
    <div class="title">
        <wxc-minibar background-color="#3c3f41">
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
    import {addIconFontSupport} from '../../config/IconConfig'
    const dom = weex.requireModule('dom');
    export default {
        components: {WxcMinibar},
        props: {
            onLeftButtonClick: {type: Function, default:function(){
                    //Navigator.pop();

                    //this.$router.back()
                }},
            onRightButtonClick: {type: Function, default:()=>{

                }},
            title: {type: String, default: ""},
            rightIcon: {type: String, default: ""},
            leftIcon: {type: String, default: "\ue78a"},
        },
        created() {
            addIconFontSupport(dom, "../../")
        },
    }
</script>

<style scoped>
    .title {
        width: 750px;
        height:100px;
        align-items: center;
        background-color:#3c3f41;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.80);
        border-bottom-color: #f2f3f4;
        border-bottom-width: 0.5px;
    }
</style>