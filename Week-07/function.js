//function
//function is a block of code that performs a specific task.

//function is a first class citizen.

//types of functions
//1. named function
//2. anonymous function
//3. arrow function

//named function
function namedFunction(){        // function namedFunction is a named function.
    console.log("Named Function");
}
namedFunction();

//anonymous function
const anonymousFunction = function(){        // function anonymousFunction is an anonymous function.
    console.log("Anonymous Function");
}
anonymousFunction();

//arrow function
const arrowFunction = () => {        // function arrowFunction is an arrow function.
    console.log("Arrow Function");
}
arrowFunction();

//function hoisting
//function hoisting is a feature in which a function can be called before it is declared.

//function expression
//function expression is a function that is assigned to a variable.

//function declaration
//function declaration is a function that is declared using the function keyword.


//function constructor
//function constructor is a function that is used to create objects.

//function constructor syntax
//function constructor syntax is function constructorName(parameters){
    //code
//}


//function constructor example
function Person(fname,lname){
    this.fname = fname;
    this.lname = lname;
}

//------------------------------------------------------------------------------------
const add =(x,y) => {return x+y};
console.log(add(5,10));

const sub = (x,y) => x-y;
console.log(sub(10,5));

arr.map((value)=>{ value * 2});     //map is a higher order function.                           //(value)=>{ value * 2} is a callback function.
//(value) is parameter and { value * 2} is function body.  
//(value)=>{ value * 2} is an arrow function.   
//value * 2 is a function body.