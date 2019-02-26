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
