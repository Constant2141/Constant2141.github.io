---
title: ES6
date: 2019-03-29 15:33:56
tags: [ES6]
---
#### 模块化引入
```js
import * as name from "xxx"  //通配符引入所有export的变量， as作用是重命名
import {a,b,c} from "xxx" //引入指定的变量
import x from ""//没有用*或者{}的，这样写会引入默认export default
import "./1.jpg"//模块也可以是图片，js文件，这样直接引入模块的代码，不引入内部成员
let promise = import("xxx") //也支持异步引入，一定要绝对路径，在编译的时候会生成异步的模块，前面带有数字那些文件
```


#### 解构赋值
```js
//...展开运算符，把剩余的变量放在一个数组里，只能用于剩下的部分，一直到最后，不可放在中间
{
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5,6];
  console.log(a,b,rest);
}
//运用解构赋值，快速交换两个数
{
  let a=1;
  let b=2;
  [a,b]=[b,a];
  console.log(a,b);
}

{//接受函数返回值
  function f(){
    return [1,2]
  }
  let a,b;
  [a,b]=f();
  console.log(a,b);
}

{//选择性接受,用逗号跳过
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,,b]=f();
  console.log(a,b);//打印出来是 1,4
}

{//只取第一个元素，剩下的存进数组
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,...b]=f();
  console.log(a,b); 
}


/**对象解构*/

 
{//前后端交互时，key值一样可以解构出value值
  let metaData={
    title:'abc',
    test:[{
      title:'test',
      desc:'description'
    }]
  }
  let {title:esTitle,test:[{title:cnTitle}]}=metaData;
  console.log(esTitle,cnTitle);
}
```

