---
title: Affair开发初步想法
date: 2018-07-24 23:41:03
tags: [Affair]
---
今天学到的和初步想法
<!--more-->
#### 有关如何判断登录状态的简单想法
一个鉴定函数判断是不是原来的用户（密码错误，全错等）
写一个islogined函数 用来判断是否登录状态，调用到authenticate，因为参数取的是req.cookie.如果cookie过时了就空，以此返回不同的值


#### get到的新知识
app.use('/', users); 这样子写是将users下所有中间件启动

>app.get(env) === development 与 process.env.NODE_ENV === 'development' 的区别
>app.get(env)获取的是env的值；
process.env.NODE_ENV获取的是 env上面NODE_ENV的值；
这两行代码在express中都有出现，意思；
还有就是 我们平时写代码一般都是 本地用开发版本；线上用生产版本
本地开发版本默认 app.get(env) = development；
线上生产版本的环境设置的就是app.get(env) = production;


#### crypto最简单的用法

```js
const crypto = require('crypto')
var hash=crypto.createHash('md5')调用加密算法，常用md5
hash.update(userName+pwd)
return hash.digest('hex')十六进制
```

### 正文：构想（跟咕咕咕的交流过程中随笔）(旁人看不懂滴)
稍微理一下思路
```js
post(,fun{
reddot fn
})

reddot fn{
}

------------------
评论{
}

-----------------
user schema{
头像:
ID:
}

event schema{
发布id::
涉及id：[ ]
标题：
状态：[1 2 3]
}

comment {
id:
content:
date{ var time=new Date( )
 time.toString}
}
```
--------------------
创建小组的功能，设计说不需要做了，倒是省了很多事，不过我想真的做出来后，之后的之后也许会继续完善
最大的难题是如何做到微信授权登录，获取微信用户的信息。尝试了putty配置，ngrok生成外网域名然后内网映射过去，查了资料，如何内网映射外网，内网穿透，最后发现貌似不需要内网穿透？？！！接下来先把能做的逻辑写出来，以及等一波菠萝的教学有关于微信授权的技能

