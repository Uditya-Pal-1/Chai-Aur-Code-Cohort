# 🥷 Node Ninja - Node.js Fundamentals & Express Routing Practice

An educational repository exploring core **Node.js runtime concepts**, native HTTP request mechanics, CommonJS module exports, and Express route parameters.

---

## 🌟 Concepts & Learning Objectives

* **Native HTTP vs Express Abstraction**:
  * Understanding native Node `http.createServer` handling `req.method` and `req.url` via switch-case logic.
  * Simplifying routes using Express middleware and handler methods (`app.get`, `app.post`, `app.del`).
* **CommonJS Module Architecture**:
  * Writing custom module exports (`exports.add`, `exports.sub` in `math.js`) and consuming them.
* **Dynamic Route Parameters**:
  * Extracting parameters from request URLs (`req.params.id` in Express).

---

## 📁 Project Structure

```
Node Ninja/
├── index.js         # Native HTTP module mechanics vs Express GET route handlers
├── math.js          # Custom CommonJS utility module exporting arithmetic methods
├── server.js        # Express server demonstrating dynamic route params (`/user/:id`)
└── package.json     # Project manifest & npm start configuration
```

---

## 💻 Code Examples

### 1. CommonJS Module Export (`math.js`)
```javascript
exports.add = function (a, b) {
    return a + b;
};

exports.sub = function (a, b) {
    return a - b;
};
```

### 2. Dynamic Route Handling (`server.js`)
```javascript
const express = require("express");
const app = express();

app.del('/user/:id', (req, res) => {
    res.send(`delete /user/${req.params.id}`);
});
```

---

## 🛠️ How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Server**:
   ```bash
   npm start
   # or
   node index.js
   ```

3. **Test Endpoints**:
   * `http://localhost:8000/` -> `"Homepage"`
   * `http://localhost:8000/contact-us` -> `"contact us page"`
   * `http://localhost:8000/about-us` -> `"about us page"`

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
