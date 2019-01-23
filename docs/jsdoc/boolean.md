# 布尔类型
::: tip
0、-0、null、false、NaN、undefined、空字符串（""） 均为false
:::
## 定义布尔类型的变量
``` js
new Boolean(value);	//构造函数
Boolean(value);	//转换函数
```
当作为一个构造函数（带有运算符 new）调用时，Boolean() 将把它的参数转换成一个布尔值，并且返回一个包含该值的 Boolean 对象。

如果作为一个函数（不带有运算符 new）调用时，Boolean() 将把它的参数转换成一个原始的布尔值，并且返回这个值。

## 属性
### constructor
#### 描述：返回对创建此对象的 Boolean 函数的引用

### prototype
#### 描述：使有能力向对象添加属性和方法

## 方法
::: tip
Boolean 对象自身没有任何方法，不过它从自己的原型链上继承了一些方法
:::
### toString()
#### 描述：转换为字符串

### valueOf()
#### 描述：返回Boolean对象的原始值