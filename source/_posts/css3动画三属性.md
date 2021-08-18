---
title: css3动画三属性
date: 2018-10-21 11:21:49
tags: [CSS]
categories: 
- 前端
- CSS
cover: https://picsum.photos/seed/20181021/500/300
thumbnail: https://picsum.photos/seed/20181021/500/300
toc: true
---
把css3里与动画有关的三个常见属性归纳到一起
<!-- more -->
## CSS3制作动画的几个属性：变形(transform)、转换(transition)和动画(animation)

### transition
transition主要包含四个属性值：
1、执行变换的属性：transition-property
2、变换延续的时间：transition-duration
3、延续时间内变换的速率：transition-timing-function
4、变换延迟时间：transition-delay.

#### transition-property
指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；indent（元素属性名）
#### transition=duration
默认值0，也就是即时。设一个延续时间单位s或者ms
#### transition-timing-function
ease 逐渐变慢
linear 匀速
ease-in 加速
ease-out 减速
ease-in-out 先加速后减速
cubic-bezier 自定义时间曲线
#### transition-delay
默认值0，也就是即时。设一个延迟时间单位s或者ms

随便一个例子
```js
  a {
    -moz-transition: all 0.5s ease-in;
    -webkit-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
  }
```

### transform
主要包括以下几种：旋转rotate、移动translate、扭曲skew、缩放scale以及矩阵变形matrix
有一点要注意的 在这里叠加多个属性是用空格分开而不是逗号

通过指定的角度参数进行2D旋转，设置的是正数为顺时针旋转，负的为逆时针旋转，例如
```js
transform:rotate(30deg)
transform:translateX(100px):
transform:skew(30deg,10deg):
transform:scale(2,1.5):
```

### animate
|值|	说明|随便备注|
|:-----|:-----|:-----|
|animation-name	|指定@keyframes的名字|
|animation-duration|	动画指定需要多少秒或毫秒完成|0表示无动画，单位可以设s秒或ms毫秒
|animation-timing-function|	规定动画的速度曲线|ease-in-out、linear等
|animation-delay|	规定在动画开始之前的延迟。|默认值是0，立即播放动画，设负值表示跳过-2s
|animation-iteration-count|	定义动画的播放次数。|默认是1，可以设置无限循环infinite
|animation-direction|	动画播放的方向|normal正常播放，alternate正方向轮转，alternate-reverse与前者相反
|animation-play-state|动画的状态|可以设running正在播放,pause暂停动画，通常在JS使用该属性object.style.animationPlayState=”paused”来暂停动画。
|animation-fill-mode|动画时间外属性|可设none，forwards，backwards，both，默认值none表示动画播完后，恢复到初始状态，forwards当动画播完后，保持@keyframes里最后一帧的属性。backwards表示开始播动画前(也就是delay时间内)，应用@keyframes里第一帧的属性，both表示forwards和backforwards都应用。