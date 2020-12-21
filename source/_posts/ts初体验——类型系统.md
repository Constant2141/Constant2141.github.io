---
title: ts初体验——类型系统
date: 2019-07-10 10:48:45
tags: [ts]
---
### 默认情况下，做出以下假设

1. 假设当前的执行环境是dom
2. 如果代码中没有使用模块化语句（import、export），便认为该代码是全局执行
3.  编译的目标代码是ES3


两种方式更改以上假设
1.  使用tsc命令的时候，加上选项参数
2.  使用ts配置文件，更改编译选项（使用配置文件后，用tsc命令不用跟文件名
tsconfig的生成命令是tsc --init

### 用到的辅助工具包
1. @types/node 官方的类型库，补充类型定义，相同的还有@types/jquery等
2. ts-node 编译时运行，不用生成js文件就可以运行
3. nodemon 选项参数 -e 只对什么后缀的文件监听

利用这些辅助工具可以在package.json中自定义命令
```js
"scripts": {
        "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts",
        "build": "rd /s /q dist & tsc"
    },
```
### 其他类型
1. 联合类型:多种类型选择一个，类型保护：对某个变量类型判断之后，在判断语句块中可以确定类型，typeof可以触发类型保护
2. void 用于约束函数返回值，表示没有返回
3. never 用户约束函数返回值，表示函数不能结束，一般是用于抛出异常或者无限循环
4. 字面量类型：限定只能赋值为什么
```js
字面量应用场景举例
let gender : "男"|"女"

let arr:[] arr变量只能赋值为空数组

let user ={
    name:string;
    age:number;
}
```
5. 元组 一个固定长度的数组，数组中每一项的类型确定(明确数组的长度和每一个元素)
```js
let tuarr :[string , number]
```
6. any 可以绕过类型检查，可以赋值任意类型

### 函数的相关约束

函数重载：在函数实现之前，对函数调用的多种情况声明

可选参数：可以在某些参数名后加上问号，表示该参数可以不用传递,可选参数只能在参数的末尾，可以使用多个？

默认参数值：在函数形参直接赋值，如下面例子的c初始化为0
```js
function sum(a:number,b:number,c:number = 0) {
    
}
sum(3,4)
sum(3,4,5)
```
### 枚举类型
#### 首先，为什么要用枚举

A:字面量类型可以实现一些枚举也能做到的效果，但是会出现大量的重复代码，而类型别名虽然又可以解决代码重复的问题，但是如果要修改某个值，可能会出现大量的改动,并且字面量类型不会进入编译结果，而枚举类型会进入编译结果

先举个栗子吧
```js
//字符串枚举
enum Gender{
    male:'男', //要修改的话是修改后面的真值，使用枚举类型是使用前面的字段名
    female:'女'
}

//数字枚举

enum Permission{
    Read = 1,
    Write =2 ,
    Create =4 ,
    Delete = 8
}

let gender :Gender = Gender.male
```
#### 枚举的一些注意事项
1. 枚举的值只能是字符串或者数字
2. 枚举会出现在编译结果中，表现为对象
3. 数字枚举的值会自增，如果数字枚举第一个没有赋值，那就从0开始，如果第一个赋值了，后面的就算没有赋值也会自增
4. 被数字枚举约束的变量可以直接赋值为数字，但是最好不要
5. 两种(数字，字符串)枚举的编译结果js差别挺大
```js
enum Level {
    Level1 =1,
    Level2,
    Level3
}
这是数字枚举的编译结果，可以看出是把键值对方向又赋值了一遍

var Level;
(function (Level) {
    Level[Level["Level1"] = 1] = "Level1";
    Level[Level["Level2"] = 2] = "Level2";
    Level[Level["Level3"] = 3] = "Level3";
})(Level || (Level = {}));

因此在用Object.values遍历的时候会发现有6个结果
```
6. 一个枚举中不要同时出现既有字符串字段又有数字字段
7. 尽量使用字段名，而不是真值

### 模块化

模块化标准如果设置是ES6：和正常写没有区别
模块化标准是commonjs，导出变成exports的属性，默认导出变成exports.default


```js
对于引入fs这种模块，使用module.exports导出的

1、 import * as fs from "fs";
2、 import {readFileSync} from "fs";
3、 "esModuleInterop": true,  //启动es模块化交互非es模块导出
```

如果一定要用commonjs，写法则有点像是commonjs和es6的混合
导出 export = {xxx}
导入 import xxx = require('xxx')

有关模块解析得另开一篇章节了

### 接口interface

可以通过接口之间的继承实现多种接口的组合

使用类型别名可以实现类似的组合效果，通过&，又叫交叉类型

接口与类型别名异同
1. 子接口不能覆盖父接口的成员
2. 交叉类型会把相同成员的类型进行交叉 出现既是string又是number的类型
3. 都不出现在编译结果


```js
接口约束对象，
interface User {
    name :string
    age:number
    say:()=>void或者是
    say():void
}
接口约束函数
interface condition {
    (m:number):boolean
}

```

```js
交叉类型实现interface C extends A,B
type C = {
    T3:boolean
} & A & B
```

### readonly关键字
```ts
type User = {
    readonly id :string
    name:string
    age :number
    readonly arr : readonly string[]
}
前面的readonly表示数组不能被重新赋值，但是可以push等，后面的readonly是修饰类型，不可push，pop等
const arr: ReadonlyArray<number> = [1, 23, 4, 5];
```

### class类
#### 类型的初始化检查
启动严格检查     `"strictPropertyInitialization": true `

初始化可以在三个位置进行，构造函数里或者属性位置或者构造函数参数 
属性可以设置 可选？，只读readonly
```js
class User{
   readonly id:number  //只读
    name:string
    age : number
    gender: 'man'|'female' = 'man'
    pid ?:string     //可选

    constructor(name:string,age:number){
        this.id = Math.random();
        this.name = name;
        this.age = age;
    }
}
```
#### 修饰符
public\private\protect
当某个属性通过构造函数传参，没有经过改变就直接赋值给属性的时候，利用修饰符可以属性简写

```js
class User{
    readonly id:number  
    gender: 'man'|'female' = 'man'
    pid ?:string     

    constructor(public name:string,public age:number){
        this.id = Math.random();
    }
}
```
#### 访问器
用来控制属性的赋值和读取

```js
将上面构造函数中的 public age:number 改成private _age:number
set age(value :number){
        if(value < 0){
            this._age = 0
        }else{
            this._age = value;
        }
    }

    get age(){
        return Math.floor(this._age)
    }
```
### 泛型
是指附属于函数、类、接口、类型别名之上的类型，相当于是一个类型变量，在定义时无法预先知道具体的类型，可以用泛型代替，只有调用的时候才能确定类型
多数情况下，可以通过类型推导根据传递的参数得出泛型的类型
如果无法推导，又没有写具体的泛型类型，默认为空对象

泛型约束

```js
import { log } from "util";

interface hasNamePropety {
    name: string
}


function nameToUpper<T extends hasNamePropety>(obj: T): T {
    obj.name = obj.name
        .split(' ')
        .map(s => s[0].toUpperCase() + s.substr(1))
        .join(' ');
    return obj;
}

let o = {
    name: 'zheng qingyi',
    age: 18,
}

const newo = nameToUpper(o)

console.log(newo);

```
多泛型使用
```js
function mixinArray<T,K>(arr1:T[],arr2:K[]) : (T|K)[] {
    
}
```



