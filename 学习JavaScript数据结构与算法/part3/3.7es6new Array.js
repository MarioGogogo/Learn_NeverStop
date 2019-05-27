//for ..of
let numbers=[1,2,3,4,5,6,7,8,9,10];
for (const n of numbers){
  console.log(n %2 === 0 ? 'even' :"odd");
}


let aEntries = numbers.entries()
console.log(aEntries.next().value)  //[0,1] 表示位置在0上的value为1



//from  创建一个新数组
let numbers2 = Array.from(numbers)
console.log(numbers2)


// 数组填充
let numberCopy = Array.of(1,2,3,4,5)
numberCopy.fill(0)
console.log(numberCopy)


//find
const callback = function(ele,index,array){
   // console.log(ele,index,array)
    return ele % 2 == 0
}
numbers.find(callback)
numbers.findIndex(callback)


//includes

console.log(numbers.includes(2))
