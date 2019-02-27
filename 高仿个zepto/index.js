// 闭包  防止变量名全局污染
var Zepto = (function () {
   var $;
   
   var zepto = {
      init: function (selector) {
         var doms
         console.log('init:我是个闭包:  ' + selector);
         //  如果没有参数， 将返回一个空的zepto集合
         if (!selector) {
            return zepto.Z()
         } else if (typeof selector === "string") {
            selector = selector.trim();
            //判断是纯标签$('p')$('<div>')$('#content')
            if (selector[0] == '<') {
               console.log('标签');
            } else {
               console.log('字符串');
            }
         }
         var doms = ['domObj1', 'domObj2', 'domObj3']
         return zepto.Z(doms, selector)
      }
   }
   zepto.Z = function (selector) {
      return new Z(selector)
   }

   function Z(doms) {
      var len = doms.length;
      for (var i = 0; i < len; i++) {
         this[i] = doms[i]
      }
      this.length = doms.length;
   }
   //$就是个函数
   $ = function (selector, context) {
      return zepto.init(selector, context)
   }

   $.fn = {
      constructor: zepto.Z,
      map        : function () {
         console.log('map方法')
      },
      addClass: function () {
         console.log('addClass方法')
      },
      remove: function () {
         console.log('remove方法')
      }
   }
   //将 Z 的 prototype 指向 $.fn， Z 的实例就继承了 $.fn 的方法
   zepto.Z.prototype = Z.prototype = $.fn;
   return $

})()

window.Zepto = Zepto;
// window.Zepto和window.$都赋值了Zepto这个变量
window.$ === undefined && (window.$ = Zepto)