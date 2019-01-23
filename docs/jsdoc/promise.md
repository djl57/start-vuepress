# promise

## Promise构造函数
### 语法
``` js
new Promise( function(resolve, reject) {...} /* executor */  );
```
***
### 参数：[executor]：带有 resolve 和 reject 两个函数参数的函数
### 参数说明：
Promise构造函数执行时立即调用 executor 函数， resolve 和 reject 两个函数作为参数传递给executor（executor 函数在Promise构造函数返回新建对象前被调用）。resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。

executor 内部通常会执行一些异步操作，一旦完成，可以调用resolve函数来将promise状态改成fulfilled，或者在发生错误时将它的状态改为rejected。

Promise构造函数执行时：
1. 立即调用 executor  函数
2. resolve 和 reject 函数被调用，分别将promise的状态改为fulfilled（完成）或rejected（失败）
***
### 描述：
Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

一个 Promise有以下几种状态:

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

pending 状态的 Promise 对象可能触发fulfilled 状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。

因为 Promise.prototype.then 和  Promise.prototype.catch 方法返回 promise 对象， 所以它们可以被链式调用。
![promise](https://mdn.mozillademos.org/files/8633/promises.png)

## 方法
### Promise.all(iterable)
#### 描述：返回一个 Promise 实例。此实例在 iterable 参数内 *所有的 promise 都 完成（resolved）* 或 *参数中不包含 promise 时* 回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

### Promise.race(iterable)
#### 描述：返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

### Promise.reject(reason)
#### 描述：返回一个带有拒绝原因reason参数的 Promise 对象

### Promise.resolve(value)
#### 描述：返回一个以给定值解析后的 Promise 对象。但如果这个值是个 thenable（即带有then方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态（指resolved/rejected/pending/settled）；如果传入的value本身就是promise对象，则该对象作为Promise.resolve方法的返回值返回；否则以该值为成功状态返回promise对象。
***
### catch()
一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
***
### then()
#### 描述：为 Promise 实例添加状态改变时的回调函数
#### 参数：[resolvedFn]：异步成功的回调函数；[rejectedFn]：异步失败的回调函数
#### 返回值：返回一个新的Promise实例
***
### finally()

## 创建 Promise
### Promise 对象是由关键字 new 及其构造函数来创建的
``` js
let myPro = new Promise((resolve, reject) => {
  // 执行异步操作
  // 异步任务顺利完成且返回结果值时，会调用 resolve 函数
  // resolve(result)
  // 当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用reject 函数
  // reject(result)
})
```
### 想要让某个函数拥有 promise 功能，只需让其返回一个 promise 即可
``` js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
```
### 一个简单的例子
``` js
let myPro = new Promise((resolve, reject) => {
  //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
  //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
  let data
  setTimeout(() => {
    data = { name: 'djlun', age: 18 }
    resolve(data); //代码正常执行！
  }, 3000);
});
myPro.then((res) => {
  //successMessage的值是上面调用resolve(...)方法传入的值.
  //successMessage参数不一定非要是字符串类型，这里只是举个例子
  console.log("success:" + res);
});
```
### 一个高级一点的例子
``` js
let btn = document.getElementById('button')
btn.addEventListener('click', testPromise)
let promiseCount = 0;
function testPromise() {
  let thisPromiseCount = ++promiseCount;
  let log = document.getElementById('log');
  log.insertAdjacentHTML('beforeend', `(${thisPromiseCount}) 开始 (<small>同步代码开始</small>)<br/>`);
  // 新构建一个 Promise 实例：使用Promise实现每过一段时间给计数器加一的过程，每段时间间隔为1~3秒不等
  let p1 = new Promise((resolve, reject) => {
    log.insertAdjacentHTML('beforeend', `(${thisPromiseCount}) Promise 开始 (<small>异步代码开始</small>)<br/>`);
    window.setTimeout(() => {
      resolve(thisPromiseCount);
    }, Math.random() * 2000 + 1000);
  });
  // Promise 不论成功或失败都会调用 then
  // catch() 只有当 promise 失败时才会调用
  p1
  .then((val) => {
    log.insertAdjacentHTML('beforeend', `(${val}) Promise 已填充完毕 (<small>异步代码结束</small>)<br/>`);
  })
  .catch((reason) => {
    console.log('处理失败的 promise ('+reason+')');
  });
  log.insertAdjacentHTML('beforeend', `(${thisPromiseCount}) Promise made (<small>同步代码结束</small>)<br/>`);
}
```

## 使用 Promise
### 什么是 Promise？
MDN 这么说：
- 用于表示一个异步操作的最终状态（完成或失败），以及其返回的值。

- 一个 Promise 就是一个代表了异步操作最终完成或者失败的结果对象

- Promise 本质上是一个绑定了回调的对象，而不是将回调传进函数内部

[阮一峰这么说：](http://es6.ruanyifeng.com/#docs/promise)

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
- 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
- Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理
- Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
- Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
- 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
- 此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

``` js
// 生成一个Promise实例
const promise = new Promise((resolve, reject) => {

})
// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。
// 其中，第二个函数是可选的，不一定要提供。
// 这两个函数都接受Promise对象传出的值作为参数。
promise
.then(res => {
  // success
}, err => {
  // failure
})
```
``` js
// 下面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});
promise.then(function() {
  console.log('resolved.');
});
console.log('Hi!');

// Promise
// Hi!
// resolved. 
```
异步加载图片
``` js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
let url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548222934344&di=c802ba6a85d1efda1ccc9d71a058e704&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd1a20cf431adcbef1da6b62ba7af2edda3cc9f09.jpg'
loadImageAsync(url)
.then((res) => {
  document.body.appendChild(res)
  console.log(res) // <img width="100" height="100" src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1548222934344&amp;di=c802ba6a85d1efda1ccc9d71a058e704&amp;imgtype=0&amp;src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd1a20cf431adcbef1da6b62ba7af2edda3cc9f09.jpg">
})
.catch((err) => {
  console.log(err)
})
```
用Promise对象实现的 Ajax 操作
``` js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};

getJSON("./posts.json").then(function(json) {
  console.log(json) // {code: 0, msg: "success", data: {…}}
  console.log('Contents: ' + json); // Contents: [object Object]
}, function(error) {
  console.error('出错了', error);
});

// 上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。

// then方法返回的依然是一个Promise，依旧可以使用then方法
getJSON("./posts.json")
.then((json) => {
  console.log(json) // {code: 0, msg: "success", data: {…}}
  return json;
})
.then((post) => {
  console.log(post) // {code: 0, msg: "success", data: {…}}
});
// 第一个then还可以是返回一个新的Promise，那么后一个Promise会根据这个新的Promise的结果来执行
getJSON("./posts.json")
.then(function(post) {
  return getJSON(post.commentURL);
})
.then(function funcA(comments) {
  console.log("resolved: ", comments); // resolved:  {data: Array(1)}
}, function funcB(err){
  console.log("rejected: ", err);
});
```
resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样
``` js
const p1 = new Promise(function (resolve, reject) {
  // ...
});
const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```
``` js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject('fail'/* new Error('fail') */), 3000)
})
const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2
.then(res => {
  console.log(`success: ${res}`)
})
.catch(err => {
  console.log(`error: ${err}`)
})

// error: fail 
```
``` js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
// 上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

### 没有 Promise 之前？
假设存在一个名为 createAudioFileAsync() 的函数，这个函数异步地生成声音文件，在声音文件创建成功或者创建失败后执行回调函数。
``` js
let suc = {
  code: 0,
  msg: 'success',
  data: [
    'bangbangbnag.mp3'
  ]
}
let err = {
  code: 1,
  msg: 'error',
  data: null
}
function createAudioFileAsync (data, sucFn, errFn) {
  setTimeout(() => {
    if (data.code === 0) {
      sucFn(data)
    } else {
      errFn(data)
    }
  }, 3000)
}
// 成功的回调函数
function successCallback(result) {
  console.log("声音文件创建成功: " + result.data);
}
// 失败的回调函数
function failureCallback(error) {
  console.log("声音文件创建失败: " + error.msg);
}
createAudioFileAsync(suc, successCallback, failureCallback) // 声音文件创建成功: bangbangbnag.mp3
createAudioFileAsync(err, successCallback, failureCallback) // 声音文件创建失败: error
```

### 使用 Promise 的好处？
#### 1. 链式调用：
#### 需求：连续执行两个或者多个异步操作，每一个后来的操作都在前面的操作执行成功之后，带着上一步操作所返回的结果开始执行。我们可以通过创造一个 Promise chain 来完成这种需求。

### 怎样使用 Promise？
[参考](https://www.jianshu.com/p/29da9aef4c1c)
需求：一个函数，一秒后打印“我是一秒后打印的文字”，二秒后打印“我是二秒后打印的文字”，三秒后打印“我是三秒后打印的文字”
``` js
// 过去，回调地狱


```
then函数会返回一个新的Promise变量，可以再次调用这个新的Promise变量的then函数

而then函数返回的是什么样的Promies，取决于onFulfilled回调的返回值。
``` js
// 使用 Promise
```
### 如何创建 Promise？


