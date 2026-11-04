import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./libs/db.js";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

const startServer = async () => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
  await connectDB();
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () =>
    console.info(`API listening on port ${port}`),
  );

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () =>
      server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
      }),
    );
  }
};

startServer().catch((error) => {
  console.error("API startup failed:", error);
  process.exitCode = 1;
});
