---
layout: post
title:  "js高程学习笔记-part.3"
categories: JavaScript JS高程笔记
tags:  JavaScript 函数 变量 递归 闭包 作用域 块级 模块
author: Beats0
---

* content
{:toc}
#### *chapter.7 函数表达式*
#### *page：176-192*




## 函数
函数就是一段可以反复调用的代码块。函数还能接受输入的参数，不同的参数会返回不同的值。

JavaScript有三种方法，可以声明一个函数。
### 构造函数
##### function命令
##### 函数表达式
将一个匿名函数赋值给变量。这时，这个匿名函数又称函数表达式（Function Expression），因为赋值语句的等号右侧只能放表达式。

采用函数表达式声明函数时，function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。

```js
var print = function x(){
  console.log(typeof x);
};

x// ReferenceError: x is not defined
print()// function
```

#### Function构造函数
还有第三种声明函数的方式：Function构造函数。
```js
var add = new Function(
  'x',
  'y',
  'return x + y'
);

// 等同于

function add(x, y) {
  return x + y;
}
```
`如果同一个函数被多次声明，后面的声明就会覆盖前面的声明。`
```js
function f() {
  console.log(1);
}
f() // 2

function f() {
  console.log(2);
}
f() // 2
```

#### `函数名提升`
JavaScript引擎将函数名视同变量名，所以采用function命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。所以，下面的代码不会报错。
```js
//可以 undefined
f();
function f() {}

//不可以
f();// 会先调用f()
var f = function (){};
// TypeError: f is not a function

//意思是

var f;
f();
f = function () {};
// TypeError: f is not a function
```
调用f的时候，f只是被声明了，还没有被赋值，等于undefined，所以会报错。因此，如果同时采用function命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。
```js
var f = function() {
  console.log('1');
}

function f() {
  console.log('2');
}

f() // 1
```
`由于存在函数名的提升，所以在条件语句中声明函数，可能是无效的，这是非常容易出错的地方。`
```js
if (false) {
  function f() {}
}

f() // 不报错
```
上面代码的原始意图是不声明函数f，但是由于f的提升，导致if语句无效，所以上面的代码不会报错。要达到在条件语句中定义函数的目的，只有使用函数表达式。
```js
if (false) {
  var f = function () {};
}

f() // undefined
```
### 属性和方法
#### name属性
name属性返回紧跟在function关键字之后的那个函数名。

函数的name属性总是返回紧跟在function关键字之后的那个函数名。对于f2来说，返回空字符串，匿名函数的name属性总是为空字符串；对于f3来说，返回函数表达式的名字（真正的函数名还是f3，myName这个名字只在函数体内部可用）。
```js
function f1() {}
f1.name // 'f1'

var f2 = function () {};
f2.name // ''

var f3 = function myName() {};
f3.name // 'myName'
```

#### length属性
length属性返回函数预期传入的参数个数，即函数定义之中的参数个数。
```js
function f(a, b) {}
f.length // 2
```
### 作用域
作用域（scope）指的是`变量存在的范围`。Javascript只有两种作用域：一种是`全局作用域(全局变量)`，变量在整个程序中一直存在，所有地方都可以读取；另一种是`函数作用域(局部变量)`，变量只在函数内部存在。

注意，对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。
```js
if (true) {
  var x = 5;
}
console.log(x);  // 5
// 变量x在条件判断区块之中声明，结果就是一个全局变量，可以在区块之外读取。
```
#### 函数本身的作用域
函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。
```js
var a = 1; // 全局变量a=1
var x = function () {
  console.log(a);// x的作用域绑定外层
};

function f() {
  var a = 2;
  x();
}

f() // 1
```
`总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。`

`很容易犯错的一点是，如果函数A调用函数B，却没考虑到函数B不会引用函数A的内部变量。`
```js
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x) // ReferenceError: a is not defined
// 函数x作为参数，传入函数y。但是，函数x是在函数y体外声明的，作用域绑定外层，因此找不到函数y的内部变量a，导致报错。
```

### 递归
递归函数是在一个函数通过名字调用字数情况下构成的，一个经典的递归阶乘函数：
```js
function factorial(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}

console.log(factorial(4));  //24
var anotherfactorial = factorial;
factorial = null;
console.log(anotherfactorial(4))  //TypeError: factorial is not a function
```
调用anotherfactorial时，必须执行factorial，但factorial已经不再是函数，所以错误

可以使用argument.callee替代函数名，且严格模式下也支持：
```js
 var factorial=(function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});

console.log(factorial(4)); //24
```

### `闭包`
闭包是指`有权访问`另一个函数作用域中的变量的函数
如果需要得到函数内的局部变量。正常情况下，这是办不到的，通常我们可以可以在函数的内部创建另一个函数。
```js
function f1() {
  var n = 999;
  function f2() {
　　console.log(n); // 999
  }
}
```
上面代码中，函数f2就在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是JavaScript语言特有的`”链式作用域”`结构（chain scope），`子对象`会一级一级地向上寻找所有`父对象`的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然`f2`可以读取`f1`的局部变量，那么只要把`f2`作为`返回值`，我们就可以在`f1`外部读取它的内部变量了
```js
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```
闭包的最大用处有两个，一个是可以`读取`函数内部的`变量`，另一个就是让这些变量始终`保持`在内存中，即闭包可以使得它诞生环境一直存在。
```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);
inc() // 5
inc() // 6
inc() // 7
```
`start`的状态被`保留`，每一次调用都是在上一次调用的基础上进行计算,原因就在于`inc`始终在内存中，而`inc`的存在依赖于`createIncrementor`，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

闭包的另一个用处，是`封装`对象的私有属性和私有方法。
```js
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```
注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此`不能滥用闭包`，否则会造成网页的性能问题。

### 块级作用域(私有作用域)
块级作用域(私有作用域)例：
```js
var someFunction=function () {
        //块级作用域
    };
    someFunction();
```

#### 立即调用的函数表达式（IIFE）
在Javascript中，一对圆括号()是一种运算符，跟在函数名之后，表示调用该函数。比如，print()就表示调用print函数。
```js
// 正确
(function(){ /* code */ }());
(function(){ /* code */ })();

//错误
(function(){ /* code */ }())
(function(){ /* code */ }())

//使用new关键字
new function(){ /* code */ }
new function(){ /* code */ }()
// 只有传递参数时，才需要最后那个圆括号
```
通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
```js
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二(推荐)完全避免了污染全局变量
(function (){
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

#### 增强模块模式
增强模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性或方法增强。例：
```js
var singleton = function () {
    //私有变量和函数
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }

    //创建对象
    var object = new Object();
    //添加公有属性和方法
    object.publicProperty = true;

    object.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
    //返回这个对象
    return object;
}();
```

### 小结
- 函数表达式不同于函数声明。函数声明要有名字，而函数表达式不需要，没有名字的函数表达式也叫做匿名函数
- 递归函数应该始终使用argument.callee来递归调用本身，不要使用函数名————函数名可能会发散变化
- 当函数内部定义了其他函数时就创建了闭包，闭包有权访问包含函数内部的所有变量
- 通常函数作用域及其变量都会在函数执行完毕后销毁，但闭包会保留下来，直到闭包不存在为止
- 外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此`不能滥用闭包`，否则会造成网页的性能问题。



## 参考

- [JavaScript高级教程3第七章-函数表达式]()
- [segmentfault-JavaScript理解对象：属性类型](https://segmentfault.com/q/1010000002664970)
- [阮一峰JavaScript参考标准-函数](http://javascript.ruanyifeng.com/grammar/function.html)