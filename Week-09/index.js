
const obj = {
    personName:'Modak',
    greet:function(){
        console.log(`Hello, ${this.personName}`)
    }
}
obj.greet();
setTimeout(obj.greet.bind(obj), 5*1000); // it shows-' Hello, undefined' .    minimum time to 10s wait rahega.
setTimeout(()=>console.log('A 2 S'),0); // it runs after all code run those not have any setTimeout property;
console.log('hello');

const a=12;
const b=23;
console.log('sum', a+b);

setTimeout(function(){console.log('yeeeeee')},3000) // setTimeout take 2 parameters . 1st is callback function and 2nd is time in milliseconds.

console.log('bye bye');


Promise.resolve().then(()=> console.log("promise resolve hogya"));


const age = 25;
console.log("age is ", age);

test();
function test() {
    console.log("i am inside fn")

}
console.log("ages is ", Ages);
var Ages = 24;
