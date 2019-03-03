var CheckObject = function () {}
CheckObject.checkName = function() {
   console.log('检查姓名');
}

var a = CheckObject.checkName();
console.log(a);
//容易被重写
CheckObject.checkName = function() {
   console.log('检查姓名111111');
}
var a1 = CheckObject.checkName();
console.log(a1);


// 被new之后方法  新建对象内部没有方法
var b = new CheckObject();
console.log('看看b里面有什么',b);  
//index.js:18 Uncaught TypeError: b.checkName is not a function

var CheckObject = function () {
   this.checkName = function(){
      console.log('new检查姓名');
   }
 }

 var a2 = new CheckObject();
console.log(a2);
//CheckObject {checkName: ƒ}
// checkName: ƒ()
// __proto__: Object
 
 console.log(a2.checkName());

/********************************* */
/*************检查 */
 var CheckObject           = function() {}
     CheckObject.prototype = {
     checkName:function(){
        console.log('检查姓名new');
     },
     checkAge : function() {
        console.log('检查年龄new');
     },
     checkSex :function(){
        console.log('检查性别new');
        
     }
 }

 var c = new CheckObject();
 c.checkName();
 c.checkAge();
 c.checkSex();

/********************************* */


var CheckObject           = function () { }
    CheckObject.prototype = {
   checkName: function () {
      console.log('检查姓名new');
      console.log('this',this);
      return this //返回当前对象
   },
   checkAge: function () {
      console.log('检查年龄new');
      return this;
   },
   checkSex: function () {
      console.log('检查性别new');
      return this;
 
   }
}

var d = new CheckObject();
d.checkName().checkSex().checkSex();







