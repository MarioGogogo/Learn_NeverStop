import { defaultEquals } from "./utils";
import { Node } from "./linked-list-models"

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0; //长度
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  //push
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  //remove
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        let previous;
        for (let i = 0; i < index; i++) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }
  //getElementAt循环迭代链表找到目标位置
  getElement(index){
     if (index>0 && index< this.count) {
         let node  = this.head
         for (let i = 0; i < index && node != null ; i++) {

            node = node.next
            
         }
         return node
     }else{
        return undefined
     }
  }

//indexof 返回一个元素的位置

  indexOf(element){
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if(this.equalsFn(element,current.element)){
        return i
      }
      current = current.next
    }
    return -1; //返回找不到
  }


  // 从列表中移除元素
  remove(element){
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  



}
