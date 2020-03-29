# Event Loop



> 为什么 `setTimeout` 会比 `Promise` 后执行，明明代码写在 `Promise` 之前。

## 进程与线程

> 当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。



执行栈认为是一个存储函数调用的**栈结构**，遵循先进后出的原则。



## 浏览器中的 Event Loop

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 **微任务**（microtask） 和 **宏任务**（macrotask）。在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。



 Event Loop 执行顺序如下所示：

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`，其中 `process.nextTick` 为 Node 独有。

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。



## Node 中的 Event Loop

Node 的 Event Loop 分为6 个阶段，它们会按照**顺序**反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![image-20200329203034641](/Users/lovewcc/Documents/暴力熊团队/Learn_NeverStop/慕课面试md/image-20200329203034641.png)



### timer

timers 阶段会执行 `setTimeout` 和 `setInterval` 回调，并且是由 poll 阶段控制的。

同样，在 Node 中定时器指定的时间也不是准确时间，只能是**尽快**执行。

### I/O

I/O 阶段会处理一些上一轮循环中的**少数未执行**的 I/O 回调

### idle, prepare

idle, prepare 阶段内部实现，这里就忽略不讲了。

### poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1. 回到 timer 阶段执行回调
2. 执行 I/O 回调

### check

check 阶段执行 `setImmediate`

### close callbacks

close callbacks 阶段执行 close 事件



Node 中的 `process.nextTick`，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空队列中的所有回调函数**，并且**优先于其他 microtask 执行**。





