<template>
    <div class="wrapper">
        <div class="input-container">
            <text style="color: #3c3f41;font-weight: bold; font-size: 35px">{{title}}</text>
            <div style="margin-top: 50px">
                <input v-show="needTitle" class="input-title" @input="onTitleChange" ref="editTitle" placeholder="请输入标题" :value="editTitle"/>
                <input class="input" @input="onValueChange" ref="editValue" placeholder="请输入回复" :value="editValue"/>
            </div>
            <div style="flex: 1;flex-direction: row;margin-top: 20px; width:600px;">
                <text class="btn-text" @click="function(){toBack()}">取消</text>
                <text class="btn-text" @click="confirmClick" :style="{color: '#3c3f41'}">确定</text>
            </div>
        </div>
        <loading-component height="1334"
                           width="750"
                           border-radius="0"
                           duration="100"
                           :has-overlay="true"
                           :show-close="false"
                           :show="isLoading"
                           :has-animation="true">
        </loading-component>
    </div>
</template>
<script>
    import {WxcLoading} from 'weex-ui'
    import user from '../core/net/user'
    import * as Constant from '../core/common/constant'
    import {isEmptyString} from '../core/common/commonUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'
    import {addIconFontSupport} from '../config/IconConfig'
    const modal = weex.requireModule('modal')
    const dom = weex.requireModule('dom');

    export default {
        components: {WxcLoading},
        data() {
            return {
                isLoading: false,
                loadingText: "处理中···",
                editValue: "",
                editTitle: "",
                needTitle: false,
                title: "回复",
                type: 1,
            }
        },
        created: function () {
            addIconFontSupport(dom, "../../")
            if(this.getQuery().needTitle) {
                this.needTitle = this.getQuery().needTitle
            }
            if(this.getQuery().editValue) {
                this.editValue = this.getQuery().editValue
            }
            if(this.getQuery().editTitle) {
                this.editTitle = this.getQuery().editTitle
            }
            if(this.getQuery().title) {
                this.title = this.getQuery().title
            }
            if(this.getQuery().type) {
                this.type = this.getQuery().type
            }
        },
        methods: {
            onTitleChange(event) {
                this.editTitle = event.value;
            },
            onValueChange(event) {
                this.editValue = event.value;
            },
            confirmClick() {
                let editValue = this.editValue;
                let editTitle = this.editTitle;
                if (this.needTitle && isEmptyString(editTitle)) {
                    modal.toast({
                        message: "标题内容不能为空"
                    });
                    return
                }
                if (isEmptyString(editValue)) {
                    modal.toast({
                        message: "回复内容不能为空"
                    });
                    return
                }
                this.isLoading = true;
            }
        }
    }
</script>
<style scoped>
    .wrapper {
        align-items: center;
        justify-content: center;
        width: 750px;
        height: 1334px;
        background-color: #3c3f41;
    }

    .input-container {
        align-items: center;
        justify-content: center;
        width: 600px;
        background-color: white;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0 0 10px rgba(211, 210, 210, 0.50);
    }

    .input-title {
        font-size: 30px;
        width: 560px;
        padding: 20px;
        margin-bottom: 20px;
        color: #666666;
        border-bottom-width: 2px;
        border-style: solid;
        border-color: #969896;
    }

    .input {
        font-size: 30px;
        width: 560px;
        height: 560px;
        text-align: start;
        align-items:flex-start;
        justify-content: flex-start;
        border-radius: 12px;
        padding: 20px;
        color: #666666;
        border-width: 2px;
        border-style: solid;
        border-color: #969896;
    }

    .btn-text {
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #969896;
        font-size: 35px;
        font-weight: bold;
        flex:1
    }
</style>