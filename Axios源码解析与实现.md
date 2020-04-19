### Axios源码中学到什么

###       `axios` 是目前最常用的 `HTTP` 	请求库，即可以用于前端浏览器也可以在后端 `node.js` 中使用，在 `github` 上的 `star` 数已经有 `6w+` 了，它也是 `vue.js` 官方极力推荐的，前端（全栈）开发必不可少的库，它的主要特性包括

- 基于 `Promise`
- 支持 前端浏览器环境 和 后端 `node.js` 环境
- 可添加拦截器转换请求和响应数据
- 支持请求取消
- 自动转换 `JSON` 数据
- 客户端支持防范 `XSRF`
- 支持各主流浏览器以及 `IE8+`

![](http://book.52react.cn/20200121123122.png)

## 知识要点

- XMLHttpRequest
- Promise 异步编程
- 工具函数库：bind、extend、deepCopy、deepMerge……
- 拦截器：Interceptor
- 拦截器管理：InterceptorManager
- 适配器：Adaptor
- 工厂函数：createInstance

## 配置

- 全局配置
- 实例配置
- 请求配置

### 全局配置

提供配置参考，实例化的时候可以使用

> 注意：使用过程不要修改该配置 - 特别注意赋址引用的问题

### 实例配置

有的时候，在一个应用中可能会需要实例化多个不同的 `Kxios` 对象（针对不同的接口，有利于管理），所以每一个实例化的对象会有自己的配置，可以通过全局配置进行初始化，或合并一个新的配置项

### 请求配置

同一个实例会有一些公用的配置项（如：`baseURL`)，但是更多的时候，不同的请求具体配置是不一样的（如：`url`、`method` 等），所以在请求的时候需要传入配置与实例配置进行合并

> 以上的不同的配置在进行复用和合并的时候都需要注意：
>
> - 不要影响（赋址引用）

#### 深度克隆 - deepCopy 函数

基于上面说的，我们需要封装一个方法，用于深度克隆对象

#### 配置合并 - configMerge 函数

对于配置合并，并不能简单的进行处理，需要针对不同的配置进行不同的处理，有的是覆盖，有的合并

- `baseURL`、`url`、 `method` 等是直接覆盖的
- `headers` 是需要进行合并处理的



## 异步任务链  - Promise

因为 `Kxios` 是对异步任务的封装，所以必不可少的，我们需要使用 `Promise` 来进行包装



## 拦截器 - Interceptor

给实例对象添加 `request` 和 `response` 拦截器

```javascript
constructor(config) {
  this.defaults = deepCopy(config);

  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor()
  }
}
```

### Interceptor

拦截器对象，用来注册和管理拦截器

![](http://book.52react.cn/20200122094434.png)

### 异步任务链

把请求包装在 `Promise` 任务链中

```javascript
let promise = Promise.resolve(configs);

this.interceptors.request.handlers.forEach(handler => {
  promise = promise.then(handler.resolvedHandler, handler.rejectedHandler);
});

promise = promise.then(this.dispatch, undefined);

this.interceptors.response.handlers.forEach(handler => {
  promise = promise.then(handler.resolvedHandler, handler.rejectedHandler);
});
```



## 适配器 - Adapter

`axios` 用同一套 `api` 解决了不同平台下的差异问题，针对不同的实现提供了一个用于适配的方法（适配器）

- browser : XMLHttpRequest / Fetch
- node : http / https



## 数据转换

请求数据转换 : `transformRequest`

响应数据转换 : `transformResponse`



## 工厂函数包装

通过工厂函数对实例化对象过程进行包装

- request 方法处理
- 实例挂载
  - this 的处理

![](http://book.52react.cn/20200122102604.png)