<div align="center">

# ⚡ LeetLab

**An Enterprise-Grade Full-Stack Online Judge & Algorithmic Problem Solving Platform**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Database Schema](#-database-schema) • [API Documentation](#-api-documentation) • [Getting Started](#-getting-started) • [Folder Structure](#-folder-structure)

---

</div>

## 📌 Overview

**LeetLab** is a full-stack, feature-rich online coding platform inspired by LeetCode. Built with modern web technologies, LeetLab enables developers to practice algorithmic problem-solving, compile and test code in real-time, track problem submissions, and organize custom problem playlists.

The platform includes a robust **Judge0 code execution engine** integration for batch test case processing, role-based access control (User/Admin), and complete problem-management workflows.

---

## ✨ Key Features

### 💻 Code Compilation & Execution Engine

- **Multi-Test Case Batch Execution**: Submits code solution batches to the Judge0 execution engine for isolated evaluation.
- **Detailed Test Case Diagnostics**: Displays memory usage, execution time, stdio outputs, stderr, and compilation errors per test case.
- **Automated Solved Tracking**: Automatically updates user statistics and marks problems as solved upon passing all test cases.

### 🛡️ User Authentication & Role Management

- **Secure Authentication**: JWT-based session management using HTTP-only cookies and bcrypt password encryption.
- **Role-Based Authorization**: Distinct permissions for regular **Users** and platform **Admins**.
- **User Dashboard**: Track user profile details, solved problems count, and submission history.

### 📝 Problem Management & Administration

- **Admin Dashboard**: Full CRUD capabilities for creating, updating, and deleting coding problems.
- **Comprehensive Problem Specifications**: Support for difficulty levels (`EASY`, `MEDIUM`, `HARD`), tags, sample inputs/outputs, constraints, hints, code starter snippets, and editorial solutions.
- **Flexible Test Case Builder**: Define custom hidden and public test cases per problem.

### 📚 Custom Problem Playlists

- **Curated Study Plans**: Create, update, and manage personalized problem playlists (e.g., "Top 75 Interview Questions", "Dynamic Programming Essentials").
- **Organized Learning**: Add or remove problems seamlessly from playlists.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **Routing**: React Router v7
- **Form Handling & Validation**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT), Cookie-Parser, BcryptJS
- **Code Execution Engine**: Judge0 API / Custom Batch Compiler Integration

---

## 📐 Architecture & System Flow

```mermaid
graph TD
    A[React 19 Frontend] -->|HTTP / Cookies| B[Express 5 API Server]
    B -->|JWT Auth Middleware| C[Auth Routes]
    B -->|Prisma Client| D[(PostgreSQL Database)]
    B -->|Execute Code Request| E[Judge0 Code Execution API]
    E -->|Batch Results & Telemetry| B
    B -->|JSON Response & Stats| A
```

---

## 🗄 Database Schema

The database model is defined using **Prisma ORM** targeting **PostgreSQL**:

```mermaid
erDiagram
    User ||--o{ Problem : "creates (Admin)"
    User ||--o{ Submission : "submits"
    User ||--o{ ProblemSolved : "solves"
    User ||--o{ Playlist : "owns"

    Problem ||--o{ Submission : "has"
    Problem ||--o{ ProblemSolved : "tracks"
    Problem ||--o{ ProblemInPlaylist : "belongs to"

    Submission ||--o{ TestCaseResult : "produces"
    Playlist ||--o{ ProblemInPlaylist : "contains"

    User {
        string id PK
        string name
        string email
        enum role "USER | ADMIN"
        string password
        datetime createdAt
    }

    Problem {
        string id PK
        string title
        string description
        enum difficulty "EASY | MEDIUM | HARD"
        string[] tags
        json testcases
        json codeSnippets
    }

    Submission {
        string id PK
        string userId FK
        string problemId FK
        string language
        string status "Accepted | Wrong Answer | Error"
        string memory
        string time
    }

    Playlist {
        string id PK
        string name
        string description
        string userId FK
    }
```

---

## 🚀 Getting Started

Follow these instructions to set up **LeetLab** locally on your machine.

### 📋 Prerequisites

- **Node.js**: `v20.19+` or `v22.12+` (required by Vite 8)
- **npm** or **pnpm**
- **PostgreSQL**: Running instance locally or cloud-hosted (Neon / Supabase / Aiven)
- **Judge0 API Key** (RapidAPI) or a self-hosted Judge0 instance

