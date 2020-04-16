# koa2+mysql后台开发项目

## 创建项目

### 1.建立文件夹名为koa-decorator 目录如下

```json
├── dist----------------------------------- 编译后的
├── src ----------------------------------- 项目的所有代码
│ ├──config ----------------------------- 配置文件
│ ├──controller ------------------------- 控制器
│ ├──lib -------------------------------- 一些项目的核心文件（如路由的装饰器文件就在这里）
│ ├──logic ------------------------------ 一些数据校验
│ ├──middleware ------------------------- 中间件
│ ├──models------------------------------ 操作数据表相关逻辑代码(根据项目复杂度可以再分Service层)
│ ├──util-------------------------------- 相关的工具文件
│ ├──index.js---------------------------- 项目的入口文件
├── theme --------------------------------- 一些静态文件(上传的图片)
├── .babelrc ------------------------------ babelrc 的相关配置
├── .gitignore ---------------------------- git 的忽略配置文件
├── dev.js -------------------------------- 开发环境的启动文件
├── production.js ------------------------- 生产环境的启动文件
```

### 2.入口文件

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

### 3.配置package.json

```js
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "build": "babel src  --out-dir dist",
   "dev": "set NODE_ENV=development &&  supervisor  --watch src dev.js",
   "start": "npm run build && set NODE_ENV=production  && supervisor --watch dist production.js",
   "pm2": "pm2 start production.js --name &#39;wx-node&#39; --env  NODE_ENV=&#39;production&#39; --output ./logs/logs-out.log  --error ./logs/logs-error.log  --watch dist"
 },
```

1.    运行 npm run build : 是用babel 直接将src 目录编译在dist 目录

2. 　运行 npm run dev ： 是设置环境变量为development 并且监听src目录，启动dev.js 运行，为开发环境

3.    运行 npm run start : 是 运行第一个命令npm run build 并且设置环境变量为production 监听dist 目录,启动production.js运行，为生产或者测试环境

4.      运行npm run pm2： 这是使用pm2来守护项目进程,并且设置环境变量和日志记

### 4.nodejs入口文件

创建server文件下index,js

```js
const Koa = require(&#39;koa&#39;);
const { resolve } = require(&#39;path&#39;);
const views = require(&#39;koa-views&#39;);
const R = require(&#39;ramda&#39;);
const MIDDLEWARES = [ &#39;common&#39;, &#39;router&#39; ];

const useMiddlewares = (app) => {
  R.map(
    R.compose(R.forEachObjIndexed((initWith) => initWith(app)), require, (name) =>
      resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES);
};

(async () => {
  //创建实例
  const app = new Koa();
  //views
  app.use(
    views(resolve(__dirname, &#39;../views&#39;), {
      extension : &#39;html&#39;
    })
  );

  // error logger
  app.on(&#39;error&#39;, (err, ctx) => {
    console.log(&#39;error occured:&#39;, err);
  });

  await useMiddlewares(app);
  // 监听端口
  app.listen(4455, () => {
    console.log(&#39;http://127.0.0.1:4455 is runing&#39;);
  });
})();
```

### 5.Router路由二次封装配置

在lib文件中创建decorator.js

```js
const Router = require('koa-router');
const { resolve } = require('path');
const _ = require('lodash');
const glob = require('glob');
const R = require('ramda');

const symbolPrefix = Symbol('prefix');
const routerMap = new Map();

const isArray = (c) => (_.isArray(c) ? c : [ c ]);

export class Route {
  constructor(app, apiPath) {
    this.app = app;
    this.apiPath = apiPath;
    this.router = new Router();
  }

  init() {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require);

    for (let [ conf, controller ] of routerMap) {
      const controllers = isArray(controller);
      let prefixPath = conf.target[symbolPrefix];
      if (prefixPath) prefixPath = normalizePath(prefixPath);
      const routerPath = prefixPath + conf.path;
      this.router[conf.method](routerPath, ...controllers);
    }

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}

const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);

const router = (conf) => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path);

  routerMap.set(
    {
      target : target,
      ...conf
    },
    target[key]
  );
};

export const controller = (path) => (target) => (target.prototype[symbolPrefix] = path);

export const get = (path) =>
  router({
    method : 'get',
    path   : path
  });

export const post = (path) =>
  router({
    method : 'post',
    path   : path
  });

export const put = (path) =>
  router({
    method : 'put',
    path   : path
  });

export const del = (path) =>
  router({
    method : 'delete',
    path   : path
  });

export const use = (path) =>
  router({
    method : 'use',
    path   : path
  });

export const all = (path) =>
  router({
    method : 'all',
    path   : path
  });

const decorate = (args, middleware) => {
  let [ target, key, descriptor ] = args;

  target[key] = isArray(target[key]);
  target[key].unshift(middleware);

  return descriptor;
};

const convert = (middleware) => (...args) => decorate(args, middleware);

export const auth = convert(async (ctx, next) => {
  console.log('ctx.session.user');
  console.log(ctx.session.user);
  if (!ctx.session.user) {
    return (ctx.body = {
      success : false,
      code    : 401,
      err     : '登录信息失效，重新登录'
    });
  }

  await next();
});

export const admin = (roleExpected) =>
  convert(async (ctx, next) => {
    try {
      const { role } = ctx.session.user;
      console.log('admin session');
      console.log(ctx.session.user);

      if (!role || role !== roleExpected) {
        return (ctx.body = {
          success : false,
          code    : 403,
          err     : '你没有权限，来错地方了'
        });
      }
      await next();
    } catch (error) {
      return (ctx.body = {
        success : false,
        code    : 505,
        err     : "Cannot destructure property `role` of 'undefined' or 'null'."
      });
    }
  });

export const required = (rules) =>
  convert(async (ctx, next) => {
    let errors = [];

    const checkRules = R.forEachObjIndexed((value, key) => {
      errors = R.filter((i) => !R.has(i, ctx, ctx.request[key]))(value);
    });

    checkRules(rules);

    if (errors.length) {
      ctx.body = {
        success : false,
        code    : 412,
        err     : `${errors.join(',')} is required`
      };
    }

    await next();
  });
```

