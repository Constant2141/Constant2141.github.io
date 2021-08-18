---
title: JavaScript代码规范
date: 2021-08-16 16:47:04
tags: [Js]
disqusId: 21081701
categories: 
- 规范
- JavaScript
cover: https://picsum.photos/seed/20210816/500/300
thumbnail: https://picsum.photos/seed/20210816/500/300
toc: true

---
规范你的JavaScript代码，仅列举一些个人觉得对日常coding中有帮助的点。推荐使用（非必须）。
<!-- more -->


### 数组
1. 使用 `Array.from` 代替展开符 `...` 映射迭代器，因为它避免了创建一个中间数组。
```js
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```
2. 在访问和使用对象的多个属性时使用对象解构。
```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

3. 使用数组展开符 ... 来拷贝数组；
4. 将一个可迭代对象转换成一个数组，用展开符 ... 代替 Array.from
```js
// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```
5. 将一个类数组对象转换成一个数组，用Array.from
```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```
6. 使用 rest 语法 ... 代替 arguments
```js
//... 明确了你想要拉取什么参数。 而且, rest 参数是一个真正的数组，而不仅仅是类数组的 arguments
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 函数