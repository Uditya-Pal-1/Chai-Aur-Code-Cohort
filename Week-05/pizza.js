let numberOfGuest = 4;
let pizzaSize;
//small <= 2
//medium <= 4 
//large <= 6
if (numberOfGuest <=2){
    console.log(`Guest ${numberOfGuest} hai to Small size pizza chahiye.`);
}else if(numberOfGuest<=4){
    console.log(`Guests ${numberOfGuest} hai to Medium size pizza chahiye.`);
}else{
    console.log(`Guest ${numberOfGuest} hai to Large size pizza chahiye.`);
}
 //or

let numOfGuest = 4;
let pizzaSiz;
if(numOfGuest <=2){
    pizzaSiz = "Small";
}else if(numOfGuest <= 5){
    pizzaSiz = "Medium";
}else{
    pizzaSiz = "Large";
}
console.log(pizzaSiz);
console.log(`Guest ${numOfGuest} hai to ${pizzaSiz} size pizza hona chahiye.`);
