<div>
<h1 align="center">☕ Week-07 — Objects, Prototypes & Classes</h1>
<p align="center">
<em>"The week I stopped writing code… and started <strong>architecting</strong> it."</em>
</p>
<br/>

<div align="center">
  <img src="./pose3.jpeg" alt="Chai Aur Code Cohort Pose" width="750" style="border-radius: 10px;" />
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

> Six weeks in — loops conquered, arrays tamed, functions befriended. I was feeling confident. And then **Week 7** dropped, and JavaScript whispered:
>
> *"You think you know me? Let me show you what's really under the hood."*
>
> This was the week where variables stopped being just containers and became **living, breathing entities** connected through invisible chains called **prototypes**. Where I discovered that *everything* — every string, every number, every humble array — secretly answers to a single ancestor: `Object.prototype`. Where I learned to stop copy-pasting code and start building **blueprints** with **classes**.
>
> This wasn't just another week of coding. This was the week I peeled back the curtain and saw the **engine of JavaScript itself**.

---

## 🎯 What This Week Covers

| # | Topic | Mind-Blown Level |
|---|-------|:---:|
| 1 | Objects — creation, access, nesting, methods | 🌟🌟🌟 |
| 2 | Pass by Value vs. Pass by Reference | 🌟🌟🌟🌟 |
| 3 | Prototypes — the hidden `__proto__` chain | 🌟🌟🌟🌟🌟 |
| 4 | Prototypal Inheritance — `Object.create()` | 🌟🌟🌟🌟 |
| 5 | Custom Prototypes — extending built-in types | 🌟🌟🌟🌟🌟 |
| 6 | Polyfills — `myForEach`, `myMap`, `myFilter` | 🌟🌟🌟🌟🌟 |
| 7 | Functions — named, anonymous, arrow, hoisting | 🌟🌟🌟 |
| 8 | Classes & Constructors — the modern blueprint | 🌟🌟🌟🌟 |
| 9 | Getter Methods — computed properties | 🌟🌟🌟 |
| 10 | Everything is an Object — the ultimate proof | 🌟🌟🌟🌟🌟 |

---

## 📂 Project Structure

```
Week-07/
│
├── 📄 index.html           → Entry point — Week 7 landing page
├── 🎨 style.css             → Dark-themed styling for the HTML page
├── 🖼️ chai-cohort.ico       → Favicon — the Chai Cohort brand
│
├── 📜 weekSeven.js          → 🏁 Starting point: Objects 101 & reference vs value
├── 📜 prototype.js          → 🧬 Deep dive into prototypes, chaining & polyfills
├── 📜 function.js           → ⚡ Functions: named, anonymous, arrow & constructors
├── 📜 class.js              → 🏗️ Classes, constructors & "everything is an object"
├── 📜 index.js              → 🔧 Getter methods & the DRY principle realization
├── 📜 remote.js             → 🎮 Real-world object modeling (a TV remote!)
├── 📜 QuestionsWeek7.js     → ❓ 11 hands-on practice problems with solutions
│
└── 📄 README.md             → 📖 You're reading it right now!
```

---

## 🗂️ File-by-File Breakdown

### 🏁 [`weekSeven.js`](weekSeven.js) — Where It All Begins

The opening chapter. This file introduces **objects** — the most fundamental building block in JavaScript.

**What I learned here:**
- 🔑 Creating objects with key-value pairs (object literals)
- 🏠 Nested objects — because real data is *never* flat (just like my `address` object with `houseNo`, `street`, `city`, `state`, and `pincode`)
- 🎯 Accessing deep properties with dot notation (`person.address.city`)
- 📋 Object types: primitives vs. non-primitives
- 🔗 The shocking truth about **pass by reference** — change `p2.fname` and `p1.fname` changes too!
- 📦 Shallow copies with the spread operator (`{ ...a1 }`)

```javascript
// The moment reference types clicked 💡
let p1 = { fname: 'Aman' }
let p2 = p1
p2.fname = "Uditya"
console.log(p1) // { fname: "Uditya" } — WAIT, WHAT?! 🤯
```

