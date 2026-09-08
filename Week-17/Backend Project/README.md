<img width="1648" height="888" alt="chai-cohort" src="../assets/diagram.png" />

Write guideline of the projects. this is our practice project so no guideline only practice purpose.
# 1. Project Setup

### Install Node.js

Download and install [Node.js](https://nodejs.org/) (it includes npm).

### Create a New Project

Open a terminal and run:

```sh
mkdir task-manager && cd task-manager
npm init -y
```

This creates a `package.json` file.

### Install Dependencies

Run:

```sh
npm install express mongoose dotenv cors express-validator
```

Install prettier as dev dependency:

```sh
npm install --save-dev prettier
```

- `express` → Web framework
- `mongoose` → MongoDB ORM
- `dotenv` → For environment variables
- `cors` → Enable cross-origin requests
- `prettier` → Code formatter

### Configure Prettier

Create a `.prettierrc` file and add:

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always"
}
```

Create a `.prettierignore` file and add:

```sh
node_modules
.env
```

### Create Project Files

Run:

```sh
mkdir src
touch src/index.js .env
```

- `index.js` → Main entry file
- `.env` → Stores database connection string

### Add MongoDB Connection

Edit `.env` and add your MongoDB URL:

```
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=8000
```

### **Enable ES Modules in `package.json`**

Open `package.json` and add:

```json
{
  "type": "module"
}
```

This tells Node.js to use ES Modules.

---

### Create db connection script

Create a `src/db/index.js` file and add:

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  }
};

export default connectDB;
```

### Create an express app

Create a `src/app.js` file and add:

```js
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, welcome to chaicode!");
});

export default app;
```

### **Update `src/index.js` with Import Syntax**

```js
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo db connect error: ", err);
    process.exit(1);
  });
```

---

## **Install Nodemon (as a Dev Dependency)**

Run:

```sh
npm install --save-dev nodemon
```

---

## **Update `package.json` with Scripts**

Modify `package.json` to add scripts:

📄 **`package.json`**

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

---

## **Run the Server**

Now, use these commands:

- **Development Mode** (auto-restart on changes):
  ```sh
  npm run dev
  ```
- **Production Mode** (no auto-restart):
  ```sh
  npm start
  ```

# 2. Create utils and helper functions

### Common classes for api response and error

Create a `src/utils/api-error.js` file and add:

```js
class ApiError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {any[]} errors
   * @param {string} stack
   */
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically.
    }
  }
}

export { ApiError };
```

create a `src/utils/api-response.js` file and add:

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
```

create a `src/utils/async-handler.js` file and add:

```js
/**
 *
 * @param {(req: import("express").Request, res:import("express").Response, next:import("express").NextFunction) => void} requestHandler
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
```

# 3. Start the app development

### Create healthcheck endpoint

Create a new file `src/controllers/healthcheck.controllers.js` and add the following code:

```js
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running" }));
});

export { healthCheck };
```

Create a new file `src/routes/healthcheck.routes.js` and add the following code:

```js
import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.route("/").get(healthcheck);

export default router;
```

### Global error handler

Create a new file `src/middlewares/error.middleware.js` and add the following code:

```js
import mongoose from "mongoose";

import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

/**
 *
 * @param {Error | ApiError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to catch the errors from any request handler wrapped inside the {@link asyncHandler}
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if the error is an instance of an ApiError class which extends native Error class
  if (!(error instanceof ApiError)) {
    // if not
    // create a new ApiError instance to keep the consistency

    // assign an appropriate status code
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Now we are sure that the `error` variable will be an instance of ApiError class
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  console.error(`${error.message}`);

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
```

This middleware is responsible to catch the errors from any request handler wrapped inside the {@link asyncHandler}

Update the `src/app.js` file and add the following code:

```js
// ...

// add this at the end of the file
app.use(errorHandler);

// ...
```
