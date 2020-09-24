
// 字符串反转
const str1 = 'abcdef';
// console.log(str1.split('').reverse().join(''));

// 回文字符串
const str2 = 'abcba';
function palidrome(str) {
  // const reversedStr = str.split('').reverse().join('');
  // return str === reversedStr;
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
// console.log(palidrome(str2))

// 给定一个字符串, 最多删除一个字符, 判断是否能成为回文字符串
const validPalindrome = s => {
  const len = s.length;
  let i = 0;
  let j = len - 1;
  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }
  if (isPalidrome(s, i + 1, j)) {
    return true;
  }
  if (isPalidrome(s, i, j - 1)) {
    return true;
  }
}

const isPalidrome = (s, st, ed) => {
  while (st < ed) {
    if (s[st] !== s[ed]) {
      return false;
    }
    st++;
    ed--;
  }
  return true;
}
// console.log(validPalindrome('abca'))

console.log(Number('-1'))

const replace = s => {
  const str = s.trim();
  if (str.length === 0) return;
  const max = Math.pow(2, 31) - 1;
  const min = -max - 1;
  const reg = /\s*([-\+]?[0-9]*).*/
}