---

### 🧬 [`prototype.js`](prototype.js) — The Rabbit Hole

This is the **heart** of Week 7. The file that changed how I see JavaScript forever.

**What I learned here:**
- 🔗 Every object has a hidden `__proto__` link to its prototype
- 🏗️ Constructor functions and `Person.prototype.greet`
- 🐕 Prototypal inheritance — making `Dog` inherit from `Animal` via `Object.create()`
- 🎨 Extending built-in prototypes — adding custom methods to `Array`, `String`, `Number`, `Function`, and `Object`
- ⚒️ **Building polyfills from scratch** — the crown jewel of this file:

| Polyfill | What It Does | Key Insight |
|----------|-------------|-------------|
| `MyForEach()` | Iterates without returning | `this` refers to the calling array |
| `myMap()` | Transforms each element into a new array | Must `push` results and `return` the new array |
| `myFilter()` | Filters elements by condition into a new array | Only `push` when `userFn()` returns `true` |

```javascript
// My custom forEach — built from pure understanding 💪
Array.prototype.MyForEach = function(userfn) {
    const originalArr = this;
    for (let i = 0; i < originalArr.length; i++) {
        userfn(originalArr[i], i);
    }
};
```

> *Building `myMap` and `myFilter` by hand was the moment prototypes stopped being theory and became power.*

---

### ⚡ [`function.js`](function.js) — Functions Unmasked

A crisp exploration of how JavaScript treats functions as **first-class citizens**.

**What I learned here:**
- 📝 **Named functions** — declared with the `function` keyword
- 🎭 **Anonymous functions** — assigned to variables, no identity of their own
- ➡️ **Arrow functions** — sleek, concise, and modern
- 🏗️ **Function constructors** — the bridge between functions and objects
- 🔼 **Hoisting** — why you can call named functions before they're declared
- 🗜️ Arrow function shorthand — implicit return with `(x, y) => x - y`

```javascript
// Three flavors of the same thing 🎨
function namedFunction() { console.log("Named Function"); }
const anonymousFunction = function() { console.log("Anonymous Function"); }
const arrowFunction = () => { console.log("Arrow Function"); }
```

---

### 🏗️ [`class.js`](class.js) — The Modern Blueprint

Where constructor functions evolve into **ES6 classes** — cleaner, more readable, and undeniably elegant.

**What I learned here:**
- 📐 Classes are syntactic sugar over prototypes (but *what* beautiful sugar!)
- 🏗️ `constructor()` — the initialization gateway
- 📖 Getter methods — `get fullName()` feels like accessing a property, but it's *computed*
- 🔍 `__proto__` exploration — proving that class instances are still just prototype-linked objects
- 🌐 **"Everything is an Object"** — the grand revelation:

```javascript
// The proof that rocked my world 🌍
console.log([].__proto__.__proto__);            // Object {} → null
console.log("".__proto__.__proto__);            // Object {} → null
console.log((123).__proto__.__proto__);         // Object {} → null
console.log((true).__proto__.__proto__);        // Object {} → null
console.log((function(){}).__proto__.__proto__); // Object {} → null
// EVERYTHING traces back to Object.prototype → null. Everything. 🤯
```

---

### 🔧 [`index.js`](index.js) — The DRY Awakening

A short but powerful file. Two objects, same structure, duplicated code — and the realization:

> *"I'm repeating myself. There has to be a better way."*

This file is the **"why"** behind classes and constructors. The pain of repetition is what makes blueprints meaningful.

---

### 🎮 [`remote.js`](remote.js) — Real-World Modeling

A playful file that models a **TV remote** as a JavaScript object — proving that objects aren't just abstract concepts, they mirror real life.

```javascript
const remote = {
    color: "black",
    brand: "Sony",
    dimensions: { height: 10, width: 5, depth: 3 },
    turnedOn: false,
    turnOn: function() { this.turnedOn = true; },
    turnOff: function() { this.turnedOn = false; }
}
```

---

