# async await || yield function*
## AsyncFunction构造函数
#### 描述：用来创建新的 异步函数 对象，JavaScript 中每个异步函数都是  AsyncFunction 的对象
#### 语法：
`new AsyncFunction([args] functionBody)`
::: warning 注意
AsyncFunction 并不是一个全局对象，需要通过下面的方法来获取：
Object.getPrototypeOf(async function(){}).constructor
:::
#### 参数：[args]：函数的参数名（一个或多个用逗号隔开的字符串）
::: danger 注意
执行 AsyncFunction 构造函数的时候，会创建一个 异步函数 对象。但是这种方式不如先用 异步函数表达式 定义一个异步函数，然后再调用其来创建 异步函数 对象来的高效，因为第二种方式中异步函数是与其他代码一起被解释器解析的，而第一种方式的函数体是单独解析的。
:::
#### 通过 AsyncFunction 构造器创建一个异步函数
``` js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
var a = new AsyncFunction('a', 'b', 'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);');
a(10, 20).then(v => {
  console.log(v); // 4 秒后打印 30
}); 
```
***
## async function 声明（异步函数语句）
#### 描述：用于定义一个返回 AsyncFunction 对象的异步函数。
异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。但是如果你的代码使用了异步函数，它的语法和结构会更像是标准的同步函数。
#### 语法：
`async function name([params]) {  }`
#### 参数：[name]：此异步函数的名称；[params]：形参；
#### 返回值：一个返回的Promise对象会以async function的返回值进行解析(resolved)，或者以该函数抛出的异常进行回绝(rejected)
- 当调用一个 async 函数时，会返回一个 Promise 对象。
- 当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。
- async 函数中可能会有 await 表达式，这会使 async 函数暂停执行，等待 Promise  的结果出来，然后恢复async函数的执行并返回解析值（resolved）。
- 注意， await 关键字仅仅在 async function中有效。如果在 async function函数体外使用 await ，你只会得到一个语法错误（SyntaxError）。
- async/await的用途是简化使用 promises 异步调用的操作，并对一组 Promises执行某些操作。正如Promises类似于结构化回调，async/await类似于组合生成器和 promises。
``` js
var resolveAfter2Seconds = function() {
  console.log("调用了 返回延时2s的 Promise 的函数（fn1）");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(20);
      console.log("延时2s的 Promise 执行完毕");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  console.log("调用了 返回延时1s的 Promise 的函数（fn2）");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(10);
      console.log("延时1s的 Promise 执行完毕");
    }, 1000);
  });
};
// 在sequentialStart中，程序为第一个await停留了2秒，然后又为第二个await停留了1秒。直到第一个计时器结束后，第二个计时器才被创建
// 第一个完了之后第二个开始
var sequentialStart = async function() {
  console.log('调用了 一个异步函数sequentialStart，此异步函数依次执行了fn1和fn2');
  // 如果 await 操作符后的表达式不是一个 Promise 对象, 则它会被转换成一个 resolved 状态的 Promise 对象
  const slow = await resolveAfter2Seconds();
  const fast = await resolveAfter1Second();
  console.log('slow:' + slow);
  console.log('fast:' + fast);
}
// 在 concurrentStart中，两个计时器均被创建，然后一起被await。这两个计时器同时运行的，但await的调用仍然是按顺序运行的，
// 这意味着第二个await会等到第一个await运行结束。这使得代码完成运行只需要2秒，而不是3秒。这2秒是由最慢的计时器决定的。
// 第一个，第二个一起开始，慢的在前面的话会影响快的，慢的在后面的话不影响
var concurrentStart = async function() {
  console.log('调用了 一个异步函数concurrentStart，此异步函数依次执行了fn1和fn2');
  const slow = resolveAfter2Seconds(); // 立即启动计时器
  const fast = resolveAfter1Second();
  console.log(await slow);
  console.log(await fast); // 等待 slow 完成, fast 也已经完成。
}
// stillSerial与concurrentStart的情况一样
// 第一个，第二个一起开始，慢的一定会会影响快的
var stillSerial = function() {
  console.log('调用了 一个异步函数stillSerial，此异步函数all了fn1和fn2');
  Promise.all([resolveAfter2Seconds(), resolveAfter1Second()])
  .then(([slow, fast]) => {
    console.log(slow);
    console.log(fast);
  });
}
// 各自完成。互相无时间影响
var parallel = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message)); // 这种情况下可以简写成 console.log(resolveAfter2Seconds());
  resolveAfter1Second().then((message)=>console.log(message));
}

sequentialStart(); // 两秒后，输出 “slow”，1秒之后，输出“fast”
// 等到 sequentialStart() 完成
setTimeout(concurrentStart, 4000); // 两秒之后，输出“slow”，然后输出“fast”
// 等到 setTimeout(concurrentStart, 4000) 完成
setTimeout(stillSerial, 7000); // 和concurrentStart一样
// 等到 setTimeout(stillSerial, 7000) 完成
setTimeout(parallel, 10000); // 真正的并行运行：一秒之后，输出“fast”，然后1秒之后，输出“slow”
```
### 通过async函数重写 promise 链
``` js
function downloadData () {
  return new Promise((resolve, reject) => {
    resolve('success1')
    reject('fail1')
  })
}
function downloadFallbackData () {
  return new Promise((resolve, reject) => {
    resolve('success2')
    reject('fail2')
  })
}
function processDataInWorker () {
  return new Promise((resolve, reject) => {
    resolve('success3')
    reject('fail3')
  })
}
// 使用Promise
function getProcessedData(url) {
  return downloadData(url) // 返回一个 promise 对象
    .catch(e => {
      return downloadFallbackData(url)  // 返回一个 promise 对象
    })
    .then(v => {
      return processDataInWorker(v); // 返回一个 promise 对象
    });
}
getProcessedData('123.html')
.then((res) => {
  console.log(res) // success3
})
// 使用async
async function getProcessedDataAsync(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
getProcessedDataAsync('123.html')
.then(res => console.log(res)) // success3
```

