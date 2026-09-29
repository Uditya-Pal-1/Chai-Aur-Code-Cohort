<div align="center">
  <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="100" alt="TypeScript Logo" />
  <img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" width="220" alt="MongoDB Logo" />

  # 🚀 Week 18: Advanced MongoDB Aggregation & Enterprise TypeScript

  **Chai Aur Code Cohort — Full-Stack Web Development & System Design**

  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Aggregation_Framework-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](#)
  [![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](#)
  [![Zod](https://img.shields.io/badge/Zod-Schema_Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](#)
  [![Winston](https://img.shields.io/badge/Winston-Logging_Framework-5A0099?style=for-the-badge)](#)
  [![Cohort](https://img.shields.io/badge/Chai_Cohort-Week_18-FF9900?style=for-the-badge)](#)

</div>

---

## 📌 Table of Contents

- [ Overview](#-overview)
- [📁 Repository Structure](#-repository-structure)
- [🍃 Module 1: MongoDB Aggregation Pipeline Masterclass](#-module-1-mongodb-aggregation-pipeline-masterclass)
  - [Dataset Architecture](#dataset-architecture)
  - [Core Pipeline Operators](#core-pipeline-operators)
  - [Key Aggregation Scenarios](#key-aggregation-scenarios)
  - [Cross-Collection Joins (`$lookup` & `$addFields`)](#cross-collection-joins-lookup--addfields)
- [⚡ Module 2: Enterprise TypeScript & Express Server Template](#-module-2-enterprise-typescript--express-server-template)
  - [Architecture & Design Highlights](#architecture--design-highlights)
  - [Type-Safe Environment Variables (`Zod`)](#type-safe-environment-variables-zod)
  - [Structured Logging (`Winston`)](#structured-logging-winston)
  - [Modular Routing & Class Controllers](#modular-routing--class-controllers)
- [📘 Module 3: TypeScript Core Fundamentals](#-module-3-typescript-core-fundamentals)
  - [Type Annotations & Function Signatures](#type-annotations--function-signatures)
  - [Interfaces & Optional Properties](#interfaces--optional-properties)
  - [Optional Chaining & Nullish Coalescing](#optional-chaining--nullish-coalescing)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [📜 Available Scripts](#-available-scripts)
- [👤 Author & Acknowledgments](#-author--acknowledgments)

---
## 🖼️ Media & Visuals

  <img src="./pose6.jpeg" alt="DOM Challenges Banner" width="750" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />

---
## 🔍 Overview

Welcome to **Week 18** of the **Chai Aur Code Cohort**. This week focuses on two major pillars of modern backend development:

1. **MongoDB Aggregation Framework**: Designing multi-stage analytical data pipelines, array transformations, complex filtering, positional matching, regex operations, and cross-collection relational joins (`$lookup`).
2. **Enterprise TypeScript Server Architecture**: Building scalable, type-safe HTTP backend services with **Node.js**, **Express**, **Zod** schema validation, and **Winston** structured logging, alongside hands-on TypeScript core fundamentals.

---

## 📁 Repository Structure

```text
Week-18/
├── 🍃 MongoDB Aggregation/       # MongoDB Aggregation Masterclass & Query Suites
│   ├── Assets/                 # High-resolution query diagrams & execution results
│   ├── Author.mongodb.js       # Author entity collection dataset
│   ├── Books.mongodb.js        # Book inventory collection dataset
│   ├── Users.mongodb.js        # Comprehensive user profiles & activity dataset
│   └── Readme.md               # Detailed aggregation scenarios & query documentation
├── ⚡ TypeScript-01/             # Production-Ready Express + TypeScript Application Template
│   ├── dist/                   # Compiled JavaScript build output
│   ├── src/
│   │   ├── app/
│   │   │   ├── routes/
│   │   │   │   ├── admin/      # Admin route namespace
│   │   │   │   └── health/     # Health check route & class controller
│   │   │   │       ├── controller.ts
│   │   │   │       └── route.ts
│   │   │   └── index.ts        # Express app factory (createApp)
│   │   ├── env.ts              # Zod environment schema & validator
│   │   ├── index.ts            # HTTP server entry point
│   │   └── logger.ts           # Winston JSON console logger setup
│   ├── package.json            # Node.js dependencies and lifecycle scripts
│   ├── tsconfig.json           # TypeScript compiler configuration (ESNext/NodeNext)
│   └── Readme.md               # Module-specific documentation
├── 📘 Typescript rough/          # Core TypeScript Language Fundamentals & Experiments
│   └── hello.ts                # Hands-on practice with interfaces, types, & optional parameters
└── 📄 README.md                # Root Week-18 overview documentation (This file)
```

---

## 🍃 Module 1: MongoDB Aggregation Pipeline Masterclass

The [MongoDB Aggregation](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation) module covers data analytics and pipeline transformations on NoSQL document databases.

### Dataset Architecture

The aggregation exercises are executed against three interconnected collections:

| Collection Script | Record Type | Key Fields |
| :--- | :--- | :--- |
| [`Users.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Users.mongodb.js) | User Profiles | `_id`, `name`, `age`, `gender`, `company`, `email`, `tags`, `favoriteFruit`, `isActive` |
| [`Books.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Books.mongodb.js) | Book Catalog | `_id`, `title`, `author_id`, `genre`, `price` |
| [`Author.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Author.mongodb.js) | Author Directory | `_id`, `name`, `birth_year`, `nationality` |

### Core Pipeline Operators

- **Filtering & Filtering Stages**: `$match`, `$count`, `$limit`, `$sort`
- **Groupings & Accumulators**: `$group`, `$sum`, `$avg`, `$min`, `$max`, `$push`
- **Projection & Field Transformation**: `$project`, `$addFields`, `$size`
- **Array Operations**: `$unwind`, `$all`, positional dot notation (`tags.1`)
- **Pattern Matching & Regex**: `$regex`
- **Relational Joins**: `$lookup`, `$arrayElemAt`

### Key Aggregation Scenarios

Here is a summary of key aggregation challenges covered in the module:

1. **Active User Count**: `$match: { isActive: true }` $\rightarrow$ `$count: "activeUsers"`
2. **Average User Age**: `$group: { _id: null, averageAge: { $avg: "$age" } }`
3. **Top 5 Favorite Fruits**: `$group` by `$favoriteFruit` $\rightarrow$ `$sort` descending $\rightarrow$ `$limit: 5`
4. **Gender Categorization**: `$group` by `$gender` with accumulated count `$sum: 1`
5. **Array Tag Length Calculation**:
   - *Approach A (Unwind)*: `$unwind: "$tags"` $\rightarrow$ `$group` by user `_id`
   - *Approach B (Add Fields - Optimized)*: `$addFields: { tagCount: { $size: "$tags" } }` $\rightarrow$ `$group` by `$avg: "$tagCount"`
6. **Positional Index Match**: Find users where the 2nd tag is `"ad"` (`$match: { "tags.1": "ad" }`)
7. **Exact Array Set Match**: `$match: { tags: { $all: ["enim", "id"] } }`

### Cross-Collection Joins (`$lookup` & `$addFields`)

Joining the `books` collection with `authors` using `$lookup` and flattening the resulting array:

```javascript
[
  {
    $lookup: {
      from: "authors",          // Target collection to join
      localField: "author_id",   // Foreign key in the books collection
      foreignField: "_id",       // Primary key in the authors collection
      as: "author_details"       // Target array field name
    }
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0] // Extracts object from array index 0
      }
    }
  }
]
```

---

## ⚡ Module 2: Enterprise TypeScript & Express Server Template

The [TypeScript-01](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01) directory demonstrates an enterprise backend architecture built with Express.js and TypeScript.

### Architecture & Design Highlights

- **Native ES Modules**: Configured with `"type": "module"` in `package.json` and `"moduleResolution": "NodeNext"` in `tsconfig.json`.
- **Factory Design Pattern**: The `createApp()` function in [`src/app/index.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01/src/app/index.ts) decouples application creation from HTTP server startup ([`src/index.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01/src/index.ts)).
- **Class-Based Controllers**: Handler methods encapsulated within controller classes (e.g., `HealthController`).

### Type-Safe Environment Variables (`Zod`)

Environment configuration ([`src/env.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01/src/env.ts)) validates runtime variables against a Zod schema before server initialization:

```typescript
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const validationResult = envSchema.safeParse(env);
  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }
  return validationResult.data;
}

export const env = createEnv(process.env);
```

### Structured Logging (`Winston`)

Application logging ([`src/logger.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01/src/logger.ts)) is managed via Winston with JSON formatting:

```typescript
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);
```

### Modular Routing & Class Controllers

Health check endpoint implementation ([`src/app/routes/health/controller.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/TypeScript-01/src/app/routes/health/controller.ts)):

```typescript
import type { Request, Response } from "express";

class HealthController {
  public handleHealthCheck(req: Request, res: Response) {
    return res.json({
      status: "healthy",
    });
  }
}

export default HealthController;
```

---

## 📘 Module 3: TypeScript Core Fundamentals

The [Typescript rough](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/Typescript%20rough) folder demonstrates core type system concepts in [`hello.ts`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/Typescript%20rough/hello.ts).

### Type Annotations & Function Signatures

TypeScript enforces strict argument and return typing:

```typescript
let x = 30;
let y: number = 45;
let z: number = x + y;

function add(a: number, b: number): number {
  return a + b;
}
```

### Interfaces & Optional Properties

Interfaces define clear contracts for complex data structures:

```typescript
interface User {
  firstName: string;
  lastName?: string;           // Optional property
  email: string;
  profileImageURL?: string;
}

function updateUser(user: User) {
  // Safe processing with interface contract
}
```

### Optional Chaining & Nullish Coalescing

Handling optional nested values safely:

```typescript
function createUser(user: { firstname: string; lastname?: string }) {
  const trimmedlastname: string = user.lastname?.trim() || "";
}
```

---

## 🚀 Quick Start & Installation

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas account (for Aggregation queries)

### 1️⃣ Setting up TypeScript Express Server (`TypeScript-01`)

```bash
# Navigate to the project directory
cd TypeScript-01

# Install dependencies
npm install

# Build the TypeScript project
npm run build

# Start the compiled server
npm start
```

Once started, test the health check endpoint:
```bash
curl http://localhost:8000/health
# Response: {"status":"healthy"}
```

### 2️⃣ Running MongoDB Aggregation Queries

1. Open your database GUI (e.g., MongoDB Compass, VS Code MongoDB Extension).
2. Seed your database using [`Users.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Users.mongodb.js), [`Books.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Books.mongodb.js), and [`Author.mongodb.js`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Author.mongodb.js).
3. Execute the aggregation pipeline stages outlined in [`MongoDB Aggregation/Readme.md`](file:///d:/VS%20Code/Web%20Development%20Course/Chai-Aur-Code-Cohort/Week-18/MongoDB%20Aggregation/Readme.md).

---

## 📜 Available Scripts

Inside `TypeScript-01/package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `build` | `tsc` | Transpiles TypeScript files into JavaScript in `dist/` |
| `start` | `node dist/index.js` | Launches the built Node.js server |

---

## 👤 Author & Acknowledgments

- **Cohort Member**: Uditya Pal
- **Course**: Chai Aur Code Cohort (Week 18)
- **License**: ISC

---

<div align="center">
  <i>Built with ❤️ during the Chai Aur Code Cohort</i>
</div>
