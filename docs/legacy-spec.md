# 原 Weex 工程页面/功能/UI/路由 完整文档

> 用途：作为 uni-app 重构的"对照基线"。每次做功能/调样式之前，**必须先在这里查明原工程行为**，再去 `src/pages/*` 修改并对齐。
> 来源：`src/components/*Page.vue`、`src/router.js`、`src/store.js`、`src/core/net/*`、`src/mixins/index.js`。

---

## 1. 路由表（`src/router.js`）

| Path | Name | Component |
|---|---|---|
| `/` | WelcomePage | WelcomePage.vue |
| `/login` | LoginPage | LoginPage.vue |
| `/main` (keepAlive) | MainTabPage | MainTabPage.vue |
| `/user/:userName/repository/:reposName` | RepositoryDetailPage | RepositoryDetailPage.vue |
| `/user/:userName` | UserInfoPage | UserInfoPage.vue |
| `code` | CodeDetailPage | CodeDetailPage.vue |
| `/user/:userName/repository/:reposName/issueNum/:issueNum` | IssueDetailPage | IssueDetailPage.vue |
| `/common` | CommonListPage | CommonListPage.vue |
| `/search` | SearchPage | SearchPage.vue |
| `/web` | WebPage | WebPage.vue |
| `/edit` | EditIssuePage | EditIssuePage.vue |
| `/setting` | SettingPage | SettingPage.vue |

`DynamicPage / TrendPage / PersonPage / RepositoryDetailInfoPage / RepositoryFileListPage / RepositoryIssueListPage` 这 6 个不在路由里，被 MainTabPage / RepositoryDetailPage 当 tab 子组件嵌入。

---

## 2. Vuex Store（`src/store.js`）

| 模块 | state | actions | mutations |
|---|---|---|---|
| user | userInfo / checkoutStatus | initUserInfo / doLogin / getUserInfo | storeUserInfo |
| event | received_events_data_list | getEventReceived | storeEventReceived / addEventReceived |
| repository | trend_repos_data_list / trend_repos_current_size | getTrend | storeTrend |

---

## 3. 路由内 12 页 详细规格

### 3.1 WelcomePage `/`
- UI：全屏 logo + 入场动画（`animation.transition`）
- 行为：`created` 后 `setTimeout(2s)` → `dispatch('initUserInfo')` → 成功 `reset('/main')` 失败 `reset('/login')`

### 3.2 LoginPage `/login`
- UI：logo + 用户名 input + 密码 input + 登录按钮 + LoadingComponent
- 交互：`onUserNameChange / onPWChange`；登录按钮 → `onLogin` 调 `dispatch('doLogin')` → 成功 `reset('/main')`

### 3.3 MainTabPage `/main` (keepAlive)
- UI：NavigationBar（左空，右搜索）+ 底部 TabBar（动态/趋势/我的，3 列）+ 三个内嵌子页（DynamicPage / TrendPage / PersonPage）
- 交互：右上搜索 → `jumpWithParams('SearchPage', {})`；tab 切换 → `wxcTabBarCurrentTabSelected`

### 3.4 RepositoryDetailPage `/user/:userName/repository/:reposName`
- UI：NavigationBar + 顶部 TopTabBar（README/Info/Files/Issues 4 tab，每 tab 是一个独立子 page）+ 底部 4 操作栏（Star/Watch/Fork/Branch）+ Branch popover + LoadingComponent
- 交互：
  - `reposStarClick`：PUT/DELETE `/user/starred/{owner}/{repo}`
  - `reposWatcherClick`：PUT `{subscribed:true}`/DELETE `/repos/{owner}/{repo}/subscription`
  - `reposForkerClick`：POST `/repos/{owner}/{repo}/forks`
  - `reposBranchClick`：弹 popover，选分支 → 切 README / Files
  - 标题区点击 → `jumpInter('user-info')`
- 子 tab：
  - tab 1 README → 用 `getRepositoryDetailReadmeHtmlDao` 拿 GitHub html，`web` 内嵌
  - tab 2 Info → RepositoryDetailInfoPage（仓库 head + 动态/提交切换）
  - tab 3 Files → RepositoryFileListPage（面包屑 + 列表，文件跳 CodeDetailPage）
  - tab 4 Issues → RepositoryIssueListPage（搜索 + Open/Closed/All 过滤 + 列表 + 浮动 + 按钮跳 EditIssuePage(createIssue)，条目跳 IssueDetailPage）

