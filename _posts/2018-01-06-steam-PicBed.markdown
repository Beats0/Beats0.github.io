---
layout: post
title:  "用steam做图床"
categories: javascript
tags: 图床 跨域请求 tool
author: Beats0
mathjax: true
---

* content
{:toc}

<b>为什么要使用steam云做图床呢?
 - 国内的渣浪微博图床和七牛云都会对用户的图片进行检测限制，有些图片就会被和谐掉
 - steam云有18G，图片基于[Akamai](https://baike.baidu.com/item/Akamai/10008179?fr=aladdin)的,这也意味着图片具有全球CDN加速服务
 - 图片可以在个人资料的`Screenshot`选项中任意更改，便于管理









首先用Steam Screen shot Uploader GUI输出文件路径，然后再用Steam自带的Steam Screenshots Uploader批量上传图片，最后使用JavaScript跨域请求获得图片链接，注意：图片下载方面，只能使用Chrome浏览器，原因是因为只有Chrome浏览器可以实施[FileSystemAPI](https://developer.mozilla.org/zh-CN/docs/WebGuide/API/File_System/Introduction#%E9%99%90%E5%88%B6)。目前尚不存在专门用于文件/配额管理的浏览器用户界面。实测Firefox只能打印图片链接地址，但不能下载图片

##### Downloads

Mirror 1: https://drive.google.com/file/d/0BwSFV9LmCqmiVjRGTWluOXdIbmc/view

Mirror 2: http://www6.zippyshare.com/v/dPiz0ZsL/file.html

路径1：https://drive.google.com/file/d/0BwSFV9LmCqmiVjRGTWluOXdIbmc/view

路径2：百度云[http://pan.baidu.com/s/1hrYCQRq](http://pan.baidu.com/s/1hrYCQRq)


##### steam指南

English: https://steamcommunity.com/sharedfiles/filedetails/?id=878337526

中文: https://steamcommunity.com/sharedfiles/filedetails/?l=spanish&id=891916460

##### Steam Screen shot Uploader GUI
这个软件工具是利用steam API来上传自定义的截图，不用担心VAC之类的封禁。然而我想吐槽的是为什么不能批量上传，每次只能一张一张上传= =

  ![Steam Screen shot Uploader GUI](http://i.imgur.com/Qeeh7On.gif)


 - APPID - 游戏数字ID(必需)
 - Location - 显示在截图下方的游戏地点(非必需)
 - Tagged Players - 截图中的玩家。请输入玩家64位ID，每个玩家ID占据一行(非必需)
 - Upload - 上传截图
 - Image Path - 图片路径
 - Browse - 浏览

 > 你可以在商店界面找到游戏的APP ID。<br>
比如CSGO的商店页面链接是 http://store.steampowered.com/app/730 所以CSGO的AppID便是730。


##### Steam Screenshots Uploader
Steam Screen shot Uploader GUI工具会将图片输出到Steam Screenshots Uploader里，然后用Steam Screenshots Uploader上传图片，图片是否公开可选

##### JavaScript跨域请求

在浏览器里打开自己的steam个人资料选择Screenshot截图页面(建议以网格视图查看)

输入以下JavaScript跨域请求函数，这个函数可跨域请求，回调图片链接地址，并将链接地址转为图片下载(只有chrome能下载图片，下载图片默认关闭)
```js
downloadURI = function (uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
};

makeRequest = function (method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};


var steamImageUrls = [];

getUrlFromResponse = function (responseText) {
    window.resp = responseText;
    var linkRegex = new RegExp('https://steamuserimages[^\"]+');
    var url = linkRegex.exec(window.resp)[0];
    steamImageUrls.push(url);
    //正则过滤，批量打印原图链接地址
    console.log(/^.*?(?=(?:\?|$))/gi.exec(url)[0]);
    return url;
};

var urls = [];
jQuery('a.profile_media_item.modalContentLink').each(function (index, el) {
    urls.push(el.href);
});

for (var i = 0; i < urls.length; ++i) {
    makeRequest("GET", urls[i])
        .then(function (text) {
            var imageUrl = getUrlFromResponse(text);
            //是否下载当前图片，默认不开启
            // downloadURI(imageUrl, 'image' + i + '.jpg');
        });
}
```
如果浏览器还打印了xhr，请在filter中添加过滤 `https://steamuserimages-a.akamaihd.net/ugc/` 即可


## 参考

 - [0x6FA3D0/SteamScreenshotUploaderGUI Source Code](https://github.com/0x6FA3D0/SteamScreenshotUploaderGUI)
 - [Uploading Custom Screenshots Made Easy](https://steamcommunity.com/sharedfiles/filedetails/?id=878337526)
 - [verysmallrock/steamscreenshotdownloader](https://github.com/verysmallrock/steamscreenshotdownloader)
