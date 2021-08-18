---
title: z-index引发的思考
date: 2020-02-27 00:16:32
tags: [CSS]
categories: 
- 前端
- CSS
cover: https://picsum.photos/seed/20200227/500/300
thumbnail: https://picsum.photos/seed/20200227/500/300
toc: true
---
## 一个小问题
故事的是从一个小小的z-index开始的。
今天突然看到一个问题。z-index 默认值是啥？以前的确没关注过这个，默认值难道不是auto，既然这么问那肯定有鬼了，盲猜又是IE的锅。

搜了一下得到答案：IE默认值是0，而FF是auto。那么这个问题算是答完了，但是隐藏在背后的知识点真的只有这些吗？于是乎引出了下面的名词

## 一个小例子
```html
<div class="container">

    <div class="inline-block">#divA display:inline-block</div>

    <div class="float"> #divB float:left</div>

</div>
```
CSS就不写了，看class名字表达意思。注意在这里是inline-block的div先写在写float的div。最后结论是，不管这两个div顺序怎样，永远是inline-block的盒子在上(用背景色区分下就能看到了)。根究原因的话就引出了本文主角之一的**层叠等级**
## 层叠等级(stacking level)
![image](层叠等级.png)

所以display：inline-block会一直在float的上面。但是如果两个div都加一个opacity：0.9，那么结果变成，后面的div永远在前面的div上面

## 层叠上下文(stacking context)
层叠上下文的元素层叠顺序是看z-index。但是这个z-index只在父级层叠上下文有意义。如果父级的z-index小于一个同级的，那么这个父级的子元素z-index设置再大也没用。

触发层叠上下文的常用的方式有
1. 根元素 (HTML),
2. 绝对相对固定定位
3. flex的item
4. opacity
5. transform 
6. filter
7. will-change
8. mix-blend-mode
9. isolation

值得一提的是，上面这些不取默认值的才算

值得二提的是，4-7正好是触发硬件加速的四种css

值得三提的是，8-9正好的触发混合模式的三种方式之二？这么巧有故事吧


## 混合模式

顺便谈下混合模式，毕竟这和z-index有关系。

z-index解决的是层叠(元素覆盖)问题，而CSS混合模式解决的是元素覆盖部分如何混合(如何表现)的问题 

常用的三种css属性

+ mix-blend-mode
元素内容和元素背景的混合
[体验效果戳这里](https://www.zhangxinxu.com/study/201505/css3-css4-mix-blend-mode.html)
+ background-blend-mode
背景和背景的混合
[体验效果戳这里](https://www.zhangxinxu.com/study/201505/css3-css4-background-blend-mode.html)
+ isolation
希望混合模式只影响某一个或一些指定的元素用isolation: isolate。默认值是auto

其实只要可以创建层叠上下文的都可以起到阻断混合模式mix-blend-mode的效果，怎么创建层叠上下文看上面。特殊的是，background-blend-mode不会受影响，本来就不会影响其他元素