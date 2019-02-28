// 一个问题如何访问元素的同时，又能访问对象中的方法
var A = function (selector) {
   return A.fn.init(selector)
}

A.fn = A.prototype = {
   length: 2,
   size  : function () {
      console.log('sizefn ',this);
      return this.length
   },
   init: function (selector) {
      console.log('initfn ',this); //fn
      this[0]          = document.getElementById(selector)
           this.length = 1;
      return this;
   }
}

//test
var demo = A('demo');

console.log(demo);
console.log(demo.size());
console.log('==============');
var test = A('test')
console.log(demo);

