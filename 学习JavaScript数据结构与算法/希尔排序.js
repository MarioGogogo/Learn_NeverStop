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

let arr = [ 9, 6, 8, 10, 0, 22 ];
function shellSort(array) {
  //初始化步长 arr长度的一半
  let gap = Math.floor(array.length / 2);

  while (1 <= gap) {
    // 把距离为 gap 的元素编为一个组，扫描所有组
    for (let i = gap; i < array.length; i++) {
      let j = 0;
      let temp = array[i]; //依次3, 25, 72, 41, 10, 121

      // 对距离为 gap 的元素组进行排序??? 是关键判断条件比较多
      for (j = i - gap; j >= 0 && temp < array[j]; j -= gap) {
        //如果右边比左边大则交换位置
        swap(array, j, j + gap);
      }
    }
    gap = Math.floor(gap / 2); // 减小增量
  }
  return array;
}

console.log(shellSort(arr));
