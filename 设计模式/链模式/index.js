//原型继承
var A           = function(){}
    A.prototype = {
   length: 2,
   size  : function(){
      return this.length
   }
}

//test
var a = new A();
console.log(a.size()); //2

//如果这样访问就报错
console.log(A.size);
console.log(A.size());
 //index.js:16 Uncaught TypeError: A.size is not a function
console.log(A().size()); 
//Uncaught TypeError: Cannot read property 'size' of undefined