---

### ⚙️ Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Uditya-Pal-1/Chai-Aur-Code-Cohort.git
cd Projects/leetLab
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.sample .env
```

Edit `.env` and populate your credentials:

```env
PORT=8080
DATABASE_URL="postgresql://user:password@localhost:5432/leetlab_db?schema=public"
JWT_SECRET="your_jwt_super_secret_key"
```

Generate Prisma Client & apply migrations:

```bash
# Apply local migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

Start the backend server:

```bash
npm run dev
```

> Server running at: `http://localhost:8080`

---

#### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.sample .env
```

The Vite dev server proxies `/api` to the backend at `http://localhost:8080`. Keep the API base path same-origin:

```env
VITE_API_BASE_URL="/api/v1"
```

Start the Vite development server:

```bash
npm run dev
```

> Application running at: `http://localhost:5173`

---

## 📡 API Reference

### 🗝️ Authentication Endpoints (`/api/v1/auth`)

| Method | Endpoint  | Access        | Description                            |
| :----- | :-------- | :------------ | :------------------------------------- |
| `POST` | `/signup` | Public        | Register a new user                    |
| `POST` | `/login`  | Public        | Authenticate user & receive JWT cookie |
| `POST` | `/logout` | Authenticated | Clear authentication cookie            |
| `GET`  | `/me`     | Authenticated | Fetch current logged-in user profile   |

### 🧩 Problem Endpoints (`/api/v1/problems`)

| Method   | Endpoint  | Access | Description                                    |
| :------- | :-------- | :----- | :--------------------------------------------- |
| `GET`    | `/`       | Public | Fetch all coding problems                      |
| `GET`    | `/:id`    | Public | Fetch single problem details by ID             |
| `POST`   | `/create` | Admin  | Create a new problem with testcases & snippets |
| `PUT`    | `/:id`    | Admin  | Update problem details                         |
| `DELETE` | `/:id`    | Admin  | Delete a problem                               |

### ⚡ Code Execution & Submissions

| Method | Endpoint                        | Access        | Description                                 |
| :----- | :------------------------------ | :------------ | :------------------------------------------ |
| `POST` | `/api/v1/execute-code`          | Authenticated | Batch execute code test cases via Judge0    |
| `POST` | `/api/v1/submission`            | Authenticated | Submit problem solution & record attempt    |
| `GET`  | `/api/v1/submission/:problemId` | Authenticated | Fetch user submission history for a problem |

### 🎵 Playlist Endpoints (`/api/v1/playlist`)

| Method   | Endpoint       | Access        | Description                          |
| :------- | :------------- | :------------ | :----------------------------------- |
| `GET`    | `/`            | Authenticated | Get all playlists for logged-in user |
| `POST`   | `/`            | Authenticated | Create a new problem playlist        |
| `POST`   | `/add-problem` | Authenticated | Add a problem to a playlist          |
| `DELETE` | `/:playlistId` | Authenticated | Delete a playlist                    |

---

## 📁 Repository Structure

```
leetLab/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # PostgreSQL database schema
│   ├── src/
│   │   ├── controllers/         # Auth, Problem, Execution, Submission, Playlist controllers
│   │   ├── routes/              # Express route handlers
│   │   ├── middlewares/         # JWT authentication & Admin permission verification
│   │   ├── libs/                # Prisma client instantiation & Judge0 API helper
│   │   └── index.js             # Express server entry point
│   ├── .env.sample              # Environment configuration template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Pages/               # Home, Login, Signup pages
│   │   ├── components/          # Reusable UI components & Layouts
│   │   ├── App.jsx              # Main React Application & Routing
│   │   ├── main.jsx             # React entry file
│   │   └── index.css            # Tailwind CSS imports
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Readme.md                    # Main Project Documentation
```

<img width="1648" height="888" alt="Folder Structure Diagram" src="../Assets/leetLab assets/FolderStructure.png" />

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve **LeetLab**:

1. **Fork** the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## 👤 Author

**Uditya Pal**

- GitHub: [@Uditya-Pal-1](https://github.com/Uditya-Pal-1)
- Cohort: Chai aur Code Web Development Cohort

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
