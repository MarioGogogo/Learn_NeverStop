//并集 一个包含2个集合所有元素的新集合

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

