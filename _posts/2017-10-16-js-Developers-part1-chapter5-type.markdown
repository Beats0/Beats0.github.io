---
layout: post
title:  "js高程学习笔记-part.1"
categories: JavaScript JS高程笔记
tags:  JavaScript 类型 方法
author: Beats0
---

* content
{:toc}
<b>*chapter.5 引用类型*<br>
<b>*page：115-157*






### Arrray类型
#### 语法
```js
new Array();
new Array(size);
new Array(element0, element0, ..., elementn);
```
#### 对象属性

属性 | 描述 |
-----|-----|
constructor| 返回对创建此对象的数组函数的引用。
index  |  无
input  | 无
length |设置或返回数组中元素的数目。
prototype |使您有能力向对象添加属性和方法。

#### 对象方法

方法 | 描述 |
-----|-----|
concat() |连接两个或更多的数组，并返回结果。
join() |把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
pop() |删除并返回数组的最后一个元素
push() |向数组的末尾添加一个或更多元素，并返回新的长度。
reverse() |颠倒数组中元素的顺序。
shift() |删除并返回数组的第一个元素
slice() |从某个已有的数组返回选定的元素
sort() |对数组的元素进行排序
splice() |删除元素，并向数组添加新元素。
toSource() |返回该对象的源代码。
toString() |把数组转换为字符串，并返回结果。
toLocaleString() |把数组转换为本地数组，并返回结果。
unshift() |向数组的开头添加一个或更多元素，并返回新的长度。
valueOf() |返回数组对象的原始值

#### 创建
```js
var colors = new Array(20);                 //创建length长度为20的数组
var colors = new Array("red","blue","green");                   //创建包含3个字符串的数组


var colors = new Array(3);                   //创建包含3个项的数组
var names = Array("Greg");                    //创建包含1项，即为“Greg”的数组

var value = [1,2,];                 //不要这样，会创建一个包含2或3的数组
var options = [,,,,,];                  //不要这样，会创建一个包含5或6的数组
```
#### 更改
```js
var value = [1,2,3];
value.length = 4;
value[3];                   //undifined,因为第四项不存在，但length依然为4
```

#### 排序
##### reverse()
```js
var values = [1,2,3,4,5];
values.reverse();
console.log(values);                    //[5, 4, 3, 2, 1]
```
##### sort()
```js
var values = [0,1,5,10,15];
values.sort();
console.log(values);                    //[0, 1, 10, 15, 5]
```
使用函数(升序)
```js
function compare(value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
    var values = [0, 1, 5, 10, 15];
    values.sort(compare);
    console.log(values);                    //[0, 1, 5, 10, 15]
```
对于数值类型或其valueOf()方法返回数值类型的对象类型，可以使用：
```js
function compare(value1,value2) {
    return value2 - value1;//此为降序，升序为value1-value2
}
```
#### 位置方法
##### indexOf()
indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置。
```js
stringObject.indexOf(searchvalue,fromindex)
```
searchvalue 必需。规定需检索的字符串值。fromindex 可选的整数参数,规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
##### lastIndexOf()
lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
```js
stringObject.lastIndexOf(searchvalue,fromindex)
```
searchvalue 必需。规定需检索的字符串值。 fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的最后一个字符处开始检索。
```js
    var numbers = [1,2,3,4,5,4,3,2,1];
    alert(numbers.indexOf(4));              //3
    alert(numbers.lastIndexOf(4));          //5

    alert(numbers.indexOf(4,4));              //5
    alert(numbers.lastIndexOf(4,4));          //3

    console.log(numbers.indexOf(7))            //-1
```
#### 迭代方法

方法 | 描述 |
-----|-----|
every()|对数组的`每一项`运动给定函数，如果该函数每一项都返回true则返回true`(当且仅当)`
filter()|对数组的每一项运动给定函数，返回true的项组成的数组
forEach()|对数组的每一项运动给定函数，这个方法没有返回值
map()|对数组的每一项运动给定函数，返回每次函数调用的结果组成的数组
some()|对数组的每一项运动给定函数，如果该函数对`任意一项`都返回true则返回true`(存在一个)`

#### 缩小方法
##### reduce()
对数组中的所有元素调用指定的回调函数。该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
```js
array.reduce(callbackfn,[initialValue])
```

参数 | 定义 |
-----|-----|
array1|必需。一个数组对象。
callbackfn|必需。一个接受最多四个参数的函数。对于数组中的每个元素，reduce 方法都会调用 callbackfn 函数一次。
initialValue|可选。如果指定 initialValue，则它将用作初始值来启动累积。第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。

##### reduceRight()
reduceRight()方法的功能和reduce()功能是一样的，不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加。

时间对比
```js
var arr = [1, 2, 3, 4, 5, 6];
console.time("ruduce");
Array.prototype.ruduceSum = function () {
    for (var i = 0; i < 10000; i++) {
        return this.reduce(function (preValue, curValue) {
            return preValue + curValue;
        });
    }
}
arr.ruduceSum();
console.log('最终的值：' + arr.ruduceSum()); // 21 console.timeEnd("ruduce"); // 0.417ms
```

### Function类型
#### 函数属性与方法
每一个函数都是对象，因此都包含两个属性：length与prototype。

每一个函数都包含两个继承而来的方法：apply()和call()。

