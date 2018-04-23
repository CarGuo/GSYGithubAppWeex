<template>
    <div class="wrapper" :style="{height: mainHeight}">
        <div class="input-container">
            <text class="title">{{title}}</text>
            <div style="margin-top: 50px">
                <input v-if="needTitle" class="input-title" @input="onTitleChange" ref="editTitle"
                       placeholder="请输入标题" :value="editTitle"/>
                <textarea class="input" @input="onValueChange" ref="editValue" placeholder="请输入回复"
                          :value="editValue"></textarea>
            </div>
            <div style="flex: 1;flex-direction: row;margin-top: 20px; width:600px;">
                <text class="btn-text" @click="function(){toBack()}">取消</text>
                <text class="btn-text" @click="confirmClick" :style="{color: primaryColor}">确定</text>
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
    import {WxcLoading, Utils} from 'weex-ui'
    import repository from '../core/net/repository'
    import {isEmptyString} from '../core/common/commonUtils'
    import * as ignoreConfig from '../core/common/ignoreConfig'
    import LoadingComponent from './widget/LoadingComponent.vue'
    import * as Config from '../config/Config'


    const modal = weex.requireModule('modal')

    export default {
        components: {WxcLoading, LoadingComponent},
        data() {
            return {
                isLoading: false,
                loadingText: "处理中···",
                editValue: "",
                editTitle: "",
                needTitle: null,
                title: "回复",
                type: 'createIssue',
                primaryColor: Config.primaryColor,
                issueNum: "",
                commentNum: "",
                reposName: "",
                userName: "",
                mainHeight: 0,
            }
        },
        created: function () {
            if (this.getQuery().needTitle) {
                this.needTitle = this.getQuery().needTitle
            }
            if (this.getQuery().reposName) {
                this.reposName = this.getQuery().reposName
            }
            if (this.getQuery().userName) {
                this.userName = this.getQuery().userName
            }
            if (this.getQuery().editValue) {
                this.editValue = this.getQuery().editValue
            }
            if (this.getQuery().editTitle) {
                this.editTitle = this.getQuery().editTitle
            }
            if (this.getQuery().title) {
                this.title = this.getQuery().title
            }
            if (this.getQuery().type) {
                this.type = this.getQuery().type
            }
            if (this.getQuery().issueNum) {
                this.issueNum = this.getQuery().issueNum
            }
            if (this.getQuery().commentNum) {
                this.commentNum = this.getQuery().commentNum
            }
            this.mainHeight  = Utils.env.getScreenHeight();
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
                if (this.needTitle === true && isEmptyString(editTitle)) {
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
                switch (this.type) {
                    case 'createIssue':
                        this.createIssue()
                        break
                    case 'editIssue':
                        this.editIssue()
                        break
                    case 'commentIssue':
                        this.commentIssue()
                        break
                    case 'editComment':
                        this.editComment()
                        break
                }
            },
            createIssue() {
                repository.createIssueDao(this.userName, this.reposName, {title: this.editTitle, body: this.editValue})
                    .then((res) => {
                        setTimeout(() => {
                            this.isLoading = false;
                            if (res && res.result) {
                                this.toBack()
                            }
                        }, 500);
                    })
            },
            editIssue() {
                repository.editIssueDao(this.userName, this.reposName, this.issueNum,
                    {title: this.editTitle, body: this.editValue})
                    .then((res) => {
                        setTimeout(() => {
                            this.isLoading = false;
                            if (res && res.result) {
                                this.toBack()
                            }
                        }, 500);
                    })
            },
            commentIssue() {
                repository.addIssueCommentDao(this.userName, this.reposName, this.issueNum, this.editValue)
                    .then((res) => {
                        setTimeout(() => {
                            this.isLoading = false;
                            if (res && res.result) {
                                this.toBack()
                            }
                        }, 500);
                    });
            },
            editComment() {
                repository.editCommentDao(this.userName, this.reposName, this.issueNum, this.commentNum,
                    {body: this.editValue}).then((res) => {
                    setTimeout(() => {
                        this.isLoading = false;
                        if (res && res.result) {
                            this.toBack()
                        }
                    }, 500);
                })
            },
        }
    }
</script>

<style lang="scss" >
    @import '../config/styles.scss';

    .wrapper {
        align-items: center;
        justify-content: center;
        width: 750px;
        background-color: $--theme-color;
    }
    .title{
        color: $--theme-color;
        font-weight: bold;
        font-size: 35px
    }
    .input-title {
        font-size: 30px;
        width: 560px;
        padding: 20px;
        margin-bottom: 20px;
        color: $--input-color;
        border: solid #969896;
        border-bottom-width: 2px;
    }

    .input {
        font-size: 30px;
        width: 560px;
        height: 560px;
        text-align: start;
        align-items: flex-start;
        justify-content: flex-start;
        border-radius: 12px;
        padding: 20px;
        color: $--input-color;
        border: 2px solid #969896;
    }

</style>
<style scoped>

    .input-container {
        align-items: center;
        justify-content: center;
        width: 600px;
        background-color: white;
        border-radius: 10px;
        padding: 25px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.70);
    }

    .btn-text {
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #969896;
        font-size: 35px;
        font-weight: bold;
        flex: 1
    }
</style>