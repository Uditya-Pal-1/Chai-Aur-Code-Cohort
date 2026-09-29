# 🔐 BackendPractice - Express & MongoDB User Authentication API

A robust, production-ready RESTful backend authentication and user management system built with **Express 5**, **MongoDB**, **Mongoose**, **JWT**, and **Nodemailer**.

---

## 🌟 Key Features

* **User Registration**: Create accounts with password encryption using `bcryptjs`.
* **Email Verification**: Automatic token generation and verification emails sent via `nodemailer`.
* **JWT Cookie Authentication**: Secure login issuing JSON Web Tokens stored in HTTP-Only cookies.
* **Protected Routes**: Middleware authorization (`isLoggedIn`) guarding access to user profile data (`/me`).
* **Session Termination**: Clean logout endpoint (`/logOutUser`) clearing session cookies.
* **Modular MVC Architecture**: Decoupled Controllers, Models, Routes, Middlewares, and Database Utilities.

---

## 📁 Project Structure

```
BackendPractice/
├── 📁 controllers/
│   └── userController.js     # User registration, login, profile & verification logic
├── 📁 middlewares/
│   └── auth.middleware.js    # JWT authorization guard middleware
├── 📁 models/
│   └── User.model.js         # Mongoose User schema & validation rules
├── 📁 routes/
│   └── userRoutes.js         # User API endpoints router
├── 📁 utils/
│   └── db.js                 # MongoDB connection handler
├── .env.sample               # Environment variables template
├── index.js                  # Application entry point & server startup
└── package.json              # Project dependencies & scripts
```

---

## 🔌 API Endpoints Summary

Base URL: `/api/v1/users`

| Method | Endpoint | Description | Auth Required | Parameters / Body |
|---|---|---|---|---|
| `POST` | `/register` | Register new user & send verification email | No | `{ name, email, password }` |
| `GET` | `/verify/:token` | Verify email address using token link | No | URL parameter: `token` |
| `POST` | `/login` | Authenticate user & set JWT HTTP-Only cookie | No | `{ email, password }` |
| `GET` | `/me` | Retrieve authenticated user profile | Yes (`Cookie`) | Header / Cookie |
| `POST` | `/logOutUser` | Clear authentication cookie & logout user | Yes (`Cookie`) | Header / Cookie |

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `BackendPractice` directory by copying `.env.sample`:

```env
PORT=4000
BASE_URL=http://localhost:4000
MONGO_URL=mongodb://localhost:27017/backendpractice
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.sample .env
   # Update variables in .env with your credentials
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Server**:
   Navigate to `http://localhost:4000/` in your browser or Postman. You should receive:
   ```json
   "Backend is running!"
   ```

---

## 📦 Tech Stack & Dependencies

* **Runtime**: Node.js (ES Modules)
* **Framework**: Express.js (`^5.2.1`)
* **Database**: MongoDB & Mongoose (`^9.9.1`)
* **Security & Auth**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`
* **Mailing**: `nodemailer`
* **Dev Tools**: `nodemon`, `dotenv`

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
