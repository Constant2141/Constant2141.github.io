---
title: git的撤销操作
date: 2018-08-20 19:55:46
tags: [git]
---
刚刚在使用git commit之后要push，提示报错，原因就不多说了。特意总结了一下如果要撤销add或者commit操作应该怎么做,当然在git status的时候也会自动提示可以用什么操作(5月28日也有过一次对撤销的小结，当时仅仅是撤销文件的更改)
<!-- more -->
### 撤销add
git add 如果添加了错误的文件的话想要撤销

1. git status 先看一下add 中的文件 
2. git reset HEAD 如果后面什么都不跟的话 就是回到上一次状态 add里面的全部撤销了 
--------------or---------------
2. git reset HEAD <file> 就是对某个文件进行撤销了

### 撤销commit 
已经commit了但是没有Push,想要撤销commit的内容

1. 找到之前提交的git commit的id 
git log 
找到想要撤销的id 
2. git reset –hard id 
完成撤销,同时将代码恢复到指定 id 对应的版本 
--------------or---------------
2. git reset id 
完成Commit命令的撤销，但是不对代码修改进行撤销，可以直接通过git commit 重新提交对本地代码的修改

### 撤销文件的修改
将本次对文件的所有修改撤销,直接对内容撤销的不是对暂存区

git checkout -- <file>