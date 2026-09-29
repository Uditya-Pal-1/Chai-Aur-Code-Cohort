# ⚙️ nodeInternal - Node.js Event Loop Execution Deep-Dive

An architectural laboratory demonstrating the **Node.js Event Loop execution mechanics**, task queues, timers, and asynchronous phase scheduling.

---

## 🌟 Key Concepts

Node.js executes JavaScript code in a single-threaded event loop environment. Understanding the priority and ordering of asynchronous callbacks across phases is essential for writing non-blocking node applications.

### Event Loop Execution Phases Order:
1. **Synchronous Call Stack**: Direct execution of top-level code statements.
2. **Microtask Queue**: Callbacks registered via `process.nextTick()` and `Promise.then()` (executed immediately after current operation completes, before moving to next phase).
3. **Timers Phase**: Callbacks scheduled by `setTimeout()` and `setInterval()`.
4. **Poll Phase / I/O Callbacks**: Callbacks from asynchronous I/O operations (e.g. `fs.readFile`).
5. **Check Phase**: Callbacks scheduled by `setImmediate()`.
6. **Close Callbacks**: Socket or handle destruction cleanup callbacks.

---

## 📁 Project Structure

```
nodeInternal/
├── index.js      # Practical event loop queue execution script
└── Readme.md     # Architectural documentation
```

---

## 💻 Code Analysis (`index.js`)

```javascript
const fs = require('fs');

setTimeout(() => console.log("Set Timeout"), 0);

setImmediate(() => console.log("Set Immediate"));

console.log('hello');
```

### Expected Execution Output:

```text
hello
Set Timeout
Set Immediate
```

### Step-by-Step Breakdown:
1. `console.log('hello')` is executed synchronously on the main thread -> Outputs `"hello"`.
2. `setTimeout(..., 0)` registers a timer in the Timers phase queue.
3. `setImmediate(...)` registers a check callback in the Check phase queue.
4. When entering the event loop, the expired timer (`0ms`) in the **Timers Phase** fires first -> Outputs `"Set Timeout"`.
5. The Event Loop advances to the **Check Phase** -> Outputs `"Set Immediate"`.

*Note: In non-I/O cycles, the order between `setTimeout(0)` and `setImmediate` can vary depending on process performance and execution timing, but inside an I/O callback (`fs.readFile`), `setImmediate` is guaranteed to execute before `setTimeout(0)`.*

---

## 🛠️ How to Run

Execute the script with Node.js:

```bash
node index.js
```

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
