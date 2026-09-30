function prepareChai(type){
    if(typeof type != "string"){
        console.log("Error: Please provide a String not a Number or other type.")
        return;
    }
    type = type.toLowerCase();
    if(type==="masala chai"){
        console.log("Adding spices to the chai");
    }else if(type == "regular chai" || type == "black tea"){
        console.log("Preparing :"+ type)
    }
    else{
        console.log("Give the correct name of tea.")
    }
}
prepareChai("Masala Chai");  // Masala chai ik argument hai. 
prepareChai("Black Tea");
prepareChai(123)


// challenge statement
/* Ek online store mein, agar customer ka total bill amount 1000rs se zyada hai, toh 10% discount milta hai. Nhi toh, full amount pay karna padta hai.
*/
function calculateTotal(amount){    // amount is parameter hota hai.
// convert to number kyuki phla kaam hi validation ka hota hai.
if(typeof amount != "number"){
    console.log("Error: Please enter a valid numeric amount.")
    return;
}
amount = Number(amount);
if(amount > 1000){
    let discount=amount*0.10
    let discountedAmount = amount - discount;
    console.log(`Discount: ${discount}, Left Amount: ${discountedAmount}`);
}
else{
    console.log(`Amount is less than 1001rs you not get any discount: ${amount}`)
}
}

calculateTotal(1000)
calculateTotal('10abc')
calculateTotal(2000)


// or
// if(amount>1000){
//     return amount*0.9;

// }
// return amount;

// or 
// return amount > 1000 ? amount*0.9 : amount;  // ternary operator // ? ke baad ka execute hoga jab ham true hai and ? ke pahle wala jab hoga jab false hai. colon (:) ke baad wala else hai.

/* ik traffic light system main, agar light "red" hai, toh "Stop" print karo. "yellow" hai, "Slow down" print karo. agar "green" hai, toh "go" print karo.
*/
function trafficLight(color){
    if(typeof color !="string"){
        console.log("Error: Please enter a valid string value.");
        return;
    }
    color = String(color);
    color = color.toLowerCase();
    switch(color){
        case "red":
        console.log("Stop")
        break; // yaha hm hog return; bhi likh sakte hai same work karega.
        case "yellow":
            console.log("Slow down")
        break;
        case "green":
            console.log("go")
        break;
        default:
            console.log("challan kaat do.");

    }
}

trafficLight("red")
trafficLight("GREEN")
trafficLight("Yellow")
trafficLight("police")

function checkTruthyValue(value){
    if(value){
        console.log("Truthy");
    } else {
        console.log("Falsy");

    }
}

console.log(checkTruthyValue(1));
console.log(checkTruthyValue(0));
console.log(checkTruthyValue("Aman"));
console.log(checkTruthyValue(""));
console.log(checkTruthyValue([]));
console.log(checkTruthyValue([1,2,3]));

function login(username, password,loginIp){
    if(username === 'admin' && (password ==='1234' || loginIp == '127')){
        console.log("login Successful");
    }else {
        console.log("Invalid credentials"); 
    }
}
console.log(login('admin','1234', '123'))
console.log(login('admin','989','127'))
console.log(login('admin','12567','234'))