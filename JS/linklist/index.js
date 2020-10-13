
const LinkList = require('./LinkList');

const list = new LinkList('aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff');
// console.log(list.toString())
// console.log(list.get(0))
// console.log(list.indexOf('s'))
// console.log(list.removeAt(3))
// console.log(list.toString())

// list.forEach((item, index, arr) => {
//   console.log(item, index)
// })

// list.map((item, index, arr) => {
//   return `${ item } - ${ index }`
// });

// list.reverse(0);
list.tail.next = list.head;
list.head.prev = list.tail
console.log(list.getCircleHead())
