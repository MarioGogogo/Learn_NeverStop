//简约版本获取元素样式方法库
let $ = {
   //通过id获取
   g:function(id) {
      return document.getElementById("id")
   },
   //设置元素css属性
   css:function(id,key,val) {
      document.getElementById(id).style[key] = val
   },
   //设置元素属性
   attr:function(id,key,val) {
      document.getElementById(id)[key] = val
   },
   html:function(id,html) {
      document.getElementById(id).innerHTML = html
   },
   on:function(id,type,fn) {
      document.getElementById(id)['on'+type] = fn
   }
}

$.css('book','background','red');
$.attr("book","className","box")
$.html('book','这是更新的消息')
$.on("book","click",function() {
   $.css('book', 'width', '150px');
})