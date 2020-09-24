
/**
 * 双向链表
 */

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class LinkList {
  constructor(...params) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (params) {
      this.initialList(params);
    }
  }

  initialList(params) {
    const array = params.flat(2).map(item => new Node(item));
    array.forEach((node, index) => {
      if (index === 0) {
        this.head = node;
      } else if (index === array.length - 1) {
        this.tail = node;
        this.tail.prev = array[index - 1];
        array[index - 1].next = node;
      } else {
        array[index - 1].next = node;
        node.prev = array[index - 1];
      }
    });
    this.length = array.length;
  }

  append(data) {
    const node = new Node(data);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  insert(position, data) {
    if (position < 0 || position >= this.length) return false
    const node = new Node(data);
    
    // 链表为空
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      // 插入到最开始
      if (position === 0) {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      } else if (position === this.length) {
        // 插入到最后
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      } else {
        // 插入到中间
        const current = this.getCurrentNode(position);
        node.next = current;
        node.prev = current.prev;
        current.prev.next = node;
        current.prev = node;
      }
    }
    this.length += 1;
    return true;
  }

  get(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    const current = this.getCurrentNode(position);
    return current.data
  }

  indexOf(data) {
    let current = this.head;
    let i = 0;
    while (current) {
      if (current.data === data) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }

  update(position, data) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    const current = this.getCurrentNode(position);
    current.data = data;
    return true;
  }

  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = null;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // 删除第一个节点
      if (position === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else if (position === this.length - 1) {
        // 删除最后一个
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        current = this.getCurrentNode(position);
        current.next.prev = current.prev;
        current.prev.next = current.next;
      }
    }
    this.length -= 1;
    return current.data;
  }

  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  begin() {
    return this.head;
  }

  end() {
    return this.tail;
  }

  forEach(callback) {
    if (this.length === 0) {
      return;
    }
    let index = 0;
    let current = this.head;
    while (index < this.length) {
      callback(current.data, index, this);
      index++;
      current = current.next;
    }
  }

  map(callback) {
    if (this.length === 0) {
      return;
    }
    let index = 0;
    let current = this.head;
    while (index < this.length) {
      const data = callback(current.data, index, this);
      current.data = data;
      current = current.next;
      index++;
    }
  }

  reverse(start = 0, end = this.length - 1) {
    if (this.length === 0) {
      return null;
    }
    let prev = null;
    let current = this.getCurrentNode(start);
    while (current !== null) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
    return prev;
  }

  toString() {
    return this.backwordString();
  }

  forwardString() {
    let current = this.tail;
    let resultString = '';

    while (current) {
      resultString += current.data + ',';
      current = current.prev;
    }
    return resultString.split(',').filter(item => item !== '');
  }

  backwordString() {
    let current = this.head;
    let resultString = '';
    while (current) {
      resultString += current.data + ',';
      current = current.next;
    }
    return resultString.split(',').filter(item => item !== '');
  }

  getCurrentNode(position) {
    let current = null;
    if (Math.ceil(this.length / 2) > position) {
      current = this.head;
      let i = 0;
      while (i++ < position) {
        current = current.next;
      }
    } else {
      current = this.tail;
      let i = this.length - 1;
      while (i-- > position) {
        current = current.prev;
      }
    }
    return current;
  }
}

const list = new LinkList();
list.append('aaa')
list.append('bbb')
list.append('ccc')
list.append('ddd')
list.append('eee')
list.append('fff')
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

list.reverse(1);
console.log(list.toString())
