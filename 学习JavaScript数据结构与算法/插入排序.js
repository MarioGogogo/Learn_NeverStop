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
 * 插入排序
 * 适合小型数组 算法比选择和冒泡性能好
 * @param {*} array 
 */

function insertionSort(array) {
  const { length } = array;
  let temp;
  //注意是从第二个位置开始
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i]; //储存一个临时变量
    //每一次都比较当前索引之前的序列全都比较一遍
    //比如【3，2，1，5】，当前1 要跟 2 3都比较一遍 下一次5 跟 3，2，1 都比较一遍
    //array[j - 1] 是前面一个数 temp后面一个数
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}

const array = [ 3, 5, 1, 4, 2 ];

console.log(insertionSort(array));
