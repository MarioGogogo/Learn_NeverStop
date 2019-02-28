// 一个问题如何访问元素的同时，又能访问对象中的方法
var A = function (selector) {
   return A.fn.init(selector)
}

A.fn = A.prototype = {
   length: 2,
   size  : function () {
      return this.length
   },
   init: function (selector) {
      console.log('init:',this);
      this[0]          = document.getElementById(selector)
           this.length = 1;
      return this;
   }
}

//test
var demo = A('demo');

console.log(demo); //{0: h1#demo, length: 1, size: ƒ, init: ƒ}
console.log(demo.size()); //1
console.log('==============');
var test = A('test')
console.log(demo); //{0: p#test, length: 1, size: ƒ, init: ƒ}
console.log(test); //{0: p#test, length: 1, size: ƒ, init: ƒ}

