# koa2使用es7 的装饰器decorator

本文主要项目中使用装饰器（decorator）来动态加载koa-router的路由的一个基础架构。

目前JavaScript 对decorator 是不支持，但是可以用babel 来编译.

## 装饰器配置

```js
"devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.8.4",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/plugin-proposal-decorators": "^7.8.3",
    "@babel/register": "^7.8.3",
    "babel-preset-env": "^1.7.0" //支持import 导入
  },
```

babel配置文件 .babelrc

```js
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }]
  ]
}
```

我们创建一个js

```js
class Boy {
  @speak('Chinese')
  run() {
    console.log('====================================');
    console.log('i can run !');
    console.log('====================================');
  }
}

/**
 * @param {any} target | 指装饰的对象 boy speak紧跟的class
 * @param {any} key |  修饰的方法  run
 * @param {any} descriptor |  特定的描述
 */
function speak(language) {
  return function(target, key, descriptor) {
    console.log(target);
    console.log(key);
    console.log(descriptor);

    target.language = language;

    return descriptor;
  };
}

const luke = new Boy();

luke.run();
```

入口文件

```js
// 注册
require(&#39;@babel/register&#39;);
// 引入被执行的文件
require(&#39;./server/index.js&#39;);
```

## import支持

nodejs仍未支持import/export语法，需要安装必要的npm包–babel，使用babel将js文件编译成node.js支持的commonjs格式的代码。

```js
yarn add babel-register babel-preset-env -D
```

babel配置文件 .babelrc

```js
{
 "plugins": [
    "transform-es2015-modules-commonjs"
 ]
}
```

## 创建项目

### ### 1.入口文件

编写开发环境dev.js和 生产环境的production.js 的启动文件

```js
1. dev.js
require("babel-register");
process.env.NODE_ENV = "development";
require("./src");


2. production.js
process.env.NODE_ENV = "production";
require("./dist");
```

### 2.配置package.json

```js
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "build": "babel src  --out-dir dist",
   "dev": "set NODE_ENV=development &&  supervisor  --watch src dev.js",
   "start": "npm run build && set NODE_ENV=production  && supervisor --watch dist production.js",
   "pm2": "pm2 start production.js --name 'wx-node' --env  NODE_ENV='production' --output ./logs/logs-out.log  --error ./logs/logs-error.log  --watch dist"
 },
```

1.    运行 npm run build : 是用babel 直接将src 目录编译在dist 目录

2. 　运行 npm run dev ： 是设置环境变量为development 并且监听src目录，启动dev.js 运行，为开发环境

3.    运行 npm run start : 是 运行第一个命令npm run build 并且设置环境变量为production 监听dist 目录,启动production.js运行，为生产或者测试环境

4.      运行npm run pm2： 这是使用pm2来守护项目进程,并且设置环境变量和日志记

## 参考

[koa2使用es7 的装饰器decorator - 天高任鸟飞吧 - 博客园](https://www.cnblogs.com/beyonds/p/11190359.html)
