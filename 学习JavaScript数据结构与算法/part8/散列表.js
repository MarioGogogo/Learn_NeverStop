//创建toString方法

function defaultToString(item) {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString();
}


class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}:${this.value}]`
  }
}


//创建散列表
class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {}
  }

//创建散列函数
  loseloseHashCode(key) {
    //如果是一个数则直接返回
    if (typeof key === "number") {
      return key;
    }
    // 防止key是一个对象而不是字符串
    const tableKey = this.toStrFn(key);
    let hash = 0;
    // 遍历key从ascii值加入到hash中
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    // 防止数值变量过大存在风险
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  //put
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  //get
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value
  }

  //remove
  remove(key) {
    const hash = this.hashCode(key)
    const valueParir = this.table[hash];
    if (valueParir != null) {
      delete this.table[hash]
      return true
    }
    return false
  }
}

//使用
const hash = new HashTable()
hash.put('Gandalf', "gandalf@qq.com");
hash.put('Jack', "jack@qq.com");
console.log(hash.hashCode('Gandalf') + '-Gandalf')
console.log(hash.hashCode('Jack') + '-Jack')

console.log(hash.get('Jack'))
console.log(hash.get('Love'))
