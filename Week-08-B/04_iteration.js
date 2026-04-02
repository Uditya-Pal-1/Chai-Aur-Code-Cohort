let salesData = [   // salesData is an array and {} are object inside array and product: is key, price: is Value
    {product: 'Laptop', price: 1200},
    {product: 'SmartPhone', price: 800},
    {product: 'headphone', price: 150},
    {product: 'keyboard', price: 80},
];

let initialValue = 0;
let totalSales = salesData.reduce((acc, sale) => acc + sale.price, initialValue)   // reduce is a method . (acc, sale) => acc + sale.price this is call back and then put initialValue in it.
console.log(totalSales);

"Aman".toUpperCase().indexOf("a") // this is called piping. and also called chaining.

// q2 ik ye data hai isme jo 50 se km hai use low stock items ko alag nikalo 

let inventory = [
    {name:"Widget A", stock: 30 },
    {name:"Widget B", stock: 120 },
    {name:"Widget C", stock: 45 },
    {name:"Widget D", stock: 70 },
];

let lowStockItems = inventory.filter((item) => item.stock < 50 );
console.log(lowStockItems)

// challenge
let userActivity = [
    {user:"Alice", activityCount: 45},
    {user:"Bob", activityCount: 72},
    {user:"charlie", activityCount: 33},
];
// find most active user using reduce method.

let mostActiveUser = userActivity.reduce((maximUser, user) => 
user.activityCount > maximUser.activityCount ? user : maximUser
);

console.log(mostActiveUser);