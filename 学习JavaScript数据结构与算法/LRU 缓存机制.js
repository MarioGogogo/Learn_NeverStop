function LRUCache(max) {
  this.max = max;
  this.cache = new Map();
}

LRUCache.prototype = {
  put(key, value) {
    const { cache } = this;
    if (cache.size > this.max - 1) {
      const keys = cache.keys().next().value;
      console.log(keys);
      cache.delete(keys); //删除最前面个数据
    }
    cache.set(key, value);
    console.log("cache", cache);
  },
  get(key) {
    const { cache } = this;
    value = cache.get(key);
    console.log("value", value);
    if (!value) return;
    cache.delete(key);
    cache.set(key, value);
    return value;
  }
};

cache = new LRUCache(2 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)

// cache.get(3); // 返回  3
// cache.get(4); // 返回  4
