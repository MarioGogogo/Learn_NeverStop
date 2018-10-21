/**
 * 类的继承
 */

 class Father{
     constructor(name,age){
         this.name = name;
         this.age = age;
     };
     eat(){
         alert(`${this.name}是个人名，还有她的年龄${this.age}`);

     }
     speak(){
       alert(`她说话了${this.name}这是她的名字`);
     }

 }

 class Son extends Father{
     constructor(name,age,number){
         super(name,age);
         this.number = number;
     }
     study(){
         alert(`现在她的名字是${this.name},她考试得分${this.number}`);

     }
 }

 let Dong = new Son('董小姐','18','80');
 Dong.study();