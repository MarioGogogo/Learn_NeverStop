//创建声明类
//queue与stack非常类似 只是添加和移除原则不同
class Queue{
   constructor(){
     this.count = 0;
     this.lowestCount = 0;
     //创建对象储存数据
     this.items={}
   }

  /**
   * 向队列尾部添加一个或多个新项
   */
   enqueue(element){
     this.items[this.count] = element;
     this.count++;
  }

  /**
   * 移出队列的第一项，并返回被移出的元素
   */
   dequeue(){
     if(this.isEmpty()){
       return undefined;
     }

     const result = this.items[this.lowestCount]
     delete this.items[this.lowestCount]
     this.lowestCount++;
     return result;

  }

  /**
   * 返回队列中第一个元素（最先添加的哪个）
   */
  peek(){
    if(this.isEmpty()){
      return undefined;
    }

    return this.items[this.lowestCount]
  }


  /**
   * 判断队列是否为空
   */
   isEmpty(){
     return this.count - this.lowestCount === 0
  }

  /**
   * 返回队列包含的元素个数
   */
  size(){
    return this.count - this.lowestCount;
  }

  clear(){
    this.count = 0;
    this.lowestCount = 0;
    this.items={}
  }

  /**
   * 创建toString方法
   */

  toString(){
    if(this.isEmpty()){
      return undefined;
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (var i = this.lowestCount+1; i < this.count ; i++) {
        objString = `${objString},${this.items[i]}`
    }
    return objString
  }


}

//使用
const queue = new Queue();
console.log(queue.isEmpty());

queue.enqueue('John');
console.log(queue)
queue.enqueue('Jack');
console.log(queue.toString())
//增加
queue.enqueue('Camila');

console.log(queue.toString());
//移出
queue.dequeue();
queue.dequeue()
console.log(queue.toString())






