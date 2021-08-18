---
title: Webpack拆包
date: 2020-03-15 16:44:28
tags: [Webpack]
categories: 
- 前端
- Webpack
cover: https://picsum.photos/seed/201907101050/500/300
thumbnail: https://picsum.photos/seed/201907101050/500/300
toc: true
---

webpack打包文件vendor体积大怎么解决一直以来都是前端优化的一个关注问题，今天翻资料的时候发现webpack有一个**拆包**的功能也可以解决这个问题。
<!-- more -->

----

## 一、打包文件越来越大导致的问题

+ **首屏加载变慢**。前端框架的使用导致js文件加载完成之前只能显示空白或者少量内容。SSR服务端渲染可以改善这个现象，但是代价挺大的。
+ 页面迭代导致浏览器**缓存不可用**。
+ 公用库和框架**无法跨页面共享**。并非所有都是单页面应用，多页面应用的页面之间经常会有公用库和框架，但是对于这些，每个页面都会**重复打包**。

虽然引用的UI库例如Element—UI或者Antd都有提供按需加载的功能，可以有效减少打包文件体积，但是如果项目本身庞大需求组件多，还是会很大的。

## 二、用CDN外链引入

1. 放到cdn上，在index.html外链引入

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js" />
```

2. app.js文件import的还是要的，不然怎么注入全局

3. 修改webpack的externals

   ```json
   
   externals: {
     lodash: '_',
     highcharts: 'Highcharts'
   }
   //key是文件名，就是install那个，value是这个模块抛出的变量
```
   
   

## 三、使用CommonsChunkPlugin拆包

每使用一次该插件，会生成一个单独的文件(chunk，译作切片），这个文件中包含了多个入口chunk中的公共模块

### 配置项

name：新的切片的名称，字符串或者字符串数组，可以是已经存在的chunk的名字

chunks。需要检查、提取公用模块的chunk。

minChunks。接受一个大于等于2的数组，表示的是至少有n个chunk中公用了这个模块，才会提取出来单独打包，也可以接受一个函数，函数接受两个参数，module和count，返回值为true的模块会被提取出来

fileName。文件命名**模板**，可以使用[name]、[hash]、[id]之类的**变量占位符**。

```json
new webpack.optimize.CommonsChunkPlugin({
  name: 'charts',
  chunks: ['vendor'],
  minChunks: module => module.resource.indexOf('highcharts') > -1
}),
 
new webpack.optimize.CommonsChunkPlugin({
  name: 'ui',
  chunks: ['vendor'],
  minChunks: module => module.resource.indexOf('element-ui') > -1
})
复制代码
```



### 优点

将公用的模块提取出来单独打包

1. 不会影响正常加载
2. 有效利用浏览器缓存
3. 可以跨页面公用

