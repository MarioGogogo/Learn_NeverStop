import {defaultEquals }  from './utils'
import {Node }  from './linked-list-models'

export default class LinkedList{
   constructor(equalsFn = defaultEquals) {
          this.count = 0
          this.head = undefined
          this.equalsFn = equalsFn
   }

    //push
    push(element){
      const node = new Node(element)
      let current;
      if(this.head == null){
         this.head = node
      }else{
        current = this.head
        while(current.next != null){
           current = current.next
        }
        current.next = node
      }
      this.count++
    }
    
}