
function Father() {
  this.list = ['red', 'blue', 'green'];
}
Father.prototype.get = function() {
  console.log(this.list);
}
function Son() {
  Father.call(this);
}

var instance1 = new Son();
instance1.list.push('black');
console.log(instance1.list);

var instance2 = new Son();
console.log(instance2.list);
