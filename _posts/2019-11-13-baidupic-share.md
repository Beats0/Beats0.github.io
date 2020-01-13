---
layout: post
title: "百度网盘批量分享"
subtitle: "baidu net disk fast share script"
author: "Beats0"
header-img: "//steamuserimages-a.akamaihd.net/ugc/853856987599999163/C69392A1CD4BE3BD1159849FA2DFA027F5267FED/"
catalog:    true
tags:
  - 脚本
---


### 百度网盘批量分享

最近网盘被人举报了，分享的链接全部凉了，一个一个的点击分享太麻烦了，就写了一个批量分享脚本。

访问百度网盘文件列表，官方分享时是不能自定义密码的，在 [greasyfork](https://greasyfork.org/zh-CN) 使用可自定义分享密码的工具 [网盘助手](https://greasyfork.org/zh-CN/scripts/378301-%E7%BD%91%E7%9B%98%E5%8A%A9%E6%89%8B)。



首先获取用户文件列表api，拿到文件的 `fs_id`

> [get] /api/list

```
https://pan.baidu.com/api/list?order=name&desc=0&showempty=0&web=1&page=1&num=100&dir=%2F&t=0.370667370201027&channel=chunlei&web=1&app_id=your_app_id&bdstoken=your_bdstoken&logid=your_logid==&clienttype=0&startLogTime=1573545538404
```

返回json

```js
{
errno: 0
guid: 0
guid_info: ""
list: [
  {
    category: 6
    dir_empty: 1
    empty: 0
    // 要分享的文件id
    fs_id: 1120222516391603
    isdir: 1
    local_ctime: 1413468293
    local_mtime: 1413468293
    oper_id: 1951294368
    path: "/xxx"
    server_ctime: 1413468293
    // 文件名
    server_filename: "xxx"
    server_mtime: 1507889682
    share: 0
    size: 0
    unlist: 0
  }
]
```

安装好脚本后随便创建一个分享链接，分析分享api


分享api

> [post] /share/set

```
https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=your_app_id&bdstoken=your_bdstoken&logid=your_logid&clienttype=0
```

右键 copy as fetch

![](https://steamuserimages-a.akamaihd.net/ugc/753718610870748123/887898C02A92E5F3B5E171438AABFF6D44033F2A/)


在控制台执行一下, 如果请求成功返以下数据

```js
{
  createsharetips_ldlj: "复制这段内容后打开百度网盘手机App，操作更方便哦"
  ctime: 1573544062
  errno: 0
  expiredType: 0
  link: "https://pan.baidu.com/s/xxxxxxxxxxxxxxxx"
  premis: false
  request_id: 7320788601758264000
  shareid: 4221951522
  shorturl: "https://pan.baidu.com/s/xxxxxxxxxxxxxxxxxxx"
}
```

这样就分享成功了

### 脚本

```js
const re = /\w{4}/
let resultArr = []
// 文件列表api返回的数据
const dataList = [
  {
  "server_filename": "A200",
  "category": 6,
  "unlist": 0,
  "isdir": 1,
  "dir_empty": 1,
  "oper_id": 1951294368,
  "server_ctime": 1414590440,
  "local_mtime": 1414590440,
  "size": 0,
  "share": 0,
  "server_mtime": 1507887023,
  "path": "\/A200",
  "local_ctime": 1414590440,
  "empty": 0,
  "fs_id": 880045602863387
},
// ...
]

/**
 * @param fid string 文件的oper_id
 * @param pwd string 分享密码，视情况自行更改
 */
function fetchData(fid, pwd) {
  fetch("https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=your_app_id&bdstoken=your_bdstoken&logid=your_logid&clienttype=0", {
    "credentials": "include",
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://pan.baidu.com/disk/home?",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `schannel=4&channel_list=%5B%5D&period=0&pwd=${pwd}&fid_list=%5B${fid}%5D`,
    "method": "POST",
    "mode": "cors"
  }).then(function (response) {
    return response.json();
  }).then(function (resData) {
    console.log(resData);
    resultArr.push({
      link: resData.link,
      pwd
    })
  }).catch(e => {
    console.log('分享失败', fid, pwd, e)
  })
}

function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

async function main() {
  for (let i = 0; i < dataList.length ; i++) {
    const item = dataList[i]
    if(!re.test(item.server_filename)) {
      console.log('匹配失败', item.server_filename)
      return
    }
    const sharePwd = item.server_filename.match(re)[0]
    fetchData(item.fs_id, sharePwd)
    // 停顿25秒, 不然会因频繁调用api而被限制
    await sleep(25000)
  }
  console.log(resultArr)
}

main()
```

最后得到所有分享数据列表
```js
[
  { link: "https://pan.baidu.com/s/xxxxxxx", pwd: "A120" },
  { link: "https://pan.baidu.com/s/xxxxxxx", pwd: "A121" },
  { link: "https://pan.baidu.com/s/xxxxxxx", pwd: "A122" },
  // ...
]
```