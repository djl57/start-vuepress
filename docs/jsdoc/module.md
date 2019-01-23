# module模块

::: tip 阮一峰es6
在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
:::

|模块加载方案|使用环境||
|:---------:|:-----:|:--:|
|CommonJS   |服务器  |运行时加载|
|AMD        |浏览器  |运行时加载|
|ES6(export,import)|通用？|编译时加载|

``` js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

// ES6模块
import { stat, exists, readFile } from 'fs';
```

关于export和import的语法，还需要[继续了解](http://es6.ruanyifeng.com/#docs/module)