### 3.5 UserInfoPage `/user/:userName`
- 仅是一层包装，把参数喂给 PersonPage：`<person-page :isMe="false" :needTitle="true" :jumpSetting="false">`

### 3.6 IssueDetailPage `/user/:userName/repository/:reposName/issueNum/:issueNum`
- UI：NavigationBar + RLList（IssueHeadItem 头 + IssueCommentItem 列表）+ 底部 4 按钮（回复/编辑/关闭/锁定）+ WxcMask 弹层（编辑/删除/复制）+ Loading
- 交互：
  - 回复 → `jumpWithParams('EditIssuePage', { type: 'commentIssue' })`
  - 编辑 issue → `jumpWithParams('EditIssuePage', { type: 'editIssue' })`
  - 编辑评论 → `editClick` → `jumpWithParams('EditIssuePage', { type: 'editComment' })`
  - 关闭 issue → `closeClick`（PATCH state=closed）
  - 锁定 issue → `lockClick`

### 3.7 CommonListPage `/common`
- UI：NavigationBar + RLList（按 `dataType` 复用：repos / star / follower / followed / starer / forker / watcher）
- 交互：`itemClick` 按 dataType 分支跳 RepositoryDetailPage 或 UserInfoPage

### 3.8 SearchPage `/search`
- UI：NavigationBar + WxcSearchbar + 「仓库 / 用户」切换条 + RLList
- 交互：`onControlClick` 切类型；搜索 input/return → `searchRepositoryDao`；item 点击按类型跳

### 3.9 WebPage `/web`
- UI：NavigationBar + `<web :src=url>` 内嵌网页
- 交互：仅左上返回

### 3.10 EditIssuePage `/edit`
- UI：卡片 = title input + textarea + 取消/确定 + Loading
- 交互：根据 `type` 调用不同 dao：createIssue / editIssue / commentIssue / editComment；成功 `toBack()`

### 3.11 SettingPage `/setting`
- UI：NavigationBar + Scroller（关于 Cell + 红色"退出登陆"按钮）
- 交互：
  - 关于 → `jumpWithParams('RepositoryDetailPage', { CarGuo/GSYGithubAppWeex })`
  - 退出登陆 → `user.cleanUserInfoLocal()` → `reset('login')`

### 3.12 CodeDetailPage `code`
- UI：NavigationBar + `<web-component>` 渲染 markdown 或高亮代码（generateHtml / generateCode2HTml）
- 交互：仅返回

---

## 4. 嵌入式 6 子页

### 4.1 DynamicPage（MainTab #1 动态）
- UI：RLList(EventItem 列表)
- 交互：`onLoadMore / onRefresh / itemClick(→ ActionUtils)`
- 数据：`dispatch('getEventReceived')`

### 4.2 TrendPage（MainTab #2 趋势）
- UI：顶部「时间 / 语言」按钮 + 2 WxcPopover + RLList(RepositoryItem)
- 交互：`onDailyClick / onLanguageClick / popoverDailyButtonClicked / popoverLanguageButtonClicked / onRefresh / onLoadMore / itemClick`
- 数据：`dispatch('getTrend', { since, languageType })`
- 跳转：item 点击 → `jumpWithParams('RepositoryDetailPage', {...})`

### 4.3 PersonPage（MainTab #3 我的；同时被 UserInfoPage 复用）
- UI：RLList = UserHeadItem 顶部头（avatar/name/bio + 5 列计数：仓库/粉丝/关注/星标/荣耀）+ EventItem 列表；如 `needTitle=true` 还有 NavigationBar
- 交互：
  - **`headerClick`**（jumpSetting=true 时）→ `jumpInter('setting')`，不是 jumpSetting 则不跳
  - 5 列底部计数：原工程**没有**给单独 click，整块 head 都走 `headerClick`（这是原行为，注意我之前在 person 页给底部 5 列加分跳是基于"原行为对 isMe 时只跳 setting"做了"使用增强"，要确认是不是应保留原行为）
  - `itemClick` → `ActionUtils`（事件类型分发）
- 数据：`event.getEvent` + `user.getUserInfoDao` + `getUserInfo()`(mixin)

