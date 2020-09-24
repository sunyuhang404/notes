
const a = {};
const b = {};

const arr = [1, 2, 2, 3, 4, a, b, NaN, undefined, NaN];

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

const unique = arr => {
  const list = [];
  arr.forEach(item => {
    if (isObject(item)) {
      const hasObj = list.every(item2 => isObject(item2));
      console.log(hasObj)
      if (!hasObj) {
        list.push(item)
      }
    }
    // if (isObject(item)) {
    //   if (!list.every(item2 => isObject(item2))) {
    //     list.push(item);
    //   }
    // } else if (isNaN(item)) {
    //   if (!list.every(item2 => isNaN(item2))) {
    //     list.push(item);
    //   }
    // } else {
    //   if (list.findIndex(item2 => item !== item2)) {
    //     list.push(item)
    //   }
    // }
  })
  return list;
}

console.log(unique(arr));