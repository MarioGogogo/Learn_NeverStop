//需要以下方法
/*
添加-push
移除-pop
返回栈顶元素-peek
移出所以元素-clear
返回栈里有多少个数-size
*/

/**
 * 使用JavaScript对象来模拟栈
 * 使用count 来帮助我们记录栈的大小
 * 也能帮助我们添加或删除
 */
class Stack{
  constructor(){
    this.count = 0;
    this.items={}
  }
  push(element){
    this.items[this.count] = element;
    this.count++;
  }
  pop(){
    if(this.isEmpty()) return undefinded;
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek(){
    if(this.isEmpty()) return undefinded;
    return this.items[this.count-1]
  }
  isEmpty(){
    return this.count === 0
  }
  size(){
   return this.count
  }
  clear(){
    this.count = 0;
    this.items={}
  }
  //目的打印出栈的内容
  toString(){
    if(this.isEmpty()){
      return '';
    }
    //栈底第一个做初始值
    let objString = `${this.items[0]}`;
    for (let i = 0; i <this.count ; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}

/**
 * 复杂度O1
 * @type {Stack}
 */

//使用
const stack = new Stack()
console.log(stack.isEmpty()) //true


stack.push(5)
stack.push(6);
console.log(stack,stack.peek()) // [5,6]

stack.push(11)
stack.push(15)
console.log(stack)
stack.pop()
console.log(stack)


// true
// Stack { count: 2, items: { '0': 5, '1': 6 } } 6
// Stack { count: 4, items: { '0': 5, '1': 6, '2': 11, '3': 15 } }
// Stack { count: 3, items: { '0': 5, '1': 6, '2': 11 } }
