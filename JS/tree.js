
const data = {
  name: 'name',
  children: [
    {
      name: 'name0',
      children: [
        {
          name: 'name0-1',
          children: []
        }
      ]
    },
    {
      name: 'name1',
      children: [
        {
          name: 'name1-1',
          children: []
        }
      ]
    }
  ]
}

// 层序遍历
const print = node => {
  const que = [];
  que.push(node);
  while (que.length !== 0) {
    node = que.shift();
    console.log(node.name);
    if (node.children[0]) que.push(node.children[0])
    if (node.children[1]) que.push(node.children[1])
  }
}

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

// 二叉树 前序遍历, 中序遍历, 后续遍历
// const firstPrint = node => {
//   if (node.left) firstPrint(node.left)
//   if (node.right) firstPrint(node.right)
//   console.log(node.val);
// }

// 二叉树层序遍历
// const BFS = root => {
//   const queue = [];
//   queue.push(root);
//   console.log(queue)
//   while (queue.length) {
//     console.log(queue)
//     const top = queue[0];
//     console.log(top.val);
//     if (top.left) {
//       queue.push(top.left);
//     }
//     if (top.right) {
//       queue.push(top.right);
//     }
//     queue.shift();
//   }
// }

// 两数求和
const arr = [2, 7, 11, 15];
const func = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(target - arr[i])) {
      return [map.get(target - arr[i]), i]
    } else {
      map.set(arr[i], i);
    }
  }
}

// 双指针问题 - 两个有序数组合并
const arr1 = [1, 2, 3]
const arr2 = [2, 5, 6, 7];
const merge = (arr1, m, arr2, n) => {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (arr1[i] >= arr2[j]) {
      arr1[k] = arr1[i];
      i--;
      k--;
    } else {
      arr1[k] = arr2[j];
      j--;
      k--
    }
  }
  while (j >= 0) {
    arr1[k] = arr2[j];
    k--;
    j--;
  }
}
// arr1.concat((new Array(arr2.length)).fill(0))
// merge(arr1, 3, arr2, 4)
// console.log(arr1)

// 三数求和问题
let nums = [-1, 0, 1, 2, -1, -4];
nums = nums.sort((a, b) => a - b);

const threeSum = nums => {
  const res = [];
  for (let i = 0; i < nums.length - 1; i++) {
    let j = i + 1;
    let k = nums.length - 1;
    // 重复数字跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        k--;
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        res.push([nums[i], nums[j], nums[k]]);
        j++;
        k--;
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }
  return res;
}
// console.log(threeSum(nums))

// 冒泡
const arr3 = [5, 3, 2, 4, 1];
const bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[i] < arr[j]) {
        arr[i] = arr[i] + arr[j];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
      }
    }
  }
}