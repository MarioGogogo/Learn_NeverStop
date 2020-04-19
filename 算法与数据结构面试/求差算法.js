// 题目 arr=[2,7,2,4,6,9,0]  target = 9  求哪2个数组相加等于target 输出下标
const arr = [2,2,4,6,9,0,7]
const target = 9
const twoSum = function (nums,target) {
    
    const diffs = {}
    const len = nums.length

    for (let i = 0; i < len; i++) {

        if(diffs[target-nums[i]] !== undefined){
            return [diffs[target-nums[i]],i]
        }
        diffs[nums[i]]  = i
    }
    
}


const result = twoSum(arr,target)

console.log(result)