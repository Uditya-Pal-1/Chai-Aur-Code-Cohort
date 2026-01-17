//Functions

//alert message to indicate the script is loaded.
alert("This is week 6 JavaScript file!");

//for quokka extension use in vs code for javascript command is ctrl + k + j.

//log a message to the console.
console.log("Week 6 script loaded successfully.!");


//function
//definition: A block of code designed to perform a particular task.

//syntax: function functionName(parameters) {
//  // code to be executed
//}

//example:
function greet(name) {
    console.log("Hello, " + name + "!");
}

//calling a function
greet("John");

//types of functions
//1. Function Declaration
//2. Function Expression
//3. Arrow Function
//4. IIFE (Immediately Invoked Function Expression)
//5. Constructor Function
//6. Generator Function
//7. Async Function
//8. Method
//9. Callback Function
//10. Higher-Order Function


//1. Function Declaration
//syntax: function functionName(parameters) {
//  // code to be executed
//}
//example:
function greet(name) {
    console.log("Hello, " + name + "!");
}
//calling a function
greet("John");

//2. Function Expression
//syntax: const functionName = function(parameters) {
//  // code to be executed
//}
//example:
const greet = function(name) {
    console.log("Hello, " + name + "!");
}
//calling a function
greet("John");

//3. Arrow Function
//syntax: const functionName = (parameters) => {
//  // code to be executed
//}
//example:
const greet = (name) => {
    console.log("Hello, " + name + "!");
}
//calling a function
greet("John");

//4. IIFE (Immediately Invoked Function Expression)
//syntax: (function functionName(parameters) {
//  // code to be executed
//})(arguments);
//example:
(function greet(name) {
    console.log("Hello, " + name + "!");
})("John");

//5. Constructor Function
//syntax: function functionName(parameters) {
//  this.parameter = parameter;
//}
//example:
function greet(name) {
    this.name = name;
}
//calling a function
const greet = new greet("John");
console.log(greet.name);

//6. Generator Function
//syntax: function* functionName(parameters) {
//  yield parameter;
//}
//example:
function* greet(name) {
    yield name;
}
//calling a function
const greet = greet("John");
console.log(greet.next().value);

//7. Async Function
//syntax: async function functionName(parameters) {
//  await parameter;
//}
//example:
async function greet(name) {
    await name;
}
//calling a function
const greet = greet("John");
console.log(greet.next().value);

//8. Method
//syntax: const objectName = {
//  methodName: function(parameters) {
//    // code to be executed
//  }
//}
//example:
const objectName = {
    methodName: function(name) {
        console.log("Hello, " + name + "!");
    }
}
//calling a function
objectName.methodName("John");

//9. Callback Function
//syntax: function functionName(parameters) {
//  callback(parameter);
//}
//example:
function greet(name, callback) {
    callback(name);
}
//calling a function
greet("John", function(name) {
    console.log("Hello, " + name + "!");
});

//10. Higher-Order Function
//syntax: function functionName(parameters) {
//  return parameter;
//}
//example:
function greet(name) {
    return name;
}
//calling a function
const greet = greet("John");
console.log(greet.next().value);


//function parameters and arguments
//parameters: variables that are passed as arguments to a function.
//arguments: values that are passed as parameters to a function.
//example:
function greet(name, age) {
    console.log("Hello, " + name + "! You are " + age + " years old.");
}
//calling a function with parameters and arguments
greet("John", 25);


//function return value
//syntax: function functionName(parameters) {
//  return value;
//}
//example:
function add(a, b) {
    return a + b;
}
//calling a function with return value
console.log(add(2, 3));


//function with default parameters
//syntax: function functionName(parameter = defaultValue) {
//  // code to be executed
//}
//example:
function greet(name = "John") {
    console.log("Hello, " + name + "!");
}
//calling a function with default parameters
greet();


//function with rest parameters
//syntax: function functionName(parameter1, parameter2, ...rest) {
//  // code to be executed
//}
//example:
function greet(name, ...rest) {
    console.log("Hello, " + name + "!");
    console.log("You are " + rest.length + " years old.");
}
//calling a function with rest parameters
greet("John", 25, 30, 35);


//function with named parameters
//syntax: function functionName({parameter1, parameter2}) {
//  // code to be executed
//}
//example:
function greet({name, age}) {
    console.log("Hello, " + name + "! You are " + age + " years old.");
}
//calling a function with named parameters
greet({name: "John", age: 25});


//function with named parameters and default values
//syntax: function functionName({parameter1 = defaultValue1, parameter2 = defaultValue2}) {
//  // code to be executed
//}
//example:
function greet({name = "John", age = 25}) {
    console.log("Hello, " + name + "! You are " + age + " years old.");
}
//calling a function with named parameters and default values
greet();


//function with named parameters and rest parameters
//syntax: function functionName({parameter1, parameter2, ...rest}) {
//  // code to be executed
//}
//example:
function greet({name, ...rest}) {
    console.log("Hello, " + name + "!");
    console.log("You are " + rest.length + " years old.");
}
//calling a function with named parameters and rest parameters
greet({name: "John", age: 25, city: "New York", country: "USA"});


//function with named parameters and rest parameters and default values
//syntax: function functionName({parameter1 = defaultValue1, parameter2 = defaultValue2, ...rest}) {
//  // code to be executed
//}
//example:
function greet({name = "John", age = 25, city = "New York", country = "USA"}) {
    console.log("Hello, " + name + "!");
    console.log("You are " + age + " years old.");
    console.log("You are from " + city + ", " + country + ".");
}
//calling a function with named parameters and rest parameters and default values
greet();


