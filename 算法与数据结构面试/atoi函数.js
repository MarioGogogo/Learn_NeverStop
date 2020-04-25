/*
* 字符串与数字之间的转换问题
*/

const myAtoi = function (str) {
    const reg = /\s*([-\+]?[0-9]*).*/
    const groups = str.match(reg)
    const max = Math.pow(2,31) -1
    const min = -max -1

    let res = 0
    if(groups){
        res = +groups[1]
        if(isNaN(res)){
            res = 0
        }
    }

    if(res > max){
        return max
    }else if(res < min){
        return  min
    }

    return  res
}

myAtoi('-1212')