![](https://github.com/CarGuo/GSYGithubAppWeex/blob/master/logo.png)

## 一款跨平台的开源Github Weex客户端App，提供更丰富的功能，更好体验，旨在更好的日常管理和维护个人Github，提供更好更方便的驾车体验～～Σ(￣。￣ﾉ)ﾉ。

#### ps 同款开源React Native版本 https://github.com/CarGuo/GSYGithubAPP

```
基于Weex开发，适配Android\IOS\Web。（开发和适配中）

项目的目的是为方便个人日常维护和查阅Github，更好的沉浸于码友之间的互基，Github就是你的家。

项目同时适合Weex的练手学习，覆盖了各种框架的使用，与原生的交互等。

随着项目的使用情况和反馈，将时不时根据更新并完善用户体验与功能优化吗，欢迎提出问题。
```
-----

### 编译运行流程

1、配置好Weex开发环境，可参阅 [【搭建环境】](http://weex.apache.org/cn/guide/set-up-env.html)

2、clone代码，根目录下执行`npm install`安装node_modules(太慢建议科学上网或使用淘宝镜像)

3、你需要自己项目src/core/common/目录下 创建一个ignoreConfig.js文件，然后输入你申请的Github client_id 和 client_secret。

     export const CLIENT_ID = "xxxx";

     export const CLIENT_SECRET = "xxxx";


     //如果需要上传七牛
     export const ACCESS_KEY = "xxxx";
     export const SECRET_KEY = "xxx";
     export const QN_HOST = "xxxx";
     export const SCOPE = "xxxx";

   [      注册 Github APP 传送门](https://github.com/settings/applications/new)，当然，前提是你现有一个github账号(～￣▽￣)～ 。

4、运行

执行 `weex run android` 运行android。

执行 `weex run ios` 运行ios。

执行 `npm run serve` 运行web（目前未详细适配）。（推荐chrome，调试模式下手机模式）


### 示例图片

<img src="https://github.com/CarGuo/GSYGithubAppWeex/blob/master/1.jpg" width="426px"/>

<img src="https://github.com/CarGuo/GSYGithubAppWeex/blob/master/2.jpg" width="426px"/>

<img src="https://github.com/CarGuo/GSYGithubAppWeex/blob/master/3.jpg" width="426px"/>

### 第三方框架

* [vue-router](https://github.com/vuejs/vue-router)
* [vuex](https://github.com/vuejs/vuex)
* [highlight.js](https://github.com/isagalaev/highlight.js)
* [weex-ui](https://github.com/alibaba/weex-ui)
* [node-sass](https://github.com/sass/node-sass)
* [url-parse url解析](https://github.com/unshiftio/url-parse)

### 常见问题

#### [点我传送](https://github.com/CarGuo/GSYGithubAppWeex/blob/master/question.md)

<img src="https://github.com/CarGuo/GSYGithubAppWeex/blob/master/thanks.jpg" width="426px"/>

### LICENSE
```
CarGuo/GSYGithubAPPWeex is licensed under the
Apache License 2.0

A permissive license whose main conditions require preservation of copyright and license notices.
Contributors provide an express grant of patent rights.
Licensed works, modifications, and larger works may be distributed under different terms and without source code.
```
