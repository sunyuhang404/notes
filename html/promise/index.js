
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

class _Promise {
  constructor(callback) {
    this.value = undefined;
    this.status = STATUS.PENDING;
    this.resolveList = [];
    this.rejectList = [];

    let called;
    const resolve = value => {
      if (called) return;
      called = true;
      setTimeout(() => {
        this.status = STATUS.FULFILLED;
        this.value = value;
        for (const fn of this.resolveList) {
          fn(this.value);
        }
      });
    };

    const reject = reason => {
      if (called) return;
      called = true;
      setTimeout(() => {
        this.status = STATUS.REJECTED;
        this.value = reason;
        for (const fn of this.rejectList) {
          fn(this.value);
        }
      });
    }

    try {
      callback(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  handleValue = (promise, value, resolve, reject) => {
    if (value instanceof _Promise) {
      value.then(val => {
        this.handleValue(promise, val, resolve, reject);
      }, reason => reject(reason));
    }
    resolve(value);
  }

  then(onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : value => value;
    onReject = typeof onReject === 'function' ? onReject : error => { throw error };

    if (this.status === STATUS.PENDING) {
      const promise = new _Promise((resolve, reject) => {
        const resolveArr = this.resolveList;
        const rejectArr = this.rejectList;
        resolveArr.push(() => {
          try {
            const value = onResolve(this.value);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        rejectArr.push(() => {
          try {
            const value = onReject(this.value);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      return promise;
    } else {
      const isFulfilled = this.status === STATUS.FULFILLED;
      const innerValue = this.value;
      return new _Promise((resolve, reject) => {
        try {
          const value = isFulfilled ? onResolve(innerValue) : onReject(innerValue);
          this.handleValue(promise, value, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
}

// new _Promise(resolve => {
//   setTimeout(() => {
//     resolve(1);
//   }, 3000);
// }).then(val1 => {
//   console.log('val1: ', val1);
//   return val1 * 2;
// }).then(val2 => {
//   console.log('val2: ', val2);
//   return val2 * 2;
// })

let p = new _Promise(function (resolve, reject) {
  reject(999);
});
p.then().then().then(function (data) {
  console.log(data);  // 999    
}, function (err) {
  console.log(err);
});
