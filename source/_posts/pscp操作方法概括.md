---
title: pscp操作方法概括
date: 2018-09-17 15:24:10
tags: [ECS]
categories: 
- 笔记
- 探索者
cover: https://picsum.photos/seed/2018091701/500/300
thumbnail: https://picsum.photos/seed/2018091701/500/300
toc: true
---
虽然是很早以前就掌握的东西了，但是一直懒得整理
————————————————————————————
### linux 删除命令
删除常用操作 rm -rf 目录名字
   -r 向下递归，不管有多少级目录，一并删除
    -f 直接强行删除，没有任何提示
    
注意：使用 rm -rf 的时候一定要小心，Linux没有回收站。

### Linux创建命令
touch Xxx 创建文件
mkdir xxx创建文件夹目录

### ECS
经过试验
如果是删除一个文件 重新上传文件夹后 ECS端的文件还在
如果是修改一个文件 重新上传文件夹后 ECS端的文件也会跟着修改 主要是看文件和文件夹的名字

我自己的ECS的MongoDB 所在地 /usr/local/mongodb/bin


### PSCP
我自己的例子
```
pscp D:gitbook root@47.106.21.195:/home/wwwroot/default/gitbook

pscp -r d:aaa root@47.106.21.195:/home
```

>　-p 拷贝文件的时候保留源文件建立的时间。 
　　-q 执行文件拷贝时，不显示任何提示消息。 
　　-r 拷贝整个目录 
　　-v 拷贝文件时，显示提示信息。 

