//示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4


const arr1 = [1,2,4]
const arr2 = [1,3,4]

class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

Node.prototype.push()


class ListNode {
}


const mergeTwoList = function (l1,l2) {
    let head = new ListNode()

    let cur = head

    while(l1 && l2){
        if(l1.val <= l2.val){
            cur.next = l1
            l1 = l1.next
        }else {
            cur.next = l2
            l2 = l2.next
        }
        cur = cur.next
    }
    cur.next = l1 != null ? l1 : l2
    return head.next
}