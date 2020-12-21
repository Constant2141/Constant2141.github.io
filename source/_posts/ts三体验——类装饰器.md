---
title: ts三体验——装饰器和演算
date: 2019-07-19 10:07:26
tags: [ts]
---



### 装饰器
运行时间：在定义后直接运行
执行顺序：从下到上
####  类装饰器

接受一个参数
```js
function test(target:new(...args:any[]) => object) {}

function test(target:Function)  {}
```
返回值类型分两种
- void：仅仅运行函数
- 返回一个新的类：新类替换旧类。利用这个可以给新类extends旧类(target)来增强功能，但是会失去类型检查，尽量不适用
- 

#### 属性装饰器
接受两个参数
```js
function d(target: any, key: string) {
}
```

1. 如果是静态属性，表示类本身（构造函数），如果是实例属性，表示类的原型（prototype）
2. 一个string，表示属性的名字



#### 方法装饰器

```js
function test(target: any, key: string, descriptor: PropertyDescriptor) {}
```
接受三个参数
1. 如果是静态属性，表示类本身（构造函数），如果是实例属性，表示类的原型（prototype）
2. 一个string，表示属性的名字
3. 描述符对象

#### 参数装饰器

接受三个参数
1. 如果是静态属性，表示类本身（构造函数），如果是实例属性，表示类的原型（prototype）
2. 方法名称
3. 在参数列表中的索引


#### 自动注入元数据
前提条件是：安装reflect-metadata，导入该库，在某个成员添加了元数据，并启动了emitDecoratorMetadata
在编译结果中，约束的类型会作为元数据加入，这样类型检查有机会在与运行时进行


#### 工具库

##### reflect-metadata
作用:保存元数据
使用方法：安装后，import "reflect-meatdata",就可以使用全局变量
+ 在需要装饰的地方用 @Reflect.metadata(Key, Value)
+ 要获取定义过的元数据，Reflect.getMetadata(Key, target,prop?)
+ 判断是否具有某个元数据Reflect.hasMetadata(Key, target, prop?);
+ 直接定义元数据Reflect.defineMetadata(Key, Value, target，prop?);
##### class-validator
```js
import "reflect-metadata"
import{ IsNotEmpty, validate, MinLength, MaxLength }from "class-validator"

class RegUser{
    @IsNotEmpty({message:"账号不能为空"})
    @MinLength(5,{message:"至少5个字"})
    @MaxLength(12,{message:"至多12个字"})
    loginId:string
    loginPwd:string
    
    age:number
    gender:'male'|'female'
}


const post = new RegUser()
// post.loginId = "asfsd"
validate(post).then(err => {
    console.log(err);
    
})
```
##### class-transformer
作用：将平面对象转换为类
应用：假设一个应用场景，有一个用户数组，每个元素都是一个用户对象
```js
[{
  "id": 1,
  "firstName": "Johny",
  "lastName": "Cage",
  "age": 27
},
{
  "id": 2,
  "firstName": "Ismoil",
  "lastName": "Somoni",
  "age": 50
},
{
  "id": 3,
  "firstName": "Luke",
  "lastName": "Dacascos",
  "age": 12
}]
```
现在有一个用户类
```js
export class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
 
    getName() {
        return this.firstName + " " + this.lastName;
    }
 
    isAdult() {
        return this.age > 36 && this.age < 60;
    }
}
```
当拿到用户数组的时候，就算类型约束成为User类，即使我们知道这里的每个元素的的确确都是用户类，但是ts不会把对象转换为类，所以不能访问类定义的方法，依旧只能访问自身的属性。此时使用class-transformer库里面的 plainToClass()方法可以把平面对象转换为class
```js
fetch("users.json").then((users: Object[]) => {
    const realUsers = plainToClass(User, users);
    // 现在realUsers数组里面的每个元素就都是User类了
});
```


#### 类型演算
typeof作用于类的时候，得到的是类的构造函数

keyof作用于类、接口、类型别名，可以获取这些类型的所有成员名组成的联合类型
```
interface User{
    id:string
    pwd:string
    age:number
}
function printProp(obj:User,prop:keyof User){
    console.log(obj[prop]);
}
```


in 通常和 keyof联用，限制索引器的取值范围，类型演算

```ts
interface User{
    id:string
    pwd:string
    age:number
    createDate:Date
}

type Userstring= {
//将user的成员类型都转换成string
    [prop in keyof User]:string
}

//下面三个在lib有定义，可以直接作为泛型类型使用
//将user的成员都设置为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

//只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

//非空
type Required<T> = {
    [P in keyof T]-?: T[P];
};

//剔除T中能赋值给U的类型
type Exclude<T, U> = T extends U ? never : T;

//只保留T中能复制给U的类型
type Extract<T, U> = T extends U ? T : never;


NonNullable<T> 去掉null和undefined类型

ReturnType<T> 得到函数返回值的类型  传入的T是函数的类型，不是函数，可以用typeof

InstanceType<T>  得到构造函数的实例类型

```








