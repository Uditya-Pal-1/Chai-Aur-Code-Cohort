// Nine.js

// Iteration, Function, Concept part II

let expenses = [
     { description: 'grocery', amount: 50, category: 'Food' },
     { description: 'electricity', amount: 100, category: 'utilities' },
     { description: 'dinner', amount: 30, category: 'Food' },
     { description: 'internet', amount: 50, category: 'utilities' },
]
let expenseReport = expenses.reduce(
     (report, expense) => {
          report[expense.category] += expense.amount
          return report
     },
     { Food: 0, utilities: 0 }
)

console.log('Expenses are:', expenseReport)



//q2

let tasks = [
     { description: 'write report ', completed: false, priority: 2 },
     { description: 'send email ', completed: true, priority: 3 },
     { description: 'prepare presentation ', completed: false, priority: 1 },
]

let pendingSortedTasks = tasks
     .filter((task) => !task.completed )
     .sort((a,b) => a.priority - b.priority);

console.log(pendingSortedTasks);



//q3

let movieRatings = [
     {title: " Movie A", rating:[ 4, 5, 3] },
     {title: " Movie B", rating:[ 5, 5, 4] },
     {title: " Movie C", rating:[ 3, 4, 2] }, 
];

let averageRatings = movieRatings.map(movie =>
      {
          let sum = movie.rating.reduce((acc, item)=> acc + item, 0)
          let avg = sum / movie.rating.length;
          return {
               movie: movie.title,
               avgRating:parseFloat(avg.toFixed(2))
          }
      }).sort((a,b)=>a.avgRating-b.avgRating);

console.log(averageRatings);
