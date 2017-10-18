---
layout: post
title:  "js高程学习笔记-part.2"
categories: JavaScript JS高程笔记
tags:  JavaScript 对象 原型 继承 this 构造模式
author: Beats0
---

* content
{:toc}
#### *chapter.6 面向对象程序设计*
#### *page：157-193*




### 理解对象
#### 属性类型
javascript一共用三种属性

##### 普通属性（数据属性）
包含一个数据的位置。在这个位置可以读取和写入值，这种属性是用户赋给它们，它们就返回什么，不会做额外的事情。有四个描述其行为的特性：
- `[[Configurable]]`

  表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修`改为访问器属性`。
  直接在对象上定义的属性，默认为true。

- `[[Enumerable]]`

  表示能否通过for-in循环返回属性。直接在对象上定义的属性，默认为true。除了for-in循环之外，ECMAScript5定义了两个用以枚举属性名称的函数。

  Object.keys()：返回一个数组，这个数组由对象中可枚举的自有属性的名称组成。

- `[[Writable]]`

  表示能否修改属性的值。直接在对象上定义的属性，默认为true。
- `[[Value]]`

  包含这个属性的数据值；读取属性值的时候，从这个位置读取；写入属性值的时候，把值保存在这里。这个特性默认为undefined。

例：
```js
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
console.log(person.name);//Nicholas
person.name = "Greg";
console.log(person.name)//Nicholas
```
`尝试为它指定一个新值，在非严格模式下赋值操作会被忽略；在严格模式下会报错，另外一旦把属性定义为不可配置就不能再把它变回可配置，即限制性`

##### 访问器属性
不包含数据值，包含一对getter(读取返回)与setter(传入写入)【这两个为非必须】，允许用户在赋值或取值都经过预先设定的函数，从而实现内部属性的那一种特殊效果。有4个特性：
- `[[Configurable]]`

  表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性`修改为数据属性`。
  直接在对象上定义的属性，默认为true。

- `[[Enumerable]]`

  表示能否通过for-in循环返回属性。直接在对象上定义的属性，默认为true。

- `[[Get]]`

  读取属性时调用的函数，默认值undefined

- `[[Set]]`

  在写入属性时调用的函数，默认值undefined

例：
```js
var book = {
    //两个属性
    _year : 2004,
    edition : 1
};
Object.defineProperty(book,"year",{                 //这里的year是book对象的一个访问器属性，调用的book.year即set()方法，返回book._year这个数据属性
    get : function () {
        return this._year;
    },
    set : function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year = 2005;
```

##### 内部属性
比如数组的length属性，函数的prototype属性， DOM节点的innerHTML属性，用户对它们进行赋值后， 再取值时，它不一定按我们的预期做事，此外还会做一些格外的事情。另外，我们也很难改变它们的行为。 比如说某一数组，它的长度为10, 当我们设置它为11时，它就会增加一个undefined元素，再设置为9时，就会从后面删掉两个元素。 函数的prototype如果被改变，相当于将其父类改变了，会new不同类型的实例。 DOM的innerHTML，我们赋值时是一个字符串，再取出时，这字符串可能会与原来的不一样， 并且在原元素上生成了不一样的子节点。

### `this` 关键字
`this`总是返回一个对象，简单说，就是返回属性或方法“当前”所在的对象。

*由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的*
```js
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var B = {
  name: '李四'
};

B.describe = A.describe;
B.describe()
// "姓名：李四"
```
上面代码中，A.describe属性被赋给B，于是B.describe就表示describe方法所在的当前对象是B，所以this.name就指向B.name

#### 使用场合
##### 1.全局环境
在全局环境使用this，它指的就是顶层对象window。
```js
this === window // true

function f() {
  console.log(this === window); // true
}
```

