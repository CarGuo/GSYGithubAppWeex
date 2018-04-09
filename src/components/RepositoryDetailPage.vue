<template>
    <div :style="mainStyle">
        <!--<router-view></router-view>-->
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <top-tab-bar :tab-titles="tabTitles"
                     :tab-styles="tabStyles"
                     title-type="text"
                     @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
            <div class="item-container"  :style="contentStyle">
                <web-component :source="readme" :webStyle="{height:'1074px', width: '750px', paddingBottom:'30px', }" :gsygithubLink="gsygithubLink"></web-component>
            </div>
            <div class="item-container" :style="contentStyle">
                <repository-detail-info-page ref="a"></repository-detail-info-page>
            </div>
            <div class="item-container" :style="contentStyle">
                <repository-file-list-page ref="b" :curBranch="curBranch"></repository-file-list-page>
            </div>
            <div class="item-container" :style="contentStyle">
                <repository-issue-list-page ref="c"></repository-issue-list-page>
            </div>
        </top-tab-bar>
        <div v-if="reposStatus != null" class="bottom-item-container">
            <div class="bottom-item bottom-item-line" @click="reposStarClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{starIcon + "   " +  starText}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="reposWatcherClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{watcherIcon + "   " + watcherText}}</text>
            </div>
            <div class="bottom-item bottom-item-line" @click="reposForkerClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue67e "  + ('Fork')}}</text>
            </div>
            <div class="bottom-item" @click="reposBranchClick">
                <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue61a "  +  curBranch}}</text>
            </div>
        </div>
        <popover-component ref="wxc-popover"
                     :buttons="branch"
                     :position="popoverPosition"
                     :arrowPosition="popoverArrowPosition"
                     @wxcPopoverButtonClicked="popoverLanguageButtonClicked"></popover-component>
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
    import {Utils, WxcMinibar}  from 'weex-ui';
    import Config from '../config/RepositoryTabConfig'
    import NavigationBar from './widget/NavigationBar.vue'
    import TopTabBar from './widget/TopTabBar.vue'
    import WebComponent from './widget/WebComponent.vue'
    import LoadingComponent from './widget/LoadingComponent.vue'
    import PopoverComponent from './widget/PopoverComponent.vue'
    import RepositoryDetailInfoPage from './RepositoryDetailInfoPage.vue'
    import RepositoryIssueListPage from './RepositoryIssueListPage.vue'
    import RepositoryFileListPage from './RepositoryFileListPage.vue'
    import repository from '../core/net/repository'
    import * as Constant from '../core/common/constant'
    import  {launchUrl} from "../core/common/htmlUtils"
    const modal = weex.requireModule('modal')
    import {addIconFontSupport} from '../config/IconConfig'
    const dom = weex.requireModule('dom');

    export default {
        components: {TopTabBar, NavigationBar, WebComponent, RepositoryDetailInfoPage,
            RepositoryIssueListPage, RepositoryFileListPage, LoadingComponent, PopoverComponent},
        data: () => ({
            tabTitles: Config.tabTitles,
            tabStyles: Config.tabStyles,
            title: "",
            userName: "",
            reposName: "",
            readme: " ",
            curBranch: 'master',
            starIcon: null,
            watcherIcon: null,
            starText: null,
            star: false,
            watch: false,
            watcherText: null,
            reposStatus: null,
            isLoading: false,
            mainHeight: '1334px',
            mainMarginTop: '0px',
            branch: [],
            popoverPosition: {  x: -50, y: 1134  },
            mainStyle:{},
            popoverArrowPosition: {pos: 'bottom', x: -50},
        }),
        created () {
            const tabPageHeight = Utils.env.getPageHeight();
            const { tabStyles } = this;
            this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
            let mainHeight = ( WXEnvironment.platform === 'Web') ? '1334px' : Utils.env.getScreenHeight() - 32
            let mainMarginTop = (WXEnvironment.platform.toLowerCase() === 'ios') ? '32px' : '0px'
            this.mainStyle = {height: mainHeight, width: '750px',backgroundColor: 'white', marginTop: mainMarginTop}
            this.init()
            addIconFontSupport(dom, "../../")

        },
        activated: function () {
            //keep alive
            if(WXEnvironment.platform === 'Web') {
                this.init();
            }
        },
        methods: {
            init() {
                this.readme = ''
                if(this.getQuery().title) {
                    this.title = this.getQuery().title
                }
                if(this.getQuery().userName) {
                    this.userName = this.getQuery().userName
                }
                if(this.getQuery().reposName) {
                    this.reposName = this.getQuery().reposName
                }
                this.loadReadme();
                this.loadStatus();
                this.loadBranch();
            },
            wxcTabBarCurrentTabSelected (e) {
                const index = e.page;
            },
            loadStatus() {
                repository.getRepositoryStatusDao(this.userName, this.reposName)
                    .then((res) => {
                        if(res && res.result) {
                            console.log("repos statu", res)
                            this.reposStatus = res.data
                            this.star = res.data.star
                            this.watch = res.data.watch
                            this.starIcon = (res.data.star) ? '\ue698' : '\ue630'
                            this.watcherIcon = (res.data.watch) ? '\ue629' : '\ue681'
                            this.starText = (res.data.star) ? 'UnStar' : 'Star'
                            this.watcherText = (res.data.watch) ? 'UnWatcher' : 'Watcher'
                        }
                    })
            },
            loadReadme() {
                if (!this.title || !this.userName || !this.reposName) {
                    return
                }
                repository.getRepositoryDetailReadmeHtmlDao(this.userName, this.reposName)
                    .then((res)=>{
                        if(res && res.data) {
                            this.readme = res.data;
                        }
                        if (Constant.DEBUG) {
                            console.info("repository detail readme", res)
                        }
                    })
            },
            loadBranch() {
                repository.getBranchesDao(this.userName, this.reposName)
                    .then((res)=>{
                        if(res && res.data) {
                            this.branch.shift()
                            let data = res.data;
                            if (data && data.length > 0) {
                                data.forEach((item) => {
                                    let addData = {
                                        key: item.name,
                                        text: item.name,
                                    };
                                    this.branch.push(addData);
                                })
                            }
                        }
                    })
            },
            gsygithubLink(url) {
                if (url) {
                    let owner = userName;
                    let repo = reposName;
                    let branch = this.curBranch ? this.curBranch : "master";
                    let currentPath = url.replace("gsygithub://.", "").replace("gsygithub://", "/");
                    let fixedUrl = "https://github.com/" + owner + "/" + repo + "/blob/" + branch + currentPath;
                    launchUrl(fixedUrl, this);
                }
            },
            reposStarClick() {
                this.isLoading = true
                repository.doRepositoryStarDao(this.userName, this.reposName, this.star)
                    .then((res)=>{
                        if(res && res.result) {
                            this.loadStatus()
                        }
                        this.isLoading = false
                    })
            },
            reposWatcherClick() {
                this.isLoading = true
                repository.doRepositoryWatchDao(this.userName, this.reposName, this.watch)
                    .then((res)=>{
                        if(res && res.result) {
                            this.loadStatus()
                        }
                        this.isLoading = false
                    })
            },
            reposForkerClick() {
                this.isLoading = true
                repository.createForkDao(this.userName, this.reposName)
                    .then((res) => {
                        setTimeout(()=>{
                            modal.toast({
                                message:(res && res.result) ? 'fork 成功' : 'fork 异常'
                            });
                        }, 500);
                        this.isLoading = false
                    })
            },
            reposBranchClick() {
                if(!this.branch || this.branch.length < 1) {
                    return
                }
                this.$refs['wxc-popover'].wxcPopoverShow();
            },
            popoverLanguageButtonClicked (obj) {
                this.curBranch = this.branch[obj.index].text;
                this.loadReadme()
            },
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        align-items: center;
        justify-content: center;
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

    .bottom-item-container{
        background-color: white;
        flex-direction: row;
        width: 750px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-top: 1px #3c3f41;
    }

</style>