<template>
    <div :style="{flex:1, width:'750px',alignItems: 'center'}">
        <div>
            <wxc-searchbar ref="wxc-searchbar"
                           @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                           @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                           @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                           @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                           @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                           @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
        </div>

        <div class="control-container">
            <text class="control-text" @click="()=>{onControlClick(1)}" :style="{color:(selectIndex ===1) ? '#FFFFFF' : '#AAAAAA'}">{{' 全部 '}}</text>
            <text class="control-text" @click="()=>{onControlClick(2)}" :style="{color:(selectIndex ===2) ? '#FFFFFF' : '#AAAAAA'}">{{' 打开 '}}</text>
            <text class="control-text" @click="()=>{onControlClick(3)}" :style="{color:(selectIndex ===3) ? '#FFFFFF' : '#AAAAAA'}">{{' 关闭 '}}</text>
        </div>

        <div style="flex:1;width:750px;">
            <r-l-list ref="dylist" listItemName="IssueItem" :listData="list" :bottomEmpty="getListBottomEmpty"
                      :listHeight="listHeight"
                      :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
        </div>
        <div class="float-btn-container">
            <text class="float-btn-text" :style="{fontFamily: 'wxcIconFont'}" @click="addClick">{{'\ue67b'}}</text>
        </div>
    </div>
</template>

<script>
    import RLList from './widget/RLList.vue'
    import event from '../core/net/event'
    import repository from '../core/net/repository'
    import {getListBottomEmpty, getListHeight, navigatorbBarHeight} from '../config/Config'
    import {WxcSearchbar, Utils} from 'weex-ui';


    export default {
        props: {},
        components: {RLList, WxcSearchbar},
        data() {
            return {
                userName: "",
                reposName: "",
                filter: null,
                currentPage: 1,
                listType: 1,
                list: [],
                dataState: 1,
                selectIndex: 1,
                searchValue: "",
                listHeight: getListHeight(Utils.env.getScreenHeight() - navigatorbBarHeight - 300, Utils),
            }
        },
        created: function () {
            this.init()
        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.init()
            }
        },
        methods: {
            init() {
                this.list = []
                if (this.getQuery().userName) {
                    this.userName = this.getQuery().userName
                }
                if (this.getQuery().reposName) {
                    this.reposName = this.getQuery().reposName
                }
                this.onRefresh()
            },
            loadDataState(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.getRepositoryIssueDao(this.currentPage, this.userName, this.reposName, this.filter)
                    .then((res) => {
                        this.resolveResult(res, type)
                    })
            },
            searchDataState(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.searchRepositoryIssueDao(this.searchValue, this.userName, this.reposName, this.currentPage, this.filter)
                    .then((res) => {
                        this.resolveResult(res, type)
                    })
            },
            resolveResult(res, type) {
                if (res && res.result) {
                    if (type === 1) {
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
                if (!this.searchValue || this.searchValue.length < 1) {
                    this.loadDataState(type)
                } else {
                    this.searchDataState(type)
                }
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
                let data = this.list[index];
                this.jumpWithParams("IssueDetailPage", {
                    userName: this.userName,
                    reposName: this.reposName,
                    title: '',
                    issueNum: data.number,
                })
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
            wxcSearchbarInputOnFocus() {
            },
            wxcSearchbarInputOnBlur() {
                this.onRefresh();
            },
            wxcSearchbarCloseClicked() {
                this.$refs['wxc-searchbar'].setValue('');
            },
            wxcSearchbarInputOnInput(e) {
                this.searchValue = e.value;
            },
            wxcSearchbarCancelClicked(e) {
                //this.$refs['wxc-searchbar'].setValue('');
            },
            wxcSearchbarInputDisabledClicked(e) {
                console.log("wxcSearchbarInputDisabledClicked", e)
            },
            wxcSearchbarDepChooseClicked(e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            wxcSearchbarInputReturned(e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            onControlClick(index) {
                this.selectIndex = index;
                if (index === 1) {
                    this.filter = null;
                } else if (index === 2) {
                    this.filter = "open"
                } else {
                    this.filter = "closed"
                }
                this.onRefresh();
            },
            /**
             * 添加issue
             * */
            addClick() {
                this.jumpWithParams('EditIssuePage', {
                    needTitle: true,
                    title: '提交Issue',
                    type: 'createIssue',
                    reposName: this.reposName,
                    userName: this.userName
                })
            },
        }
    }
</script>

<style lang="scss" >
    @import '../config/styles.scss';
    .control-container {
        background-color: $--theme-color;
        width: 710px;
        flex-direction: row;
        margin-top: 20px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        padding: 20px 20px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.60);
    }

    .control-text {
        flex: 1;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 26px;
        display: -webkit-box;
        white-space: normal !important;
        -webkit-box-orient: vertical;
    }

    .float-btn-container{
        position:absolute;
        height: 100px;
        width: 100px;
        top: 934px;
        left: 640px;
        background-color: rgba(255, 255, 255, 0.70);
        border-radius: 50px;
        align-items: center;
        justify-content: center;
        border: 1px #333333;
    }

    .float-btn-text{
        flex: 1;
        color: #333333;
        align-items: center;
        padding-top: 10px;
        justify-content: center;
        text-align: center;
        font-size: 80px;
    }
</style>