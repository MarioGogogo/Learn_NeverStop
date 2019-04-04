/**
 * 
 */
function MVVM(options) {
	// 将配置对象存储到vm
    this.$options = options || {};
	// 将data对象保存到vm和变量data中
    var data = this._data = this.$options.data;
	
    var me = this;

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
		// 对指定的属性指定代理
        me._proxyData(key);
    });

    this._initComputed();

    observe(data, this);
    // 创建一个编译对象
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxyData: function(key, setter, getter) {
        var me = this;
        setter = setter || 
        Object.defineProperty(me, key, {
            configurable: false,    //不能重新定义
            enumerable: true,       //可以枚举遍历
			// 通过vm.xxx读取属性值  从data中获取
            get: function proxyGetter() {
                return me._data[key];
            },
			// 通过vm.xxx = value时 value保存到data对应属性中
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};