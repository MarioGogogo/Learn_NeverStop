/*
 * @Descripttion:
 * @Author: Mario
 * @Date: 2021-01-05 21:13:33
 * @LastEditors: Maroi
 * @LastEditTime: 2021-01-05 22:07:19
 */
const n = 100;
function flipCARDS(n) {
  //设置100个数字 代表100张牌
  //背面朝上 false
  const array = new Array(n).fill(false);
  console.log('array :>> ', array);
  for (let i = 1; i < array.length; i++) {
    //每隔j张翻牌
    const j = i - 1;
    while (j < array.length) {
      array[j] = !array[j];
      j += 1;
    }
  }
  return array;
}
console.log('[...n] :>> ', flipCARDS(n));
