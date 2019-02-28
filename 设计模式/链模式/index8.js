// selector 选择符   context上下文
var A = function (selector, context) {
   return A.fn.init(selector, context)
}

A.fn = A.prototype = {
   constructor: A,
   init       : function (selector, context) {
      //获取元素长度
      this.length = 0;
      //获取默认上下文
      context = context || document;
      //如果id是选择符
      if (~selector.indexOf("#")) {
         //截取id选;择
         this[0]          = document.getElementById(selector.slice(1));
              this.length = 1;
      } else {
         //元素 名称
         var doms = context.getElementsByTagName(selector),
            i,
            len = doms.length;
         for (; i < len; i++) {
            //加入this中
            this[i] = doms[i]
         }
         //校验长度
         this.length = len;
      }
      //保存上下文
      this.context = context;
      //保存选择符
      this.selector = selector;
      //返回this对象
      return this
   },
   length: 2,
   size  : function () {
      return this.length
   },
}


var demo = A('demo')
console.log(demo);
console.log('=============');

