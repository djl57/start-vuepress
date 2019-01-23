# 数字类型
::: tip
在非构造器上下文中 (如：没有 new 操作符)，Number 能被用来执行类型转换。

如果参数无法被转换为数字，则返回 NaN
:::
::: tip
所有 Number 实例都继承自 Number.prototype(此方法返回Number的构造器)。被修改的 Number 构造器的原型对象对全部 Number 实例都生效。
:::
## Number对象属性
### constructor
#### 描述：返回对创建此对象的 Number 函数的引用
***
### prototype
#### 描述：使有能力向对象添加属性和方法
***
### MAX_VALUE
#### 描述：可表示的最大的数
``` js
Number.MAX_VALUE // 1.7976931348623157e+308
```
***
### MIN_VALUE
#### 描述：可表示的最小的数
``` js
Number.MIN_VALUE // 5e-324
```
***
### NaN
#### 描述：非数
#### 扩展：如何判断一个数是NaN？
使用全局的isNaN()方法
***
### NEGATIVE_INFINITY
#### 描述：负无穷大，溢出时返回该值。
***
### POSITIVE_INFINITY
#### 描述：正无穷大，溢出时返回该值。

## Number对象方法

### toString()
#### 描述：把一个 Number 对象转换为一个字符串，并返回结果
#### 参数：[radix]：可选，进制值，2~36，例如，当 radix 为 2 时，NumberObject 会被转换为二进制值表示的字符串，不填时默认为10进制
***
### toLocaleString()
#### 描述：可把一个 Number 对象转换为本地格式的字符串
***
### toFixed()
#### 描述：把 Number 四舍五入为指定小数位数的数字
#### 参数：[num]：必需，指定的小数位数，一般0 ~ 20
***
### toExponential()
#### 描述：把对象的值转换成指数计数法
#### 参数：[num]：必需，指数计数法中的小数位数，一般0 ~ 20
***
### toPrecision()
#### 描述：可在对象的值超出指定位数时将其转换为指数计数法
#### 参数：[num]：必需，规定必须被转换为指数计数法的最小位数，一般1 ~ 21
***
### valueOf()
#### 描述：返回原始数值

## ES6新增

### Number.isNaN()
#### 描述：确定传递的值是否为 NaN和其类型是否是 Number
#### 参数：[value]：要被检测是否是 NaN 的值
#### 返回值：true：参数是Number类型并且值为NaN；false：其他情况
::: tip
NaN连它自己都不相等，更别说等于别的了，所以必须要有一个方法来判断一个值是否为NaN
:::
::: tip 和全局函数 isNaN() 相比
和全局函数 isNaN() 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 NaN 的时候才会返回 true。
:::
***
### Number.isFinite()
#### 描述：用来检测传入的参数是否是一个有穷数（finite number）
#### 参数：[value]：要被检测有穷性的值
#### 返回值：true：参数是Number类型的，且是有穷的；false：其他情况
::: tip
和全局的 isFinite() 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。
:::
***
### Number.isInteger()
#### 描述：用来判断给定的参数是否为整数
#### 参数：[value]：要判断是否为整数的参数
#### 返回值：true：被检测的参数是Number类型的，且是整数；false：其他情况
::: tip
NaN 和正负 Infinity 不是整数
:::
***
### Number.isSafeInteger()
#### 描述：检测参数是否为安全整数 ( -(253 - 1) 至 253 - 1之间)
#### 参数：[value]：要被检测的值
#### 返回值：true：被检测的参数是Number类型的，且是安全整数；false：其他情况
::: tip
如果只验证运算结果是否为安全整数，很可能得到错误结果。[同时验证两个运算数和运算结果的方法](http://es6.ruanyifeng.com/#docs/number#Number-isFinite-Number-isNaN)
:::
***
### Number.parseFloat()
#### 描述：把一个字符串解析成浮点数
#### 参数：[string]：被解析的字符串
#### 返回值：解析成功，返回浮点数；解析失败，返回NaN
::: tip
该方法与全局的 parseFloat() 函数相同，并且处于 ECMAScript 6 规范中（用于全局变量的模块化）
:::
***
### Number.parseInt()
#### 描述：根据给定的进制数把一个字符串解析成整数
#### 参数：[string]：被解析的字符串；[radix]：进制数
#### 返回值：解析成功，返回浮点数；解析失败，返回NaN
::: tip
该方法和全局的 parseInt() 函数是同一个函数：

`Number.parseInt === parseInt; // true`
:::
