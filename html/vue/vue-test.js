// 模拟 vue 监听数组变化
// const arrayPrototype = Array.prototype;
// const arrayMethods = Object.create(arrayPrototype);
// const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

// methods.forEach(method => {
//   const original = arrayPrototype[method];
//   Object.defineProperty(arrayMethods, method, {
//     value: function mutator(...args) {
//       console.log(method, args);
//       const result = original.apply(this, args);
//       return result;
//     }
//   })
// });

// const arr = [];
// arr.__proto__ = arrayMethods;
// arr.push(1)
// arr.push(2)
// arr.pop();






const arrayPrototype = Array.prototype;
const prototype = Object.create(arrayPrototype);
const methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'splice', 'sort'];

methods.forEach(method => {
  const original = arrayPrototype[method];
  Object.defineProperty(prototype, method, {
    value: function(...val) {
      const res = original.apply(this, val);
      return res;
    }
  })
})

const arr = [];
arr.__proto__ = prototype;
arr.push(1)
