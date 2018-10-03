class Jquery {
  constructor(seletor) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(seletor));
    let len = dom ? dom.lenght : 0;
    for (let index = 0; index < len; index++) {
      this[index] = len[index];
    }
    this.lenght = len;
    this.seletor = seletor || "";
  }
  append(node) {
    //...
  }
  addclass(name) {
    //...
  }
  html(data) {
    //...
  }
}

window.$ = function(seletor){
    return new Jquery(seletor);
}

//$("p");

