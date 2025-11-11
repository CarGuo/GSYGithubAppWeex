![](https://github.com/CarGuo/GSYGithubAppWeex/blob/master/logo.png)

## 一款跨平台的开源Github Weex客户端App，提供更丰富的功能，更好体验，旨在更好的日常管理和维护个人Github，提供更好更方便的驾车体验～～Σ(￣。￣ﾉ)ﾉ。在开发学习过程中，提供丰富的同款对比：

* ### 同款开源React Native版本 https://github.com/CarGuo/GSYGithubAPP

* ### 同款Flutter版本 ： https://github.com/CarGuo/GSYGithubAppFlutter

* ### 同款Android Kotlin View版本（ https://github.com/CarGuo/GSYGithubAppKotlin ）
  
* ### 同款Android Compose版本（ https://github.com/CarGuo/GSYGithubAppKotlinCompose ）


![公众号](http://img.cdn.guoshuyu.cn/WeChat-Code)


### [****** ***Weex之带你去蹲坑文章***  ******](https://www.jianshu.com/p/ae1d7a2b0a8a)

```
基于Weex开发，适配Android\IOS\Web。

项目的目的是为方便个人日常维护和查阅Github，更好的沉浸于码友之间的互基，Github就是你的家。

项目同时适合Weex的练手学习，覆盖了各种框架的使用，与原生的交互等。

随着项目的使用情况和反馈，将时不时根据更新并完善用户体验与功能优化吗，欢迎提出问题。
```
-----

[![GitHub issues](https://img.shields.io/github/issues/CarGuo/GSYGithubAPPWeex.svg)](https://github.com/CarGuo/GSYGithubAPPWeex/issues)
[![GitHub forks](https://img.shields.io/github/forks/CarGuo/GSYGithubAPPWeex.svg)](https://github.com/CarGuo/GSYGithubAPPWeex/network)
[![GitHub stars](https://img.shields.io/github/stars/CarGuo/GSYGithubAPPWeex.svg)](https://github.com/CarGuo/GSYGithubAPPWeex/stargazers)

## 编译运行流程

1、配置好Weex开发环境，可参阅 [【搭建环境】](http://weex.apache.org/cn/guide/set-up-env.html)

2、clone代码，根目录下执行`npm install`安装node_modules(太慢建议科学上网或使用淘宝镜像)

>### 3、重点：你需要自己项目src/core/common/目录下 创建一个ignoreConfig.js文件，然后输入你申请的Github client_id 和 client_secret。

     export const CLIENT_ID = "xxxx";

     export const CLIENT_SECRET = "xxxx";


     //如果需要上传七牛
     export const ACCESS_KEY = "xxxx";
     export const SECRET_KEY = "xxx";
     export const QN_HOST = "xxxx";
     export const SCOPE = "xxxx";

   [      注册 Github APP 传送门](https://github.com/settings/applications/new)，当然，前提是你现有一个github账号(～￣▽￣)～ 。
 
### 3、如果使用安全登录（授权登录），那么在上述注册 Github App 的 Authorization callback URL 一栏必须填入 `gsygithubapp://authed`

<div>
<img src="http://img.cdn.guoshuyu.cn/register0.png" width="426px"/>
<img src="http://img.cdn.guoshuyu.cn/register1.jpg" width="426px"/>
</div>

4、运行

执行 `weex run android` 运行android。

执行 `weex run ios` 运行ios。

执行 `npm run serve` 运行web（目前未详细适配）。（推荐chrome，调试模式下手机模式）


## 下载

### [Apk下载链接](https://www.pgyer.com/K5kU)

### Apk二维码

<img src="https://github.com/CarGuo/GSYGithubAPPWeex/blob/master/download.png" width="220px"/>


## 示例图片

<img src="http://img.cdn.guoshuyu.cn/showapp1.jpg" width="426px"/>

<img src="http://img.cdn.guoshuyu.cn/showapp2.jpg" width="426px"/>

<img src="http://img.cdn.guoshuyu.cn/showapp3.jpg" width="426px"/>

## 第三方框架

* [vue-router](https://github.com/vuejs/vue-router)
* [vuex](https://github.com/vuejs/vuex)
* [highlight.js](https://github.com/isagalaev/highlight.js)
* [weex-ui](https://github.com/alibaba/weex-ui)
* [node-sass](https://github.com/sass/node-sass)
* [url-parse url解析](https://github.com/unshiftio/url-parse)

## 常见问题👇

### [****** 点我传送 ******](https://github.com/CarGuo/GSYGithubAppWeex/blob/master/question.md)

<img src="http://img.cdn.guoshuyu.cn/thanks.jpg" width="426px"/>

## LICENSE
```
CarGuo/GSYGithubAPPWeex is licensed under the
Apache License 2.0

A permissive license whose main conditions require preservation of copyright and license notices.
Contributors provide an express grant of patent rights.
Licensed works, modifications, and larger works may be distributed under different terms and without source code.
```
