# 对象
[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)需要多看几遍
## 方法
### Object.create()
#### 描述：创建一个新对象
#### 参数：[proto]：新创建的对象的原型（__proto__）；[propertiesObject]：不明
``` js
let obj = {
  name: 'djlun'
}
let me = Object.create(obj)
console.log(me) // {}
                //  __proto__:
                //    name: "djlun"
                //    __proto__: Object
```
``` js
let obj = {}  // {}
              //   __proto__: Object
等同于：
let obj = Object.create(Object.prototype) // {}
                                          //   __proto__: Object
区别于：
let obj = Object.create(null) // {}
                              //   No properties
```
***
### 用 Object.create实现类式继承
[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
***
### Object.assign()
#### 描述：用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
#### 参数：[target]：目标对象，一个；[source]：源对象，一个或多个
#### 返回值：返回目标对象
::: tip
如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。
:::
``` js
let obj = { name: 'djlun', age: 18 }
let newObj = Object.assign(obj, {age: 24}, {sex: 0}, {school: 'pinghu'})
console.log(obj) // {name: "djlun", age: 24, sex: 0, school: "pinghu"}
console.log(newObj) // {name: "djlun", age: 24, sex: 0, school: "pinghu"}
```
如果某个源对象是不可枚举的，则会略过这个源对象，比如数值类型的源对象。

原始类型会被包装，null 和 undefined 会被忽略。只有字符串的包装对象才可能有自身可枚举属性。
``` js
let obj = { name: 'djlun', age: 18 }
let newObj = Object.assign(obj, 1)
console.log(newObj) // {name: "djlun", age: 18}
let obj2 = Object.assign(obj, 'str')
console.log(obj2) // {0: "s", 1: "t", 2: "r", name: "djlun", age: 18}
```
***
### 复制一个对象
``` js
let obj = { name: 'djlun', age: 18, info: {school: 'pinghu', class: '201'} }
let copy = Object.assign({}, obj)
obj.age = 24
obj.info.school = 'lindai'
console.log(obj)  // {
                  //   age: 24
                  //   info: {school: "lindai", class: "201"}
                  //   name: "djlun"
                  // }
console.log(copy) // {
                  //   age: 18
                  //   info: {school: "lindai", class: "201"}
                  //   name: "djlun"
                  // }
```
引用值改变时，obj和copy会一起改变
***
### 深拷贝
``` js
let obj = {name: 'djlun', info: {age: 24, sex: 0}}
let copy = JSON.parse(JSON.stringify(obj))
obj.name = 'zwenj'
obj.info.age = 18
console.log(obj)  // {
                  //   info: {age: 18, sex: 0}
                  //   name: "zwenj"
                  // }
console.log(copy) // {
                  //   info: {age: 24, sex: 0}
                  //   name: "djlun"
                  // }
```
### 拷贝访问器
[拉到最下面](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
***
### Object.defineProperty()
#### 描述：在指定对象上定义/修改一个属性
#### 参数：[obj]：指定对象；[prop]：要定义/修改的属性的名称；[des]：要被定义/修改的属性描述符(具体用法看例子)
#### 返回值：返回修改后的obj
::: tip
默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的。
:::
``` js
var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
let descriptor2 = {}
descriptor.value = 'static';
descriptor2.value = 'djlun'
console.log(Object.defineProperty(obj, 'key', descriptor)) // {key: "static"}
console.log(Object.defineProperty(obj, 'name', descriptor2)) // {key: "static", name: "djlun"}
obj.key = 'kay'
console.log(obj) // {key: "static", name: "djlun"}   !!!注意，没变
```
***
### 什么是属性描述符？
在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成。更多关于属性描述符类型以及他们属性的信息可以查看：Object.defineProperty.

一个属性描述符是一个记录，由下面属性当中的某些组成的：

- value 该属性的值(仅针对数据属性描述符有效)
- writable 当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
- get 获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- set 获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
- configurable 当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
- enumerable 当且仅当指定对象的属性可以被枚举出时，为 true。
***
### Object.defineProperties()
#### 描述：直接在一个对象上定义新的属性或修改现有属性，并返回该对象
[参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
***
### Object.entries()
#### 描述：返回一个给定对象自身可枚举属性的键值对数组
#### 参数：[obj]：给定对象
``` js
let obj = {name: 'djlun', age: 18}
console.log(Object.entries(obj))  // (2) [Array(2), Array(2)]
                                  //  0: (2) ["name", "djlun"]
                                  //  1: (2) ["age", 18]
                                  //  length: 2
```
***
### 将一个obj转化为map结构
``` js
let obj = {name: 'djlun', age: 18}
let map = new Map(Object.entries(obj))
console.log(map) // Map(2) {"name" => "djlun", "age" => 18}
```
***
### Object.getOwnPropertyDescriptor()
#### 描述：返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
#### 参数：[obj]：指定对象；[prop]：指定对象的某个属性名称
#### 返回值：如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined
``` js
let obj = {name: 'djlun'}
console.log(Object.getOwnPropertyDescriptor(obj, 'name')) // {value: "djlun", writable: true, enumerable: true, configurable: true}
```
***
### Object.getOwnPropertyNames()
#### 描述：返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
#### 参数：[obj]：指定对象
#### 返回值：在指定对象上找到的自身属性对应的字符串数组。
``` js
let obj = {name: 'djlun', age: 16}
console.log(Object.getOwnPropertyNames(obj)) // ["name", "age"]

let arr = ['name', 'age']
console.log(Object.getOwnPropertyNames(arr)) // ["0", "1", "length"]
```
***
### Object.getOwnPropertySymbols()
#### 描述：返回一个给定对象自身的所有 Symbol 属性的数组
#### 参数：[obj]：给定对象
#### 返回值：返回在给定对象自身上找到的所有 Symbol 属性的数组
``` js
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");
obj[a] = "localSymbol";
obj[b] = "globalSymbol";
console.log(obj) // {Symbol(a): "localSymbol", Symbol(b): "globalSymbol"}
var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]) // Symbol(a)
```
***
### Object.getPrototypeOf()
#### 描述：返回指定对象的原型（即prototype属性的值）
#### 参数：[obj]：指定对象
#### 返回值：给定对象的原型。如果没有继承属性，则返回 null 
``` js
let proto = {}
let obj = Object.create(proto)
console.log(Object.getPrototypeOf(obj) === proto) // true
```
Object.getPrototypeOf(Object)  不是  Object.prototype :
``` js
console.log(Object.getPrototypeOf(Object)) // ƒ () { [native code] }
console.log(Object.getPrototypeOf(Function)) // ƒ () { [native code] }
console.log(Object.getPrototypeOf(Object) === Function.prototype) // true

// Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
// 返回的当然是函数对象的原型，也就是 Function.prototype。
```
``` js
console.log(Object.getPrototypeOf('str')) // String {"", length: 0, constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
```
### Object.is()
#### 描述：判断两个值是否是相同的值
#### 参数：[val1];[val2]：要进行判断的两个值
#### 返回值：相同返回true，不相同返回false
``` js
console.log(Object.is({name:'djlun'},{name:'djlun'})) // false
```
``` js
let obj1 = {name:'djlun'}
let obj2 = {name:'djlun'}
console.log(Object.is(obj1, obj2)) // false
```
``` js
let obj1 = { name: 'djlun' }
let obj2 = obj1
console.log(Object.is(obj1, obj2)) // true
```
Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
  1. 都是正零 +0
  2. 都是负零 -0
  3. 都是 NaN
  4. 都是除零和 NaN 外的其它同一个数字

这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 为 true 的现象），但 Object.is *不会做这种类型转换* 。

这与===运算符也不一样。===运算符（和==运算符）将数字值-0和+0视为相等，并认为Number.NaN不等于NaN。
***
### Object.freeze()
#### 描述：可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性
#### 参数：[obj]：要被冻结的对象
#### 返回值：返回被冻结的对象
::: tip
一个对象被冻结后，如果更改它的属性，不在严格模式下不报错，只是改了也不变；严格模式下报错
:::
``` js
let obj = {name: 'djlun'}
console.log(Object.freeze(obj)) // {name: "djlun"}
obj.name = 'zwenj'
console.log(obj) // {name: "djlun"}
function test () {
  'use strict'
  obj.name = 'zwenj' // annot assign to read only property 'name' of object '#<Object>'
}
test()
```
***
### Object.isFrozen()
#### 描述：判断一个对象是否被冻结
#### 参数：[obj]：被检测对象
#### 返回值：被冻结返回true，没被冻结返回false
``` js
// 一个对象默认是可扩展的,所以它也是非冻结的.
Object.isFrozen({}); // === false

// 一个不可扩展的空对象同时也是一个冻结对象.
var vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen) //=== true;

// 一个非空对象默认也是非冻结的.
var oneProp = { p: 42 };
Object.isFrozen(oneProp) //=== false

// 让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,
// 因为p属性仍然是可以配置的(而且可写的).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp) //=== false

// ...如果删除了这个属性,则它会成为一个冻结对象.
delete oneProp.p;
Object.isFrozen(oneProp) //=== true

// 一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的.
var nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", { writable: false }); // 变得不可写
Object.isFrozen(nonWritable) //=== false

// 把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(nonWritable, "e", { configurable: false }); // 变得不可配置
Object.isFrozen(nonWritable) //=== true

// 一个不可扩展的对象,拥有一个不可配置但可写的属性,则它仍然是非冻结的.
var nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", { configurable: false });
Object.isFrozen(nonConfigurable) //=== false

// 把这个属性改为不可写,会让这个对象成为冻结对象.
Object.defineProperty(nonConfigurable, "release", { writable: false });
Object.isFrozen(nonConfigurable) //=== true

// 一个不可扩展的对象,值拥有一个访问器属性,则它仍然是非冻结的.
var accessor = { get food() { return "yum"; } };
Object.preventExtensions(accessor);
Object.isFrozen(accessor) //=== false

// ...但把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(accessor, "food", { configurable: false });
Object.isFrozen(accessor) //=== true

// 使用Object.freeze是冻结一个对象最方便的方法.
var frozen = { 1: 81 };
Object.isFrozen(frozen) //=== false
Object.freeze(frozen);
Object.isFrozen(frozen) //=== true

// 一个冻结对象也是一个密封对象.
Object.isSealed(frozen) //=== true

// 当然,更是一个不可扩展的对象.
Object.isExtensible(frozen) //=== false
```
***
### Object.seal()
#### 描述：封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。
#### 参数：将要被封闭的对象
#### 返回值：被封闭的对象
使用Object.freeze()冻结的对象中的现有属性是不可变的。用Object.seal()密封的对象可以改变其现有属性。
***
### Object.isSealed()
#### 描述：判断一个对象是否被密封
#### 参数：[obj]：要被检查的对象
#### 返回值：被密封返回true，没被密封返回false
``` js
// 新建的对象默认不是密封的.
var empty = {};
Object.isSealed(empty); // === false

// 如果你把一个空对象变的不可扩展,则它同时也会变成个密封对象.
Object.preventExtensions(empty);
Object.isSealed(empty); // === true

// 但如果这个对象不是空对象,则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
var hasProp = { fee: "fie foe fum" };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // === false

// 如果把这个属性变的不可配置,则这个对象也就成了密封对象.
Object.defineProperty(hasProp, "fee", { configurable: false });
Object.isSealed(hasProp); // === true

// 最简单的方法来生成一个密封对象,当然是使用Object.seal.
var sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // === true

// 一个密封对象同时也是不可扩展的.
Object.isExtensible(sealed); // === false

// 一个密封对象也可以是一个冻结对象,但不是必须的.
Object.isFrozen(sealed); // === true ，所有的属性都是不可写的
var s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // === false， 属性"p"可写

var s3 = Object.seal({ get p() { return 0; } });
Object.isFrozen(s3); // === true ，访问器属性不考虑可写不可写,只考虑是否可配置
```
***
### Object.preventExtensions()
#### 描述：让一个对象变的不可扩展，也就是永远不能再添加新的属性。
#### 参数：[obj]：将要变得不可扩展的对象
#### 返回值：已经不可扩展的对象
``` js
// Object.preventExtensions将原对象变的不可扩展,并且返回原对象.
var obj = {};
var obj2 = Object.preventExtensions(obj);
obj === obj2;  // true
 
// 字面量方式定义的对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty) //=== true
 
// ...但可以改变.
Object.preventExtensions(empty);
Object.isExtensible(empty) //=== false
 
// 使用Object.defineProperty方法为一个不可扩展的对象添加新属性会抛出异常.
var nonExtensible = { removable: true };
Object.preventExtensions(nonExtensible);
Object.defineProperty(nonExtensible, "new", { value: 8675309 }); // 抛出TypeError异常
 
// 在严格模式中,为一个不可扩展对象的新属性赋值会抛出TypeError异常.
function fail()
{
  "use strict";
  nonExtensible.newProperty = "FAIL"; // throws a TypeError
}
fail();
 
// 一个不可扩展对象的原型是不可更改的,__proto__是个非标准魔法属性,可以更改一个对象的原型.
var fixed = Object.preventExtensions({});
fixed.__proto__ = { oh: "hai" }; // 抛出TypeError异常
```
***
### Object.isExtensible()
#### 描述：判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）
#### 参数：[obj]：需要检测的对象
#### 返回值：可扩展返回true，不可扩展返回false
Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）
``` js
// 新对象默认是可扩展的.
var empty = {};
console.log(Object.isExtensible(empty)) // true

// ...可以变的不可扩展.
Object.preventExtensions(empty);
console.log(Object.isExtensible(empty)) // false

// 密封对象是不可扩展的.
var sealed = Object.seal({});
console.log(Object.isExtensible(sealed)) // false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
console.log(Object.isExtensible(frozen)) // false
```
***
### Object.keys()
#### 描述：返回一个由一个给定对象的自身可枚举 *属性* 组成的数组
#### 参数：[obj]：给定对象
#### 返回值：一个数组
``` js
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```
::: tip
如果你想获取一个对象的所有属性,，甚至包括不可枚举的，请查看Object.getOwnPropertyNames
:::
***
### Object.values()
#### 描述：返回一个由一个给定对象自身的所有可枚举 *属性值* 组成的数组
#### 参数：[obj]：给定对象
#### 返回值：一个数组
``` js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']
```
***
### Object.setPrototypeOf()
#### 描述：设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null
::: danger 警告: 
由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。
:::
::: tip
Object.setPrototypeOf()是ECMAScript 6最新草案中的方法，相对于 Object.prototype.__proto__ ，它被认为是修改对象原型更合适的方法
:::


## 继承方法：
### hasOwnProperty()
#### 描述：判断对象自身属性中是否具有指定的属性
#### 参数：[prop]：要判断的指定属性
#### 返回值：有则返回true，没有则返回false
::: tip 注意
这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性
:::
``` js
o = new Object();
o.prop = 'exists';
console.log(o.hasOwnProperty('prop')) // true
console.log(o.hasOwnProperty('toString')) // false
console.log(o.hasOwnProperty('hasOwnProperty')) // false
```
``` js
let obj1 = { name: 'djlun' }
let obj = Object.create(obj1)
obj.age = 19
for (let prop in obj) {
  if (obj.hasOwnProperty(prop) === true) {
    console.log(`${prop} is a obj property`)
  } else {
    console.log(`${prop} is not a obj property`)
  }
}
// age is a obj property
// name is not a obj property
```
***
### isPrototypeOf()
#### 描述：用于测试一个对象是否存在于另一个对象的原型链上
#### 参数：[obj]：在该对象的原型链上进行搜寻
#### 返回值：调用对象在参数对象的原型链上则返回true，否则返回false
::: tip 注意
isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。
:::
``` js
function Fn1() {}
function Fn2() {}
function Fn3() {}

Fn2.prototype = Object.create(Fn1.prototype);
Fn3.prototype = Object.create(Fn2.prototype);

var obj = new Fn3();

console.log(Fn3.prototype.isPrototypeOf(obj)); // true
console.log(Fn2.prototype.isPrototypeOf(obj)); // true
console.log(Fn1.prototype.isPrototypeOf(obj)); // true
console.log(Object.prototype.isPrototypeOf(obj)); // true

// 可用来检查某一对象是否继承自某一对象
```
***
### propertyIsEnumerable()
#### 描述：判断对象中指定的属性是否可以被for...in循环枚举，但是通过原型链继承的属性除外
#### 参数：[prop]：指定属性
#### 返回值：指定属性可枚举，则返回true，不可枚举或者对象没有指定的属性，则返回false
***
### toLocaleString()
#### 描述：返回一个该对象的字符串表示
#### 返回值：字符串
***
### toString()
#### 描述：返回一个表示该对象的字符串
#### 返回值：字符串
``` js
let obj = { name: 'djlun' }
console.log(obj.toString()) // [object Object]
```
***
### watch()
#### 描述：监视属性是否被赋值并在赋值时运行相关函数
暂不了解
***
### unwatch()
#### 描述：删除一个 watch() 设置的 watchpoint
暂不了解
***
## [运算符](/jsdoc/operator.html)