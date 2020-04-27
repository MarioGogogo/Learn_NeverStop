/**
 * 顺序搜索
 * 效率最底下的搜索
 */

function sequentialSearch(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

console.log(sequentialSearch([ 1, 2, 3, 4, 5 ], 9));
