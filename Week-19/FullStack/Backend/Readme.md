# 🚀 Authentication & User Management Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2-000000.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v6.19-2D3748.svg?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15%2B-336791.svg?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-black.svg?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

A robust, production-grade RESTful authentication backend service built with **Express.js (v5)**, **Prisma ORM**, **PostgreSQL**, and **Nodemailer/Mailtrap**. Features secure JWT cookie authentication, password hashing with **bcrypt**, email account verification, and timed password reset workflows.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [API Documentation](#-api-documentation)
  - [Health Check](#health-check)
  - [Authentication Endpoints](#authentication-endpoints)
- [Scripts](#-scripts)
- [License & Author](#-license--author)

---

## ✨ Features

- 🔐 **Secure User Authentication**: JWT token-based authentication using secure `HTTP-Only` cookies.
- 🛡️ **Password Security**: Salted password hashing with `bcryptjs` (10 rounds).
- ✉️ **Email Verification**: Automated account verification email sent upon registration via `nodemailer` & `Mailtrap`.
- 🔑 **Password Reset Flow**: Secure, time-limited (1-hour expiry) password reset link generation and processing.
- 🗄️ **Modern ORM Integration**: Type-safe database queries via **Prisma ORM** targeting **PostgreSQL** / **Neon**.
- 🌐 **CORS & Cookie Parser**: Configured cross-origin resource sharing with credentials support and cookie parser middleware.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Runtime & Framework** | Node.js (ES Modules), Express.js v5 |
| **Database & ORM** | PostgreSQL / Neon Serverless, Prisma ORM v6 |
| **Authentication & Auth** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| **Email Service** | `nodemailer` with Mailtrap SMTP |
| **Utilities** | `cookie-parser`, `cors`, `dotenv`, `crypto` |
| **Development** | `nodemon` |

---

## 📂 Project Architecture

```
Backend/
├── controllers/
│   └── auth.controller.js    # Auth business logic (register, login, verify, reset, logout)
├── routes/
│   └── auth.router.js        # User & Auth API route declarations
├── utils/
│   └── db.util.js            # Prisma client singleton instance
├── prisma/
│   ├── schema.prisma         # Database schema definition (User model)
│   └── migrations/           # Database migration files
├── index.js                  # Main server entrypoint & middleware configuration
├── prisma.config.ts          # Prisma configuration for migrations and connection
├── .env.sample               # Template for environment variables
└── package.json              # Dependencies and scripts
```

---

## 🗄️ Database Schema

### `User` Model

The database uses Prisma ORM connected to PostgreSQL. The schema for the `User` table is defined as follows:

| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id @default(cuid())` | Unique identifier (CUID) |
| `name` | `String` | | Full name of the user |
| `email` | `String` | `@unique` | User email address (unique) |
| `phone` | `String?` | `@unique` | Optional unique phone number |
| `password` | `String` | | Bcrypt-hashed password |
| `role` | `String` | `@default("user")` | User role (`user`, `admin`, etc.) |
| `isVerified` | `Boolean` | `@default(false)` | Email verification flag |
| `verificationToken` | `String?` | | Account verification token |
| `passwordResetToken` | `String?` | | Password reset token |
| `passwordResetExpiry`| `String?` | | Expiration timestamp for reset token (1 hr) |
| `createdAt` | `DateTime` | `@default(now())` | Account creation timestamp |
| `updatedAt` | `DateTime` | `@default(now())` | Last update timestamp |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- A PostgreSQL database instance or a free hosted [Neon Postgres](https://neon.tech/) account.

### Installation

1. Clone the repository and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the `Backend` directory by copying `.env.sample`:

```bash
cp .env.sample .env
```

Configure your environment variables inside `.env`:

```env
# Server Configuration
PORT=4000
BASE_URL=http://localhost:4000
PORT_URL=http://127.0.0.1:4000
NODE_ENV=development

# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
NEON_URL=""

# Authentication & Security
JWT_SECRET=your_super_secret_jwt_key
JWT_COOKIE_EXPIRE_TIME=24h

# Mailtrap / Nodemailer Email Service
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USERNAME=your_mailtrap_username
MAILTRAP_PASSWORD=your_mailtrap_password
MAILTRAP_SENDEMAIL=no-reply@yourapp.com
```

### Database Setup

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Push Schema to Database** (or run migrations):
   ```bash
   npx prisma db push
   ```
   *Alternatively for migration history:*
   ```bash
   npx prisma migrate dev --name init
   ```

---

## 📡 API Documentation

Base URL: `http://localhost:4000/api/v1/users`

### Health Check

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Verify server status |

**Response:**
```json
{
  "success": true,
  "message": "test checked"
}
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/users/register` | Register a new user | ❌ |
| `POST` | `/api/v1/users/login` | Authenticate user & receive cookie | ❌ |
| `GET` | `/api/v1/users/verify/:token` | Verify email address via token | ❌ |
| `POST` | `/api/v1/users/forgot-password` | Request password reset email | ❌ |
| `POST` | `/api/v1/users/reset-password/:token` | Set new password via token | ❌ |
| `POST` | `/api/v1/users/logout` | Clear session cookie | ❌ |

---

### Request & Response Examples

<details>
<summary><b>1. Register User (POST /api/v1/users/register)</b></summary>

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "user": {
    "id": "cm123abc...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
</details>

<details>
<summary><b>2. User Login (POST /api/v1/users/login)</b></summary>

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200 OK):** *(Sets HTTP-Only `token` cookie)*
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "id": "cm123abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": false
  },
  "message": "Login successful"
}
```
</details>

<details>
<summary><b>3. Verify Email (GET /api/v1/users/verify/:token)</b></summary>

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```
</details>

<details>
<summary><b>4. Forgot Password (POST /api/v1/users/forgot-password)</b></summary>

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email."
}
```
</details>

<details>
<summary><b>5. Reset Password (POST /api/v1/users/reset-password/:token)</b></summary>

**Request Body:**
```json
{
  "newPassword": "NewSecurePassword456"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```
</details>

<details>
<summary><b>6. User Logout (POST /api/v1/users/logout)</b></summary>

**Success Response (200 OK):** *(Clears `token` cookie)*
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
</details>

---

## 📜 Scripts

Run scripts from the `Backend` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server with hot-reloading (`nodemon`) |
| `npx prisma studio` | Open interactive Prisma Database GUI in your browser |
| `npx prisma db push` | Push schema changes directly to PostgreSQL |
| `npx prisma generate` | Re-generate Prisma Client types |

---

## 👤 Author & License

- **Author**: Uditya Pal
- **License**: [ISC](https://opensource.org/licenses/ISC)
