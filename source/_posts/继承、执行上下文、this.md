---
title: 继承、执行上下文、this浅理解
date: 2018-07-17 22:16:23
tags: [Js]
categories: 
- 前端
- 基础
cover: https://picsum.photos/seed/20180717/500/300
thumbnail: https://picsum.photos/seed/20180717/500/300
toc: true
---

早上瀚程扔了一个王福朋的博客，里面讲了很多有关JS CSS的东西。早上听讲了原型链，this，执行上下文等，回头也结合王福朋的博客看了一点。
+ 对象都是通过函数来创建的，但是函数又是一种对象（万物皆对象）
+  每一个函数都有一个prototype属性，这个属性的值是一个对象（属性集合），默认的只有一个构造器函数constructor，指向函数本身。
+  每个对象都有一个隐藏的属性——“__proto__”，这个属性引用了创建这个对象的函数的prototype。即：fn.__proto__ === Fn.prototype
  
>下面是一个经典的例子
```
function Fn() { }
        Fn.prototype.name = '王福朋';
        Fn.prototype.getYear = function () {
            return 1988;
        };

        var fn = new Fn();
        console.log(fn.name);
        console.log(fn.getYear());
```

### 继承
+ 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。

+ 由于所有的对象的原型链都会找到Object.prototype，因此所有的对象都会有Object.prototype的方法。这就是所谓的“继承”。

### 执行上下文
通俗说法在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空。

### this的取值
<em><font color="green">在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了</em>
分为四种情况，震惊，这么详细
>1、 构造函数中this指向new出来的对象
2、 函数作为对象的一个属性，并且被调用,this指向这个对象，如果作为属性但是不被调用，还是指向window
3、 函数用call或者apply调用，this的值取传入的参数（对象）的值
4、 全局下this指向window，普通函数调用的时候也是指向window


