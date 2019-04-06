title: Vue源码分析之双向数据绑定
date: 2019-02-19
categories: Vue
tags: [Vue]
keywords: Vue
---
双向数据绑定是建立在单向数据绑定的基础上
<!--more-->
流程：
1. 在解析v-model指令时，给添加input的监听
2. 当input的value发生改变，将最新的值赋值给当前表达式对应的data属性；

输入框改变的数据传到data中 ，data中的数据改变导致另一个msg的数据发生改变
![](http://book.52react.cn/20190407012636.png)


```
// 普通指令
compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
```

```
var compileUtil = {
	model: function(node, vm, exp) {
		this.bind(node, vm, exp, 'model');

		var me = this,
			val = this._getVMVal(vm, exp);
		//添加input的事件监听
		node.addEventListener('input', function(e) {
			var newValue = e.target.value;
			if (val === newValue) {
				return;
			}

			me._setVMVal(vm, exp, newValue);
			val = newValue;
		});
	},
```

bind方法，创建watcher监听
```
bind: function(node, vm, exp, dir) {
		//获取对应的方法名  textUpdater
		var updaterFn = updater[dir + 'Updater'];
		// 更新赋值操作
		updaterFn && updaterFn(node, this._getVMVal(vm, exp));
		// 监听属性变化
		new Watcher(vm, exp, function(value, oldValue) {
			updaterFn && updaterFn(node, value, oldValue);
		});
	},
```
updater方法，更新视图属性
```
// 更新器  更新节点 给节点赋值
var updater = {
	modelUpdater: function(node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value;
	}
};
```