### 4.4 RepositoryDetailInfoPage（RepoDetail #2 Info）
- UI：RLList（RepositoryHeadItem 头 + EventItem 列表，支持 Event/Commit 切换）
- 交互：`headerClick` 切 listType（事件/提交）；`onRefresh / onLoadMore / itemClick(→ ActionUtils)`
- 数据：`getRepositoryDetailDao + getReposCommitsDao + getRepositoryEventDao`

### 4.5 RepositoryFileListPage（RepoDetail #3 Files）
- UI：顶部面包屑 scroller（每段可点跳级）+ RLList(FileItem)
- 交互：`tabClick`（面包屑跳级）；`itemClick`（文件 → CodeDetailPage / 图片走 web；目录 → 进下级）
- 数据：`getReposFileDirDao(owner, repo, path, branch)`

### 4.6 RepositoryIssueListPage（RepoDetail #4 Issues）
- UI：WxcSearchbar + 全部/打开/关闭过滤条 + RLList(IssueItem) + 浮动「+」按钮
- 交互：`onControlClick` 过滤；`addClick` → `jumpWithParams('EditIssuePage', { type: 'createIssue' })`；`itemClick` → `jumpWithParams('IssueDetailPage', {...})`；搜索 input/return → `searchRepositoryIssueDao`
- 数据：`getRepositoryIssueDao` / `searchRepositoryIssueDao`

---

## 5. 跳转关系图

```
WelcomePage ──► /main 或 /login
LoginPage ──► /main
MainTabPage ──► SearchPage
   ├─ DynamicPage ──(ActionUtils)──► RepositoryDetailPage / UserInfoPage / IssueDetailPage / CodeDetailPage
   ├─ TrendPage ──► RepositoryDetailPage
   └─ PersonPage ──(headerClick)──► SettingPage
                  ──(ActionUtils)──► 各种详情
SearchPage ──► RepositoryDetailPage / UserInfoPage
UserInfoPage ──(透传 PersonPage)
RepositoryDetailPage（TopTabBar 4 子页 + 底部 4 操作）
   ├─ RepositoryDetailInfoPage（ActionUtils）
   ├─ RepositoryFileListPage ──► CodeDetailPage
   └─ RepositoryIssueListPage ──► IssueDetailPage / EditIssuePage(createIssue)
IssueDetailPage ──► EditIssuePage(commentIssue/editIssue/editComment)
EditIssuePage ──(toBack)──►
CommonListPage ──► RepositoryDetailPage / UserInfoPage
SettingPage ──► RepositoryDetailPage(CarGuo/GSYGithubAppWeex) / reset('login')
CodeDetailPage / WebPage ──(toBack)──►
```

---

## 6. 关键 API（`src/core/net/{user,event,repository}.js`）

- 用户：getUserInfoDao / cleanUserInfoLocal / getFollowerListDao / getFollowedListDao / getStarRepositoryDao / getUserRepositoryDao
- 事件：getEvent / getEventReceived / getRepositoryEventDao
- 仓库：getRepositoryDetailDao / getRepositoryDetailReadmeHtmlDao / getRepositoryStatusDao / doRepositoryStarDao / doRepositoryWatchDao / createForkDao / getBranchesDao / getReposFileDirDao / getReposCommitsDao / getRepositoryStarDao / getRepositoryForksDao / getRepositoryWatcherDao / getRepositoryIssueDao / searchRepositoryIssueDao / searchRepositoryDao / getIssueInfoDao / getIssueCommentDao / addIssueCommentDao / editCommentDao / deleteCommentDao / createIssueDao / editIssueDao / lockIssueDao

---

## 7. UI 设计 token

- 主题色 `#3c3f41`（card-black-wrapper / 头部）
- 强调蓝 `#267aff`（actionBlue）
- 浅灰 `#ececec`（mi-white 分割）
- 副文字 `rgba(97,97,97,0.9)`
- 卡片：white 700rpx / black 710rpx / black-full 100%
- control-container：710rpx 主题色 + 30rpx 圆角，active `#FFFFFF` / inactive `#AAAAAA`
- 字体：iconfont（wxcIconFont）unicode 已在 [src/static/iconfont.css](file:///d:/workspace/project/GSYGithubAppWeex/src/static/iconfont.css)
