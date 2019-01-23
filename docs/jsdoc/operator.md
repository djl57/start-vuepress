# 运算符

## in
#### 描述：指定的属性是否在指定的对象中或其原型链中
#### 参数：[prop]：指定属性；[obj]：指定对象
#### 返回值：在则返回true，不在返回fasle
``` js
let obj = { name: 'djlun' }
console.log(name in obj) // false
```
``` js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
3 in trees        // 返回true
6 in trees        // 返回false
"bay" in trees    // 返回false (必须使用索引号,而不是数组元素的值)

"length" in trees // 返回true (length是一个数组属性)

Symbol.iterator in trees // 返回true (数组可迭代，只在ES2015+上有效)


// 内置对象
"PI" in Math          // 返回true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回true
"model" in mycar // 返回true
```
in右操作数必须是一个对象值。例如，你可以指定使用String构造函数创建的字符串，但不能指定字符串文字:
``` js
var color1 = new String("green");
console.log("length" in color1) // true
var color2 = "coral";
console.log("length" in color2) // 报错(Cannot use 'in' operator to search for 'length' in coral)
```
***
## instanceof
#### 描述：用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
#### 语法：
``` js
object instanceof constructor
```
***
## 解构赋值
#### 描述：使得可以将值从数组或属性从对象提取到不同的变量中。
``` js
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

// 剩余元素必须是数组的最后一个元素
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

let obj = {name: 'djlun', age: 18}
let {name, age} = obj
console.log(name) // 'djlun'
console.log(age)  // 18

let obj = {name: 'djlun', age: 18}
let {name:newName, age:newAge} = obj
console.log(newName) // 'djlun'
console.log(newAge)  // 18

let { a, b } = { a: 10, b: 20 }
console.log(a) // 10
console.log(b) // 20

// 因为左边的{a, b}被认为是一个块而不是对象字面量。
// ( ... ) 表达式需要一个分号在它前面，否则它也许会被当成上一行中的函数来执行
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{c: 30, d: 40}
```
[MDN更多例子](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
***
### 函数参数默认值
``` js
function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  var size = options.size === undefined ? 'big' : options.size;
  var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
  var radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, cords, radius);
}
drawES5Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});

// 这里如果没有 = {} 则在函数没有传参的情况下会报错
function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
  console.log(size, cords, radius);
}
drawES2015Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});
```
***
### 解构 嵌套对象和数组
``` js
let info = {
  name: 'djlun',
  age: 18,
  more: [
    { school: 'pinghu' },
    { clazz: '201' }
  ]
}

let { name, age, more:[ {school}, {clazz} ] } = info
console.log(`My name ${name}, and i am ${age} years old.The name of my school is ${school}.I am in class${clazz}`)
// My name djlun, and i am 18 years old.The name of my school is pinghu.I am in class201
```
***
### For of 迭代和解构
``` js
let obj = [
  { name: 'djlun', age: 18 },
  { name: 'zwenj', age: 23 }
]
for (let {name,age} of obj) {
  console.log(`My name is ${name}.I am ${age} years old.`)
}
// My name is djlun.I am 18 years old.
// My name is zwenj.I am 23 years old.
```
***
### 从作为函数实参的对象中提取数据
``` js
let user = {
  id: 123,
  info: {
    name: 'djlun',
    age: 18,
    sex: 0
  }
}
function userId ({id}) {
  console.log(`userId: ${id}`)
}
userId(user) // userId: 123
function whois ({ id, info: { name, age, sex } }) {
  console.log(`id: ${id};name: ${name};age: ${age}; sex: ${sex}`)
}
whois(user) // id: 123;name: djlun;age: 18; sex: 0
```
***
## 类表达式
#### 描述：用来定义类的一种语法
#### 语法：
``` js
const MyClass = class [className] [extends] {
  // class body
};
```
***
### 使用类表达式语法创建了一个匿名类
``` js
let Person = class {
  constructor() {}
  sayName() {
    return console.log('djlun')
  }
}
let me = new Person()
me.sayName() // djlun
```
***
### 如果想在类体内部也能引用这个类本身，那么就使用命名类表达式，并且这个类名只能在类体内部访问。
``` js
let Persons = class Person {
  constructor() {}
  sayName() {
    return Person
  }
}
let me = new Persons()
console.log(me) // Person {}
                //  __proto__:
                //  constructor: class Person
                //  sayName: ƒ sayName()
console.log(Persons)  // class Person {
                      //   constructor() {}
                      //   sayName() {
                      //     return Person
                      //   }
                      // }
```
***
## delete操作符
#### 描述：用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
#### 语法：
``` js
delete object.property 
delete object['property']
```
#### 返回值：对于所有情况都是true，除非属性是一个自己不可配置的属性，在这种情况下，非严格模式返回 false。严格模式下，抛出异常。
***
## function*关键字
#### 描述：在表达式内部定义一个生成器函数
***
## new运算符
### new.target 属性
``` js
// 在普通的函数调用中（和作为构造函数来调用相对），new.target的值是undefined
function Person () {
  if (!new.target) {
    console.log('please use new')
  } else {
    console.log('has new')
  }
}
let me = new Person() // has new
let you = Person() // please use new
console.log(me) // Person {}
console.log(you) // undefined
```