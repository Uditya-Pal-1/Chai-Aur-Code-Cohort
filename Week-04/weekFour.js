console.log("this is one.js");

// functions to print chai or code 
function chaiCode(){
    console.log("Chai or Code")
}

// calling the function
chaiCode();

function bringBrush(itnebrush){
    console.log (`Hanji, le aaya ${itnebrush} brush`)
}
bringBrush(5);

//             Basic JavaScript Concepts:

//javascript is object oriented programming language iske andar sab kuch object hota hai.
//javascript is case sensitive language. Variable name me capital letter aur small letter alag alag hote hai.
//javascript me semicolon(;) optional hota hai, lakin use karne se code zyada readable hota hai.
//javascript me comments(//) use kar sakte hai code ko explain karne ke liye.
//javascript me statements line by line execute hote hai.
//javascript me whitespace(space, tab, newline) ignore karte hai.
//javascript me identifiers(variable, function, class name) letters, digits, underscore(_), dollar sign($) se start ho sakte hai, lekin digit se start nahi ho sakte.
//javascript me variables bhaut powerful hote hai, kyunki isme jo chahe wo rakh sakte hai, kyuki ye direct memory se connect hote hai to ye sabkuch store kar sakte hai.
//javascript me variables declare karne ke liye 3 keywords hote hai: var, let, const.
//javascript me data types hote hai: string, number, boolean, null, undefined, object, array.
//javascript me operators hote hai: arithmetic, assignment, comparison, logical, etc.
//javascript me control flow statements hote hai: if, else, switch, for, while, do-while, etc.
//javascript me functions hote hai: function declaration, function expression, arrow function, etc.
//javascript me classes hote hai: class declaration, constructor, methods, inheritance, etc.
//javascript me modules hote hai: export, import, etc.
//javascript me error handling hote hai: try, catch, finally, throw, etc.
//javascript me built-in objects hote hai: Math, Date, String, Array, Object, etc.
//javascript me DOM(Document Object Model) manipulation hote hai: getElementById, querySelector, createElement, appendChild, etc.
//javascript me event handling hote hai: addEventListener, removeEventListener, etc.
//javascript me asynchronous programming hote hai: callbacks, promises, async/await, etc.
//javascript me APIs(Application Programming Interfaces) hote hai: Fetch API, Web Storage API, etc.
//javascript me frameworks aur libraries hote hai: React, Angular, Vue, jQuery, etc.
//javascript me testing hote hai: Jest, Mocha, Chai, etc.
//javascript me debugging hote hai: console.log, debugger, etc.
//javascript me performance optimization hote hai: minification, bundling, caching, etc.
//javascript me security hote hai: XSS, CSRF, etc.
//javascript me best practices hote hai: code readability, code maintainability, code reusability, etc.
//javascript me new features hote hai: ES6, ES7, ES8, etc.
//javascript me community hote hai: Stack Overflow, GitHub, etc.
//javascript me resources hote hai: MDN Web Docs, W3Schools, etc.
//javascript me career opportunities hote hai: front-end developer, back-end developer, full-stack developer, etc.
//javascript me future hote hai: web development, mobile development, desktop development, etc.

// function add to no. and return sum
function add(a,b) {
    return a + b;
}

console.log(add(5, 10)); 
console.log("Addition is:" + add(6, 4));

// let or const RAM ko bolte hai jaghe chaiye thode se. let ki value change kar sakte hai, const is vice versa of let.
//string
let name = "Ram";
console.log(name);

//number
let age = 25;
console.log(age);

//boolean- true or false
let isPaidStudent = true;
console.log(isPaidStudent);

//null- kuch nahi hai
let emptyValue = null;
console.log(emptyValue);

//undefinded- value nahi hai
let notDefined;
console.log(notDefined);

//object- key value pair #variable bole to memory ke andar ki jagah.
let chai = {};
let person = {
    name: "Ram",
    age: 25,
    isPaidStudent: true
};
console.log(person);

//typeof operator- data type check karne ke liye
console.log(typeof name); //string
console.log(typeof age); //number
console.log(typeof isPaidStudent); //boolean
console.log(typeof emptyValue); //object
console.log(typeof notDefined); //undefined
console.log(typeof person); //object

//array- list of values
let fruits = ['apple','banana','mango'];
console.log(fruits);

//array methods
fruits.push('orange'); // add orange at the end
console.log(fruits);
fruits.pop(); // remove last element
console.log(fruits);
fruits.shift(); //remove first element
console.log(fruits);
fruits.unshift('grape'); // add grape at the beginning
console.log(fruits);

//array iteration
fruits.forEach(function(fruits){
    console.log(fruits);
}
);

//array map
let upperFruits = fruits.map(function(fruits){
    return fruits.toUpperCase();
}
);
console.log(upperFruits);

//loops
for(let i = 0; i < 5; i++){
    console.log("loop iteration:" + i);
}

//while loop
let j= 0;
while(j< 5){
    console.log("while loop iteration:" + j);
    j++;
}

//do while loop
let k = 0;
do{
    console.log("do while loop iteration:" + k);
    k++;
}
while(k<5);

//conditional statements  #if  #if-else  #if-else-if  #else
let score = 85;
if(score>= 90){
    console.log("Grade: A");
}else if(score >= 80){
    console.log("Grade: B");
}
else{
    console.log("Grade: C");
}

//switch case
let day = 3;
switch(day){
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log ("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid day");
}

//function- reusable code
function greet() {
    console.log("Hello, Aman!");
}
greet();

//arrow function
const greetArrow = () =>{
    console.log ("hello, Aman from arrow function!");
}
greetArrow();

//class- blueprint for creating objects
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

}
let person1=new Person("Ram", 25);
console.log(person1);
let person2=new Person("Aman", 22);
console.log(person2);

//inheritance- ek class dusri class se properties le sakti hai
class Student extends Person{
    constructor(name, age,studentId){
        super(name,age);
        this.studentId=studentId;
    }
}
let student1= new Student("Shyam", 20, "S123");
console.log(student1);
let student2 = new Student("Geeta", 21, "T132");
console.log(student2);

//module- code ko alag file me organize karne ke liye
export {chaiCode, bringBrush, add};

//import{chaiCode} from './one.js';
//chaiCode();

