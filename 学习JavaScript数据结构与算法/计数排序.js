/**
 * 计数排序
 */
function findMaxValue(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);
  //创建计数数组
  const counts = new Array(maxValue + 1);

  array.forEach((item) => {
    //item是下标值
    if (!counts[item]) {
      counts[item] = 0;
    }
    counts[item]++;
  });
  // 索引
  let sortedIndex = 0;

  counts.forEach((item, i) => {
    //item是出现的次数直到剪到0次 如【1，2，2】
    while (item > 0) {
      array[sortedIndex++] = i;
      item--;
    }
  });
  return array;
}

console.log(countingSort([ 4, 3, 2, 1 ]));
