// Array
// definition: A data structure that can store multiple values of different data types in a single variable.

// syntax: let arrayName = [value1, value2, value3, ...];

// example:
let fruits = ["apple", "banana", "orange", "mango"];
console.log(fruits);

// accessing elements
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);

// adding elements
fruits.push("grapes");
console.log(fruits);

// removing elements
fruits.pop();
console.log(fruits);

// length of array
console.log(fruits.length);

// iterating through array
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// All properties of array
console.log(fruits.constructor);
console.log(fruits.prototype);
console.log(fruits.length);
console.log(fruits.constructor.name); 

// All methods of array
console.log(fruits.push("grapes"));
console.log(fruits.pop());
console.log(fruits.shift());
console.log(fruits.unshift("apple"));
console.log(fruits.splice(1, 2));
console.log(fruits.slice(1, 2));
console.log(fruits.concat(["grapes", "mango"]));
console.log(fruits.join(", "));
console.log(fruits.reverse());
console.log(fruits.sort());
console.log(fruits.map((fruit) => fruit.toUpperCase()));
console.log(fruits.filter((fruit) => fruit.length > 5));
console.log(fruits.reduce((acc, fruit) => acc + fruit, ""));
console.log(fruits.forEach((fruit) => console.log(fruit)));
console.log(fruits.every((fruit) => fruit.length > 5));
console.log(fruits.some((fruit) => fruit.length > 5));
console.log(fruits.find((fruit) => fruit.length > 5));
console.log(fruits.findIndex((fruit) => fruit.length > 5));
console.log(fruits.includes("grapes"));
console.log(fruits.indexOf("grapes"));
console.log(fruits.lastIndexOf("grapes"));
console.log(fruits.copyWithin(1, 2));
console.log(fruits.fill("grapes", 1, 2));
console.log(fruits.flat());
console.log(fruits.flatMap((fruit) => fruit.toUpperCase()));
console.log(fruits.at(1));
console.log(fruits.at(-1));
console.log(fruits.at(-2));
console.log(fruits.at(-3));
console.log(fruits.at(-4));
console.log(fruits.at(-5));



//question
let fal = ["apple", "charry", "banana"];
console.log(fal);
let intFruits = new Array("kiwi","avacardo","dragonFruit");
console.log(intFruits)
console.log(fal.length)
fal[0] = "blueberry";
console.log(fal)
console.log(typeof fal);
fal.push('mango');
console.log(fal);
fal.unshift('water melon');
console.log(fal);
fal.pop();
console.log(fal);

