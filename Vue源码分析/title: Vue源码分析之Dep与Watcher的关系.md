title: Vue源码分析之Dep与Watcher的关系
date: 2019-02-17
categories: Vue
tags: [Vue]
keywords: Vue
---
一旦更新了data的属性发生了改变，所有界面上`直接或间接`使用此属性的节点都会发生改变
<!--more-->
![](http://book.52react.cn/20190405082123.png)

```
        var vm = new MVVM({
				el: '#vue-app',
				data: {
					name: 'Hello World!',
					sex:"👩",
					play:{
						  name:"hello Vue",
							sex:"girl"
					}
				},
				methods: {
					update: function() {
						this.name = 'Hi, everybody!';
					}
				},
			});
```
```javascript
	// 监听属性变化
		new Watcher(vm, exp, function(value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		});
```
监视器必须知道如何更新`exp`这个表达式，但是exp有 {{}}与指令on-click；
后面接回调函数，1怎么调？2何时调？3this是谁？

表达式所对应的属性发生改变就调用！更新对应节点的内容；
```javascript
function(value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		}
```

然后

```
function Watcher(vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.depIds = {};
    ...
    this.value = this.get();
}
Watcher.prototype = {
    get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },


}
```
![](http://book.52react.cn/20190405083014.png)
### 继续研究下Dep是个什么东东？
如何初始化Dep?
在初始化给data属性进行数据劫持时创建
```javascript
   //初始化挂载监听
    defineReactive: function(data, key, val) {
        var dep = new Dep();
		// 为什么继续调用observe 如果data中对象存在 a:{b:{c:1}}
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            ...
```
创建个数？
与data中的属性一一对应
Dep的结构：
   id 标识
   subs：[] //n个wather容器


Watcher的如何创建？
   初始化解析大括号表达式或一般指令时创建
   个数？
   与表达式的个数（排除事件指令）一一对应
   结构：
   
```
   this.cb = cb;              //回调函数
    this.vm = vm;             //vm对象
    this.expOrFn = expOrFn;    //对应的表达式
    this.depIds = {};           //相关n个dep容器
     this.value = this.get();  //当前表达式的value
```

### 思考下这样一个过程：

> vm.name = "123" -->data中的name发生了改变-->触发了name中的set()方法调用--> 通知订阅者dep.notify()--->通知所有相关的wather-->wather中的this.cb回调方法-->updater->更新data中的name属性

### dep与wather的关系？
多对对的关系
{{name}} --->dep ->多个wather {{name}}/v-text="name"多次出现
{{name}}一个表达式-->对应一个wather -->`多层表达式`对应n个dep(表达b.a.c 对应一个wather->对应2个dep)
如何建立？

dep与wather关系
如何建立？ data属性中的get方法中建立
什么时候建立？ 初始化的解析模板中的表达式，解析每一个表达式 new一个wather对象时候建立，dep先创建wather后创建
![](http://book.52react.cn/20190406155532.png)


```javascript
	<div id="vue-app">
			<input type="text" v-model="word">
			<p>{{word}}</p>
			<p v-text="word"></p>
			<p v-text="word"></p>
			<button v-on:click="sayHi">change model</button>
		</div>
		<script>
			var vm = new MVVM({
				el: '#vue-app',
				data: {
					word: 'Hello World!',
				  more:{
						 word:"Vue"
					}
				},
				methods: {
					sayHi: function() {
						this.word = 'Hi, everybody!';
					}
				},
			});
		</script>
```
点击事件触发数据更新，执行`dep.notify()`方法
![](http://book.52react.cn/20190406162212.png)
订阅去遍历监听了多少相同的属性值
![](http://book.52react.cn/20190406162430.png)
启动update方法
![](http://book.52react.cn/20190406162743.png)

![](http://book.52react.cn/20190406162900.png)

依次重新循环遍历更新
![](http://book.52react.cn/20190406163104.png)
