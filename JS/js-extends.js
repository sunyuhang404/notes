
function A(name, arr) {
  this.name = name;
  this.arr = arr;
}

function B(name, age, arr) {
  A.call(this, name, arr);
  this.age = age;
}

B.prototype = Object.assign(A.prototype)
B.prototype.constructor = B;
B.prototype.test = function() {
  this.arr.push(3)
}

var a = new A('111', [1, 2, 3]);
var b = new B('222', 12, [1, 2, 3]);

console.log(a)
console.log(b)
b.test();
console.log(a)
console.log(b)
