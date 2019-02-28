//构造函数指向同一个对象造成的
var A = function (selector) {
   return new A.fn.init(selector)
}

A.fn = A.prototype = {
   length: 2,
   size  : function () {
      // console.log('sizefn ', this);
      return this.length
   },
   init: function (selector) {
      console.log(this === A.fn ,this === A.prototype,this);
      this[0]          = document.getElementById(selector)
           this.length = 1;
      return this;
   }
}

//test
var demo = A('demo');
console.log(demo);
var test = A('test')
console.log(demo);
console.log('==============');
console.log(demo.size()); //为什么报错
