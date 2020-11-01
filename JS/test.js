
const func = arr => {
  const res = [];
  const sub = [];
  const obj = {};
  function dfs(j) {
    if (j === arr.length) {
      res.push(sub.slice());
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
// const res = func([1, 2, 3]);
// console.log(res)

const map = {
  '(': ')',
  '[': ']',
  '{': '}'
};
const list = ['(', '[', '{']
const func2 = str => {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (list.indexOf(char) !== -1) {
      arr.push(map[char]);
    } else {
      if (!arr.length || arr.pop() !== char) {
        return false;
      }
    }
  }
  return arr.length === 0;
}
const res = func2('((()()()))');
console.log(res)