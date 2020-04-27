/**
 * 桶排序
 */

function bucketSort(array, bucketSize = 5) {
  if (array.length < 2) return array;
  const bucket = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
}

function createBuckets(array, bucketSize) {
  //初始化最大值最小值
  let miniValue = array[0],
    maxValue = array[0];
  // 寻找最大值最小值;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < miniValue) {
      miniValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  //分配每一个桶的容量大小
  const bucketCount = Math.floor((maxValue - miniValue) / bucketSize + 1);
  const buckets = [];
  //分配桶
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  // 把数组中的值放入相应的桶中
  for (let i = 0; i < array.length; i++) {
    //计算将元素放到哪个桶中
    const bucketIndex = Math.floor((array[i] - miniValue) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

/**
 * 每一个桶排序
 * @param {*} buckets 
 */
function sortBuckets(buckets) {
  //初始化一个新数组
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      //插入排序
      insertionSort(buckets[i]);
      //加入新数组
      sortedArray.push(...buckets[i]);
    }
  }
  return sortedArray;
}
