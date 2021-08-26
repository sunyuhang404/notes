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





const _prototype = Array.prototype;
const ArrayPrototype = Object.create(_prototype);
const methods = ['push', 'pop', 'sort', 'shift', 'unshift', 'reverse'];

methods.forEach(method => {
  const original = ArrayPrototype[method];
  Object.defineProperty(ArrayPrototype, method, {
    value: function mutator(...arg) {
      console.log(method, arg);
      return original.apply(this, arg);
    }
  })
})

const arr = [];
arr.__proto__ = ArrayPrototype;
arr.push(1);
arr.push(2);
arr.pop();
