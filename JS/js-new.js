
function createObj(Contructor, ...args) {
  let obj = new Object();
  obj.__proto__ = Contructor.prototype;
  let res = Contructor.call(obj, args);
  return typeof res === 'object' ? res : obj;
}

function A(name) {
  this.name = name;
}
A.prototype.test = function() {
  console.log(this.name)
}

var a = createObj(A, 'asdf');
console.log(a);
a.test();


function create() {
  let obj = new Object();
  let Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  return Con.apply(obj, arguments);
}

function createNew() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}