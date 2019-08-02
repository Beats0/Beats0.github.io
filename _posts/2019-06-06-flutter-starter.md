---
layout: post
title:  "Flutter Windows/Mac 环境搭建"
categories: flutter
tags: flutter
author: Beats0
---

* content
{:toc}





### windows安装flutter

git clone flutter 源代码, 官方建议clone到 `C:\src\flutter`

```sh
git clone -b beta https://github.com/flutter/flutter.git
```

双击运行 `flutter_console.bat`

添加用户变量

```sh
PUB_HOSTED_URL https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL https://storage.flutter-io.cn
```

添加系统变量

```sh
Path C:\src\flutter\bin\
```

运行 flutter doctor

```sh
flutter doctor
```

成功的结果
```sh
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel beta, v1.6.3, on Microsoft Windows [Version 10.0.17134.765], locale zh-CN)

[√] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
[√] Android Studio (version 3.4)
[√] VS Code (version 1.35.0)
[√] Connected device (1 available)
```

报错的结果
```sh
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel beta, v1.6.3, on Microsoft Windows [Version 10.0.17134.765], locale zh-CN)
[!] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
    X Android license status unknown.
      Try re-installing or updating your Android SDK Manager.
      See https://developer.android.com/studio/#downloads or visit https://flutter.dev/setup/#android-setup for detailed instructions.
[!] Android Studio (version 3.4)
    X Flutter plugin not installed; this adds Flutter specific functionality.
    X Dart plugin not installed; this adds Dart specific functionality.
[√] VS Code (version 1.35.0)
[!] Connected device
    ! No devices available

! Doctor found issues in 3 categories.
```

报错解释:

1.缺少Android license

运行
```sh
flutter doctor --android-licenses
```

提示运行
```sh
C:\Users\Beats0\AppData\Local\Android\Sdk\tools\bin\sdkmanager --update
```

报错
```
Exception in thread "main" java.lang.NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema       
        at com.android.repository.api.SchemaModule$SchemaModuleVersion.<init>(SchemaModule.java:156) 
        at com.android.repository.api.SchemaModule.<init>(SchemaModule.java:75)                      
        at com.android.sdklib.repository.AndroidSdkHandler.<clinit>(AndroidSdkHandler.java:81)       
        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:73)              
        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:48)              
Caused by: java.lang.ClassNotFoundException: javax.xml.bind.annotation.XmlSchema                     
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:582)   
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:185)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:496)                           
        ... 5 more                                                                                   
```
修改 `sdkmanager`脚本

> C:\Users\Beats0\AppData\Local\Android\Sdk\tools\bin\sdkmanager.bat

```sh
# 将
set DEFAULT_JVM_OPTS="-Dcom.android.sdklib.toolsdir=%~dp0\.."
# 改为
set DEFAULT_JVM_OPTS="-Dcom.android.sdklib.toolsdir=%~dp0\.." -XX:+IgnoreUnrecognizedVMOptions --add-modules java.se.ee
```

设置好后执行 `flutter doctor --android-licenses`, 然后一路同意即可


2.Android Studio缺少Flutter, Dart拓展插件

> setting -> Plugins -> Marketplace

安装 Flutter 和 Dart 插件即可

3.Connected device 未连接调试设备

开启 Android Studio AVD 或真机调试即可


-------------------------------------------------------------------------

### mac安装flutter

安装

android studio

下载flutter git

配置环境

> vim ~/.bash_profile

```sh
export PATH=/Users/Beats0/Documents/github/flutter/flutter/bin:$PATH
```

添加源

```sh
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

保存后应用

```sh
source ~/.bash_profile
```

检查

```sh
flutter -h
```

检查doctor

```sh
flutter doctor
```

结果

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel master, v1.7.4-pre.30, on Mac OS X 10.13.6 17G7024, locale
    zh-Hans-CN)
 
[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.0)
[!] Xcode - develop for iOS and macOS (Xcode 10.1)
    ✗ CocoaPods not installed.
        CocoaPods is used to retrieve the iOS and macOS platform side's plugin
        code that responds to your plugin usage on the Dart side.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/platform-plugins
      To install:
        brew install cocoapods
        pod setup
[✗] iOS tools - develop for iOS devices
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with
      Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
[!] Android Studio (version 3.4)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] Connected device
    ! No devices available
```

报错分析

1.同意android-licenses

```sh
flutter doctor --android-licenses
```

2.安装各种依赖环境

```sh
brew update
brew install --HEAD libimobiledevice
brew install ideviceinstaller
brew install ios-deploy
brew install cocoapods
pod setup
```

所有完成后检查

```
flutter doctor
```

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel master, v1.7.4-pre.30, on Mac OS X 10.13.6 17G7024, locale zh-Hans-CN)
 
[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.0)
[✓] Xcode - develop for iOS and macOS (Xcode 10.1)
[✓] iOS tools - develop for iOS devices
[✓] Android Studio (version 3.4)
[✓] Connected device
```


## 参考

 - [简书flutter环境配置详解MAC版](https://www.jianshu.com/p/b50a92afbef1)
