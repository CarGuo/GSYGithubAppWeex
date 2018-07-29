<template>
    <div :style="mainStyle">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <web-component :source="codeData" :webStyle="{height: webH, width: '750px'}"></web-component>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import WebComponent from './widget/WebComponent.vue'
    import repository from '../core/net/repository'
    import NavigationBar from './widget/NavigationBar.vue'
    import {formName, generateHtml, generateCode2HTml} from '../core/common/htmlUtils'
    import {addIconFontSupport} from '../config/IconConfig'
    import {getEntryPageStyle} from "../config/Config"
    import * as Config from "../config/Config"
    import {Utils} from 'weex-ui'


    export default {
        components: {WebComponent, NavigationBar},
        data() {
            return {
                userName: "",
                reposName: "",
                path: "",
                curBranch: "master",
                codeData: "",
                title: "",
                mainStyle:{},
            }
        },
        created: function () {
            this.loadData()
            this.mainStyle = getEntryPageStyle(Utils)
            this.webH = Utils.env.getScreenHeight() - Config.navigatorbBarHeight - Config.statusHeight
            if(Utils.env.isIPhoneX()) {
                this.webH  = this.webH  - 44
            }

        },
        methods: {
            loadData() {
                this.userName = this.getQuery().userName
                this.reposName = this.getQuery().reposName
                this.path = this.getQuery().path
                this.curBranch = this.getQuery().curBranch
                this.title = this.getQuery().title
                if(this.isPreparing()) {
                    return
                }
                repository.getReposFileDirDao(this.userName, this.reposName, this.path, this.curBranch, "text")
                    .then((res) => {
                        if (res && res.result) {
                            let startTag = `class="instapaper_body `;
                            let startLang = res.data.indexOf(startTag);
                            let endLang = res.data.indexOf(`" data-path="`);
                            let lang;
                            if (startLang >= 0 && endLang >= 0) {
                                let tmpLang = res.data.substring(startLang + startTag.length, endLang);
                                if (tmpLang) {
                                    lang = formName(tmpLang.toLowerCase());
                                }
                            }
                            if (!lang) {
                                lang = 'java'
                            }
                            if ('markdown' === lang) {
                                this.codeData = generateHtml(res.data)
                            } else {
                                this.codeData = generateCode2HTml(res.data, Config.webDraculaBackgroundColor, lang)

                            }
                        } else {
                            this.codeData = "<h1>不支持打开</h1>"
                        }
                    })
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
        }
    }
</script>

<style scoped>
</style>


