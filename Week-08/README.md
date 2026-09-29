<div>
<h1 align="center">🔥 Week-08 — The DOM Awakens</h1>
<p align="center"><i>"The moment JavaScript stopped being just a scripting language... and started <b>controlling</b> the browser."</i></p>
<br/>

<div align="center">
  <img src="./pose5.jpeg" alt="Chai Aur Code Cohort Pose" width="750" style="border-radius: 10px;" />
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

## 📖 The Story So Far...

> *Seven weeks in — variables learned, arrays conquered, functions mastered, loops befriended. But it all felt... **static**. Code ran in the console, numbers got crunched, strings got sliced — yet the browser screen just sat there, staring blankly.*
>
> *Then came **Week 8**.*
>
> *This was the week the invisible bridge appeared — the **Document Object Model**. Suddenly, JavaScript could **reach through the screen**, grab an HTML element by its collar, and say: "You. You're changing color now." A button click could flip the entire page from light to dark. A user's typed text could spawn a brand-new list item out of thin air.*
>
> *The page wasn't dead anymore. It was **alive**. And I was the one pulling the strings.* 🎭

---

## 🧠 What This Week Is All About

Week 08 marks the **pivotal turning point** in the Chai Aur Code Cohort — where JavaScript leaps out of the console and starts **manipulating the actual webpage**. This is where theory meets reality, where `document.getElementById()` stops being a textbook snippet and becomes a **superpower**.

### 🎯 Core Learning Objectives

| # | Concept | Status |
|---|---------|--------|
| 1 | Understanding the **Window Object** — the god object of the browser | ✅ Conquered |
| 2 | **DOM (Document Object Model)** — how the browser sees HTML as a tree | ✅ Conquered |
| 3 | **Selecting Elements** — `getElementById`, `querySelector` | ✅ Conquered |
| 4 | **Event Listeners** — making buttons actually *do* things | ✅ Conquered |
| 5 | **DOM Manipulation** — `createElement`, `appendChild`, `remove`, `innerHTML` | ✅ Conquered |
| 6 | **DRY Principle** — writing cleaner, reusable functions | ✅ Conquered |
| 7 | **Closures** — the "tiffin box" concept (nested function magic) | ✅ Conquered |
| 8 | **Higher-Order Functions** — passing functions as arguments | ✅ Conquered |
| 9 | **Function Types** — declarations, expressions & arrow functions | ✅ Conquered |
| 10 | **Theme Toggle** — real dark/light mode with pure JS | ✅ Conquered |
| 11 | **ToDo App** — full CRUD-like task manager with DOM | ✅ Built & Shipped 🚀 |

---

## 🗂️ Project Structure

```
Week-08/
│
├── 📄 index.html              ← Main entry page — DOM exploration playground
├── 🎨 style.css                ← Dark-themed styling with custom colors
├── 📜 index.js                 ← Window object & document.write experiments
├── 📜 weekEight.js             ← Core JS concepts: closures, HOF, prototypes
│
├── 📄 themebuttoninToDo.html   ← Theme toggle prototype (dark ↔ light)
├── 📜 Todo.js                  ← Toggle logic: DRY principle in action
│
├── 📁 ToDo App/                ← ⭐ The Standalone ToDo Application
│   ├── 📄 index.html           ← Dark-themed task manager UI
│   └── 📜 script.js            ← Add, delete & clear tasks with pure DOM
│
├── 📁 speedjs_lyst.../         ← SpeedJS Practice Files
│   └── 📁 speedjs/
│       ├── 01_variables_datatypes.js
│       ├── 02_array_object.js
│       ├── 03_if_else.js
│       ├── 04_iteration_1.js
│       ├── 04_iteration_2.js
│       └── 05_functions.js
│
├── 🖼️ chai-cohort.ico          ← Custom Chai Aur Code favicon
└── 📄 README.md                ← You are here! 👋
```

---

## 🚀 Featured Projects

### 1. 🌗 Theme Toggle — *"Let There Be Dark"*

> *One button. Two worlds. The user clicks, and the entire page flips between light and dark like flicking a cosmic switch.*

The journey of building the theme toggle was a lesson in **evolution**:

- **v1** — Two separate functions (`changeBackgroundBlack`, `changeBackgroundWhite`) → ❌ Violated DRY
- **v2** — One reusable `changeBackground(color)` function → ✅ Cleaner
- **v3** — Event listeners with `getElementById` instead of inline `onclick` → ✅ Professional
- **v4 (Final)** — A single toggle button that checks the current state and flips it → ✅ **Elegant**

```javascript
// The final toggle — clean, simple, powerful
themeButton.addEventListener('click', () => {
    const currentColor = document.body.style.backgroundColor;
    if (!currentColor || currentColor == 'white') {
        changeBackground('black');
        changeColor('white');
    } else {
        changeBackground('white');
        changeColor('black');
    }
});
```

**Key Takeaway:** Great code isn't written — it's **refactored**. 🔄

