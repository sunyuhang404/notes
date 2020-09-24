
const obj = {
  name: 'obj',
  age: 12,
  params: {
    a: 'a',
    b: 'b'
  },
  arr:[1]
};

const isObj = params => Object.prototype.toString.call(params) === '[object Object]'

function deepCopy(data) {
  if (typeof data === 'function') {
    throw new TypeError('类型错误');
  }
  const res = {};
  for (const key in data) {
    if (isObj(data[key])) {
      res[key] = deepCopy(data[key]);
    } else if (Array.isArray(data[key])) {
      res[key] = [...data[key]];
    } else {
      res[key] = data[key];
    }
  }
  return res;
}

const a = deepCopy(obj)
console.log(a);
a.params.a = 'aaa';
a.arr.push(2)
console.log(a);
console.log(obj);