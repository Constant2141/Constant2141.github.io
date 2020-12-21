---
title: prototype和和_proto_的区别
date: 2019-07-11 16:11:49
tags: [js]
---


总结一句话:_proto_这个属性的意思是，去指向自己的父亲创造自己时用的构造方法。
而prototype这个属性的意思就是，我自己生孩子（创建对象）的时候用的构造方法。

```js
function too() {
    this.t = 0;  
}
var t = new too()
console.log(t._proto_)
console.log(too.prototype)
```

Function去创造了too这个对象，而用too的too()这个构造方法，去创建了t这个对象，所以关系是function生了too,too生了t

这时用instanceof()来判断，instanceof是比较左侧的_proto_和右侧的prototype是否相同

```js
console.log(t instanceof too)  //true
console.log(too instanceof Function) //true
console.log(t instanceof Function) //true
```