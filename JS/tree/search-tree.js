// 搜索二叉树
// 右子节点 大于 根节点 大于 左子节点
const node = {
  val: 6,
  left: {
    val: 3,
    left: {
      val: 1,
    },
    right: {
      val: 4
    }
  },
  right: {
    val: 8,
    left: {
      val: 7
    },
    right: {
      val: 9
    }
  },
}
const search = (node, n) => {
  if (!node) {
    return;
  }
  if (node.val === n) {
    console.log(node)
  } else if (node.val > n) {
    // 值大了，向左查找
    search(node.left, n)
  } else {
    // 值小了， 向右查找
    search(node.right, n)
  }
}

// 插入新节点
const insert = (node, n) => {
  // 如果是空节点，就可以插入新节点
  if (!node) {
    node = {
      val: n
    };
    return;
  }
  if (node.val === n) {
    // 节点存在了
    return;
  } else if (node.val > n) {
    insert(node.left, n);
  } else {
    insert(node.right, n);
  }
}

// 删除节点
const remove = (node, n) => {
  if (!node) {
    return;
  }
  if (node.val === n) {
    if (!node.left && !node.right) {
      // 叶子节点，直接删除
      node = null;
    } else if (node.left) {
      // 找到左子节点中的最大值
      const maxLeft = findMax(node.left);
      node.val = maxLeft.val;
      node.left = remove(node.left, maxLeft.val);
    } else {
      const minRight = findMax(node.right);
      node.val = minRight.val;
      node.right = remove(node.right, minRight.val);
    }
  } else if (node.val > n) {
    node.left = remove(node.left, n)
  } else {
    node.right = remove(node.right, n);
  }
}

// 查找左子树最大值
const findMax = (node) => {
  while (node.right) {
    node = node.right;
  }
  return node;
}

// 查找右子树最小值
const findMin = (node) => {
  if (node.left) {
    node = node.left;
  }
  return node;
}

// 验证是否为搜索树
const func = node => {
  function dfs(node, minValue, maxValue) {
    if (!node) return true
    if (node.val <= minValue || node.val >= maxValue) return false;
    return dfs(node.left, minValue, node.val) && dfs(node.right, node.val, maxValue);
  }
  return dfs(node, -Infinity, Infinity)
}

const res = func(node);
console.log(res)