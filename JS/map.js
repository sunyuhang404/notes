
const list = [1, 2, 3, 4];

Array.prototype._map = function(callback) {
  const list = [];
  for (let i = 0; i < this.length; i++) {
    list.push(callback(this[i], i, this));
  }
  return list;
}

Array.prototype._forEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
}


const temp = list._map(item => {
  return item  +1;
});

list._forEach(item => {
  console.log(item)
})

// console.log(temp)