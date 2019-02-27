// 闭包  防止变量名全局污染
var Zepto = (function(){
    var $;
    var zepto = {
       init:function(doms){
          console.log('init:我是个闭包:  '+doms);
           var doms = ['domObj1', 'domObj2', 'domObj3']
           return zepto.Z(doms)
       }
    }
    zepto.Z = function(doms){
       return new Z(doms)
    }

    function Z(doms) {
       var len = doms.length;
       for (var i=0 ;i< len; i++) {
          this[i] = doms[i]
          
       }
       this.length = doms.length;
    }
    //$就是个函数
    $ = function (selector, context) {
       return zepto.init(selector, context)
    }

    $.fn={
       constructor: zepto.Z,
       method     : function() {
          return this
       }
    }
//将 Z 的 prototype 指向 $.fn， Z 的实例就继承了 $.fn 的方法
    zepto.Z.prototype = Z.prototype = $.fn;
    return $
    
})()

window.Zepto = Zepto;
// window.Zepto和window.$都赋值了Zepto这个变量
window.$ === undefined && (window.$ = Zepto)