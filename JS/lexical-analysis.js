
function test1(age) {
  console.log(age)
  var age = 27
  console.log(age);
  function age() {}
  console.log(age)
}

function test2(age) {
  var age;
  console.log(age);
  var age = 23;
  console.log(age);
  function age() {}
  console.log(age)
}

function test3(age) {
  var age;
  console.log(age)
  age = 23
  console.log(age)
  function age() {
    console.log(age)
  }
  age();
  console.log(age)
}

// test1(3);
// test2(3);
test3(3)