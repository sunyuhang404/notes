
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

const func = node => {
  const res = [];
  if (!node) return res;
  const queue = [];
  queue.push(node);
  while (queue.length) {
    const level = [];
    for (let i = 0; i < queue.length; i++) {
      const top = queue.shift();
      level.push(top.val);
      if (top.left) {
        queue.push(top.left)
      }
      if (top.right) {
        queue.push(top.right)
      }
    }
    res.push(level)
  }
  return res;
}
// console.log(func(root))