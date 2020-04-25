/**
 * 判断是否是数组
 * @param {*} array
 */
function checkArray(array) {
  return Array.isArray(array);
}
/**
 * 位置交换
 * @param {*} array
 * @param {*} left
 * @param {*} right
 */
function swap(array, left, right) {
  if (left > array.length - 1 || right > array.length - 1) {
    return array;
  }
  [ array[left], array[right] ] = [ array[right], array[left] ];
}

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// swap(arr, 2, 4);
// console.log(arr);

/**
 * 冒泡排序
 * 特点第一轮排序就能找到最右边的最大值
 */
let a = [ 5, 4, 2, 1 ];
function bubble(arr) {
  if (!checkArray(arr)) return;
  for (let i = arr.length - 1; i > 0; i--) {
    // 下面的i是你下次要遍历的最大边界
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
console.log(bubble(a));

// 解决问题
// 1.查找数组间最大差值 2。奇偶排序 设置2个游标 分别指向奇 偶游标
