function greet (name){
    console.log(`hey good Morning ${name}`)
}
greet("aman")
greet("gagan")
greet("nainsi")



let globalVar = " i am global";

function modifyGlobal(){
    globalVar = 'i am modified'
    let blockScopedVar = 'i am block scoped'
    console.log(blockScopedVar)
}

modifyGlobal();
console.log(globalVar)


// let config = function(){}()  // it is called IEFE - Immediate Envoke Function Expression.
// (()=>{})() // this is also iefe function.


let person1 = {
    name:"aman",
    greet:function(){
        console.log(`Hello ${this.name}`)    // 'this' keyword is context.
    }
}


let person2 = {
    name:"Uditya",
    greet:function(){
        console.log(`Hello ${this.name}`)
    }
}

person1.greet()
person2.greet()

person1.greet.call(person2) // call function direct access the person2 in this case.

// person1.greet.bind(person2); // bind function ik new function return karega
// so  we store bind function in an object 
const bindGreet = person1.greet.bind(person2)
console.log(bindGreet); // it returns a function 
// to print
console.log(bindGreet()); // call the function
// or 
bindGreet() // () use to call that function


let person3 = {
    personName:'ram',
    greet:function(){
        console.log(`Hello ${this.personName}`)
    }
}
person3.greet();

let person4 = {
    personName:'shyam'
}

person3.greet()
person3.greet.call(person4)
person3.greet.call({personName:'Mahesh'}) // passing the context inside call 

