const str =  "1abca"

const validPalindrome = function (s) {
     const len = s.length
     let i = 0,j = len -1
     while(i < j && s[i] === s[j]){
         // 指针移动
         i++
         j--
     }

     //判断跳过左 返回回文
     if(isPalindrome(i+1,j)){
         return true
     }
    //判断跳过右 返回回文
    if(isPalindrome(i,j-1)){
        return true
    }

    //工具方法，用于判断字符串是否回文
    function isPalindrome(st,ed) {
        while (st < ed){
            if(s[st] !== s[ed]){
                return false
            }
            st++
            ed--
        }
        return true
    }
    return  false
}

const result = validPalindrome(str)
console.log(result)