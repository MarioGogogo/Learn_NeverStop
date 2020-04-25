# Proxy 基本使用与defineProperty

## defineProperty缺点

1. 深度监听需要一次性递归
2. 无法监听新增属性/删除属性( Vue.set Vue.delete )
3. 无法原生监听数组,需要特殊处理



## Proxy基本使用

![image-20200416223700587](/Users/lovewcc/Documents/07_前端学习/Vue/image-20200416223700587.png)

其中 Reflect 返回的 true 或 false 表示 设置是否成功







## Reflect

![image-20200416234222183](/Users/lovewcc/Documents/07_前端学习/Vue/image-20200416234222183.png)

## Proxy响应式

