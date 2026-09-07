import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
}),
);

import {errorHandler} from"./middlewares/error.middlewares.js";
import {authRouter} from "./routes/auth.routes.js"
import {noteRouter} from "./routes/note.routes.js"
import {projectRouter} from "./routes/project.routes.js"
import {taskRouter} from "./routes/task.routes.js"

// healthcheck router
import { healthCheck } from "./controllers/healthcheck.controllers.js";
app.use("/api/v1/healthcheck",healthCheck)

// *app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);

app.use(errorHandler);

export default app;