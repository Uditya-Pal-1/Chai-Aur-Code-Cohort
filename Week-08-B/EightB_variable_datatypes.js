//EightB.js

//alert message to indicate the script is loaded.
// alert("This is week 8-B JavaScript file!");

//log a message to the console.
console.log("Week 8-B script loaded successfully.!");


// datatypes
//primitive datatypes

var name = "Aman Pal"; //string variable but we dont use it because it is old

let cast = "Pal"; 
const age = 25; //Constant Variable
const pi = 3.14;
let number = 123; // Number 
let text = 'Hello, World!'; // String
let isTrue = true; // Boolean
let nothing = null; // Object
let undefinedVar = undefined; // Undefined
let symbolVar = Symbol(); // Symbol

// every thing in js is return as object

console.log(typeof nothing);
console.log(typeof undefinedVar);
console.log(typeof symbolVar);

// non primitive datatypes

let person = {     // Object
    name:"Aman",
    age:21,
    isStudent: true
}

let num = "12" // String
let convertedNum = Number(num);
console.log(convertedNum);
console.log(typeof convertedNum);
  
     // or 

let numb = "12" // String
// let convertedNum = Number(num);
let convertedNo = +num;
console.log(convertedNo);
console.log(typeof convertedNo);

     // or

let number1 = "12" // String
// let convertedNum = Number(num);
// let convertedNo = +num;
let convNum = parseInt(number1);
console.log(convNum);
console.log(typeof convNum);




let number2 = "23a"
let convertNum = Number(number2);
console.log(convertNum)  // it shows NaN means Not A Number.
console.log(typeof convertNum)

let str = 123
let convertedString = String(str);
console.log(convertedString);
console.log(typeof convertedString);



// operations

let a = 10;
let b = 20;
let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
let power = a ** b;
console.log(sum);


// comparison

let x = 5
let y = 10
console.log(x == y);  // Equal to.   // check only data 
console.log(x === y); // Strict Equal to.     // check data also datatype.
console.log(x != y);   // Not Equal to
console.log(x > y);    // Greater than
console.log(x < y);    // Smaller than
console.log(x <= y);   // Smaller than Equal to
console.log(x >= y);   // Greater than Equal to

// math library 

console.log(Math.max(5,10));
console.log(Math.min(5,10));
console.log(Math.random());  // it give no. btw 0 and 1.
console.log(Math.random()*10); // it give no. btw 0 and 1. and multiply by 10.
console.log(Math.floor(4.8)); // it roundOff nearest float to low integer value.
console.log(Math.ceil(4.8));  // it roundOff nearest float to Higher integer value.


// To Get Random No. Btw 1 to 6 Inclusive.
let randomNo = Math.floor(Math.random()*6)+1
console.log(randomNo);

let fName = 'Aman';
let lName = 'Pal';
let fullName = fName + " " + lName;
console.log(fullName);

let message = "Hello world";
console.log(message)
// String Methods
console.log(message.length);
console.log(message.toUpperCase());  
console.log(message.toLowerCase())
console.log(message.slice(index,4));
console.log(message.split(1,3));
console.log(message.indexOf('wo'));

// template literals
let myName = 'Aman';
let greeting = `Hello ${myName}, Good Morning ☀️`
console.log(greeting);