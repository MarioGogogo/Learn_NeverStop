//原型继承
// var A = function () {
//     return B
// }
// var B=A.prototype = {
//    length: 2,
//    size  : function () {
//       return this.length
//    }
// }
//test
// console.log(A().size());

//将b对象看做a的一个属性 减少变量的创建

var A= function(){
    return A.fn
}

A.fn = A.prototype = {
       length: 2,
       size  : function () {
          return this.length
       }
}

//test

console.log(A());

console.log(A().size()); //2

