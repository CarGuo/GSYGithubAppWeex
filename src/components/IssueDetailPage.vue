<template>
    <div class="wrapper" :style="mainStyle" @viewappear="onappear" @viewdisappear="ondisappear">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <r-l-list ref="dylist" listItemName="IssueCommentItem" :listData="list" :listHeight="listHeight"
                  headerComponent="IssueHeadItem" :headerData="issueInfo" :bottomEmpty="getListBottomEmpty"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
        <div v-if="issueInfo.body" class="bottom-container" :style="{top: controlTop}">
            <div class="bottom-item bottom-item-line" @click="replyClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'回复'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="editIssueClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{'编辑'}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="closeClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{showCloseText}}</text>
            </div>
            <div class="bottom-item" @click="lockClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{lockText}}</text>
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
    import RLList from './widget/RLList.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import repository from '../core/net/repository'
    import {WxcMask, Utils} from 'weex-ui'
    import LoadingComponent from './widget/LoadingComponent.vue'
    const clipboard = weex.requireModule('clipboard')
    const modal = weex.requireModule('modal')
    import {getEntryPageStyle, getListHeight, controlBarHeight, navigatorbBarHeight, statusHeight} from "../config/Config"

    export default {
        props: {
        },
        components: {RLList, NavigationBar, WxcMask, LoadingComponent},
        data() {
            return {
                userName: "",
                reposName: "",
                issueNum: "",
                closeText: "关闭",
                itemClickIndex: -1,
                title: "",
                showMark: false,
                isLoading: false,
                currentPage: 1,
                ondisappearStatus: false,
                list: [],
                issueInfo: {},
                mainStyle:{},
                listHeight:0,
                controlTop:0,
            }
        },
        created: function () {
            this.init()
            let top =  Utils.env.getScreenHeight() - controlBarHeight - statusHeight;
            this.controlTop = Utils.env.isIPhoneX() ? top - 88 : top
            this.mainStyle = getEntryPageStyle(Utils)
            this.listHeight = getListHeight(Utils.env.getScreenHeight() - controlBarHeight - navigatorbBarHeight, Utils)
        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.init();
            }
        },
        computed: {
            showCloseText() {
                if(this.issueInfo === null) {
                    return this.closeText
                }
                if (this.issueInfo.state === "closed") {
                    return '打开'
                }
                return '关闭'
            },
            lockText() {
                if(this.issueInfo === null) {
                    return '锁定'
                }
                if (this.issueInfo.locked == true) {
                    return '解锁'
                }
                return '锁定'
            }
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
                    if (!res.data || res.data.length < this.getPageSize()) {
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
                this.showMark = true;
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
            wxcMaskSetHidden () {
                this.showMark = false;
            },
            /**
             * 删除评论
             * */
            deleteClick() {
                this.showMark = false;
                if (this.itemClickIndex < 0) {
                    return
                }
                this.isLoading = true;
                let data = this.list[this.itemClickIndex];
                repository.deleteCommentDao(this.userName, this.reposName, this.issueNum, data.id).then((res) => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                    this.onRefresh();
                })
            },
            /**
             * 复制评论
             * */
            copyClick() {
                this.showMark = false;
                if (this.itemClickIndex < 0) {
                    return
                }
                let data = this.list[this.itemClickIndex];
                clipboard.setString(data.body)
                modal.toast({message: "已复制"});
            },
            /**
             * 编辑评论
             * */
            editClick() {
                this.showMark = false;
                if (this.itemClickIndex < 0) {
                    return
                }
                let data = this.list[this.itemClickIndex];
                this.jumpWithParams('EditIssuePage', {
                    needTitle: null, editValue: data.body, title: '编辑', type: 'editComment',
                    issueNum: this.issueNum, commentNum: data.id, reposName: this.reposName, userName: this.userName
                })
            },
            /**
             * 回复issue
             * */
            replyClick() {
                this.jumpWithParams('EditIssuePage', {
                    needTitle: null, title: '回复', type: 'commentIssue',
                    issueNum: this.issueNum, reposName: this.reposName, userName: this.userName
                })
            },
            /**
             * 编译issue
             * */
            editIssueClick() {
                this.jumpWithParams('EditIssuePage', {
                    needTitle: true,
                    editValue: this.issueInfo.body,
                    editTitle: this.issueInfo.title,
                    title: '编辑',
                    type: 'editIssue',
                    issueNum: this.issueNum,
                    reposName: this.reposName,
                    userName: this.userName
                })
            },
            /**
             * 关闭issue
             * */
            closeClick() {
                this.isLoading = true;
                repository.editIssueDao(this.userName, this.reposName, this.issueNum,
                    {state: (this.issueInfo.state === "closed") ? 'open' : 'closed'}).then((res) => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                    this.loadDetail();
                })
            },
            /**
             * 锁定操作
             * */
            lockClick() {
                this.isLoading = true;
                repository.lockIssueDao(this.userName, this.reposName, this.issueNum, this.issueInfo.locked).then((res) => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                    this.loadDetail();
                })
            },
            /**
             * 页面onResume
             * */
            onappear(event) {
                if (this.ondisappearStatus === true) {
                    this.loadDetail();
                    this.onRefresh()
                }
            },
            /**
             * 页面onPause
             * */
            ondisappear(event) {
                this.ondisappearStatus = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../config/styles.scss';
    .wrapper {
        background-color: $--container-color;
    }
    .bottom-item-text {
        font-size: 26px;
        color: $--theme-color;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background-color: white;
    }
    .content-text {
        flex: 1;
        color: $--theme-color;
        width: 500px;
        height: 60px;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 30px;
        font-size: 35px;
    }

    .content {
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }

    .bottom-container {
        position:absolute;
        height: 80px;
        top: 1234px;
        background-color: white;
        flex-direction: row;
        width: 750px;
        align-items: center;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 15px;
        overflow: hidden;
    }


    .bottom-item {
        padding-top: 10px;
        padding-bottom: 10px;
        flex: 1;
        align-items: center;
        background-color: white;
        justify-content: center;
    }

    .bottom-item-line {
        border-color: $--theme-color;
        border-right-width: 1px;
    }
</style>