var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

const newArr = arr.flat(4);
console.log(newArr);

const listUniq = Array.from(new Set(newArr));
console.log(listUniq);

listUniq.sort(function(a, b) {
  return a - b;
});
console.log(listUniq);
