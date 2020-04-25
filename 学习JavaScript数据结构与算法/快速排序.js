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
 * 快速排序
 * 从中间数组找一个值
 * 设计2个双指针左右各一个
 * 左边找比中间值大的元素，右边找比它小的元素 交换他们
 * 直到左超过了右边
 */
function quickSort(array) {
  //传数组的下标
  return quick(array, 0, array.length - 1);
}

function quick(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quick(array, left, index - 1);
    } else if (index < right) {
      quick(array, index, right);
    }
  }
  return array;
}

function partition(array, left, right) {
  const pivot = array[Math.floor((right + left) / 2)];
  console.log('index', Math.floor((right + left) / 2), pivot);
  let i = left;
  let j = right;
  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

console.log(quickSort([ 3, 5, 1, 6, 4, 7, 2 ]));
