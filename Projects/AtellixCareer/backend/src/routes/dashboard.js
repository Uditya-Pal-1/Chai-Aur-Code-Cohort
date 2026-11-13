import express from "express";
import mongoose from "mongoose";
import { Assessment } from "../models/Assessment.js";
import { LearningPlan } from "../models/LearningPlan.js";

const router = express.Router();
const dbReady = () => mongoose.connection.readyState === 1;

// GET /api/dashboard?userId= — aggregated dashboard payload
router.get("/dashboard", async (req, res) => {
  const { userId } = req.query;

  if (!dbReady()) {
    return res.json({
      mode: "demo",
      stats: { readiness: 68, avgMastery: 59, streakDays: 12, milestonesDone: 2, milestonesTotal: 6 },
      targetRole: { title: "Senior Frontend Engineer", company: "Series-B SaaS", matchScore: 68 },
    });
  }

  const [latestAssessment, activePlan] = await Promise.all([
    Assessment.findOne({ userId }).sort({ createdAt: -1 }).lean(),
    LearningPlan.findOne({ userId, status: "active" }).lean(),
  ]);

  const skills = latestAssessment?.skills || [];
  const readiness = latestAssessment?.matchScore ?? 0;
  const doneWeeks = activePlan?.weeks?.filter((w) => w.status === "done").length || 0;
  const totalWeeks = activePlan?.weeks?.length || 0;
  const avgMastery = skills.length
    ? Math.round(skills.reduce((a, s) => a + (s.current || 0), 0) / skills.length)
    : 0;

  res.json({
    mode: "live",
    stats: {
      readiness,
      avgMastery,
      streakDays: 0, // computed from activity events in production
      milestonesDone: doneWeeks,
      milestonesTotal: totalWeeks,
    },
    targetRole: latestAssessment
      ? { title: latestAssessment.roleKey, matchScore: readiness }
      : null,
    assessment: latestAssessment?._id,
    plan: activePlan?._id,
  });
});

export default router;
