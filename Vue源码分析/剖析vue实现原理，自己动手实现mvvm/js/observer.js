function Observer(data) {
    this.data = data;
	// 开始对data的劫持
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
		// 遍历data中所有的属性
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
		//特定的属性实现响应式式的绑定 
        this.defineReactive(this.data, key, val);
    },
    //初始化挂载监听
    defineReactive: function(data, key, val) {
		// 创建属性对应的dep对象
        var dep = new Dep();
		// 为什么继续调用observe 如果data中对象存在 a:{b:{c:1}}
		// 通过递归调用对data中所有的属性进行数据劫持
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
				// 建立dep与wather之间的关系
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
    }
};

function observe(value, vm) {
	// 被观察的必须是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建对应的观察者
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = []; //n个wather的容器
}

Dep.prototype = {
	// 添加wather到dep中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 建立dep与wather之间的关系
    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;