import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// healthcheck router
import { healthCheck } from "./controllers/healthcheck.controllers";
app.use("/api/v1/healthcheck",healthCheck)

export default app;