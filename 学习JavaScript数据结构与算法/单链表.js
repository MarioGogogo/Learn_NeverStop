function List() {
  let Node = function(element) {
    this.element = element;
    this.next = null; //指向
  };

  let head = null;

  let lenght = 0;

  this.getList = function() {
    return head;
  };

  this.search = function(list, element) {};
  this.append = function(element) {
    let node = new Node(element),
      p = head;
    if (!head) {
      head = node;
    } else {
      while (p.next) {
        p = p.next;
      }
      p.next = node;
    }
    lenght += 1;
  };

  this.insert = function(position, element) {};

  this.remove = function(element) {};

  this.isEmpty = function() {};

  this.size = function() {
    return lenght;
  };
}

// 测试
let list = new List();
for (let i = 0; i < 2; i++) {
  list.append(i);
}

console.log(list.size());
