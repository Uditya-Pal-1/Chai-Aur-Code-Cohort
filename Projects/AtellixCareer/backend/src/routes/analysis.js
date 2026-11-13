import express from "express";
import multer from "multer";
import { Resume } from "../models/Resume.js";
import { analyzeGap } from "../services/analysis.js";
import { Assessment } from "../models/Assessment.js";
import mongoose from "mongoose";

const router = express.Router();
const dbReady = () => mongoose.connection.readyState === 1;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /pdf|msword|officedocument|text/.test(file.mimetype) || /\.(pdf|docx?|txt)$/i.test(file.originalname);
    cb(ok ? null : new Error("Unsupported file type — upload a PDF, DOCX, or TXT"), ok);
  },
});

// POST /api/resumes — upload a resume file
router.post("/resumes", upload.single("resume"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded (field: resume)" });

    const record = {
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      // Real impl: send buffer to a PDF/DOCX text extractor, then optionally to the LLM.
      extractedText: req.file.buffer.toString("utf8").slice(0, 200_000),
      parseStatus: "parsed",
    };

    if (dbReady()) {
      const doc = await Resume.create({ ...record, userId: req.body.userId || undefined });
      return res.status(201).json({ id: doc._id, ...record });
    }
    res.status(201).json({ id: "demo-resume-1", ...record });
  } catch (e) {
    next(e);
  }
});

// POST /api/analysis — run gap analysis for a resume + target role
router.post("/analysis", async (req, res) => {
  const { resumeText = "", roleKey = "senior-frontend-engineer", resumeId } = req.body || {};
  const result = analyzeGap(resumeText, roleKey);

  if (dbReady()) {
    const doc = await Assessment.create({
      resumeId: resumeId || undefined,
      roleKey,
      frameworkVersion: result.frameworkVersion,
      matchScore: result.matchScore,
      skills: result.skills,
      model: result.model,
    });
    return res.status(201).json({ id: doc._id, ...result });
  }
  res.status(201).json({ id: "demo-assessment-1", ...result });
});

// GET /api/analysis/:id
router.get("/analysis/:id", async (req, res) => {
  if (!dbReady()) {
    return res.status(503).json({ error: "Database not connected — demo mode is write-only" });
  }
  const doc = await Assessment.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ error: "Assessment not found" });
  res.json(doc);
});

export default router;
