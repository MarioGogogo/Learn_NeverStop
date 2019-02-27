/*在不暴露内部结构的同时，
 * 可以顺利的访问聚合对象内部的元素
 */
class Iterator {
   constructor(container) {
      this.list  = container.list
      this.index = 0
   }
   next() {
      if (this.hasNext()) {
         return this.list[this.index++]
      }
      //没有下一项
     return null
   }
   hasNext() {
      if (this.index >=this.list.length) {
         return false
      }
      return true
   }
}
// 兼容es6中所有有序数据结构
class Container{
   constructor(list){
      this.list = list
   }
   //生成遍历器
   getIterator(){
      return new Iterator(this)
   }
}

let arr       = [1,2,3];
let container = new Container([1,2,3]);
let iterator  = container.getIterator();
while (iterator.hasNext()) {
   console.log(iterator.next())
}

// ================在jquery中的引用场景=================
function each(data) {
   var $data = $(data);  //生成迭代器
   $data.each(function (key,p) {
       console.log(key,p);
       
   })
}
// ================在iterator中的引用场景=================
// data要属于[Symbol.iterator]属性
function eachSyiter(data) {
   for (const item of data) {
      console.log(item);
      
   }
}
//等同于下面的写法
function eachSyiter(params) {
   //生成遍历器
   let iterator = data[Symbol.iterator];
   let item     = {done:false}
   while (!item.done) {
      item = iterator.next()
      if(!item.done){
         console.log(item.value);
      }
   }
}

//test
// each(arr)
// each(nodeList)
// each($p)