##### 2.构造函数
构造函数中的this，指的是实例对象。
```js
var Obj = function (p) {
  this.p = p;
};

Obj.prototype.m = function() {
  return this.p;
};
```
##### 3.对象的方法
当 A 对象的方法被赋予 B 对象，该方法中的this就从指向 A 对象变成了指向 B 对象。所以要特别小心，`将某个对象的方法赋值给另一个对象，会改变this的指向。`
```js
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // 方法调用，指向obj
```
`如果某个方法位于多层对象的内部，这时this只是指向当前一层的对象，而不会继承更上面的层。`
```js
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};

a.b.m() // undefined
```
上面代码中，`a.b.m`方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b。这是因为实际执行的是下面的代码。
```js
var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};

(a.b).m() // 等同于 b.m()
```
如果要达到预期效果，只有写成下面这样。
```js
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};
```
#### 使用注意点
##### 1.避免多层 this
由于this的指向是不确定的，所以切勿在函数中包含多层的this。
```js
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
```
上面代码包含两层this，结果运行后，第一层指向该对象，第二层指向全局对象。实际执行的是下面的代码。
```js
var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}
```
一个解决方法是在第二层改用一个指向外层this的变量。
```js
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
```
上面代码定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变。

JavaScript 提供了严格模式，也可以硬性避免这种问题。在严格模式下，如果函数内部的this指向顶层对象，就会报错。
```js
var counter = {
  count: 0
};
counter.inc = function () {
  'use strict';
  this.count++
};
var f = counter.inc;
f()
// TypeError: Cannot read property 'count' of undefined
```
##### 2.避免数组处理方法中的this
数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。
```js
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()
// undefined a1
// undefined a2
```
上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。

使用中间变量:
```js
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}

o.f()
// hello a1
// hello a2
```
##### 3.避免回调函数中的this
回调函数中的this往往会改变指向，最好避免使用。
```js
var o = new Object();

o.f = function () {
  console.log(this === o);
}

o.f() // true
```
上面代码表示，如果调用o对象的f方法，其中的this就是指向o对象。

#### 绑定 this 的方法
##### function.prototype.bind()
bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
```js
var d = new Date();
d.getTime() // 1481869925657

var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.
```
上面代码中，我们将d.getTime方法赋给变量print，然后调用print就报错了。这是因为getTime方法内部的this，绑定Date对象的实例，赋给变量print以后，内部的this已经不指向Date对象的实例了。

bind方法可以解决这个问题，让log方法绑定console对象。
```js
var print = d.getTime.bind(d);
print() // 1481869925657
```
例子：
```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

counter.count // 0
counter.inc()
counter.count // 1
```
上面代码中，counter.inc内部的this，默认指向counter对象。如果将这个方法赋值给另一个变量，就会出错。
```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc;
func();
counter.count // 0
count // NaN
```
上面代码中，函数func是在全局环境中运行的，这时inc内部的this指向顶层对象window，所以counter.count是不会变的，反而创建了一个全局变量count。因为window.count原来等于undefined，进行递增运算后`undefined++`就等于`NaN`。

为了解决这个问题，可以使用bind方法，将inc内部的this绑定到counter对象。

```js
var func = counter.inc.bind(counter);
func();
counter.count // 1
```
对于那些不支持bind方法的老式浏览器，可以自行定义bind方法。
```js
if(!('bind' in Function.prototype)){
  Function.prototype.bind = function(){
    var fn = this;
    var context = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
      return fn.apply(context, args);
    }
  }
}
```

### 创建对象
#### 工厂模式
工厂模式是软件工程领域一种广为人知的设计模式
在函数内创建一个对象，给对象赋予属性及方法再将对象返回即可。
```js
function createPerson(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName= function() {
    alert(this.name);
  };
  return o;
}

var person1 = createPerson('Nicholas', 29);
```
工厂模式的实现方法非常简单，解决了创建多个相似对象的问题，但是工厂模式却无从识别对象的类型，即怎样知道一个对象的类型，因为全部都是Object，不像Date、Array等，因此出现了构造函数模式。

