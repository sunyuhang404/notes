
const LinkList = require('./LinkList');

const list1 = new LinkList(1, 2, 4);
const list2 = new LinkList(1, 3, 4);

// 1.合并两个有序链表
const res = list1.pushWithList(list2);
console.log(res.toString())

// 2.给定排序链表, 去重
const res2 = res.unique()
console.log(res2.toString())
console.log(res2.length)
// const res = func1(list1.head, list2.head);
// list.tail.next = list.head;
// list.head.prev = list.tail
// console.log(list.getCircleHead())
