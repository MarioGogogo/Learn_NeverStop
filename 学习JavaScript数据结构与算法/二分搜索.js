//搜索
function bindarySearch(arrary,value,compareFn = defaultCompare) {
    const sortedArray = quickSort(array)
    const low = 0
    const high = sortedArray.length -1

    return bindarySearchRecursive(array,value,low,high,compareFn)
}

function bindarySearchRecursive(array,value,low,high,compareFn) {
    if(low <= hight){
       const mid = Math.floor((low + hight) / 2)
       const element = array[mid]
       if(compareFn(element,value) === Compare.LESS_THAN){
          return bindarySearchRecursive(array,value,mid+1,hight,compareFn)
       }else if(compareFn(element,value) === Compare.BIGGER_THAN){
          return bindarySearchRecursive(array,value,mid-1,hight,compareFn)
       }else{
         return  mid
       }
    }
    return DOES_NOT_EXIST
}


let arr = [1,2,3,4,5,6]

console.log('123');
