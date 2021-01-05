/**
 * 1234 -> 1+2*3 - 4 = 3
 */
let start = 1000,
  end = 9999;

function evalFn(start, end) {
  let op = ['*', ''];
  for (let i = start; i < end; i++) {
    let c = String(i);
    for (let j = 0; j < op.length; j++) {
      for (let k = 0; k < op.length; k++) {
        for (let l = 0; l < op.length; l++) {
          val =
            c.charAt(3) +
            op[j] +
            c.charAt(2) +
            op[k] +
            c.charAt(1) +
            op[l] +
            c.charAt(0);
          if (val.length > 4) {
            if (i === eval(val)) {
              console.log('val :>> ', val + '=' + i);
            }
          }
        }
      }
    }
  }
}

evalFn(start, end);
