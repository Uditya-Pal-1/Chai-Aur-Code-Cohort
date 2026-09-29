# ⚡ Week 16 - Full Stack Engineering & Node.js Core Deep-Dive

Welcome to **Week 16** of the **Chai-Aur-Code Cohort** by **Uditya Pal**. This repository serves as a comprehensive workspace consolidating projects built across modern backend architecture, SQL database integration, Node.js runtime internals, event loop mechanics, and production-ready UI component design.

---

## 📂 Repository Structure

```
Week-16/
├── 📁 BackendPractice/         # Express + MongoDB Auth & Email Verification System
├── 📁 FullStackSQL/            # Express + PostgreSQL + Prisma ORM Authentication Backend
├── 📁 Node Ninja/             # Node.js Core Routing, Math Modules & Express Handlers
├── 📁 UI Component library/    # Modern Tailwind CSS Component Library & Theme Slider
├── 📁 nodeInternal/            # Node.js Event Loop & Execution Phase Analysis
└── 📁 assets/                  # Project screenshots and visual assets
```

---

## 🚀 Projects Overview

### 1. [BackendPractice]
* **Description**: A full-featured RESTful authentication API using Express 5 and MongoDB with Mongoose.
* **Key Features**:
  * User Registration with password encryption (`bcryptjs`).
  * Email verification token delivery via `nodemailer`.
  * User Login with JWT stored in HTTP-Only, secure cookies.
  * Protected `/me` profile route with `isLoggedIn` authentication middleware.
  * Clean MVC architecture (Controllers, Models, Routes, Middlewares).
* **Tech Stack**: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer, Bcryptjs.

### 2. [FullStackSQL]
* **Description**: Enterprise-grade relational SQL backend powered by PostgreSQL and Prisma ORM.
* **Key Features**:
  * Schema-driven database modelling with Prisma Client (`User` model with CUID primary keys).
  * Comprehensive user fields: unique email & phone, role management, email verification token, password reset tokens & expiry.
  * PostgreSQL integration using native `pg` driver.
  * Secure route guards, CORS policy configuration, and HTTP-only cookie session handling.
* **Tech Stack**: Node.js, Express.js, PostgreSQL, Prisma ORM, JWT, Bcryptjs.

### 3. [Node Ninja]
* **Description**: Hands-on exploration of Node.js routing mechanisms, HTTP request lifecycle, and modular architecture.
* **Key Features**:
  * Comparative implementation of native `http.createServer` handling `req.method` and `req.url` vs. Express routing.
  * CommonJS module exports and imports (`math.js`).
  * Dynamic URL parameters (`/user/:id`) and HTTP verb handlers (`GET`, `POST`, `DELETE`).
* **Tech Stack**: Node.js Core (HTTP module, CommonJS), Express.js.

### 4. [UI Component Library]
* **Description**: A modern, sleek dark-themed UI Component Library showcasing reusable landing page blocks.
* **Key Features**:
  * **Interactive Theme Reveal Slider**: Real-time comparative before/after slider between Light and Dark mode UI layouts.
  * Production-ready UI components: Navigation Header, Hero Section, CTA buttons, and Card Grids.
  * Developer-friendly code viewer integrated with Prism.js syntax highlighting.
  * Responsive and custom utilities styled with Tailwind CSS.
* **Tech Stack**: HTML5, Tailwind CSS, JavaScript (DOM manipulation), Prism.js.

### 5. [nodeInternal]
* **Description**: Deep dive into Node.js runtime mechanics, Event Loop phases, and asynchronous task queues.
* **Key Features**:
  * Empirical analysis of execution order across Call Stack, Timers Queue (`setTimeout`), Check Phase (`setImmediate`), and I/O callbacks (`fs`).
  * Practical understanding of event loop ticks and task scheduling.
* **Tech Stack**: Node.js Core (`fs`, Timers API, Event Loop).

---

## 🛠️ Quick Start Guide

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [npm](https://www.npmjs.com/) (v9.0.0 or higher)
* [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas cluster)
* [PostgreSQL](https://www.postgresql.org/) (For `FullStackSQL`)

### General Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Uditya-Pal-1/Chai-Aur-Code-Cohort.git
   cd Week-16
   ```

2. **Run Any Sub-Project**:
   Navigate into the desired directory, install dependencies, and run the dev server:

   ```bash
   # Example: Running BackendPractice
   cd BackendPractice
   npm install
   cp .env.sample .env
   # Update your environment variables in .env
   npm run dev
   ```

   ```bash
   # Example: Running FullStackSQL
   cd FullStackSQL
   npm install
   npx prisma generate
   npm run dev
   ```

   ```bash
   # Example: Viewing UI Component Library
   cd "UI Component library"
   # Open dist/index.html in your browser
   ```

---
## 🖼️ Media & Visuals

  <img src="./assets/pose1.jpeg" alt="DOM Challenges Banner" width="750" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
* **License**: ISC

---
*Happy Coding! 🚀*
