
Function.prototype._call = function(context) {
  context.fun = this;
  const args = [...arguments].slice(1);
  const res = context.fun(...args);
  delete context.fun;
  return res;
}

Function.prototype._apply = function(context) {
  context.fun = this;
  let res;
  if (arguments[1]) {
    res = context.fun(...arguments[1]);
  } else {
    res = context.fun();
  }
  delete context.fun;
  return res;
}

Function.prototype.bin = function(context) {
  const self = this;
  const arg = [...arguments].slice(1);
  return function Fun() {
    if (this instanceof Fun) {
      return self(...arg, ...arguments);
    } else {
      return self.app(context, ...arg.concat(...arguments));
    }
  }
}

Function.prototype._bind = function(context) {
  const self = this;
  const params = [...arguments].slice(1);
  return function(...args) {
    return self._apply(context, ...params.concat(...args));
  }
}

globalThis.name = 'global'
globalThis.aaa = 'global aaa'

const obj = {
  name: 'obj',
  aaa: 'obj aaa',
};

function test(aaa) {
  this.aaa = aaa;
  console.log(this.name)
  console.log(this.aaa)
}
// test._call(obj, [234]);
const a = test._bind(obj)
a(123);