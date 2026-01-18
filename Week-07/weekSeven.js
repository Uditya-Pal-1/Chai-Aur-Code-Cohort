//weekSeven.js
//Objects and Prototypes.

//alert message to indicate the script is loaded.
// alert("This is week 7 JavaScript file!");

// for quokka extension use in vs code for javascript command is ctrl + k + j.

//log a message to the console.
console.log("Week 7 script loaded successfully.!");

const x = 10;
console.log(x * x);

const person = {
    FristName: "Uditya",
    LastName: "Pal",
    Age: 20,
    hobbies: ["Coding", "Gaming", "Reading", "Traveling"],
    isMarried: false,
    hasGf: false,
    getFullName: function () {
        return `${this.FristName} ${this.LastName}`
    },
    address:{
        houseNo:123,
        street:"Main Street",
        city:"Auraiya",
        state:"Uttar Pradesh",
        pincode:206246,
        country:"India"
    }
}
console.log(person)
console.log(person.getFullName())
console.log(person.address)
console.log(person.address.city)
console.log(person.address.country)

// Objects in js
// define --  objects is a collection of key value pairs.
// objects are used to store data in key value pairs.
// type of objects is object.
//there are two ways to create objects in js.
// 1. object literal
// 2. object constructor

// object literal define -- object literal is a way to create objects in js.
// object literal syntax -- const objectName = {key1: value1, key2: value2, ...};

// object constructor define -- object constructor is a way to create objects in js.
// object constructor syntax -- const objectName = new Object();

//2 types of objects in js.
// 1. primitive objects
// 2. non primitive objects

// primitive objects define -- primitive objects are objects that are created using object literal. (Built-in objects)
// primitive objects are also called as object literals. and primitive objects are like -- array, function, string, number, boolean, object etc.
// primitive objects syntax -- const objectName = {key1: value1, key2: value2, ...};

// non primitive objects define -- non primitive objects are objects that are created using object constructor. (User defined objects)
// non primitive objects are also called as object constructor. and non primitive objects are like -- array, function, string, number, boolean, object etc.
// non primitive objects syntax -- const objectName = new Object();

// object properties define -- object properties are the values associated with the keys in an object.
// object properties syntax -- objectName.propertyName = value;

// object methods define -- object methods are the functions associated with the keys in an object.
// object methods syntax -- objectName.methodName = function() { ... };

// object properties access -- objectName.propertyName
// object properties delete -- delete objectName.propertyName 

// object methods access -- objectName.methodName()
// object methods delete -- delete objectName.methodName

// -----------------------------------------------------------------------------------------------
const fName = "Aman"
const fName2 = fName;
console.log(fName)
console.log(fName2)

// fName2 ="Uditya"  // trow an error is Assignment to constant variable.

let lName = "Baghel"
let lName2 = lName
console.log(lName)
console.log(lName2)

lName2 = "Pal"
console.log(lName)
console.log(lName2)

// -----------------------------------------------------------------------------------------------
// objects are passed by reference. here p1 and p2 are pointing to the same memory location. so these are reference variables.
let p1 = {
    fname:'Aman'
}
let p2 = p1
console.log(p2)

p2.fname = "Uditya"
console.log(p1)
console.log(p2)

// -----------------------------------------------------------------------------------------------
let a1={
    fname:"Ashwani",
    lname:"Pal"
}
let a2= {         // or let a2 = { ...a1} this is similar to spread operator. (... operator) make shallow copy. it is pass by reference--address copy hota hai.
    fname:a1.fname,
    lname:a1.lname
}
a2.fname="Gagan"
a2.lname="Pal"
console.log(a1)
console.log(a2)