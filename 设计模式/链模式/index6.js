//构造函数指向同一个对象造成的
var A = function (selector) {
   return new A.fn.init(selector)
}

A.fn = A.prototype = {
   length: 2,
   size  : function () {
      return this.length
   },
   init: function (selector) {
      this[0]          = document.getElementById(selector)
           this.length = 1;
      return this;
   }
}

//test
var demo = A('#demo');

console.log(demo);
console.log('==============');

// console.log(demo.size());
