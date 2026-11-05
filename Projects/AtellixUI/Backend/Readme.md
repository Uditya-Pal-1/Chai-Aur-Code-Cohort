# AtellixUI Backend Service

Production-ready modular REST API and Component Registry Service for [AtellixUI](../README.md).

## Features

- **Express 5** application with ES modules (`type: module`).
- **Resilient MongoDB Connection** via Mongoose with automatic fallback mode if MongoDB is offline.
- **RESTful Endpoints**:
  - `GET /`: API overview & available endpoints.
  - `GET /api/health`: Server health check, uptime, memory, and database status.
  - `POST /api/contact`: Validated project inquiries with rate limiting and database/in-memory persistence.
  - `GET /api/contact`: List inquiries (for dashboard / admin review).
  - `GET /api/registry`: Component list with tier, categories, tokens, and dependencies.
  - `POST /api/account/register`, `POST /api/account/login`, `POST /api/account/logout`, `GET /api/account/me`: Cookie-based account sessions.
  - `GET /api/reviews`, `POST /api/reviews`: Public review list and authenticated review submissions.
  - `GET /r/:component.json`: CLI distribution endpoint (`npx atellix add <component>`) matching PRD v2.1.
- **Security & Reliability**:
  - Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, etc.).
  - CORS configuration with origin allow-list.
  - In-memory rate limiting on contact submissions.
  - Standardized JSON error response handler.
  - Graceful shutdown handling (`SIGTERM` / `SIGINT`).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```
   Set `MONGODB_URI`, a unique `JWT_SECRET` (32+ random bytes), and the production `CLIENT_URL` before deploying. Account and review routes require a connected MongoDB database.

3. Run in development mode with nodemon:
   ```bash
   npm run dev
   ```

4. Run in production:
   ```bash
   npm start
   ```
