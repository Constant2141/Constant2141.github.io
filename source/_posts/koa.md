---
title: Koa
date: 2019-07-17 16:26:54
tags: [Koa]
categories: 
- 后端
- Node
cover: https://picsum.photos/seed/20190717/500/300
thumbnail: https://picsum.photos/seed/20190717/500/300
toc: true
---
###  ctx里面的常见参数
ctx.method/url/path/query/ip

throw() 
assert(!condition,statuscode,xxxxx)会把错误信息暴露在前端，当第一个参数的条件不满足执行后面的

ctx.status 设状态码
ctx.redirect 重定向
ctx.attachment下载文件
ctx.state.变量名  用来设置全局变量

```js
ctx.status = 301||302
ctx.redirect = '/xx.html'
```

### 文件的坑
使用koa-body 或者koa-better-body 获取上传的文件的坑
新版本的koa-body通过ctx.request.files获取上传的文件 。现在用这个
旧版本的koa-body通过ctx.request.body.files获取上传的文件 ,史诗巨坑

读文件可以用await-fa模块

koa-better-body还可以用ctx.request.fields获取各种类型的请求参数
其中文件的写法式ctx.request.fields.file 等价于 ctx.request.files


能用绝对路径的不要用相对，引入path模块，path.resolve(_dirname,'./xxx')

### 中间件的坑
使用中间件，一定要写next(),并且next()前面一定要有await()，不然会莫名其妙404


要做集中处理错误信息router.all('*',async(ctx,next)=> {
    try{}catch{}  
})

使用中间件是.use   写规则是.all 



### cookie
设置cookie
ctx.cookies.set(name, value, [options])
options里面可以写maxAge

获取cookie
ctx.cookies.get('name');


### session
```js
在app.js设置
app.keys = ['some secret hurr'];//放置一堆key

const CONFIG = {
   key: 'koa:sess',   //修改key的名字
   maxAge: 86400000,  // cookie的过期时间 
   signed: true,   //签名默认true
   renew: true,  //过期自动刷新
};
app.use(session(CONFIG, app)); //第二个参数是app，注意
```
设置值 ctx.session.username = "张三";

获取值 ctx.session.username



### 允许跨域
有专门的中间件，不用写那一串了
```js
var cors = require('koa2-cors');
app.use(cors())
```


### gzip压缩页面
加快网页的加载速度
```js
const koa = require('koa');
const compress = require('koa-compress');
const app = koa()；

const options = { threshold: 2048 };
 app.use(compress(options));
```


websock，reg，webpack，es6
