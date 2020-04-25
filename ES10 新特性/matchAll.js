let string = 'Hello'
let matches = string.match('l')
console.log(matches);
console.log(matches[0]);
let ret = string.match(/l/g)
console.log('ret',ret);
let iterator = "hello".matchAll(/[el]/);

console.log('iterator',iterator);
