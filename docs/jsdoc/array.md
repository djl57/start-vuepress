# 数组
## 介绍
数组对象用于在单个的变量中存储多个值

## 属性
### length
``` js
let arr = [1, 2, 3, 4, 5]
arr.length // 5
arr[10] = 9
arr.length // 11
arr // [1, 2, 3, 4, 5, empty × 5, 9]
arr.length = 7
arr // [1, 2, 3, 4, 5, empty × 2]
```
### constructor
#### 描述：构造器，默认是Array函数

## 创建数组
### 字面量或者Array构造器
``` js
let arr = [1, 2, 3, 4]
// new Array() 有三种使用方式
// 1.无参数
let arr = new Array()
console.log(arr) // []
                 // length: 0
                 // __proto__: Array(0)
// 2.一个参数
let arr = new Array(10)
console.log(arr) // (10) [empty × 10]
                 // length: 10
                 // __proto__: Array(0)
// 3.多于一个参数
let arr = new Array(10,20)
console.log(arr) // (2) [10, 20]
                 // 0: 10
                 // 1: 20
                 // length: 2
                 // __proto__: Array(0)
```
### 从 类数组对象 或者 可迭代对象 中创建一个新的数组实例：
#### 类数组对象：它是一个长得很像数组对象的对象，通过一些方法可以将它变为数组对象
``` js
let arrayLike = {
  "0": "a",
  "1": "b",
  "3": "c",
  length: 3
}

function fn() {
  // arguments即是类数组对象
  // 箭头函数中没有arguments
}
fn(1,2,3)
```
#### 通过es5的方法将其变为数组对象
``` js
[].slice.call(arrayLike)
```
#### 通过es6的方法将其变为数组对象
### Array.from()
#### 参数：[arrayLike]：想要转变为数组对象的类数组对象；[mapFn]：转变完成后得到的新数组立即要执行的map函数；[thisArg]：执行mapFn时的this对象
``` js
Array.from(arrayLike)
```
::: tip
``` js
Array.from(arrayLike, mapFn, thisArg)
```
等同于
``` js
Array.from(arrayLike).map(mapFn, thisArg)
```
:::
***
#### 可迭代对象：部署了遍历器（Iterator）接口的数据结构。字符串和Set结构都具有遍历器接口，所以是可迭代对象，就可以用Array.from()将其变为数组对象
``` js
// 字符串
Array.from('string') // ["s", "t", "r", "i", "n", "g"]

// Set结构 待了解
let s = new Set('123')
console.log(s) // Set(3) {"1", "2", "3"}
console.log(Array.from(s)) // (3) ["1", "2", "3"]
let se = new Set(['a', 'b'])
console.log(se) // Set(2) {"a", "b"}
console.log(Array.from(se)) // (2) ["a", "b"]

// Map结构 待了解
```
***
### 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型：
### Array.of()
#### 参数：[el]：新数组中的元素
#### 返回值：返回一个新的数组实例
``` js
let arr = Array.of('a', 'b', 'c', 12, {name:'djlun'}) // (5) ["a", "b", "c", 12, {…}]
```
#### 与new Array()的区别？
``` js
let arr = new Array(7) // (7) [empty × 7]
let arrOf = Array.of(7) // [7]
```
#### 如何兼容低版本？
``` js
function arrayOf() {
  return Array.prototype.slice.call(arguments)
}
arrayOf('a', 'b', 'c', 12, {name:'djlun'}) // (5) ["a", "b", "c", 12, {…}]
```
***
### 数组去重合并
``` js
function combine() {
  let arr = [].concat.apply([], arguments) // apply()和call()的区别在于apply接受一个参数数组，call接受的是参数列表
  // let arr = [].concat.call(...arguments)
  return Array.from(new Set(arr))
}
let m = [1,2,3], n = [2,3,4]
combine(m,n) // [1, 2, 3, 4]
```