#### 构造函数模式
```js
function Person(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName= function() {
    alert(this.name);
  };
}

var person1 = new Person('Nicholas', 29);
```
区别：Person()函数取代
- 没有明显的创建对象
- 直接将属性和方法赋给this对象
- 没有return语句
- 创建新实例必须使用new操作符

#### `原型模式`
每创建一个函数都有相应的`prototype(原型)`属性，即通过构造函数而创建的那个对象实例的原型对象，使用原型可以将信息直接添加到原型对象中。
```js
// 构造函数
function Person(){};

Person.prototype.name = "Beats0";
Person.prototype.age = 19;
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
person1.sayName();  // "Beats0"

var person2 = new Person();
person2.sayName();  // "Beats0"
```
我们将所有的属性和sayName()方法添加到了构造函数Person的prototype属性中，构造函数成了空函数。但是即便如此，我们也可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。

#### `constructor`

- 实例对象就是通过构造函数创造的，默认拥有一个`constructor`属性指向其构造函数。

*构造函数，实例对象和原型对象的关系:*

- 原型对象就是构造函数的属性prototype指向的那个对象，同时也是基于构造函数生成的实例对象的原型对象。在默认情况下，所有的原型对象都会自动获得一个constructor属性，这个属性是一个指针，指向其构造函数。

- 实例对象可以访问原型对象上的属性和方法。在实例对象的内部有一个属性（内部属性）`[[Prototype]]`指向其原型对象。有一种非标准方法`__proto__`访问`[[Prototype]]`。

在上面的例子中person1和person2就是实例对象，构造函数为Person，原型对象为`Person.prototype`。

`坑`
`实例对象本身并没有constructor属性，但它可以继承原型对象的constructor属性`
所以当给原型对象赋值一个新对象时，切记将原型对象的constructor指回原构造函数:
```js
Person.prototype.constructor = Person
```


每次查找对象的每个属性，都是一次搜索。搜索从实例对象本身开始，如果在实例对象中找到，停止查找，返回值。如果没有则继续搜索实例对象指向的原型对象。

若实例对象中属性和其指向的原型对象的属性重名，实例对象中的属性屏蔽原型对象中的那个属性。
```js
function Person(){};

Person.prototype.name = "Beats0";
Person.prototype.age = 19;
Person.prototype.sayName = function(){
    alert(this.name);
}

var person1 = new Person();
var person2 = new Person();

person1.name = "Nicholas";
person1.sayName();   // "Nicholas"，来自实例
person2.sayName()   // "Beats0"，来自原型

delete person1.name;
person1.sayName();  // "Beats0"，来自原型
```
可以利用`hasOwnProperty()`方法判断一个属性是位于实例中，还是原型中。只有在属性来自实例中时，才会返回true。通常和in操作符配合使用。
```js
// 接上
alert("name" in person1);   // true
alert(person1.hasOwnProperty("name"));  // false
```

`Object.key()方法`:要取得对象上所有可枚举实例属性，可以使用ES5中的Object.key()方法，它接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。例：
```js
function Person() {
}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.sayName = function () {
    alert(this.name);
};
var keys = Object.keys(Person.prototype);
alert(keys);        //name,age,sayName

var person1 = new Person();
person1.name = "Rob";
person1.age = 31;
var person1keys = Object.keys(person1);
alert(person1keys);     //name,age
```

*原型模式也不是没有缺点，首先，它省略了构造函数传递初始化参数这一环节，结果所有实例在默认情况下都取得了相同的属性值，这样非常不方便，但这还是不是原型的最大问题，原型模式的最大问题在于共享的本性所导致的，由于共享，因此因此一个实例修改了引用，另一个也随之更改了引用。因此我们通常不单独使用原型，而是结合原型模式与构造函数模式。*


#### `组合模式`(原型模式 + 构造函数模式)


