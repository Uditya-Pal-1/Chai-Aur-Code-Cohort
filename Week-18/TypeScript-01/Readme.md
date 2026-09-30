# 🚀 TypeScript Express Server Template

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Schema_Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

A robust, enterprise-ready **TypeScript & Node.js backend server project** designed with clean architectural patterns, type-safe environment variable parsing, structured JSON logging, and modular routing.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Architecture & Design Highlights](#-architecture--design-highlights)
- [Author & License](#-author--license)

---

## 🔍 Overview

This project serves as a structured baseline for building scalable HTTP backend services using **Express.js** and **TypeScript** with native **ES Modules (`NodeNext`)**. It enforces strict compile-time safety and runtime validation for environment variables.

---

## ✨ Key Features

- ⚡ **Native ES Modules**: Uses `type: "module"` with NodeNext module resolution.
- 🛡️ **Type-Safe Environment Variables**: Powered by **Zod** schema parsing (`src/env.ts`).
- 📝 **Structured JSON Logging**: Centralized logger using **Winston** for debugging and production readiness (`src/logger.ts`).
- 🧩 **Modular Architecture**: Separate directories for application bootstrap, route registration, and controller handlers.
- 🏥 **Built-in Health Checks**: Out-of-the-box `/health` endpoint to monitor server uptime.
- 🎯 **Strict TypeScript Configuration**: Optimized `tsconfig.json` with source map generation, declaration maps, and strict type checking.

---

## 🛠️ Tech Stack

| Technology                                          | Purpose                                                      |
| :-------------------------------------------------- | :----------------------------------------------------------- |
| **[TypeScript](https://www.typescriptlang.org/)**   | Typed JavaScript superset for reliable server-side code      |
| **[Node.js](https://nodejs.org/)**                  | Asynchronous event-driven JavaScript runtime                 |
| **[Express.js](https://expressjs.com/)**            | Fast, unopinionated web framework for Node.js                |
| **[Zod](https://zod.dev/)**                         | TypeScript-first schema validation for environment variables |
| **[Winston](https://github.com/winstonjs/winston)** | Multi-transport async logging framework                      |

---

## 📁 Project Structure

```text
TypeScript-01/
├── dist/                     # Compiled JavaScript output (generated on build)
├── src/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── admin/        # Admin routes namespace
│   │   │   └── health/       # Health check route & controller
│   │   │       ├── controller.ts
│   │   │       └── route.ts
│   │   └── index.ts          # Express application factory (createApp)
│   ├── env.ts                # Zod environment variable validator
│   ├── index.ts              # HTTP server entry point
│   └── logger.ts             # Winston logger configuration
├── .gitignore                # Git ignored patterns
├── package.json              # Project dependencies & scripts
├── Readme.md                 # Project documentation
└── tsconfig.json             # TypeScript compiler settings
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <repository-url>
   cd TypeScript-01
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory (optional, defaults to port `8000`):

```env
PORT=8000
```

---

## 📜 Available Scripts

In the project directory, you can run:

| Command         | Description                                                            |
| :-------------- | :--------------------------------------------------------------------- |
| `npm run build` | Compiles TypeScript source files into executable JavaScript in `dist/` |
| `npm start`     | Executes the compiled application from `dist/index.js`                 |

---

## 🌐 API Reference

### Health Check

Check whether the HTTP server is running and responding.

- **URL**: `/health`
- **Method**: `GET`
- **Response**: `200 OK`

```json
{
  "status": "healthy"
}
```

---

## 🏗️ Architecture & Design Highlights

1. **Factory Pattern for Express App**: `createApp()` inside `src/app/index.ts` encapsulates app initialization, making it easy to instantiate isolated apps for unit testing.
2. **Fail-Fast Environment Loading**: `src/env.ts` parses `process.env` at server initialization. If required environment variables are invalid, the process throws an immediate validation error.
3. **Decoupled Controller Logic**: Routes map directly to class instance methods (`HealthController`), ensuring a clear separation of concerns between routing and request handling.

---

## 👤 Author & License

- **Author**: Uditya Pal
- **License**: [MIT](../../LICENSE)