middle文件夹中创建route.js

```js
const { Route } = require('../lib/decorator');
const { resolve } = require('path');

export const router = (app) => {
  const apiPath = resolve(__dirname, '../routes');
  const router = new Route(app, apiPath);

  router.init();
};
```

创建 routes文件夹下user.js

```js
const { controller, get, post, put } = require('../lib/decorator');

@controller('/api/v0/user')
export class userController {
  @get('/')
  async login(ctx, next) {
    return (ctx.body = {
      success : false,
      err     : '用户'
    });
  }
}
```

### 6.mysql配置

创建config文件夹-->default.js

```js
//服务器配置信息
const config = {
  port     : 4455,
  database : {
    DATABASE : 'order_test',
    USERNAME : 'root',
    PASSWORD : '123456',
    PORT     : '3306',
    HOST     : 'localhost'
  }
};
module.exports = config;
```

创建lib文件夹中mysql.js

```js
var mysql = require('mysql');
var config = require('../config/default.js');

var pool = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    // 执行sql脚本对数据库进行读写
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            console.log('数据库连接正常');
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

// 数据库表格创建
const createTables = {
  users          : `CREATE TABLE IF NOT EXISTS user_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      user_id VARCHAR ( 100 ) NOT NULL COMMENT '账号',
      user_name VARCHAR ( 100 ) NOT NULL COMMENT '用户名',
      user_pwd VARCHAR ( 100 ) NOT NULL COMMENT '密码',
      user_head VARCHAR ( 225 ) COMMENT '头像',
      user_mobile VARCHAR ( 20 ) COMMENT '手机',
      user_email VARCHAR ( 64 ) COMMENT '邮箱',
      user_creatdata TIMESTAMP NOT NULL DEFAULT NOW( ) COMMENT '注册日期',
      user_login_time TIMESTAMP DEFAULT NOW( ) COMMENT '登录时间',
      user_count INT COMMENT '登录次数'
    ) ENGINE = INNODB charset = utf8;`,
  role           : `CREATE TABLE IF NOT EXISTS role_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      role_name VARCHAR ( 20 ) NOT NULL COMMENT '角色名',
      role_description VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述'
    ) ENGINE = INNODB charset = utf8;`,
  permission     : `CREATE TABLE IF NOT EXISTS permission_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      permission_name VARCHAR ( 20 ) NOT NULL COMMENT '权限名',
      permission_description VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述'
    ) ENGINE = INNODB charset = utf8;`,
  userRole       : `CREATE TABLE IF NOT EXISTS user_role (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      user_id INT NOT NULL COMMENT '关联用户',
      role_id INT NOT NULL COMMENT '关联角色',
      KEY fk_user_role_role_info_1 ( role_id ),
      KEY fk_user_role_user_info_1 ( user_id ),
      CONSTRAINT fk_user_role_role_info_1 FOREIGN KEY ( role_id ) REFERENCES role_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_user_role_user_info_1 FOREIGN KEY ( user_id ) REFERENCES user_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = INNODB charset = utf8;`,
  rolePermission : `CREATE TABLE IF NOT EXISTS role_permission (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      role_id INT NOT NULL COMMENT '关联角色',
      permission_id INT NOT NULL COMMENT '关联权限',
      KEY fk_role_permission_role_info_1 ( role_id ),
      KEY fk_role_permission_permission_info_1 ( permission_id ),
      CONSTRAINT fk_role_permission_role_info_1 FOREIGN KEY ( role_id ) REFERENCES role_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_role_permission_permission_info_1 FOREIGN KEY ( permission_id ) REFERENCES permission_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = INNODB charset = utf8;`
};

let createTable = (sql) => {
  return query(sql, []);
};

// 建表 ----创建一次之后可以注释不需要
createTable(createTables.users);
createTable(createTables.role);
createTable(createTables.permission);
createTable(createTables.userRole);
createTable(createTables.rolePermission);

// 通过名字查找用户
const findDataByName = (name) => {
  let _sql = `select * from user_info where user_name="${name}";`;
  return query(_sql);
};
findDataByName('jack').then((res) => {
  console.log(res);
});

....
//其他方法相似
```

在路由文件中router文件夹下-->user.js

```js
const { controller, get, post, put } = require('../lib/decorator');
const userModel = require('../lib/mysql.js');

@controller('/api/v0/user')
export class userController {
  @get('/')
  async login(ctx, next) {
    const result = await userModel.findDataByName('jack');
    console.log(result);
    return (ctx.body = {
      success : false,
      data    : result
      err     : '用户'
    });
  }
}
.....
//其他操作类型
```

## 参考

[koa2+vue+mysql 全栈开发记录](https://segmentfault.com/a/1190000018535128#item-1-5)
