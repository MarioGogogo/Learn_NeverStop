class Set {
  constructor() {
    this.items = {}
  }
  //has方法
  has(el) {
    return el in this.items;
  }
  //hasbetter方法
  hasBetter(el) {
    return Object.prototype.hasOwnProperty.call(this.items, el);
  }

  //add方法
  add(el) {
    if (!this.has(el)) {
      this.items[el] = el;
      return true
    }
    return false
  }


  //delete方法
  delete(el) {
    if (this.has(el)) {
      delete this.items[el];
      return true
    }
    return false
  }

  //clear方法
  clear() {
    this.items = {};
  }

  //size
  size() {
    return Object.keys(this.items).length;
  }

  //value 
  values() {
    return Object.values(this.items)
  }





}



//使用set类
const set = new Set();

set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
console.log('========我十分割线=======');

set.add(2)
console.log(set.values());
console.log(set.has(2));
console.log(set.size());


console.log(set.delete(1));

console.log(set.delete(3));