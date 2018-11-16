---
layout: post
title:  "绑定style不要使用filter"
categories: vue
tags: vue
author: Beats0
mathjax: true
---

* content
{:toc}


因为filter会被自行调用











### BUG?
最近使用vue filter的时候发现了一个bug, 当对style进行绑定时, 只要style绑定的数据发生变化, filter就会自动执行。

代码重现: [jsfiddle demo](https://jsfiddle.net/Beats0/eywraw8t/461982/)

在官方提了[issues](https://github.com/vuejs/vue/issues/9072), 收到的回复是使用 `computed` 而不是 `filter`

另外, 在filter中是无法获取 `this` 的。相关[issues#5998: this undefined in filters](https://github.com/vuejs/vue/issues/5998),
作者建议，利用计算属性的 `computed`

### 更新
不仅仅是`filter`, `directive`也会自行调用

代码重现: [https://jsfiddle.net/Beats0/75xuL269/10/](https://jsfiddle.net/Beats0/75xuL269/10/)

### 结论
不要对style进行动态绑定, 但是可以使用`el.set`的方法直接设置值, 这样就不会有影响。
代码重现: [https://jsfiddle.net/Beats0/eywraw8t/462306/](https://jsfiddle.net/Beats0/eywraw8t/462306/)



## 参考

 - [#9072](https://github.com/vuejs/vue/issues/9072)
 - [#5998](https://github.com/vuejs/vue/issues/5998)
 - [filter](https://jsfiddle.net/Beats0/eywraw8t/461982/)
 - [directive](https://jsfiddle.net/Beats0/75xuL269/10/)
 - [el.style](https://jsfiddle.net/Beats0/eywraw8t/462306/)