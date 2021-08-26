
// 1.给定数组和一个数字, 找到两个数字相加等于这个target
const func1 = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (map.has(target - item)) {
      return [map.get(target - item), i];
    } else {
      map.set(item, i);
    }
  }
}
// console.log(func([2, 7, 11, 15], 9));


// 2.找到最大子序和
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const func2 = nums => {
  let max = -Number.MAX_VALUE;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (sum < 0) {
      sum = 0;
    }
    sum += nums[i];
    max = Math.max(sum, max);
  }
  return max;
}
// console.log(func2(arr));


// 3.给定不重复的数组，返回所有的子数组的排列
const func3 = arr => {
  const res = [];
  const sub = [];
  const obj = {};
  function dfs(j) {
    if (j === arr.length) {
      res.push(sub.slice())
    }
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 1;
        sub.push(arr[i]);
        dfs(j + 1);
        sub.pop();
        obj[arr[i]] = 0;
      }
    }
  }
  dfs(0);
  return res;
}
// const res = func3([1, 2, 3]);


// 4.给定不重复的数组，返回所有的排列组合
const func4 = arr => {
  const res = [];
  const sub = [];
  function dfs(j) {
    res.push(sub.slice());
    for (let i = j; i < arr.length; i++) {
      sub.push(arr[i]);
      dfs(i + 1);
      sub.pop();
    }
  }
  dfs(0);
  return res;
}
// const res = func4([1, 2, 3]);


// 5.返回 1 到n 之间, k 个数的组合
const func5 = (n, k) => {
  const res = [];
  const sub = [];
  function dfs(j) {
    if (sub.length === k) {
      res.push(sub.slice());
      return;
    }
    for (let i = j; i <= n; i++) {
      sub.push(i);
      dfs(i + 1);
      sub.pop();
    }
  }
  dfs(1);
  return res;
}
// const res = func5(4, 2);


// 6.菲波那切数列
const func6 = n => {
  const fn = [];
  fn[0] = 0
  fn[1] = 1
  fn[2] = 1
  for (let i = 3; i <= n; i++) {
    fn[i] = fn[i - 1] + fn[i - 2];
  }
  return fn[n];
}
// const res = func6(5)

// 7.三数求和问题 找出三个数字相加等于0的
const func7 = list => {
  const arr = list.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = arr.length - 1;
    while (j < k) {
      const sum = arr[i] + arr[j] + arr[k]
      if (sum < 0) {
        j++;
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
      } else if (sum > 0) {
        k--;
        while (j < k && arr[k] === arr[k + 1]) {
          k--;
        }
      } else {
        res.push([arr[i], arr[j], arr[k]]);
        j++;
        k--;
        while (j < k && arr[j] === arr[j - 1]) {
          j++;
        }
        while (j < k && arr[k] === arr[k + 1]) {
          k--;
        }
      }
    }
  }
  return res;
}
// const res = func7([-1, 0, 1, 2, -1, -4])


// 8.双指针问题 - 两个有序数组合并
const func8 = (arr1, arr2, m, n) => {
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
      k--;
    }
  }
  return arr1;
}
const arr1 = [1, 2, 3]
const arr2 = [2, 5, 6, 7];
// const res = func8(arr1.concat((new Array(arr2.length)).fill(0)), arr2, 3, 4);


// 9.冒泡排序
const func9 = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        arr[i] = arr[i] + arr[j];
        arr[j] = arr[i] - arr[j];
        arr[i] = arr[i] - arr[j];
      }
    }
  }
  return arr;
}
// const res = func9([5, 3, 2, 4, 1]);

// 10.根据权重随机选择
const arr10 = [
  { val: 1, weight: 1 },
  { val: 2, weight: 4 },
  { val: 3, weight: 6 },
  { val: 5, weight: 10 },
  { val: 67, weight: 13 },
  { val: 100, weight: 29 },
]
const func10 = arr => {
   
}
const res = func10(arr10);

console.log(res);
