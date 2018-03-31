<template>
    <div :style="{flex:1,alignItems: 'center'}">
        <div class="demo">
            <wxc-searchbar ref="wxc-searchbar"
                           @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                           @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                           @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                           @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                           @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                           @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
        </div>

        <div class="control-container">
            <text class="control-text" @click="()=>{onControlClick(1)}"
                  :style="{color:(selectIndex ===1) ? '#FFFFFF' : '#AAAAAA'}">{{' 全部 '}}
            </text>

            <text class="control-text" @click="()=>{onControlClick(2)}"
                  :style="{color:(selectIndex ===2) ? '#FFFFFF' : '#AAAAAA'}">{{' 打开 '}}
            </text>
            <text class="control-text" @click="()=>{onControlClick(3)}"
                  :style="{color:(selectIndex ===3) ? '#FFFFFF' : '#AAAAAA'}">{{' 关闭 '}}
            </text>
        </div>

        <r-l-list ref="dylist" listItemName="IssueItem" :listData="list" :bottomEmpty="'350px'"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList'
    import event from '../core/net/event'
    import repository from '../core/net/repository'
    import {WxcSearchbar}  from 'weex-ui';

    export default {
        props: {
        },
        components: {RLList, WxcSearchbar},
        data() {
            return {
                userName: "",
                reposName: "",
                filter : null,
                currentPage: 1,
                listType: 1,
                list: [],
                dataState: 1,
                selectIndex: 1,
                searchValue:""
            }
        },
        created: function () {
            this.init()
        },
        activated: function () {
            //keep alive
            this.init()
        },
        methods: {
            init() {
                this.list = []
                if(this.$route.params.userName) {
                    this.userName = this.$route.params.userName
                }
                if(this.$route.params.reposName) {
                    this.reposName = this.$route.params.reposName
                }
                this.onRefresh()
            },
            loadDataState(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.getRepositoryIssueDao( this.currentPage, this.userName, this.reposName, this.filter)
                    .then((res)=>{
                        this.resolveResult(res, type)
                    })
            },
            searchDataState(type) {
                if (this.isPreparing()) {
                    return
                }
                repository.searchRepositoryIssueDao(this.searchValue, this.userName, this.reposName, this.currentPage, this.filter)
                    .then((res)=>{
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
                    console.info("person loadData ", res)
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
                console.log("click index ", index);
                modal.toast({message: "click index " + index})
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
            wxcSearchbarInputOnFocus () {
            },
            wxcSearchbarInputOnBlur () {
                this.onRefresh();
            },
            wxcSearchbarCloseClicked () {
                this.$refs['wxc-searchbar'].setValue('');
            },
            wxcSearchbarInputOnInput (e) {
                this.searchValue = e.value;
            },
            wxcSearchbarCancelClicked (e) {
                //this.$refs['wxc-searchbar'].setValue('');
            },
            wxcSearchbarInputDisabledClicked (e) {
                console.log("wxcSearchbarInputDisabledClicked", e)
            },
            wxcSearchbarDepChooseClicked (e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            wxcSearchbarInputReturned (e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            onControlClick(index) {
                this.selectIndex = index;
                if(index === 1) {
                    this.filter = null;
                } else if(index === 2) {
                    this.filter = "open"
                } else {
                    this.filter = "closed"
                }
                this.onRefresh();
            }
        }
    }
</script>

<style scoped>
    .control-container {
        background-color: #3c3f41;
        width: 710px;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        padding: 10px 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.90);
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
</style>