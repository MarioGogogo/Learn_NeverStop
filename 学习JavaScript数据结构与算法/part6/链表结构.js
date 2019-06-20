import { defaultEquals } from "./utils";
import { Node } from "./linked-list-models";

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
  //getElementAt
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
}
