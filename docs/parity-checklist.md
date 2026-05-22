# Parity Checklist：原 Weex vs 当前 uni-app 实现

> 用法：以 [docs/legacy-spec.md](file:///d:/workspace/project/GSYGithubAppWeex/docs/legacy-spec.md) 为基准，逐页核对当前 uni-app 工程是否落地。
> 图例：✅ 已对齐 / ⚠️ 部分对齐（带 TODO）/ ❌ 未实现 / N/A 不适用。
> 验证手段：①静态阅读 src/pages 与 components；②本地 H5 dev server + Playwright headless（脚本在 `%TEMP%/gsy-e2e/e2e.mjs`，不在工程内）；③手动浏览器跑。

---

## 1. 路由 / 页面

| 原工程 (router.js) | 当前 uni-app (pages.json) | 状态 | 备注 |
|---|---|---|---|
| `/` WelcomePage | [pages/welcome/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/welcome/index.vue) | ✅ | navigationStyle:custom；2s 后 reLaunch 到 main / login |
| `/login` | [pages/login/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/login/index.vue) | ✅ | 改为 PAT 登录（GitHub 已废 Basic Auth）；UI 用 GSY 主题色 + logo |
| `/main` | [pages/main/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/main/index.vue) | ✅ | 自画 navbar + scroll-view + MainTabBar；events 列表 30 条，e2e 已验证 |
| `/main` 内嵌 DynamicPage | [pages/main/index.vue](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/main/index.vue)（合一） | ✅ | 直接把 DynamicPage 合并到 main，简化 keepAlive |
| `/main` 内嵌 TrendPage | [pages/trend/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/trend/index.vue) | ✅ | 拆为独立路由，由 MainTabBar 切换；接入 GSY 官方 trend API + 三级回退 + 10 语言 chip；e2e 验证 19 条真实数据 |
| `/main` 内嵌 PersonPage | [pages/person/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/person/index.vue) | ✅ | 同上拆为独立路由；UserHeadItem 5 列计数已加分跳 |
| `/user/:userName/repository/:reposName` RepositoryDetailPage | [pages/repository-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/repository-detail/index.vue) | ✅ | 4 tab + 4 操作 + branch popover；e2e 已验证 4 tab click 可点 + README 不重拉 |
| `/user/:userName` UserInfoPage | [pages/user-info/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/user-info/index.vue) | ✅ | 5 个 bottom-item 已对齐 |
| `code` CodeDetailPage | [pages/code-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/code-detail/index.vue) | ✅ | generateHtml / generateCode2Html + Dracula 主题（CDN dracula.min.css + WEB_DRACULA_BACKGROUND_COLOR）已落地 |
| `/user/:u/repository/:r/issueNum/:n` IssueDetailPage | [pages/issue-detail/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/issue-detail/index.vue) | ✅ | 底部 4 操作栏（回复/编辑/关闭\|打开/锁定\|解锁）+ 评论长按弹层（编辑/删除/复制）+ scroll-view 分页 + 下拉刷新 + busy mask |
| `/common` CommonListPage | [pages/common-list/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/common-list/index.vue) | ✅ | 7 种 dataType 分支已打通 |
| `/search` SearchPage | [pages/search/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/search/index.vue) | ✅ | 保持原 2 tab（仓库/用户）+ 搜索历史（uni.storage 最多 10 条 + 清空按钮 + 点击回填） |
| `/web` WebPage | [pages/web/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/web/index.vue) | ✅ | uni web-view + url 透传 |
| `/edit` EditIssuePage | [pages/edit-issue/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/edit-issue/index.vue) | ✅ | 4 种 type（createIssue/editIssue/commentIssue/editComment）+ 标题/正文输入 + 按 type 切换 navTitle/headerHint/bodyPlaceholder/needTitle/端点 |
| `/setting` SettingPage | [pages/setting/index](file:///d:/workspace/project/GSYGithubAppWeex/src/pages/setting/index.vue) | ✅ | 关于 cell + 红色"退出登录" 已实现；e2e 已验证 logout 按钮可见 |
| ~~RepositoryDetailInfoPage~~ | 已删除路由 | ✅ | 在 RepositoryDetailPage 4 tab 内 v-show 实现，独立路由作冗余移除 |
| ~~RepositoryFileListPage~~ | 已删除路由 | ✅ | 同上 |
| ~~RepositoryIssueListPage~~ | 已删除路由 | ✅ | 同上 |

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

1. ⚠️ **RepositoryDetailPage Info tab 内"动态/提交"二级切换**：当前合并为"动态" tab，commit/event 切换尚未补完，与原 Weex 行为略有差异（不影响主路径）
2. ⚠️ **iOS 真机回归**：windows 环境无法验证，待 Mac 环境补
3. ⚠️ **小程序端 e2e**：当前自动化仅覆盖 H5，小程序端走 @dcloudio/uni-automator 待加

---

## 7. 自动化回归 (Playwright headless)

脚本路径：`%TEMP%\gsy-e2e\e2e.mjs`（不在工程内，零 cooldown 污染）。
依赖：`playwright@1.59.1`（>15 天冷却线）+ chromium。
启动：

```powershell
# 1) 起 dev:h5
cd d:\workspace\project\GSYGithubAppWeex
npm run dev:h5    # 端口默认 8080（被占用会自动顺延 8081/8082...）

# 2) 跑 e2e（用本机 PAT 测试）
cd $env:TEMP\gsy-e2e
$env:E2E_BASE = "http://localhost:8080"
$env:GH_TOKEN = "ghp_xxx..."
node e2e.mjs
```

最近一次运行（14/14 PASS）：

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
PASS  trend: navigated via uni.reLaunch
PASS  trend: filter items  -> count=3
PASS  trend: language chips  -> count=10
PASS  trend: list loaded  -> count=19 (real GSY API data)
```

artifacts/ 下产物：截图 01-after-welcome.png ~ 06-setting.png + console.log + results.json。
