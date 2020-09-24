
for (var i = 0; i < 5; i++) {
  // setTimeout((index) => {
  //   console.log(index);
  // }, 1000 * i, i);
  (function(index) {
    setTimeout(() => {
      console.log(index)
    }, 1000 * index);
  })(i)
}