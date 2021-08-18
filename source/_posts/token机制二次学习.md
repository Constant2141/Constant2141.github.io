---
title: Token机制
date: 2018-07-31 15:59:34
tags: [Token]
categories: 
- 后端
- Node
cover: https://picsum.photos/seed/2018073101/500/300
thumbnail: https://picsum.photos/seed/2018073101/500/300
toc: true
---
介绍了传统的session认证，token鉴权机制，以及在node中怎么应用JWT。
<!-- more -->
## 传统的session认证
   HTTP 是一种没有状态的协议，也就是它并不知道是谁是访问应用。这里我们把用户看成是客户端，客户端使用用户名还有密码通过了身份验证，不过下回这个客户端再发送请求时候，还得再验证一下。

   解决的方法就是，当用户请求登录的时候，如果没有问题，我们在服务端生成一条记录，这个记录里可以说明一下登录的用户是谁，然后把这条记录的 ID 号发送给客户端，客户端收到以后把这个 ID 号存储在 Cookie 里，下次这个用户再向服务端发送请求的时候，可以带着这个 Cookie ，这样服务端会验证一个这个 Cookie 里的信息，看看能不能在服务端这里找到对应的记录，如果可以，说明用户已经通过了身份验证，就把用户请求的数据返回给客户端。

   上面说的就是 Session，我们需要在服务端存储为登录的用户生成的 Session ，这些 Session 可能会存储在内存，磁盘，或者数据库里。我们可能需要在服务端定期的去清理过期的 Session 。

   但是这种基于session的认证使应用本身很难得扩展，随着不用客户端的增加，独立的服务器已无法承载更多的用户，而这个时候基于session认证应用的问题就会暴露出来

## 基于token机制的认证
使用token机制的身份验证方法，在服务器端不需要存储用户的登录记录。大概的流程：

+ 客户端使用用户名和密码请求登录。
+ 服务端收到请求，验证用户名和密码。验证成功后，服务端会生成一个token，然后把这个token发送给客户端。
+ 客户端收到token后把它存储起来，可以放在cookie或者Local Storage（本地存储）里。
+ 客户端每次向服务端发送请求的时候都需要带上服务端发给的token。
+ 服务端收到请求，然后去验证客户端请求里面带着token，如果验证成功，就向客户端返回请求的数据。

相比于传统sessionid都要存起来，token可以存到数据库中，但是有可能查询token的时间会过长导致token丢失（其实token丢失了再重新认证一个就好，但是别丢太频繁，别让用户没事儿就去认证）。

为了避免查询时间过长，可以将token放到内存中。这样查询速度绝对就不是问题了，也不用太担心占据内存，占不了多少内存的。

## JWT
JWT由三部分构成   头部（header）载荷（payload）签名（signature）
```js
header
{
     'typ':'JWT', //类型
     'alg':'HS256'  //加密算法
}
```
```js
payload
{  原有注册声明
    iss：jwt签发者
    sub：jwt所面向的用户
    aud：接收jwt的一方
    exp：jwt的过期时间，这个过期时间必须大于签发时间
    nbf：定义在什么时间之前，该jwt都是不可用的
    iat：jwt的签发时间
    jti：jwt的唯一身份标识，主要用来作为一次性token，从而回避重放攻击 

    公共的声明可以添加任何的信息，一般添加用户的相关信息
    "name" : "beichen"
    "admin": true
}
```

```js
    第三部分signature需要header+payload+secret
    secret是密钥，可以是随便打的字符串 (我记得string或者buffer类型？)
    secret是保存在服务器端的，jwt的签发也是在服务端的，secret就是用来进行jwt的签发和jwt的验证，所以它就是你服务端的私钥，在任何场景都不应该流露出去，一旦客户端得知这个secret，那就意味着客户端可以自我签发jwt了
   
```

## 在node中JWT的应用
用本次项目的应用举例

在这个token.js文件里，我是先封装了两个方法，一个用来生成token，一个用来解密
```js
const jwt = require('jsonwebtoken');
const secret = 'zxc' 

getToken = (data) => {
    return jwt.sign(data, secret, {
        expiresIn: "168h"
    });
}

getVerify = (token) => {
    return jwt.verify(token,secret)
}

module.exports = {
    getToken,
    getVerify
}
```

在其他涉及到token的地方，导入上面的js文件后就可以直接调用两个方法

```js
登录时生成token并返回给客户端
router.get('/login', function (req, res) { 
    var data = {
        username : 'testAccount',
    }
  
    var token = jwt.getToken(data)
    //  var username = jwt.getVerify(token).username
    res.json({
      code:200,
      username:data.username,
      userphoto:data.userphoto,
      token
     
    })
  });
  
```


```js
var jwt = require('./token');
router.post('*', (req, res,next) => {
    var token = req.body.token;
    try {
        jwt.getVerify(token);//因为是写成同步操作，所以可能出现异常，要自行捕获
    } catch (error) {
        console.log('Token过期')
       return res.json({
              msg: 'Token过期'
               })
    }
    console.log('Token未过期')
    return next();
})

```
