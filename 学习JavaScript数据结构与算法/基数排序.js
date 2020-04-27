const array = [ 19, 240, 100, 532, 305, 430, 124 ];
function findMinValue(array) {
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
}
function findMaxValue(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
/**
 * 分布式排序算法
 * 根据进制去选择  
 * @param {'*'} array 
 * @param {*} radixBase 10进制 就参数10 8进制就选8
 */
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }

  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);

  //从最后一位开始排序所有数
  let significantDigit = 1;
  // 后续进行第二个有效位数排序 第三个有效位数排序 直到没有待排序的有效位
  // 比如 （999 - 900） /1 /10 /100 （99-19） /1 /10 但是/100就不行了
  while ((maxValue - minValue) / significantDigit >= 1) {
    //获取每一次有效位后排好的数组，直到最后没有有效位
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    significantDigit *= radixBase;
  }

  return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  // 创建临时数组 作用：帮助后面移值到原始数组中
  const tmp = [];
  // 基数初始化桶
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }
  //[ 421, 240, 100, 532, 305, 430, 124 ]
  //第二次 【240,100,430,421,532,124,305】
  for (let i = 0; i < array.length; i++) {
    //计算有效位进行计数排序
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    //累计出现的次数
    buckets[bucketsIndex]++;
    // ==== 0   1   2  3 4 5....
    //      1次 2次  0次。。。
  }
  //  第一次循环个位数出现的次数
  // 0:3
  // 1:1
  // 2:1
  // 3:0
  // 4:1
  // 5:1
  // 6:0
  // 7:0
  // 8:0
  // 9:0

  // 累积结果得到计数值
  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }

  // 倒叙重新放入临时数组;
  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    tmp[--buckets[bucketsIndex]] = array[i];
  }

  // 把临时数组新排好给array
  return tmp;
}

console.log(radixSort(array));
