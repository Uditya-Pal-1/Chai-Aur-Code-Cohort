<div align="center">

# 🚀 Week 11: Machine Coding, Closures & Polyfills
<p align="center">
  <b>Unlocking JavaScript's Inner Engine: From Scoping & Closures to Custom Promises and Polyfills</b>
</p>

[![Twitter](https://img.shields.io/badge/Twitter-ffffff?style=flat&logo=x&logoColor=black)](https://x.com/Aman_Pal_1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/udityapal)
[![Email](https://img.shields.io/badge/Gmail-d62d20?style=flat&logo=gmail&logoColor=white)](mailto:udityapal2024@gmail.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](#)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

</div>

## 📖 The Storyline: "Behind the V8 Curtain"

> *Every developer starts JavaScript by writing code that works by "magic." You call `.map()`, `.reduce()`, or `new Promise()`, and things just happen. But what actually occurs beneath the execution context?*
> 
> *In **Week 11**, the journey shifted from just **using** JavaScript to **deconstructing** it. Facing the intimidating concepts of Lexical Scoping, Closure memory retention, Rate Limiting (Debouncing & Throttling), and Async Architecture, the mission was clear: **Build everything from scratch**.*
> 
> *By writing custom polyfills for array methods, constructing a ground-up `MyPromise` class with full callback queues, and harnessing closures to statefully power a UI Color Engine, the magic dissolved into deep engineering confidence!* ⚡✨

---

## 🌟 Key Highlights & Learning Outcomes

- 🧠 **Lexical Scoping & Closures**: Mastered how functions preserve access to their parent lexical scope even after the outer function has executed.
- ⏱️ **Rate Limiting Patterns**: Engineered robust **Debounce** (delayed execution on idle) and **Throttle** (fire-once per time interval) utilities for real-world performance optimization.
- ⚙️ **Custom Polyfills**: Built native prototype extensions for `Array.prototype.myForEach`, `Array.prototype.myMap`, and `Array.prototype.myReduce`.
- 🔮 **Custom Promise Class (`MyPromise`)**: Built an asynchronous state machine handling `pending`, `fulfilled`, and `rejected` states with `.then()`, `.catch()`, and `.finally()` chaining.
- 🎨 **Closure Mini-Project**: Developed an interactive Dynamic Background Color Changer driven by closure-encapsulated application state and regex hex validation.

---

## 📂 Repository Structure

```microscope
Week-11/
├── 📁 Lexical_ScopingAndClosures/   # Deep dive into scopes and state retention
│   ├── 📄 Lexical_Scoping.js       # Lexical environment & scope chain fundamentals
│   ├── 📄 counter.js               # Stateful counter powered by inner function closures
│   └── 📄 createCounter.js         # Configurable step/initial counters & logger instances
│
├── 📁 Machine_Coding/              # Performance engineering & interview patterns
│   ├── 📄 01.js                    # Debouncing implementation with timer resets & context binding
│   └── 📄 02.js                    # Throttling implementation with interval guards
│
├── 📁 miniProject/                 # Interactive UI powered by Closures
│   ├── 📄 index.html               # Clean control layout with color selector & custom hex input
│   ├── 📄 style.css                # Styled control panel & responsive layout
│   └── 📄 script.js               # Closure state engine & hex validator logic
│
├── 📁 assets/                      # Media showcase assets
│   ├── 🖼️ image.png                # Practice project interface screenshot
│   ├── 🖼️ pose.jpeg               # Cohort milestone pose photo
│   └── 🖼️ chai-cohort.ico          # Project favicon
│
├── 📄 Eleven.js                    # Comprehensive polyfill playground & MyPromise engine
├── 📄 index.html                   # Root playground html entrypoint
└── 📄 style.css                    # Root global styles
```

---

## 🛠️ Deep Dive into Modules

### 1. 🧠 Lexical Scoping & Closures
Located in [`Lexical_ScopingAndClosures/`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Lexical_ScopingAndClosures)
- **[`Lexical_Scoping.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Lexical_ScopingAndClosures/Lexical_Scoping.js)**: Demonstrates parent-child variable lookup across execution frames.
- **[`counter.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Lexical_ScopingAndClosures/counter.js)** & **[`createCounter.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Lexical_ScopingAndClosures/createCounter.js)**: Creates stateful counters and logger singletons where local variables persist across multiple calls without polluting the global namespace.

### 2. ⚡ Machine Coding: Debouncing & Throttling
Located in [`Machine_Coding/`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Machine_Coding)
- **[`01.js (Debounce)`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Machine_Coding/01.js)**: Cancels previous execution timer (`clearTimeout`) on repeated triggers to execute only after a specified delay period.
- **[`02.js (Throttle)`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Machine_Coding/02.js)**: Locks execution during an active window, ensuring functions fire at most once every specified delay interval.

### 3. ⚙️ Polyfills & Custom `MyPromise` Engine
Located in [`Eleven.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/Eleven.js)
```javascript
// Custom Polyfill for Array.prototype.myMap
Array.prototype.myMap = function (cb) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(cb(this[i], i));
    }
    return result;
};

// Ground-up MyPromise Class
class MyPromise {
    constructor(executorFn) {
        this._state = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finallyCallbacks = [];
        executorFn(this.resolverFunction.bind(this), this.rejectorFunction.bind(this));
    }
    then(cb) { this._successCallbacks.push(cb); return this; }
    catch(cb) { this._errorCallbacks.push(cb); return this; }
    finally(cb) { this._finallyCallbacks.push(cb); return this; }
    // ... resolver & rejector handling state transitions
}
```

### 4. 🎨 Mini-Project: Closure-Powered Color Changer
Located in [`miniProject/`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/miniProject)
- Encapsulates private state inside `colorApp()` using closure returned methods (`setColor` & `applyColor`).
- Validates user-entered custom hex strings using Regex (`/^#([0-9A-F]{3}){1,2}$/i`) before applying live dynamic changes to the document body background.

---

## 🖼️ Visual Showcase

<h3 align="center">💻 Dynamic Background Color Changer App</h3>
<div align="center">
  <img src="./assets/image.png" alt="Web-Project" width="750" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<br />

## 🖼️ Media & Visuals

<h3 align="center">🎉 Cohort Victory & Milestone Pose! 😀</h3>
<div align="center">
  <img src="./assets/pose.jpeg" alt="Pose" width="750" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
  <img src="./assets/pose6.jpeg" alt="Pose" width="750" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

---

## 🚀 How to Run Locally

1. **Clone or Navigate to Directory**:
   ```bash
   cd "d:/VS Code/Web Development Course/Chai-Aur-Code-Cohort/Week-11"
   ```

2. **Run Machine Coding & Polyfill Scripts with Node.js**:
   ```bash
   node Lexical_ScopingAndClosures/counter.js
   node Machine_Coding/01.js
   node Eleven.js
   ```

3. **Launch the Mini Project**:
   - Open [`miniProject/index.html`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-11/miniProject/index.html) in any modern web browser or start a Live Server.

---

<div align="center">

**Built with ❤️ during the Chai Aur Code Cohort Journey**

</div>
