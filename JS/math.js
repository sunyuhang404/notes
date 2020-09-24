
const func = (arr, target) => {
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

console.log(func([2, 7, 11, 15], 9));

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxArr = nums => {
  let max = -Number.MAX_VALUE;
  let sum = 0;
  for (let num of nums) {
    if (sum < 0) {
      sum = 0;
    }
    sum += num;
    max = Math.max(max, sum);
  }
  return max;
}

console.log(maxArr(arr));