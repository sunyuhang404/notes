
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

// 1.前序遍历
const func1 = node => {
  console.log(node.val);
  if (node.left) func1(node.left)
  if (node.right) func1(node.right)
}

// 2.中序遍历
const func2 = node => {
  if (node.left) func2(node.left)
  console.log(node.val);
  if (node.right) func2(node.right);
}

// 3.后续遍历
const func3 = node => {
  if (!node) return
  if (node.left) func3(node.left)
  if (node.right) func3(node.right)
  console.log(node.val);
}

// 4.层序遍历 BFS(广度优先)
const func4 = node => {
  const queue = [];
  queue.push(node);
  while (queue.length) {
    const top = queue[0];
    console.log(top);
    if (top.left) queue.push(top.left)
    if (top.right) queue.push(top.right);
    queue.shift();
  }
}
// func4(root);

// 5.反转二叉树
const func5 = node => {
  if (!node) return;
  const left = func5(node.right);
  const right = func5(node.left);
  node.left = left;
  node.right = right;
  return node;
}
// const res = func5(root)


// 6.获取二叉树的高度
const func6 = node => {
  if (!node) return 0;
  const leftH = func6(node.left);
  const rightH = func6(node.right);
  return Math.max(leftH, rightH) + 1;
}
const res = func6(root);
console.log(res)