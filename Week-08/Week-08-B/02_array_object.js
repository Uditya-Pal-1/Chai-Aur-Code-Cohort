let chaiTypes = ["Masala Chai","Herbal Tea","Ginger Chai","Green Tea","Lemon Tea"];
console.log(chaiTypes[2]);
console.log(`Total chai types: ${chaiTypes.length}`);

chaiTypes.push("Black Tea");  // this array method add the value at last position.
chaiTypes.pop();  // this method remove the value from the last position in array.


const data = chaiTypes.pop();
console.log(data); // this show the removed (poped) the value from the array.

let index = chaiTypes.indexOf("Green Tea"); // agar ye value(green tea) nhi hai array me to it gives -1.
// console.log(index); 
if (index != -1){
    chaiTypes.splice(index, 1)
}
console.log(chaiTypes);

chaiTypes.forEach((chai, index)=>{
    console.log(`${index+1}:${chai}`);
});

let moreChaiTypes = ["Oolong Tea","White Tea"]
let allChaiTypes = chaiTypes.concat(moreChaiTypes);

let newChaiTypes = [...chaiTypes, "Chamolina Tea"];
console.log(newChaiTypes);

// object literals
let chaiRecipe={  // object
    name:"masalaChai",  // key value pair
    ingredients:{
        teaLeaves:"assamTea",
        milk:"fullCreamMilk",
        sugar:"BrownSugar",
        spices:["Daalchini","Ginger"]
    },
    instruction:"Boil water, add tea leaves,milk,sugar and spices",
};
console.log(chaiRecipe.ingredients.spices[1]);

let updatedChaiRecepie = {
    ...chaiRecipe,  // spreading
    instruction:"Boil water, add Tea leaves, Milk, Sugar and Spices with some love",
};
console.log(updatedChaiRecepie);

let{name, ingredients} = chaiRecipe;  // object destructuring // we are mapping the name and ingredients from chaiRecipe object. and we only do mapping of the objects.
let[firstChai, secondChai] = chaiTypes;   // array destructuring  // array ke andar sequence fix hota hai fir chahe ham secondChai ka name change hi kyu na kr de output same rahega.

console.log(ingredients)
console.log(firstChai)