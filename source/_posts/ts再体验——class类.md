---
title: ts再体验——class类
date: 2019-07-10 10:50:11
tags: [ts]
---
### 抽象成员

应用场景：父类中，知道有些成员必须要存在，但是不知道具体的值是什么，在成员前面加abstract强约束在子类中一定要实现这个成员

注意事项： 必须在抽象类中，抽象成员，不管是方法还是属性，在子类中一定要继承

### 模板模式
有些方法，所有子类实现的流程是完全一致的，只是某个步骤不一样，可以将这个方法提取到父类，在父类中完成整个流程的实现，对于实现不一致的方法，再将其做成抽象方法
```js
class Chess {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    move(targetX, targetY) {
        console.log('相同的规则1');
        console.log('相同的规则2');

        if (this.rule) {
            return true;
        }
        return false;
    }
}
class Horse extends Chess {
    constructor() {
        super(...arguments);
        this.name = '马';
    }
    rule() {
        throw new Error("马怎么走");
    }
}
class Pao extends Chess {
    rule() {
        throw new Error("跑怎么走");
    }
    constructor() {
        super();
        this.name = '炮';
    }
}
class Soldier extends Chess {
    rule() {
        throw new Error("兵怎么走");
    }
    get name() {
        return '兵';
    }
}

```
### 单例模式
某些类的对象，在系统中最多只能有一个，为了避免开发者造成随意创建多个类的对象的错误，可以用单例模式强约束
```js
class Board {
    constructor() {
        this.width = 500;
        this.height = 700;
    }
    init() {
        console.log('初始化');
    }
    static createBoard() {
        if (this._board) {
            return this._board;
        }
        this._board = new Board();
        return this._board;
    }
}
const b = Board.createBoard();
const b2 = Board.createBoard();
console.log(b === b2); //结果是true


```

### 类型保护函数
通过这种函数会触发类型保护，该函数返回boolean
```js
class Animal {
    //动物具有的共同属性
}
const animals = ['dog','cat','lion']; //一堆动物

function hasFireShow(ani) {
    if (ani.singleFire && ani.doubleFire) {
        return true;
    }
    return false;
}
animals.forEach(a => {
    if (hasFireShow(a)) {
        a.singleFire();
        a.doubleFire();
    }
});

```

### 索引器（成员表达式）

注意：
1. 索引器要写在所有成员之前
2. 默认情况下，不会对索引器做严格的类型检查
3. 打开配置"noImplicitAny":true,//开启对隐式any的类型检查，但是这不仅仅影响索引器，很多地方都会增强类型检查

作用：
1. 在严格的类型检查下，可以实现给类动态地增加成员
2. 可以实现动态操作类成员

```js
class User{
    [prop:string]:any
    constructor(public name :string,public age:number){}
    sayHello(){}
}
const u = new User('aa',22)
u['6'] = 'sdf'
u[5] = 'sdf'
```

在js中，所有的成员名本质上都是字符串，如果使用number作为成员名，会自动转换为字符串
在ts中，如果某个类使用了两种类型的索引器，要求两种索引器的值必须是一样
```js
class myArray{
    [prop:number]:string
    [prop:string]:string
}
```


### this指向

在ts中，允许在书写函数时，手动声明该函数中this的指向。将this作为函数第一个参数，该参数只用于约束this，并不是真正的参数，不会出现在编译结果中


```js
class User {
    constructor(public name:string , public age:number){}

    sayHello(this:User){
        console.log(this,this.name,this.age);
    }
}

```

this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象

这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象