*混合模式中构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。每个实例都会有自己的一份实例属性，但同时又共享着方法，最大限度的节省了内存。另外这种模式还支持传递初始参数。优点甚多。这种模式在ECMAScript中是使用最广泛、认同度最高的一种创建自定义对象的方法。*

#### 动态原型
由于在原型中查找值的过程是一次搜索，所以对原型对象的任何修改都能立即从实例上反应出来。动态原型模式将所有信息封装在了构造函数中，而通过构造函数中初始化原型（仅第一个对象实例化时初始化原型），这个可以通过判断该方法是否有效而选择是否需要初始化原型。
```js
function Person(){};
var firend = new Person();
// 修改原型
Person.prototype.sayHi = function(){
    alert("Hi");
}

firend.sayHi(); // "Hi"
```
但是若将原型重写，来看看有什么不同：
```js
function Person(){};
Person.prototype.name = "Nicholas";
var firend = new Person();
// 重写了原型对象
Person.prototype = {
    constructor: Person,  // 注意：重写原型对象，所以此时的constructor属性变成了新对象的构造函数，默认为Object构造函数，应该将其设置回适当的值
    sayHi: function(){
        alert("Hi");
    }
}

alert(friend.name); // "Nicholas"
firend.sayHi(); // error
```

#### 寄生构造函数模式(少使用)
在集中模式下都不适用的的情况下可使用`寄生构造函数模式`，基本思想是创建一个函数，该函数作用仅仅是封装对象的代码，然后返回新创建的对象，很像构造函数。例：
```js
function SpecialArray() {
    var values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
}

var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString());        //red|blue|green
```
*返回的对象与构造函数或者构造函数的原型属性简没有关系，没有什么不同，不能依赖instanceof操作符来确定对象类型，故不建议使用*

#### 稳妥构造函数模式(少使用)
指没有公共属性，而且方法也`不引用this的对象`，适合在一些安全环境中(禁止this和new)，或者防止数据被其他程序修改使用,同样的不能依赖instanceof操作符来确定对象类型，故不建议使用
```js
function Person(name, age) {
    var o = new Object();
    o.sayname = function () {
        alert(name);
    };
    return o;
}

var frind = Person("Nicholas", 29);
frind.sayname();        //Nicholas
```

### 继承
#### `原型链`
将原型链作为实现继承的主要方法，其基本思想为利用原型让一个引用类型继承另一个引用类型的属性的方法
```js
function SuperType(){
    this.name = 'Nicholas';
}

SuperType.prototype.friends = ['David','Bob','Lucy'];
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(){
    this.age = 30;
}

SubType.protoType = new SuperType();//通过原型对象继承SuperType

var subType1 = new SubType();
var subType2 = new SubType();

subType1.friends.push('Jake');

console.log(subType1.friends); // ['David','Bob','Lucy','Jake']
console.log(subType2.friends); // ['David','Bob','Lucy','Jake']
```
*缺点：*
- 引用类型的值在原型中会被所有实例共享.
- 不能向超类的构造函数中传递参数

#### 借用构造函数继承
借用构造函数继承是将超类(SuperType)所有的属性和方法都写在构造函数中,最后在新创建的函数(SubType)体内通过`call()`和`apply()`方法调用修改。
```js
function SuperType(){
    this.name = 'Nicholas';
    this.friends =['David','Bob','Lucy'];
    this.sayName = function(){
        alert(this.name);
    }
}

function SubType(){
    //继承SuperType
    SuperType.call(this);
}

var subType = new SubType();
subType.sayName();
```
传递参数：
```js
function SuperType(name){//只接收name参数
    this.name = name;
}

function SubType(){
    //继承SuperType，同时传递参数
    SuperType.call(this,"Nicholas");

    //实例属性
    this.age=29;
}

var instance = new SubType();
console.log(instance.name);     //Nicholas
console.log(instance.age);      //29
```
*缺点:*
- 方法的定义都存在构造函数中,导致函数无法被复用

