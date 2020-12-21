---
title: 关于vue里面scoped
date: 2018-11-21 11:11:38
tags: [vue]
---
前期概要：在开发这个B2B的时候，在引用其中一位开发者写的组件时，出现了样式上的崩坏，结合之前翻阅文档得出是scoped的问题
<!-- more -->
## scoped作用
在vue组件中，在style标签上添加scoped属性，vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的，很好的实现了样式私有化的目的。但是之后如果对公共组件样式做调整，如果添加了scoped属性，那么样式将会变得不易修改。本次就出现了这样的问题，因为父子组件中用到了同样的类名

## 例子

```js
//button.vue
<template>
    <div class="button-warp">
        <button class="button">text</button>
    </div>
</template>

<style scoped>
    .button-warp{
        display:inline-block;
    }
    .button{
        padding: 5px 10px;
        font-size: 12px;
        border-radus: 2px;
    }
</style>

// 渲染之后html 
<div data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
</div>


// 渲染之后css
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
```

此时用一个组件引用<button></button>
```js
//content.vue文件里面模板
<div class="content">
    <p class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-2311c06a class="button-warp">
        <button data-v-2311c06a class="button">text</button>
    </div>
</div>

//渲染出来的html
<div data-v-57bc25a0 class="content">
    <p data-v-57bc25a0 class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-57bc25a0 data-v-2311c06a class="button-warp">
        <button data-v-2311c06a class="button">text</button>
    </div>
</div>


//渲染出来的css
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
/*content.vue渲染出来的css*/
.content[data-v-57bc25a0]{
    width: 1200px;
    margin: 0 auto;
}
.content .button[data-v-57bc25a0]{
    border-raduis: 5px;
}
```
虽然我们在content添加了想要修改button组件的样式的代码，但是由于.content .button这句在末尾加的是content组件的scoped标记，最后这句其实根本作用不到我们想要的DOM节点上，所以这种情况我们在content内部写的任何样式都不会影响到button.vue组件，

## 总结scoped原理
1、给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性

2、在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-2311c06a]）来私有化样式

3、<strong>如果组件内部包含有其他组件，只会给<font color=red>其他组件</font> 的最外层标签加上当前组件的data属性
