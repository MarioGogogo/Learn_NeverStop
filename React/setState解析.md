# setState解析

![image-20200322220918113](http://book.52react.cn/uPic/cAfTyV5PwbovSup.png)

是否处于异步或同步，就看在react某一个组件执行过程中函数的执行体是否`isBatchUpdate`,

![image-20200322224149283](/Users/lovewcc/Documents/07_前端学习/React/image-20200322224149283.png)



没有命中是因为是个异步回调，回调回来之后 已经是`false`,

## setState异步还是同步

![image-20200322224403000](/Users/lovewcc/Documents/07_前端学习/React/image-20200322224403000.png)

## 哪些能命中batchUpdate

1. 生命周期（和他调用的函数）
2. React注册事件（和他调用的函数）
3. React可以管理的“入口”



##  transaction事件机制

![image-20200322225524986](/Users/lovewcc/Documents/07_前端学习/React/image-20200322225524986.png)



### 伪代码示意

![image-20200322225647006](/Users/lovewcc/Documents/07_前端学习/React/image-20200322225647006.png)