***
## async function 关键字（异步函数表达式）
#### 描述：在表达式中定义异步函数
#### 语法：
`async function [name]([params]) {  }`
#### 参数：[name]：此异步函数的名称；[params]：形参；
``` js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};
var add1 = async function(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}
add1(10)
.then(v => {
  console.log(v);  // 4 秒后打印 60
});
// 立即执行异步函数
(async function(x) {
  var p_a = resolveAfter2Seconds(20);
  var p_b = resolveAfter2Seconds(30);
  return x + await p_a + await p_b;
})(10)
.then(v => {
  console.log(v);  // 2 秒后打印 60
});
```
***
## await
#### 描述：用于等待一个Promise 对象
#### 语法：[return_value] = await expression;
#### 参数：[expression]：一个 Promise 对象或者任何要等待的值
#### 返回值：返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身
- await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成
- 若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function；若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
``` js
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 2秒后打印 10
}
f1();

async function f2() {
  var y = await 20;
  console.log(y); // 立即打印20
}
f2();

// 如果等待的Promise执行结果为异常，则抛出异常值
async function f3() {
  try {
    var z = await Promise.reject(30);
  } catch (e) {
    console.log(e); // 立即打印30
  }
}
f3();
```
***
## function*关键字（function*表达式）
#### 描述：可以在表达式内部定义一个生成器函数
#### 语法：
`function* [name]([params]) { }`
#### 参数：[name]：生成器函数的名字；[params]：参数；
``` js
// 定义了一个未命名的生成器函数并把它赋值给x。函数产出它的传入参数的平方：
var x = function*(y) {
  yield y * y;
};
```
***
## function*声明
#### 描述：这种声明方式会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
#### 语法：
`function* name([params]) {  }`
#### 参数：[name]：生成器函数的名字；[params]：参数；
- 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
- 调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （iterator ）对象。
- 当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。
- 或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

- next()方法返回一个对象
- 这个对象包含两个属性：value 和 done
- value 属性表示本次 yield 表达式的返回值
- done 属性为布尔类型，表示生成器后续是否还有 yield 语句，即生成器函数是否已经执行完毕并返回

调用 next()方法时，如果传入了参数，那么这个参数会作为上一条执行的  yield 语句的返回值，例如：
``` js
function *gen(){
  yield 10;
  y = yield 'foo';
  yield y;
}
var gen_obj = gen();
console.log(gen_obj.next());// 执行 yield 10，返回 {value: 10, done: false}
console.log(gen_obj.next());// 执行 yield 'foo'，{value: "foo", done: false}
console.log(gen_obj.next(10));// 将 10 赋给上一条 yield 'foo' 的左值，即执行 y=10，返回 {value: 10, done: false}
console.log(gen_obj.next());// 执行完毕，{value: undefined, done: true}
```
***
## yield 关键字
#### 描述：用来暂停和恢复一个生成器函数
***
## yield* 表达式
#### 描述：用于委托给另一个generator 或可迭代对象
``` js
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}
function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}
var iterator = g2();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```
``` js
function* g3() {
  yield* [1, 2];
  yield* "34";
  yield* arguments;
}
var iterator = g3(5, 6);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: "3", done: false }
console.log(iterator.next()); // { value: "4", done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: 6, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```