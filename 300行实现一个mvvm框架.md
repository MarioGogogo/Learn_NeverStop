# 300行实现一个mvvm框架

剖析Vue实现原理 - 如何实现双向绑定mvvm

> 本文能帮你做什么？<br>
> 1、了解vue的双向数据绑定原理以及核心代码模块<br>
> 2、缓解好奇心的同时了解如何实现双向绑定<br>

##### 相信大家对mvvm双向绑定应该都不陌生了，一言不合上代码，下面先看一个本文最终实现的效果吧，和vue一样的语法，如果还不了解双向绑定，猛戳[Google](https://www.google.com.hk/search?q=%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A)剖析Vue实现原理 - 如何实现双向绑定mvvm

> 本文能帮你做什么？<br>
> 1、了解vue的双向数据绑定原理以及核心代码模块<br>
> 2、缓解好奇心的同时了解如何实现双向绑定<br>
> 为了便于说明原理与实现，本文相关代码主要摘自[vue源码](https://github.com/vuejs/vue), 并进行了简化改造，相对较简陋，并未考虑到数组的处理、数据的循环依赖等，也难免存在一些问题，欢迎大家指正。不过这些并不会影响大家的阅读和理解，相信看完本文后对大家在阅读vue源码的时候会更有帮助

##### 相信大家对mvvm双向绑定应该都不陌生了

### 理解下文档碎片

![](http://book.52react.cn/20200221170648.png)

```html
  <div id="app">
    <h2>{{person.name}} -- {{person.age}}</h2>
    <h3>{{person.fav}}</h3>
    <h3>{{msg}}</h3>
    <div v-text="msg"></div>
    <div v-text="person.name"></div>
    <div v-html="htmlStr"></div>
    <input type="text" v-model="msg" />
    <button v-on:click="handleClick">
      v-on:click
    </button>
```

效果:

![](http://book.52react.cn/20200223162426.png)

### 几种实现双向绑定的做法

目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：

> 发布者-订阅者模式（backbone.js）

> 脏值检查（angular.js） <br>

> 数据劫持（vue.js） 

**发布者-订阅者模式:** 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 `vm.set('property', value)`，这里有篇文章讲的比较详细，有兴趣可点[这里](http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day)

这种方式现在毕竟太low了，我们更希望通过 `vm.property = value `这种方式更新数据，同时自动更新视图，于是有了下面两种方式

**脏值检查:** angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 `setInterval()` 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：

- DOM事件，譬如用户输入文本，点击按钮等。( ng-click ) 
- XHR响应事件 ( $http ) 
- 浏览器Location变更事件 ( $location ) 
- Timer事件( $timeout , $interval ) 
- 执行 $digest() 或 $apply()

**数据劫持:** vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

### 思路整理

已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过`Object.defineProperty()`来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：
1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4、mvvm入口函数，整合以上三者

上述流程如图所示：

![图片](http://book.52react.cn/20190218173717.png)

### 1、实现Compile

compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图，如图所示：
![img3][img3]

因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将vue实例根节点的`el`转换成文档碎片`fragment`进行解析编译操作，解析完成，再将`fragment`添加回原来的真实dom节点中

```js
class MiniVue {
  constructor(options) {
    // 初始元素与数据通过options对象绑定
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    // 通过Compiler对象对模版进行编译，例如{{}}插值、v-text、v-html、v-model等Vue语法
    if (this.$el) {
      //实现一个数据观察者
      new Observer(this.$data);
      //实现一个指令解析器
      new Compiler(this.$el, this);
    }
  }
}
```

在初始的时候显示2个方法一个是`Observer`和`Compiler`

```js
// 编译HTML模版对象
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    console.log('TCL: Compiler -> constructor -> this.el', el);

    this.vm = vm;
    // 1. 将预编译的元素节点放入文档碎片对象中，避免DOM频繁的回流与重绘，提高渲染性能
    const fragments = this.node2fragments(this.el);
    console.log('TCL: Compiler -> node2fragments -> this.el', this.el);
    // 2. 编译模版
    // this.compile(fragments);
    // 3. 追加子元素到根元素
    this.el.appendChild(fragments);
  }
  compile(fragments) {
    // 1.获取子节点
    const childNodes = fragments.childNodes;
    // 2.递归循环编译
    [ ...childNodes ].forEach((child) => {
      // 如果是元素节点
      if (this.isElementNode(child)) {
        this.compileElement(child);
      } else {
        // 文本节点
        this.compileText(child);
      }
      //递归遍历
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }
  /**
   * 编译元素节点
   * @param {*} node 
   */
  compileElement(node) {
    let attributes = node.attributes;
    // 对于每个属性进行遍历编译
    // attributes是类数组，因此需要先转数组
    [ ...attributes ].forEach((attr) => {
      let { name, value } = attr; // v-text="msg"  v-html=htmlStr  type="text"  v-model="msg"
      if (this.isDirector(name)) {
        // v-text  v-html  v-mode  v-bind  v-on:click v-bind:href=''
        let [ , directive ] = name.split('-');
        let [ compileKey, detailStr ] = directive.split(':');
        // 更新数据，数据驱动视图
        compileUtil[compileKey](node, value, this.vm, detailStr);
        // 删除有指令的标签属性 v-text v-html等，普通的value等原生html标签不必删除
        node.removeAttribute('v-' + directive);
      } else if (this.isEventName(name)) {
        // 如果是事件处理 @click='handleClick'
        let [ , detailStr ] = name.split('@');
        compileUtil['on'](node, value, this.vm, detailStr);
        node.removeAttribute('@' + detailStr);
      }
    });
  }
  /**
   * 编译文本节点
   * @param {*} node 
   */
  compileText(node) {
    // 编译文本中的{{person.name}}--{{person.age}}
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }
  isEventName(attrName) {
    // 判断是否@开头
    return attrName.startsWith('@');
  }
  isDirector(attrName) {
    // 判断是否为Vue特性标签
    return attrName.startsWith('v-');
  }
  node2fragments(el) {
    // 创建文档碎片对象
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.appendChild(firstChild);
    }
    return f;
  }
  isElementNode(node) {
    // 元素节点的nodeType属性为 1
    return node.nodeType === 1;
  }
}
```

compileElement方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定，

compileUtil工具方法是将执行渲染节点中的指令一一解析成data中的数据,根据v-xxx中对应的方法

```js
const compileUtil = {
  getValue(expr, vm) {
    console.log('TCL: getValue -> expr, vm', expr);
    // expr ==> name age  html
    // 处理 person.name 这种对象类型，取出真正的value
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  setVal(expr, vm, inputValue) {
    return expr.split('.').reduce((data, currentVal) => {
      data[currentVal] = inputValue;
    }, vm.$data);
  },
  text(node, expr, vm) {
    console.log('TCL: text -> node, expr, vm', node, expr);
    let value;
    if (expr.indexOf('{{') !== -1) {
      //获取每一个匹配的数据

      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        console.log('args', ...args);
        //绑定观察者 将来数据发生变化 触发这里的回调 进行更新
        new Watcher(args[1], vm, (newVal) => {
          this.updater.textUpdater(node, newVal);
        });

        return this.getValue(args[1], vm);
      });
    } else {
      value = this.getValue(expr, vm);
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {},
  model(node, expr, vm) {},

  bind(node, expr, vm, detailStr) {},
  // 视图更新函数
  updater  : {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
};
```

这里通过递归遍历保证了每个节点及子节点都会解析编译到，包括了{{}}表达式声明的文本节点。指令的声明规定是通过特定前缀的节点属性来标记，如`&lt;span v-text=&quot;content&quot; other-attr`中`v-text`便是指令，而`other-attr`不是指令，只是普通的属性。
监听数据、绑定更新函数的处理是在`compileUtil.bind()`这个方法中，通过`new Watcher()`添加回调来接收数据变化的通知

至此，一个简单的Compile就完成了接下来要看看Observer这个的具体实现了

### 2、实现Observer

ok, 思路已经整理完毕，也已经比较明确相关逻辑和模块功能了
我们知道可以利用`Obeject.defineProperty()`来监听属性变动
那么将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上    `setter`和`getter`
这样的话，给这个对象的某个值赋值，就会触发`setter`，那么就能监听到了数据变化。。相关代码可以是这样：

```javascript
/**
数据劫持
*/
class Observer {
  constructor(data) {
    this.observe(data);
  }
  // data是一个对象，可能嵌套其它对象，需要采用递归遍历的方式进行观察者绑定
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  ...
}
```

这样我们已经可以监听每个数据的变化了，那么监听到变化之后就是怎么通知订阅者了，所以接下来我们需要实现一个消息订阅器，很简单，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法，代码改善之后是这样：

```javascript
// ... 省略
 // 通过 object.defineProperty方法对对象属性进行劫持
  defineReactive(obj, key, value) {
    // 递归观察 劫持里面对象
    this.observe(value);

    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable   : true,
      configurable : false,
      get() {
        return value;
      },
      // 采用箭头函数在定义时绑定this的定义域
      set          : (newVal) => {
        if (newVal !== value) {
          //一旦有数据被更改就要监听
          value = newVal;
        }
        //告诉Dep 通知变化
        dep.notify();
      }
    });
  }

 //收集依赖
class Dep {
  constructor() {
    this.subs = [];
  }
  //收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }

  //通知观察者
  notify() {
    console.log('通知了所有观察者', this.subs);
    this.subs.forEach((w) => w.update());
  }
}
```

那么问题来了，谁是订阅者？怎么往订阅器添加订阅者？
没错，上面的思路整理中我们已经明确订阅者应该是Watcher, 而且`var dep = new Dep();`是在 `defineReactive`方法内部定义的，所以想通过`dep`添加订阅者，就必须要在闭包内操作，所以我们可以在    `getter`里面动手脚：

```javascript
// Observer.js
// ...省略
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
    // ... 省略
});

// Watcher.js
Watcher.prototype = {
    get: function(key) {
        Dep.target = this;
        this.value = data[key];    // 这里会触发属性的getter，从而添加订阅者
        Dep.target = null;
    }
}
```

这里已经实现了一个Observer了，已经具备了监听数据和数据变化通知订阅者的功能，[完整代码](https://github.com/DMQ/mvvm/blob/master/js/observer.js)。那么接下来就是实现Compile了

### 3、实现Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
如果有点乱，可以回顾下前面的[思路整理](#_2)

```javascript
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get(); 
}
Watcher.prototype = {
    update: function() {
        this.run();    // 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};
```

实例化`Watcher`的时候，调用`get()`方法，通过`Dep.target = watcherInstance`标记订阅者是当前watcher实例，强行触发属性定义的`getter`方法，`getter`方法执行的时候，就会在属性的订阅器`dep`添加当前watcher实例，从而在属性值有变化的时候，watcherInstance就能收到更新通知。

ok, Watcher也已经实现了，[完整代码](https://github.com/DMQ/mvvm/blob/master/js/watcher.js)。
基本上vue中数据绑定相关比较核心的几个模块也是这几个，猛戳[这里](https://github.com/vuejs/vue) , 在`src` 目录可找到vue源码。

最后来讲讲MVVM入口文件的相关逻辑和实现吧，相对就比较简单了~

### 4、阐述下实现MVVM的原理

MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用`Watcher`搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。 

### 总结

本文主要围绕“几种实现双向绑定的做法”、“实现Observer”、“实现Compile”、“实现Watcher”、“实现MVVM”这几个模块来阐述了双向绑定的原理和实现。并根据思路流程渐进梳理讲解了一些细节思路和比较关键的内容点，以及通过展示部分关键代码讲述了怎样一步步实现一个双向绑定MVVM。文中肯定会有一些不够严谨的思考和错误，欢迎大家指正，有兴趣欢迎一起探讨和改进~
