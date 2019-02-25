/**
 * 由于一个对象不能直接引用另一个对象
 * 所以需要通过代理对象在这2个对象之间起到中介作用
 */
class RealImg {
   constructor(filename) {
      this.filename = filename;
   }
   display() {
      console.log('display... ' + this.filename)
   }
   loadFromDisk() {
      console.log('loadding ...' + this.filename)
   }

}

class ProxyImg{
   constructor(filename){
      this.realImg = new RealImg("filename")
   }
   display(){
      this.realImg.display();
   }
}

let proxyImg = new ProxyImg("1.png");
proxyImg.display();