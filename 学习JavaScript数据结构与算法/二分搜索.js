/**
 * 二分搜索
 * 前提顺序已经排序
 */
function quickSort(array) {
  return array.sort();
}
let array = [ 1, 2, 3, 4, 5, 6 ];
function bindarySearch(array, value) {
  //返回已经排序的新数组
  const sortedArray = quickSort(array);
  //   设置下标 0 到最长一位下标
  const low = 0;
  const hight = sortedArray.length - 1;

  return bindarySearchRecursive(array, value, low, hight);
}

function bindarySearchRecursive(array, value, low, hight) {
  if (low <= hight) {
    //找中间值
    const mid = Math.floor((low + hight) / 2);
    if (array[mid] < value) {
      //递归重新找一次
      return bindarySearchRecursive(array, value, mid + 1, hight);
    } else if (array[mid] > value) {
      //递归重新找一次
      return bindarySearchRecursive(array, value, mid - 1, hight);
    } else {
      return mid;
    }
  }
  return -1;
}

console.log(bindarySearch(array, 6));