方法 | 定义 | 说明
-----|-----|-----|
call()|调用一个对象的一个方法，以另一个对象替换当前对象。它的第一个参数用作 this 的对象。其他参数都直接传递给函数自身.|call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象.如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。
apply()| 应用某一对象的一个方法，用另一个对象替换当前对象。有两个参数，用作 this 的对象和要传递给函数的参数的数组。 |如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

第一个参数仍是 this，第二个参数是只有一个值 color 的数组。可以把 ClassB 的整个 arguments 对象作为第二个参数传递给 apply() 方法：
```js
function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(color);
    //delete this.newMethod;
    ClassA.apply(this, arguments);

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}

```
`严格模式下，未指定环境对象而调用函数，this值不会转型为windw，除非明确把函数添加到某个对象或者调用apply()或call(),否则this值为undefined`


#### Number类型
创建：
```js
var myNum=new Number(value);
var myNum=Number(value);
```

Number 对象属性

属性 | 描述 |
-----|-----|
constructor	|返回对创建此对象的 Number 函数的引用。
MAX_VALUE	|可表示的最大的数。
MIN_VALUE	|可表示的最小的数。
NaN	|非数字值。
NEGATIVE_INFINITY	|负无穷大，溢出时返回该值。
POSITIVE_INFINITY	|正无穷大，溢出时返回该值。
prototype	|使您有能力向对象添加属性和方法。

Number 对象方法

方法 | 描述 |
-----|-----|
toString	|把数字转换为字符串，使用指定的基数。
toLocaleString	|把数字转换为字符串，使用本地数字格式顺序。
toFixed	|把数字转换为字符串，结果的小数点后有指定位数的数字。
toExponential	|把对象的值转换为指数计数法。
toPrecision	|把数字格式化为指定的长度。
valueOf	|返回一个 Number 对象的基本数字值。

#### String类型

```js
var myString = new String("hello world");
```
String对象属性

属性 | 描述 |
-----|-----|
constructor	|对创建该对象的函数的引用
length	|字符串的长度
prototype	|允许您向对象添加属性和方法

String对象方法

方法 | 描述 |
-----|-----|
charAt()	|返回在指定位置的字符。
charCodeAt()	|返回在指定的位置的字符的 Unicode 编码。
concat()	|连接字符串。
fromCharCode()	|从字符编码创建一个字符串。
indexOf()	|检索字符串。
lastIndexOf()	|从后向前搜索字符串。
localeCompare()	|用本地特定的顺序来比较两个字符串。
match()	|找到一个或多个正则表达式的匹配。
replace()	|替换与正则表达式匹配的子串。
search()	|检索与正则表达式相匹配的值。
slice()	|提取字符串的片断，并在新的字符串中返回被提取的部分。
substr()	|从起始索引号提取字符串中指定数目的字符。
substring()	|提取字符串中两个指定的索引号之间的字符。
toLocaleLowerCase()	|把字符串转换为小写。
toLocaleUpperCase()	|把字符串转换为大写。
toLowerCase()	|把字符串转换为小写。
toUpperCase()	|把字符串转换为大写。
toString()	|返回字符串。
valueOf()	|返回某个字符串对象的原始值。

### 单体内置对象
#### Global对象
##### eval()方法
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
```js
eval(string)
```

参数 | 描述 |
-----|-----|
string |必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。
例：
```js
eval("var msg = 'hellow world';");
alter(msg);                 //hello world

"use strict";
eval = "hi";                    //causes error
```
`严格模式下，载外部访问不到eval()中创建的任何变量或函数，所以以前两个例子会报错，为eval赋值也会报错。eval()非常强大但也非常危险，如代码注入`

### 包装对象
所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。
```js
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

//成三个对象，与原始值的类型不同,用typeof运算符就可以看出来。

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```
##### valueOf()
`valueOf`方法返回包装对象实例对应的`原始类型的值。`
##### toString()
`toString`方法返回实例对应的`字符串形式。`
#### 原始类型的自动转换
原始类型的值，可以自动当作对象调用，即调用各种对象的方法和参数。这时，JavaScript引擎会自动将原始类型的值转为包装对象，在使用后立刻销毁。
```js
var s = 'Hello World';
s.x = 123;
s.x // undefined
//这里的包装对象是自动生成的，赋值后自动销毁，所以最后一行实际上调用的是一个新的包装对象。
```
另一方面，调用结束后，临时对象会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果想要为字符串添加属性，只有在它的原型对象String.prototype上定义（参见《面向对象编程》一章）。

### 小结
- 函数实际上是Function类型的实例，因此函数也是对象，所以也拥有方法，可增强其行为

因为有了基本包装类型，所以js中的基本类型值可以被当做对象访问，三种分别为：Boolean，Number和String。以下为共同特征：
- 每个包装都映射同名的基本类型
- 在读取模式下访问基本类型时会创建基本包装类型的一个对象并以此操作
- 操作基本类型值得语句一经执行完毕，就会立即销毁新创造的包装对象

## 参考

- [JavaScript高级教程3第五章-引用类型]()
- [w3cSchool-javascript](http://www.w3school.com.cn/b.asp)
- [阮一峰JavaScript参考标准-包装对象](http://javascript.ruanyifeng.com/stdlib/wrapper.html)
