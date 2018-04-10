<template>
    <div>
        <div class="card-black-wrapper">
            <div class="card-user-wrapper" style="flex-direction: row">
                <text class="name-text-white " @click="userNameClick">{{itemValue.userName}}</text>
                <text class="name-text-white name-text-repos">{{" / "}}</text>
                <text class="name-text-white name-text-repos">{{itemValue.reposName}}</text>
            </div>
            <div style="flex-direction: row;margin-top: 20px">
                <text class="content-text-gray repo-text">{{itemValue.language}}</text>
                <text class="content-text-gray repo-text">{{itemValue.size ? ((itemValue.size / 1024).toFixed(2) + "M") : ' '}}</text>
                <text class="content-text-gray repo-text">{{itemValue.license ? itemValue.license.name : ""}}</text>
            </div>

            <text class="content-text" style="flex: 1; margin-top: 20px;" >{{itemValue.description}}</text>

            <text class="content-text-gray time-text" style="flex: 1; margin-top: 20px;margin-bottom: 20px;"  @click="desClick">{{itemValue.infoText}}</text>

            <div class="bottom-container">
                <div class="bottom-item bottom-item-line" @click="reposStarClick">
                    <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue643 " + (itemValue.watchers_count? itemValue.watchers_count : '---')}}</text>
                </div>
                <div class="bottom-item bottom-item-line" @click="reposForkerClick">
                    <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue67e " + (itemValue.forks_count? itemValue.forks_count : '---')}}</text>
                </div>
                <div class="bottom-item bottom-item-line" @click="reposWatcherClick">
                    <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue681 " + (itemValue.subscribers_count? itemValue.subscribers_count : '---')}}</text>
                </div>
                <div class="bottom-item" @click="reposIssueClick">
                    <text class="bottom-item-text" :style="{fontFamily: 'wxcIconFont'}">{{"\ue661 " + (itemValue.open_issues_count? itemValue.open_issues_count : '---')}}</text>
                </div>
            </div>
        </div>

        <div class="control-container">
            <text class="control-text" @click="()=>{onControlClick(1)}" :style="{color:(selectIndex ===1) ? '#FFFFFF' : '#AAAAAA'}">{{' 动态 '}}</text>

            <text class="control-text" @click="()=>{onControlClick(2)}" :style="{color:(selectIndex ===2) ? '#FFFFFF' : '#AAAAAA'}">{{' 提交 '}}</text>
        </div>

    </div>
</template>

<script>
    import {addIconFontSupport} from '../../config/IconConfig'
    export default {
        props: {
            itemValue: {
                type: Object, default: () => {
                    return {}
                }
            },
            itemIndex: {type: Number, default: -1},
            onItemClick: {type: Function}
        },
        components: {},
        methods: {
            imageClick() {
                if (!this.itemValue.ex.display_login) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.ex.display_login})
            },
            onControlClick(index) {
                this.selectIndex = index;
                this.onItemClick && this.onItemClick(0, index)
            },
            reposStarClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.userName,
                    reposName: this.itemValue.reposName,
                    title: 'Starer',
                    dataType: 'reposStarer',
                })
            },
            reposWatcherClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.userName,
                    reposName: this.itemValue.reposName,
                    title: 'Watcher',
                    dataType: 'reposWatcher',
                })

            },
            reposForkerClick() {
                this.jumpWithParams("CommonListPage", {
                    userName: this.itemValue.userName,
                    reposName: this.itemValue.reposName,
                    title: 'Forker',
                    dataType: 'reposForker',
                })

            },
            reposIssueClick() {
                this.onItemClick && this.onItemClick(2, 0)
            },
            userNameClick() {
                this.jumpWithParams("UserInfoPage", {userName:  this.itemValue.userName})
            },
            desClick() {
                if(this.itemValue.fork && this.itemValue.parent && this.itemValue.parent.full_name) {
                    let data = this.itemValue.parent.full_name.split("/");
                    this.jumpWithParams("RepositoryDetailPage", {
                        userName: data[0],
                        reposName:   data[1],
                        title:  this.itemValue.parent.full_name
                    })
                }
            }
        },
        data() {
            return {
                selectIndex: 1
            }
        },
        created() {
            const dom = weex.requireModule('dom');
            //addIconFontSupport(dom, "../../")
        },
    }
</script>
<style lang="scss" >
    @import '../../config/styles.scss';
    .control-container {
        background-color: $--theme-color;
        width: 710px;
        flex-direction: row;
        margin-top: 30px;
        margin-bottom: 20px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        padding: 20px 20px;
        box-shadow: $--box-shadow-color;
    }
</style>
<style scoped>

    .bottom-item-text {
        font-size: 23px;
        color: rgba(255, 255, 255, 0.7);
    }

    .bottom-container {
        flex-direction: row;
        width: 700px;
        margin-top: 20px;
        border-top-width: 1px;
        border-color: rgba(255, 255, 255, 0.7);
        padding-top: 10px;
    }

    .bottom-item {
        padding-top: 10px;
        padding-bottom: 10px;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .bottom-item-line {
        border-color: rgba(255, 255, 255, 0.7);
        border-right-width: 1px;
    }

    .repo-text {
        font-size: 25px;
        margin-right: 20px;
    }

    .time-text {
        font-size: 25px;
        flex: 1;
        text-align: end;
    }

    .content-text {
        color: rgba(227, 227, 227, 0.7);
        font-size: 28px;
        font-weight: bold;
    }

    .card-user-wrapper {
        align-items: center;
    }

    .name-text-repos {
        font-size: 34px;
    }

    .control-text {
        flex: 1;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 26px;
        display: -webkit-box;
        white-space: normal !important;
        -webkit-box-orient: vertical;
    }
</style>