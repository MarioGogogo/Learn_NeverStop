//创建一个游戏状态类
var HeroState = function () {
   //内部状态私有变量
   var _currentState = {};
   //动作与状态方法映射
   var states = {
      jump: function () {
         console.log('跳跃')
      },
      move: function () {
         console.log('移动')
      },
      shoot: function () {
         console.log('射击')
      },
      squat: function () {
         console.log('蹲下')
      }
   }
   //动作控制类
   var Action = {
      //改变状态方法
      changeState: function () {
         var arg = arguments;
         //重置内部状态
         _currentState = {};
         if (arg.length) {
            //遍历动作
            for (var i = 0, len = arg.length; i < len; i++) {
               _currentState[arg[i]] = true;
            }
         }
         //返回动作控制类
         return this;
      },
      //执行动作
      goes: function () {
         console.log('触发一次动作');
         for (const key in _currentState) {
            states[key] && states[key]()
         }
          return this;
      }
   }
    return {
        change: Action.changeState,
        goes  : Action.goes
    }
}


//创建一个超级角色
var hero = new HeroState();
hero.change('jump','shoot').goes().goes()