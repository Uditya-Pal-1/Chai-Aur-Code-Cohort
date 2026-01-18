// prototype.js

// what is prototype?
// prototype is an object that is used to build other objects and inherit properties and methods.

// every object in javascript has a prototype property which points to another object.
// the object from which a new object is built is called the prototype of the new object.
// the prototype object has a property called constructor which points to the function that created it. 
// the constructor property is used to create new objects using the same prototype.

// types of prototypes:
// 1. Object.prototype
// 2. Function.prototype
// 3. Array.prototype
// 4. String.prototype
// 5. Number.prototype
// 6. Boolean.prototype
// 7. Date.prototype
// 8. RegExp.prototype
// 9. Error.prototype
// 10. Math.prototype

// how to use prototype?
// 1. add properties and methods to prototype
// 2. inherit properties and methods from prototype


// example
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
}

const person1 = new Person("John", 30);
person1.greet();

// output:
// Hello, my name is John and I am 30 years old.


// prototypal inheritance definition
// prototypal inheritance is a mechanism in which an object can inherit properties and methods from another object.
// example
function Animal(name) {
    this.name = name;
}

Animal.prototype.makeSound = function() {
    console.log("Some generic animal sound");
}

function Dog(name) {
    this.name = name;
}

Dog.prototype = Object.create(Animal.prototype);

const dog = new Dog("Buddy");
dog.makeSound();

// output:
// Some generic animal sound

// prototypal inheritance vs classical inheritance
// prototypal inheritance is a mechanism in which an object can inherit properties and methods from another object.
// classical inheritance is a mechanism in which a class can inherit properties and methods from another class.

// difference between object and prototype
// object is an instance of a class.
// prototype is an object that is used to build other objects and inherit properties and methods.

// difference between constructor and prototype
// constructor is a function that is used to create objects.
// prototype is an object that is used to build other objects and inherit properties and methods.

// difference between constructor and prototype chain
// constructor is a function that is used to create objects.
// prototype chain is a chain of objects that are used to inherit properties and methods.

// define prototype chaining
// prototype chaining is a mechanism in which an object can inherit properties and methods from another object.

// define constructor
// constructor is a function that is used to create objects.

// define constructor function
// constructor function is a function that is used to create objects.

// define constructor property
// constructor property is a property that is used to create objects.

// define constructor property of an object
// constructor property of an object is a property that is used to create objects.

// define constructor property of a function
// constructor property of a function is a property that is used to create objects.

// define constructor property of a class
// constructor property of a class is a property that is used to create objects.

// define constructor property of a class instance
// constructor property of a class instance is a property that is used to create objects.

// define constructor property of a class instance using new keyword
// constructor property of a class instance using new keyword is a property that is used to create objects.

//define function constructor
// function constructor is a function that is used to create objects.

// define function?
// function is a block of code that performs a specific task.

// define class
// class is a blueprint for creating objects.

// define class instance
// class instance is an object that is created from a class.

// define object
// object is an instance of a class.

// define object constructor
// object constructor is a function that is used to create objects.

// define object constructor function
// object constructor function is a function that is used to create objects.

// define object constructor property
// object constructor property is a property that is used to create objects.

// define object constructor property of an object
// object constructor property of an object is a property that is used to create objects.

// define object constructor property of a function
// object constructor property of a function is a property that is used to create objects.

// define object constructor property of a class
// object constructor property of a class is a property that is used to create objects.

// define object constructor property of a class instance
// object constructor property of a class instance is a property that is used to create objects.

// define object constructor property of a class instance using new keyword
// object constructor property of a class instance using new keyword is a property that is used to create objects.


// prototype 
// prototype of array.
Array.prototype.Aman = function() {
    console.log("Aman");
}

let arr = [1, 2, 3];
arr.Aman();

// prototype of object.
Object.prototype.Chai = function(){
    console.log(`Chalo ${this.name} pite hai.`);
}

const obj1 = {
    name: "Herbal Tea"
}
obj1.Chai();

// prototype of function.
Function.prototype.Aman = function() {
    console.log("This function prototype is created by Aman.");
}

function chai(){

}
chai.Aman();

// prototype of string.
String.prototype.Aman = function() {
    console.log("This string prototype is created by Aman.");
}

const str = 'Aman';
str.Aman();

// prototype of number.
Number.prototype.Aman = function() {
    console.log("This number prototype is created by Aman.");
}

const num = 123;
num.Aman();

//----------------------------------------------------------------------------

// const arr5 = [1,2,3,4,5,6];
// if(!Array.prototype.fill)throw new Error("Array.prototype.fill is not defined");
// arr5.fill();
// console.log(arr5);

//----------------------------------------------------------------------------
const arr6 = [1,2,3,4,5,6];
if(!Array.prototype.MyForEach){
    Array.prototype.MyForEach = function(userfn){
        const originalArr = this;
        for(let i = 0; i < originalArr.length; i++){
            userfn(originalArr[i],i);
        }

    };
}
//Error: forEach function does not exist on arr variable.
//Real Signature ko samjho - No return , function input, value, index;

arr6.MyForEach(function(value, index){
    console.log(`value at index ${index} is ${value}`)

});

//----------------------------------------------------------------------------
//signature.map
//return ? - New Array, Each Element Iteration, userFn

if(!Array.prototype.myMap){
    Array.prototype.myMap = function(userFn){
        const result = [];
        for(let i = 0; i < this.length; i++){
            const value = (userFn(this[i],i));
            result.push(value);
        }
        return result;
    }
}
const arr7 = [0,9,8,7,6];
const n = arr7.myMap((e)=>e*2);
console.log(n);
console.log(arr7);
const n2 = arr7.map((e)=>e*3);
console.log(n2);

//----------------------------------------------------------------------------
//filter
//return ? - New Array, Each Element Iteration,input- userfunction
if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userFn){
        const result = [];
        for(let i = 0; i<this.length; i++){
            if(userFn(this[i])){
            result.push(this[i]);
            }
        }
        return result; 
    }
}
const arr8 = [5,4,3,2,1,6,9];
const n3 = arr8.myFilter((e)=>e%3==0);
console.log(n3);
console.log(arr8);

// Object & Prototype

const user = {   // object
    name: "John",
    age: 30
}

const user5 = {   // object
    name: "Jane",
    age: 25
}

user.__proto__ = user2;
console.log(user.age);


// classes
class Person{
    //...schema (Blueprint)

}

// continue in index.js