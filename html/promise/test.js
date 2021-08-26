

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
};

const isFn = fn => typeof fn === 'function';

class _Promise {
  constructor(callback) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.resolveList = [];
    this.rejectList = [];

    const onResolve = value => {
      if (this.status !== STATUS.PENDING) {
        return;
      }
      setTimeout(() => {
        this.value = value;
        this.status = STATUS.FULFILLED;
        this.resolveList.forEach(fn => fn(value));
      });
    };

    const onRejected = value => {
      if (this.status !== STATUS.PENDING) {
        return;
      }
      setTimeout(() => {
        this.value = value;
        this.status = STATUS.REJECTED;
        this.rejectList.forEach(fn => fn(value));
      });
    };

    try {
      callback(onResolve, onRejected);
    } catch (error) {
      onRejected(error);
    }
  }

  then(onResolve, onReject) {
    onResolve = isFn(onResolve) ? onResolve : (value) => value;
    onReject = isFn(onReject) ? onReject : (value) => value;
    if (this.status === STATUS.PENDING) {
      const promise = new _Promise((resolve, reject) => {
        this.resolveList.push(innerValue => {
          try {
            const value = onResolve(innerValue);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectList.push(innerValue => {
          try {
            const value = onReject(innerValue);
            this.handleValue(promise, value, resolve, reject);
          } catch (error) {
            reject(value);
          }
        })
      });
      return promise;
    } else {
      const isFulfilled = this.status === STATUS.FULFILLED;
      const promise = new _Promise((resolve, reject) => {
        try {
          const value = isFulfilled ? onResolve(this.value) : onReject(this.value);
          this.handleValue(promise, value, resolve, reject);s
        } catch (error) {
          reject(error);
        }
      });
      return promise;
    }
  }

  handleValue(promise, value, resolve, reject) {
    if (value === promise) {
      reject(new Error('重复引用'));
    }
    if (value instanceof _Promise) {
      value.then(val => {
        this.handleValue(promise, val, resolve, reject);
      }, reason => reject(reason));
      return;
    }
    resolve(value);
  }

  static resolve(value) {
    if (value instanceof _Promise) {
      return value;
    }
    return new _Promise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new _Promise((resolve, reject) => {
      reject(value);
    });
  }

  static all(list) {
    return new _Promise((resolve, reject) => {
      if (!Array.isArray(list)) {
        reject(new TypeError('类型不对'));
      }
      const resList = new Array(list.length);
      let count = 0;
      for (let i = 0; i < list.length; i++) {
        _Promise.resolve(list[i]).then(res => {
          count ++;
          resList[i] = res;
          if (count === list.length) {
            resolve(resList);
          }
        }, err => reject(err));
      }
    });
  }

  static race (list) {
    if (!Array.isArray(list)) {
      return _Promise.reject(new TypeError('类型不对'));
    }
    let resolved = false;
    return new _Promise((resolve, reject) => {
      try {
        list.forEach(res => {
          res.then(val => {
            if (!resolved) {
              resolved = true;
              resolve(val);
            }
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

Function.prototype._call = function (context) {
  context.fn = this;
  const params = [...arguments].slice(1);
  const res = context.fn(...params);
  delete context.fn;
  return res;
}

Function.prototype._apply = function (context) {
  context.fn = this;
  let res;
  if (arguments[1]) {
    res = context.fn(...arguments[1]);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}

Function.prototype._bind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('必须是 function');
  }
  const self = this;
  const args = [].slice.call(arguments, 1);
  return function Fun() {
    const params = [].slice(1);
    return self.apply(context, args.concat(params));
  }
}

function clone(target) {
  if (typeof target === 'object') {
    const res = Array.isArray(target) ? [] : {};
    for (const key in target) {
      res[key] = clone(target[key]);
    }
    return res;
  }
  return target;
}