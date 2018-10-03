// 将new操作单独封装
// 遇到new时  就要考虑是否使用工厂模式

//学习功能如何实现？
//学习设计思路
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    alert("init");
  }
  fun1() {
    alert("fun1");
  }
  fun2() {
    alert("fun2");
  }
}

class Create {
  create(name) {
    return new Product(name);
  }
}

//测试
let create = new Create();

let p = create.create("p");
p.init();
p.fun1();

