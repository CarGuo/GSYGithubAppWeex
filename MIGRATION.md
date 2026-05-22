# 迁移说明：从 Apache Weex 迁移到 uni-app

> 本文档伴随 `feat/migrate-uniapp` 分支落地。请先阅读 [README.md](./README.md) 了解新工程整体；本文聚焦"为什么迁、怎么迁、还剩什么"。

---

## 1. 背景与动机

### 1.1 Apache Weex 的现状

| 时间 | 事件 |
|---|---|
| 2016-12 | 阿里巴巴将 Weex 捐给 Apache 基金会，进入孵化器 |
| 2018 | 从孵化器毕业，成为 Apache 顶级项目 |
| 2019–2021 | 社区活跃度持续下降 |
| **2022-06** | **进入 [Apache Attic](https://attic.apache.org/projects/weex.html)（项目坟场），官方不再发布版本，不再修复任何安全/兼容性问题** |

### 1.2 npm 生态状况

* `weex-vue-render`、`weex-loader`、`weex-toolkit`、`weex-js-runtime` 等核心包最近一次有意义发布停留在 2019–2020。
* Vue 2（Weex 唯一支持的 Vue 版本）已于 **2023-12-31 EOL**。
* 老 Weex 工具链依赖 `node-sass^4`、`webpack^3`、`babel-core^6`，在 Node 18+ 下会因 native binding、glob 1.x、URL Whatwg 等差异编译失败。

### 1.3 用户需求约束

用户提出三条硬要求：
1. **依赖必须使用近期发布版本**；
2. **15 天供应链冷却**：包发布时间 < 15 天的版本禁止安装（防 npm typosquat / supply-chain 攻击）；
3. **要可跑、能 e2e、能 release**。

在 Weex 生态下第 1、3 两条已不可能满足（生态 5 年没动了）；只能换框架。

---

## 2. 候选方案对比

| 方案 | 端覆盖 | 与 Vue 兼容 | 鸿蒙 | 维护活跃度 | 工作量 |
|---|---|---|---|---|---|
| **uni-app（传统 Vue 3 版）** | H5 / 小程序 / Android / iOS | yes 直接复用 Vue 模板 | no | 高 | 中 |
| uni-app x（uvue + UTS） | + HarmonyOS Next | no 改写为 UTS 语言 | yes | 高 | 高 |
| React Native | Android / iOS | no 完全异构 | partial 第三方支持 | 高 | 极高 |
| Flutter | 全端 | no 完全异构 | yes | 高 | 极高（已有 Flutter 版） |

最终选 **uni-app 传统版**：
* 旧工程是 Vue 模板，迁移路径最直接；
* 不需要鸿蒙；
* 一次构建覆盖 H5 + 微信小程序 + Android/iOS App；
* DCloud 至 2026 仍在每月滚动发版，包发布密度可满足"15 天内有合规版本"。

---

## 3. 关键技术决策

### 3.1 uni-app 版本号选择

uni-app 的 dist-tag 设计较特殊：
* `latest` 指向 **vue 2 版本**（兼容旧项目）
* `vue3` 指向 **vue 3 版本**

我们需要 vue 3，所以**显式锁定**到 `3.0.0-5000720260410001`（2026-04-13 发布，距今 38 天，安全过冷却）。

### 3.2 Vite 5 而非 8

`npm view vite latest` = `8.0.10`（2026-04-23），但：
* uni-app 官方至 2026-04 主线适配 vite 5/6；
* vite 8 是 6 周前刚发布的大版本；
* 选 `vite@5.2.8`（2024-04-04，沉淀 25 个月）以保稳定；该版本被 `@dcloudio/vite-plugin-uni` 的 peerDependencies 钉死，不能升级。

### 3.3 axios 而非 uni.request

uni-app 自带 `uni.request` 已可工作，但：
* 拦截器、取消、超时控制不如 axios；
* 全栈类型支持差；
* `axios@1.16.0` 满足冷却（2026-05-02 发布，19 天）。

成本：H5 端体积 +13 KB（gzipped），可接受。

### 3.4 登录方式：Basic Auth -> PAT

GitHub 在 2020-11-13 起强制弃用 `POST /authorizations` 端点（返回 410）。原 Weex 工程仍使用 Basic Auth + 自动换 OAuth token 流程，已不可用。

新版改为：
* 用户在 GitHub 自助创建 [Personal Access Token (classic)](https://github.com/settings/tokens)；
* 至少勾选 `repo`、`user`、`notifications` scope；
* 在登录页粘贴 PAT，本工程仅做一次 `GET /user` 验证 PAT 有效性。

### 3.5 Trending 抓取

GitHub 没有官方 trending API。原工程 `src/core/net/trending/GitHubTrending.js` 通过：
1. 直接 fetch `https://github.com/trending/<lang>?since=daily`；
2. 用 `himalaya` 解析 HTML；
3. 提取仓库列表。

H5 端会被 CORS 阻断（github.com 不允许跨域），且 GitHub 页面结构变更频繁，长期维护成本高。

**当前实现**：[src/api/trending.ts](./src/api/trending.ts) 三级回退：

1. **GSY 官方 trend API**（`https://guoshuyu.cn/github/trend/list` + `api-token: 4d65e2a5626103f92a71867d7b49fea0`）——主路径，与同系列 RN/Flutter/Kotlin 项目一致；
2. **GitHub Search API**（`/search/repositories?q=created:>...&sort=stars`）——GSY 后端不可达时兜底；
3. **本地 mock 数据**——双双失败时保证 UI 不空白。

H5 端通过 [vite.config.ts](./vite.config.ts) 的 `/gsy-trend` 代理绕过 CORS 并注入 api-token；非 H5 端直发。GSY 后端在抓 github.com 超时时会返回 `200 + body{status:500,error}`，[trending.ts](./src/api/trending.ts) 会主动识别该错误形态并走兜底。

---

## 4. 供应链 15 天冷却策略

### 4.1 实现

[scripts/check-deps-cooldown.mjs](./scripts/check-deps-cooldown.mjs)：
1. 读 `package.json` 中 `dependencies` / `devDependencies` / `optionalDependencies`；
2. 跳过非精确版本（带 `^` `~` `>=` 或 `git://` 等）——这些应通过 lockfile 间接管理；
3. 对每个精确版本调 `https://registry.npmjs.org/<pkg>` 拿到 `time` 字段，找出该版本的发布时间；
4. 若发布时间距今 < 15 天，**fail 并退出**；
5. fallback：npmjs.org 不通时切到 `npmmirror.com`。

### 4.2 触发点

* `npm install` 自动通过 `package.json` 的 `preinstall` 钩子触发；
* CI：`npm run verify:cooldown`（独立 step，见 `.github/workflows/release.yml`）。

### 4.3 调整窗口

环境变量 `DEPS_COOLDOWN_DAYS`，默认 15，可调小用于本地快速验证。**生产 / 发版必须 ≥ 15。**

### 4.4 当前 22 个直接依赖的合规情况

执行 `npm run verify:cooldown` 输出 `[cooldown] OK — 22 package(s) pass.`；具体每个版本的发布日见 `package.json` + npm view。

---

## 5. 目录结构对比

| 旧（Weex） | 新（uni-app） | 说明 |
|---|---|---|
| `src/entry.js` + `src/router.js` + `src/store.js` | `src/main.ts` + `src/pages.json`（声明式路由）+ `src/stores/*.ts` | 路由由 pages.json 声明；store 改 Pinia |
| `src/components/*.vue`（页面） | `src/pages/<route>/index.vue` | uni-app 强制每页一个目录 |
| `src/components/widget/*.vue`（widget） | `src/components/*.vue`（待补） | 命名空间合并；本轮还未搬 |
| `src/core/net/*.js` | `src/api/*.ts` | TS + axios |
| `src/core/store/modules/*.js` | `src/stores/*.ts` | Vuex -> Pinia |
| `src/core/common/*.js` | `src/utils/*.ts` | TS 化 |
| `src/config/Config.js` | `src/config/index.ts` | TS 化 |
| `configs/webpack.*.conf.js` | `vite.config.ts` | 全部消失，由 vite 接管 |
| `platforms/android` + `platforms/ios` | `src/manifest.json` 配置 | 不再维护原生壳，最终用离线打包工程或云打包 |
| `.babelrc` `.postcssrc.js` | 已删除 | uni-app + vite 自带处理 |

---

## 5.5 UI 对齐策略（不重画原 App）

**原则**：所有可视产物按原 GSYGithubAppWeex 的设计稿/资源/色盘复刻，**不引入新视觉语言**。

### 5.5.0 强制工作流（每动一个 page 必须遵守）

任何 `src/pages/<name>/index.vue` 的新建或修改，都必须**按下面顺序**完成，不允许跳步：

1. **读原文件**：`src/components/<同名>Page.vue`（旧 Weex Vue2 实装），逐节看 template / script / style
2. **读引用 widget**：原 Page 引用的 `src/components/widget/*.vue` 全部读完，理解 list item / icon / 颜色 / 字号
3. **读 token**：[`src/config/Config.js`](./src/config/Config.js) + [`src/config/styles.scss`](./src/config/styles.scss)，确认色值、间距、iconfont 编码
4. **写差异清单**：在 PR 描述或 commit body 列出「原版 X 的 UI 元素 -> 新版用 Y 实现」的对照
5. **再写代码**：严格用对照表里的元素，不允许"想象成 GSY 风格"，不允许新造卡片/icon/色彩
6. **截图比对**（H5 dev 模式 + 原 app 截屏，并排对比）：列出还存在的差异并说明是否平台限制

**反例**（已经发生过的，必须避免）：
- [ ] 自创"两行 crumb 卡片"代替原版「水平 scroller 面包屑 ` . > a > b > `」
- [ ] 给目录 icon 涂蓝色（原版统一 `$--theme-color` 深灰）
- [ ] 给文件行加右箭头（原版只有目录才有箭头 `\ue610`）
- [ ] 用 `<pre>` 本地渲染代码（原版借 GitHub HTML 走 webview）
- [ ] 用 iconfont 编码 `\ue6e1` / `\ue63e`（原版是 `\ue793` / `\uea77`，且字体族是 `wxcIconFont`）

### 设计 token 对照（从原 [`src/config/Config.js`](https://github.com/CarGuo/GSYGithubAppWeex) 抽取）
| Token | 旧（Weex Config） | 新（[`src/uni.scss`](./src/uni.scss)） |
|---|---|---|
| 主题深灰 | `primaryColor = '#3c3f41'` | `$gsy-theme-color`、`$uni-color-primary` |
| 主题深色 | `primaryDarkColor = '#121917'` | `$gsy-theme-dark` |
| 主题浅色 | `primaryLightColor = '#42464b'` | `$gsy-theme-light` |
| 强调蓝 | `actionBlue = '#267aff'` | `$gsy-action-blue` |
| 浅灰底 | `miWhite = '#ececec'` | `$gsy-mi-white` |
| 容器底 | `subLightTextColor = '#f2f3f4'` | `$gsy-container` |
| 输入字 | — | `$gsy-input-color = #666666` |
| 灰阶 | `subTextColor = rgba(97,97,97,0.9)` | `$gsy-gray` |
| 阴影 | 旧 styles.scss `box-shadow` | `$gsy-box-shadow` |

### Utility 类（从原 [`src/config/styles.scss`] 移植到 [`src/styles/global.scss`]）
`gsy-card-white` / `gsy-card-black` / `gsy-card-black-full` / `gsy-text-line-three` / `gsy-text-line-one` / `gsy-content-text-black-bold` / `gsy-content-text-gray` / `gsy-content-text-white` / `gsy-name-text` / `gsy-name-text-theme` / `gsy-name-text-white` / `gsy-user-text-theme`，全部用 `rpx` 重写，同时保留旧名 `gsy-divider` / `gsy-text-primary` / `gsy-text-grey` / `gsy-text-error`。

### 资源迁移
- [`src/static/logo.png`](./src/static/logo.png)（77KB，原戴墨镜笑脸 logo）
- [`src/static/welcome.png`](./src/static/welcome.png)（835KB，启动闪屏背景）
- [`src/static/default_img.png`](./src/static/default_img.png)（默认头像）
- [`src/static/font/iconfont.{ttf,woff,css}`](./src/static/font/)（iconfont 字体）

### 已落地的页面对齐
- **WelcomePage** -> [`pages/welcome/index.vue`](./src/pages/welcome/index.vue)：全屏 `welcome.png`（aspectFill）+ 底部版本号
- **LoginPage** -> [`pages/login/index.vue`](./src/pages/login/index.vue)：深主题色背景 + 600rpx 居中白卡（border-radius 10rpx + box-shadow）+ 160rpx logo + "登录到 GitHub" 标题 + PAT 说明 + 主题色描边输入框 + 主题色按钮 + 主题色 switch（**注意**：因 GitHub 已弃用 Basic Auth，登录方式从用户名/密码改为 PAT）
- **MainPage** -> [`pages/main/index.vue`](./src/pages/main/index.vue)：顶部深主题色 NavigationBar（标题居中 + 右侧 iconfont 搜索图标）+ 主体白卡 + iconfont 占位
- **TrendPage** -> [`pages/trend/index.vue`](./src/pages/trend/index.vue)：今日/本周/本月 segmented + 仓库白卡（作者蓝 + 仓库名主题色加粗 + 描述灰 + 语言 chip 浅白底主题色字 + iconfont star/xing + stars-added 警告色）
- **TabBar** -> [`pages.json`](./src/pages.json) 全局 tabBar：深主题色选中、灰未选、白底，4 项（动态 / 趋势 / 搜索 / 我）

### 一处关键 bug（H5 资源路径）
`manifest.json > h5.router.base` 和 `h5.publicPath` 默认 `./`（相对路径），导致 `<image src="/static/logo.png">` 在 `pages/login/index` 路由下被解析为 `/pages/login/static/logo.png` 而 404。修复：两者均改为 `/`（站点根），见 [src/manifest.json](./src/manifest.json#L48-L59)。

### 5.6 原工程 UI 词汇表（强制 token 据点）

> 任何 page/widget 的 UI 决策必须从此表取值，不允许"想象"或"按 GSY 风格自由发挥"。
> 来源已 Read 通：[Config.js](./src/config/Config.js) / [styles.scss](./src/config/styles.scss) / [MainTabConfig.js](./src/config/MainTabConfig.js) / [RepositoryTabConfig.js](./src/config/RepositoryTabConfig.js) / [IconConfig.js](./src/config/IconConfig.js) / [iconfont.css](./src/static/font/iconfont.css) / [NavigationBar.vue](./src/components/widget/NavigationBar.vue) / [TabBar.vue](./src/components/widget/TabBar.vue) / [TopTabBar.vue](./src/components/widget/TopTabBar.vue) / [RepositoryHeadItem.vue](./src/components/widget/RepositoryHeadItem.vue) / [RepositoryItem.vue](./src/components/widget/RepositoryItem.vue) / [SearchPage.vue](./src/components/SearchPage.vue) / [DynamicPage.vue](./src/components/DynamicPage.vue) / [CodeDetailPage.vue](./src/components/CodeDetailPage.vue) / [WebComponent.vue](./src/components/widget/WebComponent.vue) / [PopoverComponent.vue](./src/components/widget/PopoverComponent.vue)。

#### 颜色（[Config.js L17-L22](./src/config/Config.js#L17-L22)）
| 名称 | 值 | 用途 |
|---|---|---|
| primaryColor | `#3c3f41` | 主题色，顶栏 / 深卡 / 主题 tab 选中字 |
| primaryDarkColor | `#121917` | 深色衬底 |
| primaryLightColor | `#42464b` | webDracula 等略浅 |
| actionBlue | `#267aff` | userName 链接色、强调 |
| miWhite | `#ececec` | 浅白底 chip / 浅分割 |
| webDraculaBackgroundColor | `#282a36` | code-detail webview 背景 |
| subTextColor | `rgba(97,97,97,0.9)` | 灰阶副文字 |
| subLightTextColor | `#f2f3f4` | page 容器底 |

#### 尺寸（750 设计稿，rpx 一致）
| 名称 | 值 | 用途 |
|---|---|---|
| navigatorbBarHeight | `100rpx` | 顶栏（不含 status bar） |
| statusHeight | `32rpx` | iOS 状态栏占位（H5 用 safe-area） |
| mainTabBarHeight | `120rpx` | 主页底部 tabBar |
| reposDetailTopTabBarHeight | `80rpx` | 仓库详情 4tab |
| controlBarHeight | `80rpx` | "动态/提交"切换条 |

#### iconfont（family **必须** 是 `wxcIconFont`，已在 [global.scss](./src/styles/global.scss#L12-L18) 注册）
| 用途 | unicode | 用在哪 |
|---|---|---|
| 动态 tab | `\e684` | 主页底 tab 1 |
| 推荐 tab | `\e818` | 主页底 tab 2 |
| 我的 tab | `\e6d0` | 主页底 tab 3 |
| 搜索 | `\e61c` | 顶栏右上 / SearchPage |
| 返回 | `\e78a` | 顶栏左上 |
| 右箭头 | `\e610` | 文件目录行 / cell 跳转 |
| 目录 | `\e793` | RepositoryFileListPage |
| 文件 | `\ea77` | RepositoryFileListPage |
| star/watchers | `\e643` | RepositoryHeadItem |
| forks | `\e67e` | RepositoryHeadItem |
| subscribers | `\e681` | RepositoryHeadItem |
| issues | `\e661` | RepositoryHeadItem |
| GitHub | `\ea0a` | "在 GitHub 打开"等 |
| 评论 | `\e6ba` | IssueItem |
| user | `\e63e` | RepositoryItem 作者行 |

#### 卡片体系（[styles.scss L26-L33](./src/config/styles.scss#L26-L33)，已迁到 [global.scss L150-L173](./src/styles/global.scss#L150-L173)）
| class | 宽 | 背景 | 圆角 | 用途 |
|---|---|---|---|---|
| `card-white-wrapper` | 700rpx | `#fff` | 10rpx | RepositoryItem 列表卡 |
| `card-black-wrapper` | 710rpx | `$gsy-theme-color` | 15rpx | RepositoryHeadItem 顶部卡 |
| `card-black-full-wrapper` | 100% | `$gsy-theme-color` | 15rpx 仅下圆 | 顶栏直连大块（如详情顶部融合） |

#### 主页 tabBar（[MainTabConfig.js L8-L22](./src/config/MainTabConfig.js#L8-L22)）
- 文案：**动态 / 推荐 / 我的**（不是"动态/趋势/我"——要修 [pages.json L130-L142](./src/pages.json#L130-L142)）
- 选中字色：`primaryColor`，未选中：`subTextColor`
- 背景：`#fbfbfb`，iconFontSize：`40px`
- 实现：用 codePoint 渲染（uni 内置 tabBar 不支持 iconfont，必须自画 [components/widget/TabBar.vue](./src/components/widget/TabBar.vue) 等价物）

#### 仓库详情顶 4tab（[RepositoryTabConfig.js](./src/config/RepositoryTabConfig.js)）
- 文案：**详细信息 / 动态 / 文件 / Issue**
- 背景：`primaryColor`，选中字白 `#FFFFFF`，未选中字 `subTextColor`

#### 顶部 NavigationBar（[NavigationBar.vue L1-L46](./src/components/widget/NavigationBar.vue#L1-L46)）
- 满宽 `750rpx` + 主题色背景 + box-shadow
- 标题居中 36rpx 白字
- 左右 30rpx wxcIconFont icon 各占 100rpx

#### "动态/提交"切换 control-container
- 条高 80rpx，主题色背景，左右 30rpx 圆角，文字白色 32rpx
- 活动项：略浅 `primaryLightColor` 圆角条衬底

---

## 6. 页面迁移落地

15 个页面全部迁移完成（与 [pages.json](./src/pages.json) 一致），详情见 [docs/parity-checklist.md](./docs/parity-checklist.md) 的 parity 矩阵：

| 路由 | 原工程文件 | 状态 |
|---|---|---|
| `pages/welcome/index.vue` | `WelcomePage.vue` | [x] |
| `pages/login/index.vue` | `LoginPage.vue` | [x] PAT 登录 |
| `pages/main/index.vue` | `MainPage.vue` + `DynamicPage.vue` | [x] 合一 |
| `pages/trend/index.vue` | `TrendPage.vue` | [x] GSY 官方 API + 三级回退 + 10 语言 chip |
| `pages/person/index.vue` | `PersonPage.vue` | [x] |
| `pages/search/index.vue` | `SearchPage.vue` | [x] 仓库/用户 2 tab + 搜索历史 |
| `pages/setting/index.vue` | `SettingPage.vue` | [x] |
| `pages/repository-detail/index.vue` | `RepositoryDetailPage.vue` + 三个 sub Tab | [x] 4 tab 内 v-show + Star/Watch/Fork/Branch + tab 切不重拉 |
| `pages/user-info/index.vue` | `UserInfoPage.vue` | [x] |
| `pages/code-detail/index.vue` | `CodeDetailPage.vue` | [x] Dracula 主题 |
| `pages/issue-detail/index.vue` | `IssueDetailPage.vue` | [x] 4 操作栏 + 评论长按弹层 + 分页 |
| `pages/edit-issue/index.vue` | `EditIssuePage.vue` | [x] 4 种 type |
| `pages/common-list/index.vue` | `CommonListPage.vue` | [x] 7 dataType 分支 |
| `pages/web/index.vue` | `WebPage.vue` | [x] |
| `pages/dynamic/index.vue` | `DynamicPage.vue`（独立入口保留） | [x] |

**冗余路由清理**：原 `RepositoryDetailInfoPage` / `RepositoryFileListPage` / `RepositoryIssueListPage` 这 3 个独立路由已被 RepositoryDetailPage 4 tab 内的 v-show 实现替代，独立路由文件已删除（见 commit a117106）。

---

## 7. 已知遗留问题

1. **easycom 自动注册**：[pages.json](./src/pages.json) 已配置 `^uni-(.*)` 正则，组件用即引；自定义组件（GSY 自有）放 `src/components/` 下也能 easycom，注意命名冲突。
2. **i18n 入口未启用**：vue-i18n 已在 dependencies 里，但 `main.ts` 未挂；待写 `src/locale/` 后启用。
3. **TypeScript 严格模式开启**：`tsconfig.json` strict=true；老代码搬运时会有大量 any，建议局部 `// @ts-expect-error` 标注 + Issue 跟踪。
4. **图片资源**：已从旧工程复制 `logo.png`、`welcome.png`、`default_img.png` 到 [`src/static/`](./src/static/)。
5. **iconfont**：已从旧工程复制 `iconfont.ttf` / `iconfont.woff` / `iconfont.css` 到 [`src/static/font/`](./src/static/font/)，并在 [`src/styles/global.scss`](./src/styles/global.scss) 通过 `@font-face` 注入，常用图标（`icon-shijian` 动态、`icon-rifangwenqushi` 趋势、`icon-sousuo` 搜索、`icon-ren` 我、`icon-star`/`icon-xing` 星标/分支、`icon-GitHub`、`icon-fanhui`、`icon-pinglun`）已声明对应 unicode。

---

## 8. 测试策略

### 单元测试
旧工程用 Karma + Mocha + PhantomJS，全部移除。新工程**暂未内置单测框架**；建议引入 [Vitest](https://vitest.dev/)（与 Vite 原生集成），但需校验冷却。

### E2E 测试
* H5 端：[Playwright](https://playwright.dev/)（上次 stable `1.55.x` 在 2026-04 发布，合规）
* 小程序端：[@dcloudio/uni-automator](https://npmjs.com/package/@dcloudio/uni-automator)（已在 devDependencies）
* App 端：手工 + adb 真机；自动化方案推荐 Appium 2 + WebDriverIO

### 真机回归
* Android：`adb install -r dist/build/app-plus/...apk`，按 README "Android 真机/模拟器调试" 步骤；
* iOS：必须 Mac + Xcode + 离线打包工程，windows 环境无法验证。

---

## 9. 后续 Roadmap

* [x] 完成 15 个页面迁移
* [x] 关键 widget 组件就地内联（EventItem / IssueItem / IssueCommentItem / RepositoryItem / RepositoryHeadItem / UserHeadItem / UserItem / FileItem / NavigationBar / TabBar / TopTabBar / WebComponent / 长按弹层 等）
* [x] 接入 GSY 官方 trend API（替代原 himalaya 爬虫）
* [x] Playwright H5 e2e（14/14 PASS，含 trend 真实数据）
* [x] git 历史 author 全量重写为 `carguo <35936982@qq.com>`
* [x] 合并 `feat/full-features` -> `master`，发布 `v2.0.0-uniapp` GA
* [ ] vue-i18n 入口接入 + 抽出现有中文 hardcode（保持原工程默认中文行为）
* [ ] 引入 Vitest 单测覆盖 stores / utils
* [ ] iOS 端真机验证（需 Mac 环境）
* [ ] 小程序端 e2e 接 @dcloudio/uni-automator
* [ ] RepositoryDetail Info tab 内"动态/提交"二级切换补完

---

## License

MIT
