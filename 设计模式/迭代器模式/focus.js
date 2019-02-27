//迭代器
var Iterator_mode = function (item, container) {
   //获取父容器
   var container = container && document.getElementById(container) || document;
   //获取元素
   var items = container.getElementsByTagName(items);
   //获取元素长度
   var length = items.length;
   //当前元素索引
   var index = 0;
   //缓存原来数组的方法
   var splice = [].splice;
   return {
      //第一个
      first: function () {},
      //最后个
      last: function () {},
      //前一个
      prev: function () {},
      //后一个
      next: function () {},
      //获取某一个元素
      get: function () {},
      //对每一个元素执行某一个方法
      dealEach: function () {},
      //对某一个元素执行某一个方法
      dealItem: function () {},
      //排它方式处理某一个元素
      exclusive: function () {}
   }
}

// 使用
var demo = new Iterator_mode("li", 'container');

console.log(demo.first());
console.log(demo.last());
console.log(demo.next());
console.log(demo.get(2000));
//处理所有元素
demo.dealEach(function(text,color) {
   this.innerHTML        = text;
   this.style.background = color;
},'test','pink')

// 这种思想的好处：迭代器提供的接口方法就能轻易的访问聚合对象中的每一个对象，甚至不需要知道聚合对象内部的具体结构



/**
 * 同步变量迭代器
 */
//对象A
var a = {}
// 如果要判断对象中是否存在b对象中的c值
// 通过点语法或者[]是会导致报错的
var c = a && a.b && a.b.c;
//如果对象嵌套很深这样也很麻烦
var b = {
   common: {},
   client: {
      user:{
         uid     : '001',
         username: '轻舞飞扬'
      }
   },
   server: {}
}
/**
 * 通过变量迭代取值
 * 
 */
bGetter = function(key) {
   //如果b不存在则直接返回未定义
   if(!b) return undefined;
   var result = b;               //获取同步b的对象
       key    = key.split('.');  //解析属性的层次序列
   //迭代同步变量b对象属性
   for (let i = 0, len=key.length; i < len; i++) {
      if(result[key[i]] != undefined){
         result = result[key[i]]
      }else{
         return undefined
      }
   }
   //返回获取结果
   return result;
}

//获取用户信息
console.log(bGetter("client.user.username")); //轻舞飞扬

//获取本地语言数据
console.log(bGetter("server.lang.local"));  //undefined


/**
 * 有时候用户数据在主页会添加一些或修改一些数据 也可以通过同步变量赋值器来实现
 */

bSetter = function (key,val) {
   //如果b不存在则直接返回未定义
   if (!b) return undefined;
   var result = b;
       key    = key.split('.');
   //迭代同步变量b对象属性
   for (var i = 0, len = key.length; i < len; i++) {
      //如果第i层属性对应的值不存在，则定义为对象
      if (result[key[i]] === undefined) {
         result[key[i]] = {}
      }
      //如果第i层属性对应的值不是对象的一个实例，则抛出错误
      if(!result[key[i]] instanceof Object){
         throw new Error('b'+ key.splice(0,i+1).join(".")+"is not object");
         return false
      }
      //迭代改层的属性值
      result = result[key[i]]
   }
   //返回获取结果
   return result[key[i]] = val;
}

//获取用户信息
console.log(bSetter("client.module.news.sports","javascript")); //轻舞飞扬


