//需要以下方法
/*
添加-push
移除-pop
返回栈顶元素-peek
移出所以元素-clear
返回栈里有多少个数-size
*/

/**
 * 模拟栈
 */
class Stack{
   constructor(){
     this.items=[]
   }
   push(element){
     this.items.push(element)
   }
   pop(){
     return this.items.pop()
    }
    peek(){
     return this.items[this.items.length-1]
    }
    isEmpty(){
      return this.items.length === 0
    }
    size(){
      return this.items.length
    }
    clear(){
      this.items=[]
    }
}

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

/**
 * 缺点：在使用数组大部分方的时间复杂度On  的意思是 我们需要迭代
 * 整个数组才能找到想要的那个元素，在最坏的情况下要迭代数组的所以位置
 * 其中n代表数组长度。如果数组有更多的元素。所需时间更长
 *
 * 数组是一个有序集合，元素有序占用更多的内存空间
 */