## 什么是Set结构？
#### 描述：Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
#### 参数：具有迭代器（iterator）的对象
``` js
let s1 = new Set()
console.log(s1) // Set(0) {}
let s2 = new Set('str')
console.log(s2) // Set(3) {"s", "t", "r"}
let s3 = new Set(['a', 'b', 'b'])
console.log(s3) // Set(2) {"a", "b"}
let s4 = new Set('ssstrrr')
console.log(s4) // Set(3) {"s", "t", "r"}

let s5 = new Set(1) // 报错：number 1 is not iterable (cannot read property Symbol(Symbol.iterator))
console.log(s5)
let s6 = new Set({name:'djlun'}) // 报错：object is not iterable (cannot read property Symbol(Symbol.iterator))
console.log(s6) 
```
::: tip
对于 Set s， +0 （+0 严格相等于-0?）和-0是不同的值。

NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（尽管 NaN !== NaN）
:::
### set对象的属性：
### prototype
#### 描述：set构造器的原型
### Set.prototype.constructor
#### 描述：set构造器
### Set.prototype.size
#### 描述：set对象的值的个数
***
### set对象的方法：
### add()
#### 描述：在尾部添加一个元素
#### 参数：[val]：要添加的元素
#### 返回值：返回添加元素后的新set对象
***
### clear()
#### 描述：清空一个set对象里面的元素
#### 返回值：undefined
***
### delete()
#### 描述：从一个set对象中删除指定的元素
#### 参数：[val]：将要删除的元素
#### 返回值：删除成功返回true，否则返回false
***
### forEach() （和array的forEach方法类似）
#### 描述：
#### 参数：[fn]：每个元素都会执行的函数；[thisArg]：指定this指向的对象
#### fn的参数：[el]：元素的值；[index]：元素的索引；[setArr]：对象本身
``` js
let s = new Set('abc')
s.forEach((el, index, set) => {
  console.log(`s[${index}] = ${el}`)
})

// 打印结果
s[a] = a
s[b] = b
s[c] = c
```
需要注意set对象遍历出来的元素和对应的索引是一样的
***
### has()
#### 描述：判断参数是否存在于Set对象中
#### 参数：[val]：要判断的元素
#### 返回值：如果参数存在于Set对象中，则返回true，否则返回false
::: tip 注意
``` js
let s = new Set('abc')
console.log(s.has('a')) // true

let obj = { name: 'djlun' }
s.add(obj)
console.log(s.has(obj)) // true
console.log(s.has({ name: 'djlun' })) // false

s.add({ name: 'djlun' })
console.log(s.has({ name: 'djlun' })) // false

console.log(s)  // Set(5) {"a", "b", "c", {…}, {…}}
                // size: (...)
                // __proto__: Set
                // [[Entries]]: Array(5)
                // 0: "a"
                // 1: "b"
                // 2: "c"
                // 3: value: {name: "djlun"}
                // 4: value: {name: "djlun"}
                // length: 5

s.add({ name: 'djlun' })
console.log(s)  // Set(6) {"a", "b", "c", {…}, {…}, …}
                // size: (...)
                // __proto__: Set
                // [[Entries]]: Array(6)
                // 0: "a"
                // 1: "b"
                // 2: "c"
                // 3: value: {name: "djlun"}
                // 4: value: {name: "djlun"}
                // 5: value: {name: "djlun"}
                // length: 6
                // 此时上面的[[Entries]]的length也变为了6
```
:::
***
### entries()
#### 描述：返回一个新的迭代器对象，这个对象的元素是类似[value, value]形式的数组，这是为了和map的迭代器对象保持格式一致
``` js
let s = new Set('abc')
let setInter = s.entries()
console.log(setInter.next())  // {value: Array(2), done: false}
                              // done: false
                              // value: (2) ["a", "a"]
                              // __proto__: Object
console.log(setInter.next())  // {value: Array(2), done: false}
                              // done: false
                              // value: (2) ["b", "b"]
                              // __proto__: Object
console.log(setInter.next())  // {value: Array(2), done: false}
                              // done: false
                              // value: (2) ["c", "c"]
                              // __proto__: Object
console.log(setInter.next())  // {value: undefined, done: true}
                              // done: true
                              // value: undefined
                              // __proto__: Object
```
***
### values()
#### 描述：返回一个 Iterator 对象，这个对象包含了原 Set 对象里的每个元素。
``` js
let s = new Set('abc')
let sInter = s.values()
console.log(sInter.next())  // {value: "a", done: false}
                            // done: false
                            // value: "a"
                            // __proto__: Object

console.log(sInter.next())  // {value: "b", done: false}
                            // done: false
                            // value: "b"
                            // __proto__: Object

console.log(sInter.next())  // {value: "c", done: false}
                            // done: false
                            // value: "c"
                            // __proto__: Object

console.log(sInter.next())  // {value: undefined, done: true}
                            // done: true
                            // value: undefined
                            // __proto__: Object
```
::: tip
与entries()的区别在于value值
:::
***
### keys()
#### 描述：与values()方法一样
### Set()对象的迭代(遍历)
``` js
let s = new Set('abc')
for (let i of s) {
  console.log(i)
}
a
b
c

for(let i of s.keys()) {
  console.log(i)
}
a
b
c

for(let i of s.values()) {
  console.log(i)
}
a
b
c

for(let [el,i] of s.entries()) {
  console.log(el + ' ' + i)
}
a a
b b
c c
```
***
### Set和Array互换
``` js
let s = new Set(['a', 'b', 'c'])
console.log(s) // Set(3) {"a", "b", "c"}
let arr = Array.from(s)
console.log(arr) // (3) ["a", "b", "c"]
```
***
### 使用Set实现数学上的集合定义
[基本集合操作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
***

## 什么是Map结构？
#### 描述：保存键值对。（和对象的作用类似，但是又有区别）
``` js
0 === -0 // true
```
### 创建一个Map对象
``` js
let m = new Map()
```
### 注意！当一个Map对象的键为引用值时
``` js
let m = new Map()
m.set({name:'djlun'}, '一个记录我的名字的对象')
console.log(m.has({name:'djlun'})) // false
console.log(m.get({name:'djlun'})) // undefined 
m.set([{name:'djlun'}, {age: 19}], '一个记录我的信息的数组')
console.log(m.has([{name:'djlun'}, {age: 19}])) // false
console.log(m.get([{name:'djlun'}, {age: 19}])) // undefined 
```
我们会发现这个键是不存在的，因为:
``` js
let obj = {}
obj === {} // fasle
obj == {} // false
```
此时，我们应该这样给Map对象添加键值对
``` js
let m = new Map()
let name = {name: 'djlun'}
    age = {age: 19}
    me = [{name: 'djlun'}, {age: 24}]
m.set(name, '记录我名字的一个对象')
m.set(age, '记录我年龄的一个对象')
m.set(me, '记录我信息的一个数组')
console.log(m.has(name)) // true
console.log(m.get(me)) // 记录我信息的一个数组
```

### Map和Object的比较？
#### 相似点：
都允许按键存取一个值、删除键、检测一个键是否绑定了值
#### 区别：
- 一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型
- Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
- 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算
- Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见
- Map 在涉及频繁增删键值对的场景下会有些性能优势

### Map对象的属性：
### length 
#### 描述：值为0
***
### prototype
#### 描述：Map构造器的原型
***
::: tip
和其他类型对象一样，Map对象实例也会继承Map.prototype的属性和方法
:::
***
### constructor
#### 描述：Map对象的构造器，默认是Map函数
***
### size
#### 描述：Map对象键值对的数量

### map对象的方法：
### clear()
#### 描述：移除Map对象的所有键值对
#### 返回值：undefined
***
### delete()
#### 描述：移除Map对象中指定的元素
#### 参数：[key]：要移除的元素的键
#### 返回值：移除成功返回true，否则返回false
***
### set()
#### 描述：为Map对象添加一个新键值对，或者更新其中的一个键值对
#### 参数：[key]：要添加的元素的键；[value]：要添加的元素的值
#### 返回值：新的Map对象
``` js
let m = new Map()
m.set('name', 'djlun') // Map(1) {"name" => "djlun"}
m.set('age', 24) // Map(2) {"name" => "djlun", "age" => 24}
m.set('age', 18) // Map(2) {"name" => "djlun", "age" => 18}
```
::: tip
到现在的理解是只能一个一个添加
Map() 虽然记录在这里，但是其实应该归到对象那边去
:::
***
### get()
#### 描述：获取一个Map对象中指定的元素
#### 参数：[key]：想要获取的元素的键
#### 返回值：找到与参数相同的键则返回对应的值，没找到就返回undefined
``` js
m.get('age') // 18
m.get('sex') // undefined
```
***
### has()
#### 描述：用来检测Map对象中是否含有某元素
#### 参数：[key]：需要检测的元素的键（不可能有两个同样的键）
#### 返回值：检测到元素则返回true，否则返回false
``` js
m.has('sex') // false
m.has('name') // true
```
***
### forEach()
#### 描述：遍历
#### 参数：[fn]：遍历出来的每个元素要执行的函数；[thisArg]：指定this指向的对象
#### 返回值：undefined
``` js
m.set('sex', 0)

m.forEach((el, index, map) => {
  console.log(`${el} ${index} ${map}`)
})
// djlun name [object Map]
// 18 age [object Map]
// 0 sex [object Map]
```
***
### entries()
#### 描述：返回一个新的包含[key:value]键值对的迭代器（iterator）对象
``` js
let mIter = m.entries()
mIter.next()  // {value: Array(2), done: false}
              // done: false
              // value: (2) ["name", "djlun"]
              // __proto__: Object

mIter.next()  // {value: Array(2), done: false}
              // done: false
              // value: (2) ["age", 18]
              // __proto__: Object

mIter.next()  // {value: Array(2), done: false}
              // done: false
              // value: (2) ["sex", 0]
              // __proto__: Object

mIter.next()  // {value: undefined, done: true}
              // done: true
              // value: undefined
              // __proto__: Object
```
***
### keys()
#### 描述：返回一个新的迭代器对象
``` js
let mIter2 = m.keys()
mIter2.next() // {value: "name", done: false}
              // done: false
              // value: "name"
              // __proto__: Object

mIter2.next() // {value: "age", done: false}
              // done: false
              // value: "age"
              // __proto__: Object

mIter2.next() // {value: "sex", done: false}
              // done: false
              // value: "sex"
              // __proto__: Object

mIter2.next() // {value: undefined, done: true}
              // done: true
              // value: undefined
              // __proto__: Object
```
***
### values()
#### 描述：返回一个新的迭代器对象
``` js
mIter.next()  // {value: "djlun", done: false}
              // done: false
              // value: "djlun"
              // __proto__: Object

mIter.next()  // {value: 18, done: false}
              // done: false
              // value: 18
              // __proto__: Object

mIter.next()  // {value: 0, done: false}
              // done: false
              // value: 0
              // __proto__: Object

mIter.next()  // {value: undefined, done: true}
              // done: true
              // value: undefined
              // __proto__: Object
```

***
## 通过索引访问数组元素
``` js
let arr = [1, 2, 3, 4, 5]
arr[0] // 1
```
## 遍历数组
### forEach() (这是数组原型上带的方法)
#### 描述：对数组的每个元素执行一次提供的函数
#### 参数：[function]：一个函数
#### 方法参数：[el]：遍历出来的每个元素；[index]：每个元素的索引；[arr]：数组本身
#### 返回值：undefined
``` js
let arr = [1, 2, 3, 4, 5]
arr.forEach((el, index, arr) => {
  console.log(el)
  console.log(index)
  console.log(arr)
})

1
0
(5) [1, 2, 3, 4, 5]
2
1
(5) [1, 2, 3, 4, 5]
3
2
(5) [1, 2, 3, 4, 5]
4
3
(5) [1, 2, 3, 4, 5]
5
4
(5) [1, 2, 3, 4, 5]
```
::: tip
没有办法中止或者跳出 forEach 循环，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some。如果可用，新方法 find() 或者findIndex() 也可被用于真值测试的提早终止。
:::
::: tip
数组中undefined的项不打印
:::
***
### map()
#### 描述见下面方法
***
其他遍历数组的方法
### for循环

***
## 添加元素到数组的末尾
### push()
#### 描述：它直接修改原来的数组，而不是创建一个新的数组
#### 参数：[el]：一个或多个，用逗号隔开
#### 返回值：新数组的长度
``` js
let arr = [1, 2]
arr.push(3, 4) // 4
console.log(arr) // [1, 2, 3, 4]
```
***
## 添加元素到数组的头部
### unshift()
#### 描述：它直接修改原来的数组，而不是创建一个新的数组
#### 参数：[el]：一个或多个，用逗号隔开
#### 返回值：新数组的长度
***
## 删除数组末尾一个元素
### pop()
#### 描述：它直接修改原来的数组，而不是创建一个新的数组
#### 返回值：返回数组的最后一个元素的值；如果数组是空的，那么 pop() 方法将不进行任何操作，返回 undefined 值
***
## 删除数组头部一个元素
### shift()
#### 描述：它直接修改原来的数组，而不是创建一个新的数组
#### 返回值：返回数组的第一个元素的值；如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值
***
## 通过索引删除元素
### splice()
#### 描述：1.向数组中添加元素（由第三个参数控制）；2.从数组中删除元素（由第二个参数控制），并返回被删除元素组成的新数组。直接修改原来的数组。
#### 参数：[index]：要添加或删除元素的位置，必需；[deleteNum]：要删除的元素个数，设置为0则不删除，必需；[items]：要添加的元素，不设置则不添加
#### 返回值：返回被删除元素组成的新数组
``` js
let arr = [1, 2, 3, 4, 5]
arr.splice(1, 2) // [2, 3]
arr // [1, 4, 5]
arr.splice(1, 0) // []
arr.splice(1, 0, 2, 3) // []
arr // [1, 2, 3, 4, 5]
```
***
## 找出某个元素在数组中对应的索引
### indexOf()
``` js
let arr = ['apple', 'banana', 'mango']
arr.indexOf('apple') // 0
```
***
## 复制一个数组
### slice()
#### 描述：可从已有的数组中返回选定的元素（包含start，不包含end）。该方法不会改变原有数组，而是返回一个新数组。
#### 参数：[strat]：开始选取元素的位置；[end]：结束的位置
``` js
let arr = [1, 2, 3, 4]
arr.slice() // [1, 2, 3, 4]
```
***
## 判断某个变量是否是一个数组对象
### Array.isArray()
#### 参数：[arr]：要判断的变量
#### 返回值：是一个数组对象则返回true，不是则返回false
``` js
let arr = [1, 2, 3]
let str = '1'
Array.isArray(arr) // true
Array.isArray(str) // false
```
***
\* mdn建议不要用
## 浅复制数组的一部分到此数组的另一个位置
### *copyWithin()
#### 参数：[target]：要被复制的数组片段；[start]：要复制的片段的开始位置；[end]：要复制的片段的结束位置
#### 返回值：改变后的数组
::: tip 参数说明
包含start，不包含end。

如果target > length ,不拷贝；如果target在start之后，复制的数组片段会被剪切以保证新数组的长度和原数组一样。
:::
::: tip this对象说明
copyWithin方法不要求其this值必须是一个数组对象，也可以是类数组；除此之外，copyWithin是一个可变方法，它可以改变this对象本身，并且返回它，而不仅仅是它的拷贝
:::
``` js
[].copyWithin.call({length: 5, 3: 1}, 0, 3) // {0: 1, 3: 1, length: 5}
// 相当于对this对象（是一个类数组），将这个对象的第3位到最后一位拷贝到了这个对象的第0位
```
[兼容低版本](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
``` js

```
## Array对象方法
### fill()
#### 描述：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
#### 参数：[value]：用来填充的固定值；[start]：填充的起始位置；[end]：填充的结束位置
::: tip 
fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。

fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。
:::
``` js
let arr = [1, 2, 3]
arr.fill(7) // [7, 7, 7]

[].fill.call({length:3}, 2) // {0: 2, 1: 2, 2: 2, length: 3}
```
此处涉及都引用值的地方都需要注意，比如：
``` js
let arr = Array(3).fill({})
console.log(arr)  // (3) [{…}, {…}, {…}]
                  // 0: {}
                  // 1: {}
                  // 2: {}
                  // length: 3
arr[0].djlun = 'djlun'
console.log(arr)  // (3) [{…}, {…}, {…}]
                  // 0: {djlun: "djlun"}
                  // 1: {djlun: "djlun"}
                  // 2: {djlun: "djlun"}
                  // length: 3
```
***
### reverse()
#### 描述：将数组中元素的位置颠倒，并返回该数组的引用
``` js
let arr = [1, 2 ,3]
arr.reverse() // [3, 2, 1]
```
***
### sort()
#### 描述：用原地算法对数组的元素进行排序，并返回数组
#### 参数：[compareFn]：用来指定按某种顺序进行排序的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
#### compareFn的参数：[a，b]：用来参与比较的两个参数，根据返回值进行排序
#### compareFn的返回值：返回值小于0，则a在b前面；返回值等于0，a、b位置不变；返回值大于0，则b在a前面
#### 返回值：返回排序后的新数组
::: tip
要改变思维，不止数字能排序，字符串也能排序，对象也能根据其中的某个元素进行排序
:::
升序：
``` js
let arr = [5,9,3,5,3,2]
arr.sort((a, b) => a-b) // [2,3,3,5,5,9]
```
[mdn关于排序的更多说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
***
### concat()
#### 描述：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
#### 参数：[arr]：要合并的一个或多个数组
``` js
let arr = ['1']
arr.concat(['2'], ['3']) // ['1', '2', '3']
arr.concat('a') // ['1', 'a']
```
***
### slice()
#### 描述：返回一个新的数组对象，这一对象是一个由 start和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
#### 参数：[start]：开始拷贝的位置，[end]：结束拷贝的位置
#### 返回值：一个新数组
``` js
let arr = [1,2,3,4,5,6]
arr.slice(2,4) // [3,4]
```
***
### join()
#### 描述：将一个数组（或一个类数组对象）的所有元素连接成一个字符串，并返回这个字符串，不会改变原数组
#### 参数：[separator]：分隔符号，默认是逗号（，）
``` js
let arr = [1,2,3]
arr.join('.') // 1.2.3
```
***
### toString()
#### 描述：将数组转化为字符串
#### 
``` js
let arr = [{name:'djlun'}, {age: 90}]
arr.toString() // [object object],[object object]

arr = [1,2,3]
arr.toString() // 1,2,3
```
***
### toLocaleString()
[mdn通道](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
***
::: tip
[不要尝试在遍历过程中对原数组进行任何修改](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
:::
***
### forEach()
#### 描述：遍历用
#### 参数：和其他类型的参数一样
它返回undefined，map()方法返回一个新数组
***
### find()
#### 描述：返回数组中 满足提供的测试函数的 第一个元素 的 *值*
#### 参数：[Fn]：测试函数；[thisArg]：设置指定的this对象
#### 函数参数：[el]；[index]；[arr]
#### 返回值：找到返回值，否则返回undefined
***
### findIndex()
#### 描述：返回数组中 满足提供的测试函数的 第一个元素 的 *索引*
#### 参数：[Fn]：测试函数；[thisArg]：设置指定的this对象
#### 函数参数：[el]；[index]；[arr]
#### 返回值：找到返回索引，否则返回-1
***
### *includes()
#### 描述：用来查找一个数组是否包含一个指定的值
#### 参数：[searchEl]：要查找的元素；[start]：开始查找的位置
#### 返回值：包含返回true，不包含返回false
``` js
let arr = [1,2,3]
arr.includes(1) // true
```
::: tip
includes() 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)
:::
低版本兼容：看mdn的[例子](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
***
### indexOf()
#### 描述：查找指定元素，返回找到的第一个指定元素的索引
#### 参数：[searchEl]：要查找的元素；[start]：开始查找的位置
#### 返回值：找到返回第一个索引，没找到返回-1
``` js
let arr = [1,2,3]
arr.indexOf(1) // 0
```
***
### lastIndexOf()
#### 描述：从数组的最后查找指定元素
#### 参数：[searchEl]：要查找的元素；[start]：开始查找的位置，从这往前查找
#### 返回值：找到返回第一个索引，没找到返回-1
***
### map()
#### 描述：遍历用
#### 参数：和forEach的参数一样
``` js
let arr = ['a', 'b', 'c', 'd' ,'e']
let newarr = arr.map((el, index, arr) => {
  console.log(`${el} ${index} ${arr}`)
  return el
})
console.log(newarr) // (5) ["a", "b", "c", "d", "e"]

// a 0 a,b,c,d,e
// b 1 a,b,c,d,e
// c 2 a,b,c,d,e
// d 3 a,b,c,d,e
// e 4 a,b,c,d,e
```
``` js
// 求数组的每个元素的平方根
let numbers = [1, 4, 9];
let roots = numbers.map(Math.sqrt); // [1,2,3]
```
[兼容低版本](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
***
### reduce()
#### 描述：对数组中的每个元素执行一个提供的reducer函数(升序执行)，将其结果汇总为单个返回值
#### 参数：[Fn]：提供的函数；[initialValue]：作为第一次调用提供的函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
#### 函数参数：[accumulator]：上一次调用回调时返回的累积值，或initialValue；[currentValue]：数组中正在被处理的元素；[currentIndex]：数组中正在被处理的元素的索引；[arr]：数组
#### 返回值：返回函数累计处理的结果
``` js
let result = arr.reduce((ac, curEl, curIn) => {
  console.log(ac)
  console.log(curEl)
  console.log(curIn)
  return ac + curEl
})
console.log(result) // 33
10         8  1
undefined  6  2
undefined  5  3
undefined  4  4
```
[reduce()的一些详细例子](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
***
### reduce()的应用：

### 累加对象数组里的值
``` js
let arr = [{x: 10}, {x:20}]
let arrSum = arr.reduce((ac, curEl, curIn) => {
  return ac.x + curEl.x
})
console.log(arrSum) // 30
```
***
### 将二维数组转化为一维
``` js
let arr = [ [1,23,4],[3,4,5] ] 
let result = arr.reduce((ac, curEl, curIn) => {
  return ac.concat(curEl)
})
console.log(result) // [1,23,4,3,4,5]
```
***
### 计算数组中每个元素出现的次数
``` js
let arr = ['a', 'b', 'c', 'a', 'a', 'b']
let result = arr.reduce((ac, cur) => {
  if (cur in ac) {
    ac[cur]++
  } else {
    ac[cur] = 1
  }
  return ac
}, {})
console.log(result) // {a: 3, b: 2, c: 1}
```
***
### 按属性对Object分类
``` js
function groupBy (arr, key) {
  return arr.reduce((ac, cur) => {
    let newKey = cur[key]
    if (!ac[newKey]) {
      ac[newKey] = []
    }
    ac[newKey].push(cur)
    return ac
  }, {})
}

let arr = [
  { name: 'djlun', age: 24 },
  { name: 'zwenj', age: 23 },
  { name: 'dylan', age: 22 },
  { name: 'lj',    age: 18 },
  { name: 'zpyan', age: 18 }
]
let result = groupBy(arr, 'age')
console.log(result) // {18: Array(2), 22: Array(1), 23: Array(1), 24: Array(1)}
console.log(result[18]) // [{…}, {…}]
```
***
### 把一个对象数组 中的对象 中的数组的元素 拎出来，存到一个数组中
``` js
let arr = [
  {
    name: '嘉兴图书馆',
    books: ['book1', 'book2', 'book3']
  },
  {
    name: '平湖图书馆',
    books: ['book4', 'book5', 'book6']
  },
  {
    name: '海盐图书馆',
    books: ['book7', 'book8', 'book9']
  },
  {
    name: '嘉善图书馆',
    books: ['book10', 'book11', 'book12']
  }
]
let result = arr.reduce((ac, cur) => {
  return [...ac,...cur.books]
},[])
console.log(result) // (12) ["book1", "book2", "book3", "book4", "book5", "book6", "book7", "book8", "book9", "book10", "book11", "book12"]
```
***
### 数组去重
``` js
let arr = [1,2,3,4,3,,3,3,3,3,3,6,6,9]
let result = arr.sort().reduce((ac, cur) => {
  if (ac.length === 0 || ac[ac.length-1] !== cur) {
    ac.push(cur)
  }
  return ac
}, [])
console.log(result) // (6) [1, 2, 3, 4, 6, 9]
```
***
### 按顺序运行Promise
[了解完promise再看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
***
### 功能型函数管道
``` js
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// const pipe = (...functions) => input => functions.reduce(
//   (acc, fn) => fn(acc),
//   input
// );
const pipe = (...functions) => { 
  return input => {
    return functions.reduce((acc, fn) => {
      return fn(acc)
    },input);
  }
}

const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

let result1 = multiply6(6);
let result2 = multiply9(9);
let result3 = multiply16(16);
let result4 = multiply24(10);

console.log(result1) // 36
console.log(result2) // 81
console.log(result3) // 256
console.log(result4) // 240
```
上面的代码编写风格不太习惯，以下是用自己的代码风格写的：
``` js
let double = x => 2 * x
let triple = x => 3 * x
let quadra = x => 4 * x
let penta = x => 5 * x

function Pipe(...fn) {
  return input => {
    return fn.reduce((ac, cur) => {
      return cur(ac)
    }, input)
  }
}

let fns = [double, triple, quadra, penta]
let dtqp = Pipe(...fns)
let result = dtqp(2) // 240
```
***
### reduceRight()
与reduce()的区别：
``` js
var a = ['1', '2', '3', '4', '5']; 
var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 

console.log(left);  // "12345"
console.log(right); // "54321"
```
***
### entries()
#### 描述：返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
***
### keys()
#### 描述：返回一个包含数组中每个 索引键 的Array Iterator对象
*** 
### values()
#### 描述：返回一个新的 Array Iterator 对象，该对象包含数组每个 索引的值
``` js
// 迭代方法1
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
for (let letter of eArr) {
  console.log(letter); // w    y    k    o   p
}
// 迭代方法2
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p
```
***
### every()
#### 描述：检测数组中的所有元素是不是否符合指定函数
#### 参数：[Fn]：指定函数；[thisArg]：指定this指向的对象
#### Fn参数：[el];[index];[arr]
#### 返回值：当所有的元素都符合条件返回true，否则返回false。空数组调用此方法也返回true
[低版本兼容](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
***
### some()
#### 描述：检测数组中是否有一个元素符合指定函数
#### 参数：[Fn]：指定函数；[thisArg]：指定this指向的对象
#### Fn参数：[el];[index];[arr]
#### 返回值：有一个元素满足指定函数则返回true，否则返回false
***
### filter()
#### 描述：通过指定函数过滤数组中的元素
#### 参数：[Fn]：指定函数；[thisArg]：指定this指向的对象
#### Fn参数：[el];[index];[arr]
#### 返回值：一个新数组，由指定函数过滤而成。当指定参数返回true的时候算是过滤成功。
``` js
let arr = [1, 2, 3, 4, 5]
arr.filter(el => el > 3) // [4, 5]

arr = [1,2,3,4,6,7, undefined]
arr.filter(el => el !== undefined) // [1, 2, 3, 4, 6, 7]
```


## ES6
### 扩展运算符（...）
#### 描述：看起来像是对数组进行了遍历，但是跟遍历没有关系。不能对类似遍历出来的单个对象进行某些操作，只能进行批量传递。直观一点的说法就是去掉了它外面那个[]。用于函数调用的时候传参，参数进来后不用进行for循环？这看起来像是它的简单的作用
``` js
let arr = [1, 2, 3]
console.log(...arr) // 1 2 3
for (let i in arr) {
  console.log(arr[i]) // 1
                      // 2
                      // 3
}
```