---

### 2. ✅ ToDo App — *"From Zero to Task Manager"*

> *An empty input field. A single button. And the power to conjure tasks out of thin air — then destroy them with a click. This is DOM manipulation at its finest.*

**Features:**
- ➕ **Add Tasks** — Type a task, click Add, watch it appear instantly
- 🗑️ **Delete Individual Tasks** — Each task spawns its own delete button dynamically
- 💣 **Delete All** — Nuclear option to wipe the entire list clean
- 🎨 **Dark Theme UI** — Sleek black-and-white interface

**Under the Hood:**
```javascript
// Every task creates its own DOM elements — born from pure JavaScript
const li = document.createElement('li');
li.innerText = value;

const dbtn = document.createElement('button');
dbtn.innerText = 'Delete';
dbtn.addEventListener('click', function() {
    li.remove();  // Self-destruct! 💥
});

li.appendChild(dbtn);
todoItemsContainer.append(li);
```

**Key Takeaway:** The DOM isn't just readable — it's **writable**. You can build entire UI components from JavaScript alone. 🏗️

---

## 🧩 Key Concepts Deep Dive

### 🪟 The Window Object
```javascript
console.log(window);          // The global object — everything lives here
console.log(window.document); // The DOM entry point
```
*The `window` is the **universe** of the browser. Every global variable, every `setTimeout`, every `alert` — they all belong to it.*

### 🔒 Closures — The "Tiffin Box" Concept
```javascript
function createCounter() {
    let count = 0;              // Packed inside the tiffin 🍱
    return function() {
        count++;                // The inner function remembers!
        return count;
    }
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2 — count persists!
```
*A closure is like a tiffin box — the inner function carries its lunch (variables) from the outer function, even after the outer function is done cooking.*

### 🎩 Higher-Order Functions
```javascript
function applyOperation(a, b, operation) {
    return operation(a, b);     // A function... taking a function!
}
applyOperation(2, 3, (x, y) => x - y); // -1
```
*Functions aren't just workers — they can be **managers** that delegate work to other functions passed as arguments.*

### 🧬 Function.prototype Magic
```javascript
Function.prototype.describe = function() {
    console.log(`Function name is ${this.name}`);
}
function MasalaChai() {}
MasalaChai.describe(); // "Function name is MasalaChai" ☕
```
*Even functions are objects in JavaScript — and you can extend their DNA through prototypes.*

---

## ⚡ SpeedJS Practice Files

Rapid-fire JavaScript fundamentals revision packed inside the `speedjs` folder:

| File | Topic | What's Inside |
|------|-------|---------------|
| `01_variables_datatypes.js` | Variables & Data Types | `let`, `const`, `var`, primitives, type coercion |
| `02_array_object.js` | Arrays & Objects | CRUD operations, nesting, iteration |
| `03_if_else.js` | Conditionals | `if/else`, ternary, switch-case patterns |
| `04_iteration_1.js` | Loops (Part 1) | `for`, `while`, `do-while` |
| `04_iteration_2.js` | Loops (Part 2) | `for...of`, `for...in`, `forEach`, `map` |
| `05_functions.js` | Functions | Declarations, expressions, arrows, defaults |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Page structure & semantic markup |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Dark theme styling & layout |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | DOM manipulation, events & logic |

---

## 🏃 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/Uditya-Pal-1/Chai-Aur-Code-Cohort.git

# 2. Navigate to Week-08
cd Chai-Aur-Code-Cohort/Week-08

# 3. Open in browser
# Option A: Open index.html directly in your browser
# Option B: Use Live Server extension in VS Code (recommended)
```

---

## 💡 Lessons Learned This Week

> *"Before Week 8, I was writing JavaScript in the dark — literally just console logs. Now I can paint the screen, build buttons that think, and create elements that didn't exist a second ago. The DOM isn't just an API — it's a **portal** between code and the visible world."*

1. 🧱 **DRY Principle matters** — Refactoring two functions into one taught me to think before I code
2. 🎧 **Event Listeners > inline onclick** — Separation of concerns makes code maintainable
3. 🏗️ **createElement is magic** — Building HTML from JavaScript is incredibly powerful
4. 🔒 **Closures preserve state** — The tiffin box analogy made it click (pun intended)
5. 🧬 **Prototypes are extensible** — Even built-in objects can learn new tricks

---

## 🗓️ Part of the Journey

This is **Week 8** of the **Chai Aur Code Cohort** — a 30+ week full-stack development odyssey. Every week builds on the last, brick by brick, towards becoming a complete developer.

| ◀️ Previous | Current | Next ▶️ |
|-------------|---------|---------|
| Week-07 | **Week-08** 👈 | Week-09 |

---

<div align="center">

*Built with ☕ chai, 💻 code, and mass curiosity during the Chai Aur Code Cohort.*

**Made with ❤️ by [Uditya Pal](https://github.com/Uditya-Pal-1)**

</div>
