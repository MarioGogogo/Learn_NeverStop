/*
 * @Author: your name
 * @Date: 2020-11-28 13:13:59
 * @LastEditTime: 2020-11-28 13:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Learn_NeverStop/Vue深入浅出/数组监听/arrayMethods.js
 */
const arrayProto = Array.prototype;

//创建变量 继承Array.prototype  防止全局污染
export const arrayMethods = Object.create(arrayProto);

console.log("arrayMethods :>> ", arrayMethods);

["push", "pop", "unshift", "splice", "sort", "reverse"].forEach((method) => {
  //缓存原始方法
  const original = arrayMethods[method];

  Object.defineProperty(arrayMethods, method, {
    writable: true,
    configurable: true,
    enumerable: false,
    value: function mutator(...args) {
        console.log('object11 :>> ', original);
        //do something 比如发送通知
      return original.apply(this, args);
    },
  });
});



