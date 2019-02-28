// a.fn方法中提供init用来获取元素然后返回
var A = function (selector) {
   return A.fn.init(selector)
}

A.fn = A.prototype = {
   length: 2,
   size  : function () {
      return this.length
   },
   init: function (selector) {
      return document.getElementById(selector)
   }
}

//test
console.log(A('demo'));
