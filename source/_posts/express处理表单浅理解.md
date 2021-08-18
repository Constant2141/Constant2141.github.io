---
title: express处理表单浅理解
date: 2018-07-16 22:25:56
tags: [Express]
categories: 
- 后端
- Node
cover: https://picsum.photos/seed/20180716/500/300
thumbnail: https://picsum.photos/seed/20180716/500/300
toc: true
---

<font  face="Georgia" size=4 color=cray>了解了使用express框架如何处理表单请求
### 编码
当表单被提交（通过浏览器或AJAX）时，必须被编码。如果没有明确地指定编码，则默认为application/x-wwwform-urlencoded。
如果需要上传文件，使用multipart/form-data编码类型（并不被建议使用）。

### 处理表单的不同方式
如果method="POST"m展示表单和处理表单可以用同一个路由，因为展示只需要get请求，而处理一般是post请求，使用同一个路由是可以区分的，这一点我当初在做考核的时候倒是没有考虑到。
### 处理完后如何响应
1、 直接响应html，就是直接扔一个html
2、 303重定向 { 重定向到某一个特殊的界面，跳转成功应该去哪里，404定制界面等}

### 表单域的获取
1、对于GET请求 域放在req,query
2、对于POST请求，域放在req.body中，需要引入一个body-parser 很常用的





