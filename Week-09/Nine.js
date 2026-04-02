// Nine.js

// Iteration, Function, Concept part II

let expenses = [
     {description: 'grocery' ,amount: 50 ,category: 'Food' },
     {description: 'electricity',amount: 100 ,category: 'utilities' },
     {description: 'dinner' ,amount: 30 ,category: 'Food' },
     {description: 'internet' ,amount: 50 ,category: 'utilities' },
];
let expenseReport = expenses.reduce((report, expense) =>
     {report[expense.category]+=expense.amount
          return report; 
     },{Food:0, utilities:0});

console.log("Expenses are:", expenseReport);

let tasks = [
     {description:"write report ",completed: false ,priority: 2 },
     {description:"send email ",completed: true ,priority: 3 },
     {description:"prepare presentation ",completed: false ,priority: 1 },
];
