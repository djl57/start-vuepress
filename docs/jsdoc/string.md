# 字符串类型

## 定义字符串
1. 字符串字面量
`let str = 'hello'`
2. 使用字符串构造函数String将其他值生成或转化为字符串
``` js
String(thing) // thing 任何可以被转换成字符串的值
new String(thing)
```
### 有没有使用new的区别？
无论原本的thing是原始值还是引用值，
没有使用new打印出来类型是string，
使用new打印出来类型是object，
并且这个object的length为str的length，
每个属性的值为str的每个字符。

对new出来的字符串对象使用valueOf()可以将其变为原始string，
此时打印出来的类型就是string。
### 字符串怎么比较？
可以直接使用比较操作符（<、>、==...）进行比较
## 属性
### constructor
#### 描述：返回构造该对象的函数的引用（constructor暂时解释为构造器）
``` js
function Person() {
  this.name = 'djl'
}
let person = new Person()
person.constructor // ƒ Person() {
                   //      this.name = 'djl'
                   //   }
```
null和undefined没有constructor

### length
#### 描述：返回字符串长度
``` js
let str = 'string'
str.length // 6

str[0] // "s"

for (let i in str) {
  console.log(str[i]) // s t r i n g 
}
```
### prototype
#### 描述：返回构造函数的构造器（constructor）（暂时这么理解）
``` js
function Person () {
  this.name = 'djl'
}
let person = new Person()

Person.prototype // {constructor: ƒ}
                 //   constructor: ƒ Person()
                 //   __proto__: Object

person.__proto__ // {constructor: ƒ}
                 //    constructor: ƒ Person()
                 //    __proto__: Object

Person.prototype === person.__proto__ // true
```
### 对prototype进行扩展
- 如何在prototype上向对象添加属性和方法？
  1. 添加属性
  ``` js
  String.prototype.name = 'djlun'
  let strNonew = 'aaa'
  let strNew = new String()
  console.log(strNonew) // aaa
  console.log(strNonew.name) // djlun
  console.log(strNew) // String {"", length: 0}
  console.log(strNew.name) // djlun
  ```
  2. 添加方法
  ``` js
  String.prototype.sayName = function () {
    console.log(this) // String {"aaa"}
    console.log(typeof this) // object
    console.log(this.name) // djlun
  }
  String.prototype.sayNameArrow = () => {
    console.log(typeof this) // 
    console.log(this) // Window
  }
  let strNew = new String('aaa')
  strNew.sayName()
  strNew.sayNameArrow()
  ```
## 常用方法
### charAt()
#### 描述：返回指定位置的字符
#### 参数：[index]：指定位置下标，必需
``` js
let str = 'djlun'
console.log(str.charAt(0)) // d
```
***
### charCodeAt()
#### 描述：返回指定位置的字符的 Unicode 编码
#### 参数：[index]：指定位置下标，必需
``` js
let str = 'djlun'
console.log(str.charCodeAt(0)) // 100
```
***
### fromCharCode()
#### 描述：接受一个或多个指定的 Unicode 值，然后返回一个字符串
#### 参数：[numX]：要创建的字符串中的字符的 Unicode 编码，必需
``` js
document.write(String.fromCharCode(72,69,76,76,79)) // HELLO
document.write(String.fromCharCode(65,66,67)) // ABC
```
::: warning
它不能作为已创建的 String 对象的方法来使用。它的语法应该是 String.fromCharCode()
:::
***
***
### concat()
#### 描述：用于连接两个或多个字符串，返回一个新字符串，不改变原来的字符串
#### 参数：[stringX]：要被连接的字符串，必需
``` js
let [strX, strY] = ['hello ', 'world!']
strX.concat(strY) // hello world!
```
***
### split()
#### 描述：用于把一个字符串分割成字符串数组
#### 参数：[separator]：字符串或正则表达式，从该参数指定的地方分割 stringObject；[howmany]：可选。该参数可指定返回的数组的最大长度。
``` js
let str="How are you doing today?"
console.log(str.split(" ") // ["How", "are", "you", "doing", "today?"]
```
::: tip
可再 与concat()联合使用 或 与数组方法join()联合使用
:::
::: tip
将每个字符拆成数组后可以进行很多操作
:::
***
### indexOf()
#### 描述：返回某个指定的字符串值在字符串中 *首次* 出现的位置
#### 参数：[searchstr]：需检索的字符串值，必需；[startindex]：开始检索的索引值，可选
``` js
let str="Hello world!"
document.write(str.indexOf("Hello")) // 0
document.write(str.indexOf("World")) // -1 因为W是大写的
document.write(str.indexOf("world")) // 6
```
::: tip
对大小写敏感。如果要检索的字符串值没有出现，则返回 -1
:::
***
### lastIndexOf()
#### 描述：返回一个指定的字符串值 *最后* 出现的位置，在一个字符串中的指定位置 *从后向前* 搜索
#### 参数：[searchstr]：需检索的字符串值，必需；[startindex]：开始检索的索引值，可选
``` js
let str="world Hello!"
document.write(str.indexOf("Hello", 5)) // -1
```
::: tip
对大小写敏感。如果要检索的字符串值没有出现，则返回 -1
:::
## es6新增
### includes()
#### 描述：返回布尔值，表示是否找到了参数字符串。
### startsWith()
#### 描述：返回布尔值，表示参数字符串是否在原字符串的头部。
### endsWith()
#### 描述：返回布尔值，表示参数字符串是否在原字符串的尾部。

