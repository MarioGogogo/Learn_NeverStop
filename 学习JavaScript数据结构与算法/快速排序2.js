/**
 * 快速排序另一种实现
 * @param {*} array 
 * @param {*} L  第0个下标
 * @param {*} R  数组下标
 */
function quickSort(array, L, R) {
  if (L > R) {
    return;
  }
  let left = L;
  let right = R;
  //默认的中心轴对比值 是数组第1个数
  // 左边放小值  右边放大值
  let pivot = array[left];
  while (left < right) {
    while (left < right && array[right] >= pivot) {
      right--;
    }
    if (left < right) {
      array[left] = array[right];
    }
    while (left < right && array[left] <= pivot) {
      left++;
    }
    if (left < right) {
      array[right] = array[left];
    }
    //重合的位置就放入中心轴
    if (left >= right) {
      array[left] = pivot;
    }
  }
  quickSort(array, L, right - 1);
  quickSort(array, right + 1, R);
  return array;
}

let arr = [ 19, 97, 09, 17, 01, 08 ];
console.log(quickSort(arr, 0, arr.length - 1));
