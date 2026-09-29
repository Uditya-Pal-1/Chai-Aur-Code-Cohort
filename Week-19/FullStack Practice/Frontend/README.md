# 🚀 FullStack Auth Application - Frontend Client

A modern, fast, and responsive React frontend application built with **Vite 8**, **React 19**, **Tailwind CSS v4**, and **React Router v8**. This project serves as the client-side interface for a full-stack user authentication system, complete with registration, authentication, and session handling.

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v8.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Development Server](#running-development-server)
  - [Available Scripts](#available-scripts)
- [API Integration](#-api-integration)
- [Configuration & Linting](#-configuration--linting)
- [License](#-license)

---

## ✨ Features

- **⚡ Fast HMR Development**: Powered by Vite 8 for instant Hot Module Replacement during development.
- **🔐 User Authentication**: Complete user flows for registration, login, and user profile management.
- **🌐 Centralized API Client Service**: Reusable custom fetch client handling headers, JSON serialization, base URLs, and cookie credentials.
- **🛣️ Client-Side Routing**: Single Page Application (SPA) routing powered by React Router v8.
- **🎨 Modern Utility-First Styling**: Styled using the latest Tailwind CSS v4 engine for rapid and flexible UI design.
- **🧹 Code Quality & Formatting**: Configured with ESLint and Prettier to enforce consistent code style.

---

## 🛠️ Tech Stack

### Core Framework & Libraries
- **[React 19](https://react.dev/)**: JavaScript library for building user interfaces.
- **[Vite 8](https://vitejs.dev/)**: Next-generation frontend tooling.
- **[React Router v8](https://reactrouter.com/)**: Standard client-side routing library for React.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework.

### Development Tools
- **[ESLint 10](https://eslint.org/)**: Pluggable JavaScript linter.
- **[Prettier](https://prettier.io/)**: Opinionated code formatter.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)**: Official Vite plugin for React.

---

## 🏗️ Project Architecture

```
Frontend/
├── Services/
│   └── apiClient.js        # Centralized HTTP Client for backend communication
├── public/
│   ├── favicon.svg         # Application icon
│   └── icons.svg           # Scalable SVG icons
├── src/
│   ├── assets/             # Static assets (images, icons, etc.)
│   ├── components/         # Reusable UI Components
│   │   ├── Login.jsx       # User login component
│   │   └── Signup.jsx      # User registration form with state & API handling
│   ├── App.jsx             # Main App layout component
│   ├── App.css             # Component-level styles
│   ├── index.css           # Global Tailwind CSS entry point
│   └── main.jsx            # Application entry point with BrowserRouter & Router setup
├── .prettierrc             # Prettier formatting config
├── eslint.config.js        # ESLint 10 configuration
├── package.json            # Dependencies and scripts declaration
└── vite.config.js          # Vite build and plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/fullstack-practice-frontend.git
   cd FullStack Practice/Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Development Server

Start the local development server with Vite:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or the port specified in terminal output).

### Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with HMR. |
| `npm run build` | Compiles and optimizes assets for production deployment into `dist/`. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Executes ESLint to check for code quality and linting errors. |

---

## 🔗 API Integration

Communication with the backend API is abstracted via the `ApiClient` class located in [`Services/apiClient.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-19/FullStack%20Practice/Frontend/Services/apiClient.js).

### Base Configuration
- **Base URL**: `http://127.0.0.1:3000/api/v1`
- **Credentials Mode**: `include` *(Supports HTTP-only cookie session authentication)*
- **Headers**: `"Content-Type": "application/json"`, `"Accept": "application/json"`

### Available API Service Methods

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `signup(name, email, password)` | `POST /users/register` | Registers a new user account. |
| `login(email, password)` | `POST /users/login` | Authenticates existing user credentials. |
| `getProfile()` | `GET /users/me` | Fetches authenticated user profile data. |

---

## ⚙️ Configuration & Code Quality

- **ESLint**: Configured in `eslint.config.js` with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- **Prettier**: Configured in `.prettierrc` for consistent formatting across files.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

