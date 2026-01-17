let myArray = [1,4,2,3,5,6];

function sumFac(myArray){
    let sum = 0;
    for(let i = 0; i<myArray.length; i++){
        sum += myArray[i];
    }
    return sum;
}

// let a = sumFac(myArray);
// console.log(a);


//or


console.log(sumFac(myArray));


function totalStar(starlevels){
    let totalStars;
    for(let i = 0; i<=starlevels; i++){
        for(let j = 0; j<=i; j++){
            for(let k = 0; k<=j; k++){
                totalStars = i + j + k;
            }
        }
    }
    return totalStars;
}
console.log(totalStar(5));

let prices = [10,20,30,40,50];
function totalPrice(prices){
    let totalCost = 0;
    for(let i = 0; i<prices.length; i++){
        totalCost += prices[i];
    }
    return totalCost;
}

console.log(totalPrice(prices));