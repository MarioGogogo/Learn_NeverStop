//分离链接

class HashTableSeparateChining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  //put
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        //增加链表结构
        this.table[position] = new LinkedList();
      }
      //push一个链实例
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        while (current != null) {
          if (current.element.key === key) {
            return current.element.value;
          }
          current = current.next;
        }
      }
    }
    return undefined;
  }

  //remove 使用的是链表
  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      //链表操作获取表头
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if(linkedList.isEmpty()){
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }
}
