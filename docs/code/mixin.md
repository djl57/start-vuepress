# 混入
[文档](https://cn.vuejs.org/v2/guide/mixins.html)

- 当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

- 混入对象的钩子将在组件自身钩子之前调用

- 值为对象的选项，例如 methods, components 和 directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对

[vue中watch的理解小记](https://blog.csdn.net/wangxiaoxiaosen/article/details/78487089)

- watch是一个对象

- 键：就是你要监控的那个家伙，比如说$route，这个就是要监控路由的变化。或者是data中的某个变量

- 值有三种情况：
1. 函数：就是当你监控的家伙变化时，需要执行的函数。这个函数有两个形参，第一个是当前值，第二个是变化后的值。 

2. 函数名：不过这个函数名要用单引号来包裹。 

3. 对象：有三个选项：
   （1）handler：其值是一个回调函数。即监听到变化时应该执行的函数。
   （2）deep：其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。
   （3）immediate：其值是true或false；确认是否以当前的初始值执行handler的函数。
