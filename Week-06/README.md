<div>
<h1 align="center">☕ Week-06 — Functions & Arrays</h1>
<p align="center"><i>The week JavaScript stopped being a stranger and became a superpower.</i></p>
<br/>
<div align="center">
  <img src="./pose2.jpeg" alt="Chai Aur Code Cohort Pose" width="750" style="border-radius: 10px;" />
</div>

---
</div>

<div align="center" dir="auto">

[![](https://img.shields.io/badge/Twitter-ffffff?style=flat&logo=x&logoColor=black)](https://x.com/Aman_Pal_1)
[![](https://img.shields.io/badge/LinkedIn-E4405F?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udityapal)
[![](https://img.shields.io/badge/hello-d62d20?style=flat&logo=gmail&logoColor=white)](mailto:udityapal2024@gmail.com)

[![](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 The Story So Far…

> *Five weeks in, and the syntax was starting to feel familiar—variables whispered their values, loops hummed along like clockwork. But something was missing. The code worked, sure, but it was **flat**. Every program read like one long, tangled monologue.*
>
> *Then came Week 06.*
>
> *This was the week we learned to **organize chaos**—to carve logic into reusable **functions**, and to wrangle collections of data with **arrays**. Suddenly, programs weren't monologues anymore. They were **conversations** between tiny, purposeful blocks of code, each one doing exactly one thing and doing it well.*
>
> *By the end of this week, the question changed from "Can I make this work?" to **"How elegantly can I make this work?"** ☕*

---

## 🎯 What This Week Covers

| # | Topic | File | Description |
|---|-------|------|-------------|
| 1 | **JavaScript Functions — The Complete Guide** | [`Functions.js`](./Functions.js) | All 10 types of functions, parameters, return values, defaults, rest & destructuring |
| 2 | **Arrays — Methods & Mastery** | [`weekSix.js`](./weekSix.js) | Array creation, CRUD operations, and every built-in method you'll ever need |
| 3 | **Tea Collection Challenge** 🍵 | [`Questions.js`](./Questions.js) | 10 hands-on problems solved with arrays and loops |
| 4 | **Sum, Stars & Shopping** | [`sum.js`](./sum.js) | Practical functions — array summation, nested loop patterns, price calculators |
| 5 | **Live HTML Playground** | [`index.html`](./index.html) | A browser-ready page wired to the scripts for instant testing |

---

## 🔥 Functions — The Heart of JavaScript

Week 06 didn't just introduce functions—it dissected **every single flavour** of them. Here's the arsenal we built:

```
 ┌──────────────────────────────────────────────────────┐
 │              🛠️  10 Types of Functions               │
 ├──────────────────────────────────────────────────────┤
 │  1. Function Declaration     6. Generator Function   │
 │  2. Function Expression      7. Async Function       │
 │  3. Arrow Function           8. Method               │
 │  4. IIFE                     9. Callback Function    │
 │  5. Constructor Function    10. Higher-Order Function │
 └──────────────────────────────────────────────────────┘
```

### ✨ Key Concepts Explored

- **Parameters vs Arguments** — finally understanding the difference that trips up every beginner
- **Return Values** — making functions give back results, not just log them
- **Default Parameters** — graceful fallbacks when no argument is passed
- **Rest Parameters (`...rest`)** — accepting an unlimited number of arguments like a pro
- **Destructured / Named Parameters** — writing self-documenting function calls with objects
- **Combining it all** — default values + rest params + destructuring in a single signature

> 💡 **"A function should do one thing, do it well, and do it only."** — The golden rule that clicked this week.

---

## 📦 Arrays — Taming Collections

Arrays went from "just a list" to an entire **Swiss Army knife** of data manipulation. We explored:

### 🔧 Core Operations
```javascript
// Create
let fruits = ["apple", "banana", "orange", "mango"];

// Add & Remove
fruits.push("grapes");     // → end
fruits.unshift("kiwi");    // → start
fruits.pop();              // ← end
fruits.shift();            // ← start
```

### 🚀 Every Method That Matters
We didn't stop at `push` and `pop`. We went through the **entire** Array API:

| Category | Methods |
|----------|---------|
| **Mutating** | `push`, `pop`, `shift`, `unshift`, `splice`, `reverse`, `sort`, `fill`, `copyWithin` |
| **Non-Mutating** | `slice`, `concat`, `join`, `flat`, `flatMap`, `at` |
| **Searching** | `indexOf`, `lastIndexOf`, `includes`, `find`, `findIndex` |
| **Iteration** | `forEach`, `map`, `filter`, `reduce`, `every`, `some` |

---

## 🍵 The Tea Collection Challenge

The best part of this week? **Solving real problems.** Ten challenges, one theme — *tea* — and a whole lot of array mastery:

```
 Problem 1  → Create a diverse tea collection array
 Problem 2  → Add "Chamomile Tea" to the shelf
 Problem 3  → Remove "Oolong Tea" (splice + indexOf combo!)
 Problem 4  → Filter only caffeinated teas
 Problem 5  → Sort the collection alphabetically
 Problem 6  → Print every tea with a classic for loop
 Problem 7  → Count caffeinated teas (excluding herbal)
 Problem 8  → Transform all names to UPPERCASE
 Problem 9  → Find the tea with the longest name
 Problem 10 → Reverse the entire collection manually
```

> *Each problem was a small victory. By Problem 10, arrays felt less like data structures and more like **old friends.***

---

## 🧮 Practical Functions in Action

### Array Summation
```javascript
function sumFac(myArray) {
    let sum = 0;
    for (let i = 0; i < myArray.length; i++) {
        sum += myArray[i];
    }
    return sum;
}
console.log(sumFac([1, 4, 2, 3, 5, 6])); // → 21
```

### Nested Loop Star Pattern ⭐
A triple-nested loop that calculates cumulative star levels — the kind of problem that makes you *think* in dimensions.

### Shopping Cart Total 🛒
```javascript
function totalPrice(prices) {
    let totalCost = 0;
    for (let i = 0; i < prices.length; i++) {
        totalCost += prices[i];
    }
    return totalCost;
}
console.log(totalPrice([10, 20, 30, 40, 50])); // → 150
```

---

## 📂 Project Structure

```
Week-06/
├── 📄 index.html         → Browser playground with linked scripts
├── 📜 Functions.js        → Complete guide to all 10 function types
├── 📜 weekSix.js          → Array deep-dive with every method explored
├── 📜 Questions.js        → 10 tea-themed array challenges (solved!)
├── 📜 sum.js              → Practical function exercises
├── 🖼️ chai-cohort.ico     → Favicon for the cohort
└── 📘 README.md           → You are here ☕
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Uditya-Pal/Chai-Aur-Code-Cohort.git

# Navigate to Week 06
cd Chai-Aur-Code-Cohort/Week-06

# Option 1 — Open in browser
# Simply open index.html in your favourite browser and check the console (F12)

# Option 2 — Run with Node.js
node Functions.js
node weekSix.js
node Questions.js
node sum.js
```

---

## 🧠 Key Takeaways

```
 ╔══════════════════════════════════════════════════════════════╗
 ║  ✅ Functions turn spaghetti code into modular poetry       ║
 ║  ✅ Arrow functions aren't just shorter — they're smarter   ║
 ║  ✅ IIFE keeps the global scope clean and pristine          ║
 ║  ✅ Arrays are THE most versatile data structure in JS      ║
 ║  ✅ .map(), .filter(), .reduce() — the holy trinity         ║
 ║  ✅ Destructuring makes function calls self-documenting     ║
 ║  ✅ Nested loops unlock multi-dimensional thinking          ║
 ╚══════════════════════════════════════════════════════════════╝
```

---

## 🌟 What's Next?

> *Week 06 gave us the **building blocks**. Functions and arrays are the foundation that everything else — DOM manipulation, API calls, async patterns — will stand on. The code isn't just running anymore; it's **organized, reusable, and elegant**.*
>
> *The journey continues. The chai is still warm. ☕*

---

<div align="center">

**Made with ❤️ and mass amounts of ☕ by [Uditya Pal](https://github.com/Uditya-Pal)**

*Part of the [Chai Aur Code](https://www.youtube.com/@chaiaurcode) Cohort — Learning JavaScript, one sip at a time.*

</div>