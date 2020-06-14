class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }

}

function defaultCompare(){
    console.log('defaultCompare');
}

/**
 * 插入节点需要三步
 */
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }
   
    insert(key) {
        if (this.root === null) {
            this.key = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key)) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, null)
            }
        }
    }
}

const tree = new BinarySearchTree()
tree.insert(11)