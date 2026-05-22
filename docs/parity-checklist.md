# Parity Checklist：原 Weex vs 当前 uni-app 实现

> 用法：以 [docs/legacy-spec.md](file:///d:/workspace/project/GSYGithubAppWeex/docs/legacy-spec.md) 为基准，逐页核对当前 uni-app 工程是否落地。
> 图例：✅ 已对齐 / ⚠️ 部分对齐（带 TODO）/ ❌ 未实现 / N/A 不适用。
> 验证手段：①静态阅读 src/pages 与 components；②本地 H5 dev server + Playwright headless（脚本在 `%TEMP%/gsy-e2e/e2e.mjs`，不在工程内）；③手动浏览器跑。

---

## 1. 路由 / 页面

| 原工程 (router.js) | 当前 uni-app (pages.json) | 状态 | 备注 |
|---|---|---|---|
| `/` WelcomePage | [pages/welcome/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/welcome/index.vue) | ✅ | navigationStyle:custom；2s 后 reLaunch 到 main / login |
| `/login` | [pages/login/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/login/index.vue) | ⚠️ | 改为 PAT 登录（GitHub 已废 Basic Auth），原"用户名/密码"双输入框已不可行；UI 用 GSY 主题色 + logo |
| `/main` | [pages/main/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/main/index.vue) | ✅ | 自画 navbar + scroll-view + MainTabBar；events 列表 30 条，e2e 已验证 |
| `/main` 内嵌 DynamicPage | [pages/main/index.vue](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/main/index.vue)（合一） | ✅ | 直接把 DynamicPage 合并到 main，简化 keepAlive |
| `/main` 内嵌 TrendPage | [pages/trend/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/trend/index.vue) | ⚠️ | 拆为独立路由，由 MainTabBar 切换。需复核 since/language popover 是否完整 |
| `/main` 内嵌 PersonPage | [pages/person/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/person/index.vue) | ⚠️ | 同上拆为独立路由；UserHeadItem 5 列计数已加分跳（与原行为略增强） |
| `/user/:userName/repository/:reposName` RepositoryDetailPage | [pages/repository-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/repository-detail/index.vue) | ✅ | 4 tab + 4 操作 + branch popover；e2e 已验证 4 tab click 可点 + README 不重拉 |
| `/user/:userName` UserInfoPage | [pages/user-info/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/user-info/index.vue) | ⚠️ | 没有完整复用 PersonPage，单独实现；5 个 bottom-item 已对齐（commit 55f7bae） |
| `code` CodeDetailPage | [pages/code-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/code-detail/index.vue) | ⚠️ | 需复核 generateHtml/generateCode2Html 与 Dracula 主题是否落地 |
| `/user/:u/repository/:r/issueNum/:n` IssueDetailPage | [pages/issue-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/issue-detail/index.vue) | ⚠️ | 需复核底部 4 按钮（回复/编辑/关闭/锁定）+ WxcMask 弹层是否齐全 |
| `/common` CommonListPage | [pages/common-list/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/common-list/index.vue) | ⚠️ | 需复核 7 种 dataType 分支是否都打通 |
| `/search` SearchPage | [pages/search/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/search/index.vue) | ⚠️ | 需复核仓库/用户切换 + return 触发搜索 |
| `/web` WebPage | [pages/web/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/web/index.vue) | ⚠️ | uni 用 web-view，需校验 url 透传 |
| `/edit` EditIssuePage | [pages/edit-issue/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/edit-issue/index.vue) | ⚠️ | 需复核 4 种 type（createIssue/editIssue/commentIssue/editComment） |
| `/setting` SettingPage | [pages/setting/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/setting/index.vue) | ✅ | 关于 cell + 红色"退出登录" 已实现；e2e 已验证 logout 按钮可见 |
| 内嵌 RepositoryDetailInfoPage | [pages/repository-detail-info/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/repository-detail-info/index.vue) | ⚠️ | 当前作为独立路由，但 RepositoryDetailPage 是按 v-show 在主页面内切 4 tab；该页可能已失效或冗余 |
| 内嵌 RepositoryFileListPage | [pages/repository-files/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/repository-files/index.vue) | ⚠️ | 同上，当前 detail 页内 v-show "源码" tab 已合并；需确认是否还有别的入口 |
| 内嵌 RepositoryIssueListPage | [pages/repository-issues/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/repository-issues/index.vue) | ⚠️ | 同上 |

---

## 2. Store

| 模块 | 原 Vuex | 当前 Pinia | 状态 |
|---|---|---|---|
| user | userInfo / checkoutStatus / initUserInfo / doLogin / getUserInfo | [stores/user.ts](file:///d:/workspace/project/GSYGithubAppWeex/src/stores/user.ts)：`token / userInfo / loading / errorMsg + login/logout/restore` | ✅ |
| event | received_events_data_list / getEventReceived | 直接在 [pages/main/index.vue](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/main/index.vue) 内 fetch，**未抽 store** | ⚠️ 简化但合理；如果将来要跨页共享再抽 |
| repository | trend_repos / getTrend | 直接在 [pages/trend/index.vue](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/trend/index.vue) 内 fetch | ⚠️ 同上 |

---

## 3. RepositoryDetailPage 4 tab 行为对比

| tab | 原 Weex | 当前 uni-app | 状态 |
|---|---|---|---|
| README | `<web :srcdoc=...>` 内嵌 GitHub 渲染 HTML | web-view + readmeSrcDoc，`Accept: application/vnd.github.html` | ✅ |
| Info（动态/提交） | RLList head + 动态/提交切 | 当前合并为"动态" tab；commit/event 切换待确认 | ⚠️ 需补完"提交"切换 |
| Files | 面包屑 + RLList | breadcrumb + scroll-view 列表 | ✅ |
| Issues | 搜索 + Open/Closed/All 过滤 + 浮动+ | 已有 onPickIssueState + addClick | ✅ |
| 4 操作（Star/Watch/Fork/Branch） | reposStarClick / reposWatcherClick / reposForkerClick / reposBranchClick | onStar / onWatch / onFork / onPickBranch | ✅ |
| **切 tab 不重拉** | (原 keepAlive) | 4 个 loaded 标志位 + force 参数 | ✅ e2e 验证 round1=1 round2=1 |

---

## 4. 跳转关系（与 legacy-spec §5 对齐）

| 链路 | 状态 | 备注 |
|---|---|---|
| Welcome → main / login | ✅ | reLaunch |
| Login → main | ✅ | reLaunch |
| Main → Search | ✅ | navigateTo |
| Main 动态卡片 → repository-detail | ✅ | e2e 验证 |
| Main → person tab | ✅ | MainTabBar 切换 |
| Person → setting | ✅ | navigateTo `/pages/setting/index` |
| Setting → 退出 → login | ✅ | reLaunch；e2e 验证按钮可见 |
| Setting → 关于（CarGuo/GSYGithubAppWeex） | ⚠️ | 需手动验证 |
| repository-detail Files → code-detail | ⚠️ | 需手动验证 |
| repository-detail Issues → issue-detail / edit-issue | ⚠️ | 需手动验证 |
| Common List → repository-detail / user-info | ⚠️ | 需手动验证 |

---

## 5. UI / 设计 token 对齐

| 项 | 原值 | 当前 | 状态 |
|---|---|---|---|
| 主题色 | `#3c3f41` | $gsy-theme-color in [uni.scss](file:///d:/workspace/project/GSYGithubAppWeex/src/uni.scss) | ✅ |
| actionBlue | `#267aff` | `#267aff` | ✅ |
| miWhite | `#ececec` | $gsy-mi-white | ✅ |
| 副文字 | `rgba(97,97,97,0.9)` | $gsy-sub-text-color | ✅ |
| iconfont (wxcIconFont) | woff/ttf | [src/static/font](file:///d:/workspace/project/GSYGithubAppWeex/src/static/font) | ✅ |
| 卡片宽度 700/710rpx | 700/710rpx | 已用 700rpx 卡片样式 | ✅ |
| control-container 圆角 30rpx | 30rpx | 30rpx | ✅ |
| navbar 自画 + 状态栏高度 | NavigationBar.vue | navigationStyle:custom + statusBarHeight 自计算 | ✅ |
| MainTabBar 自画（iconfont） | TabBar.vue | [components/MainTabBar.vue](file:///d:/workspace/project/GSYGithubAppWeex/src/components/MainTabBar.vue) | ✅ |

---

## 6. 已知待办（按优先级）

1. ⚠️ **trend 页**：since/language 双 popover 行为需手动验证；Trend 数据源（GitHubTrending 第三方爬虫）是否复刻？或改用 GitHub API search？
2. ⚠️ **repository-detail-info**：Info tab 内的"动态/提交"二级切换是否到位
3. ⚠️ **issue-detail**：底部 4 按钮 + 评论编辑/删除/复制 mask
4. ⚠️ **edit-issue**：4 种 type 分支
5. ⚠️ **search**：仓库/用户切换 + return 触发
6. ⚠️ **code-detail**：generateHtml + Dracula 主题
7. ⚠️ **冗余路由**：repository-detail-info / repository-files / repository-issues 这 3 个独立路由当前在 detail 主页用 v-show 已替代，需要决定是删除还是保留作"全屏单 tab"入口

---

## 7. 自动化回归 (Playwright headless)

脚本路径：`%TEMP%\gsy-e2e\e2e.mjs`（不在工程内，零 cooldown 污染）。
依赖：`playwright@1.59.1`（>15 天冷却线）+ chromium。
启动：

```powershell
# 1) 起 dev:h5
cd d:\workspace\project\GSYGithubAppWeex
npm run dev:h5    # 端口可能 8080~8084 自动顺延

# 2) 跑 e2e（用本机 PAT 测试）
cd $env:TEMP\gsy-e2e
$env:E2E_BASE = "http://localhost:8084"
$env:GH_TOKEN = "ghp_xxx..."
node e2e.mjs
```

最近一次运行（10/10 PASS）：

```
PASS  login: fill PAT
PASS  login: click submit
PASS  login: navigate to main
PASS  main: events cards loaded  -> count=30
PASS  repo-detail: navigated
PASS  repo-detail: tabbar items  -> count=4
PASS  repo-detail: tab click events fired  -> clicks=4
PASS  repo-detail: README fetched first time  -> count=1
PASS  repo-detail: README not refetched on tab back  -> round1=1 round2=1
PASS  setting: logout button visible
```

artifacts/ 下产物：截图 01-after-welcome.png ~ 06-setting.png + console.log + results.json。
