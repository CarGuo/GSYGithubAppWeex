<template>
    <div style="height:1334px;width: 750px;background-color: #f2f3f4">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" listItemName="IssueCommentItem" :listData="list"
                  headerComponent="IssueHeadItem" :headerData="issueInfo"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
        <div class="bottom-container">
            <div class="bottom-item bottom-item-line" @click="replyClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'回复'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="editClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'编辑'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="closeClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'关闭'}}</text>
            </div>
            <div class="bottom-item" @click="lockClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'锁定'}}</text>
            </div>
        </div>
        <wxc-mask height="400"
                  width="500"
                  border-radius="0"
                  duration="300"
                  mask-bg-color="#FFFFFF"
                  :has-overlay="true"
                  :show-close="true"
                  :show="showMark"
                  :has-animation="true"
                  @wxcMaskSetHidden="wxcMaskSetHidden">
            <div class="content">
                <text class="content-text" @click="editClick">编辑</text>
                <text class="content-text" @click="deleteClick">删除</text>
                <text class="content-text" @click="copyClick">复制</text>
            </div>
        </wxc-mask>
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
    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import repository from '../core/net/repository'
    import {WxcMask} from 'weex-ui'
    const clipboard = weex.requireModule('clipboard')
    const modal = weex.requireModule('modal')

    export default {
        props: {
        },
        components: {RLList, NavigationBar, WxcMask},
        data() {
            return {
                userName: "",
                reposName: "",
                issueNum: "",
                itemClickIndex: -1,
                title: "",
                showMark: false,
                isLoading: false,
                currentPage: 1,
                list: [],
                issueInfo: {},
            }
        },
        created: function () {
            this.init()
        },
        activated: function () {
            //keep alive
            this.init();
        },
        methods: {
            init() {
                this.list = []
                this.issueInfo = {}

                if(this.getQuery().title) {
                    this.title = this.getQuery().title
                }
                if(this.getQuery().userName) {
                    this.userName = this.getQuery().userName
                }
                if(this.getQuery().reposName) {
                    this.reposName = this.getQuery().reposName
                }
                if(this.getQuery().issueNum) {
                    this.issueNum = this.getQuery().issueNum
                }
                this.loadDetail();
                this.onRefresh()
            },
            loadDetail() {
                if (this.isPreparing()) {
                    return
                }
                repository.getIssueInfoDao(this.userName, this.reposName, this.issueNum)
                    .then((res) => {
                        if (res && res.result) {
                            this.issueInfo = res.data;
                        }
                    })
            },
            loadComment(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.getIssueCommentDao(this.currentPage, this.userName, this.reposName, this.issueNum)
                    .then((res) =>{
                        this.resolveResult(res, type)
                    })
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    if(type === 1) {
                        this.list = res.data;
                    } else {
                        this.list = this.list.concat(res.data);
                    }
                }
                if (Constant.DEBUG) {
                    console.info("issue detail info loadData ", res)
                }
                if (type === 1) {
                    if (this.$refs.dylist) {
                        this.$refs.dylist.stopRefresh();
                    }
                } else if (type === 2) {
                    if (this.$refs.dylist) {
                        this.$refs.dylist.stopLoadMore();
                    }
                }
                if (this.$refs.dylist) {
                    if (!res.data || res.data.length < Constant.PAGE_SIZE) {
                        this.$refs.dylist.setNotNeedLoadMore();
                    } else {
                        this.$refs.dylist.setNeedLoadMore();
                    }
                }
            },
            loadData(type) {
                this.loadComment(type)
            },
            onLoadMore() {
                this.currentPage++;
                this.loadData(2)
            },
            onRefresh() {
                this.currentPage = 1;
                this.list = [];
                this.loadData(1)
            },
            itemClick(index) {
                this.itemClickIndex = index;
                //modal.toast({message: "click index " + index})
                //this.jumpWithParams('EditIssuePage', {})
                this.showMark = true;
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
            wxcMaskSetHidden () {
                this.showMark = false;
            },
            editClick () {
                this.showMark = false;
                if(this.itemClickIndex < 0) {
                    return
                }
                let data = this.list[this.itemClickIndex];
                this.jumpWithParams('EditIssuePage', {needTitle: false, editValue: data.body, title: '编辑', type: 2})
            },
            deleteClick () {
                this.showMark = false;
            },
            copyClick () {
                this.showMark = false;
                if(this.itemClickIndex < 0) {
                    return
                }
                let data = this.list[this.itemClickIndex];
                clipboard.setString(data.body)
                modal.toast({message: "已复制"});
            },
            replyClick () {
            },
            editClick () {
            },
            closeClick () {
            },
            lockClick () {
            },

        }
    }
</script>

<style scoped>

    .content {
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }
    .content-text {
        flex: 1;
        padding: 10px;
        color: #333333;
        width: 500px;
        border-bottom-width: 2px;
        border-bottom-color: #969896;
        font-size: 30px;
    }

    .bottom-container {
        position:absolute;
        height: 80px;
        top: 1222px;
        background-color: white;
        flex-direction: row;
        width: 750px;
        padding-top: 15px;
        padding-bottom: 15px
    }


    .bottom-item {
        padding-top: 10px;
        padding-bottom: 10px;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .bottom-item-line {
        border-color: rgba(60, 63, 65, 0.7);
        border-right-width: 1px;
    }

    .bottom-item-text {
        font-size: 23px;
        font-family: 'wxcIconFont';
        color: rgba(60, 63, 65, 0.7);
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

</style>