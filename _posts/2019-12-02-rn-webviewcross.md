---
layout: post
title:  "react native webview封装"
categories: react-native
tags: react-native
author: Beats0
---

* content
{:toc}





### react native webview封装

环境
```
os: androidX, ios 8
react: 16.9.0
react-native: 0.61.5
react-native-webview: 7.5.2
```

WebViewCross.js
```js
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native';
import { WebView } from 'react-native-webview'



export default class WebViewCross extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefresh: false,
      canGoBack: false,         
      canGoForward: false,
      isPrevent: false,
      uri: '',
      status: '',
      loading: false,
    };
    this.webView = null;
  }

  componentDidMount() {
    // 初始化uri
    this.setState({
      uri: this.props.uri
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { canGoBack, isPrevent } = this.state
    if (canGoBack && !isPrevent) { // webview can go back and not prevent
      this.webView.goBack();
      return true;
    }
    return false;
  }

  onNavigationStateChange = (navState) => {
    console.log(navState)
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      uri: navState.url,
      status: navState.title,
      loading: navState.loading,
    });
  }

  // 手动刷新
  handleRefresh = () => {
    this.webView.reload()
  }

  // webview 接收HTML发出的数据,并通过props向父级回调
  _onMessage = (event) => {
    if(!event.nativeEvent.data) return
    let callBackData = JSON.parse(event.nativeEvent.data)
    console.log('callBackData', callBackData);
    this.props.webViewCb(callBackData)
  }

  renderErrorView = () => {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorDetail}>
          <Text>数据加载失败，请确认网络连接</Text>
          <TouchableOpacity onPress={this.handleRefresh} style={styles.refreshBtn}><Text style={{color: '#FF5D26'}}>重新加载</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {uri} = this.state
    if(!uri) {
      return (
        <View />
      )
    }
    // JavaScript注入脚本，注意为一段字符串
    let injectJavascript = `(function() {
    window.postMessage = function(data) {
      window.ReactNativeWebView.postMessage(data);
    };
  })()`
    return (
      <WebView ref={ (webView) => this.webView = webView }
              // ios设置白名单
               originWhitelist={ ['*'] }
               bounces={ false }
               javaScriptEnabled={ true }
               // javaScript注入
               injectJavascript={ injectJavascript }
               // 开启缓存
               domStorageEnabled={ true }
               thirdPartyCookiesEnabled={ true }
               // 允许文件上传
               allowFileAccess={ true }
               useWebKit={ true }
               onMessage={ this._onMessage }
               onNavigationStateChange={ this.onNavigationStateChange }
               // 加载时强制使用loading转圈视图，注意如果为true，在低性能下，webview可能会加载失败，显示为空白
               startInLoadingState={false}
               // webview加载错误页面
               renderError={this.renderErrorView}
               // url地址
               source={ { uri } }
               style={ this.props.style }
      />
    )
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  errorDetail: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  refreshBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF5D26'
  }
})
```

调用

```js
import React, { Component  } from 'react';
import {
  Platform,
  BackHandler,
} from "react-native";
import SafeAreaViewBox from "../../components/safeAreaViewBox";
import WebViewCross from '../../components/webViewCross'
import commonStyle from "../../public/style";


export default class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  webViewCb = (cbData) => {
    if (!cbData.type) return;
    console.log(cbData)
    switch (cbData.type) {
      case 'exitChatWebView':
        this.props.navigation.goBack();
        break;
    }
  }

  render() {
    return (
      <SafeAreaViewBox backgroundColor='#fff'>
        <WebViewCross uri={ `http://192.168.10.68:8080/` }
                      style={ {width: '100%', height: '100%'} }
                      webViewCb={ this.webViewCb }/>
      </SafeAreaViewBox>
    );
  }
}
```

react-native-webview 与 html 通信

react

```js
class WebPage extends React.Component {
  public render() {
    return (
      <div>Something</div>
    )
  }

  public componentDidMount() {
    window.WebViewBridge = {
      onMessage: this._onMessage,
    };
    const event = new Event('WebViewBridge');
    window.dispatchEvent(event);
    this._postMessage({helloFromWebPage: true})
  }

  // The data is not a string. It is an object.
  private _onMessage(data: Object){
    console.log(data)
  }

  private _postMessage = (data)=>{
    window.ReactNativeWebView.postMessage(JSON.stringify(data) );
  } 
}
```

vue
```js
mounted() {
  window.WebViewBridge = {
    onMessage: this._onMessage
  }
  const event = new Event('WebViewBridge')
  window.dispatchEvent('event')
},
methods: {
  _onMessage(data) {
    window.alert(JSON.stringfy(data))
  }
}
```


#### 优缺点

1. 少部分react-native页面使用html编写，然后用webview加载，这样开发速率是写原生页面的好几倍，且页面可热更新
2. react-native-webview仍然存在大量无法修复的bug, 例如部分老机型无法使用flex布局，部分样式无法兼容，导致页面混乱。样式只能慢慢调试
3. 注入消息api不稳定，对于过长message json数据, webview ios端进行postMessage时可能会报错
4. 老版本webview6.0以下不支持cookie和storage, 当退出应用时, webview数据将会被清空, 新本7.0以上webview已修复，待验证
5. 不支持cors跨域类请求，不支持白名单唤醒，否则直接报错，这两个bug直到7.0都还未能修复
