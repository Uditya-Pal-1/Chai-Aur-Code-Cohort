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

