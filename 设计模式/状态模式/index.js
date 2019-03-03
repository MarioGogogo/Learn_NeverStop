class State{
   constructor(color){
      this.color = color;
   }
   handle(context){
      console.log(`切换 ${this.color} 灯`);
      
   }

}

//主体
class Context {
    constructor(){
       this.state = null;
    }
    //获取状态
    getState(){
       return this.state
    }
    setState(state){
       this.state = state;
    }
}

//test
let context = new Context();
let green   = new State('green');
let yellow  = new State("yellow")

//绿灯亮了
green.handle(context)
console.log(context.getState());


