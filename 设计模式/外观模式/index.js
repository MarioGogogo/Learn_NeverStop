//场景
function bindEvent(elem,type,selector,fn) {
   if(fn == null){
      fn       = selector;
      selector = null;
   }
   //dosomething.......
}

//调用
// bindEvent(elem,'click',"#div1",fn)
// bindEvent(elem,"moveIn",fn)

//bad写法
document.onclick = function(e) {
   e.preventDefault();
   if(e.target !== document.getElementById("myinput")){
      hidePageAlert();
   }
}

function hidePageAlert(params) {
   console.log('隐藏弹窗');
   
}
//外观模式实现
function addEvent(dom,type,fn) {
   //对于dom2事件的处理
   if(dom.addEventListener){
      dom.addEventListener(type,fn,false);
   }else if(dom.attachEvent){
      dom.attachEvent("on"+type,fn)
   }else{
      //不支持addevnet或者 attachEvent的方法
      dom['on'+type] = fn
   }

}

var myInput = document.getElementById("myinput");
addEvent(myInput,"click",function() {
   console.log('绑定第一个事件中');
   
})
addEvent(myInput,'click',function() {
   console.log('绑定第二个事件中');
})
addEvent(myInput, 'click', function () {
   console.log('绑定第三个事件中');
})

//获取事件对象
var getEvent = function(event) {
   return event || window.event;
}
//获取元素
var getTarget = function(event) {
   var event = getEvent(event)
   return event.target || event.srcElement
}

//阻止默认事件
var preventDefault = function(event) {
   var event = getEvent(event);
   if(event.preventDefault){
      event.preventDefault();
   }else{
      event.returnValue = false;
   }
}