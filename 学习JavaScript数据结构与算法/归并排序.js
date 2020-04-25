/**
 * 归并排序
 * 思想将序列中带序号数字分成若干组，每个数字分一组
 * 将若干组22 合并 合并后保证有序
 * 重复第二步直到只剩一组 排序完成
 */

const arr = [19,97,09,17,01,08,02]

function mergeSort(array ){
    // 判断数组长度1 表示已经分组
    if(array.length >1){
         const {length} = array
         const middle = Math.floor(length/2)
         const left = mergeSort(array.slice(0,middle))
         const right = mergeSort(array.slice(middle,length))
         array = merge(left,right)
    }
    return array
}

function merge(left,right){
   let i = 0;
   let j = 0
   const result = []
   while(i< left.length && j< right.length){
       result.push((left[i] < right[j]) ? left[i++] : right[j++])
   }
   return result.concat(i<left.length ? left.slice(i) : right.slice(j))
    
}

console.log(mergeSort(arr));


