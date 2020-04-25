// 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]
// 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

// 三数之和延续两数之和的思路，我们可以把求和问题变成求差问题——固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加是等于0的。

const  nums = [-1, 0, 1, 2, -1, -4]
const threeSum = function (nums,target) {
    let res = []
    let sum = target
    nums = nums.sort((a, b) => {
        return a - b
    })

    const len = nums.length
    // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
    for (let i = 0; i < len; i++) {
        // 左指针 j
        let j = i + 1
        // 右指针k
        let k = len - 1
        // 如果遇到重复的数字，则跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        while (j < k) {
            // 三数之和小于0，左指针前进
            if (nums[i] + nums[j] + nums[k] < 0) {
                j++
                while (j < k && nums[j] === nums[j - 1]) {
                    j++
                }
            } else if (nums[i] + nums[j] + nums[k] > 0) {
                k--
                while (j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            } else {
                res.push([nums[i], nums[j], nums[k]])
                j++
                k--
                // 若左指针元素重复，跳过
                while (j < k && nums[j] === nums[j - 1]) {
                    j++
                }
                // 若右指针元素重复，跳过
                while (j < k && nums[k] === nums[k + 1]) {
                    k--
                }
            }
        }
    }

    // 返回结果数组
    return res
}

threeSum(nums,0)