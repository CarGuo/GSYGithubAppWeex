<template>
    <list class="list" :style="{height:listHeight, width:listWidth}" @loadmore="loadMore" @onloadmore="loadMore"
          loadmoreoffset="30">
        <refresh class="refresh" @refresh="onRefresh" :display="refreshDisplay">
        <loading-indicator class="indicator"></loading-indicator>
        </refresh>
        <cell :v-if="headerComponent" class="header">
            <component v-bind:is="headerComponent"
                       :onItemClick="headerClick"
                       :itemValue="headerData"></component>
        </cell>
        <cell class="cell" v-for="(rowData, index) in dataList">
            <div class="panel">
                <component v-bind:is="listItemName"
                           :onItemClick="itemClick"
                           :itemValue="rowData"
                           :itemIndex="index"></component>
            </div>
        </cell>
        <cell v-if="!isNotEmpty" class="empty-page">
            <div class="empty-page">
                <image :src="logo" class="logo"></image>
                <text class="indicator-text">目前什么都没有</text>
            </div>
        </cell>
        <cell v-if="showLoadMore" class="loading">
            <div :style="loadingDisplay">
                <text class="indicator-text">Loading ...</text>
            </div>
        </cell>
        <cell v-if="!showLoadMore"  :style="{height: bottomEmpty, width: '10px'}">
            <div :style="{height: bottomEmpty, width: '10px'}">
            </div>
        </cell>
    </list>
</template>

<script>
    import EventItem from './EventItem.vue'
    import RepositoryItem from './RepositoryItem.vue'
    import RepositoryHeadItem from './RepositoryHeadItem.vue'
    import IssueHeadItem from './IssueHeadItem.vue'
    import IssueItem from './IssueItem.vue'
    import UserHeadItem from './UserHeadItem.vue'
    import IssueCommentItem from './IssueCommentItem.vue'
    import FileItem from './FileItem.vue'
    import UserItem from './UserItem.vue'
    import {getImagePath} from '../../config/IconConfig'

    if(WXEnvironment.platform !== 'Web') {
        Vue.component('EventItem', EventItem)
        Vue.component('RepositoryItem', RepositoryItem)
        Vue.component('UserHeadItem', UserHeadItem)
        Vue.component('RepositoryHeadItem', RepositoryHeadItem)
        Vue.component('IssueItem', IssueItem)
        Vue.component('FileItem', FileItem)
        Vue.component('IssueHeadItem', IssueHeadItem)
        Vue.component('IssueCommentItem', IssueCommentItem)
        Vue.component('UserItem', UserItem)
    }

    export default {
        props: {
            listItemName: {type: String},
            forRefresh: {type: Function},
            forLoadMore: {type: Function},
            itemClick: {type: Function},
            headerClick: {type: Function},
            listData: {type: Array},
            headerComponent: {type: String},
            headerData: {type: Object},
            bottomEmpty: {type: [String, Number], default:'240px'},
            listHeight: {type: [String, Number], default:'1234px'},
            listWidth: {type: [String, Number], default:'750px'},
        },
        data() {
            return {
                refreshing: false,
                loadinging: false,
                needRefresh: true,
                needLoadMore: true,
                logo: getImagePath('logo', '.png')
            }
        },
        computed: {
            dataList() {
                return this.listData;
            },
            isNotEmpty() {
                return ((this.listData && this.listData.length > 0) || this.headerComponent != null);
            },
            refreshDisplay() {
                let display = (this.refreshing === true && this.needRefresh === true) ? 'show' : 'hide';
                return display
            },
            loadingDisplay() {
                let display = (this.loadinging === true && this.needLoadMore === true) ? {
                    height: '200px',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    alignItems: 'center',
                } : {height: '0.01px', overflow: 'hidden', flexDirection: 'row', alignItems: 'center', };
                return display
            },
            showLoadMore() {
                return this.loadinging === true && this.needLoadMore === true
            }
        },
        methods: {
            loadMore() {
                if (this.refreshing || this.loadinging) {
                    return
                }
                if (this.needLoadMore === false) {
                    return
                }

                this.loadinging = true;
                setTimeout(() => {
                    this.forLoadMore && this.forLoadMore();
                }, 300)
            },
            onRefresh() {
                if (this.refreshing || this.loadinging) {
                    return
                }
                if (this.needRefresh === false) {
                    return
                }
                this.refreshing = true;
                setTimeout(() => {
                    this.forRefresh && this.forRefresh();
                }, 300)
            },
            showRefresh() {
                this.refreshing = true;
            },
            stopLoadMore() {
                this.loadinging = false;
            },
            stopRefresh() {
                this.refreshing = false;
            },
            setNeedLoadMore() {
                this.needLoadMore = true;
            },
            setNeedRefresh() {
                this.needRefresh = true;
            },
            setNotNeedLoadMore() {
                this.needLoadMore = false;
            },
            setNotNeedRefresh() {
                this.needRefresh = false;
            },
        }
    }
</script>
<style lang="scss" >
    @import '../../config/styles.scss';

    .indicator-text {
        color: $--gray-color;
        font-size: 42px;
        text-align: center;
    }

    .indicator {
        margin-top: 16px;
        height: 80px;
        width: 80px;
        color: $--theme-color;
    }

</style>
<style scoped>
    .logo {
        width: 150px;
        height: 150px;
        align-items: center;
        justify-content: center;
    }
    .loading {
        margin-top: 20px;
        width: 750px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .refresh {
        width: 750px;
        height: 200px;
        display: -ms-flex;
        display: -webkit-flex;
        display: flex;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        align-items: center;
    }



    .header {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .panel {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }

    .list {
        height: 1234px;
    }
    .empty-page {
        width: 750px;
        height: 1224px;
        align-items: center;
        justify-content: center;
    }
</style>