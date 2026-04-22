// lexical scope in js is a convention that determine how variables are accessible in a block of code.

let fname = 'Aman';

function  sayName(){
    console.log(`Inside sayName fn the value of fname is`, fname);
}

console.log("value of fname is ", fname);
sayName();