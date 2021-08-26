
function* generator() {
  // const res1 = yield Promise.resolve(1);
  // const res2 = yield Promise.resolve(res1);
  // yield Promise.resolve(res2);
  try {
    console.log(yield Promise.resolve(1));
    console.log(yield 2);
    console.log(yield Promise.reject('error'));
  } catch (error) {
    console.log(error);
  }
}

function run(gen) {
  const g = gen();
  return new Promise((resolve, reject) => {
    function _next(val) {
      let res;
      try {
        res = g.next(val);
      } catch (error) {
        reject(error);
      }
      if (res.done) return resolve(res.value);
      Promise.resolve(res.value).then(val => {
        _next(val);
      }, error => g.throw(error));
    }
    _next();
  });
}

run(generator);
