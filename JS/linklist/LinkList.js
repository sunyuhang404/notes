
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

module.exports = class LinkList {
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

  push(data) {
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

  pushWithList(list) {
    const newList = new LinkList();
    let head1 = this.head;
    let head2 = list.head;
    while (head1 && head2) {
      if (head1.data <= head2.data) {
        newList.push(head1.data);
        head1 = head1.next;
      } else {
        newList.push(head2.data);
        head2 = head2.next;
      }
    }
    return newList;
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
        const current = this.getNodeWithIndex(position);
        node.next = current;
        node.prev = current.prev;
        current.prev.next = node;
        current.prev = node;
      }
    }
    this.length += 1;
    return true;
  }

  getNode(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    const current = this.getNodeWithIndex(position);
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
    const current = this.getNodeWithIndex(position);
    current.data = data;
    return true;
  }

  unique() {
    let current = this.head;
    while (current && current.next) {
      if (current.data === current.next.data) {
        current.next = current.next.next;
        this.length -= 1;
      } else {
        current = current.next;
      }
    }
    return this;
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
        current = this.getNodeWithIndex(position);
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
    let current = this.getNodeWithIndex(start);
    while (current !== null) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
    return prev;
  }

  hasCircle() {
    let current = this.getNodeWithIndex(0);
    while (current) {
      if (current.flag && current.flag === 1) {
        return true;
      }
      current = current.next;
      current.flag = 1;
    }
    return false;
  }

  getCircleHead() {
    // let a = this.head;
    // let b = this.head;
    // let i = 0;
    // let j = 0;
    // while (a !== b) {
    //   a = a.next;
    //   b = b.next.next;
    //   i++;
    //   j += 2;
    // }
    // console.log(i)
    // console.log(j)

    // 快慢指针方法
    let slow = this.head
    let fast = this.head
    let i = 0;
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
      if (slow === fast) {
        return { node: slow, index: i };
      }
      i++;
    }
    return null
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

  getNodeWithIndex(position) {
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
