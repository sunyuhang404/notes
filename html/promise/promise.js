
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

const isFn = fn => typeof fn === 'function';

class _Promise {
  constructor(callback) {
    this.value = undefined;
    this.status = STATUS.PENDING;

    this.resolveList = [];
    this.rejectList = [];

    let called;
    const resolve = value => {
      if (this.status !== STATUS.PENDING) return;
      // called = true;
      setTimeout(() => {
        this.value = value;
        this.status = STATUS.FULFILLED;
        this.resolveList.forEach(fn => fn(this.value));
      });
    };

    const reject = reason => {
      if (this.status !== STATUS.PENDING) return;
      // called = true;
      setTimeout(() => {
        this.value = reason;
        this.status = STATUS.REJECTED;
        this.rejectList.forEach(fn => fn(this.value));
      });
    };

    try {
      callback(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  handleValue = (promise, value, resolve, reject) => {
    if (value === promise) {
      reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (value instanceof _Promise) {
      value.then(val => {
        this.handleValue(promise, val, resolve, reject);
      }, reason => reject(reason));
      return;
    }
    resolve(value);
  }

  then(onResolve, onReject) {
    onResolve = isFn(onResolve) ? onResolve : value => { return value }
    onReject = isFn(onReject) ? onReject : reason => { throw reason }
    if (this.status === STATUS.PENDING) {
      const promise = new _Promise((resolve, reject) => {
        this.resolveList.push((innerValue) => {
          try {
            const value = onResolve(innerValue);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectList.push((innerValue) => {
          try {
            const value = onReject(innerValue);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      });
      return promise;
    } else {
      const promise = new _Promise((resolve, reject) => {
        const isFulfilled = this.status === STATUS.FULFILLED;
        try {
          const value = isFulfilled ? onResolve(this.value) : onReject(this.value);
          this.handleValue(promise, value, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  }

  static resolve(value) {
    if (value instanceof _Promise) {
      return value;
    }
    return new _Promise(resolve => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new _Promise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(list) {
    if (!Array.isArray(list)) {
      return _Promise.reject(new TypeError('args must be an array'));
    }
    let count = 0;
    let resList = new Array(list.length);
    return new _Promise((resolve, reject) => {
      for (let i = 0; i < list.length; i++) {
        _Promise.resolve(list[i]).then(res => {
          count += 1;
          resList[i] = res;
          if (count === list.length) {
            resolve(resList);
          }
        }, error => reject(error));
      }
    });
  }

  static race(list) {
    if (!Array.isArray(list)) {
      return _Promise.reject(new TypeError('args must be an array'));
    }
    let resolved = false;
    return new _Promise((resolve, reject) => {
      try {
        list.forEach(val => {
          val.then(res => {
            if (!resolved) {
              resolved = true;
              resolve(res);
            }
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

_Promise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
}

const p1 = new _Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
});
const p2 = new _Promise(resolve => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
})
const p3 = new _Promise(resolve => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});
console.log(Date.now())
_Promise.all([p1, p2, p3]).then(res => {
  console.log(Date.now());
  console.log(res);
})