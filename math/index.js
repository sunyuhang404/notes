

const func = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(target - arr[i]) ) {
      return [map.get(target - arr[i]), i];
    } else {
      map.set(arr[i], i);
    }
  }
}

const res = func([2, 7, 11, 15], 9);
console.log(res);