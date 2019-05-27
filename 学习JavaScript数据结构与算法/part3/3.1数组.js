
//访问元素和迭代数组
// 求斐波那也切前20个数  已知前2个是1 从第三项开始每一项都等于前二项的和
const fibonacci =[]
fibonacci[1]=1;
fibonacci[2]=1;

//[1,1,2,3,5
for(let i =3; i<20;i++){
  fibonacci[i] = fibonacci[i-1]+fibonacci[i-2];
}
for (let i = 1; i < fibonacci.length ; i++) {
   console.log(fibonacci[i])
}


//添加元素
let numbers=[0,1,2,3,4,5,6,7,8,9];
numbers.push(10)
console.log(numbers) //改变原数组

//任意位置添加或删除元素
numbers.splice(5,3)
console.log(numbers)
numbers.splice(5,0,2,3,4)
console.log(numbers)
