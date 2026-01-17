// Problem 1: Create an array containing different types of teas.
// Problem 2: Add "Chamomile Tea" to the existing list of teas.
// Problem 3: Remove the "Oolong Tea" from the list of teas.
// Problem 4: Filter the list to only include teas that are caffeinated.
// Problem 5: Sort the list of teas in alphabetical order.
// Problem 6: Use a for loop to print each type of teas in the array.
// Problem 7: Use a for loop to count how many teas are caffeinated. (Excluding hearbal tea)
// Problem 8: Use a for loop to create a new array with all teas names in uppercase.
// Problem 9: Use a for loop to find the tea name with the most characters.
// Problem 10: Use a for loop to reverse the order of teas in the array.

//1
const teas = ["Green Tea", "Black Tea", "Oolong Tea", "White Tea", "Herbal Tea"];
console.log(teas);

//2
teas.push("Chamomile Tea");
console.log(teas);

//3
const index = teas.indexOf("Oolong Tea");
if(index > -1){
    teas.splice(index,1)
}
console.log(teas);

//4
const caffeinatedTeas = teas.filter((tea)=> tea !== "Herbal Tea");
console.log(caffeinatedTeas);

//5
console.log(teas.sort());

//6
for(let i = 0; i < teas.length; i++){
    console.log(teas[i]);
}

//7
let caffeinatedTeaCount = 0;
for(let i = 0; i< teas.length; i++){
    if(teas[i] !== "Herbal tea"){
        caffeinatedTeaCount++;
    }
}
console.log(caffeinatedTeaCount);

//8
const uppercaseTeas = [];
for(let i = 0; i < teas.length; i++){
    uppercaseTeas.push(teas[i].toUpperCase());
}
console.log(uppercaseTeas);

//9
let LongestTea = " ";
for(let i = 0; i < teas.length; i++){
    if(teas[i].length > LongestTea.length){
        LongestTea = teas[i];
    }
}
console.log(LongestTea);

//10
const reversedTeas = [];
for(let i = 0; i<teas.length; i++){
    reversedTeas.push(teas[teas.length -1 -i]);
}
console.log(reversedTeas);