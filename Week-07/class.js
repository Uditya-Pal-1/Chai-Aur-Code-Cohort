class Person{   //this is a class andclass is a blueprint for creating objects.
    constructor(fname,lname){ //this is a constructor and constructor is a function that is used to create objects.
        this.fname = fname; //this is a property and property is a variable that is used to store data.
        this.lname = lname;
    }
    get fullName(){ //this is a method and method is a function that is used to perform a specific task.
        return `${this.fname} ${this.lname}`;
    }
}

const person1 = new Person("Aman","Pal"); //this is an object created from a class.
console.log(person1.fullName); //this is a method call and method call is a function call that is used to perform a specific task.

const p2 = new Person("Uditya","Pal"); //this is an object created from a class.
console.log(p2.fullName); //this is a method call and method call is a function call that is used to perform a specific task.
console.log(p2.__proto__); //this is a prototype and prototype is an object that is used to build other objects and inherit properties and methods.
console.log(p2.fname); //this is a property and property is a variable that is used to store data.


// constructor
// constructor is a function that is used to create objects.

// parameterized constructor
// parameterized constructor is a constructor that takes parameters.

// default constructor
// default constructor is a constructor that does not take any parameters.

// constructor overloading
// constructor overloading is a feature in which a class can have multiple constructors with different parameters.

// constructor method
// constructor method is a method that is used to create objects.

// constructor property
// constructor property is a property that is used to create objects.

// constructor function
// constructor function is a function that is used to create objects.

// constructor function syntax
// constructor function syntax is function constructorName(parameters){
    // code
//}

// inheritance
// inheritance is a mechanism in which a class can inherit properties and methods from another class.

//prototypal inheritance
// prototypal inheritance is a mechanism in which an object can inherit properties and methods from another object.

//prototypal inheritance syntax
// prototypal inheritance syntax is object.__proto__ = object;

//prototype chaining
// prototype chaining is a mechanism in which an object can inherit properties and methods from another object.


// why is js everything is object?
// because in js everything is an object.

const obj = {};                                      //object literal                    //undefined
console.log(obj.__proto__);                         //Object{}                                                //Object
console.log(obj.__proto__.__proto__);              //null                                //null

const arr = [];                                    //array literal                     //Array
console.log(arr.__proto__);                       //Array{}                           //Array
console.log(arr.__proto__.__proto__);            //Object{}                                                   //Object

const str = "";                                    //string literal                    //String
console.log(str.__proto__);                       //String{}                          //String
console.log(str.__proto__.__proto__);            //Object{}                                                  //Object

const num = 123;                                   //number literal                    //Number
console.log(num.__proto__);                       //Number{}                          //Number
console.log(num.__proto__.__proto__);            //Object{}                                                  //Object

const func = function(){};                          //function literal                  //Function
console.log(func.__proto__);                       //Function{}                        //Function
console.log(func.__proto__.__proto__);            //Object{}                                                //Object

const bool = true;                                 //boolean literal                   //Boolean        
console.log(bool.__proto__);                      //Boolean{}                         //Boolean
console.log(bool.__proto__.__proto__);           //Object{}                                                //Object

const date = new Date();                           //date literal                      //Date
console.log(date.__proto__);                      //Date{}                            //Date
console.log(date.__proto__.__proto__);           //Object{}                                                //Object

const error = new Error()   ;                         //error literal                     //Error
console.log(error.__proto__);                        //Error{}                            //Error
console.log(error.__proto__.__proto__);             //Object{}                                            //Object

const math = Math;                                 //math literal                      //Math
console.log(math.__proto__);                      //Math{}                            //Math
console.log(math.__proto__.__proto__);           //Object{}                                              //Object

const regexp = /abc/;                              //regexp literal                    //RegExp
console.log(regexp.__proto__);                    //RegExp{}                        //RegExp
console.log(regexp.__proto__.__proto__);         //Object{}                                             //Object      


// this proves all the things in js are objects.

