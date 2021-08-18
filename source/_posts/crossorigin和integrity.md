---
title: crossorigin和integrity
date: 2020-03-13 23:37:35
tags: [HTML]
categories: 
- 前端
- HTML
cover: https://picsum.photos/seed/20200313/500/300
thumbnail: https://picsum.photos/seed/20200313/500/300
toc: true
---

一次偶然不小心点到查看github某个网址的源代码时，发现了以前从未见过的html属性crossorigin和integrity
<!-- more -->
# 一、view-source协议

view-source是一种协议，早期基本上每个浏览器都支持这个协议。后来Microsoft考虑安全性，IE就不再支持此协议。但是这个方法在FireFox和Chrome浏览器都还可以使用。 如果要在IE下查看源代码,只能使用查看中的"查看源代码"命令.。FF、Chrome在在浏览器地址栏中输入`view-source: URL`

# 二、link标签的crossorigin、integrity属性

```
 <link crossorigin="anonymous" media="all" integrity="sha512-5Bs4ERl99/u2AUfpOZF2F0cdfNby7+Vd9teUshXUBPo5CjwECR7IAEf+weI/eCk5tF7K1h3O8hd8k0+P/HePeg==" rel="stylesheet" href="https://github.githubassets.com/assets/frameworks-e41b3811197df7fbb60147e939917617.css" />
```

那么这两个属性意味着什么呢，其实之前没有注意到，有些网站使用CDN资源的时候，都会在\<link\>\<script\>\<img\>属性带上这两个属性。



## crossorigin

### 两个属性值

这个属性指定了加载资源的时候是否使用CORS。有两个值

- anonymous：发起一个跨域请求，请求头带上Origin，但是不会发送任何认证信息(不发送cookie，X.509证书和HTTP基本的认证信息)。如果服务器没有设置Access-Control-Allow-Origin：xxx。这个资源限制使用
- use-credentials。发起一个跨域请求，带上认证信息，如果服务器不设置 Access-Control-Allow-Origin:xxx限制使用
- 不设置这个属性，资源不会使用CORS加载(也就是不发送Origin),如果设置非法值，视为使用了anonymous

### 应用场景

引入跨域的脚本，如果这个脚本有错误，因为浏览器的限制（根本原因是协议的规定），是拿不到错误信息的。就算本地尝试使用 `window.onerror` 去记录脚本的错误时，跨域脚本的错误只会返回 `Script error`。

HTML5 新的规定，是可以允许本地获取到跨域脚本的错误信息，但有两个条件：一是跨域脚本的服务器必须设置 `Access-Controll-Allow-Origin`允许当前域名可以获取错误信息，二是这个 script 标签也必须有crossorigin 属性。

### 缺陷

假如允许本地获取到跨域脚本的错误信息那么，那么我们就可以通过报错信息的不一致，推断出当前访问的用户的使用痕迹；进而可以"精准"推送相关的钓鱼网站给他。

————————————————

##  





## integrity与SRI

### 起源

> SRI 是 Subresource Integrity 的缩写，直接翻译就是，子资源完整性

Web 性能优化中很重要的一点是让请求提前结束，让可缓存的资源走 CDN 是最通用的做法。CDN 服务提供商通过分布在各地的节点，让用户从最近的节点加载内容，大幅提升速度。但是 CDN 的安全性一直是一个风险点：对于网站主来说，让请求从第三方服务器经过，由第三方响应，安全方面肯定不如自己服务器可控。

我们知道 CSP的白名单机制可以减小 XSS 风险。但是针对 CDN 内容被篡改而导致的 XSS，CSP 并不能防范，因为网站所使用的 CDN 域名，肯定在 CSP 白名单之中。这时候，SRI 就应运而生了。它通过对资源进行摘要签名，来保证外链资源的完整性

目前支持 SRI 的浏览器有Chrome和FF

### 使用

在link，script，img等标签使用integrity属性

这个属性会启用 SRI 策略，浏览器会对资源进行 CORS 校验，这就要求被请求的资源必须同域，或者配置了 Access-Control-Allow-Origin 响应头。

浏览器到资源内容之后，会使用 `integrity` 所指定的签名算法计算结果，并与 `integrity` 提供的摘要签名比对，如果二者不一致，就不会执行这个资源。

### 作用

SRI 的作用是保证页面引入的第三方资源的完整性。在第三方 CDN 服务被入侵或回源被运营商劫持、文件内容被加入恶意代码时，网站如果启用了 SRI 策略，那么在支持 SRI 的浏览器下，被篡改的文件无法执行。

虽然HTTPS 也可以确保传输过程中的数据完整性，但是对于 CDN 服务器被入侵或 HTTP 回源被劫持造成的文件篡改，HTTPS 无济于事，这时 SRI 就可以派上用场，作为补充。

但是，如果网站以及 CDN 都没有使用 HTTPS，运营商可以将外链资源及 HTML 页面本身一起劫持，并将资源内容和页面中的摘要签名同步修改，让 SRI 彻底失效。

### 缺陷

大部分运营商劫持，都是为了插入广告代码。如果网站启用了 SRI，会导致篡改后的整个文件无法执行，这很可能让页面变得完全不可用。

当然，为了提高可用性，也可以增加 fallback 处理。例如，在 CDN 资源被篡改而无法加载时，转为使用本站资源：例如cdn引入JQ库，判断是否引入成功，如果没有就使用自己的资源