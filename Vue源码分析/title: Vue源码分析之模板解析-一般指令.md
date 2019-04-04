title: Vue源码分析之模板解析-一般指令
date: 2019-02-18
categories: Vue
tags: [Vue]
keywords: Vue
---
带着问题去探索？vue中的v-text/v-html指令是如何实现的？
一般指令解析
```html
<p v-text="msg"></p>
<p v-html="msg"></p>
<p v-class="msg"></p>
```
### 判断是否是普通指令
```javascript
// 事件指令 exp表达式 也就是 方法名
if (me.isEventDirective(dir)) {
	compileUtil.eventHandler(node, me.$vm, exp, dir);
	// 普通指令
} else {
	compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
}
```
![](http://book.52react.cn/20190403234756.png)

```javascript
var compileUtil = {
	// 解析text
	text: function(node, vm, exp) {
		this.bind(node, vm, exp, 'text');
	},

	html: function(node, vm, exp) {
		this.bind(node, vm, exp, 'html');
	},
	
	class: function(node, vm, exp) {
		this.bind(node, vm, exp, 'class');
	},
	
```
### 最后使用更新器把节点赋值进去
```javascript
// 更新器  更新节点 给节点赋值
var updater = {
	textUpdater: function(node, value) {
		// textContent就是 {{word}}
		node.textContent = typeof value == 'undefined' ? '' : value;
	},

	htmlUpdater: function(node, value) {
		node.innerHTML = typeof value == 'undefined' ? '' : value;
	},

	classUpdater: function(node, value, oldValue) {
		var className = node.className;
		className = className.replace(oldValue, '').replace(/\s$/, '');
     //判断 class="a b" 还是 class=“b” 是否需要空格？
		var space = className && String(value) ? ' ' : '';

		node.className = className + space + value;
	},

	modelUpdater: function(node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value;
	}
```
### 小结
1) 得到指令名和指令值(表达式) text/html/class msg/myClass
2) 从 data 中根据表达式得到对应的值
3) 根据指令名确定需要操作元素节点的什么属性
* v-text---textContent 属性 * v-html---innerHTML 属性 * v-class--className 属性
4) 将得到的表达式的值设置到对应的属性上
5) 移除元素的指令属性