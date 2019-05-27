//需要以下方法
/*
添加-push
移除-pop
返回栈顶元素-peek
移出所以元素-clear
返回栈里有多少个数-size
*/

/**
 * 使用Symbol实现类 创建一种假的私有属性
 */
const _items = Symbol('stackItems');

const items = new WeakMap()

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

//解决问题 从十进制到二进制
// 比如 10 的二进制  1010；
function decimalToBinary(num) {
   const remStack = new Stack();
   let number = num;
   let rem;
   let result = ''

  //判断结果不为0
   while (number>0){
     //获得一个余数
     rem = Math.floor(number % 2);
     // 放在栈里
     remStack.push(rem);
     // 再继续结果除于2看看是否等于0继续轮询
     number = Math.floor(number/2)
   }
   while (!remStack.isEmpty()){
     result += remStack.pop().toString();
   }
   return result;
}

console.log(decimalToBinary(233))


// 转化十进制转八进制
function baseConverter(num,base) {
  const remStack = new Stack()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVMXYZ';
  let number = num;
  let rem;
  let result =''

  if(!(base>=2 && base <= 36)){
    return '';
  }

  while (number >0){
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()){
    //巧妙的一步 我们需要对栈中的数字做个转化 字母表对应每个字母相应的基数 A11 B 12 以此类推
    result += digits[remStack.pop()]
  }
  return result;
}

console.log(baseConverter(100345,8))

console.log(baseConverter(100345,35))
