<template>
    <div :style="{flex:1, width:'750px'}">
        <scroller class="tab-title-list"
                  ref="tab-title-list"
                  :show-scrollbar="false"
                  scroll-direction="horizontal"
                  :style="{height: '80px'}">
            <div class="title-item"
                 v-for="(v, index) in headerList"
                 :key="index"
                 @click="tabClick(index)">

                <text :style="{ fontSize: '23px', color: '#3c3f41', marginLeft: '15px'}"
                        class="tab-text">{{v + ' >'}}</text>

            </div>
        </scroller>
        <r-l-list ref="dylist" listItemName="FileItem" :listData="list"
                  :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import RLList from './widget/RLList.vue'
    import event from '../core/net/event'
    import repository from '../core/net/repository'
    import {isImageEnd} from '../core/common/htmlUtils'

    export default {
        props: {
        },
        components: {RLList},
        data() {
            return {
                userName: "",
                reposName: "",
                headerList: ["."],
                list: [],
                path: "",
                curBranch: "master",
                loading:false,
            }
        },
        created: function () {
            this.init()
        },
        activated: function () {
            //keep alive
            this.init()
        },
        deactivated: function () {
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
                if (this.$refs.dylist) {
                    this.$refs.dylist.stopRefresh();
                    this.$refs.dylist.setNotNeedLoadMore();
                }
            },
            loadData() {
                if(this.isPreparing()) {
                    return
                }
                this.loading = true
                repository.getReposFileDirDao(this.userName, this.reposName, this.path, this.curBranch)
                    .then((res) => {
                        this.resolveResult(res, 1)
                        this.loading = false
                    })
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
                if (this.loading) {
                    return
                }
                let data = this.list[index];
                let headerList = this.headerList;
                if(data.type === 'file') {
                    if (isImageEnd(data.name)) {
                        //let urlLink = hostWeb + ownerName + "/" + repositoryName + "/" + "raw/" + curBranch + "/" + path;
                        //TODO OPEN PIC
                    } else {
                        this.jumpWithParams("CodeDetailPage", {
                            userName:  this.userName,
                            reposName: this.reposName,
                            path: headerList.slice(1, headerList.length).join("/") + "/" + data.name,
                            curBranch:  this.curBranch ? this.curBranch : 'master',
                            title:  data.name,
                            codeData: "",})
                    }
                } else {
                    if (this.loading) {
                        return
                    }
                    headerList.push(data.name);
                    let path = headerList.slice(1, headerList.length).join("/");
                    this.path = path;
                    this.onRefresh();
                }
            },
            tabClick(index) {
                if (this.loading) {
                    return
                }
                let headerList = this.headerList;
                if (headerList[index] !== ".") {
                    let newHeaderList = headerList.slice(0, parseInt(index) + 1);
                    let path = newHeaderList.slice(1, newHeaderList.length).join("/");
                    this.path = path;
                    this.headerList = newHeaderList;
                    this.onRefresh();
                } else {
                    this.path = '';
                    this.headerList = ["."];
                    this.onRefresh();
                }
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            }
        }
    }
</script>

<style scoped>
    .title-item {
        justify-content: center;
        align-items: center;
    }
    .tab-title-list {
        flex-direction: row;
    }
</style>