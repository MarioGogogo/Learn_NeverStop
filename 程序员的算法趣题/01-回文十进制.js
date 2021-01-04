/*
 * @Descripttion:
 * @Author: Mario
 * @Date: 2021-01-04 22:34:31
 * @LastEditors: Maroi
 * @LastEditTime: 2021-01-04 22:41:11
 */
let num = 11;
String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

function decimalSystem(num) {
  while (true) {
    if (
      num.toString() === num.toString().reverse() &&
      num.toString(8) === num.toString(8).reverse() &&
      num.toString(2) === num.toString(2).reverse()
    ) {
      console.log('num :>> ', num);
      break;
    }
    // 只搜索奇数
    num += 2;
  }
}

decimalSystem(num);
