# 🗄️ FullStackSQL - Express, PostgreSQL & Prisma ORM Backend API

An enterprise-grade, strongly typed SQL backend system built with **Express 5**, **Prisma ORM**, and **PostgreSQL**.

---

## 🌟 Key Features

* **Relational Schema Design**: Built on PostgreSQL utilizing Prisma ORM with type safety and schema auto-generation.
* **Prisma Data Modeling**:
  * `User` model with CUID primary keys (`@id @default(cuid())`).
  * Unique constraints on `email` and optional `phone`.
  * Role-based access attributes (`role` defaulting to `"user"`).
  * Email verification status (`isVerified`) & token (`verificationToken`).
  * Password reset workflow tracking (`passwordResetToken` & `passwordResetExpiry`).
* **Security & Auth**: Password hashing (`bcryptjs`), JWT generation, HTTP-only cookie support, and CORS policy enforcement.
* **Database Driver**: `pg` (node-postgres) integration with Prisma Client generator.

---

## 📁 Project Structure

```
FullStackSQL/
├── 📁 controllers/
│   └── auth.controller.js    # Authentication and user action handlers
├── 📁 middlewares/
│   └── auth.middleware.js    # Request authentication & route authorization
├── 📁 models/
│   └── user.model.js         # User model abstractions
├── 📁 prisma/
│   ├── 📁 migrations/        # Database migration history
│   └── schema.prisma         # Prisma data schema & generator config
├── 📁 routes/
│   └── auth.router.js        # Authentication API route endpoints
├── 📁 utils/
│   └── helper.js             # Utility functions & response wrappers
├── .env.sample               # Environment variables specification
├── index.js                  # Express server entry point
├── prisma.config.ts          # Prisma configuration settings
└── package.json              # Dependencies and NPM scripts
```

---

## 📊 Database Schema (Prisma)

```prisma
model User {
  id                  String   @id @default(cuid())
  name                String
  phone               String?  @unique
  email               String   @unique
  password            String
  role                String   @default("user")
  isVerified          Boolean  @default(false)
  verificationToken   String?
  passwordResetToken  String?
  passwordResetExpiry String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @default(now())
}
```

---

## ⚙️ Environment Setup

Create a `.env` file in the `FullStackSQL` root directory by cloning `.env.sample`:

```env
PORT=4000
BASE_URL=http://localhost:4000
DATABASE_URL="postgresql://username:password@localhost:5432/fullstacksql?schema=public"
JWT_SECRET=your_jwt_secret_key
```

---

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Database**:
   Set up your PostgreSQL database connection string in `.env`.

3. **Run Prisma Migrations & Generate Client**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Test Root Endpoint**:
   Send a `GET` request to `http://localhost:4000/`:
   ```json
   {
     "success": true,
     "message": "test checked"
   }
   ```

---

## 📦 Tech Stack & Libraries

* **Framework**: Express.js (`^5.2.1`)
* **Database & ORM**: PostgreSQL, Prisma ORM (`^7.9.1`), `pg` (`^8.22.0`)
* **Authentication**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`
* **Dev Tools**: `nodemon`, `dotenv`

---

## 👤 Author

* **Uditya Pal**
* **Cohort**: Chai-Aur-Code Cohort (Week 16)
