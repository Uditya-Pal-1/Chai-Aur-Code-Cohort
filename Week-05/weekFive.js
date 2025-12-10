//weekFive.js

//alert message to indicate the script is loaded.
alert("This is week 5 JavaScript file!");

//log a message to the console.
console.log("Week 5 script loaded successfully.!");

// A simple function to greet the users.
function greetUser(name){
    return `Hello, ${name}! Welcome to week 5.`;
}
console.log(greetUser("Student"));

//conditional statement weather check
let weather = "rainy";
if (weather === "rainy") {
    console.log("It rains! Don't forget to take an umbrella.");
}else{
    console.log("The weather is clear! Enjoy your day.");
}

// '=' is assignment operator ye kheta hai value ko variable me dal do or assign kar do.
// '==' is equality operator ye check karta hai ki dono value barabar hai ya nahi, type ko ignore karke.
// '===' is strict equality operator ye check karta hai ki dono value aur type dono barabar hai ya nahi.
