import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import analysisRouter from "./routes/analysis.js";
import pathRouter from "./routes/path.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:3001")
      .split(",")
      .map((s) => s.trim()),
  })
);
app.use(express.json({ limit: "2mb" }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 ? "connected" : "demo" });
});

app.use("/api", analysisRouter);
app.use("/api", pathRouter);
app.use("/api", dashboardRouter);

// 404 + error handlers
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const useDb = process.env.DB_MODE !== "memory" && !!process.env.MONGODB_URI;

if (useDb) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.error("MongoDB connection failed, running in demo mode:", e.message));
} else {
  console.log("No MONGODB_URI — running in demo (in-memory) mode");
}

app.listen(PORT, () => {
  console.log(`AtellixCareer API listening on http://localhost:${PORT}`);
});
