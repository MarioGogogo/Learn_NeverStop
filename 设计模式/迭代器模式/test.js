var array = [1, 2, 3]
var nodeList = document.getElementsByTagName("p");
var $p       = $('p');

//要对三个变量进行遍历要写写三种方法
array.forEach(function (item) {
   console.log(item)
})

var i, len = nodeList.length;
for (i = 0; i < len; i++) {
   console.log(nodeList[i])
}

$p.each(function (key, p) {
   console.log(key, p)
})


//数组迭代器
var eachArray = function(arr,fn){
    var i = 0, len = arr.length;
    //遍历数组
    for (;i < len;i++) {
       //以此执行回调函数，注意回调函数中传入参数第一个为索引,第二个是索引值
       if(fn.call(arr[i],i,arr[i]) === false)
       {
          break;
       }
    }
}

for(var arr=[],i=0;i<5;arr[i++]=i){
   eachArray(arr,function(i,data) {
       console.log(i,data);
   })
}


//对象迭代器
var eachObject = function(obj,fn) {
   for(var i in obj){
      if(fn.call(obj[i],i,obj[i]) === false){
         break;
      }
   }
}





