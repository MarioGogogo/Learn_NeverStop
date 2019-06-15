//并集 一个包含2个集合所有元素的新集合
const Set =  require('7.2创建set')
function union(otherset) {
  //创建新集合代表二个结合的并集
   const unionSet = new Set();
    // 获取第一个集合的所有值  A.union(B) ==> this指的 A
   this.values().forEach(value => {
      unionSet.add(value)
   });
  //对第二个集合做迭代 全部添加到并集的集合中
   otherset.values().forEach(value=>{
     unionSet.add(value)
   })

   return unionSet
}


//交集

function intersection(otherset) {
   const intersectionSet = new Set();
   const values = this.values();
   const otherValues = otherset.values();

   let big = values,small = otherValues;
   //比较2个set总哪个多。可以少循环，优化
   if(otherValues.length - values.length > 0){
      big = otherValues;
      small = values;
   }
   small.forEach(value =>{
      if(big.includes(value)){
         intersectionSet.add(value)
      }
     }
   )

   return intersectionSet;
}

//差集

function difference(otherset) {
   const differenceSet = new Set();
   this.values().forEach(value =>{
      //判断是否没有值
      if(!otherset.has(value)){
         differenceSet.add(value)
      }
   })
    return differenceSet;
}

//子集
function isSubsetOf(otherset) {
   // 当前元素的实例 要小于等于要比较的集合
   if(this.size() > otherset.size()){
      return false;
   }

   let isSubset = true;
   // every函数 返回为false则直接循环停止
   this.values.every(value =>{
      //如果比较的实例中不存在当前实例的元素，则判断不是这个比较实例的子集
      if(!otherset.has(value)){
         isSubset = false;
         return false
      }
      return true;
   })
   return isSubset;
}



















