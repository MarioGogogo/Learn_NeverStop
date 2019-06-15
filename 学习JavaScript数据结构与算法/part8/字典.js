//创建toString方法

function defaultToString(item) {
   if(item === null){
     return 'NULL'
   }else if(item === undefined){
     return 'UNDEFINED'
   }else if(typeof item === 'string' || item instanceof String){
     return `${item}`
   }
   return item.toString();
}

class ValuePair{
  constructor(key,value){
    this.key = key
    this.value = value
  }
  toString(){
    return `[#${this.key}:${this.value}]`
  }
}



//与set类不同 set类属于【值，值】  字典属于【建，值】
class Dictionary{
   constructor(toStrFn = this.defaultToString){
     this.toStrFn = toStrFn;
     this.table = {}
   }

   //has
   hasKey(key){
     // {a:'jack'}
     return this.table[this.toStrFn(key)] != null
   }

  //set
  set(key,value){
     if(key != null && value != null){
       const tableKey = this.toStrFn(key);
       this.table[tableKey] = new ValuePair(key,value);
       return trues
     }
     return false
  }

  //remove
  remove(key){
     if(this.hasKey(key)){
       delete this.table[this.toStrFn(key)]
       return true
     }
     return false;
  }

  //从字典中找一个值
  get(key){
     const valuePair = this.table[this.toStrFn(key)];
     return valuePair == null ? undefined : valuePair.value
  }

  //keyvalue
  keyValues(){
     return Object.values(this.table)
  }

  //keys 返回所有原始值名

  keys(){
     return this.keyValues().map(valuePair => valuePair.key)
  }

  values(){
    return this.keyValues().map(valuePair => valuePair.value)
  }

  size(){
     return Object.keys(this.table).length;
  }

  isEmpty(){
     return  this.size() === 0;
  }

  clear(){
     this.table = {}
  }

  toString(){
     //字典为空 返回字符串
     if(this.isEmpty()){
       return ''
     }
     //调用tostring将第一个字符串中
     const valuePairs = this.keyValues();
     let objString = `${valuePairs[0].toString()}`
    // 如果数组中还有其他值 同样方法加入结果字符串中
     for (let i=1; i<valuePairs.length;i++){
       objString = `${objString},${valuePairs[i].toString()}`;
     }
     return objString
  }




}


