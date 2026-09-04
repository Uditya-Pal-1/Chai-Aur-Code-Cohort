import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// healthcheck router
import { healthCheck } from "./controllers/healthcheck.controllers.js";
app.use("/api/v1/healthcheck",healthCheck)

export default app;