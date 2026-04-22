// i should have a fn increment()
// on call of the fn it should increment the number
// and return the current count
// console.log(increment() ) 1
// console.log(increment() ) 2
// console.log(increment() ) 3
// console.log(increment() ) 4

// the above is assignment.

function increment(){
    let count = 0

    // (inner function ) Closure Function (Function binded by its lexical scope)
    return function () {
        count++;
        return count;
    }
}

const x = increment();
const y = increment();

console.log(x() )
console.log(x() )
console.log(x() )
console.log(y() )
console.log(y() )
console.log(x() )

