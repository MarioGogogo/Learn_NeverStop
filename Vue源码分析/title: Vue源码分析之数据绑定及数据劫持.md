title: Vue源码分析之数据绑定及数据劫持
date: 2019-02-17
categories: Vue
tags: [Vue]
keywords: Vue
---
一旦更新了data的属性发生了改变，所有界面上`直接或间接`使用此属性的节点都会发生改变
<!--more-->

### 思考更新界面如何做到？
过去的办法是：直接操纵dom更新页面
现在的办法是：数据驱动改变视图 比如 {{msg}} this.msg=a-->this.msg=b  视图也会变好

数据绑定与数据劫持的关系：用数据劫持的技术去实现数据绑定的效果
-------
数据劫持：
通过defineProperty()的`set方法`来监视data中的数据发生改变，一旦发生改变而去改变界面
```javascript
<div id="vue-app">
			<input type="text" v-model="word">
			<p>{{word}}</p>
			<button v-on:click="update">change model</button>
		</div>
		<script>
			var vm = new MVVM({
				el: '#vue-app',
				data: {
					word: 'Hello World!',
					sex:'O(∩_∩)O哈哈~',
					name:'🦚📚😁'
				},
				methods: {
					update: function() {
						this.word = 'Hi, everybody!';
					}
				},
			});
```

### 重点分析observe
```javascript
observe(data, this);
```
### 等待get的改变
```
  defineReactive: function(data, key, val) {
        var dep = new Dep();
		// 为什么继续调用observe 如果data中对象存在 a:{b:{c:1}}
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
```