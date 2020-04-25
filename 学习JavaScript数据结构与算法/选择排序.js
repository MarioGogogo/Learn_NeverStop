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
/**
 * 选择排序
 * 不断的从左边位置后找最小值
 * 第一轮排序就已经找到了最小值
 */
function selection(arr) {
  if (!checkArray(arr)) return;
  for (let i = 0; i < arr.length - 1; i++) {
    //初始最小值 最小值往左排，
    let miniIndex = i;
    // 每次排位一个 i+1位置继续排列
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    swap(arr, i, miniIndex);
  }
  return arr;
}
console.log(selection([ 2, 5, 6, 10, 2, 8 ]));
