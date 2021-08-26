
const map = {
  '(': ')',
  '[': ']',
  '{': '}'
};
const arr = ['(', '[', '{'];

// 确定括号对称性
const func = str => {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (arr.indexOf(char) !== -1) {
      stack.push(map[char]);
    } else {
      if (!stack.length || stack.pop() !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

const res = func('([{}])');
console.log(res);