### ❓ [`QuestionsWeek7.js`](QuestionsWeek7.js) — Battle-Tested Practice

11 hands-on challenges that put everything from this week to the test. From creating tea objects to merging, copying, and adding custom methods — this file is pure practice and reinforcement.

**Challenges conquered:**
1. ✅ Create an object with multiple properties
2. ✅ Access and print specific properties
3. ✅ Dynamically add new properties
4. ✅ Update existing property values
5. ✅ Delete properties with `delete`
6. ✅ Check property existence with `in`
7. ✅ Iterate with `for...in`
8. ✅ Build nested objects
9. ✅ Shallow copy with spread operator
10. ✅ Add custom methods to objects
11. ✅ Merge multiple objects into one

---

## 🧠 Key Concepts — Quick Reference

<details>
<summary><strong>🔗 Prototype Chain</strong> (click to expand)</summary>

```
myArray → Array.prototype → Object.prototype → null
myString → String.prototype → Object.prototype → null
myFunc → Function.prototype → Object.prototype → null
```

Every type in JavaScript eventually chains up to `Object.prototype`, and then to `null`. This is the **prototype chain** — the invisible backbone of JavaScript's inheritance model.

</details>

<details>
<summary><strong>📦 Pass by Value vs. Reference</strong> (click to expand)</summary>

```javascript
// Primitives → Pass by VALUE (independent copies)
let a = "Aman";
let b = a;
b = "Uditya";
console.log(a); // "Aman" — unchanged ✅

// Objects → Pass by REFERENCE (shared memory)
let p1 = { fname: "Aman" };
let p2 = p1;
p2.fname = "Uditya";
console.log(p1.fname); // "Uditya" — CHANGED ⚠️
```

</details>

<details>
<summary><strong>🏗️ Class vs Constructor Function</strong> (click to expand)</summary>

```javascript
// Constructor Function (old way)
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hi, I'm ${this.name}`; }

// ES6 Class (modern way — same thing under the hood!)
class Person {
    constructor(name) { this.name = name; }
    greet() { return `Hi, I'm ${this.name}`; }
}
```

</details>

---

## 🛠️ How to Run

```bash
# Clone the repository
git clone https://github.com/Uditya-Pal-1/Chai-Aur-Code-Cohort.git

# Navigate to Week-07
cd Chai-Aur-Code-Cohort/Week-07

# Option 1: Open index.html in browser for the visual page
# Option 2: Run individual JS files with Node.js
node weekSeven.js
node prototype.js
node function.js
node class.js
node index.js
node remote.js
node QuestionsWeek7.js
```

---

## 🌟 Week 7 Highlights — Personal Takeaways

> 💡 **"Everything in JavaScript is an object"** — I used to nod along when people said this. Now I can *prove* it with code. Every string, number, boolean, array, and function chains back to `Object.prototype`. That's not a slogan — it's an architectural truth.

> 🔧 **Building polyfills changed everything** — Writing `myMap`, `myFilter`, and `MyForEach` from scratch didn't just teach me how those methods work — it taught me *why* prototypes exist. They're not just an interview topic. They're the mechanism that makes `[1,2,3].map()` possible.

> 🏗️ **Classes are beautiful lies** — They look like Java/C++ classes, but underneath they're just constructor functions + prototype chains wearing a fancy suit. And somehow, knowing the truth makes them *more* elegant, not less.

---

## 📚 Part of the Journey

This repository is my week-by-week documentation of the **Chai Aur Code Cohort** — a structured full-stack web development program. Each week builds on the last, and Week 7 is where JavaScript stopped being a scripting language and started feeling like an *engineering language*.

| ⬅️ Previous | Current | Next ➡️ |
|:-----------:|:-------:|:-------:|
| [Week-06](../Week-06) | **Week-07** | [Week-08](../Week-08) |

---

<div align="center">

**Built with ☕ and curiosity by [Uditya Pal](https://github.com/Uditya-Pal-1)**

*"Objects don't just hold data — they hold the blueprint of how JavaScript thinks."*

</div>