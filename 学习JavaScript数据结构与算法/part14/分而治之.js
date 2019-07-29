// 三部分解决：
// 1.分解原问题
// 2.解决子问题
// 3.组合这些子问题，得到原问题的解


//[1,2,3,4,5,6,7,8]

// 二分搜索算法：


function binarySearch(array,value,compareFn= defaultCompare){
     //排序
     const sortedArray = quickSort(array)

     const low = 0
     const high = sortedArray.length -1

     return binarySearchRecursive(array,value,low,high,compareFn)
}


function quickSort(arr){
   

}


function binarySearchRecursive(array,value,low,high,compareFn = defaultCompare){
     if(low <= high){
        const mid = Math.floor((low+high)/2)
        const element = array[mid]
      
        if(compareFn(element,value) === compareFn.LESS_THAN){
            return binarySearchRecursive(array,value,mid +1 ,high,compareFn)
        }else if(compareFn(element,value) === compareFn.BIGGER_THAN){
          return binarySearchRecursive(array,value,mid -1 ,high,compareFn)
        }else{
          return mid
        }
     }else{
       return DOES_NOT_EXIST
     }
}


function compareFn(){
  
}