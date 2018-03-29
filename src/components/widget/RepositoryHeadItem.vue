<template>
    <div class="card-wrapper">
        <div class="card-user-wrapper" style="flex-direction: row">
            <text class="name-text">{{itemValue.userName}}</text>
            <text class="name-text">{{" / "}}</text>
            <text class="name-text">{{itemValue.reposName}}</text>
        </div>
        <div style="flex-direction: row;margin-top: 20px">
            <text class="repo-text">{{itemValue.language}}</text>
            <text class="repo-text">{{(itemValue.size / 1024).toFixed(2) + "M"}}</text>
            <text class="repo-text">{{itemValue.license ? itemValue.license.name : ""}}</text>
        </div>

        <text class="content-text" style="flex: 1; margin-top: 20px;">{{itemValue.description}}</text>

        <text class="time-text" style="flex: 1; margin-top: 20px;margin-bottom: 20px;">{{itemValue.infoText}}</text>

        <div class="bottom-container">
            <div class="bottom-item bottom-item-line">
                <text class="bottom-item-text">{{"\ue643  " + itemValue.watchers_count}}</text>
            </div>
            <div class="bottom-item bottom-item-line">
                <text class="bottom-item-text">{{"\ue67e  " + itemValue.forks_count}}</text>
            </div>
            <div class="bottom-item bottom-item-line">
                <text class="bottom-item-text">{{"\ue681  " + itemValue.subscribers_count}}</text>
            </div>
            <div class="bottom-item">
                <text class="bottom-item-text">{{"\ue661  " + itemValue.open_issues_count}}</text>
            </div>
        </div>


    </div>
</template>

<script>
    const dom = weex.requireModule('dom');
    export default {
        props: {
            itemValue: {
                type: Object, default: () => {
                    return {}
                }
            },
            itemIndex: {type: Number, default: -1},
            onItemClick:{type:Function}
        },
        components: {},
        methods: {
            onCardClick() {
                this.onItemClick && this.onItemClick(this.itemIndex);
            },
            imageClick() {
                if(!this.itemValue.ex.display_login) {
                    return
                }
                this.jumpWithParams("UserInfoPage", {userName: this.itemValue.ex.display_login})
            }
        },
        data() {
            return {}
        },
        created() {
            dom.addRule('fontFace', {
                'fontFamily': "wxcIconFont",
                'src': `url('../../static/font/iconfont.ttf')`
            });
        },
    }
</script>

<style scoped>

    .bottom-item-text {
        font-size: 23px;
        font-family: 'wxcIconFont';
        color: rgba(255, 255, 255, 0.7);
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .bottom-container {
        flex-direction: row;
        width: 720px;
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
        color: rgba(227, 227, 227, 0.4);
        font-size: 25px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        margin-right: 20px;
        flex-direction: row-reverse;
        -webkit-box-orient: vertical;
    }

    .time-text {
        color: rgba(227, 227, 227, 0.5);
        font-size: 25px;
        flex:1;
        text-align: end;
    }


    .content-text {
        color: rgba(227, 227, 227, 0.7);
        font-size: 28px;
        font-weight: bold;
    }

    .card-wrapper {
        width: 750px;
        background-color: #3c3f41;
        padding: 20px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.90);
    }

    .card-user-wrapper {
        align-items: center;
    }

    .name-text {
        color: rgba(255, 255, 255, 0.9);
        font-size: 34px;
        font-weight: bold;
    }
</style>