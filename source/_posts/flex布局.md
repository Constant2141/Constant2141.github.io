---
title: flex布局
date: 2018-07-21 23:47:03
tags: [CSS]
categories: 
- 前端
- CSS
cover: https://picsum.photos/seed/20180721/500/300
thumbnail: https://picsum.photos/seed/20180721/500/300
toc: true
---
今天学习了flex布局，这个布局还是挺方便的，不然老是float太多问题了
<!-- more -->

### flex由来
布局的传统解决方案，基于盒状模型，依赖 display 属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。W3C 提出了一种新的方案----Flex 布局（弹性布局），可以简便、完整、响应式地实现各种页面布

### 基本使用
任何一个容器都可以指定为 Flex 布局。   display: flex;
行内元素也可以使用 Flex 布局。         display: inline-flex;
设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效

### 六大属性
#### flex-direction(决定主轴的方向)
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：
column：
column-reverse:
#### flex-wrap
>默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
#### flex-flow
nowrap（默认）：不换行。
wrap：换行，第一行在上
wrap-reverse：换行，第一行在下方。
#### justify-content
属性定义了项目在主轴上的对齐方式。
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目<em>之间</em>的间隔都相等。
space-around：每个项目<em>两侧</em>的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
#### align-items
属性定义项目在交叉轴上如何对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
#### align-content
定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
stretch（默认值）：轴线占满整个交叉轴。
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

### 对于项目item使用的属性
#### order
定义项目的排列顺序。数值越小，排列越靠前，默认为0。
#### flex-grow
属性定义项目的放大比例，默认为0，意思是如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink
属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

#### flex-basis
在分配多余空间之前项目占据的主轴空多大。以如果设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。


#### flex
属性是前面三个的简写，默认0 1 auto
两个快捷方式 auto（1 1 auto）
                       none （0 0 auto）
#### align-self
属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto