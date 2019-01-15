# 字符串类型

## 对象属性
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
- 如何在prototype上向对象添加属性和方法？（整理到函数再回来）
  1. 添加属性
  2. 添加方法

## 对象方法
### 以下是有对应html的js方法
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
### 以下是平常不怎么会用到的字符串方法
***
### blink()
#### 描述：显示闪动字符串（在chrome浏览器上试了一下，没反应）

### 以下是比较常用字符串方法
***
### charAt()
#### 描述：返回指定位置的字符
#### 参数：[index]：指定位置下标，必需
***
### charCodeAt()
#### 描述：返回指定位置的字符的 Unicode 编码
#### 参数：[index]：指定位置下标，必需
***
### concat()
#### 描述：用于连接两个或多个字符串
#### 参数：[stringX]：要被连接的字符串，必需
``` js
let [strX, strY] = ['hello ', 'world!']
strX.concat(strY) // hello world!
```
***
### fromCharCode()
#### 描述：接受一个或多个指定的 Unicode 值，然后返回一个字符串
#### 参数：[numX]：要创建的字符串中的字符的 Unicode 编码，必需
``` js
document.write(String.fromCharCode(72,69,76,76,79)) // HELLO
document.write(String.fromCharCode(65,66,67)) // ABC
```
::: tip
它不能作为已创建的 String 对象的方法来使用。它的语法应该是 String.fromCharCode()
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
### toLocaleLowerCase()
#### 描述：用于把字符串转换为小写
#### 参数：[start]：要抽取的片断的起始下标；[end]：要抽取的片段的结尾的下标。
``` js
let str="Hello happy world!"
document.write(str.slice(6,11)) // happy 包含6不包含11
```
::: tip
如果start或end是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。
:::
***
### （待了解）localeCompare()
#### 描述：用本地特定的顺序来比较两个字符串
#### 参数：[target]：要与 stringObject 进行比较的字符串