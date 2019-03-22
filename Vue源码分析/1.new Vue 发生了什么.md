new Vue 发生了什么？

我们都知道如何初始化一个vue
![](http://book.52react.cn/20190321004255.png)
```javascript
	var app = new Vue({
		el: '#app',
		mounted(){
		 console.log(this.firstName) //为什么可以访问到firstName？
		}
		data(){
		  return {
		  firstName: 'jack',
			lastName: 'lock',
			age: '24',
		  }
		},
```
首先init一个vue的实例
![](http://book.52react.cn/20190320235104.png)

做一些初始化的工作
比如对`options`的合并
```javascript
 if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
```

再然后执行一些init的方法
```javascript
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
```

其中执行`initState(vm)`中分析为什么data变量可以访问到

在initState文件中描述
```javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) //如果有props
  if (opts.methods) initMethods(vm, opts.methods) //分析有没有methods
  if (opts.data) {
    initData(vm)  
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
```

分析initData，判断是不是function
```javascript
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
```
分析data中是否有重复的属性值，避免冲突

```javascript
const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
```
最后使用proxy把data中的所有方法属性挂载到vm上

```javascript
 proxy(vm, `_data`, key)
```
`proxy`代理

```javascript
//target == vm  sourceKey == _data   
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
挂载元素
```javascript
  if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
```
`$mount`的重要性之后再分析
