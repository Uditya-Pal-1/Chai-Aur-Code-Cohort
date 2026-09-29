<div align="center">
  <h1>🚀 Week-09: Unlocking the Inner Mechanics of JavaScript</h1>
  <p><b>Chai Aur Code Web Development Cohort</b> • <i>A deep-dive into Array Pipelines, Context Binding, Async Mechanics & Event Loops!</i></p>

  [![](https://img.shields.io/badge/Twitter-ffffff?style=flat&logo=x&logoColor=black)](https://x.com/Aman_Pal_1)
  [![](https://img.shields.io/badge/LinkedIn-E4405F?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udityapal)
  [![](https://img.shields.io/badge/Gmail-d62d20?style=flat&logo=gmail&logoColor=white)](mailto:udityapal2024@gmail.com)
  [![](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
  [![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

<hr />

## 📸 Cohort Moment: Its Pose Time!! 😀

<div align="center">
  <img src="./web dev cohort pose.jpeg" alt="Web Dev Cohort Pose" width="750" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <p><i>Celebrating consistency, code, and camaraderie in the Chai Aur Code Cohort! ☕🔥</i></p>
</div>

<hr />

## 📖 The Week 9 Storyline: *Under the Hood of the JavaScript Engine*

> *"Write code that humans can understand, but learn how the runtime engine thinks!"*

Welcome to **Week 9** of the **Chai Aur Code Cohort**! ☕⚡ 

Imagine walking into a workshop where, up until now, you've been driving a fast car (JavaScript). But in Week 9, Hitesh Sir pops open the hood and reveals the intricate gearing beneath: the **Call Stack**, the **Event Loop**, **Microtask vs Macrotask queues**, and the mysterious behavior of the `this` keyword!

This week wasn't just about writing code; it was about conquering the runtime. We transformed raw array data into dynamic reports using functional pipelines, demystified execution context binding with `.call()` and `.bind()`, and mastered the secret timing of `Promise.resolve()` vs `setTimeout()`.

Buckle up as we journey through the concepts, algorithms, and practical snippets mastered during this epic week! 🎯

---

## 🛠️ Key Technical Modules Covered

### 1️⃣ Advanced Array Pipelines & Data Transformation (`Nine.js`)
Functional programming patterns were put to work to process real-world data structures efficiently:
* **Expense Aggregation**: Using `reduce()` to dynamically sum expenses by custom category (`Food`, `utilities`).
* **Task Prioritization Engine**: Filtering uncompleted tasks and sorting them seamlessly by priority level using `.filter()` & `.sort()`.
* **Movie Rating Analytics**: Mapping over movie rating arrays, calculating precision averages via `reduce()`, and ranking movies dynamically.

```js
// Example: Computing average movie ratings & sorting
let movieRatings = [
  { title: "Movie A", rating: [4, 5, 3] },
  { title: "Movie B", rating: [5, 5, 4] },
  { title: "Movie C", rating: [3, 4, 2] },
];

let averageRatings = movieRatings
  .map(movie => {
    let sum = movie.rating.reduce((acc, item) => acc + item, 0);
    return {
      movie: movie.title,
      avgRating: parseFloat((sum / movie.rating.length).toFixed(2))
    };
  })
  .sort((a, b) => a.avgRating - b.avgRating);
```

---

### 2️⃣ Scopes, Context & Explicit Binding (`functions.js`)
Understanding how JavaScript determines context and variable visibility:
* **Global vs. Block Scope**: Observing how function mutations affect global variables vs block-scoped identifiers.
* **The `this` Keyword & Execution Context**: Discovering how method context is bound to objects during execution.
* **Explicit Context Hijacking with `.call()` and `.bind()`**:
  * `.call(targetObj)`: Instantly executes a function with a redefined `this` context.
  * `.bind(targetObj)`: Creates and returns a fresh function bound to the specified object context for later execution.

```js
let person1 = {
  name: "Aman",
  greet: function() { console.log(`Hello ${this.name}`); }
};

let person2 = { name: "Uditya" };

// Direct execution vs Explicit context binding
person1.greet();                // Output: Hello Aman
person1.greet.call(person2);    // Output: Hello Uditya

const boundGreet = person1.greet.bind(person2);
boundGreet();                   // Output: Hello Uditya
```

---

### 3️⃣ Asynchronous JavaScript, Event Loop & Hoisting (`index.js`)
Unraveling JavaScript's single-threaded asynchronous nature:
* **The Event Loop & Task Queues**:
  * **Microtasks (`Promise.resolve()`)** take priority over **Macrotasks (`setTimeout`)**.
  * Synchronous code executes immediately on the Call Stack before any queue is drained.
* **Context Preservation in Asynchronous Callbacks**: Fixing lost `this` bindings inside timer callbacks using `.bind()` or arrow functions.
* **Variable & Function Hoisting**: Analyzing how `var` declarations are hoisted with `undefined` while function declarations are hoisted completely.

```js
// Event Loop Order Demonstration
console.log('Synchronous: Start');

setTimeout(() => console.log('Macrotask: setTimeout'), 0);
Promise.resolve().then(() => console.log('Microtask: Promise.resolve'));

console.log('Synchronous: End');

// Execution Output Sequence:
// 1. Synchronous: Start
// 2. Synchronous: End
// 3. Microtask: Promise.resolve
// 4. Macrotask: setTimeout
```

---

### 4️⃣ JavaScript Foundation Speed Drills (`speedjs/`)
A rapid-fire series of modular scripts covering foundational concepts:
* `01_variables_datatypes.js`: Primitive vs Reference types.
* `02_array_object.js`: Structural data manipulations.
* `03_if_else.js`: Conditional branches & logical checks.
* `04_iteration_1.js` & `04_iteration_2.js`: Loop paradigms (`for`, `while`, `for...of`).
* `05_functions.js`: Core function declarations & expressions.

---

## 📂 Workspace File Structure

```text
Week-09/
├── 📄 index.html                # Entry web page structure for DOM & script testing
├── 📜 index.js                  # Asynchronous event loop, promises, timers & hoisting drills
├── 📜 functions.js              # Scopes, IIFE, this context, call() & bind() explorations
├── 📜 Nine.js                   # High-order array functions (reduce, map, filter, sort)
├── 🖼️ web dev cohort pose.jpeg   # Memorable cohort snapshot!
└── 📁 speedjs_lyst1740379581234/
    └── 📁 speedjs/              # Core JS quick-reference drills & fundamentals
```

---

## ⚡ How to Run & Explore

### Option 1: Running in Node.js Environment
Execute any script directly via Node.js terminal commands:
```bash
node index.js
node functions.js
node Nine.js
```

### Option 2: Browser Environment
Open `index.html` in your browser (or use **VS Code Live Server**) and inspect the developer tools console (`F12` or `Ctrl + Shift + I`) to trace execution output!

---

## 💡 Key Takeaways & Pro-Tips

> [!TIP]
> **Context Loss Warning**: Passing an object method directly into `setTimeout(obj.greet, 1000)` causes `this` to point to `window`/`global` (yielding `undefined`). Always wrap it in an arrow function `() => obj.greet()` or explicit binding `obj.greet.bind(obj)`!

> [!IMPORTANT]
> **Microtask Priority**: Promises always execute before timers! Even a `setTimeout(..., 0)` will yield to a resolved `Promise.then()` microtask.

---

<div align="center">
  <h3>✨ Built with passion & chai during the Chai Aur Code Cohort ✨</h3>
  <p><i>Star ⭐ this repo if you find the JavaScript drills and explanations helpful!</i></p>
</div>

