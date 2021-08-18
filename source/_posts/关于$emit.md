---
title: 关于$emit
date: 2018-11-26 19:46:08
tags: [vue]
categories: 
- 前端
- vue
cover: https://picsum.photos/seed/20181126/500/300
thumbnail: https://picsum.photos/seed/20181126/500/300
toc: true
---

## $emit
1、父组件可以使用 props 把数据传给子组件。
2、子组件可以使用 $emit 触发父组件的自定义事件。
```html
//父组件
<template>
    <ratingselect @select-type="onSelectType"></ratingselect>
</template>
<script>
    data () {
      return {
        selectType: 0,
    },
    methods: {
      onSelectType (type) {
        this.selectType = type
      }
    }
</script>

```
>父组件使用@select-type="onSelectType"监听由子组件vm.$emit触发的事件，通过onSelectType()接受从子组件传递过来的数据，通知父组件数据改变了。
>
```html
//子组件
<template>
  <div>
    <span @click="select(0, $event)"  :class="{'active': selectType===0}"></span>
    <span @click="select(1, $event)"  :class="{'active': selectType===1}"></span>
    <span @click="select(2, $event)"  :class="{'active': selectType===2}"></span>
  </div>
</template>
<script>
    data () {
      return {
        selectType: 0,
    },
    methods: {
        select (type, event) {
            this.selectType = type
            this.$emit('select-type', type)
      }
    }
</script>

```
>子组件通过$emit来触发事件，将参数传递出去。


