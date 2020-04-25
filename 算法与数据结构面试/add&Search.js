
/*
示例: addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
*/


const WordDictionary = function () {
    this.words = {}
    this.wordMap = new Map()
}

WordDictionary.prototype.addWord = function (word) {
     if(this.wordMap.has(word.length)){
         this.wordMap.set(word.length,word)
     }else{
         // this.wordMap = word
         this.wordMap.set(word.length,word)
     }
}

WordDictionary.prototype.search = function (word) {
    if(!this.words[word.length]){
        return false
    }

    const len = word.length
    if(!word.includes('.')){
        return this.words[len].includes(word)
    }

    const reg = new RegExp(word)

    return this.words[len].some(item=>{
        return reg.test(item)
    })

}




const w = new WordDictionary()

w.addWord("bad")
w.addWord("bad")
w.addWord("a")
w.addWord("ba")
w.addWord("cca")
w.search('a')


