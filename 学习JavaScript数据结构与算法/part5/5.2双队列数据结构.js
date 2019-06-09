//创建声明类
class Deque{
  constructor(){
    this.count       = 0;
    this.lowestCount = 0;
    //创建对象储存数据
    this.items = {}
  }

  /**
   * 向队列前部添加新元素
   */
  addFront(element){
    //如果队列为空，则添加到后面去
    if(this.isEmpty()){
      this.addBack(element)
    }else if(this.lowestCount > 0){
      //双端队列移除过 则low 大于等于1
      this.lowestCount -- ;
      this.items[this.lowestCount] = element;
    }else{
       //第三种情况
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i-1];
      }
      this.count++
                  this.lowestCount = 0
       this.items[0]               = element
    }


  }

  addBack(element){
    this.items[this.count] = element;
    this.count++;
  }

  /**
   * 移出队列的第一项，并返回被移出的元素
   */
  removeFront(){
    if(this.isEmpty()){
      return undefined;
    }

    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++;
    return result;
  }
  /**
   * 移出队列的最后一项，并返回被移出的元素
   */
  removeBack(){
    this.count--;
    const result = this.items[this.count]
    delete this.items[this.count]
    return result;
  }


  /**
   * 返回队列中前面第一个元素（最先添加的哪个）
   */
  peekFront(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.lowestCount]
  }
  /**
   * 返回队列中后面第一个元素（最先添加的哪个）
   */
  peekBack(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.count]
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
    this.count       = 0;
    this.lowestCount = 0;
    this.items       = {}
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
const deque = new Deque();
console.log(deque.isEmpty());

deque.addBack('John');
console.log(deque)
deque.addFront('Jack');
console.log(deque,deque.toString())
//增加
deque.addBack('Camila');

console.log(deque.toString());
// //移出
// deque.dequeue();
// deque.dequeue()
// console.log(deque.toString())




//击鼓传花游戏



