# ⚡ LeetLab - Backend

This is the RESTful API server and backend service for **LeetLab**, built with Express.js 5, Prisma ORM, PostgreSQL, and Judge0 Code Execution API integration.

> For full project documentation, database ER diagram, and step-by-step setup guide, please refer to the main [LeetLab Readme](../Readme.md).

## 🚀 Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Authentication**: JWT, Cookie-Parser, BcryptJS
- **Code Execution Engine**: Judge0 API Integration

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the `backend` directory using `.env.sample` as a template:
```env
PORT=8080
DATABASE_URL="postgresql://user:password@localhost:5432/leetlab_db?schema=public"
JWT_SECRET="your_jwt_super_secret_key"
```

### 3. Database Migration & Prisma Setup
```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 4. Run Server
```bash
npm run dev
```

The API server will run at `http://localhost:8080`.

---

## 📁 Folder Structure

<img width="1648" height="888" alt="Repo Diagram" src="/Projects/Assets/leetLab assets/FolderStructure.png" />