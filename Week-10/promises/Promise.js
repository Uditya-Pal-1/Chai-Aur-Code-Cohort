
// code with output

// fetch("https://api.freeapi.app/api/v1/public/randomproducts")
// Promise {<pending>}
// console.log("hi")
//  hi
// undefined


// const data = fetch("https://api.freeapi.app/api/v1/public/randomproducts"); 
// console.log("bye")
//  bye
// undefined


// console.log("hi")   ;   
// const data = fetch("https://api.freeapi.app/api/v1/public/randomproducts"); 
// console.log("bye")
//  hi
//  bye
// undefined


// console.log("hi")   ;   
// const data = fetch("https://api.freeapi.app/api/v1/public/randomproducts"); 
// data.then((res)=> console.log("data aagya", res)); 
// console.log("bye"); 
//  hi
//  bye
// undefined
//  data aagya 
// Response {type: 'cors', url: 'https://api.freeapi.app/api/v1/public/randomproducts', redirected: false, status: 200, ok: true, …}

console.log("hi")   ;   
const data = fetch("https://api.freeapi.app/api/v1/public/randomproducts"); 
data.then((res)=> console.log("data aagya", res)); 
console.log("bye"); 
data.catch(function(){console.log("areey yaar")});
data.finally(function(){console.log("me to chalunga ")})
