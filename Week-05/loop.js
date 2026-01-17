// loops in js
//loop ka ik or name hai -- iteration
// for loop
// while loop
// do while loop
// for of loop
// for in loop
// for each loop
// break
// continue


// loop -- loop is a block of code that is executed repeatedly.


// definition of for loop -- for loop is a control flow statement for
// syntax of for loop -- for(initialization; condition; increment/decrement){
//     code to be executed
// }


//definition of while loop -- while loop is a control flow statement while
// syntax of while loop -- while(condition){
//     code to be executed
// }


//definition of do while loop -- do while loop is a control flow statement do while
// syntax of do while loop -- do{
//     code to be executed
// }while(condition);


//definition of for of loop -- for of loop is a control flow statement for of
// syntax of for of loop -- for(variable of iterable){
//     code to be executed
// }


//definition of for in loop -- for in loop is a control flow statement for in
// syntax of for in loop -- for(variable in object){
//     code to be executed
// }


//definition of for each loop -- for each loop is a control flow statement for each
// syntax of for each loop -- array.forEach(function(currentValue, index, arr), thisValue)


//definition of break -- break is a control flow statement break
// syntax of break -- break;


//definition of continue -- continue is a control flow statement continue
// syntax of continue -- continue;

let teas = ['masala','ginger','green','oolong','orange','rose','lemon'];
teas.length;
let h = 5;
teas[h];

// //1st variable leke aao. jese h = "Aman";
// for (let h = "Aman"){

// }

// //2nd limit lagao. jese kitni bar chalna hai , h < teas.length
// for (let h = 0; h < teas.length){

// }

// //3rd increment ya decrement lagao. jese h++
// for(let h =0; h < teas.length; h++){
    
// }


for(let h =0; h < teas.length; h++){
    console.log(`teas at index ${h}: ${teas[h]} Chai hai.`)
}


// while loop
let i = 0;
while(i < 5){
    console.log(i);
    i++;
}


// do while loop
let j = 0;
do{
    console.log(j);
    j++;
}while(j < 5);


// for of loop
for(let tea of teas){
    console.log(tea);
}


// for in loop
for(let tea in teas){
    console.log(tea);
}


// for each loop
teas.forEach(function(tea){
    console.log(tea);
})


// break
for(let i = 0; i < 10; i++){
    if(i === 5){
        break;
    }
    console.log(i);
}


// continue
for(let i = 0; i < 10; i++){
    if(i === 5){
        continue;
    }
    console.log(i);
}


// break and continue
for(let i = 0; i < 10; i++){
    if(i === 5){
        break;
    }
    console.log(i);
}


for(let i = 0; i < 10; i++){
    if(i === 5){
        continue;
    }
    console.log(i);
}

