// // prototype of ForEach function
// if (!Array.prototype.myForEach) {
//     Array.prototype.myForEach = function (cb) {
//         for (let i = 0; i < this.length; i++) {
//             cb(this[i], i)
//         }
//     }
// }

// const arr = [1, 2, 3, 4, 5]
// arr.myForEach((value, index) => console.log(`At Index ${index} value: ${value}`))

// // prototype of myMap function
// if (!Array.prototype.myMap) {
//     Array.prototype.myMap = function (cb) {
//         let result = []
//         for (let i = 0; i < this.length; i++) {
//             const value = cb(this[i], i)
//             result.push(value)
//         }
//         return result
//     }
// }

// const tripalArray = arr.myMap((e) => e * 3)
// console.log(tripalArray)

// // reduce function use
// const res = arr.reduce((oldValue, currentValue) => oldValue + currentValue)
// console.log(res)

// // prototype (polyfill) for reduce function

// if (!Array.prototype.myReduce) {
//     Array.prototype.myReduce = function (cb) {
//         let acc = this[0]
//         for (let i = 1; i < this.length; i++) {
//             acc = cb(acc, this[i])
//         }
//         return acc
//     }
// }

// const myRes = arr.myReduce((oldValue, currentValue) => oldValue + currentValue)
// console.log({ res, myRes })


// //Promise class
// function wait(seconds) {
//     return new Promise((resolve, reject) => {
//         //Promise is a class because all classes have first letter capital.
//         setTimeout(() => resolve(), seconds * 1000)
//     })
// }

// wait(10)
//     .then(() => console.log(`Resolved after 10 sec.`))
//     .catch(() => console.log(`Reject`))
//     .finally(() => console.log(`me har baar chlta hu.`))

// polyfill of Promise
class MyPromise {
    constructor(executorFn) {
        this._state = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finallyCallbacks = [];
        executorFn(this.resolverFunction.bind(this), this.rejectorFunction.bind(this))
    }
    then(cb){
        this._successCallbacks.push(cb);
        return this;
    }
    catch(cb){
        this._errorCallbacks.push(cb);
        return this;
    }
    finally(cb) {
        this._finallyCallbacks.push(cb);
        return this; 
    }
    resolverFunction(value) {
        if(this._state !== 'pending'){
            return;
        }
        this._state='fullfilled';
        this._successCallbacks.forEach((cb) => cb(value))
        this._finallyCallbacks.forEach((cb) => cb())
    
    }
    rejectorFunction(err) {
        if (this._state !== 'pending') {
            return;
        }
        this._state='rejected';
        this._errorCallbacks.forEach((cb) => cb(err))
    }
}



function wait(seconds) {
    const p = new MyPromise((resolve, reject) => {
        setTimeout(() => resolve('Aman'), seconds * 1000)
    })
    return p;
}

wait(10)
    .then((e) => console.log(`Resolved after 10 sec.`,e))
    .catch(() => console.log(`Reject`))
    .finally(() => console.log(`me har baar chlta hu.`))