# null
值 null 特指对象的值未设置

值 null 是一个字面量，它不像undefined 是全局对象的一个属性

null 是表示缺少的标识，指示变量未指向任何对象。

``` js
typeof null        // "object" (因为一些以前的原因而不是'null')
typeof undefined   // "undefined"
null === undefined // false
null  == undefined // true
null === null // true
null == null // true
!null //true
isNaN(1 + null) // false
isNaN(1 + undefined) // true
```