---
title: 从浏览器ctrl滚动实现原理引发的思考
date: 2020-04-04 23:14:24
tags: [浏览器]
---



今天某位小同学提出来的问题，确实从未想过这个问题。

----

## 搜搜万能的互联网怎么说的

### 第一种说法(改变html宽高)

> 在没有确定html的width和height为px情况下，是**通过缩放html标签的高度和宽度**来实现的。道理不难理解，html作为参照物，当你想放大的时候，其实浏览器执行的是缩小html的宽和高。为html设定一个所谓的绝对宽度和高，即px为单位（虽然这个也并非绝对单位），可以清晰的看到html画布的放大和缩小。
> 但是在设置了HTML的w和h后，其缩放机理还没有摸透，猜测可能是改变了document的宽和高。

利用媒体查询看看例子

```css
@media screen and (max-width: 1000px){
			body{
				background-color: red;
			}
		}
 
		@media screen and (min-width: 1001px) and (max-width: 2000px){
			body{
				background-color: blue;
			}
		}

```

结果发现ctrl滚轮放大 以及 改变整个浏览器窗口使其缩小的时候，都会变成红色，通过开发者工具的审查元素也能发现html的width的确变小了，但是答案就真的是改变了html尺寸这亚子吗

### 第二种说法(改变逻辑尺寸?)

还是从这篇原文章下面引出了笔者自己的一个想法，改变的是逻辑尺寸。但是那位笔者说

> 其实我理解的是，正确的说来，改变的是屏幕的逻辑尺寸。因为对浏览器视口进行放大或者缩小，并没有影响背景颜色，所以改变的并不是html。

![img](http://www.17qq.com/img_biaoqing/75719236.jpeg)

我调整窗口大小会影响啊，我搞错还是他搞错了呢，不管了继续看

> 假定浏览器初始值是100px，我们在屏幕上看到的是10cm，那么它就是将10cm的物理长度划分成了100份，每一份是1px。
>
> 当进行了网页放大，比如视觉上放大了一倍，那么原来代表1px的物理长度区域，只能代表0.5px，也就是说现在10cm的长度，只能表示50px。也就是说，物理上没有变化，但是逻辑上，尺寸缩小了一倍。
>
> 比如你屏幕分辨率本来是1000px，网页放大一倍以后，逻辑尺寸就变成了500px。
> 

感觉就是在讲分辨率嘛

### 第三种说法(改变zoom值)

这是在segmentfault看到的

> CSS 有 `zoom` 属性，可以控制内容的缩放。浏览器的缩放大概实现方式类似吧。至于错位问题，大部分浏览器对字体都有默认的最小值，当小于最小值后，文字并不会被缩放，导致了内容的折行，从而把布局撑开。

这个说法虽然没有和我一开始的想法分辨率挂钩，但是zoom这个属性我也去试了一下

随便挑了一个页面调整页面内容100%，然后滚动放大到125%的时候，做了一个视窗截图。和我在100%的情况下对<html>使用zoom:125%，在一些网站上是一模一样的，在一些网站上会出现错位问题，稍稍微微错位了一点，整体效果接近，这跟原文的说法一致。但是这并不能说明浏览器的ctrl+滚了的原理是这个，只能说可以这么达到实现的效果吧。

### 第四种说法(改变分辨率)

其实基本思想就是和第二种改变逻辑尺寸差不多，或者说一样了吧。放大的时候，一个物理像素覆盖了多个css像素。

这里又发现了一点，ctrl+-的时候，不同浏览器的屏幕分辨率情况不一样。


```html
物理分辨率，即显示器的当前分辨率：window.screen.width
Chrome下，缩放不影响：
    window.screen.availWidth == window.screen.width == 显示器宽度

火狐: 缩放是影响其值的：
    window.screen.availWidth == window.screen.width == (显示器宽度 / 缩放比例)
    
IE: 缩放是影响其值的：
    window.screen.availWidth == window.screen.width == (显示器主显示器宽度 / 缩放比例)
 PS: 主显示器是指，当前电脑连接多个显示器，任务栏所在的显示器为主显示器。
```

```html
浏览器可见区域分辨率：document.body.clientWidth
Chrome, FF, IE: document.body.clientWidth == (浏览器可视区域宽度 / 缩放比例)
```

### 第五种说法(这和操作系统有关)

毕竟不是浏览器比如word文档也可以ctrl+滚轮缩放

## 顺便谈下zoom这个属性

原本是IE专属的，用来清除浮动、清除margin重叠等。如今除了FF不支持，webkit内核的浏览器例如Chrome和移动端浏览器是支持的，但是用法不一样

### 在非IE下的作用

是放大两倍，`zoom:1|2`除了宽高边距也包括字体，但是这个属性是一个不标准的css属性，因此一般不用zoom来实现缩放效果，现在要放大或者缩小直接用css3的transform属性，transform才是正统标准，当然IE678依然不支持，这点就可以用zoom弥补了，刚好zoom可以支持IE678

### 在IE下的作用
除了缩放，更多的是利用他可以触发ie的hasLayou，用于清除浮动、清除margin的重叠

1. 清除浮动常用

   `overflow:hidden; `

    `_zoom:1; `

2. 解决子元素浮动时候父元素不随着自动扩大的问题（margin重叠也是），一般要在浮动元素的父元素加上`overflow:auto；` `zoom:1;`



### 和transform:scale的差异

1. zoom的缩放是相对于左上角的；而scale默认是居中缩放；
2. zoom的缩放改变了元素占据的空间大小，引起重绘回流；而scale的缩放占据的原始尺寸不变，布局不变，只会重绘不会回流
3. zoom和scale对元素的渲染[计算](https://www.aliyun.com/)方法可能有差异，效果上看zoom缩放的图片会更加清晰，scale比较模糊
4. 对文字的缩放规则不一致。zoom缩放依然受限于最小12像素中文大小限制；而scale就是纯粹的对图形进行比例控制，文字50%原来尺寸。



## 如何检查浏览器的缩放状态(兼容各种浏览器)

这里缩放不是指浏览器大小的缩放，而是指浏览器网页内容的百分比缩放

1. 不管IE6，因为 IE6 只能对文本进行缩放。
2. window.devicePixelRatio 目前Firefox、chrome等都得到了很好的支持。
    IE 的处理方法了，IE 提供了 window.screen.deviceXDPI 和 window.screen.logicalXDPI 两个属性，
3. 对于以上两种都不支持的浏览器，还可以利用window.outerWidth 和 window.innerWidth 这两个属性。

```js
function detectZoom (){
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();
  
   if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }
    
   if (ratio){
    ratio = Math.round(ratio * 100);
  }
    
   return ratio;
};
```



## 如何禁用浏览器的缩放

```js
<script language="javascript">
        var scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta && event.ctrlKey) { //IE/Opera/Chrome
                event.returnValue = false;
            } else if (e.detail) { //Firefox
                event.returnValue = false;
            }
        }

        /*注册事件*/
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        } //W3C
        window.onmousewheel = document.onmousewheel = scrollFunc;                           //IE/Opera/Chrome/Safari
    </script>  
```





window.outerWidth获取浏览器窗口外部的宽度。 它表示整个浏览器窗口的宽度，包括边栏 
window.innerWidth获取浏览器可视区域的宽度，也就是页面的宽度