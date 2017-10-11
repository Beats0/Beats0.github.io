---
layout: post
title:  "为你的jekyll添加百度统计分析"
categories: jekyll
tags:  jekyll 统计
author: Beats0
---

* content
{:toc}

本文将介绍如何使用`百度统计`分析 ，并将访问数量展示在你的jekyll中。

## 先上百度统计的js代码

```js
 <script>
     var _hmt = _hmt || [];
     (function() {
         var hm = document.createElement("script");
         hm.src = "https://hm.baidu.com/hm.js?2b2a338137de996cb2246d227d701736";
         var s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);
     })();
 </script>
```



## 获取百度统计

添加百度统计。注册添加后，会得到如下一段javaScript：

```js
<script>
 var _hmt = _hmt || [];
 (function() {
   var hm = document.createElement("script");
   hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxx";
   var s = document.getElementsByTagName("script")[0];
   s.parentNode.insertBefore(hm, s);
 })();
 </script>
```

其中字符串“xxxxxxxxxxxxxxxxxxxxxxxxxxx”为你获取的百度统计ID

## 修改配置文件

1.在_config.yml加入以下代码：
```
# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: xxxxxxxxxxxxxxxxxxxxxxxxxxx
```
在_config.yml中写入自己的ID，就会统计相应的数据。<br>
**注意：在config_yml中不能有tab，否则会提示‘found character that cannot start any token while scanning for the next token at line’的错误。**

2.在_include中新建文件footer.html加入以下代码

```js
<footer class="footer" id="footer">
    <div class="container">
        <p class="power">
            Click Rate:<span id="busuanzi_value_site_pv"></span>，Visitor:<span id="busuanzi_value_site_uv"></span>，Pageview:<span id="busuanzi_value_page_pv"></span>.
        </p>
    </div>
</footer>
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

其中Click Rate为总访问量，Visitor为总访问人数，Pageview为当前页面阅读数。后面的js代码为数据处理展示。

3.在博客的入口网页中添加<br>
**注意：使用时请将红色部分代码中的 - 符号替换为空格，因为这个展示界面的markdown语法会自动运行代码orz**

```
    {-%-include-footer.html-%-}
```
Jekyll的入口一般在 _layouts/default.html中，其他情况模版因为将header统一抽取了出来，可以放在_includes/head.html中。

4.在post.html中添加
```
{-%-if-site.baidu_tongji_id-%-}//使用时请将红色部分代码中的 - 符号替换为空格
<script>
    // 百度统计代码
     var _hmt = _hmt || [];
     (function() {
         ar hm = document.createElement("script");
         hm.src = "//hm.baidu.com/hm.js?-{-{-site.baidu_tongji_id-}-}-";//使用时请将红色部分代码中的 - 符号替换为空格
         var s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);
     })();
</script>
{-%-endif-%-}//使用时请将红色部分代码中的 - 符号替换为空格
```

## 本地测试

```
gem install bundler
bundle install
bundle exec jekyll serve
```
本地server启动后可以在http://localhost:4000/ 的footer看到相应的统计<br>
**注意：开始的统计数量300万为别人的访问数，必须将项目上传到GitHub运行成功才可正确统计到自己的访问数**

## 参考

- [我的jekyll配置](https://github.com/Beats0/steam-background-collection)
- [gaohaoyang.github.io](https://github.com/Gaohaoyang/gaohaoyang.githu.io)
- [简书：Jekyll搭建博客并添加百度统计](http://www.jianshu.com/p/9a062041394e)