#### 以上三个方法参数：[searchstr]：要判断的字符串；[num]：从第num个位置直到字符串结束（includes、startsWith），前num个字符（endsWith）
::: tip
传统上，JavaScript 只有indexOf方法，返回-1则是不包含，返回位置则是包含。可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了这三种新方法。
:::
::: tip
要注意endsWith的第二个参数与前两个方法的第二个参数的意义不同
:::
***
### repeat()
#### 描述：将原字符串重复n次
#### 参数：[num]：重复次数
``` js
let str = 'djl'
str.repeat(3) // djldjldjl
```
***
::: tip 说明
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
:::
### padStart()
#### 描述：字符串头部补全长度

### padEnd()
#### 描述：字符串尾部补全长度

#### 以上两个方法参数：[length]补全后字符串长度；[str]用来补全的字符串。
``` js
let str = 'djl'
str.padStart(5, 'ab') // abdjl
str.padStart(10, 'ab') // abababadjl
str.padEnd(10, 'ab') // djlabababa
```
***
### trim()
#### 描述：去除字符串头尾的空格
***
## 字符串常见面试题
### 统计字符串中每个字符的个数
``` js
// 方法一：
let arrSplit,
    result = {}
let getStrNum = str => {
  arrSplit = str.split('')
  for (let i in arrSplit) {
    console.log(arrSplit[i])
    // 接下来就是数组去重的步骤
  }
}
```
``` js
// 方法二：
let result = {}
let getStrNum = str => {
  for (let i in str) {
    console.log(str.charAt(i))
  }
}
```
``` js
let str = 'aaaaaaaaaabbbbbbbb'
getStrNum(str)
```
***
### 用户名格式验证，比如长度在6—20之间，不能用数字开头，只能包含数字、字母、下划线
- 字符串方法写法
```
```
- 正则表达式写法
```
```
## 正则表达式验证方法大全
搜罗中
## 以下方法逻辑中不常用
### valueOf()
#### 描述：返回 String 对象的原始值
#### 详解：JavaScript 调用 valueOf() 方法用来把对象转换成原始类型的值（数值、字符串和布尔值） 。默认情况下, valueOf() 会被每个对象Object继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，valueOf() 就会返回对象自身
``` js
let str="world Hello!"
document.write(str.valueOf()) // world Hello!
```
***
### toString()
#### 描述：返回字符串
``` js
let str="world Hello!"
document.write(str.toString()) // world Hello!
```
***
### slice()
#### 描述：提取字符串的某个部分，并以新的字符串返回被提取的部分（包含start，不包含end）
#### 参数：[start]：要抽取的片断的起始下标；[end]：要抽取的片段的结尾的下标。
``` js
let str="Hello happy world!"
document.write(str.slice(6,11)) // happy 包含6不包含11
```
::: tip
如果start或end是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
:::
***
### substring()
#### 描述：提取字符串的某个部分，并以新的字符串返回被提取的部分（包含start，不包含end）
#### 参数：[start]：要抽取的片断的起始下标，非负整数，必需；[end]：要抽取的片段的结尾的下标，非负整数，可选。
``` js
let str="Hello happy world!"
document.write(str.substring(3)) // 'lo happy world!'
```
::: tip
如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。
:::
::: tip
它和slice()的区别在于参数是否可为负数，slice()可以为负。
:::
***
### substr()
#### 描述：在字符串中抽取从 start 下标开始的指定数目的字符
#### 参数：[start]：要抽取的片断的起始下标，可为负，必需；[length]：子串中的字符数，必须是数值，可选。
``` js
let str="Hello happy world!"
document.write(str.substr(3)) // 'lo happy world!'
```
::: danger
ECMAscript 没有对该方法进行标准化，因此反对使用它
:::
***
### toLowerCase()
#### 描述：用于把字符串转换为小写
***
### toUpperCase()
#### 描述：用于把字符串转换为大写
***
### toLocaleLowerCase()
#### 描述：用于把字符串转换为小写
***
### toLocaleUpperCase()
#### 描述：用于把字符串转换为大写
***
::: tip
与 toLowerCase()和toUpperCase() 不同的是，toLocaleLowerCase()和toLocaleUpperCase() 方法按照本地方式把字符串转换为大写。只有几种语言（如土耳其语）具有地方特有的大小写映射，所有该方法的返回值通常与 toLowerCase()或toUpperCase() 一样。
:::
***
### （待深入了解）match()
#### 描述：可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配，返回匹配结果的数组。
#### 参数：[searchstr]：需检索的字符串值，必需；或者 [regexp]：要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象，必需。
[w3c链接](http://www.w3school.com.cn/jsref/jsref_match.asp)
***
### （待深入了解）search()
#### 描述：用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
#### 参数：[regexp]：该参数可以是需要在 stringObject 中检索的子串，也可以是需要检索的 RegExp 对象。
[w3c链接](http://www.w3school.com.cn/jsref/jsref_search.asp)
与match()方法进行比较
::: tip
没有找到任何匹配的子串，则返回 -1
:::
***
### （待深入了解）replace()
#### 描述：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
#### 参数：[regexp/substr]：规定子字符串或要替换的模式的 RegExp 对象,必需；[replacement]：一个字符串值。规定了替换文本或生成替换文本的函数，必需。
[w3c链接](http://www.w3school.com.cn/jsref/jsref_replace.asp)
***
### （待了解）localeCompare()
#### 描述：用本地特定的顺序来比较两个字符串
#### 参数：[target]：要与 stringObject 进行比较的字符串


## 以下是有对应html的js方法
### anchor()
#### 描述：就是用js写了个a标签
#### 参数：[anchorName]: 必需
``` js
let txt="百度"
document.write(txt.anchor("baidu")) // [anchorName]: baidu
let anchor = document.getElementsByName('baidu')
anchor[0].href = 'http://www.baidu.com'
```
等同于
``` html
<a name="baidu" href="http://www.baidu.com"></a>
```
***
### big()
#### 描述：把字符串显示为大号字体（注意是大号字体，不是大写字母）
``` js
let str = 'djlun'
document.write(str.big())
```
等同于
``` html
<big>djlun</big>
```
![big](/big.png)
***
### small()
#### 描述：把字符串显示为小号字体
``` js
let str = 'djlun'
document.write(str.small())
```
等同于
``` html
<small>djlun</small>
```
***
### bold()
#### 描述：把字符串显示为粗体
``` js
let str = 'djlun'
document.write(str.bold())
```
等同于
``` html
<b>djlun</b>
```
***
### fixed()
#### 描述：把字符串显示为打字机字体
``` js
let str = 'djlun'
document.write(str.fixed())
```
等同于
``` html
<tt>djlun</tt>
```
***
### fontsize()
#### 描述：用于按照指定的尺寸来显示字符串
#### 参数：[size]: 必须是从 1 至 7 的数字
``` js
let str = 'djlun'
document.write(str.fontsize(1)) //1-7
```
等同于
``` html
<font size="1">djlun</font>
```
***
### fontcolor()
#### 描述：用于按照指定的颜色来显示字符串
``` js
let str = 'djlun'
document.write(str.fontcolor('red'))
```
等同于
``` html
<font color="red">djlun</font>
```
***
### italics()
#### 描述：把字符串显示为斜体
``` js
let str = 'djlun'
document.write(str.italics())
```
等同于
``` html
<i>djlun</i>
```
***
### link()
#### 描述：把字符串显示为超链接
``` js
let str = 'djlun'
document.write(str.link('https://www.baidu.com'))
```
等同于
``` html
<a href="https://www.baidu.com">djlun</a>
```
***
### strike()
#### 描述：用于显示加删除线的字符串
``` js
let str = 'djlun'
document.write(str.strike())
```
等同于
``` html
<strike>djlun</strike>
```
***
### sub()
#### 描述：用于把字符串显示为下标
``` js
let str = 'djlun'
document.write(str.sub())
```
等同于
``` html
<sub>djlun</sub>
```
***
### sup()
#### 描述：用于把字符串显示为上标
``` js
let str = 'djlun'
document.write(str.sup())
```
等同于
``` html
<sup>djlun</sup>
```
## 以下是没看到效果的方法
***
### blink()
#### 描述：显示闪动字符串（在chrome浏览器上试了一下，没反应）
