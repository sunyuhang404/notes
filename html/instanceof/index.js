
function _instanceof(leftVal, rightVal) {
  if (typeof leftVal !== 'object' || typeof rightVal !== 'object') return false;
  let leftProto = leftVal.prototype;
  let rightProto = rightVal.prototype;
  while (true) {
    if (leftProto === null) {
      return false;
    }
    if (leftProto === rightProto) {
      return true;
    }
    leftProto = leftProto.prototype;
  }
}

function A() {}
const a = new A();
const res = _instanceof(a, A);
console.log(res);

Function.prototype._call = function(context) {
  context.func = this;
  const args = [...arguments].slice(1);
  const res = context.func(...args);
  delete context.func;
  return res;
}

Function.prototype._apply = function(context) {
  context.func = this;
  let res;
  if (arguments[1]) {
    res = context.func(...arguments[1]);
  } else {
    res = context.func();
  }
  delete context.func;
  return res;
}
Function.prototype._bind = function(context) {
  const args = [...arguments].slice(1);
  const self = this;
  return function Fun() {
    if (self instanceof Fun) {
      return self(...args, ...arguments);
    } else {
      return self.apply(context, ...args.concat(...arguments));
    }
  }
}
