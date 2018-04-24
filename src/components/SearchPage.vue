<template>
    <div class="search-page-container" :style="mainStyle">
        <navigation-bar :title="'搜索'" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
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
            <text class="control-text" @click="()=>{onControlClick(1)}" :style="{color:(this.listType === 1) ? '#FFFFFF' : '#AAAAAA'}">{{' 仓库 '}}</text>
            <text class="control-text" @click="()=>{onControlClick(2)}" :style="{color:(this.listType === 2) ? '#FFFFFF' : '#AAAAAA'}">{{' 用户 '}}</text>
        </div>

        <div style="flex:1;width:750px;">
            <r-l-list ref="dylist" :listItemName="itemClass" :listData="list" :bottomEmpty="listBottomEmpty"
                      :listHeight="listHeight"
                      :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
        </div>
    </div>
</template>

<script>


    import RLList from './widget/RLList.vue'
    import NavigationBar from './widget/NavigationBar.vue'
    import event from '../core/net/event'
    import repository from '../core/net/repository'
    import {WxcSearchbar, Utils} from 'weex-ui';
    import {getEntryPageStyle, getListBottomEmpty, getListHeight, navigatorbBarHeight} from "../config/Config"


    export default {
        props: {},
        components: {RLList, WxcSearchbar, NavigationBar},
        data() {
            return {
                filter: null,
                currentPage: 1,
                listType: 1,
                searchData: '',
                itemClass: 'RepositoryItem',
                list: [],
                selectTypeData: null,
                selectSortData: null,
                selectLanguageData: null,
                listBottomEmpty: getListBottomEmpty(),
                mainStyle:{},
                listHeight:getListHeight(Utils.env.getScreenHeight() - navigatorbBarHeight - 150, Utils)
            }
        },
        created: function () {
            this.init()
            this.mainStyle = getEntryPageStyle(Utils)
        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.init();
            }
        },
        methods: {
            init() {},
            searchRepos(type) {
                if (!this.searchData || this.searchData.length < 1) {
                    return
                }
                let searchType = (this.listType === 1) ? null : 'user';
                repository.searchRepositoryDao(this.searchData, this.selectLanguageData, this.selectTypeData, this.selectSortData, searchType, this.currentPage)
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
                this.searchRepos(type)
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
                if (this.listType === 1) {
                    this.jumpWithParams("RepositoryDetailPage", {
                        userName: data.owner.login,
                        reposName:  data.name,
                        title: data.owner.login + "/" +  data.name
                    })
                } else {
                    this.jumpWithParams("UserInfoPage", {userName: data.login})
                }
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
                this.searchData = e.value;
            },
            wxcSearchbarCancelClicked(e) {
                //this.$refs['wxc-searchbar'].setValue('');
            },
            wxcSearchbarInputDisabledClicked(e) {
            },
            wxcSearchbarDepChooseClicked(e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            wxcSearchbarInputReturned(e) {
                console.log("wxcSearchbarDepChooseClicked", e)
            },
            onControlClick(index) {
                this.listType = index
                if (index === 1) {
                    this.itemClass = "RepositoryItem"
                } else {
                    this.itemClass = "UserItem"
                }
                this.onRefresh();
            }
        }
    }
</script>

<style lang="scss" >
    @import '../config/styles.scss';
    .control-container {
        background-color: $--theme-color;
        width: 710px;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        padding: 20px 20px;
        box-shadow: $--box-shadow-color;
    }

    .search-page-container {
        align-items: center;
        justify-content: center;
        background-color: $--container-color;
    }
</style>
<style scoped>
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