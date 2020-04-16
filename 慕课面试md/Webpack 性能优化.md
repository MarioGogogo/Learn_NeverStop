#  Webpack 性能优化

## 减少 Webpack 打包时间

### 优化 Loader

> 影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 `AST`，然后对 AST 继续进行转变最后再生成新的代码，项目越大，**转换代码越多，效率就越低**



```js
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ]
  }
}
```



其次将 Babel 编译过的文件**缓存**起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间

```js
loader: 'babel-loader?cacheDirectory=true' //加入上面代码中
```

### HappyPack

受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。

**HappyPack 可以将 Loader 的同步执行转换为并行的**

```js
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```



### DllPlugin

**DllPlugin 可以将特定的类库提前打包然后引入**

减少打包类库的次数

实现了将公共代码抽离成单独文件的优化方案



### 代码压缩

在 Webpack4 中，我们就不需要以上这些操作了，只需要将 `mode` 设置为 `production` 就可以默认开启以上功能。

代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中。

我们还可以通过配置实现比如删除 `console.log` 这类代码的功能。

```js
const TerserPlugin = require('terser-webpack-plugin');
...
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
          },
        },
      }),
    ],
  },
};
```





## 减少 Webpack 打包后的文件体积

### 按需加载



### Scope Hoisting



**Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。**

如果在 Webpack4 中你希望开启这个功能，只需要启用 `optimization.concatenateModules` 就可以了。

```js
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```

### Tree Shaking

**Tree Shaking 可以实现删除项目中未被引用的代码**

```js
// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
```

如果你使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。变量 `b` 如果没有在项目中使用到的话，就不会被打包到文件中。

### 开启gzip压缩

可以减小文件体积，传输速度更快。

- 服务端发送 `response` 时可以配置 `Content-Encoding：gzip`，用户说明数据的压缩方式
- 浏览器接受时，就可以根据相应个格式去解码。客户端请求时，可以用 Accept-Encoding:gzip，用户说明接受哪些压缩方法



```js
const CompressionWebpackPlugin = require('compression-webpack-plugin');

webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
)
```



## 参考



# [webpack4 的生产环境优化](https://segmentfault.com/a/1190000015836090)

