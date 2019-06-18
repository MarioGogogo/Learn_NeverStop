/**
 * 递归最简单的解释就是自己调用自己
 */

 //首先看看迭代乘积
function factorial(number){
    if(number <0) return undefined;
    let total = 1;
    for (let n = number; n>1; n--) {
      total*= n;
    }
    return total
}

console.log(factorial(5));

//看看递归
function factorialx(n){
   if(n===1 || n === 0){
     return 1
   }
   return n * factorialx(n-1)
}

console.log('递归：',factorialx(5));

//浏览器调用栈的限制
// 超过最大限制就是报错 不会无限制的递归

//斐波那契数列
// 数列规律是这样的：0 1 1 2 3 5 8 13 21
function fibonacci(n){
  if(n<1) return 0  ;
  if(n <=2) return 1;
  return fibonacci(n-1) + fibonacci(n-2)
}

console.log(fibonacci(8));


//记忆化斐波那契数
// 作用：保存前一个结果的值的优化技术 类似于缓存

function betterFibonacci(n){
    const memo = [0,1]   //记录缓存
    const fibonacci = (n)=>{
       if(memo[n] != null) return memo[n]; //如果有缓存 则返回它
        return memo[n] = fibonacci(n-1,memo) + fibonacci(n-2,memo)
    }
    return fibonacci
}

console.log(betterFibonacci(5));

// 为什么要递归？速度快吗？

//迭代的版本比递归版本快  递归有时候更慢，但是递归版本有时候更容易被理解。迭代的解法可能不可用










