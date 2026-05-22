![logo](./logo.png)

# GSY GitHub App · uni-app 版

> 一款跨平台开源 GitHub 客户端 App。**本仓库已从 Apache Weex 迁移到 [uni-app](https://uniapp.dcloud.net.cn/)（Vue 3 + Vite）**。
> 旧版（Weex）代码保留在 `master` 分支历史中，新版迁移工作位于 [`feat/migrate-uniapp`](https://github.com/CarGuo/GSYGithubAppWeex/tree/feat/migrate-uniapp) 分支。
>
> 迁移背景与详细说明：见 [MIGRATION.md](./MIGRATION.md)。

[![GitHub stars](https://img.shields.io/github/stars/CarGuo/GSYGithubAppWeex.svg)](https://github.com/CarGuo/GSYGithubAppWeex/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/CarGuo/GSYGithubAppWeex.svg)](https://github.com/CarGuo/GSYGithubAppWeex/network)
[![GitHub issues](https://img.shields.io/github/issues/CarGuo/GSYGithubAppWeex.svg)](https://github.com/CarGuo/GSYGithubAppWeex/issues)

同系列：
* React Native 版：https://github.com/CarGuo/GSYGithubAPP
* Flutter 版：https://github.com/CarGuo/GSYGithubAppFlutter
* Android Kotlin View 版：https://github.com/CarGuo/GSYGithubAppKotlin
* Android Compose 版：https://github.com/CarGuo/GSYGithubAppKotlinCompose

---

## ⚠️ 为什么从 Weex 迁走

* **Apache Weex 已于 2022-06 进入 Apache Attic（项目坟场），官方不再发布版本，不再修复任何安全/兼容性问题。**
* `weex-vue-render` / `weex-loader` / `weex-toolkit` 等核心包最近一次有意义的发布停留在 2019–2020 年。
* Vue 2（Weex 唯一支持的 Vue 版本）已于 2023-12-31 EOL，新版 Node 已无法跑通老 Weex 工具链。

详细评估、技术选型对比与替代方案请看 [MIGRATION.md](./MIGRATION.md)。

---

## 技术栈（新）

| 层 | 选型 | 版本（pinned） |
|---|---|---|
| 跨端框架 | uni-app（vue3 stable） | `3.0.0-5000720260410001` |
| 视图层 | Vue | `3.5.33` |
| 构建 | Vite | `5.2.8` |
| 状态 | Pinia | `3.0.4` |
| 网络 | axios | `1.16.0` |
| i18n | vue-i18n | `9.14.5` |
| UI 组件 | @dcloudio/uni-ui | `1.5.12` |
| TypeScript | TypeScript | `6.0.3` |

完整依赖清单见 [package.json](./package.json)；版本选择规则与冷却策略见下文。

---

## 🛡️ 供应链安全：15 天冷却策略

为防御 npm typosquat / supply-chain 攻击，本工程**强制要求所有直接依赖的 pinned 版本必须发布满 15 天**：

* 实现脚本：[scripts/check-deps-cooldown.mjs](./scripts/check-deps-cooldown.mjs)
* 触发点：
  - `npm install` 之前由 `preinstall` 钩子自动跑，违规直接拒绝安装；
  - CI 中独立 step：`npm run verify:cooldown`。
* 调整窗口：`DEPS_COOLDOWN_DAYS=30 npm install`。
* 升级新依赖时若 npm view 显示版本发布 < 15 天，请：
  1. 选稍旧但已沉淀 ≥ 15 天的版本；
  2. 或等待冷却期满；
  3. **不得**通过禁用脚本绕过。

---

## 编译运行流程

### 0. 准备
* Node ≥ 18.20（已校验 20.18.1 可用）
* 推荐使用 npm（不要混用 pnpm/yarn，仓库 `.gitignore` 已禁用其他 lockfile）

### 1. 安装
```bash
npm install
# preinstall 钩子会先跑 cooldown 校验，违规会中断安装
```

### 2. 启动 H5 dev 服务器
```bash
npm run dev:h5
# 浏览器访问 http://localhost:8080
```

### 3. 启动微信小程序 dev
```bash
npm run dev:mp-weixin
# 然后在微信开发者工具里打开 dist/dev/mp-weixin
```

### 4. 启动 App（Android / iOS）
```bash
npm run dev:app
# 产物在 dist/dev/app-plus/
# 真机调试有两种途径：
#   a) 用 HBuilderX 打开本工程，连真机或模拟器，菜单：运行 → 运行到手机或模拟器
#   b) 纯 CLI：参考下面 "Android 真机/模拟器调试" 一节
```

### 5. 生产构建
```bash
npm run build:h5         # 输出 dist/build/h5
npm run build:mp-weixin  # 输出 dist/build/mp-weixin
npm run build:app        # 输出 dist/build/app-plus，供 App 离线打包
```

---

## Android 真机/模拟器调试（CLI 模式）

uni-app 在 App 端的最终原生壳建议用 HBuilderX 云打包；如果你**坚持纯 CLI**，可走 uni-app 提供的"App 离线打包"流程：

1. `npm run build:app` 生成 `dist/build/app-plus/` 资源包；
2. 把上述资源包放进 [DCloud 提供的 Android 离线打包工程](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html) 的 `app/src/main/assets/apps/__UNI__GSYGITHUB/www/` 下；
3. 进入 Android Studio 编译 APK；
4. 真机调试：
   ```bash
   adb devices
   adb install -r app-debug.apk
   adb logcat | findstr -i "uni-app"
   ```
5. 模拟器：在 Android Studio 的 Device Manager 创建 Android 14 (API 34) 镜像并启动；其余命令与真机一致。

---

## 登录方式说明

GitHub 已于 2020-11-13 弃用 `POST /authorizations` Basic Auth 流程，本版本改为 **Personal Access Token (PAT)** 登录：
1. 打开 https://github.com/settings/tokens → Tokens (classic) → Generate new token
2. 至少勾选 `repo`、`user`、`notifications` scope
3. 复制 token 到登录页输入框

---

## 项目结构

```
.
├── scripts/check-deps-cooldown.mjs   # 供应链冷却校验脚本（preinstall 触发）
├── src/
│   ├── api/                          # 网络层（axios）+ 端点表
│   ├── config/                       # 全局常量
│   ├── pages/                        # 18 个页面
│   ├── stores/                       # Pinia stores
│   ├── styles/global.scss
│   ├── utils/                        # 工具函数
│   ├── App.vue
│   ├── main.ts
│   ├── manifest.json                 # uni-app 多端打包清单
│   ├── pages.json                    # 路由 + tabBar 声明
│   └── uni.scss                      # 全局 SCSS 变量
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 已迁移 / 待迁移页面

| 页面 | 状态 | 说明 |
|---|---|---|
| WelcomePage | ✅ 已迁 | 启动闪屏 + 自动跳登录/主页 |
| LoginPage   | ✅ 已迁 | PAT 登录 |
| MainTabPage | ⚠️ 占位 | 主 Tab 框架已就位，业务流待补 |
| TrendPage   | ✅ 已迁 | 含 mock 数据；趋势抓取需接入代理 |
| 其余 14 个页面 | 🚧 占位 | 见 [MIGRATION.md § 待迁清单](./MIGRATION.md#%E5%BE%85%E8%BF%81%E7%A7%BB%E9%A1%B5%E9%9D%A2) |

---

## 发版流程

打 tag → 触发 [.github/workflows/release.yml](./.github/workflows/release.yml)：

```bash
# 在 feat/migrate-uniapp 上确认无误后
git tag -a v2.0.0-uniapp.0 -m "Migrate to uni-app preview 0"
git push origin v2.0.0-uniapp.0
# CI 会自动打 H5 构建 + 上传 Release
```

---

## License

MIT
