title: Vue源码分析之模板解析-事件指令
date: 2019-02-17
categories: Vue
tags: [Vue]
keywords: Vue
---

带着问题去探索？vue中的@click指令是如何实现的？
<!--more-->
事件指令解析
```html
<button v-on:click="button">{{name}}</button>
```
### 首先还是判断元素节点
```javascript
	//判断是否元素节点
	if (me.isElementNode(node)) {
		// 编译指令
		me.compile(node);
		// 判断是否是大括号的文本节点
	}
```
### 然后进入compile编译
```javascript
var nodeAttrs = node.attributes,
	me = this;
//[].slice.call(nodeAttrs) --->伪数组 转成数组
[].slice.call(nodeAttrs).forEach(function(attr) {
	//attrname = “v-on = "click""
	var attrName = attr.name;
	if (me.isDirective(attrName)) {
		var exp = attr.value;
		var dir = attrName.substring(2); // "on:click"
		// 事件指令
		if (me.isEventDirective(dir)) {
			compileUtil.eventHandler(node, me.$vm, exp, dir);
			// 普通指令
		} else {
			compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
		}

		node.removeAttribute(attrName);
	}
});
```
![](http://book.52react.cn/20190403232043.png)
### 如何绑定事件
```javascript
	// 事件处理   事件button绑定事件监听  事件名和回调函数
	eventHandler: function(node, vm, exp, dir) {
		// 得到事件类型名 :click
		var eventType = dir.split(':')[1],
		//从methods中得到表达式所对应的函数（事件回调函数）
			fn = vm.$options.methods && vm.$options.methods[exp]; //取到事件的函数
     //如果都存在
		if (eventType && fn) {
			//绑定事件监听 fn.bind(vm) //让事件中 this.name -->指向vm
			// 给节点绑定事件名和回调函数dom事件监听
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},
```
![](http://book.52react.cn/20190403232541.png)
### 但我们在页面中看不到如何指令，因为
```javascript
 //移除指令属性
 node.removeAttribute(attrName);
```
### 小结：
模板解析(2): 事件指令解析
1) 从指令名中取出事件名
2) 根据指令的值(表达式)从 methods 中得到对应的事件处理函数对象
3) 给当前元素节点绑定指定事件名和回调函数的 dom 事件监听
4) 指令解析完后, 移除此指令属性


