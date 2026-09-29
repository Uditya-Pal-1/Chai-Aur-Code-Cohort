<div align="center">

# ☕ Week 10: Asynchronous Mastery & Machine Coding Round

<p align="center">
  <b>Conquering Callback Hell, Crafting Custom Promises, Mastering ES6 Proxies & Building a Real-Time Digital Clock</b>
</p>

[![Twitter](https://img.shields.io/badge/Twitter-ffffff?style=flat&logo=x&logoColor=black)](https://x.com/Aman_Pal_1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-E4405F?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udityapal)
[![Gmail](https://img.shields.io/badge/hello-d62d20?style=flat&logo=gmail&logoColor=white)](mailto:udityapal2024@gmail.com)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

<hr />


## 📜 Storyline: The Quest for Asynchronous Harmony & Meta-Programming

> *"In the early days of JavaScript, developers ventured into the dark forest of Asynchronous Operations. As they nested callback inside callback to create, read, backup, and delete files, the infamous **Pyramid of Doom (Callback Hell)** rose to trap them in infinite error-handling loops.*
>
> *Just when all hope seemed lost, two powerful spell-books were unlocked in Week 10:*
> 1. **The Scroll of Promises & Async/Await:** Unbinding synchronous blockages, untangling nested callbacks, and bringing clean linear elegance to asynchronous flows.
> 2. **The Mirror of ES6 Proxies:** Granting meta-programming superpowers to intercept object behaviors, protect sensitive data, and trick arrays into understanding negative indices like `arr[-1]`!*
>
> *And to seal this time-bending knowledge, we forged a live **Digital Clock**—a real-time guardian ticking away second by second on the web page."*

---

## 📑 Table of Contents

- [📜 Storyline](#-storyline-the-quest-for-asynchronous-harmony--meta-programming)
- [🧠 Concepts Explored](#-concepts-explored)
  - [1. Machine Coding: ES6 Proxies & Negative Indexing](#1-machine-coding-es6-proxies--negative-indexing)
  - [2. Asynchronous JS: Callbacks to Promisification](#2-asynchronous-js-callbacks-to-promisification)
  - [3. Fetch API & Event Loop Microtasks](#3-fetch-api--event-loop-microtasks)
- [🕒 Project Spotlight: Live Digital Clock](#-project-spotlight-live-digital-clock)
- [📁 Directory Structure](#-directory-structure)
- [🚀 How to Run & Test](#-how-to-run--test)
- [💡 Key Takeaways](#-key-takeaways)
- [🤝 Connect & Support](#-connect--support)

---

## 🧠 Concepts Explored

### 1. Machine Coding: ES6 Proxies & Negative Indexing

JavaScript arrays natively return `undefined` for negative index lookups like `arr[-1]`. Using **ES6 Proxies**, we intercepted array accessors (`get` and `set` traps) to implement Python-style negative indexing.

```javascript
function negativeIndex(arr) {
    return new Proxy(arr, {
        get(target, prop) {
            const index = Number(prop);
            if (index < 0) {
                return target[target.length + index]; // Translate -1 to last element
            }
            return target[index];
        },
        set(target, prop, value) {
            const index = Number(prop);
            if (index < 0) {
                target[target.length + index] = value;
            } else {
                target[index] = value;
            }
            return true;
        }
    });
}

let arr = [10, 20, 30, 40, 50];
let proxyArr = negativeIndex(arr);

console.log(proxyArr[-1]); // 50 (Last element!)
proxyArr[-1] = 99;
console.log(proxyArr[-1]); // 99
```

**Key Proxy Traps Mastered:**
- **Property Access (`get`)**: Intercepting key reads.
- **Property Mutation (`set`)**: Validating and transforming updates.
- **Access Control**: Throwing runtime errors on sensitive keys (e.g. blocking access to `user.password`).

---

### 2. Asynchronous JS: Callbacks to Promisification

#### ❌ The Problem: Callback Hell (Pyramid of Doom)
When chaining multiple asynchronous filesystem operations (Write $\rightarrow$ Read $\rightarrow$ Backup $\rightarrow$ Unlink), nested callbacks lead to deeply indented, error-prone code:

```javascript
// Callback Hell
fs.writeFile("hello.txt", content, (err) => {
    if (err) return console.log(err);
    fs.readFile("./hello.txt", "utf-8", (err, data) => {
        if (err) return console.log(err);
        fs.writeFile("backup.txt", data, (err) => {
            if (err) return console.log(err);
            setTimeout(() => {
                fs.unlink("./hello.txt", (err) => {
                    if (err) console.log(err);
                    else console.log("File deleted");
                });
            }, 5000);
        });
    });
});
```

#### ✅ The Solution: Custom Promisification & `async/await`
By wrapping Node.js callback functions into **Promises**, we transform deep nesting into sequential `.then()` chains or clean `async/await` blocks:

```javascript
function readFileWithPromise(filepath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, encoding, (err, content) => {
            if (err) reject(err);
            else resolve(content);
        });
    });
}

// Clean Async/Await Flow
async function doTasks() {
    try {
        const fileContent = await readFileWithPromise('./hello.txt', 'utf-8');
        await writeFileWithPromise("./backup.txt", fileContent);
        await wait(5);
        await unlinkWithPromise('./hello.txt');
    } catch (error) {
        console.log("Error:", error);
    } finally {
        console.log("All File Operations Completed!");
    }
}
```

---

### 3. Fetch API & Event Loop Microtasks

Exploring the execution hierarchy between synchronous execution, microtask queues (Promises), and lifecycle methods (`.then()`, `.catch()`, `.finally()`):

```javascript
console.log("1. Program Started");

fetch("https://api.freeapi.app/api/v1/public/randomproducts")
    .then((res) => console.log("3. Data Received:", res.status))
    .catch((err) => console.log("Error:", err))
    .finally(() => console.log("4. Always runs"));

console.log("2. Program Ended");

// Output Order:
// 1. Program Started
// 2. Program Ended
// 3. Data Received: 200
// 4. Always runs
```

---

## 🕒 Project Spotlight: Live Digital Clock

A sleek, real-time Digital Clock built with modern HTML, CSS, and Vanilla JavaScript DOM Manipulation.

<div align="center">
  <img src="./project/assets/DigitalClockProject.png" alt="Digital Clock Project Screenshot" width="950" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

### ✨ Project Features:
- ⏰ **12-Hour Time Format**: Displays Hours, Minutes, and Seconds with `AM/PM` indicators.
- 📅 **Dynamic Full Calendar Date**: Formats date dynamically using `toLocaleDateString()` with full month and day names.
- ⏱️ **Real-Time Heartbeat**: Driven by `setInterval()` updating every 1000ms.
- 🎨 **Glassmorphism UI**: Beautiful glowing dark theme card with custom CSS styling.

---

## 📁 Directory Structure

```text
Week-10/
├── Machine_Coding/
│   └── negativeIndex.js       # ES6 Proxy implementation for negative array indexing
├── promises/
│   ├── Promise.js             # Async execution order & fetch API exploration
│   ├── backup.txt             # Backup test file created during promisified FS ops
│   ├── index.html             # HTML runner for promise experiments
│   ├── index.js               # Callback Hell vs Promisified FS vs Async/Await
│   └── projectPractice.js     # Promise practice routines
├── project/
│   ├── assets/
│   │   └── DigitalClockProject.png # Screenshot preview of the Digital Clock project
│   ├── index.html             # Digital Clock markup structure
│   ├── script.js              # Clock logic (Date object, DOM updates, setInterval)
│   └── style.css              # Glassmorphism dark-theme styling
├── index.html                 # Root index file
├── style.css                  # Root stylesheet
└── README.md                  # Comprehensive Week-10 Documentation
```

---

## 🚀 How to Run & Test

### 1. Test Proxy & Negative Indexing:
```bash
node Machine_Coding/negativeIndex.js
```

### 2. Test Callback Hell vs Promisified Async Operations:
```bash
node promises/index.js
```

### 3. Run the Digital Clock Project:
- Simply double-click `project/index.html` or open it with Live Server in VS Code.

---

## 💡 Key Takeaways

1. **ES6 Proxy Power**: Metaprogramming in JS allows intercepting language primitives to build custom getters, setters, validation layers, and custom data structures.
2. **Goodbye Pyramid of Doom**: Converting raw callback functions into Promises keeps async workflows linear, maintainable, and readable.
3. **Async/Await Elegance**: `async/await` syntax provides synchronous-like error handling using `try...catch...finally` while remaining completely non-blocking under the hood.
4. **DOM & Timers Mastery**: Combining `Date()`, string padding (`padStart(2, '0')`), and `setInterval` creates robust real-time web UI components.

---

## 🤝 Connect & Support

Created with ☕ & ❤️ as part of the **Chai Aur Code Cohort**.

- **Twitter / X**: [@Aman_Pal_1](https://x.com/Aman_Pal_1)
- **LinkedIn**: [Uditya Pal](https://www.linkedin.com/in/udityapal)
- **Email**: [udityapal2024@gmail.com](mailto:udityapal2024@gmail.com)

---

## 🖼️ Media & Visuals

<div align="center">
  <img src="../Week-09/web dev cohort pose.jpeg" alt="Chai Aur Code Cohort Pose" width="750" style="border-radius: 10px;" />
</div>

---
<div align="center">
  <b>⭐ If you find this repository helpful, don't forget to give it a star! ⭐</b>
</div>
