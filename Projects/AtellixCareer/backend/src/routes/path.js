import express from "express";
import mongoose from "mongoose";
import { Assessment } from "../models/Assessment.js";
import { LearningPlan } from "../models/LearningPlan.js";
import { generatePlan } from "../services/plan.js";

const router = express.Router();
const dbReady = () => mongoose.connection.readyState === 1;

// POST /api/plan — generate a learning path from an assessment (or latest demo data)
router.post("/plan", async (req, res) => {
  const { assessmentId, roleKey = "senior-frontend-engineer", weeks = 6 } = req.body || {};

  let assessment;
  if (dbReady() && assessmentId) {
    assessment = await Assessment.findById(assessmentId).lean();
    if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  } else {
    // Demo fallback: synthesize a minimal assessment so the endpoint works without DB.
    assessment = {
      roleKey,
      skills: [
        { name: "Next.js", status: "gap", current: 58, target: 85 },
        { name: "System Design", status: "gap", current: 35, target: 80 },
        { name: "Testing (Vitest/RTL)", status: "gap", current: 41, target: 75 },
        { name: "React", status: "developing", current: 82, target: 90 },
        { name: "TypeScript", status: "developing", current: 74, target: 88 },
      ],
    };
  }

  const planWeeks = generatePlan(assessment, Math.min(Math.max(weeks, 4), 12));

  if (dbReady()) {
    const doc = await LearningPlan.create({
      assessmentId: assessmentId || undefined,
      roleKey: assessment.roleKey || roleKey,
      weeks: planWeeks,
    });
    return res.status(201).json({ id: doc._id, roleKey: assessment.roleKey || roleKey, weeks: planWeeks });
  }
  res.status(201).json({ id: "demo-plan-1", roleKey: assessment.roleKey || roleKey, weeks: planWeeks });
});

// GET /api/plan/:id
router.get("/plan/:id", async (req, res) => {
  if (!dbReady()) return res.status(503).json({ error: "Database not connected — demo mode" });
  const doc = await LearningPlan.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ error: "Plan not found" });
  res.json(doc);
});

// PATCH /api/plan/:id/week/:week — update a week's status/progress
router.patch("/plan/:id/week/:week", async (req, res) => {
  if (!dbReady()) return res.status(503).json({ error: "Database not connected — demo mode" });
  const { status, completedResources } = req.body || {};
  const doc = await LearningPlan.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: "Plan not found" });
  const week = doc.weeks.id(req.params.week);
  if (!week) return res.status(404).json({ error: "Week not found" });
  if (status) week.status = status;
  if (Array.isArray(completedResources)) week.set("resourcesCompleted", completedResources);
  await doc.save();
  res.json(week);
});

export default router;
