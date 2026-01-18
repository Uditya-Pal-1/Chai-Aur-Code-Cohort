// Question 1: Create  an object represent a type of tea with properties for name, price, and caffine content.
// Question 2: Access and print the name and type properties of the tea object.
// Question 3: Add a new propeties origin to the tea object.
// Question 4: Change the caffeine level of the tea object to "medium".
// Question 5: Remove the type property from the tea object.
// Question 6: Check if the tea object has a property origin.
// Question 7: Use a for...in loop to print all the properties of the tea object.
// Question 8: Create a nested object to represent different types of teas and their properties.
// Question 9: Create a copy of the tea object.
// Question 10: Add a custom method describe to the tea object that returns a description string.
// Question 11: Merge two objects representing different teas into  one.

// 1.
const teas = {
    name:"Green Tea",
    type:"Good for health",
    price:100,
    caffeine:"Normal"
}
console.log(teas)
// 2.
console.log(teas.name)
console.log(teas.type)
// 3.
teas.origin="China"
console.log(teas);
// 4.
teas.caffeine = "Medium"
console.log(teas.caffeine)
// 5.
delete teas.type
console.log(teas)
// 6.
console.log("origin" in teas)
// 7.
for (let key in teas){
    console.log(key, teas[key])
}
// 8.
const myTeas = {
    greenTea:{
        name:"Green Tea",
        type:"Good for health",
        price:100,
        caffeine:"Normal"
    },
    blackTea:{
        name:"Black Tea",
        type:"Not Good for health",
        price: 200,
        caffeine:"High"

    }
}
console.log(myTeas)
// 9.
const copyTeas = {...teas}
console.log(copyTeas)
// 10.
teas.describeTea = function(){
    return`${this.name} is ${this.type}`
}
console.log(teas.describeTea())
// 11.
const tea1 = {
    name:"Green Tea",
    type: "good for health",
    price:100,
    caffeine:"Normal"
}
const tea2 = {
    name:"Black Tea",
    type: "Not good for health",
    price:200,
    caffeine:"High"
}
const mergedTeas = [tea1, tea2];
console.log(mergedTeas)