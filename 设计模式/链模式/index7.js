//构造函数指向同一个对象造成的
var A = function (selector) {
   return new A.fn.init(selector)
}

A.fn = A.prototype = {
   constructor: A,
   init       : function (selector) {
      console.log(this.constructor);
      /**
      ƒ(selector) {
          return new A.fn.init(selector)
       }
       */
   },
   length: 2,
   size  : function () {
      return this.length
   },
   
}
A.fn.init.prototype = A.fn;

//test
var demo = A('demo');
console.log(demo);
console.log('==============');
console.log(demo.size()); //2