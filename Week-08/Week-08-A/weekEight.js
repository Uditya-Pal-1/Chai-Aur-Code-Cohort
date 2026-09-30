//weekEight.js
//DOM

//alert message to indicate the script is loaded.
// alert("This is week 8 JavaScript file!");

//for quokka extension use in vs code for javascript command is ctrl + k + j.

//log a message to the console.
console.log("Week 8 script loaded successfully.!");

//Introduction to DOM
//DOM is Document Object Model.
Function.prototype.describe = function(){
    console.log(`function name is ${this.name}`);
}
function MasalaChai(){}
function gingerChai(){}
function greet(name){
    return `Hello ${name}`;
}
greet();
greet.describe();
MasalaChai.describe();
gingerChai.describe();

//complete about DOM
//DOM is Document Object Model.
//DOM is a programming interface for HTML and XML documents.
//DOM represents the page so that programs can change the document structure, style, and content.


function add(a,b){
    return a+b;
}
add();

const substract = function(a,b){
    return a-b;
}
substract();

const multiply = (a,b)=>{return a*b};
multiply();

function applyOperation(a,b,operation){
    return operation(a,b);
}
applyOperation(2,3,add);

const result = applyOperation(2,3,(x,y)=>{return x-y});
console.log(result);



// tiffin concept ik function jab bhi call hota hai to uske andar ek function hota hai jisne count ko increment karta hai.
function createCounter(){     
    let count = 0;
    return function(){
        count++;
        return count;
    }
}
const counter = createCounter();
console.log(counter());

function onef(){
    let myName = "Aman";
}
console.log(onef());

// const count = createCount();
// console.log(count());

//DOM is dynamically changing the HTML by using JavaScript with the help of DOM.
//DOM is run on the browser
