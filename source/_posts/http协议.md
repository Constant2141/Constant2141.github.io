---
title: http协议
date: 2018-07-14 23:08:28
tags: [http]
categories:
- 计算机
cover: https://picsum.photos/seed/20180714/500/300
thumbnail: https://picsum.photos/seed/20180714/500/300
toc: true
---
### 三次握手
第一次握手：建立连接时，客户端发送SYN(同步序列编号)包（syn=j）到服务器
第二次握手：服务器收到SYN包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k）
第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手
完成三次握手，客户端与服务器开始传送数据

### CORS跨域
在响应头里面写
```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Headers': '预请求头的名字'
'Access-Control-Allow-Methods': 'POST,PUT,DELETE'
'Access-Control-Allow-Max-age': '1000（允许跨域的处理的最大期限，在这个时间内再次发起请求不需要验证了，单位是秒）'
```


### Cache-Control
要使用缓存的写法
```javascript
response.writeHead(stastus,{
'Cache-Control': 'max-age=2 s-maxage= 20private'
})
```
1.  expires 指定一个绝对的过期时间，但是如果客户端和服务端时间不同步会导致问题，而且很容易忘记自己配置的过期时间具体是多少
2. max-age 浏览器缓存 指定的是从文档被访问后的存活时间，这个时间是相对的
3. s-maxage 代理缓存
4. 存在max-age的时候会覆盖expires,在代理过程中存在s-maxage的时候会覆盖max-age
5. 加private表明只允许浏览器用缓存，代理服务器不能用;加no-store表明 都不允许使用缓存
   ![](cache.png)
  

### CSP限制

```javascript
'Content-Security-Policy': 'default-src http: https:' 
**限制跳转的域名

'Content-Security-Policy': 'default-src \'self\' 
**限制跳转的只能是内部链接

'Content-Security-Policy': 'script-src \'self\' ; form-action \'self\' 
**限制js的跳转和表单的提交

'Content-Security-Policy-Only-Report':'report-uri /repot'
只做report的请求，即使资源被限制了不想加载，也会执行代码但浏览器仍然会拦截它，并做一个report
```


