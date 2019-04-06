function Compile(el, vm) {
	//保存vm到 compile对象中
	this.$vm = vm;
	// isElementNode判断el是不是元素节点  nodeType == 1 否则查找 el #test
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	// 编译 模板解析的三步
	if (this.$el) {
		// 取出el元素中所有子节点
		this.$fragment = this.node2Fragment(this.$el);
		//编译内存中的所有层次的子节点
		this.init();
		//然后再塞进 el元素中去
		this.$el.appendChild(this.$fragment);
	}
}

Compile.prototype = {
	node2Fragment: function(el) {
		// 创建一个空得到fragment
		var fragment = document.createDocumentFragment(),
			child;

		// 将原生节点拷贝到fragment
		while (child = el.firstChild) {
			fragment.appendChild(child);
		}

		return fragment;
	},

	init: function() {
		//编译所有层次的子节点
		this.compileElement(this.$fragment);
	},

	compileElement: function(el) {
		// 取出最外侧的子节点
		var childNodes = el.childNodes,
			me = this;
		// 遍历所有子节点  文本节点 元素节点
		[].slice.call(childNodes).forEach(function(node) {
			// 获取文本内容
			var text = node.textContent;
			var reg = /\{\{(.*)\}\}/; //大括号表达式   小括号子匹配
			//判断是否元素节点
			if (me.isElementNode(node)) {
				// 编译指令
				me.compile(node);
				// 判断是否是大括号的文本节点
			} else if (me.isTextNode(node) && reg.test(text)) {
				me.compileText(node, RegExp.$1.trim());
			}
			// 如果当前节点还有子节点 递归调用实现所有层次的调用
			if (node.childNodes && node.childNodes.length) {
				me.compileElement(node);
			}
		});
	},

	compile: function(node) {
		//得到标签所有属性
		var nodeAttrs = node.attributes,
			me = this;
		//[].slice.call(nodeAttrs) --->伪数组 转成数组
		[].slice.call(nodeAttrs).forEach(function(attr) {
			//attrname = “v-on = "click"" //得到属性名
			var attrName = attr.name;
			//判断是否是指令属性  判断是否有v-
			if (me.isDirective(attrName)) {
				var exp = attr.value;
				var dir = attrName.substring(2); // "on:click"
				// 事件指令 exp表达式 也就是 方法名
				if (me.isEventDirective(dir)) {
					compileUtil.eventHandler(node, me.$vm, exp, dir);
				} else {
					// 普通指令
					compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
				}
        //移除指令属性
				node.removeAttribute(attrName);
			}
		});
	},

	compileText: function(node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},

	isDirective: function(attr) {
		return attr.indexOf('v-') == 0;
	},

	isEventDirective: function(dir) {
		return dir.indexOf('on') === 0;
	},

	isElementNode: function(node) {
		return node.nodeType == 1;
	},

	isTextNode: function(node) {
		return node.nodeType == 3;
	}
};

// 包含多个解析指令处理集合的工具对象
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
	
	model: function(node, vm, exp) {
		// 实现初始化显示  创建对应watcher
		this.bind(node, vm, exp, 'model');

		var me = this,
			val = this._getVMVal(vm, exp);
		node.addEventListener('input', function(e) {
			var newValue = e.target.value;
			if (val === newValue) {
				return;
			}

			me._setVMVal(vm, exp, newValue);
			//保存新值
			val = newValue;
		});
	},

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
	// vm对象  exp 字符串 "word"  为什么要那么些 如果 a.b.c就存在遍历的过程
	_getVMVal: function(vm, exp) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function(k) {
			val = val[k];
		});
		return val; //vm对象 增加 word属性值
	},

	_setVMVal: function(vm, exp, value) {
		var val = vm;
		exp = exp.split('.');
		exp.forEach(function(k, i) {
			// 非最后一个key，更新val的值
			if (i < exp.length - 1) {
				val = val[k];
			} else {
				val[k] = value;
			}
		});
	}
};

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

		var space = className && String(value) ? ' ' : '';

		node.className = className + space + value;
	},

	modelUpdater: function(node, value, oldValue) {
		node.value = typeof value == 'undefined' ? '' : value;
	}
};
