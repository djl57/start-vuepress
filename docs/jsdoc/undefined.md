# undefined

undefined 属性的属性特性：
- writable	false
- enumerable	false
- configurable	false

## 来决定一个变量是否拥有值
``` js
// 使用===运算符
let x
x === undefined? console.log(`x没值`): console.log(`x有值`) // x没值
let y
y === undefined? console.log(`y没值`): console.log(`y有值`) // y有值

// 使用typeof运算符
let x
typeof x === 'undefined'? console.log(`x没值`): console.log(`x有值`) // x没值
```