#### `组合继承`
组合继承是原型链继承和构造函数继承的结合体,结合了二者的优点,即实现了函数的复用,也不会导致引用类型值在多个实例中共享.
```js
function SuperType(){
    this.name='yuhualingfeng';
    this.friends=['David','Bob','Lucy'];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(){
    SuperType.call(this);
}

SubType.prototype = new SuperType();
var subType = new SubType();
```
*缺点:*
- 超类函数被执行了两次.
- 超类构造函数SuperType自身的属性(name,friends)被重复定义，即出现在SubType的构造函数中，也出现在SubType的原型对象中.

#### 原型式继承
`借助原型可以基于已有的对象创建新对象`，同时还不必因此创建自定义类型
```js
function object(obj){
 function F(){}
 F.prototype = obj;
 return new F();
}
```
这里的object方法接收obj对象,并将对象赋值给一个空函数的原型,并返回空函数的实例
```js
var person = {
 name:'yuhualingfeng',
 friends:['David','Bob','Lucy']
};

var anotherPerson = object(person);
anotherPerson.name = 'Jake';
anotherPerson.friends.push('Marry');

console.log(anotherPerson.friends); //['David','Bob','Lucy','Marry']

console.log(person.friends); //['David','Bob','Lucy','Marry']
```
*如果不想创建构造函数,只想让一个对象和另一个对象保持一致的情况下,原型继承是完全可以胜任的,不过有一点要注意的是,包含引用类型值得属性始终都会共享相应的值，就像使用原型模式一样*

#### 寄生式继承
创建一个仅用于封装继承过程的函数，该函数的内部以某种方式`增强对象`，最后再像是真的是它做了所有工作一样返回对象
```js
function createrAnother(obj){
    var clone = object(obj);
    clone.sayHi=function(){
     alert('Hi!');
    }
    return clone;
}

var person = {
    name:'Nicholas'
};

var anotherPerson = createAnother(person);
anohterPerson.sayHi();  // Hi
```
*寄生继承也是和原型继承一样也是继承对象,并产出对象,会由于不能做到函数复用而降低效率；这一点与构造函数模式相似*

#### `寄生式组合继承`
寄生组合继承是集寄生继承和组合继承的结合体,它结合了二者的优点
```js
//继承Supertype的原型对象
function inheritProtoType(SuperType,SubType){

     var prototype = object(SuperType.prototype);
     prototype.constructor = SubType;
     SubType.prototype = prototype;
}

function SuperType(){
    this.name = 'Nicholas';
    this.friends = ['David','Bob','Lucy'];
}

function SubType(){
    ////继承Supertype的构造函数属性
    SuperType.call(this);
    this.age = 30;
}

inheritProtoType(SuperType,SubType);
var subType = new SubType();
```
*寄生组合继承是前面几种继承思想碰撞在一起的产物,是执行效率最高也是应用面最广的*


### 小结
- `工厂模式`:简单使用，为对象添加属性和方法然后返回，但使用较少
- `构造函数模式`:创建自定义引用类型，可使用new，但不可复用
- `原型模式`:使用函数的prototype属性指定属性与方法
- `组合继承(最优):`使用构造函数定义实例的属性与方法，使用原型定义共享的属性与方法
- `原型继承模式`:可在不必预定构造函数的情况下实现继承，其本质为浅复制
- `寄生式模式`:基于某个对象或某些信息创建的一个对象，然后增强对象，返回对象，但不能复用
- `寄生组合式模式(最优):`
基于原型继承,并将寄生继承和组合继承结合,提高执行的效率




## 参考

- [JavaScript高级教程3第六章-面向对象程序设计]()
- [segmentfault-JavaScript理解对象：属性类型](https://segmentfault.com/q/1010000002664970)
- [阮一峰JavaScript参考标准-this关键字](http://javascript.ruanyifeng.com/oop/this.html)